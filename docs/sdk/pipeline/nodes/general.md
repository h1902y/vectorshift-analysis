> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# General nodes

> Text, saving files, and running pipelines, agents, and transformations.

Add these nodes with the pipeline builder: `pipeline.add(name="...").<node>(...)`. Each entry lists the node's configuration parameters. See the [Pipeline reference](/sdk/pipeline/reference) for `add`, `run`, and lifecycle methods.

<a id="agent" />

## `agent` — Agent

Agent

<Info>Platform docs: [Agent](/nodes/agent/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").agent(use_existing_agent=True, agent=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="use_existing_agent" type="bool" required />

<ParamField path="agent" type="AcceptsAgent" required />

<ParamField path="model" type="str" default="'gpt-5.4'" />

<ParamField path="agent_config" type="Any" default="{}" />

<ParamField path="processed_inputs" type="dict" default="{}" />

<ParamField path="processed_outputs" type="dict" default="{}" />

<ParamField path="provider" type="str" default="'openai'" />

<a id="create_skill" />

## `create_skill` — Create Skill

Create a new skill with a name, description, and content

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").create_skill(content="...", name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="content" type="str" required />

<ParamField path="name" type="str" required />

<ParamField path="skill_description" type="str" default="''" />

<a id="file_save" />

## `file_save` — File Save

Save a file on the VectorShift platform (under the 'Files' tab).

<Info>Platform docs: [File Save](/nodes/file-save/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").file_save(files=..., name="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="files" type="AcceptsFileList" required />

<ParamField path="name" type="str" required />

<a id="get_skill" />

## `get_skill` — Get Skill

Retrieve the full content of a skill by its ID

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").get_skill(skill=...)
  ```
</CodeGroup>

**Parameters**

<ParamField path="skill" type="Any | ListType | list[Any]" required />

<a id="list_objects" />

## `list_objects` — List Objects

List VectorShift objects accessible to the current user

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").list_objects(object_type="agent")
  ```
</CodeGroup>

**Parameters**

<ParamField path="include_shared" type="bool" default="True" />

<ParamField path="limit" type="int" default="0" />

<ParamField path="object_type" type="str" required>
  One of: `agent`, `knowledge_base`, `pipeline`, `prompt`, `table`, `transformation`
</ParamField>

<ParamField path="offset" type="int" default="0" />

<ParamField path="verbose" type="bool" default="False" />

<a id="pipeline" />

## `pipeline` — Pipeline

\{\{collection.pipelines}}

<Info>Platform docs: [Pipeline](/nodes/workflow/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").pipeline()
  ```
</CodeGroup>

**Parameters**

<ParamField path="pipeline" type="AcceptsPipeline" default="{}" />

<a id="share_object" />

## `share_object` — Share Object

Share a VectorShift object with another user

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").share_object(user_identifier="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="object_type" type="str" default="'knowledge_base'">
  One of: `knowledge_base`
</ParamField>

<ParamField path="object" type="AcceptsKnowledgeBase" />

<ParamField path="org_name" type="str" default="''">
  Enter the name of the organization of the user (leave blank if not part of org)
</ParamField>

<ParamField path="user_identifier" type="str" required>
  Enter the username or email of the user you want to share with
</ParamField>

<a id="text" />

## `text` — Text

Accepts Text from upstream nodes and allows you to write additional text / concatenate different texts to pass to downstream nodes.

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").text(text="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="text" type="str" required />

<a id="transformation" />

## `transformation` — Transformation

Use Python code to create a custom node

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").transformation()
  ```
</CodeGroup>
