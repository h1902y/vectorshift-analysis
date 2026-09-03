> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Documents

> Upload and manage documents in a workspace

Add files to a workspace, list them with their version history, reuse a file
that already exists, and remove one when you no longer need it.

```python theme={"languages":{}}
from vectorshift import Workspace, File

w = Workspace.get_or_create(name="Q3 Report Review", portal="Acme Research")

# --- 1. Upload local files into the workspace ---
files = w.upload("./report.pdf", "./documents/")
print(f"1. Uploaded {len(files)} documents.")

# --- 2. List the workspace's documents, with their version numbers ---
for doc in w.documents.list():
    print(f"2. {doc.name} (version {doc.version})")

# --- 3. Add an existing file to this workspace ---
existing = File.fetch(id=files[0].id)
existing.index(w)
print("3. Added an existing file to the workspace.")

# --- 4. Remove a document from the workspace; the file itself stays ---
w.documents.remove(files[0])
print("4. Removed one document.\n\nDone.")
```

<Tip>
  Source: `examples/workspaces/02_documents.py` in the SDK repo.
</Tip>
