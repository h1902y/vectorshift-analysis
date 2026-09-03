> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Streaming tool events

> Example 9: Session - observe tool call events

Demonstrates listening for all event types including TOOL\_CALL and THINKING
events during a session with a tool-equipped conversational agent.

```python theme={"languages":{}}
import asyncio

from vectorshift.agent import Agent, AgentType, LlmInfo, MemoryConfig
from vectorshift.agent.tool import ToolInput, ToolInputType
from vectorshift.agent.tools import ExaAiTool
from vectorshift.events import SessionEventType

async def main() -> None:
    # Create a tool
    search = ExaAiTool(
        tool_name="exa_ai_search",
        query=ToolInput(type=ToolInputType.DYNAMIC, description="Search query"),
    )

    # Create a conversational agent with the tool
    agent = Agent.new(
        name="Search assistant",
        type=AgentType.CONVERSATIONAL,
        llm_info=LlmInfo(provider="openai", model_id="gpt-4o"),
        tools=[search],
        instructions="Use web search when the user asks about current events.",
        memory_config=MemoryConfig(enable_session_memory=True),
    )
    print(f"Created agent: {agent.name}\n")

    async with await agent.create_session() as session:
        await session.send("What are the latest developments in AI this week?")
        print("User: What are the latest developments in AI this week?\n")

        # Listen to ALL events to see tool calls, thinking, and the final response
        async for event in session.listen():
            match event.type:
                case SessionEventType.THINKING:
                    print(f"  [Thinking] {event.data.get('summary', '')}")

                case SessionEventType.TOOL_CALL:
                    print(
                        f"  [Tool Call] {event.tool_name} - {event.data.get('status', '')}"
                    )

                case SessionEventType.SEARCH_RESULT:
                    print("  [Search] Results received")

                case SessionEventType.MESSAGE_DELTA:
                    print(event.delta, end="", flush=True)

                case SessionEventType.MESSAGE_COMPLETE:
                    print()  # newline
                    break

                case SessionEventType.PARTICIPANT_STATUS:
                    status = event.data.get("status", "")
                    print(f"  [Status] {status}")

                case SessionEventType.ERROR:
                    print(f"\n  [Error] {event.error}")
                    break

                case _:
                    pass  # ignore pong, posted, etc.

    agent.delete()
    print("\nDone.")

if __name__ == "__main__":
    asyncio.run(main())
```

<Tip>
  Source: `examples/agents/09_session_tool_events.py` in the SDK repo.
</Tip>
