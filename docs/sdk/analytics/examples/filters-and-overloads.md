> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Filters & overloads

> The three filter forms — equality kwargs, operator overloading on EventField, and Filter / FieldFilter dataclasses with OR groups.

**What this builds.** A side-by-side tour of every way to refine a query with `.where(...)`.
**You'll end up with.** The same kinds of failure/interface filters expressed as equality kwargs, operator overloads, regex matches, OR groups, and chained ANDs.

```python theme={"languages":{}}
"""
Filter forms — equality kwargs, operator overloading, dataclasses.

Three ways to refine a Query with `.where(...)`:
  - equality kwargs:      q.where(status="failure")
  - operator overloading: q.where(EventField.EVENT_START_TIME > cutoff)
  - dataclass helpers:    q.where(FieldFilter.eq(...), logical_op=LogicalOp.OR)

Chained `.where(...)` calls AND together. `logical_op=LogicalOp.OR` wraps the
positional args of a single `.where(...)` in an OR group.

Note: EventField.LATENCY / MODEL_ID / NODE_TYPE are aggregation / group-by
dimensions only — they can't appear in `.where(...)`. Use them in
q.sum/.mean/.percentile/... or in q.group_by(...) instead.
"""

from datetime import datetime, timedelta, timezone

from vectorshift import Analytics
from vectorshift.analytics import (
    EventField,
    EventStatus,
    FieldFilter,
    LogicalOp,
)

cutoff_7d = datetime.now(timezone.utc) - timedelta(days=7)
q = Analytics.query().where(EventField.EVENT_START_TIME > cutoff_7d)

# 1. Equality kwargs — shortest form for the common case.
print("1. Equality kwargs (status='failure', interface_type='chatbot'):")
n = q.where(status="failure", interface_type="chatbot").count()
print(f"   {n['count']}")

# 2. Operator overloading — full Python operator vocabulary on EventField.
print("2. Operator overloading (event_start_time > 1d ago, interface_type in [...]):")
cutoff_1d = datetime.now(timezone.utc) - timedelta(days=1)
n = q.where(
    EventField.EVENT_START_TIME > cutoff_1d,
    EventField.INTERFACE_TYPE.in_(["chatbot", "form", "voicebot"]),
).count()
print(f"   {n['count']}")

# 3. Regex / substring match via .matches().
print("3. error_message.matches('rate limit'):")
n = q.where(EventField.ERROR_MESSAGE.matches("rate limit")).count()
print(f"   {n['count']}")

# 4. Dataclass helpers + OR group via logical_op=.
# STATUS and ERROR_MESSAGE are both data-column fields → use FieldFilter.
print("4. status=failure OR error_message.matches('timeout')  (logical_op=OR):")
n = q.where(
    FieldFilter.eq(EventField.STATUS, EventStatus.FAILURE),
    FieldFilter.matches(EventField.ERROR_MESSAGE, "timeout"),
    logical_op=LogicalOp.OR,
).count()
print(f"   {n['count']}")

# 5. Chained .where() — AND combination across multiple calls.
print("5. Chained AND (status=failure AND interface_type='chatbot' AND matches('error')):")
n = (
    q.where(status="failure")
    .where(interface_type="chatbot")
    .where(EventField.ERROR_MESSAGE.matches("error"))
    .count()
)
print(f"   {n['count']}")

# 6. Mixing forms in one .where() call (positional args FIRST, kwargs LAST).
print("6. Mixed (operator overload + equality kwarg in one call):")
n = q.where(EventField.EVENT_START_TIME > cutoff_1d, status="failure").count()
print(f"   {n['count']}")
```

## Expected output

```text theme={"languages":{}}
1. Equality kwargs (status='failure', interface_type='chatbot'):
   ...
2. Operator overloading (event_start_time > 1d ago, interface_type in [...]):
   ...
3. error_message.matches('rate limit'):
   ...
4. status=failure OR error_message.matches('timeout')  (logical_op=OR):
   ...
5. Chained AND (status=failure AND interface_type='chatbot' AND matches('error')):
   ...
6. Mixed (operator overload + equality kwarg in one call):
   ...
```

Use `Filter` for scope-level fields (`TRACE_ID`, `PROJECT_ID`, …) and `FieldFilter` for data columns (`STATUS`, `ERROR_MESSAGE`, …). `Filter.eq` on a data column raises a clear `TypeError`. `!=` is not supported and raises `NotImplementedError`.

## See also

<Columns cols={3}>
  <Card title="Query basics" icon="code" href="/sdk/analytics/examples/query-basics">
    Scope and time-bound a query.
  </Card>

  <Card title="Events & traces" icon="list-tree" href="/sdk/analytics/examples/events-and-traces">
    List the events your filters match.
  </Card>

  <Card title="Reference" icon="book-open" href="/sdk/analytics/reference">
    Filter helpers, `EventField` operators, and enums.
  </Card>
</Columns>
