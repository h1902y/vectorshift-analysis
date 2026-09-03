> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Large Language Models (LLMs) nodes

> LLM nodes across providers, including vision models.

Add these nodes with the pipeline builder: `pipeline.add(name="...").<node>(...)`. Each entry lists the node's configuration parameters. See the [Pipeline reference](/sdk/pipeline/reference) for `add`, `run`, and lifecycle methods.

<a id="llm" />

## `llm` — LLM

LLM

<Info>Platform docs: [LLM](/platform/pipelines/llms/llm-node)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").llm(provider="anthropic", api_key="...", json_schema="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="provider" type="str" required>
  Select the LLM provider to be used

  <Expandable title="Allowed values">
    `anthropic`, `azure`, `bedrock`, `cohere`, `custom`, `fireworks`, `google`, `groq`, `openai`, `perplexity`, `together`, `xai`
  </Expandable>
</ParamField>

<ParamField path="stream" type="bool" default="False">
  Whether to stream the response
</ParamField>

<ParamField path="use_personal_api_key" type="bool" default="True" />

<ParamField path="json_response" type="bool" default="False">
  Whether to return the response as a JSON object
</ParamField>

<ParamField path="show_sources" type="bool" default="True">
  Whether to show the sources used to generate the response
</ParamField>

<ParamField path="model" type="str" default="''">
  Select the LLM model to be used

  <Expandable title="Allowed values">
    `MiniMaxAI/MiniMax-M2.5`, `MiniMaxAI/MiniMax-M2.7`, `Qwen/QwQ-32B-Preview`, `Qwen/Qwen2.5-72B-Instruct-Turbo-lora`, `Qwen/Qwen2.5-7B-Instruct-Turbo`, `Qwen/Qwen3-235B-A22B-Instruct-2507-tput`, `Qwen/Qwen3-235B-A22B-fp8-tput`, `Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8`, `Qwen/Qwen3-VL-8B-Instruct`, `Qwen/Qwen3.5-397B-A17B`, `Qwen/Qwen3.5-9B`, `Qwen/Qwen3.6-Plus`, `accounts/fireworks/models/deepseek-v4-pro`, `accounts/fireworks/models/glm-5p1`, `accounts/fireworks/models/gpt-oss-120b`, `accounts/fireworks/models/kimi-k2p5`, `accounts/fireworks/models/kimi-k2p6`, `accounts/fireworks/models/minimax-m2p7`, `accounts/fireworks/models/qwen3-235b-a22b`, `accounts/fireworks/models/qwen3p5-397b-a17b`, `accounts/fireworks/models/qwen3p6-plus`, `amazon.nova-lite-v1:0`, `amazon.nova-micro-v1:0`, `amazon.nova-pro-v1:0`, `amazon.titan-text-express-v1`, `amazon.titan-text-lite-v1`, `chatgpt-4o-latest`, `claude-3-5-haiku-20241022`, `claude-3-7-sonnet-20250219`, `claude-3-haiku-20240307`, `claude-haiku-4-5-20251001`, `claude-opus-4-1-20250805`, `claude-opus-4-20250514`, `claude-opus-4-5-20251101`, `claude-opus-4-6`, `claude-opus-4-7`, `claude-opus-4-8`, `claude-sonnet-4-20250514`, `claude-sonnet-4-5`, `claude-sonnet-4-6`, `command-nightly`, `command-r-08-2024`, `command-r-plus-08-2024`, `deepcogito/cogito-v2-1-671b`, `deepseek-ai/DeepSeek-R1-Distill-Llama-70B`, `deepseek-ai/DeepSeek-V3`, `deepseek-ai/DeepSeek-V4-Pro`, `deepseek-ai/deepseek-llm-67b-chat`, `gemini-2.0-flash-001`, `gemini-2.0-flash-lite-preview-02-05`, `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-3-flash-preview`, `gemini-3-pro-preview`, `gemini-3.1-flash-lite-preview`, `gemini-3.1-pro-preview`, `gemini-3.5-flash`, `gemma2-9b-it`, `google/gemma-2-27b-it`, `google/gemma-2-9b-it`, `google/gemma-2b-it`, `google/gemma-3n-E4B-it`, `google/gemma-4-31B-it`, `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4-turbo-2024-04-09`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-4o`, `gpt-4o-2024-08-06`, `gpt-4o-mini`, `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `gpt-5.1`, `gpt-5.1-codex`, `gpt-5.1-codex-mini`, `gpt-5.2`, `gpt-5.3-codex`, `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.5`, `grok-2`, `grok-2-vision`, `grok-3-beta`, `grok-3-fast-beta`, `grok-3-mini-beta`, `grok-3-mini-fast-beta`, `grok-4`, `grok-4-0629`, `grok-4-0709`, `grok-4-fast-non-reasoning`, `grok-4-fast-reasoning`, `grok-4-latest`, `llama-3.1-8b-instant`, `llama-3.3-70b-versatile`, `meta-llama/Llama-3-70b-chat-hf`, `meta-llama/Llama-3-8b-chat-hf`, `meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.2-3B-Instruct-Turbo`, `meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.3-70B-Instruct-Turbo`, `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`, `meta-llama/Llama-4-Scout-17B-16E-Instruct`, `meta-llama/Meta-Llama-3-70B-Instruct-Lite`, `meta-llama/Meta-Llama-3-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3-8B-Instruct-Lite`, `meta-llama/Meta-Llama-3-8B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo`, `meta.llama3-8b-instruct-v1:0`, `mistralai/Mistral-7B-Instruct-v0.1`, `mistralai/Mistral-7B-Instruct-v0.2`, `mistralai/Mistral-7B-Instruct-v0.3`, `mistralai/Mixtral-8x22B-Instruct-v0.1`, `mistralai/Mixtral-8x7B-Instruct-v0.1`, `mixtral-8x7b-32768`, `moonshotai/Kimi-K2-Instruct`, `moonshotai/Kimi-K2.5`, `moonshotai/Kimi-K2.6`, `o1`, `o3`, `o3-mini`, `o4-mini`, `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `perplexity-ai/r1-1776`, `r1-1776`, `sonar`, `sonar-deep-research`, `sonar-pro`, `sonar-reasoning-pro`, `us.anthropic.claude-haiku-4-5-20251001-v1:0`, `us.anthropic.claude-opus-4-1-20250805-v1:0`, `us.anthropic.claude-opus-4-5-20251101-v1:0`, `us.anthropic.claude-opus-4-6-v1`, `us.anthropic.claude-sonnet-4-20250514-v1:0`, `us.anthropic.claude-sonnet-4-5-20250929-v1:0`, `us.anthropic.claude-sonnet-4-6`, `us.meta.llama3-1-70b-instruct-v1:0`, `us.meta.llama3-1-8b-instruct-v1:0`, `us.meta.llama3-2-11b-instruct-v1:0`, `us.meta.llama3-2-1b-instruct-v1:0`, `us.meta.llama3-2-3b-instruct-v1:0`, `us.meta.llama3-2-90b-instruct-v1:0`, `zai-org/GLM-4.5-Air-FP8`, `zai-org/GLM-5`, `zai-org/GLM-5.1`
  </Expandable>
</ParamField>

<ParamField path="prompt" type="str" default="''">
  The data that is sent to the LLM. Add data from other nodes with double curly braces e.g., \{\{input\_0.text}}
</ParamField>

<ParamField path="system" type="str" default="''">
  The system prompt to be used
</ParamField>

<ParamField path="api_key" type="str" required>
  Your API key
</ParamField>

<ParamField path="baseUrl" type="str" default="''" />

<ParamField path="citation_metadata" type="list[str]" default="[]">
  The metadata of the sources used to generate the response
</ParamField>

<ParamField path="enable_web_search" type="bool" default="False">
  Enable Claude's built-in web search tool to search the web during response generation
</ParamField>

<ParamField path="jsonSchema" type="str" default="''" />

<ParamField path="json_schema" type="str" required>
  The schema of the JSON response
</ParamField>

<ParamField path="reasoning_effort" type="str" default="'default'">
  Controls the depth of reasoning for GPT-5 models ("none" is only supported on GPT-5.1 variants).
  One of: `default`, `high`, `low`, `medium`, `minimal`, `none`
</ParamField>

<ParamField path="safe_context_token_window" type="bool" default="False">
  If enabled, the context window will be reduced to fit the model's maximum context window.
</ParamField>

<ParamField path="verbosity" type="str" default="'default'">
  Controls the verbosity of GPT-5 responses.
  One of: `default`, `high`, `low`, `medium`
</ParamField>

<ParamField path="sampling" type="SamplingConfig" />

<ParamField path="safety" type="SafetyConfig" />

<ParamField path="retry" type="RetryConfig" />

<ParamField path="enable_moderation" type="bool">
  Whether to enable moderation
</ParamField>

<ParamField path="enable_pii_address" type="bool">
  Whether to enable PII address
</ParamField>

<ParamField path="enable_pii_cc" type="bool">
  Whether to enable PII cc
</ParamField>

<ParamField path="enable_pii_email" type="bool">
  Whether to enable PII email
</ParamField>

<ParamField path="enable_pii_name" type="bool">
  Whether to enable PII name
</ParamField>

<ParamField path="enable_pii_phone" type="bool">
  Whether to enable PII phone
</ParamField>

<ParamField path="enable_pii_ssn" type="bool">
  Whether to enable PII ssn
</ParamField>

<ParamField path="max_retries" type="int">
  The maximum number of retries
</ParamField>

<ParamField path="max_tokens" type="int">
  The maximum amount of input + output tokens the model will take in and generate per run (1 token = 4 characters). Note: different models have different token limits and the workflow will error if the max token is reached.
</ParamField>

<ParamField path="retry_interval_ms" type="int">
  The interval between retries in milliseconds
</ParamField>

<ParamField path="retry_on_failure" type="bool">
  Enable retrying when the node execution fails
</ParamField>

<ParamField path="temperature" type="float">
  The "creativity" of the response - increase the temperature for more creative responses.
</ParamField>

<ParamField path="top_p" type="float">
  The "randomness" of the output - higher Top P values increase the randomness
</ParamField>

<ParamField path="deployment_id" type="str" default="''">
  The deployment ID for the Azure OpenAI model. This is required when using Azure OpenAI services.
</ParamField>

<ParamField path="endpoint" type="str" default="''">
  The Azure OpenAI endpoint URL (e.g., [https://your-resource-name.openai.azure.com](https://your-resource-name.openai.azure.com))
</ParamField>

<ParamField path="thinking_token_limit" type="int" default="24576">
  The maximum number of tokens the model can use for thinking
</ParamField>

<ParamField path="finetuned_model" type="str" default="''">
  Use your finetuned model for response generation. Make sure to select the matching base model from the dropdown.
</ParamField>

<ParamField path="use_finetuned_model" type="bool" default="False" />

<ParamField path="base_url" type="str" default="''">
  The base URL of the custom LLM provider
</ParamField>

<ParamField path="aws_access_key_id" type="str" default="''">
  Your AWS Access Key ID
</ParamField>

<ParamField path="aws_region" type="str" default="'us-east-1'">
  AWS region where Bedrock models are enabled

  <Expandable title="Allowed values">
    `ap-northeast-1`, `ap-south-1`, `ap-southeast-1`, `ap-southeast-2`, `ca-central-1`, `eu-central-1`, `eu-west-2`, `eu-west-3`, `sa-east-1`, `us-east-1`, `us-east-2`, `us-west-2`
  </Expandable>
</ParamField>

<ParamField path="aws_secret_access_key" type="str" default="''">
  Your AWS Secret Access Key
</ParamField>

<a id="llm_anthropic_vision" />

## `llm_anthropic_vision` — llm\_anthropic\_vision

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").llm_anthropic_vision(api_key="...", image=..., json_schema="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="use_personal_api_key" type="bool" default="False" />

<ParamField path="json_response" type="bool" default="False" />

<ParamField path="model" type="str" default="'claude-3-haiku-20240307'" />

<ParamField path="prompt" type="str" default="''" />

<ParamField path="system" type="str" default="''" />

<ParamField path="api_key" type="str" required />

<ParamField path="image" type="AcceptsImage" required />

<ParamField path="json_schema" type="str" required />

<ParamField path="sampling" type="SamplingConfig" />

<ParamField path="max_tokens" type="int" />

<ParamField path="temperature" type="float" />

<ParamField path="top_p" type="float" />

<a id="llm_google_vision" />

## `llm_google_vision` — llm\_google\_vision

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").llm_google_vision(prompt="...", api_key="...", image=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="model" type="str" default="'gemini-pro-vision'" />

<ParamField path="prompt" type="str" required />

<ParamField path="api_key" type="str" required />

<ParamField path="image" type="AcceptsImage" required />

<ParamField path="json_response" type="bool" default="False" />

<ParamField path="provider" type="str" default="'googleImageToText'" />

<ParamField path="stream" type="bool" default="False" />

<ParamField path="sampling" type="SamplingConfig" />

<a id="llm_open_ai_vision" />

## `llm_open_ai_vision` — llm\_open\_ai\_vision

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").llm_open_ai_vision(prompt="...", system="...", api_key="...", image=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="provider" type="str" default="'openAiImageToText'" />

<ParamField path="stream" type="bool" default="False" />

<ParamField path="use_personal_api_key" type="bool" default="False" />

<ParamField path="json_response" type="bool" default="False" />

<ParamField path="model" type="str" default="'gpt-4-vision-preview'">
  <Expandable title="Allowed values">
    `MiniMaxAI/MiniMax-M2.5`, `MiniMaxAI/MiniMax-M2.7`, `Qwen/QwQ-32B-Preview`, `Qwen/Qwen2.5-72B-Instruct-Turbo-lora`, `Qwen/Qwen2.5-7B-Instruct-Turbo`, `Qwen/Qwen3-235B-A22B-Instruct-2507-tput`, `Qwen/Qwen3-235B-A22B-fp8-tput`, `Qwen/Qwen3-Coder-480B-A35B-Instruct-FP8`, `Qwen/Qwen3-VL-8B-Instruct`, `Qwen/Qwen3.5-397B-A17B`, `Qwen/Qwen3.5-9B`, `Qwen/Qwen3.6-Plus`, `accounts/fireworks/models/deepseek-v4-pro`, `accounts/fireworks/models/glm-5p1`, `accounts/fireworks/models/gpt-oss-120b`, `accounts/fireworks/models/kimi-k2p5`, `accounts/fireworks/models/kimi-k2p6`, `accounts/fireworks/models/minimax-m2p7`, `accounts/fireworks/models/qwen3-235b-a22b`, `accounts/fireworks/models/qwen3p5-397b-a17b`, `accounts/fireworks/models/qwen3p6-plus`, `amazon.nova-lite-v1:0`, `amazon.nova-micro-v1:0`, `amazon.nova-pro-v1:0`, `amazon.titan-text-express-v1`, `amazon.titan-text-lite-v1`, `chatgpt-4o-latest`, `claude-3-5-haiku-20241022`, `claude-3-7-sonnet-20250219`, `claude-3-haiku-20240307`, `claude-haiku-4-5-20251001`, `claude-opus-4-1-20250805`, `claude-opus-4-20250514`, `claude-opus-4-5-20251101`, `claude-opus-4-6`, `claude-opus-4-7`, `claude-opus-4-8`, `claude-sonnet-4-20250514`, `claude-sonnet-4-5`, `claude-sonnet-4-6`, `command-nightly`, `command-r-08-2024`, `command-r-plus-08-2024`, `deepcogito/cogito-v2-1-671b`, `deepseek-ai/DeepSeek-R1-Distill-Llama-70B`, `deepseek-ai/DeepSeek-V3`, `deepseek-ai/DeepSeek-V4-Pro`, `deepseek-ai/deepseek-llm-67b-chat`, `gemini-2.0-flash-001`, `gemini-2.0-flash-lite-preview-02-05`, `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-3-flash-preview`, `gemini-3-pro-preview`, `gemini-3.1-flash-lite-preview`, `gemini-3.1-pro-preview`, `gemini-3.5-flash`, `gemma2-9b-it`, `google/gemma-2-27b-it`, `google/gemma-2-9b-it`, `google/gemma-2b-it`, `google/gemma-3n-E4B-it`, `google/gemma-4-31B-it`, `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4-turbo-2024-04-09`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-4o`, `gpt-4o-2024-08-06`, `gpt-4o-mini`, `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `gpt-5.1`, `gpt-5.1-codex`, `gpt-5.1-codex-mini`, `gpt-5.2`, `gpt-5.3-codex`, `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.5`, `grok-2`, `grok-2-vision`, `grok-3-beta`, `grok-3-fast-beta`, `grok-3-mini-beta`, `grok-3-mini-fast-beta`, `grok-4`, `grok-4-0629`, `grok-4-0709`, `grok-4-fast-non-reasoning`, `grok-4-fast-reasoning`, `grok-4-latest`, `llama-3.1-8b-instant`, `llama-3.3-70b-versatile`, `meta-llama/Llama-3-70b-chat-hf`, `meta-llama/Llama-3-8b-chat-hf`, `meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.2-3B-Instruct-Turbo`, `meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo`, `meta-llama/Llama-3.3-70B-Instruct-Turbo`, `meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`, `meta-llama/Llama-4-Scout-17B-16E-Instruct`, `meta-llama/Meta-Llama-3-70B-Instruct-Lite`, `meta-llama/Meta-Llama-3-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3-8B-Instruct-Lite`, `meta-llama/Meta-Llama-3-8B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo`, `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo`, `meta.llama3-8b-instruct-v1:0`, `mistralai/Mistral-7B-Instruct-v0.1`, `mistralai/Mistral-7B-Instruct-v0.2`, `mistralai/Mistral-7B-Instruct-v0.3`, `mistralai/Mixtral-8x22B-Instruct-v0.1`, `mistralai/Mixtral-8x7B-Instruct-v0.1`, `mixtral-8x7b-32768`, `moonshotai/Kimi-K2-Instruct`, `moonshotai/Kimi-K2.5`, `moonshotai/Kimi-K2.6`, `o1`, `o3`, `o3-mini`, `o4-mini`, `openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `perplexity-ai/r1-1776`, `r1-1776`, `sonar`, `sonar-deep-research`, `sonar-pro`, `sonar-reasoning-pro`, `us.anthropic.claude-haiku-4-5-20251001-v1:0`, `us.anthropic.claude-opus-4-1-20250805-v1:0`, `us.anthropic.claude-opus-4-5-20251101-v1:0`, `us.anthropic.claude-opus-4-6-v1`, `us.anthropic.claude-sonnet-4-20250514-v1:0`, `us.anthropic.claude-sonnet-4-5-20250929-v1:0`, `us.anthropic.claude-sonnet-4-6`, `us.meta.llama3-1-70b-instruct-v1:0`, `us.meta.llama3-1-8b-instruct-v1:0`, `us.meta.llama3-2-11b-instruct-v1:0`, `us.meta.llama3-2-1b-instruct-v1:0`, `us.meta.llama3-2-3b-instruct-v1:0`, `us.meta.llama3-2-90b-instruct-v1:0`, `zai-org/GLM-4.5-Air-FP8`, `zai-org/GLM-5`, `zai-org/GLM-5.1`
  </Expandable>
</ParamField>

<ParamField path="prompt" type="str" required />

<ParamField path="system" type="str" required />

<ParamField path="api_key" type="str" required />

<ParamField path="image" type="AcceptsImage" required />

<ParamField path="json_schema" type="str" required />

<ParamField path="sampling" type="SamplingConfig" />

<ParamField path="max_tokens" type="int" />

<ParamField path="temperature" type="float" />

<ParamField path="top_p" type="float" />
