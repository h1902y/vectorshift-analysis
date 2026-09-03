> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Table reference

> Create, schema, fill, filter, aggregate, import, and export tables from Python.

## Lifecycle

### `new`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.new(
      name: str,
      columns: Optional[list[ColumnSpec]] = None,
  ) -> Table
  ```

  ```python Async theme={"languages":{}}
  async Table.anew(
      name: str,
      columns: Optional[list[ColumnSpec]] = None,
  ) -> Table
  ```
</CodeGroup>

Create a new table. Pass `columns` to seed the schema in one call; omit it to start empty and add columns later with [`add_column`](#add-column) / [`add_columns`](#add-columns).

**Parameters**

<ParamField path="name" type="str" required>
  Display name of the table.
</ParamField>

<ParamField path="columns" type="Optional[list[ColumnSpec]]" default="None">
  Initial column schema. See [`ColumnSpec`](#columnspec).
</ParamField>

**Returns**

<ResponseField name="returns" type="Table">
  The new `Table` instance.
</ResponseField>

### `fetch`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.fetch(
      id: Optional[str] = None,
      name: Optional[str] = None,
      username: Optional[str] = None,
      org_name: Optional[str] = None,
  ) -> Table
  ```

  ```python Async theme={"languages":{}}
  async Table.afetch(
      id: Optional[str] = None,
      name: Optional[str] = None,
      username: Optional[str] = None,
      org_name: Optional[str] = None,
  ) -> Table
  ```
</CodeGroup>

Fetch by `id` or `name`. Exactly one is required. `username` and `org_name` scope name-fetches to a specific owner.

### `list`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.list(limit: int = 20, offset: int = 0) -> list[Table]
  ```

  ```python Async theme={"languages":{}}
  async Table.alist(limit: int = 20, offset: int = 0) -> list[Table]
  ```
</CodeGroup>

Paginated list of the tables visible to the API key's org.

### `update`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.update(name: Optional[str] = None) -> Table
  ```

  ```python Async theme={"languages":{}}
  async Table.aupdate(name: Optional[str] = None) -> Table
  ```
</CodeGroup>

Rename the table. Mutates `self` and returns it.

### `duplicate`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.duplicate(new_name: Optional[str] = None) -> Table
  ```

  ```python Async theme={"languages":{}}
  async Table.aduplicate(new_name: Optional[str] = None) -> Table
  ```
</CodeGroup>

Server-side copy of the table (schema + rows). Pass `new_name` to set the duplicate's name; otherwise the server auto-generates one.

### `delete`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.delete() -> None
  ```

  ```python Async theme={"languages":{}}
  async Table.adelete() -> None
  ```
</CodeGroup>

Permanently delete the table.

## Column schema

### `add_column`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.add_column(
      name: str,
      format: ColumnFormat,
      generation: Optional[ColumnGenerator] = None,
      display_name: Optional[str] = None,
      required: bool = False,
      default: Any = None,
  ) -> Column
  ```

  ```python Async theme={"languages":{}}
  async Table.aadd_column(...) -> Column
  ```
</CodeGroup>

Add a single column. `format` is one of the [`ColumnFormat`](#columnformat) variants. `generation` binds the column to a [`PipelineGenerator`](#pipelinegenerator) or [`AgentGenerator`](#agentgenerator) — see [`ColumnGenerator`](#columngenerator).

### `add_columns`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.add_columns(
      columns: list[ColumnSpec] | dict[str, str],
  ) -> list[Column]
  ```

  ```python Async theme={"languages":{}}
  async Table.aadd_columns(...) -> list[Column]
  ```
</CodeGroup>

