> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Batch config

> Batch config example — running nodes in batch mode

Demonstrates:

* Using pipeline.add\_batch to create batch-mode nodes
* Mixing batch and non-batch nodes in the same pipeline
* vec\<T> input types for vectorized inputs
* Batch nodes produce vec\<T> outputs automatically

```python theme={"languages":{}}
import vectorshift
from vectorshift.pipeline import Pipeline
from vectorshift.request import VectorshiftApiError

PIPELINE_NAME = "Batch Config Example"

try:
    pipeline = Pipeline.fetch(name=PIPELINE_NAME)
    print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
except Exception as e:
    print(f"Error fetching pipeline: {e}")
    pipeline = Pipeline.new(name=PIPELINE_NAME)
    print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")

try:

    # --- Input: a list of strings ---
    input_node = pipeline.add(name="queries").input(
        input_type="string",
    )

    # --- Non-batch node: shared system prompt (runs once) ---
    system_prompt = pipeline.add(name="system_prompt").text(
        text="You are a helpful assistant. Summarize the following query in one sentence.",
    )

    # --- Batch LLM: processes each input independently ---
    # add_batch automatically sets execution_mode="batch".
    # Vectorizable inputs (prompt, system) accept lists, and
    # vectorizable outputs (response, tokens_used) produce lists.
    batch_llm = pipeline.add_batch(name="batch_llm").llm(
        provider="openai",
        model="gpt-4o",
        stream=False,
        prompt=input_node.text,
        system=[system_prompt.text],
    )

    # --- Second batch node chained from the first ---
    batch_llm_2 = pipeline.add_batch(name="batch_refine").llm(
        provider="openai",
        model="gpt-4o",
        stream=False,
        prompt=batch_llm.response,
        system=["Rewrite the following to be more concise."],
    )

    # ======================================================================
    # Batch nodes produce vec<T> outputs which are not natively supported
    # by the OutputNode, so no output nodes are wired here.
    # ======================================================================

    pipeline.save()
    print(f"Pipeline saved:  id={pipeline.id}, branch_id={pipeline.branch_id}")

except VectorshiftApiError as e:
    print(f"API error: {e.status_code} {e.method} {e.endpoint}")
    print(f"Message: {e.error_message}")
```

<Tip>
  Source: `examples/pipelines/batch_config.py` in the SDK repo.
</Tip>
