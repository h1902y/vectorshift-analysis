> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# LLM pipeline

> Build, save, and run a minimal LLM pipeline (input - LLM - output)

One input is wired into an LLM node, and the model's response is exposed
through an output node.

```python theme={"languages":{}}
from vectorshift.pipeline import Pipeline

# Fetch the pipeline if it already exists, otherwise create it
PIPELINE_NAME = "llm-pipeline"
try:
    pipeline = Pipeline.fetch(name=PIPELINE_NAME)
    print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
except Exception as e:
    print(f"Error fetching pipeline: {e}")
    pipeline = Pipeline.new(name=PIPELINE_NAME)
    print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")

input_node = pipeline.add(name="input_node").input(input_type="string")
llm = pipeline.add(name="llm_node").llm(
    provider="openai",
    model="gpt-4o-mini",
    system="You are a helpful assistant. Reply in one short sentence.",
    prompt=input_node.text,
)
pipeline.add(name="output_node").output(output_type="string", value=llm.response)

pipeline.save(deploy=True)

result = pipeline.run(inputs={"input_node": "Say hello in French."})
print(result)
```

<Tip>
  Source: `examples/pipelines/llm_pipeline.py` in the SDK repo.
</Tip>
