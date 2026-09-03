> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Common filter recipes

> One copy-paste snippet per TableFilterOperator, grouped by use case — exact match, ordering, text, set membership, missing data, files.

**What this builds.** A small vendor-scorecard fixture you can filter against, and a recipe for each of the 13 [`TableFilterOperator`](/sdk/table/reference#tablefilteroperator) values — grouped by the question you're answering, not by operator name.
**You'll end up with.** Snippets you can copy directly into your own code, plus a clear mental model of which operator matches your situation.

## Setup

```python theme={"languages":{}}
"""Filter recipes for a vendor scorecard table."""

from vectorshift.table import (
    ColumnSpec,
    CompoundFilter,
    FilterCondition,
    NumberFormat,
    NumberKind,
    StringFormat,
    Table,
    TableFilterOperator,
)


def vendors(filt) -> set[str]:
    page = t.read_rows(filters=filt)
    return {r["values"]["vendor"] for r in page["rows"] if r["values"].get("vendor")}


t = Table.new(
    name="Vendor scorecard — filter recipes",
    columns=[
        ColumnSpec(name="vendor",   format=StringFormat()),
        ColumnSpec(name="region",   format=StringFormat()),
        ColumnSpec(name="amount",   format=NumberFormat(number_kind=NumberKind.FLOAT)),
        ColumnSpec(name="quantity", format=NumberFormat(number_kind=NumberKind.INT)),
    ],
)
t.clear()
t.insert_rows([
    {"vendor": "Acme",  "region": "EU", "amount": 1200.5, "quantity": 5},
    {"vendor": "Beta",  "region": "EU", "amount": 49.9,   "quantity": 1},
    {"vendor": "Gamma", "region": "US", "amount": 980.0,  "quantity": 12},
    {"vendor": "Delta", "region": "US", "amount": 2200.0, "quantity": 100},
    {"vendor": "Echo",  "region": "AS", "amount": 0.0,    "quantity": 0},
])
# One row with no region — for the missing-data recipes.
t.insert_row({"vendor": "Foxtrot", "quantity": 3})
```

## Match exact values — `EQ`, `NEQ`, `IS_IN`, `IS_NOT_IN`

"Find Acme":

```python theme={"languages":{}}
just_acme = vendors(CompoundFilter.of(
    FilterCondition("vendor", TableFilterOperator.EQ, "Acme"),
))
# {'Acme'}
```

"Vendors not in EU." Note that `NEQ` includes rows where the column is `NULL` — `Foxtrot` (region missing) appears here:

```python theme={"languages":{}}
not_eu = vendors(CompoundFilter.of(
    FilterCondition("region", TableFilterOperator.NEQ, "EU"),
))
# {'Gamma', 'Delta', 'Echo', 'Foxtrot'}
```

"Vendors in EU or US" — use `IS_IN` instead of two `OR` conditions:

```python theme={"languages":{}}
eu_or_us = vendors(CompoundFilter.of(
    FilterCondition("region", TableFilterOperator.IS_IN, ["EU", "US"]),
))
# {'Acme', 'Beta', 'Gamma', 'Delta'}
```

"Vendors outside EU and US" — `IS_NOT_IN` excludes the listed values **and** excludes nulls (so `Foxtrot` is not in the result):

```python theme={"languages":{}}
elsewhere = vendors(CompoundFilter.of(
    FilterCondition("region", TableFilterOperator.IS_NOT_IN, ["EU", "US"]),
))
# {'Echo'}
```

## Compare numbers — `GT`, `GTE`, `LT`, `LTE`

"Vendors with more than 10 units":

```python theme={"languages":{}}
big_orders = vendors(CompoundFilter.of(
    FilterCondition("quantity", TableFilterOperator.GT, 10),
))
# {'Gamma', 'Delta'}
```

"Vendors with five or more units" — `GTE`:

```python theme={"languages":{}}
five_plus = vendors(CompoundFilter.of(
    FilterCondition("quantity", TableFilterOperator.GTE, 5),
))
# {'Acme', 'Gamma', 'Delta'}
```

The same operators work on `TimestampFormat` columns — pass a `datetime` as `value` to filter by date.

## Search text — `CONTAINS`, `DOES_NOT_CONTAIN`

`CONTAINS` is **case-insensitive** — `"a"` matches both `"Acme"` and `"Beta"`:

```python theme={"languages":{}}
has_a = vendors(CompoundFilter.of(
    FilterCondition("vendor", TableFilterOperator.CONTAINS, "a"),
))
# {'Acme', 'Beta', 'Gamma', 'Delta'}
```

`DOES_NOT_CONTAIN` is its inverse:

```python theme={"languages":{}}
no_a = vendors(CompoundFilter.of(
    FilterCondition("vendor", TableFilterOperator.DOES_NOT_CONTAIN, "a"),
))
# {'Echo', 'Foxtrot'}
```

## Find missing data — `IS_EMPTY`, `IS_NOT_EMPTY`

Pass `None` as the value. Use these to find rows that haven't been filled in yet (a common pattern when you're staging data for an AI-generated column):

```python theme={"languages":{}}
missing_region = vendors(CompoundFilter.of(
    FilterCondition("region", TableFilterOperator.IS_EMPTY, None),
))
# {'Foxtrot'}

has_region = vendors(CompoundFilter.of(
    FilterCondition("region", TableFilterOperator.IS_NOT_EMPTY, None),
))
# {'Acme', 'Beta', 'Gamma', 'Delta', 'Echo'}
```

## Filter file columns — `FILENAMES_CONTAIN`

For a column whose format is [`FileFormat`](/sdk/table/reference#fileformat) (or `ListOfFilesFormat`), match rows whose attached filename contains a substring:

```python theme={"languages":{}}
# Assume the table has a `contract` column of type FileFormat.
# Match rows whose uploaded file's name contains "invoice".
invoices = t.read_rows(filters=CompoundFilter.of(
    FilterCondition("contract", TableFilterOperator.FILENAMES_CONTAIN, "invoice"),
))
```

## Cleanup

```python theme={"languages":{}}
t.delete()
```

<Tip>
  **Combining operators.** Every recipe above uses `CompoundFilter.of(...)` for a single AND'd group of conditions. For mixed `AND`/`OR` logic — e.g. "EU and (priority > 2 or status = closed)" — use nested `FilterGroup`s. See [Compose filters with AND and OR](/sdk/table/examples/compound-filters).
</Tip>

<Tip>
  **Ordering filters on `currency` or `percent` columns.** For `GT`/`LT` comparisons on a money column, use a `NumberKind.INT` or `NumberKind.FLOAT` column instead.
</Tip>

## See also

<Columns cols={3}>
  <Card title="Compose filters with AND and OR" icon="git-branch" href="/sdk/table/examples/compound-filters">
    Nested `FilterGroup`s for mixed-logic filters.
  </Card>

  <Card title="TableFilterOperator reference" icon="book-open" href="/sdk/table/reference#tablefilteroperator">
    Every operator with one-line semantics.
  </Card>

  <Card title="Rows and filters" icon="filter" href="/sdk/table/examples/rows-and-filters">
    Filters in context with insert / update / delete / scroll.
  </Card>
</Columns>
