> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Add files

> Ingest local files into a Knowledge Base and poll the ingestion task until completion.

**What this builds.** A KB that ingests a local markdown file via both the fire-and-forget and the blocking-wait APIs.
**You'll end up with.** An `IngestionTask` you can poll, then a completed task whose `item_ids` are now searchable in the KB.

```python theme={"languages":{}}
"""
Example 02: Ingest files into a KB and poll until done.

Shows `add_files` (returns IngestionTask immediately), `ingestion_status`
(single poll), and `add_files_and_wait` (polls until COMPLETED/FAILED).

Requires the v1 ingestion task endpoints (M2 [A2]):
- POST /v1/knowledge-base/{id}/ingestions
- GET  /v1/knowledge-base/{id}/ingestions/{task_id}
"""

import tempfile
from pathlib import Path

from vectorshift.knowledge_base import (
    KnowledgeBase,
    IndexingConfig,
    IngestionStatus,
)

# Build a temp file to upload
with tempfile.NamedTemporaryFile(mode="w", suffix=".md", delete=False) as f:
    f.write("# Hello\n\nThis is a tiny markdown doc for the SDK example.")
    path = Path(f.name)

kb = KnowledgeBase.new(
    name="SDK files demo",
    embedding_model="text-embedding-3-small",
    indexing_config=IndexingConfig(chunk_size=400, chunk_overlap=40),
)
print(f"1. Created KB id={kb.id}")

# --- Fire-and-forget: returns IngestionTask immediately ---
# `custom_metadata` is not supported at ingestion time today; set it
# per-item after the task completes via `kb.update_item_metadata`.
task = kb.add_files([path])
print(f"2. Submitted ingestion task: id={task.task_id} status={task.status}")

# --- Single status poll ---
status = kb.ingestion_status(task.task_id)
print(f"3. Poll once: status={status.status}")

# --- Wait variant (polls until done or timeout) ---
final = kb.add_files_and_wait([path], timeout=120)
assert final.status == IngestionStatus.COMPLETED
print(f"4. Wait variant completed: items={final.item_ids}")

# Clean up
kb.delete()
print("5. Deleted KB.")
path.unlink(missing_ok=True)
```

## Expected output

```text theme={"languages":{}}
1. Created KB id=...
2. Submitted ingestion task: id=... status=...
3. Poll once: status=...
4. Wait variant completed: items=['...']
5. Deleted KB.
```

`custom_metadata` isn't accepted at ingestion time — apply it per-item after the task lands using `update_item_metadata`.

## See also

<Columns cols={3}>
  <Card title="Add folder" icon="folder" href="/sdk/knowledge-base/examples/add-folder">
    Ingest a local folder tree, preserving structure.
  </Card>

  <Card title="Add URLs" icon="link" href="/sdk/knowledge-base/examples/add-urls">
    Ingest single pages or recursive crawls.
  </Card>

  <Card title="KB reference" icon="book-open" href="/sdk/knowledge-base/reference">
    Every public method.
  </Card>
</Columns>
