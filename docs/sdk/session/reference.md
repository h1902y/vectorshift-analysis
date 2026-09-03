> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Session reference

> Multi-turn conversation handle returned by Agent.create_session().

Real-time session for conversational agents and chatbots.

Created via `agent.create_session()` or `chatbot.create_session()`.
Use as an async context manager or manually call connect/disconnect.

**Usage**

```python theme={"languages":{}}
async with await agent.create_session() as session:
    await session.send("Hello!")
    async for event in session.listen():
        if event.is_complete:
            print(event.text)
            break
```

## Lifecycle

### `connect`

```python theme={"languages":{}}
async Session.connect() -> Session
```

Open WebSocket, create or connect to session, start background listener.

**Returns**

<ResponseField name="returns" type="Session" />

### `disconnect`

```python theme={"languages":{}}
async Session.disconnect() -> None
```

Stop listener, close WebSocket.

### `terminate`

```python theme={"languages":{}}
async Session.terminate() -> None
```

Terminate the session on the engine and close the WebSocket.

Unlike `disconnect()` which just detaches this client,
`terminate()` tells the engine to destroy the session entirely.
The session cannot be resumed after termination.

## Messaging

### `send`

```python theme={"languages":{}}
async Session.send(content: Union[str, Path, bytes, io.IOBase], *, files: Optional[Sequence[Union[Path, bytes, io.IOBase]]] = None, mime_type: Optional[str] = None, filename: Optional[str] = None) -> None
```

Post a single message to the session.

**Parameters**

