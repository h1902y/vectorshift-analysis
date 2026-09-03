> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Create-list pipeline

> Build a list from multiple inputs with a CreateList node

Two string inputs are gathered into a list and returned through an output
node.

```python theme={"languages":{}}
from vectorshift.pipeline import Pipeline

# Fetch the pipeline if it already exists, otherwise create it
PIPELINE_NAME = "create-list-pipeline"
try:
    pipeline = Pipeline.fetch(name=PIPELINE_NAME)
    print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
except Exception as e:
    print(f"Error fetching pipeline: {e}")
    pipeline = Pipeline.new(name=PIPELINE_NAME)
    print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")

first = pipeline.add(name="first").input(input_type="string")
second = pipeline.add(name="second").input(input_type="string")
created = pipeline.add(name="make_list").create_list(
    type="string",
    list=[first.text, second.text],
)
pipeline.add(name="result").output(output_type="json", value=created.output)

pipeline.save()

result = pipeline.run({"first": "apple", "second": "banana"})
print(result)
```

<Tip>
  Source: `examples/pipelines/create_list_pipeline.py` in the SDK repo.
</Tip>
