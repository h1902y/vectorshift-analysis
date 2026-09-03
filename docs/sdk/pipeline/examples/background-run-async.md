> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Background runs (async)

> Example: Async background pipeline execution with RunHandler

```python theme={"languages":{}}
import asyncio

from vectorshift.pipeline import Pipeline

PIPELINE_NAME = "bg_run_async_example"

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
        provider="openai", model="gpt-4o", prompt=inp.text
    )
    pipeline.add(name="output_0").output(
        output_type="string", value=llm.response
    )
    await pipeline.asave(deploy=True)

    # Start in background
    handler = await pipeline.astart(
        inputs={"input_0": "Tell me a fun fact about oceans."}
    )
    print(f"Task ID: {handler.task_id}")

    # Check status
    status = await handler.arun_status()
    print(f"Status: {status['status']}")

    # Wait for completion
    result = await handler.aresult(poll_interval=2.0, timeout=60.0)
    print(f"Result: {result}")

asyncio.run(main())
```

<Tip>
  Source: `examples/pipelines/background_run_async.py` in the SDK repo.
</Tip>
