> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# As a pipeline node

> Wire a stored Transformation into a Pipeline with the .transformation() node, mapping each declared input to an upstream node output.

**What this builds.** A two-node pipeline that pipes an input string through a transformation to an output.
**You'll end up with.** A saved, deployed pipeline whose transformation node references your transformation by id, with its declared inputs wired to upstream node outputs.

```python theme={"languages":{}}
"""
Use a Transformation as a Pipeline node.

`pipeline.add(...).transformation(transformation=<id>, **inputs)` references a
stored transformation. Each keyword maps to one of the transformation's
declared input names; the value is an upstream node output (or a literal).
"""

from vectorshift import Transformation
from vectorshift.pipeline import Pipeline

# A transformation with one string input named `text`.
shout = Transformation.new(
    name="shout",
    function_name="shout",
    inputs={"text": "string"},
    outputs={"result": "string"},
    function="def shout(text):\n    return {'result': text.upper()}",
)

# Build the graph: input -> transformation -> output.
pipeline = Pipeline.new(name="shout_pipeline")

input_node = pipeline.add(name="input_node").input(input_type="string")

transform_node = pipeline.add(name="shout").transformation(
    transformation=shout.id,   # reference by id
    text=input_node.text,      # wire the `text` input to the input node
)

output_node = pipeline.add(name="output_node").output(
    output_type="string", value=transform_node.result
)

pipeline.save(deploy=True)
print(f"Saved pipeline {pipeline.id} with a transformation node -> {shout.id}")

# Run it end to end.
result = pipeline.run(inputs={"input_node": "hello"})
print(result)
```

## Expected output

```text theme={"languages":{}}
Saved pipeline ... with a transformation node -> ...
{'outputs': {'output_node': 'HELLO'}, 'status': 'success', 'run_id': '...'}
```

The keyword arguments on `.transformation(...)` must match the transformation's declared input names. A transformation with multiple inputs wires each one as its own keyword (e.g. `query=…, max_results=…`).

## See also

<Columns cols={3}>
  <Card title="Pipeline reference" icon="workflow" href="/sdk/pipeline/reference">
    The full Pipeline + node surface.
  </Card>

  <Card title="CRUD" icon="code" href="/sdk/transformation/examples/transformation-crud">
    Create the transformation you reference here.
  </Card>

  <Card title="Reference" icon="book-open" href="/sdk/transformation/reference">
    Every public method.
  </Card>
</Columns>
