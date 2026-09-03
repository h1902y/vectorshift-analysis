> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Tool approval config

> Example 16: Tool approval_config across all three declaration paths

Verifies that every way of creating a tool accepts `approval_config`.

Paths exercised:

```python theme={"languages":{}}
1. Direct class instantiation            - ExaAiTool(...)
2. AgentTools namespace                  - AgentTools.google_search(...)
3. Fluent adder on an agent              - agent.add_tool.wikipedia(...)
```

The in-memory checks run first (no network). If `VECTORSHIFT_API_KEY` is
set, the example also saves the agent and deletes it to confirm VectorShift
accepts it.

```python theme={"languages":{}}
from __future__ import annotations

import os

from vectorshift.agent import Agent, AgentTools, AgentType, LlmInfo, MemoryConfig
from vectorshift.agent.tool import ToolApprovalConfig, ToolInput, ToolInputType
from vectorshift.agent.tools import ExaAiTool

EXPECTED = {
    "exa_ai": ToolApprovalConfig.REQUIRES_APPROVAL,
    "google_search": ToolApprovalConfig.LET_AGENT_DECIDE,
    "wikipedia": ToolApprovalConfig.AUTO_RUN,
}

def build_agent() -> Agent:
    search = ExaAiTool(
        tool_name="exa_ai_search",
        query=ToolInput(type=ToolInputType.DYNAMIC, description="Search query"),
        approval_config=EXPECTED["exa_ai"],
    )

    google = AgentTools.google_search(
        tool_name="google_web_search",
        query=ToolInput(type=ToolInputType.DYNAMIC, description="Search query"),
        num_results=5,
        approval_config=EXPECTED["google_search"],
    )

    # ``Agent.new`` so the agent actually exists server-side and the
    # later ``save()`` round-trip succeeds.
    agent = Agent.new(
        name="Approval demo assistant",
        agent_type=AgentType.CONVERSATIONAL,
        llm_info=LlmInfo(provider="openai", model_id="gpt-4o"),
        tools=[search, google],
        instructions="Use web search when the user asks about current events.",
        memory_config=MemoryConfig(enable_session_memory=True),
    )

    agent.add_tool.wikipedia(
        tool_name="wikipedia_lookup",
        query=ToolInput(type=ToolInputType.DYNAMIC, description="Topic to look up"),
        approval_config=EXPECTED["wikipedia"],
    )

    return agent

def main() -> None:
    agent = build_agent()

    print("In-memory tool values:")
    by_type = {t.tool_type: t for t in agent.tools}
    for tool_type, expected in EXPECTED.items():
        actual = by_type[tool_type].approval_config
        print(f"  [OK] {tool_type:20s} approval_config = {actual}")

    if not os.environ.get("VECTORSHIFT_API_KEY"):
        print("\nVECTORSHIFT_API_KEY not set - skipping save round-trip.")
        return

    print("\nSaving agent to verify VectorShift accepts the payload...")
    agent.save()
    print(f"  Saved agent id={agent.id}")

    agent.delete()
    print("  Deleted agent.")

if __name__ == "__main__":
    main()
```

<Tip>
  Source: `examples/agents/16_tool_approval_config.py` in the SDK repo.
</Tip>
