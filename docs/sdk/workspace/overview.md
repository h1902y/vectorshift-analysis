> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Workspace overview

> Organize documents into secure data rooms, chat with them, and verify them for errors.

The `Workspace` class is the SDK surface for VectorShift Workspaces — secure data rooms for your documents. Group related workspaces under a [`Portal`](/sdk/workspace/portal), load documents into a workspace, open a chat session to ask questions about them, and run [`Verification`](/sdk/workspace/verification) checks that flag unsupported claims, stale figures, and inconsistencies across documents.

<Info>
  **Prerequisites:** [Installed SDK](/sdk/installation) · [API key set](/sdk/authentication) · Python 3.10+.
</Info>

## Mental model

* A **[`Portal`](/sdk/workspace/portal)** is your team's top-level space. It groups related workspaces and holds the agents and skills available to them.
* A **`Workspace`** is a secure data room that lives inside a portal. It holds a set of documents you can search, chat with, and verify.
* **Documents** are the files in a workspace. Add them with `workspace.upload(...)` or manage them through `workspace.documents`.
* A **chat session** (`workspace.create_session()`) lets you ask questions in plain language and get answers grounded in the workspace's documents.
* A **[`Verification`](/sdk/workspace/verification)** checks one document against everything else in the workspace and returns a list of [issues](/sdk/workspace/issue) to review — unsupported numbers, stale figures, mismatches between documents, and more.
* Every method has an **async variant** prefixed with `a` (`anew`, `aupload`, `acreate_session`, …).

## Quick start

<CodeGroup>
  ```python Sync theme={"languages":{}}
  from vectorshift import Workspace
  from vectorshift.workspace import Portal

  # A portal groups related workspaces together.
  portal = Portal.new(name="Acme Research")

  # Create a workspace (a data room) under the portal — safe to re-run.
  ws = Workspace.get_or_create(name="Q3 Report Review", portal=portal)

  # Load documents, then ask questions about them.
  ws.upload("./report.pdf", "./documents/")
  session = ws.create_session()
  print(session.send("What are the key risks called out in the report?"))
  ```

  ```python Async theme={"languages":{}}
  import asyncio
  from vectorshift import Workspace
  from vectorshift.workspace import Portal

  async def main():
      portal = await Portal.anew(name="Acme Research")
      ws = await Workspace.aget_or_create(name="Q3 Report Review", portal=portal)
      await ws.aupload("./report.pdf", "./documents/")
      session = await ws.acreate_session()
      print(session.send("What are the key risks called out in the report?"))

  asyncio.run(main())
  ```
</CodeGroup>

## Working with documents

Add files (or whole folders) to a workspace's data room with `upload`:

```python theme={"languages":{}}
files = ws.upload("./report.pdf", "./documents/")
```

For finer control, use the `documents` manager to list what's in the data room or remove a file from it:

```python theme={"languages":{}}
for doc in ws.documents.list():
    print(doc.name)

ws.documents.remove(files[0])   # removes it from this workspace
```

## Chatting with a workspace

`create_session()` opens a chat grounded in the workspace's documents. Sessions keep context across turns, so you can ask follow-up questions:

```python theme={"languages":{}}
session = ws.create_session()
print(session.send("Summarize the key findings."))
print(session.send("How do they compare to last quarter?"))
```

## Verifying documents

A verification checks a document against the rest of the workspace and reports back issues to review. Create one from the workspace, run it, then triage what it finds:

```python theme={"languages":{}}
from vectorshift.workspace import CheckType, IssueSeverity

v = ws.verifications.new(name="Report check", main_file="./report.pdf")
run = v.run_and_wait(enabled_checks=[CheckType.PRIMARY_SOURCE, CheckType.CROSS_DOCUMENT])
print(f"{run['total_issues']} issues found")

# Review the most serious findings.
for issue in v.issues(severity=[IssueSeverity.ERROR]):
    issue.flag(comment="Needs review")
```

See [Verification](/sdk/workspace/verification) and [Verification issue](/sdk/workspace/issue) for the full set of options and triage actions.

## Portals, agents, and skills

A portal groups workspaces and exposes the agents and skills your team can use. List the workspaces under a portal, open a portal-level chat, or run one of the portal's agents:

```python theme={"languages":{}}
portal = Portal.fetch(name="Acme Research")

for ws in portal.workspaces.list():
    print(ws.name)

analyst = portal.agent(name="Report Analyst")
analyst.run("Summarize this quarter's report")
```

See the [Portal](/sdk/workspace/portal) reference for everything a portal can do.

## What's next

<Columns cols={2}>
  <Card title="Reference" icon="book-open" href="/sdk/workspace/reference">
    Every public method on `Workspace`, grouped by topic.
  </Card>

  <Card title="Portal" icon="building" href="/sdk/workspace/portal">
    Group related workspaces and the agents and skills available to them.
  </Card>

  <Card title="Verification" icon="shield-check" href="/sdk/workspace/verification">
    Check a document against the data room and triage the issues it finds.
  </Card>

  <Card title="Examples" icon="code" href="/sdk/workspace/examples/portal-and-workspace-crud">
    Runnable examples to copy-paste and adapt.
  </Card>
</Columns>
