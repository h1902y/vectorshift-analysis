/**
 * Simulation & World Model Test Engine
 * Cartesian Product: Scenario Generator x Persona Generator -> Synthetic Test Vectors
 */

export const WORLD_MODEL_ARCHETYPES = [
  { id: 'growth', name: 'Growth Equity Mandate', mandate: 'SaaS ARR >= $10M, GM >= 75%, Net Retention >= 110%', riskTolerance: 'Low' },
  { id: 'special_sits', name: 'Special Situations Fund', mandate: 'Distressed Buyout, EBITDA Turnaround, Debt Restructuring', riskTolerance: 'High' },
  { id: 'rollup', name: 'Platform Buy-and-Build', mandate: 'Fragmented Services, Add-on Synergies, Multi-Entity Consolidation', riskTolerance: 'Moderate' },
  { id: 'vertical_saas', name: 'Vertical Software Specialist', mandate: 'Mission-critical workflow, Low churn (<5%), High NRR', riskTolerance: 'Very Low' },
  { id: 'carveout', name: 'Corporate Carve-Out', mandate: 'Stand-alone transition service agreements, carve-out P&L', riskTolerance: 'Moderate' }
];

export const WORLD_MODEL_STRESS_TRAPS = [
  { id: 'cap_rd', name: 'Capitalized R&D Obfuscation', trap: 'Core engineer payroll capitalized on balance sheet to artificially inflate reported EBITDA by $650K.' },
  { id: 'owner_perks', name: 'Founder Discretionary Perks', trap: 'Private jet leases ($180K) and founder family board fees ($120K) buried in SG&A add-backs.' },
  { id: 'fx_gain', name: 'Unrealized FX Translation Gain', trap: 'Non-operating $140K euro-dollar swing booked inside operating revenue.' },
  { id: 'degraded_ocr', name: '150-DPI Scanned Appendix', trap: 'Skewed low-resolution scanned audit footnote with tabular bleed and smudge.' },
  { id: 'deferred_rev', name: 'Deferred Revenue Haircut', trap: 'Pre-acquisition unearned revenue carve-out omitted from cash-flow reconciliation.' },
  { id: 'intercompany', name: 'Intercompany Double-Counting', trap: 'Transfer pricing revenue across 3 international subsidiaries not eliminated.' },
  { id: 'contract_cliff', name: 'Enterprise Contract Expiry', trap: '38% of ARR renewal concentrated in a single customer expiring in 90 days.' },
  { id: 'churn_masking', name: 'Gross vs Net Churn Masquerade', trap: 'Logo churn of 24% obscured by aggressive price increases on surviving accounts.' },
  { id: 'earnout_debt', name: 'Earnout Reclassified as Equity', trap: 'Contingent liability earnout hidden from senior leverage ratio calculation.' },
  { id: 'pro_forma', name: 'Pro-Forma Synergy Presumption', trap: 'Unproven $1.2M back-office synergy credited to Day-0 EBITDA.' }
];

