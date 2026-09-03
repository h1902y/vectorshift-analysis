/**
 * Pydantic-Grounded Agent Knowledge Base & Predefined Journeys
 * Curated from 519 scraped pages, 9 submission documents, and 43 evidence plates.
 */

export const ROTATING_PROMPTS = [
  "Ask: 'How does the 3-stage CIM pipeline eliminate EBITDA hallucinations?'",
  "Ask: 'Why is the Simulation & Eval Bench the #1 builder intervention?'",
  "Ask: 'Who is the Forward-Deployed AI Operator and why are they the real ICP?'",
  "Ask: 'Run 50-sample Monte Carlo simulation on CIM DAG' (Dispatches MCP Tool)",
  "Ask: 'Compare VectorShift vs. Clay and Fin across private market workflows'",
  "Ask: 'Inspect the 43 builder exploration plates and field telemetry'",
];

export const POPOVER_CATEGORIES = [
  {
    index: "01",
    category: "STRATEGY & OPERATOR ICP",
    items: [
      {
        icon: "🏛️",
        label: "Forward-Deployed Operator Thesis",
        tag: "ICP",
        query: "Explain the Forward-Deployed AI Operator thesis and why it is VectorShift's true high-LTV ICP.",
        skill: "broadsheet-navigator",
        tool: "navigate_broadsheet",
        toolArgs: { section: "lead" }
      },
      {
        icon: "🛡️",
        label: "Private Market Workflow Moat",
        tag: "MOAT",
        query: "What is VectorShift's core moat in private markets and client white-label packaging?",
        skill: "broadsheet-navigator",
        tool: "navigate_broadsheet",
        toolArgs: { section: "lifecycle" }
      },
    ]
  },
  {
    index: "02",
    category: "BLUEPRINT & FIELD EVALS",
    items: [
      {
        icon: "⚡",
        label: "3-Stage CIM Deconstructor DAG",
        tag: "WORKFLOW",
        query: "How does the CIM Deconstruction workflow execute across tables, footnotes, and memo synthesis?",
        skill: "cim-deconstructor",
        tool: "navigate_broadsheet",
        toolArgs: { section: "cim" }
      },
      {
        icon: "🧪",
        label: "Evaluation & Simulation Bench (#1)",
        tag: "DEEP DIVE",
        query: "Why is the Evaluation and Simulation Test Bench the #1 builder intervention and how does it prevent single-sample deployment risk?",
        skill: "eval-bench-evaluator",
        tool: "run_monte_carlo",
        toolArgs: { runs: 50, edgeCases: true }
      },
    ]
  },
  {
    index: "03",
    category: "BENCHMARKS & INTERACTIVE LAB",
    items: [
      {
        icon: "📊",
        label: "Clay vs. Fin Comparative Audit",
        tag: "BENCHMARK",
        query: "Provide the strategic competitor breakdown: VectorShift vs. Clay vs. Fin across extensibility, execution telemetry, and UX.",
        skill: "competitor-auditor",
        tool: "navigate_broadsheet",
        toolArgs: { section: "competitors" }
      },
      {
        icon: "🎛️",
        label: "Execute 50-Run Simulation Lab",
        tag: "TOOL",
        query: "Trigger a 50-sample Monte Carlo simulation run across clean and adversarial CIM documents.",
        skill: "eval-bench-evaluator",
        tool: "run_monte_carlo",
        toolArgs: { runs: 50, edgeCases: true }
      }
    ]
  }
];

export const PREDEFINED_JOURNEYS = [
  {
    id: "operator-thesis",
    icon: "🏛️",
    title: "The Forward-Deployed Operator",
    subtitle: "Why boutique AI consultants & internal leads are the real ICP",
    initialQuery: "Explain the Forward-Deployed AI Operator persona, their operational mission, and why VectorShift's packaging layer creates their unfair advantage.",
    skill: "broadsheet-navigator",
    tool: "navigate_broadsheet",
    toolArgs: { section: "lead" },
    quickOptions: [
      { label: "What are the 3 killer use cases in private markets?", query: "What are the top 3 use cases in private markets for VectorShift?" },
      { label: "How do white-label portals prevent client churn?", query: "How do white-label user portals prevent client churn?" },
      { label: "Jump to Top Story →", query: "Navigate to Front Page Top Story", action_type: "navigate", target: "lead" },
    ]
  },
  {
    id: "cim-deconstructor",
    icon: "⚡",
    title: "CIM Deconstruction Workflow",
    subtitle: "3-stage agentic pipeline: Tables, Footnotes & Investment Memo",
    initialQuery: "Explain the technical blueprint of the Confidential Information Memorandum (CIM) Deconstructor workflow built for Task 3.",
    skill: "cim-deconstructor",
    tool: "navigate_broadsheet",
    toolArgs: { section: "cim" },
    quickOptions: [
      { label: "How is Adjusted EBITDA reconciled with Footnotes?", query: "How does the footnote reconciliation agent audit Adjusted EBITDA add-backs?" },
      { label: "What happens when table OCR misaligns columns?", query: "How does the pipeline recover when PDF table OCR drops column boundaries?" },
      { label: "Jump to CIM Blueprint →", query: "Navigate to CIM Blueprint", action_type: "navigate", target: "cim" },
    ]
  },
  {
    id: "simulation-bench",
    icon: "🧪",
    title: "Simulation & Eval Test Bench (#1)",
    subtitle: "Deep dive on eliminating the Single-Sample Trap with multi-doc evals",
    initialQuery: "Why is the Evaluation and Simulation Test Bench ranked #1 out of the 5 builder improvements? Detail the engineering approach and metrics.",
    skill: "eval-bench-evaluator",
    tool: "run_monte_carlo",
    toolArgs: { runs: 50, edgeCases: true },
    quickOptions: [
      { label: "Run live 50-sample Monte Carlo test", query: "Run a 50-run Monte Carlo simulation test on the bench", action_type: "tool" },
      { label: "What are the 5 ranked builder improvements?", query: "List the 5 ranked builder improvements from the assessment" },
      { label: "Jump to Interactive Studio →", query: "Navigate to Simulation Lab", action_type: "navigate", target: "simulation" },
    ]
  },
  {
    id: "competitor-audit",
    icon: "📊",
    title: "Clay vs. Fin vs. VectorShift",
    subtitle: "Extensibility vs. Telemetry: Strategic gap and moat analysis",
    initialQuery: "What did the bonus competitor analysis reveal about Clay (GTM tables) and Fin (Intercom support bot) compared to VectorShift?",
    skill: "competitor-auditor",
    tool: "navigate_broadsheet",
    toolArgs: { section: "competitors" },
    quickOptions: [
      { label: "Where does Clay beat VectorShift in table UX?", query: "What does Clay do better than VectorShift in table and enrichment UX?" },
      { label: "What is VectorShift's unassailable moat?", query: "What is VectorShift's core moat against specialized vertical tools?" },
      { label: "Jump to Competitor Section →", query: "Navigate to Competitor Audit", action_type: "navigate", target: "competitors" },
    ]
  }
];

