> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Schema and AI-generated columns

> Build a typed schema with NumberFormat, SingleSelectFormat, and TimestampFormat, then attach a Pipeline and an Agent that fill cells for you.

**What this builds.** A vendor table whose schema is seeded with three typed columns (`vendor: StringFormat`, `amount: NumberFormat(currency)`, `status: SingleSelectFormat`), evolved with `add_column` / `rename_column` / `delete_column`, and finally extended with two **AI-generated columns** — one filled by a [`Pipeline`](/sdk/pipeline/overview), one by an [`Agent`](/sdk/agent/overview).
**You'll end up with.** A working pattern for both the static-schema and AI-fill paths, including a `run_and_wait(...)` call that triggers the generators on the rows you've inserted.

## Stage 1 — seed a typed schema

```python theme={"languages":{}}
"""Build a typed schema, evolve it, then attach AI generators."""

from vectorshift.table import (
    ColumnSpec,
    CompoundFilter,
    FilterCondition,
    NumberFormat,
    NumberKind,
    SelectOption,
    SingleSelectFormat,
    StringFormat,
    Table,
    TableFilterOperator,
    TimestampFormat,
)

# --- Create with seeded columns ---
t = Table.new(
    name="Vendor scorecard",
    columns=[
        ColumnSpec(name="vendor", format=StringFormat()),
        ColumnSpec(
            name="amount",
            format=NumberFormat(number_kind=NumberKind.CURRENCY, decimals=2, symbol="$"),
        ),
        ColumnSpec(
            name="status",
            format=SingleSelectFormat(
                options=[
                    SelectOption(id="open", label="Open", color="#22aa22"),
                    SelectOption(id="done", label="Done", color="#888888"),
                ]
            ),
        ),
    ],
)
print(f"1. Created Table id={t.id} with 3 typed columns:")
for c in t.columns:
    print(f"     - {c.name:10} kind={c.kind}")
```

## Stage 2 — evolve the schema

```python theme={"languages":{}}
# --- Add, rename, then drop columns post-hoc ---
t.add_column(name="due", format=TimestampFormat(format="yyyy-MM-dd"))
print(f"2. Added 'due' (timestamp). Columns: {[c.name for c in t.columns]}")

t.rename_column("status", "current_status")
print(f"3. Renamed 'status' -> 'current_status'.")

# --- Insert some typed rows ---
t.insert_rows([
    {"vendor": "Acme",  "amount": 1200.50, "current_status": "open"},
    {"vendor": "Beta",  "amount": 49.99,   "current_status": "open"},
    {"vendor": "Gamma", "amount": 980.00,  "current_status": "done"},
])

# --- Read with a filter on the string column ---
filt = CompoundFilter.of(
    FilterCondition("vendor", TableFilterOperator.CONTAINS, "a"),
).order_by("vendor", desc=False)
page = t.read_rows(filters=filt)
print(f"4. Filtered (vendor contains 'a'): {page['total']} rows")
for row in page["rows"]:
    v = row["values"]
    print(f"     - {v['vendor']:6} amount={v.get('amount')} status={v.get('current_status')}")

t.delete_column("due")
print(f"5. Deleted 'due'. Columns: {[c.name for c in t.columns]}")
```

## Stage 3 — add an AI-filled column backed by a Pipeline

A `PipelineGenerator` on a `ColumnSpec` binds a pipeline to that column. When you call `table.run(columns=[...])`, VectorShift runs the pipeline once per row, reading inputs from the other columns and writing the named output into the cell.

```python theme={"languages":{}}
from vectorshift.pipeline import Pipeline
from vectorshift.table import PipelineGenerator

# Fetch a pipeline you've built and deployed via the SDK or platform UI.
# It should accept `vendor_name: str` and `raw_notes: str` inputs and emit
# a `summary: str` output.
summarizer = Pipeline.fetch(name="vendor-summarizer")

# Add a 'notes' column to capture free-text context for each vendor,
# plus a 'summary' column that the pipeline fills.
t.add_column("notes", StringFormat())
t.add_column(
    "summary",
    StringFormat(),
    generation=PipelineGenerator(
        pipeline=summarizer,
        # Keys are the pipeline's input names; values are the table-column
        # names read for each row.
        input_mapping={"vendor_name": "vendor", "raw_notes": "notes"},
        output_name="summary",
    ),
)

# Populate notes on the existing rows.
from vectorshift.table import RelationalOperator
t.update_rows({"notes": "fast shipping, premium pricing"},
              filters=CompoundFilter.of(FilterCondition("vendor", TableFilterOperator.EQ, "Acme")))
t.update_rows({"notes": "slow but cheap"},
              filters=CompoundFilter.of(FilterCondition("vendor", TableFilterOperator.EQ, "Beta")))
t.update_rows({"notes": "reliable mid-tier vendor"},
              filters=CompoundFilter.of(FilterCondition("vendor", TableFilterOperator.EQ, "Gamma")))

# Fill the 'summary' column for every row — synchronously.
task = t.run_and_wait(columns=["summary"], timeout=120)
print(f"6. summary fill: status={task.status} rows_processed={task.rows_processed}")
```

## Stage 4 — add an AI-filled column backed by an Agent

An `AgentGenerator` swaps the pipeline for a conversational [`Agent`](/sdk/agent/overview), with optional [`KnowledgeBase`](/sdk/knowledge-base/overview) retrieval context. Same `run` / `run_and_wait` flow.

```python theme={"languages":{}}
from vectorshift.agent import Agent
from vectorshift.knowledge_base import KnowledgeBase
from vectorshift.table import AgentGenerator

reviewer = Agent.fetch(name="vendor-risk-reviewer")
policies = KnowledgeBase.fetch(name="vendor-policies")

t.add_column(
    "risk",
    StringFormat(),
    generation=AgentGenerator(
        agent=reviewer,
        knowledge_base=policies,
        instructions="Classify the vendor as low / medium / high risk based on the notes; cite the relevant policy.",
        input_mapping={"vendor_notes": "notes"},
    ),
)

task = t.run_and_wait(columns=["risk"], timeout=240)
print(f"7. risk fill:    status={task.status} rows_processed={task.rows_processed}")

# Cleanup
t.delete()
print("8. Deleted Table.\n\nDone.")
```

<Tip>
  **`input_mapping` direction.** Keys are the Pipeline/Agent **input names**; values are the **table-column names** read for each row. So `{"vendor_name": "vendor"}` means "send the value of the `vendor` column into the `vendor_name` input."
</Tip>

<Tip>
  **This example assumes `vendor-summarizer`, `vendor-risk-reviewer`, and `vendor-policies` already exist** in your account. Build them via the [Pipeline](/sdk/pipeline/overview) / [Agent](/sdk/agent/overview) / [Knowledge Base](/sdk/knowledge-base/overview) SDKs (or the platform UI) first, or swap the names for objects you already have.
</Tip>

## See also

<Columns cols={3}>
  <Card title="ColumnFormat reference" icon="palette" href="/sdk/table/reference#columnformat">
    Every format variant and its fields.
  </Card>

  <Card title="Generators in the overview" icon="bot" href="/sdk/table/overview#pipeline-and-agent-generated-columns">
    The mental model for AI-filled columns.
  </Card>

  <Card title="Aggregation + run" icon="sigma" href="/sdk/table/examples/aggregation-and-run">
    The polling shape of `run` / `run_and_wait`.
  </Card>
</Columns>
