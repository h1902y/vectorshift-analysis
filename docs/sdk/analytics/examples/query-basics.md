> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Query basics

> Scope a query, bound it in time via .where(), and run the simplest terminals — count, sum, mean, max.

**What this builds.** A tour of the ways to scope an analytics query and the simplest terminals.
**You'll end up with.** Event counts and scalar metrics for org-wide, by-type, and explicit-window scopes — with time always expressed as a `.where(EventField.EVENT_START_TIME …)` predicate.

```python theme={"languages":{}}
"""
Analytics query basics — scope, time-via-where, simple terminals.

Time scoping is a regular `.where(EventField.EVENT_START_TIME ...)` predicate;
there are no convenience kwargs on `Analytics.query(...)`. Pagination defaults
(limit=50, offset=0) on `Analytics.query()` are the data-volume guardrail.
"""

from datetime import datetime, timedelta, timezone

from vectorshift import Analytics
from vectorshift.analytics import EventField

# 1. Org-wide, last 24h (time bound via .where()).
print("1. Org-wide, last 24h:")
n = (
    Analytics.query()
    .where(EventField.EVENT_START_TIME > datetime.now(timezone.utc) - timedelta(hours=24))
    .count()
)
print(f"   total events: {n['count']}")

# 2. All objects of a type ("all my pipelines this week").
print("2. All pipelines, last 7d:")
n = (
    Analytics.query(object_type="pipeline")
    .where(EventField.EVENT_START_TIME > datetime.now(timezone.utc) - timedelta(days=7))
    .count()
)
print(f"   pipeline events: {n['count']}")

# 3. Org-wide, all-time (no scope, no time filter).
print("3. Org-wide, all-time:")
n = Analytics.query().count()
print(f"   all events ever: {n['count']}")

# 4. Explicit datetime window.
print("4. Explicit datetime window:")
end = datetime.now(timezone.utc)
start = end.replace(hour=0, minute=0, second=0, microsecond=0)
n = (
    Analytics.query()
    .where(
        EventField.EVENT_START_TIME >= start,
        EventField.EVENT_START_TIME <= end,
    )
    .count()
)
print(f"   since midnight UTC: {n['count']}")

# 5. Simple aggregations on a reused, time-bound query.
print("5. Simple aggregations (org-wide, last 7d):")
q = Analytics.query().where(
    EventField.EVENT_START_TIME > datetime.now(timezone.utc) - timedelta(days=7)
)
print(f"   runs:         {q.sum('runs')}")
print(f"   mean latency: {q.mean('latency'):.2f} ms")
print(f"   max latency:  {q.max('latency'):.2f} ms")
```

## Expected output

```text theme={"languages":{}}
1. Org-wide, last 24h:
   total events: ...
2. All pipelines, last 7d:
   pipeline events: ...
3. Org-wide, all-time:
   all events ever: ...
4. Explicit datetime window:
   since midnight UTC: ...
5. Simple aggregations (org-wide, last 7d):
   runs:         ...
   mean latency: ... ms
   max latency:  ... ms
```

Datetimes must be timezone-aware — pass `datetime.now(timezone.utc)`, not a naive `datetime`, or the SDK raises `AnalyticsInvalidQuery`.

## See also

<Columns cols={3}>
  <Card title="Async pairs" icon="zap" href="/sdk/analytics/examples/query-async">
    The same surface with `aquery` + `acount` / `amean`.
  </Card>

  <Card title="Filters & overloads" icon="filter" href="/sdk/analytics/examples/filters-and-overloads">
    Every way to refine a query with `.where(...)`.
  </Card>

  <Card title="Reference" icon="book-open" href="/sdk/analytics/reference">
    Every public method.
  </Card>
</Columns>
