> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Functional agent run

> Example 5: Functional agent - run with structured outputs

Demonstrates creating a functional agent with typed inputs/outputs,
running it with inputs, and reading the structured AgentRunResult.

```python theme={"languages":{}}
from vectorshift.agent import Agent, AgentType, IoConfig, LlmInfo
from vectorshift.agent.tool import ToolInput, ToolInputType
from vectorshift.agent.tools import ExaAiTool

# Create a tool
search = ExaAiTool(
    tool_name="exa_ai_search",
    query=ToolInput(type=ToolInputType.DYNAMIC, description="Search query"),
)

# Create a functional agent
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
print(f"Created agent: {agent.name}")

# Run the agent with structured inputs
result = agent.run(inputs={"topic": "Solid-state batteries"})

# Outputs come back keyed by the declared name; the SDK remaps the
# engine's ``output_<oid>`` keys via the agent's outputs metadata.
if result.status == "success":
    print(f"\nBrief:\n{result.outputs.get('brief', '(no brief returned)')}")
else:
    print(f"\nError: {result.error}")

print(f"\nRun ID: {result.run_id}")

# Clean up
agent.delete()
print("Done.")
```

<Tip>
  Source: `examples/agents/05_functional_agent_run.py` in the SDK repo.
</Tip>
