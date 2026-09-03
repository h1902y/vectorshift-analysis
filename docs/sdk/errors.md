> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Errors

> Exception hierarchy, status codes, and patterns for handling SDK errors.

Every SDK error subclasses `VectorshiftError`. API errors carry the HTTP status, the endpoint, and a parsed error message — enough to branch on and log cleanly.

```python theme={"languages":{}}
from vectorshift import (
    Pipeline,
    VectorshiftError,
    AuthenticationError,
    RateLimitError,
    PipelineRunFailedError,
)

try:
    result = Pipeline.fetch(name="my-pipeline").run({"q": "..."})
except AuthenticationError:
    ...  # missing or invalid key
except RateLimitError as e:
    ...  # back off; e.error_message contains the server hint
except PipelineRunFailedError as e:
    ...  # e.task_id, e.run_error
except VectorshiftError as e:
    ...  # fallback for any other SDK error
```

## Hierarchy

```text theme={"languages":{}}
VectorshiftError                    # base for every SDK error
├── VectorshiftApiError             # HTTP error from the API (alias: ApiStatusError)
│   ├── BadRequestError             # 400
│   ├── AuthenticationError         # 401
│   ├── PermissionDeniedError       # 403
│   ├── NotFoundError               # 404
│   ├── UnprocessableEntityError    # 422
│   ├── RateLimitError              # 429
│   ├── InternalServerError         # 500+
│   ├── PipelineRunFailedError      # run completed with failed status
│   └── PollTimeoutError            # polling exceeded the timeout
├── ApiConnectionError              # network-level failure
│   └── ApiTimeoutError             # request timed out before reaching the API
├── SessionError                    # base for session errors
│   └── SessionDisconnectedError    # websocket dropped
└── (KnowledgeBase ingestion errors)
```

## Accessing objects you don't own

The API key carries the org context. Every `fetch` / `list` / `run` / `delete` call is scoped to the org and user behind that key — there is no client-side ownership check because the only enforcement point that matters is the server.

What you'll see when you try to touch something outside your scope:

* **`NotFoundError` (404)** — by design, the API returns 404 for both "doesn't exist" and "exists but you can't see it". This prevents leaking object ids across orgs. Most cross-org accesses surface as 404.
* **`PermissionDeniedError` (403)** — your key is valid but the specific operation isn't allowed (e.g. you have read access to an object but try to `delete` it).

The same rules apply transitively. If a [`Pipeline`](/sdk/pipeline/reference) you run references a sub-pipeline, [`KnowledgeBase`](/sdk/knowledge-base/reference), or [`Agent`](/sdk/agent/reference) belonging to a different org, the engine will fail the run with a `PipelineRunFailedError` whose `run_error` points at the un-resolvable reference.

```python theme={"languages":{}}
from vectorshift import Pipeline, NotFoundError, PermissionDeniedError

try:
    other = Pipeline.fetch(id="<id-from-another-org>")
except NotFoundError:
    ...  # most likely outcome — by design, 404 hides existence
except PermissionDeniedError:
    ...  # less common — key valid for the resource type but not this op
```

## Status code reference

| Status | Exception                  | Likely cause                                                        | Fix                                                                                                                                                      |
| ------ | -------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400    | `BadRequestError`          | Malformed request body (e.g. unsupported `input_type`)              | Check the call arguments against the [reference](/sdk/pipeline/reference).                                                                               |
| 401    | `AuthenticationError`      | `VECTORSHIFT_API_KEY` missing, expired, or revoked                  | Generate a new key at [Account → API Keys](https://app.vectorshift.ai/account/api-keys).                                                                 |
| 403    | `PermissionDeniedError`    | Key valid, but lacks scope for the org or object                    | Use a key from the org that owns the object, or ask an admin to grant access.                                                                            |
| 404    | `NotFoundError`            | Object id / name doesn't exist                                      | Verify the id in the platform, or fetch by `name=` instead.                                                                                              |
| 422    | `UnprocessableEntityError` | Server rejected the payload semantically (e.g. invalid node wiring) | `e.error_message` carries the server's reason. Enabling the [mypy plugin](/sdk/installation#type-checking-with-mypy) catches most of these at edit time. |
| 429    | `RateLimitError`           | You're hitting rate limits                                          | Back off and retry with jitter.                                                                                                                          |
| 500+   | `InternalServerError`      | Server-side issue                                                   | Retry once. If it persists, [contact support](/support).                                                                                                 |

## Connection errors

`ApiConnectionError` covers anything that fails before getting an HTTP response — DNS, TLS, refused connections. Its subclass `ApiTimeoutError` is raised when the request times out.

```python theme={"languages":{}}
from vectorshift import ApiConnectionError, ApiTimeoutError

try:
    Pipeline.list()
except ApiTimeoutError:
    ...  # request never reached the API in time
except ApiConnectionError:
    ...  # network down, proxy issue, etc.
```

## Pipeline-run errors

`PipelineRunFailedError` is raised when a run completes with a failed status. The exception carries the failing `task_id` and the server's `run_error` string.

```python theme={"languages":{}}
from vectorshift import PipelineRunFailedError, PollTimeoutError

try:
    result = pipeline.run({"q": "..."}, timeout=30)
except PipelineRunFailedError as e:
    print(f"run {e.task_id} failed: {e.run_error}")
except PollTimeoutError as e:
    print(f"run {e.task_id} did not complete within {e.timeout}s")
```

## Session errors

Conversational sessions communicate over a websocket. If the connection drops mid-stream, you get `SessionDisconnectedError`. Use the session as an async context manager — it cleans up on exit even when an error is raised.

```python theme={"languages":{}}
from vectorshift import SessionDisconnectedError

async with await agent.create_session() as session:
    await session.send("Hello")
    try:
        async for event in session.listen():
            ...
    except SessionDisconnectedError:
        ...  # reconnect or surface to the user
```

## Anatomy of `VectorshiftApiError`

Every API error exposes these attributes:

<ParamField path="status_code" type="int">
  HTTP status returned by the API.
</ParamField>

<ParamField path="method" type="str">
  HTTP method used (`"GET"`, `"POST"`, …).
</ParamField>

<ParamField path="endpoint" type="str">
  Path that was called, e.g. `"/pipeline/<id>/run"`.
</ParamField>

<ParamField path="error_message" type="str">
  Best-effort parsed message from the response body — checks `error`, `message`, `detail`, `errors` in order.
</ParamField>

<ParamField path="raw_response" type="str">
  Original response body. Useful when `error_message` doesn't surface what you need.
</ParamField>

The default `str(e)` formats all of these together, plus a hint for common statuses. Log it directly — no need to build your own message.

## What's next

<Columns cols={2}>
  <Card title="Authentication" icon="key" href="/sdk/authentication">
    Configure and rotate your API key.
  </Card>

  <Card title="Support" icon="life-buoy" href="/support">
    File an issue or reach the team.
  </Card>
</Columns>
