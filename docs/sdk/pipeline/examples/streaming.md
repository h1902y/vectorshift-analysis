> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Streaming

> Stream a pipeline's LLM output token-by-token

Build an input -> streaming LLM -> output pipeline and consume the response
with `pipeline.stream(...)`, printing chunks as they arrive.

```python theme={"languages":{}}
from vectorshift.pipeline import Pipeline

# Fetch the pipeline if it already exists, otherwise create it
PIPELINE_NAME = "streaming-llm-pipeline"
try:
    pipeline = Pipeline.fetch(name=PIPELINE_NAME)
    print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
except Exception as e:
    print(f"Error fetching pipeline: {e}")
    pipeline = Pipeline.new(name=PIPELINE_NAME)
    print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")

input_node = pipeline.add(name="input_0").input(input_type="string")
llm = pipeline.add(name="llm_0").llm(
    provider="openai",
    model="gpt-4o-mini",
    system="You are a helpful assistant.",
    prompt=input_node.text,
    stream=True,  # Enable streaming
)
pipeline.add(name="output_0").output(output_type="stream<string>", value=llm.response)

pipeline.save()

# Stream the response chunks as they arrive
for chunk in pipeline.stream(
    {"input_0": "Tell me a story about a brave adventurer in 50 words."}
):
    if chunk.type == "stream" and chunk.output_name == "output_0":
        print(chunk.output_value, end="", flush=True)
print()
```

<Tip>
  Source: `examples/pipelines/streaming.py` in the SDK repo.
</Tip>
