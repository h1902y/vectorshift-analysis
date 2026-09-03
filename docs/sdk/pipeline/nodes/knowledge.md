> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Knowledge nodes

> Query, build, and sync knowledge bases.

Add these nodes with the pipeline builder: `pipeline.add(name="...").<node>(...)`. Each entry lists the node's configuration parameters. See the [Pipeline reference](/sdk/pipeline/reference) for `add`, `run`, and lifecycle methods.

<a id="chunking" />

## `chunking` — Chunking

Split text into chunks. Supports different chunking strategies like markdown-aware, sentence-based, or dynamic sizing.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").chunking()
  ```
</CodeGroup>

**Parameters**

<ParamField path="splitter_method" type="str" default="'markdown'">
  Strategy for grouping segmented text into final chunks. 'sentence': groups sentences; 'markdown': respects Markdown structure (headers, code); 'dynamic': optimizes breaks for size using chosen segmentation method.
  One of: `dynamic`, `markdown`, `sentence`
</ParamField>

<ParamField path="text" type="str" default="''">
  The text to chunk
</ParamField>

<ParamField path="chunk_overlap" type="int" default="0">
  The overlap of each chunk of text.
</ParamField>

<ParamField path="chunk_size" type="int" default="512">
  The size of each chunk of text.
</ParamField>

<ParamField path="segmentation_method" type="str" default="'words'">
  The method to break text into units before chunking. 'words': splits by word; 'sentences': splits by sentence boundary; 'paragraphs': splits by blank line/paragraph.
  One of: `paragraphs`, `sentences`, `words`
</ParamField>

<a id="create_workspace" />

## `create_workspace` — Create Workspace

Create a new workspace in a portal, upload files to its knowledge base, and share with users

<Info>Platform docs: [Create Workspace](/nodes/create-workspace/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").create_workspace(name="...", portal=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="files" type="AcceptsFileList" default="[]" />

<ParamField path="name" type="str" required />

<ParamField path="portal" type="AcceptsPortal" required />

<ParamField path="shared_emails" type="list[str]" default="[]" />

<a id="knowledge_base" />

## `knowledge_base` — Knowledge Base

Semantically query a knowledge base that can contain files, scraped URLs, and data from synced integrations (e.g., Google Drive).

<Info>Platform docs: [Knowledge Base](/nodes/knowledge-base-v3/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").knowledge_base(query="...", knowledge_base=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="do_advanced_qa" type="bool" default="False">
  Use additional LLM calls to analyze each document to improve answer correctness
</ParamField>

<ParamField path="enable_filter" type="bool" default="False">
  Filter the content returned from the knowledge base. Agents should provide structured metadata filters directly in the filter input when useful.
</ParamField>

<ParamField path="enable_context" type="bool" default="False">
  Enable context
</ParamField>

<ParamField path="format_context_for_llm" type="bool" default="True">
  Format the context for the LLM
</ParamField>

<ParamField path="enable_document_db_filter" type="bool" default="False">
  Enable the document DB filter
</ParamField>

<ParamField path="set_response_format" type="bool" default="False">
  Generate an LLM response from the retrieved context
</ParamField>

<ParamField path="stream_response" type="bool" default="False">
  Whether to stream the LLM response
</ParamField>

<ParamField path="query" type="str" required>
  The query will be used to search documents for relevant content semantically. Must not be empty, only include relevant information for retrieval or metadata filter generation. Generally expand any specific acronyms or abbreviations but include the original acronym or abbreviation as well
</ParamField>

<ParamField path="context" type="str" default="''">
  Additional context to pass to the query analysis and qa steps
</ParamField>

<ParamField path="document_db_filter" type="str" default="''">
  Filter the documents returned from the knowledge base
</ParamField>

<ParamField path="filter" type="str" default="''">
  Structured metadata filter JSON for the knowledge base query. Use a top-level boolean clause such as \{"type":"condition","field":"title","operator":"match","value":"Q4 report"}; leave empty when no hard metadata constraint is needed.
</ParamField>

<ParamField path="generate_metadata_filters" type="bool" default="False">
  Use an LLM to generate metadata filters to refine your query. Agents should usually leave this false and provide filters directly in the filter input.
</ParamField>

<ParamField path="knowledge_base" type="AcceptsKnowledgeBase" required>
  Select an existing knowledge base, Use \$object.knowledge\_base.? syntax
</ParamField>

<ParamField path="system_prompt" type="str" default="''">
  The system prompt to use for the LLM
</ParamField>

<ParamField path="retrieval" type="RetrievalConfig" />

<ParamField path="rerank" type="RerankConfig" />

<ParamField path="query_enhancement" type="QueryEnhancementConfig" />

<ParamField path="alpha" type="float">
  The alpha value for the retrieval. 1.0 is pure vector search and 0.0 is pure lexical search
</ParamField>

<ParamField path="answer_multiple_questions" type="bool">
  Extract separate questions from the query and retrieve content separately for each question to improve search performance
</ParamField>

<ParamField path="do_nl_metadata_query" type="bool">
  Do a natural language metadata query
</ParamField>

<ParamField path="expand_query" type="bool">
  Expand query to improve semantic search
</ParamField>

<ParamField path="expand_query_terms" type="bool">
  Expand query terms to improve semantic search
</ParamField>

<ParamField path="num_chunks_to_rerank" type="int">
  The number of chunks to rerank
</ParamField>

<ParamField path="rerank_documents" type="bool">
  Rerank the documents returned from the knowledge base
</ParamField>

<ParamField path="rerank_model" type="str">
  Refine the initial ranking of returned chunks based on relevancy

  <Expandable title="Allowed values">
    `cohere/rerank-english-v3.0`, `cohere/rerank-multilingual-v3.0`, `cohere/rerank-v3.5`, `cohere/rerank-v4.0-fast`, `cohere/rerank-v4.0-pro`, `contextualai/ctxl-rerank-en-v1-instruct`, `jina/jina-reranker-v2-base-multilingual`, `llm/google/gemini-2.5-flash`, `llm/google/gemini-2.5-flash-lite-preview-06-17`, `llm/google/gemini-2.5-pro`, `opensource/BAAI/bge-reranker-v2-m3`, `together/Salesforce/Llama-Rank-V1`, `together/mixedbread-ai/Mxbai-Rerank-Large-V2`, `voyageai/rerank-2`, `voyageai/rerank-2-lite`, `voyageai/rerank-2.5`, `voyageai/rerank-2.5-lite`
  </Expandable>
</ParamField>

<ParamField path="retrieval_unit" type="str">
  The unit of retrieval. Chunks will return the most relevant chunks from the knowledge base as well as their text content. Documents will return the document metadata as well as most relevant snippets from the document. Pages will return complete pages with all chunks from pages containing relevant content
  One of: `chunks`, `documents`, `pages`
</ParamField>

<ParamField path="score_cutoff" type="float">
  The score cutoff
</ParamField>

<ParamField path="top_k" type="int">
  The number of relevant chunks to be returned
</ParamField>

<ParamField path="transform_query" type="bool">
  Transform the query for better semantic search
</ParamField>

<ParamField path="advanced_search_mode" type="str" default="'accurate'">
  The mode to use for the advanced search
  One of: `accurate`, `fast`
</ParamField>

<ParamField path="qa_model_name" type="str" default="'gpt-4o-mini'">
  The model to use for the QA

  <Expandable title="Allowed values">
    `claude-3-5-sonnet-20240620`, `claude-3-haiku-20240307`, `claude-3-opus-20240229`, `gemini-2.0-flash-001`, `gemini-2.5-pro-exp-03-25`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-4o`, `gpt-4o-2024-08-06`, `gpt-4o-2024-11-20`, `gpt-4o-mini`, `gpt-4o-mini-2024-07-18`, `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `o1`, `o1-2024-12-17`, `o3`, `o3-mini`, `o3-pro`, `o4-mini`
  </Expandable>
</ParamField>

<a id="knowledge_base_actions" />

## `knowledge_base_actions` — Knowledge Base Actions

Create, load, and sync Knowledge Bases

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").knowledge_base_actions()
  ```
