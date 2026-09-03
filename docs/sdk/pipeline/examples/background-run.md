> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Background runs

> Example: Background pipeline execution with RunHandler

Creates a simple LLM pipeline, starts it in the background,
polls for status, and retrieves the result.

```python theme={"languages":{}}
from vectorshift.pipeline import Pipeline

# Create a standalone LLM pipeline
PIPELINE_NAME = "bg_run_example"
try:
    pipeline = Pipeline.fetch(name=PIPELINE_NAME)
    print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
except Exception as e:
    print(f"Error fetching pipeline: {e}")
    pipeline = Pipeline.new(name=PIPELINE_NAME)
    print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")
inp = pipeline.add(name="input_0").input(input_type="string")
llm = pipeline.add(name="llm").llm(
    provider="openai", model="gpt-4o", prompt=inp.text
)
out = pipeline.add(name="output_0").output(
    output_type="string", value=llm.response
)
pipeline.save(deploy=True)

# Start the pipeline in the background
handler = pipeline.start(
    inputs={"input_0": "Tell me a fun fact about space in 50 words."}
)
print("Pipeline started in background")
print(f"  Task ID:  {handler.task_id}")
print(f"  Trace ID: {handler.trace_id}")

# Check status manually
status = handler.run_status()
print(f"  Status:   {status['status']}")

# Block until the run completes and outputs are available
result = handler.result(poll_interval=2.0, timeout=120.0)
print(f"  Final status: {result['status']}")
print(f"  Outputs:      {result.get('result')}")

print(f"  Pipeline ID (to be deleted): {pipeline.id}")
pipeline.delete()
print("  Pipeline deleted")
```

<Tip>
  Source: `examples/pipelines/background_run.py` in the SDK repo.
</Tip>
