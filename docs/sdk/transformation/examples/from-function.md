> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# From a Python function

> Decorate a real Python function with @Transformation.from_function — the SDK infers the schema, uploads the source, and upserts idempotently by name.

**What this builds.** Three transformations created straight from annotated Python functions.
**You'll end up with.** A scalar function (inferred single `result`), a multi-output function via a `TypedDict` return, and a `defer=True` function you save by hand — with a re-run showing the decorator is idempotent.

```python theme={"languages":{}}
"""
@Transformation.from_function — schema inference + idempotent upsert.

Input types come from parameter annotations; output keys come from the return
annotation (TypedDict, literal return dict, or a single `result`). Re-running
the same source is a no-op; changing it triggers an update.
"""

from typing_extensions import TypedDict

from vectorshift import Transformation

# 1. Scalar return → a single `result` output, inferred as int32.
@Transformation.from_function()
def add(a: int, b: int) -> int:
    """Adds two integers."""
    return {"result": a + b}

print(f"1. add: id={add.id}, outputs={list(add.outputs)}")
print(f"   run: {add.run(inputs={'a': 2, 'b': 3})['outputs']}")

# 2. Multi-output via a TypedDict return → one output per key.
class Stats(TypedDict):
    total: int
    count: int

@Transformation.from_function(name="sum_and_count")
def stats(values: list) -> Stats:
    """Sum a list and report how many items it had."""
    return {"total": sum(values), "count": len(values)}

print(f"2. stats: outputs={list(stats.outputs)}")

# 3. defer=True → build locally, save when ready.
@Transformation.from_function(defer=True)
def shout(text: str) -> str:
    return {"result": text.upper()}

print(f"3. shout (deferred): id={shout.id}")   # None until saved
shout.save()
print(f"   saved: id={shout.id}")

# 4. Idempotency — re-decorating unchanged source updates nothing.
@Transformation.from_function()
def add(a: int, b: int) -> int:
    """Adds two integers."""
    return {"result": a + b}

print(f"4. re-decorated add: same id={add.id}")
```

## Expected output

```text theme={"languages":{}}
1. add: id=..., outputs=['result']
   run: {'result': 5}
2. stats: outputs=['total', 'count']
3. shout (deferred): id=None
   saved: id=...
4. re-decorated add: same id=...
```

The decorator fetches by `name` first: if the source and schema are unchanged it returns the existing transformation untouched, if they changed it updates, and if it doesn't exist it creates. Pass explicit `inputs=` / `outputs=` to override inference.

## See also

<Columns cols={3}>
  <Card title="CRUD" icon="code" href="/sdk/transformation/examples/transformation-crud">
    The imperative create / fetch / update / delete path.
  </Card>

  <Card title="Run & I/O types" icon="play" href="/sdk/transformation/examples/run-and-io-types">
    How IOType maps Python types, and reading run results.
  </Card>

  <Card title="Reference" icon="book-open" href="/sdk/transformation/reference#from_function">
    `from_function` inference rules in full.
  </Card>
</Columns>
