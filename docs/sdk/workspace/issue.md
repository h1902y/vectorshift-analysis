> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Verification issue reference

> A single finding from a verification run, and how to resolve it.

A `VerificationIssue` is a single finding from a verification run — for example
an unsupported figure or an out-of-date citation. Use the triage methods below
to resolve each one: mark it fixed, flag it for review, ignore it, or verify it.

## Triage

### `set_status`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  VerificationIssue.set_status(status: IssueStatus, comment: Optional[str] = None) -> VerificationIssue
  ```

  ```python Async theme={"languages":{}}
  async VerificationIssue.aset_status(status: IssueStatus, comment: Optional[str] = None) -> VerificationIssue
  ```
</CodeGroup>

Set this issue's status, optionally attaching a comment.

**Parameters**

<ParamField path="status" type="IssueStatus" required>
  See [`IssueStatus`](#issuestatus).
</ParamField>

<ParamField path="comment" type="Optional[str]" default="None" />

**Returns**

<ResponseField name="returns" type="VerificationIssue" />

### `ignore`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  VerificationIssue.ignore(comment: Optional[str] = None) -> VerificationIssue
  ```

  ```python Async theme={"languages":{}}
  async VerificationIssue.aignore(comment: Optional[str] = None) -> VerificationIssue
  ```
</CodeGroup>

**Parameters**

<ParamField path="comment" type="Optional[str]" default="None" />

**Returns**

<ResponseField name="returns" type="VerificationIssue" />

### `flag`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  VerificationIssue.flag(comment: Optional[str] = None) -> VerificationIssue
  ```

  ```python Async theme={"languages":{}}
  async VerificationIssue.aflag(comment: Optional[str] = None) -> VerificationIssue
  ```
</CodeGroup>

**Parameters**

<ParamField path="comment" type="Optional[str]" default="None" />

**Returns**

<ResponseField name="returns" type="VerificationIssue" />

### `mark_fixed`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  VerificationIssue.mark_fixed(comment: Optional[str] = None) -> VerificationIssue
  ```

  ```python Async theme={"languages":{}}
  async VerificationIssue.amark_fixed(comment: Optional[str] = None) -> VerificationIssue
  ```
</CodeGroup>

**Parameters**

<ParamField path="comment" type="Optional[str]" default="None" />

**Returns**

<ResponseField name="returns" type="VerificationIssue" />

### `verify`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  VerificationIssue.verify(comment: Optional[str] = None) -> VerificationIssue
  ```

  ```python Async theme={"languages":{}}
  async VerificationIssue.averify(comment: Optional[str] = None) -> VerificationIssue
  ```
</CodeGroup>

**Parameters**

<ParamField path="comment" type="Optional[str]" default="None" />

**Returns**

<ResponseField name="returns" type="VerificationIssue" />

## Types

Configuration objects, response shapes, and enums used by the methods above.

### `IssueStatus`

Where an issue stands after triage: open, ignored, flagged, fixed, or verified.

**Members**

* `OPEN` = `"STATUS_OPEN"`
* `IGNORED` = `"STATUS_IGNORED"`
* `FLAGGED` = `"STATUS_FLAGGED"`
* `FIXED` = `"STATUS_FIXED"`
* `VERIFIED` = `"STATUS_VERIFIED"`

### `IssueSeverity`

How serious an issue is, from an outright error to already verified.

**Members**

* `ERROR` = `"SEVERITY_ERROR"`
* `REVIEW_NEEDED` = `"SEVERITY_REVIEW_NEEDED"`
* `VERIFIED` = `"SEVERITY_VERIFIED"`
* `NOT_FOUND` = `"SEVERITY_NOT_FOUND"`

### `IssueCategory`

What kind of content an issue concerns: a number, text, formatting, or a table.

**Members**

* `NUMBER` = `"NUMBER"`
* `TEXT` = `"TEXT"`
* `FORMAT` = `"FORMAT"`
* `TABLE` = `"TABLE"`
