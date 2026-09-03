> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Multi-step content workflow

> Compose pipelines with AI routing, conditional branches, and intermediate-result inspection.

By the end of this guide you'll have a content pipeline that classifies an inbound prompt with an AI router, routes it through the right branch (greeting vs technical), merges the branches back, and lets you inspect every node's output via streaming.

<Info>
  **Prerequisites.** [Installed SDK](/sdk/installation) · [API key set](/sdk/authentication) · about 20 minutes. Familiarity with [Pipeline overview](/sdk/pipeline/overview) helps.
</Info>

## What you'll build

```text theme={"languages":{}}
                     query (string)
                          │
                          ▼
                ┌─────────────────────┐
                │  AiRoutingNode      │  ◄── conditions=[<intent>, <intent>]
                └──┬──────────────┬───┘
                   │              │
              path_0          path_1
                   │              │
                   ▼              ▼
           ┌──────────────┐  ┌──────────────┐
           │ Text node    │  │ LLM node     │
           │ (greeting)   │  │ (technical)  │
           └──────┬───────┘  └──────┬───────┘
                  └───────┬─────────┘
                          │
                          ▼
                  ┌──────────────┐
                  │  MergeNode   │  ◄── function="first"
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │  OutputNode  │
                  └──────────────┘
```

Three primitives stack: **AI routing** (model picks a branch), **dependencies** (downstream nodes gated by a path), and **merge** (collapse the branches back into one output).

