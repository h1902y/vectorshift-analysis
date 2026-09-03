> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Workspace reference

> Organize documents into secure data rooms, chat with them, and verify them for errors.

## Lifecycle

### `new`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Workspace.new(name: str, portal: Optional[Any] = None, description: Optional[str] = None) -> Workspace
  ```

  ```python Async theme={"languages":{}}
  async Workspace.anew(name: str, portal: Optional[Any] = None, description: Optional[str] = None) -> Workspace
  ```
</CodeGroup>

Create a new workspace under the given (or resolved) portal.

**Parameters**

<ParamField path="name" type="str" required />

<ParamField path="portal" type="Optional[Any]" default="None" />

<ParamField path="description" type="Optional[str]" default="None" />

**Returns**

<ResponseField name="returns" type="Workspace" />

### `get_or_create`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Workspace.get_or_create(name: str, portal: Optional[Any] = None, description: Optional[str] = None) -> Workspace
  ```

  ```python Async theme={"languages":{}}
  async Workspace.aget_or_create(name: str, portal: Optional[Any] = None, description: Optional[str] = None) -> Workspace
  ```
</CodeGroup>

Fetch by name, creating it if missing. Idempotent.

**Parameters**

<ParamField path="name" type="str" required />

<ParamField path="portal" type="Optional[Any]" default="None" />

<ParamField path="description" type="Optional[str]" default="None" />

**Returns**

<ResponseField name="returns" type="Workspace" />

### `fetch`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Workspace.fetch(id: Optional[str] = None, name: Optional[str] = None) -> Workspace
  ```

  ```python Async theme={"languages":{}}
  async Workspace.afetch(id: Optional[str] = None, name: Optional[str] = None) -> Workspace
  ```
</CodeGroup>

Fetch an existing workspace by id or name.

**Parameters**

<ParamField path="id" type="Optional[str]" default="None" />

<ParamField path="name" type="Optional[str]" default="None" />

**Returns**

<ResponseField name="returns" type="Workspace" />

### `list`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Workspace.list(limit: int = 50, offset: int = 0) -> WorkspaceList
  ```

  ```python Async theme={"languages":{}}
  async Workspace.alist(limit: int = 50, offset: int = 0) -> WorkspaceList
  ```
</CodeGroup>

List workspaces visible to the caller.

**Parameters**

<ParamField path="limit" type="int" default="50" />

<ParamField path="offset" type="int" default="0" />

**Returns**

<ResponseField name="returns" type="WorkspaceList">
  See [`WorkspaceList`](#workspacelist).
</ResponseField>

### `update`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Workspace.update(name: Any = UNSET, description: Any = UNSET) -> Workspace
  ```

  ```python Async theme={"languages":{}}
  async Workspace.aupdate(name: Any = UNSET, description: Any = UNSET) -> Workspace
  ```
</CodeGroup>

Update the workspace's name and/or description. Omitted fields are left unchanged.

**Parameters**

<ParamField path="name" type="Any" default="UNSET" />

<ParamField path="description" type="Any" default="UNSET" />

**Returns**

<ResponseField name="returns" type="Workspace" />

### `delete`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Workspace.delete() -> None
  ```

  ```python Async theme={"languages":{}}
  async Workspace.adelete() -> None
  ```
</CodeGroup>

## Documents

### `upload`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Workspace.upload(*paths_or_files)
  ```

  ```python Async theme={"languages":{}}
  async Workspace.aupload(*paths_or_files)
  ```
</CodeGroup>

Upload one or more files (or folders) into this workspace's data room.

**Parameters**

<ParamField path="*paths_or_files" />

## Sessions

### `create_session`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Workspace.create_session(documents=None)
  ```

  ```python Async theme={"languages":{}}
  async Workspace.acreate_session(documents=None)
  ```
</CodeGroup>

Open a chat session for asking questions about this workspace's documents.

**Parameters**

<ParamField path="documents" default="None" />

## Types

Configuration objects, response shapes, and enums used by the methods above.

### `WorkspaceList`

**Fields**

<ParamField path="workspaces" type="list[WorkspaceListEntry]" required />

<ParamField path="offset" type="int" required />

<ParamField path="limit" type="int" required />

<ParamField path="total" type="int" required />

### `WorkspaceListEntry`

**Fields**

<ParamField path="id" type="str" required />

<ParamField path="name" type="str" required />

<ParamField path="description" type="str" required />

<ParamField path="portal_id" type="str" required />
