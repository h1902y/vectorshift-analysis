> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Web Search tools

> Search the web and pull from external knowledge sources.

Add these tools with `AgentTools.<tool>(tool_name="...", ...)` or `agent.add_tool.<tool>(tool_name="...", ...)`. Every tool requires a unique `tool_name=`. Each entry lists the tool's configuration parameters. See the [Agent reference](/sdk/agent/reference) for attaching and running tools.

<a id="api" />

## `api` — API

Make an API request to a given URL.

<Info>Platform docs: [API](https://docs.vectorshift.ai/platform/pipelines/data-loaders/api)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.api(tool_name="...", is_raw_json=True, url="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="is_raw_json" type="bool" required>
  Whether to return the raw JSON response from the API
</ParamField>

<ParamField path="url" type="str" required>
  Target URL for the API Request
</ParamField>

<ParamField path="body_params" type="list[Dict[str, Any]]">
  The body parameters to include in the API request
</ParamField>

<ParamField path="files" type="list[Dict[str, Any]]">
  Files to include in the API request
</ParamField>

<ParamField path="headers" type="list[Dict[str, Any]]">
  Headers to include in the API request
</ParamField>

<ParamField path="method" type="str">
  Choose the API Method desired (GET, POST, PUT, DELETE, PATCH)
</ParamField>

<ParamField path="query_params" type="list[Dict[str, Any]]">
  Query parameters to include in the API request
</ParamField>

<ParamField path="raw_json" type="str">
  The raw JSON request to the API
</ParamField>

<a id="arxiv" />

## `arxiv` — Arxiv Loader

Query ARXIV to return relevant articles

<Info>Platform docs: [Arxiv Loader](https://docs.vectorshift.ai/platform/pipelines/data-loaders/arxiv)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.arxiv(tool_name="...", chunk_text=True, query="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="chunk_text" type="bool" required>
  Whether to chunk the text
</ParamField>

<ParamField path="query" type="str" required>
  The ARXIV query
</ParamField>

<ParamField path="chunk_overlap" type="int">
  The overlap of the chunks
</ParamField>

<ParamField path="chunk_size" type="int">
  The size of the chunks to create
</ParamField>

<a id="crunchbase" />

## `crunchbase` — Crunchbase

Call the Crunchbase API to look up companies, people, funding rounds, and acquisitions.

<Info>Platform docs: [Crunchbase](https://data.crunchbase.com/docs/using-the-api)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.crunchbase(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="body" type="Any">
  JSON body for searches/\* endpoints. IMPORTANT: categories and location\_identifiers require UUIDs from autocomplete, not text! Example: \{"field\_ids":\["identifier","funding\_total"],"query":\[\{"type":"predicate","field\_id":"categories","operator\_id":"includes","values":\["uuid-from-autocomplete"]}],"limit":25}
</ParamField>

<ParamField path="endpoint" type="Any">
  API path: 'autocompletes' | 'entities/organizations/\{id}' | 'entities/people/\{id}' | 'searches/organizations' | 'searches/funding\_rounds' | 'searches/people'
</ParamField>

<ParamField path="query_params" type="Any">
  Query string for GET requests. Autocomplete: 'query=\{name}\&collection\_ids=organization.companies'. Entity lookup: 'field\_ids=short\_description,funding\_total\&card\_ids=founders'
</ParamField>

<a id="exa_ai" />

## `exa_ai` — Exa AI Search

Query the Exa search API

<Info>Platform docs: [Exa AI Search](https://docs.vectorshift.ai/platform/pipelines/data-loaders/web-search-exa)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.exa_ai(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="end_crawl_date" type="Any">
  Only return results crawled before this date (ISO 8601)
</ParamField>

<ParamField path="end_published_date" type="Any">
  Only return results published before this date (ISO 8601, e.g. 2024-12-31T00:00:00.000Z)
</ParamField>

<ParamField path="livecrawl" type="Any">
  Enable live crawling to fetch fresh content. When on, always fetches live content. When off, uses cached content.
</ParamField>

<ParamField path="loader_type" type="str" default="'EXA_AI_SEARCH'">
  Select the search category to match the user's query intent. Default to EXA\_AI\_SEARCH: General web search. Use general search for weather
</ParamField>

<ParamField path="max_characters" type="int" default="2000">
  Maximum characters per result for text or highlights content
</ParamField>

<ParamField path="num_results" type="int" default="10">
  Number of results to return (1-100) default 10
</ParamField>

<ParamField path="query" type="str" default="''">
  The search query
</ParamField>

<ParamField path="search_type" type="Any">
  Search method: auto (default) intelligently combines methods, neural uses embeddings, fast is streamlined, instant is lowest latency, deep/deep-reasoning/deep-max offer increasing search depth, Generally default to auto
</ParamField>

<ParamField path="start_crawl_date" type="Any">
  Only return results crawled after this date (ISO 8601)
</ParamField>

<ParamField path="start_published_date" type="Any">
  Only return results published after this date (ISO 8601, e.g. 2024-01-01T00:00:00.000Z)
</ParamField>

<ParamField path="use_highlights" type="bool" default="False">
  Return LLM-selected highlights instead of full text. Uses \~10x fewer tokens with better relevance.
</ParamField>

<a id="google_search" />

## `google_search` — Google Search

Query the Google Search search API

<Info>Platform docs: [Google Search](https://docs.vectorshift.ai/platform/pipelines/data-loaders/web-search-google)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.google_search(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="location" type="str" default="'us'">
  The location of the search
</ParamField>

<ParamField path="num_results" type="int" default="10">
  The number of results to return
</ParamField>

<ParamField path="query" type="str" default="''">
  The Google search query
</ParamField>

<ParamField path="search_type" type="str" default="'web'">
  Select the search type: Web, Image, Hotels, Events, or News
</ParamField>

<a id="parallel_ai_search" />

## `parallel_ai_search` — Parallel Search

Search the web with Parallel's Search API

<Info>Platform docs: [Parallel Search](https://docs.parallel.ai/reference/search)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.parallel_ai_search(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="blocked_domains" type="list[str]" default="[]">
  Exclude these domains from the response.
</ParamField>

<ParamField path="excerpts_max_chars_per_result" type="int" default="1500">
  Limit the excerpt length returned inside the excerpts object.
</ParamField>

<ParamField path="fetch_live_results" type="bool" default="False">
  Enable to fetch the latest version of each page instead of relying on cached index entries.
</ParamField>

<ParamField path="max_chars_per_result" type="int" default="1500">
  Legacy field for truncating excerpts. Prefer the excerpts.\* controls when available.
</ParamField>

<ParamField path="max_results" type="int" default="10">
  Upper bound on the number of results to return.
</ParamField>

<ParamField path="mode" type="str" default="'one-shot'">
  Choose output presets. one-shot maximizes coverage, agentic optimizes for iterative agent loops.
</ParamField>

<ParamField path="objective" type="str" default="''">
  Describe what the search should accomplish. Provide preferred sources or freshness hints here.
</ParamField>

<ParamField path="preferred_domains" type="list[str]" default="[]">
  Prioritize these domains in ranked results.
</ParamField>

<ParamField path="processor" type="str" default="''">
  Legacy tier selector. Leave blank to use the default tier for your workspace.
</ParamField>

<ParamField path="search_queries" type="list[str]" default="[]">
  Optional structured keyword queries. At least one of objective or search queries is required.
</ParamField>

<a id="perplexity_search" />

## `perplexity_search` — Perplexity Search

Query the Perplexity search API

<Info>Platform docs: [Perplexity Search](https://docs.perplexity.ai/guides/search-quickstart)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.perplexity_search(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="last_updated_after_filter" type="str" default="''">
  Filter results last updated after this date
</ParamField>

<ParamField path="last_updated_before_filter" type="str" default="''">
  Filter results last updated before this date
</ParamField>

<ParamField path="max_results" type="int" default="10">
  The maximum number of results to return
</ParamField>

<ParamField path="max_tokens_per_page" type="Any">
  Maximum tokens per page
</ParamField>

<ParamField path="query" type="str" default="''">
  The search query
</ParamField>

<ParamField path="query_list" type="list[str]" default="[]">
  Additional queries to search for
</ParamField>

<ParamField path="return_images" type="bool" default="False">
  Whether to return images in results
</ParamField>

<ParamField path="return_snippets" type="bool" default="True">
  Whether to return snippets in results
</ParamField>

<ParamField path="search_after_date_filter" type="str" default="''">
  Filter results published after this date
</ParamField>

<ParamField path="search_before_date_filter" type="str" default="''">
  Filter results published before this date
</ParamField>

<ParamField path="search_domain_filter" type="list[str]" default="[]">
  Filter results to specific domains
</ParamField>

<ParamField path="search_mode" type="str" default="''">
  The search mode to use
</ParamField>

<ParamField path="search_recency_filter" type="str" default="''">
  Filter results by recency
</ParamField>

<ParamField path="user_location_latitude" type="str" default="''">
  The latitude of the user's location
</ParamField>

<ParamField path="user_location_longitude" type="str" default="''">
  The longitude of the user's location
</ParamField>

<ParamField path="user_location_name" type="str" default="''">
  The name of the user's location
</ParamField>

<ParamField path="user_location_radius_km" type="str" default="''">
  The radius in kilometers for location-based search
</ParamField>

<a id="url_loader" />

## `url_loader` — URL Scraper: Scrape URL

Scrape the contents from a URL

<Info>Platform docs: [URL Scraper: Scrape URL](https://docs.vectorshift.ai/platform/pipelines/data-loaders/web-scraper)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.url_loader(tool_name="...", provider="apify", api_key="...", url="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="provider" type="str" required>
  The provider to use for the URL Scraper
  One of: `apify`, `jina`, `modal`
</ParamField>

<ParamField path="api_key" type="str" required>
  The API key to use
</ParamField>

<ParamField path="url" type="str" required>
  The URL to load
</ParamField>

<ParamField path="ai_enhance_content" type="bool">
  Whether to enhance the content
</ParamField>

<ParamField path="use_proxy" type="bool">
  Use a proxy to crawl the website
</ParamField>

<a id="wikipedia" />

## `wikipedia` — Get Wikipedia Article

Query Wikipedia to return relevant articles

<Info>Platform docs: [Get Wikipedia Article](https://docs.vectorshift.ai/platform/pipelines/data-loaders/wikipedia)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.wikipedia(tool_name="...", chunk_text=True, query="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="chunk_text" type="bool" required>
  Whether to chunk the text
</ParamField>

<ParamField path="query" type="str" required>
  The Wikipedia query
</ParamField>

<ParamField path="chunk_overlap" type="int">
  The overlap of the chunks
</ParamField>

<ParamField path="chunk_size" type="int">
  The size of the chunks to create
</ParamField>

<a id="youtube" />

## `youtube` — Get YouTube Transcript

Get the transcript of a youtube video.

<Info>Platform docs: [Get YouTube Transcript](https://docs.vectorshift.ai/platform/pipelines/data-loaders/youtube)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.youtube(tool_name="...", chunk_text=True, url="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="chunk_text" type="bool" required>
  Whether to chunk the text
</ParamField>

<ParamField path="url" type="str" required>
  The YouTube URL to get the transcript of
</ParamField>

<ParamField path="chunk_overlap" type="int">
  The overlap of the chunks
</ParamField>

<ParamField path="chunk_size" type="int">
  The size of the chunks to create
</ParamField>
