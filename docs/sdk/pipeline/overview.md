> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Pipeline overview

> Build, run, stream, and manage VectorShift pipelines from Python.

The `Pipeline` class is the main entry point for building, saving, and running VectorShift pipelines from Python. Pipelines are graphs of nodes (LLMs, data loaders, transforms, knowledge-base readers, …) that you assemble with the fluent `pipeline.add` builder, then `save()` and `run()` against the platform.

<Info>
  **Prerequisites:** [Installed SDK](/sdk/installation) · [API key set](/sdk/authentication) · Python 3.10+.
</Info>

## Mental model

* A pipeline is a **graph of nodes**. Inputs flow through transforms and LLMs to outputs.
* You build it with the **`p.add.*` builder** — `add.input`, `add.llm`, `add.knowledge_base_reader`, `add.output`, and so on. Every node returns an object whose attributes (`.text`, `.response`, `.results`) are wired into the next node.
* **`save()`** persists the graph to the platform (and optionally bumps a version). **`run()`** executes it.
* Every method has an **async variant** (`asave`, `arun`, `astream`, …). Install `vectorshift[async]` to use them.

## Quick start

<CodeGroup>
  ```python Sync theme={"languages":{}}
  from vectorshift import Pipeline

  p = Pipeline.new(name="My pipeline")
  inp = p.add(name="query").input(input_type="string")
  llm = p.add(name="llm").llm(provider="openai", model="gpt-5.1", prompt=inp.text)
  p.add(name="answer").output(value=llm.response)

  p.save()
  result = p.run({"query": "What is VectorShift?"})
  print(result["outputs"]["answer"])
  ```

  ```python Async theme={"languages":{}}
  import asyncio
  from vectorshift import Pipeline

  async def main():
      p = Pipeline.new(name="My pipeline")
      inp = p.add(name="query").input(input_type="string")
      llm = p.add(name="llm").llm(provider="openai", model="gpt-5.1", prompt=inp.text)
      p.add(name="answer").output(value=llm.response)

      await p.asave()
      result = await p.arun({"query": "What is VectorShift?"})
      print(result["outputs"]["answer"])

  asyncio.run(main())
  ```
</CodeGroup>

## Recent additions

Background runs (`start` / `stream` / `terminate`), async variants of every method, and user/org-scoped sharing (`share(user_id=...)`) all landed recently. See the [reference](/sdk/pipeline/reference) for the full surface.

## What's next

<Columns cols={3}>
  <Card title="Reference" icon="book-open" href="/sdk/pipeline/reference">
    Every public method, grouped by topic.
  </Card>

  <Card title="Examples" icon="code" href="/sdk/pipeline/examples/llm-pipeline">
    Runnable examples to copy-paste and adapt.
  </Card>

  <Card title="Concepts" icon="compass" href="/sdk/concepts">
    Pipelines vs Agents vs Sessions vs KBs.
  </Card>
</Columns>
