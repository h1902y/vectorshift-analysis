> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Run & I/O types

> Declare typed inputs and outputs with IOType / IOConfig, run a transformation, read the typed result, and see input-key validation in action.

**What this builds.** A transformation with a mix of typed inputs and outputs, run twice.
**You'll end up with.** A successful run whose outputs come back as native Python values, plus a demonstration of the client-side input-key validation that fires before any request.

```python theme={"languages":{}}
"""
Typed I/O + running.

`inputs` / `outputs` map each name to an IOType (optionally via IOConfig for a
description). The run result's `outputs` are unwrapped to native Python values;
unknown input keys are rejected client-side before the call.
"""

from vectorshift.transformation import (
    IOConfig,
    IOType,
    Transformation,
    TransformationInvalidSchema,
    TransformationStatus,
)

# Mixed-type schema: string + list in, string + int out.
t = Transformation.new(
    name="summarize_words",
    function_name="summarize_words",
    inputs={
        "title": IOConfig(io_type=IOType.STRING, description="heading"),
        "words": IOType.LIST,   # bare IOType also works
    },
    outputs={
        "heading": IOType.STRING,
        "count": IOType.INT,
    },
    function=(
        "def summarize_words(title, words):\n"
        "    return {'heading': title.upper(), 'count': len(words)}"
    ),
)

# 1. Run — outputs come back as native Python types.
res = t.run(inputs={"title": "fruits", "words": ["apple", "pear", "plum"]})
print(f"1. status: {res['status']}")
print(f"   outputs: {res['outputs']}")
print(f"   success? {res['status'] == TransformationStatus.SUCCESS}")

# 2. Unknown input key → TransformationInvalidSchema (raised before any request).
try:
    t.run(inputs={"title": "x", "typo": 1})
except TransformationInvalidSchema as e:
    print(f"2. rejected unknown key: {e}")

t.delete()
print("\nDone.")
```

## Expected output

```text theme={"languages":{}}
1. status: success
   outputs: {'heading': 'FRUITS', 'count': 3}
   success? True
2. rejected unknown key: Unknown input keys ['typo']; expected a subset of ['title', 'words']
Done.
```

`IOType` maps Python types to the wire vocabulary (`str` → `string`, `int` → `int32`, `list` → `vec<any>`, `vectorshift.File` → `file`, …). The run result's `outputs` are returned as plain `dict` / `list` / scalar values, so you don't deal with any wire envelope.

## See also

<Columns cols={3}>
  <Card title="From a function" icon="wand-sparkles" href="/sdk/transformation/examples/from-function">
    Let annotations drive the schema instead of declaring it.
  </Card>

  <Card title="Async API" icon="zap" href="/sdk/transformation/examples/async">
    `arun` and the other async siblings.
  </Card>

  <Card title="Reference" icon="book-open" href="/sdk/transformation/reference#iotype">
    `IOType`, `IOConfig`, `TransformationRunResult`.
  </Card>
</Columns>