export const VECTOR_KNOWLEDGE_CHUNKS = [
  {
    chunk_id: "kb-icp-01",
    source_document: "submission/01_persona_and_use_cases.md#L45-L82",
    section_title: "The Forward-Deployed AI Operator Thesis",
    keywords: ["persona", "icp", "forward-deployed", "consultant", "operator", "portal", "whitelabel"],
    content: `The Real ICP is the Forward-Deployed AI Operator: Technical Solutions Architects, Internal AI Leads, or boutique AI Consultants who enter complex business units, deconstruct messy document processes, assemble agentic systems in days, and hand off a locked-down "User View" (White-Label Portals, Web Forms, or Chat Widgets). VectorShift gives them the speed of visual assembly, the escape hatch of Python/SDK, and the client-facing packaging layer with zero frontend engineering.`
  },
  {
    chunk_id: "kb-cim-02",
    source_document: "submission/02_built_use_case.md#L12-L95",
    section_title: "Confidential Information Memorandum (CIM) Deconstructor",
    keywords: ["cim", "deconstructor", "workflow", "dag", "ebitda", "footnote", "memo", "table"],
    content: `The built use case is the CIM Deconstructor for Private Equity Due Diligence. It deconstructs a 60-page PDF CIM into: (1) Structured Historical Financials (OCR + Table Extraction), (2) Footnote & Add-Back Reconciliation (detects non-operating expenses and one-time management bonuses), and (3) Investment Committee Quick-Look Memo with structured risk scoring and red flags.`
  },
  {
    chunk_id: "kb-eval-03",
    source_document: "submission/04_deep_dive_number_one.md#L1-L120",
    section_title: "Deep Dive on #1: The Evaluation & Simulation Test Bench",
    keywords: ["deep dive", "eval", "simulation", "bench", "single-sample trap", "monte carlo", "test", "metric"],
    content: `The #1 Builder Improvement is the Evaluation & Simulation Test Bench. Builders currently suffer from the 'Single-Sample Trap'—typing one prompt into a chat drawer and assuming the agent is production-ready. The fix is a multi-document simulation lab that executes 50 synthetic variants (clean, missing footnotes, adversarial formatting), outputting deterministic pass rates, extraction variance, and latency distributions before production deployment.`
  },
  {
    chunk_id: "kb-comp-04",
    source_document: "submission/05_competitor_analysis.md#L1-L85",
    section_title: "Clay and Fin Competitive Teardown",
    keywords: ["clay", "fin", "intercom", "competitor", "benchmark", "telemetry", "table", "moat"],
    content: `VectorShift's moat is its Dual-Engine Extensibility: visual DAG assembly for rapid wiring + arbitrary Python code execution sandboxes + client-facing white-label portals. Clay wins on tabular spreadsheet ergonomics and column formula chaining; Fin wins on out-of-the-box confidence scoring and resolution telemetry. VectorShift must close the execution telemetry gap.`
  },
  {
    chunk_id: "kb-plates-05",
    source_document: "submission/master_deliverable.md#L140-L210",
    section_title: "43 Photographic Builder Exploration Plates",
    keywords: ["plates", "evidence", "screenshots", "minimap", "canvas", "variable picker", "drag and drop"],
    content: `Across 43 builder exploration plates, five critical ergonomic friction points were isolated: (1) Single-sample manual test drawer lacks batch validation; (2) Infinite canvas lacks minimap and auto-layout navigation for large DAGs; (3) Variable picker syntax is prone to typo breakage; (4) Knowledge base sync lacks chunk-level inspection; (5) Multi-agent communication lacks visual state debugging.`
  }
];
