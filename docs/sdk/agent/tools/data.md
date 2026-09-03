> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Data tools

> Query dataframes and fetch structured financial data.

Add these tools with `AgentTools.<tool>(tool_name="...", ...)` or `agent.add_tool.<tool>(tool_name="...", ...)`. Every tool requires a unique `tool_name=`. Each entry lists the tool's configuration parameters. See the [Agent reference](/sdk/agent/reference) for attaching and running tools.

<a id="dataframe_get_schema" />

## `dataframe_get_schema` — Dataframe Get Schema

Get the schema of a dataframe including columns, types, and constraints.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.dataframe_get_schema(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="dataframe" type="str" default="&#x22;{'object_info': {'object_id': '', 'object_type': 3}}&#x22;">
  The dataframe to get schema from
</ParamField>

<ParamField path="dataframe_type" type="str" default="'table'">
  The type of dataframe to be used
</ParamField>

<a id="dataframe_raw_query" />

## `dataframe_raw_query` — Dataframe Raw Query

Execute custom queries on dataframes.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.dataframe_raw_query(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="dataframe" type="Any">
  The dataframe to query
</ParamField>

<ParamField path="preload" type="bool" default="False">
  Whether to preload dataframe instead of lazy load
</ParamField>

<ParamField path="query" type="str" default="'SELECT * FROM {df}'">
  SQL query to execute on the dataframe. Use \{df} as the table name placeholder. Example: SELECT \* FROM \{df} limit 10;
</ParamField>

<ParamField path="dataframe_type" type="str" default="'table'">
  The type of dataframe to be used
</ParamField>

<a id="fetch_filings" />

## `fetch_filings` — Fetch Filings

Search for financial filings (10-K, 10-Q) by stock ticker

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.fetch_filings(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="document_group_ids" type="Any">
  Filing types: 1=Earnings Release, 2=Press Release, 3=Interim Report (10-Q), 4=Annual Report (10-K), 5=Proxy Statement, 6=Registration Statement
</ParamField>

<ParamField path="end_date" type="Any">
  Only return results before this date (YYYY-MM-DD)
</ParamField>

<ParamField path="limit" type="Any">
  Maximum number of results to return (1-100) loader\_type (str)
</ParamField>

<ParamField path="loader_type" type="str" default="'filings'" />

<ParamField path="start_date" type="Any">
  Only return results after this date (YYYY-MM-DD)
</ParamField>

<ParamField path="tickers" type="Any">
  Comma-separated stock tickers (e.g. AAPL,GOOGL,MSFT)
</ParamField>

<a id="fetch_financials" />

## `fetch_financials` — Fetch Financials

Fetch income statements, balance sheets, or cash flow statements with SEC filing citations

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.fetch_financials(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="currency" type="Any">
  ISO currency code for conversion (e.g. EUR). Leave empty for reporting currency.
</ParamField>

<ParamField path="limit" type="Any">
  Number of periods to return (1-20) loader\_type (str)
</ParamField>

<ParamField path="loader_type" type="str" default="'financials'" />

<ParamField path="metrics" type="Any">
  Comma-separated metric IDs to filter (e.g. total\_revenues,gross\_profit,net\_income). Leave empty for all.
</ParamField>

<ParamField path="period_type" type="Any">
  Period granularity
</ParamField>

<ParamField path="statement_type" type="Any">
  Type of financial statement
</ParamField>

<ParamField path="tickers" type="Any">
  Comma-separated stock tickers (e.g. MSFT,NVDA,GOOG)
</ParamField>

<a id="fetch_logos" />

## `fetch_logos` — Fetch Logos

Fetch company logos by ticker or domain

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.fetch_logos(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="domains" type="Any">
  Comma-separated domains (e.g. stripe.com,openai.com) for companies without a public ticker.
</ParamField>

<ParamField path="format" type="Any">
  Image format.
</ParamField>

<ParamField path="retina" type="Any">
  Retina (2x) resolution. Recommended to keep enabled for crisp logos in slides/PDFs.
</ParamField>

<ParamField path="size" type="Any">
  Image size in pixels.
</ParamField>

<ParamField path="theme" type="Any">
  Logo variant for the target slide background. Use 'light' for white/light cells and 'dark' for dark cells.
</ParamField>

<ParamField path="tickers" type="Any">
  Comma-separated stock tickers (e.g. AAPL,GOOGL,MSFT). Supports exchange suffix like AAPL.LSE.
</ParamField>

<a id="fetch_ratios" />

## `fetch_ratios` — Fetch Ratios

Fetch financial ratios (P/E, EV/EBITDA, margins, growth) for one or more companies

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.fetch_ratios(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="currency" type="Any">
  ISO currency code (e.g. EUR). Leave empty for default.
</ParamField>

<ParamField path="daily" type="Any">
  Set to 'true' for daily time series. Only works for Trailing Valuation ratios. loader\_type (str)
</ParamField>

<ParamField path="loader_type" type="str" default="'ratios'" />

<ParamField path="period_type" type="Any">
  Period granularity (ignored for daily mode)
</ParamField>

<ParamField path="ratio_ids" type="Any">
  Comma-separated ratio IDs. Leave empty for all. Common IDs: ratio\_price\_to\_earnings, ratio\_price\_to\_sales, ratio\_price\_to\_book, ratio\_ev\_to\_ebitda, ratio\_ev\_to\_ebit, ratio\_fcf\_yield, ratio\_earnings\_yield, ratio\_gross\_profit\_margin, ratio\_operating\_margin, ratio\_net\_profit\_margin, ratio\_ebitda\_margin, ratio\_fcf\_margin, ratio\_return\_on\_equity, ratio\_return\_on\_assets, ratio\_return\_on\_invested\_capital, ratio\_debt\_to\_equity, ratio\_net\_debt\_to\_ebitda, ratio\_current\_ratio, ratio\_quick\_ratio, ratio\_diluted\_eps, ratio\_book\_value\_per\_share, ratio\_free\_cash\_flow\_per\_share, growth\_revenue\_1y, growth\_revenue\_3y\_cagr, growth\_net\_income\_1y, growth\_diluted\_eps\_1y, calculated\_market\_cap, calculated\_ebitda, calculated\_fcf, calculated\_net\_debt, calculated\_dividend\_yield.
</ParamField>

<ParamField path="tickers" type="Any">
  Comma-separated stock tickers (e.g. MSFT,NVDA,GOOG)
</ParamField>

<a id="fetch_slides" />

## `fetch_slides` — Fetch Slides

Search for investor presentation slides by stock ticker

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.fetch_slides(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="document_group_ids" type="Any">
  Optional filter by document group: 1=Earnings Release, 2=Press Release, 3=Interim Report, 4=Annual Report, 5=Proxy Statement, 6=Registration Statement. Leave empty to return all slide types.
</ParamField>

<ParamField path="end_date" type="Any">
  Only return results before this date (YYYY-MM-DD)
</ParamField>

<ParamField path="limit" type="int" default="1">
  Maximum number of results to return (1-50) loader\_type (str)
</ParamField>

<ParamField path="loader_type" type="str" default="'slides'" />

<ParamField path="start_date" type="Any">
  Only return results after this date (YYYY-MM-DD)
</ParamField>

<ParamField path="tickers" type="Any">
  Comma-separated stock tickers (e.g. AAPL,GOOGL,MSFT)
</ParamField>

<a id="fetch_stock_prices" />

## `fetch_stock_prices` — Fetch Stock Prices

Fetch historical stock prices for one or more companies

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.fetch_stock_prices(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="end_date" type="Any">
  End date YYYY-MM-DD. Leave empty for today. loader\_type (str)
</ParamField>

<ParamField path="loader_type" type="str" default="'stock_prices'" />

<ParamField path="start_date" type="Any">
  Start date YYYY-MM-DD. Leave empty for full history.
</ParamField>

<ParamField path="tickers" type="Any">
  Comma-separated stock tickers (e.g. MSFT,NVDA,GOOG)
</ParamField>

<a id="fetch_transcripts" />

## `fetch_transcripts` — Fetch Transcripts

Search for earnings call transcripts by stock ticker

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.fetch_transcripts(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="end_date" type="Any">
  Only return results before this date (YYYY-MM-DD)
</ParamField>

<ParamField path="limit" type="Any">
  Maximum number of results to return (1-50) loader\_type (str)
</ParamField>

<ParamField path="loader_type" type="str" default="'transcripts'" />

<ParamField path="start_date" type="Any">
  Only return results after this date (YYYY-MM-DD)
</ParamField>

<ParamField path="tickers" type="Any">
  Comma-separated stock tickers (e.g. AAPL,GOOGL,MSFT)
</ParamField>
