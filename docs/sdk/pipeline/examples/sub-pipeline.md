> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Sub-pipelines

> Embed a saved sub-pipeline inside a parent pipeline

Build and save a small sub-pipeline, then reference it from a parent
pipeline with a `pipeline` node — pass the saved Pipeline object as
`pipeline=`, forward inputs as kwargs, and read its outputs as attributes.

```python theme={"languages":{}}
from vectorshift import Pipeline

# Build and save the sub-pipeline (it must be saved before it can be referenced)
SUB_NAME = "echo-sub-pipeline"
try:
    sub = Pipeline.fetch(name=SUB_NAME)
    print(f"Sub-pipeline fetched: id={sub.id}")
except Exception as e:
    print(f"Error fetching sub-pipeline: {e}")
    sub = Pipeline.new(name=SUB_NAME)
    sub_in = sub.add(name="input_0").input(input_type="string")
    sub.add(name="output_0").output(output_type="string", value=sub_in.text)
    sub.save()
    print(f"Sub-pipeline created: id={sub.id}")

# Fetch the parent pipeline if it already exists, otherwise create it
PIPELINE_NAME = "parent-pipeline"
try:
    pipeline = Pipeline.fetch(name=PIPELINE_NAME)
    print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
except Exception as e:
    print(f"Error fetching pipeline: {e}")
    pipeline = Pipeline.new(name=PIPELINE_NAME)
    print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")

input_node = pipeline.add(name="input_0").input(input_type="string")
sub_call = pipeline.add(name="sub_pipeline").pipeline(
    pipeline=sub,
    input_0=input_node.text,
)
pipeline.add(name="output_0").output(output_type="string", value=sub_call.output_0)

pipeline.save()

result = pipeline.run(inputs={"input_0": "What is the capital of France?"})
print(result)
```

<Tip>
  Source: `examples/pipelines/sub_pipeline.py` in the SDK repo.
</Tip>
