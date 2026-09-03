> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Condition node

> Condition node example — branching pipeline logic

Demonstrates:

* ConditionNode with multiple branches (If / Else If / Else)
* Binary and unary operators
* Logical operators (AND / OR) within a single branch
* Wiring downstream nodes to condition paths via dependencies
* Merging conditional branches back together with MergeNode

```python theme={"languages":{}}
import vectorshift
from vectorshift.pipeline import (
    Pipeline,
    ConditionNode,
    Operator,
    LogicalOp,
    Clause,
    ConditionGroup,
    MergeNode,
)
from vectorshift.request import VectorshiftApiError

PIPELINE_NAME = "Condition Node Example"

try:
    pipeline = Pipeline.fetch(name=PIPELINE_NAME)
    print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
except Exception as e:
    print(f"Error fetching pipeline: {e}")
    pipeline = Pipeline.new(name=PIPELINE_NAME)
    print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")

try:

    # --- Inputs ---
    score = pipeline.add(name="score").input(input_type="int32")
    name_input = pipeline.add(name="name").input(input_type="string")

    # --- Condition: grade check ---
    # path_0 (If):       score >= 90 AND name is not empty
    # path_1 (Else If):  score >= 50
    # path_else (Else):  everything else
    condition = pipeline.add(name="grade_check").condition(
        conditions=[
            # If: score >= 90 AND name is not empty
            ConditionGroup(
                clauses=[
                    Clause(Operator.GREATER_THAN_EQUAL, score.value, 90),
                    Clause(Operator.IS_NOT_EMPTY, name_input.text),
                ],
                operators=[LogicalOp.AND],
            ),
            # Else If: score >= 50
            ConditionGroup(
                clauses=[
                    Clause(Operator.GREATER_THAN_EQUAL, score.value, 50),
                ],
            ),
        ],
    )

    # --- Downstream nodes gated by condition paths ---
    msg_excellent = pipeline.add(name="msg_excellent").text(
        text="Excellent! You scored above 90.",
        dependencies=[condition.path_0],
    )

    msg_passing = pipeline.add(name="msg_passing").text(
        text="You passed with a score of 50 or above.",
        dependencies=[condition.path_1],
    )

    msg_failed = pipeline.add(name="msg_failed").text(
        text="Unfortunately you did not pass.",
        dependencies=[condition.path_else],
    )

    # --- Merge the conditional branches ---
    merge = pipeline.add(name="merge").merge(
        function="first",
        type="string",
        fields=[msg_excellent.text, msg_passing.text, msg_failed.text],
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
  Source: `examples/pipelines/condition_node.py` in the SDK repo.
</Tip>
