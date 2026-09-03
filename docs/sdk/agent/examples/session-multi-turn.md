> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Multi-turn session

> Example 7: Session - multi-turn conversation

Demonstrates a multi-turn conversation where the agent remembers context
from previous turns within the same session.

```python theme={"languages":{}}
import asyncio

from vectorshift.agent import Agent, AgentType, LlmInfo, MemoryConfig
from vectorshift.events import SessionEventType

async def stream_response(session) -> str:
    """Helper: stream one turn and return the full text."""
    full_text = ""
    async for event in session.listen(
        event_types=[
            SessionEventType.MESSAGE_DELTA,
            SessionEventType.MESSAGE_COMPLETE,
        ]
    ):
        if event.delta:
            print(event.delta, end="", flush=True)
            full_text += event.delta
        if event.is_complete:
            full_text = event.text or full_text
            break
    print()
    return full_text

async def main() -> None:
    agent = Agent.new(
        name="Memory demo",
        type=AgentType.CONVERSATIONAL,
        llm_info=LlmInfo(provider="openai", model_id="gpt-4o"),
        tools=[],
        instructions="You are helpful and remember everything the user tells you.",
        memory_config=MemoryConfig(enable_session_memory=True),
    )
    print(f"Created agent: {agent.name}\n")

    async with await agent.create_session() as session:
        # Turn 1
        print("User: My name is Alice and I live in Boston.")
        await session.send("My name is Alice and I live in Boston.")
        print("Assistant: ", end="")
        await stream_response(session)
        print()

        # Turn 2 - the agent should remember the name
        print("User: What is my name and where do I live?")
        await session.send("What is my name and where do I live?")
        print("Assistant: ", end="")
        response = await stream_response(session)
        print()

        # Verify context was retained
        if "Alice" in response:
            print("Context retained across turns!")
        else:
            print("Warning: agent may not have retained context.")

        # Fetch history
        messages = await session.get_messages()
        print(f"\nSession history: {len(messages)} messages")

    agent.delete()
    print("Done.")

if __name__ == "__main__":
    asyncio.run(main())
```

<Tip>
  Source: `examples/agents/07_session_multi_turn.py` in the SDK repo.
</Tip>
