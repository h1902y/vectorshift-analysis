> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Analytics reference

> Query, aggregate, list, trace, and export observability data from Python.

`Analytics` is a class-method facade — you never instantiate it. Auth flows through the module-level `vectorshift.api_key`, exactly like `Pipeline`, `Table`, and `KnowledgeBase`. Every entry point has an async sibling prefixed with `a`.

```python theme={"languages":{}}
from vectorshift import Analytics
from vectorshift.analytics import (
    EventField, EventKind, EventStatus, GroupBy, Interval,
    AggregationField, AggregationOp, AggregationOperation, Percentile,
    Filter, FieldFilter, FilterGroup, LogicalOp, ExportFormat,
)
```

## Entry point

### `query`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Analytics.query(
      *,
      object: Any | list[Any] | None = None,
      object_type: str | None = None,
      object_ids: list[str] | None = None,
      kinds: list[EventKind] | None = None,
      limit: int = 50,
      offset: int = 0,
  ) -> Query
  ```

  ```python Async theme={"languages":{}}
  Analytics.aquery(
      *,
      object: Any | list[Any] | None = None,
      object_type: str | None = None,
      object_ids: list[str] | None = None,
      kinds: list[EventKind] | None = None,
      limit: int = 50,
      offset: int = 0,
  ) -> Query
  ```
</CodeGroup>

Build a [`Query`](#query) scoped by object and (optionally) event kind. All arguments are keyword-only. `aquery` returns a `Query` whose terminals route to the `a*` async pairs.

**Parameters**

<ParamField path="object" type="Any" default="None">
  A single resource instance (`Pipeline`, `Chatbot`, `Agent`, …). The SDK reads its `.id` and derives `object_type` from the class name. Scope is one object — passing more than one resolves to multiple ids and raises [`AnalyticsInvalidQuery`](#errors); query each separately and merge client-side.
</ParamField>

<ParamField path="object_type" type="Optional[str]" default="None">
  Scope to all objects of a type — e.g. `"pipeline"`, `"chatbot"`, `"form"`, `"voicebot"`, `"session"`, `"portal"`.
</ParamField>

<ParamField path="object_ids" type="Optional[list[str]]" default="None">
  A single raw object id when you don't have the typed instance, e.g. `["cb_123"]`. Passing more than one id raises [`AnalyticsInvalidQuery`](#errors) — the engine matches one id per scope filter, so query each separately and merge results client-side.
</ParamField>

<ParamField path="kinds" type="Optional[list[EventKind]]" default="None">
  Restrict to one or more [`EventKind`](#eventkind) span types. Overrides any kinds derived from `object=`.
</ParamField>

<ParamField path="limit" type="int" default="50">
  Default page size for paginated terminals (`events`, `traces`, `table`). Override per-call.
</ParamField>

<ParamField path="offset" type="int" default="0">
  Default offset for paginated terminals.
</ParamField>

**Returns**

<ResponseField name="returns" type="Query">
  A chainable [`Query`](#query). There is no automatic time window — bound the query with `.where(EventField.EVENT_START_TIME …)`.
</ResponseField>

## Single-object lookups

These read one object by id and sit outside the `Query` chain.

### `trace`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Analytics.trace(
      trace_id: str,
      event_ids: list[str] | None = None,
      kinds: list[EventKind] | None = None,
  ) -> Trace
  ```

  ```python Async theme={"languages":{}}
  async Analytics.atrace(
      trace_id: str,
      event_ids: list[str] | None = None,
      kinds: list[EventKind] | None = None,
  ) -> Trace
  ```
</CodeGroup>

