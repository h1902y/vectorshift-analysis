> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# LLM tools

> Generate and analyze images, audio, and documents.

Add these tools with `AgentTools.<tool>(tool_name="...", ...)` or `agent.add_tool.<tool>(tool_name="...", ...)`. Every tool requires a unique `tool_name=`. Each entry lists the tool's configuration parameters. See the [Agent reference](/sdk/agent/reference) for attaching and running tools.

<a id="ai_image_to_image" />

## `ai_image_to_image` — Image to Image

Modify and edit images using AI by providing modification instructions

<Info>Platform docs: [Image to Image](https://docs.vectorshift.ai/platform/pipelines/multi-modal/image-to-image)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.ai_image_to_image(tool_name="...", use_personal_api_key=True, provider="google", api_key="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="use_personal_api_key" type="bool" required>
  Use your personal API key
</ParamField>

<ParamField path="provider" type="str" required>
  Select the model provider.
  One of: `google`, `openai`
</ParamField>

<ParamField path="aspect_ratio" type="str">
  Select the aspect ratio for the output image.
</ParamField>

<ParamField path="images" type="list[str]">
  Array of input images to modify. Provide 1-3 images for best results.
</ParamField>

<ParamField path="model" type="str">
  Select the image-to-image model
</ParamField>

<ParamField path="prompt" type="str">
  Tell the AI model how you would like it to modify the images. Be as specific as possible. For example, you can instruct the model to change colors, add elements, apply artistic styles, or blend multiple images. Must not be empty.
</ParamField>

<ParamField path="size" type="str">
  Select the size.
</ParamField>

<ParamField path="api_key" type="str" required>
  Input your personal API key from the model provider. Note: if you do not have access to the selected model, the workflow will not run
</ParamField>

<a id="ai_image_to_text" />

## `ai_image_to_text` — Image to Text

Generate Text from Image using AI

<Info>Platform docs: [Image to Text](https://docs.vectorshift.ai/platform/pipelines/multi-modal/image-to-text)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.ai_image_to_text(tool_name="...", use_personal_api_key=True, json_response=True, stream=True, image="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="use_personal_api_key" type="bool" required>
  Use your personal API key
</ParamField>

<ParamField path="json_response" type="bool" required>
  Return the response as a JSON object
</ParamField>

<ParamField path="stream" type="bool" required>
  Stream the response
</ParamField>

<ParamField path="image" type="str" required>
  The image to analyze. For agent tool calls, pass an existing file reference such as $history.MESSAGE_ID, $tool.CALL\_ID.OUTPUT\_KEY, or \$input.NAME; never pass an empty string.
</ParamField>

<ParamField path="max_tokens" type="int">
  The maximum number of tokens to generate
</ParamField>

<ParamField path="prompt" type="str">
  Instructions on what you want to analyze from the image.
</ParamField>

<ParamField path="system" type="str">
  Tell the AI model how you would like it to respond. Be as specific as possible. For example, you can instruct the model on what tone to respond in or how to respond given the information you provide
</ParamField>

<ParamField path="temperature" type="float">
  The temperature of the model
</ParamField>

<ParamField path="top_p" type="float">
  The top-p value
</ParamField>

<ParamField path="json_schema" type="str" required>
  The JSON schema to use for the response
</ParamField>

<ParamField path="api_key" type="str" required>
  Input your personal API key from the model provider. Note: if you do not have access to the selected model, the workflow will not run
</ParamField>

<a id="ai_speech_to_text" />

## `ai_speech_to_text` — Speech to Text

Generate Text from Audio using AI

<Info>Platform docs: [Speech to Text](https://docs.vectorshift.ai/platform/pipelines/multi-modal/speech-to-text)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.ai_speech_to_text(tool_name="...", use_personal_api_key=True, provider="deepgram", audio="...", api_key="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="use_personal_api_key" type="bool" required>
  Use your personal API key
</ParamField>

<ParamField path="provider" type="str" required>
  Select the model provider.
  One of: `deepgram`, `openai`
</ParamField>

<ParamField path="audio" type="str" required>
  The audio for conversion
</ParamField>

<ParamField path="model" type="str">
  Select the speech-to-text model
</ParamField>

<ParamField path="tier" type="str">
  Select the tier
</ParamField>

<ParamField path="api_key" type="str" required>
  Input your personal API key from the model provider. Note: if you do not have access to the selected model, the workflow will not run
</ParamField>

<a id="ai_text_to_image" />

## `ai_text_to_image` — Text to Image

Generate Image from Text using AI

<Info>Platform docs: [Text to Image](https://docs.vectorshift.ai/platform/pipelines/multi-modal/text-to-image)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.ai_text_to_image(tool_name="...", use_personal_api_key=True, provider="flux", api_key="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="use_personal_api_key" type="bool" required>
  Use your personal API key
</ParamField>

<ParamField path="provider" type="str" required>
  Select the model provider.
  One of: `flux`, `openai`, `stabilityai`, `xai`
</ParamField>

<ParamField path="aspect_ratio" type="str">
  Select the aspect ratio.
</ParamField>

<ParamField path="prompt" type="str">
  Tell the AI model how you would like it to respond. Be as specific as possible. For example, you can instruct the model to use bright colors. Must not be empty.
</ParamField>

<ParamField path="size" type="str">
  Select the size.
</ParamField>

<ParamField path="api_key" type="str" required>
  Input your personal API key from the model provider. Note: if you do not have access to the selected model, the workflow will not run
</ParamField>

<a id="ai_text_to_speech" />

## `ai_text_to_speech` — Text To Speech

Generate Audio from text using AI

<Info>Platform docs: [Text To Speech](https://docs.vectorshift.ai/platform/pipelines/multi-modal/text-to-speech)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.ai_text_to_speech(tool_name="...", use_personal_api_key=True, text="...", api_key="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="use_personal_api_key" type="bool" required>
  Use your personal API key
</ParamField>

<ParamField path="text" type="str" required>
  The string input for conversion.
</ParamField>

<ParamField path="model" type="str">
  Select the text-to-speech model
</ParamField>

<ParamField path="voice" type="str">
  Select the voice
</ParamField>

<ParamField path="api_key" type="str" required>
  Input your personal API key from the model provider. Note: if you do not have access to the selected model, the workflow will not run
</ParamField>

<a id="reducto_extract" />

## `reducto_extract` — Reducto Extract

Extract structured data from documents using Reducto

<CodeGroup>
  ```python Sync theme={"languages":{}}
  AgentTools.reducto_extract(tool_name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="api_key" type="str" default="''">
  Your personal Reducto API key.
</ParamField>

<ParamField path="deep_extract" type="Any">
  Enable agentic deep extraction for higher accuracy. Uses iterative verification against the source material.
</ParamField>

<ParamField path="files" type="Any">
  Documents to extract data from (up to 2,500 pages per document).
</ParamField>

<ParamField path="json_schema" type="Any">
  A JSON schema defining the structure of data to extract. Use descriptive field names.
</ParamField>

<ParamField path="system_prompt" type="Any">
  Instructions for how the AI should extract and verify data from the documents.
</ParamField>

<ParamField path="use_personal_api_key" type="bool" default="False">
  Use your own Reducto API key instead of the platform default.
</ParamField>

<ParamField path="return_citations" type="bool" default="False">
  Return citation bounding boxes for extracted fields.
</ParamField>
