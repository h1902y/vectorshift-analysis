> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Sending files in a session

> Example 13: Send a file using session.send()

Creates a temp text file, sends it via send(), then asks about its contents.

```python theme={"languages":{}}
import asyncio
import tempfile
from pathlib import Path

from vectorshift.agent import Agent, AgentType, LlmInfo, MemoryConfig
from vectorshift.events import SessionEventType

async def main() -> None:
    tmp = Path(tempfile.mktemp(suffix=".txt"))
    tmp.write_text(
        "Q3 2025 Financial Summary\n"
        "=========================\n"
        "Revenue: $4.2M (up 18% YoY)\n"
        "Operating Expenses: $2.8M\n"
        "Net Profit: $1.4M\n"
        "Headcount: 47 employees\n"
        "New customers: 12\n"
        "Churn rate: 3.1%\n"
    )
    print(f"Created temp file: {tmp}\n")

    agent = Agent.new(
        name="Send file demo",
        type=AgentType.CONVERSATIONAL,
        llm_info=LlmInfo(provider="openai", model_id="gpt-4o"),
        tools=[],
        instructions="You are a helpful assistant that can process text and files.",
        memory_config=MemoryConfig(enable_session_memory=True),
    )
    print(f"Created agent: {agent.name}\n")

    async with await agent.create_session() as session:
        print(f"Session connected: {session.session_id}\n")

        # Send the file as a Path
        print("--- Sending file via send(Path) ---")
        await session.send(tmp)

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
        print("\n")

        # Now ask about the file
        print("--- Asking about the file ---")
        await session.send(
            "What was the revenue and churn rate in that file? Summarize it."
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
        print()

    tmp.unlink(missing_ok=True)
    agent.delete()
    print("\nDone.")

if __name__ == "__main__":
    asyncio.run(main())
```

<Tip>
  Source: `examples/agents/13_send_file.py` in the SDK repo.
</Tip>
