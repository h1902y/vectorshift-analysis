> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Pipeline reference

> Build, run, stream, and manage VectorShift pipelines from Python.

## Lifecycle

### `new`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.new(name: str, nodes: Optional[list[Node]] = None) -> Pipeline
  ```

  ```python Async theme={"languages":{}}
  async Pipeline.anew(name: str, nodes: Optional[list[Node]] = None)
  ```
</CodeGroup>

Create a new pipeline with the specified parameters.

**Parameters**

<ParamField path="name" type="str" required>
  The name of the pipeline.
</ParamField>

<ParamField path="nodes" type="Optional[list[Node]]" default="None">
  List of nodes to include in the pipeline.
</ParamField>

**Returns**

<ResponseField name="returns" type="Pipeline">
  A new Pipeline instance.
</ResponseField>

### `save`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.save(deploy: bool = True, bump: Optional[BumpLevel] = None, description: Optional[str] = None)
  ```

  ```python Async theme={"languages":{}}
  async Pipeline.asave(deploy: bool = True, bump: Optional[BumpLevel] = None, description: Optional[str] = None)
  ```
</CodeGroup>

Save the pipeline with its current configuration.

Updates the pipeline in the database with the current nodes, inputs and outputs configuration.

### `deploy=True` vs `deploy=False` — the branch model

Think of a pipeline like a Git repo:

* **Working tree** — the `Pipeline` object in your Python process. Every `pipeline.add(...)` mutation lives here.
* **Main branch** — the `branch_id` on the server. `save(deploy=False)` writes your working tree to this branch as a new commit. Anything reading by `branch_id` (the platform editor, ad-hoc `pipeline.run(...)` from this SDK process) immediately sees the change.
* **Deployed version** — what callers of the *published* pipeline get. Chatbots, integrations, scheduled runs, and the platform's "Run published" button all read this version. `save(deploy=True)` (the default) promotes the current main-branch state to be the new deployed version.

`bump` attaches a semantic-version tag (`"major"`, `"minor"`, or `"patch"`) to the deploy. Consumers can then pin to that version via `Pipeline.fetch(id=..., version="1.2.0")` instead of always tracking latest.

In practice:

* Iterating on a draft? `save(deploy=False)` — keeps the deployed version stable while you tweak.
* Ready to ship? `save(deploy=True)` (default) — optionally with `bump="patch"` + `description="..."` for a labelled release.

**Parameters**

<ParamField path="deploy" type="bool" default="True">
  When `True`, promotes the saved state to be the new deployed version (the one chatbots, integrations, and the "Run published" path will hit). When `False`, only updates the working/main branch — the deployed version is untouched until the next `save(deploy=True)`.
</ParamField>

