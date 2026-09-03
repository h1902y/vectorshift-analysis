> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Knowledge Base reference

> Create, ingest, query, and manage knowledge bases from Python.

## Lifecycle

### `new`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.new(
      name: str,
      embedding_model: Optional[EmbeddingModel] = None,
      indexing_config: Optional[IndexingConfig] = None,
  ) -> KnowledgeBase
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.anew(
      name: str,
      embedding_model: Optional[EmbeddingModel] = None,
      indexing_config: Optional[IndexingConfig] = None,
  ) -> KnowledgeBase
  ```
</CodeGroup>

Create a new knowledge base.

**Parameters**

<ParamField path="name" type="str" required>
  Display name of the knowledge base.
</ParamField>

<ParamField path="embedding_model" type="Optional[EmbeddingModel]" default="None">
  One of the strings listed in [`EmbeddingModel`](#embeddingmodel). Defaults to the platform default if omitted.
</ParamField>

<ParamField path="indexing_config" type="Optional[IndexingConfig]" default="None">
  Chunking + analysis options. See [`IndexingConfig`](#indexingconfig).
</ParamField>

**Returns**

<ResponseField name="returns" type="KnowledgeBase">
  The new `KnowledgeBase` instance.
</ResponseField>

### `fetch`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.fetch(
      id: Optional[str] = None,
      name: Optional[str] = None,
  ) -> KnowledgeBase
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.afetch(
      id: Optional[str] = None,
      name: Optional[str] = None,
  ) -> KnowledgeBase
  ```
</CodeGroup>

Fetch by `id` or `name`. Exactly one is required.

### `list`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.list(limit: int = 20, offset: int = 0) -> list[KnowledgeBase]
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.alist(limit: int = 20, offset: int = 0) -> list[KnowledgeBase]
  ```
</CodeGroup>

Paginated list of the KBs visible to the API key's org.

### `delete`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.delete() -> None
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.adelete() -> None
  ```
</CodeGroup>

Permanently delete the KB and every item in it.

## Folders

### `create_folder`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.create_folder(
      name: str,
      parent_folder_id: Optional[str] = None,
  ) -> KbFolder
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.acreate_folder(
      name: str,
      parent_folder_id: Optional[str] = None,
  ) -> KbFolder
  ```
</CodeGroup>

Folders organise items inside a KB. Pass a `folder_id` to any `add_*` method to ingest into a specific folder, or use [`move_items`](#move-items) to reorganise afterwards.

## Ingestion

Every ingestion call returns an [`IngestionTask`](#ingestiontask). The `_and_wait` variants poll until the task reaches `COMPLETED` or `FAILED`; the bare variants return immediately and let you drive the polling yourself via [`ingestion_status`](#ingestion-status).

### `add_files`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.add_files(
      files: Sequence[FileLike],
      folder_id: Optional[str] = None,
  ) -> IngestionTask
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.aadd_files(
      files: Sequence[FileLike],
      folder_id: Optional[str] = None,
  ) -> IngestionTask
  ```
</CodeGroup>

Ingest one or more local files. Each entry can be a `Path`, raw `bytes`, or a file-like object.

### `add_files_and_wait`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.add_files_and_wait(
      files: Sequence[FileLike],
      folder_id: Optional[str] = None,
      timeout: float = 300,
  ) -> IngestionTask
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.aadd_files_and_wait(
      files: Sequence[FileLike],
      folder_id: Optional[str] = None,
      timeout: float = 300,
  ) -> IngestionTask
  ```
</CodeGroup>

Blocking variant of `add_files`. Polls until the task reaches a terminal status or `timeout` elapses. Raises `KbIngestionTimeout` on timeout, `KbIngestionFailed` if the task ends in `FAILED`.

### `add_urls`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.add_urls(
      urls: list[str],
      url_config: Optional[UrlConfig] = None,
      folder_id: Optional[str] = None,
  ) -> IngestionTask
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.aadd_urls(
      urls: list[str],
      url_config: Optional[UrlConfig] = None,
      folder_id: Optional[str] = None,
  ) -> IngestionTask
  ```
</CodeGroup>

Ingest URLs, optionally with a recursive crawl and a rescrape schedule. See [`UrlConfig`](#urlconfig).

### `add_urls_and_wait`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.add_urls_and_wait(
      urls: list[str],
      url_config: Optional[UrlConfig] = None,
      folder_id: Optional[str] = None,
      timeout: float = 600,
  ) -> IngestionTask
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.aadd_urls_and_wait(...) -> IngestionTask
  ```
</CodeGroup>

Blocking variant of `add_urls`.

### `add_folder` / `add_folder_and_wait`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.add_folder(
      folder_path: Union[str, Path],
      folder_id: Optional[str] = None,
  ) -> IngestionTask
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.aadd_folder(...) -> IngestionTask
  ```