Add multiple columns in one call. Accepts either a list of [`ColumnSpec`](#columnspec) (recommended) or a shorthand `{name: kind_string}` dict for quick smoke tests.

```python theme={"languages":{}}
# Shorthand
t.add_columns({"vendor": "string", "amount": "int", "status": "string"})

# Typed
t.add_columns([
    ColumnSpec(name="vendor", format=StringFormat()),
    ColumnSpec(name="amount", format=NumberFormat(number_kind=NumberKind.FLOAT)),
])
```

### `rename_column`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.rename_column(name: str, new_name: str) -> None
  ```

  ```python Async theme={"languages":{}}
  async Table.arename_column(name: str, new_name: str) -> None
  ```
</CodeGroup>

### `delete_column`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.delete_column(name: str) -> None
  ```

  ```python Async theme={"languages":{}}
  async Table.adelete_column(name: str) -> None
  ```
</CodeGroup>

### `update_column`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.update_column(
      name: str,
      format: ColumnFormat,
      *,
      display_name: Optional[str] = None,
  ) -> Column
  ```

  ```python Async theme={"languages":{}}
  async Table.aupdate_column(...) -> Column
  ```
</CodeGroup>

Change a column's format and/or `display_name`. Existing cell values must be coercible to the new format.

### `list_columns`

```python theme={"languages":{}}
Table.list_columns() -> list[Column]
```

Returns the current column descriptors. `table.columns` exposes the same list as an attribute.

## Row CRUD

<Tip>
  **`read_rows` returns one page** (about 1,000 rows by default). To iterate over every matching row in a larger table, use [`scroll`](#scroll) / `ascroll` instead — same `filters` and `columns` arguments, but it pages through the whole result set for you.
</Tip>

### `insert_row`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.insert_row(values: dict[str, Any]) -> None
  ```

  ```python Async theme={"languages":{}}
  async Table.ainsert_row(values: dict[str, Any]) -> None
  ```
</CodeGroup>

