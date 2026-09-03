> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Data tables & export

> Project specific columns into a flat table, then export results to CSV / XLSX — fire-and-forget or blocking.

**What this builds.** A column-projected data table plus two export styles.
**You'll end up with.** A 20-row table of failed events, a fire-and-forget CSV export task, and a blocking XLSX export that returns a download URL.

```python theme={"languages":{}}
"""
Data tables + long-running exports.

Covers:
  - q.table(columns=[...]) — column-projected data table
  - q.export(format=, file_name=) — fire-and-forget export
  - q.export_and_wait(...) — blocking polling variant
"""

from datetime import datetime, timedelta, timezone

from vectorshift import Analytics
from vectorshift.analytics import EventField, ExportFormat

_now = datetime.now(timezone.utc)
_last_7d = _now - timedelta(days=7)
_last_30d = _now - timedelta(days=30)

# 1. Project specific columns from failed events.
print("1. Data table — project interface_name / status / error_message:")
result = (
    Analytics.query()
    .where(EventField.EVENT_START_TIME > _last_7d)
    .where(status="failure")
    .table(
        columns=[
            EventField.INTERFACE_NAME,
            EventField.EVENT_START_TIME,
            EventField.STATUS,
            EventField.ERROR_MESSAGE,
        ],
        include_interface_data=True,
        return_record_count=True,
        limit=20,
    )
)
print(f"   rows: {len(result.get('rows', []))}, total: {result.get('total_records', '?')}")

# 2. Export to CSV (fire-and-forget — task may be ready immediately).
print("2. Export failures to CSV (immediate task):")
task = (
    Analytics.query()
    .where(EventField.EVENT_START_TIME > _last_30d)
    .where(status="failure")
    .export(format=ExportFormat.CSV, file_name="failures-30d.csv")
)
print(f"   task_id={task.get('task_id')}  status={task.get('task_status')}")

# 3. Export + block — clean for scripts that need the file path immediately.
print("3. Export + wait (blocking variant):")
done = (
    Analytics.query()
    .where(EventField.EVENT_START_TIME > _last_30d)
    .where(status="failure")
    .export_and_wait(
        format=ExportFormat.XLSX,
        file_name="failures-30d.xlsx",
        timeout=120,
    )
)
print(f"   final status: {done.get('task_status')}")
url = done.get("download_url")
if url:
    print(f"   download_url: {url[:60]}...")
```

## Expected output

```text theme={"languages":{}}
1. Data table — project interface_name / status / error_message:
   rows: ..., total: ...
2. Export failures to CSV (immediate task):
   task_id=...  status=...
3. Export + wait (blocking variant):
   final status: ready
   download_url: https://...
```

`export(...)` is fire-and-forget — poll the returned `task_id` yourself, or use `export_and_wait(...)`, which blocks until the task is `ready` and raises `AnalyticsExportFailed` / `AnalyticsExportTimeout` on failure or timeout.

## See also

<Columns cols={3}>
  <Card title="Aggregations & group-by" icon="chart-column" href="/sdk/analytics/examples/aggregations-and-groupby">
    Summarise instead of projecting rows.
  </Card>

  <Card title="Events & traces" icon="list-tree" href="/sdk/analytics/examples/events-and-traces">
    Page raw events without column projection.
  </Card>

  <Card title="Reference" icon="book-open" href="/sdk/analytics/reference">
    `table`, `export`, `export_and_wait`, `ExportFormat`.
  </Card>
</Columns>
