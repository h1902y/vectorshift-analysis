> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Agent reference

> Build agents with tools and run multi-turn streaming conversations.

## Lifecycle

### `new`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Agent.new(name: str, llm_info: LlmInfo, tools: Optional[list[Tool]] = None, instructions: Optional[str] = None, inputs: Optional[Dict[str, IoConfig]] = None, outputs: Optional[Dict[str, IoConfig]] = None, agent_type: Optional[AgentType] = None, type: Optional[AgentType] = None, memory_config: Optional[MemoryConfig] = None) -> Agent
  ```

  ```python Async theme={"languages":{}}
  async Agent.anew(name: str, llm_info: LlmInfo, tools: Optional[list[Tool]] = None, instructions: Optional[str] = None, inputs: Optional[Dict[str, IoConfig]] = None, outputs: Optional[Dict[str, IoConfig]] = None, agent_type: Optional[AgentType] = None, type: Optional[AgentType] = None, memory_config: Optional[MemoryConfig] = None) -> Agent
  ```
</CodeGroup>

Create a new agent with the specified parameters.

**Parameters**

<ParamField path="name" type="str" required>
  The name of the agent.
</ParamField>

<ParamField path="llm_info" type="LlmInfo" required>
  Configuration for the language model to use. See [`LlmInfo`](#llminfo).
</ParamField>

<ParamField path="tools" type="Optional[list[Tool]]" default="None">
  List of tools available to the agent. See [`Tool`](#tool).
</ParamField>

<ParamField path="instructions" type="Optional[str]" default="None">
  Instructions for the agent.
</ParamField>

<ParamField path="inputs" type="Optional[Dict[str, IoConfig]]" default="None">
  Dictionary mapping input names to their configurations. See [`IoConfig`](#ioconfig).
</ParamField>

<ParamField path="outputs" type="Optional[Dict[str, IoConfig]]" default="None">
  Dictionary mapping output names to their configurations. See [`IoConfig`](#ioconfig).
</ParamField>

<ParamField path="agent_type" type="Optional[AgentType]" default="None">
  The type of agent (FUNCTIONAL or CONVERSATIONAL). See [`AgentType`](#agenttype).
</ParamField>

<ParamField path="type" type="Optional[AgentType]" default="None">
  Alias for agent\_type. See [`AgentType`](#agenttype).
</ParamField>

<ParamField path="memory_config" type="Optional[MemoryConfig]" default="None">
  Memory configuration (conversational agents only). See [`MemoryConfig`](#memoryconfig).
</ParamField>

**Returns**

<ResponseField name="returns" type="Agent">
  A new Agent instance.
</ResponseField>

**Raises**

<ResponseField name="Exception" type="exception">
  If the agent creation fails.
</ResponseField>

### `save`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Agent.save(deploy: bool = False, bump: bool = False, description: Optional[str] = None) -> dict
  ```

  ```python Async theme={"languages":{}}
  async Agent.asave(deploy: bool = False, bump: bool = False, description: Optional[str] = None) -> dict
  ```
</CodeGroup>

Save the agent with its current configuration.

Updates the agent on the server with the current name, LLM configuration, tools,
instructions, inputs and outputs.

### `deploy=True` vs `deploy=False` — the branch model

Think of an agent like a Git repo:

* **Working tree** — the `Agent` object in your Python process. Mutations like `add_tool`, `remove_tool`, or reassigning `instructions` happen here.
* **Main branch** — the `branch_id` on the server. `save(deploy=False)` writes your working tree to this branch as a new commit. Anything reading by `branch_id` (the platform editor, your own dev/test code) immediately sees the change.
* **Deployed version** — what callers of the *published* agent get. Chatbots, interfaces, pipelines that reference the agent by id-without-version, and the platform's "Run published" button all read this version. `save(deploy=True)` promotes the current main-branch state to be the new deployed version.

Bumping versions (`bump=True`) attaches a tagged release to the deploy so consumers can pin to a specific build instead of always tracking the latest deployed.

In practice:

* Iterating on prompts/tools? `save(deploy=False)` — fast, no production fallout.
* Ready for users? `save(deploy=True)` (optionally with `bump=True` + `description=...` for a labelled version).

**Parameters**

<ParamField path="deploy" type="bool" default="False">
  When `True`, promotes the saved state to be the new deployed version that callers of the published agent will hit. When `False`, only updates the working/main branch — the deployed version is untouched until the next `save(deploy=True)`.
</ParamField>

<ParamField path="bump" type="bool" default="False">
  When `True` (only meaningful with `deploy=True`), creates a new tagged version on deploy so consumers can pin to it.
