> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Concepts

> Pipelines, Agents, Sessions, and Knowledge Bases — when to use which.

The SDK exposes four primitives. They compose, but each has a clear job.

## At a glance

| Primitive          | What it is                                                                           | Reach for it when…                                                                                |
| ------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| **Pipeline**       | A graph of nodes (LLMs, loaders, transforms, knowledge readers). Build → save → run. | You have a fixed flow: input → transforms → output. Includes RAG, batch jobs, scheduled triggers. |
| **Agent**          | An LLM + tools + typed I/O. Runs autonomously or holds a conversation.               | The flow is not fixed — the model decides which tool to call next.                                |
| **Session**        | A live, multi-turn handle on an Agent or Chatbot, streaming events back.             | You need turn-by-turn streaming, tool events, or human-in-the-loop approvals.                     |
| **Knowledge Base** | A managed vector + document store you query directly or via a Pipeline/Agent.        | Documents need to be searchable across many Pipelines or Agents.                                  |

## How they compose

Pipelines and Agents are top-level objects you save to the platform. Sessions live on top of conversational Agents and Chatbots. Knowledge Bases are referenced from either.

```text theme={"languages":{}}
       ┌────────────┐
       │ Pipeline   │──run / stream──▶ outputs
       └──────┬─────┘
              │ reads
              ▼
       ┌────────────┐
       │ Knowledge  │
       │   Base     │
       └──────┬─────┘
              │ reads
              ▼
       ┌────────────┐    create_session    ┌──────────┐
       │  Agent     │─────────────────────▶│ Session  │──events──▶ your code
       └────────────┘                      └──────────┘
```

## Pipeline

<Card title="Pipeline overview" icon="workflow" href="/sdk/pipeline/overview" horizontal>
  Build with `p.add.input / .llm / .output / …`, then `save()` and `run()` or `stream()`.
</Card>

A `Pipeline` is the right primitive when the steps are known up front. The `add` builder is fluent and typed — the [mypy plugin](/sdk/installation#type-checking-with-mypy) catches wiring mistakes statically.

```python theme={"languages":{}}
from vectorshift import Pipeline, KnowledgeBase

p = Pipeline.new(name="RAG")
query = p.add(name="q").input(input_type="string")
kb    = p.add(name="kb").knowledge_base(query=query.text, knowledge_base=KnowledgeBase.fetch(name="my-docs"), format_context_for_llm=True)
llm   = p.add(name="llm").llm(provider="openai", model="gpt-4o", prompt=f"Context: {kb.formatted_text}\n\nQuestion: {query.text}")
p.add(name="answer").output(value=llm.response)
p.save()
```

## Agent

<Card title="Agent overview" icon="bot" href="/sdk/agent/overview" horizontal>
  An LLM with tools, instructions, and typed inputs/outputs.
</Card>

Agents come in two shapes:

* **Functional** — single call. You pass inputs, the agent decides which tools to call, you get outputs.
* **Conversational** — multi-turn. The agent holds a `Session` and emits streaming events.

```python theme={"languages":{}}
from vectorshift import Agent, LLMInfo

agent = Agent.new(
    name="Researcher",
    llm_info=LLMInfo(provider="openai", model_id="gpt-4o"),
    instructions="You are a helpful research assistant.",
)
```

## Session

<Card title="Session overview" icon="messages-square" href="/sdk/session/overview" horizontal>
  Multi-turn streaming handle returned by `agent.create_session()` or `chatbot.create_session()`.
</Card>

A `Session` is an async context manager. You `send()` and `listen()` for events — message deltas, tool calls, tool results, approval requests, errors.

```python theme={"languages":{}}
async with await agent.create_session() as session:
    await session.send("Summarise the Pinecone whitepaper.")
    async for event in session.listen():
        if event.is_complete:
            print(event.text)
            break
```

## Knowledge Base

<Card title="Knowledge Base reference" icon="database" href="/sdk/knowledge-base/reference" horizontal>
  Create, query, index documents from Python.
</Card>

A `KnowledgeBase` is a managed store of documents (files, URLs, Wikipedia, YouTube, Arxiv) with vector + keyword search. Query it directly, or reference it from a Pipeline node or an Agent tool.

```python theme={"languages":{}}
from vectorshift import KnowledgeBase

kb = KnowledgeBase.fetch(name="my-docs")
hits = kb.query(text="What is VectorShift?")
```

## Picking the right primitive

<Steps>
  <Step title="Is the flow fixed?">
    If yes → **Pipeline**. If no (the model decides next step) → **Agent**.
  </Step>

  <Step title="Do you need turn-by-turn streaming?">
    If yes → put the Agent behind a **Session**. If no, call `agent.run()` once.
  </Step>

  <Step title="Are you reading documents?">
    Use a **Knowledge Base**. Reference it from a Pipeline node, an Agent tool, or query it directly.
  </Step>
</Steps>

## What's next

<Columns cols={3}>
  <Card title="Quickstart" icon="rocket" href="/sdk/quickstart">
    Ship a pipeline in 60 seconds.
  </Card>

  <Card title="Pipeline overview" icon="workflow" href="/sdk/pipeline/overview">
    Build your first graph.
  </Card>

  <Card title="Agent overview" icon="bot" href="/sdk/agent/overview">
    Tools, sessions, streaming.
  </Card>
</Columns>
