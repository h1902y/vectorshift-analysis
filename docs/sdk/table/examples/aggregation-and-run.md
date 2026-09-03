> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Aggregation and run

> Compute SUM / AVERAGE / MAX / UNIQUE aggregations with optional filters, and inspect the Table.run task shape.

**What this builds.** Four rows of vendor spend, rolled up with `aggregate(...)` into totals, averages, and unique-vendor counts — whole-table and filtered to a single region. Then a quick look at the `run` / `run_status` shape, which is how you fill Pipeline- and Agent-generated columns in bulk.
**You'll end up with.** A working call to `aggregate` for the common reductions, plus a feel for the task handle `run` returns. The example uses a plain table (no generator columns) so `run` is a no-op here — see [columns-full](/sdk/table/examples/columns-full) for the wiring that makes `run` do real work.

```python theme={"languages":{}}
"""Roll up a small spend table with aggregate(), then peek at the run() task shape.

Aggregations run synchronously and return one value per (column, AggregationType)
pair. run() is long-running — it returns a TableRunTask immediately, and
run_and_wait() polls until COMPLETED.
"""

from vectorshift.table import (
    AggregationType,
    ColumnSpec,
    CompoundFilter,
    FilterCondition,
    NumberFormat,
    NumberKind,
    StringFormat,
    Table,
    TableFilterOperator,
)

t = Table.new(
    name="SDK Tables Agg Demo",
    columns=[
        ColumnSpec(name="vendor", format=StringFormat()),
        ColumnSpec(name="amount", format=NumberFormat(number_kind=NumberKind.FLOAT)),
        ColumnSpec(name="region", format=StringFormat()),
    ],
)
t.insert_rows(
    [
        {"vendor": "Acme", "amount": 1200.5, "region": "EU"},
        {"vendor": "Beta", "amount": 49.9, "region": "EU"},
        {"vendor": "Gamma", "amount": 980.0, "region": "US"},
        {"vendor": "Delta", "amount": 2200.0, "region": "US"},
    ]
)
print(f"1. Inserted 4 rows into {t.name!r}.")

# --- Aggregations across the whole table ---
print("2. Aggregations (all rows):")
for col, agg_type in [
    ("amount", AggregationType.SUM),
    ("amount", AggregationType.AVERAGE),
    ("amount", AggregationType.MAX),
    ("vendor", AggregationType.UNIQUE),
]:
    agg = t.aggregate(aggregations=[(col, agg_type)])
    for key, val in agg["aggregations"].items():
        label = f"{col}.{agg_type.name}"
        print(f"     - {label:30} = {val}")

# --- Aggregation with a filter ---
agg_eu = t.aggregate(
    aggregations=[("amount", AggregationType.SUM)],
    filters=CompoundFilter.of(
        FilterCondition("region", TableFilterOperator.EQ, "EU"),
    ),
)
print(f"3. SUM(amount) where region=EU: {agg_eu['aggregations']}")

# --- run() shape — no generator columns on this table, so this is a no-op.
#     With a PipelineGenerator or AgentGenerator on the column, run() would
#     fill the cells. See sdk/table/examples/columns-full for that wiring. ---
print("4. table.run() shape:")
try:
    task = t.run(columns=["vendor"])
    print(f"     run() -> task_id={task.task_id[:8]}... status={task.status}")
    polled = t.run_status(task.task_id)
    print(f"     run_status() -> status={polled.status}")
except Exception as exc:
    print(f"     run() requires generator columns: {type(exc).__name__}: {exc}")

t.delete()
print("5. Deleted Table.\n\nDone.")
```

## Expected output

```text theme={"languages":{}}
1. Inserted 4 rows into 'SDK Tables Agg Demo'.
2. Aggregations (all rows):
     - amount.SUM                    = 4430.4
     - amount.AVERAGE                = 1107.6
     - amount.MAX                    = 2200.0
     - vendor.UNIQUE                 = 4
3. SUM(amount) where region=EU: {'amount': 1250.4}
4. table.run() shape:
     run() -> task_id=... status=RunStatus.PENDING
     run_status() -> status=...
5. Deleted Table.

Done.
```

<Tip>
  The aggregation result map is keyed by **column name**, so passing two aggregations on the same column in a single `aggregate(...)` call returns only one of them. When you need several reductions on the same column, issue one call per `(column, type)` pair.
</Tip>

## See also

<Columns cols={3}>
  <Card title="Generators in the overview" icon="bot" href="/sdk/table/overview#pipeline-and-agent-generated-columns">
    Bind a column to a Pipeline or Agent so `run` does real work.
  </Card>

  <Card title="AggregationType reference" icon="sigma" href="/sdk/table/reference#aggregationtype">
    All 21 supported reductions and their column-type requirements.
  </Card>

  <Card title="End-to-end walkthrough" icon="layers" href="/sdk/table/examples/full-workflow">
    Aggregations inside a vendor-scorecard workflow.
  </Card>
</Columns>