</ParamField>

<ParamField path="description" type="Optional[str]" default="None">
  Updates the agent description; also used as the changelog when bumping a version.
</ParamField>

**Returns**

<ResponseField name="returns" type="dict">
  dict: A dictionary containing the status of the save operation.
</ResponseField>

**Raises**

<ResponseField name="Exception" type="exception">
  If the agent update fails.
</ResponseField>

### `fetch`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Agent.fetch(id: Optional[str] = None, name: Optional[str] = None, username: Optional[str] = None, org_name: Optional[str] = None) -> Agent
  ```

  ```python Async theme={"languages":{}}
  async Agent.afetch(id: Optional[str] = None, name: Optional[str] = None, username: Optional[str] = None, org_name: Optional[str] = None) -> Agent
  ```
</CodeGroup>

Fetches an existing agent.

**Parameters**

<ParamField path="id" type="Optional[str]" default="None">
  The unique identifier of the agent to fetch.
</ParamField>

<ParamField path="name" type="Optional[str]" default="None">
  The name of the agent to fetch.
</ParamField>

<ParamField path="username" type="Optional[str]" default="None">
  The username of the agent owner.
</ParamField>

<ParamField path="org_name" type="Optional[str]" default="None">
  The organization name of the agent owner.
</ParamField>

**Returns**

<ResponseField name="returns" type="Agent">
  Agent: The fetched Agent instance.
</ResponseField>

**Raises**

<ResponseField name="ValueError" type="exception">
  If neither id nor name is provided.
</ResponseField>

<ResponseField name="Exception" type="exception">
  If the agent couldn't be fetched.
</ResponseField>

### `list`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Agent.list(limit: int = 50, offset: int = 0, include_shared: bool = False) -> "list[Agent]"
  ```

  ```python Async theme={"languages":{}}
  async Agent.alist(limit: int = 50, offset: int = 0, include_shared: bool = False) -> list[Agent]
  ```
</CodeGroup>

List agents for the authenticated user.

**Parameters**

<ParamField path="limit" type="int" default="50">
  Maximum number of agents to return.
</ParamField>

<ParamField path="offset" type="int" default="0">
  Number of agents to skip.
</ParamField>

<ParamField path="include_shared" type="bool" default="False">
  Whether to include agents shared with the user.
</ParamField>

**Returns**

<ResponseField name="returns" type="list[Agent]">
  list\[Agent]: List of Agent instances (or lightweight stubs with id only
  if the server returns object\_ids without full objects).
</ResponseField>

### `delete`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Agent.delete() -> dict
  ```

  ```python Async theme={"languages":{}}
  async Agent.adelete() -> dict
  ```
</CodeGroup>

Deletes an existing agent.

**Returns**

<ResponseField name="returns" type="dict">
  dict: A dictionary containing the status of the deletion operation.
</ResponseField>

**Raises**

<ResponseField name="Exception" type="exception">
  If the agent couldn't be deleted.
</ResponseField>

## Tools

### `tools`

```python theme={"languages":{}}
agent.tools  # list[Tool]  (instance attribute)
```

The list of tools currently attached to this agent. Mutated in place by `add_tool` / `remove_tool` (and by direct `agent.tools = [...]` assignment). Persisted to the platform on the next `agent.save()`.

### `add_tool`

```python theme={"languages":{}}
agent.add_tool  # _BoundToolAdder  (instance attribute)
```

Fluent adder for attaching tools to an agent instance. Every entry in the platform tool catalogue is reachable as a method — `agent.add_tool.<tool_type>(...)`. Each factory call requires a non-empty `tool_name=` (the LLM-facing name, unique within the agent) — omitting it raises `ValueError`. The call mutates `agent.tools` in place; persist with `agent.save()` afterwards.

```python theme={"languages":{}}
from vectorshift.agent.tool import ToolInput, ToolInputType, ToolApprovalConfig

