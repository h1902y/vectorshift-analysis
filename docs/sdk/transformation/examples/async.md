> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Async API

> Use the async siblings of every Transformation method — anew, arun, aupdate, adelete — all via await.

**What this builds.** A single `asyncio.run(main())` that creates a transformation, runs it, updates it, and deletes it — entirely with `await`.
**You'll end up with.** A round-trip through the common Transformation surface using only async methods, suitable as a copy-paste starter for async code.

```python theme={"languages":{}}
"""
Async pairs — `aXxx` for every method.

Every public Transformation method has an async sibling prefixed with `a`:
anew / afetch / alist / asave / aupdate / adelete / arun.
"""

import asyncio

from vectorshift.transformation import IOConfig, IOType, Transformation


async def main() -> None:
    t = await Transformation.anew(
        name="async_double",
        function_name="double",
        inputs={"n": IOConfig(io_type=IOType.INT)},
        outputs={"result": IOConfig(io_type=IOType.INT)},
        function="def double(n):\n    return {'result': n * 2}",
    )
    print(f"1. anew: id={t.id}")

    res = await t.arun(inputs={"n": 21})
    print(f"2. arun: {res['outputs']}")

    await t.aupdate(description="Doubles an integer.")
    print(f"3. aupdate: description={t.description!r}")

    await t.adelete()
    print("4. adelete done.")


if __name__ == "__main__":
    asyncio.run(main())
```

## Expected output

```text theme={"languages":{}}
1. anew: id=...
2. arun: {'result': 42}
3. aupdate: description='Doubles an integer.'
4. adelete done.
```

Every sync method in the reference has an `a`-prefixed sibling — the sync example ports to async by adding `await` and renaming the call.

## See also

<Columns cols={3}>
  <Card title="CRUD" icon="code" href="/sdk/transformation/examples/transformation-crud">
    The sync version of the lifecycle calls.
  </Card>

  <Card title="Run & I/O types" icon="play" href="/sdk/transformation/examples/run-and-io-types">
    Typed inputs and run results.
  </Card>

  <Card title="Reference" icon="book-open" href="/sdk/transformation/reference">
    Every public method.
  </Card>
</Columns>
