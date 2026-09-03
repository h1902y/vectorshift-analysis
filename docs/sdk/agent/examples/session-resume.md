> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Resume a session

> Resume a conversation by session id

Open a session and send a message, disconnect, then reconnect to the same
session with Session(session\_id=...) and read back its message history.

```python theme={"languages":{}}
import asyncio

from vectorshift.agent import Agent, AgentType, LlmInfo, MemoryConfig
from vectorshift.events import SessionEventType
from vectorshift.session import Session

FIRST_MESSAGE = "Remember this codeword: zephyr-42."

async def main() -> None:
    agent = Agent.new(
        name="session-resume-demo",
        type=AgentType.CONVERSATIONAL,
        llm_info=LlmInfo(provider="openai", model_id="gpt-4o-mini"),
        instructions="You are concise and remember what the user tells you.",
        memory_config=MemoryConfig(enable_session_memory=True),
    )

    # Open a session, send a message, and wait for the reply
    async with await agent.create_session() as session:
        session_id = session.session_id
        await session.send(FIRST_MESSAGE)
        async for event in session.listen(
            event_types=[SessionEventType.MESSAGE_COMPLETE]
        ):
            if event.is_complete:
                print(f"assistant: {(event.text or '')[:120]}")
                break

    # Reconnect to the same session by id and read its history
    resumed = Session(session_id=session_id)
    await resumed.connect()
    messages = await resumed.get_messages()
    print(f"resumed {resumed.session_id}: {len(messages)} messages")
    await resumed.terminate()

    agent.delete()

if __name__ == "__main__":
    asyncio.run(main())
```

<Tip>
  Source: `examples/agents/08_session_resume.py` in the SDK repo.
</Tip>
