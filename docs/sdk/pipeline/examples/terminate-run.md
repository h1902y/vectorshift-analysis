> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Terminate a run

> Example: Starting a pipeline and terminating it mid-execution

```python theme={"languages":{}}
import time

from vectorshift.pipeline import Pipeline

# Create an LLM pipeline (LLM calls take a few seconds, giving time to terminate)
PIPELINE_NAME = "terminate_example"
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

# Start a background run and terminate via RunHandler
handler = pipeline.start(
    inputs={"input_0": "Write a 500 word essay about the history of computing."}
)
print(f"Started: {handler.task_id}")
time.sleep(2)

result = handler.terminate()
print(f"Terminated via handler: {result}")
print(f"Status after termination: {handler.run_status()}")

# Start another and terminate via Pipeline directly using a run_id
handler2 = pipeline.start(
    inputs={"input_0": "Write another 500 word essay about robotics."}
)
time.sleep(2)

result2 = pipeline.terminate(run_id=handler2.task_id)
print(f"Terminated via pipeline: {result2}")
```

<Tip>
  Source: `examples/pipelines/terminate_run.py` in the SDK repo.
</Tip>
