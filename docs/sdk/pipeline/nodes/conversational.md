> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Conversational nodes

> Talk and listen nodes for conversational interfaces.

Add these nodes with the pipeline builder: `pipeline.add(name="...").<node>(...)`. Each entry lists the node's configuration parameters. See the [Pipeline reference](/sdk/pipeline/reference) for `add`, `run`, and lifecycle methods.

<a id="listen" />

## `listen` — Listen

Listen for user input at a stage in the conversation.

<Info>Platform docs: [Listen](/nodes/listen-capture/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").listen()
  ```
</CodeGroup>

**Parameters**

<ParamField path="variant" type="str" default="''">
  One of: `button`, `capture`
</ParamField>

<ParamField path="allow_user_message" type="bool" default="False" />

<ParamField path="buttons" type="ListType | list[List[Dict[str, Any]]] | list[NameItem]" default="[]" />

<ParamField path="processed_outputs" type="dict" default="{}" />

<a id="post_message" />

## `post_message` — Post Message

Post a message to a session

<Info>Platform docs: [Post Message](/nodes/post-message/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").post_message(message="...", session_id="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="message" type="str" required />

<ParamField path="session_id" type="str" required />

<a id="talk" />

## `talk` — Talk

Send a given message at a stage in a conversation.

<Info>Platform docs: [Talk](/nodes/talk-message/overview)</Info>

<CodeGroup>
  ```python Sync theme={"languages":{}}
  pipeline.add(name="node").talk(content="...", description="...", image_url=..., title="...")
  ```
</CodeGroup>

**Parameters**

<ParamField path="variant" type="str" default="''">
  One of: `card`, `carousel`, `image`, `message`
</ParamField>

<ParamField path="is_iframe" type="bool" default="False" />

<ParamField path="content" type="str" required>
  The text to send to the user.
</ParamField>

<ParamField path="button" type="dict" default="{}" />

<ParamField path="description" type="str" required>
  The card's description.
</ParamField>

<ParamField path="image_url" type="AcceptsImage" required>
  The image to be sent at this step in the conversation.
</ParamField>

<ParamField path="title" type="str" required>
  The card's title.
</ParamField>

<ParamField path="cards" type="ListType | list[CarouselCard] | list[List[Dict[str, Any]]]" default="[]" />
