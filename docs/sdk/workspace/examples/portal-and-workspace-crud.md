> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Portals and workspaces

> Create and manage portals and workspaces

A portal is your team's top-level space; workspaces live inside it. This shows
how to create, find, update, and delete both.

```python theme={"languages":{}}
import time
from vectorshift.workspace import Portal
from vectorshift import Workspace

stamp = int(time.time())

# --- 1. Create the team's portal ---
portal = Portal.new(name=f"Acme Research {stamp}")
print(f"1. Portal: {portal.name} (id={portal.id})")

# --- 2. Enable verification on the portal ---
portal.update(features={"verification": True})
print("2. Enabled verification feature.")

# --- 3. List the workspaces in the portal ---
print(f"3. Workspaces under portal: {[w.name for w in portal.workspaces.list()]}")

# --- 4. Create a workspace; safe to run again without creating a duplicate ---
w = Workspace.get_or_create(
    name="Q3 Report Review", portal=portal, description="Q3 report review"
)
print(f"4. Workspace: {w.name} (id={w.id})")

# --- 5. Fetch by name / id ---
print(f"5. Fetched: {Workspace.fetch(name='Q3 Report Review').id}")

# --- 6. Update + list ---
w.update(description="Q3 report review — updated description")
print(f"6. Listed workspaces: {len(Workspace.list(limit=20)['workspaces'])}")

# --- 7. Cleanup ---
w.delete()
print("7. Deleted workspace.\n\nDone.")
```

<Tip>
  Source: `examples/workspaces/01_portal_and_workspace_crud.py` in the SDK repo.
</Tip>
