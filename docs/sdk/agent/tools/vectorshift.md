> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# VectorShift tools

> Platform-native tools: agents, pipelines, knowledge bases, code, charts.

Add these tools with `AgentTools.<tool>(tool_name="...", ...)` or `agent.add_tool.<tool>(tool_name="...", ...)`. Every tool requires a unique `tool_name=`. Each entry lists the tool's configuration parameters. See the [Agent reference](/sdk/agent/reference) for attaching and running tools.

<a id="agent" />

## `agent` — Agent

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.agent(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="agent_config" type="Any" default="{}">
  The complete agent configuration including instructions, tools, inputs, and outputs
</ParamField>

<ParamField path="model" type="str" default="'gpt-5.4'">
  Select the LLM model to be used
</ParamField>

<ParamField path="processed_inputs" type="dict" default="{}">
  Dynamic inputs generated from agent inputs configuration
</ParamField>

<ParamField path="processed_outputs" type="dict" default="{}">
  Dynamic outputs generated from agent outputs configuration
</ParamField>

<ParamField path="provider" type="str" default="'openai'">
  Select the LLM provider to be used
</ParamField>

<ParamField path="use_existing_agent" type="bool" default="False">
  Whether to use an existing agent
</ParamField>

<ParamField path="agent" type="Agent | str" default="&#x22;{'object_id': '', 'object_type': 25}&#x22;">
  The ID of the agent to be used
</ParamField>

<a id="code_interpreter" />

## `code_interpreter` — Code Interpreter

Execute Python code in a sandboxed environment with file I/O support. Supports spreadsheet analysis, data visualization, and generating artifacts. To read or edit uploaded files, pass them in the files input as an actual array of file references; those files are mounted at /work/inputs/\{filename} (curly braces shown for clarity; replace with the exact filename). Continued sessions restore prior inputs and generated files, so work can resume even if Python memory reset. Save output files to /work/outputs/ to have them collected as artifacts; call save\_file(...) for durable/versioned user-visible files. Example: files=\["\$history.69dd11a49033ae4d8e65ab33"] and pd.read\_csv('/work/inputs/data.csv'); plt.savefig('/work/outputs/chart.png'). You will see stdout and stderr outputs after each execution step. Include an existing session id to keep executing code within the same session.

<Info>Platform docs: [Code Interpreter](https://docs.vectorshift.ai/platform/pipelines/general/code-interpreter)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.code_interpreter(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="code" type="Any">
  The Python code to execute in the sandboxed environment
</ParamField>

<ParamField path="files" type="Any">
  Optional files to make available to the code (e.g., spreadsheets, CSV files). Pass an actual array of file references, such as \["$history.69dd11a49033ae4d8e65ab33&quot;] or [&quot;$object.knowledge\_base\_item.6875a39904d4beff85bdde61"]. Files passed here are mounted into /work/inputs/\<exact filename>; continued sessions also restore prior session files.
</ParamField>

<a id="create_skill" />

## `create_skill` — Create Skill

Create a new skill with a name, description, and content

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.create_skill(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="content" type="str" default="''">
  The full content/instructions of the skill. Use markdown formatting: headings (##, ###) to organize sections, bullet points (- or \*) for instructions and guidelines, numbered lists (1. 2. 3.) for sequential steps, **bold** for key terms and critical instructions, and `code` for technical terms or placeholders. Add a \<br> tag between major sections for visual spacing.
</ParamField>

<ParamField path="name" type="str" default="''">
  The name of the skill
</ParamField>

<ParamField path="skill_description" type="str" default="''">
  A brief description of what the skill does
</ParamField>

<a id="custom_tool" />

## `custom_tool` — OpenAI-native built-ins (code\_interpreter, file\_search)

OpenAI-native built-ins (code\_interpreter, file\_search)

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.custom_tool(tool_name="...")
  ```
</CodeGroup>

<a id="generate_chart" />

## `generate_chart` — Generate Chart

Use this to generate a chart from. Convert a tabular file, dataframe or table to a chart or graph visualization. Supports bar, line, pie, scatter, and donut charts/graphs.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.generate_chart(tool_name="...", chart_type="bar", dataframe="...", dataframe_column_names="...", dataframe_type="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="chart_type" type="str" required>
  The type of chart to generate (bar, line, pie, scatter, donut)
  One of: `bar`, `donut`, `line`, `pie`, `scatter`, `time_series`
</ParamField>

<ParamField path="dataframe" type="str" required>
  The dataframe to visualize as a chart. In case of csv, the input should be a properly formatted valid csv string with appropriate headers. When chaining from a tool that returned a CSV file (e.g. fetch\_ratios.table), set dataframe\_type="file" and pass \$action.\<id>.table — never paste the upstream formatted\_text/XML here.
</ParamField>

<ParamField path="dataframe_column_names" type="str" required>
  Actual column names from the dataframe. It should be a string representing the comma separated list of column names.
</ParamField>

<ParamField path="dataframe_type" type="str" required>
  The type of dataframe to be used. Only available options are table, csv, md, json, file.
</ParamField>

<ParamField path="title" type="str" required>
  The title to display on the chart
</ParamField>

<ParamField path="x_axis_field" type="str" required>
  The column name to use for the X-axis (categories). Must EXACTLY match (case-sensitive) one of the column names from the CSV header.
</ParamField>

<ParamField path="y_axis_fields" type="str" required>
  Column name(s) for Y-axis values. Must EXACTLY match (case-sensitive) column name(s) from the CSV header. For multi-series charts (multiple lines/bars), use comma-separated names like 'revenue,profit,cost'.
</ParamField>

<ParamField path="aggregation" type="str">
  How to aggregate values when there are multiple data points per category
</ParamField>

<ParamField path="chart_description" type="str">
  A brief description or subtitle explaining what the chart shows
</ParamField>

<ParamField path="legend_orientation" type="str">
  Where to display the chart legend
</ParamField>

<ParamField path="sort_order" type="str">
  The order to sort the data
</ParamField>

<ParamField path="x_axis_label" type="str">
  The label to display on the X-axis. Defaults to the field name if not provided.
</ParamField>

<ParamField path="y_axis_label" type="str">
  The label to display on the Y-axis
</ParamField>

<ParamField path="currency_symbol" type="str">
  Currency symbol (only used with currency format)
</ParamField>

<ParamField path="default_time_period" type="str">
  Initial time period tab selection
</ParamField>

<ParamField path="number_format" type="str">
  How to format values
</ParamField>

<ParamField path="series_icon_urls" type="str">
  Comma-separated icon URLs for each series (company logos, game art, product images, etc.), in same order as y\_axis\_fields. Leave empty for no icons.
</ParamField>

<ParamField path="series_labels" type="str">
  Comma-separated display names for each Y-axis field, in same order as y\_axis\_fields (e.g. 'MSFT,NVDA' for tickers, 'Halo,Fortnite' for games, 'US,EU,APAC' for regions).
</ParamField>

<ParamField path="show_percent_change" type="str">
  Set to 'true' to show Original/% Change toggle
</ParamField>

<ParamField path="unit_suffix" type="str">
  Scale suffix for values
</ParamField>

<a id="get_skill" />

## `get_skill` — Get Skill

Retrieve the full content of a skill by its ID

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.get_skill(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="skill" type="Any" default="{}">
  The skill to retrieve. Specify by its id like \$object.prompt.id
</ParamField>

<a id="knowledge_base" />

## `knowledge_base` — Knowledge Base Reader

Semantically query a knowledge base that can contain files, scraped URLs, and data from synced integrations (e.g., Google Drive).

<Info>Platform docs: [Knowledge Base Reader](https://docs.vectorshift.ai/platform/pipelines/knowledge/knowledge-base-reader)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.knowledge_base(tool_name="...", do_advanced_qa=True, retrieval_unit="chunks", format_context_for_llm=True, stream_response=True)
  ```
</CodeGroup>

**Parameters**

<ParamField path="do_advanced_qa" type="bool" required>
  Use additional LLM calls to analyze each document to improve answer correctness
</ParamField>

<ParamField path="retrieval_unit" type="str" required>
  The unit of retrieval. Chunks will return the most relevant chunks from the knowledge base as well as their text content. Documents will return the document metadata as well as most relevant snippets from the document. Pages will return complete pages with all chunks from pages containing relevant content
  One of: `chunks`, `documents`, `pages`
</ParamField>

<ParamField path="format_context_for_llm" type="bool" required>
  Format the context for the LLM
</ParamField>

<ParamField path="stream_response" type="bool" required>
  Whether to stream the LLM response
</ParamField>

<ParamField path="knowledge_base" type="KnowledgeBase | str" required>
  Select an existing knowledge base, Use \$object.knowledge\_base.? syntax
</ParamField>

<ParamField path="query" type="str" required>
  The query will be used to search documents for relevant content semantically. Must not be empty, only include relevant information for retrieval or metadata filter generation. Generally expand any specific acronyms or abbreviations but include the original acronym or abbreviation as well
</ParamField>

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

<ParamField path="generate_metadata_filters" type="bool">
  Use an LLM to generate metadata filters to refine your query. Agents should usually leave this false and provide filters directly in the filter input.
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

<ParamField path="advanced_search_mode" type="str">
  The mode to use for the advanced search
</ParamField>

<ParamField path="qa_model_name" type="str">
  The model to use for the QA
</ParamField>

<a id="knowledge_base_agent" />

## `knowledge_base_agent` — Knowledge Base Agent

Query a knowledge base using an agentic approach with tools.

<Info>Platform docs: [Knowledge Base Agent](https://docs.vectorshift.ai/platform/pipelines/knowledge/knowledge-base-agent)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.knowledge_base_agent(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="context" type="Any">
  Optional additional context to help the agent understand the query better (e.g., conversation history, user preferences)
</ParamField>

<ParamField path="knowledge_base" type="KnowledgeBase | str" default="&#x22;{'object_type': 1, 'object_id': ''}&#x22;">
  Select an existing knowledge base. You must provide the id in \$.object.knowledge\_base.id format
</ParamField>

<ParamField path="model" type="str" default="'gemini-3-flash-preview'">
  Select the LLM model to be used by the agent
</ParamField>

<ParamField path="query" type="str" default="''">
  The natural language query. The agent will use this to determine the best way to query the knowledge base. Include the key criteria needed to answer the query.
</ParamField>

<ParamField path="return_answer" type="bool" default="True">
  If enabled, generates a synthesized answer from the knowledge base
</ParamField>

<ParamField path="provider" type="str" default="'google'">
  Select the LLM provider to be used by the agent
</ParamField>

<ParamField path="mode" type="str" default="'focused'">
  Controls the query effort: 'fast' for quick answers, 'focused' for balanced depth, 'deep' for thorough analysis
</ParamField>

<ParamField path="accept_additional_context" type="bool" default="False">
  If enabled, shows an additional context input to provide context to the agent
</ParamField>

<ParamField path="return_context" type="bool" default="False">
  If enabled, returns the relevant context/chunks used to generate the answer
</ParamField>

<a id="knowledge_base_create" />

## `knowledge_base_create` — Create Knowledge Base

Dynamically create a Knowledge Base with configured options

<Info>Platform docs: [Create Knowledge Base](https://docs.vectorshift.ai/platform/pipelines/knowledge/knowledge-base-create)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.knowledge_base_create(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="analyze_documents" type="bool" default="False">
  To analyze document contents and enrich them when parsing
</ParamField>

<ParamField path="apify_key" type="str" default="''">
  Apify API Key for scraping URLs (optional)
</ParamField>

<ParamField path="chunk_overlap" type="int" default="0">
  The overlap of the chunks to store in the knowledge base
</ParamField>

<ParamField path="chunk_size" type="int" default="400">
  The size of the chunks to store in the knowledge base
</ParamField>

<ParamField path="collection_name" type="str" default="'voyage-4-lite'">
  The name of the collection to store the knowledge base in
</ParamField>

<ParamField path="embedding_model" type="str" default="'voyageai/voyage-4-lite'">
  The embedding model to use for the knowledge base. Format: provider/model
</ParamField>

<ParamField path="embedding_provider" type="str" default="'voyageai'">
  The embedding provider to use
</ParamField>

<ParamField path="file_processing_implementation" type="str" default="'default'">
  The file processing implementation to use for parsing documents
</ParamField>

<ParamField path="is_hybrid" type="bool" default="False">
  Whether to create a hybrid knowledge base
</ParamField>

<ParamField path="name" type="str" default="''">
  The name of the knowledge base to create
</ParamField>

<ParamField path="precision" type="str" default="'Uint8'">
  The precision to use for the knowledge base
</ParamField>

<ParamField path="segmentation_method" type="str" default="'words'">
  The method to break text into units before chunking. 'words': splits by word; 'sentences': splits by sentence boundary; 'paragraphs': splits by blank line/paragraph.
</ParamField>

<ParamField path="sharded" type="bool" default="True">
  Whether to shard the knowledge base
</ParamField>

<ParamField path="vector_db_provider" type="str" default="'qdrant'">
  The vector database provider to use
</ParamField>

<ParamField path="splitter_method" type="str" default="'markdown'">
  Strategy for grouping segmented text into final chunks. 'sentence': groups sentences; 'markdown': respects Markdown structure (headers, code); 'dynamic': optimizes breaks for size using chosen segmentation method.
</ParamField>

<a id="knowledge_base_fetch_document_content" />

## `knowledge_base_fetch_document_content` — Knowledge Base Fetch Document Content

Fetch the full content of a specific document from a knowledge base by scrolling through all its chunks

<Info>Platform docs: [Knowledge Base Fetch Document Content](https://docs.vectorshift.ai/platform/pipelines/knowledge/knowledge-base-fetch-document-content)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.knowledge_base_fetch_document_content(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="item_id" type="str" default="''">
  item id of the item to fetch content from
</ParamField>

<ParamField path="knowledge_base" type="KnowledgeBase | str" default="&#x22;{'object_type': 1, 'object_id': ''}&#x22;">
  Select an existing knowledge base
</ParamField>

<ParamField path="max_chunks" type="int" default="200">
  Maximum number of chunks to include in the content
</ParamField>

<ParamField path="offset" type="int" default="0">
  Number of chunks to skip for pagination.
</ParamField>

<ParamField path="page_ranges" type="str" default="''">
  Optional page ranges to fetch, e.g. '1-5,8,10-12'. If empty, fetches all pages.
</ParamField>

<a id="knowledge_base_fetch_items" />

## `knowledge_base_fetch_items` — Knowledge Base Fetch Items

Advanced knowledge base item fetching with traversal, filtering, and output shaping capabilities

<Info>Platform docs: [Knowledge Base Fetch Items](https://docs.vectorshift.ai/platform/pipelines/knowledge/knowledge-base-fetch-items)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.knowledge_base_fetch_items(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="filter" type="str" default="''">
  JSON filter object, example filter syntax: '\{"type": "condition", "field": "file\_extension", "operator": "eq", "value": "pdf"}' or '\{"type": "condition", "field": "title", "operator": "match", "value": "Pantheon"}' only use filters if explicitly requested by the user. Do not use filters on fields other than file type. Available operators include are eq and neq, do not use filter operator contains
</ParamField>

<ParamField path="item_return_type" type="str" default="'ALL'">
  Type of items to return: FOLDERS, DOCUMENTS, or ALL
</ParamField>

<ParamField path="knowledge_base" type="Any">
  Select an existing knowledge base
</ParamField>

<ParamField path="limit" type="int" default="50">
  Maximum number of items to return, capped at 200
</ParamField>

<ParamField path="max_depth" type="int" default="0">
  Maximum depth for descendants traversal, use 0 to traverse up as deep as possible to get to \{\{limit}} items, use 1 to get direct children etc
</ParamField>

<ParamField path="offset" type="int" default="0">
  Number of items to skip for pagination
</ParamField>

<ParamField path="root_ids" type="str" default="''">
  Filter to list items in specific folders by providing comma-separated root IDs
</ParamField>

<ParamField path="sort_fields" type="str" default="''">
  Comma-separated fields to sort by
</ParamField>

<ParamField path="sort_orders" type="str" default="''">
  Comma-separated sort orders: asc or desc
</ParamField>

<ParamField path="verbosity" type="str" default="'metadata'">
  Output verbosity level: metadata (no summaries), short (short summaries), or long (short and long summaries), Use metadata for for simply finding folders/ documents, use short for understanding folder/document contents, use long with a lower limit for deep understanding of a particular folder/subfolder
</ParamField>

<a id="knowledge_base_get_item_bboxes" />

## `knowledge_base_get_item_bboxes` — Knowledge Base Get Item Bboxes

Fetch OCR bounding boxes for specific pages of a PDF document in a knowledge base

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.knowledge_base_get_item_bboxes(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="item_id" type="str" default="''">
  Item ID of the document to fetch bounding boxes for
</ParamField>

<ParamField path="knowledge_base" type="KnowledgeBase | str" default="&#x22;{'object_type': 1, 'object_id': ''}&#x22;">
  Select a knowledge base
</ParamField>

<ParamField path="page_ranges" type="str" default="''">
  Page ranges to fetch bounding boxes for, e.g. '1-5,8,12'
</ParamField>

<a id="knowledge_base_loader" />

## `knowledge_base_loader` — Knowledge Base Loader

Load data into an existing knowledge base.

<Info>Platform docs: [Knowledge Base Loader](https://docs.vectorshift.ai/platform/pipelines/knowledge/knowledge-base-loader)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.knowledge_base_loader(tool_name="...", document_type="File", documents=..., knowledge_base=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="document_type" type="str" required>
  Select the type of data to load
  One of: `File`, `URL`
</ParamField>

<ParamField path="documents" type="list[str]" required>
  The file to be added to the selected knowledge base. Note: to convert text to file, use the Text to File node
</ParamField>

<ParamField path="knowledge_base" type="KnowledgeBase | str" required>
  The knowledge base to load data into
</ParamField>

<a id="list_objects" />

## `list_objects` — List Objects

List VectorShift objects accessible to the current user

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.list_objects(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="include_shared" type="bool" default="True">
  Include objects shared with you by other users
</ParamField>

<ParamField path="limit" type="int" default="0">
  Maximum number of objects to return (0 = no limit)
</ParamField>

<ParamField path="object_type" type="str" default="'pipeline'">
  The type of VectorShift object to list
</ParamField>

<ParamField path="offset" type="int" default="0">
  Number of objects to skip (0 = no offset)
</ParamField>

<ParamField path="verbose" type="bool" default="False">
  Return full object data instead of just id, name, and type
</ParamField>

<a id="mcp_connector" />

## `mcp_connector` — Integration-backed MCP (Slack, GitHub, etc.)

Integration-backed MCP (Slack, GitHub, etc.)

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.mcp_connector(tool_name="...")
  ```
</CodeGroup>

<a id="mcp_server" />

## `mcp_server` — Mcp Server

Bind an MCP server (created via web UI) as a tool source

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.mcp_server(tool_name="...")
  ```
</CodeGroup>

<a id="pipeline" />

## `pipeline` — Pipeline

<Info>Platform docs: [Pipeline](https://docs.vectorshift.ai/platform/pipelines/general/pipeline)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.pipeline(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="pipeline" type="Pipeline | str" default="&#x22;{'object_type': 0, 'object_id': ''}&#x22;">
  The ID of the pipeline to be used
</ParamField>

<a id="read_memory" />

## `read_memory` — Read Memory

Load the full content of a memory entry. Use this when: - A memory shown in context appears truncated or abbreviated - A knowledge base memory needs its full document index (folder structure, document list) - You need the complete text of a memory that shows \[content not loaded] Returns the full content as a string.  Knowledge base memories: returns the KB's document index and folder hierarchy (not document content). Use knowledge\_base\_query to search document content.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.read_memory(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="memory_id" type="str" default="''">
  The memory\_id shown in the context\_memories section next to the memory name.
</ParamField>

<a id="transformation" />

## `transformation` — Transformation

Use Python code to create a custom node

<Info>Platform docs: [Transformation](https://docs.vectorshift.ai/platform/pipelines/general/transform)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.transformation(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="transformation" type="Transformation | str" default="&#x22;{'object_id': '', 'object_type': 14}&#x22;">
  The ID of the transformation to be used
</ParamField>

<a id="write_memory" />

## `write_memory` — Write Memory

Create or update a Memory object for use with context-aware agents. You can store text memory content and or references to object types like knowledge bases, knowledge base items, files and prompts.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.write_memory(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="content" type="list[str]" default="[]">
  Content to store in the memory. Each item can be plain text or an object reference using '$object.Type.id' syntax (e.g. '$object.knowledge\_base.617', '\$object.file.718'). Allowed object types: KnowledgeBase, File, KnowledgeBaseItem, Prompt.
</ParamField>

<ParamField path="memory_description" type="str" default="''">
  brief description of what this memory contains and when it should be used
</ParamField>

<ParamField path="memory_id" type="str" default="''">
  Use this to update an existing memory instead of creating a new one.
</ParamField>

<ParamField path="name" type="str" default="''">
  Name of the memory entry
</ParamField>

<ParamField path="scope_user_id" type="str" default="''">
  Optional explicit user ID to use for User scope. If empty, authenticated caller user ID is used. Provide the raw ObjectId only (e.g. '6875a39904d4beff85bdde61'), not prefixed with 'user:' or any other label.
</ParamField>

<ParamField path="scopes" type="list[str]" default="[]">
  Scopes to associate with this memory. Allowed values: User, Session, Agent, Org, Workspace. Memory will be accessible if all scopes are true. All listed scopes are required (AND). Example: Agent + Workspace means memory is only in scope for that agent inside that workspace.
</ParamField>