<Steps>
  <Step title="Build the routing pipeline">
    `ai_routing` takes a query string and a list of plain-text `conditions`. The model picks one and emits the matching `path_N` flag, which downstream nodes consume via `dependencies=[router.path_N]`.

    ```python theme={"languages":{}}
    from vectorshift.pipeline import Pipeline
    from vectorshift.request import VectorshiftApiError

    PIPELINE_NAME = "intent-router"
    try:
        pipeline = Pipeline.fetch(name=PIPELINE_NAME)
        print(f"fetched id={pipeline.id}")
    except Exception:
        pipeline = Pipeline.new(name=PIPELINE_NAME)
        print(f"created id={pipeline.id}")

    try:
        query = pipeline.add(name="query").input(input_type="string")

        # path_0: greeting · path_1: technical question
        router = pipeline.add(name="router").ai_routing(
            provider="openai",
            model="gpt-5.1",
            input_query=query.text,
            conditions=[
                "The user is greeting or saying hello",
                "The user is asking a technical question",
            ],
            outputs={"path_0": "path", "path_1": "path"},
        )

        # Greeting branch — static reply, gated by path_0.
        greeting = pipeline.add(
            name="greeting"
        ).text(
            text="Hello! How can I help you today?",
            dependencies=[router.path_0],
        )

        # Technical branch — LLM, gated by path_1.
        technical = pipeline.add(
            name="technical"
        ).llm(
            provider="openai",
            model="gpt-5.1",
            stream=False,
            prompt=query.text,
            dependencies=[router.path_1],
        )

        # Merge the two branches — "first" takes whichever produced a value.
        merge = pipeline.add(name="merge").merge(
            function="first",
            type="string",
            fields=[greeting.text, technical.response],
        )

        # Output
        pipeline.add(name="result").output(
            output_type="string",
            value=merge.output,
        )

        pipeline.save()
        print(f"saved id={pipeline.id}")

    except VectorshiftApiError as e:
        print(f"API error: {e.status_code} {e.method} {e.endpoint}")
        print(f"detail: {e.error_message}")
    ```

    Only the branch the router picks actually runs — the other stays dormant. `merge(function="first", ...)` then collapses to whichever branch produced a value.

    See the [`ai-routing-node` example](/sdk/pipeline/examples/ai-routing-node) for the standalone pattern.
  </Step>

  <Step title="Run both branches">
    Two inputs — one greeting, one technical — exercise both routing paths.

    ```python theme={"languages":{}}
    cases = [
        "hi there!",
        "how do I configure async retries in the SDK?",
    ]

    for q in cases:
        out = pipeline.run(inputs={"query": q})
        print(f"\nQ: {q}\nA: {out['outputs']['result']}")
    ```

    The output's `result` key matches the output node's `node_name`. If you see an empty result, the router picked a path with no downstream node — check that every `path_N` declared in `conditions` has a corresponding node with `dependencies=[router.path_N]`.
  </Step>

  <Step title="Add conditional logic with `ConditionNode`">
    For non-AI branching (numeric thresholds, string emptiness, etc.) use `condition` with the typed primitives. `condition.path_0` is the If, `path_1` is Else-If, `path_else` is Else.

    ```python theme={"languages":{}}
    from vectorshift.pipeline import (
        Operator,
        LogicalOp,
        Clause,
        ConditionGroup,
    )

    grading = Pipeline.new(name="grading-flow")

    score = grading.add(name="score").input(input_type="int32")
    name_in = grading.add(name="name").input(input_type="string")

    grade = grading.add(name="grade").condition(
        conditions=[
            # If: score >= 90 AND name is not empty
            ConditionGroup(
                clauses=[
                    Clause(Operator.GREATER_THAN_EQUAL, score.value, 90),
                    Clause(Operator.IS_NOT_EMPTY, name_in.text),
                ],
                operators=[LogicalOp.AND],
            ),
            # Else If: score >= 50
            ConditionGroup(
                clauses=[Clause(Operator.GREATER_THAN_EQUAL, score.value, 50)],
            ),
        ],
    )

    msg_a = grading.add(name="msg_a").text(
        text="Excellent! Scored above 90.",
        dependencies=[grade.path_0],
    )
    msg_b = grading.add(name="msg_b").text(
        text="Passing — scored 50+.",
        dependencies=[grade.path_1],
    )
    msg_c = grading.add(name="msg_c").text(
        text="Did not pass.",
        dependencies=[grade.path_else],
    )

    final = grading.add(name="final").merge(
        function="first",
        type="string",
        fields=[msg_a.text, msg_b.text, msg_c.text],
    )
    grading.add(name="result").output(
        output_type="string", value=final.output
    )

    grading.save()
    ```

    See the [`condition-node` example](/sdk/pipeline/examples/condition-node) for the full operator catalogue.
  </Step>

  <Step title="Compose with sub-pipelines">
    Big workflows want to be broken into modules. Reference an already-saved `Pipeline` from inside a parent pipeline using `PipelineNode`. Pass the **`Pipeline` object** as `pipeline=` (not just its id) — the node introspects the sub-pipeline to expose its inputs as kwargs and its outputs as attributes.

    ```python theme={"languages":{}}
    # The sub-pipeline must already exist on the platform.
    sub = Pipeline.fetch(name="my-sub-pipeline")

    MAIN_NAME = "main-with-sub"
    try:
        main = Pipeline.fetch(name=MAIN_NAME)
    except Exception:
        main = Pipeline.new(name=MAIN_NAME)

    main_input = main.add(name="input_0").input(input_type="string")

    # `pipeline=sub` — pass the Pipeline object, not its id.
    # The remaining kwargs (`input_0=…`) match the sub-pipeline's input node names.
    sub_node = main.add(name="sub_call").pipeline(
        pipeline=sub,
        input_0=main_input.text,
    )

    # `sub_node.output_0` mirrors the sub-pipeline's output node names.
    main.add(name="output_0").output(value=sub_node.output_0)

    main.save()

    result = main.run(inputs={"input_0": "hi there!"})
    print(result)
    ```

    See the [`sub-pipeline` example](/sdk/pipeline/examples/sub-pipeline).
  </Step>

  <Step title="Inspect every node's output while debugging">
    `pipeline.run()` only returns final outputs. To see what each intermediate node produced, run with `pipeline.stream(inputs=...)` instead — the streaming surface yields `"stream"` chunks for every node before the final `"result"` chunk.

    ```python theme={"languages":{}}
    debug = Pipeline.new(name="debug-flow")

    topic = debug.add(name="topic").input(input_type="string")
    style = debug.add(name="style").input(input_type="string")

    combined = debug.add(name="combine").combine_text(
        text=[topic.text, style.text],
    )
    formatted = debug.add(name="formatter").text_formatter(
        text=combined.processed_text,
        formatter="To Uppercase",
    )

    llm = debug.add(name="llm").llm(
        provider="openai",
        model="gpt-5.1",
        stream=True,
        system="You are a creative writer. Respond in 2-3 sentences.",
        prompt=formatted.output,
    )
    debug.add(name="output_0").output(
        output_type="string", value=llm.response
    )

    debug.save(deploy=True)

    for chunk in debug.stream(
        inputs={"topic": "black holes", "style": "Write a haiku about:"}
    ):
        if chunk.type == "stream":
            print(f"  [{chunk.output_name}] {str(chunk.output_value)[:200]}")
        elif chunk.type == "result":
            print(f"\n[result] status={chunk.status}, run_id={chunk.run_id}")
            for k, v in chunk.outputs.items():
                print(f"  {k}: {str(v)[:200]}")
    ```

    <Note>
      Intermediate `stream` chunks are emitted when nodes are configured to publish them (e.g. an LLM node added with `.llm(stream=True)`). Pipelines without any streaming-configured node may produce only the final `result` chunk — that's expected. See the [`intermediate-results` example](/sdk/pipeline/examples/intermediate-results) for the canonical pattern.
    </Note>
  </Step>
</Steps>

## Operational tips

* **Numbered paths only.** `ai_routing` emits `path_0`, `path_1`, …; there is **no** `path_else` on AI routing. If every `path_N` could fail to match, add a fallback condition explicitly (e.g. a final `"None of the above"` condition).
* **Test sub-pipelines in isolation.** Each `Pipeline` runs independently. Hit a sub-pipeline directly when the parent is misbehaving — it narrows the bug fast.
* **Cache sub-pipeline ids.** The parent references children by id; don't recreate sub-pipelines on every deploy or you'll leak orphans.
* **Reach for `stream()` while iterating.** Once the pipeline is shaped right, the final `run()` is faster — but during development the per-node stream chunks save you from blind print-debugging the LLM prompt.

## What's next

<Columns cols={3}>
  <Card title="Background batch" icon="layers" href="/sdk/guides/background-batch">
    Run this workflow over thousands of inputs.
  </Card>

  <Card title="Sub-pipeline example" icon="code" href="/sdk/pipeline/examples/sub-pipeline">
    The composition pattern, isolated.
  </Card>

  <Card title="Pipeline reference" icon="book-open" href="/sdk/pipeline/reference">
    Every node type and method.
  </Card>
</Columns>
