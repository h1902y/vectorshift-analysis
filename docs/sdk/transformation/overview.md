> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Transformation overview

> Reusable, typed Python functions stored on the platform — run them directly from the SDK or wire them into a Pipeline as a node.

The `Transformation` class is the SDK surface for VectorShift's stored Python functions. Define a function once — its source, typed inputs, and typed outputs live on the platform — then run it directly from Python, or drop it into a [Pipeline](/sdk/pipeline/overview) as a `TransformationNode`.

<Info>
  **Prerequisites:** [Installed SDK](/sdk/installation) · [API key set](/sdk/authentication) · Python 3.10+.
</Info>

## Mental model

* A transformation is a **named Python function** plus a typed I/O schema. The function source is stored as a string; `inputs` / `outputs` map each name to an [`IOType`](/sdk/transformation/reference#iotype) (optionally wrapped in [`IOConfig`](/sdk/transformation/reference#ioconfig) for a description).
* **Two ways to create one:**
  * **Imperative** — `Transformation.new(name, function=…, inputs=…, outputs=…)`, passing the source as a string.
  * **Decorator** — `@Transformation.from_function()` over a real Python function. The SDK reads the source, **infers** the schema from type hints, and upserts it by name (idempotent: fetch-by-name → update-if-changed → create).
* **Run it** with `t.run(inputs={…})`, which blocks on the engine and returns a typed [`TransformationRunResult`](/sdk/transformation/reference#transformationrunresult) with `.status`, `.outputs`, and an optional `.error`.
* **Or compose it** into a Pipeline via `TransformationNode(transformation=t.id, …)`, wiring each declared input to an upstream node output.
* Every method has an **async sibling** (`anew`, `afetch`, `arun`, `aupdate`, …).

## Quick start

<CodeGroup>
  ```python Sync theme={"languages":{}}
  from vectorshift import Transformation
  from vectorshift.transformation import IOConfig, IOType

  # Create a typed transformation from source.
  t = Transformation.new(
      name="add",
      description="Adds two integers.",
      function_name="add",
      inputs={
          "a": IOConfig(io_type=IOType.INT, description="first addend"),
          "b": IOConfig(io_type=IOType.INT),
      },
      outputs={"result": IOConfig(io_type=IOType.INT)},
      function="def add(a, b):\n    return {'result': a + b}",
  )

  # Run it — blocks on the engine, returns a typed result.
  res = t.run(inputs={"a": 2, "b": 3})
  print(res["status"], res["outputs"])   # success {'result': 5}
  ```

  ```python Async theme={"languages":{}}
  import asyncio
  from vectorshift import Transformation
  from vectorshift.transformation import IOConfig, IOType

  async def main():
      t = await Transformation.anew(
          name="add",
          function_name="add",
          inputs={"a": IOConfig(io_type=IOType.INT), "b": IOConfig(io_type=IOType.INT)},
          outputs={"result": IOConfig(io_type=IOType.INT)},
          function="def add(a, b):\n    return {'result': a + b}",
      )
      res = await t.arun(inputs={"a": 2, "b": 3})
      print(res["status"], res["outputs"])

  asyncio.run(main())
  ```
</CodeGroup>

## From a Python function

The `@Transformation.from_function()` decorator is the ergonomic path — write a normal function, let the SDK infer the schema and upload the source:

```python theme={"languages":{}}
from vectorshift import Transformation

@Transformation.from_function()
def add(a: int, b: int) -> int:
    """Adds two integers."""
    return {"result": a + b}

# `add` is now a Transformation instance, created (or updated) on the platform.
print(add.run(inputs={"a": 2, "b": 3})["outputs"])
```

Input types come from parameter annotations; output keys come from the return annotation (a `TypedDict`, a literal `return {…}` dict, or a single `result`). The decorator is idempotent under `name`, so re-running your script updates the stored function only when the source or schema changed. See the [`from-function` example](/sdk/transformation/examples/from-function).

## Ways to use a transformation

|          | Run directly                                                                                               | Inside a Pipeline                                                     |
| -------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Surface  | `t.run(inputs={…})`                                                                                        | `TransformationNode(transformation=t.id, **wired_inputs)`             |
| Output   | [`TransformationRunResult`](/sdk/transformation/reference#transformationrunresult) — `.status`, `.outputs` | A node output you wire into downstream nodes                          |
| Use when | Calling the function ad-hoc or from your own code                                                          | The function is one deterministic step in a graph                     |
| Guide    | This page's Quick start                                                                                    | [`pipeline-node` example](/sdk/transformation/examples/pipeline-node) |

## What's next

<Columns cols={3}>
  <Card title="Reference" icon="book-open" href="/sdk/transformation/reference">
    Every public method, type, and enum.
  </Card>

  <Card title="CRUD example" icon="code" href="/sdk/transformation/examples/transformation-crud">
    The full create / fetch / list / update / delete lifecycle.
  </Card>

  <Card title="From a function" icon="wand-sparkles" href="/sdk/transformation/examples/from-function">
    Decorate a Python function and let the SDK infer the schema.
  </Card>
</Columns>
