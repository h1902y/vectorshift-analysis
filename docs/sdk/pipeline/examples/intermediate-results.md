> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Intermediate results

> Example: send_intermediate_results to inspect every node's output

Builds a multi-node pipeline (input → combine\_text → text\_formatter → LLM → output)
and streams it to see intermediate node outputs as they arrive.

Note: intermediate results are delivered via SSE streaming — the server processes
them when send\_intermediate\_results=True (the default), but they are only visible
in the streaming response, not the regular run() response.

```python theme={"languages":{}}
from typing import Any, cast

from vectorshift.pipeline import Pipeline

# ── Build a multi-node pipeline ──────────────────────────────────
PIPELINE_NAME = "intermediate_results_example"
try:
    pipeline = Pipeline.fetch(name=PIPELINE_NAME)
    print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
except Exception as e:
    print(f"Error fetching pipeline: {e}")
    pipeline = Pipeline.new(name=PIPELINE_NAME)
    print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")

# Two text inputs
topic = pipeline.add(name="topic").input(input_type="string")
style = pipeline.add(name="style").input(input_type="string")

# Combine them into a single prompt string
combined = pipeline.add(name="combine").combine_text(
    text=[topic.text, style.text],
)

# Uppercase the combined text (so we can see the formatter's intermediate output)
formatted = pipeline.add(name="formatter").text_formatter(
    text=combined.processed_text,
    formatter="To Uppercase",
)

out1 = pipeline.add(name="output_1").output(
    output_type="string", value=formatted.output
)

# Feed into an LLM
llm = pipeline.add(name="llm").llm(
    provider="openai",
    model="gpt-4o",
    stream=True,
    system="You are a creative writer. Respond in 2-3 sentences.",
    prompt=formatted.output,
)

# Final output
out = pipeline.add(name="output_0").output(
    output_type="string", value=llm.response
)

pipeline.save(deploy=True)
print("Pipeline created and deployed.\n")

# ── Run with streaming to see intermediate results ───────────────
# Intermediate node outputs (combine, formatter, llm) arrive as
# "stream" chunks before the final "result" chunk.
print("=== Streaming with intermediate results ===\n")
for chunk in pipeline.stream(
    inputs={"topic": "black holes", "style": "Write a haiku about:"},
):
    if chunk.type == "stream":
        print(
            f"  [stream] {chunk.output_name}: {str(chunk.output_value)[:200]}",
            flush=True,
        )
    elif chunk.type == "result":
        print(f"\n  [result] status={chunk.status}, run_id={chunk.run_id}")
        for key, value in chunk.outputs.items():
            print(f"    {key}: {str(value)[:200]}")

# ── Compare: non-streaming run (no intermediate results visible) ─
print("\n=== Normal run (final outputs only) ===")
result = cast(
    dict[str, Any],
    pipeline.run(
        inputs={"topic": "black holes", "style": "Write a haiku about:"},
    ),
)
for key, value in result.get("outputs", {}).items():
    print(f"  {key}: {str(value)[:200]}")
```

<Tip>
  Source: `examples/pipelines/intermediate_results.py` in the SDK repo.
</Tip>
