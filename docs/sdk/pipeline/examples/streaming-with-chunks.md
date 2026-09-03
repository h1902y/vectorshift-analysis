> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Streaming with chunks

> Example: Streaming pipeline execution with StreamChunk parsing

Creates a streaming LLM pipeline and uses pipeline.stream() which returns
typed StreamChunk objects instead of raw SSE lines.

```python theme={"languages":{}}
from vectorshift.pipeline import Pipeline

pipeline = Pipeline.new(name="stream-chunks-example")
inp = pipeline.add(name="input_0").input(input_type="string")
llm = pipeline.add(name="llm").llm(
    provider="openai", model="gpt-4o-mini", stream=True, prompt=inp.text
)
pipeline.add(name="output_0").output(
    output_type="stream<string>", value=llm.response
)
print(pipeline.save(deploy=True))

stream_chunks = 0
for chunk in pipeline.stream(
    inputs={"input_0": "Tell me a story about a brave adventurer in 50 words."}
):
    if chunk.type == "stream":
        stream_chunks += 1
        print(chunk.output_value, end="", flush=True)
    elif chunk.type == "result":
        final_chunk = chunk
        print(f"\n\nFinal outputs: {chunk.outputs}")
        print(f"Status: {chunk.status}")
        print(f"Run ID: {chunk.run_id}")
```

<Tip>
  Source: `examples/pipelines/streaming_with_chunks.py` in the SDK repo.
</Tip>
