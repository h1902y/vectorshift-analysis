> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Session and overrides

> Example: session_id for run grouping and node_input_overrides

session\_id ties multiple pipeline runs together for tracing and analytics,
but it does NOT give LLM nodes conversational memory. Pipeline LLM nodes
only see the current prompt — they don't look up prior messages from the session.

For conversational context with pipelines, accumulate history client-side
and pass it as part of the prompt input on each run.
(Alternatively, use a Chatbot, which manages history via conversation\_id.)

```python theme={"languages":{}}
from typing import Any, cast

from vectorshift.pipeline import Pipeline

# ── Build and deploy a simple LLM pipeline ──────────────────────────
PIPELINE_NAME = "session_overrides_example"
try:
    pipeline = Pipeline.fetch(name=PIPELINE_NAME)
    print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
except Exception as e:
    print(f"Error fetching pipeline: {e}")
    pipeline = Pipeline.new(name=PIPELINE_NAME)
    print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")
inp = pipeline.add(name="input_0").input(input_type="string")
llm = pipeline.add(name="llm").llm(
    provider="openai",
    model="gpt-4o",
    system="You are a helpful assistant.",
    prompt=inp.text,
)
out = pipeline.add(name="output_0").output(
    output_type="string", value=llm.response
)
pipeline.save(deploy=True)

# ── 1. session_id: run grouping / tracing (not chat memory) ────────
# Both runs share a session_id so they're grouped in the span system,
# but the LLM node in the second run has no memory of the first.
result1 = cast(
    dict[str, Any],
    pipeline.run(
        inputs={"input_0": "My name is Alice."},
        session_id="session-001",
    ),
)
print("Run 1:", result1.get("outputs"))

result2 = cast(
    dict[str, Any],
    pipeline.run(
        inputs={"input_0": "What is my name?"},
        session_id="session-001",
    ),
)
# The LLM will NOT know the name "Alice" — session_id doesn't carry history.
print("Run 2 (no memory):", result2.get("outputs"))

# ── 2. Client-side conversation history ─────────────────────────────
# To give the LLM conversational context, accumulate messages yourself
# and pass the full history as the prompt input each run.
history: list[str] = []

prompts = ["My name is Alice.", "What is my name?"]
for user_msg in prompts:
    history.append(f"User: {user_msg}")
    conversation = "\n".join(history)

    result = cast(
        dict[str, Any],
        pipeline.run(
            inputs={"input_0": conversation},
            session_id="session-001",
        ),
    )
    assistant_reply = result.get("outputs", {}).get("output_0", "")
    history.append(f"Assistant: {assistant_reply}")
    print(f"With history: {assistant_reply}")

# ── 3. node_input_overrides: change node inputs at runtime ──────────
result3 = cast(
    dict[str, Any],
    pipeline.run(
        inputs={"input_0": "What is your favorite thing to do?"},
        node_input_overrides={
            "llm.system": "You are a pirate. Answer everything like a pirate.",
        },
    ),
)
print("Overridden:", result3.get("outputs"))
```

<Tip>
  Source: `examples/pipelines/session_and_overrides.py` in the SDK repo.
</Tip>
