> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Integrations overview

> Connect third-party services (Slack, Postgres, Google Drive, Notion, …) once, then reference them from Agents, Pipelines, and Knowledge Bases.

An **Integration** is a saved connection to a third-party account — a Slack workspace, a Postgres database, a Google Drive, a Notion instance. You connect it once, and every other primitive references it by id: an [Agent tool](/sdk/agent/tools/integrations), a [Pipeline node](/sdk/pipeline/nodes/integration), or a [Knowledge Base source](/sdk/knowledge-base/examples/resync-integration).

<Info>
  **Prerequisites:** [Installed SDK](/sdk/installation) · [API key set](/sdk/authentication) · Python 3.10+. The `vectorshift` CLI ships with the SDK — `pip install vectorshift` installs it.
</Info>

## Mental model

* An Integration is created **once** and reused. It carries a stable `object_id`, a `type` (e.g. `slack`), a health `status`, and — for OAuth types — `authorized_scopes`.
* The **CLI is the fastest way to connect interactively** (it opens the browser and blocks for you); the **SDK** is for programmatic and server-side flows. Both do the same thing.

## Two ways to authenticate

How you connect a service depends entirely on how *it* authenticates. There are exactly two modes:

|                 | **OAuth**                                                             | **Form**                                                                     |
| --------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| How you connect | Approve access on the provider's site in a browser                    | Supply credentials yourself (host, keys, tokens)                             |
| Browser needed? | Yes — a consent screen                                                | No                                                                           |
| When it's ready | After you finish consent (`connect().wait()` polls until then)        | Instantly (`connect().wait()` returns right away)                            |
| Count           | 60 services                                                           | 16 services                                                                  |
| Examples        | Slack, Gmail, Notion, Google Drive, HubSpot, Salesforce, Jira, GitHub | Postgres, MySQL, MongoDB, Snowflake, AWS S3, Pinecone, Elasticsearch, Twilio |

Not sure which a service uses? Check the [full 76-type catalogue](/sdk/integrations/reference#type-catalogue), or ask in code:

```python theme={"languages":{}}
from vectorshift import IntegrationType

IntegrationType.SLACK.auth_mode        # -> AuthMode.OAUTH
IntegrationType.POSTGRES.is_form_only  # -> True
Integration.required_fields("postgres")  # -> ('host', 'database', 'username', 'password')
```

## Connect an integration

The quickest path is the CLI. The Python SDK does exactly the same thing when you need it in code — pick the auth mode that matches your service.

<Tabs>
  <Tab title="CLI (recommended)">
    ```bash theme={"languages":{}}
    # One-time: store your API key in ~/.vectorshift/config.toml
    vectorshift login

    # OAuth type — opens the browser, waits for consent, prints the new id
    vectorshift connect slack

    # Form type — pass credentials inline, created instantly (no browser)
    vectorshift connect postgres \
      --cred host=db.example.com \
      --cred database=app \
      --cred username=reader \
      --cred password=secret
    ```

    See the [CLI reference](/sdk/integrations/cli) for every command and flag.
  </Tab>

  <Tab title="Python — OAuth">
    ```python theme={"languages":{}}
    from vectorshift import Integration

    # Opens the browser (open_browser=True by default), then blocks until
    # the user finishes consent. Returns the live Integration.
    req = Integration.connect("slack")
    integration = req.wait(on_status_change=lambda s: print(f"[{s.value}]"))
    print(integration.object_id, integration.status)
    ```

    On a headless host, pass `open_browser=False` and hand the user `req.connect_url`.
  </Tab>

  <Tab title="Python — form credentials">
    ```python theme={"languages":{}}
    from vectorshift import Integration

    # Form types are created instantly — wait() returns without polling.
    integration = Integration.connect(
        "postgres",
        credentials={
            "host": "db.example.com",
            "database": "app",
            "username": "reader",
            "password": "secret",
        },
        name="prod-read-replica",
    ).wait()
    print(integration.object_id, integration.status)
    ```

    Required fields are validated client-side — a missing one raises [`MissingCredentials`](/sdk/integrations/reference#errors) before any network call. Look them up with `Integration.required_fields("postgres")`.
  </Tab>
</Tabs>

## Where integrations plug in

An Integration is rarely the endpoint — you connect it, then reference it from another primitive:

| Surface                   | How to reference it                                                                                             | Guide                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **Agent tool**            | Pass the `Integration` (static binding) or a `ToolInput(DYNAMIC)` (caller supplies it) to an `IntegrationXTool` | [Integration tools](/sdk/agent/tools/integrations)                    |
| **Pipeline node**         | `pipeline.add(name="…").integration_slack(integration=integ, …)`                                                | [Integration nodes](/sdk/pipeline/nodes/integration)                  |
| **Knowledge Base source** | Attach in the dashboard, then `integration.resync()` or `kb.resync_integration(id)` to refresh                  | [Resync integration](/sdk/knowledge-base/examples/resync-integration) |

<Tip>
  The per-service **action** references — every tool/node action and its parameters, for all 76 integration types — are auto-generated: see [Integration tools](/sdk/agent/tools/integrations) (Agents) and [Integration nodes](/sdk/pipeline/nodes/integration) (Pipelines). This section covers connecting and managing the integrations those actions run against.
</Tip>

## Manage what you've connected

```python theme={"languages":{}}
from vectorshift import Integration

for i in Integration.list():           # optionally filter: list(type="slack")
    print(i.object_id, i.type, i.status, i.name)

integ = Integration.fetch(id="…")
print(integ.get_status())              # "done" | "loading" | "unhealthy"
integ.sync()                           # refresh metadata (revamped types)
integ.reauth().wait()                  # refresh expired/revoked OAuth in place
integ.delete()                         # disconnect
```

## What's next

<Columns cols={3}>
  <Card title="CLI reference" icon="terminal" href="/sdk/integrations/cli">
    Every `vectorshift` command, flag, and example.
  </Card>

  <Card title="Python reference" icon="book-open" href="/sdk/integrations/reference">
    `Integration`, `ConnectionRequest`, types, credentials, errors.
  </Card>

  <Card title="Use in an Agent" icon="bot" href="/sdk/agent/tools/integrations">
    Bind a connected integration to an agent tool.
  </Card>
</Columns>
