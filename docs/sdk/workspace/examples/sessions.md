> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Chat sessions

> Chat with the documents in a workspace

Start a chat session that answers from a workspace's documents, ask follow-up
questions, narrow the chat to specific documents, or chat at the portal level.

```python theme={"languages":{}}
from vectorshift.workspace import Portal
from vectorshift import Workspace

w = Workspace.get_or_create(name="Q3 Report Review", portal="Acme Research")

# --- 1. Chat session that answers from the workspace's documents ---
s = w.create_session()
print("1.", s.send("What are the main risks?"))
print("2.", s.send("And how do they compare to last year?"))  # earlier questions are remembered
s.close()

# --- 3. Narrow the chat to specific documents ---
docs = w.documents.list()[:2]
s2 = w.create_session(documents=docs)
print("3.", s2.send("Summarize just these two documents."))
s2.close()

# --- 4. Portal-level chat session, not tied to any workspace ---
ps = Portal.fetch(name="Acme Research").create_session()
print("4.", ps.send("What does this portal cover?"))
ps.close()
print("\nDone.")
```

<Tip>
  Source: `examples/workspaces/03_sessions.py` in the SDK repo.
</Tip>