export const SIMULATION_NODES = [
  {
    id: 1,
    name: "[1] Inbound PDF Parser",
    type: "Document Ingestion",
    latency: "320ms",
    status: "cached",
    cacheHit: true,
    cacheTtl: "24h (Hash: #a8f9c2)",
    description: "Extracts OCR tokens, font vectors, and page layout bounding boxes from 50-page CIM.",
    cachedData: { 
      pages_processed: 50, 
      tables_detected: 14, 
      scanned_pages: 3, 
      file_size: "18.4 MB",
      sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      bounding_boxes_indexed: 1420
    }
  },
  {
    id: 2,
    name: "[2] Table OCR & Parser",
    type: "Structural Reconstruction",
    latency: "410ms",
    status: "cached",
    cacheHit: true,
    cacheTtl: "24h (Hash: #b1d4e7)",
    description: "Reconstructs row/column alignment for historical 3-statement financials and add-back schedules.",
    cachedData: { 
      income_statement_found: true, 
      balance_sheet_found: true, 
      addback_schedule_page: 38,
      confidence_score: 0.992,
      extracted_columns: ["FY2023", "FY2024", "FY2025E", "LTM_Jun26"]
    }
  },
  {
    id: 3,
    name: "[3] LLM Extractor & Normalizer",
    type: "LLM Reasoning (Claude 3.5 Sonnet)",
    latency: "1450ms",
    status: "active",
    cacheHit: false,
    cacheTtl: "Ephemeral (Dev Iteration)",
    description: "Extracts qualitative narrative, identifies seller add-backs, and flags suspicious adjustments.",
    cachedData: { 
      raw_reported_ebitda: "$4,200,000", 
      proposed_addbacks_count: 5,
      seller_claimed_adjusted_ebitda: "$5,450,000",
      flagged_items: ["Owner Jet Lease ($180K)", "Capitalized Engineering ($450K)"],
      temperature: 0.0,
      prompt_tokens: 3840
    }
  },
  {
    id: 4,
    name: "[4] Normalized EBITDA Bridge",
    type: "Deterministic Calculation",
    latency: "12ms",
    status: "passed",
    cacheHit: true,
    cacheTtl: "AST In-Memory",
    description: "Executes deterministic Python reconciliation of allowable vs excluded add-backs.",
    cachedData: { 
      reported_ebitda: "$4,200,000",
      approved_addbacks: "$350,000",
      disallowed_addbacks: "$900,000",
      institutional_adjusted_ebitda: "$4,550,000",
      haircut_percentage: "16.5%",
      formula_executed: "reported + approved - disallowed"
    }
  },
  {
    id: 5,
    name: "[5] Deal Tear Sheet Formatter",
    type: "Output Packaging",
    latency: "280ms",
    status: "ready",
    cacheHit: true,
    cacheTtl: "Memory Buffer",
    description: "Compiles formatted 1-page investment committee tear sheet with exact coordinate citations.",
    cachedData: { 
      memo_ready: true, 
      provenance_tags_count: 18,
      target_passed_mandate: true,
      deal_recommendation: "PROCEED TO CONFIDENTIAL PHASE II BIDDING",
      export_formats: ["Interactive Portal", "PDF Tear Sheet", "JSON Schema"]
    }
  }
];