<ParamField path="content" type="Union[str, Path, bytes, io.IOBase]" required>
  Message content. Accepts str, Path, bytes, or file-like objects. See [`Union`](#union).
</ParamField>

<ParamField path="files" type="Optional[Sequence[Union[Path, bytes, io.IOBase]]]" default="None">
  Optional list of additional file attachments (reserved for future use). See [`Union`](#union).
</ParamField>

<ParamField path="mime_type" type="Optional[str]" default="None">
  Optional MIME type for non-text content.
</ParamField>

<ParamField path="filename" type="Optional[str]" default="None">
  Optional filename override for bytes/IOBase content.
</ParamField>

### `send_many`

```python theme={"languages":{}}
async Session.send_many(messages: Sequence[SendManyItem]) -> None
```

Post multiple messages as a batch (one LLM turn).

Each item can be a plain string, Path, bytes, file-like object,
or a `UserSessionMessage` for full multimodal control.
All entries use the same encoding rules as `send()`.

**Parameters**

<ParamField path="messages" type="Sequence[SendManyItem]" required />

## Streaming

### `listen`

```python theme={"languages":{}}
async Session.listen(*, event_types: Optional[Sequence[SessionEventType]] = None, maxsize: int = 1024) -> AsyncGenerator[SessionEvent, None]
```

Yield events from the background listener.

If event\_types is provided, only matching events are yielded.
Runs until the session disconnects.

**Parameters**

<ParamField path="event_types" type="Optional[Sequence[SessionEventType]]" default="None">
  Optional filter — only events whose `type` is in this collection are yielded. See [`SessionEventType`](#sessioneventtype).
</ParamField>

<ParamField path="maxsize" type="int" default="1024">
  Maximum size of the internal subscriber queue. When a slow consumer lets this fill up, the listener will drop the offending event and emit a synthetic `ERROR` event with `data["error"] == "subscriber queue overflow"` so the consumer can react. Pass `0` for an unbounded queue.
</ParamField>

**Returns**

<ResponseField name="returns" type="AsyncGenerator[SessionEvent, None]">
  See [`SessionEvent`](#sessionevent).
</ResponseField>

### `get_messages`

```python theme={"languages":{}}
async Session.get_messages() -> list[SessionMessage]
```

Fetch full session history as typed `SessionMessage` objects.

Each message has `id`, `session_id`, `sender`, `content_type`,
`text`, `status`, and the original `raw` dict.

**Returns**

<ResponseField name="returns" type="list[SessionMessage]">
  See [`SessionMessage`](#sessionmessage).
</ResponseField>

## Approvals

When a tool is gated with `ToolApprovalConfig.REQUIRES_APPROVAL`, the agent pauses its turn and emits a [`SessionEventType.APPROVAL_REQUEST`](#sessioneventtype) event on `listen()`. Resume the turn by calling one of the methods below; both dispatch the same WS message but `respond_approval` keeps the call-site readable when you also want to override the proposed arguments or send a deny reason.

### `respond`

```python theme={"languages":{}}
async Session.respond(
    event: SessionEvent,
    *,
    approved: Optional[bool] = None,
    confirm: Optional[Mapping[str, Any]] = None,
    deny_reason: Optional[str] = None,
) -> None
```

Reply to a pause event (today: `APPROVAL_REQUEST`; future event types dispatch through the same call). Pass `approved=True` to let the tool run, `approved=False` to reject it.

**Parameters**

<ParamField path="event" type="SessionEvent" required>
  The paused event yielded by `listen()`.
</ParamField>

<ParamField path="approved" type="Optional[bool]" default="None">
  `True` to approve, `False` to reject.
</ParamField>

<ParamField path="confirm" type="Optional[Mapping[str, Any]]" default="None">
  Override the arguments the model proposed (e.g. `{"num_results": 3}` to cap a search). Approved calls only.
</ParamField>

<ParamField path="deny_reason" type="Optional[str]" default="None">
  Surfaced back to the model on rejection so it can adapt its next turn.
</ParamField>

### `respond_approval`

```python theme={"languages":{}}
async Session.respond_approval(
    event: SessionEvent,
    *,
    approved: bool,
    confirm: Optional[Mapping[str, Any]] = None,
    deny_reason: Optional[str] = None,
) -> None
```

Approval-specific helper — same wire format as `respond`, but `approved` is required and `event.type` must be `APPROVAL_REQUEST`. Use this when you only ever respond to approvals and want the call site to enforce that.

**Parameters**

<ParamField path="event" type="SessionEvent" required>
  The `APPROVAL_REQUEST` event from `listen()`.
</ParamField>

<ParamField path="approved" type="bool" required>
  `True` to approve the proposed tool call, `False` to reject.
</ParamField>

<ParamField path="confirm" type="Optional[Mapping[str, Any]]" default="None">
  Replacement argument values for the approved call.
</ParamField>

<ParamField path="deny_reason" type="Optional[str]" default="None">
  Reason surfaced to the model on rejection.
</ParamField>

See the [`session-approval-respond` example](/sdk/agent/examples/session-approval-respond) for a full event loop.

## State

### `session_id`

```python theme={"languages":{}}
Session.session_id -> Optional[str]  # property
```

**Returns**

<ResponseField name="returns" type="Optional[str]" />

### `is_connected`

```python theme={"languages":{}}
Session.is_connected -> bool  # property
```

**Returns**

<ResponseField name="returns" type="bool" />

## Types

Configuration objects, response shapes, and enums used by the methods above.

### `SessionEvent`

SessionEvent(type: 'SessionEventType', session\_id: 'str', message\_id: 'Optional\[str]' = None, data: 'dict\[str, Any]' = \<factory>)

**Fields**

<ParamField path="type" type="SessionEventType" required />

<ParamField path="session_id" type="str" required />

<ParamField path="message_id" type="Optional[str]" />

<ParamField path="data" type="dict[str, Any]" default="{}" />

### `SessionEventType`

**Members**

* `MESSAGE_DELTA` = `"message_delta"`
* `MESSAGE_COMPLETE` = `"message_complete"`
* `MESSAGE_STREAMING` = `"message_streaming"`
* `TOOL_CALL` = `"tool_call"`
* `TOOL_RESULT` = `"tool_result"`
* `THINKING` = `"thinking"`
* `SEARCH_RESULT` = `"search_result"`
* `APPROVAL_REQUEST` = `"approval_request"`
* `REAUTH_REQUEST` = `"reauth_request"`
* `ERROR` = `"error"`
* `PARTICIPANT_STATUS` = `"participant_status"`
* `SESSION_CREATED` = `"session_created"`
* `SESSION_CONNECTED` = `"session_connected"`
* `MESSAGE_POSTED` = `"message_posted"`
* `MESSAGES_POSTED` = `"messages_posted"`
* `PONG` = `"pong"`

### `SessionMessage`

A message from session history (returned by `session.get_messages()`).

**Fields**

<ParamField path="id" type="str" required />

<ParamField path="session_id" type="str" required />

<ParamField path="sender" type="MessageSender" required />

<ParamField path="content_type" type="str" default="''" />

<ParamField path="text" type="Optional[str]" />

<ParamField path="status" type="Optional[SessionMessageStatus]" />

<ParamField path="raw" type="dict[str, Any]" default="{}" />

### `SessionMessageStatus`

**Members**

* `STREAMING` = `"streaming"`
* `COMPLETE` = `"complete"`
* `ERROR` = `"error"`

### `MessageSender`

Who sent a session message.

**Fields**

<ParamField path="role" type="SessionMessageRole" required />

<ParamField path="user_id" type="Optional[str]" />

<ParamField path="object_id" type="Optional[str]" />

<ParamField path="object_type" type="Optional[str]" />

### `UserSessionMessage`

Authored outbound message for use with `session.send_many()`.

Each field mirrors the keyword arguments of `session.send()`:

```python theme={"languages":{}}
UserSessionMessage(content="hello")                  # text
UserSessionMessage(content=Path("doc.pdf"))          # file
UserSessionMessage(content="summarize", files=[Path("chart.png")])
```

**Fields**

<ParamField path="content" type="Union[str, Path, bytes, io.IOBase, None]" />

<ParamField path="files" type="Optional[Sequence[Union[Path, bytes, io.IOBase]]]" />

<ParamField path="mime_type" type="Optional[str]" />

<ParamField path="filename" type="Optional[str]" />

<ParamField path="references" type="Optional[Mapping[str, Any]]" />

### `Union`
