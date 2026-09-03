> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Start nodes

> Entry points: inputs, outputs, start flag, and browser extension.

Add these nodes with the pipeline builder: `pipeline.add(name="...").<node>(...)`. Each entry lists the node's configuration parameters. See the [Pipeline reference](/sdk/pipeline/reference) for `add`, `run`, and lifecycle methods.

<a id="browser_extension" />

## `browser_extension` — Browser Extension

Run a VectorShift workflow using the current page captured by the VectorShift chrome extension as input.

<Info>Platform docs: [Browser Extension](/nodes/browser-extension/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").browser_extension()
  ```
</CodeGroup>

**Parameters**

<ParamField path="page_content" type="str" default="''" />

<ParamField path="page_html" type="str" default="''" />

<ParamField path="page_urls" type="list[str]" default="[]" />

<ParamField path="screenshot" type="AcceptsImage" default="{}" />

<ParamField path="show_chrome_extension" type="bool" default="True" />

<ParamField path="url" type="str" default="''" />

<a id="input" />

## `input` — Input

Pass data of different types into your workflow

<Info>Platform docs: [Input](/nodes/input/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").input()
  ```
</CodeGroup>

**Parameters**

<ParamField path="input_type" type="str" default="'string'">
  Raw Text

  <Expandable title="Allowed values">
    `agent`, `audio`, `bool`, `dataframe`, `file`, `float`, `image`, `int32`, `knowledge_base`, `pipeline`, `string`, `table`, `timestamp`, `vec&lt;file&gt;`, `vec&lt;string&gt;`, `vec&lt;vec&lt;file&gt;&gt;`, `vec&lt;vec&lt;string&gt;&gt;`
  </Expandable>
</ParamField>

<ParamField path="use_default_value" type="bool" default="False">
  Set default value to be used if no value is provided
</ParamField>

<ParamField path="description" type="str" default="''">
  The input description. If pipeline is used as a tool in an agent, the description will be passed to the agent to help the agent know how to fill this input.
</ParamField>

<ParamField path="default_value" type="AcceptsAgent | AcceptsAudio | AcceptsDataframe | AcceptsFile | AcceptsFileList | AcceptsImage | AcceptsKnowledgeBase | AcceptsPipeline | AcceptsTable | AcceptsTimestamp | ListType | bool | float | int | list[AcceptsFileList] | list[list[str]] | list[str] | str" default="{}">
  The default value to be used if no value is provided
</ParamField>

<ParamField path="dataframe_type" type="str" default="'table'">
  The type of dataframe to be used
  One of: `csv`, `dataframe_file`, `json`, `md`, `sql`, `table`
</ParamField>

<ParamField path="file_parser" type="str" default="'default'">
  The processing model with which the document will be processed. Default processing model includes standard document parsing / OCR. Llamaparse will allow for ability to read documents with complex features (e.g., tables, charts, etc.). Llamaparse will be charged at 0.3 cents per page. Textract for most advanced data extraction and will be charged at 1.5 cents per page. Reducto enables rich structured parsing.
  One of: `contextual_ai`, `default`, `docling`, `llama_parse`, `mistral_ocr`, `reducto`, `textract`
</ParamField>

<a id="output" />

## `output` — Output

Output data of different types from your workflow.

<Info>Platform docs: [Output](/nodes/output/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").output(value=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="output_type" type="str" default="'string'">
  <Expandable title="Allowed values">
    `audio`, `bool`, `dataframe`, `file`, `float`, `image`, `int32`, `json`, `stream&lt;string&gt;`, `string`, `timestamp`, `vec&lt;file&gt;`
  </Expandable>
</ParamField>

<ParamField path="description" type="str" default="''">
  The output description. If pipeline is used as a tool in an agent, the description will be passed to the agent to help the agent know how to fill this output.
</ParamField>

<ParamField path="format_output" type="bool" default="True" />

<ParamField path="value" type="AcceptsAudio | AcceptsDataframe | AcceptsFile | AcceptsFileList | AcceptsImage | AcceptsStream | AcceptsTimestamp | bool | float | int | str" required />

<ParamField path="dataframe_type" type="str" default="'table'">
  The type of dataframe to be used
  One of: `csv`, `dataframe_file`, `json`, `md`, `sql`, `table`
</ParamField>

<a id="start_flag" />

## `start_flag` — Start a conversation

Start a conversation

<Info>Platform docs: [Start a conversation](/nodes/start-node/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").start_flag()
  ```
</CodeGroup>

<a id="sticky_note" />

## `sticky_note` — sticky\_note

<Info>Platform docs: [sticky\_note](/nodes/note/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").sticky_note()
  ```
</CodeGroup>

**Parameters**

<ParamField path="text" type="str" default="''" />
