> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Portal reference

> Group related workspaces and the agents and skills available to them.

A `Portal` groups related workspaces together and exposes the agents and skills
available to them. Create workspaces under a portal with
`portal.workspaces.new(...)` or `portal.workspaces.get_or_create(...)`, and list
them with `portal.workspaces.list()`.

## Lifecycle

### `new`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Portal.new(name: str, description: Optional[str] = None, deployed: Optional[bool] = None, features: Optional[dict] = None, deployment_options: Optional[dict] = None, access_config: Optional[dict] = None, tabs: Optional[list] = None, default_chatbot_id: Optional[str] = None) -> Portal
  ```

  ```python Async theme={"languages":{}}
  async Portal.anew(name: str, description: Optional[str] = None, deployed: Optional[bool] = None, features: Optional[dict] = None, deployment_options: Optional[dict] = None, access_config: Optional[dict] = None, tabs: Optional[list] = None, default_chatbot_id: Optional[str] = None) -> Portal
  ```
</CodeGroup>

Create a new portal.

**Parameters**

<ParamField path="name" type="str" required />

<ParamField path="description" type="Optional[str]" default="None" />

<ParamField path="deployed" type="Optional[bool]" default="None" />

<ParamField path="features" type="Optional[dict]" default="None" />

<ParamField path="deployment_options" type="Optional[dict]" default="None" />

<ParamField path="access_config" type="Optional[dict]" default="None" />

<ParamField path="tabs" type="Optional[list]" default="None" />

<ParamField path="default_chatbot_id" type="Optional[str]" default="None" />

**Returns**

<ResponseField name="returns" type="Portal" />

### `fetch`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Portal.fetch(id: Optional[str] = None, name: Optional[str] = None) -> Portal
  ```

  ```python Async theme={"languages":{}}
  async Portal.afetch(id: Optional[str] = None, name: Optional[str] = None) -> Portal
  ```
</CodeGroup>

Fetch an existing portal by id or name.

**Parameters**

<ParamField path="id" type="Optional[str]" default="None" />

<ParamField path="name" type="Optional[str]" default="None" />

**Returns**

<ResponseField name="returns" type="Portal" />

### `list`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Portal.list(limit: int = 50, offset: int = 0) -> PortalList
  ```

  ```python Async theme={"languages":{}}
  async Portal.alist(limit: int = 50, offset: int = 0) -> PortalList
  ```
</CodeGroup>

List portals visible to the caller.

**Parameters**

<ParamField path="limit" type="int" default="50" />

<ParamField path="offset" type="int" default="0" />

**Returns**

<ResponseField name="returns" type="PortalList">
  See [`PortalList`](#portallist).
</ResponseField>

### `update`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Portal.update(description: Any = UNSET, deployed: Any = UNSET, features: Any = UNSET, deployment_options: Any = UNSET, access_config: Any = UNSET, tabs: Any = UNSET) -> Portal
  ```

  ```python Async theme={"languages":{}}
  async Portal.aupdate(description: Any = UNSET, deployed: Any = UNSET, features: Any = UNSET, deployment_options: Any = UNSET, access_config: Any = UNSET, tabs: Any = UNSET) -> Portal
  ```
</CodeGroup>

Update the portal's settings. Omitted fields are left unchanged.

**Parameters**

<ParamField path="description" type="Any" default="UNSET" />

<ParamField path="deployed" type="Any" default="UNSET" />

<ParamField path="features" type="Any" default="UNSET" />

<ParamField path="deployment_options" type="Any" default="UNSET" />

<ParamField path="access_config" type="Any" default="UNSET" />

<ParamField path="tabs" type="Any" default="UNSET" />

**Returns**

<ResponseField name="returns" type="Portal" />

### `delete`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Portal.delete() -> None
  ```

  ```python Async theme={"languages":{}}
  async Portal.adelete() -> None
  ```
</CodeGroup>

## Agents & skills

### `agents`

```python theme={"languages":{}}
Portal.agents()
```

Org agents, if this portal enables agent projects (else `[]`).

### `agent`

```python theme={"languages":{}}
Portal.agent(name: Optional[str] = None)
```

Resolve a single agent by name, or the only one when `name` is None.

**Parameters**

<ParamField path="name" type="Optional[str]" default="None" />

### `skills`

```python theme={"languages":{}}
Portal.skills()
```

Org skills, if this portal enables skills (else `[]`).

## Sessions

### `create_session`

<CodeGroup>
  ```python Sync theme={"languages":{}}
  Portal.create_session()
  ```

  ```python Async theme={"languages":{}}
  async Portal.acreate_session()
  ```
</CodeGroup>

Open a session on the portal's default chatbot.

## Types

Configuration objects, response shapes, and enums used by the methods above.

### `PortalList`

**Fields**

<ParamField path="portals" type="list[PortalListEntry]" required />

<ParamField path="offset" type="int" required />

<ParamField path="limit" type="int" required />

<ParamField path="total" type="int" required />

### `PortalListEntry`

**Fields**

<ParamField path="id" type="str" required />

<ParamField path="name" type="str" required />

<ParamField path="description" type="str" required />

### `SkillList`

**Fields**

<ParamField path="skills" type="list[SkillEntry]" required />

<ParamField path="offset" type="int" required />

<ParamField path="limit" type="int" required />

<ParamField path="total" type="int" required />

### `SkillEntry`

**Fields**

<ParamField path="id" type="str" required />

<ParamField path="name" type="str" required />

<ParamField path="description" type="str" required />