</CodeGroup>

Walk a local directory and ingest every file. `_and_wait` blocks until done (default `timeout=600`).

### `add_tables` / `add_tables_and_wait`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.add_tables(
      tables: Sequence[TableLike],
      folder_id: Optional[str] = None,
  ) -> IngestionTask
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.aadd_tables(...) -> IngestionTask
  ```
</CodeGroup>

Ingest structured table rows. `_and_wait` variant blocks until done.

### `ingestion_status`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.ingestion_status(task_id: str) -> IngestionTask
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.aingestion_status(task_id: str) -> IngestionTask
  ```
</CodeGroup>

Fetch the latest state of an ingestion task. Use after a bare `add_*` call to drive your own polling loop.

## Querying

### `query`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.query(
      text: str,
      *,
      top_k: int = 10,
      filters: Optional[list[FilterClause]] = None,
      hybrid: Optional[HybridConfig] = None,
      rerank: Optional[RerankConfig] = None,
      qa: Optional[QaConfig] = None,
      config: Optional[QueryConfig] = None,
  ) -> QueryResult
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.aquery(...) -> QueryResult
  ```
</CodeGroup>

Retrieve relevant chunks for the query.

**Parameters**

<ParamField path="text" type="str" required>
  The query string.
</ParamField>

<ParamField path="top_k" type="int" default="10">
  Maximum number of chunks to return (post-rerank if `rerank=` is set).
</ParamField>

<ParamField path="filters" type="Optional[list[FilterClause]]" default="None">
  Metadata filters. See [`FilterClause`](#filterclause).
</ParamField>

<ParamField path="hybrid" type="Optional[HybridConfig]" default="None">
  Enable hybrid (vector + keyword) retrieval. See [`HybridConfig`](#hybridconfig).
</ParamField>

<ParamField path="rerank" type="Optional[RerankConfig]" default="None">
  Cross-encoder rerank over the top candidates. See [`RerankConfig`](#rerankconfig).
</ParamField>

<ParamField path="qa" type="Optional[QaConfig]" default="None">
  Run an LLM over the retrieved context and populate `result["answer"]`. The backend may still return no answer, so treat `answer` as optional. See [`QaConfig`](#qaconfig).
</ParamField>

<ParamField path="config" type="Optional[QueryConfig]" default="None">
  Pass a pre-built [`QueryConfig`](#queryconfig) instead of individual kwargs. Cannot be combined with other tuning kwargs.
</ParamField>

**Returns**

<ResponseField name="returns" type="QueryResult">
  Typed [`QueryResult`](#queryresult) `TypedDict` — use dict-key access: `result["chunks"]`, `result["citations"]` (may be empty), `result.get("answer")` (optional — may be absent/empty), `result.get("usage")` (optional).
</ResponseField>

## Items

### `list_items`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.list_items(
      folder_id: Optional[str] = None,
      limit: int = 50,
      filters: Optional[list[FilterClause]] = None,
      sort: Optional[SortClause] = None,
      cursor: Optional[str] = None,
  ) -> list[KbItem]
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.alist_items(...) -> list[KbItem]
  ```
</CodeGroup>

Paginated listing of items, optionally filtered and sorted.

### `scroll`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.scroll(
      page_size: int = 100,
      filters: Optional[list[FilterClause]] = None,
      folder_id: Optional[str] = None,
      sort: Optional[SortClause] = None,
  ) -> Iterator[list[KbItem]]
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.ascroll(...) -> AsyncIterator[list[KbItem]]
  ```
</CodeGroup>

Stream through every item in pages — useful for large KBs where `list_items` would require manual cursor management.

### `get_item`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.get_item(item_id: str) -> KbItem
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.aget_item(item_id: str) -> KbItem
  ```
</CodeGroup>

### `move_items`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.move_items(item_ids: list[str], target_folder_id: str) -> None
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.amove_items(...) -> None
  ```
</CodeGroup>

Move items into a folder (created via [`create_folder`](#create-folder)).

### `delete_items`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.delete_items(item_ids: list[str]) -> None
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.adelete_items(...) -> None
  ```
</CodeGroup>

