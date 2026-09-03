> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Documents and files

> Add documents to a workspace and work with files directly

Add files to a workspace, list and remove them, and use the File class to find
and reuse files that already exist in your org.

```python theme={"languages":{}}
from vectorshift import Workspace, File

w = Workspace.new(name="Q3 Report Review", portal="Acme Research")

# --- 1. The workspace's document store id ---
print(f"1. Document store id: {w.kb_id}")

# --- 2. Add local files to the workspace ---
added = w.documents.add("./report.pdf", "./documents/")
print(f"2. Added {len(added)} documents.")

# --- 3. List the workspace's documents ---
docs = w.documents.list()
print(f"3. Workspace holds {len(docs)} files.")

# --- 4. List the org's files and fetch one by id ---
org_files = File.list(limit=10)
existing = File.fetch(id=org_files[0].id)
print(f"4. Fetched file: {existing.name}")

# --- 5. Add an existing file to this workspace without re-uploading ---
existing.index(w)
print("5. Added an existing file to the workspace.")

# --- 6. Remove a document from the workspace; the underlying file stays ---
if docs:
    w.documents.remove(docs[0])
print("6. Removed one document.\n\nDone.")
```

<Tip>
  Source: `examples/workspaces/08_documents_and_files.py` in the SDK repo.
</Tip>
