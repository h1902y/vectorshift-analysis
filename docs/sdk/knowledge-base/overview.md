> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Knowledge Base overview

> Managed vector + document store you can query directly or expose as a tool on an Agent / a reader node in a Pipeline.

The `KnowledgeBase` class is the SDK surface for VectorShift's managed retrieval store. Ingest files, URLs, folders, tables, or third-party integrations; query them with vector + keyword search, hybrid fusion, rerank, and optional QA — directly from Python, or via an [Agent](/sdk/agent/overview) tool / a [Pipeline](/sdk/pipeline/overview) node.

<Info>
  **Prerequisites:** [Installed SDK](/sdk/installation) · [API key set](/sdk/authentication) · Python 3.10+.
</Info>

## Mental model

* A KB is a **named collection of items** (files, URLs, table rows, integration records). Each item is chunked, embedded, and indexed once on ingest.
* Ingestion is **task-based**: every `add_files` / `add_urls` / `add_folder` / `add_tables` call returns an [`IngestionTask`](#ingestiontask) you can poll, or use the `_and_wait` variant which blocks until `COMPLETED`.
* Querying is **a single surface** — `kb.query("text", top_k=…, filters=…, hybrid=…, rerank=…, qa=…)`. Pass kwargs **or** a single [`QueryConfig`](/sdk/knowledge-base/reference#queryconfig), never both. Returns a typed [`QueryResult`](/sdk/knowledge-base/reference#queryresult).
* Every method has an **async variant** (`anew`, `aadd_files`, `aquery`, `ascroll`, …).

<Tip>
  **Where Knowledge Bases live in your code.** A KB is rarely the endpoint — most production deployments expose it through one of two paths: as an `AgentTools.knowledge_base(id=kb.id, …)` tool on a conversational Agent (the RAG-with-Agent pattern; see the [RAG guide](/sdk/guides/rag-end-to-end)), or as a `pipeline.add(...).knowledge_base(knowledge_base=kb, …)` node inside a Pipeline (the RAG-pipeline pattern; see the [`rag-pipeline` example](/sdk/pipeline/examples/rag-pipeline)).
</Tip>

## Quick start

<CodeGroup>
  ```python Sync theme={"languages":{}}
  from vectorshift import KnowledgeBase
  from vectorshift.knowledge_base import (
      IndexingConfig, SplitterMethod, UrlConfig, RescrapeFrequency,
  )

  # Create the KB with an embedding model and chunking config.
  kb = KnowledgeBase.new(
      name="product-docs",
      embedding_model="text-embedding-3-small",
      indexing_config=IndexingConfig(
          chunk_size=500, chunk_overlap=50, splitter=SplitterMethod.MARKDOWN,
      ),
  )

  # Ingest a URL. add_urls_and_wait blocks until indexing completes.
  kb.add_urls_and_wait(
      urls=["https://en.wikipedia.org/wiki/Retrieval-augmented_generation"],
      url_config=UrlConfig(
          recursive=False, rescrape_frequency=RescrapeFrequency.NEVER,
      ),
      timeout=240,
  )

  # Query — first arg is the query string, options are kwargs.
  # QueryResult is a TypedDict: access fields by key.
  res = kb.query("What is RAG?", top_k=5)
  print(f"{len(res['chunks'])} chunks")
  print(res["chunks"][0]["text"][:200])
  ```

  ```python Async theme={"languages":{}}
  import asyncio
  from vectorshift import KnowledgeBase
  from vectorshift.knowledge_base import (
      IndexingConfig, SplitterMethod, UrlConfig, RescrapeFrequency,
  )

  async def main():
      kb = await KnowledgeBase.anew(
          name="product-docs",
          embedding_model="text-embedding-3-small",
          indexing_config=IndexingConfig(
              chunk_size=500, chunk_overlap=50, splitter=SplitterMethod.MARKDOWN,
          ),
      )

      await kb.aadd_urls_and_wait(
          urls=["https://en.wikipedia.org/wiki/Retrieval-augmented_generation"],
          url_config=UrlConfig(
              recursive=False, rescrape_frequency=RescrapeFrequency.NEVER,
          ),
          timeout=240,
      )

      res = await kb.aquery("What is RAG?", top_k=5)
      print(f"{len(res['chunks'])} chunks")
      print(res["chunks"][0]["text"][:200])

  asyncio.run(main())
  ```
</CodeGroup>

## How to use a Knowledge Base

|          | Direct query                                                                                                                                                               | Via an Agent                                                                                         | Via a Pipeline                                                                              |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Surface  | `kb.query("text", …)`                                                                                                                                                      | `AgentTools.knowledge_base(id=kb.id, …)` on `Agent.new(tools=[…])`                                   | `pipeline.add(...).knowledge_base(knowledge_base=kb, …)`                                    |
| Output   | Typed [`QueryResult`](/sdk/knowledge-base/reference#queryresult) `TypedDict` — `result["chunks"]`, `result["citations"]` (may be empty), `result.get("answer")` (optional) | Streamed `MESSAGE_DELTA` events with `<vs-cite>` tags inline                                         | A pipeline node output (`.formatted_text`, etc.) you wire into downstream nodes             |
| Use when | Building your own retrieval logic; offline scoring; smoke-testing the KB                                                                                                   | Conversational RAG — the model decides when to retrieve, emits citations, supports multi-turn memory | Deterministic graphs where retrieval is one fixed step (RAG-pipeline, chatbots, batch jobs) |
| Guide    | This page's Quick start                                                                                                                                                    | [RAG end-to-end](/sdk/guides/rag-end-to-end)                                                         | [`rag-pipeline` example](/sdk/pipeline/examples/rag-pipeline)                               |

## Ingestion sources

| Method                                | What it ingests                                                                                                          | Wait helper           |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `add_files`                           | Local files (`Path` or `bytes`-likes)                                                                                    | `add_files_and_wait`  |
| `add_urls`                            | URLs, with optional recursive crawl and rescrape schedule via [`UrlConfig`](/sdk/knowledge-base/reference#urlconfig)     | `add_urls_and_wait`   |
| `add_folder`                          | An entire directory tree                                                                                                 | `add_folder_and_wait` |
| `add_tables`                          | Structured table rows                                                                                                    | `add_tables_and_wait` |
| Integrations (Slack, Google Drive, …) | Configured in the platform, then [`resync_integration`](/sdk/knowledge-base/reference#resync-integration) refreshes them | —                     |

All methods return an [`IngestionTask`](/sdk/knowledge-base/reference#ingestiontask) with `.task_id`, `.status`, `.item_ids`, and (on failure) `.error` / `.failed_uploads`. The `_and_wait` variants poll until terminal status; the bare ones return immediately and let you poll via `ingestion_status(task_id)`.

## Recent additions

The KB surface was overhauled: ingestion is now task-based (`add_files` / `add_urls` / `add_folder` / `add_tables` + `_and_wait` variants), `kb.query(...)` returns a typed [`QueryResult`](/sdk/knowledge-base/reference#queryresult) `TypedDict` with `result["chunks"]` / `result["citations"]` / optional `result.get("answer")`, and querying takes either kwargs (`top_k`, `filters`, `hybrid`, `rerank`, `qa`) or a single `QueryConfig`. Items can be enumerated and filtered via `list_items` / `scroll` and re-organised via `create_folder` / `move_items` / `update_item_metadata`.

## What's next

<Columns cols={3}>
  <Card title="Reference" icon="book-open" href="/sdk/knowledge-base/reference">
    Every public method, grouped by topic.
  </Card>

  <Card title="RAG end-to-end guide" icon="map" href="/sdk/guides/rag-end-to-end">
    Wrap a KB as a tool on a conversational Agent.
  </Card>

  <Card title="RAG pipeline example" icon="code" href="/sdk/pipeline/examples/rag-pipeline">
    Compose a KB reader into a Pipeline.
  </Card>
</Columns>
