> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Chatbot session

> Example 11: Chatbot session

Demonstrates that the same Session class works for chatbots,
providing a unified real-time experience across both agents and chatbots.

```python theme={"languages":{}}
import asyncio

from vectorshift import Chatbot, Pipeline
from vectorshift.events import SessionEventType
from vectorshift.request import NotFoundError

def _ensure_chatbot() -> tuple[Chatbot, Pipeline | None]:
    """Fetch a demo chatbot or create one on the fly.

    Returns the chatbot and the pipeline that was created here (for
    cleanup). If a pre-existing chatbot was used, the pipeline ref is
    ``None`` and is left in place.
    """
    try:
        return Chatbot.fetch(name="My Chatbot"), None
    except NotFoundError:
        pass

    # Build a minimal LLM pipeline so the chatbot has something to
    # wire to. Node names go through ``pipeline.add(name=..)``; the
    # type-specific kwargs go on the ``.<type>(...)`` call.
    pipeline = Pipeline.new(name="Chatbot demo pipeline")
    user_input = pipeline.add(name="user_input").input(input_type="string")
    answer = pipeline.add(name="llm_call").llm(
        provider="openai", model="gpt-4o-mini", prompt=user_input.text
    )
    pipeline.add(name="answer").output(output_type="string", value=answer.response)
    pipeline.save()

    chatbot = Chatbot.new(
        name="My Chatbot",
        description="Demo chatbot for example 11.",
        pipeline_id=pipeline.id,
        input_node_name="user_input",
        output_node_name="answer",
    )
    return chatbot, pipeline

async def main() -> None:
    chatbot, owned_pipeline = _ensure_chatbot()
    print(f"Fetched chatbot: {chatbot.name} (id={chatbot.id})")

    try:
        # Open a session - same API as agent.create_session()
        async with await chatbot.create_session() as session:
            print(f"Session connected: {session.session_id}")

            await session.send("Hello! What can you help me with?")

            print("\nAssistant: ", end="", flush=True)
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

        print("\nDone.")
    finally:
        # Only tear down resources this example created.
        if owned_pipeline is not None:
            try:
                chatbot.delete()
            except Exception:
                pass
            try:
                owned_pipeline.delete()
            except Exception:
                pass

if __name__ == "__main__":
    asyncio.run(main())
```

<Tip>
  Source: `examples/agents/11_chatbot_session.py` in the SDK repo.
</Tip>
