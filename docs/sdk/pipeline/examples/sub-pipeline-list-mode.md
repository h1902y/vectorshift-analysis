> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Sub-pipelines (list mode)

> Fan a sub-pipeline out across a list of inputs by combining SplitTextNode with execution_mode='batch'.

**What this builds.** A main pipeline that splits a newline-delimited input into a list via `SplitTextNode`, then runs a sub-pipeline once per element by setting `execution_mode="batch"` on the `PipelineNode`.
**You'll end up with.** A saved `batched-pipeline` whose output is the sub-pipeline's `output_0` produced for each split line.

```python theme={"languages":{}}
from vectorshift import Pipeline

# Fetch the saved sub-pipeline you want to fan out
sub_pipeline = Pipeline.fetch(name="your sub pipeline")

# Fetch the main pipeline if it already exists, otherwise create it
PIPELINE_NAME = "batched-pipeline"
try:
    pipeline = Pipeline.fetch(name=PIPELINE_NAME)
    print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
except Exception as e:
    print(f"Error fetching pipeline: {e}")
    pipeline = Pipeline.new(name=PIPELINE_NAME)
    print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")

input_node = pipeline.add(name="input_0").input(input_type="string")
split_text_node = pipeline.add(name="split_text_node").split_text(
    text=input_node.text, delimiter="newline"
)
pipeline_node = pipeline.add(name="sub_pipeline").pipeline(
    pipeline=sub_pipeline,
    input_0=split_text_node.processed_text,
    execution_mode="batch",
)
pipeline.add(name="output_0").output(value=pipeline_node.output_0)

pipeline.save()
```

## Expected output

```text theme={"languages":{}}
Pipeline created: id=..., branch_id=...
```

`execution_mode="batch"` is what tells the runtime to fan the sub-pipeline out across the list — without it, the node receives the list as a single input.

## See also

<Columns cols={3}>
  <Card title="Sub-pipelines" icon="layers" href="/sdk/pipeline/examples/sub-pipeline">
    Single-shot sub-pipeline composition.
  </Card>

  <Card title="Batch config" icon="layers" href="/sdk/pipeline/examples/batch-config">
    Batch mode on individual LLM nodes.
  </Card>

  <Card title="Pipeline reference" icon="book-open" href="/sdk/pipeline/reference">
    Full method surface.
  </Card>
</Columns>
