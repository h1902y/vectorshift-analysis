> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Button node

> Button (Listen) node example — user-interactive branching

Demonstrates:

* ListenNode in button variant with multiple button choices
* Wiring downstream nodes to button paths via dependencies
* Merging button branches back together with MergeNode

```python theme={"languages":{}}
from vectorshift.pipeline import Pipeline
from vectorshift.request import VectorshiftApiError

PIPELINE_NAME = "Button Node Example"

try:
    pipeline = Pipeline.fetch(name=PIPELINE_NAME)
    print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
except Exception as e:
    print(f"Error fetching pipeline: {e}")
    pipeline = Pipeline.new(name=PIPELINE_NAME)
    print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")

try:

    # --- Conversational pipeline needs a start_flag instead of input nodes ---
    start = pipeline.add(name="start").start_flag()

    # --- Button prompt ---
    talk = pipeline.add(name="talk").talk(
        variant="message",
        content="What would you like to do?",
        dependencies=[start.complete],
    )

    # --- Button node: present choices to the user ---
    buttons = pipeline.add(name="buttons").listen(
        variant="button",
        buttons=[
            {"name": "Summarize", "id": "button_1"},
            {"name": "Translate", "id": "button_2"},
            {"name": "Explain", "id": "button_3"},
        ],
        processed_outputs={
            "button_1": "path",
            "button_2": "path",
            "button_3": "path",
        },
        dependencies=[talk.complete],
    )

    # --- Downstream nodes gated by button selection ---
    summarize_msg = pipeline.add(name="summarize_msg").text(
        text="You chose to summarize.",
        dependencies=[buttons.button_1],
    )

    translate_msg = pipeline.add(name="translate_msg").text(
        text="You chose to translate.",
        dependencies=[buttons.button_2],
    )

    explain_msg = pipeline.add(name="explain_msg").text(
        text="You chose to explain.",
        dependencies=[buttons.button_3],
    )

    # --- Merge the button branches and respond ---
    merge = pipeline.add(name="merge").merge(
        function="first",
        type="string",
        fields=[summarize_msg.text, translate_msg.text, explain_msg.text],
    )

    pipeline.add(name="respond").talk(
        variant="message",
        content=merge.output,
    )

    pipeline.save()
    print(f"Pipeline saved:  id={pipeline.id}, branch_id={pipeline.branch_id}")

except VectorshiftApiError as e:
    print(f"API error: {e.status_code} {e.method} {e.endpoint}")
    print(f"Message: {e.error_message}")
```

<Tip>
  Source: `examples/pipelines/button_node.py` in the SDK repo.
</Tip>