Insert a single row. Keys are column names; values are coerced via the column format. Returns `None` — use [`insert_rows`](#insert-rows) when you need the inserted count, or follow up with `read_rows(filters=...)` to inspect.

### `insert_rows`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.insert_rows(rows: list[dict[str, Any]]) -> InsertRowsResult
  ```

  ```python Async theme={"languages":{}}
  async Table.ainsert_rows(rows: list[dict[str, Any]]) -> InsertRowsResult
  ```
</CodeGroup>

Bulk insert. Returns an [`InsertRowsResult`](#insertrowsresult) with `success` and `rows_inserted`.

<Tip>
  If rows have **different shapes** (different rows omit different columns), bulk insert can fail. Fall back to one `insert_row` call per row that's missing columns the others have — your dense rows can still go through `insert_rows`.
</Tip>

### `read_rows`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.read_rows(
      filters: Optional[CompoundFilter] = None,
      columns: Optional[list[str]] = None,
  ) -> RowsPage
  ```

  ```python Async theme={"languages":{}}
  async Table.aread_rows(...) -> RowsPage
  ```
</CodeGroup>

Read rows that match `filters`. Pass `columns` to project only specific column names. Returns a [`RowsPage`](#rowspage) with `rows` and a `total` count. Capped at one page (\~1,000 rows by default) — use [`scroll`](#scroll) to iterate past that.

### `update_rows`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.update_rows(values: dict[str, Any], filters: CompoundFilter) -> int
  ```

  ```python Async theme={"languages":{}}
  async Table.aupdate_rows(...) -> int
  ```
</CodeGroup>

Apply a partial update to every row matched by `filters`. `filters` is **required** to prevent accidental table-wide updates. Returns the number of rows touched — but note this may be `0` even on success, because the engine does not currently report a count. If you really do want to clear the table, call [`clear`](#clear) instead.

### `delete_rows`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.delete_rows(filters: CompoundFilter) -> int
  ```

  ```python Async theme={"languages":{}}
  async Table.adelete_rows(filters: CompoundFilter) -> int
  ```
</CodeGroup>

Delete every row matched by `filters`. `filters` is required. Returns the number of rows deleted — but note this may be `0` even on success, because the engine does not currently report a count.

### `clear`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.clear() -> None
  ```

  ```python Async theme={"languages":{}}
  async Table.aclear() -> None
  ```
</CodeGroup>

Drop every row in the table while keeping the schema. Use this instead of `delete_rows` when you genuinely want to empty the table.

### `scroll`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.scroll(
      page_size: int = 200,
      filters: Optional[CompoundFilter] = None,
      columns: Optional[list[str]] = None,
  ) -> Iterator[RowsPage]
  ```

  ```python Async theme={"languages":{}}
  def Table.ascroll(...) -> AsyncIterator[RowsPage]
  ```
</CodeGroup>

Iterate over all matching rows in fixed-size pages. The iterator stops cleanly at the last page; no trailing empty page is yielded when the row count is a multiple of `page_size`.

```python theme={"languages":{}}
for chunk in t.scroll(page_size=500):
    process(chunk["rows"])
```

## Running generators

A column with a [`PipelineGenerator`](#pipelinegenerator) or [`AgentGenerator`](#agentgenerator) attached gets its cells filled by `table.run(columns=[...])`. Without generator columns, `run` is a no-op.

### `run`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.run(
      columns: list[str],
      filters: Optional[CompoundFilter] = None,
  ) -> TableRunTask
  ```

  ```python Async theme={"languages":{}}
  async Table.arun(...) -> TableRunTask
  ```
</CodeGroup>

Start filling the named generator columns. Returns a [`TableRunTask`](#tableruntask) — poll via `run_status(task_id)` or block via `run_and_wait`. `filters` scopes which rows are updated.

### `run_status`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.run_status(task_id: str) -> TableRunTask
  ```

  ```python Async theme={"languages":{}}
  async Table.arun_status(task_id: str) -> TableRunTask
  ```
</CodeGroup>

### `run_and_wait`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.run_and_wait(
      columns: list[str],
      filters: Optional[CompoundFilter] = None,
      timeout: float = 600.0,
      poll_interval: float = 1.0,
  ) -> TableRunTask
  ```

  ```python Async theme={"languages":{}}
  async Table.arun_and_wait(...) -> TableRunTask
  ```
</CodeGroup>

Blocking variant of `run`. Raises [`TableRunTimeout`](#tableruntimeout) on timeout, [`TableRunFailed`](#tablerunfailed) if the task ends in `FAILED`.

## Aggregation

### `aggregate`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.aggregate(
      aggregations: list[tuple[str, AggregationType]],
      filters: Optional[CompoundFilter] = None,
  ) -> AggregationResult
  ```

  ```python Async theme={"languages":{}}
  async Table.aaggregate(...) -> AggregationResult
  ```
</CodeGroup>

Compute one or more aggregations over the rows matched by `filters`. Each `(column, AggregationType)` pair returns one value. See [`AggregationType`](#aggregationtype) for the 21 supported functions (`SUM`, `AVERAGE`, `MEDIAN`, `MIN`, `MAX`, `RANGE`, `STANDARD_DEVIATION`, `UNIQUE`, `EARLIEST_DATE`, …).

<Tip>
  The result map is keyed by **column name**, so passing two aggregations on the same column in a single call will only return one of them. Issue one `aggregate(...)` call per `(column, type)` pair when you need multiple aggregations on the same column.
</Tip>

## Import / export

### `import_file`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.import_file(
      file: str | Path | bytes,
      column_mapping: Optional[dict[str, str]] = None,
      custom_headers: Optional[list[str]] = None,
      format: ImportFormat = ImportFormat.AUTO,
  ) -> TableImportTask
  ```

  ```python Async theme={"languages":{}}
  async Table.aimport_file(...) -> TableImportTask
  ```
</CodeGroup>

Bulk-load rows from a CSV or XLSX file. `column_mapping` maps file-column names to table-column names. `custom_headers` lets you supply headers when the file has none. `format` defaults to `AUTO` (sniff by extension).

### `import_file_status`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.import_file_status(task_id: str) -> TableImportTask
  ```

  ```python Async theme={"languages":{}}
  async Table.aimport_file_status(task_id: str) -> TableImportTask
  ```
</CodeGroup>

### `import_file_and_wait`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.import_file_and_wait(
      file: str | Path | bytes,
      column_mapping: Optional[dict[str, str]] = None,
      custom_headers: Optional[list[str]] = None,
      format: ImportFormat = ImportFormat.AUTO,
      timeout: float = 600.0,
      poll_interval: float = 1.0,
  ) -> TableImportTask
  ```

  ```python Async theme={"languages":{}}
  async Table.aimport_file_and_wait(...) -> TableImportTask
  ```
</CodeGroup>

Blocking variant. Raises [`TableImportTimeout`](#tableimporttimeout) / [`TableImportFailed`](#tableimportfailed).

### `export`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.export(
      format: ExportFormat = ExportFormat.CSV,
      filters: Optional[CompoundFilter] = None,
  ) -> TableExportResult
  ```

  ```python Async theme={"languages":{}}
  async Table.aexport(...) -> TableExportResult
  ```
