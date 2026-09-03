> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Agent overview

> Build agents with tools and run multi-turn streaming conversations.

The `Agent` class wraps the VectorShift agent platform: declarative tools, typed inputs/outputs, and multi-turn conversations via [`Session`](/sdk/session/overview).

<Info>
  **Prerequisites:** [Installed SDK](/sdk/installation) · [API key set](/sdk/authentication) · Python 3.10+.
</Info>

## Mental model

* An agent is an **LLM + tools + instructions + typed I/O**.
* Two flavours: **Functional** (single call, you get outputs back — designed to be invoked from inside a [Pipeline](/sdk/pipeline/overview)) and **Conversational** (multi-turn, runs behind a [`Session`](/sdk/session/overview)). Pick with `type=AgentType.FUNCTIONAL` or `AgentType.CONVERSATIONAL`.
* **Tools** are declared with `Tool` + `ToolInput`. \~200 integration tools are auto-generated under `vectorshift.agent.tools`.
* Every method has an **async variant** (`anew`, `arun`, `acreate_session`, …).

<Tip>
  **Where functional agents live.** A functional agent is most useful as a node *inside* a Pipeline — drop it into a graph the same way you'd drop an LLM node, and it handles tool selection autonomously while the surrounding pipeline handles wiring, branching, and orchestration. Standalone `agent.run({...})` is fine for one-off calls; pipeline-embedded is the common production shape.
</Tip>

## Quick start

<CodeGroup>
  ```python Functional (sync) theme={"languages":{}}
  from vectorshift import Agent, LlmInfo

  agent = Agent.new(
      name="Researcher",
      llm_info=LlmInfo(provider="openai", model_id="gpt-5.1"),
      instructions="You are a helpful research assistant.",
  )
  agent.save()

  result = agent.run({"input": "What is the population of Tokyo?"})
  print(result.outputs)
  ```

  ```python Conversational (async) theme={"languages":{}}
  import asyncio
  from vectorshift import Agent, LlmInfo

  async def main():
      agent = Agent.new(
          name="Researcher",
          llm_info=LlmInfo(provider="openai", model_id="gpt-5.1"),
          instructions="You are a helpful research assistant.",
      )
      await agent.asave()

      async with await agent.create_session() as session:
          await session.send("What is the population of Tokyo?")
          async for event in session.listen():
              if event.is_complete:
                  print(event.text)
                  break

  asyncio.run(main())
  ```
</CodeGroup>

<Tip>
  Sessions require an `async` context. If you paste a `Session` snippet into a `.py` file, wrap it in `async def main(): …` and call `asyncio.run(main())`.
</Tip>

## Functional vs Conversational

|             | Functional                                                                                                                           | Conversational                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Shape       | One call, one result                                                                                                                 | Multi-turn, streaming events                                                                           |
| Entry point | `agent.run({...})` — typically called from inside a [Pipeline](/sdk/pipeline/overview) node                                          | `agent.create_session()` then `session.send()` / `session.listen()`                                    |
| Use when    | You want autonomous tool selection as one step of a larger pipeline (extraction, classification, summarisation, multi-tool research) | You're building a chatbot, want token-level streaming, or need human-in-the-loop approvals             |
| State       | Stateless — each call is independent                                                                                                 | Stateful per `session_id` (memory carries across turns when `MemoryConfig.enable_session_memory=True`) |

## Recent additions

The recent agent revamp introduced the `Tool` / `ToolInput` system, an auto-generated catalogue of \~200 integration tools (`vectorshift.agent.tools`), and `Session` objects with streamed events.

## What's next

<Columns cols={3}>
  <Card title="Reference" icon="book-open" href="/sdk/agent/reference">
    Every public method, grouped by topic.
  </Card>

  <Card title="Examples" icon="code" href="/sdk/agent/examples/conversational-agent-tools">
    Runnable examples to copy-paste and adapt.
  </Card>

  <Card title="Session" icon="messages-square" href="/sdk/session/overview">
    Multi-turn streaming on top of an Agent.
  </Card>
</Columns>
