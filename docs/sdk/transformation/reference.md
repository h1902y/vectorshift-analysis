> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Transformation reference

> Create, fetch, list, update, run, and delete reusable Python transformations from Python.

A `Transformation` is a named Python function stored on the platform, with a typed input / output schema. Create one imperatively with `Transformation.new(...)` or declaratively with the [`@Transformation.from_function`](#from_function) decorator; run it with [`run`](#run) or wire it into a [Pipeline](/sdk/pipeline/reference) as a `TransformationNode`. Every method has an async sibling prefixed with `a`.

```python theme={"languages":{}}
from vectorshift import Transformation
from vectorshift.transformation import IOConfig, IOType, TransformationStatus
```

## Lifecycle

### `new`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Transformation.new(
      name: str,
      description: str = "",
      function_name: str = "",
      inputs: Optional[dict[str, Any]] = None,
      outputs: Optional[dict[str, Any]] = None,
      function: str = "",
  ) -> Transformation
  ```

  ```python Async theme={"languages":{}}
  async Transformation.anew(
      name: str,
      description: str = "",
      function_name: str = "",
      inputs: Optional[dict[str, Any]] = None,
      outputs: Optional[dict[str, Any]] = None,
      function: str = "",
  ) -> Transformation
  ```
</CodeGroup>

Create a new transformation.

**Parameters**

<ParamField path="name" type="str" required>
  Display name. Used by `from_function` and `fetch(name=…)` as the idempotency key.
</ParamField>

<ParamField path="description" type="str" default="''">
  What the transformation does.
</ParamField>

<ParamField path="function_name" type="str" default="''">
  The Python function name defined inside `function`.
</ParamField>

<ParamField path="inputs" type="Optional[dict[str, Any]]" default="None">
  Input schema, `{name: io_type}`. Each value may be a bare [`IOType`](#iotype) / string or an [`IOConfig`](#ioconfig). The wire keeps only the `io_type`.
</ParamField>

<ParamField path="outputs" type="Optional[dict[str, Any]]" default="None">
  Output schema, same shape as `inputs`.
</ParamField>

<ParamField path="function" type="str" default="''">
  The function source as a string. Should return a dict keyed by your output names.
</ParamField>

**Returns**

<ResponseField name="returns" type="Transformation">
  The new instance, with `.id`, `.branch_id`, and `.version` populated.
</ResponseField>

### `save`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Transformation.save() -> Transformation
  ```

  ```python Async theme={"languages":{}}
  async Transformation.asave() -> Transformation
  ```
</CodeGroup>

Create the transformation from the instance's current attributes (the constructor-then-`save` alternative to `new`). Populates `.id` on the instance.

### `fetch`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Transformation.fetch(
      id: Optional[str] = None,
      name: Optional[str] = None,
      username: Optional[str] = None,
      org_name: Optional[str] = None,
  ) -> Transformation
  ```

  ```python Async theme={"languages":{}}
  async Transformation.afetch(
      id: Optional[str] = None,
      name: Optional[str] = None,
      username: Optional[str] = None,
      org_name: Optional[str] = None,
  ) -> Transformation
  ```
</CodeGroup>

Fetch by `id` or `name` (at least one is required). `username` / `org_name` disambiguate a shared transformation. Raises [`TransformationNotFound`](#errors) if nothing matches.

### `list`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Transformation.list(
      limit: int = 50,
      offset: int = 0,
      include_shared: bool = False,
      verbose: bool = False,
  ) -> TransformationList
  ```

  ```python Async theme={"languages":{}}
  async Transformation.alist(
      limit: int = 50,
      offset: int = 0,
      include_shared: bool = False,
      verbose: bool = False,
  ) -> TransformationList
  ```
</CodeGroup>

Paginated list of transformations visible to the API key's org. Set `include_shared=True` to include shared ones, `verbose=True` to populate full [`TransformationListEntry`](#transformationlistentry) fields (otherwise only ids come back). Returns a [`TransformationList`](#transformationlist).

### `update`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Transformation.update(
      name: Any = ...,
      description: Any = ...,
      function_name: Any = ...,
      inputs: Any = ...,
      outputs: Any = ...,
      function: Any = ...,
  ) -> Transformation
  ```

  ```python Async theme={"languages":{}}
  async Transformation.aupdate(...) -> Transformation
  ```
</CodeGroup>

Partial update — only the fields you pass are sent; omitted fields are left untouched (a `_UNSET` sentinel distinguishes "not supplied" from an explicit `None`). Mutates the local instance to match. Returns `self`.

### `delete`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Transformation.delete() -> None
  ```

  ```python Async theme={"languages":{}}
  async Transformation.adelete() -> None
  ```
</CodeGroup>

Permanently delete the transformation.

## From a Python function

### `from_function`

```python theme={"languages":{}}
@Transformation.from_function(
    name: Optional[str] = None,
    description: Optional[str] = None,
    inputs: Optional[dict[str, Any]] = None,
    outputs: Optional[dict[str, Any]] = None,
    defer: bool = False,
)
def my_fn(...): ...
```

Decorator that turns a Python function into a `Transformation`. Must be called with parentheses — `@Transformation.from_function()` (or with keyword arguments). The decorated name then binds to the resulting `Transformation` instance, so `.id`, `.run(...)`, and `.inputs` resolve on it. The bare form `@Transformation.from_function` (no parens) passes your function as the `name` argument and yields a decorator, not a `Transformation`.

