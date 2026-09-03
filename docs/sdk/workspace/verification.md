> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Verification reference

> Check a document against the data room and surface issues to triage.

A `Verification` checks a document against everything in your workspace's data
room and reports back a list of issues — unsupported numbers, stale figures,
mismatches between documents, and more.

Create one from a workspace with `workspace.verifications.new(...)`, run it, then
review the issues it returns. List a workspace's past verifications with
`workspace.verifications.list()` and re-open one with
`workspace.verifications.fetch(id)`.

## Running a check

### `run`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Verification.run(updated_main_file: Optional[FileArg] = None, source_files: Optional[list[FileArg]] = None, formatting_conventions: Optional[dict] = None, enabled_checks: Optional[list[Any]] = None) -> None
  ```

  ```python Async theme={"languages":{}}
  async Verification.arun(updated_main_file: Optional[FileArg] = None, source_files: Optional[list[FileArg]] = None, formatting_conventions: Optional[dict] = None, enabled_checks: Optional[list[Any]] = None) -> None
  ```
</CodeGroup>

Kick off a verification run. Returns immediately (no poll).

**Parameters**

<ParamField path="updated_main_file" type="Optional[FileArg]" default="None" />

<ParamField path="source_files" type="Optional[list[FileArg]]" default="None" />

<ParamField path="formatting_conventions" type="Optional[dict]" default="None" />

<ParamField path="enabled_checks" type="Optional[list[Any]]" default="None" />

### `run_and_wait`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Verification.run_and_wait(updated_main_file: Optional[FileArg] = None, source_files: Optional[list[FileArg]] = None, formatting_conventions: Optional[dict] = None, enabled_checks: Optional[list[Any]] = None, poll_interval: float = 15.0, timeout: float = 1800.0, on_status: Optional[Callable[[VerificationStatus], None]] = None) -> VerificationRunSummary
  ```

  ```python Async theme={"languages":{}}
  async Verification.arun_and_wait(updated_main_file: Optional[FileArg] = None, source_files: Optional[list[FileArg]] = None, formatting_conventions: Optional[dict] = None, enabled_checks: Optional[list[Any]] = None, poll_interval: float = 15.0, timeout: float = 1800.0, on_status: Optional[Callable[[VerificationStatus], None]] = None) -> VerificationRunSummary
  ```
</CodeGroup>

Kick off a run, then poll until COMPLETED (or fail/timeout).

**Parameters**

<ParamField path="updated_main_file" type="Optional[FileArg]" default="None" />

<ParamField path="source_files" type="Optional[list[FileArg]]" default="None" />

<ParamField path="formatting_conventions" type="Optional[dict]" default="None" />

<ParamField path="enabled_checks" type="Optional[list[Any]]" default="None" />

<ParamField path="poll_interval" type="float" default="15.0" />

<ParamField path="timeout" type="float" default="1800.0" />