</CodeGroup>

**Parameters**

<ParamField path="sub_type" type="str" default="''" />

<a id="knowledge_base_agent" />

## `knowledge_base_agent` — Knowledge Base Agent

Query a knowledge base using an agentic approach with tools.

<Info>Platform docs: [Knowledge Base Agent](/nodes/knowledge-base-agent/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").knowledge_base_agent(query="...", knowledge_base=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="provider" type="str" default="'google'">
  Select the LLM provider to be used by the agent
  One of: `google`
</ParamField>

<ParamField path="mode" type="str" default="'focused'">
  Controls the query effort: 'fast' for quick answers, 'focused' for balanced depth, 'deep' for thorough analysis
  One of: `deep`, `fast`, `focused`
</ParamField>

<ParamField path="accept_additional_context" type="bool" default="False">
  If enabled, shows an additional context input to provide context to the agent
</ParamField>

<ParamField path="return_context" type="bool" default="False">
  If enabled, returns the relevant context/chunks used to generate the answer
</ParamField>

<ParamField path="model" type="str" default="'gemini-3-flash-preview'">
  Select the LLM model to be used by the agent
  One of: `gemini-3-flash-preview`
</ParamField>

<ParamField path="query" type="str" required>
  The natural language query. The agent will use this to determine the best way to query the knowledge base. Include the key criteria needed to answer the query.
</ParamField>

<ParamField path="context" type="str" default="''">
  Optional additional context to help the agent understand the query better (e.g., conversation history, user preferences)
</ParamField>

<ParamField path="knowledge_base" type="AcceptsKnowledgeBase" required>
  Select an existing knowledge base. You must provide the id in \$.object.knowledge\_base.id format
</ParamField>

<ParamField path="return_answer" type="bool" default="True">
  If enabled, generates a synthesized answer from the knowledge base
</ParamField>

<a id="knowledge_base_create" />

## `knowledge_base_create` — Knowledge Base Create

Dynamically create a Knowledge Base with configured options

<Info>Platform docs: [Knowledge Base Create](/nodes/create-knowledge-base/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").knowledge_base_create(analyze_documents=True, chunk_overlap=0, chunk_size=0, collection_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="splitter_method" type="str" default="'advanced'">
  Strategy for grouping segmented text into final chunks. 'sentence': groups sentences; 'markdown': respects Markdown structure (headers, code); 'dynamic': optimizes breaks for size using chosen segmentation method.
  One of: `advanced`
</ParamField>

<ParamField path="analyze_documents" type="bool" required>
  To analyze document contents and enrich them when parsing
</ParamField>

<ParamField path="apify_key" type="str" default="''">
  Apify API Key for scraping URLs (optional)
</ParamField>

<ParamField path="chunk_overlap" type="int" required>
  The overlap of the chunks to store in the knowledge base
</ParamField>

<ParamField path="chunk_size" type="int" required>
  The size of the chunks to store in the knowledge base
</ParamField>

<ParamField path="collection_name" type="str" required>
  The name of the collection to store the knowledge base in
</ParamField>

<ParamField path="embedding_model" type="str" required>
  The embedding model to use for the knowledge base. Format: provider/model

  <Expandable title="Allowed values">
    `cohere/embed-english-light-v3.0`, `cohere/embed-english-v3.0`, `cohere/embed-multilingual-light-v3.0`, `cohere/embed-multilingual-v3.0`, `cohere/embed-v4.0`, `google/embedding-001`, `openai/text-embedding-3-large`, `openai/text-embedding-3-small`, `openai/text-embedding-ada-002`, `voyageai/voyage-3-large`, `voyageai/voyage-3-lite`, `voyageai/voyage-3.5`, `voyageai/voyage-3.5-lite`, `voyageai/voyage-4`, `voyageai/voyage-4-large`, `voyageai/voyage-4-lite`, `voyageai/voyage-code-3`, `voyageai/voyage-context-3`, `voyageai/voyage-finance-2`, `voyageai/voyage-multimodal-3.5`
  </Expandable>
</ParamField>

<ParamField path="embedding_provider" type="str" required>
  The embedding provider to use
</ParamField>

<ParamField path="file_processing_implementation" type="str" required>
  The file processing implementation to use for parsing documents
  One of: `contextual_ai`, `default`, `docling`, `llama_parse`, `mistral_ocr`, `reducto`, `textract`
</ParamField>

<ParamField path="is_hybrid" type="bool" required>
  Whether to create a hybrid knowledge base
</ParamField>

<ParamField path="name" type="str" required>
  The name of the knowledge base to create
</ParamField>

<ParamField path="precision" type="str" required>
  The precision to use for the knowledge base
</ParamField>

<ParamField path="segmentation_method" type="str" default="'words'">
  The method to break text into units before chunking. 'words': splits by word; 'sentences': splits by sentence boundary; 'paragraphs': splits by blank line/paragraph.
  One of: `paragraphs`, `sentences`, `words`
</ParamField>

<ParamField path="sharded" type="bool" required>
  Whether to shard the knowledge base
</ParamField>

<ParamField path="vector_db_provider" type="str" required>
  The vector database provider to use
</ParamField>

<a id="knowledge_base_fetch_document_content" />

## `knowledge_base_fetch_document_content` — Knowledge Base Fetch Document Content

Fetch the full content of a specific document from a knowledge base by scrolling through all its chunks

<Info>Platform docs: [Knowledge Base Fetch Document Content](/nodes/knowledge-base-fetch-document-content/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").knowledge_base_fetch_document_content(item_id="...", knowledge_base=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="item_id" type="str" required />

<ParamField path="knowledge_base" type="AcceptsKnowledgeBase" required />

<ParamField path="max_chunks" type="int" default="200" />

<ParamField path="offset" type="int" default="0" />

<ParamField path="page_ranges" type="str" default="''" />

<a id="knowledge_base_fetch_items" />

## `knowledge_base_fetch_items` — Knowledge Base Fetch Items

Advanced knowledge base item fetching with traversal, filtering, and output shaping capabilities

<Info>Platform docs: [Knowledge Base Fetch Items](/nodes/knowledge-base-fetch-items/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").knowledge_base_fetch_items(knowledge_base=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="filter" type="str" default="''" />

<ParamField path="item_return_type" type="str" default="'ALL'">
  One of: `ALL`, `DOCUMENTS`, `FOLDERS`
</ParamField>

<ParamField path="knowledge_base" type="AcceptsKnowledgeBase" required />

<ParamField path="limit" type="int" default="50" />

<ParamField path="max_depth" type="int" default="0" />

<ParamField path="offset" type="int" default="0" />

<ParamField path="root_ids" type="str" default="''" />

<ParamField path="sort_fields" type="str" default="''" />

<ParamField path="sort_orders" type="str" default="''" />

<ParamField path="verbosity" type="str" default="'metadata'">
  One of: `long`, `metadata`, `short`
</ParamField>

<a id="knowledge_base_get_item_bboxes" />

## `knowledge_base_get_item_bboxes` — Knowledge Base Get Item Bboxes

Fetch OCR bounding boxes for specific pages of a PDF document in a knowledge base

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").knowledge_base_get_item_bboxes(item_id="...", knowledge_base=..., page_ranges="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="item_id" type="str" required />

<ParamField path="knowledge_base" type="AcceptsKnowledgeBase" required />

<ParamField path="page_ranges" type="str" required />

<a id="knowledge_base_list_items" />

## `knowledge_base_list_items` — Knowledge Base List Items

List items (documents and folders) from a knowledge base with pagination support

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").knowledge_base_list_items(knowledge_base=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="knowledge_base" type="AcceptsKnowledgeBase" required />

<ParamField path="limit" type="int" default="50" />

<ParamField path="list_all_items" type="bool" default="False" />

<ParamField path="offset" type="int" default="0" />

<a id="knowledge_base_loader" />

## `knowledge_base_loader` — Knowledge Base Loader

Load data into an existing knowledge base.

<Info>Platform docs: [Knowledge Base Loader](/nodes/knowledge-base-loader/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").knowledge_base_loader(knowledge_base=..., url="...", documents=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="document_type" type="str" default="'File'">
  Select the type of data to load
  One of: `File`, `URL`
</ParamField>

<ParamField path="recursive" type="bool" default="False">
  Scrape sub-pages of the provided link
</ParamField>

<ParamField path="knowledge_base" type="AcceptsKnowledgeBase" required>
  The knowledge base to load data into
</ParamField>

<ParamField path="rescrape_frequency" type="str" default="'Never'">
  The frequency to rescrape the URL
  One of: `Daily`, `Monthly`, `Never`, `Weekly`
</ParamField>

<ParamField path="url" type="str" required>
  The raw URL link (e.g., [https://vectorshift.ai/](https://vectorshift.ai/))
</ParamField>

<ParamField path="use_proxy" type="bool" default="False">
  Use a proxy to crawl the website
</ParamField>

<ParamField path="load_sitemap" type="bool" default="False">
  Load URLs to crawl from a sitemap. If the URL is a sitemap, it will be used directly. If the URL is not a sitemap, the sitemap will be fetched automatically.
</ParamField>

<ParamField path="max_depth" type="int" default="5">
  The maximum depth of the URL to crawl
</ParamField>

<ParamField path="max_recursive_urls" type="int" default="10">
  The maximum number of recursive URLs to scrape
</ParamField>

<ParamField path="same_domain_only" type="bool" default="False">
  Whether to only crawl links from the same domain
</ParamField>

<ParamField path="documents" type="AcceptsFileList" required>
  The file to be added to the selected knowledge base. Note: to convert text to file, use the Text to File node
</ParamField>

<a id="knowledge_base_sync" />

## `knowledge_base_sync` — Knowledge Base Sync

Automatically trigger a sync to the integrations in the selected knowledge base

<Info>Platform docs: [Knowledge Base Sync](/nodes/sync-knowledge-base/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").knowledge_base_sync(knowledge_base=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="knowledge_base" type="AcceptsKnowledgeBase" required />

<a id="semantic_search" />

## `semantic_search` — Semantic Search

Generate a temporary vector database at run-time and retrieve the most relevant pieces from the documents based on the query.

<Info>Platform docs: [Semantic Search](/nodes/semantic-search/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").semantic_search(query="...", documents="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="do_advanced_qa" type="bool" default="False">
  Use additional LLM calls to analyze each document to improve answer correctness
</ParamField>

<ParamField path="enable_filter" type="bool" default="False">
  Filter the content returned from the knowledge base
</ParamField>

<ParamField path="enable_context" type="bool" default="False">
  Additional context passed to advanced search and query analysis
</ParamField>

<ParamField path="format_context_for_llm" type="bool" default="False">
  Format the context for the LLM
</ParamField>

<ParamField path="enable_document_db_filter" type="bool" default="False">
  Filter the documents returned from the knowledge base
</ParamField>

<ParamField path="splitter_method" type="str" default="'markdown'">
  Strategy for grouping segmented text into final chunks. 'sentence': groups sentences; 'markdown': respects Markdown structure (headers, code); 'dynamic': optimizes breaks for size using chosen segmentation method.
  One of: `dynamic`, `markdown`, `sentence`
</ParamField>

<ParamField path="model" type="str" default="'openai/text-embedding-3-small'">
  The model to use for the embedding

  <Expandable title="Allowed values">
    `cohere/embed-english-light-v2.0`, `cohere/embed-english-light-v3.0`, `cohere/embed-english-v2.0`, `cohere/embed-english-v3.0`, `cohere/embed-multilingual-light-v3.0`, `cohere/embed-multilingual-v2.0`, `cohere/embed-multilingual-v3.0`, `google/embedding-001`, `intfloat/multilingual-e5-large`, `openai/text-embedding-3-large`, `openai/text-embedding-3-small`, `openai/text-embedding-ada-002`
  </Expandable>
</ParamField>

<ParamField path="query" type="str" required>
  The query will be used to search documents for relevant pieces semantically.
</ParamField>

<ParamField path="analyze_documents" type="bool" default="False">
  To analyze document contents and enrich them when parsing
</ParamField>

<ParamField path="context" type="str" default="''">
  Additional context to pass to the query analysis and qa steps
</ParamField>

<ParamField path="document_db_filter" type="str" default="''">
  Filter the documents returned from the knowledge base
</ParamField>

<ParamField path="documents" type="str" required>
  The text for semantic search. Note: you may add multiple upstream nodes to this field.
</ParamField>

<ParamField path="filter" type="str" default="''">
  Filter the content returned from the knowledge base
</ParamField>

<ParamField path="is_hybrid" type="bool" default="False">
  Whether to create a hybrid knowledge base
</ParamField>

<ParamField path="segmentation_method" type="str" default="'words'">
  The method to break text into units before chunking. 'words': splits by word; 'sentences': splits by sentence boundary; 'paragraphs': splits by blank line/paragraph.
</ParamField>

<ParamField path="show_intermediate_steps" type="bool" default="False">
  Show intermediate steps
</ParamField>

<ParamField path="retrieval" type="RetrievalConfig" />

<ParamField path="rerank" type="RerankConfig" />

<ParamField path="query_enhancement" type="QueryEnhancementConfig" />

<ParamField path="alpha" type="float">
  The alpha value for the retrieval
</ParamField>

<ParamField path="answer_multiple_questions" type="bool">
  Extract separate questions from the query and retrieve content separately for each question to improve search performance
</ParamField>

<ParamField path="do_nl_metadata_query" type="bool">
  Do a natural language metadata query
</ParamField>

<ParamField path="expand_query" type="bool">
  Expand query to improve semantic search
</ParamField>

<ParamField path="expand_query_terms" type="bool">
  Expand query terms to improve semantic search
</ParamField>

<ParamField path="max_docs_per_query" type="int">
  The maximum number of relevant chunks to be returned
</ParamField>

<ParamField path="rerank_documents" type="bool">
  Refine the initial ranking of returned chunks based on relevancy
</ParamField>

<ParamField path="rerank_model" type="str">
  Refine the initial ranking of returned chunks based on relevancy

  <Expandable title="Allowed values">
    `cohere/rerank-english-v3.0`, `cohere/rerank-multilingual-v3.0`, `cohere/rerank-v3.5`, `cohere/rerank-v4.0-fast`, `cohere/rerank-v4.0-pro`, `contextualai/ctxl-rerank-en-v1-instruct`, `jina/jina-reranker-v2-base-multilingual`, `llm/google/gemini-2.5-flash`, `llm/google/gemini-2.5-flash-lite-preview-06-17`, `llm/google/gemini-2.5-pro`, `opensource/BAAI/bge-reranker-v2-m3`, `together/Salesforce/Llama-Rank-V1`, `together/mixedbread-ai/Mxbai-Rerank-Large-V2`, `voyageai/rerank-2`, `voyageai/rerank-2-lite`, `voyageai/rerank-2.5`, `voyageai/rerank-2.5-lite`
  </Expandable>
</ParamField>

<ParamField path="retrieval_unit" type="str">
  The unit of retrieval. Chunks will return the most relevant chunks, Documents will return document metadata with snippets, and Pages will return complete pages with all chunks from pages containing relevant content
  One of: `chunks`, `documents`, `pages`
</ParamField>

<ParamField path="score_cutoff" type="float">
  The score cutoff
</ParamField>

<ParamField path="transform_query" type="bool">
  Transform the query for better semantic search
</ParamField>

<ParamField path="advanced_search_mode" type="str" default="'accurate'">
  The mode to use for the advanced search
  One of: `accurate`, `fast`
</ParamField>

<ParamField path="qa_model_name" type="str" default="'gpt-4o-mini'">
  The model to use for the QA

  <Expandable title="Allowed values">
    `claude-3-5-sonnet-20240620`, `claude-3-haiku-20240307`, `claude-3-opus-20240229`, `gemini-2.0-flash-001`, `gemini-2.5-pro-exp-03-25`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-4o`, `gpt-4o-2024-08-06`, `gpt-4o-2024-11-20`, `gpt-4o-mini`, `gpt-4o-mini-2024-07-18`, `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `o1`, `o1-2024-12-17`, `o3`, `o3-mini`, `o3-pro`, `o4-mini`
  </Expandable>
</ParamField>
