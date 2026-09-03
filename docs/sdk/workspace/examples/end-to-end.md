> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# End-to-end walkthrough

> A complete workflow from start to finish

Find a portal, create a workspace, upload documents, chat with them, run a
reusable skill, verify a report, and triage the issues found.

```python theme={"languages":{}}
from vectorshift import Workspace, Skill
from vectorshift.workspace import Portal, CheckType, IssueSeverity

# --- 0. The team's portal, and the workspaces under it ---
portal = Portal.fetch(name="Acme Research")
for workspace in portal.workspaces.list():
    print("workspace:", workspace.name)

# --- 1. Create a workspace; safe to run again without creating a duplicate ---
w = Workspace.get_or_create(
    name="Q3 Report Review", portal=portal, description="Q3 report review"
)

# --- 2. Upload the documents ---
w.upload("./report.pdf", "./documents/")

# --- 3. Chat with the workspace's documents ---
s = w.create_session()
print(s.send("Summarize the key findings"))
print(s.send("How have they trended over time?"))
s.close()

# --- 4. Run a reusable skill via the portal's agent ---
memo = Skill.get_or_create(
    name="Report Summary", content="One-page report memo: summary, findings, risks."
)
analyst = w.portal.agent(name="Report Analyst")
analyst.run("Summarize the Q3 report", skill=memo)

# --- 5. Verify the report against the rest of the workspace ---
v = w.verifications.new(name="Report check", main_file="./report.pdf")
run = v.run_and_wait(
    enabled_checks=[CheckType.PRIMARY_SOURCE, CheckType.CROSS_DOCUMENT],
    on_status=lambda st: print("verification:", st),
)
print(f"{run['total_issues']} issues found")

# --- 6. Triage the errors ---
for issue in v.issues(severity=[IssueSeverity.ERROR]):
    issue.flag(comment="check against the latest figures")

print("\nDone.")
```

<Tip>
  Source: `examples/workspaces/06_end_to_end.py` in the SDK repo.
</Tip>
