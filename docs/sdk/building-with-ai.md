> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Building with AI

> A starter prompt so ChatGPT or Claude builds VectorShift objects the right way.

Paste this prompt into ChatGPT or Claude first, then describe what you want. It points the model at the SDK docs and `llms.txt` so it builds your pipeline, agent, knowledge base, or table following the documented patterns.

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
