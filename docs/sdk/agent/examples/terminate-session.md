> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Terminating a session

> Example 15: Terminate a session on first delta

Demonstrates creating a session, sending a message, and terminating
the session as soon as the first streaming delta arrives.
After termination, the session should not be resumable.

```python theme={"languages":{}}
import asyncio

from vectorshift.agent import Agent, AgentType, LlmInfo, MemoryConfig
from vectorshift.events import SessionEventType
from vectorshift.session import Session

async def main() -> None:
    agent = Agent.new(
        name="Terminate demo",
        type=AgentType.CONVERSATIONAL,
        llm_info=LlmInfo(provider="openai", model_id="gpt-4o"),
        tools=[],
        instructions="Write a very long essay about the history of computing.",
        memory_config=MemoryConfig(enable_session_memory=True),
    )
    print(f"Created agent: {agent.name}\n")

    session = await agent.create_session()
    await session.connect()
    print(f"Session connected: {session.session_id}")
    saved_id = session.session_id

    await session.send("Go ahead, write the essay.")
    print("Sent message, waiting for first delta...\n")

    async for event in session.listen():
        if event.delta:
            print(f"Got first delta: {event.delta!r}")
            print("Terminating session immediately!")
            await session.terminate()
            break

    print(f"\nSession terminated. is_connected={session.is_connected}")

    # Try to resume the terminated session — should fail or return empty
    print(f"\nAttempting to resume terminated session: {saved_id}")
    try:
        session2 = Session(session_id=saved_id)
        await session2.connect()
        print("Resumed (unexpected). Sending message...")
        await session2.send("Are you still there?")

        got_response = False
        async for event in session2.listen(
            event_types=[
                SessionEventType.MESSAGE_DELTA,
                SessionEventType.MESSAGE_COMPLETE,
                SessionEventType.ERROR,
                SessionEventType.TOOL_CALL,
                SessionEventType.TOOL_RESULT,
                SessionEventType.THINKING,
            ]
        ):
            if event.type == SessionEventType.ERROR:
                print(f"Got error (expected after terminate): {event.error}")
                got_response = True
                break
            if event.delta:
                print(f"Got delta (session was NOT terminated): {event.delta!r}")
                got_response = True
            if event.is_complete:
                print("Got complete response (session was NOT terminated)")
                got_response = True
                break

        if not got_response:
            print("No response — session is terminated as expected.")

        await session2.disconnect()
    except Exception as e:
        print(f"Resume failed (expected): {type(e).__name__}: {e}")

    agent.delete()
    print("\nDone.")

if __name__ == "__main__":
    asyncio.run(main())
```

<Tip>
  Source: `examples/agents/15_terminate_session.py` in the SDK repo.
</Tip>