* **Source** — the function body is captured via `inspect.getsource` (decorator lines stripped) and stored as `function`.
* **Name / description** — default to the function's `__name__` and docstring.
* **Schema inference** — `inputs` come from parameter type annotations; `outputs` from the return annotation. A `TypedDict` return maps each key to its type; a literal `return {…}` uses its string keys; anything else becomes a single `result`. Types map via [`IOType.from_python`](#iotype). Pass explicit `inputs=` / `outputs=` to override.
* **Idempotency** — by default the decorator fetches by `name`, and **updates only if the source or schema changed**, otherwise creates. Returns the resulting `Transformation`.
* **`defer=True`** — skip the network call and return an unsaved `Transformation` you can `.save()` later.

<Warning>
  A non-literal `dict` return with no `TypedDict` annotation can't have its keys inferred — the SDK warns and defaults to `{"result": any}`. Pass `outputs=` to be explicit.
</Warning>

## Running

### `run`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Transformation.run(inputs: Optional[dict[str, Any]] = None) -> TransformationRunResult
  ```

  ```python Async theme={"languages":{}}
  async Transformation.arun(inputs: Optional[dict[str, Any]] = None) -> TransformationRunResult
  ```
</CodeGroup>

Execute the transformation with the given input values. Blocks on the engine callback. When the instance has a declared `inputs` schema, input keys are validated against it — unknown keys raise [`TransformationInvalidSchema`](#errors) before any request is made. A schemaless instance (e.g. one constructed by id without a `fetch`) skips this check. A failed engine run raises [`TransformationRunFailed`](#errors).

**Returns**

<ResponseField name="returns" type="TransformationRunResult">
  Typed [`TransformationRunResult`](#transformationrunresult) — `.status`, `.outputs` (native Python values, unwrapped from the engine's `DataType` envelope), and an optional `.error`.
</ResponseField>

## Instance attributes

A `Transformation` carries: `id`, `name`, `description`, `function_name`, `inputs`, `outputs`, `function`, `branch_id`, `version`.

## Types

### `IOConfig`

A single input / output schema entry. On create / update the wire keeps only `io_type`; `fetch` returns the full object.

<ParamField path="io_type" type="IOType" required>
  See [`IOType`](#iotype).
</ParamField>

<ParamField path="description" type="str" default="—">
  Optional human description.
</ParamField>

### `TransformationRunResult`

<ParamField path="status" type="TransformationStatus" required>
  `"success"` or `"failure"` — see [`TransformationStatus`](#transformationstatus).
</ParamField>

<ParamField path="outputs" type="dict[str, Any]" required>
  Output values keyed by output name, unwrapped to native Python types.
</ParamField>

<ParamField path="error" type="str" default="—">
  Present on failure.
</ParamField>

### `TransformationListEntry`

<ParamField path="id" type="str" required />

<ParamField path="name" type="str" required />

<ParamField path="description" type="str" required />

<ParamField path="function_name" type="str" required />

<ParamField path="modified_date" type="str" required />

Plus `user_id`, `org_id`, `username`, `email` when `verbose=True`.

### `TransformationList`

<ParamField path="transformations" type="list[TransformationListEntry]" required />

<ParamField path="offset" type="int" required />

<ParamField path="limit" type="int" required />

<ParamField path="total" type="int" default="—" />

## Enums

### `IOType`

Wire vocabulary for input / output types:

| Member   | Wire value | Python type         |
| -------- | ---------- | ------------------- |
| `ANY`    | `any`      | `Any` / unannotated |
| `STRING` | `string`   | `str`               |
| `INT`    | `int32`    | `int`               |
| `FLOAT`  | `float`    | `float`             |
| `BOOL`   | `bool`     | `bool`              |
| `LIST`   | `vec<any>` | `list`              |
| `FILE`   | `file`     | `vectorshift.File`  |

`IOType.from_python(annotation)` maps a Python type annotation to the matching member, defaulting to `ANY`.

### `TransformationStatus`

`SUCCESS` (`"success"`) · `FAILURE` (`"failure"`)

## Errors

All subclass `TransformationError`, which subclasses `VectorshiftError`.

* `TransformationNotFound` — a `fetch` returned no result.
* `TransformationAmbiguousName` — `from_function` found more than one transformation by name.
* `TransformationRunFailed` — a run completed with a failed status; carries `.transformation_id` and `.message`.
* `TransformationInvalidSchema` — wrong keys, unknown `io_type`, or unknown input keys passed to `run`.
* `TransformationCompileError` — the engine refused the Python source.

See the top-level [Errors page](/sdk/errors) for the broader hierarchy.

## What's next

<Columns cols={3}>
  <Card title="Overview" icon="wand-sparkles" href="/sdk/transformation/overview">
    Mental model and quick start.
  </Card>

  <Card title="Run & I/O types" icon="play" href="/sdk/transformation/examples/run-and-io-types">
    Typed inputs, run results, and IOType mapping.
  </Card>

  <Card title="Pipeline node" icon="workflow" href="/sdk/transformation/examples/pipeline-node">
    Wire a Transformation into a Pipeline.
  </Card>
</Columns>
