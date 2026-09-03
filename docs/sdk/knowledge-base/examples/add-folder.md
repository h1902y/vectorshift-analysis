> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Add folder

> Upload a local folder into a Knowledge Base while preserving its directory structure.

**What this builds.** A KB that mirrors a nested local folder — subfolders become KB folders, files become KB items.
**You'll end up with.** A completed ingestion task whose KB layout matches the on-disk layout, verified by `list_items`.

```python theme={"languages":{}}
"""
Example 03: Upload a local folder, preserving directory structure.

`kb.add_folder(...)` walks the local directory, builds a nested folder
tree, and submits a single ingestion request. The KB layout will mirror
the local layout.

Requires the v1 ingestion task endpoints + folder-tree extension to
KbIndexRequest (M2 [A2]).
"""

import tempfile
from pathlib import Path

from vectorshift.knowledge_base import KnowledgeBase

# Build a small nested folder
with tempfile.TemporaryDirectory() as tmp:
    root = Path(tmp) / "handbook"
    (root / "policies").mkdir(parents=True)
    (root / "policies" / "pto.md").write_text("# PTO\n\n- 20 days/yr\n")
    (root / "policies" / "remote.md").write_text("# Remote\n\nWFH OK.\n")
    (root / "engineering").mkdir()
    (root / "engineering" / "oncall.md").write_text("# Oncall\n\nWeekly rotation.\n")
    (root / "README.md").write_text("# Handbook\n\nWelcome.\n")

    kb = KnowledgeBase.new(name="SDK folder demo")
    print(f"1. Created KB id={kb.id}")

    final = kb.add_folder_and_wait(root, timeout=180)
    print(
        f"2. Folder ingest completed: status={final.status} "
        f"items={len(final.item_ids)}"
    )

    # List items to confirm folder hierarchy is preserved
    items = kb.list_items(limit=50)
    print(f"3. Items in KB: {len(items)}")

    kb.delete()
    print("4. Deleted KB.")
```

## Expected output

```text theme={"languages":{}}
1. Created KB id=...
2. Folder ingest completed: status=... items=4
3. Items in KB: 4
4. Deleted KB.
```

The walk produces a single ingestion request — not one per file — so very large trees stay fast.

## See also

<Columns cols={3}>
  <Card title="Add files" icon="file-plus" href="/sdk/knowledge-base/examples/add-files">
    Ingest individual files instead of a whole tree.
  </Card>

  <Card title="Items and folders" icon="list" href="/sdk/knowledge-base/examples/items-and-folders">
    Manage the items and folders after ingestion.
  </Card>

  <Card title="KB reference" icon="book-open" href="/sdk/knowledge-base/reference">
    Every public method.
  </Card>
</Columns>
