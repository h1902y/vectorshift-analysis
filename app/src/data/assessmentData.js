/**
 * MECE Assessment Data Layer
 * Dimension 1: The Persona Triangulation
 * Dimension 2: The Complete Agentic Lifecycle
 * Dimension 3: The Private Market Intelligence Moat
 */

export const ASSESSMENT_METADATA = {
  candidate: "Harshit Krishna Choudhary",
  role: "Product Manager (Platform)",
  company: "VectorShift",
  version: "2.0.0",
  submissionDate: "September 2026",
  deliverableType: "Platform Evaluation, Architecture & UX Roadmap"
};

export const PERSONA_TRIANGULATION = {
  anchorICP: {
    title: "The Forward-Deployed AI Operator",
    tag: "Primary ICP",
    roles: ["Technical Solutions Architect", "Internal AI Lead", "Boutique AI Consultant", "Technical Chief of Staff"],
    mission: "Enters complex business units, deconstructs messy document workflows, and ships working agentic systems in days.",
    whyVectorShiftWins: "Provides the visual DAG assembly speed of no-code, the escape hatch of the Python SDK, and instant White-Label Portals (portal.firm.com) with zero frontend overhead.",
    corePainWithoutVectorShift: "Forced to either hand-code full-stack web apps with Auth0/FastAPI, or suffer the fragility and lack of auditability in consumer chatbot tools."
  },
  excludedPersonas: [
    {
      title: "The Business Executive / Partner",
      role: "Managing Director / VP of Finance",
      reasonExcluded: "Pure consumer. Will never configure an embedding dimension, wire a Merge node, or debug an API payload. Expecting them to build in a DAG canvas guarantees enterprise churn.",
      vectorShiftSurface: "End-User View: Clean White-Label Portals, Dropzone Web Forms, and Executive Chatbots."
    },
    {
      title: "The Pure Software Engineer",
      role: "Core Backend / ML Engineer",
      reasonExcluded: "Building proprietary core IP. Strongly prefers code-first frameworks (LangGraph, raw Python), Git-driven CI/CD, and local IDEs over visual drag-and-drop canvases.",
      vectorShiftSurface: "Headless Python SDK (`import vectorshift`) and REST APIs for programmatic orchestration."
    }
  ]
};

export const LIFECYCLE_STAGES = [
  {
    id: "stage-1",
    name: "1. Configuration & Scaffolding",
    phase: "Assembly Layer",
    description: "AI-assisted meta-scaffolder grounded in enterprise templates.",
    keyCapabilities: [
      "Auto-generates recommended DAG topology from natural language goals",
      "Injects validated JSON schemas with Pydantic output guarantees",
      "Auto-selects optimal chunking strategies (Markdown-header chunking for financial tables)"
    ],
    bottleneck: "Manual assembly leads to suboptimal chunk sizes, broken variable references, and unconstrained tool schemas."
  },
  {
    id: "stage-2",
    name: "2. Simulation & World Model Testing",
    phase: "Verification Layer",
    description: "Synthetic test bench generating Scenario x Persona matrices.",
    keyCapabilities: [
      "Simulates 50 diverse document edge cases (distressed debt, missing GAAP, hostile inputs)",
      "Scores outputs on Factuality, Math Precision, and Schema Conformance",
      "Auto-hardening engine suggests prompt constraints when edge cases fail"
    ],
    bottleneck: "Single-prompt manual testing leaves blind spots; high-stakes finance cannot risk unverified deployments."
  },
  {
    id: "stage-3",
    name: "3. Continuous Evals & Anomaly Alerting",
    phase: "Observability Layer",
    description: "Real-time drift detection and automated LLM-as-a-judge sampling.",
    keyCapabilities: [
      "Continuously samples 5-10% of live client runs for quality drift",
      "Proactive Slack/Email/Webhook alerting on rubric drops below 90%",
      "Traces token costs, latency spikes, and schema parsing degradation"
    ],
    bottleneck: "Traditional analytics is purely historical and reactive; builders only discover drift when partners complain."
  }
];

export const PRIVATE_MARKET_MOAT = [
  {
    pillar: "Audit-Grade Provenance",
    metric: "100% Page/Chunk Citation",
    description: "In private finance, an AI cannot guess. Every figure must link to the exact PDF page, paragraph, and financial table."
  },
  {
    pillar: "Deep Document Deconstruction",
    metric: "40-100 Page CIMs",
    description: "Ingests complex confidential information memorandums, SEC filings, and Quality of Earnings reports into structured tables."
  },
  {
    pillar: "Deterministic Financial Logic",
    metric: "0% Math Hallucination",
    description: "Pairs LLM qualitative extraction with deterministic calculator nodes (Normalized EBITDA, IRR/MOIC, debt schedules)."
  },
  {
    pillar: "Deal-Isolated Tenant Security",
    metric: "Mutual NDA Compliance",
    description: "Zero model training, deal-level tenant boundaries, and SOC2/HIPAA enterprise governance."
  }
];
