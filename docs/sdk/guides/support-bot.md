> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Customer support bot

> Build a multi-turn agent with tools, approval gates, and human handoff.

By the end of this guide you'll have a conversational support agent that can answer questions, search the web for fresh info, escalate sensitive actions for human approval, and remember context across turns.

<Info>
  **Prerequisites.** [Installed SDK](/sdk/installation) · [API key set](/sdk/authentication) · about 20 minutes. If you already built the [RAG end-to-end](/sdk/guides/rag-end-to-end) guide, the KB you ingested there can be added as an [`AgentTools`](/sdk/agent/reference#tools) lookup tool here.
</Info>

## What you'll build

```text theme={"languages":{}}
   user
    │
    ▼
 ┌─────────┐    TOOL_CALL    ┌──────────────────┐
 │ Session │ ──────────────▶ │ ExaAiTool /      │
 │         │ ◀────────────── │ google_search    │
 │         │   TOOL_RESULT   │ (auto-run)       │
 │         │                 └──────────────────┘
 │         │
 │         │  APPROVAL_REQUEST   ┌──────────────────┐
 │         │ ─────────────────▶  │ Gated tool       │
 │         │ ◀──── respond ────  │ (REQUIRES_       │
 │         │                     │  APPROVAL)       │
 │         │                     └──────────────────┘
 └─────────┘
```

<Steps>
  <Step title="Define the agent">
    Conversational agents combine an `LlmInfo`, instructions that scope behaviour, and a `MemoryConfig` so they remember turns within a session. Use `type=AgentType.CONVERSATIONAL` (functional agents use `FUNCTIONAL`).

    ```python theme={"languages":{}}
    from vectorshift.agent import (
        Agent, AgentTools, AgentType, LlmInfo, MemoryConfig,
    )
    from vectorshift.agent.tool import (
        ToolInput, ToolInputType, ToolApprovalConfig,
    )

    agent = Agent.new(
        name="Acme support",
        type=AgentType.CONVERSATIONAL,
        llm_info=LlmInfo(provider="openai", model_id="gpt-5.1"),
        tools=[
            # Web search the agent can call autonomously.
            AgentTools.exa_ai(
                tool_name="exa_ai_search",
                query=ToolInput(type=ToolInputType.DYNAMIC, description="What to search"),
                num_results=3,
                approval_config=ToolApprovalConfig.LET_AGENT_DECIDE,
            ),
        ],
        instructions=(
            "You are a friendly Acme support agent. "
            "Use exa_ai_search when the user asks about current events or external facts. "
            "If a request would change a customer's data, call the gated tool — it will pause "
            "for human approval. If you cannot resolve a request, say so plainly."
        ),
        memory_config=MemoryConfig(enable_session_memory=True),
    )
    print(f"Created agent: {agent.name} (id={agent.id})")
    ```

    <Note>
      `AgentTools` exposes the platform's full tool catalogue (`exa_ai`, `google_search`, `wikipedia`, …). The set available to your account depends on which integrations are enabled. `exa_ai` is the safe default for web search.
    </Note>

    See [`Agent.new`](/sdk/agent/reference) for every parameter and [`AgentType`](/sdk/agent/reference) for the FUNCTIONAL vs CONVERSATIONAL split.
  </Step>

  <Step title="Add a gated tool">
    `ToolApprovalConfig` has three values — pick `REQUIRES_APPROVAL` for anything sensitive. The fluent `agent.add_tool.<name>(...)` API lets you append tools after construction.

    ```python theme={"languages":{}}
    # Add another tool with REQUIRES_APPROVAL — agent will pause before invoking.
    agent.add_tool.exa_ai(
        tool_name="exa_ai_gated",
        query=ToolInput(type=ToolInputType.DYNAMIC, description="Search query"),
        num_results=ToolInput(
            type=ToolInputType.STATIC, description="Number of results", value=5
        ),
        approval_config=ToolApprovalConfig.REQUIRES_APPROVAL,
    )

    print("Tools:", [t.name for t in agent.tools])
    agent.save()
    ```

    Three approval modes:

    * `AUTO_RUN` — fires immediately.
    * `LET_AGENT_DECIDE` — the model picks whether to ask.
    * `REQUIRES_APPROVAL` — always pauses for `session.respond(...)`.

    See [`tool-approval-config` example](/sdk/agent/examples/tool-approval-config) for variations.
  </Step>

  <Step title="Start a session and stream the reply">
    Conversational agents run inside a [`Session`](/sdk/session/overview) — async context manager, multi-turn, streaming events. Events have direct attributes: `event.delta` (the token chunk), `event.is_complete` (turn finished), `event.text` (the full final reply).

    ```python theme={"languages":{}}
    import asyncio
    from vectorshift.events import SessionEventType

    async def stream_one_turn(session) -> str:
        full = ""
        async for event in session.listen(
            event_types=[
                SessionEventType.MESSAGE_DELTA,
                SessionEventType.MESSAGE_COMPLETE,
            ]
        ):
            if event.delta:
                print(event.delta, end="", flush=True)
                full += event.delta
            if event.is_complete:
                full = event.text or full
                break
        print()
        return full

    async def main():
        async with await agent.create_session() as session:
            await session.send("Hi, can you remind me what your refund policy is?")
            await stream_one_turn(session)

    asyncio.run(main())
    ```

    Filter `listen()` with `event_types=[...]` to skip the noise — but only when you don't need tool / approval events. The next steps show the full-event listening loop.
  </Step>

  <Step title="Observe tool events">
    Subscribe to the unfiltered event stream to see `THINKING`, `TOOL_CALL`, `SEARCH_RESULT`, and `TOOL_RESULT` events as the agent works.

    ```python theme={"languages":{}}
    async with await agent.create_session() as session:
        await session.send("What are the latest developments in quantum computing this week?")

        async for event in session.listen():
            match event.type:
                case SessionEventType.THINKING:
                    print(f"  [thinking] {event.data.get('summary', '')}")
                case SessionEventType.TOOL_CALL:
                    print(f"  [tool call] {event.tool_name} — {event.data.get('status', '')}")
                case SessionEventType.SEARCH_RESULT:
                    print("  [search] results received")
                case SessionEventType.MESSAGE_DELTA:
                    print(event.delta, end="", flush=True)
                case SessionEventType.MESSAGE_COMPLETE:
                    print()
                    break
                case SessionEventType.ERROR:
                    print(f"\n  [error] {event.error}")
                    break
                case _:
                    pass  # ignore PONG, MESSAGE_POSTED, etc.
    ```
  </Step>

  <Step title="Approve or reject gated tool calls">
    When the model wants to call a tool gated with `REQUIRES_APPROVAL`, the session emits an `APPROVAL_REQUEST` event and the turn pauses. Resume it with `session.respond(event, approved=True | False)`.

    ```python theme={"languages":{}}
    async with await agent.create_session() as session:
        await session.send(
            "Find current news on quantum computing. Use the EXA AI search tool."
        )

        async for event in session.listen():
            if event.type == SessionEventType.APPROVAL_REQUEST:
                tool = event.data.get("tool_name") or event.data.get("tool_id")
                print(f"\n[approval] tool={tool!r} — auto-approving for demo")
                await session.respond(event, approved=True)
                # In production, push the decision to a human:
                # await session.respond_approval(
                #     event, approved=True, confirm={"num_results": 3}
                # )
                continue

            if event.type == SessionEventType.TOOL_CALL:
                print(f"[tool call] {event.tool_name}")
                continue

            if event.type == SessionEventType.TOOL_RESULT:
                print(f"[tool result] {str(event.data.get('result', ''))[:200]}")
                continue

            if event.delta:
                print(event.delta, end="", flush=True)

            if event.is_complete:
                print("\n(turn complete)")
                break
    ```

    `session.respond_approval(event, approved=, confirm=, deny_reason=)` is the richer form — `confirm={...}` lets you override the arguments the model proposed, `deny_reason="..."` is surfaced back to the model when rejecting.
  </Step>

  <Step title="Multi-turn memory">
    With `enable_session_memory=True`, the agent remembers context across turns within the same session. No glue code required.

    ```python theme={"languages":{}}
    async with await agent.create_session() as session:
        await session.send("My name is Alice and I live in Boston.")
        await stream_one_turn(session)

        # Same session — the agent should remember.
        await session.send("What did I just tell you about myself?")
        reply = await stream_one_turn(session)

        if "Alice" in reply and "Boston" in reply:
            print("✓ context retained across turns")

        # Fetch the full session history any time.
        messages = await session.get_messages()
        print(f"history length: {len(messages)}")
    ```
  </Step>

  <Step title="Resume a session later">
    Sessions are stateful on the server. Disconnect now, resume from any process by `session_id` — no `Agent` object needed.

    ```python theme={"languages":{}}
    from vectorshift.session import Session

    SESSION_ID = "..."  # captured from session.session_id earlier

    async def resume():
        session = Session(session_id=SESSION_ID)
        async with session:
            await session.send("Pick up where we left off — what were we discussing?")
            await stream_one_turn(session)

    asyncio.run(resume())
    ```

    Useful for long-lived chats (email, SMS, async support tickets). See the [`session-resume` example](/sdk/agent/examples/session-resume).
  </Step>
</Steps>

## Operational tips

* **Pick approval mode per tool.** Use `REQUIRES_APPROVAL` for anything that mutates customer data; `AUTO_RUN` for read-only retrieval; `LET_AGENT_DECIDE` only when you trust the model to ask itself.
* **Always use `async with`.** It cleans up the websocket on every exit path, including exceptions. Otherwise you can leak connections on errors.
* **Catch `SessionDisconnectedError`.** Websockets drop. Surface to the UI and reconnect with `Session(session_id=...)`. See [Session errors](/sdk/errors#session-errors).
* **Log every `session.respond` decision.** The audit trail for sensitive tools lives in your code, not the agent transcript.
* **Add a KB tool.** If you built [RAG end-to-end](/sdk/guides/rag-end-to-end), wire its pipeline as a tool the agent can call when it needs to answer from your docs.

## What's next

<Columns cols={3}>
  <Card title="Background batch" icon="layers" href="/sdk/guides/background-batch">
    For non-conversational long-running work.
  </Card>

  <Card title="Tool approval example" icon="code" href="/sdk/agent/examples/tool-approval-config">
    Just the approval-config pattern, isolated.
  </Card>

  <Card title="Agent reference" icon="book-open" href="/sdk/agent/reference">
    Every public method on `Agent` and `Session`.
  </Card>
</Columns>
