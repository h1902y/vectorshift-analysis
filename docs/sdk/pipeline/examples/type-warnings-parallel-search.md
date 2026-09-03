> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Type warnings: parallel search

> Trigger an SDK type-compatibility warning by wiring a string into an int field

Wiring a string output into `ParallelAiSearch.max_results` (an `int32`)
emits a `TypeCompatibilityWarning` at node-construction time, while
compatible connections stay silent. The pipeline still saves.

```python theme={"languages":{}}
from vectorshift.pipeline import Pipeline

# Fetch the pipeline if it already exists, otherwise create it
PIPELINE_NAME = "type-warnings-pipeline"
try:
    pipeline = Pipeline.fetch(name=PIPELINE_NAME)
    print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
except Exception as e:
    print(f"Error fetching pipeline: {e}")
    pipeline = Pipeline.new(name=PIPELINE_NAME)
    print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")

query = pipeline.add(name="query").input(input_type="string")
search = pipeline.add(name="search").parallel_ai_search(
    objective=query.text,  # string -> string (OK, no warning)
    max_results=query.text,  # string -> int32 (emits a type-compatibility warning)
)
pipeline.add(name="result").output(
    output_type="string", value=search.formatted_text
)

pipeline.save()
```

<Tip>
  Source: `examples/pipelines/type_warnings_parallel_search.py` in the SDK repo.
</Tip>
