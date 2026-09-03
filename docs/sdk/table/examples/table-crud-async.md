> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Table CRUD (async)

> Create, fetch, list, rename, duplicate, and delete a Table from inside an asyncio event loop.

**What this builds.** A full create / fetch / list / rename / duplicate / delete walk on `Table`, run through the `a*` async methods (`anew`, `afetch`, `alist`, `aupdate`, `aduplicate`, `adelete`) inside an `asyncio.run(...)` event loop.
**You'll end up with.** A new table that's been renamed and duplicated, then both copies cleanly deleted — nothing left behind in your account.

```python theme={"languages":{}}
"""Run the full Table lifecycle through the async (a*) methods."""

import asyncio

from vectorshift.table import Table


async def main() -> None:
    t = await Table.anew(name="SDK Tables Async Demo")
    print(f"1. Created Table (async): {t.name!r} (id={t.id})")

    fetched = await Table.afetch(id=t.id)
    print(f"2. Fetched by id (async): {fetched.name!r}")

    tables = await Table.alist(limit=10)
    found = any(x.id == t.id for x in tables)
    print(f"3. Listed Tables (async): {len(tables)} total, found ours: {found}")

    await t.aupdate(name="SDK Tables Async Demo (renamed)")
    print("4. Renamed (async).")

    copy = await t.aduplicate(new_name="SDK Tables Async Demo (copy)")
    print(f"5. Duplicated (async): {copy.name!r}")

    await copy.adelete()
    await t.adelete()
    print("6. Deleted both (async).\n\nDone.")


if __name__ == "__main__":
    asyncio.run(main())
```

## Expected output

```text theme={"languages":{}}
1. Created Table (async): 'SDK Tables Async Demo' (id=...)
2. Fetched by id (async): 'SDK Tables Async Demo'
3. Listed Tables (async): ... total, found ours: True
4. Renamed (async).
5. Duplicated (async): 'SDK Tables Async Demo (copy)'
6. Deleted both (async).

Done.
```

## See also

<Columns cols={3}>
  <Card title="Sync CRUD" icon="repeat" href="/sdk/table/examples/table-crud">
    The blocking version of this walk.
  </Card>

  <Card title="End-to-end walkthrough" icon="layers" href="/sdk/table/examples/full-workflow">
    Build a vendor scorecard from schema to export.
  </Card>

  <Card title="Reference" icon="book-open" href="/sdk/table/reference">
    Every public method.
  </Card>
</Columns>
