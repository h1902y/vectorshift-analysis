> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Transformation CRUD

> Walk the full create / fetch / list / update / delete lifecycle on a Transformation.

**What this builds.** A minimal end-to-end tour of every CRUD verb on `Transformation`.
**You'll end up with.** A typed transformation that's created, fetched by id and by name, located in `list()`, updated in place, then deleted — leaving your account as you found it.

```python theme={"languages":{}}
"""
Transformation CRUD — full lifecycle.

Covers `new`, `fetch` (by id and by name), `list`, `update`, `delete`.
inputs/outputs are typed IOConfig; the SDK serialises them to bare io_type
strings on the wire.
"""

import time

from vectorshift.transformation import IOConfig, IOType, Transformation
from vectorshift.request import VectorshiftError

name = f"SDK Transformation CRUD {int(time.time())}"

# --- Create ---
t = Transformation.new(
    name=name,
    description="Adds two integers.",
    function_name="add",
    inputs={
        "a": IOConfig(io_type=IOType.INT, description="first addend"),
        "b": IOConfig(io_type=IOType.INT),
    },
    outputs={"result": IOConfig(io_type=IOType.INT)},
    function="def add(a, b):\n    return {'result': a + b}",
)
print(f"1. Created transformation: {t.name} (id={t.id})")

# --- Fetch by ID ---
fetched = Transformation.fetch(id=t.id)
print(f"2. Fetched by ID: {fetched.name} | inputs={list(fetched.inputs)}")

# --- Fetch by name ---
by_name = Transformation.fetch(name=name)
print(f"3. Fetched by name: id={by_name.id}")

# --- List ---
listing = Transformation.list(limit=20, offset=0)
found = any(e["id"] == t.id for e in listing["transformations"])
print(f"4. Listed ({len(listing['transformations'])} total), found ours: {found}")

# --- Update (subset of fields; mutates the local object too) ---
t.update(description="Adds two integers. Now documented.")
print(f"5. Updated description -> {t.description!r}")

# --- Delete ---
try:
    t.delete()
    print("6. Deleted transformation.\n\nDone.")
except VectorshiftError as e:
    print(f"6. Delete reported a server-side error: {e}\n\nDone.")
```

## Expected output

```text theme={"languages":{}}
1. Created transformation: SDK Transformation CRUD ... (id=...)
2. Fetched by ID: SDK Transformation CRUD ... | inputs=['a', 'b']
3. Fetched by name: id=...
4. Listed (... total), found ours: True
5. Updated description -> 'Adds two integers. Now documented.'
6. Deleted transformation.

Done.
```

`update(...)` only sends the fields you pass — omitted fields are left untouched, and the local instance is mutated to match.

## See also

<Columns cols={3}>
  <Card title="From a function" icon="wand-sparkles" href="/sdk/transformation/examples/from-function">
    Skip the source string — decorate a Python function.
  </Card>

  <Card title="Run & I/O types" icon="play" href="/sdk/transformation/examples/run-and-io-types">
    Run a transformation and read its typed result.
  </Card>

  <Card title="Reference" icon="book-open" href="/sdk/transformation/reference">
    Every public method.
  </Card>
</Columns>
