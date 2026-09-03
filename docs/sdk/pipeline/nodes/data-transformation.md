> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Data Transformation nodes

> Text, list, JSON, file, table, and AI data operations, plus notifications.

Add these nodes with the pipeline builder: `pipeline.add(name="...").<node>(...)`. Each entry lists the node's configuration parameters. See the [Pipeline reference](/sdk/pipeline/reference) for `add`, `run`, and lifecycle methods.

<a id="ai_fill_pdf" />

## `ai_fill_pdf` — AI Fill PDF

Fill out a PDF with form fields using AI. The AI will understand and fill each field using provided context. To convert your PDF to have fillable input fields, use: [https://www.sejda.com/pdf-forms](https://www.sejda.com/pdf-forms)

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").ai_fill_pdf(provider="anthropic", context="...", file=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="select_pages" type="bool" default="False">
  Whether to select specific pages to fill
</ParamField>

<ParamField path="provider" type="str" required>
  The model provider

  <Expandable title="Allowed values">
    `anthropic`, `azure`, `bedrock`, `cohere`, `custom`, `fireworks`, `google`, `groq`, `openai`, `perplexity`, `together`, `xai`
  </Expandable>
</ParamField>

<ParamField path="model" type="str" default="''">
  The specific model for filling the PDF

  <Expandable title="Allowed values">
    `MiniMaxAI/MiniMax-M2.5`, `MiniMaxAI/MiniMax-M2.7`, `Qwen/QwQ-32B-Preview`, `Qwen/Qwen2.5-72B-Instruct-Turbo-lora`, `Qwen/Qwen2.5-7B-Instruct-Turbo`, `Qwen/Qwen3-235B-A22B-Instruct-2507-tput`, `Qwen/Qwen3-235B-A22B-fp8-tput`, `Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8`, `Qwen/Qwen3-VL-8B-Instruct`, `Qwen/Qwen3.5-397B-A17B`, `Qwen/Qwen3.5-9B`, `Qwen/Qwen3.6-Plus`, `accounts/fireworks/models/deepseek-v4-pro`, `accounts/fireworks/models/glm-5p1`, `accounts/fireworks/models/gpt-oss-120b`, `accounts/fireworks/models/kimi-k2p5`, `accounts/fireworks/models/kimi-k2p6`, `accounts/fireworks/models/minimax-m2p7`, `accounts/fireworks/models/qwen3-235b-a22b`, `accounts/fireworks/models/qwen3p5-397b-a17b`, `accounts/fireworks/models/qwen3p6-plus`, `amazon.nova-lite-v1:0`, `amazon.nova-micro-v1:0`, `amazon.nova-pro-v1:0`, `amazon.titan-text-express-v1`, `amazon.titan-text-lite-v1`, `chatgpt-4o-latest`, `claude-3-5-haiku-20241022`, `claude-3-7-sonnet-20250219`, `claude-3-haiku-20240307`, `claude-haiku-4-5-20251001`, `claude-opus-4-1-20250805`, `claude-opus-4-20250514`, `claude-opus-4-5-20251101`, `claude-opus-4-6`, `claude-opus-4-7`, `claude-opus-4-8`, `claude-sonnet-4-20250514`, `claude-sonnet-4-5`, `claude-sonnet-4-6`, `command-nightly`, `command-r-08-2024`, `command-r-plus-08-2024`, `deepcogito/cogito-v2-1-671b`, `deepseek-ai/DeepSeek-R1-Distill-Llama-70B`, `deepseek-ai/DeepSeek-V3`, `deepseek-ai/DeepSeek-V4-Pro`, `deepseek-ai/deepseek-llm-67b-chat`, `gemini-2.0-flash-001`, `gemini-2.0-flash-lite-preview-02-05`, `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-3-flash-preview`, `gemini-3-pro-preview`, `gemini-3.1-flash-lite-preview`, `gemini-3.1-pro-preview`, `gemini-3.5-flash`, `gemma2-9b-it`, `google/gemma-2-27b-it`, `google/gemma-2-9b-it`, `google/gemma-2b-it`, `google/gemma-3n-E4B-it`, `google/gemma-4-31B-it`, `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4-turbo-2024-04-09`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-4o`, `gpt-4o-2024-08-06`, `gpt-4o-mini`, `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `gpt-5.1`, `gpt-5.1-codex`, `gpt-5.1-codex-mini`, `gpt-5.2`, `gpt-5.3-codex`, `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.5`, `grok-2`, `grok-2-vision`, `grok-3-beta`, `grok-3-fast-beta`, `grok-3-mini-beta`, `grok-3-mini-fast-beta`, `grok-4`, `grok-4-0629`, `grok-4-0709`, `grok-4-fast-non-reasoning`, `grok-4-fast-reasoning`, `grok-4-latest`, `llama-3.1-8b-instant`, `llama-3.3-70b-versatile`, `meta-llama/Llama-3-70b-chat-hf`, `meta-llama/Llama-3-8b-chat-hf`, `meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.2-3B-Instruct-Turbo`, `meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.3-70B-Instruct-Turbo`, `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`, `meta-llama/Llama-4-Scout-17B-16E-Instruct`, `meta-llama/Meta-Llama-3-70B-Instruct-Lite`, `meta-llama/Meta-Llama-3-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3-8B-Instruct-Lite`, `meta-llama/Meta-Llama-3-8B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo`, `meta.llama3-8b-instruct-v1:0`, `mistralai/Mistral-7B-Instruct-v0.1`, `mistralai/Mistral-7B-Instruct-v0.2`, `mistralai/Mistral-7B-Instruct-v0.3`, `mistralai/Mixtral-8x22B-Instruct-v0.1`, `mistralai/Mixtral-8x7B-Instruct-v0.1`, `mixtral-8x7b-32768`, `moonshotai/Kimi-K2-Instruct`, `moonshotai/Kimi-K2.5`, `moonshotai/Kimi-K2.6`, `o1`, `o3`, `o3-mini`, `o4-mini`, `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `perplexity-ai/r1-1776`, `r1-1776`, `sonar`, `sonar-deep-research`, `sonar-pro`, `sonar-reasoning-pro`, `us.anthropic.claude-haiku-4-5-20251001-v1:0`, `us.anthropic.claude-opus-4-1-20250805-v1:0`, `us.anthropic.claude-opus-4-5-20251101-v1:0`, `us.anthropic.claude-opus-4-6-v1`, `us.anthropic.claude-sonnet-4-20250514-v1:0`, `us.anthropic.claude-sonnet-4-5-20250929-v1:0`, `us.anthropic.claude-sonnet-4-6`, `us.meta.llama3-1-70b-instruct-v1:0`, `us.meta.llama3-1-8b-instruct-v1:0`, `us.meta.llama3-2-11b-instruct-v1:0`, `us.meta.llama3-2-1b-instruct-v1:0`, `us.meta.llama3-2-3b-instruct-v1:0`, `us.meta.llama3-2-90b-instruct-v1:0`, `zai-org/GLM-4.5-Air-FP8`, `zai-org/GLM-5`, `zai-org/GLM-5.1`
  </Expandable>
</ParamField>

<ParamField path="context" type="str" required>
  Context used by LLM to fill PDF fields
</ParamField>

<ParamField path="file" type="AcceptsFile" required>
  The PDF with form fields to be filled
</ParamField>

<ParamField path="selected_pages" type="str" default="''">
  PDF page range
</ParamField>

<a id="ai_filter_list" />

## `ai_filter_list` — AI Filter List

Filter items in a list given a specific AI condition. Example, Filter (Red, White, Boat) by whether it is a color: (Red, White)

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").ai_filter_list(provider="anthropic", ai_condition="...", filter_by=..., list_to_filter=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="filter_mode" type="str" default="'single'">
  Choose whether to filter a single list or filter by another list
  One of: `another`, `single`
</ParamField>

<ParamField path="provider" type="str" required>
  The model provider

  <Expandable title="Allowed values">
    `anthropic`, `azure`, `bedrock`, `cohere`, `custom`, `fireworks`, `google`, `groq`, `openai`, `perplexity`, `together`, `xai`
  </Expandable>
</ParamField>

<ParamField path="model" type="str" default="''">
  The specific model for filtering

  <Expandable title="Allowed values">
    `MiniMaxAI/MiniMax-M2.5`, `MiniMaxAI/MiniMax-M2.7`, `Qwen/QwQ-32B-Preview`, `Qwen/Qwen2.5-72B-Instruct-Turbo-lora`, `Qwen/Qwen2.5-7B-Instruct-Turbo`, `Qwen/Qwen3-235B-A22B-Instruct-2507-tput`, `Qwen/Qwen3-235B-A22B-fp8-tput`, `Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8`, `Qwen/Qwen3-VL-8B-Instruct`, `Qwen/Qwen3.5-397B-A17B`, `Qwen/Qwen3.5-9B`, `Qwen/Qwen3.6-Plus`, `accounts/fireworks/models/deepseek-v4-pro`, `accounts/fireworks/models/glm-5p1`, `accounts/fireworks/models/gpt-oss-120b`, `accounts/fireworks/models/kimi-k2p5`, `accounts/fireworks/models/kimi-k2p6`, `accounts/fireworks/models/minimax-m2p7`, `accounts/fireworks/models/qwen3-235b-a22b`, `accounts/fireworks/models/qwen3p5-397b-a17b`, `accounts/fireworks/models/qwen3p6-plus`, `amazon.nova-lite-v1:0`, `amazon.nova-micro-v1:0`, `amazon.nova-pro-v1:0`, `amazon.titan-text-express-v1`, `amazon.titan-text-lite-v1`, `chatgpt-4o-latest`, `claude-3-5-haiku-20241022`, `claude-3-7-sonnet-20250219`, `claude-3-haiku-20240307`, `claude-haiku-4-5-20251001`, `claude-opus-4-1-20250805`, `claude-opus-4-20250514`, `claude-opus-4-5-20251101`, `claude-opus-4-6`, `claude-opus-4-7`, `claude-opus-4-8`, `claude-sonnet-4-20250514`, `claude-sonnet-4-5`, `claude-sonnet-4-6`, `command-nightly`, `command-r-08-2024`, `command-r-plus-08-2024`, `deepcogito/cogito-v2-1-671b`, `deepseek-ai/DeepSeek-R1-Distill-Llama-70B`, `deepseek-ai/DeepSeek-V3`, `deepseek-ai/DeepSeek-V4-Pro`, `deepseek-ai/deepseek-llm-67b-chat`, `gemini-2.0-flash-001`, `gemini-2.0-flash-lite-preview-02-05`, `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-3-flash-preview`, `gemini-3-pro-preview`, `gemini-3.1-flash-lite-preview`, `gemini-3.1-pro-preview`, `gemini-3.5-flash`, `gemma2-9b-it`, `google/gemma-2-27b-it`, `google/gemma-2-9b-it`, `google/gemma-2b-it`, `google/gemma-3n-E4B-it`, `google/gemma-4-31B-it`, `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4-turbo-2024-04-09`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-4o`, `gpt-4o-2024-08-06`, `gpt-4o-mini`, `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `gpt-5.1`, `gpt-5.1-codex`, `gpt-5.1-codex-mini`, `gpt-5.2`, `gpt-5.3-codex`, `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.5`, `grok-2`, `grok-2-vision`, `grok-3-beta`, `grok-3-fast-beta`, `grok-3-mini-beta`, `grok-3-mini-fast-beta`, `grok-4`, `grok-4-0629`, `grok-4-0709`, `grok-4-fast-non-reasoning`, `grok-4-fast-reasoning`, `grok-4-latest`, `llama-3.1-8b-instant`, `llama-3.3-70b-versatile`, `meta-llama/Llama-3-70b-chat-hf`, `meta-llama/Llama-3-8b-chat-hf`, `meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.2-3B-Instruct-Turbo`, `meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.3-70B-Instruct-Turbo`, `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`, `meta-llama/Llama-4-Scout-17B-16E-Instruct`, `meta-llama/Meta-Llama-3-70B-Instruct-Lite`, `meta-llama/Meta-Llama-3-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3-8B-Instruct-Lite`, `meta-llama/Meta-Llama-3-8B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo`, `meta.llama3-8b-instruct-v1:0`, `mistralai/Mistral-7B-Instruct-v0.1`, `mistralai/Mistral-7B-Instruct-v0.2`, `mistralai/Mistral-7B-Instruct-v0.3`, `mistralai/Mixtral-8x22B-Instruct-v0.1`, `mistralai/Mixtral-8x7B-Instruct-v0.1`, `mixtral-8x7b-32768`, `moonshotai/Kimi-K2-Instruct`, `moonshotai/Kimi-K2.5`, `moonshotai/Kimi-K2.6`, `o1`, `o3`, `o3-mini`, `o4-mini`, `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `perplexity-ai/r1-1776`, `r1-1776`, `sonar`, `sonar-deep-research`, `sonar-pro`, `sonar-reasoning-pro`, `us.anthropic.claude-haiku-4-5-20251001-v1:0`, `us.anthropic.claude-opus-4-1-20250805-v1:0`, `us.anthropic.claude-opus-4-5-20251101-v1:0`, `us.anthropic.claude-opus-4-6-v1`, `us.anthropic.claude-sonnet-4-20250514-v1:0`, `us.anthropic.claude-sonnet-4-5-20250929-v1:0`, `us.anthropic.claude-sonnet-4-6`, `us.meta.llama3-1-70b-instruct-v1:0`, `us.meta.llama3-1-8b-instruct-v1:0`, `us.meta.llama3-2-11b-instruct-v1:0`, `us.meta.llama3-2-1b-instruct-v1:0`, `us.meta.llama3-2-3b-instruct-v1:0`, `us.meta.llama3-2-90b-instruct-v1:0`, `zai-org/GLM-4.5-Air-FP8`, `zai-org/GLM-5`, `zai-org/GLM-5.1`
  </Expandable>
</ParamField>

<ParamField path="ai_condition" type="str" required>
  Write in natural language the condition to filter each item in the list
</ParamField>

<ParamField path="filter_by" type="list[str]" required>
  The items to filter the list by
</ParamField>

<ParamField path="list_to_filter" type="list[str]" required>
  The list to filter
</ParamField>

<ParamField path="output_blank_value" type="bool" default="False">
  If true, output a blank value for values that do not meet the filter condition. If false, nothing will be outputted
</ParamField>

<ParamField path="sampling" type="SamplingConfig" />

<ParamField path="max_tokens" type="Any" />

<ParamField path="temperature" type="Any" />

<ParamField path="top_p" type="Any" />

<a id="ai_operations" />

## `ai_operations` — Leverage AI for various tasks

Leverage AI for various tasks

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").ai_operations()
  ```
</CodeGroup>

**Parameters**

<ParamField path="sub_type" type="str" default="''" />

<a id="append_files" />

## `append_files` — Append Files

Append files together in successive fashion

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").append_files()
  ```
</CodeGroup>

**Parameters**

<ParamField path="file_type" type="str" default="'PDF'">
  One of: `PDF`, `PPTX`
</ParamField>

<ParamField path="selected_files" type="AcceptsFileList" default="[]" />

<a id="categorizer" />

## `categorizer` — Categorizer

Categorize text using AI into custom-defined buckets

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").categorizer(provider="anthropic", text="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="justification" type="bool" default="False">
  Include the AI's justification for its score
</ParamField>

<ParamField path="provider" type="str" required>
  The model provider

  <Expandable title="Allowed values">
    `anthropic`, `aws`, `azure`, `bedrock`, `cohere`, `custom`, `fireworks`, `google`, `groq`, `openai`, `perplexity`, `together`, `xai`
  </Expandable>
</ParamField>

<ParamField path="model" type="str" default="''">
  The specific model for categorization

  <Expandable title="Allowed values">
    `MiniMaxAI/MiniMax-M2.5`, `MiniMaxAI/MiniMax-M2.7`, `Qwen/QwQ-32B-Preview`, `Qwen/Qwen2.5-72B-Instruct-Turbo-lora`, `Qwen/Qwen2.5-7B-Instruct-Turbo`, `Qwen/Qwen3-235B-A22B-Instruct-2507-tput`, `Qwen/Qwen3-235B-A22B-fp8-tput`, `Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8`, `Qwen/Qwen3-VL-8B-Instruct`, `Qwen/Qwen3.5-397B-A17B`, `Qwen/Qwen3.5-9B`, `Qwen/Qwen3.6-Plus`, `accounts/fireworks/models/deepseek-v4-pro`, `accounts/fireworks/models/glm-5p1`, `accounts/fireworks/models/gpt-oss-120b`, `accounts/fireworks/models/kimi-k2p5`, `accounts/fireworks/models/kimi-k2p6`, `accounts/fireworks/models/minimax-m2p7`, `accounts/fireworks/models/qwen3-235b-a22b`, `accounts/fireworks/models/qwen3p5-397b-a17b`, `accounts/fireworks/models/qwen3p6-plus`, `amazon.nova-lite-v1:0`, `amazon.nova-micro-v1:0`, `amazon.nova-pro-v1:0`, `amazon.titan-text-express-v1`, `amazon.titan-text-lite-v1`, `chatgpt-4o-latest`, `claude-3-5-haiku-20241022`, `claude-3-7-sonnet-20250219`, `claude-3-haiku-20240307`, `claude-haiku-4-5-20251001`, `claude-opus-4-1-20250805`, `claude-opus-4-20250514`, `claude-opus-4-5-20251101`, `claude-opus-4-6`, `claude-opus-4-7`, `claude-opus-4-8`, `claude-sonnet-4-20250514`, `claude-sonnet-4-5`, `claude-sonnet-4-6`, `command-nightly`, `command-r-08-2024`, `command-r-plus-08-2024`, `deepcogito/cogito-v2-1-671b`, `deepseek-ai/DeepSeek-R1-Distill-Llama-70B`, `deepseek-ai/DeepSeek-V3`, `deepseek-ai/DeepSeek-V4-Pro`, `deepseek-ai/deepseek-llm-67b-chat`, `gemini-2.0-flash-001`, `gemini-2.0-flash-lite-preview-02-05`, `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-3-flash-preview`, `gemini-3-pro-preview`, `gemini-3.1-flash-lite-preview`, `gemini-3.1-pro-preview`, `gemini-3.5-flash`, `gemma2-9b-it`, `google/gemma-2-27b-it`, `google/gemma-2-9b-it`, `google/gemma-2b-it`, `google/gemma-3n-E4B-it`, `google/gemma-4-31B-it`, `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4-turbo-2024-04-09`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-4o`, `gpt-4o-2024-08-06`, `gpt-4o-mini`, `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `gpt-5.1`, `gpt-5.1-codex`, `gpt-5.1-codex-mini`, `gpt-5.2`, `gpt-5.3-codex`, `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.5`, `grok-2`, `grok-2-vision`, `grok-3-beta`, `grok-3-fast-beta`, `grok-3-mini-beta`, `grok-3-mini-fast-beta`, `grok-4`, `grok-4-0629`, `grok-4-0709`, `grok-4-fast-non-reasoning`, `grok-4-fast-reasoning`, `grok-4-latest`, `llama-3.1-8b-instant`, `llama-3.3-70b-versatile`, `meta-llama/Llama-3-70b-chat-hf`, `meta-llama/Llama-3-8b-chat-hf`, `meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.2-3B-Instruct-Turbo`, `meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.3-70B-Instruct-Turbo`, `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`, `meta-llama/Llama-4-Scout-17B-16E-Instruct`, `meta-llama/Meta-Llama-3-70B-Instruct-Lite`, `meta-llama/Meta-Llama-3-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3-8B-Instruct-Lite`, `meta-llama/Meta-Llama-3-8B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo`, `meta.llama3-8b-instruct-v1:0`, `mistralai/Mistral-7B-Instruct-v0.1`, `mistralai/Mistral-7B-Instruct-v0.2`, `mistralai/Mistral-7B-Instruct-v0.3`, `mistralai/Mixtral-8x22B-Instruct-v0.1`, `mistralai/Mixtral-8x7B-Instruct-v0.1`, `mixtral-8x7b-32768`, `moonshotai/Kimi-K2-Instruct`, `moonshotai/Kimi-K2.5`, `moonshotai/Kimi-K2.6`, `o1`, `o3`, `o3-mini`, `o4-mini`, `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `perplexity-ai/r1-1776`, `r1-1776`, `sonar`, `sonar-deep-research`, `sonar-pro`, `sonar-reasoning-pro`, `us.anthropic.claude-haiku-4-5-20251001-v1:0`, `us.anthropic.claude-opus-4-1-20250805-v1:0`, `us.anthropic.claude-opus-4-5-20251101-v1:0`, `us.anthropic.claude-opus-4-6-v1`, `us.anthropic.claude-sonnet-4-20250514-v1:0`, `us.anthropic.claude-sonnet-4-5-20250929-v1:0`, `us.anthropic.claude-sonnet-4-6`, `us.meta.llama3-1-70b-instruct-v1:0`, `us.meta.llama3-1-8b-instruct-v1:0`, `us.meta.llama3-2-11b-instruct-v1:0`, `us.meta.llama3-2-1b-instruct-v1:0`, `us.meta.llama3-2-3b-instruct-v1:0`, `us.meta.llama3-2-90b-instruct-v1:0`, `zai-org/GLM-4.5-Air-FP8`, `zai-org/GLM-5`, `zai-org/GLM-5.1`
  </Expandable>
</ParamField>

<ParamField path="text" type="str" required>
  The text that will be categorized
</ParamField>

<ParamField path="additional_context" type="str" default="''">
  Provide any additional context or instructions
</ParamField>

<ParamField path="fields" type="ListType | list[List[Dict[str, Any]]] | list[NameDescription]" default="[]">
  The fields to be categorized
</ParamField>

<ParamField path="sampling" type="SamplingConfig" />

<ParamField path="max_tokens" type="int">
  The maximum number of tokens to generate
</ParamField>

<ParamField path="temperature" type="float">
  The temperature of the model
</ParamField>

<ParamField path="top_p" type="float">
  The top-p value
</ParamField>

<a id="combine_list" />

## `combine_list` — Combine List

Combine multiple lists into one list. Final list is ordered in the order of the input lists.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").combine_list(list=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="type" type="str" default="'string'">
  The type of the list

  <Expandable title="Allowed values">
    `agent`, `any`, `audio`, `bool`, `dataframe`, `file`, `float`, `image`, `int32`, `json`, `knowledge_base`, `path`, `string`, `timestamp`, `vec&lt;file&gt;`, `vec&lt;string&gt;`
  </Expandable>
</ParamField>

<ParamField path="list" type="ListType | list[List[Any]] | list[List[List[Any]]]" required>
  List to be combined
</ParamField>

<a id="combine_text" />

## `combine_text` — Combine Text

Combine text inputs into a singular output.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").combine_text(text=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="text" type="list[str]" required />

<a id="create_list" />

## `create_list` — Create List

Create a list from input texts. Final list is ordered in the order of the inputs.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").create_list(list=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="type" type="str" default="'string'">
  The type of the list

  <Expandable title="Allowed values">
    `agent`, `any`, `audio`, `bool`, `dataframe`, `file`, `float`, `image`, `int32`, `json`, `knowledge_base`, `path`, `string`, `timestamp`, `vec&lt;file&gt;`, `vec&lt;string&gt;`
  </Expandable>
</ParamField>

<ParamField path="list" type="ListType | list[Any] | list[List[Any]]" required>
  Value to be added to the list
</ParamField>

<a id="csv_reader" />

## `csv_reader` — CSV Reader

Read the contents from a CSV file and output a list of the data for each column.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").csv_reader(selected_file=..., sheet="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="file_type" type="str" default="'CSV'">
  The type of file to read.
  One of: `CSV`, `EXCEL`
</ParamField>

<ParamField path="is_file_variable" type="bool" default="True" />

<ParamField path="processed_outputs" type="dict" default="{}" />

<ParamField path="selected_file" type="AcceptsFile" required>
  The file to read.
</ParamField>

<ParamField path="sheet" type="str" required>
  The Excel sheet to read from.
</ParamField>

<ParamField path="sheets" type="list[str]" default="[]" />

<ParamField path="manual_columns" type="ListType | list[ColumnItem] | list[List[Dict[str, Any]]]" default="[]">
  Define the name(s) of the columns that you want to read
</ParamField>

<ParamField path="columns" type="ListType | list[ColumnItem]" default="[]">
  Define the name(s) of the columns that you want to read
</ParamField>

<a id="csv_to_excel" />

## `csv_to_excel` — CSV To Excel

Convert a CSV file into XLSX.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").csv_to_excel()
  ```
</CodeGroup>

**Parameters**

<ParamField path="csv_file" type="AcceptsFile" />

<ParamField path="horizontal_alignment" type="str" default="'left'">
  One of: `center`, `centerContinuous`, `distributed`, `fill`, `general`, `justify`, `left`, `right`
</ParamField>

<ParamField path="max_column_width" type="int" default="100" />

<ParamField path="vertical_alignment" type="str" default="'top'">
  One of: `bottom`, `center`, `distributed`, `justify`, `top`
</ParamField>

<ParamField path="wrap_text" type="bool" default="True" />

<a id="csv_writer" />

## `csv_writer` — CSV Writer

Create a CSV from data.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").csv_writer()
  ```
</CodeGroup>

**Parameters**

<ParamField path="selected_option" type="str" default="'new'">
  Whether to create a new CSV or update an existing one.
  One of: `new`, `old`
</ParamField>

<ParamField path="load_option" type="str" default="'file'">
  Whether to load the CSV from a file or a string.
  One of: `file`, `text`
</ParamField>

<ParamField path="columns" type="ListType | list[ListNameTypeValue] | list[List[Dict[str, Any]]]" default="[]">
  The columns to write to the CSV.
</ParamField>

<ParamField path="selected_file" type="AcceptsFile">
  The file to update.
</ParamField>

<ParamField path="csv_string" type="str" default="''">
  The CSV string to write.
</ParamField>

<a id="custom_smtp_email_sender" />

## `custom_smtp_email_sender` — Custom Smtp Email Sender

Send emails using a custom SMTP server configuration

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").custom_smtp_email_sender(email_subject="...", recipient_email="...", sender_email="...", sender_password="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="connection_type" type="str" default="'SSL'">
  One of: `SSL`, `STARTTLS`, `TLS`
</ParamField>

<ParamField path="email_body" type="str" default="''" />

<ParamField path="email_subject" type="str" required />

<ParamField path="recipient_email" type="str" required />

<ParamField path="send_as_html" type="bool" default="''" />

<ParamField path="sender_email" type="str" required />

<ParamField path="sender_name" type="str" default="''" />

<ParamField path="sender_password" type="str" required />

<ParamField path="smtp_server" type="str" required />

<ParamField path="smtp_server_port" type="int" default="465" />

<a id="dataframe_aggregate" />

## `dataframe_aggregate` — Dataframe Aggregate

Aggregate data from a dataframe.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").dataframe_aggregate(aggregation_column="...", aggregation_type="AVG", dataframe=..., group_by_columns=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="dataframe_type" type="str" default="'table'">
  The type of dataframe to be used
  One of: `table`
</ParamField>

<ParamField path="aggregation_column" type="str" required>
  Select a numeric column (integer or decimal) to perform aggregation
</ParamField>

<ParamField path="aggregation_type" type="str" required>
  The aggregation to perform
  One of: `AVG`, `COUNT`, `MAX`, `MIN`, `SUM`
</ParamField>

<ParamField path="dataframe" type="AcceptsDataframe" required>
  The dataframe to aggregate
</ParamField>

<ParamField path="group_by_columns" type="list[str]" required>
  The columns to group by
</ParamField>

<a id="dataframe_get_schema" />

## `dataframe_get_schema` — Dataframe Get Schema

Get the schema of a dataframe including columns, types, and constraints.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").dataframe_get_schema(dataframe=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="dataframe_type" type="str" default="'table'">
  The type of dataframe to be used
  One of: `table`
</ParamField>

<ParamField path="dataframe" type="AcceptsDataframe" required>
  The dataframe to get schema from
</ParamField>

<a id="dataframe_nl_query" />

## `dataframe_nl_query` — Dataframe NL Query

Execute natural language queries on dataframes.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").dataframe_nl_query(dataframe=..., nlquery="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="dataframe_type" type="str" default="'table'">
  The type of dataframe to be used
  One of: `table`
</ParamField>

<ParamField path="dataframe" type="AcceptsDataframe" required>
  The dataframe to query using natural language
</ParamField>

<ParamField path="nlquery" type="str" required>
  Ask a question about your data in natural language. Example: What are the top 10 rows?
</ParamField>

<a id="dataframe_operations" />

## `dataframe_operations` — Dataframe Operations

Dataframe Operations

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").dataframe_operations()
  ```
</CodeGroup>

**Parameters**

<ParamField path="sub_type" type="str" default="''" />

<a id="dataframe_raw_query" />

## `dataframe_raw_query` — Dataframe Raw Query

Execute custom queries on dataframes.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").dataframe_raw_query(query="...", dataframe=..., preload=True)
  ```
</CodeGroup>

**Parameters**

<ParamField path="dataframe_type" type="str" default="'table'">
  The type of dataframe to be used
  One of: `table`
</ParamField>

<ParamField path="query" type="str" required>
  SQL query to execute on the dataframe. Use \{df} as the table name placeholder. Example: SELECT \* FROM \{df} limit 10;
</ParamField>

<ParamField path="dataframe" type="AcceptsDataframe" required>
  The dataframe to query
</ParamField>

<ParamField path="preload" type="bool" required>
  Whether to preload dataframe instead of lazy load
</ParamField>

<a id="dataframe_read_columns" />

## `dataframe_read_columns` — Dataframe Read Columns

Read columns from a dataframe.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").dataframe_read_columns(column_name="...", dataframe=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="column_type" type="str" default="'any'">
  The expected type of the column values

  <Expandable title="Allowed values">
    `any`, `audio`, `bool`, `file`, `float`, `image`, `int32`, `knowledge_base`, `list&lt;file&gt;`, `list&lt;string&gt;`, `string`, `timestamp`
  </Expandable>
</ParamField>

<ParamField path="dataframe_type" type="str" default="'table'">
  The type of dataframe to be used
  One of: `table`
</ParamField>

<ParamField path="column_name" type="str" required>
  The name of the column to read
</ParamField>

<ParamField path="dataframe" type="AcceptsDataframe" required />

<a id="duplicate_list" />

## `duplicate_list` — Duplicate List

Create a new list by duplicating a single item with the size of the new list either matching the size of another list, or a specified size.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").duplicate_list(input_field=..., list_size_to_match=..., list_size=0)
  ```
</CodeGroup>

**Parameters**

<ParamField path="specify_list_size" type="bool" default="False">
  Check this box if you want to manually specify the list size. In this case 'Match List Size' will not be used.
</ParamField>

<ParamField path="type" type="str" default="'string'">
  The type of the list

  <Expandable title="Allowed values">
    `agent`, `any`, `audio`, `bool`, `dataframe`, `file`, `float`, `image`, `int32`, `json`, `knowledge_base`, `path`, `string`, `timestamp`, `vec&lt;file&gt;`, `vec&lt;string&gt;`
  </Expandable>
</ParamField>

<ParamField path="input_field" type="Any | ListType | list[Any]" required>
  Item to duplicate
</ParamField>

<ParamField path="list_size_to_match" type="list[str]" required>
  The size of the list you want to match
</ParamField>

<ParamField path="list_size" type="int" required>
  The size of the new list
</ParamField>

<a id="email_notification" />

## `email_notification` — Send email notifications from [no-reply@vectorshiftmail.com](mailto:no-reply@vectorshiftmail.com)

Send email notifications from [no-reply@vectorshiftmail.com](mailto:no-reply@vectorshiftmail.com)

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").email_notification(email_subject="...", recipient_email="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="email_body" type="str" default="''" />

<ParamField path="email_subject" type="str" required />

<ParamField path="recipient_email" type="str" required />

<ParamField path="send_as_html" type="bool" default="''" />

<a id="email_validator" />

## `email_validator` — Validate an email address

Validate an email address

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").email_validator(api_key="...", email_to_validate="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="model" type="str" default="'regex'">
  The validation model to use
  One of: `custom-validator`, `regex`
</ParamField>

<ParamField path="api_key" type="str" required>
  The API key to use
</ParamField>

<ParamField path="email_to_validate" type="str" required>
  The email you want to validate
</ParamField>

<ParamField path="provider" type="str" default="'hunter'">
  The validation provider to use
  One of: `debounce`, `hunter`
</ParamField>

<a id="excel_cell_reader" />

## `excel_cell_reader` — Excel Cell Reader

Read data from an Excel cell.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").excel_cell_reader(cell_index="...", selected_file=..., sheet="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="cell_index" type="str" required />

<ParamField path="read_formatting" type="bool" default="False" />

<ParamField path="selected_file" type="AcceptsFile" required />

<ParamField path="sheet" type="str" required />

<a id="excel_cell_writer" />

## `excel_cell_writer` — Excel Cell Writer

Write data to an Excel cell.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").excel_cell_writer(cell_index="...", cell_value="...", selected_file=..., sheet="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="set_vertical_alignment" type="bool" default="False">
  Whether to set the vertical alignment of the cell.
</ParamField>

<ParamField path="set_horizontal_alignment" type="bool" default="False">
  Whether to set the horizontal alignment of the cell.
</ParamField>

<ParamField path="set_fill_color" type="bool" default="False">
  Whether to set the fill color of the cell.
</ParamField>

<ParamField path="cell_index" type="str" required>
  The cell to read from.
</ParamField>

<ParamField path="cell_value" type="str" required>
  The value to write to the cell.
</ParamField>

<ParamField path="fill_color" type="str" default="'FFFFFF'">
  The fill color of the cell.
</ParamField>

<ParamField path="horizontal_alignment" type="str" default="'left'">
  The horizontal alignment of the cell.
  One of: `center`, `centerContinuous`, `distributed`, `fill`, `general`, `justify`, `left`, `right`
</ParamField>

<ParamField path="selected_file" type="AcceptsFile" required>
  The file to read from.
</ParamField>

<ParamField path="sheet" type="str" required>
  The sheet to read from.
</ParamField>

<ParamField path="vertical_alignment" type="str" default="'bottom'">
  The vertical alignment of the cell.
  One of: `bottom`, `center`, `distributed`, `justify`, `top`
</ParamField>

<a id="excel_file_reader" />

## `excel_file_reader` — Excel File Reader

Read data from an Excel file.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").excel_file_reader(selected_file=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="read_single_sheet" type="bool" default="True">
  Whether to read a single sheet from the Excel file.
</ParamField>

<ParamField path="read_formatting" type="bool" default="False">
  Whether to read the formatting of the cell.
</ParamField>

<ParamField path="read_formula" type="bool" default="False">
  Whether to read the formula of the cell.
</ParamField>

<ParamField path="selected_file" type="AcceptsFile" required>
  The file to read from.
</ParamField>

<ParamField path="sheet" type="str" default="''">
  The sheet to read from.
</ParamField>

<a id="excel_operations" />

## `excel_operations` — Process and manipulate Excel files

Process and manipulate Excel files

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").excel_operations()
  ```
</CodeGroup>

**Parameters**

<ParamField path="sub_type" type="str" default="''" />

<a id="excel_sheets_reader" />

## `excel_sheets_reader` — Excel Sheets Reader

Get list of all sheet names from an Excel file.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").excel_sheets_reader(selected_file=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="selected_file" type="AcceptsFile" required />

<a id="excel_writer" />

## `excel_writer` — Excel Writer

Write data to an Excel sheet.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").excel_writer(cell_start_index="...", cell_values=..., selected_file=..., sheet="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="set_vertical_alignment" type="bool" default="False">
  Whether to set the vertical alignment of the cells.
</ParamField>

<ParamField path="set_horizontal_alignment" type="bool" default="False">
  Whether to set the horizontal alignment of the cells.
</ParamField>

<ParamField path="set_fill_color" type="bool" default="False">
  Whether to set the fill color of the cells.
</ParamField>

<ParamField path="cell_start_index" type="str" required>
  The cell to start writing from.
</ParamField>

<ParamField path="cell_values" type="list[str]" required>
  The values to write to the cells.
</ParamField>

<ParamField path="fill_color" type="str" default="'FFFFFF'">
  The fill color of the cells.
</ParamField>

<ParamField path="horizontal_alignment" type="str" default="'left'">
  The horizontal alignment of the cells.
  One of: `center`, `centerContinuous`, `distributed`, `fill`, `general`, `justify`, `left`, `right`
</ParamField>

<ParamField path="selected_file" type="AcceptsFile" required>
  The file to write to.
</ParamField>

<ParamField path="sheet" type="str" required>
  The sheet to write to.
</ParamField>

<ParamField path="vertical_alignment" type="str" default="'bottom'">
  The vertical alignment of the cells.
  One of: `bottom`, `center`, `distributed`, `justify`, `top`
</ParamField>

<a id="extract_data" />

## `extract_data` — Extract Data

Extract key pieces of information or a list of information from a input text.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").extract_data(text="...", fields=..., processed_outputs=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="model" type="str" default="'gpt-4o'" />

<ParamField path="text" type="str" required />

<ParamField path="additional_context" type="str" default="''" />

<ParamField path="fields" type="ListType | list[List[Dict[str, Any]]] | list[NameTypeDescription]" required />

<ParamField path="processed_outputs" type="dict" required />

<ParamField path="provider" type="str" default="'openai'" />

<a id="extract_to_table" />

## `extract_to_table` — Extract To Table

Extract data to a CSV using AI

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").extract_to_table(file=..., text_for_extraction="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="model" type="str" default="'gpt-4o'">
  One of: `gpt-4o`, `gpt-4o-2024-08-06`, `gpt-4o-mini`
</ParamField>

<ParamField path="add_columns_manually" type="bool" default="False" />

<ParamField path="additional_context" type="str" default="''" />

<ParamField path="extract_multiple_rows" type="bool" default="True" />

<ParamField path="file" type="AcceptsFile" required />

<ParamField path="manual_columns" type="ListType | list[ColumnEntry] | list[List[Dict[str, Any]]]" default="[]" />

<ParamField path="provider" type="str" default="'openai'">
  One of: `openai`
</ParamField>

<ParamField path="text_for_extraction" type="str" required />

<a id="file_operations" />

## `file_operations` — Process and manipulate files

Process and manipulate files

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").file_operations()
  ```
</CodeGroup>

**Parameters**

<ParamField path="sub_type" type="str" default="''" />

<a id="file_to_text" />

## `file_to_text` — File To Text

Convert data from type File to type Text

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").file_to_text(file=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="chunk_text" type="bool" default="False">
  Whether to chunk the text into smaller pieces.
</ParamField>

<ParamField path="decrypt" type="bool" default="False">
  Use a password to decrypt the file.
</ParamField>

<ParamField path="file" type="AcceptsFile" required>
  The file to convert to text.
</ParamField>

<ParamField path="file_parser" type="str" default="'default'">
  The type of file parser to use.
  One of: `contextual_ai`, `default`, `docling`, `llama_parse`, `mistral_ocr`, `reducto`, `textract`
</ParamField>

<ParamField path="password" type="str" default="''">
  The password to decrypt the file.
</ParamField>

<ParamField path="chunk_overlap" type="int" default="400">
  The overlap of each chunk of text.
</ParamField>

<ParamField path="chunk_size" type="int" default="1024">
  The size of each chunk of text.
</ParamField>

<a id="filter_list" />

## `filter_list` — Filter List

Filter items in a list given a specific condition. Example, Filter (Red, White, Blue) by (100, 95, 80)>90 is (Red, White)

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").filter_list(condition_type="Equal", filter_by=..., list_to_filter=..., output_blank_value=True)
  ```
</CodeGroup>

**Parameters**

<ParamField path="filter_mode" type="str" default="'single'">
  Choose whether to filter a single list or filter by another list
  One of: `another`, `single`
</ParamField>

<ParamField path="type" type="str" default="'string'">
  The type of the list

  <Expandable title="Allowed values">
    `agent`, `any`, `audio`, `bool`, `dataframe`, `file`, `float`, `image`, `int32`, `json`, `knowledge_base`, `path`, `string`, `timestamp`, `vec&lt;file&gt;`, `vec&lt;string&gt;`
  </Expandable>
</ParamField>

<ParamField path="condition_type" type="str" required>
  The type of condition to apply

  <Expandable title="Allowed values">
    `Equal`, `GreaterThan`, `IsEmpty`, `IsFalse`, `IsNotEmpty`, `IsTrue`, `LessThan`, `TextContains`, `TextDoesNotContains`, `TextDoesNotEndWith`, `TextDoesNotStartWith`, `TextEndsWith`, `TextStartsWith`, `VecContainsItem`, `VecDoesNotContainsItem`
  </Expandable>
</ParamField>

<ParamField path="condition_value" type="str" default="''">
  The value to compare the list items against
</ParamField>

<ParamField path="filter_by" type="ListType | list[Any] | list[List[Any]]" required>
  The items to filter the list by
</ParamField>

<ParamField path="list_to_filter" type="ListType | list[Any] | list[List[Any]]" required>
  The list to filter
</ParamField>

<ParamField path="output_blank_value" type="bool" required>
  If true, output a blank value for values that do not meet the filter condition. If false, nothing will be outputted
</ParamField>

<a id="find_and_replace" />

## `find_and_replace` — Find And Replace

Find and replace words in a given text

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").find_and_replace(text_to_manipulate="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="replacements" type="ListType | list[FindReplace] | list[List[Dict[str, Any]]]" default="[]" />

<ParamField path="text_to_manipulate" type="str" required />

<a id="flatten_list" />

## `flatten_list` — Flatten List

Flatten list of lists into a single list. For example, \[\[a, b], \[c, d]] becomes \[a,b,c,d].

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").flatten_list(list_of_lists=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="type" type="str" default="'string'">
  The type of the list

  <Expandable title="Allowed values">
    `agent`, `any`, `audio`, `bool`, `dataframe`, `file`, `float`, `image`, `int32`, `json`, `knowledge_base`, `path`, `string`, `timestamp`, `vec&lt;file&gt;`, `vec&lt;string&gt;`
  </Expandable>
</ParamField>

<ParamField path="list_of_lists" type="ListType | list[List[Any]] | list[List[List[Any]]]" required>
  List of lists to be flattened
</ParamField>

<a id="generate_chart" />

## `generate_chart` — Generate Chart

Use this to generate a chart from. Convert a tabular file, dataframe or table to a chart or graph visualization. Supports bar, line, pie, scatter, and donut charts/graphs.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").generate_chart(dataframe=..., dataframe_column_names="...", dataframe_type="csv", title="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="chart_type" type="str" default="'bar'">
  The type of chart to generate (bar, line, pie, scatter, donut)
  One of: `bar`, `donut`, `line`, `pie`, `scatter`, `time_series`
</ParamField>

<ParamField path="aggregation" type="str" default="'sum'">
  How to aggregate values when there are multiple data points per category
  One of: `average`, `count`, `max`, `min`, `sum`
</ParamField>

<ParamField path="chart_description" type="str" default="''">
  A brief description or subtitle explaining what the chart shows
</ParamField>

<ParamField path="dataframe" type="AcceptsDataframe" required>
  The dataframe to visualize as a chart. In case of csv, the input should be a properly formatted valid csv string with appropriate headers. When chaining from a tool that returned a CSV file (e.g. fetch\_ratios.table), set dataframe\_type="file" and pass \$action.\<id>.table — never paste the upstream formatted\_text/XML here.
</ParamField>

<ParamField path="dataframe_column_names" type="str" required>
  Actual column names from the dataframe. It should be a string representing the comma separated list of column names.
</ParamField>

<ParamField path="dataframe_type" type="str" required>
  The type of dataframe to be used. Only available options are table, csv, md, json, file.
  One of: `csv`, `file`, `json`, `md`, `table`
</ParamField>

<ParamField path="legend_orientation" type="str" default="'right'">
  Where to display the chart legend
  One of: `bottom`, `hidden`, `left`, `right`, `top`
</ParamField>

<ParamField path="sort_order" type="str" default="'ascending'">
  The order to sort the data
  One of: `ascending`, `descending`
</ParamField>

<ParamField path="title" type="str" required>
  The title to display on the chart
</ParamField>

<ParamField path="x_axis_field" type="str" required>
  The column name to use for the X-axis (categories). Must EXACTLY match (case-sensitive) one of the column names from the CSV header.
</ParamField>

<ParamField path="x_axis_label" type="str" default="''">
  The label to display on the X-axis. Defaults to the field name if not provided.
</ParamField>

<ParamField path="y_axis_fields" type="str" required>
  Column name(s) for Y-axis values. Must EXACTLY match (case-sensitive) column name(s) from the CSV header. For multi-series charts (multiple lines/bars), use comma-separated names like 'revenue,profit,cost'.
</ParamField>

<ParamField path="y_axis_label" type="str" default="''">
  The label to display on the Y-axis
</ParamField>

<ParamField path="currency_symbol" type="str" default="''">
  Currency symbol (only used with currency format)
  One of: \`\`, `eur`, `gbp`, `jpy`, `usd`
</ParamField>

<ParamField path="default_time_period" type="str" default="'max'">
  Initial time period tab selection
  One of: `1m`, `1y`, `5y`, `6m`, `max`, `ytd`
</ParamField>

<ParamField path="number_format" type="str" default="'number'">
  How to format values
  One of: `currency`, `number`, `percent`, `ratio`
</ParamField>

<ParamField path="series_icon_urls" type="str" default="''">
  Comma-separated icon URLs for each series (company logos, game art, product images, etc.), in same order as y\_axis\_fields. Leave empty for no icons.
</ParamField>

<ParamField path="series_labels" type="str" default="''">
  Comma-separated display names for each Y-axis field, in same order as y\_axis\_fields (e.g. 'MSFT,NVDA' for tickers, 'Halo,Fortnite' for games, 'US,EU,APAC' for regions).
</ParamField>

<ParamField path="show_percent_change" type="str" default="'false'">
  Set to 'true' to show Original/% Change toggle
</ParamField>

<ParamField path="unit_suffix" type="str" default="''">
  Scale suffix for values
  One of: \`\`, `b`, `k`, `m`, `t`
</ParamField>

<a id="get_list_item" />

## `get_list_item` — Get List Item

Get a value from a list given an index. The first item in the list is index 0.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").get_list_item(index=0, list=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="type" type="str" default="'string'">
  The type of the list

  <Expandable title="Allowed values">
    `agent`, `any`, `audio`, `bool`, `dataframe`, `file`, `float`, `image`, `int32`, `json`, `knowledge_base`, `path`, `string`, `timestamp`, `vec&lt;file&gt;`, `vec&lt;string&gt;`
  </Expandable>
</ParamField>

<ParamField path="index" type="int" required>
  The index of the item to retrieve
</ParamField>

<ParamField path="list" type="ListType | list[Any] | list[List[Any]]" required>
  The list to retrieve the item from
</ParamField>

<a id="join_list_item" />

## `join_list_item` — Join List Item

Join a list of items into a single piece of text. For example, with / as the separator, \['a', 'b', 'c'] becomes 'a/b/c'

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").join_list_item(list=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="join_by_newline" type="bool" default="False">
  Separate each line in the final output with a new line
</ParamField>

<ParamField path="type" type="str" default="'string'">
  The type of the list

  <Expandable title="Allowed values">
    `agent`, `any`, `audio`, `bool`, `dataframe`, `file`, `float`, `image`, `int32`, `json`, `knowledge_base`, `path`, `string`, `timestamp`, `vec&lt;file&gt;`, `vec&lt;string&gt;`
  </Expandable>
</ParamField>

<ParamField path="join_characters" type="str" default="''">
  Use a specified character to join list items into a single string
</ParamField>

<ParamField path="list" type="ListType | list[Any] | list[List[Any]]" required>
  List of items to be joined
</ParamField>

<a id="json_operations" />

## `json_operations` — JSON Operations

Read, create, and update JSON data

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").json_operations()
  ```
</CodeGroup>

**Parameters**

<ParamField path="sub_type" type="str" default="''" />

<a id="list_deduplicator" />

## `list_deduplicator` — List Deduplicator

Remove duplicate items from a list. Outputs a list of unique items.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").list_deduplicator(list=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="type" type="str" default="'string'">
  The type of the list
  One of: `bool`, `float`, `int32`, `string`, `timestamp`
</ParamField>

<ParamField path="list" type="ListType | list[Any] | list[List[Any]]" required>
  The list to deduplicate
</ParamField>

<a id="list_operations" />

## `list_operations` — Process and manipulate lists

Process and manipulate lists

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").list_operations()
  ```
</CodeGroup>

**Parameters**

<ParamField path="sub_type" type="str" default="''" />

<a id="list_trimmer" />

## `list_trimmer` — List Trimmer

Trim a list to just the sections you want. Enter enter the number of items or specify the section of the list that you want to keep.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").list_trimmer(end_index=0, list=..., start_index=0, item_to_keep=0)
  ```
</CodeGroup>

**Parameters**

<ParamField path="specify_section" type="bool" default="False">
  Check this to specify a section of the list to keep. Leave unchecked to keep a specified number of items from the start.
</ParamField>

<ParamField path="type" type="str" default="'string'">
  The type of the list

  <Expandable title="Allowed values">
    `agent`, `any`, `audio`, `bool`, `dataframe`, `file`, `float`, `image`, `int32`, `json`, `knowledge_base`, `path`, `string`, `timestamp`, `vec&lt;file&gt;`, `vec&lt;string&gt;`
  </Expandable>
</ParamField>

<ParamField path="end_index" type="int" required>
  The ending index of the section to keep (exclusive).
</ParamField>

<ParamField path="list" type="ListType | list[Any] | list[List[Any]]" required>
  The list to trim
</ParamField>

<ParamField path="start_index" type="int" required>
  The starting index of the section to keep (inclusive). The first item of the list is index 0.
</ParamField>

<ParamField path="item_to_keep" type="int" required>
  Check this to specify a section of the list to keep. Leave unchecked to keep a specified number of items.
</ParamField>

<a id="notifications" />

## `notifications` — Notifications

Send alerts and notifications via different channels

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").notifications()
  ```
</CodeGroup>

**Parameters**

<ParamField path="sub_type" type="str" default="''" />

<a id="read_json_values" />

## `read_json_values` — Read JSON Values

Read values from a JSON object based on a provided key(s).

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").read_json_values(json_string="...", keys=..., processed_outputs=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="json_string" type="str" required />

<ParamField path="keys" type="ListType | list[KeyItem] | list[List[Dict[str, Any]]]" required />

<ParamField path="processed_outputs" type="dict" required />

<a id="rename_file" />

## `rename_file` — Rename File

Rename an existing file, assigning a new name along with the file extension.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").rename_file(file=..., new_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="file" type="AcceptsFile" required />

<ParamField path="new_name" type="str" required />

<a id="sales_data_enrichment" />

## `sales_data_enrichment` — Sales Data Enrichment

Enhance sales data with validation and enrichment processes

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").sales_data_enrichment()
  ```
</CodeGroup>

**Parameters**

<ParamField path="sub_type" type="str" default="''" />

<a id="scorer" />

## `scorer` — Scorer

Assign a numerical score based on predefined criteria to quantitatively assess a given entity.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").scorer(provider="anthropic", text="...", criteria="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="justification" type="bool" default="False">
  Include the AI's justification for its score
</ParamField>

<ParamField path="provider" type="str" required>
  The model provider

  <Expandable title="Allowed values">
    `anthropic`, `azure`, `bedrock`, `cohere`, `custom`, `fireworks`, `google`, `groq`, `openai`, `perplexity`, `together`, `xai`
  </Expandable>
</ParamField>

<ParamField path="model" type="str" default="''">
  The specific model for scoring

  <Expandable title="Allowed values">
    `MiniMaxAI/MiniMax-M2.5`, `MiniMaxAI/MiniMax-M2.7`, `Qwen/QwQ-32B-Preview`, `Qwen/Qwen2.5-72B-Instruct-Turbo-lora`, `Qwen/Qwen2.5-7B-Instruct-Turbo`, `Qwen/Qwen3-235B-A22B-Instruct-2507-tput`, `Qwen/Qwen3-235B-A22B-fp8-tput`, `Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8`, `Qwen/Qwen3-VL-8B-Instruct`, `Qwen/Qwen3.5-397B-A17B`, `Qwen/Qwen3.5-9B`, `Qwen/Qwen3.6-Plus`, `accounts/fireworks/models/deepseek-v4-pro`, `accounts/fireworks/models/glm-5p1`, `accounts/fireworks/models/gpt-oss-120b`, `accounts/fireworks/models/kimi-k2p5`, `accounts/fireworks/models/kimi-k2p6`, `accounts/fireworks/models/minimax-m2p7`, `accounts/fireworks/models/qwen3-235b-a22b`, `accounts/fireworks/models/qwen3p5-397b-a17b`, `accounts/fireworks/models/qwen3p6-plus`, `amazon.nova-lite-v1:0`, `amazon.nova-micro-v1:0`, `amazon.nova-pro-v1:0`, `amazon.titan-text-express-v1`, `amazon.titan-text-lite-v1`, `chatgpt-4o-latest`, `claude-3-5-haiku-20241022`, `claude-3-7-sonnet-20250219`, `claude-3-haiku-20240307`, `claude-haiku-4-5-20251001`, `claude-opus-4-1-20250805`, `claude-opus-4-20250514`, `claude-opus-4-5-20251101`, `claude-opus-4-6`, `claude-opus-4-7`, `claude-opus-4-8`, `claude-sonnet-4-20250514`, `claude-sonnet-4-5`, `claude-sonnet-4-6`, `command-nightly`, `command-r-08-2024`, `command-r-plus-08-2024`, `deepcogito/cogito-v2-1-671b`, `deepseek-ai/DeepSeek-R1-Distill-Llama-70B`, `deepseek-ai/DeepSeek-V3`, `deepseek-ai/DeepSeek-V4-Pro`, `deepseek-ai/deepseek-llm-67b-chat`, `gemini-2.0-flash-001`, `gemini-2.0-flash-lite-preview-02-05`, `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-3-flash-preview`, `gemini-3-pro-preview`, `gemini-3.1-flash-lite-preview`, `gemini-3.1-pro-preview`, `gemini-3.5-flash`, `gemma2-9b-it`, `google/gemma-2-27b-it`, `google/gemma-2-9b-it`, `google/gemma-2b-it`, `google/gemma-3n-E4B-it`, `google/gemma-4-31B-it`, `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4-turbo-2024-04-09`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-4o`, `gpt-4o-2024-08-06`, `gpt-4o-mini`, `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `gpt-5.1`, `gpt-5.1-codex`, `gpt-5.1-codex-mini`, `gpt-5.2`, `gpt-5.3-codex`, `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.5`, `grok-2`, `grok-2-vision`, `grok-3-beta`, `grok-3-fast-beta`, `grok-3-mini-beta`, `grok-3-mini-fast-beta`, `grok-4`, `grok-4-0629`, `grok-4-0709`, `grok-4-fast-non-reasoning`, `grok-4-fast-reasoning`, `grok-4-latest`, `llama-3.1-8b-instant`, `llama-3.3-70b-versatile`, `meta-llama/Llama-3-70b-chat-hf`, `meta-llama/Llama-3-8b-chat-hf`, `meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.2-3B-Instruct-Turbo`, `meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.3-70B-Instruct-Turbo`, `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`, `meta-llama/Llama-4-Scout-17B-16E-Instruct`, `meta-llama/Meta-Llama-3-70B-Instruct-Lite`, `meta-llama/Meta-Llama-3-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3-8B-Instruct-Lite`, `meta-llama/Meta-Llama-3-8B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo`, `meta.llama3-8b-instruct-v1:0`, `mistralai/Mistral-7B-Instruct-v0.1`, `mistralai/Mistral-7B-Instruct-v0.2`, `mistralai/Mistral-7B-Instruct-v0.3`, `mistralai/Mixtral-8x22B-Instruct-v0.1`, `mistralai/Mixtral-8x7B-Instruct-v0.1`, `mixtral-8x7b-32768`, `moonshotai/Kimi-K2-Instruct`, `moonshotai/Kimi-K2.5`, `moonshotai/Kimi-K2.6`, `o1`, `o3`, `o3-mini`, `o4-mini`, `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `perplexity-ai/r1-1776`, `r1-1776`, `sonar`, `sonar-deep-research`, `sonar-pro`, `sonar-reasoning-pro`, `us.anthropic.claude-haiku-4-5-20251001-v1:0`, `us.anthropic.claude-opus-4-1-20250805-v1:0`, `us.anthropic.claude-opus-4-5-20251101-v1:0`, `us.anthropic.claude-opus-4-6-v1`, `us.anthropic.claude-sonnet-4-20250514-v1:0`, `us.anthropic.claude-sonnet-4-5-20250929-v1:0`, `us.anthropic.claude-sonnet-4-6`, `us.meta.llama3-1-70b-instruct-v1:0`, `us.meta.llama3-1-8b-instruct-v1:0`, `us.meta.llama3-2-11b-instruct-v1:0`, `us.meta.llama3-2-1b-instruct-v1:0`, `us.meta.llama3-2-3b-instruct-v1:0`, `us.meta.llama3-2-90b-instruct-v1:0`, `zai-org/GLM-4.5-Air-FP8`, `zai-org/GLM-5`, `zai-org/GLM-5.1`
  </Expandable>
</ParamField>

<ParamField path="text" type="str" required>
  The text that will be scored
</ParamField>

<ParamField path="additional_context" type="str" default="''">
  Provide any additional context or instructions
</ParamField>

<ParamField path="criteria" type="str" required>
  The criteria that the text will be scored
</ParamField>

<ParamField path="sampling" type="SamplingConfig" />

<ParamField path="max_tokens" type="Any" />

<ParamField path="temperature" type="Any" />

<ParamField path="top_p" type="Any" />

<a id="sms_notification" />

## `sms_notification` — Send text message notifications

Send text message notifications

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").sms_notification(message="...", phone_number="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="message" type="str" required />

<ParamField path="phone_number" type="str" required />

<a id="sort_csv" />

## `sort_csv` — Sort CSV

Sort a CSV based on a column

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").sort_csv(file=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="is_file_variable" type="bool" default="True">
  Whether the file is a variable.
</ParamField>

<ParamField path="has_headers" type="bool" default="True">
  Whether the CSV has headers.
</ParamField>

<ParamField path="column_index" type="int" default="0">
  The index of the column to sort by.
</ParamField>

<ParamField path="file" type="AcceptsFile" required>
  The CSV file to sort.
</ParamField>

<ParamField path="reverse_sort" type="bool" default="False">
  Whether to reverse the sort.
</ParamField>

<ParamField path="column_to_sort_by" type="str" default="''">
  The column to sort by.
</ParamField>

<a id="split_text" />

## `split_text` — Split Text

Takes input text and separate it into a List of texts based on the delimiter.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").split_text(text="...", character="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="delimiter" type="str" default="'space'">
  The delimiter to split the text on
  One of: `character(s)`, `newline`, `space`
</ParamField>

<ParamField path="text" type="str" required>
  The text to split
</ParamField>

<ParamField path="character" type="str" required>
  The character(s) to split the text on
</ParamField>

<a id="summarizer" />

## `summarizer` — Summarizer

Summarize large texts using AI.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").summarizer(provider="anthropic", text="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="provider" type="str" required>
  The model provider

  <Expandable title="Allowed values">
    `anthropic`, `aws`, `azure`, `bedrock`, `cohere`, `custom`, `fireworks`, `google`, `groq`, `openai`, `perplexity`, `together`, `xai`
  </Expandable>
</ParamField>

<ParamField path="model" type="str" default="''">
  The specific model for summarization

  <Expandable title="Allowed values">
    `MiniMaxAI/MiniMax-M2.5`, `MiniMaxAI/MiniMax-M2.7`, `Qwen/QwQ-32B-Preview`, `Qwen/Qwen2.5-72B-Instruct-Turbo-lora`, `Qwen/Qwen2.5-7B-Instruct-Turbo`, `Qwen/Qwen3-235B-A22B-Instruct-2507-tput`, `Qwen/Qwen3-235B-A22B-fp8-tput`, `Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8`, `Qwen/Qwen3-VL-8B-Instruct`, `Qwen/Qwen3.5-397B-A17B`, `Qwen/Qwen3.5-9B`, `Qwen/Qwen3.6-Plus`, `accounts/fireworks/models/deepseek-v4-pro`, `accounts/fireworks/models/glm-5p1`, `accounts/fireworks/models/gpt-oss-120b`, `accounts/fireworks/models/kimi-k2p5`, `accounts/fireworks/models/kimi-k2p6`, `accounts/fireworks/models/minimax-m2p7`, `accounts/fireworks/models/qwen3-235b-a22b`, `accounts/fireworks/models/qwen3p5-397b-a17b`, `accounts/fireworks/models/qwen3p6-plus`, `amazon.nova-lite-v1:0`, `amazon.nova-micro-v1:0`, `amazon.nova-pro-v1:0`, `amazon.titan-text-express-v1`, `amazon.titan-text-lite-v1`, `chatgpt-4o-latest`, `claude-3-5-haiku-20241022`, `claude-3-7-sonnet-20250219`, `claude-3-haiku-20240307`, `claude-haiku-4-5-20251001`, `claude-opus-4-1-20250805`, `claude-opus-4-20250514`, `claude-opus-4-5-20251101`, `claude-opus-4-6`, `claude-opus-4-7`, `claude-opus-4-8`, `claude-sonnet-4-20250514`, `claude-sonnet-4-5`, `claude-sonnet-4-6`, `command-nightly`, `command-r-08-2024`, `command-r-plus-08-2024`, `deepcogito/cogito-v2-1-671b`, `deepseek-ai/DeepSeek-R1-Distill-Llama-70B`, `deepseek-ai/DeepSeek-V3`, `deepseek-ai/DeepSeek-V4-Pro`, `deepseek-ai/deepseek-llm-67b-chat`, `gemini-2.0-flash-001`, `gemini-2.0-flash-lite-preview-02-05`, `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-3-flash-preview`, `gemini-3-pro-preview`, `gemini-3.1-flash-lite-preview`, `gemini-3.1-pro-preview`, `gemini-3.5-flash`, `gemma2-9b-it`, `google/gemma-2-27b-it`, `google/gemma-2-9b-it`, `google/gemma-2b-it`, `google/gemma-3n-E4B-it`, `google/gemma-4-31B-it`, `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4-turbo-2024-04-09`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-4o`, `gpt-4o-2024-08-06`, `gpt-4o-mini`, `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `gpt-5.1`, `gpt-5.1-codex`, `gpt-5.1-codex-mini`, `gpt-5.2`, `gpt-5.3-codex`, `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.5`, `grok-2`, `grok-2-vision`, `grok-3-beta`, `grok-3-fast-beta`, `grok-3-mini-beta`, `grok-3-mini-fast-beta`, `grok-4`, `grok-4-0629`, `grok-4-0709`, `grok-4-fast-non-reasoning`, `grok-4-fast-reasoning`, `grok-4-latest`, `llama-3.1-8b-instant`, `llama-3.3-70b-versatile`, `meta-llama/Llama-3-70b-chat-hf`, `meta-llama/Llama-3-8b-chat-hf`, `meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.2-3B-Instruct-Turbo`, `meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.3-70B-Instruct-Turbo`, `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`, `meta-llama/Llama-4-Scout-17B-16E-Instruct`, `meta-llama/Meta-Llama-3-70B-Instruct-Lite`, `meta-llama/Meta-Llama-3-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3-8B-Instruct-Lite`, `meta-llama/Meta-Llama-3-8B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo`, `meta.llama3-8b-instruct-v1:0`, `mistralai/Mistral-7B-Instruct-v0.1`, `mistralai/Mistral-7B-Instruct-v0.2`, `mistralai/Mistral-7B-Instruct-v0.3`, `mistralai/Mixtral-8x22B-Instruct-v0.1`, `mistralai/Mixtral-8x7B-Instruct-v0.1`, `mixtral-8x7b-32768`, `moonshotai/Kimi-K2-Instruct`, `moonshotai/Kimi-K2.5`, `moonshotai/Kimi-K2.6`, `o1`, `o3`, `o3-mini`, `o4-mini`, `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `perplexity-ai/r1-1776`, `r1-1776`, `sonar`, `sonar-deep-research`, `sonar-pro`, `sonar-reasoning-pro`, `us.anthropic.claude-haiku-4-5-20251001-v1:0`, `us.anthropic.claude-opus-4-1-20250805-v1:0`, `us.anthropic.claude-opus-4-5-20251101-v1:0`, `us.anthropic.claude-opus-4-6-v1`, `us.anthropic.claude-sonnet-4-20250514-v1:0`, `us.anthropic.claude-sonnet-4-5-20250929-v1:0`, `us.anthropic.claude-sonnet-4-6`, `us.meta.llama3-1-70b-instruct-v1:0`, `us.meta.llama3-1-8b-instruct-v1:0`, `us.meta.llama3-2-11b-instruct-v1:0`, `us.meta.llama3-2-1b-instruct-v1:0`, `us.meta.llama3-2-3b-instruct-v1:0`, `us.meta.llama3-2-90b-instruct-v1:0`, `zai-org/GLM-4.5-Air-FP8`, `zai-org/GLM-5`, `zai-org/GLM-5.1`
  </Expandable>
</ParamField>

<ParamField path="text" type="str" required>
  The text to be summarized
</ParamField>

<ParamField path="sampling" type="SamplingConfig" />

<ParamField path="max_tokens" type="Any" />

<ParamField path="temperature" type="Any" />

<ParamField path="top_p" type="Any" />

<a id="table" />

## `table` — Table

Table

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").table()
  ```
</CodeGroup>

**Parameters**

<ParamField path="sub_type" type="str" default="''" />

<a id="table_add_columns" />

## `table_add_columns` — Table Add Columns

Add one or more columns to a table.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").table_add_columns(table=..., columns=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="table" type="AcceptsTable" required />

<ParamField path="columns" type="dict" required />

<a id="table_add_row" />

## `table_add_row` — Table Add Row

Add New Row to Table.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").table_add_row(table=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="table" type="AcceptsTable" required />

<a id="table_aggregate" />

## `table_aggregate` — Table Aggregate

Aggregate data from a table.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").table_aggregate(aggregation_column="...", aggregation_type="AVG", dataframe=..., group_by_columns=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="aggregation_column" type="str" required />

<ParamField path="aggregation_type" type="str" required>
  One of: `AVG`, `COUNT`, `MAX`, `MIN`, `SUM`
</ParamField>

<ParamField path="dataframe" type="AcceptsTable" required />

<ParamField path="group_by_columns" type="list[str]" required />

<a id="table_delete_columns" />

## `table_delete_columns` — Table Delete Columns

Delete one or more columns from a table.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").table_delete_columns(table=..., columns=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="table" type="AcceptsTable" required />

<ParamField path="columns" type="list[str]" required />

<a id="table_delete_values" />

## `table_delete_values` — Table Delete Values

Delete rows matching a filter.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").table_delete_values(table=..., filters="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="table" type="AcceptsTable" required />

<ParamField path="filters" type="str" required />

<a id="table_read_columns" />

## `table_read_columns` — Table Read Columns

Select column in table to read as list.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").table_read_columns(column_name="...", dataframe=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="column_type" type="str" default="'any'">
  The expected type of the column values

  <Expandable title="Allowed values">
    `any`, `audio`, `bool`, `file`, `float`, `image`, `int32`, `knowledge_base`, `list&lt;file&gt;`, `list&lt;string&gt;`, `string`, `timestamp`
  </Expandable>
</ParamField>

<ParamField path="column_name" type="str" required>
  The name of the column to read
</ParamField>

<ParamField path="dataframe" type="AcceptsTable" required>
  The table to read from
</ParamField>

<a id="table_rename_column" />

## `table_rename_column` — Table Rename Column

Rename a column in a table.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").table_rename_column(table=..., column="...", new_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="table" type="AcceptsTable" required />

<ParamField path="column" type="str" required />

<ParamField path="new_name" type="str" required />

<a id="table_update_values" />

## `table_update_values` — Table Update Values

Update the values in rows matching a filter.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").table_update_values(table=..., filters="...", values=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="table" type="AcceptsTable" required />

<ParamField path="filters" type="str" required />

<ParamField path="values" type="dict" required />

<a id="text_formatter" />

## `text_formatter` — Text Formatter

Format text based off a specified formatter

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").text_formatter(text="...", max_num_token=0)
  ```
</CodeGroup>

**Parameters**

<ParamField path="formatter" type="str" default="'To Uppercase'">
  The formatter to apply to the text
  One of: `To Lowercase`, `To Propercase`, `To Uppercase`, `Trim Spaces`, `Truncate`
</ParamField>

<ParamField path="text" type="str" required>
  The text to format
</ParamField>

<ParamField path="max_num_token" type="int" required>
  The maximum number of tokens to truncate the text to
</ParamField>

<a id="text_manipulation" />

## `text_manipulation` — Process and manipulate text

Process and manipulate text

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").text_manipulation()
  ```
</CodeGroup>

**Parameters**

<ParamField path="sub_type" type="str" default="''" />

<a id="text_to_file" />

## `text_to_file` — Text To File

Convert data from type Text to type File.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").text_to_file(text="...", file_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="text" type="str" required />

<ParamField path="file_name" type="str" required />

<ParamField path="file_type" type="str" default="'PDF'">
  One of: `DOCX`, `PDF`, `TXT`
</ParamField>

<a id="translator" />

## `translator` — Translator

Translate text from one language to another.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").translator(provider="anthropic", text="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="provider" type="str" required>
  The model provider

  <Expandable title="Allowed values">
    `anthropic`, `azure`, `bedrock`, `cohere`, `custom`, `fireworks`, `google`, `groq`, `openai`, `perplexity`, `together`, `xai`
  </Expandable>
</ParamField>

<ParamField path="model" type="str" default="''">
  The specific model for translation

  <Expandable title="Allowed values">
    `MiniMaxAI/MiniMax-M2.5`, `MiniMaxAI/MiniMax-M2.7`, `Qwen/QwQ-32B-Preview`, `Qwen/Qwen2.5-72B-Instruct-Turbo-lora`, `Qwen/Qwen2.5-7B-Instruct-Turbo`, `Qwen/Qwen3-235B-A22B-Instruct-2507-tput`, `Qwen/Qwen3-235B-A22B-fp8-tput`, `Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8`, `Qwen/Qwen3-VL-8B-Instruct`, `Qwen/Qwen3.5-397B-A17B`, `Qwen/Qwen3.5-9B`, `Qwen/Qwen3.6-Plus`, `accounts/fireworks/models/deepseek-v4-pro`, `accounts/fireworks/models/glm-5p1`, `accounts/fireworks/models/gpt-oss-120b`, `accounts/fireworks/models/kimi-k2p5`, `accounts/fireworks/models/kimi-k2p6`, `accounts/fireworks/models/minimax-m2p7`, `accounts/fireworks/models/qwen3-235b-a22b`, `accounts/fireworks/models/qwen3p5-397b-a17b`, `accounts/fireworks/models/qwen3p6-plus`, `amazon.nova-lite-v1:0`, `amazon.nova-micro-v1:0`, `amazon.nova-pro-v1:0`, `amazon.titan-text-express-v1`, `amazon.titan-text-lite-v1`, `chatgpt-4o-latest`, `claude-3-5-haiku-20241022`, `claude-3-7-sonnet-20250219`, `claude-3-haiku-20240307`, `claude-haiku-4-5-20251001`, `claude-opus-4-1-20250805`, `claude-opus-4-20250514`, `claude-opus-4-5-20251101`, `claude-opus-4-6`, `claude-opus-4-7`, `claude-opus-4-8`, `claude-sonnet-4-20250514`, `claude-sonnet-4-5`, `claude-sonnet-4-6`, `command-nightly`, `command-r-08-2024`, `command-r-plus-08-2024`, `deepcogito/cogito-v2-1-671b`, `deepseek-ai/DeepSeek-R1-Distill-Llama-70B`, `deepseek-ai/DeepSeek-V3`, `deepseek-ai/DeepSeek-V4-Pro`, `deepseek-ai/deepseek-llm-67b-chat`, `gemini-2.0-flash-001`, `gemini-2.0-flash-lite-preview-02-05`, `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-3-flash-preview`, `gemini-3-pro-preview`, `gemini-3.1-flash-lite-preview`, `gemini-3.1-pro-preview`, `gemini-3.5-flash`, `gemma2-9b-it`, `google/gemma-2-27b-it`, `google/gemma-2-9b-it`, `google/gemma-2b-it`, `google/gemma-3n-E4B-it`, `google/gemma-4-31B-it`, `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4-turbo-2024-04-09`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-4o`, `gpt-4o-2024-08-06`, `gpt-4o-mini`, `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `gpt-5.1`, `gpt-5.1-codex`, `gpt-5.1-codex-mini`, `gpt-5.2`, `gpt-5.3-codex`, `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.5`, `grok-2`, `grok-2-vision`, `grok-3-beta`, `grok-3-fast-beta`, `grok-3-mini-beta`, `grok-3-mini-fast-beta`, `grok-4`, `grok-4-0629`, `grok-4-0709`, `grok-4-fast-non-reasoning`, `grok-4-fast-reasoning`, `grok-4-latest`, `llama-3.1-8b-instant`, `llama-3.3-70b-versatile`, `meta-llama/Llama-3-70b-chat-hf`, `meta-llama/Llama-3-8b-chat-hf`, `meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.2-3B-Instruct-Turbo`, `meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.3-70B-Instruct-Turbo`, `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`, `meta-llama/Llama-4-Scout-17B-16E-Instruct`, `meta-llama/Meta-Llama-3-70B-Instruct-Lite`, `meta-llama/Meta-Llama-3-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3-8B-Instruct-Lite`, `meta-llama/Meta-Llama-3-8B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo`, `meta.llama3-8b-instruct-v1:0`, `mistralai/Mistral-7B-Instruct-v0.1`, `mistralai/Mistral-7B-Instruct-v0.2`, `mistralai/Mistral-7B-Instruct-v0.3`, `mistralai/Mixtral-8x22B-Instruct-v0.1`, `mistralai/Mixtral-8x7B-Instruct-v0.1`, `mixtral-8x7b-32768`, `moonshotai/Kimi-K2-Instruct`, `moonshotai/Kimi-K2.5`, `moonshotai/Kimi-K2.6`, `o1`, `o3`, `o3-mini`, `o4-mini`, `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `perplexity-ai/r1-1776`, `r1-1776`, `sonar`, `sonar-deep-research`, `sonar-pro`, `sonar-reasoning-pro`, `us.anthropic.claude-haiku-4-5-20251001-v1:0`, `us.anthropic.claude-opus-4-1-20250805-v1:0`, `us.anthropic.claude-opus-4-5-20251101-v1:0`, `us.anthropic.claude-opus-4-6-v1`, `us.anthropic.claude-sonnet-4-20250514-v1:0`, `us.anthropic.claude-sonnet-4-5-20250929-v1:0`, `us.anthropic.claude-sonnet-4-6`, `us.meta.llama3-1-70b-instruct-v1:0`, `us.meta.llama3-1-8b-instruct-v1:0`, `us.meta.llama3-2-11b-instruct-v1:0`, `us.meta.llama3-2-1b-instruct-v1:0`, `us.meta.llama3-2-3b-instruct-v1:0`, `us.meta.llama3-2-90b-instruct-v1:0`, `zai-org/GLM-4.5-Air-FP8`, `zai-org/GLM-5`, `zai-org/GLM-5.1`
  </Expandable>
</ParamField>

<ParamField path="text" type="str" required>
  The text to be translated
</ParamField>

<ParamField path="source_language" type="str" default="'Detect Language'">
  The language of the input text

  <Expandable title="Allowed values">
    `Afrikaans`, `Albanian`, `Amharic`, `Arabic`, `Armenian`, `Assamese`, `Aymara`, `Azerbaijani`, `Bambara`, `Basque`, `Belarusian`, `Bengali`, `Bhojpuri`, `Bosnian`, `Bulgarian`, `Catalan`, `Cebuano`, `Chichewa`, `Chinese Simplified`, `Chinese Traditional`, `Corsican`, `Croatian`, `Czech`, `Danish`, `Detect Language`, `Divehi`, `Dogri`, `Dutch`, `English`, `Esperanto`, `Estonian`, `Ewe`, `Filipino`, `Finnish`, `French`, `Frisian`, `Galician`, `Ganda`, `Georgian`, `German`, `Greek`, `Guarani`, `Gujarati`, `Haitian Creole`, `Hausa`, `Hawaiian`, `Hebrew`, `Hindi`, `Hmong`, `Hungarian`, `Icelandic`, `Igbo`, `Iloko`, `Indonesian`, `Irish Gaelic`, `Italian`, `Japanese`, `Javanese`, `Kannada`, `Kazakh`, `Khmer`, `Kinyarwanda`, `Konkani`, `Korean`, `Krio`, `Kurdish [Kurmanji]`, `Kurdish [Sorani]`, `Kyrgyz`, `Lao`, `Latin`, `Latvian`, `Lingala`, `Lithuanian`, `Luxembourgish`, `Macedonian`, `Maithili`, `Malagasy`, `Malay`, `Malayalam`, `Maltese`, `Maori`, `Marathi`, `Meiteilon Manipuri`, `Mizo`, `Mongolian`, `Myanmar [Burmese]`, `Nepali`, `Northern Sotho`, `Norwegian`, `Odia Oriya`, `Oromo`, `Pashto`, `Persian`, `Polish`, `Portuguese`, `Punjabi`, `Quechua`, `Romanian`, `Russian`, `Samoan`, `Sanskrit`, `Scots Gaelic`, `Serbian`, `Sesotho`, `Shona`, `Sindhi`, `Sinhala`, `Slovak`, `Slovenian`, `Somali`, `Spanish`, `Sundanese`, `Swahili`, `Swedish`, `Tajik`, `Tamil`, `Tatar`, `Telugu`, `Thai`, `Tigrinya`, `Tsonga`, `Turkish`, `Turkmen`, `Twi`, `Ukrainian`, `Urdu`, `Uyghur`, `Uzbek`, `Vietnamese`, `Welsh`, `Xhosa`, `Yiddish`, `Yoruba`, `Zulu`
  </Expandable>
</ParamField>

<ParamField path="target_language" type="str" default="'English'">
  The language to translate to

  <Expandable title="Allowed values">
    `Afrikaans`, `Albanian`, `Amharic`, `Arabic`, `Armenian`, `Assamese`, `Aymara`, `Azerbaijani`, `Bambara`, `Basque`, `Belarusian`, `Bengali`, `Bhojpuri`, `Bosnian`, `Bulgarian`, `Catalan`, `Cebuano`, `Chichewa`, `Chinese Simplified`, `Chinese Traditional`, `Corsican`, `Croatian`, `Czech`, `Danish`, `Divehi`, `Dogri`, `Dutch`, `English`, `Esperanto`, `Estonian`, `Ewe`, `Filipino`, `Finnish`, `French`, `Frisian`, `Galician`, `Ganda`, `Georgian`, `German`, `Greek`, `Guarani`, `Gujarati`, `Haitian Creole`, `Hausa`, `Hawaiian`, `Hebrew`, `Hindi`, `Hmong`, `Hungarian`, `Icelandic`, `Igbo`, `Iloko`, `Indonesian`, `Irish Gaelic`, `Italian`, `Japanese`, `Javanese`, `Kannada`, `Kazakh`, `Khmer`, `Kinyarwanda`, `Konkani`, `Korean`, `Krio`, `Kurdish [Kurmanji]`, `Kurdish [Sorani]`, `Kyrgyz`, `Lao`, `Latin`, `Latvian`, `Lingala`, `Lithuanian`, `Luxembourgish`, `Macedonian`, `Maithili`, `Malagasy`, `Malay`, `Malayalam`, `Maltese`, `Maori`, `Marathi`, `Meiteilon Manipuri`, `Mizo`, `Mongolian`, `Myanmar [Burmese]`, `Nepali`, `Northern Sotho`, `Norwegian`, `Odia Oriya`, `Oromo`, `Pashto`, `Persian`, `Polish`, `Portuguese`, `Punjabi`, `Quechua`, `Romanian`, `Russian`, `Samoan`, `Sanskrit`, `Scots Gaelic`, `Serbian`, `Sesotho`, `Shona`, `Sindhi`, `Sinhala`, `Slovak`, `Slovenian`, `Somali`, `Spanish`, `Sundanese`, `Swahili`, `Swedish`, `Tajik`, `Tamil`, `Tatar`, `Telugu`, `Thai`, `Tigrinya`, `Tsonga`, `Turkish`, `Turkmen`, `Twi`, `Ukrainian`, `Urdu`, `Uyghur`, `Uzbek`, `Vietnamese`, `Welsh`, `Xhosa`, `Yiddish`, `Yoruba`, `Zulu`
  </Expandable>
</ParamField>

<a id="write_json_value" />

## `write_json_value` — Write JSON Value

Update a specific value in a JSON.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").write_json_value(json_string="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="selected" type="str" default="'new'">
  Whether to update the JSON value or create a new JSON
  One of: `new`, `old`
</ParamField>

<ParamField path="fields" type="ListType | list[KeyValue] | list[List[Dict[str, Any]]]" default="[]" />

<ParamField path="json_string" type="str" required>
  The JSON to update
</ParamField>
