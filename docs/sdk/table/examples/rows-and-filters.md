> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Rows and filters

> Add columns, insert single + bulk rows, filter with CompoundFilter, then update / delete / scroll / clear.

**What this builds.** The full row CRUD surface and the typed filter dataclasses on a 3-column table seeded with vendor records.
**You'll end up with.** A guided walk through `add_columns` (shorthand), single and bulk insert, filtered reads, filter-driven update / delete, the `scroll` iterator, and `clear` — finishing with a deleted table.

```python theme={"languages":{}}
"""Add columns, insert rows, then filter / update / delete / scroll / clear.

Covers `add_columns` (shorthand), `insert_row`, `insert_rows`, `read_rows`
with `CompoundFilter`, filter-driven `update_rows` and `delete_rows`,
`scroll`, and `clear`.
"""

from vectorshift.table import (
    CompoundFilter,
    FilterCondition,
    FilterGroup,
    RelationalOperator,
    Table,
    TableFilterOperator,
)

t = Table.new(name="SDK Tables Rows Demo")
print(f"1. Created Table id={t.id}")

# --- Schema (shorthand: name -> kind strings) ---
t.add_columns({"vendor": "string", "amount": "int", "status": "string"})
print(f"2. Added 3 columns: {[c.name for c in t.columns]}")

# --- Insert one + bulk ---
t.insert_row({"vendor": "Acme", "amount": 1200, "status": "open"})
result = t.insert_rows(
    [
        {"vendor": "Beta", "amount": 50, "status": "open"},
        {"vendor": "Gamma", "amount": 500, "status": "done"},
        {"vendor": "Delta", "amount": 2200, "status": "open"},
    ]
)
print(f"3. Bulk inserted {result['rows_inserted']} rows.")

# --- Read all, sorted by amount desc ---
page = t.read_rows(filters=CompoundFilter().order_by("amount", desc=True))
print(f"4. Read all ({page['total']} rows, top 3 by amount):")
for row in page["rows"][:3]:
    print(
        f"     - {row['values'].get('vendor')!r:8} amount={row['values'].get('amount')}"
    )

# --- Filter: amount > 100 AND status == 'open' ---
filt = (
    CompoundFilter(
        groups=[
            FilterGroup(
                conditions=[
                    FilterCondition("amount", TableFilterOperator.GT, 100),
                    FilterCondition("status", TableFilterOperator.EQ, "open"),
                ]
            ),
        ],
    )
    .order_by("amount", desc=True)
    .paginate(50)
)
page2 = t.read_rows(filters=filt)
print(f"5. Filtered (amount>100 AND status=open): {page2['total']} rows")
for row in page2["rows"]:
    print(
        f"     - {row['values'].get('vendor')!r:8} amount={row['values'].get('amount')}"
    )

# --- Update: mark Beta as 'reviewing' ---
# Returns the affected-row count, which may be `0` even when the update
# succeeds — don't treat `0` as "nothing matched".
n = t.update_rows(
    {"status": "reviewing"},
    filters=CompoundFilter.of(
        FilterCondition("vendor", TableFilterOperator.EQ, "Beta"),
    ),
)
print(f"6. Updated rows (vendor=Beta) count={n}")

# --- Delete: drop status=done ---
n_del = t.delete_rows(
    filters=CompoundFilter.of(
        FilterCondition("status", TableFilterOperator.EQ, "done"),
    ),
)
print(f"7. Deleted rows (status=done) count={n_del}")

# --- Scroll (small page_size to exercise the iterator) ---
total_scrolled = 0
for chunk in t.scroll(page_size=2):
    total_scrolled += len(chunk["rows"])
print(f"8. Scroll yielded {total_scrolled} rows in pages of 2.")

# --- Clear + cleanup ---
t.clear()
remaining = t.read_rows()
print(f"9. After clear: total={remaining['total']}")
t.delete()
print("10. Deleted Table.\n\nDone.")
```

## Expected output

```text theme={"languages":{}}
1. Created Table id=...
2. Added 3 columns: ['vendor', 'amount', 'status']
3. Bulk inserted 3 rows.
4. Read all (4 rows, top 3 by amount):
     - 'Delta'  amount=2200
     - 'Acme'   amount=1200
     - 'Gamma'  amount=500
5. Filtered (amount>100 AND status=open): 2 rows
     - 'Delta'  amount=2200
     - 'Acme'   amount=1200
6. Updated rows (vendor=Beta) count=0
7. Deleted rows (status=done) count=0
8. Scroll yielded 3 rows in pages of 2.
9. After clear: total=0
10. Deleted Table.

Done.
```

<Tip>
  `update_rows` and `delete_rows` always require a `filters` argument — there is no "update everything" or "delete everything" shortcut. Use `clear()` to empty the table while keeping the schema. Both return an affected-row count, but it may be `0` even on success — don't treat `0` as "nothing matched".
</Tip>

## See also

<Columns cols={3}>
  <Card title="All filter operators" icon="filter" href="/sdk/table/examples/all-filter-operators">
    Every `TableFilterOperator` exercised with assertions.
  </Card>

  <Card title="Compound filters" icon="git-branch" href="/sdk/table/examples/compound-filters">
    Multi-group AND/OR, multi-key sort, paginate.
  </Card>

  <Card title="Columns (full)" icon="columns" href="/sdk/table/examples/columns-full">
    Typed `ColumnSpec` with every format variant.
  </Card>
</Columns>
