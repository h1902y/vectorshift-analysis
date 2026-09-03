> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Items and folders

> Manage Knowledge Base contents — list, filter, move, update metadata, scroll, and delete items.

**What this builds.** A KB with three ingested files exercised against every item/folder management call the SDK exposes.
**You'll end up with.** A KB whose items have custom metadata, a created `archive` folder with one item moved into it, scroll-paginated reads, and a deleted item — leaving the KB in a clean state.

```python theme={"languages":{}}
"""
Example 08: Item & folder management.

Covers `list_items`, `get_item`, `move_items`, `update_item_metadata`,
`delete_items`, `create_folder`, and the `scroll(...)` cursor for
large KBs.
"""

import tempfile
from pathlib import Path

from vectorshift.knowledge_base import (
    KnowledgeBase,
    FilterClause,
    FilterOperator,
)

# Bootstrap a KB with a few files
with tempfile.TemporaryDirectory() as tmp:
    paths = []
    for i in range(3):
        p = Path(tmp) / f"doc_{i}.md"
        p.write_text(f"# Doc {i}\n\nSome body text.")
        paths.append(p)

    kb = KnowledgeBase.new(name="SDK items demo")
    task = kb.add_files_and_wait(paths, timeout=180)
    # Custom metadata is set per-item after ingestion, not on add_files —
    # the ingestion call doesn't accept it. See `update_item_metadata`
    # below.
    for item_id in task.item_ids:
        kb.update_item_metadata(item_id, custom_metadata={"team": "demo"})
    print(f"1. Created KB id={kb.id}")

    # --- List ---
    items = kb.list_items(limit=20)
    print(f"2. list_items: {len(items)} items")

    # --- Filter ---
    filtered = kb.list_items(
        filters=[FilterClause(field="team", op=FilterOperator.EQ, value="demo")],
        limit=20,
    )
    print(f"3. Filtered to team=demo: {len(filtered)} items")

    # --- Get one ---
    one = kb.get_item(items[0].id)
    print(f"4. get_item: name={one.name} kind={one.kind}")

    # --- Update metadata ---
    updated = kb.update_item_metadata(
        items[0].id, custom_metadata={"team": "demo", "reviewed": True}
    )
    print(f"5. Updated metadata: {updated.custom_metadata}")

    # --- Create folder + move ---
    folder = kb.create_folder("archive")
    print(f"6. Created folder: id={folder.id} name={folder.name}")

    kb.move_items([items[0].id], target_folder_id=folder.id)
    print("7. Moved 1 item into archive folder.")

    # --- Scroll over large KB ---
    total_seen = 0
    for page in kb.scroll(page_size=2):
        total_seen += len(page)
    print(f"8. scroll() yielded {total_seen} items across pages.")

    # --- Delete a couple ---
    kb.delete_items([items[1].id])
    print("9. Deleted 1 item.")

    kb.delete()
    print("10. Deleted KB.")
```

## Expected output

```text theme={"languages":{}}
1. Created KB id=...
2. list_items: 3 items
3. Filtered to team=demo: 3 items
4. get_item: name=... kind=...
5. Updated metadata: {'team': 'demo', 'reviewed': True}
6. Created folder: id=... name=archive
7. Moved 1 item into archive folder.
8. scroll() yielded ... items across pages.
9. Deleted 1 item.
10. Deleted KB.
```

`scroll()` is preferred over repeated `list_items(offset=...)` calls for large KBs — it uses a cursor and yields pages.

## See also

<Columns cols={3}>
  <Card title="Add folder" icon="folder" href="/sdk/knowledge-base/examples/add-folder">
    Ingest a local folder tree into a KB.
  </Card>

  <Card title="Metadata autogen" icon="sparkles" href="/sdk/knowledge-base/examples/metadata-autogen">
    Auto-generate metadata without writing it by hand.
  </Card>

  <Card title="KB reference" icon="book-open" href="/sdk/knowledge-base/reference">
    Every public method.
  </Card>
</Columns>
