> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Integrations reference

> Connect, poll, and manage integrations from Python — Integration, ConnectionRequest, types, credentials, and errors.

Everything importable from `vectorshift`:

```python theme={"languages":{}}
from vectorshift import (
    Integration, ConnectionRequest,
    IntegrationType, ConnectionStatus, IntegrationStatus,
    IntegrationError, IntegrationNotFound, UnknownIntegrationType,
    ConnectionFailed, ConnectionExpired, ConnectionTimeout,
)
```

## Connecting

### `connect`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Integration.connect(
      type: IntegrationType | str,
      credentials: Optional[dict] = None,
      name: Optional[str] = None,
      open_browser: bool = True,
      scopes: Optional[str] = None,
      share: bool = False,
      link_expires_in: Optional[int] = None,
      require_org_member: bool = False,
      integration_id: Optional[str] = None,
  ) -> ConnectionRequest
  ```

  ```python Async theme={"languages":{}}
  async Integration.aconnect(
      type: IntegrationType | str,
      credentials: Optional[dict] = None,
      name: Optional[str] = None,
      open_browser: bool = True,
      scopes: Optional[str] = None,
      share: bool = False,
      link_expires_in: Optional[int] = None,
      require_org_member: bool = False,
      integration_id: Optional[str] = None,
  ) -> ConnectionRequest
  ```
</CodeGroup>

Passing `credentials=` does an instant form-based create and returns a `ConnectionRequest` that is already `ACTIVE`. Otherwise (form, OAuth, or hybrid) it opens a hosted connect page and returns a request carrying a `connect_url`; drive it to completion with [`.wait()`](#wait).

**Parameters**

<ParamField path="type" type="IntegrationType | str" required>
  The integration type. Accepts an [`IntegrationType`](#integrationtype), a display name (`"Slack"`), or a route name (`"slack"`). Unknown values raise [`UnknownIntegrationType`](#errors).
</ParamField>

<ParamField path="credentials" type="Optional[dict]" default="None">
  Form credentials for a [credential-capable type](#type-catalogue). When present, required fields are validated client-side and the integration is created instantly. Omit to enter them / consent in the hosted page.
</ParamField>

<ParamField path="name" type="Optional[str]" default="None">
  A custom name for this integration instance.
</ParamField>

<ParamField path="open_browser" type="bool" default="True">
  Open `connect_url` in the default browser. Set `False` on headless hosts and hand the user `req.connect_url` yourself.
</ParamField>

<ParamField path="scopes" type="Optional[str]" default="None">
  Space-separated OAuth scopes to request (OAuth types only).
</ParamField>

<ParamField path="share" type="bool" default="False">
  Return a long-lived shareable connect link without waiting. Combine with `link_expires_in`.
</ParamField>

<ParamField path="link_expires_in" type="Optional[int]" default="None">
  Shareable-link TTL in seconds.
</ParamField>

<ParamField path="require_org_member" type="bool" default="False">
  Require the person completing the connection to be a member of your org.
</ParamField>

<ParamField path="integration_id" type="Optional[str]" default="None">
  Reconnect an existing integration in place instead of creating a new one. Prefer [`reauth`](#reauth).
</ParamField>

**Returns** — a [`ConnectionRequest`](#connectionrequest).

```python theme={"languages":{}}
# OAuth
integ = Integration.connect("slack").wait()

# Form — instant
integ = Integration.connect(
    "postgres",
    credentials={"host": "h", "database": "d", "username": "u", "password": "p"},
).wait()
```

### `reauth`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  integration.reauth(open_browser: bool = True, scopes: Optional[str] = None) -> ConnectionRequest
  ```

  ```python Async theme={"languages":{}}
  async integration.areauth(open_browser: bool = True, scopes: Optional[str] = None) -> ConnectionRequest
  ```
</CodeGroup>

Reconnect this integration in place to refresh expired or revoked auth, keeping the same `object_id`. Opens the hosted page; `.wait()` resolves when done.

```python theme={"languages":{}}
integ = Integration.fetch(id="integ_abc123")
if integ.get_status() == "unhealthy":
    integ.reauth().wait()
```

## Managing