Fetch the full event tree for one trace. Optional `event_ids` / `kinds` narrow the returned set. Raises [`AnalyticsNotFound`](#errors) if the trace doesn't exist.

### `event`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Analytics.event(event_id: str, trace_id: str | None = None) -> Event
  ```

  ```python Async theme={"languages":{}}
  async Analytics.aevent(event_id: str, trace_id: str | None = None) -> Event
  ```
</CodeGroup>

Fetch one [`Event`](#event) by id. Pass `trace_id` to scope the lookup.

### `run`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Analytics.run(
      object: Any | None = None,
      object_type: str | None = None,
      object_id: str | None = None,
      run_id: str | None = None,
  ) -> RunData
  ```

  ```python Async theme={"languages":{}}
  async Analytics.arun(
      object: Any | None = None,
      object_type: str | None = None,
      object_id: str | None = None,
      run_id: str | None = None,
  ) -> RunData
  ```
</CodeGroup>

Fetch per-run interface detail (a chatbot conversation, form submission, voicebot transcript, session, etc.). `run_id` is required; pass either `object=` **or** both `object_type=` + `object_id=`. Returns a [`RunData`](#rundata) with exactly one interface key populated.

## Refining a query

Each refining method returns a fresh `Query` (the dataclass is immutable).

### `where`

```python theme={"languages":{}}
Query.where(
    *positional: Filter | FieldFilter | FilterGroup,
    logical_op: LogicalOp = LogicalOp.AND,
    **kwargs: Any,
) -> Query
```

Add filters in any of three intermixable forms:

* **Positional** `Filter` / `FieldFilter` / `FilterGroup` instances, or the results of operator overloads (`EventField.X > value`).
* **Equality kwargs** resolved against the alias table — `status="failure"`, `interface_type="chatbot"`, `trace_id=…`, `source=…`, `caller=…`, `interface_name=…`, `error_message=…`, `session_name=…`, `session_users=…`, `session_source=…`, `event_start_time=…`, `event_end_time=…`.

Positional args inside one `.where()` combine via `logical_op`; multiple `.where()` calls AND together at the top level. `logical_op=LogicalOp.OR` wraps that call's positional args in an OR group.

<Info>
  **Time scoping.** The SDK lifts the first `>` / `>=` / `<` / `<=` comparison on `EventField.EVENT_START_TIME` into the request's top-level `start_time` / `end_time` fields. Datetimes must be timezone-aware — a naive `datetime` raises [`AnalyticsInvalidQuery`](#errors).
</Info>

<Warning>
  `EventField.LATENCY`, `EventField.MODEL_ID`, and `EventField.NODE_TYPE` are aggregation / group-by dimensions only — they have no filterable column on the wire and raise `AnalyticsInvalidQuery` if used in `.where(...)`. `!=` is not supported (the proto has no NEQ operator) and raises `NotImplementedError`.
</Warning>

### `group_by`

```python theme={"languages":{}}
Query.group_by(
    slice_: GroupBy | str | list[GroupBy | str],
    interval: Interval | str | None = None,
) -> _GroupedQuery
```

Bucket subsequent aggregations by one or more [`GroupBy`](#groupby) dimensions. `GroupBy.TIME` requires an `interval`. Returns a grouped query that re-exposes every aggregation terminal:

* **Single dimension** → the aggregation returns a flat `dict[str, float]` keyed by slice label.
* **Multiple dimensions** → returns an [`AggregationResult`](#aggregationresult) with nested buckets.

A grouped query also passes through the non-aggregation terminals (`events`, `count`, `table`, `traces`, `export`, `export_and_wait`).

## Aggregation terminals

Each has an `a*` async sibling. On an ungrouped query they return a scalar; on a `group_by(...)` they return a dict or [`AggregationResult`](#aggregationresult).

<Warning>
  Aggregations don't paginate, so every aggregation terminal (`sum`, `mean`, `min`, `max`, `count_distinct`, `percentile`, `raw_aggregate`) **requires a lower time bound** — a `.where(EventField.EVENT_START_TIME > …)` (or `>=`) predicate. Without one the query would scan all history, so the SDK raises [`AnalyticsInvalidQuery`](#errors). `count()` and `events()` are not aggregations and don't require it.
</Warning>

### `sum` / `mean` / `min` / `max`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Query.sum(field: AggregationField | str) -> float
  Query.mean(field: AggregationField | str) -> float
  Query.min(field: AggregationField | str) -> float
  Query.max(field: AggregationField | str) -> float
  ```

  ```python Async theme={"languages":{}}
  async Query.asum(field: AggregationField | str) -> float
  async Query.amean(field: AggregationField | str) -> float
  async Query.amin(field: AggregationField | str) -> float
  async Query.amax(field: AggregationField | str) -> float
  ```
</CodeGroup>

Scalar aggregation over an [`AggregationField`](#aggregationfield) (or its string value). `mean` over a range spanning multiple calendar years isn't supported on an ungrouped query — use `group_by(GroupBy.TIME, Interval.YEAR)` or narrow the range.

### `count_distinct`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Query.count_distinct(field: AggregationField | str) -> int
  ```

  ```python Async theme={"languages":{}}
  async Query.acount_distinct(field: AggregationField | str) -> int
  ```
</CodeGroup>

### `percentile`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Query.percentile(field: AggregationField | str, n: int) -> float
  ```

  ```python Async theme={"languages":{}}
  async Query.apercentile(field: AggregationField | str, n: int) -> float
  ```
</CodeGroup>

Percentile aggregation. `field` must be `latency` or `node_latency`; `n` must be one of `50`, `75`, `95`, `99`. Anything else raises [`AnalyticsInvalidQuery`](#errors).

### `raw_aggregate`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Query.raw_aggregate(
      operations: list[AggregationOperation],
      group_by: list[GroupBy | str] | None = None,
      interval: Interval | str | None = None,
  ) -> AggregationResult
  ```

  ```python Async theme={"languages":{}}
  async Query.araw_aggregate(
      operations: list[AggregationOperation],
      group_by: list[GroupBy | str] | None = None,
      interval: Interval | str | None = None,
  ) -> AggregationResult
  ```
</CodeGroup>

Run multiple `(field, op)` operations — and optional group-by — in a single API round-trip. Each operation is an [`AggregationOperation`](#aggregationoperation). Aggregations can't filter by data columns (`status`, `error_message`, `latency`, …); filter on scope fields, or pre-filter with `.events()` / `.table()` instead.

## Count, events, and traces

### `count`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Query.count() -> EventCount
  ```

  ```python Async theme={"languages":{}}
  async Query.acount() -> EventCount
  ```
</CodeGroup>

Number of matching events. Returns [`EventCount`](#eventcount).

### `events`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Query.events(limit: int | None = None, offset: int | None = None) -> EventPage
  ```

  ```python Async theme={"languages":{}}
  async Query.aevents(limit: int | None = None, offset: int | None = None) -> EventPage
  ```
</CodeGroup>

Paginated event list. `limit` / `offset` default to the values set on `Analytics.query(...)`; override per-call. Returns an [`EventPage`](#eventpage).

### `traces`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Query.traces(limit: int | None = None, offset: int | None = None) -> list[Trace]
  ```

  ```python Async theme={"languages":{}}
  async Query.atraces(limit: int | None = None, offset: int | None = None) -> list[Trace]
  ```
</CodeGroup>

Page through events and group them by `trace_id`, returning a list of [`Trace`](#trace). For the complete tree of a single trace, use [`Analytics.trace(trace_id)`](#trace).

## Data tables and export

### `table`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Query.table(
      columns: list[EventField | str],
      include_interface_data: bool = False,
      return_record_count: bool = False,
      limit: int | None = None,
      offset: int | None = None,
  ) -> DataTableResult
  ```

  ```python Async theme={"languages":{}}
  async Query.atable(...) -> DataTableResult
  ```
</CodeGroup>

Project specific [`EventField`](#eventfield) columns into a flat data table. Set `include_interface_data=True` to attach per-run interface payloads, `return_record_count=True` to populate `total_records`. Returns a [`DataTableResult`](#datatableresult).

### `export`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Query.export(format: ExportFormat | str, file_name: str) -> ExportTask
  ```

  ```python Async theme={"languages":{}}
  async Query.aexport(format: ExportFormat | str, file_name: str) -> ExportTask
  ```
</CodeGroup>

Kick off a server-side export (`CSV`, `XLSX`, or `JSON`). Fire-and-forget — returns an [`ExportTask`](#exporttask) that may already be `ready`, or `pending` with a `task_id` to poll.

### `export_and_wait`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Query.export_and_wait(
      format: ExportFormat | str,
      file_name: str,
  ) -> ExportTask
  ```

  ```python Async theme={"languages":{}}
  async Query.aexport_and_wait(...) -> ExportTask
  ```
</CodeGroup>

Runs the export server-side and returns the `ExportTask` with a `download_url`. Raises [`AnalyticsExportFailed`](#errors) if the task ends in `failed`.

## Filter helpers

Use these when operator overloads and equality kwargs aren't enough (OR groups, explicit construction). All are frozen dataclasses.

### `Filter`

Top-level **scope** filter — for scope-category [`EventField`](#eventfield) members (`OBJECT_ID`, `TRACE_ID`, `PROJECT_ID`, `EXECUTION_ID`, …).

```python theme={"languages":{}}
Filter.eq(column: EventField, value: Any) -> Filter
Filter.in_(column: EventField, values: list[Any]) -> Filter
```

Calling `Filter.eq` on a data-column field raises `TypeError` with a redirect to `FieldFilter`.

### `FieldFilter`

**Data-column** filter — for data-category fields (`STATUS`, `ERROR_MESSAGE`, `EVENT_START_TIME`, `INTERFACE_TYPE`, …).

```python theme={"languages":{}}
FieldFilter.eq(column, value)        FieldFilter.gt(column, value)
FieldFilter.gte(column, value)       FieldFilter.lt(column, value)
FieldFilter.lte(column, value)       FieldFilter.matches(column, pattern)
FieldFilter.includes(column, values)
```

### `FilterGroup`

```python theme={"languages":{}}
FilterGroup(
    filters: list[Filter | FieldFilter | FilterGroup],
    op: LogicalOp = LogicalOp.AND,
)
```

A group of filters joined by a `LogicalOp`. Nested `FilterGroup` trees are not yet representable on the wire in v1 — a flat OR group is the supported case.

### `EventField` operators

Every [`EventField`](#eventfield) supports operator overloading, dispatched to the right `Filter` / `FieldFilter` automatically:

| Expression                    | Builds                                         |
| ----------------------------- | ---------------------------------------------- |
| `field == value`              | equality                                       |
| `field > / >= / < / <= value` | comparison (data columns)                      |
| `field.in_([…])`              | `IN` (scope) / `INCLUDES` (data)               |
| `field.matches("pattern")`    | regex / substring match                        |
| `field.includes([…])`         | compound `INCLUDES`                            |
| `field != value`              | **unsupported** — raises `NotImplementedError` |

## Types

Terminals return `TypedDict`s. Access them as dicts (`event["status"]`, `page.get("events", [])`). Event dicts come straight off the wire as proto-JSON, so their keys are **camelCase** (`event["spanId"]`, `event.get("traceId")`) — read values by the camelCase key shown below. The typed `Event` TypedDict declares snake\_case field names, but the wire returns camelCase, so always index by the camelCase key.

### `Event`

One annotated event. Common keys (all optional):

<ParamField path="spanId" type="str" />

<ParamField path="parentSpanId" type="str" />

<ParamField path="traceId" type="str" />

<ParamField path="spanKind" type="str">
  Wire value, e.g. `"pipeline.run"` — see [`EventKind`](#eventkind).
</ParamField>

<ParamField path="startTime" type="str">
  RFC3339 timestamp.
</ParamField>

<ParamField path="endTime" type="str">
  RFC3339 timestamp.
</ParamField>

<ParamField path="status" type="str">
  `"success"` / `"failure"` / `"in_progress"`.
</ParamField>

<ParamField path="objectId" type="str" />

<ParamField path="statusMessage" type="str" />

<ParamField path="interfaceType" type="str" />

<ParamField path="interfaceName" type="str" />

<ParamField path="modelId" type="str" />

<ParamField path="nodeType" type="str" />

<ParamField path="latency" type="float" />

<ParamField path="nodeLatency" type="float" />

Also present when populated: `objectInfo`, `spanAttributes`, `interfaceData`, `source`, `caller`, `sessionName`, `sessionUsers`, `sessionSource`, `sessionCollection`, `sessionAiSource`, `projectId`, `executionId`.

### `EventPage`

<ParamField path="events" type="list[Event]" required />

<ParamField path="pagination_meta" type="PaginationMeta" default="—">
  `results_per_page`, `page_number`, `offset`, `total_records` (all optional).
</ParamField>

### `EventCount`

<ParamField path="count" type="int" required />

### `AggregationResult`

<ParamField path="buckets" type="list[AggregationBucket]" required />

### `AggregationBucket`

<ParamField path="label" type="str">
  Slice value — ISO timestamp, model id, etc.
</ParamField>

<ParamField path="value" type="float">
  The aggregate for this slice.
</ParamField>

<ParamField path="nested" type="list[AggregationBucket]">
  Populated for multi-dimensional group-by.
</ParamField>

### `DataTableResult`

<ParamField path="rows" type="list[DataTableRow]" required>
  Each row is `{ "values": { <column_label>: <cell> } }`.
</ParamField>

<ParamField path="columns" type="list[dict[str, str]]" required>
  Column descriptors.
</ParamField>

<ParamField path="total_records" type="int" default="—">
  Present when `return_record_count=True`.
</ParamField>

### `Trace`

<ParamField path="trace_id" type="str" required />

<ParamField path="events" type="list[Event]" required />

### `RunData`

Per-run interface detail. Exactly one key is populated, matching the resource type:

<ParamField path="chatbot" type="dict[str, Any]">
  Conversation detail.
</ParamField>

<ParamField path="search" type="dict[str, Any]" />

<ParamField path="form" type="dict[str, Any]" />

<ParamField path="voicebot" type="dict[str, Any]" />

<ParamField path="session" type="dict[str, Any]" />

### `ExportTask`

<ParamField path="task_id" type="str" />

<ParamField path="status" type="str">
  Response status — `"success"` / `"failed"`.
</ParamField>

<ParamField path="task_status" type="str">
  Task lifecycle — `"pending"` / `"ready"` / `"failed"`.
</ParamField>

<ParamField path="download_url" type="str" />

<ParamField path="format" type="str" />

<ParamField path="file_name" type="str" />

<ParamField path="error" type="str" />

### `AggregationOperation`

One `(field, op)` pair for `raw_aggregate(operations=[…])`.

<ParamField path="field" type="AggregationField | str" required />

<ParamField path="op" type="AggregationOp | Percentile" required>
  An [`AggregationOp`](#aggregationop) member or a `Percentile(n)` value object.
</ParamField>

### `Percentile`

<ParamField path="n" type="int" required>
  One of `50`, `75`, `95`, `99`. Any other value raises `ValueError`.
</ParamField>

## Enums

### `AggregationField`

`runs` · `tokens` · `model_costs` · `latency` · `ai_credits` · `errors` · `node_latency` · `feedback` · `users` · `start_time` · `end_time` · `create` · `add_message`

### `AggregationOp`

`SUM` · `MEAN` · `MIN` · `MAX` · `COUNT_DISTINCT`

(Percentile carries a value — use the [`Percentile(n)`](#percentile) value object, not this enum.)

### `GroupBy`

`TIME` · `MODEL_ID` · `PIPELINE_ID` · `FEEDBACK_TYPE` · `SEARCH_TYPE` · `NODE_TYPE`

### `Interval`

`HOUR` · `DAY` · `WEEK` · `MONTH` · `YEAR`

### `EventField`

The unified column enum. **Scope** fields (for `Filter`): `OBJECT_ID` · `PARENT_EVENT_ID` · `OBJECT_INFO` · `EVENT_ID` · `TRACE_ID` · `SESSION_SOURCE` · `SESSION_COLLECTION` · `PROJECT_ID` · `EXECUTION_ID`.

**Data** fields (for `FieldFilter`): `SOURCE` · `EVENT_START_TIME` · `EVENT_END_TIME` · `STATUS` · `EVENT_ATTRIBUTES` · `CALLER` · `INTERFACE_DATA` · `INTERFACE_TYPE` · `INTERFACE_NAME` · `ERROR_MESSAGE` · `SESSION_NAME` · `SESSION_LAST_MESSAGE_TIME` · `SESSION_USERS` · `SESSION_AI_SOURCE`.

**Aggregation / group-by only** (not filterable): `LATENCY` · `MODEL_ID` · `NODE_TYPE`.

### `EventKind`

Span types, flattened across all eight entities. Selected members:

* **Pipeline:** `PIPELINE_ALL` · `PIPELINE_RUN` · `PIPELINE_BULK_RUN`
* **Chatbot:** `CHATBOT_ALL` · `CHATBOT_RUN` · `CHATBOT_FILE_UPLOAD` · `CHATBOT_TERMINATE` · `CHATBOT_MESSAGE_LIKE` · `CHATBOT_FETCH_KB_DATA`
* **Search:** `SEARCH_ALL` · `SEARCH_RUN` · `SEARCH_CHAT_WITH_DOCS` · `SEARCH_DOC_QNA` · `SEARCH_MESSAGE_FEEDBACK` · `SEARCH_TERMINATE` · `SEARCH_FETCH_KB_DATA`
* **Form:** `FORM_ALL` · `FORM_RUN` · `FORM_CHAT`
* **Voicebot:** `VOICEBOT_ALL` · `VOICEBOT_RUN`
* **Bulk job:** `BULKJOB_RUN` · `BULKJOB_FETCH_KB_DATA` · `BULKJOB_IO_NODES`
* **Session:** `SESSION_ALL` · `SESSION_CREATE` · `SESSION_ADD_MESSAGE`
* **Portal:** `PORTAL_CREATE`

### `EventStatus`

`SUCCESS` · `FAILURE` · `IN_PROGRESS`

### `ExportFormat`

`JSON` · `CSV` · `XLSX`

### `FieldOp`

Scope-filter operators: `EQ` · `IN`

### `FieldFilterOp`

Data-column operators: `EQ` · `LT` · `LTE` · `GT` · `GTE` · `MATCHES` · `INCLUDES`

### `LogicalOp`

`AND` · `OR`

## Errors

The analytics module raises a small set of typed errors. All subclass `AnalyticsError`, which subclasses `VectorshiftError`.

* `AnalyticsNotFound` — a trace, event, or export-task lookup returned no result.
* `AnalyticsInvalidQuery` — the query was malformed before dispatch (naive datetime, unfilterable field, bad enum, missing kwarg, unsupported aggregation range).
* `AnalyticsExportFailed` — an export task ended in `failed`; carries `.task_id` and `.export_error`.
* `AnalyticsExportTimeout` — polling for an export exceeded the `timeout`; also subclasses `TimeoutError`.

See the top-level [Errors page](/sdk/errors) for the broader hierarchy.

## What's next

<Columns cols={3}>
  <Card title="Overview" icon="chart-line" href="/sdk/analytics/overview">
    Mental model and quick start.
  </Card>

  <Card title="Filters & overloads" icon="filter" href="/sdk/analytics/examples/filters-and-overloads">
    Every filter form, side by side.
  </Card>

  <Card title="Events & traces" icon="list-tree" href="/sdk/analytics/examples/events-and-traces">
    List events, drill into a trace, fetch run detail.
  </Card>
</Columns>
