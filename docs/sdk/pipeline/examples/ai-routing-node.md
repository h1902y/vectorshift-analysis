> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# AI routing node

> AI Routing node example — LLM-based branching pipeline logic

Demonstrates:

* AiRoutingNode with multiple paths routed by an LLM classifier
* Wiring downstream nodes to routing paths via dependencies
* Merging routed branches back together with MergeNode

```python theme={"languages":{}}
from vectorshift.pipeline import Pipeline
from vectorshift.request import VectorshiftApiError

PIPELINE_NAME = "AI Routing Node Example"

try:
    pipeline = Pipeline.fetch(name=PIPELINE_NAME)
    print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
except Exception as e:
    print(f"Error fetching pipeline: {e}")
    pipeline = Pipeline.new(name=PIPELINE_NAME)
    print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")

try:
    # --- Input ---
    query = pipeline.add(name="query").input(input_type="string")

    # --- AI Router: classify user intent ---
    # path_0: greeting
    # path_1: technical question
    # path_else handled implicitly (no path_else on ai_routing — only numbered paths)
    router = pipeline.add(name="router").ai_routing(
        provider="openai",
        model="gpt-4o-mini",
        input_query=query.text,
        conditions=[
            "The user is greeting or saying hello",
            "The user is asking a technical question",
        ],
        outputs={"path_0": "path", "path_1": "path"},
    )

    # --- Downstream nodes gated by routing paths ---
    greeting_response = pipeline.add(
        name="greeting_response"
    ).text(
        text="Hello! How can I help you today?",
        dependencies=[router.path_0],
    )

    tech_response = pipeline.add(name="tech_response").llm(
        provider="openai",
        model="gpt-4o-mini",
        stream=False,
        prompt=query.text,
        dependencies=[router.path_1],
    )

    # --- Merge the routed branches ---
    merge = pipeline.add(name="merge").merge(
        function="first",
        type="string",
        fields=[greeting_response.text, tech_response.response],
    )

    # --- Output ---
    pipeline.add(name="result").output(
        output_type="string",
        value=merge.output,
    )

    pipeline.save()
    print(f"Pipeline saved:  id={pipeline.id}, branch_id={pipeline.branch_id}")

except VectorshiftApiError as e:
    print(f"API error: {e.status_code} {e.method} {e.endpoint}")
    print(f"Message: {e.error_message}")
```

<Tip>
  Source: `examples/pipelines/ai_routing_node.py` in the SDK repo.
</Tip>
