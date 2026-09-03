> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Add URLs

> Ingest single pages or recursive crawls into a Knowledge Base with scheduled rescrapes.

**What this builds.** A KB that ingests web content two ways — one URL with AI enhancement, and a recursive crawl bounded by `url_limit`.
**You'll end up with.** A KB holding both ingestion results, with the recursive crawl scheduled to refresh weekly.

```python theme={"languages":{}}
"""
Example 04: Ingest URLs (single page or recursive crawl).

`UrlConfig.recursive=True` promotes a single URL to a recursive crawl
bounded by `url_limit`. Per-item rescrape frequency is set on the URL
config so VectorShift re-crawls on schedule.
"""

from vectorshift.knowledge_base import (
    KnowledgeBase,
    UrlConfig,
    RescrapeFrequency,
)

kb = KnowledgeBase.new(name="SDK urls demo")
print(f"1. Created KB id={kb.id}")

# Single page, no rescrape
single = kb.add_urls_and_wait(
    urls=["https://docs.python.org/3/library/asyncio.html"],
    url_config=UrlConfig(
        recursive=False,
        ai_enhance_content=True,
        rescrape_frequency=RescrapeFrequency.NEVER,
    ),
    timeout=240,
)
print(f"2. Single URL ingested: status={single.status}")

# Recursive crawl, weekly refresh
crawl = kb.add_urls_and_wait(
    urls=["https://docs.python.org/3/library/"],
    url_config=UrlConfig(
        recursive=True,
        url_limit=10,
        ai_enhance_content=False,
        rescrape_frequency=RescrapeFrequency.WEEKLY,
    ),
    timeout=300,
)
print(f"3. Recursive crawl ingested: status={crawl.status}")

kb.delete()
print("4. Deleted KB.")
```

## Expected output

```text theme={"languages":{}}
1. Created KB id=...
2. Single URL ingested: status=...
3. Recursive crawl ingested: status=...
4. Deleted KB.
```

`rescrape_frequency` lives on the URL config, not the KB — different URLs in the same KB can refresh on different schedules.

## See also

<Columns cols={3}>
  <Card title="Add files" icon="file-plus" href="/sdk/knowledge-base/examples/add-files">
    Ingest local files into a KB.
  </Card>

  <Card title="Advanced query" icon="search" href="/sdk/knowledge-base/examples/query-advanced">
    Query with filters, hybrid, rerank, and QA.
  </Card>

  <Card title="KB reference" icon="book-open" href="/sdk/knowledge-base/reference">
    Every public method.
  </Card>
</Columns>
