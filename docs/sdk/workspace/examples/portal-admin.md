> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Managing a portal

> Discover and manage a portal

List portals, view their agents and skills, open a portal-level chat, create
workspaces under a portal, and update its settings.

```python theme={"languages":{}}
from vectorshift.workspace import Portal

# Deleting a shared portal is destructive, so keep it off by default.
DELETE_PORTAL = False

# --- 1. List portals you can see ---
for entry in Portal.list(limit=20)["portals"]:
    print(f"1. portal: {entry['name']} (id={entry['id']})")

# --- 2. Fetch one by id ---
listing = Portal.list(limit=1)["portals"]
portal = Portal.fetch(id=listing[0]["id"])
print(f"2. Fetched: {portal.name}")

# --- 3. Agents available on this portal ---
print(f"3. Agents: {[getattr(a, 'name', '?') for a in portal.agents()]}")
analyst = portal.agent(name="Report Analyst")
analyst.run("Summarize the pipeline")
print("   Ran the agent.")

# --- 4. Skills available on this portal ---
print(f"4. Skills: {[s.name for s in portal.skills()]}")

# --- 5. Portal-level chat session, not tied to any workspace ---
ps = portal.create_session()
print("5. Opened a portal session:", ps.send("What does this portal cover?"))
ps.close()

# --- 6. Create a workspace under this portal; safe to run again ---
portal.workspaces.new(name="Contract Review")
workspace = portal.workspaces.get_or_create(name="Contract Review")
print(f"6. Workspace under portal: {workspace.name}")

# --- 7. Update portal settings ---
portal.update(features={"verification": True})
print("7. Enabled verification feature.")

# --- 8. Delete the portal (off by default) ---
if DELETE_PORTAL:
    portal.delete()
print("8. Skipped portal delete.\n\nDone.")
```

<Tip>
  Source: `examples/workspaces/10_portal_admin.py` in the SDK repo.
</Tip>