agent.add_tool.google_search(
    tool_name="web_search",
    query=ToolInput(type=ToolInputType.DYNAMIC, description="Search query"),
    num_results=5,
    approval_config=ToolApprovalConfig.LET_AGENT_DECIDE,
)
agent.save()
```

### `AgentTools` catalogue

```python theme={"languages":{}}
from vectorshift.agent import AgentTools
```

Class-level namespace exposing every tool in the platform catalogue — currently **261 tools** including web search (`exa_ai`, `google_search`, `perplexity`), knowledge & retrieval (`knowledge_base`, `deep_research`, `parallel_ai_search`), code & data (`code_interpreter`, `dataframe_get_schema`, `dataframe_raw_query`), media (`ai_text_to_image`, `ai_image_to_text`, `ai_text_to_speech`), integrations (`integration_*` for every connected service), pipelines, transformations, and more.

Every `AgentTools.<tool_type>(...)` factory requires a non-empty `tool_name=` (unique within the agent); omitting it raises `ValueError`.

Two invocation patterns:

```python theme={"languages":{}}
# 1) Pass into Agent.new(tools=[...]) at construction time:
agent = Agent.new(
    name="Researcher",
    type=AgentType.CONVERSATIONAL,
    llm_info=LlmInfo(provider="openai", model_id="gpt-5.1"),
    tools=[
        AgentTools.exa_ai(
            tool_name="search",
            query=ToolInput(type=ToolInputType.DYNAMIC),
            num_results=5,
        ),
        AgentTools.knowledge_base(id=kb.id, tool_name="docs"),
    ],
)

# 2) Or via the bound adder on an existing agent (see `add_tool` above).
```

The full catalogue is generated from the platform's tool registry and ships as a typed `.pyi` stub (`vectorshift/agent/agent_tools.pyi`) — your editor's autocomplete is the canonical browseable catalogue. The [`conversational-agent-tools` example](/sdk/agent/examples/conversational-agent-tools) and [`tool-approval-config` example](/sdk/agent/examples/tool-approval-config) show the most common entries end-to-end.

## Configuration

### `update_instructions`

```python theme={"languages":{}}
Agent.update_instructions(instructions: str) -> None
```

Update the instructions for the agent.

**Parameters**

<ParamField path="instructions" type="str" required />

### `update_llm_info`

```python theme={"languages":{}}
Agent.update_llm_info(llm_info: LlmInfo) -> None
```

Update the LLM configuration for the agent.

**Parameters**

<ParamField path="llm_info" type="LlmInfo" required>
  See [`LlmInfo`](#llminfo).
</ParamField>

### `remove_tool`

```python theme={"languages":{}}
Agent.remove_tool(tool_or_name: Union[Tool, str]) -> None
```

Remove a tool by instance, name, or tool\_type.

**Parameters**

<ParamField path="tool_or_name" type="Union[Tool, str]" required>
  See [`Tool`](#tool).
</ParamField>

## Running

### `run`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Agent.run(inputs: Any = None, additional_instructions: Optional[str] = None, *, files: Optional[Sequence[Union[Path, bytes, io.IOBase]]] = None, session_id: Optional[str] = None, keep_alive: bool = False, include_deltas: bool = False) -> Union[AgentRunResult, Coroutine[Any, Any, ConversationalAgentRunResult]]
  ```

  ```python Async theme={"languages":{}}
  async Agent.arun(inputs: Any = None, additional_instructions: Optional[str] = None, *, files: Optional[Sequence[Union[Path, bytes, io.IOBase]]] = None, session_id: Optional[str] = None, keep_alive: bool = False, include_deltas: bool = False) -> Union[AgentRunResult, ConversationalAgentRunResult]
  ```
</CodeGroup>

Run the agent.

Dispatches on :attr:`agent_type`:

* Functional — `agent.run(inputs=\{...\})` runs synchronously
  and returns an :class:`AgentRunResult`.
* Conversational (experimental) — `await agent.run("...")`
  opens a hidden session, posts one turn, waits for the final
  message, and returns a :class:`ConversationalAgentRunResult`.
  Pass `session_id` to resume an existing session for one
  turn; pass `keep_alive=True` to keep a hidden session
  reachable across calls. `include_deltas=False` (default)
  drops `MESSAGE_DELTA` events from `result.events` so
  long turns don't bloat the result; pass `True` to keep
  them for debugging — `final_message` is unaffected either
  way. The primary supported path for conversational agents
  is still :meth:`create_session`; this is a convenience
  wrapper for ask-once-and-wait flows.

**Parameters**

<ParamField path="inputs" type="Any" default="None" />

<ParamField path="additional_instructions" type="Optional[str]" default="None" />

<ParamField path="files" type="Optional[Sequence[Union[Path, bytes, io.IOBase]]]" default="None" />

<ParamField path="session_id" type="Optional[str]" default="None" />

<ParamField path="keep_alive" type="bool" default="False" />

<ParamField path="include_deltas" type="bool" default="False" />

**Returns**