<ParamField path="bump" type="Optional[BumpLevel]" default="None">
  Semantic-version bump level: `"major"`, `"minor"`, or `"patch"`. Only meaningful with `deploy=True`. See [`BumpLevel`](#bumplevel).
</ParamField>

<ParamField path="description" type="Optional[str]" default="None">
  Updates the pipeline description; also used as the changelog entry when bumping a version.
</ParamField>

**Returns**

<ResponseField name="returns">
  dict: A dictionary containing the status of the save operation.
</ResponseField>

**Raises**

<ResponseField name="Exception" type="exception">
  If the pipeline update fails.
</ResponseField>

### `fetch`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.fetch(id: Optional[str] = None, name: Optional[str] = None, branch_id: Optional[str] = None, version: Optional[str] = None, username: Optional[str] = None, org_name: Optional[str] = None) -> Pipeline
  ```

  ```python Async theme={"languages":{}}
  async Pipeline.afetch(id: Optional[str] = None, name: Optional[str] = None, branch_id: Optional[str] = None, version: Optional[str] = None, username: Optional[str] = None, org_name: Optional[str] = None) -> Pipeline
  ```
</CodeGroup>

Fetches an existing pipeline by id or name.

`branch_id` and `version` only apply when fetching by `id`.

**Parameters**

<ParamField path="id" type="Optional[str]" default="None">
  The unique identifier of the pipeline to fetch.
</ParamField>

<ParamField path="name" type="Optional[str]" default="None">
  The name of the pipeline to fetch. When multiple pipelines share the same name, the most recently modified one is returned.
</ParamField>

<ParamField path="branch_id" type="Optional[str]" default="None">
  Fetch the pipeline for a specific branch (id-fetch only).
</ParamField>

<ParamField path="version" type="Optional[str]" default="None">
  Semantic version to fetch (e.g. `"1.2.0"`), or `"latest"` (id-fetch only).
</ParamField>

<ParamField path="username" type="Optional[str]" default="None">
  The username of the pipeline owner.
</ParamField>

<ParamField path="org_name" type="Optional[str]" default="None">
  The organization name of the pipeline owner.
</ParamField>

**Returns**

<ResponseField name="returns" type="Pipeline">
  Pipeline: The fetched Pipeline instance.
</ResponseField>

**Raises**

<ResponseField name="ValueError" type="exception">
  If neither id nor name is provided.
</ResponseField>

### `list`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.list(folder_id: Optional[str] = None, include_shared: Optional[bool] = None, verbose: Optional[bool] = None, offset: Optional[int] = None, limit: Optional[int] = None) -> "list[Pipeline]"
  ```

  ```python Async theme={"languages":{}}
  async Pipeline.alist(folder_id: Optional[str] = None, include_shared: Optional[bool] = None, verbose: Optional[bool] = None, offset: Optional[int] = None, limit: Optional[int] = None) -> "list[Pipeline]"
  ```
</CodeGroup>

List pipelines.

**Parameters**

<ParamField path="folder_id" type="Optional[str]" default="None">
  Filter pipelines by folder.
</ParamField>

<ParamField path="include_shared" type="Optional[bool]" default="None">
  Include shared pipelines.
</ParamField>

<ParamField path="verbose" type="Optional[bool]" default="None">
  Include full pipeline details.
</ParamField>

<ParamField path="offset" type="Optional[int]" default="None">
  Pagination offset.
</ParamField>

<ParamField path="limit" type="Optional[int]" default="None">
  Maximum number of pipelines to return.
</ParamField>

**Returns**

<ResponseField name="returns" type="list[Pipeline]">
  A list of Pipeline instances.
</ResponseField>

### `delete`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.delete()
  ```

  ```python Async theme={"languages":{}}
  async Pipeline.adelete()
  ```
</CodeGroup>

Deletes an existing pipeline.

**Returns**

<ResponseField name="returns">
  dict: A dictionary containing the status of the deletion operation.
</ResponseField>

**Raises**

<ResponseField name="Exception" type="exception">
  If the pipeline couldn't be deleted.
</ResponseField>

### `duplicate`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.duplicate(name: Optional[str] = None, description: Optional[str] = None, folder_id: Optional[str] = None) -> Pipeline
  ```

  ```python Async theme={"languages":{}}
  async Pipeline.aduplicate(name: Optional[str] = None, description: Optional[str] = None, folder_id: Optional[str] = None) -> Pipeline
  ```
</CodeGroup>

Duplicate this pipeline.

**Parameters**

<ParamField path="name" type="Optional[str]" default="None">
  Name for the duplicate. Auto-generated if omitted.
</ParamField>

<ParamField path="description" type="Optional[str]" default="None">
  Description for the duplicate.
</ParamField>

<ParamField path="folder_id" type="Optional[str]" default="None">
  Folder to place the duplicate in.
</ParamField>

**Returns**

<ResponseField name="returns" type="Pipeline">
  A new Pipeline instance for the duplicated pipeline.
</ResponseField>

## Building

### `add`

```python theme={"languages":{}}
Pipeline.add -> NodeAdder  # property
```

Fluent builder for adding nodes to this pipeline.

**Usage**

```python theme={"languages":{}}
inp = pipeline.add(name="query").input(input_type="string")
llm = pipeline.add(name="llm").llm(provider="openai", model="gpt-4o", prompt=inp.text)
```

**Returns**

<ResponseField name="returns" type="NodeAdder" />

### `add_batch`

```python theme={"languages":{}}
Pipeline.add_batch -> BatchNodeAdder  # property
```

Fluent builder that adds nodes with `execution_mode='batch'`.

**Usage**

```python theme={"languages":{}}
llm = pipeline.add_batch.llm(provider="openai", model="gpt-5.1", prompt=inp.text)
# equivalent to: pipeline.add.llm(..., execution_mode="batch")
```

**Returns**

<ResponseField name="returns" type="BatchNodeAdder" />

### Node catalogue

`pipeline.add(name=).<node_type>(...)` exposes every node type as a typed builder method. There are **\~500 node types** in total. The biggest categories:

| Category                  | Representative builders                                                                                                                                                |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **I/O**                   | `input`, `output`, `text`, `file`, `file_to_text`, `file_save`                                                                                                         |
| **LLM & AI**              | `llm`, `ai_routing`, `ai_filter_list`, `ai_operations`, `ai_text_to_image`, `ai_image_to_text`, `ai_text_to_speech`, `ai_speech_to_text`, `ai_fill_pdf`, `categorizer` |
| **Knowledge & retrieval** | `knowledge_base`, `knowledge_base_loader`, `url_loader`, `arxiv`, `wikipedia`, `deep_research`, `semantic_search`, `parallel_ai_search`                                |
| **Control flow**          | `condition`, `ai_routing`, `merge`, `combine_text`, `pipeline` (sub-pipeline), `agent` (agent-as-tool)                                                                 |
| **Transforms**            | `text_formatter`, `combine_text`, `split_text`, `transformation` (custom Python), `generate_chart`                                                                     |
| **Data sources**          | `read_json_values`, `csv_reader`, `dataframe_*`, `excel_*`, `append_files`, `file_save`                                                                                |
| **Integrations**          | `gmail`, `slack`, `notion`, `airtable`, `salesforce`, `hubspot`, … (every connected service exposes a node)                                                            |
| **Interaction**           | `chat_*`, `browser_extension`, `api`                                                                                                                                   |

Each builder returns a typed node object with attributes (`.text`, `.response`, `.results`, `.path_0`, etc.) you wire into downstream nodes. The full surface ships as a `.pyi` stub (`vectorshift/pipeline/node_adder.pyi`) — your editor's autocomplete is the canonical browseable catalogue.

```python theme={"languages":{}}
inp = pipeline.add(name="q").input(input_type="string")
llm = pipeline.add(name="llm").llm(
    provider="openai", model="gpt-5.1", prompt=inp.text,
)
pipeline.add(name="out").output(output_type="string", value=llm.response)
```

For runnable examples covering each category, see the [pipeline examples gallery](/sdk/pipeline/examples/llm-pipeline) — the sidebar groups them by purpose (Core, Logic & routing, Composition, Streaming, Background, Integrations, Lifecycle).

### `add_node`

```python theme={"languages":{}}
Pipeline.add_node(node: Node) -> None
```

Add a node to the pipeline. If a node with the same name already
exists, it will be replaced in-place.

**Parameters**

<ParamField path="node" type="Node" required>
  The node to add to the pipeline.
</ParamField>

### `remove_node`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.remove_node(node_id: Optional[str] = None, node_name: Optional[str] = None) -> dict[str, Any]
  ```

  ```python Async theme={"languages":{}}
  async Pipeline.aremove_node(node_id: Optional[str] = None, node_name: Optional[str] = None) -> dict[str, Any]
  ```
</CodeGroup>

Remove a node (and its connected edges) from the pipeline.

Provide either *node\_id* or *node\_name*.

**Parameters**

<ParamField path="node_id" type="Optional[str]" default="None">
  ID of the node to remove.
</ParamField>

<ParamField path="node_name" type="Optional[str]" default="None">
  Name of the node to remove.
</ParamField>

**Returns**

<ResponseField name="returns" type="dict[str, Any]">
  `\{"status": "success", "node_id": "\<resolved_node_id>"\}`
</ResponseField>

## Running

### `run`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.run(inputs: dict[str, Any], stream: bool = False, stream_all_outputs: bool = False, session_id: Optional[str] = None, node_input_overrides: Optional[dict[str, Any]] = None, send_intermediate_results: Optional[bool] = None) -> Union[dict[str, Any], Generator]
  ```

  ```python Async theme={"languages":{}}
  async Pipeline.arun(inputs: dict[str, Any], stream: bool = False, stream_all_outputs: bool = False, session_id: Optional[str] = None, node_input_overrides: Optional[dict[str, Any]] = None, send_intermediate_results: Optional[bool] = None) -> Union[dict[str, Any], AsyncGenerator]
  ```
</CodeGroup>

Run the pipeline with the specified inputs.

**Parameters**

<ParamField path="inputs" type="dict[str, Any]" required>
  Dictionary of input nodes -> input values for the pipeline. eg: \{"input\_node": "Hello, world!"}
</ParamField>

<ParamField path="stream" type="bool" default="False">
  Whether to stream the response. (Set true only when pipeline has an output node with a streaming llm input)
</ParamField>

<ParamField path="stream_all_outputs" type="bool" default="False">
  Whether to stream all outputs as they arrive.
</ParamField>

<ParamField path="session_id" type="Optional[str]" default="None">
  Optional session ID for run grouping and tracing. Groups multiple runs under the same session for analytics and observability. Note: this does not provide conversational memory to LLM nodes — each run's LLM nodes only see the current inputs.
</ParamField>

<ParamField path="node_input_overrides" type="Optional[dict[str, Any]]" default="None">
  Optional per-node input overrides.
</ParamField>

<ParamField path="send_intermediate_results" type="Optional[bool]" default="None">
  Whether to send intermediate results (default: True on server).
</ParamField>

**Returns**

<ResponseField name="returns" type="Union[dict[str, Any], Generator]">
  Union\[dict\[str, Any], Generator]: A dictionary containing pipeline outputs and run\_id. If stream is True, returns a generator that yields response chunks.
</ResponseField>

**Raises**

<ResponseField name="Exception" type="exception">
  If the pipeline execution fails.
</ResponseField>

### `bulk_run`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.bulk_run(inputs: list[dict[str, Any]]) -> dict[str, Any]
  ```

  ```python Async theme={"languages":{}}
  async Pipeline.abulk_run(inputs: list[dict[str, Any]]) -> dict[str, Any]
  ```
</CodeGroup>

Run the pipeline with a list of specified inputs.

**Parameters**

<ParamField path="inputs" type="list[dict[str, Any]]" required>
  List of dictionaries of input values for the pipeline.
</ParamField>

**Returns**

<ResponseField name="returns" type="dict[str, Any]">
  A single dictionary with two keys: `run_outputs` — a list with one entry per
  input set, each containing that run's outputs — and `status`, the overall
  bulk-run status. (Note: this is one dict wrapping all runs, not a list.)
</ResponseField>

**Raises**

<ResponseField name="Exception" type="exception">
  If the pipeline execution fails.
</ResponseField>

### `run_status`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.run_status(run_id: str) -> RunStatus
  ```

  ```python Async theme={"languages":{}}
  async Pipeline.arun_status(run_id: str) -> RunStatus
  ```
</CodeGroup>

Check the status of an async pipeline run.

**Parameters**

<ParamField path="run_id" type="str" required>
  The run/task ID returned by :meth:`start`.
</ParamField>

**Returns**

<ResponseField name="returns" type="RunStatus">
  A :class:`RunStatus` dict with keys `task_id`, `status`, and
  optionally `error` or `result`. See [`RunStatus`](#runstatus).
</ResponseField>

## Background runs

### `start`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.start(inputs: dict[str, Any], session_id: Optional[str] = None, node_input_overrides: Optional[dict[str, Any]] = None, send_intermediate_results: Optional[bool] = None, webhook_url: Optional[str] = None, version: Optional[str] = None, trace_id: Optional[str] = None) -> RunHandler
  ```

  ```python Async theme={"languages":{}}
  async Pipeline.astart(inputs: dict[str, Any], session_id: Optional[str] = None, node_input_overrides: Optional[dict[str, Any]] = None, send_intermediate_results: Optional[bool] = None, webhook_url: Optional[str] = None, version: Optional[str] = None, trace_id: Optional[str] = None) -> RunHandler
  ```
</CodeGroup>

Start pipeline in background, return a RunHandler.

**Parameters**

<ParamField path="inputs" type="dict[str, Any]" required>
  Dictionary of input values for the pipeline.
</ParamField>

<ParamField path="session_id" type="Optional[str]" default="None">
  Optional session ID for run grouping and tracing. Groups multiple runs under the same session for analytics and observability. Note: this does not provide conversational memory to LLM nodes — each run's LLM nodes only see the current inputs.
</ParamField>

<ParamField path="node_input_overrides" type="Optional[dict[str, Any]]" default="None">
  Optional per-node input overrides.
</ParamField>

<ParamField path="send_intermediate_results" type="Optional[bool]" default="None">
  Whether to send intermediate results.
</ParamField>

<ParamField path="webhook_url" type="Optional[str]" default="None">
  URL to call when the run completes.
</ParamField>

<ParamField path="version" type="Optional[str]" default="None">
  Pipeline version to run.
</ParamField>

<ParamField path="trace_id" type="Optional[str]" default="None">
  Trace ID for observability.
</ParamField>

**Returns**

<ResponseField name="returns" type="RunHandler">
  A :class:`RunHandler` for the background run.
</ResponseField>

### `terminate`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.terminate(run_id: str) -> dict[str, Any]
  ```

  ```python Async theme={"languages":{}}
  async Pipeline.aterminate(run_id: str) -> dict[str, Any]
  ```
</CodeGroup>

Terminate an active pipeline run.

**Parameters**

<ParamField path="run_id" type="str" required>
  The pipeline run ID to terminate.
</ParamField>

**Returns**

<ResponseField name="returns" type="dict[str, Any]">
  `\{"status": "success"\}`
</ResponseField>

## Streaming

### `stream`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.stream(inputs: dict[str, Any], stream_all_outputs: bool = False, session_id: Optional[str] = None, node_input_overrides: Optional[dict[str, Any]] = None, version: Optional[str] = None) -> Generator[StreamChunk, None, None]
  ```

  ```python Async theme={"languages":{}}
  Pipeline.astream(inputs: dict[str, Any], stream_all_outputs: bool = False, session_id: Optional[str] = None, node_input_overrides: Optional[dict[str, Any]] = None, version: Optional[str] = None) -> AsyncGenerator[StreamChunk, None]
  ```
</CodeGroup>

Run the pipeline with streaming, yielding StreamChunk objects.

**Parameters**

<ParamField path="inputs" type="dict[str, Any]" required>
  Dictionary of input values for the pipeline.
</ParamField>

<ParamField path="stream_all_outputs" type="bool" default="False">
  Whether to stream all outputs as they arrive.
</ParamField>

<ParamField path="session_id" type="Optional[str]" default="None">
  Optional session ID for run grouping and tracing. Groups multiple runs under the same session for analytics and observability. Note: this does not provide conversational memory to LLM nodes — each run's LLM nodes only see the current inputs.
</ParamField>

<ParamField path="node_input_overrides" type="Optional[dict[str, Any]]" default="None">
  Optional per-node input overrides.
</ParamField>

<ParamField path="version" type="Optional[str]" default="None">
  Pipeline version to run.
</ParamField>

**Returns**

<ResponseField name="returns" type="Generator[StreamChunk, None, None]">
  A generator of :class:`StreamChunk` objects.
</ResponseField>

## Sharing & publishing

### `share`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.share(user_id: Optional[str] = None, org_id: Optional[str] = None, role: "Literal[viewer, editor]" = viewer, name: Optional[str] = None) -> dict[str, Any]
  ```

  ```python Async theme={"languages":{}}
  async Pipeline.ashare(user_id: Optional[str] = None, org_id: Optional[str] = None, role: "Literal[viewer, editor]" = viewer, name: Optional[str] = None) -> dict[str, Any]
  ```
</CodeGroup>

Share this pipeline with a user or organization.

At least one of *user\_id* or *org\_id* is required.

**Parameters**

<ParamField path="user_id" type="Optional[str]" default="None">
  User ID to share with.
</ParamField>

<ParamField path="org_id" type="Optional[str]" default="None">
  Organization ID to share with.
</ParamField>

<ParamField path="role" type="Literal[viewer, editor]" default="'viewer'">
  Permission role (`"viewer"` or `"editor"`).
</ParamField>

<ParamField path="name" type="Optional[str]" default="None">
  Display name for the shared entity.
</ParamField>

**Returns**

<ResponseField name="returns" type="dict[str, Any]">
  `\{"status": "success"\}`
</ResponseField>

### `unshare`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.unshare(user_id: Optional[str] = None, org_id: Optional[str] = None) -> dict[str, Any]
  ```

  ```python Async theme={"languages":{}}
  async Pipeline.aunshare(user_id: Optional[str] = None, org_id: Optional[str] = None) -> dict[str, Any]
  ```
</CodeGroup>

Remove sharing for this pipeline.

At least one of *user\_id* or *org\_id* is required.

**Parameters**

<ParamField path="user_id" type="Optional[str]" default="None">
  User ID to unshare.
</ParamField>

<ParamField path="org_id" type="Optional[str]" default="None">
  Organization ID to unshare.
</ParamField>

**Returns**

<ResponseField name="returns" type="dict[str, Any]">
  `\{"status": "success"\}`
</ResponseField>

### `publish`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.publish(title: str, description: str = '', tags: Optional[list[str]] = None, internal: bool = False) -> dict[str, Any]
  ```

  ```python Async theme={"languages":{}}
  async Pipeline.apublish(title: str, description: str = '', tags: Optional[list[str]] = None, internal: bool = False) -> dict[str, Any]
  ```
</CodeGroup>

Publish this pipeline to the marketplace.

**Parameters**

<ParamField path="title" type="str" required>
  Marketplace listing title.
</ParamField>

<ParamField path="description" type="str" default="''">
  Marketplace listing description.
</ParamField>

<ParamField path="tags" type="Optional[list[str]]" default="None">
  Optional list of tags.
</ParamField>

<ParamField path="internal" type="bool" default="False">
  If True, publish as internal-only.
</ParamField>

**Returns**

<ResponseField name="returns" type="dict[str, Any]">
  `\{"status": "success", "id": "\<marketplace_object_id>"\}`
</ResponseField>

### `unpublish`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.unpublish(marketplace_id: str) -> dict[str, Any]
  ```

  ```python Async theme={"languages":{}}
  async Pipeline.aunpublish(marketplace_id: str) -> dict[str, Any]
  ```
</CodeGroup>

Remove this pipeline from the marketplace.

**Parameters**

<ParamField path="marketplace_id" type="str" required>
  The marketplace listing ID to remove.
</ParamField>

**Returns**

<ResponseField name="returns" type="dict[str, Any]">
  `\{"status": "success"\}`
</ResponseField>

### `move_to_folder`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.move_to_folder(folder_id: str) -> dict[str, Any]
  ```

  ```python Async theme={"languages":{}}
  async Pipeline.amove_to_folder(folder_id: str) -> dict[str, Any]
  ```
</CodeGroup>

Move the pipeline to a different folder.

**Parameters**

<ParamField path="folder_id" type="str" required>
  Target folder ID.
</ParamField>

**Returns**

<ResponseField name="returns" type="dict[str, Any]">
  `\{"status": "success"\}`
</ResponseField>

## Versioning

### `revert`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Pipeline.revert(version: str) -> dict[str, Any]
  ```

  ```python Async theme={"languages":{}}
  async Pipeline.arevert(version: str) -> dict[str, Any]
  ```
</CodeGroup>

Revert pipeline to a specific version.

.. note:

```python theme={"languages":{}}
The local `Pipeline` object is **not** updated after this call.
Call `Pipeline.fetch(id=...)` to get the reverted state.
```

**Parameters**

<ParamField path="version" type="str" required>
  Semantic version string, e.g. `"1.2.3"`.
</ParamField>

**Returns**

<ResponseField name="returns" type="dict[str, Any]">
  `\{"status": "success"\}`
</ResponseField>

## Serialization

### `to_dict`

```python theme={"languages":{}}
Pipeline.to_dict() -> dict
```

Convert Pipeline to ObjectInfo dict format for use in other nodes.

**Returns**

<ResponseField name="returns" type="dict" />

### `from_json`

```python theme={"languages":{}}
Pipeline.from_json(data: dict) -> Pipeline
```

**Parameters**

<ParamField path="data" type="dict" required />

**Returns**

<ResponseField name="returns" type="Pipeline" />

### `serialize_inputs`

```python theme={"languages":{}}
Pipeline.serialize_inputs(inputs: dict[str, Any]) -> dict[str, Any]
```

**Parameters**

<ParamField path="inputs" type="dict[str, Any]" required />

**Returns**

<ResponseField name="returns" type="dict[str, Any]" />

## Types

Configuration objects, response shapes, and enums used by the methods above.

### `BumpLevel`

**Members**

* `PATCH` = `"patch"`
* `MINOR` = `"minor"`
* `MAJOR` = `"major"`

### `RunResult`

Response from :meth:`Pipeline.run` / :meth:`Pipeline.arun`.

**Fields**

<ParamField path="run_id" type="str" required />

<ParamField path="outputs" type="dict[str, Any]" required />

<ParamField path="trace_id" type="str" required />

### `RunStatus`

Response from :meth:`Pipeline.run_status` / :meth:`RunHandler.run_status`.

**Fields**

<ParamField path="task_id" type="str" required />

<ParamField path="status" type="Literal[in_progress, completed, failed]" required />

<ParamField path="error" type="str" required />

<ParamField path="result" type="dict[str, Any]" required />

### `StartResult`

Response from :meth:`Pipeline.start` background run initiation.

**Fields**

<ParamField path="task_id" type="str" required />

<ParamField path="trace_id" type="str" required />
