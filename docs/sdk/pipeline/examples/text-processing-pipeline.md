> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Text processing pipeline

> Combine and reformat text with CombineText + TextFormatter nodes (no LLM)

An input string is joined with a static suffix, then reformatted (uppercased)
before being returned.

```python theme={"languages":{}}
from vectorshift.pipeline import Pipeline

# Fetch the pipeline if it already exists, otherwise create it
PIPELINE_NAME = "text-processing-pipeline"
try:
    pipeline = Pipeline.fetch(name=PIPELINE_NAME)
    print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
except Exception as e:
    print(f"Error fetching pipeline: {e}")
    pipeline = Pipeline.new(name=PIPELINE_NAME)
    print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")

input_node = pipeline.add(name="input_1").input(input_type="string")
combined = pipeline.add(name="combine_1").combine_text(
    text=[input_node.text, " hello"],
)
formatted = pipeline.add(name="text_formatter_1").text_formatter(
    text=combined.processed_text,
    formatter="To Uppercase",
)
pipeline.add(name="output_1").output(output_type="string", value=formatted.output)

pipeline.save()

result = pipeline.run({"input_1": "good morning"})
print(result)
```

<Tip>
  Source: `examples/pipelines/text_processing_pipeline.py` in the SDK repo.
</Tip>
