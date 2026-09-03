> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Session approval respond

> Example 18: Replying to approval events with session.respond (v2)

Conversational agents pause their turn when a tool is gated with
`ToolApprovalConfig.REQUIRES_APPROVAL`. The paused turn surfaces a
`SessionEvent` on `listen()` with
`event.type == SessionEventType.APPROVAL_REQUEST`. The session helpers
let you reply on the same session without assembling raw payloads.

What this demonstrates:

* `session.respond(event, approved=True)`  — dispatches on event type
* `session.respond_approval(event, approved=..., confirm=..., deny_reason=...)`
* The paused turn resumes and more MESSAGE\_DELTA events flow

Requirements for a real e2e run:

* A conversational agent whose tool(s) are already gated with

```python theme={"languages":{}}
`ToolApprovalConfig.REQUIRES_APPROVAL`, typically configured on
the agent in the dashboard.
```

This example creates the tool and expects the agent's approval gating to
come from its server-side configuration.

```python theme={"languages":{}}
import asyncio

from vectorshift import ToolApprovalConfig
from vectorshift.agent import Agent, AgentType, LLMInfo, MemoryConfig
from vectorshift.agent.tool import ToolInput, ToolInputType
from vectorshift.agent.tools import ExaAiTool
from vectorshift.events import SessionEventType

async def main() -> None:
    search = ExaAiTool(
        tool_name="exa_ai_search",
        query=ToolInput(type=ToolInputType.DYNAMIC, description="Search query"),
        num_results=ToolInput(
            type=ToolInputType.STATIC, description="Number of results to return", value=5
        ),
        approval_config=ToolApprovalConfig.REQUIRES_APPROVAL,
    )

    agent = Agent.new(
        name="Approval demo",
        type=AgentType.CONVERSATIONAL,
        llm_info=LLMInfo(provider="openai", model_id="gpt-4o"),
        tools=[search],
        instructions="You help research topics; always ask to search the web.",
        memory_config=MemoryConfig(enable_session_memory=True),
    )
    print(f"Created agent: {agent.name} (id={agent.id})")

    try:
        async with await agent.create_session() as session:
            print(f"Session: {session.session_id}")
            await session.send(
                "Find the latest news on quantum computing. Use the EXA AI search tool to search the web."
            )

            async for event in session.listen():
                if event.type == SessionEventType.APPROVAL_REQUEST:
                    tool = event.data.get("tool_name") or event.data.get("tool_id")
                    print(f"\n[approval] tool={tool!r} — auto-approving")
                    await session.respond(event, approved=True)
                    # Or, with extra field values the agent requested:
                    # await session.respond_approval(
                    #     event, approved=True, confirm={"num_results": 3}
                    # )
                    continue

                if event.type == SessionEventType.TOOL_RESULT:
                    print(f"[Tool Result] {event.data.get('result', '')}")
                    continue

                if event.type == SessionEventType.TOOL_CALL:
                    print(
                        f"[Tool Call] {event.tool_name} - {event.data.get('status', '')}"
                    )
                    print(f"[Tool Call Data] {event.data}")
                    continue

                if event.delta:
                    print(event.delta, end="", flush=True)

                if event.is_complete:
                    print("\n(turn complete)")
                    break

    finally:
        agent.delete()
        print("Deleted agent.")

if __name__ == "__main__":
    asyncio.run(main())
```

<Tip>
  Source: `examples/agents/21_session_approval_respond.py` in the SDK repo.
</Tip>
