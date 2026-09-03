> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# CLI reference

> The vectorshift command — connect and manage integrations from your terminal.

The `vectorshift` CLI is a thin wrapper over the SDK for connecting and managing [integrations](/sdk/integrations/overview) from the terminal. Every command maps directly to an [`Integration`](/sdk/integrations/reference) method.

## Install

The CLI ships with the SDK — no extra needed:

```bash theme={"languages":{}}
pip install vectorshift
```

This installs the `vectorshift` command alongside the Python library.

## Authentication

Run `login` once to store a key, or set `VECTORSHIFT_API_KEY` in your environment. Every command resolves the key in this order (first match wins):

1. `--api-key` flag on the command
2. `VECTORSHIFT_API_KEY` environment variable
3. `~/.vectorshift/config.toml` (written by `vectorshift login`)
4. `vectorshift.api_key` set in Python

If none resolve, the command exits with `No API key found. Run 'vectorshift login' or set VECTORSHIFT_API_KEY.`

The config file is minimal:

```toml theme={"languages":{}}
[auth]
api_key = "sk_..."
```

## Commands

### `login`

Store an API key in `~/.vectorshift/config.toml`.

```bash theme={"languages":{}}
vectorshift login [--api-key <key>] [--no-browser]
```

With no `--api-key`, it opens `https://app.vectorshift.ai/settings/keys` in your browser and prompts you to paste the key (input hidden).

<ParamField path="--api-key" type="str">
  Store this key directly, without opening the browser or prompting.
</ParamField>

<ParamField path="--no-browser" type="flag">
  Don't open the browser; just print the keys URL and prompt for the paste.
</ParamField>

```bash theme={"languages":{}}
# Interactive: opens the browser, then prompts for the key
vectorshift login

# Non-interactive (CI): pass the key directly
vectorshift login --api-key sk_xxxxxxxx
```

Output: `✓ Saved API key to /Users/you/.vectorshift/config.toml`

***

### `connect`

Connect an integration. Without `--cred`, opens a hosted page to enter credentials / consent (works for form, OAuth, and hybrid types) and blocks until it completes; with `--cred`, does an instant form-based create from the CLI.

```bash theme={"languages":{}}
vectorshift connect <type> [--name <name>] [--scopes <scopes>] \
  [--cred key=value ...] [--no-browser] [--share] \
  [--link-expires-in <seconds>] [--api-key <key>]
```

<ParamField path="type" type="str" required>
  Integration type. Accepts the route name (lowercase, e.g. `slack`, `postgres`, `google-drive`) or the display name (e.g. `Slack`). See [`Integration.types()`](/sdk/integrations/reference#types) for the catalogue.
</ParamField>

<ParamField path="--name" type="str">
  A custom name for this integration instance.
</ParamField>

<ParamField path="--scopes" type="str">
  Space-separated OAuth scopes to request (OAuth types only).
</ParamField>

<ParamField path="--cred" type="key=value (repeatable)">
  A form credential. Repeat for multiple fields. When present, the integration is created instantly from the CLI with no browser. Omit to enter credentials / consent in the hosted page instead.
</ParamField>

<ParamField path="--no-browser" type="flag">
  Print the connect URL instead of opening it, then wait for completion.
</ParamField>

<ParamField path="--share" type="flag">
  Generate a long-lived shareable connect link and return immediately (does **not** wait for completion). Prints the link and `session_id`.
</ParamField>

<ParamField path="--link-expires-in" type="int">
  Link time-to-live in seconds (use with `--share`).
</ParamField>

<ParamField path="--api-key" type="str">
  Override the resolved API key for this command.
</ParamField>

```bash theme={"languages":{}}
# OAuth — opens the browser, streams status, waits for consent
vectorshift connect slack

# OAuth with custom scopes
vectorshift connect google-drive --scopes "https://www.googleapis.com/auth/drive.readonly"

# Form — created instantly from the CLI
vectorshift connect postgres \
  --cred host=db.example.com --cred database=app \
  --cred username=reader --cred password=secret --name prod-db

# Headless — print the URL to open elsewhere, then wait
vectorshift connect notion --no-browser

# Delegate the connection — long-lived link, don't wait
vectorshift connect slack --share --link-expires-in 86400
```

Output while waiting streams each status change, e.g. `  [pending]`, then on success:
`✓ connected slack (integ_abc123)`. With `--share`: `Shareable link: <url>` and `session_id: <id>`.

<Warning>
  `--cred` values are visible in your shell history and process list. For sensitive credentials, omit `--cred` and enter them in the hosted page instead.
</Warning>

***

### `integrations list`

List your integrations, optionally filtered by type.

```bash theme={"languages":{}}
vectorshift integrations list [--type <type>] [--api-key <key>]
```

<ParamField path="--type" type="str">
  Filter by integration type (e.g. `slack`, `postgres`).
</ParamField>

<ParamField path="--api-key" type="str">
  Override the resolved API key.
</ParamField>

```bash theme={"languages":{}}
vectorshift integrations list
vectorshift integrations list --type slack
```

Output is tab-separated — `object_id`, `type`, `status`, `name` — one per line, or `No integrations found.`:

```
integ_abc123    slack       done        Acme workspace
integ_def456    postgres    done        prod-db
```

***

### `status`

Show a single integration's health status.

```bash theme={"languages":{}}
vectorshift status <id> [--api-key <key>]
```

<ParamField path="id" type="str" required>
  The integration's `object_id`.
</ParamField>

<ParamField path="--api-key" type="str">
  Override the resolved API key.
</ParamField>

```bash theme={"languages":{}}
vectorshift status integ_abc123
```

Output: the status string — `done`, `loading`, or `unhealthy`.

***

### `sync`

Trigger a metadata resync (refresh available tables, files, etc.). Supported for revamped integration types. Fire-and-forget.

```bash theme={"languages":{}}
vectorshift sync <id> [--api-key <key>]
```

<ParamField path="id" type="str" required>
  The integration's `object_id`.
</ParamField>

<ParamField path="--api-key" type="str">
  Override the resolved API key.
</ParamField>

```bash theme={"languages":{}}
vectorshift sync integ_abc123
```

Output: `✓ sync requested`

***

### `reauth`

Reconnect an existing integration in place to refresh expired or revoked auth. Keeps the same `object_id`.

```bash theme={"languages":{}}
vectorshift reauth <id> [--no-browser] [--api-key <key>]
```

<ParamField path="id" type="str" required>
  The integration's `object_id`.
</ParamField>

<ParamField path="--no-browser" type="flag">
  Print the reconnect URL instead of opening it, then wait.
</ParamField>

<ParamField path="--api-key" type="str">
  Override the resolved API key.
</ParamField>

```bash theme={"languages":{}}
vectorshift reauth integ_abc123
```

Output streams status changes, then: `✓ reconnected slack (integ_abc123)`.

***

### `disconnect`

Delete an integration.

```bash theme={"languages":{}}
vectorshift disconnect <id> [--api-key <key>]
```

<ParamField path="id" type="str" required>
  The integration's `object_id`.
</ParamField>

<ParamField path="--api-key" type="str">
  Override the resolved API key.
</ParamField>

```bash theme={"languages":{}}
vectorshift disconnect integ_abc123
```

Output: `✓ disconnected`

## What's next

<Columns cols={2}>
  <Card title="Python reference" icon="book-open" href="/sdk/integrations/reference">
    The `Integration` API each command wraps.
  </Card>

  <Card title="Overview" icon="plug" href="/sdk/integrations/overview">
    Mental model and where integrations plug in.
  </Card>
</Columns>
