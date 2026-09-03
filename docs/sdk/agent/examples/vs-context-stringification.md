> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Vs context stringification

> Example 17: Inline VS-object references via str(...) (v2)

Agents receive structured object context by interpolating SDK objects
directly into session text. The SDK's `__str__` emits `\<vs-context>`
blocks that VectorShift recognizes and resolves to the real object.

What this demonstrates:

* str(kb), str(pipeline), str(agent), str(chatbot) -> `\<vs-context>`
* kb.item(item\_id) / kb.folder(folder\_id) for granular references
* Inline use in session.send() and in f-strings
* repr() stays developer-facing (never the wire format)

Prerequisites for running end-to-end:
export VECTORSHIFT\_API\_KEY=...

# and a conversational agent that can consume \<vs-context> input

```python theme={"languages":{}}
import asyncio

from vectorshift.agent import Agent, AgentType, LLMInfo, MemoryConfig
from vectorshift.chatbot import Chatbot
from vectorshift.events import SessionEventType
from vectorshift.knowledge_base import KnowledgeBase
from vectorshift.pipeline.object import Pipeline

def demo_strings_offline() -> None:
    """Show the wire format for each class without hitting the API."""
    kb = KnowledgeBase(id="kb_ABC", name="Company Docs")
    pipe = Pipeline(id="pl_SUP")
    agent_stub = Agent(
        id="ag_TUT",
        name="Tutor",
        llm_info=LLMInfo(provider="openai", model_id="gpt-4o"),
        agent_type=AgentType.CONVERSATIONAL,
    )
    chatbot = Chatbot(
        id="cb_HELP",
        name="Helper",
        description="Frontline",
        pipeline_id=pipe.id or "",
    )

    print("--- Wire format (vs-context) ---")
    print(f"KB:         {kb}")
    print(f"KB item:    {kb.item('it_42')}")
    print(f"KB folder:  {kb.folder('fld_9')}")
    print(f"Pipeline:   {pipe}")
    print(f"Agent:      {agent_stub}")
    print(f"Chatbot:    {chatbot}")

    print("\n--- Developer-facing repr (unchanged) ---")
    for obj in (kb, pipe, agent_stub, chatbot):
        print(f"  {obj!r}")

    print("\n--- Inline composition ---")
    msg = f"Search {kb} for Q3 revenue and then run {pipe} to build the brief."
    print(msg)

async def demo_session_send(agent_id: str, kb_id: str, kb_name: str) -> None:
    """Illustrate how to reach a live conversational agent with a KB
    reference embedded inline. Call this only when a conversational agent
    and KB exist in your account."""
    agent = Agent.fetch(id=agent_id)
    kb = KnowledgeBase(id=kb_id, name=kb_name)

    async with await agent.create_session() as session:
        print(f"Session: {session.session_id}")
        await session.send(f"Using {kb}, summarize the last quarterly review.")

        async for event in session.listen(
            event_types=[
                SessionEventType.MESSAGE_DELTA,
                SessionEventType.MESSAGE_COMPLETE,
            ]
        ):
            if event.delta:
                print(event.delta, end="", flush=True)
            if event.is_complete:
                print()
                break

def main() -> None:
    demo_strings_offline()

    # Uncomment + fill in real ids to exercise a live session round-trip.
    # asyncio.run(
    #     demo_session_send(
    #         agent_id="ag_CONVO_REAL",
    #         kb_id="kb_REAL",
    #         kb_name="Company Docs",
    #     )
    # )

if __name__ == "__main__":
    main()
```

<Tip>
  Source: `examples/agents/20_vs_context_stringification.py` in the SDK repo.
</Tip>