<ResponseField name="returns" type="Union[AgentRunResult, Coroutine[Any, Any, ConversationalAgentRunResult]]">
  See [`AgentRunResult`](#agentrunresult).
</ResponseField>

**Raises**

<ResponseField name="ValueError" type="exception">
  If the call shape does not match the agent type.
</ResponseField>

<ResponseField name="ConversationalRunActionRequiredError" type="exception">
  If the conversational turn requires approval/reauth — use :meth:`create_session` or :meth:`resume_session` to handle it.
</ResponseField>

## Sessions

### `create_session`

```python theme={"languages":{}}
async Agent.create_session(session_id: Optional[str] = None) -> Session
```

Create a real-time session for this conversational agent.

**Parameters**

<ParamField path="session_id" type="Optional[str]" default="None">
  Optional session ID to resume an existing session.
</ParamField>

**Returns**

<ResponseField name="returns" type="Session">
  Session: A Session instance (not yet connected; use as async context manager).
</ResponseField>

**Raises**

<ResponseField name="ValueError" type="exception">
  If agent is functional (use run() instead).
</ResponseField>

### `resume_session`

```python theme={"languages":{}}
async Agent.resume_session(session_id: str) -> Session
```

Resume an existing session by ID.

**Parameters**

<ParamField path="session_id" type="str" required>
  The session ID to reconnect to.
</ParamField>

**Returns**

<ResponseField name="returns" type="Session">
  Session: A Session instance (not yet connected; use as async context manager).
</ResponseField>

**Raises**

<ResponseField name="ValueError" type="exception">
  If agent is functional or session\_id is empty.
</ResponseField>

## Serialization

### `from_json`

```python theme={"languages":{}}
Agent.from_json(data: dict) -> Agent
```

Create an agent instance from a JSON dictionary.

**Parameters**

<ParamField path="data" type="dict" required />

**Returns**

<ResponseField name="returns" type="Agent" />

### `serialize_inputs`

```python theme={"languages":{}}
Agent.serialize_inputs(inputs: dict[str, Any]) -> dict[str, Any]
```

**Parameters**

<ParamField path="inputs" type="dict[str, Any]" required />

**Returns**

<ResponseField name="returns" type="dict[str, Any]" />

## Types

Configuration objects, response shapes, and enums used by the methods above.

### `AgentType`

**Members**

* `FUNCTIONAL` = `"functional"`
* `CONVERSATIONAL` = `"conversational"`

### `LlmInfo`

**Fields**

<ParamField path="provider" type="str" required />

<ParamField path="model_id" type="str" required />

<ParamField path="api_key" type="Optional[str]" />

<ParamField path="fine_tuned_model_id" type="Optional[str]" />

<ParamField path="endpoint" type="Optional[str]" />

<ParamField path="deployment_id" type="Optional[str]" />

<ParamField path="stream_response" type="bool" default="False" />

<ParamField path="json_output" type="bool" default="True" />

<ParamField path="show_source" type="bool" default="False" />

<ParamField path="show_confidence" type="bool" default="False" />

<ParamField path="enable_tools" type="bool" default="True" />

<ParamField path="toxic_input_filtration" type="bool" default="False" />

<ParamField path="detect_pii" type="Optional[vectorshift.agent.object.DetectPii]" />

<ParamField path="base_url" type="Optional[str]" />

<ParamField path="max_retries" type="Optional[int]" />

<ParamField path="retry_interval_ms" type="Optional[int]" />

### `IoConfig`

**Fields**

<ParamField path="io_type" type="str" required />

<ParamField path="description" type="Optional[str]" default="''" />

<ParamField path="server_id" type="Optional[str]" />

### `MemoryConfig`

MemoryConfig(enable\_session\_memory: 'bool' = True, enable\_global\_memory: 'bool' = False)

**Fields**

<ParamField path="enable_session_memory" type="bool" default="True" />

<ParamField path="enable_global_memory" type="bool" default="False" />

### `AgentRunResult`

AgentRunResult(outputs: 'dict\[str, Any]', run\_id: 'str', status: 'str', error: 'Optional\[str]' = None)

**Fields**

<ParamField path="outputs" type="dict[str, Any]" required />

<ParamField path="run_id" type="str" required />

<ParamField path="status" type="str" required />

<ParamField path="error" type="Optional[str]" />

### `Tool`

### `ToolInput`

**Fields**

<ParamField path="type" type="str" default="'static'" />

<ParamField path="value" type="Optional[Any]" />

<ParamField path="description" type="Optional[str]" />

### `ToolInputType`

**Members**

* `STATIC` = `"static"`
* `DYNAMIC` = `"dynamic"`

### `ToolApprovalConfig`

**Members**

* `AUTO_RUN` = `"auto_run"`
* `LET_AGENT_DECIDE` = `"let_agent_decide"`
* `REQUIRES_APPROVAL` = `"requires_approval"`
