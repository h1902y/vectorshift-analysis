> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Read-JSON pipeline

> Parse a JSON string input with ReadJsonValuesNode and surface specific keys as named outputs.

**What this builds.** A pipeline that takes a JSON string as input, extracts the `hello` and `hi` keys via `ReadJsonValuesNode`, and exposes them as two separate output nodes.
**You'll end up with.** A saved pipeline with `result` returning the full extracted-values dict and `result_2` returning just the value at `hello`.

```python theme={"languages":{}}
from vectorshift import Pipeline

# Fetch the pipeline if it already exists, otherwise create it
PIPELINE_NAME = "read-json-pipeline"
try:
    pipeline = Pipeline.fetch(name=PIPELINE_NAME)
    print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
except Exception as e:
    print(f"Error fetching pipeline: {e}")
    pipeline = Pipeline.new(name=PIPELINE_NAME)
    print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")

string_input = pipeline.add(name="query").input(input_type="string")
read_json_node = pipeline.add(name="read_json").read_json_values(
    json_string=string_input.text,
    keys=["hello", "hi"],
    processed_outputs={},
)
pipeline.add(name="result").output(
    output_type="string", value=read_json_node.json_values
)
pipeline.add(name="result_2").output(
    output_type="string", value=read_json_node.hello
)

pipeline.save()
```

## Expected output

This script does not print anything — successful execution simply re-saves the pipeline. Run it against an input like `{"hello": "world", "hi": "there"}` and inspect outputs in the dashboard.

## See also

<Columns cols={3}>
  <Card title="Create-list pipeline" icon="file-text" href="/sdk/pipeline/examples/create-list-pipeline">
    Build a list inside a pipeline instead of parsing one out.
  </Card>

  <Card title="Text processing pipeline" icon="file-text" href="/sdk/pipeline/examples/text-processing-pipeline">
    Combine and reformat strings between nodes.
  </Card>

  <Card title="Pipeline reference" icon="book-open" href="/sdk/pipeline/reference">
    Full method surface.
  </Card>
</Columns>
