> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# End-to-end: a vendor scorecard

> Walk a Table from schema definition through filtered updates, aggregation, and CSV export — one realistic workflow in a single script.

**What this builds.** A vendor-scorecard table you can actually use: define a four-column schema (with a single-select `status` and an int `priority`), seed it with vendors, flag low-priority European vendors as needing review, archive completed work, page through the survivors with `scroll`, roll up the spend, and export the result to CSV.
**You'll end up with.** A single Python script that exercises every major verb on `Table` in a sequence that mirrors how teams use these tables in practice — and a clean account at the end, with the export bytes in hand.

## The workflow

```python theme={"languages":{}}
"""Track a vendor scorecard from creation to export.

Stages:
  1. Define the schema (status as single-select, priority as int).
  2. Load five vendors.
  3. Flag low-priority EU vendors as 'reviewing'.
  4. Drop vendors whose status is 'done'.
  5. Page through the survivors with scroll().
  6. Roll up the spend by region with aggregate().
  7. Export the table to CSV.
"""

from vectorshift.table import (
    AggregationType,
    ColumnSpec,
    CompoundFilter,
    ExportFormat,
    FilterCondition,
    NumberFormat,
    NumberKind,
    SelectOption,
    SingleSelectFormat,
    StringFormat,
    Table,
    TableFilterOperator,
)


# --- 1. Schema ---
t = Table.new(
    name="Vendor scorecard",
    columns=[
        ColumnSpec(name="vendor", format=StringFormat()),
        ColumnSpec(name="region", format=StringFormat()),
        ColumnSpec(
            name="status",
            format=SingleSelectFormat(options=[
                SelectOption(id="open",      label="Open",      color="#22aa22"),
                SelectOption(id="reviewing", label="Reviewing", color="#ffaa00"),
                SelectOption(id="done",      label="Done",      color="#888888"),
            ]),
        ),
        ColumnSpec(name="priority", format=NumberFormat(number_kind=NumberKind.INT)),
    ],
)
print(f"1. Created table id={t.id} with {len(t.columns)} columns.")

# --- 2. Seed ---
t.clear()
t.insert_rows([
    {"vendor": "Acme",  "region": "EU", "status": "open", "priority": 8},
    {"vendor": "Beta",  "region": "EU", "status": "open", "priority": 1},
    {"vendor": "Gamma", "region": "US", "status": "open", "priority": 5},
    {"vendor": "Delta", "region": "US", "status": "done", "priority": 9},
    {"vendor": "Echo",  "region": "AS", "status": "done", "priority": 2},
])
print(f"2. Loaded {t.read_rows()['total']} vendors.")

# --- 3. Flag low-priority EU vendors as 'reviewing' ---
t.update_rows(
    {"status": "reviewing"},
    filters=CompoundFilter.of(
        FilterCondition("region", TableFilterOperator.EQ, "EU"),
        FilterCondition("priority", TableFilterOperator.LT, 5),
    ),
)
reviewing = {r["values"]["vendor"]
             for r in t.read_rows(filters=CompoundFilter.of(
                 FilterCondition("status", TableFilterOperator.EQ, "reviewing"),
             ))["rows"]}
print(f"3. Flagged for review: {reviewing}")

# --- 4. Archive completed work ---
t.delete_rows(filters=CompoundFilter.of(
    FilterCondition("status", TableFilterOperator.EQ, "done"),
))
print(f"4. After archiving 'done': {t.read_rows()['total']} vendors remain.")

# --- 5. Page through what's left ---
print("5. Scrolling survivors:")
for chunk in t.scroll(page_size=2):
    for r in chunk["rows"]:
        v = r["values"]
        print(f"     - {v['vendor']:6} region={v.get('region')} status={v.get('status')} priority={v.get('priority')}")

# --- 6. Roll up spend by-priority and unique vendors ---
priority_total = t.aggregate(aggregations=[("priority", AggregationType.SUM)])
unique_vendors = t.aggregate(aggregations=[("vendor", AggregationType.UNIQUE)])
print(f"6. SUM(priority) = {priority_total['aggregations']}")
print(f"   UNIQUE(vendor) = {unique_vendors['aggregations']}")

# --- 7. Export ---
# export() returns a TypedDict. `content` is inline bytes for small
# exports, but empty when the server streamed to object storage — use
# s3_key / s3_url to fetch the file in that case.
out = t.export(format=ExportFormat.CSV)
if out["content"]:
    print(f"7. Exported -> filename={out['filename']!r} bytes={len(out['content'])}")
else:
    print(f"7. Exported -> filename={out['filename']!r} s3_key={out.get('s3_key')!r}")

# --- Cleanup ---
t.delete()
print("Done.")
```

## Expected output

```text theme={"languages":{}}
1. Created table id=... with 4 columns.
2. Loaded 5 vendors.
3. Flagged for review: {'Beta'}
4. After archiving 'done': 3 vendors remain.
5. Scrolling survivors:
     - Acme   region=EU status=open      priority=8
     - Beta   region=EU status=reviewing priority=1
     - Gamma  region=US status=open      priority=5
6. SUM(priority) = {'priority': 14}
   UNIQUE(vendor) = {'vendor': 3}
7. Exported -> filename='Vendor scorecard.csv' bytes=...
Done.
```

<Tip>
  **Scaling this up.** Past about 1,000 rows, `read_rows` only returns the first page — switch to `scroll(page_size=…)` (or `ascroll` for async) when you genuinely need every matching row, as shown in stage 5. The same `CompoundFilter` you'd pass to `read_rows` works on `scroll`.
</Tip>

## See also

<Columns cols={3}>
  <Card title="Schema and AI-generated columns" icon="columns" href="/sdk/table/examples/columns-full">
    Extend this workflow with PipelineGenerator / AgentGenerator columns.
  </Card>

  <Card title="Common filter recipes" icon="filter" href="/sdk/table/examples/all-filter-operators">
    Every `TableFilterOperator` with a copy-paste snippet.
  </Card>

  <Card title="Reference" icon="book-open" href="/sdk/table/reference">
    Every public method, grouped by topic.
  </Card>
</Columns>
