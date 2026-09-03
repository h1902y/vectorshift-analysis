> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Quickstart

> From zero to a running pipeline in 60 seconds.

<Info>
  **Prerequisites:** Python 3.10+ and a VectorShift account. If you haven't installed yet, see [Installation](/sdk/installation).
</Info>

## Run your first pipeline

Pick where you're writing code — the pipeline you build is identical in each, and shows up in the [platform editor](https://app.vectorshift.ai) either way.

<Tabs>
  <Tab title="Local">
    <Steps>
      <Step title="Install the SDK">
        ```bash theme={"languages":{}}
        pip install vectorshift
        ```
      </Step>

      <Step title="Set your API key">
        Generate one at [Account → API Keys](https://app.vectorshift.ai/account/api-keys), then export it **before** you run any Python:

        ```bash theme={"languages":{}}
        export VECTORSHIFT_API_KEY="sk_..."
        ```

        <Warning>
          The SDK reads this variable **at import time**, so it must be set before `import vectorshift`. Setting it afterward — or using a wrong prefix — surfaces as a `401`. To set the key in code instead, assign `vectorshift.api_key = "sk_..."` before your first API call.
        </Warning>
      </Step>

      <Step title="Build, save, and run">
        Paste this into a file (`hello.py`) and run it.

        ```python theme={"languages":{}}
        from vectorshift import Pipeline

        p = Pipeline.new(name="Hello pipeline")
        query = p.add(name="query").input(input_type="string")
        llm = p.add(name="llm").llm(provider="openai", model="gpt-5.1", prompt=query.text)
        p.add(name="answer").output(value=llm.response)

        p.save()
        result = p.run({"query": "What is VectorShift in one sentence?"})
        print(result["outputs"]["answer"])
        ```

        ```bash theme={"languages":{}}
        python hello.py
        ```
      </Step>

      <Step title="See it in the editor">
        Open the [platform](https://app.vectorshift.ai) — your new pipeline is editable in the visual editor, identical to one built there.
      </Step>
    </Steps>
  </Tab>

  <Tab title="Google Colab">
    <Steps>
      <Step title="Install the SDK">
        In a new [Colab notebook](https://colab.research.google.com), run this in the first cell:

        ```python theme={"languages":{}}
        !pip install vectorshift
        ```
      </Step>

      <Step title="Set your API key">
        Generate one at [Account → API Keys](https://app.vectorshift.ai/account/api-keys). Use `getpass` so the key isn't saved in the notebook:

        ```python theme={"languages":{}}
        import os
        from getpass import getpass
        os.environ["VECTORSHIFT_API_KEY"] = getpass("VectorShift API key: ")
        ```

        <Tip>Prefer Colab's **🔑 Secrets** panel? Store it as `VECTORSHIFT_API_KEY`, then `os.environ["VECTORSHIFT_API_KEY"] = userdata.get("VECTORSHIFT_API_KEY")` after `from google.colab import userdata`.</Tip>
      </Step>

      <Step title="Build, save, and run">
        Paste this into the next cell and run it.

        ```python theme={"languages":{}}
        from vectorshift import Pipeline

        p = Pipeline.new(name="Hello pipeline")
        query = p.add(name="query").input(input_type="string")
        llm = p.add(name="llm").llm(provider="openai", model="gpt-5.1", prompt=query.text)
        p.add(name="answer").output(value=llm.response)

        p.save()
        result = p.run({"query": "What is VectorShift in one sentence?"})
        print(result["outputs"]["answer"])
        ```
      </Step>

      <Step title="See it in the editor">
        Open the [platform](https://app.vectorshift.ai) — your new pipeline is editable in the visual editor, identical to one built there.
      </Step>
    </Steps>
  </Tab>

  <Tab title="Replit">
    <Steps>
      <Step title="Create a Python Repl">
        Start a new **Python** Repl at [replit.com](https://replit.com).
      </Step>

      <Step title="Add the SDK">
        Add `vectorshift` from the **Packages** pane, or just import it — Replit installs it on first run. You can also run it in the Shell:

        ```bash theme={"languages":{}}
        pip install vectorshift
        ```
      </Step>

      <Step title="Set your API key">
        Open **Tools → Secrets**, add a secret named `VECTORSHIFT_API_KEY` with your key from [Account → API Keys](https://app.vectorshift.ai/account/api-keys). Replit injects secrets as environment variables, so the SDK picks it up automatically.
      </Step>

      <Step title="Build, save, and run">
        Paste this into `main.py` and click **Run**.

        ```python theme={"languages":{}}
        from vectorshift import Pipeline

        p = Pipeline.new(name="Hello pipeline")
        query = p.add(name="query").input(input_type="string")
        llm = p.add(name="llm").llm(provider="openai", model="gpt-5.1", prompt=query.text)
        p.add(name="answer").output(value=llm.response)

        p.save()
        result = p.run({"query": "What is VectorShift in one sentence?"})
        print(result["outputs"]["answer"])
        ```
      </Step>
    </Steps>
  </Tab>
</Tabs>

<Tip>
  **For the best developer experience, enable the [mypy plugin](/sdk/installation#type-checking-with-mypy).** It catches wrong field names on node builders, mismatched types between wired nodes, and agent tools missing required inputs — at edit time, before you save. Drop a `mypy.ini` with `plugins = vectorshift.mypy_plugin` and most editors (VS Code, Cursor, PyCharm, Zed) light up SDK-aware errors inline as you type.
</Tip>

## Now try

<Columns cols={3}>
  <Card title="Stream tokens" icon="zap" href="/sdk/pipeline/examples/streaming">
    Swap `run` for `stream` and yield tokens as they arrive.
  </Card>

  <Card title="Run in the background" icon="layers" href="/sdk/pipeline/examples/background-run">
    `start()` returns immediately; poll or stream for results.
  </Card>

  <Card title="Turn it into an agent" icon="bot" href="/sdk/agent/overview">
    Add tools and multi-turn conversation.
  </Card>
</Columns>

## What's next

<Columns cols={2}>
  <Card title="Concepts" icon="compass" href="/sdk/concepts">
    Pipeline vs Agent vs Session vs Knowledge Base.
  </Card>

  <Card title="Pipeline reference" icon="book-open" href="/sdk/pipeline/reference">
    Every public method.
  </Card>
</Columns>

## Building with AI

Want ChatGPT or Claude to build a pipeline, agent, knowledge base, or table for you? Paste this prompt first, then describe what you want — it points the model at the SDK docs and `llms.txt` so it follows the documented patterns.

```text theme={"languages":{}}
You are building with the VectorShift Python SDK. Before writing code, read
https://docs.vectorshift.ai/llms.txt and the SDK reference pages it links.
Follow the documented patterns exactly: use the builder API, correct node and
field names, and the right object type for my request (pipeline, agent,
knowledge base, or table). Install with `pip install vectorshift` and
authenticate via the VECTORSHIFT_API_KEY environment variable. Then build,
save, and run what I describe, returning one complete runnable script.

My request:
```
