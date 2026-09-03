> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Functional agent with typed I/O

> Example 2: Functional agent with inputs, outputs, and tools

Demonstrates creating a functional agent with typed IoConfig inputs/outputs
and tool references in instructions using \{\{}} placeholders (v2 feature,
shown here for illustration).

Note: \{\{}} template validation is a v2 feature. In v1, instructions are
plain strings and \{\{}} references are passed through as-is.

```python theme={"languages":{}}
from vectorshift.agent import Agent, AgentType, IoConfig, LlmInfo
from vectorshift.agent.tool import ToolInput, ToolInputType
from vectorshift.agent.tools import ExaAiTool, GoogleSearchTool

# Create a tool instance directly
search = GoogleSearchTool(
    tool_name="google_web_search",
    query=ToolInput(type=ToolInputType.DYNAMIC, description=None),
    num_results=10,
)

exa_search = ExaAiTool(
    tool_name="exa_ai_search",
    query=ToolInput(type=ToolInputType.DYNAMIC, description="Search query"),
)

# Create a functional agent with typed inputs and outputs
agent = Agent.new(
    name="Topic briefing",
    type=AgentType.FUNCTIONAL,
    llm_info=LlmInfo(provider="openai", model_id="gpt-4o"),
    tools=[search],
    instructions=(
        "For the given topic, search the web if you need "
        "fresh facts, then write a short brief."
    ),
    inputs={
        "topic": IoConfig(io_type="string", description="Subject to brief"),
    },
    outputs={
        "brief": IoConfig(io_type="string", description="Markdown brief"),
    },
)

print(f"Created functional agent: {agent.name} (id={agent.id})")
print(f"  Inputs:  {list(agent.inputs.keys())}")
print(f"  Outputs: {list(agent.outputs.keys())}")
print(f"  Tools:   {[t.name for t in agent.tools]}")
print(f"  Type:    {agent.agent_type}")

# Clean up
agent.delete()
print("Deleted agent.")
```

<Tip>
  Source: `examples/agents/02_functional_agent_with_io.py` in the SDK repo.
</Tip>
