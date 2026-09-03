> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# VectorShift Python SDK

> Build, run, and manage Pipelines, Agents, Knowledge Bases, and Tables from Python.

The VectorShift Python SDK targets the same backend as the visual editor — anything you build in the SDK is editable in the platform UI and vice versa. Pick a primitive and start shipping.

<Columns cols={2}>
  <Card title="Pipeline" icon="workflow" href="/sdk/pipeline/overview">
    A graph of nodes (LLMs, loaders, transforms, knowledge readers) you build, save, and run.
  </Card>

  <Card title="Agent" icon="bot" href="/sdk/agent/overview">
    Tools, typed I/O, and multi-turn conversations via `Session`.
  </Card>

  <Card title="Knowledge Base" icon="database" href="/sdk/knowledge-base/overview">
    Managed vector + document store you query directly or expose as a tool on an Agent.
  </Card>

  <Card title="Table" icon="table" href="/sdk/table/overview">
    Typed schema, AI-generated columns (Pipeline / Agent), and SQL-grade filters.
  </Card>

  <Card title="Transformation" icon="wand-sparkles" href="/sdk/transformation/overview">
    Reusable, typed Python functions you run directly or wire into a Pipeline.
  </Card>

  <Card title="Analytics" icon="chart-line" href="/sdk/analytics/overview">
    Query runs, tokens, costs, latency, errors, and traces across every primitive.
  </Card>
</Columns>

## Get started in 60 seconds

<Steps>
  <Step title="Install">
    ```bash theme={"languages":{}}
    pip install vectorshift
    ```
  </Step>

  <Step title="Authenticate">
    ```bash theme={"languages":{}}
    export VECTORSHIFT_API_KEY="sk_..."
    ```

    Generate a key under [Account → API Keys](https://app.vectorshift.ai/account/api-keys).
  </Step>

  <Step title="Run your first pipeline">
    Follow the [Quickstart](/sdk/quickstart) for a five-line LLM pipeline you can paste and run.
  </Step>
</Steps>

## What you can build

<Columns cols={2}>
  <Card title="RAG pipelines" icon="book-open" href="/sdk/pipeline/examples/rag-pipeline">
    Wire a knowledge-base reader into an LLM in a few lines.
  </Card>

  <Card title="Conversational agents" icon="message-circle" href="/sdk/agent/examples/conversational-agent-tools">
    Tools, approvals, and streamed tool events out of the box.
  </Card>

  <Card title="Background batch runs" icon="layers" href="/sdk/pipeline/examples/background-run">
    Kick off long-running jobs and poll for results.
  </Card>

  <Card title="Streaming chatbots" icon="zap" href="/sdk/agent/examples/chatbot-session">
    Multi-turn sessions with token-level streaming.
  </Card>
</Columns>

## Reference

<Columns cols={3}>
  <Card title="Pipeline reference" icon="book-open" href="/sdk/pipeline/reference">
    Every public method, grouped by topic.
  </Card>

  <Card title="Agent reference" icon="book-open" href="/sdk/agent/reference">
    Lifecycle, tools, running, types.
  </Card>

  <Card title="Errors" icon="circle-alert" href="/sdk/errors">
    Full exception hierarchy with status codes.
  </Card>
</Columns>

<Tip>
  The SDK ships with type hints and a [mypy plugin](/sdk/installation#type-checking-with-mypy) that catches pipeline-wiring and tool-definition mistakes at static-check time.
</Tip>

## Writing SDK code

Follow these conventions — every example in these docs does, and they keep generated code correct and re-runnable:

* **Authenticate via the `VECTORSHIFT_API_KEY` environment variable.** Never hardcode the key inline.
* **Build pipelines with the fluent builder** — `pipeline.add(name="...").llm(...)`. Don't use standalone node constructors or pass `nodes=[...]` to the constructor.
* **Guard with fetch-or-create at the top**, then build. Nodes dedup by `name`, so a stable `name=` makes re-runs idempotent — don't pass hardcoded `id=` values.
* **Set `temperature` via `sampling=SamplingConfig(temperature=...)`**, not as a top-level `.llm()` argument (where it's silently dropped).
* For exact signatures use the primitive's **reference** page; for full runnable scripts use its **examples** pages.
