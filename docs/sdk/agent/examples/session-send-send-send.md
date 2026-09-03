> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Repeated sends

> Example 3: Session - send one message, stream response

Demonstrates creating a conversational session, sending a single message,
and streaming the response token by token using listen() with event filtering.

```python theme={"languages":{}}
import asyncio

from vectorshift.agent import Agent, AgentType, LlmInfo, MemoryConfig
from vectorshift.agent.tools import ExaAiTool, GoogleSearchTool
from vectorshift.events import SessionEventType
from vectorshift import ToolInput, ToolInputType

async def main() -> None:
    search = ExaAiTool(
        tool_name="exa_ai_search",
        query=ToolInput(type=ToolInputType.DYNAMIC, description="Search query"),
    )
    # Create (or fetch) a conversational agent
    agent = Agent.new(
        name="Quantum tutor",
        type=AgentType.CONVERSATIONAL,
        llm_info=LlmInfo(provider="openai", model_id="gpt-4o"),
        tools=[search],
        instructions="You answer clearly for beginners.",
        memory_config=MemoryConfig(enable_session_memory=True),
    )

    # agent.save()

    print(f"Created agent: {agent.name} with tools: {agent.id}")

    # Open a session, send one message, stream the response
    async with await agent.create_session() as session:
        print(f"Session connected: {session.session_id}")

        messages = [
            "What is quantum computing? Explain for a beginner. search for the latest news on quantum computing and give me that too using google search.",
            "Tell me a joke about it?",
            "actially dont tell me a joke about it just make a haiku?",
        ]
        for m in messages:
            await session.send(m)

        # Back-to-back sends batch into a single engine turn, so the agent
        # produces exactly one MESSAGE_COMPLETE covering all three prompts —
        # not one per send. This is what the example is meant to demonstrate.
        async for event in session.listen(
            event_types=[
                SessionEventType.MESSAGE_DELTA,
                SessionEventType.MESSAGE_COMPLETE,
                SessionEventType.TOOL_CALL,
                SessionEventType.TOOL_RESULT,
            ]
        ):
            match event.type:
                case SessionEventType.TOOL_CALL:
                    print(
                        f"[Tool Call] {event.tool_name} - {event.data.get('status', '')}"
                    )
                    print(f"[Tool Call Data] {event.data}")
                case SessionEventType.TOOL_RESULT:
                    print(f"[Tool Result] {event.data.get('result', '')}")
                case _:
                    pass
            if event.delta:
                print(event.delta, end="", flush=True)
            if event.is_complete:
                print("\n[batched turn complete]\n")
                break

    # Clean up
    agent.delete()
    print("\nDone.")

if __name__ == "__main__":
    asyncio.run(main())
```

<Tip>
  Source: `examples/agents/14_session_send_send_send.py` in the SDK repo.
</Tip>