<ParamField path="on_status" type="Optional[Callable[[VerificationStatus], None]]" default="None">
  See [`VerificationStatus`](#verificationstatus).
</ParamField>

**Returns**

<ResponseField name="returns" type="VerificationRunSummary">
  See [`VerificationRunSummary`](#verificationrunsummary).
</ResponseField>

## Reviewing issues

### `issues`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Verification.issues(severity: Optional[list[Any]] = None, category: Optional[list[Any]] = None, status: Optional[list[Any]] = None, slide: Optional[int] = None, offset: int = 0, limit: int = 50, sort_by: Optional[str] = None) -> "list[VerificationIssue]"
  ```

  ```python Async theme={"languages":{}}
  async Verification.aissues(severity: Optional[list[Any]] = None, category: Optional[list[Any]] = None, status: Optional[list[Any]] = None, slide: Optional[int] = None, offset: int = 0, limit: int = 50, sort_by: Optional[str] = None) -> "list[VerificationIssue]"
  ```
</CodeGroup>

Fetch a page of issues for this verification.

**Parameters**

<ParamField path="severity" type="Optional[list[Any]]" default="None" />

<ParamField path="category" type="Optional[list[Any]]" default="None" />

<ParamField path="status" type="Optional[list[Any]]" default="None" />

<ParamField path="slide" type="Optional[int]" default="None" />

<ParamField path="offset" type="int" default="0" />

<ParamField path="limit" type="int" default="50" />

<ParamField path="sort_by" type="Optional[str]" default="None" />

**Returns**

<ResponseField name="returns" type="list[VerificationIssue]" />

## Status

### `refresh`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Verification.refresh() -> Verification
  ```

  ```python Async theme={"languages":{}}
  async Verification.arefresh() -> Verification
  ```
</CodeGroup>

Re-read status and counts via `GET /verification?id=`.

**Returns**

<ResponseField name="returns" type="Verification" />

## Lifecycle

### `delete`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Verification.delete() -> None
  ```

  ```python Async theme={"languages":{}}
  async Verification.adelete() -> None
  ```
</CodeGroup>

## Types

Configuration objects, response shapes, and enums used by the methods above.

### `CheckType`

A kind of check a verification can run against a document.

**Members**

* `PRIMARY_SOURCE` = `"PRIMARY_SOURCE"`
* `PROVENANCE` = `"PROVENANCE"`
* `CROSS_DOCUMENT` = `"CROSS_DOCUMENT"`
* `COHERENCE` = `"COHERENCE"`
* `STALENESS` = `"STALENESS"`
* `VERSION_DELTA` = `"VERSION_DELTA"`
* `STRATEGIC_ALIGNMENT` = `"STRATEGIC_ALIGNMENT"`
* `REFERENCES` = `"REFERENCES"`
* `UI_ISSUE` = `"UI_ISSUE"`
* `TABLE_SOURCE` = `"TABLE_SOURCE"`
* `SOURCES` = `"SOURCES"`

### `CheckResult`

The outcome of a single check: pass, fail, needs review, or not found.

**Members**

* `PASS` = `"CHECK_PASS"`
* `FAIL` = `"CHECK_FAIL"`
* `REVIEW_NEEDED` = `"CHECK_REVIEW_NEEDED"`
* `NOT_FOUND` = `"CHECK_NOT_FOUND"`

### `VerificationStatus`

The status of a verification run, from pending through completed or failed.

**Members**

* `PENDING` = `"VERIFICATION_PENDING"`
* `PARSING` = `"VERIFICATION_PARSING"`
* `DISCOVERING` = `"VERIFICATION_DISCOVERING"`
* `VERIFYING` = `"VERIFICATION_VERIFYING"`
* `COMPLETED` = `"VERIFICATION_COMPLETED"`
* `FAILED` = `"VERIFICATION_FAILED"`

### `VerificationType`

What a verification looks for: a full check or just citation discovery.

**Members**

* `FULL` = `"VERIFICATION_FULL"`
* `FIND_CITATIONS` = `"VERIFICATION_FIND_CITATIONS"`

### `VerificationRunSummary`

**Fields**

<ParamField path="total_issues" type="int" required />

<ParamField path="categories" type="list[CategorySummary]" required />

<ParamField path="version" type="str" required />

<ParamField path="status" type="<enum VerificationStatus>" required />

### `CheckSummary`

**Fields**

<ParamField path="check_type" type="str" required />

<ParamField path="result" type="str" required />

<ParamField path="summary" type="str" required />

<ParamField path="data" type="Any" required />

### `CategorySummary`

**Fields**

<ParamField path="category" type="<enum IssueCategory>" required />

<ParamField path="verified" type="int" required />

<ParamField path="review_needed" type="int" required />

<ParamField path="errors" type="int" required />

<ParamField path="not_found" type="int" required />

### `VersionSummary`

**Fields**

<ParamField path="version" type="str" required />

<ParamField path="total_issues" type="int" required />

<ParamField path="resolved_issues" type="int" required />

<ParamField path="created_at" type="str" required />

<ParamField path="status" type="<enum VerificationStatus>" required />
