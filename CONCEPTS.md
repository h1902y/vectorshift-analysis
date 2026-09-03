# Repository Domain Glossary & Key Concepts

## 1. Forward-Deployed AI Operator
The primary High-LTV Ideal Customer Profile (ICP) for VectorShift. Forward-deployed operators are technical solutions architects, internal enterprise AI leads, or boutique consultants who enter complex business units, analyze chaotic document workflows, construct agentic execution DAGs in days, and hand off locked-down white-label portals or web forms to end-users without writing frontend code.

## 2. Pydantic End-to-End Agent Architecture
An architectural discipline where all agent operations—including query validation, skill constraints, JSON-RPC 2.0 tool requests/responses, hybrid knowledge chunk embeddings, and execution trace envelopes—are defined as strict `pydantic.BaseModel` schemas. This guarantees invariant integrity, type safety, and verifiable telemetry.

## 3. Observable Agent Runtime & Execution Trace
A real-time telemetry visualizer embedded directly into the conversational interface. Rather than treating tool calls and knowledge retrieval as hidden background logic, the agent exposes an animated step-by-step trace showing vector similarities, skill activation parameters, MCP tool JSON payloads, elapsed latencies, and validation status badges.

## 4. CIM Deconstruction Agentic Workflow
A multi-stage agent pipeline designed for private equity due diligence. It ingests 40–80 page confidential information memoranda (CIMs), extracts and normalizes multi-year financial tables, audits footnoted add-backs to uncover EBITDA inflation, and synthesizes investment committee briefing memos.

## 5. Simulation & Evaluation Test Bench (#1 Improvement)
A batch testing environment that eliminates the "Single-Sample Trap" (testing an agent with a single prompt or document). It runs Monte Carlo simulations over dozens of synthetic, adversarial, and clean document variants to measure pass rates, extraction variance, and edge-case failure modes before production deployment.