### `update_item_metadata`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.update_item_metadata(
      item_id: str,
      custom_metadata: dict[str, Any],
  ) -> KbItem
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.aupdate_item_metadata(...) -> KbItem
  ```
</CodeGroup>

Attach or replace custom metadata on an item. Filter against this metadata at query time via [`FilterClause`](#filterclause).

## Accessors

A KB exposes three accessor objects for scoped operations. They keep the top-level surface lean by routing item / folder / metadata-autogen calls through dedicated handles.

### `item`

```python theme={"languages":{}}
KnowledgeBase.item(item_id: str) -> KnowledgeBaseItemRef
```

Return a lightweight reference to an item. The ref carries the KB id + item id; use it as a typed alternative to passing raw item ids around.

### `folder`

```python theme={"languages":{}}
KnowledgeBase.folder(folder_id: str) -> KnowledgeBaseFolderRef
```

Return a lightweight reference to a folder. Use the ref to scope subsequent operations (e.g. pass it as `folder_id=` to ingestion calls or `list_items`).

### `metadata_autogen`

```python theme={"languages":{}}
KnowledgeBase.metadata_autogen -> MetadataAutogenAccessor  # property
```

Accessor for the metadata-autogeneration subsystem — extract structured metadata (summaries, topics, custom fields) from items via LLM-driven pipelines. A KB can hold many autogen configs, each addressed by an `autogen_id`.

#### `create_config`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  kb.metadata_autogen.create_config(
      *,
      extraction_instructions: str,
      query_instructions: str,
      traversal_type: str = "document",
      debounce_seconds: int = 0,
      name: Optional[str] = None,
      document_config: Optional[dict] = None,
      folder_config: Optional[dict] = None,
      chunk_config: Optional[dict] = None,
      filters: Optional[dict] = None,
  ) -> MetadataAutogenConfigRecord
  ```

  ```python Async theme={"languages":{}}
  async kb.metadata_autogen.acreate_config(...) -> MetadataAutogenConfigRecord
  ```
</CodeGroup>

Register a new autogen config. `extraction_instructions` tells the LLM what to extract from each item; `query_instructions` controls how that metadata is matched at retrieval time. `traversal_type` is one of `"document"`, `"folder"`, or `"chunk"`.

#### `list_configs`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  kb.metadata_autogen.list_configs() -> list[MetadataAutogenConfigRecord]
  ```

  ```python Async theme={"languages":{}}
  async kb.metadata_autogen.alist_configs() -> list[MetadataAutogenConfigRecord]
  ```
</CodeGroup>

#### `get_config`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  kb.metadata_autogen.get_config(autogen_id: str) -> MetadataAutogenConfigRecord
  ```

  ```python Async theme={"languages":{}}
  async kb.metadata_autogen.aget_config(autogen_id: str) -> MetadataAutogenConfigRecord
  ```
</CodeGroup>

#### `replace_config`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  kb.metadata_autogen.replace_config(
      autogen_id: str,
      *,
      extraction_instructions: str,
      query_instructions: str,
      traversal_type: str = "document",
      debounce_seconds: int = 0,
      name: Optional[str] = None,
      document_config: Optional[dict] = None,
      folder_config: Optional[dict] = None,
      chunk_config: Optional[dict] = None,
      filters: Optional[dict] = None,
  ) -> MetadataAutogenConfigRecord
  ```

  ```python Async theme={"languages":{}}
  async kb.metadata_autogen.areplace_config(...) -> MetadataAutogenConfigRecord
  ```
</CodeGroup>

Full-overwrite update — every field omitted resets to its default server-side. Pre-fetch with `get_config` and merge if you only want to change one field.

#### `delete_config`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  kb.metadata_autogen.delete_config(autogen_id: str) -> None
  ```

  ```python Async theme={"languages":{}}
  async kb.metadata_autogen.adelete_config(autogen_id: str) -> None
  ```
</CodeGroup>

#### `run`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  kb.metadata_autogen.run(autogen_id: str, item_ids: list[str]) -> IngestionTask
  ```

  ```python Async theme={"languages":{}}
  async kb.metadata_autogen.arun(autogen_id: str, item_ids: list[str]) -> IngestionTask
  ```
</CodeGroup>

Trigger autogen against a subset of items. Returns an [`IngestionTask`](#ingestiontask) you can poll, or use the wait variant below.

#### `run_and_wait`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  kb.metadata_autogen.run_and_wait(
      autogen_id: str,
      item_ids: list[str],
      timeout: float = 300,
  ) -> IngestionTask
  ```

  ```python Async theme={"languages":{}}
  async kb.metadata_autogen.arun_and_wait(...) -> IngestionTask
  ```
</CodeGroup>

See the [`metadata-autogen` example](/sdk/knowledge-base/examples/metadata-autogen) for the full lifecycle.

## Integrations

