/**
 * MECE Ranked Builder View Improvements (Task 4)
 * Spans the complete lifecycle: Testing -> Assembly -> Domain Moat -> Observability -> State
 */

export const IMPROVEMENTS_DATA = [
  {
    rank: 1,
    id: "sim-eval-bench",
    title: "The Simulation & Eval Test Bench (World Model Simulator)",
    lifecyclePillar: "Testing & Verification",
    badgeColor: "indigo",
    screen: "Canvas Run / Test Drawer & Trace Inspector",
    affectedUsers: "All builders, forward-deployed operators, and enterprise risk committees.",
    friction: "Testing is currently manual (1 prompt typed into a chat drawer). There is no automated test suite to simulate edge cases, and if Node 8 fails in a 10-node DAG, the builder must re-run from Node 1, burning 45s+ per iteration and wasting tokens.",
    rootCause: "Monolithic pipeline execution engine without ephemeral topological subgraph caching.",
    solution: "1. Synthetic World Model Generator (Scenario x Persona -> 50 test cases).\n2. Automated quantitative evaluation rubrics (Provenance, Math, Schema).\n3. Instruction Auto-Hardening Engine (recommends prompt constraints on failed cases).\n4. Ephemeral session node caching: hash(node_id + input_hash) for <2s single-node re-runs.",
    metrics: [
      { label: "Median Iteration Cycle Time", before: "48s", target: "12s", change: "-75%" },
      { label: "Tokens Burned in Dev", before: "100% baseline", target: "55%", change: "-45%" },
      { label: "Pre-Flight Edge Case Catch Rate", before: "~15%", target: ">=88%", change: "+5.8x" },
      { label: "30-Day Creator Retention", before: "Baseline", target: "+16%", change: "+16% Lift" }
    ]
  },
  {
    rank: 2,
    id: "preflight-linting",
    title: "AI-Assisted Best-Practice Scaffolding & Pre-Flight DAG Linting",
    lifecyclePillar: "Assembly & Scaffolding",
    badgeColor: "cyan",
    screen: "Pipeline Canvas, Variable Input Fields, and Knowledge Base Configuration",
    affectedUsers: "Operators, solutions engineers, and business analysts assembling multi-node DAGs.",
    friction: "Variable references rely on raw text typing (`{{node_1.output}}`). If a user renames `node_1` to `pdf_parser`, downstream references break silently. Chunking thresholds are set blindly without validation.",
    rootCause: "Decoupled string-based variable templating with zero compile-time DAG verification.",
    solution: "1. Replace raw text references with tokenized, interactive clickable pills (like Clay).\n2. Renaming a node automatically cascades through all downstream references.\n3. Pre-Flight Linting Drawer scans the DAG before execution to detect circular dependencies and unreferenced variables.",
    metrics: [
      { label: "Silent Variable Breakages", before: "24% of runs", target: "<1%", change: "-96%" },
      { label: "First-Run Pipeline Success Rate", before: "52%", target: "86%", change: "+65%" }
    ]
  },
  {
    rank: 3,
    id: "finance-nodes",
    title: "Finance-Native Calculation Nodes & Domain Guardrails",
    lifecyclePillar: "Domain Specialization",
    badgeColor: "emerald",
    screen: "Node Palette (Calculations & Logic) and Skills Library",
    affectedUsers: "Private Equity, VC, M&A Advisory, and Corporate Finance deal teams.",
    friction: "All financial operations (EBITDA adjustments, IRR/MOIC hurdles, debt schedules) must currently be prompted through LLMs, which hallucinate arithmetic, destroying firm credibility on live deals.",
    rootCause: "Platform provides generic logic nodes but lacks domain-specific deterministic math runtimes.",
    solution: "Introduce deterministic, audit-grade financial calculator nodes:\n• Normalized EBITDA Bridge Node (automated add-backs for one-time litigation/owner expenses).\n• IRR & MOIC Hurdle Evaluator Node.\n• Cap Table Dilution Node & Debt Amortization Node.",
    metrics: [
      { label: "Financial Arithmetic Errors", before: "14% of LLM runs", target: "0%", change: "-100%" },
      { label: "Enterprise Diligence Time Saved", before: "3.5 hrs/deal", target: "7.8 hrs/deal", change: "+122%" }
    ]
  },
  {
    rank: 4,
    id: "eval-alerting",
    title: "Continuous Production Evals & Proactive Anomaly Alerting",
    lifecyclePillar: "Observability & Telemetry",
    badgeColor: "amber",
    screen: "Analytics & Tracing Module",
    affectedUsers: "Enterprise operations leads, AI team leads, and institutional clients.",
    friction: "Analytics is purely reactive (charts of latency and total tokens). When real-world document formatting drifts, the builder only finds out when the Managing Director or client complains.",
    rootCause: "Telemetry tracks resource consumption but does not evaluate qualitative output health.",
    solution: "1. Continuous LLM-as-a-judge evaluation sampling 5-10% of live production runs.\n2. Proactive Slack/Email/Webhook alerting when rubric quality scores drop below 90% or schema errors spike.\n3. Model drift and prompt injection monitoring dashboard.",
    metrics: [
      { label: "Mean Time to Detect (MTTD) Drift", before: "4.2 days", target: "<15 mins", change: "-99%" },
      { label: "Production Client Churn", before: "Baseline", target: "-25%", change: "-25%" }
    ]
  },
  {
    rank: 5,
    id: "table-to-workflow",
    title: "Table-to-Workflow Action Engine (The 'Clay' Paradigm)",
    lifecyclePillar: "Operational State Layer",
    badgeColor: "purple",
    screen: "Tables Module & Spreadsheet Canvas",
    affectedUsers: "Deal sourcers and analysts managing pipelines of 100+ inbound targets.",
    friction: "Tables is currently a passive data store. Builders cannot trigger workflow runs directly across table rows or scaffold a workflow from a table schema.",
    rootCause: "Architectural separation between passive relational storage and the execution graph.",
    solution: "1. Column-Triggered Workflows: Click 'Run CIM Deconstructor on Col A ➔ Output to Col B'.\n2. 'Scaffold Workflow from Table' (borrowed from Clay): Auto-generates a pipeline DAG matching table column headers with one click.",
    metrics: [
      { label: "Deal Screening Throughput", before: "12 deals/day", target: "45 deals/day", change: "+275%" },
      { label: "Tables Daily Active Users", before: "18%", target: "54%", change: "+3x" }
    ]
  }
];
