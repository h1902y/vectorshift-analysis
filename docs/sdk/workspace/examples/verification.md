> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Verification

> Check a document against a workspace and triage the issues found

Verification compares a document against the rest of the workspace and flags
problems. This shows how to run one, watch its progress, and act on the results.

```python theme={"languages":{}}
from vectorshift import Workspace
from vectorshift.workspace import (
    CheckType,
    IssueSeverity,
    IssueStatus,
    VerificationRunFailed,
    WaitTimeout,
)

w = Workspace.get_or_create(name="Q3 Report Review", portal="Acme Research")

# --- 1. Create a verification of the report ---
v = w.verifications.new(name="Report check", main_file="./report.pdf")
print(f"1. Created verification (id={v.id})")

# --- 2. Run and wait, with a progress callback ---
try:
    run = v.run_and_wait(
        enabled_checks=[
            CheckType.PRIMARY_SOURCE,
            CheckType.CROSS_DOCUMENT,
            CheckType.STALENESS,
        ],
        on_status=lambda s: print("   verification:", s),
        timeout=1800,
    )
    print(f"2. {run['total_issues']} issues in version {run.version}")
except VerificationRunFailed as e:
    print("2. Run failed:", e.message)
except WaitTimeout as e:
    print("2. Still running, last status:", e.last_status)

# --- 3. Triage the errors ---
for issue in v.issues(severity=[IssueSeverity.ERROR]):
    if issue.suggested_fix:
        issue.mark_fixed(comment="Applied suggested fix")
    else:
        issue.flag(comment="Needs review")
open_count = len(v.issues(status=[IssueStatus.OPEN]))
print(f"3. Triaged error-severity issues; {open_count} still open.")

# --- 4. Cleanup ---
v.delete()
print("4. Deleted verification.\n\nDone.")
```

<Tip>
  Source: `examples/workspaces/05_verification.py` in the SDK repo.
</Tip>
