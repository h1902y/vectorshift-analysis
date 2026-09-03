/**
 * Strategic Audit & Competitive Intelligence Taxonomy
 * Category A: Horizontal AI Agent Builders (LangChain, CrewAI, Mastra, n8n, Dify)
 * Category B: Opinionated Vertical AI (Clay, Intercom Fin, Gong, Sierra, Harvey)
 * VectorShift: Best of Both Worlds via Dual Modes + Palantir Forward-Deployed Model + Grok-like Speed
 */

export const COMPETITOR_CATEGORIES = {
  categoryA: {
    id: "builders",
    name: "Category A: Horizontal AI Agent Builders & Code Frameworks",
    shortName: "Horizontal Agent Builders",
    players: ["LangChain / LangGraph", "CrewAI", "Mastra", "Dify", "n8n"],
    badge: "Builder-Only",
    tagline: "Maximum Code Composability · Zero Client Packaging",
    strength: "Arbitrary Python/TypeScript logic, open-ended multi-agent graph orchestration, deep developer primitives.",
    fatalFlaw: "The Terminal Trap: Handing a Python script, terminal stdout, or raw LangGraph JSON to a Managing Director or corporate client guarantees immediate rejection. Zero white-label packaging, no native RBAC client portals, and no non-technical document UX.",
    commercialModel: "Developer seat licenses or open-source infrastructure compute hosting."
  },
  categoryB: {
    id: "vertical",
    name: "Category B: Opinionated Vertical AI Platforms",
    shortName: "Opinionated Vertical AI",
    players: ["Clay (GTM)", "Intercom Fin (Support)", "Gong (RevOps)", "Sierra (CX)", "Harvey (Legal)"],
    badge: "Consumer-Only",
    tagline: "Flawless Domain Workflows · Rigid Walled Gardens",
    strength: "Domain-native UI/UX, instant time-to-value, outcome-aligned pricing ($0.99/resolution or enrichment credits).",
    fatalFlaw: "The Walled Garden Ceiling: Total inability to alter internal orchestration logic. If an enterprise needs a custom non-GAAP EBITDA formula, a proprietary internal database connector, or bespoke RAG routing, they hit a brick wall. No developer escape hatch.",
    commercialModel: "High-ticket vertical SaaS or outcome-based usage ($0.99 per resolution, credit waterfalls)."
  }
};

export const VECTORSHIFT_MOAT_PILLARS = [
  {
    id: "dual-modes",
    pillar: "Pillar 01 · Dual Modes: Builder + Consumer",
    subtitle: "The Best of Both Worlds Architecture",
    description: "VectorShift bridges the divide between Category A and Category B. Builders get a visual multi-modal DAG studio with Python SDK escape hatches (like LangChain/Mastra), but can publish it in 1 click as a branded, locked-down white-label client portal with SSO and RBAC (like Clay/Fin/Harvey).",
    operatorValue: "Technical operators construct the engine; non-technical executives consume audit-grade tear sheets without risking graph topology."
  },
  {
    id: "palantir-model",
    pillar: "Pillar 02 · The Palantir Forward-Deployed Model",
    subtitle: "Merging High-Touch Services with High-Margin Platform SaaS",
    description: "Palantir scaled to an enterprise titan by deploying Forward-Deployed Software Engineers (FDSEs) who build custom operational workflows on Foundry. VectorShift enables boutique AI consultancies and internal enterprise solution leads to execute this exact model: charging $50K–$250K for bespoke implementation services while embedding VectorShift as the permanent recurring SaaS platform.",
    operatorValue: "Services provide the initial revenue wedge and domain customization; the software platform captures permanent high-margin recurring ARR."
  },
  {
    id: "grok-velocity",
    pillar: "Pillar 03 · Grok-Like Product Velocity & Rapid Agility",
    subtitle: "Sub-Second In-Canvas REPL & Live Feedback Loops",
    description: "Unlike traditional heavyweight enterprise software that takes months to configure, VectorShift pairs its enterprise foundation with snappy, real-time developer ergonomics: local node memory caching (<1.5s re-runs), live wire payload inspection, and conversational prompt auto-hardening.",
    operatorValue: "Operators iterate with the speed of consumer chat apps while building institutional-grade pipelines."
  }
];

export const TAXONOMY_MATRIX = [
  {
    dimension: "Target User Duality",
    categoryA: "Developers only (Engineers writing code)",
    categoryB: "Business end-users only (Sales reps, support agents, lawyers)",
    vectorShift: "Dual-Surface: Technical Operator builds; Executive consumes via white-label portal"
  },
  {
    dimension: "Core Mental Model",
    categoryA: "Code scripts, DAG files, CLI logs, terminal stdout",
    categoryB: "Rigid verticalized UI (Spreadsheet grid, chat widget, legal redline)",
    vectorShift: "Visual Multi-Modal DAG + Python AST + 1-Click Client Web Portal"
  },
  {
    dimension: "Extensibility & Escape Hatch",
    categoryA: "Infinite (Full Python/TypeScript code access)",
    categoryB: "Zero (Walled garden; cannot rewrite internal model logic)",
    vectorShift: "Best of Both: Visual drag-and-drop with custom Python/REST API escape hatch"
  },
  {
    dimension: "Client Packaging Layer",
    categoryA: "Non-existent (Developer must build custom frontend from scratch)",
    categoryB: "Pre-built, but completely fixed to single vertical",
    vectorShift: "Instant White-Label: Custom domains, RBAC, client intake forms, PDF tear sheets"
  },
  {
    dimension: "Go-to-Market Strategy",
    categoryA: "Bottom-up developer adoption (Open source / API credits)",
    categoryB: "Top-down vertical SaaS sales or usage billing",
    vectorShift: "The Palantir Playbook: Forward-deployed consultancies deploy bespoke workflows into recurring platform SaaS"
  },
  {
    dimension: "Iteration Velocity",
    categoryA: "Slow developer loops (Local server rebuilds, CLI debugging)",
    categoryB: "No builder loop (Users consume pre-cooked models)",
    vectorShift: "Grok-Like Velocity: Ephemeral node caching (<12s), live wire REPL, in-canvas prompt auto-hardening"
  }
];

export const STRATEGIC_PLAYBOOK = [
  {
    source: "Clay (GTM Engine)",
    category: "Category B",
    lesson: "Table-to-Workflow Scaffolding",
    description: "Clay bridges the spreadsheet and the DAG seamlessly. VectorShift should let investors define columns in a Deal Table (Deck, ARR, EBITDA) and auto-scaffold the underlying pipeline DAG with one click."
  },
  {
    source: "Intercom Fin (Support CX)",
    category: "Category B",
    lesson: "Deterministic 'Procedures' with Zero Math Hallucination",
    description: "Fin forbids LLMs from guessing operational actions. Adopting Fin's strict 'Procedures' ensures multi-step financial calculations execute deterministically with validated parameters."
  },
  {
    source: "LangChain / Mastra",
    category: "Category A",
    lesson: "First-Class Developer REPL & Tool Protocol",
    description: "Embrace the code-level agility of modern frameworks by providing native MCP server bindings and instant single-node execution inspection directly in the visual builder canvas."
  },
  {
    source: "Palantir Foundry",
    category: "Operating Model",
    lesson: "The Forward-Deployed Ecosystem Moat",
    description: "Empower boutique AI agencies and private equity operating partners with certified white-label deployment toolkits, turning third-party services into high-margin platform ARR."
  }
];
