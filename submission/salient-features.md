# VectorShift Platform: Complete Inventory of Salient Features

This document provides a comprehensive, ground-truth inventory of all salient architectural features and capabilities of VectorShift, synthesized directly from the official platform documentation ([docs/](file:///Users/hkc/Documents/vectorShift_harshit/docs)) and enterprise product architecture ([marketing/markdown/product.md](file:///Users/hkc/Documents/vectorShift_harshit/marketing/markdown/product.md)).

---

## 🏛️ High-Level Architectural Map

VectorShift is organized into **six core functional layers**:

```text
┌────────────────────────────────────────────────────────────────────────┐
│               1. DEPLOYABLE SURFACES & CLIENT PACKAGING                │
│    White-Label Portals  │  Web Forms  │  Chatbots  │  Voicebots        │
├────────────────────────────────────────────────────────────────────────┤
│                 2. AUTONOMOUS AGENTS & SKILLS ENGINE                   │
│    Agentic Loops  │  Skills Library  │  Multi-Agent Router  │ Approval │
├────────────────────────────────────────────────────────────────────────┤
│                  3. VISUAL PIPELINE ORCHESTRATION                      │
│    50+ Nodes  │  DAG Engine  │  Dynamic Variables  │  Python Run Code  │
├────────────────────────────────────────────────────────────────────────┤
│            4. STRUCTURED RELATIONAL MEMORY ("TABLES")                  │
│    AI-Native Spreadsheet  │  CRUD APIs  │  Column Vector Search        │
├────────────────────────────────────────────────────────────────────────┤
│             5. HYBRID KNOWLEDGE LAYER & PROVENANCE RAG                 │
│    Live Connectors  │  Multi-Strategy Chunking  │  Audit Provenance    │
├────────────────────────────────────────────────────────────────────────┤
│            6. DEVELOPER DUAL-SURFACE (PYTHON SDK & API)                │
│    Fluent Python Builder  │  Headless REST API  │  CLI & Webhooks      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Visual Workflow Pipeline Canvas (The Core Builder)

*Reference: [docs/platform/pipelines/overview.md](file:///Users/hkc/Documents/vectorShift_harshit/docs/platform/pipelines/overview.md) and [docs/nodes/](file:///Users/hkc/Documents/vectorShift_harshit/docs/nodes)*

* **Modular Node Library (50+ Specialized Nodes)**:
  - **LLM / Generation Nodes**: Native support for Anthropic Claude 3.5 Sonnet, OpenAI (GPT-4o, o1, o3-mini), Google Gemini, Cohere Command R+, Mistral, Groq, Perplexity, and xAI Grok.
  - **Knowledge & Search Nodes**: Semantic Search, Persistent Knowledge Base Query, Google Search, Perplexity Search, Web Scraper, Document Reader, URL Text Extractor.
  - **Logic & Control Flow**: Condition / Branching nodes, Router nodes, Merge / Join All nodes, Pick First nodes, While / For loops.
  - **Code & Custom Transformation**: Sandboxed Python Code execution nodes, JavaScript transformation nodes, Regex extractors, Text-to-JSON formatters.
  - **Multimodal Nodes**: Vision nodes (chart/table OCR), Speech-to-Text (Whisper), Text-to-Speech (ElevenLabs), Image-to-Image, Image Generation (DALL-E, Flux).
  - **Human-in-the-Loop Approval Nodes**: Pauses pipeline execution, sends an approval request via email/Slack or web drawer, and resumes downstream nodes upon human review.
* **Dynamic Variable Interpolation (`{{Node.Output}}`)**:
  - Upstream outputs are dynamically referenced anywhere in downstream fields using `{{[Node_Name].[Output_Field]}}`.
* **Sub-Workflows & Modular Nesting**:
  - Ability to invoke a pipeline from within another pipeline, passing inputs and receiving outputs.

---

## 2. Autonomous Agents & Skills Architecture

*Reference: [docs/platform/agents/overview.md](file:///Users/hkc/Documents/vectorShift_harshit/docs/platform/agents/overview.md) and [docs/sdk/agent/overview.md](file:///Users/hkc/Documents/vectorShift_harshit/docs/sdk/agent/overview.md)*

* **Autonomous Tool-Calling Loop**:
  - Unlike deterministic sequential pipelines, Agents are given goals, system instructions, and a suite of tools (pipelines, APIs, Knowledge Bases, scrapers) which they invoke dynamically based on intermediate reasoning.
* **Reusable "Skills" Framework**:
  - Capabilities, business logic, and prompt instructions defined once as modular "Skills" and hot-swapped across different agents.
* **Multi-Agent Collaboration & Routing**:
  - Hierarchical agent orchestration where an orchestrator agent breaks a user request into sub-tasks and delegates them to specialized sub-agents.
* **Session Memory & Conversational Context**:
  - Persistent chat memory across sessions with configurable memory retention windows and summary compression.

---

## 3. Dedicated "Tables" Module (AI-Native Operational State)

*Reference: [docs/sdk/table/overview.md](file:///Users/hkc/Documents/vectorShift_harshit/docs/sdk/table/overview.md)*

* **Spreadsheet-Style Relational Store**:
  - A structured data store built directly inside the platform that workflows and agents can read from, update, append to, and delete.
* **Bridge Between Unstructured & Structured Data**:
  - Pipelines extract unstructured data from PDFs, emails, or call transcripts and automatically insert standardized rows into a Table.
* **Column-Level Vector Search**:
  - Perform semantic similarity lookups across specific table columns in addition to traditional SQL-like filtering.
* **Multi-Tenant State Management**:
  - Acts as the operational backbone for asynchronous workflows (e.g. batch document screening queues, lead enrichment tracking, audit logs).

---

## 4. Hyper-Configurable Knowledge & Provenance RAG

*Reference: [docs/platform/knowledge/overview.md](file:///Users/hkc/Documents/vectorShift_harshit/docs/platform/knowledge/overview.md) and [docs/nodes/semantic-search/overview.md](file:///Users/hkc/Documents/vectorShift_harshit/docs/nodes/semantic-search/overview.md)*

* **Live Data Sync Connectors**:
  - Connects to Google Drive, Notion, Box, Microsoft OneDrive, SharePoint, Airtable, HubSpot, Zendesk, Salesforce, Postgres, and S3 with scheduled automated re-indexing.
* **Configurable Chunking Strategies**:
  - Supports **Token-length**, **Sentence-based**, **Markdown header-aware**, and **Dynamic semantic chunking**.
* **Hybrid Search Engine**:
  - Combines dense vector semantic search (OpenAI, Cohere, Voyage embeddings) with sparse keyword matching (BM25) and reciprocal rank fusion.
* **Reranking Intelligence**:
  - Optional second-stage reranking (Cohere Rerank / Voyage) to optimize relevancy before passing context to the LLM.
* **Audit-Grade Document Provenance**:
  - Preserves exact source citations down to document filename, page number, chunk index, and bounding metadata.
* **Runtime "On-The-Fly" Semantic Search**:
  - The `Semantic Search Node` builds a temporary vector index from uploaded files at runtime without requiring pre-indexing into a permanent database.

---

## 5. Deployable Client Interfaces (The Packaging Layer)

*Reference: [docs/platform/interfaces/overview.md](file:///Users/hkc/Documents/vectorShift_harshit/docs/platform/interfaces/overview.md) and [docs/platform/portals/overview.md](file:///Users/hkc/Documents/vectorShift_harshit/docs/platform/portals/overview.md)*

* **White-Label Client Portals**:
  - Deploy workflows, agents, and document search into a custom-branded portal hosted at your firm's domain (`portal.client.com`).
  - Native Single Sign-On (SSO) via SAML/OAuth, custom CSS branding, and role-based access control (RBAC).
* **Interactive Web Forms**:
  - Convert any multi-step pipeline into a standalone, shareable web form with custom input validation and file dropzones.
* **Omnichannel Chatbots**:
  - **Full-Page Assistant**: Dedicated chat interface for team document exploration.
  - **Website Widget**: Embeddable floating bubble via a 1-line JS snippet.
  - **WhatsApp & SMS Bots**: Native integration via Twilio for field operations and mobile messaging.
  - **Slack Bot Integration**: Interact directly with pipelines and agents within enterprise Slack channels.
* **Voicebots**:
  - End-to-end voice conversational agents combining Whisper STT, LLM reasoning, and ElevenLabs TTS with latency optimization.

---

## 6. Developer Dual-Surface: Visual Canvas $\leftrightarrow$ Fluent Python SDK

*Reference: [docs/sdk/index.md](file:///Users/hkc/Documents/vectorShift_harshit/docs/sdk/index.md)*

* **Fluent Python Builder API**:
  - Every visual feature has a 1-to-1 Python SDK equivalent using a clean builder syntax:
    ```python
    pipeline = (
        Pipeline()
        .add(name="input").input()
        .add(name="kb").knowledge_base(kb_id="kb_123")
        .add(name="llm").llm(model="claude-3-5-sonnet")
    )
    pipeline.deploy()
    ```
* **Headless REST API**:
  - Programmatic endpoints for pipeline runs, bulk batch runs, knowledge queries, and agent sessions ([docs/api-reference/overview.md](file:///Users/hkc/Documents/vectorShift_harshit/docs/api-reference/overview.md)).
* **CLI Utility**:
  - Command-line tools for local development, pipeline syncing, and integration management.

---

## 7. Enterprise Security, Governance & Analytics

*Reference: [docs/account/organizations/overview.md](file:///Users/hkc/Documents/vectorShift_harshit/docs/account/organizations/overview.md) and [docs/platform/analytics/overview.md](file:///Users/hkc/Documents/vectorShift_harshit/docs/platform/analytics/overview.md)*

* **Zero Data Retention & Training Protection**:
  - Enterprise agreements ensure customer data and documents are never used to train foundational AI models.
* **Granular RBAC & Multi-Tenancy**:
  - Organization, Workspace, and Project-level access controls with fine-grained read/write/execute permissions.
* **Execution Observability & Tracing**:
  - Comprehensive run logs capturing latency per node, token consumption, input/output snapshots, and error stack traces.

---

## 8. Marketplace & Reusable Template Library

*Reference: [docs/platform/marketplaces/templates.md](file:///Users/hkc/Documents/vectorShift_harshit/docs/platform/marketplaces/templates.md)*

* **Public & Private Marketplaces**:
  - 100+ pre-built pipeline and agent templates (document summarizers, research bots, contract review, customer support triage).
  - Internal firm marketplace allowing teams to publish standardized, approved workflows across their organization.
