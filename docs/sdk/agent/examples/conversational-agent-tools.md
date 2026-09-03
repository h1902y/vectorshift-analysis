> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Conversational agent with tools

> Example 1: Conversational agent - add tool, save, remove tool, save

Demonstrates the fluent tool API for adding/removing tools from an agent,
then persisting changes with save().

```python theme={"languages":{}}
from vectorshift.agent import Agent, AgentTools, AgentType, LlmInfo, MemoryConfig
from vectorshift.agent.tool import ToolApprovalConfig, ToolInput, ToolInputType
from vectorshift.agent.tools import ExaAiTool

# Create a conversational agent
agent = Agent.new(
    name="Research Assistant",
    type=AgentType.CONVERSATIONAL,
    llm_info=LlmInfo(provider="openai", model_id="gpt-4o"),
    tools=[
        AgentTools.exa_ai(
            tool_name="exa_ai_search",
            query=ToolInput(type=ToolInputType.DYNAMIC),
            max_characters=100,
            num_results=5,
        ),
    ],
    instructions="You are a concise research assistant.",
    memory_config=MemoryConfig(enable_session_memory=True),
)
print(f"Created agent: {agent.name} (id={agent.id})")

# Add a tool using the fluent API
agent.add_tool.google_search(
    tool_name="google_web_search",
    query=ToolInput(type=ToolInputType.DYNAMIC, description="What to search"),
    num_results=5,
    approval_config=ToolApprovalConfig.LET_AGENT_DECIDE,
)
print(f"Added google_search tool. Tools: {[t.name for t in agent.tools]}")

# Save the agent
agent.save()
print("Saved agent with google_search tool.")

# Remove the tool by name
agent.remove_tool("google_web_search")
print(f"Removed google_search. Tools: {[t.name for t in agent.tools]}")

# Save again
agent.save()
print("Saved agent without google_search tool.")

# Clean up
agent.delete()
print("Deleted agent.")
```

<Tip>
  Source: `examples/agents/01_conversational_agent_tools.py` in the SDK repo.
</Tip>
