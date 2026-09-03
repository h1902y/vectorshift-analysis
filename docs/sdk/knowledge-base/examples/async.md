> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Async API

> Use the async siblings of every Knowledge Base method — anew, aadd_files_and_wait, aquery, aintegrations, adelete.

**What this builds.** A single `asyncio.run(main())` that creates a KB, ingests a file, queries it, lists attached integrations, and deletes it — all via `await`.
**You'll end up with.** A round-trip through the most common KB surface using only async methods, suitable as a copy-paste starter for async pipelines.

```python theme={"languages":{}}
"""
Example 10: Async pairs — `aXxx` for every method.

Every public KB method has an async sibling prefixed with `a`. This
example exercises the most common async surface: `KnowledgeBase.anew`,
`aadd_files_and_wait`, `aquery`, `aintegrations`, `adelete`.
"""

import asyncio
import tempfile
from pathlib import Path

from vectorshift.knowledge_base import KnowledgeBase, QaConfig, QaMode


async def main() -> None:
    with tempfile.NamedTemporaryFile(mode="w", suffix=".md", delete=False) as f:
        f.write("# Async demo\n\nAsync file ingestion sample.")
        p = Path(f.name)

    kb = await KnowledgeBase.anew(
        name="SDK async demo",
        embedding_model="text-embedding-3-small",
    )
    print(f"1. anew: id={kb.id}")

    final = await kb.aadd_files_and_wait([p], timeout=120)
    print(f"2. aadd_files_and_wait: status={final.status}")

    res = await kb.aquery(
        "What does the doc say?",
        top_k=3,
        qa=QaConfig(mode=QaMode.FAST, citations=True),
    )
    print(f"3. aquery answer: {res.get('answer', '<none>')}")

    integrations = await kb.aintegrations()
    print(f"4. aintegrations: {len(integrations)} attached")

    await kb.adelete()
    p.unlink(missing_ok=True)
    print("5. adelete done.")


if __name__ == "__main__":
    asyncio.run(main())
```

## Expected output

```text theme={"languages":{}}
1. anew: id=...
2. aadd_files_and_wait: status=...
3. aquery answer: ...
4. aintegrations: 0 attached
5. adelete done.
```

Every public KB method has an `a`-prefixed sibling — the sync example you already wrote ports to async by adding `await` and renaming the call.

## See also

<Columns cols={3}>
  <Card title="KB CRUD" icon="database" href="/sdk/knowledge-base/examples/kb-crud">
    The sync version of the lifecycle calls.
  </Card>

  <Card title="Advanced query" icon="search" href="/sdk/knowledge-base/examples/query-advanced">
    Full query surface with filters, hybrid, rerank, QA.
  </Card>

  <Card title="KB reference" icon="book-open" href="/sdk/knowledge-base/reference">
    Every public method.
  </Card>
</Columns>
