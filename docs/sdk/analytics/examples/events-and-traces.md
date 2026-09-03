> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Events & traces

> List events with pagination, drill into a trace, fetch a single event, and pull per-run interface detail.

**What this builds.** A drill-down from a filtered event list into one trace, one event, and pagination.
**You'll end up with.** The last 24h of failed events, the full trace tree behind the first one, a single-event re-fetch, and a two-page pagination demo.

```python theme={"languages":{}}
"""
Listing events + drilling into traces / single objects.

Covers:
  - q.events() — paginated event list with limit/offset inheritance
  - Analytics.trace(trace_id) — full trace tree
  - Analytics.event(event_id) — single event by id
  - filtering events by trace_id
"""

from datetime import datetime, timedelta, timezone

from vectorshift import Analytics
from vectorshift.analytics import EventField

_last_24h = datetime.now(timezone.utc) - timedelta(hours=24)

# 1. List failed events from the last 24h.
print("1. Failed events in last 24h (first 50):")
page = (
    Analytics.query()
    .where(EventField.EVENT_START_TIME > _last_24h)
    .where(status="failure")
    .events(limit=50)
)
events = page.get("events", [])
print(f"   got {len(events)} events")

if events:
    first = events[0]

    # 2. Drill into the first one's trace.
    trace_id = first.get("traceId", "")  # event dicts use camelCase keys on the wire
    if trace_id:
        print(f"2. Fetching trace {trace_id!r}:")
        trace = Analytics.trace(trace_id)
        print(f"   {len(trace.get('events', []))} events in trace")

    # 3. Single event lookup by id.
    event_id = first.get("spanId", "")
    if event_id:
        print(f"3. Re-fetching event {event_id!r} by id:")
        event = Analytics.event(event_id, trace_id=trace_id)
        print(f"   status: {event.get('status')}")

# 4. Pagination — set defaults on the Query, override per-call.
print("4. Pagination demo (limit=10 → next page via offset):")
q = Analytics.query(limit=10, offset=0).where(EventField.EVENT_START_TIME > _last_24h)
page1 = q.events()            # inherits limit=10, offset=0
page2 = q.events(offset=10)   # next page
print(f"   page1: {len(page1.get('events', []))} events")
print(f"   page2: {len(page2.get('events', []))} events")

# 5. Filter events by trace_id directly (alternative to Analytics.trace).
print("5. Filter events by trace_id using .where():")
if events and events[0].get("traceId"):
    tid = events[0]["traceId"]
    same_trace = (
        Analytics.query()
        .where(EventField.EVENT_START_TIME > _last_24h)
        .where(EventField.TRACE_ID == tid)
        .events()
    )
    print(f"   {len(same_trace.get('events', []))} events with trace_id={tid!r}")
```

## Expected output

```text theme={"languages":{}}
1. Failed events in last 24h (first 50):
   got ... events
2. Fetching trace '...':
   ... events in trace
3. Re-fetching event '...' by id:
   status: failure
4. Pagination demo (limit=10 → next page via offset):
   page1: ... events
   page2: ... events
5. Filter events by trace_id using .where():
   ... events with trace_id='...'
```

`q.traces()` groups a page of events by `trace_id` for you; `Analytics.trace(trace_id)` returns the complete tree for one trace. For per-run interface detail (a chatbot conversation, form submission, etc.) use `Analytics.run(object=…, run_id=…)`.

## See also

<Columns cols={3}>
  <Card title="Filters & overloads" icon="filter" href="/sdk/analytics/examples/filters-and-overloads">
    Narrow the event list before paging it.
  </Card>

  <Card title="Table & export" icon="table" href="/sdk/analytics/examples/table-and-export">
    Project events into columns and export.
  </Card>

  <Card title="Reference" icon="book-open" href="/sdk/analytics/reference">
    `events`, `traces`, `trace`, `event`, `run`.
  </Card>
</Columns>
