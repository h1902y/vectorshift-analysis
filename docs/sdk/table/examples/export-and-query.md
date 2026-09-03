> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Export and query

> Export a Table to CSV and ask a natural-language question over the rows.

**What this builds.** A 3-row table that's exported to CSV, then queried with a natural-language question routed through server-side text-to-SQL.
**You'll end up with.** Two working calls — `export(format=CSV)` and `nl_query(...)` — and a clear picture of when to reach for each.

```python theme={"languages":{}}
"""Export a Table to CSV and ask a natural-language question over the rows.

export() returns a TableExportResult dict. For small exports `content`
holds the CSV/Excel bytes inline; for large exports the server streams
to object storage and `content` is empty — use `s3_key` (and signed
`s3_url` if present) to fetch the file. nl_query() runs server-side
text-to-SQL and returns {answer, dataframes}.

import_file() has the same long-running shape as run_and_wait — see
the reference for that path.
"""

from vectorshift.table import (
    ColumnSpec,
    ExportFormat,
    NumberFormat,
    NumberKind,
    StringFormat,
    Table,
)

t = Table.new(
    name="SDK Tables Export Demo",
    columns=[
        ColumnSpec(name="vendor", format=StringFormat()),
        ColumnSpec(name="amount", format=NumberFormat(number_kind=NumberKind.FLOAT)),
    ],
)
t.insert_rows(
    [
        {"vendor": "Acme", "amount": 1200.5},
        {"vendor": "Beta", "amount": 49.9},
        {"vendor": "Gamma", "amount": 980.0},
    ]
)
print(f"1. Set up table id={t.id} with 3 rows.")

# --- Export to CSV ---
# export() returns a TypedDict; access by key. `content` is the inline
# bytes for small exports, but is empty when the server streamed the
# export to object storage — fall back to s3_key / s3_url then.
out = t.export(format=ExportFormat.CSV)
print(
    f"2. Exported -> filename={out['filename']!r} format={out['format']} bytes={len(out['content'])}"
)
if out["content"]:
    print(f"     first 200 bytes: {out['content'][:200]!r}")
else:
    print(f"     streamed to storage: s3_key={out.get('s3_key')!r} s3_url={out.get('s3_url')!r}")

# --- nl_query: server-side text-to-SQL ---
# Returns {answer, dataframes}; `dataframes` are protojson-encoded JSON strings.
try:
    result = t.nl_query("how many rows are in this table?")
    print(f"3. nl_query answer: {result['answer']!r}")
    print(f"     dataframes returned: {len(result['dataframes'])}")
except Exception as exc:
    print(f"3. nl_query error: {type(exc).__name__}: {exc}")

t.delete()
print("4. Deleted Table.\n\nDone.")
```

## Expected output

```text theme={"languages":{}}
1. Set up table id=... with 3 rows.
2. Exported -> filename='SDK Tables Export Demo.csv' format=ExportFormat.CSV bytes=...
     first 200 bytes: b'vendor,amount\nAcme,1200.5\nBeta,49.9\nGamma,980.0\n'
3. nl_query answer: '3'
     dataframes returned: 1
4. Deleted Table.

Done.
```

<Tip>
  **Large exports stream to object storage.** In production the server may return `content=b''` and a `s3_key` (and signed `s3_url` if provided) — fetch the file via that URL instead of reading inline bytes.
</Tip>

## See also

<Columns cols={3}>
  <Card title="Aggregation + run" icon="sigma" href="/sdk/table/examples/aggregation-and-run">
    The other read-side verb, with `AggregationType`.
  </Card>

  <Card title="Full workflow" icon="layers" href="/sdk/table/examples/full-workflow">
    Export sits inside the full vendor-scorecard walk.
  </Card>

  <Card title="Reference" icon="book-open" href="/sdk/table/reference">
    `export`, `nl_query` parameters.
  </Card>
</Columns>