export const SYNTHETIC_SCENARIOS = [
  {
    id: 1,
    title: "Clean B2B SaaS (Standard Baseline)",
    persona: "Growth Equity Mandate",
    inputComplexity: "High Transparency",
    trapType: "None (Clean Control)",
    expectedOutcome: "PASS",
    provenanceScore: 99,
    mathScore: 100,
    schemaScore: 100,
    status: "passed",
    findingSummary: "Reported EBITDA matches financial schedule exactly; all 3 audited add-backs verified against GAAP guidelines."
  },
  {
    id: 7,
    title: "Founder Discretionary Perks (Private Jet & Luxury Travel)",
    persona: "Middle-Market Buyout",
    inputComplexity: "Aggressive Owner Add-Backs",
    trapType: "Founder Perks",
    expectedOutcome: "FAIL (Detected)",
    provenanceScore: 97,
    mathScore: 89,
    schemaScore: 100,
    status: "failed",
    failureReason: "LLM failed to disallow $180,000 in executive private aviation leases labeled as 'operational travel'.",
    remedyRecommendation: "Inject constraint: 'Disallow non-commercial private aircraft travel leases as operating EBITDA add-backs.'"
  },
  {
    id: 14,
    title: "Distressed Turnaround (Capitalized R&D Salaries)",
    persona: "Special Situations Fund",
    inputComplexity: "Deceptive Non-GAAP Add-backs",
    trapType: "Capitalized R&D",
    expectedOutcome: "FAIL (Detected)",
    provenanceScore: 96,
    mathScore: 84,
    schemaScore: 100,
    status: "failed",
    failureReason: "Agent accepted capitalized recurring software developer wages as a one-time non-recurring add-back.",
    remedyRecommendation: "Inject system constraint: 'Never treat recurring software engineering salaries as one-time add-backs even if labeled non-recurring by seller.'"
  },
  {
    id: 19,
    title: "SaaS Deferred Revenue Carve-Out",
    persona: "Corporate Carve-Out",
    inputComplexity: "Balance Sheet Reconciliation",
    trapType: "Deferred Revenue Haircut",
    expectedOutcome: "PASS",
    provenanceScore: 98,
    mathScore: 99,
    schemaScore: 100,
    status: "passed",
    findingSummary: "Successfully haircutted $420K in unearned revenue from working capital calculation per ASC 606 standards."
  },
  {
    id: 29,
    title: "Cross-Border Logistics (FX Volatility)",
    persona: "Middle-Market PE Rollup",
    inputComplexity: "Multi-Currency Conversions",
    trapType: "FX Gain Misclassification",
    expectedOutcome: "FAIL (Detected)",
    provenanceScore: 94,
    mathScore: 88,
    schemaScore: 100,
    status: "failed",
    failureReason: "Unrealized foreign currency exchange gain of $140K was not deducted from operating EBITDA.",
    remedyRecommendation: "Inject rule: 'Deduct all non-operating unrealized foreign exchange fluctuations from adjusted operating earnings.'"
  },
  {
    id: 35,
    title: "Degraded 150-DPI Scanned Appendix",
    persona: "Distressed Asset Fund",
    inputComplexity: "Severe OCR Noise",
    trapType: "Scanned Tabular Bleed",
    expectedOutcome: "PASS",
    provenanceScore: 95,
    mathScore: 96,
    schemaScore: 100,
    status: "passed",
    findingSummary: "Spatial layout parser successfully reconstructed distorted table grid and recovered missing footnote #12."
  },
  {
    id: 42,
    title: "Healthcare SaaS (HIPAA Compliance & Contract Cliff)",
    persona: "Vertical Software Specialist",
    inputComplexity: "Customer Concentration Risk",
    trapType: "Single-Customer Concentration",
    expectedOutcome: "PASS",
    provenanceScore: 97,
    mathScore: 98,
    schemaScore: 100,
    status: "passed",
    findingSummary: "Correctly flagged 34% single-client revenue concentration with automated footnote badge pointing to Exhibit B."
  },
  {
    id: 50,
    title: "Multi-Entity Platform Consolidation",
    persona: "Platform Rollup Fund",
    inputComplexity: "Intercompany Elimination",
    trapType: "Double-Counted Transfer Revenue",
    expectedOutcome: "PASS",
    provenanceScore: 99,
    mathScore: 100,
    schemaScore: 100,
    status: "passed",
    findingSummary: "Automated reconciliation deducted $620K in internal management fees between subsidiary A and parent holding company."
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
    description: "Every extracted figure matches exact source PDF page, paragraph, and table coordinate.",
    methodology: "Counterfactual citation validation (arXiv:2412.18004)"
  },
  {
    key: "math",
    name: "Financial Math & Reconciliation",
    score: 96,
    target: 95,
    unit: "%",
    status: "pass",
    description: "Adjusted EBITDA equals Reported EBITDA + Approved Add-backs - Disallowed Items.",
    methodology: "Deterministic Python AST verification (VeNRA benchmark)"
  },
  {
    key: "schema",
    name: "JSON Schema Integrity",
    score: 100,
    target: 99,
    unit: "%",
    status: "pass",
    description: "Strict Pydantic JSON schema compliance with zero markdown backtick pollution.",
    methodology: "Automated parser validation against DealTearSheetSchema"
  },
  {
    key: "edge_case",
    name: "Hostile Edge-Case Resilience",
    score: 84,
    target: 80,
    unit: "%",
    status: "warning",
    description: "Resilience against deceptive non-GAAP adjustments, scanner artifacts, and currency distortions.",
    methodology: "50-scenario Cartesian stress suite"
  }
];
