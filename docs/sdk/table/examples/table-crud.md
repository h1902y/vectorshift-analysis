> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Table CRUD

> Walk the full create / fetch / list / rename / duplicate / delete lifecycle on a Table.

**What this builds.** A minimal end-to-end tour of every CRUD verb on `Table` — no schema, just lifecycle.
**You'll end up with.** A freshly created table that's fetched by id, fetched by name, located in `list()`, renamed, duplicated, then deleted — leaving your account exactly as you found it.

```python theme={"languages":{}}
"""Walk the full lifecycle of a Table: new, fetch (by id and by name),
list, update (rename), duplicate, delete.
"""

from vectorshift.table import Table

# --- Create ---
t = Table.new(name="SDK Tables CRUD Demo", description="Lifecycle demo")
print(f"1. Created Table: {t.name!r} (id={t.id})")

# --- Fetch by ID ---
fetched = Table.fetch(id=t.id)
print(f"2. Fetched by ID: {fetched.name!r}  columns={len(fetched.columns)}")

# --- Fetch by name ---
fetched_by_name = Table.fetch(name="SDK Tables CRUD Demo")
print(f"3. Fetched by name: {fetched_by_name.name!r}")

# --- List ---
tables = Table.list(limit=20, offset=0)
found = any(x.id == t.id for x in tables)
print(f"4. Listed Tables ({len(tables)} total), found ours: {found}")

# --- Rename ---
t.update(name="SDK Tables CRUD Demo (renamed)")
fetched_after = Table.fetch(id=t.id)
print(f"5. Renamed -> {fetched_after.name!r}")

# --- Duplicate ---
copy = t.duplicate(new_name="SDK Tables CRUD Demo (copy)")
print(f"6. Duplicated -> {copy.name!r} (id={copy.id})")

# --- Delete both ---
copy.delete()
t.delete()
print("7. Deleted both tables.\n\nDone.")
```

## Expected output

```text theme={"languages":{}}
1. Created Table: 'SDK Tables CRUD Demo' (id=...)
2. Fetched by ID: 'SDK Tables CRUD Demo'  columns=0
3. Fetched by name: 'SDK Tables CRUD Demo'
4. Listed Tables (... total), found ours: True
5. Renamed -> 'SDK Tables CRUD Demo (renamed)'
6. Duplicated -> 'SDK Tables CRUD Demo (copy)' (id=...)
7. Deleted both tables.

Done.
```

## See also

<Columns cols={3}>
  <Card title="Async CRUD" icon="zap" href="/sdk/table/examples/table-crud-async">
    Same lifecycle through the `a*` async methods.
  </Card>

  <Card title="Rows and filters" icon="filter" href="/sdk/table/examples/rows-and-filters">
    Add columns, insert rows, and filter results.
  </Card>

  <Card title="Reference" icon="book-open" href="/sdk/table/reference">
    Every public method.
  </Card>
</Columns>
