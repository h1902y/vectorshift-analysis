> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Session overview

> Multi-turn streaming on top of a conversational Agent or Chatbot.

A `Session` is a live, multi-turn handle over a conversational [`Agent`](/sdk/agent/overview) or `Chatbot`. You `send()` messages and `listen()` for streamed events — message deltas, tool calls, tool results, approval requests, errors.

<Info>
  **Prerequisites:** [Installed SDK](/sdk/installation) · [API key set](/sdk/authentication) · a saved conversational Agent or Chatbot.
</Info>

## Mental model

* Created via `agent.create_session()` or `chatbot.create_session()`. Use as an **async context manager** — it cleans up the websocket on exit.
* **`send()`** posts a single user turn. **`send_many()`** batches multiple posts into one LLM turn.
* **`listen()`** yields [`SessionEvent`](/sdk/session/reference#sessionevent) objects in real time. Filter by `event_types=[...]` if you only care about a subset.
* A session is **stateful on the server**. You can disconnect and resume by `session_id`. `terminate()` destroys it server-side.

## Quick start

```python theme={"languages":{}}
import asyncio
from vectorshift import Agent, LLMInfo

async def main():
    agent = Agent.fetch(name="Researcher")

    async with await agent.create_session() as session:
        await session.send("Summarise the latest Apollo mission.")
        async for event in session.listen():
            if event.is_complete:
                print(event.text)
                break

asyncio.run(main())
```

## What events you get

`session.listen()` yields events of several types. The most common:

* **`MESSAGE_DELTA`** — a streamed token chunk.
* **`MESSAGE_COMPLETE`** — the assistant turn finished. `event.text` holds the full reply.
* **`TOOL_CALL`** / **`TOOL_RESULT`** — the agent is invoking a tool and getting a result.
* **`APPROVAL_REQUEST`** — the agent is asking for human approval before calling a tool.
* **`ERROR`** — something went wrong. Inspect `event.data`.

See [`SessionEventType`](/sdk/session/reference#sessioneventtype) for the full list.

## What's next

<Columns cols={3}>
  <Card title="Reference" icon="book-open" href="/sdk/session/reference">
    Lifecycle, messaging, streaming, types.
  </Card>

  <Card title="Agent examples" icon="code" href="/sdk/agent/examples/session-multi-turn">
    Runnable session examples.
  </Card>

  <Card title="Errors" icon="circle-alert" href="/sdk/errors#session-errors">
    `SessionDisconnectedError` and how to handle reconnects.
  </Card>
</Columns>
