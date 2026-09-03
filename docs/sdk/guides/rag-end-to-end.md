> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# RAG end-to-end

> Build a conversational RAG agent — ingest your docs into a Knowledge Base, expose it as a tool on an Agent, run multi-turn with citations.

By the end of this guide you'll have a working RAG endpoint: a Knowledge Base full of your documents, plus a conversational Agent that retrieves from it on every turn and answers the user with proper citations.

<Info>
  **Prerequisites.** [Installed SDK](/sdk/installation) · [API key set](/sdk/authentication) · Python 3.10+. About 15 minutes.
</Info>

## What you'll build

```text theme={"languages":{}}
            docs (file / URL)
                   │
                   ▼
        ┌─────────────────────┐
        │   KnowledgeBase     │  ◄── kb.add_urls_and_wait(...)
        └──────────┬──────────┘
                   │ exposed via
                   │ AgentTools.knowledge_base(id=kb.id, ...)
                   ▼
   user ──▶ ┌──────────────────────────────┐
   query    │ Conversational Agent         │
            │   LLM + product_docs tool +  │ ──▶ streamed reply
            │   session memory             │     with citations
            └──────────────────────────────┘
```

<Steps>
  <Step title="Create the Knowledge Base">
    `KnowledgeBase.new` takes an embedding model and an `IndexingConfig`. The `SplitterMethod` selector tells the indexer how to chunk — `MARKDOWN` is a good default for docs.

    ```python theme={"languages":{}}
    from vectorshift.knowledge_base import (
        KnowledgeBase,
        IndexingConfig,
        SplitterMethod,
    )

    kb = KnowledgeBase.new(
        name="product-docs",
        embedding_model="text-embedding-3-small",
        indexing_config=IndexingConfig(
            chunk_size=500,
            chunk_overlap=50,
            splitter=SplitterMethod.MARKDOWN,
        ),
    )
    print(f"Created KB id={kb.id}")
    ```

    See [`KnowledgeBase.new`](/sdk/knowledge-base/reference#new) for every option.
  </Step>

  <Step title="Ingest documents">
    Two flavours: **files** (`add_files` / `add_files_and_wait`) and **URLs** (`add_urls` / `add_urls_and_wait`). Both have a fire-and-forget mode (returns an `IngestionTask` immediately) and a blocking `…_and_wait` variant that polls until `COMPLETED`.

    ```python theme={"languages":{}}
    from pathlib import Path
    from vectorshift.knowledge_base import (
        IngestionStatus,
        UrlConfig,
        RescrapeFrequency,
    )

    # Files — blocks until indexing completes.
    final = kb.add_files_and_wait(
        [Path("./manuals/getting-started.md")],
        timeout=180,
    )
    assert final.status == IngestionStatus.COMPLETED
    print(f"file ingested: items={final.item_ids}")

    # Recursive URL crawl with weekly refresh.
    crawl = kb.add_urls_and_wait(
        urls=["https://docs.example.com"],
        url_config=UrlConfig(
            recursive=True,
            url_limit=200,
            ai_enhance_content=True,
            rescrape_frequency=RescrapeFrequency.WEEKLY,
        ),
        timeout=300,
    )
    print(f"crawl status: {crawl.status}")
    ```

    <Tip>
      `add_files` and `add_urls` (without `_and_wait`) return an `IngestionTask` so you can hand the polling off to a worker. Check progress with `kb.ingestion_status(task.task_id)`.
    </Tip>
  </Step>

  <Step title="Smoke-test retrieval">
    Verify retrieval works before plugging the KB into an agent. `kb.query(...)` returns a `QueryResult` `TypedDict` with `result["chunks"]`, `result["citations"]` (may be empty), and an optional `result.get("answer")` (may be absent/empty).

    ```python theme={"languages":{}}
    res = kb.query("How do I reset my password?", top_k=5)

    print(f"got {len(res['chunks'])} chunks")
    if res["chunks"]:
        print("top chunk:", res["chunks"][0])
    answer = res.get("answer")
    if answer:
        print("answer:", answer)
    ```

    If the top results look wrong, retrieval is your problem — fix it here before wiring up the agent. Common culprits: too-small `chunk_size`, wrong `splitter`, missing filters.
  </Step>

  <Step title="Build a conversational agent with the KB as a tool">
    `AgentTools.knowledge_base(id=kb.id, ...)` is the catalogue entry that gives any Agent native semantic retrieval over your KB. Plug it into a conversational agent with session memory and you get RAG out of the box — the model decides when to retrieve, formats context for itself, and emits citations.

    ```python theme={"languages":{}}
    from vectorshift.agent import (
        Agent, AgentTools, AgentType, LlmInfo, MemoryConfig,
    )

    agent = Agent.new(
        name="Product docs assistant",
        type=AgentType.CONVERSATIONAL,
        llm_info=LlmInfo(provider="openai", model_id="gpt-5.1"),
        tools=[
            AgentTools.knowledge_base(
                id=kb.id,
                tool_name="product_docs",
                tool_description=(
                    "Search the product docs knowledge base for context "
                    "to answer the user's question."
                ),
                format_context_for_llm=True,
                rerank_documents=True,
            ),
        ],
        instructions=(
            "You answer strictly from the product_docs knowledge base. "
            "If the search returns nothing relevant, say so plainly "
            "instead of guessing."
        ),
        memory_config=MemoryConfig(enable_session_memory=True),
    )
    print(f"agent id={agent.id} tools={[t.name for t in agent.tools]}")
    ```

    `rerank_documents=True` runs a cross-encoder over the top-`k` hits to push the most relevant chunks to the top; `format_context_for_llm=True` returns the retrieval result pre-templated so the model can cite it directly. Both are off by default — turn them on for production RAG.
  </Step>

  <Step title="Run multi-turn through a session">
    Conversational agents run inside a [`Session`](/sdk/session/overview). Use it as an `async` context manager, `send()` user turns, and `listen()` for `MESSAGE_DELTA` / `MESSAGE_COMPLETE` to stream the reply.

    ```python theme={"languages":{}}
    import asyncio
    from vectorshift.events import SessionEventType

    async def stream_one_turn(session) -> str:
        full = ""
        async for event in session.listen(
            event_types=[
                SessionEventType.MESSAGE_DELTA,
                SessionEventType.MESSAGE_COMPLETE,
            ]
        ):
            if event.delta:
                print(event.delta, end="", flush=True)
                full += event.delta
            if event.is_complete:
                print()
                return event.text or full
        return full

    async def main():
        async with await agent.create_session() as session:
            print(f"session id={session.session_id}")

            await session.send("What is RAG?")
            await stream_one_turn(session)

            # Follow-up — session memory carries the prior turn.
            await session.send("How is it different from fine-tuning?")
            await stream_one_turn(session)

    asyncio.run(main())
    ```

    The agent will call `product_docs` whenever it needs to ground a claim. Retrieved chunks appear in `event.delta` as `<vs-cite item='…'/>` tags inlined into the reply text — render those however your UI needs.
  </Step>

  <Step title="Observe the retrieval (optional)">
    To see exactly when the agent retrieves, drop the `event_types` filter so the loop also receives `TOOL_CALL` and `TOOL_RESULT` events.

    ```python theme={"languages":{}}
    async with await agent.create_session() as session:
        await session.send("Walk me through onboarding a new team member.")
        async for event in session.listen():
            if event.type == SessionEventType.TOOL_CALL:
                print(f"[tool] {event.tool_name}({event.data})")
            elif event.type == SessionEventType.TOOL_RESULT:
                print(f"[result] {str(event.data.get('result',''))[:200]}")
            elif event.type == SessionEventType.MESSAGE_DELTA:
                print(event.delta, end="", flush=True)
            elif event.type == SessionEventType.MESSAGE_COMPLETE:
                print(); break
    ```

    Each `TOOL_CALL` is one retrieval round-trip. If you see zero, the model decided it didn't need to retrieve — usually because the question doesn't require KB context, not a bug.
  </Step>
</Steps>

## Operational tips

* **Reindex on schedule.** For URL sources, set `rescrape_frequency` to `RescrapeFrequency.WEEKLY` (or `DAILY`) so the KB stays current automatically.
* **Filter at query time.** Pass `filters=[FilterClause(field="team", op=FilterOperator.EQ, value="hr")]` on `kb.query` to scope retrieval directly; the agent-tool path uses the KB's own search config (turn on `enable_filter` if you want the agent to set filters itself).
* **Watch for `KbIngestionFailed` / `KbIngestionTimeout`** on ingest. Most failures are oversized files or unsupported MIME types — `final.status` will be `FAILED` and `final.error` will tell you why.
* **Make `product_docs` mandatory.** The default `approval_config` for `knowledge_base` tools is `AUTO_RUN` so the agent retrieves without asking. If you'd rather force every query through retrieval, instruct the model explicitly: "Always call product\_docs before answering."

## What's next

<Columns cols={3}>
  <Card title="Customer support bot" icon="message-circle" href="/sdk/guides/support-bot">
    Add more tools (web search, approvals) on top of this agent.
  </Card>

  <Card title="RAG pipeline example" icon="code" href="/sdk/pipeline/examples/rag-pipeline">
    The pipeline-shaped alternative (no agent, no session).
  </Card>

  <Card title="KnowledgeBase reference" icon="book-open" href="/sdk/knowledge-base/reference">
    All ingest + query options.
  </Card>
</Columns>
