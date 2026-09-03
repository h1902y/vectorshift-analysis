> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Installation

> Install the VectorShift Python SDK and verify your setup.

The VectorShift Python SDK lets you build, run, and manage Pipelines, Agents, and Knowledge Bases from Python. It targets the same backend as the platform UI, so anything you build in the SDK is editable in the visual editor and vice versa.

## Requirements

* Python 3.10 or newer
* A VectorShift account and API key

## Setup

<Steps>
  <Step title="Install the package">
    ```bash theme={"languages":{}}
    pip install vectorshift
    ```

    The SDK ships with type hints. Editor autocomplete works out of the box, including for the auto-generated agent tools and pipeline node builders.
  </Step>

  <Step title="Set your API key">
    Generate one at [Account → API Keys](https://app.vectorshift.ai/account/api-keys), then export it:

    ```bash theme={"languages":{}}
    export VECTORSHIFT_API_KEY="sk_..."
    ```

    <Warning>
      The SDK reads `VECTORSHIFT_API_KEY` **at import time** — set it *before* `import vectorshift`. If you set the key in code instead, assign `vectorshift.api_key = "sk_..."` before your first API call. A wrong prefix or a key set too late is the most common cause of a `401`. See [Authentication](/sdk/authentication).
    </Warning>

    See [Authentication](/sdk/authentication) for programmatic setup and key rotation.
  </Step>

  <Step title="Verify">
    ```python theme={"languages":{}}
    from vectorshift import Pipeline

    print(Pipeline.list(limit=1))
    ```

    Even an empty list means you're connected. An `AuthenticationError` means the key isn't set or is invalid.
  </Step>
</Steps>

## Optional extras

```bash theme={"languages":{}}
pip install 'vectorshift[async]'
```

Adds `httpx` for async transport. Recommended if you use `astream`, `arun`, or any other async method.

## Type checking with mypy

The SDK ships a [mypy](https://mypy.readthedocs.io/) plugin that validates pipeline node wiring and agent tool definitions at static-check time. It catches things plain type hints can't — wrong field names on a node builder, type mismatches between connected pipeline nodes, agent tools missing required `ToolInput`s, and so on — before you save and run.

<Steps>
  <Step title="Install mypy">
    ```bash theme={"languages":{}}
    pip install mypy
    ```
  </Step>

  <Step title="Enable the plugin">
    Add a `mypy.ini` to your project root (or merge into your existing one):

    ```ini theme={"languages":{}}
    [mypy]
    plugins = vectorshift.mypy_plugin
    python_version = 3.11
    ignore_missing_imports = True
    explicit_package_bases = True
    strict_optional = True
    ```

    The plugin name is the dotted import path. It works whether you installed `vectorshift` from PyPI or as an editable install.
  </Step>

  <Step title="Run">
    ```bash theme={"languages":{}}
    mypy your_pipeline.py
    ```

    The plugin runs alongside mypy's normal type checking. Errors from the plugin look like any other mypy error and point at the exact line.
  </Step>
</Steps>

<Tip>
  Most editors (VS Code, PyCharm, Cursor, Zed) can run mypy on save. Once `mypy.ini` is in place, you'll see SDK-aware errors inline as you type — no extra wiring.
</Tip>

## What's next

<Columns cols={3}>
  <Card title="Pipeline" icon="workflow" href="/sdk/pipeline/overview">
    Build and run pipelines.
  </Card>

  <Card title="Agent" icon="bot" href="/sdk/agent/overview">
    Agents with tools and multi-turn sessions.
  </Card>

  <Card title="Session" icon="messages-square" href="/sdk/session/overview">
    Stream tool events and multi-turn replies.
  </Card>
</Columns>
