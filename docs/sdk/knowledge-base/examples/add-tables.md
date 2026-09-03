> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Add tables

> Index existing VectorShift Table resources into a Knowledge Base as TABLE-kind items.

**What this builds.** A KB that indexes one or more first-class `Table` SDK objects (already-stored Table resources on your account).
**You'll end up with.** A KB whose `list_items` surface includes the indexed tables as `kind=TABLE` items, queryable alongside text items.

```python theme={"languages":{}}
"""
Example 05: Index VectorShift Table objects into a KB.

`kb.add_tables(...)` accepts first-class VectorShift `Table` SDK
objects (already-stored Table resources, e.g. from a scrape-table flow).
CSV/XLSX/TSV file uploads go through `kb.add_files(...)` instead.
"""

from vectorshift import Table
from vectorshift.knowledge_base import KnowledgeBase

# In a real flow: fetch existing Table resources you want indexed.
# Replace the IDs with real Tables from your account.
table_ids = ["69f4b3e3b12ccdbaff50b0c9"]

tables = []
for tid in table_ids:
    if tid.startswith("YOUR_"):
        print("Replace YOUR_TABLE_ID_* with real Table ids to run this example.")
        raise SystemExit(0)
    tables.append(Table.fetch(id=tid))

kb = KnowledgeBase.new(name="SDK tables demo")
print(f"1. Created KB id={kb.id}")

task = kb.add_tables_and_wait(tables, timeout=180)
print(f"2. Indexed {len(tables)} tables: status={task.status}")

# Tables surface as KBItems with kind=TABLE
items = kb.list_items(limit=20)
print(f"3. Items: {[(i.name, i.kind) for i in items[:6]]}")

# kb.delete()
# print("4. Deleted KB.")
```

## Expected output

```text theme={"languages":{}}
1. Created KB id=...
2. Indexed 1 tables: status=...
3. Items: [('...', 'TABLE')]
```

For raw CSV/XLSX/TSV files, use `add_files` — `add_tables` is only for already-stored `Table` resources.

## See also

<Columns cols={3}>
  <Card title="Add files" icon="file-plus" href="/sdk/knowledge-base/examples/add-files">
    Ingest CSV/XLSX/TSV files directly.
  </Card>

  <Card title="Advanced query" icon="search" href="/sdk/knowledge-base/examples/query-advanced">
    Query with filters, hybrid, rerank, and QA.
  </Card>

  <Card title="KB reference" icon="book-open" href="/sdk/knowledge-base/reference">
    Every public method.
  </Card>
</Columns>
