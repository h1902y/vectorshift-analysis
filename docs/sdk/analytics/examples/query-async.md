> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Async API

> Use the async siblings of every terminal — aquery, acount, amean — and fan out a dashboard with asyncio.gather.

**What this builds.** A 3-metric dashboard fetched concurrently.
**You'll end up with.** Runs, failures, and mean latency for the last 7 days, all three calls issued in parallel via `asyncio.gather`.

```python theme={"languages":{}}
"""
Async pairs — every terminal has an `a*` sibling.

Same surface as query-basics, but using `aquery` and `acount` / `amean`.
Useful for fanning out multiple queries concurrently.
"""

import asyncio
from datetime import datetime, timedelta, timezone

from vectorshift import Analytics
from vectorshift.analytics import EventField


async def dashboard():
    """Fetch a 3-metric dashboard in parallel."""
    q = Analytics.aquery().where(
        EventField.EVENT_START_TIME > datetime.now(timezone.utc) - timedelta(days=7)
    )

    runs, failures, latency = await asyncio.gather(
        q.acount(),
        q.where(status="failure").acount(),
        q.amean("latency"),
    )

    print(f"runs:         {runs['count']}")
    print(f"failures:     {failures['count']}")
    print(f"mean latency: {latency:.2f} ms")


async def main():
    await dashboard()
    print("Done.")


if __name__ == "__main__":
    asyncio.run(main())
```

## Expected output

```text theme={"languages":{}}
runs:         ...
failures:     ...
mean latency: ... ms
Done.
```

`Analytics.aquery(...)` returns a `Query` whose terminals route to the `a*` pairs — every sync terminal in the reference has an `a`-prefixed sibling (`acount`, `aevents`, `asum`, `atable`, `aexport`, …).

## See also

<Columns cols={3}>
  <Card title="Query basics" icon="code" href="/sdk/analytics/examples/query-basics">
    The sync version of these scopes and terminals.
  </Card>

  <Card title="Aggregations & group-by" icon="chart-column" href="/sdk/analytics/examples/aggregations-and-groupby">
    Bucket metrics by model, time, and more.
  </Card>

  <Card title="Reference" icon="book-open" href="/sdk/analytics/reference">
    Every public method.
  </Card>
</Columns>
