> ## Documentation Index
> Fetch the complete documentation index at: https://docs.vectorshift.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# RAG pipeline

> Wire a KnowledgeBase reader behind an LLM node to answer queries from your documents

A query input feeds both a knowledge-base node (which retrieves and formats
context) and an LLM node that grounds its answer on the retrieved text.
Replace the knowledge base name with one from your account.

```python theme={"languages":{}}
from vectorshift import Pipeline, KnowledgeBase

# Fetch the pipeline if it already exists, otherwise create it
PIPELINE_NAME = "rag-pipeline"
try:
    pipeline = Pipeline.fetch(name=PIPELINE_NAME)
    print(f"Pipeline fetched: id={pipeline.id}, branch_id={pipeline.branch_id}")
except Exception as e:
    print(f"Error fetching pipeline: {e}")
    pipeline = Pipeline.new(name=PIPELINE_NAME)
    print(f"Pipeline created: id={pipeline.id}, branch_id={pipeline.branch_id}")

# User query feeds both the knowledge-base reader and the LLM
query = pipeline.add(name="query").input(input_type="string")

# Retrieve and format relevant documents from your knowledge base
knowledge_base = KnowledgeBase.fetch(name="your knowledge base name here")
kb_node = pipeline.add(name="kb").knowledge_base(
    query=query.text,
    knowledge_base=knowledge_base,
    format_context_for_llm=True,
)

# Ground the answer on the retrieved context
answer = pipeline.add(name="answer").llm(
    provider="openai",
    model="gpt-4o-mini",
    system="You are a helpful assistant that answers questions using only the provided context.",
    prompt=f"Query: {query.text}\n\nContext: {kb_node.formatted_text}",
)

pipeline.add(name="response").output(output_type="string", value=answer.response)

pipeline.save(deploy=True)
```

<Tip>
  Source: `examples/pipelines/rag_pipeline.py` in the SDK repo.
</Tip>
