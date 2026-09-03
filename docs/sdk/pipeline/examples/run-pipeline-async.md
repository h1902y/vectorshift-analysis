> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Run pipeline (async)

> Run a pipeline asynchronously with ``await pipeline.arun(...)``

Build a small input -> LLM -> output pipeline and execute it via asyncio so
it composes with other awaitable work. `arun` returns the same result
shape as `run`.

```python theme={"languages":{}}
import asyncio

from vectorshift.pipeline import Pipeline

# Fetch the pipeline if it already exists, otherwise create it
PIPELINE_NAME = "async-run-pipeline"
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
    system="You are a helpful assistant. Reply in one short sentence.",
    prompt=input_node.text,
)
pipeline.add(name="output_0").output(output_type="string", value=llm.response)

pipeline.save()

result = asyncio.run(pipeline.arun({"input_0": "Hello, how are you?"}))
print(result)
```

<Tip>
  Source: `examples/pipelines/run_pipeline_async.py` in the SDK repo.
</Tip>