</CodeGroup>

Synchronous export to CSV or Excel. For small exports the server returns the file bytes inline as `content`. For large exports the server streams to object storage and `content` is empty — use `s3_key` (and `s3_url` if provided) to fetch the file.

## Queries

### `nl_query`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Table.nl_query(query: str) -> NlQueryResult
  ```

  ```python Async theme={"languages":{}}
  async Table.anl_query(query: str) -> NlQueryResult
  ```
</CodeGroup>

Server-side natural-language → SQL. Returns an [`NlQueryResult`](#nlqueryresult) with an `answer` and the intermediate `dataframes` (protojson-encoded JSON strings).

## Serialization

### `to_dict`

```python theme={"languages":{}}
Table.to_dict() -> dict[str, Any]
```

Return the table as a plain dict.

## Types

### `ColumnSpec`

```python theme={"languages":{}}
ColumnSpec(
    name: str,
    format: ColumnFormat,
    display_name: Optional[str] = None,
    generation: Optional[ColumnGenerator] = None,
    required: bool = False,
    default: Optional[Any] = None,
)
```

Input shape for `Table.add_column[s]` and `Table.new(columns=...)`. Pairs a column `name` with a typed [`ColumnFormat`](#columnformat) and an optional [`ColumnGenerator`](#columngenerator).

### `Column`

Returned by `list_columns()` / `table.columns`.

| Field          | Type                        | Notes                                            |
| -------------- | --------------------------- | ------------------------------------------------ |
| `name`         | `str`                       | Column name (used as the dict key in row values) |
| `kind`         | [`ColumnKind`](#columnkind) | The resolved column kind                         |
| `display_name` | `Optional[str]`             | UI label                                         |
| `required`     | `bool`                      | Whether the column rejects nulls on insert       |
| `raw`          | `Optional[dict]`            | The full server-side descriptor                  |

### `ColumnFormat`

A column's format is one of the variants below. Each variant carries a `kind` literal identifying it.

#### `StringFormat`

```python theme={"languages":{}}
StringFormat(kind="string")
```

#### `BoolFormat`

```python theme={"languages":{}}
BoolFormat(kind="bool")
```

#### `NumberFormat`

```python theme={"languages":{}}
NumberFormat(
    kind="number",
    number_kind: NumberKind = NumberKind.FLOAT,
    decimals: Optional[int] = None,
    separator: Optional[str] = None,
    symbol: Optional[str] = None,       # currency symbol
    abbreviation: Optional[str] = None, # "K" / "M" / "B" / ""
)
```

#### `TimestampFormat`

```python theme={"languages":{}}
TimestampFormat(
    kind="timestamp",
    format: str = "yyyy-MM-dd HH:mm",
    display_timezone: bool = False,
)
```

#### `SingleSelectFormat` / `MultiSelectFormat`

```python theme={"languages":{}}
SingleSelectFormat(kind="single_select", options=[SelectOption(...)])
MultiSelectFormat(kind="multi_select",   options=[SelectOption(...)])
```

#### `SelectOption`

```python theme={"languages":{}}
SelectOption(id: str, label: str, color: Optional[str] = None)
```

#### `FileFormat` / `AudioFormat` / `ImageFormat`

```python theme={"languages":{}}
FileFormat(kind="file")
AudioFormat(kind="audio")
ImageFormat(kind="image")
```

#### `KnowledgeBaseFormat`

```python theme={"languages":{}}
KnowledgeBaseFormat(kind="knowledge_base")
```

#### `ListOfFilesFormat` / `ListOfStringsFormat`

```python theme={"languages":{}}
ListOfFilesFormat(kind="list_of_files")
ListOfStringsFormat(kind="list_of_strings")
```

### `ColumnGenerator`

Two variants today: [`PipelineGenerator`](#pipelinegenerator) and [`AgentGenerator`](#agentgenerator). Attach one to `ColumnSpec.generation` to make a column AI-filled.

#### `PipelineGenerator`

```python theme={"languages":{}}
PipelineGenerator(
    kind="pipeline",
    pipeline: Pipeline,
    input_mapping: dict[str, str] = {},
    output_name: str,
    auto_execute: bool = False,
)
```

Fills a cell by running the bound [`Pipeline`](/sdk/pipeline/overview) once per row.

* `input_mapping` — **keys are pipeline input names, values are table-column names.** For each row, the engine reads the value of the named column and passes it into the matching pipeline input. Example: `{"vendor_name": "vendor", "raw_notes": "notes"}` sends the row's `vendor` value to the `vendor_name` input and the `notes` value to `raw_notes`.
* `output_name` — which pipeline output to write into the cell.
* `auto_execute=True` — the engine fires the pipeline as new rows arrive instead of waiting for an explicit `table.run(...)`.

#### `AgentGenerator`

```python theme={"languages":{}}
AgentGenerator(
    kind="agent",
    agent: Agent,
    instructions: str,
    auto_execute: bool = False,
    knowledge_base: Optional[KnowledgeBase] = None,
    input_mapping: dict[str, str] = {},
)
```

Fills a cell by sending the row through an [`Agent`](/sdk/agent/overview).

* `instructions` — the per-cell prompt template the agent runs against each row.
* `input_mapping` — **keys are agent input names, values are table-column names.** For each row, the engine reads the value of the named column and passes it into the matching agent input.
* `knowledge_base` (optional) — gives the agent retrieval context for the cell.
* `auto_execute=True` — the engine fires the agent as new rows arrive instead of waiting for an explicit `table.run(...)`.

### `CompoundFilter`

```python theme={"languages":{}}
CompoundFilter(
    groups: list[FilterGroup] = [],
    group_logical_operator: RelationalOperator = RelationalOperator.AND,
)
```

The top-level filter shape consumed by every query verb. Groups join via `group_logical_operator`; within each [`FilterGroup`](#filtergroup), conditions join via that group's `logical_operator`.

**Builders**

| Method                                                 | What it does                                  |
| ------------------------------------------------------ | --------------------------------------------- |
| `CompoundFilter.of(*conditions, logical_operator=AND)` | Shorthand for a single-group filter           |
| `.order_by(column, desc=False)`                        | Add a sort key (chainable for multi-key sort) |
| `.group_sort_by(column, desc=False)`                   | Sort the *groups* themselves                  |
| `.paginate(limit, offset=0)`                           | Add a `limit` / `offset` pair                 |

All builders return a new `CompoundFilter` (the dataclass is frozen).

### `FilterGroup`

```python theme={"languages":{}}
FilterGroup(
    conditions: list[FilterCondition],
    logical_operator: RelationalOperator = RelationalOperator.AND,
)
```

### `FilterCondition`

```python theme={"languages":{}}
FilterCondition(field: str, operator: TableFilterOperator, value: Any)
```

A single leaf condition: "the value of column `field` should satisfy `operator` against `value`". `value` is the Python value for that column — `bool`, `int`, `float`, `str`, `datetime`, `list`, or `None` — and the SDK encodes it for the wire.

### `TableFilterOperator`

The 13 operators you can pass to a `FilterCondition`, grouped by what they do.

**Equality and set membership**

| Operator    | Matches a row when the column value…                                                                                               |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `EQ`        | …equals `value`.                                                                                                                   |
| `NEQ`       | …does **not** equal `value`. Rows where the column is `NULL` are included — `NEQ` treats a missing value as "not literally equal". |
| `IS_IN`     | …is one of the entries in the list `value` (e.g. `IS_IN ["EU", "US"]`).                                                            |
| `IS_NOT_IN` | …is not in the list, and is not `NULL`.                                                                                            |

```python theme={"languages":{}}
FilterCondition("region", TableFilterOperator.EQ, "EU")
FilterCondition("region", TableFilterOperator.IS_IN, ["EU", "US"])
```

**Ordering (numbers and timestamps)**

| Operator | Matches when the value is…      |
| -------- | ------------------------------- |
| `GT`     | …strictly greater than `value`. |
| `GTE`    | …greater than or equal.         |
| `LT`     | …strictly less than `value`.    |
| `LTE`    | …less than or equal.            |

```python theme={"languages":{}}
FilterCondition("priority", TableFilterOperator.GT, 5)
FilterCondition("created_at", TableFilterOperator.LTE, datetime(2026, 1, 1))
```

**Text**

| Operator           | Matches when the string column…                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| `CONTAINS`         | …contains `value` as a substring. **Case-insensitive** — searching for `"a"` matches `"Acme"`. |
| `DOES_NOT_CONTAIN` | …does not contain `value`. Case-insensitive.                                                   |

```python theme={"languages":{}}
FilterCondition("vendor", TableFilterOperator.CONTAINS, "acme")
```

**Missing data**

| Operator       | Matches when the value…               |
| -------------- | ------------------------------------- |
| `IS_EMPTY`     | …is `NULL`. Pass `None` as the value. |
| `IS_NOT_EMPTY` | …is set to anything.                  |

```python theme={"languages":{}}
FilterCondition("region", TableFilterOperator.IS_EMPTY, None)
```

**Files**

| Operator            | Matches when…                                                               |
| ------------------- | --------------------------------------------------------------------------- |
| `FILENAMES_CONTAIN` | …a file column holds a file whose filename contains `value` as a substring. |

```python theme={"languages":{}}
FilterCondition("attachment", TableFilterOperator.FILENAMES_CONTAIN, "invoice")
```

### `RelationalOperator`

```python theme={"languages":{}}
RelationalOperator.AND
RelationalOperator.OR
```

### `OrderByDirection`

```python theme={"languages":{}}
OrderByDirection.ASC
OrderByDirection.DESC
```

### `AggregationType`

21 functions covering counts, percentages, numeric reductions, boolean truth-counts, and timestamp ranges:

| Group     | Members                                                                 |
| --------- | ----------------------------------------------------------------------- |
| Counts    | `EMPTY`, `FILLED`, `UNIQUE` (+ `PERCENT_*`)                             |
| Numeric   | `SUM`, `MEDIAN`, `AVERAGE`, `MIN`, `MAX`, `RANGE`, `STANDARD_DEVIATION` |
| Boolean   | `TRUE_COUNT`, `FALSE_COUNT` (+ `PERCENT_*`)                             |
| Timestamp | `EARLIEST_DATE`, `LATEST_DATE`, `DATE_RANGE_DAYS`, `DATE_RANGE_MONTHS`  |

Numeric reductions require numeric columns; boolean reductions require bool columns; timestamp reductions require timestamp columns.

### `ColumnKind`

The resolved kind on a returned `Column`. One of: `string`, `bool`, `int`, `float`, `currency`, `percent`, `timestamp`, `single_select`, `multi_select`, `file`, `audio`, `image`, `knowledge_base`, `list_of_files`, `list_of_strings`.

### `NumberKind`

```python theme={"languages":{}}
NumberKind.INT
NumberKind.FLOAT
NumberKind.CURRENCY
NumberKind.PERCENT
```

### `ExportFormat`

```python theme={"languages":{}}
ExportFormat.CSV
ExportFormat.EXCEL
```

### `ImportFormat`

```python theme={"languages":{}}
ImportFormat.CSV
ImportFormat.XLSX
ImportFormat.AUTO   # sniff by file extension
```

### `RunStatus`

```python theme={"languages":{}}
RunStatus.PENDING
RunStatus.RUNNING
RunStatus.COMPLETED
RunStatus.FAILED
```

### `ImportStatus`

Same four values as `RunStatus`.

### `Row`

`TypedDict`:

```python theme={"languages":{}}
{"row_id": int, "values": dict[str, Any]}
```

### `RowsPage`

`TypedDict`:

```python theme={"languages":{}}
{"rows": list[Row], "total": int}
```

### `InsertRowsResult`

`TypedDict`:

```python theme={"languages":{}}
{"success": bool, "rows_inserted": int}
```

### `AggregationResult`

`TypedDict`:

```python theme={"languages":{}}
{"aggregations": dict[str, int | float | str | bool | None]}
```

### `NlQueryResult`

`TypedDict`:

```python theme={"languages":{}}
{
    "answer": str,
    "dataframes": list[str],
    "used_dataframes": NotRequired[list[str]],
}
```

### `TableExportResult`

`TypedDict`:

```python theme={"languages":{}}
{
    "filename": str,
    "content": bytes,
    "format": ExportFormat,
    "s3_key":  NotRequired[str],
    "s3_url":  NotRequired[str],
}
```

### `TableRunTask`

Frozen dataclass — a poll handle for `Table.run`.

| Field            | Type                      |
| ---------------- | ------------------------- |
| `task_id`        | `str`                     |
| `table_id`       | `str`                     |
| `status`         | [`RunStatus`](#runstatus) |
| `columns`        | `list[str]`               |
| `rows_processed` | `Optional[int]`           |
| `error`          | `Optional[str]`           |

### `TableImportTask`

Frozen dataclass — a poll handle for `Table.import_file`.

| Field           | Type                            |
| --------------- | ------------------------------- |
| `task_id`       | `str`                           |
| `table_id`      | `str`                           |
| `status`        | [`ImportStatus`](#importstatus) |
| `rows_imported` | `Optional[int]`                 |
| `error`         | `Optional[str]`                 |

## Errors

All Table errors inherit from `TableError` (which inherits from `VectorshiftError`).

| Exception            | Raised when                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `TableError`         | Base class — catch this for any table-layer error                                                                                           |
| `TableNotFound`      | `fetch` cannot locate the table                                                                                                             |
| `TableSchemaError`   | A column/format combination is rejected by the server, or an unknown column kind comes back from the server (likely SDK-behind-server skew) |
| `TableValueError`    | A cell value cannot be coerced to its column format                                                                                         |
| `TableRunFailed`     | A `run` task ended in `FAILED`                                                                                                              |
| `TableRunTimeout`    | `run_and_wait` exceeded its timeout                                                                                                         |
| `TableImportFailed`  | An `import_file` task ended in `FAILED`                                                                                                     |
| `TableImportTimeout` | `import_file_and_wait` exceeded its timeout                                                                                                 |

Catch `VectorshiftApiError` from `vectorshift.request` for transport-level failures (HTTP 4xx/5xx).
