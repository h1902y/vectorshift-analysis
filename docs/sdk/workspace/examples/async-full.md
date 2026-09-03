> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Async (full surface)

> A full async workflow covering every part of the workspace API

One end-to-end flow written with async/await: portals, workspaces, skills,
files, documents, verifications, and an async agent run with a skill.

```python theme={"languages":{}}
import asyncio

from vectorshift import Workspace, Skill, File
from vectorshift.workspace import (
    Portal,
    CheckType,
    IssueStatus,
    VerificationStatus,
)

DESTROY = False  # keep deletes off by default

async def main():
    # --- 1. Portal: create, fetch, update, list, and read its accessors ---
    portal = await Portal.anew(name="Async Team")
    portal = await Portal.afetch(id=portal.id)
    await portal.aupdate(features={"verification": True})
    listing = await Portal.alist(limit=20)
    print(f"1. Portals visible: {len(listing['portals'])}")
    agents = await portal.aagents()
    if agents:
        await portal.aagent(name=agents[0].name)
    await portal.askills()
    await portal.acreate_session()

    # --- 2. Create workspaces under the portal ---
    await portal.workspaces.anew(name="Async Workspace")
    w = await portal.workspaces.aget_or_create(name="Async Workspace")
    print(f"2. Workspaces under portal: {len(await portal.workspaces.alist())}")

    # --- 3. Workspace: create, fetch, update, and open a chat session ---
    w = await Workspace.aget_or_create(name="Vendor Review", portal=portal)
    w = await Workspace.afetch(id=w.id)
    await w.aupdate(description="Vendor review")
    await w.acreate_session()

    # --- 4. Add and list documents ---
    await w.aupload("./report.pdf")
    await w.documents.aadd("./documents/")
    docs = await w.documents.alist()
    if docs:
        await w.documents.aremove(docs[0])
    print(f"4. Workspace holds {len(docs)} files.")

    # --- 5. List and reuse existing org files ---
    org_files = await File.alist(limit=5)
    if org_files:
        f = await File.afetch(id=org_files[0].id)
        await f.aindex(w)
    print(f"5. Listed {len(org_files)} org files.")

    # --- 6. Skill: create, fetch, and update ---
    skill = await Skill.anew(name="Async Memo", content="Summarize.")
    await Skill.aget_or_create(name="Async Memo", content="Summarize.")
    skill = await Skill.afetch(id=skill.id)
    await skill.aupdate(content="Summarize tightly.")
    print(f"6. Skills: {len((await Skill.alist())['skills'])}")

    # --- 7. Run an agent with a skill as its instructions ---
    if agents:
        await agents[0].arun("Summarize the report", skill=skill)
        print("7. Ran an agent async with the skill.")

    # --- 8. Verification: run, poll, list issues, and triage ---
    v = await w.verifications.anew(
        name="Report check", main_file="./report.pdf"
    )
    await v.arun(enabled_checks=[CheckType.PRIMARY_SOURCE])
    while v.status not in (VerificationStatus.COMPLETED, VerificationStatus.FAILED):
        await v.arefresh()
        await asyncio.sleep(15)
    run = await v.arun_and_wait(enabled_checks=[CheckType.CROSS_DOCUMENT])
    print(f"8. {run['total_issues']} issues (version {run.version}).")
    print(f"   Verifications: {len(await w.verifications.alist())}")
    await w.verifications.afetch(v.id)
    issues = await v.aissues(status=[IssueStatus.OPEN])
    if len(issues) >= 5:
        await issues[0].aset_status(IssueStatus.IGNORED)
        await issues[1].aignore()
        await issues[2].aflag()
        await issues[3].amark_fixed()
        await issues[4].averify()

    # --- 9. Cleanup (off by default) ---
    if DESTROY:
        await v.adelete()
        await skill.adelete()
        await w.adelete()
        await portal.adelete()
    print("9. Done.")

if __name__ == "__main__":
    asyncio.run(main())
```

<Tip>
  Source: `examples/workspaces/11_async_full.py` in the SDK repo.
</Tip>
