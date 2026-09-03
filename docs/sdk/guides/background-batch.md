> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Background batch jobs

> Run long pipelines in the background — start, poll, stream, retry, and terminate.

By the end of this guide you'll have a long-running pipeline that kicks off in the background, returns immediately with a `RunHandler`, and lets you poll for status, block for the result, stream progress, retry on transient failures, or terminate runaways.

<Info>
  **Prerequisites.** [Installed SDK](/sdk/installation) · [API key set](/sdk/authentication) · about 15 minutes.
</Info>

## What you'll build

```text theme={"languages":{}}
                       ┌──────────────────────────┐
   pipeline.start() ─▶ │  RunHandler              │
                       │   .task_id               │
                       │   .trace_id              │
                       └──┬──────┬──────┬─────────┘
                          │      │      │
            run_status()  │  result()   │  terminate()
                          ▼      ▼      ▼
                    one-shot   block    cancel
                    status     until    immediately
                               done
```

The key handle is **`RunHandler`** — `pipeline.start()` returns one, and every other operation on a background run goes through it.

<Steps>
  <Step title="Build the pipeline">
    Any pipeline that takes more than a few seconds is a candidate for background execution. Use the fluent `pipeline.add(name=)` builder.

    ```python theme={"languages":{}}
    from vectorshift.pipeline import Pipeline

    PIPELINE_NAME = "bg_summariser"
    try:
        pipeline = Pipeline.fetch(name=PIPELINE_NAME)
        print(f"fetched pipeline id={pipeline.id}")
    except Exception:
        pipeline = Pipeline.new(name=PIPELINE_NAME)
        print(f"created pipeline id={pipeline.id}")

    inp = pipeline.add(name="input_0").input(input_type="string")
    llm = pipeline.add(name="llm").llm(
        provider="openai", model="gpt-5.1", prompt=inp.text
    )
    out = pipeline.add(name="output_0").output(
        output_type="string", value=llm.response
    )

    pipeline.save(deploy=True)
    ```

    The `try / except → fetch / new` idiom is the standard "create or update" pattern in every canonical example script.
  </Step>

  <Step title="Start the run in the background">
    `pipeline.start(inputs=...)` returns immediately with a `RunHandler`. No blocking.

    ```python theme={"languages":{}}
    handler = pipeline.start(
        inputs={"input_0": "Tell me a fun fact about space in 50 words."}
    )
    print(f"started")
    print(f"  task_id  = {handler.task_id}")
    print(f"  trace_id = {handler.trace_id}")
    ```

    Persist `handler.task_id` (Redis, your DB, whatever) — you can resume polling or terminate from any process with just the task id.
  </Step>

  <Step title="Poll for status">
    `handler.run_status()` is a single non-blocking check. Use it for progress UIs, dashboards, or scheduled workers that can't hold a long-lived connection.

    ```python theme={"languages":{}}
    status = handler.run_status()
    print(f"status = {status['status']}")
    ```

    The returned dict carries `status` (`"running"`, `"succeeded"`, `"failed"`, `"cancelled"`) and run metadata.
  </Step>

  <Step title="Block until done">
    `handler.result(poll_interval=, timeout=)` polls internally and returns the final result, or raises `PollTimeoutError` if the timeout elapses.

    ```python theme={"languages":{}}
    result = handler.result(poll_interval=2.0, timeout=120.0)
    print(f"final status = {result['status']}")
    print(f"outputs      = {result.get('result')}")
    ```

    `result.get("result")` is the dict of output-node values — keyed by the output node's `node_name`.
  </Step>

  <Step title="Handle failures cleanly">
    Two failure modes matter: the run itself failed (`PipelineRunFailedError`) and the API rejected the call (`RateLimitError`, `InternalServerError`, …). Catch each explicitly and act differently — retry transient errors, surface run failures.

    ```python theme={"languages":{}}
    import time, random
    from vectorshift import (
        PipelineRunFailedError,
        PollTimeoutError,
        RateLimitError,
        InternalServerError,
    )

    def run_with_retries(pipeline, inputs, *, max_retries: int = 3):
        for attempt in range(max_retries):
            try:
                handler = pipeline.start(inputs=inputs)
                return handler.result(poll_interval=2.0, timeout=1800.0)
            except RateLimitError:
                backoff = (2 ** attempt) + random.random()
                print(f"rate limited; sleeping {backoff:.1f}s")
                time.sleep(backoff)
            except InternalServerError:
                print(f"server error; retry {attempt + 1}/{max_retries}")
                time.sleep(5)
            except PipelineRunFailedError as e:
                # Don't retry — bad input or bad pipeline.
                print(f"run {e.task_id} failed: {e.run_error}")
                raise
            except PollTimeoutError as e:
                # Make sure the run doesn't keep consuming compute.
                pipeline.terminate(run_id=e.task_id)
                print(f"timed out waiting on {e.task_id}; terminated")
                raise
        raise RuntimeError("exhausted retries")
    ```

    The rule: retry transient errors (rate limit, 5xx, timeouts), don't retry on `PipelineRunFailedError` — that's a bug in your inputs or pipeline, not a flake.
  </Step>

  <Step title="Cancel a runaway run">
    Two ways: through the handler, or directly on the pipeline if you only have the `task_id`.

    ```python theme={"languages":{}}
    # From the same process that started it:
    handler.terminate()

    # From any other process / worker:
    pipeline.terminate(run_id=handler.task_id)

    # Status afterwards:
    print(handler.run_status())  # → {'status': 'cancelled', ...}
    ```

    See [`terminate-run` example](/sdk/pipeline/examples/terminate-run).
  </Step>

  <Step title="Stream progress (the alternative pattern)">
    `pipeline.stream(inputs=...)` runs the pipeline **inline** but yields chunks as nodes complete — handy when you want to render progress as the pipeline executes, not after.

    ```python theme={"languages":{}}
    for chunk in pipeline.stream(
        inputs={"input_0": "Summarise the history of computing in 200 words."}
    ):
        if chunk.type == "stream":
            # Intermediate node output as it arrives.
            print(f"  [stream] {chunk.output_name}: {str(chunk.output_value)[:120]}")
        elif chunk.type == "result":
            print(f"\n  [result] status={chunk.status}, run_id={chunk.run_id}")
            for key, value in chunk.outputs.items():
                print(f"    {key}: {str(value)[:200]}")
    ```

    `stream()` is the only surface that exposes per-node intermediate outputs — regular `run()` only carries final-output values. See the [`intermediate-results` example](/sdk/pipeline/examples/intermediate-results).
  </Step>

  <Step title="Streaming via run() — for LLM token streams">
    If you want token-level streaming out of an LLM node, configure the node with `stream=True` and run the pipeline with `run(inputs, stream=True)`. The pipeline yields raw SSE frames.

    ```python theme={"languages":{}}
    import json

    # Build the pipeline with stream=True on the LLM node:
    # llm = pipeline.add(...).llm(..., stream=True)
    # out = pipeline.add(...).output(output_type="stream<string>", value=llm.response)

    for chunk in pipeline.run(
        {"input_0": "Tell me a story about a brave adventurer"},
        stream=True,
    ):
        try:
            chunk_str = chunk.decode("utf-8") if isinstance(chunk, bytes) else str(chunk)
            if chunk_str.startswith("data: "):
                data = json.loads(chunk_str[6:])
                if data.get("output_name") == "output_0":
                    print(data.get("output_value", ""), end="", flush=True)
        except (json.JSONDecodeError, UnicodeDecodeError, AttributeError):
            continue
    ```

    Three different streaming surfaces, three different jobs:

    * `pipeline.run(inputs, stream=True)` → raw SSE frames; for token-level LLM streaming. The output node must declare `output_type="stream<string>"`.
    * `pipeline.stream(inputs)` → typed chunks with `.type`, `.output_name`, `.output_value`; for inspecting every node's output.
    * `pipeline.start(...)` + `handler.result(...)` → no streaming; for background execution that returns final outputs.
  </Step>
</Steps>

## Operational tips

* **Idempotency.** Persist the input batch with a deterministic id before calling `start`. If your worker crashes mid-run, dedupe on retry instead of double-processing.
* **Concurrency.** `start` is non-blocking, but the platform applies per-org concurrency limits. Watch for `RateLimitError` and back off — don't fan out 1,000 `start`s at once.
* **Observability.** Log `task_id` and `trace_id` on every `start`, `result`, `terminate`, and exception. When something goes wrong in production, those ids are the only handles support has.
* **Async transport.** `pipeline.astart` / `aresult` / `aterminate` / `astream` keep `asyncio` runtimes from blocking. Install `vectorshift[async]` to use them.

## What's next

<Columns cols={3}>
  <Card title="Content workflow" icon="git-branch" href="/sdk/guides/content-workflow">
    Branching pipelines with multiple LLM stages.
  </Card>

  <Card title="Streaming example" icon="zap" href="/sdk/pipeline/examples/streaming">
    The pipeline-level streaming pattern, isolated.
  </Card>

  <Card title="Errors reference" icon="circle-alert" href="/sdk/errors">
    Full exception hierarchy and retry guidance.
  </Card>
</Columns>