### `integrations`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.integrations() -> list[KbIntegration]
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.aintegrations() -> list[KbIntegration]
  ```
</CodeGroup>

List integrations attached to the KB. Integration setup happens in the platform.

### `resync_integration`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.resync_integration(integration_id: str) -> None
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.aresync_integration(integration_id: str) -> None
  ```
</CodeGroup>

Trigger a refresh against the upstream source.

### `set_rescrape_frequency`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  KnowledgeBase.set_rescrape_frequency(
      *,
      item_id: Optional[str] = None,
      integration_id: Optional[str] = None,
      frequency: RescrapeFrequency,
  ) -> None
  ```

  ```python Async theme={"languages":{}}
  async KnowledgeBase.aset_rescrape_frequency(...) -> None
  ```
</CodeGroup>

Set a periodic re-scrape on a URL item or an integration. Pass exactly one of `item_id` / `integration_id`. See [`RescrapeFrequency`](#rescrapefrequency).

## Types

### `IndexingConfig`

<ParamField path="chunk_size" type="Optional[int]" default="None" />

<ParamField path="chunk_overlap" type="Optional[int]" default="None" />

<ParamField path="analyze_documents" type="bool" default="False">
  Run document-level analysis during indexing (slower, richer metadata).
</ParamField>

<ParamField path="splitter" type="Optional[SplitterMethod]" default="None">
  See [`SplitterMethod`](#splittermethod).
</ParamField>

<ParamField path="segmentation" type="Optional[SegmentationMethod]" default="None" />

<ParamField path="index_tables" type="bool" default="False" />

<ParamField path="enrichment_tasks" type="Optional[list[str]]" default="None" />

<ParamField path="file_processing_implementation" type="str" default="'Default'" />

<ParamField path="apify_key" type="Optional[str]" default="None" />

### `UrlConfig`

<ParamField path="recursive" type="bool" default="False">
  When `True`, crawl outbound links recursively up to `url_limit`.
</ParamField>

<ParamField path="url_limit" type="Optional[int]" default="None">
  Maximum number of URLs to fetch in a recursive crawl.
</ParamField>

<ParamField path="ai_enhance_content" type="Optional[bool]" default="None" />

<ParamField path="return_type" type="str" default="'CHUNKS'" />

<ParamField path="rescrape_frequency" type="RescrapeFrequency" default="NEVER">
  See [`RescrapeFrequency`](#rescrapefrequency).
</ParamField>

<ParamField path="apify_key" type="Optional[str]" default="None" />

### `QueryConfig`

Pre-built bundle of every option `query(...)` accepts as kwargs. Pass `config=` instead of individual kwargs when you want to reuse a config across queries.

<ParamField path="top_k" type="int" default="10" />

<ParamField path="filters" type="Optional[list[FilterClause]]" default="None" />

<ParamField path="sort" type="Optional[SortClause]" default="None" />

<ParamField path="hybrid" type="Optional[HybridConfig]" default="None" />

<ParamField path="rerank" type="Optional[RerankConfig]" default="None" />

<ParamField path="qa" type="Optional[QaConfig]" default="None" />

<ParamField path="retrieval_unit" type="Optional[RetrievalUnit]" default="None" />

<ParamField path="score_cutoff" type="Optional[float]" default="None" />

<ParamField path="context" type="Optional[str]" default="None" />

### `HybridConfig`

<ParamField path="alpha" type="float" default="0.5">
  Weight between vector (`1.0`) and keyword (`0.0`) scoring.
</ParamField>

<ParamField path="fusion_method" type="Optional[str]" default="None" />

### `RerankConfig`

<ParamField path="model" type="str" required>
  Reranker identifier (e.g. `"bge-reranker-v2-m3"`, `"cohere/rerank-english-v3.0"`).
</ParamField>

<ParamField path="top_n" type="Optional[int]" default="None">
  Number of chunks to keep after rerank.
</ParamField>

<ParamField path="adaptive_cutoff" type="Optional[bool]" default="None" />

### `QaConfig`

<ParamField path="mode" type="QaMode" default="OFF">
  See [`QaMode`](#qamode).
</ParamField>

<ParamField path="citations" type="bool" default="True">
  Whether to include `Citation`s in the response.
</ParamField>

<ParamField path="response_format" type="Optional[str]" default="None" />

<ParamField path="llm_provider" type="Optional[str]" default="None" />

<ParamField path="llm_model" type="Optional[str]" default="None" />

### `FilterClause`

<ParamField path="field" type="str" required>
  Metadata field name to filter on.
</ParamField>

<ParamField path="op" type="FilterOperator" required>
  See [`FilterOperator`](#filteroperator).
</ParamField>

<ParamField path="value" type="Any" required />

### `SortClause`

<ParamField path="field" type="str" required />

<ParamField path="direction" type="SortDirection" default="ASC">
  See [`SortDirection`](#sortdirection).
</ParamField>

### `IngestionTask`

The handle returned by every `add_*` call. Reaches a terminal `status` (`COMPLETED`, `FAILED`, or `WARNING`) once indexing finishes.

<ParamField path="task_id" type="str" required />

<ParamField path="kb_id" type="str" required />

<ParamField path="status" type="IngestionStatus" required>
  See [`IngestionStatus`](#ingestionstatus).
</ParamField>

<ParamField path="item_ids" type="list[str]" default="[]">
  The new item ids once the task completes.
</ParamField>

<ParamField path="error" type="Optional[str]" default="None" />

<ParamField path="failed_uploads" type="list[FailedUpload]" default="[]" />

### `QueryResult`

The typed return of `kb.query(...)`. It is a `TypedDict` — access fields by key (`result["chunks"]`, `result.get("answer")`), not by attribute.

<ParamField path="query_id" type="str" required />

<ParamField path="chunks" type="list[RetrievedChunk]" default="[]" />

<ParamField path="citations" type="list[Citation]">
  May be an empty list (e.g. when the backend returns no citations).
</ParamField>

<ParamField path="answer" type="NotRequired[str]">
  LLM-generated answer when `qa=QaConfig(mode=...)` is set. Optional key — may be absent even with `qa` set (access via `result.get("answer")`).
</ParamField>

<ParamField path="usage" type="NotRequired[UsageInfo]" />

### `RetrievedChunk`

<ParamField path="item_id" type="str" required />

<ParamField path="chunk_id" type="str" required />

<ParamField path="score" type="float" required />

<ParamField path="text" type="str" required />

<ParamField path="unit" type="RetrievalUnit" required />

<ParamField path="metadata" type="Optional[dict[str, Any]]" default="None" />

## Enums

### `EmbeddingModel`

String literal. Supported values:

* `"text-embedding-3-large"`
* `"text-embedding-3-small"`
* `"text-embedding-ada-002"`
* `"embed-v4.0"`
* `"voyage-3"` · `"voyage-4"` · `"voyage-multimodal-3"` · `"voyage-code-3"`
* `"google-text-embedding-004"` · `"google-text-embedding-005"`
* `"together-bge-large-en-v1.5"` · `"together-m2-bert-80M-8k-retrieval"`

### `SplitterMethod`

`MARKDOWN` · `SENTENCE` · `DYNAMIC` · `CODE`

### `RescrapeFrequency`

`NEVER` · `QUARTER_HOURLY` · `HOURLY` · `DAILY` · `WEEKLY` · `MONTHLY`

### `QaMode`

`OFF` · `FAST` · `ACCURATE`

### `FilterOperator`

`EQ` · `NE` (`NEQ`) · `CONTAINS` · `IN` · `NOT_IN` (`NIN`) · `GT` · `GTE` · `LT` · `LTE`

### `IngestionStatus`

`StrEnum` — member names are uppercase, but `.value` is lowercase (e.g. `IngestionStatus.COMPLETED.value == "completed"`). Members: `PENDING` (`"pending"`) · `IN_PROGRESS` (`"in_progress"`) · `PROCESSING` (`"processing"`) · `COMPLETED` (`"completed"`) · `SUCCESS` (`"success"`) · `FAILED` (`"failed"`) · `WARNING` (`"warning"`).

### `SortDirection`

`ASC` · `DESC`

## Errors

The KB module raises a small set of typed errors. Catch them by name; all subclass `KnowledgeBaseError`, which in turn subclasses `VectorshiftError`.

* `KbNotFound` — KB id/name doesn't exist (or your key can't see it).
* `KbIngestionFailed` — an ingestion task ended in `FAILED`.
* `KbIngestionTimeout` — `add_*_and_wait` exceeded its `timeout`.
* `KbIntegrationNotFound`, `KbIntegrationRevoked` — integration resolution problems.

See the top-level [Errors page](/sdk/errors) for the broader hierarchy.

## What's next

<Columns cols={3}>
  <Card title="Overview" icon="database" href="/sdk/knowledge-base/overview">
    Mental model and quick start.
  </Card>

  <Card title="RAG end-to-end guide" icon="map" href="/sdk/guides/rag-end-to-end">
    Wrap a KB as a tool on a conversational Agent.
  </Card>

  <Card title="RAG pipeline example" icon="code" href="/sdk/pipeline/examples/rag-pipeline">
    Compose a KB reader into a Pipeline.
  </Card>
</Columns>