### `fetch`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Integration.fetch(id: Optional[str] = None, name: Optional[str] = None) -> Integration
  ```

  ```python Async theme={"languages":{}}
  async Integration.afetch(id: Optional[str] = None, name: Optional[str] = None) -> Integration
  ```
</CodeGroup>

Fetch by `id` or `name` — at least one is required, else `ValueError`.

### `list`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Integration.list(type: Optional[str] = None, offset: Optional[int] = None, limit: Optional[int] = None) -> list[Integration]
  ```

  ```python Async theme={"languages":{}}
  async Integration.alist(type: Optional[str] = None, offset: Optional[int] = None, limit: Optional[int] = None) -> list[Integration]
  ```
</CodeGroup>

List integrations visible to the API key's org, optionally filtered by `type` (route name, e.g. `"slack"`).

### `get_status`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  integration.get_status() -> str
  ```

  ```python Async theme={"languages":{}}
  async integration.aget_status() -> str
  ```
</CodeGroup>

Fetch the current health status — `"done"`, `"loading"`, or `"unhealthy"` (see [`IntegrationStatus`](#integrationstatus)).

### `sync` / `resync`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  integration.resync() -> None
  integration.sync() -> None   # alias
  ```

  ```python Async theme={"languages":{}}
  async integration.aresync() -> None
  ```
</CodeGroup>

Trigger a global metadata resync of every vectorstore that uses this integration. Fire-and-forget; only supported for revamped integration types. See the [KB resync example](/sdk/knowledge-base/examples/resync-integration) for the KB-aware `kb.resync_integration(id)` wrapper.

### `refresh`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  integration.refresh() -> Integration
  ```

  ```python Async theme={"languages":{}}
  async integration.arefresh() -> Integration
  ```
</CodeGroup>

Re-fetch this integration's fields from the server, mutating it in place and returning `self`.

### `delete`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  integration.delete() -> None
  ```

  ```python Async theme={"languages":{}}
  async integration.adelete() -> None
  ```
</CodeGroup>

Disconnect and delete the integration.

### `to_dict`

```python theme={"languages":{}}
integration.to_dict() -> dict   # {"object_id": ..., "object_type": ...}
```

The serialized reference shape (`object_id` + `object_type`) a Pipeline node / Agent tool stores. The fluent builder and tool classes accept the `Integration` object directly — `pipeline.add(name="…").integration_slack(integration=integ, …)` — so you rarely call `to_dict()` yourself; reach for it only when building a node config by hand.

## Sessions & catalogue

### `from_session`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Integration.from_session(session_id: str) -> ConnectionRequest
  ```

  ```python Async theme={"languages":{}}
  async Integration.afrom_session(session_id: str) -> ConnectionRequest
  ```
</CodeGroup>

Rebuild a `ConnectionRequest` from a persisted `session_id` — reconcile a delegated / `share=True` attempt after the original process exited.

### `revoke_session`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Integration.revoke_session(session_id: str) -> None
  ```

  ```python Async theme={"languages":{}}
  async Integration.arevoke_session(session_id: str) -> None
  ```
</CodeGroup>

Kill an outstanding connect-session; subsequent opens of its link expire.

### `types`

```python theme={"languages":{}}
Integration.types() -> list[IntegrationType]
```

The authoritative catalogue of supported types.

### `required_fields`

```python theme={"languages":{}}
Integration.required_fields(type: IntegrationType | str) -> tuple[str, ...]
```

Required credential field names for a credential-capable type (empty tuple for OAuth-only types).

```python theme={"languages":{}}
Integration.required_fields("postgres")   # ('host', 'database', 'username', 'password')
```

## `Integration`

Attributes on a fetched instance:

