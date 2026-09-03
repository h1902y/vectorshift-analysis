> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Table overview

> Typed schema, AI-generated columns, and SQL-grade filters over a managed spreadsheet — usable directly or wired into a Pipeline / Agent.

The `Table` class is the SDK surface for VectorShift's managed structured store. Define columns with typed formats, fill cells by hand or via an AI generator (a [Pipeline](/sdk/pipeline/overview) or an [Agent](/sdk/agent/overview)), then query, aggregate, import, and export — all with the same fluent filter dataclasses.

<Info>
  **Prerequisites:** [Installed SDK](/sdk/installation) · [API key set](/sdk/authentication) · Python 3.10+.
</Info>

## Mental model

* A `Table` is a **named, schema'd collection of rows**. Each column has a typed [`ColumnFormat`](/sdk/table/reference#columnformat) — string, number, timestamp, select, file, image, knowledge-base, and a few list variants.
* A column can carry a **`ColumnGenerator`** — either a [`PipelineGenerator`](/sdk/table/reference#pipelinegenerator) or an [`AgentGenerator`](/sdk/table/reference#agentgenerator) — and `table.run(columns=[...])` fills those cells in bulk. This is how a Table becomes a workflow surface, not just a data store.
* Queries take a [`CompoundFilter`](/sdk/table/reference#compoundfilter): groups of [`FilterCondition`](/sdk/table/reference#filtercondition) joined with `AND`/`OR`, with `order_by` / `paginate` chained on. The same filter object drives `read_rows`, `update_rows`, `delete_rows`, `aggregate`, `run`, and `export`.
* Long-running operations (`run`, `import_file`) return a **task handle** ([`TableRunTask`](/sdk/table/reference#tableruntask) / [`TableImportTask`](/sdk/table/reference#tableimporttask)) you poll, or use the `_and_wait` variant which blocks until terminal status.
* Every method has an **async variant** (`anew`, `ainsert_rows`, `aread_rows`, `arun_and_wait`, `ascroll`, …).

<Tip>
  **AI-generated columns are the headline feature.** A column with a `PipelineGenerator` or `AgentGenerator` attached gets its cells filled by running the bound Pipeline/Agent on the other column values in that row. See [`PipelineGenerator`](/sdk/table/reference#pipelinegenerator) and [`AgentGenerator`](/sdk/table/reference#agentgenerator) in the reference.
</Tip>

## Quick start

<CodeGroup>
  ```python Sync theme={"languages":{}}
  from vectorshift.table import (
      ColumnSpec, NumberFormat, NumberKind, StringFormat, Table,
  )

  # Create with a typed schema.
  t = Table.new(
      name="Vendor scorecard",
      columns=[
          ColumnSpec(name="vendor", format=StringFormat()),
          ColumnSpec(name="region", format=StringFormat()),
          ColumnSpec(name="amount", format=NumberFormat(number_kind=NumberKind.FLOAT)),
      ],
  )

  # Insert rows.
  t.insert_rows([
      {"vendor": "Acme",  "region": "EU", "amount": 1200.5},
      {"vendor": "Beta",  "region": "EU", "amount": 49.9},
      {"vendor": "Gamma", "region": "US", "amount": 980.0},
  ])

  # Read all rows.
  page = t.read_rows()
  print(f"{page['total']} rows")
  ```

  ```python Async theme={"languages":{}}
  import asyncio
  from vectorshift.table import (
      ColumnSpec, NumberFormat, NumberKind, StringFormat, Table,
  )

  async def main():
      t = await Table.anew(
          name="Vendor scorecard",
          columns=[
              ColumnSpec(name="vendor", format=StringFormat()),
              ColumnSpec(name="region", format=StringFormat()),
              ColumnSpec(name="amount", format=NumberFormat(number_kind=NumberKind.FLOAT)),
          ],
      )
      await t.ainsert_rows([
          {"vendor": "Acme",  "region": "EU", "amount": 1200.5},
          {"vendor": "Beta",  "region": "EU", "amount": 49.9},
      ])
      page = await t.aread_rows()
      print(f"{page['total']} rows")

  asyncio.run(main())
  ```
</CodeGroup>

## Reading rows at scale

`read_rows(...)` returns **one page** of results (about 1,000 rows by default). For tables larger than that, iterate with [`scroll`](/sdk/table/reference#scroll) (or `ascroll` for async) — it pages through every matching row using the same `filters` and `columns` arguments:

```python theme={"languages":{}}
for chunk in t.scroll(page_size=500, filters=my_filter):
    process(chunk["rows"])
```

Reach for `read_rows` when you know the result set is small and you want a `RowsPage` in one call. Reach for `scroll` when you need every matching row, or when you don't know how large the table is.

## Pipeline and Agent generated columns

The `generation` field on a [`ColumnSpec`](/sdk/table/reference#columnspec) binds a column to a Pipeline or an Agent. `table.run(columns=[...])` then fills those cells row-by-row using the other column values in each row as inputs.

In `input_mapping`, **keys are the Pipeline/Agent input names** and **values are the table-column names** the engine reads for each row. So `{"vendor_name": "vendor"}` means "send the value of the `vendor` column into the `vendor_name` input."

<CodeGroup>
  ```python PipelineGenerator theme={"languages":{}}
  from vectorshift.pipeline import Pipeline
  from vectorshift.table import (
      ColumnSpec, PipelineGenerator, StringFormat, Table,
  )

  summarizer = Pipeline.fetch(name="vendor-summarizer")

  t = Table.new(
      name="Vendor summaries",
      columns=[
          ColumnSpec(name="vendor", format=StringFormat()),
          ColumnSpec(name="notes",  format=StringFormat()),
          ColumnSpec(
              name="summary",
              format=StringFormat(),
              generation=PipelineGenerator(
                  pipeline=summarizer,
                  input_mapping={"vendor_name": "vendor", "raw_notes": "notes"},
                  output_name="summary",
              ),
          ),
      ],
  )

  t.insert_rows([
      {"vendor": "Acme",  "notes": "fast shipping, premium pricing"},
      {"vendor": "Beta",  "notes": "slow but cheap"},
  ])

  # Fire the generator for the 'summary' column on every row.
  task = t.run_and_wait(columns=["summary"])
  print(task.status, task.rows_processed)
  ```

  ```python AgentGenerator theme={"languages":{}}
  from vectorshift.agent import Agent
  from vectorshift.knowledge_base import KnowledgeBase
  from vectorshift.table import (
      AgentGenerator, ColumnSpec, StringFormat, Table,
  )

  reviewer = Agent.fetch(name="contract-reviewer")
  policies = KnowledgeBase.fetch(name="policies")

  t = Table.new(
      name="Contract reviews",
      columns=[
          ColumnSpec(name="title",  format=StringFormat()),
          ColumnSpec(name="clause", format=StringFormat()),
          ColumnSpec(
              name="risk",
              format=StringFormat(),
              generation=AgentGenerator(
                  agent=reviewer,
                  knowledge_base=policies,
                  instructions="Classify the clause as low / medium / high risk; cite the relevant policy.",
                  input_mapping={"clause_text": "clause"},
              ),
          ),
      ],
  )
  ```
</CodeGroup>

See [`PipelineGenerator`](/sdk/table/reference#pipelinegenerator) and [`AgentGenerator`](/sdk/table/reference#agentgenerator) in the reference for every field.

## Column formats

Each column carries a `ColumnFormat` — pick the variant that matches the data:

| Variant                                                                                                                                                 | Use for                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`StringFormat`](/sdk/table/reference#stringformat)                                                                                                     | Free-text                                                                                    |
| [`BoolFormat`](/sdk/table/reference#boolformat)                                                                                                         | True / false flags                                                                           |
| [`NumberFormat`](/sdk/table/reference#numberformat)                                                                                                     | `int` / `float` / `currency` / `percent` via [`NumberKind`](/sdk/table/reference#numberkind) |
| [`TimestampFormat`](/sdk/table/reference#timestampformat)                                                                                               | Dates / datetimes with a display format                                                      |
| [`SingleSelectFormat`](/sdk/table/reference#singleselectformat) / [`MultiSelectFormat`](/sdk/table/reference#multiselectformat)                         | Enum-style choices with [`SelectOption`](/sdk/table/reference#selectoption)                  |
| [`FileFormat`](/sdk/table/reference#fileformat) / [`AudioFormat`](/sdk/table/reference#audioformat) / [`ImageFormat`](/sdk/table/reference#imageformat) | Single file uploads                                                                          |
| [`KnowledgeBaseFormat`](/sdk/table/reference#knowledgebaseformat)                                                                                       | Cell points at a `KnowledgeBase`                                                             |
| [`ListOfFilesFormat`](/sdk/table/reference#listoffilesformat) / [`ListOfStringsFormat`](/sdk/table/reference#listofstringsformat)                       | Lists of files / strings                                                                     |

`add_columns` also accepts a shorthand `{name: kind_string}` dict — handy for quick smoke tests; the typed `ColumnSpec` path is recommended for real schemas.

## Filtering, ordering, paginating

Every query verb takes the same [`CompoundFilter`](/sdk/table/reference#compoundfilter). Build one with `CompoundFilter.of(...)` for a single-group AND/OR, or construct nested groups directly:

```python theme={"languages":{}}
from vectorshift.table import (
    CompoundFilter, FilterCondition, FilterGroup,
    RelationalOperator, TableFilterOperator,
)

# (region == "EU") AND (priority > 2 OR status == "closed")
filt = CompoundFilter(
    groups=[
        FilterGroup(conditions=[
            FilterCondition("region", TableFilterOperator.EQ, "EU"),
        ]),
        FilterGroup(
            conditions=[
                FilterCondition("priority", TableFilterOperator.GT, 2),
                FilterCondition("status", TableFilterOperator.EQ, "closed"),
            ],
            logical_operator=RelationalOperator.OR,
        ),
    ],
    group_logical_operator=RelationalOperator.AND,
).order_by("priority", desc=True).paginate(limit=10)

page = t.read_rows(filters=filt)
```

See the [`TableFilterOperator`](/sdk/table/reference#tablefilteroperator) reference for every operator and what it matches, or the [Common filter recipes](/sdk/table/examples/all-filter-operators) example for copy-paste snippets per use case.

## Long-running operations

`run` and `import_file` are async on the server. Two surfaces:

| Verb                           | Returns immediately                                       | Blocks until done      |
| ------------------------------ | --------------------------------------------------------- | ---------------------- |
| `run` (fill generator columns) | [`TableRunTask`](/sdk/table/reference#tableruntask)       | `run_and_wait`         |
| `import_file` (CSV / XLSX)     | [`TableImportTask`](/sdk/table/reference#tableimporttask) | `import_file_and_wait` |

Poll the bare variant with `run_status(task_id)` / `import_file_status(task_id)`, or just call `_and_wait` with a `timeout` and `poll_interval`.

## What's next

<Columns cols={3}>
  <Card title="Reference" icon="book-open" href="/sdk/table/reference">
    Every public method, grouped by topic.
  </Card>

  <Card title="End-to-end walkthrough" icon="layers" href="/sdk/table/examples/full-workflow">
    Build a vendor scorecard from schema to export.
  </Card>

  <Card title="Common filter recipes" icon="filter" href="/sdk/table/examples/all-filter-operators">
    One snippet per operator, grouped by use case.
  </Card>
</Columns>
