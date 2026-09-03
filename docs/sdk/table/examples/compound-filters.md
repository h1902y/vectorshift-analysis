> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Compose filters with AND and OR

> Build nested filters using FilterGroup so you can mix AND and OR cleanly, then order and paginate the result.

**What this builds.** A vendor scorecard with mixed-logic filters — "European customers with priority above 2 or status closed", "vendors in AS or with priority above 5" — using nested `FilterGroup`s instead of writing the boolean logic by hand.
**You'll end up with.** A working pattern for three increasingly expressive filter shapes plus an `order_by` / `paginate` recipe you can drop straight into a real query.

## The mental model

A filter is **groups of conditions**:

* Conditions inside one [`FilterGroup`](/sdk/table/reference#filtergroup) share an operator — `AND` (default) or `OR`.
* The top-level [`CompoundFilter`](/sdk/table/reference#compoundfilter) joins those groups together with **its own** operator — also `AND` (default) or `OR`.

So `(region == "EU") AND (priority > 2 OR status == "closed")` is naturally **two groups**: one with the region condition, one with the priority/status conditions joined by `OR`. The compound filter joins those two groups with `AND`.

When the whole filter is a single AND or single OR, use `CompoundFilter.of(...)` — it wraps your conditions in a single group for you.

## Setup

```python theme={"languages":{}}
"""Compose AND/OR filters on a vendor scorecard table."""

from vectorshift.table import (
    ColumnSpec,
    CompoundFilter,
    FilterCondition,
    FilterGroup,
    NumberFormat,
    NumberKind,
    RelationalOperator,
    StringFormat,
    Table,
    TableFilterOperator,
)


def vendors(page) -> set[str]:
    return {r["values"]["vendor"] for r in page["rows"] if r["values"].get("vendor")}


t = Table.new(
    name="Vendor scorecard — filter demo",
    columns=[
        ColumnSpec(name="vendor", format=StringFormat()),
        ColumnSpec(name="region", format=StringFormat()),
        ColumnSpec(name="status", format=StringFormat()),
        ColumnSpec(name="priority", format=NumberFormat(number_kind=NumberKind.INT)),
    ],
)
t.clear()
t.insert_rows([
    {"vendor": "Acme",    "region": "EU", "status": "open",   "priority": 5},
    {"vendor": "Beta",    "region": "EU", "status": "open",   "priority": 1},
    {"vendor": "Gamma",   "region": "EU", "status": "closed", "priority": 3},
    {"vendor": "Delta",   "region": "US", "status": "open",   "priority": 9},
    {"vendor": "Echo",    "region": "US", "status": "closed", "priority": 2},
    {"vendor": "Foxtrot", "region": "AS", "status": "open",   "priority": 1},
])
```

## Recipe 1 — all conditions must match (AND inside a group)

"European vendors that are still open." Conditions inside a single group default to AND, so `CompoundFilter.of(...)` is enough:

```python theme={"languages":{}}
eu_open = t.read_rows(filters=CompoundFilter.of(
    FilterCondition("region", TableFilterOperator.EQ, "EU"),
    FilterCondition("status", TableFilterOperator.EQ, "open"),
))
print("EU AND open ->", vendors(eu_open))
# {'Acme', 'Beta'}
```

## Recipe 2 — any condition matches (OR inside a group)

"Vendors in EU or US." Same single-group shape, but flip the group operator to `OR`:

```python theme={"languages":{}}
eu_or_us = t.read_rows(filters=CompoundFilter.of(
    FilterCondition("region", TableFilterOperator.EQ, "EU"),
    FilterCondition("region", TableFilterOperator.EQ, "US"),
    logical_operator=RelationalOperator.OR,
))
print("EU OR US ->", vendors(eu_or_us))
# {'Acme', 'Beta', 'Gamma', 'Delta', 'Echo'}
```

For a flat IS-IN like this you could also use `TableFilterOperator.IS_IN` — but the OR shape generalises when the two conditions are on different columns.

## Recipe 3 — mix AND and OR with two groups

"European vendors that are either high-priority **or** already closed." Two clauses, with `OR` inside one and `AND` between groups:

```python theme={"languages":{}}
filt = CompoundFilter(
    groups=[
        FilterGroup(conditions=[
            FilterCondition("region", TableFilterOperator.EQ, "EU"),
        ]),
        FilterGroup(
            conditions=[
                FilterCondition("priority", TableFilterOperator.GT, 2),
                FilterCondition("status",   TableFilterOperator.EQ, "closed"),
            ],
            logical_operator=RelationalOperator.OR,
        ),
    ],
    group_logical_operator=RelationalOperator.AND,
)
print("EU AND (priority>2 OR status=closed) ->", vendors(t.read_rows(filters=filt)))
# {'Acme', 'Gamma'}
```

## Order and paginate the result

`order_by` and `paginate` chain onto any `CompoundFilter`. They return a new filter (the dataclass is frozen), so call them on the result of `.of(...)` or the constructor:

```python theme={"languages":{}}
# Top 3 vendors by priority, descending.
top3 = t.read_rows(filters=(
    CompoundFilter()
    .order_by("priority", desc=True)
    .paginate(limit=3, offset=0)
))
print([r["values"]["vendor"] for r in top3["rows"]])
# ['Delta', 'Acme', 'Gamma']

# Next page of 3.
next3 = t.read_rows(filters=(
    CompoundFilter()
    .order_by("priority", desc=True)
    .paginate(limit=3, offset=3)
))
print([r["values"]["vendor"] for r in next3["rows"]])
# ['Echo', 'Beta', 'Foxtrot']
```

`order_by` is chainable for multi-key sorting — call it once per key, in priority order:

```python theme={"languages":{}}
sorted_filt = (
    CompoundFilter()
    .order_by("region", desc=False)
    .order_by("priority", desc=True)
)
```

The first key wins ties; the second breaks them. Same filter can be used to drive a `scroll(...)` if you have more rows than fit in one `read_rows` page.

## Cleanup

```python theme={"languages":{}}
t.delete()
```

<Tip>
  **`read_rows` is one page** (\~1,000 rows by default). For larger tables iterate with [`scroll`](/sdk/table/reference#scroll), passing the same `CompoundFilter` — `scroll` pages through every matching row for you.
</Tip>

## See also

<Columns cols={3}>
  <Card title="Common filter recipes" icon="filter" href="/sdk/table/examples/all-filter-operators">
    One snippet per `TableFilterOperator`, grouped by use case.
  </Card>

  <Card title="CompoundFilter reference" icon="book-open" href="/sdk/table/reference#compoundfilter">
    Top-level shape and builder methods.
  </Card>

  <Card title="Rows and filters" icon="repeat" href="/sdk/table/examples/rows-and-filters">
    Filters in context with insert / update / delete / scroll.
  </Card>
</Columns>
