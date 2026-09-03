> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Async usage

> Use the async version of the workspace methods

Every method has an async twin (prefixed with "a"). This shows a typical flow
written with async/await: create, upload, list, verify, and clean up.

```python theme={"languages":{}}
import asyncio

from vectorshift import Workspace
from vectorshift.workspace import CheckType

async def main():
    # --- 1. Create a workspace asynchronously ---
    w = await Workspace.anew(
        name="Vendor Review", portal="Acme Research", description="Vendor review"
    )
    print(f"1. Created workspace: {w.id}")

    # --- 2. Upload the documents ---
    await w.aupload("./report.pdf")
    print("2. Uploaded documents.")

    # --- 3. List workspaces ---
    listing = await Workspace.alist(limit=20)
    print(f"3. Listed {len(listing['workspaces'])} workspaces.")

    # --- 4. Verify and await completion ---
    v = await w.verifications.anew(
        name="Report check", main_file="./report.pdf"
    )
    run = await v.arun_and_wait(
        enabled_checks=[CheckType.PRIMARY_SOURCE], poll_interval=30
    )
    print(f"4. {run['total_issues']} issues found.")

    # --- 5. Cleanup ---
    await v.adelete()
    await w.adelete()
    print("5. Cleaned up.\n\nDone.")

if __name__ == "__main__":
    asyncio.run(main())
```

<Tip>
  Source: `examples/workspaces/07_async.py` in the SDK repo.
</Tip>
