> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Session send_many

> Example 4: Session - send_many, then stream one turn

Demonstrates batching multiple messages with send\_many() so the agent
processes them as a single context bundle and responds in one turn.

```python theme={"languages":{}}
import asyncio

from vectorshift.agent import Agent, AgentType, LlmInfo, MemoryConfig
from vectorshift.events import SessionEventType

async def main() -> None:
    agent = Agent.new(
        name="Physics tutor",
        type=AgentType.CONVERSATIONAL,
        llm_info=LlmInfo(provider="openai", model_id="gpt-4o"),
        tools=[],
        instructions="You give concise explanations.",
        memory_config=MemoryConfig(enable_session_memory=True),
    )
    print(f"Created agent: {agent.name}")

    async with await agent.create_session() as session:
        print(f"Session connected: {session.session_id}")
        print()

        # Send multiple messages as a batch - the agent treats them as one turn

        await session.send_many(
            [
                "Context: I'm a physics student.",
                "Context: I'm preparing for an exam next week.",
                "Explain me the biology of how a human heart works. Be concise and to the point and explain with physics metaphors.",
            ]
        )

        async for event in session.listen(
            event_types=[
                SessionEventType.MESSAGE_DELTA,
                SessionEventType.MESSAGE_COMPLETE,
            ]
        ):
            if event.delta:
                print(event.delta, end="", flush=True)
            if event.is_complete:
                break

    agent.delete()
    print("\nDone.")

if __name__ == "__main__":
    asyncio.run(main())
```

<Tip>
  Source: `examples/agents/04_session_send_many.py` in the SDK repo.
</Tip>
