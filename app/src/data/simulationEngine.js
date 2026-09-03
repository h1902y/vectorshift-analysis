/**
 * Simulation & World Model Test Engine
 * Cartesian Product: Scenario Generator x Persona Generator -> Synthetic Test Vectors
 */

export const SIMULATION_NODES = [
  {
    id: 1,
    name: "[1] Inbound PDF Parser",
    type: "Document Ingestion",
    latency: "320ms",
    status: "cached",
    description: "Extracts OCR tokens and page layout bounding boxes.",
    cachedData: { pages_processed: 48, tables_detected: 12, file_size: "14.2 MB" }
  },
  {
    id: 2,
    name: "[2] Table OCR & Parser",
    type: "Data Extraction",
    latency: "410ms",
    status: "cached",
    description: "Reconstructs row/column alignment for historical P&L and balance sheets.",
    cachedData: { income_statement_found: true, balance_sheet_found: true, confidence: 0.99 }
  },
  {
    id: 3,
    name: "[3] LLM Extractor & Normalizer",
    type: "LLM Reasoning (Claude 3.5)",
    latency: "1450ms",
    status: "active",
    description: "Extracts reported metrics and parses seller-proposed add-backs.",
    cachedData: { raw_reported_ebitda: "$4,200,000", proposed_addbacks_count: 4 }
  },
  {
    id: 4,
    name: "[4] Normalized EBITDA Bridge",
    type: "Deterministic Calculation",
    latency: "12ms",
    status: "passed",
    description: "Reconciles allowable vs excluded add-backs using strict accounting rules.",
    cachedData: { adjusted_ebitda: "$3,850,000", net_disallowance: "$350,000" }
  },
  {
    id: 5,
    name: "[5] Deal Tear Sheet Formatter",
    type: "Output Packaging",
    latency: "280ms",
    status: "ready",
    description: "Compiles formatted 1-page investment committee tear sheet with citations.",
    cachedData: { memo_ready: true, provenance_tags_count: 18 }
  }
];

export const SYNTHETIC_SCENARIOS = [
  {
    id: 1,
    title: "Clean B2B SaaS (Standard Baseline)",
    persona: "Growth Equity Mandate",
    inputComplexity: "High Transparency",
    expectedOutcome: "PASS",
    provenanceScore: 99,
    mathScore: 100,
    schemaScore: 100,
    status: "passed"
  },
  {
    id: 14,
    title: "Distressed Turnaround (Capitalized R&D)",
    persona: "Special Situations Fund",
    inputComplexity: "Deceptive Non-GAAP Add-backs",
    expectedOutcome: "FAIL (Detected)",
    provenanceScore: 96,
    mathScore: 84,
    schemaScore: 100,
    status: "failed",
    failureReason: "Agent accepted capitalized recurring developer wages as a one-time non-recurring add-back.",
    remedyRecommendation: "Inject system constraint: 'Never treat recurring software engineering salaries as one-time add-backs even if labeled non-recurring by seller.'"
  },
  {
    id: 29,
    title: "Cross-Border Logistics (FX Volatility)",
    persona: "Middle-Market PE Rollup",
    inputComplexity: "Multi-Currency Conversions",
    expectedOutcome: "FAIL (Detected)",
    provenanceScore: 94,
    mathScore: 88,
    schemaScore: 100,
    status: "failed",
    failureReason: "Unrealized foreign currency exchange gain of $120K was not deducted from operating EBITDA.",
    remedyRecommendation: "Inject rule: 'Deduct all non-operating unrealized foreign exchange fluctuations from adjusted operating earnings.'"
  },
  {
    id: 42,
    title: "Healthcare SaaS (HIPAA Compliance & Contract Cliff)",
    persona: "Vertical Software Specialist",
    inputComplexity: "Customer Concentration Risk",
    expectedOutcome: "PASS",
    provenanceScore: 97,
    mathScore: 98,
    schemaScore: 100,
    status: "passed"
  }
];

export const BENCHMARK_RUBRICS = [
  {
    key: "provenance",
    name: "Factuality & Citation Provenance",
    score: 98,
    target: 95,
    unit: "%",
    status: "pass",
    description: "Every extracted figure matches exact source PDF page, paragraph, and table."
  },
  {
    key: "math",
    name: "Financial Math & Reconciliation",
    score: 96,
    target: 95,
    unit: "%",
    status: "pass",
    description: "Adjusted EBITDA equals Reported EBITDA + Approved Add-backs - Excluded Items."
  },
  {
    key: "schema",
    name: "JSON Schema Integrity",
    score: 100,
    target: 99,
    unit: "%",
    status: "pass",
    description: "Zero JSON parse failures, zero markdown backtick pollution."
  },
  {
    key: "edge_case",
    name: "Hostile Edge-Case Resilience",
    score: 82,
    target: 80,
    unit: "%",
    status: "warning",
    description: "Resilience against deceptive non-GAAP adjustments and scanned doc artifacts."
  }
];
