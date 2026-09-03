> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Conversational agent run

> Example 8: Conversational agent — one-shot `agent.run()` (experimental)

Shows the convenience path for ask-once-and-wait conversational flows.
`agent.run()` dispatches on agent type: functional agents stay sync,
conversational agents return a coroutine that creates a hidden session,
sends one turn, waits for the final message, and cleans up.

For streaming, approvals, or multi-turn context, keep using
`agent.create_session()` explicitly.

```python theme={"languages":{}}
import asyncio

from vectorshift.agent import Agent, AgentType, LLMInfo, MemoryConfig

async def main() -> None:
    agent = Agent.new(
        name="Quantum tutor (run example)",
        type=AgentType.CONVERSATIONAL,
        llm_info=LLMInfo(provider="openai", model_id="gpt-4o"),
        instructions="You answer clearly for beginners.",
        memory_config=MemoryConfig(enable_session_memory=True),
    )
    print(f"Created agent: {agent.name} ({agent.id})")

    # --- Turn 1: hidden session created. `keep_alive=True` keeps the
    # session alive (disconnects instead of terminating) so we can
    # resume on turn 2. Without it, the default is terminate-on-exit.
    result = await agent.run(
        "What is quantum computing? One paragraph.",
        keep_alive=True,
    )
    print(f"\n[turn 1] status={result.status}")
    print(f"[turn 1] session_id={result.session_id}")
    print(f"[turn 1] final_message:\n{result.final_message}")

    # --- Turn 2: resume the same session for one more turn. The
    # resumed session is disconnected after this turn (not terminated),
    # so the caller can keep going via create_session() / further
    # resume calls if they want.
    followup = await agent.run(
        "Give me a one-sentence analogy for it make it like 10 words.",
        session_id=result.session_id,
    )
    print(f"\n[turn 2] status={followup.status}")
    print(f"[turn 2] final_message:\n{followup.final_message}")

    # Clean up the agent (sessions are already handled by run()).
    agent.delete()
    print("\nDone.")

if __name__ == "__main__":
    asyncio.run(main())
```

<Tip>
  Source: `examples/agents/08_conversational_agent_run.py` in the SDK repo.
</Tip>
