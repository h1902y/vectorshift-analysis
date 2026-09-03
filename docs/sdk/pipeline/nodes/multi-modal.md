> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Multi-Modal nodes

> Audio and image generation and analysis.

Add these nodes with the pipeline builder: `pipeline.add(name="...").<node>(...)`. Each entry lists the node's configuration parameters. See the [Pipeline reference](/sdk/pipeline/reference) for `add`, `run`, and lifecycle methods.

<a id="ai_audio_operations" />

## `ai_audio_operations` — Leverage AI for Audio operations

Leverage AI for Audio operations

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").ai_audio_operations()
  ```
</CodeGroup>

**Parameters**

<ParamField path="sub_type" type="str" default="''" />

<a id="ai_image_operations" />

## `ai_image_operations` — Leverage AI for Image operations

Leverage AI for Image operations

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").ai_image_operations()
  ```
</CodeGroup>

**Parameters**

<ParamField path="sub_type" type="str" default="''" />

<a id="ai_image_to_image" />

## `ai_image_to_image` — AI Image To Image

Modify and edit images using AI by providing modification instructions

<Info>Platform docs: [AI Image To Image](/nodes/image-to-image/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").ai_image_to_image(provider="google", model="gemini-2.5-flash-image", api_key="...", size="1024x1024")
  ```
</CodeGroup>

**Parameters**

<ParamField path="use_personal_api_key" type="bool" default="False">
  Use your personal API key
</ParamField>

<ParamField path="provider" type="str" required>
  Select the model provider.
  One of: `google`, `openai`
</ParamField>

<ParamField path="model" type="str" required>
  Select the image-to-image model

  <Expandable title="Allowed values">
    `gemini-2.5-flash-image`, `gemini-3-pro-image-preview`, `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-image-1.5`, `gpt-image-2`, `o1`, `o3`, `o3-mini`, `o4-mini`
  </Expandable>
</ParamField>

<ParamField path="prompt" type="str" default="''">
  Tell the AI model how you would like it to modify the images. Be as specific as possible. For example, you can instruct the model to change colors, add elements, apply artistic styles, or blend multiple images. Must not be empty.
</ParamField>

<ParamField path="api_key" type="str" required>
  Input your personal API key from the model provider. Note: if you do not have access to the selected model, the workflow will not run
</ParamField>

<ParamField path="aspect_ratio" type="str" default="'1:1'">
  Select the aspect ratio for the output image.

  <Expandable title="Allowed values">
    `16:9`, `1:1`, `21:9`, `2:3`, `3:2`, `3:4`, `4:3`, `4:5`, `5:4`, `9:16`
  </Expandable>
</ParamField>

<ParamField path="images" type="AcceptsImageList">
  Array of input images to modify. Provide 1-3 images for best results.
</ParamField>

<ParamField path="size" type="str" required>
  Select the size.
  One of: `1024x1024`, `1024x1536`, `1024x1792`, `1536x1024`, `1792x1024`, `256x256`, `512x512`, `auto`
</ParamField>

<a id="ai_image_to_text" />

## `ai_image_to_text` — AI Image To Text

Generate Text from Image using AI

<Info>Platform docs: [AI Image To Text](/nodes/image-to-text/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").ai_image_to_text(provider="anthropic", model="chatgpt-4o-latest", api_key="...", image=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="use_personal_api_key" type="bool" default="False">
  Use your personal API key
</ParamField>

<ParamField path="json_response" type="bool" default="False">
  Return the response as a JSON object
</ParamField>

<ParamField path="stream" type="bool" default="False">
  Stream the response
</ParamField>

<ParamField path="provider" type="str" required>
  Select the provider that will be used to analyze image.
  One of: `anthropic`, `fireworks`, `google`, `openai`, `together`, `xai`
</ParamField>

<ParamField path="model" type="str" required>
  Select the image analyzing model.

  <Expandable title="Allowed values">
    `chatgpt-4o-latest`, `claude-3-5-haiku-20241022`, `claude-3-7-sonnet-20250219`, `claude-3-haiku-20240307`, `claude-haiku-4-5-20251001`, `claude-opus-4-1-20250805`, `claude-opus-4-20250514`, `claude-opus-4-5-20251101`, `claude-opus-4-6`, `claude-opus-4-7`, `claude-opus-4-8`, `claude-sonnet-4-20250514`, `claude-sonnet-4-5`, `claude-sonnet-4-6`, `gemini-2.0-flash-001`, `gemini-2.0-flash-lite-preview-02-05`, `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-3-flash-preview`, `gemini-3-pro-preview`, `gemini-3.1-flash-lite-preview`, `gemini-3.1-pro-preview`, `gemini-3.5-flash`, `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4-turbo-2024-04-09`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-4o`, `gpt-4o-2024-08-06`, `gpt-4o-mini`, `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `gpt-5.1`, `gpt-5.1-codex`, `gpt-5.1-codex-mini`, `gpt-5.2`, `gpt-5.3-codex`, `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.5`, `grok-2-vision`, `o1`, `o3`, `o3-mini`, `o4-mini`
  </Expandable>
</ParamField>

<ParamField path="prompt" type="str" default="''">
  Instructions on what you want to analyze from the image.
</ParamField>

<ParamField path="system" type="str" default="''">
  Tell the AI model how you would like it to respond. Be as specific as possible. For example, you can instruct the model on what tone to respond in or how to respond given the information you provide
</ParamField>

<ParamField path="api_key" type="str" required>
  Input your personal API key from the model provider. Note: if you do not have access to the selected model, the workflow will not run
</ParamField>

<ParamField path="image" type="AcceptsImage" required>
  The image to analyze. For agent tool calls, pass an existing file reference such as $history.MESSAGE_ID, $tool.CALL\_ID.OUTPUT\_KEY, or \$input.NAME; never pass an empty string.
</ParamField>

<ParamField path="json_schema" type="str" required>
  The JSON schema to use for the response
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

<a id="ai_speech_to_text" />

## `ai_speech_to_text` — AI Speech To Text

Generate Text from Audio using AI

<Info>Platform docs: [AI Speech To Text](/nodes/speech-to-text/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").ai_speech_to_text(provider="deepgram", model="base", api_key="...", audio=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="use_personal_api_key" type="bool" default="False">
  Use your personal API key
</ParamField>

<ParamField path="provider" type="str" required>
  Select the model provider.
  One of: `deepgram`, `google`, `openai`
</ParamField>

<ParamField path="model" type="str" required>
  Select the speech-to-text model

  <Expandable title="Allowed values">
    `base`, `enhanced`, `gemini-2.0-flash-001`, `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-3-flash-preview`, `gemini-3-pro-preview`, `gemini-3.1-flash-lite-preview`, `gemini-3.1-pro-preview`, `gemini-3.5-flash`, `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `nova`, `nova-2`, `nova-3`, `o1`, `o3`, `o3-mini`, `o4-mini`, `whisper-1`
  </Expandable>
</ParamField>

<ParamField path="api_key" type="str" required>
  Input your personal API key from the model provider. Note: if you do not have access to the selected model, the workflow will not run
</ParamField>

<ParamField path="audio" type="AcceptsAudio" required>
  The audio for conversion
</ParamField>

<ParamField path="tier" type="str" required>
  Select the tier

  <Expandable title="Allowed values">
    `atc`, `automotive`, `conversationalai`, `drivethru`, `finance`, `general`, `medical`, `meeting`, `phonecall`, `video`, `voicemail`
  </Expandable>
</ParamField>

<a id="ai_text_to_image" />

## `ai_text_to_image` — AI Text To Image

Generate Image from Text using AI

<Info>Platform docs: [AI Text To Image](/nodes/text-to-image/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").ai_text_to_image(provider="flux", model="Stable Diffusion 1.6", api_key="...", aspect_ratio="16:9")
  ```
</CodeGroup>

**Parameters**

<ParamField path="use_personal_api_key" type="bool" default="False">
  Use your personal API key
</ParamField>

<ParamField path="provider" type="str" required>
  Select the model provider.
  One of: `flux`, `google`, `openai`, `stabilityai`, `xai`
</ParamField>

<ParamField path="model" type="str" required>
  Select the text-to-image model

  <Expandable title="Allowed values">
    `Stable Diffusion 1.6`, `Stable Diffusion 3 Large`, `Stable Diffusion 3 Large Turbo`, `Stable Diffusion 3 Medium`, `Stable Diffusion Core`, `Stable Diffusion Ultra`, `Stable Diffusion XL`, `dall-e-2`, `dall-e-3`, `flux-dev`, `flux-pro`, `flux-schnell`, `gemini-2.5-flash-image`, `gemini-3-pro-image-preview`, `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-image-1.5`, `gpt-image-2`, `grok-2-image`, `o1`, `o3`, `o3-mini`, `o4-mini`
  </Expandable>
</ParamField>

<ParamField path="prompt" type="str" default="''">
  Tell the AI model how you would like it to respond. Be as specific as possible. For example, you can instruct the model to use bright colors. Must not be empty.
</ParamField>

<ParamField path="api_key" type="str" required>
  Input your personal API key from the model provider. Note: if you do not have access to the selected model, the workflow will not run
</ParamField>

<ParamField path="aspect_ratio" type="str" required>
  Select the aspect ratio.

  <Expandable title="Allowed values">
    `16:9`, `1:1`, `21:9`, `2:3`, `3:2`, `3:4`, `4:3`, `4:5`, `5:4`, `9:16`, `9:21`
  </Expandable>
</ParamField>

<ParamField path="size" type="str" required>
  Select the size.
  One of: `1024x1024`, `1024x1536`, `1024x1792`, `1536x1024`, `1792x1024`, `256x256`, `512x512`, `auto`
</ParamField>

<a id="ai_text_to_speech" />

## `ai_text_to_speech` — AI Text To Speech

Generate Audio from text using AI

<Info>Platform docs: [AI Text To Speech](/nodes/text-to-speech/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").ai_text_to_speech(text="...", api_key="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="use_personal_api_key" type="bool" default="False">
  Use your personal API key
</ParamField>

<ParamField path="provider" type="str" default="'openai'">
  Select the model provider.
  One of: `eleven_labs`, `openai`
</ParamField>

<ParamField path="model" type="str" default="'tts-1-hd'">
  Select the text-to-speech model

  <Expandable title="Allowed values">
    `eleven_flash_v2`, `eleven_flash_v2_5`, `eleven_monolingual_v1`, `eleven_multilingual_v1`, `eleven_multilingual_v2`, `eleven_turbo_v2`, `eleven_turbo_v2_5`, `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`, `o1`, `o3`, `o3-mini`, `o4-mini`, `tts-1`, `tts-1-hd`
  </Expandable>
</ParamField>

<ParamField path="text" type="str" required>
  The string input for conversion.
</ParamField>

<ParamField path="api_key" type="str" required>
  Input your personal API key from the model provider. Note: if you do not have access to the selected model, the workflow will not run
</ParamField>

<ParamField path="voice" type="str" default="'alloy'">
  Select the voice

  <Expandable title="Allowed values">
    `Alice`, `Aria`, `Bill`, `Brian`, `Callum`, `Charlie`, `Charlotte`, `Chris`, `Daniel`, `Eric`, `George`, `Jessica`, `Laura`, `Liam`, `Lily`, `Matilda`, `River`, `Roger`, `Sarah`, `Will`, `alloy`, `echo`, `fable`, `nova`, `onyx`, `shimmer`
  </Expandable>
</ParamField>

<a id="image_gen" />

## `image_gen` — image\_gen

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").image_gen()
  ```
</CodeGroup>

**Parameters**

<ParamField path="model" type="str" default="'gpt-4-1106-preview'" />

<ParamField path="prompt" type="str" default="''" />

<ParamField path="aspect_ratio" type="str" default="'1:1'" />

<ParamField path="image_count" type="str" default="'1'" />

<ParamField path="provider" type="str" default="'llmOpenAI'" />

<ParamField path="size" type="str" default="'512x512'" />

<a id="speech_to_text" />

## `speech_to_text` — speech\_to\_text

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").speech_to_text(audio=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="model" type="str" default="'OpenAI Whisper'">
  One of: `Deepgram`, `OpenAI Whisper`
</ParamField>

<ParamField path="audio" type="AcceptsAudio" required />

<ParamField path="submodel" type="str" default="'nova-2'" />

<ParamField path="tier" type="str" default="'general'" />

<a id="tts_eleven_labs" />

## `tts_eleven_labs` — tts\_eleven\_labs

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").tts_eleven_labs(text="...", api_key="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="model" type="str" default="'eleven_multilingual_v2'" />

<ParamField path="text" type="str" required />

<ParamField path="api_key" type="str" required />

<ParamField path="voice" type="str" default="'shimmer'" />

<a id="tts_open_ai" />

## `tts_open_ai` — tts\_open\_ai

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").tts_open_ai(text="...", api_key="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="use_personal_api_key" type="bool" default="False" />

<ParamField path="model" type="str" default="'tts-1-hd'" />

<ParamField path="text" type="str" required />

<ParamField path="api_key" type="str" required />

<ParamField path="voice" type="str" default="'alloy'" />
