> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Verification (advanced)

> Run verifications without waiting, then poll, filter, and triage

Start a verification and check on it yourself instead of blocking, filter the
issues it finds, and apply each of the triage actions.

```python theme={"languages":{}}
import time

from vectorshift import Workspace
from vectorshift.workspace import (
    CheckType,
    IssueCategory,
    IssueStatus,
    VerificationStatus,
)

w = Workspace.get_or_create(name="Q3 Report Review", portal="Acme Research")

# --- 1. Create a verification ---
v = w.verifications.new(name="Report check", main_file="./report.pdf")
print(f"1. Created verification (id={v.id})")

# --- 2. Start the run without waiting for it to finish ---
v.run(enabled_checks=[CheckType.PRIMARY_SOURCE, CheckType.CROSS_DOCUMENT])
print("2. Kicked off the run.")

# --- 3. Poll manually via refresh() until terminal ---
while v.status not in (VerificationStatus.COMPLETED, VerificationStatus.FAILED):
    v.refresh()
    print("   status:", v.status)
    time.sleep(15)
print(f"3. Run finished: {v.status}")

# --- 4. List and re-fetch this workspace's verifications ---
print(f"4. Workspace has {len(w.verifications.list())} verifications.")
v = w.verifications.fetch(v.id)

# --- 5. Filter issues by status, category, page, and sort order ---
issues = v.issues(
    status=[IssueStatus.OPEN],
    category=[IssueCategory.NUMBER],
    slide=3,
    sort_by="severity",
)
print(f"5. Found {len(issues)} matching issues.")

# --- 6. Exercise every triage action ---
if len(issues) >= 5:
    issues[0].set_status(IssueStatus.IGNORED)
    issues[1].ignore(comment="false positive")
    issues[2].flag(comment="needs review")
    issues[3].mark_fixed(comment="applied fix")
    issues[4].verify(comment="re-checked against source")
print("6. Triaged issues across all five actions.\n\nDone.")
```

<Tip>
  Source: `examples/workspaces/09_verification_advanced.py` in the SDK repo.
</Tip>
