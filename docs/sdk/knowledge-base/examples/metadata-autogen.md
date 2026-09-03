> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Metadata autogen

> Create, replace, run, and delete a metadata-autogen config on a Knowledge Base.

**What this builds.** A KB with one metadata-autogen config attached, exercised through full CRUD + a synchronous run that backfills metadata onto existing items.
**You'll end up with.** Items whose `custom_metadata` is populated by the autogen run, then a clean account once the config + KB are deleted.

```python theme={"languages":{}}
"""
Example 09: Metadata autogen — multi-config CRUD + run.

Each KB can hold many metadata-autogen configs, addressed by
`autogen_id`. The accessor lives at `kb.metadata_autogen.*`.
"""

import tempfile
from pathlib import Path

from vectorshift.knowledge_base import KnowledgeBase

# Build a small KB
with tempfile.NamedTemporaryFile(mode="w", suffix=".md", delete=False) as f:
    f.write("# Sample\n\nThis is a sample doc.")
    p = Path(f.name)

kb = KnowledgeBase.new(name="SDK autogen demo")
kb.add_files_and_wait([p], timeout=120)
items = kb.list_items()
item_ids = [i.id for i in items]
print(f"1. KB ready id={kb.id} with {len(item_ids)} items")

# --- Create config ---

cfg = kb.metadata_autogen.create_config(
    extraction_instructions="Extract a short summary and 3-5 topics for each document.",
    query_instructions="Match documents whose topics intersect the user's query.",
    traversal_type="document",
    debounce_seconds=0,
    name="Summary + topics",
)
print(f"2. Created autogen config: id={cfg.autogen_id}")

# --- List & fetch ---
configs = kb.metadata_autogen.list_configs()
print(f"3. list_configs: {len(configs)} configs")

fetched = kb.metadata_autogen.get_config(cfg.autogen_id)
print(f"4. get_config: {fetched.autogen_id == cfg.autogen_id}")

# --- Replace ---
# `replace_config` (not `update_config`) — this fully overwrites the config.
# Every field omitted here resets to its default; pre-fetch with
# `get_config` and merge if you want to change just one field.
kb.metadata_autogen.replace_config(
    cfg.autogen_id,
    extraction_instructions="Extract only a one-line summary per document.",
    query_instructions="Match by summary similarity.",
    traversal_type="document",
    debounce_seconds=5,
)
print("5. Replaced config.")

# --- Run ---
final = kb.metadata_autogen.run_and_wait(cfg.autogen_id, item_ids=item_ids, timeout=180)
print(f"6. Autogen run: status={final.status}")

# Verify metadata appears on items
fresh = kb.get_item(item_ids[0])
print(f"7. Item metadata after autogen: {fresh.custom_metadata}")

# --- Delete config ---
kb.metadata_autogen.delete_config(cfg.autogen_id)
print("8. Deleted autogen config.")

kb.delete()
p.unlink(missing_ok=True)
print("9. Deleted KB.")
```

## Expected output

```text theme={"languages":{}}
1. KB ready id=... with 1 items
2. Created autogen config: id=...
3. list_configs: 1 configs
4. get_config: True
5. Replaced config.
6. Autogen run: status=...
7. Item metadata after autogen: {...}
8. Deleted autogen config.
9. Deleted KB.
```

`replace_config` is a full overwrite — pre-fetch with `get_config` and merge if you want partial updates.

## See also

<Columns cols={3}>
  <Card title="Items and folders" icon="list" href="/sdk/knowledge-base/examples/items-and-folders">
    Manage items and folders by hand.
  </Card>

  <Card title="Advanced query" icon="search" href="/sdk/knowledge-base/examples/query-advanced">
    Query using the metadata you just generated.
  </Card>

  <Card title="KB reference" icon="book-open" href="/sdk/knowledge-base/reference">
    Every public method.
  </Card>
</Columns>
