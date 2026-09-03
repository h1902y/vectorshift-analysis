> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Template placeholders

> Example: Functional agent with [[namespace.key]] template references (v2)

Users author placeholders with an explicit namespace prefix:
`[[inputs.X]]` / `[[outputs.X]]` / `[[tools.X]]`. The SDK rewrites
them on `Agent.new` / `Agent.save` to the backend-canonical
`\{\{inputs.X\}\}` / `\{\{outputs.X\}\}` / `\{\{tools.\<tool_id>\}\}` forms that
the engine expects.

Why the `[[ ]]` brackets: `\{\{` and `\}\}` are reserved escape sequences in
Python f-strings — authoring in `\{\{ \}\}` would force awkward
`f"\{\{\{\{topic\}\}\}\}"` boilerplate. `[[ ]]` has no special meaning in
f-strings so placeholders drop into normal interpolation cleanly.

Why the required namespace prefix: if an input, output, and tool all
share a name (say `brief`), a bare `[[brief]]` would be ambiguous. The
v2 SDK rejects bare placeholders outright and asks the author to write
`[[inputs.brief]]` / `[[outputs.brief]]` / `[[tools.brief]]` explicitly.

What this demonstrates:

* Input reference:   \[\[inputs.topic]]      -> \{\{inputs.topic}}
* Output reference:  \[\[outputs.brief]]     -> \{\{outputs.brief}}
* Tool by name:      \[\[tools.google\_search]] -> \{\{tools.\<tool\_id>}}
* Tool by raw id:    \[\[tools.\<tool\_id>]]   -> \{\{tools.\<tool\_id>}}
* Already-canonical \{\{inputs.topic}} content passes through unchanged
* Bare \[\[topic]] is rejected with a TemplateReferenceError

This is a functional agent (type=FUNCTIONAL). Conversational agents
bypass placeholder resolution — for those, use `str(kb)` /
`str(pipeline)` etc. (see Example 17 / vs-context).

```python theme={"languages":{}}
from vectorshift.agent import Agent, AgentType, IOConfig, LLMInfo
from vectorshift.agent.template_refs import TemplateReferenceError
from vectorshift.agent.tool import ToolInput, ToolInputType
from vectorshift.agent.tools import GoogleSearchTool

def main() -> None:
    # Tool whose LLM-facing name is `google_search` — users reference it
    # as `[[tools.google_search]]` in instructions and descriptions.
    search = GoogleSearchTool(
        tool_name="google_search",
        tool_description="Look up fresh facts about [[inputs.topic]] on the web.",
        query=ToolInput(
            type=ToolInputType.DYNAMIC,
            description="A query related to [[inputs.topic]]",
        ),
        num_results=10,
    )

    agent = Agent.new(
        name="Topic briefing (v2 templates)",
        type=AgentType.FUNCTIONAL,
        llm_info=LLMInfo(provider="openai", model_id="gpt-4o"),
        tools=[search],
        instructions=(
            "For the given [[inputs.topic]], call [[tools.google_search]] "
            "for fresh facts, then write a short brief into [[outputs.brief]]."
        ),
        inputs={
            "topic": IOConfig(io_type="string", description="Subject to brief"),
        },
        outputs={
            "brief": IOConfig(io_type="string", description="Markdown brief"),
        },
    )
    print(f"Created agent: {agent.name} (id={agent.id})")
    # After Agent.new() the server stores the rewritten canonical form.
    fresh = Agent.fetch(id=agent.id)
    print("Server-stored instructions (canonical {{...}} form):")
    print(f"  {fresh.instructions!r}")
    tool_from_server = next(iter(fresh.tools), None)
    if tool_from_server is not None:
        print(f"Server-stored tool description: {tool_from_server.description!r}")

    # Re-saving an agent already carrying canonical placeholders is a
    # no-op: the `{{...}}` wire form passes through unchanged.
    fresh.save()
    print("Saved with canonical placeholders (idempotent).")

    # Demonstrate the rejection paths: both a missing prefix and a
    # namespaced typo raise TemplateReferenceError before anything hits
    # the network.
    for bad, why in [
        ("Summarize [[topic]]", "bare placeholder (no prefix)"),
        ("Summarize [[inputs.topci]]", "typo in input key"),
        ("Call [[tools.goggle_search]]", "typo in tool name"),
    ]:
        try:
            Agent.new(
                name="will not be created",
                type=AgentType.FUNCTIONAL,
                llm_info=LLMInfo(provider="openai", model_id="gpt-4o"),
                tools=[search],
                instructions=bad,
                inputs={"topic": IOConfig(io_type="string")},
            )
        except TemplateReferenceError as e:
            print(f"\n[{why}] rejected:")
            print(f"  {e}")

    # f-strings keep working side-by-side — `[[ ]]` never conflicts.
    subject = "quantum computing"
    composed = (
        f"(Briefing subject: {subject}) For [[inputs.topic]] call "
        f"[[tools.google_search]]."
    )
    print(f"\nf-string composed instructions preserved:\n  {composed!r}")

if __name__ == "__main__":
    main()
```

<Tip>
  Source: `examples/agents/19_template_placeholders.py` in the SDK repo.
</Tip>
