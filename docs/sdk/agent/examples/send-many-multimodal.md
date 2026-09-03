> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Multimodal send_many

> Example 12: Multimodal send_many

Demonstrates sending a file as bytes alongside text in a single turn
using send\_many with UserSessionMessage.

```python theme={"languages":{}}
import asyncio
import tempfile
from pathlib import Path

from vectorshift.agent import Agent, AgentType, LlmInfo, MemoryConfig
from vectorshift.events import SessionEventType
from vectorshift.session import UserSessionMessage

async def main() -> None:
    # Create a temp .txt file with some content
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
        name="File batch demo",
        type=AgentType.CONVERSATIONAL,
        llm_info=LlmInfo(provider="openai", model_id="gpt-4o"),
        tools=[],
        instructions="You are a helpful assistant that can process text and files.",
        memory_config=MemoryConfig(enable_session_memory=True),
    )
    print(f"Created agent: {agent.name}\n")

    async with await agent.create_session() as session:
        print(f"Session connected: {session.session_id}\n")

        # --- Send file bytes + question in one batch ---
        file_bytes = tmp.read_bytes()
        await session.send_many(
            [
                "I'm attaching a financial report.",
                UserSessionMessage(content=file_bytes, mime_type="text/plain"),
                "What was the revenue and how much did it grow? Also, is the churn rate healthy? please tell me meaninfuly whats in the doc you just read and tell me",
            ]
        )

        async for event in session.listen(
            event_types=[
                SessionEventType.MESSAGE_DELTA,
                SessionEventType.MESSAGE_COMPLETE,
                SessionEventType.TOOL_CALL,
                SessionEventType.TOOL_RESULT,
                SessionEventType.THINKING,
            ]
        ):
            if event.delta:
                print(event.delta, end="", flush=True)
            if event.tool_name:
                print(f"[Tool Call] {event.tool_name} - {event.data.get('status', '')}")
            if event.type == SessionEventType.TOOL_RESULT:
                print(f"[Thinking] {event.data.get('summary', '')}")
            if event.type == SessionEventType.THINKING:
                print(f"[Thinking] {event.data.get('summary', '')}")
            if event.is_complete:
                break
        print()

    # Cleanup
    tmp.unlink(missing_ok=True)
    agent.delete()
    print("\nDone.")

if __name__ == "__main__":
    asyncio.run(main())
```

<Tip>
  Source: `examples/agents/12_send_many_multimodal.py` in the SDK repo.
</Tip>
