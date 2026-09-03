> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Chat nodes

> Session memory, chat data, and run data.

Add these nodes with the pipeline builder: `pipeline.add(name="...").<node>(...)`. Each entry lists the node's configuration parameters. See the [Pipeline reference](/sdk/pipeline/reference) for `add`, `run`, and lifecycle methods.

<a id="chat_file_reader" />

## `chat_file_reader` — Chat File Reader

Allows for document upload within chatbots (often connected to the LLM node).

<Info>Platform docs: [Chat File Reader](/nodes/chat-file-reader/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").chat_file_reader()
  ```
</CodeGroup>

**Parameters**

<ParamField path="chunk_overlap" type="int" default="200" />

<ParamField path="chunk_size" type="int" default="1000" />

<ParamField path="file_parser" type="str" default="'default'">
  One of: `contextual_ai`, `default`, `docling`, `llama_parse`, `mistral_ocr`, `reducto`, `textract`
</ParamField>

<ParamField path="max_docs_per_query" type="int" default="10" />

<ParamField path="retrieval_unit" type="str" default="'chunks'">
  One of: `chunks`, `documents`, `pages`
</ParamField>

<a id="chat_memory" />

## `chat_memory` — Chat Memory

Give connected nodes access to conversation history.

<Info>Platform docs: [Chat Memory](/nodes/chat-memory/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").chat_memory()
  ```
</CodeGroup>

**Parameters**

<ParamField path="memory_type" type="str" default="'Full - Formatted'">
  The type of memory to use
  One of: `Full - Formatted`, `Full - Raw`, `Message Buffer`, `Token Buffer`, `Vector Database`
</ParamField>

<ParamField path="memory_window" type="int" default="2048">
  The number of tokens to store in memory
</ParamField>

<a id="create_session" />

## `create_session` — Create Session

Create a new session with an agent and participants

<Info>Platform docs: [Create Session](/nodes/create-session/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").create_session(agent_id=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="agent_id" type="AcceptsAgent" required />

<ParamField path="name" type="str" default="''" />

<a id="data_collector" />

## `data_collector` — Data Collector

Allows a chatbot to collect information by asking the user to provide specific pieces of information (e.g., name, email, etc.).

<Info>Platform docs: [Data Collector](/nodes/data-collector/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").data_collector(provider="anthropic", query="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="auto_generate" type="bool" default="True">
  If checked, the node will output questions in successive order until all fields are successfully collected. If unchecked, the node will output the data that is collected (often passed to an LLM with a prompt to ask successive questions to the user, along with specific instructions after all fields are collected) - e.g., \{'Field1': 'Collected\_Data', 'Field2': 'Collected\_Data'}
</ParamField>

<ParamField path="provider" type="str" required>
  The model provider

  <Expandable title="Allowed values">
    `anthropic`, `azure`, `bedrock`, `cohere`, `custom`, `fireworks`, `google`, `groq`, `openai`, `perplexity`, `together`, `xai`
  </Expandable>
</ParamField>

<ParamField path="model" type="str" default="''">
  The specific model for question generation

  <Expandable title="Allowed values">
    `MiniMaxAI/MiniMax-M2.5`, `MiniMaxAI/MiniMax-M2.7`, `Qwen/QwQ-32B-Preview`, `Qwen/Qwen2.5-72B-Instruct-Turbo-lora`, `Qwen/Qwen2.5-7B-Instruct-Turbo`, `Qwen/Qwen3-235B-A22B-Instruct-2507-tput`, `Qwen/Qwen3-235B-A22B-fp8-tput`, `Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8`, `Qwen/Qwen3-VL-8B-Instruct`, `Qwen/Qwen3.5-397B-A17B`, `Qwen/Qwen3.5-9B`, `Qwen/Qwen3.6-Plus`, `accounts/fireworks/models/deepseek-v4-pro`, `accounts/fireworks/models/glm-5p1`, `accounts/fireworks/models/gpt-oss-120b`, `accounts/fireworks/models/kimi-k2p5`, `accounts/fireworks/models/kimi-k2p6`, `accounts/fireworks/models/minimax-m2p7`, `accounts/fireworks/models/qwen3-235b-a22b`, `accounts/fireworks/models/qwen3p5-397b-a17b`, `accounts/fireworks/models/qwen3p6-plus`, `amazon.nova-lite-v1:0`, `amazon.nova-micro-v1:0`, `amazon.nova-pro-v1:0`, `amazon.titan-text-express-v1`, `amazon.titan-text-lite-v1`, `chatgpt-4o-latest`, `claude-3-5-haiku-20241022`, `claude-3-7-sonnet-20250219`, `claude-3-haiku-20240307`, `claude-haiku-4-5-20251001`, `claude-opus-4-1-20250805`, `claude-opus-4-20250514`, `claude-opus-4-5-20251101`, `claude-opus-4-6`, `claude-opus-4-7`, `claude-opus-4-8`, `claude-sonnet-4-20250514`, `claude-sonnet-4-5`, `claude-sonnet-4-6`, `command-nightly`, `command-r-08-2024`, `command-r-plus-08-2024`, `deepcogito/cogito-v2-1-671b`, `deepseek-ai/DeepSeek-R1-Distill-Llama-70B`, `deepseek-ai/DeepSeek-V3`, `deepseek-ai/DeepSeek-V4-Pro`, `deepseek-ai/deepseek-llm-67b-chat`, `gemini-2.0-flash-001`, `gemini-2.0-flash-lite-preview-02-05`, `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-3-flash-preview`, `gemini-3-pro-preview`, `gemini-3.1-flash-lite-preview`, `gemini-3.1-pro-preview`, `gemini-3.5-flash`, `gemma2-9b-it`, `google/gemma-2-27b-it`, `google/gemma-2-9b-it`, `google/gemma-2b-it`, `google/gemma-3n-E4B-it`, `google/gemma-4-31B-it`, `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4-turbo-2024-04-09`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-4o`, `gpt-4o-2024-08-06`, `gpt-4o-mini`, `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `gpt-5.1`, `gpt-5.1-codex`, `gpt-5.1-codex-mini`, `gpt-5.2`, `gpt-5.3-codex`, `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.5`, `grok-2`, `grok-2-vision`, `grok-3-beta`, `grok-3-fast-beta`, `grok-3-mini-beta`, `grok-3-mini-fast-beta`, `grok-4`, `grok-4-0629`, `grok-4-0709`, `grok-4-fast-non-reasoning`, `grok-4-fast-reasoning`, `grok-4-latest`, `llama-3.1-8b-instant`, `llama-3.3-70b-versatile`, `meta-llama/Llama-3-70b-chat-hf`, `meta-llama/Llama-3-8b-chat-hf`, `meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.2-3B-Instruct-Turbo`, `meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.3-70B-Instruct-Turbo`, `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`, `meta-llama/Llama-4-Scout-17B-16E-Instruct`, `meta-llama/Meta-Llama-3-70B-Instruct-Lite`, `meta-llama/Meta-Llama-3-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3-8B-Instruct-Lite`, `meta-llama/Meta-Llama-3-8B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo`, `meta.llama3-8b-instruct-v1:0`, `mistralai/Mistral-7B-Instruct-v0.1`, `mistralai/Mistral-7B-Instruct-v0.2`, `mistralai/Mistral-7B-Instruct-v0.3`, `mistralai/Mixtral-8x22B-Instruct-v0.1`, `mistralai/Mixtral-8x7B-Instruct-v0.1`, `mixtral-8x7b-32768`, `moonshotai/Kimi-K2-Instruct`, `moonshotai/Kimi-K2.5`, `moonshotai/Kimi-K2.6`, `o1`, `o3`, `o3-mini`, `o4-mini`, `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `perplexity-ai/r1-1776`, `r1-1776`, `sonar`, `sonar-deep-research`, `sonar-pro`, `sonar-reasoning-pro`, `us.anthropic.claude-haiku-4-5-20251001-v1:0`, `us.anthropic.claude-opus-4-1-20250805-v1:0`, `us.anthropic.claude-opus-4-5-20251101-v1:0`, `us.anthropic.claude-opus-4-6-v1`, `us.anthropic.claude-sonnet-4-20250514-v1:0`, `us.anthropic.claude-sonnet-4-5-20250929-v1:0`, `us.anthropic.claude-sonnet-4-6`, `us.meta.llama3-1-70b-instruct-v1:0`, `us.meta.llama3-1-8b-instruct-v1:0`, `us.meta.llama3-2-11b-instruct-v1:0`, `us.meta.llama3-2-1b-instruct-v1:0`, `us.meta.llama3-2-3b-instruct-v1:0`, `us.meta.llama3-2-90b-instruct-v1:0`, `zai-org/GLM-4.5-Air-FP8`, `zai-org/GLM-5`, `zai-org/GLM-5.1`
  </Expandable>
</ParamField>

<ParamField path="prompt" type="str" default="''">
  Specific instructions of how the LLM should collect the information
</ParamField>

<ParamField path="query" type="str" required>
  The query to be analysed for data collection (passed to the LLM)
</ParamField>

<ParamField path="data_collector_node_id" type="str" default="''">
  The ID of the data collector node
</ParamField>

<ParamField path="fields" type="ListType | list[FieldDefinition] | list[List[Dict[str, Any]]]" default="[]">
  The fields to be collected
</ParamField>

<a id="get_run_data" />

## `get_run_data` — Get Run Data

Fetch run metrics (trace, latency, cost, tokens, status) for a session

<Info>Platform docs: [Get Run Data](/nodes/get-run-data/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").get_run_data(session_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="session_id" type="str" required />

<a id="read_memory" />

## `read_memory` — Read Memory

Load the full content of a memory entry. Use this when:

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").read_memory(memory_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="memory_id" type="str" required />

<a id="read_session_messages" />

## `read_session_messages` — Read Session Messages

Read all messages from a session with derived metadata

<Info>Platform docs: [Read Session Messages](/nodes/read-session-messages/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").read_session_messages(session_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="message_type_filter" type="str" default="'none'">
  <Expandable title="Allowed values">
    `component_message`, `data_type_message`, `error_message`, `none`, `reasoning_message`, `reauthorize_error`, `request_message`, `response_message`, `search_message`, `set_participant_status`
  </Expandable>
</ParamField>

<ParamField path="offset" type="int" default="0" />

<ParamField path="session_id" type="str" required />

<a id="write_memory" />

## `write_memory` — Write Memory

Create or update a Memory object for use with context-aware agents. You can store text memory content and or references to object types like knowledge bases, knowledge base items, files and prompts.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").write_memory(content=..., name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="content" type="list[str]" required />

<ParamField path="memory_description" type="str" default="''" />

<ParamField path="memory_id" type="str" default="''" />

<ParamField path="name" type="str" required />

<ParamField path="scope_user_id" type="str" default="''" />

<ParamField path="scopes" type="list[str]" default="[]" />