<ResponseField name="object_id" type="str">The unique id. Use `to_dict()` / this value to reference the integration elsewhere.</ResponseField>
<ResponseField name="name" type="Optional[str]">Display / account name.</ResponseField>
<ResponseField name="type" type="Optional[str]">Route name, e.g. `"slack"`.</ResponseField>
<ResponseField name="status" type="Optional[str]">Health status — see [`IntegrationStatus`](#integrationstatus).</ResponseField>
<ResponseField name="created_date" type="Optional[str]">Creation timestamp.</ResponseField>
<ResponseField name="authorized_scopes" type="Optional[list[str]]">OAuth scopes granted.</ResponseField>
<ResponseField name="allowed_actions" type="Optional[list[str]]">Actions this connection permits.</ResponseField>
<ResponseField name="unhealthy" type="Optional[bool]">Convenience flag for a degraded connection.</ResponseField>

## `ConnectionRequest`

One in-flight connection attempt. OAuth requests start at `INITIATED` with a `connect_url`; form requests are born `ACTIVE` with the `Integration` already attached, so `wait()` returns instantly.

**Attributes**

<ResponseField name="session_id" type="str">The connect-session id (aliased as `.id`). Persist it to reconcile later via [`from_session`](#from-session).</ResponseField>
<ResponseField name="type" type="IntegrationType">The type being connected.</ResponseField>
<ResponseField name="status" type="ConnectionStatus">Current session status.</ResponseField>
<ResponseField name="connect_url" type="Optional[str]">The URL the user opens to consent / enter credentials.</ResponseField>

### `wait`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  req.wait(
      timeout: float = 300.0,
      poll_interval: float = 2.0,
      on_status_change: Optional[Callable[[ConnectionStatus], None]] = None,
  ) -> Integration
  ```

  ```python Async theme={"languages":{}}
  async req.await_completion(
      timeout: float = 300.0,
      poll_interval: float = 2.0,
      on_status_change: Optional[Callable[[ConnectionStatus], None]] = None,
  ) -> Integration
  ```
</CodeGroup>

Poll until the session is `ACTIVE` and return the live `Integration`. Raises [`ConnectionFailed`](#errors) / [`ConnectionExpired`](#errors) on a terminal bad status, and [`ConnectionTimeout`](#errors) if `timeout` elapses first (the attempt stays live server-side — re-open `connect_url` or re-poll).

```python theme={"languages":{}}
req = Integration.connect("slack")
integ = req.wait(timeout=180, on_status_change=lambda s: print(s.value))
```

### `get_status`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  req.get_status() -> ConnectionStatus
  ```

  ```python Async theme={"languages":{}}
  async req.aget_status() -> ConnectionStatus
  ```
</CodeGroup>

A single non-blocking poll; updates and returns `req.status`.

### `get_result`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  req.get_result() -> Integration
  ```

  ```python Async theme={"languages":{}}
  async req.aget_result() -> Integration
  ```
</CodeGroup>

Return the `Integration` if the session is already `ACTIVE`; raises [`ConnectionFailed`](#errors) if not yet active. Use after a `get_status()` confirms `ACTIVE`, when you don't want to block in `wait()`.

## Enums

### `IntegrationType`

A `StrEnum` whose value is the display name. Members carry:

<ResponseField name="route_name" type="str (property)">URL-safe id the backend uses (e.g. `IntegrationType.SLACK.route_name == "slack"`).</ResponseField>
<ResponseField name="is_form_only" type="bool (property)">`True` for types that connect via credentials only (no OAuth).</ResponseField>
<ResponseField name="auth_mode" type="AuthMode (property)">`AuthMode.FORM` when `is_form_only`, else `AuthMode.OAUTH`.</ResponseField>
<ResponseField name="from_route(route)" type="classmethod">Resolve a route name back to a member; unknown routes raise [`UnknownIntegrationType`](#errors).</ResponseField>

Passing a route name where a display name is expected also resolves (`IntegrationType("slack")` works).

### `AuthMode`

`OAUTH` · `FORM`.

### `ConnectionStatus`

The lifecycle of a `ConnectionRequest`: `INITIATED` · `PENDING` · `ACTIVE` · `FAILED` · `EXPIRED`.

### `IntegrationStatus`

The health of a configured integration: `LOADING` · `DONE` · `UNHEALTHY`.

## Type catalogue

76 supported types. `route_name` is what you pass to `connect(...)` / the CLI. **Auth** is `OAuth` (browser consent), `Form` (credentials only — see fields below), or `OAuth + form` (hybrid: connect via the hosted page or by passing `credentials=`).

| Type                        | `route_name`                  | Auth         |
| --------------------------- | ----------------------------- | ------------ |
| Box                         | `box`                         | OAuth        |
| Google Drive                | `google-drive`                | OAuth        |
| Google Docs                 | `google-docs`                 | OAuth        |
| Google Sheets               | `google-sheets`               | OAuth        |
| Google Slides               | `google-slides`               | OAuth        |
| Google Calendar             | `google-calendar`             | OAuth        |
| Google Ads                  | `google-ads`                  | OAuth        |
| Google Tasks                | `google-tasks`                | OAuth        |
| Google Chat                 | `google-chat`                 | OAuth        |
| Google Contacts             | `google-contacts`             | OAuth        |
| Google BigQuery             | `google-big-query`            | OAuth        |
| Google Workspace Admin      | `google-workspace-admin`      | OAuth        |
| Google Analytics            | `google-analytics`            | OAuth        |
| Google Cloud Storage        | `google-cloud-storage`        | OAuth        |
| Google Firebase Realtime DB | `google-firebase-realtime-db` | OAuth        |
| Google Cloud Firestore      | `google-cloud-firestore`      | OAuth        |
| Google Perspective          | `google-perspective`          | Form         |
| Slack                       | `slack`                       | OAuth        |
| Airtable                    | `airtable`                    | OAuth        |
| Notion                      | `notion`                      | OAuth        |
| Microsoft                   | `microsoft`                   | OAuth        |
| Sharepoint                  | `sharepoint`                  | OAuth        |
| Dropbox                     | `dropbox`                     | OAuth        |
| Hubspot                     | `hubspot`                     | OAuth        |
| Gmail                       | `gmail`                       | OAuth        |
| Outlook                     | `outlook`                     | OAuth        |
| Jira                        | `jira`                        | OAuth        |
| Zendesk                     | `zendesk`                     | OAuth        |
| Stripe                      | `stripe`                      | OAuth        |
| Clickup                     | `clickup`                     | OAuth        |
| Databricks                  | `databricks`                  | OAuth + form |
| Github                      | `github`                      | OAuth        |
| Asana                       | `asana`                       | OAuth        |
| Discord                     | `discord`                     | OAuth        |
| Linear                      | `linear`                      | OAuth        |
| Teams                       | `teams`                       | OAuth        |
| Twilio                      | `twilio`                      | Form         |
| Postgres                    | `postgres`                    | Form         |
| MongoDB                     | `mongodb`                     | Form         |
| MySQL                       | `mysql`                       | Form         |
| Snowflake                   | `snowflake`                   | Form         |
| Microsoft SQL Server        | `microsoft-sql-server`        | OAuth + form |
| Aws S3                      | `aws-s3`                      | Form         |
| Telegram                    | `telegram`                    | OAuth + form |
| Reddit                      | `reddit`                      | OAuth        |
| Pinecone                    | `pinecone`                    | Form         |
| X                           | `x`                           | OAuth        |
| Mailchimp                   | `mailchimp`                   | OAuth        |
| Coda                        | `coda`                        | Form         |
| Openweathermap              | `openweathermap`              | OAuth + form |
| Elasticsearch               | `elasticsearch`               | Form         |
| Trello                      | `trello`                      | OAuth        |
| Monday                      | `monday`                      | OAuth        |
| Salesforce                  | `salesforce`                  | OAuth        |
| Typeform                    | `typeform`                    | OAuth        |
| Microsoft Calendar          | `microsoft-calendar`          | OAuth        |
| Microsoft Excel             | `microsoft-excel`             | OAuth        |
| Zoom                        | `zoom`                        | OAuth        |
| Servicenow                  | `servicenow`                  | OAuth        |
| Gitlab                      | `gitlab`                      | OAuth        |
| Apify                       | `apify`                       | Form         |
| Supabase                    | `supabase`                    | Form         |
| Oracle Database             | `oracle-database`             | Form         |
| Microsoft Dynamics CRM      | `microsoft_dynamics_crm`      | OAuth        |
| Zoho                        | `zoho`                        | OAuth        |
| QuickBooks                  | `quickbooks`                  | OAuth        |
| Intercom                    | `intercom`                    | OAuth        |
| Powerbi                     | `powerbi`                     | OAuth        |
| Youtube                     | `youtube`                     | OAuth        |
| Datadog                     | `datadog`                     | Form         |
| Pager Duty                  | `pager-duty`                  | OAuth        |
| Docusign                    | `docusign`                    | OAuth        |
| Figma                       | `figma`                       | OAuth        |
| Smartsheet                  | `smartsheet`                  | OAuth        |
| Sec Edgar                   | `sec-edgar`                   | Form         |
| Fred                        | `fred`                        | Form         |

### Credential fields

Types you can connect by passing `credentials=`. Required fields are validated client-side ([`MissingCredentials`](#errors)); optional fields tune the connection.

| Type                   | Required                                                       | Optional                                                                                                                 |
| ---------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `postgres`             | `host`, `database`, `username`, `password`                     | `port`, `ssl_mode`                                                                                                       |
| `mysql`                | `host`, `database`, `username`, `password`                     | `port`, `connect_timeout`, `ssl`, `ca_certificate`, `client_certificate`, `client_private_key`, `ssh_tunnel`, `ssh_host` |
| `microsoft-sql-server` | `server`, `database`, `username`, `password`                   | `port`, `domain`, `use_tls`, `ignore_ssl_issues`, `connect_timeout`, `request_timeout`, `tds_version`                    |
| `mongodb`              | `database`, `connection_uri`                                   | —                                                                                                                        |
| `snowflake`            | `username`, `password`, `account`, `role`                      | —                                                                                                                        |
| `oracle-database`      | `user`, `password`, `connection_string`                        | `use_ssl`, `wallet_password`, `wallet_content`                                                                           |
| `supabase`             | `host`, `service_role_secret`                                  | —                                                                                                                        |
| `aws-s3`               | `access_key_id`, `secret_access_key`                           | `region`, `bucket_name`                                                                                                  |
| `databricks`           | `workspace_url`, `access_token`                                | —                                                                                                                        |
| `pinecone`             | `api_key`                                                      | `region`, `environment`                                                                                                  |
| `elasticsearch`        | `api_key_id`, `api_key_secret`, `base_url`                     | —                                                                                                                        |
| `datadog`              | `api_key`, `url`                                               | `app_key`                                                                                                                |
| `telegram`             | `bot_token`                                                    | —                                                                                                                        |
| `twilio`               | `api_key_sid`, `api_key_secret`, `account_sid`, `phone_number` | —                                                                                                                        |
| `apify`                | `api_key`                                                      | —                                                                                                                        |
| `coda`                 | `api_key`                                                      | —                                                                                                                        |
| `openweathermap`       | `api_key`                                                      | —                                                                                                                        |
| `google-perspective`   | `api_key`                                                      | —                                                                                                                        |
| `fred`                 | `api_key`                                                      | —                                                                                                                        |
| `sec-edgar`            | `use_account_info`                                             | `user_name`, `contact_email`                                                                                             |

## Errors

All inherit from `IntegrationError` (itself a `VectorshiftError`).

<ResponseField name="IntegrationNotFound" type="exception">A lookup returned no result.</ResponseField>
<ResponseField name="UnknownIntegrationType" type="exception">A type / route name is not in the catalogue. Carries `.value`.</ResponseField>
<ResponseField name="MissingCredentials" type="exception">A form connect is missing required fields. Carries `.type` and `.missing_fields`. Raised client-side before any network call.</ResponseField>
<ResponseField name="ConnectionFailed" type="exception">The provider denied access or the backend errored. Carries `.reason`.</ResponseField>
<ResponseField name="ConnectionExpired" type="exception">The connect-session TTL elapsed before completion.</ResponseField>
<ResponseField name="ConnectionTimeout" type="exception">`wait()` exceeded its `timeout`. **Not** a failure — the attempt is still live; re-open `.connect_url` or re-poll. Carries `.connect_url`, `.last_status`, `.timeout`. Also a `TimeoutError`.</ResponseField>

```python theme={"languages":{}}
from vectorshift import Integration, ConnectionTimeout, ConnectionFailed, MissingCredentials

try:
    integ = Integration.connect("slack").wait(timeout=120)
except ConnectionTimeout as e:
    print(f"still pending — resume at {e.connect_url}")
except ConnectionFailed as e:
    print(f"denied: {e.reason}")
except MissingCredentials as e:
    print(f"{e.type} needs {e.missing_fields}")
```

See [Errors](/sdk/errors) for the full SDK exception hierarchy.

## What's next

<Columns cols={3}>
  <Card title="CLI reference" icon="terminal" href="/sdk/integrations/cli">
    The `vectorshift` command line.
  </Card>

  <Card title="Integration tools" icon="bot" href="/sdk/agent/tools/integrations">
    Per-service agent tool actions.
  </Card>

  <Card title="Integration nodes" icon="workflow" href="/sdk/pipeline/nodes/integration">
    Per-service pipeline node actions.
  </Card>
</Columns>
