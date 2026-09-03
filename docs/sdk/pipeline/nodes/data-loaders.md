> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Data Loaders nodes

> Load from files, the web, search providers, RSS, and external data APIs.

Add these nodes with the pipeline builder: `pipeline.add(name="...").<node>(...)`. Each entry lists the node's configuration parameters. See the [Pipeline reference](/sdk/pipeline/reference) for `add`, `run`, and lifecycle methods.

<a id="api" />

## `api` — API

Make an API request to a given URL.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").api(url="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="is_raw_json" type="bool" default="False">
  Whether to return the raw JSON response from the API
</ParamField>

<ParamField path="body_params" type="ListType | list[KeyValue] | list[List[Dict[str, Any]]]" default="[]">
  The body parameters to include in the API request
</ParamField>

<ParamField path="fail_non_2xx_response" type="bool" default="False">
  If enabled, the node fails when the API response status code is not in the 2xx range. Otherwise the response body is returned regardless of status code.
</ParamField>

<ParamField path="files" type="ListType | list[FileKeyValue] | list[List[Dict[str, Any]]]" default="[]">
  Files to include in the API request
</ParamField>

<ParamField path="headers" type="ListType | list[KeyValue] | list[List[Dict[str, Any]]]" default="[]">
  Headers to include in the API request
</ParamField>

<ParamField path="method" type="str" default="'GET'">
  Choose the API Method desired (GET, POST, PUT, DELETE, PATCH)
  One of: `DELETE`, `GET`, `PATCH`, `POST`, `PUT`
</ParamField>

<ParamField path="query_params" type="ListType | list[KeyValue] | list[List[Dict[str, Any]]]" default="[]">
  Query parameters to include in the API request
</ParamField>

<ParamField path="url" type="str" required>
  Target URL for the API Request
</ParamField>

<ParamField path="raw_json" type="str" default="''">
  The raw JSON request to the API
</ParamField>

<a id="arxiv" />

## `arxiv` — Arxiv

Query ARXIV to return relevant articles

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").arxiv(query="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="chunk_text" type="bool" default="False">
  Whether to chunk the text
</ParamField>

<ParamField path="query" type="str" required>
  The ARXIV query
</ParamField>

<ParamField path="chunk_overlap" type="int" default="0">
  The overlap of the chunks
</ParamField>

<ParamField path="chunk_size" type="int" default="512">
  The size of the chunks to create
</ParamField>

<a id="crunchbase" />

## `crunchbase` — Crunchbase

Call the Crunchbase API to look up companies, people, funding rounds, and acquisitions.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").crunchbase(endpoint="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="body" type="str" default="''" />

<ParamField path="endpoint" type="str" required />

<ParamField path="query_params" type="str" default="''" />

<a id="csv_query" />

## `csv_query` — CSV Query

Utilizes an LLM agent to query CSV(s). Delimeter for the CSV must be commas.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").csv_query(query="...", csv=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="query" type="str" required />

<ParamField path="csv" type="AcceptsFile" required />

<ParamField path="stream" type="bool" default="False" />

<a id="deep_research" />

## `deep_research` — Deep Research

Perform advanced AI research and analysis with specialized model capabilities

