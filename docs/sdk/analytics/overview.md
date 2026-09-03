> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Analytics overview

> Query runs, tokens, costs, latency, errors, and traces across every Pipeline, Chatbot, Agent, Form, and Session from Python.

The `Analytics` class is the SDK surface for VectorShift's observability data — the same runs, costs, latency, and traces you see in the platform dashboards, available as a chainable query API. Aggregate metrics, list and filter events, drill into a single trace, project a data table, or kick off a long-running export — directly from Python.

<Info>
  **Prerequisites:** [Installed SDK](/sdk/installation) · [API key set](/sdk/authentication) · Python 3.10+.
</Info>

## Mental model

* Everything that runs on VectorShift emits **events** (the wire format calls them spans). An event is one Pipeline run, Chatbot message, KB fetch, Form submission, Session message, etc. — each carrying status, latency, token counts, costs, and a `trace_id` that links it to siblings.
* There's **one entry point**: `Analytics.query(...)` returns an immutable, chainable [`Query`](/sdk/analytics/reference#query). Scope it by object and event kind, refine it with `.where(...)` and `.group_by(...)`, then call a **terminal** (`.count()`, `.sum(...)`, `.events()`, `.table(...)`, `.export(...)`) to make the HTTP call and get a typed result.
* **Time scoping is a `.where()` predicate** — `q.where(EventField.EVENT_START_TIME > cutoff)`. There is no `since=` / `start=` / `end=` shortcut. Datetimes must be timezone-aware. Aggregations (`sum`, `mean`, `percentile`, `raw_aggregate`, …) **require** a lower time bound, or they raise `AnalyticsInvalidQuery`.
* **Scope is a single object.** `object=` / `object_ids=` take one resource or one id. To analyse several, query each and merge client-side — passing more than one raises `AnalyticsInvalidQuery`.
* **Single-object lookups** live outside the chain: `Analytics.trace(trace_id)`, `Analytics.event(event_id)`, and `Analytics.run(object=…, run_id=…)`.
* Every terminal has an **async sibling** (`acount`, `aevents`, `asum`, `atable`, `aexport`, …), and `Analytics.aquery(...)` returns a `Query` whose terminals route to them.

<Tip>
  **Pagination is the data-volume guardrail.** `Analytics.query(limit=50, offset=0)` defaults flow through to every paginated terminal (`events`, `traces`, `table`) and cap how much comes back when no time filter is set. Always time-bound dashboards with `.where(EventField.EVENT_START_TIME > …)`.
</Tip>

## Quick start

<CodeGroup>
  ```python Sync theme={"languages":{}}
  from datetime import datetime, timedelta, timezone

  from vectorshift import Analytics
  from vectorshift.analytics import EventField

  # Scope: org-wide, last 7 days (time bound via .where()).
  q = Analytics.query().where(
      EventField.EVENT_START_TIME > datetime.now(timezone.utc) - timedelta(days=7)
  )

  # Terminals make the call and return typed results.
  print(f"runs:         {q.count()['count']}")
  print(f"total tokens: {q.sum('tokens')}")
  print(f"mean latency: {q.mean('latency'):.2f} ms")
  print(f"failures:     {q.where(status='failure').count()['count']}")
  ```

  ```python Async theme={"languages":{}}
  import asyncio
  from datetime import datetime, timedelta, timezone

  from vectorshift import Analytics
  from vectorshift.analytics import EventField

  async def main():
      q = Analytics.aquery().where(
          EventField.EVENT_START_TIME > datetime.now(timezone.utc) - timedelta(days=7)
      )

      # Fan out a dashboard concurrently.
      runs, failures, latency = await asyncio.gather(
          q.acount(),
          q.where(status="failure").acount(),
          q.amean("latency"),
      )
      print(f"runs:         {runs['count']}")
      print(f"failures:     {failures['count']}")
      print(f"mean latency: {latency:.2f} ms")

  asyncio.run(main())
  ```
</CodeGroup>

## Scoping a query

