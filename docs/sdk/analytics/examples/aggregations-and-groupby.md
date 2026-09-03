> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Aggregations & group-by

> Every aggregation terminal — sum, mean, min, max, count_distinct, percentile — plus single- and multi-dim group_by and multi-op raw_aggregate.

**What this builds.** A complete pass over the aggregation surface.
**You'll end up with.** Scalar metrics, percentiles, per-model breakdowns, time-bucketed series, and a single multi-metric `raw_aggregate` round-trip.

```python theme={"languages":{}}
"""
Aggregations, group-by, and multi-op raw_aggregate.

Covers every aggregation terminal:
  - one-shot: sum / mean / min / max / count_distinct / percentile
  - group-by: single-dim (returns dict) and multi-dim (returns AggregationResult)
  - raw_aggregate: multi-op + group_by in one round-trip
"""

from datetime import datetime, timedelta, timezone

from vectorshift import Analytics
from vectorshift.analytics import (
    AggregationField,
    AggregationOp,
    AggregationOperation,
    EventField,
    GroupBy,
    Interval,
    Percentile,
)

q = Analytics.query().where(
    EventField.EVENT_START_TIME > datetime.now(timezone.utc) - timedelta(days=7)
)

# 1. One-shot scalar aggregations.
print("1. One-shot scalars (org-wide, last 7d):")
print(f"   runs:         {q.sum('runs')}")
print(f"   mean latency: {q.mean('latency'):.2f}")
print(f"   max latency:  {q.max('latency'):.2f}")
print(f"   unique users: {q.count_distinct('users')}")

# 2. Percentile — only valid on latency / node_latency.
print("2. Percentiles on latency:")
for n in (50, 95, 99):
    print(f"   p{n}: {q.percentile('latency', n):.2f}")

# 3. Single-dim group-by — returns dict[str, float].
print("3. Group by model_id (single-dim → flat dict):")
per_model = q.group_by(GroupBy.MODEL_ID).sum("tokens")
for model, tokens in per_model.items():
    print(f"   {model}: {tokens}")

# 4. Multi-dim group-by — returns AggregationResult.
print("4. Group by [time, model_id] interval=HOUR (multi-dim → AggregationResult):")
hourly = q.group_by([GroupBy.TIME, GroupBy.MODEL_ID], interval=Interval.HOUR).sum("runs")
print(f"   top-level buckets: {len(hourly['buckets'])}")

# 5. raw_aggregate — multiple metrics + group_by in one API call.
print("5. raw_aggregate (one round-trip for 3 metrics):")
result = q.raw_aggregate(
    operations=[
        AggregationOperation(field=AggregationField.RUNS, op=AggregationOp.SUM),
        AggregationOperation(field=AggregationField.LATENCY, op=AggregationOp.MEAN),
        AggregationOperation(field=AggregationField.LATENCY, op=Percentile(95)),
    ],
    group_by=[GroupBy.MODEL_ID],
)
print(f"   buckets returned: {len(result['buckets'])}")
```

## Expected output

```text theme={"languages":{}}
1. One-shot scalars (org-wide, last 7d):
   runs:         ...
   mean latency: ...
   max latency:  ...
   unique users: ...
2. Percentiles on latency:
   p50: ...
   p95: ...
   p99: ...
3. Group by model_id (single-dim → flat dict):
   <model>: ...
4. Group by [time, model_id] interval=HOUR (multi-dim → AggregationResult):
   top-level buckets: ...
5. raw_aggregate (one round-trip for 3 metrics):
   buckets returned: ...
```

`percentile` accepts only `latency` / `node_latency` and `n` in `(50, 75, 95, 99)`. A single-dim `group_by(...)` flattens to a `dict[str, float]`; add a second dimension and you get an `AggregationResult` with nested buckets. `group_by(GroupBy.TIME, ...)` requires an `interval`.

## See also

<Columns cols={3}>
  <Card title="Query basics" icon="code" href="/sdk/analytics/examples/query-basics">
    Scope before you aggregate.
  </Card>

  <Card title="Table & export" icon="table" href="/sdk/analytics/examples/table-and-export">
    Project raw rows and export them.
  </Card>

  <Card title="Reference" icon="book-open" href="/sdk/analytics/reference">
    `AggregationField`, `GroupBy`, `Interval`, `Percentile`.
  </Card>
</Columns>