<Info>Platform docs: [Deep Research](/nodes/deep-research/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").deep_research(provider="anthropic", api_key="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="provider" type="str" required>
  Select the LLM provider for deep research

  <Expandable title="Allowed values">
    `anthropic`, `azure`, `bedrock`, `cohere`, `custom`, `fireworks`, `google`, `groq`, `openai`, `perplexity`, `together`, `xai`
  </Expandable>
</ParamField>

<ParamField path="stream" type="bool" default="False">
  Whether to stream the research response
</ParamField>

<ParamField path="use_personal_api_key" type="bool" default="False">
  Whether to use a personal API key
</ParamField>

<ParamField path="model" type="str" default="''">
  Select the LLM model for deep research

  <Expandable title="Allowed values">
    `MiniMaxAI/MiniMax-M2.5`, `MiniMaxAI/MiniMax-M2.7`, `Qwen/QwQ-32B-Preview`, `Qwen/Qwen2.5-72B-Instruct-Turbo-lora`, `Qwen/Qwen2.5-7B-Instruct-Turbo`, `Qwen/Qwen3-235B-A22B-Instruct-2507-tput`, `Qwen/Qwen3-235B-A22B-fp8-tput`, `Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8`, `Qwen/Qwen3-VL-8B-Instruct`, `Qwen/Qwen3.5-397B-A17B`, `Qwen/Qwen3.5-9B`, `Qwen/Qwen3.6-Plus`, `accounts/fireworks/models/deepseek-v4-pro`, `accounts/fireworks/models/glm-5p1`, `accounts/fireworks/models/gpt-oss-120b`, `accounts/fireworks/models/kimi-k2p5`, `accounts/fireworks/models/kimi-k2p6`, `accounts/fireworks/models/minimax-m2p7`, `accounts/fireworks/models/qwen3-235b-a22b`, `accounts/fireworks/models/qwen3p5-397b-a17b`, `accounts/fireworks/models/qwen3p6-plus`, `amazon.nova-lite-v1:0`, `amazon.nova-micro-v1:0`, `amazon.nova-pro-v1:0`, `amazon.titan-text-express-v1`, `amazon.titan-text-lite-v1`, `chatgpt-4o-latest`, `claude-3-5-haiku-20241022`, `claude-3-7-sonnet-20250219`, `claude-3-haiku-20240307`, `claude-haiku-4-5-20251001`, `claude-opus-4-1-20250805`, `claude-opus-4-20250514`, `claude-opus-4-5-20251101`, `claude-opus-4-6`, `claude-opus-4-7`, `claude-opus-4-8`, `claude-sonnet-4-20250514`, `claude-sonnet-4-5`, `claude-sonnet-4-6`, `command-nightly`, `command-r-08-2024`, `command-r-plus-08-2024`, `deepcogito/cogito-v2-1-671b`, `deepseek-ai/DeepSeek-R1-Distill-Llama-70B`, `deepseek-ai/DeepSeek-V3`, `deepseek-ai/DeepSeek-V4-Pro`, `deepseek-ai/deepseek-llm-67b-chat`, `gemini-2.0-flash-001`, `gemini-2.0-flash-lite-preview-02-05`, `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-3-flash-preview`, `gemini-3-pro-preview`, `gemini-3.1-flash-lite-preview`, `gemini-3.1-pro-preview`, `gemini-3.5-flash`, `gemma2-9b-it`, `google/gemma-2-27b-it`, `google/gemma-2-9b-it`, `google/gemma-2b-it`, `google/gemma-3n-E4B-it`, `google/gemma-4-31B-it`, `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4-turbo-2024-04-09`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-4o`, `gpt-4o-2024-08-06`, `gpt-4o-mini`, `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `gpt-5.1`, `gpt-5.1-codex`, `gpt-5.1-codex-mini`, `gpt-5.2`, `gpt-5.3-codex`, `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.5`, `grok-2`, `grok-2-vision`, `grok-3-beta`, `grok-3-fast-beta`, `grok-3-mini-beta`, `grok-3-mini-fast-beta`, `grok-4`, `grok-4-0629`, `grok-4-0709`, `grok-4-fast-non-reasoning`, `grok-4-fast-reasoning`, `grok-4-latest`, `llama-3.1-8b-instant`, `llama-3.3-70b-versatile`, `meta-llama/Llama-3-70b-chat-hf`, `meta-llama/Llama-3-8b-chat-hf`, `meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.2-3B-Instruct-Turbo`, `meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.3-70B-Instruct-Turbo`, `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`, `meta-llama/Llama-4-Scout-17B-16E-Instruct`, `meta-llama/Meta-Llama-3-70B-Instruct-Lite`, `meta-llama/Meta-Llama-3-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3-8B-Instruct-Lite`, `meta-llama/Meta-Llama-3-8B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo`, `meta.llama3-8b-instruct-v1:0`, `mistralai/Mistral-7B-Instruct-v0.1`, `mistralai/Mistral-7B-Instruct-v0.2`, `mistralai/Mistral-7B-Instruct-v0.3`, `mistralai/Mixtral-8x22B-Instruct-v0.1`, `mistralai/Mixtral-8x7B-Instruct-v0.1`, `mixtral-8x7b-32768`, `moonshotai/Kimi-K2-Instruct`, `moonshotai/Kimi-K2.5`, `moonshotai/Kimi-K2.6`, `o1`, `o3`, `o3-mini`, `o4-mini`, `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `perplexity-ai/r1-1776`, `r1-1776`, `sonar`, `sonar-deep-research`, `sonar-pro`, `sonar-reasoning-pro`, `us.anthropic.claude-haiku-4-5-20251001-v1:0`, `us.anthropic.claude-opus-4-1-20250805-v1:0`, `us.anthropic.claude-opus-4-5-20251101-v1:0`, `us.anthropic.claude-opus-4-6-v1`, `us.anthropic.claude-sonnet-4-20250514-v1:0`, `us.anthropic.claude-sonnet-4-5-20250929-v1:0`, `us.anthropic.claude-sonnet-4-6`, `us.meta.llama3-1-70b-instruct-v1:0`, `us.meta.llama3-1-8b-instruct-v1:0`, `us.meta.llama3-2-11b-instruct-v1:0`, `us.meta.llama3-2-1b-instruct-v1:0`, `us.meta.llama3-2-3b-instruct-v1:0`, `us.meta.llama3-2-90b-instruct-v1:0`, `zai-org/GLM-4.5-Air-FP8`, `zai-org/GLM-5`, `zai-org/GLM-5.1`
  </Expandable>
</ParamField>

<ParamField path="api_key" type="str" required>
  Your personal API key for the research provider
</ParamField>

<ParamField path="conversation" type="str" default="''">
  Previous conversation context for research continuity
</ParamField>

<ParamField path="input" type="str" default="''">
  The data input for deep research analysis
</ParamField>

<ParamField path="instructions" type="str" default="''">
  Specific instructions for the deep research task
</ParamField>

<ParamField path="max_output_tokens" type="int" default="128000">
  Maximum number of tokens in the research output
</ParamField>

<ParamField path="max_tool_calls" type="int" default="10">
  Maximum number of tool calls during research
</ParamField>

<ParamField path="parallel_tool_calls" type="bool" default="True">
  Enable parallel tool execution for faster research
</ParamField>

<ParamField path="previous_response_id" type="str" default="''">
  ID of previous response for continuation
</ParamField>

<ParamField path="prompt_cache_key" type="str" default="''">
  Cache key for prompt optimization
</ParamField>

<ParamField path="safety_identifier" type="str" default="''">
  Safety identifier for content filtering
</ParamField>

<ParamField path="service_tier" type="str" default="''">
  Service tier for the research request
</ParamField>

<ParamField path="tool_choice" type="str" default="''">
  Specific tool choice for research
</ParamField>

<ParamField path="tools" type="ListType | list[List[Dict[str, Any]]] | list[dict]" default="[]">
  Tools to use for research
</ParamField>

<ParamField path="truncation" type="str" default="''">
  Truncation strategy for long inputs
</ParamField>

<ParamField path="deployment_id" type="str" default="''">
  The deployment ID for the Azure OpenAI model
</ParamField>

<ParamField path="endpoint" type="str" default="''">
  The Azure OpenAI endpoint URL
</ParamField>

<ParamField path="finetuned_model" type="str" default="''">
  Use your finetuned model for deep research
</ParamField>

<a id="exa_ai" />

## `exa_ai` — Query the Exa search API

Query the Exa search API

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").exa_ai(query="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="query" type="str" required />

<ParamField path="end_crawl_date" type="str" default="''" />

<ParamField path="end_published_date" type="str" default="''" />

<ParamField path="livecrawl" type="bool" default="True" />

<ParamField path="loader_type" type="str" default="'EXA_AI_SEARCH'">
  One of: `EXA_AI_SEARCH`, `EXA_AI_SEARCH_COMPANIES`, `EXA_AI_SEARCH_FINANCIAL_REPORTS`, `EXA_AI_SEARCH_NEWS`, `EXA_AI_SEARCH_PEOPLE`, `EXA_AI_SEARCH_PERSONAL_SITES`, `EXA_AI_SEARCH_RESEARCH_PAPERS`, `EXA_AI_SEARCH_TWEETS`
</ParamField>

<ParamField path="max_characters" type="int" default="2000" />

<ParamField path="num_results" type="int" default="10" />

<ParamField path="search_type" type="str" default="'auto'">
  One of: `auto`, `deep`, `deep-max`, `deep-reasoning`, `fast`, `instant`, `neural`
</ParamField>

<ParamField path="start_crawl_date" type="str" default="''" />

<ParamField path="start_published_date" type="str" default="''" />

<ParamField path="use_highlights" type="bool" default="False" />

<a id="fetch_filings" />

## `fetch_filings` — Fetch Filings

Search for financial filings (10-K, 10-Q) by stock ticker

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").fetch_filings(tickers="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="document_group_ids" type="str" default="'3,4'" />

<ParamField path="end_date" type="str" default="''" />

<ParamField path="limit" type="int" default="5" />

<ParamField path="loader_type" type="str" default="'filings'">
  One of: `filings`
</ParamField>

<ParamField path="start_date" type="str" default="''" />

<ParamField path="tickers" type="str" required />

<a id="fetch_financials" />

## `fetch_financials` — Fetch Financials

Fetch income statements, balance sheets, or cash flow statements with SEC filing citations

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").fetch_financials(statement_type="balance-sheet", tickers="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="currency" type="str" default="''" />

<ParamField path="limit" type="int" default="5" />

<ParamField path="loader_type" type="str" default="'financials'">
  One of: `financials`
</ParamField>

<ParamField path="metrics" type="str" default="''" />

<ParamField path="period_type" type="str" default="'annual'">
  One of: `annual`, `latest`, `ltm`, `quarterly`
</ParamField>

<ParamField path="statement_type" type="str" required>
  One of: `balance-sheet`, `cash-flow-statement`, `income-statement`
</ParamField>

<ParamField path="tickers" type="str" required />

<a id="fetch_logos" />

## `fetch_logos` — Fetch Logos

Fetch company logos by ticker or domain

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").fetch_logos(tickers="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="domains" type="str" default="''" />

<ParamField path="format" type="str" default="'png'">
  One of: `jpg`, `png`, `webp`
</ParamField>

<ParamField path="retina" type="bool" default="True" />

<ParamField path="size" type="int" default="256" />

<ParamField path="theme" type="str" default="'light'">
  One of: `dark`, `light`
</ParamField>

<ParamField path="tickers" type="str" required />

<a id="fetch_ratios" />

## `fetch_ratios` — Fetch Ratios

Fetch financial ratios (P/E, EV/EBITDA, margins, growth) for one or more companies

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").fetch_ratios(tickers="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="currency" type="str" default="''" />

<ParamField path="daily" type="str" default="'false'" />

<ParamField path="loader_type" type="str" default="'ratios'">
  One of: `ratios`
</ParamField>

<ParamField path="period_type" type="str" default="'annual'">
  One of: `annual`, `latest`, `quarterly`
</ParamField>

<ParamField path="ratio_ids" type="str" default="''" />

<ParamField path="tickers" type="str" required />

<a id="fetch_slides" />

## `fetch_slides` — Fetch Slides

Search for investor presentation slides by stock ticker

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").fetch_slides(tickers="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="document_group_ids" type="str" default="''" />

<ParamField path="end_date" type="str" default="''" />

<ParamField path="limit" type="int" default="1" />

<ParamField path="loader_type" type="str" default="'slides'">
  One of: `slides`
</ParamField>

<ParamField path="start_date" type="str" default="''" />

<ParamField path="tickers" type="str" required />

<a id="fetch_stock_prices" />

## `fetch_stock_prices` — Fetch Stock Prices

Fetch historical stock prices for one or more companies

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").fetch_stock_prices(tickers="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="end_date" type="str" default="''" />

<ParamField path="loader_type" type="str" default="'stock_prices'">
  One of: `stock_prices`
</ParamField>

<ParamField path="start_date" type="str" default="''" />

<ParamField path="tickers" type="str" required />

<a id="fetch_transcripts" />

## `fetch_transcripts` — Fetch Transcripts

Search for earnings call transcripts by stock ticker

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").fetch_transcripts(tickers="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="end_date" type="str" default="''" />

<ParamField path="limit" type="int" default="5" />

<ParamField path="loader_type" type="str" default="'transcripts'">
  One of: `transcripts`
</ParamField>

<ParamField path="start_date" type="str" default="''" />

<ParamField path="tickers" type="str" required />

<a id="file" />

## `file` — File

Load a static file into the workflow as a raw File or process it into Text.

<Info>Platform docs: [File](/nodes/file/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").file(file_name="...", file=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="selected_option" type="str" default="'upload'">
  Select an existing file from the VectorShift platform
  One of: `name`, `upload`
</ParamField>

<ParamField path="file_name" type="str" required>
  The name of the file from the VectorShift platform (for files on the File tab)
</ParamField>

<ParamField path="file_parser" type="str" default="'default'">
  The processing model with which the document will be processed. Default processing model includes standard document parsing / OCR. Llamaparse will allow for ability to read documents with complex features (e.g., tables, charts, etc.). Llamaparse will be charged at 0.3 cents per page. Textract for most advanced data extraction and will be charged at 1.5 cents per page.
  One of: `contextual_ai`, `default`, `docling`, `llama_parse`, `mistral_ocr`, `reducto`, `textract`
</ParamField>

<ParamField path="file" type="AcceptsFile" required>
  The file that was passed in
</ParamField>

<a id="google_alert_rss_reader" />

## `google_alert_rss_reader` — Google Alert RSS Reader

Read the contents from an RSS feed created from a Google Alert: [https://www.google.com/alerts](https://www.google.com/alerts)

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").google_alert_rss_reader(feed_link="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="feed_link" type="str" required />

<ParamField path="timeframe" type="str" default="'all'">
  One of: `all`, `past day`, `past month`, `past week`
</ParamField>

<a id="google_search" />

## `google_search` — Google Search

Query the Google Search search API

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").google_search(query="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="query" type="str" required />

<ParamField path="location" type="str" default="'us'">
  <Expandable title="Allowed values">
    `ad`, `ae`, `af`, `ag`, `ai`, `al`, `am`, `an`, `ao`, `aq`, `ar`, `as`, `at`, `au`, `aw`, `az`, `ba`, `bb`, `bd`, `be`, `bf`, `bg`, `bh`, `bi`, `bj`, `bm`, `bn`, `bo`, `br`, `bs`, `bt`, `bv`, `bw`, `by`, `bz`, `ca`, `cc`, `cd`, `cf`, `cg`, `ch`, `ci`, `ck`, `cl`, `cm`, `cn`, `co`, `cr`, `cs`, `cu`, `cv`, `cx`, `cy`, `cz`, `de`, `dj`, `dk`, `dm`, `do`, `dz`, `ec`, `ee`, `eg`, `eh`, `er`, `es`, `et`, `fi`, `fj`, `fk`, `fm`, `fo`, `fr`, `ga`, `gd`, `ge`, `gf`, `gh`, `gi`, `gl`, `gm`, `gn`, `gp`, `gq`, `gr`, `gs`, `gt`, `gu`, `gw`, `gy`, `hk`, `hm`, `hn`, `hr`, `ht`, `hu`, `id`, `ie`, `il`, `in`, `io`, `iq`, `ir`, `is`, `it`, `jm`, `jo`, `jp`, `ke`, `kg`, `kh`, `ki`, `km`, `kn`, `kp`, `kr`, `kw`, `ky`, `kz`, `la`, `lb`, `lc`, `li`, `lk`, `lr`, `ls`, `lt`, `lu`, `lv`, `ly`, `ma`, `mc`, `md`, `mg`, `mh`, `mk`, `ml`, `mm`, `mn`, `mo`, `mp`, `mq`, `mr`, `ms`, `mt`, `mu`, `mv`, `mw`, `mx`, `my`, `mz`, `na`, `nc`, `ne`, `nf`, `ng`, `ni`, `nl`, `no`, `np`, `nr`, `nu`, `nz`, `om`, `pa`, `pe`, `pf`, `pg`, `ph`, `pk`, `pl`, `pm`, `pn`, `pr`, `ps`, `pt`, `pw`, `py`, `qa`, `re`, `ro`, `ru`, `rw`, `sa`, `sb`, `sc`, `sd`, `se`, `sg`, `sh`, `si`, `sj`, `sk`, `sl`, `sm`, `sn`, `so`, `sr`, `st`, `sv`, `sy`, `sz`, `tc`, `td`, `tf`, `tg`, `th`, `tj`, `tk`, `tl`, `tm`, `tn`, `to`, `tr`, `tt`, `tv`, `tw`, `tz`, `ua`, `ug`, `uk`, `um`, `us`, `uy`, `uz`, `va`, `vc`, `ve`, `vg`, `vi`, `vn`, `vu`, `wf`, `ws`, `ye`, `yt`, `za`, `zm`, `zw`
  </Expandable>
</ParamField>

<ParamField path="num_results" type="int" default="10" />

<ParamField path="search_type" type="str" default="'web'">
  One of: `events`, `hotels`, `image`, `news`, `web`
</ParamField>

<a id="parallel_ai_search" />

## `parallel_ai_search` — Parallel AI Search

Search the web with Parallel's Search API

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").parallel_ai_search()
  ```
</CodeGroup>

**Parameters**

<ParamField path="blocked_domains" type="list[str]" default="[]" />

<ParamField path="excerpts_max_chars_per_result" type="int" default="1500" />

<ParamField path="fetch_live_results" type="bool" default="False" />

<ParamField path="max_chars_per_result" type="int" default="1500" />

<ParamField path="max_results" type="int" default="10" />

<ParamField path="mode" type="str" default="'one-shot'">
  One of: `agentic`, `one-shot`
</ParamField>

<ParamField path="objective" type="str" default="''" />

<ParamField path="preferred_domains" type="list[str]" default="[]" />

<ParamField path="processor" type="str" default="''">
  One of: \`\`, `base`, `pro`
</ParamField>

<ParamField path="search_queries" type="list[str]" default="[]" />

<a id="perplexity_search" />

## `perplexity_search` — Query the Perplexity search API

Query the Perplexity search API

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").perplexity_search(query="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="query" type="str" required />

<ParamField path="last_updated_after_filter" type="str" default="''" />

<ParamField path="last_updated_before_filter" type="str" default="''" />

<ParamField path="max_results" type="int" default="10" />

<ParamField path="max_tokens_per_page" type="int" default="1000" />

<ParamField path="query_list" type="list[str]" default="[]" />

<ParamField path="return_images" type="bool" default="False" />

<ParamField path="return_snippets" type="bool" default="True" />

<ParamField path="search_after_date_filter" type="str" default="''" />

<ParamField path="search_before_date_filter" type="str" default="''" />

<ParamField path="search_domain_filter" type="list[str]" default="[]" />

<ParamField path="search_mode" type="str" default="''">
  One of: \`\`, `academic`, `web`
</ParamField>

<ParamField path="search_recency_filter" type="str" default="''">
  One of: \`\`, `day`, `month`, `week`, `year`
</ParamField>

<ParamField path="user_location_latitude" type="str" default="''" />

<ParamField path="user_location_longitude" type="str" default="''" />

<ParamField path="user_location_name" type="str" default="''" />

<ParamField path="user_location_radius_km" type="str" default="''" />

<a id="reducto_extract" />

## `reducto_extract` — Reducto Extract

Extract structured data from documents using Reducto

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").reducto_extract(json_schema="...", system_prompt="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="use_personal_api_key" type="bool" default="False">
  Use your own Reducto API key instead of the platform default.
</ParamField>

<ParamField path="return_citations" type="bool" default="False">
  Return citation bounding boxes for extracted fields.
</ParamField>

<ParamField path="api_key" type="str" default="''">
  Your personal Reducto API key.
</ParamField>

<ParamField path="deep_extract" type="bool" default="True">
  Enable agentic deep extraction for higher accuracy. Uses iterative verification against the source material.
</ParamField>

<ParamField path="files" type="AcceptsFileList" default="[]">
  Documents to extract data from (up to 2,500 pages per document).
</ParamField>

<ParamField path="json_schema" type="str" required>
  A JSON schema defining the structure of data to extract. Use descriptive field names.
</ParamField>

<ParamField path="system_prompt" type="str" required>
  Instructions for how the AI should extract and verify data from the documents.
</ParamField>

<a id="rss" />

## `rss` — RSS

RSS

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").rss()
  ```
</CodeGroup>

**Parameters**

<ParamField path="sub_type" type="str" default="''" />

<a id="rss_feed_reader" />

## `rss_feed_reader` — RSS Feed Reader

Read the contents from an RSS feed

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").rss_feed_reader(url="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="entries" type="int" default="10" />

<ParamField path="timeframe" type="str" default="'all'">
  One of: `all`, `past day`, `past month`, `past week`
</ParamField>

<ParamField path="url" type="str" required />

<a id="serp_api" />

## `serp_api` — Serp API

Query the SERPAPI Google search API

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").serp_api(query="...", api_key="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="query" type="str" required />

<ParamField path="api_key" type="str" required />

<a id="url_loader" />

## `url_loader` — URL Loader

Scrape the contents from a URL

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").url_loader(api_key="...", url="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="provider" type="str" default="'jina'">
  The provider to use for the URL Scraper
  One of: `apify`, `jina`, `modal`
</ParamField>

<ParamField path="use_actions" type="bool" default="True">
  Perform browser actions to interact with the input website
</ParamField>

<ParamField path="recursive" type="bool" default="False">
  Whether to recursively load the URL
</ParamField>

<ParamField path="api_key" type="str" required>
  The API key to use
</ParamField>

<ParamField path="url" type="str" required>
  The URL to load
</ParamField>

<ParamField path="url_limit" type="int" default="10">
  The maximum number of URLs to load
</ParamField>

<ParamField path="actions" type="AcceptsAnyList | ListType | list[AcceptsAnyList]" default="[]">
  The browser actions to perform on the URL
</ParamField>

<ParamField path="ai_enhance_content" type="bool" default="False">
  Whether to enhance the content
</ParamField>

<ParamField path="load_sitemap" type="bool" default="False">
  Load URLs to crawl from a sitemap. If the URL is a sitemap, it will be used directly. If the URL is not a sitemap, the sitemap will be fetched automatically.
</ParamField>

<ParamField path="use_proxy" type="bool" default="False">
  Use a proxy to crawl the website
</ParamField>

<a id="web" />

## `web` — Web Search

Web Search

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").web()
  ```
</CodeGroup>

**Parameters**

<ParamField path="sub_type" type="str" default="''" />

<a id="wikipedia" />

## `wikipedia` — Wikipedia

Query Wikipedia to return relevant articles

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").wikipedia(query="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="chunk_text" type="bool" default="False">
  Whether to chunk the text
</ParamField>

<ParamField path="query" type="str" required>
  The Wikipedia query
</ParamField>

<ParamField path="chunk_overlap" type="int" default="0">
  The overlap of the chunks
</ParamField>

<ParamField path="chunk_size" type="int" default="512">
  The size of the chunks to create
</ParamField>

<a id="you_dot_com" />

## `you_dot_com` — Query the You.com search API

Query the You.com search API

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").you_dot_com(query="...", api_key="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="loader_type" type="str" default="'YOU_DOT_COM'">
  Select the loader type: General or News
  One of: `YOU_DOT_COM`, `YOU_DOT_COM_NEWS`
</ParamField>

<ParamField path="query" type="str" required>
  The search query
</ParamField>

<ParamField path="api_key" type="str" required>
  You.com API key
</ParamField>

<a id="youtube" />

## `youtube` — Youtube

Get the transcript of a youtube video.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").youtube(url="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="chunk_text" type="bool" default="False">
  Whether to chunk the text
</ParamField>

<ParamField path="url" type="str" required>
  The YouTube URL to get the transcript of
</ParamField>

<ParamField path="chunk_overlap" type="int" default="0">
  The overlap of the chunks
</ParamField>

<ParamField path="chunk_size" type="int" default="512">
  The size of the chunks to create
</ParamField>
