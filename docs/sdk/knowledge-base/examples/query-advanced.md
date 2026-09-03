> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Advanced query

> Query a Knowledge Base with filters, hybrid search, reranking, and grounded QA.

**What this builds.** A self-contained KB ingestion plus two query styles — kwargs-as-config and a single composed `QueryConfig`.
**You'll end up with.** Reranked chunks for the first query and a grounded answer with citations for the second.

```python theme={"languages":{}}
"""
Example 07: Query a KB with all configs as kwargs.

`kb.query(...)` is the single query surface. Pass either individual
kwargs (top_k / filters / hybrid / rerank / qa) OR a fully-built
`QueryConfig`, never both.
"""

import tempfile
from pathlib import Path

from vectorshift.knowledge_base import (
    KnowledgeBase,
    FilterClause,
    FilterOperator,
    HybridConfig,
    RerankConfig,
    QaConfig,
    QaMode,
    QueryConfig,
)

# Self-contained: create + ingest before querying so the example runs
# clean against any environment.
with tempfile.TemporaryDirectory() as tmp:
    p = Path(tmp) / "policy.md"
    p.write_text(
        "# PTO Policy\n\nEmployees get 20 days yearly. Vacation rollover allowed.\n"
    )
    kb = KnowledgeBase.new(name="SDK query demo")
    kb.add_files_and_wait([p], timeout=180)
    print(f"1. KB ready: {kb.id}")

res = kb.query(
    "vacation rollover",
    top_k=10,
    filters=[FilterClause(field="team", op=FilterOperator.EQ, value="hr")],
    hybrid=HybridConfig(alpha=0.5),
    rerank=RerankConfig(model="bge-reranker-v2-m3", top_n=5),
    qa=QaConfig(mode=QaMode.FAST, citations=True),
)
print(f"4. Advanced query: {len(res['chunks'])} chunks (post-rerank)")

# Or pass a single QueryConfig
cfg = QueryConfig(
    top_k=8,
    qa=QaConfig(mode=QaMode.ACCURATE, citations=True),
    hybrid=HybridConfig(alpha=0.7),
)
res = kb.query("PTO accrual", config=cfg)
print(f"5. Config-object query: answer={'answer' in res}")

kb.delete()
print("6. Deleted KB.")
```

## Expected output

```text theme={"languages":{}}
1. KB ready: ...
4. Advanced query: ... chunks (post-rerank)
5. Config-object query: answer=True
6. Deleted KB.
```

Pass either kwargs OR a `QueryConfig` — never both. `chunks` is post-rerank when a `RerankConfig` is supplied.

## See also

<Columns cols={3}>
  <Card title="KB CRUD" icon="database" href="/sdk/knowledge-base/examples/kb-crud">
    Walk the full Knowledge Base lifecycle.
  </Card>

  <Card title="Metadata autogen" icon="sparkles" href="/sdk/knowledge-base/examples/metadata-autogen">
    Auto-generate metadata used by filters at query time.
  </Card>

  <Card title="KB reference" icon="book-open" href="/sdk/knowledge-base/reference">
    Every public method.
  </Card>
</Columns>
