> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication

> Configure your VectorShift API key for the Python SDK.

The SDK authenticates with a VectorShift API key. Generate one at [Account → API Keys](https://app.vectorshift.ai/account/api-keys).

## Set the API key

<Tabs>
  <Tab title="Environment variable">
    The SDK reads `VECTORSHIFT_API_KEY` at import time. Set it once in your shell or secrets manager:

    ```bash theme={"languages":{}}
    export VECTORSHIFT_API_KEY="sk_..."
    ```

    ```python theme={"languages":{}}
    import vectorshift

    print(vectorshift.api_key[:4] + "..." if vectorshift.api_key else "missing")
    ```
  </Tab>

  <Tab title="Programmatic">
    Set the key before any API call:

    ```python theme={"languages":{}}
    import vectorshift

    vectorshift.api_key = "sk_..."
    ```

    Useful when keys come from a vault or config service.
  </Tab>
</Tabs>

## Per-organization keys

<Info>
  If you belong to multiple organizations, generate the key from inside the org you want the SDK to act on. The key carries the org context — there's no separate `org_id` parameter.
</Info>

## Rotating keys

<Steps>
  <Step title="Generate">
    Create a new key in the platform.
  </Step>

  <Step title="Update">
    Roll out the new key to your environment / secret store.
  </Step>

  <Step title="Revoke">
    Delete the old key in the platform once nothing depends on it.
  </Step>
</Steps>

Old keys keep working until you delete them, so there's no hard cutover.

## Errors

<ResponseField name="AuthenticationError" type="exception">
  Raised when the key is missing or invalid.
</ResponseField>

<ResponseField name="PermissionDeniedError" type="exception">
  Raised when the key is valid but lacks scope for the requested operation.
</ResponseField>

```python theme={"languages":{}}
from vectorshift import AuthenticationError, PermissionDeniedError, Pipeline

try:
    Pipeline.list()
except AuthenticationError:
    ...  # missing or invalid key
except PermissionDeniedError:
    ...  # key valid but not authorized
```

See [Errors](/sdk/errors) for the full exception hierarchy.

### Common causes of a 401

* **Wrong prefix.** Keys start with `sk_`. Copy the whole key from [Account → API Keys](https://app.vectorshift.ai/account/api-keys).
* **Key set too late.** The env var is read at import — export it before `import vectorshift`, or set `vectorshift.api_key` before your first API call (see the [Programmatic](#set-the-api-key) tab).
* **Wrong org.** A key only acts on the org it was generated in — see [Per-organization keys](#per-organization-keys).

## What's next

<Columns cols={3}>
  <Card title="Quickstart" icon="rocket" href="/sdk/quickstart">
    Ship your first pipeline in 60 seconds.
  </Card>

  <Card title="Pipeline overview" icon="workflow" href="/sdk/pipeline/overview">
    Your first pipeline in five lines.
  </Card>

  <Card title="Errors" icon="circle-alert" href="/sdk/errors">
    Full exception hierarchy.
  </Card>
</Columns>
