> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Streaming (async)

> Example: Async streaming pipeline execution

```python theme={"languages":{}}
import asyncio

from vectorshift.pipeline import Pipeline

PIPELINE_NAME = "stream_async_example"

async def main():
    try:
        pipeline = await Pipeline.afetch(name=PIPELINE_NAME)
        print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
    except Exception as e:
        print(f"Error fetching pipeline: {e}")
        pipeline = await Pipeline.anew(name=PIPELINE_NAME)
        print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")
    inp = pipeline.add(name="input_0").input(input_type="string")
    llm = pipeline.add(name="llm").llm(
        provider="openai", model="gpt-4o", stream=True, prompt=inp.text
    )
    pipeline.add(name="output_0").output(
        output_type="string", value=llm.response
    )
    pipeline.add(name="output_1").output(
        output_type="stream<string>", value=llm.response
    )
    await pipeline.asave(deploy=True)

    async for chunk in pipeline.astream(
        inputs={"input_0": "Tell me a joke about programming."}
    ):
        if chunk.type == "stream":
            print(chunk.output_value, end="", flush=True)
        elif chunk.type == "result":
            print(f"\n\nFinal: {chunk.outputs}")

asyncio.run(main())
```

<Tip>
  Source: `examples/pipelines/streaming_async.py` in the SDK repo.
</Tip>
