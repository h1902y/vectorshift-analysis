> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Agent CRUD

> Example 10: Agent CRUD - full lifecycle

Demonstrates the complete agent lifecycle: create, fetch, list, update, save, delete.

```python theme={"languages":{}}
import time

from vectorshift.agent import Agent, AgentType, IoConfig, LlmInfo

# --- Create ---
agent = Agent.new(
    name="SDK CRUD Demo",
    type=AgentType.FUNCTIONAL,
    llm_info=LlmInfo(provider="openai", model_id="gpt-4o"),
    instructions="You summarize text concisely.",
    inputs={
        "text": IoConfig(io_type="string", description="Text to summarize"),
    },
    outputs={
        "summary": IoConfig(io_type="string", description="Summary"),
    },
)
print(f"1. Created agent: {agent.name} (id={agent.id})")

# --- Fetch by ID ---
fetched = Agent.fetch(id=agent.id)
print(f"2. Fetched by ID: {fetched.name}")

# --- Fetch by name ---
fetched_by_name = Agent.fetch(name="SDK CRUD Demo")
print(f"3. Fetched by name: {fetched_by_name.name}")

# --- List ---
agents = Agent.list(limit=10)
found = any(a.id == agent.id for a in agents)
print(f"4. Listed agents ({len(agents)} total), found ours: {found}")

# --- Update instructions ---
agent.update_instructions("You write concise, bullet-point summaries.")
agent.save()
print("5. Updated instructions and saved.")

# --- Verify update ---
for attempt in range(5):
    time.sleep(2)
    try:
        refetched = Agent.fetch(id=agent.id)
        print(
            f"6. Verified: instructions contain 'bullet-point': {'bullet-point' in refetched.instructions}"
        )
        break
    except Exception:
        if attempt == 4:
            print(
                "6. Skipped verification (fetch timed out after save — updates may take a moment to propagate)"
            )

# --- Update LLM ---
agent.update_llm_info(LlmInfo(provider="anthropic", model_id="claude-sonnet-4-20250514"))
agent.save()
print("7. Updated LLM to Anthropic Claude and saved.")

# --- Delete ---
agent.delete()
print("8. Deleted agent.")
print("\nDone.")
```

<Tip>
  Source: `examples/agents/10_agent_crud.py` in the SDK repo.
</Tip>
