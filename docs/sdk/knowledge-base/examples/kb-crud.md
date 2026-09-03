> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Knowledge Base CRUD

> Walk the full create / fetch / list / delete lifecycle on a Knowledge Base.

**What this builds.** A minimal end-to-end tour of every CRUD verb on `KnowledgeBase`.
**You'll end up with.** A freshly created KB that's fetched by id, fetched by name, located in `list()`, then deleted — leaving your account exactly as you found it.

```python theme={"languages":{}}
"""
Knowledge Base CRUD — full lifecycle.

Covers `new`, `fetch` (by id and by name), `list`, and `delete`.
Knowledge Bases support create and delete; rename/update is not exposed.
"""

from vectorshift.knowledge_base import (
    KnowledgeBase,
    IndexingConfig,
    SplitterMethod,
)

# --- Create ---
kb = KnowledgeBase.new(
    name="SDK KB CRUD Demo",
    embedding_model="text-embedding-3-large",
    indexing_config=IndexingConfig(
        chunk_size=500,
        chunk_overlap=50,
        analyze_documents=False,
        splitter=SplitterMethod.MARKDOWN,
    ),
)
print(f"1. Created KB: {kb.name} (id={kb.id})")

# --- Fetch by ID ---
fetched = KnowledgeBase.fetch(id=kb.id)
print(f"2. Fetched by ID: {fetched.name}")

# --- Fetch by name ---
fetched_by_name = KnowledgeBase.fetch(name="SDK KB CRUD Demo")
print(f"3. Fetched by name: {fetched_by_name.name}")

# --- List ---
kbs = KnowledgeBase.list(limit=20, offset=0)
found = any(k.id == kb.id for k in kbs)
print(f"4. Listed KBs ({len(kbs)} total), found ours: {found}")

# --- Delete ---
kb.delete()
print("5. Deleted KB.\n\nDone.")
```

## Expected output

```text theme={"languages":{}}
1. Created KB: SDK KB CRUD Demo (id=...)
2. Fetched by ID: SDK KB CRUD Demo
3. Fetched by name: SDK KB CRUD Demo
4. Listed KBs (... total), found ours: True
5. Deleted KB.

Done.
```

KB rename/update isn't exposed today — the lifecycle is intentionally create-or-delete only.

## See also

<Columns cols={3}>
  <Card title="Add files" icon="file-plus" href="/sdk/knowledge-base/examples/add-files">
    Ingest files into a KB and poll until ready.
  </Card>

  <Card title="Add URLs" icon="link" href="/sdk/knowledge-base/examples/add-urls">
    Ingest single pages or recursive crawls.
  </Card>

  <Card title="KB reference" icon="book-open" href="/sdk/knowledge-base/reference">
    Every public method.
  </Card>
</Columns>
