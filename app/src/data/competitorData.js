/**
 * Architectural Competitor Teardown Data
 * VectorShift vs. Clay vs. Intercom Fin vs. Dify.ai
 */

export const COMPETITOR_MATRIX = [
  {
    dimension: "Core Mental Model",
    vectorShift: "Visual DAG + Python SDK + White-Label Portals",
    clay: "Reactive Spreadsheet + 'Workflows' DAG",
    fin: "Deterministic Decision Trees + RAG Fallback",
    dify: "Visual LLM Orchestration + Prompt Playground"
  },
  {
    dimension: "Target Builder",
    vectorShift: "Forward-Deployed AI Operator",
    clay: "GTM Engineer / RevOps Lead",
    fin: "Support Operations / CX Lead",
    dify: "Full-Stack AI Application Developer"
  },
  {
    dimension: "Primary Unit of Work",
    vectorShift: "Pipeline Run (PDF, query, form)",
    clay: "Row Record (Lead, Account, Domain)",
    fin: "Resolved Customer Conversation",
    dify: "API Request / Workflow Execution"
  },
  {
    dimension: "Data & Knowledge Layer",
    vectorShift: "Deep Document Hybrid RAG with Provenance",
    clay: "100+ External B2B Vendor Waterfalls",
    fin: "Curated Help Center + Content Guidance",
    dify: "Standard Vector DB (Qdrant / Milvus / Weaviate)"
  },
  {
    dimension: "Packaging & Delivery",
    vectorShift: "White-Label Client Portals, Web Forms, WhatsApp",
    clay: "Push to Sales Stack (Salesforce, Smartlead)",
    fin: "Omnichannel Messenger Widget & Support Inbox",
    dify: "Hosted Web App & Headless REST API"
  },
  {
    dimension: "Pricing & Value Metric",
    vectorShift: "Platform Subscription + Compute Credits",
    clay: "Credit Consumption per Data Match",
    fin: "$0.99 per Resolved Conversation (Outcome-based)",
    dify: "Open-Source Self-Hosted / Cloud Tier"
  }
];

export const STRATEGIC_PLAYBOOK = [
  {
    source: "Clay (GTM Engine)",
    lesson: "Table-to-Workflow Scaffolding",
    description: "Clay bridges the spreadsheet and the DAG seamlessly. VectorShift should let investors define columns in a Deal Table (Deck, ARR, EBITDA) and auto-scaffold the underlying pipeline DAG with one click."
  },
  {
    source: "Intercom Fin (Support CX)",
    lesson: "Deterministic 'Procedures' with Zero Math Hallucination",
    description: "Fin forbids LLMs from guessing operational actions. Adopting Fin's strict 'Procedures' ensures multi-step financial calculations execute deterministically with validated parameters."
  },
  {
    source: "Intercom Fin (Support CX)",
    lesson: "Outcome-Based Telemetry over Token Markups",
    description: "Instead of billing for tokens or credits, report Diligence Hours Saved and Citation Accuracy Rates, giving enterprise leaders hard ROI data to justify renewals."
  },
  {
    source: "Dify.ai (LLM Orchestration)",
    lesson: "Single-Node Prompt Benchmarking",
    description: "Allow operators to test individual LLM nodes with side-by-side prompt variations without executing the entire pipeline DAG."
  }
];