| Scope                 | How                                                             | Use when                                                     |
| --------------------- | --------------------------------------------------------------- | ------------------------------------------------------------ |
| Org-wide              | `Analytics.query()`                                             | Account-level dashboards                                     |
| All objects of a type | `Analytics.query(object_type="pipeline")`                       | "All my pipelines this week"                                 |
| A typed resource      | `Analytics.query(object=pipeline)`                              | You have the `Pipeline` / `Chatbot` / `Agent` object in hand |
| A specific id         | `Analytics.query(object_type="chatbot", object_ids=["cb_123"])` | You only have the raw id                                     |
| By event kind         | `Analytics.query(kinds=[EventKind.PIPELINE_RUN])`               | Narrow to one span type                                      |

Passing a resource to `object=` reads its `.id` (and derives `object_type` from the class name) automatically. Scope resolves to a **single** object — `object=[p1, p2]` or `object_ids=["a", "b"]` raises `AnalyticsInvalidQuery`; loop and merge instead. Time is always a `.where(EventField.EVENT_START_TIME …)` predicate on top.

## Terminals

| Terminal                        | Returns                                                                                 | What it does                                                                                        |
| ------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `count()`                       | [`EventCount`](/sdk/analytics/reference#eventcount)                                     | Number of matching events                                                                           |
| `sum` / `mean` / `min` / `max`  | `float`                                                                                 | One-shot scalar aggregation over an [`AggregationField`](/sdk/analytics/reference#aggregationfield) |
| `count_distinct`                | `int`                                                                                   | Distinct count                                                                                      |
| `percentile(field, n)`          | `float`                                                                                 | p50/p75/p95/p99 — `latency` / `node_latency` only                                                   |
| `group_by(...).<agg>(...)`      | `dict[str, float]` or [`AggregationResult`](/sdk/analytics/reference#aggregationresult) | Bucketed aggregation (single-dim → flat dict, multi-dim → nested result)                            |
| `raw_aggregate(operations=[…])` | [`AggregationResult`](/sdk/analytics/reference#aggregationresult)                       | Multiple metrics + group-by in one round-trip                                                       |
| `events(limit, offset)`         | [`EventPage`](/sdk/analytics/reference#eventpage)                                       | Paginated event list                                                                                |
| `traces(limit, offset)`         | `list[Trace]`                                                                           | Events grouped by `trace_id`                                                                        |
| `table(columns=[…])`            | [`DataTableResult`](/sdk/analytics/reference#datatableresult)                           | Column-projected rows                                                                               |
| `export` / `export_and_wait`    | [`ExportTask`](/sdk/analytics/reference#exporttask)                                     | Long-running CSV / XLSX / JSON export                                                               |

## Filtering

`.where(...)` accepts three intermixable forms:

* **Equality kwargs** — `q.where(status="failure", interface_type="chatbot")`. Shortest for the common case.
* **Operator overloading on `EventField`** — `q.where(EventField.EVENT_START_TIME > cutoff, EventField.ERROR_MESSAGE.matches("rate limit"))`. SQLAlchemy / Peewee style.
* **Dataclass helpers** — `Filter` (scope fields), `FieldFilter` (data columns), and `FilterGroup` for OR groups via `logical_op=LogicalOp.OR`.

Chained `.where()` calls AND together. `EventField.LATENCY`, `MODEL_ID`, and `NODE_TYPE` are aggregation / group-by dimensions only — use them in `.sum/.mean/.percentile` or `.group_by(...)`, not in `.where(...)`.

## What's next

<Columns cols={3}>
  <Card title="Reference" icon="book-open" href="/sdk/analytics/reference">
    Every public method, filter, type, and enum.
  </Card>

  <Card title="Query basics example" icon="code" href="/sdk/analytics/examples/query-basics">
    Scope, time-bound, and run your first terminals.
  </Card>

  <Card title="Aggregations & group-by" icon="chart-column" href="/sdk/analytics/examples/aggregations-and-groupby">
    Every aggregation terminal, single- and multi-dim.
  </Card>
</Columns>
