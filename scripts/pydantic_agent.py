#!/usr/bin/env python3
"""
Pydantic V2 AI Agent Core Engine for The VectorShift Diff
Strict end-to-end type validation for Agent Queries, MCP Tool Calls, 
Knowledge Chunks, Skills, and Observable Execution Traces.
"""

from __future__ import annotations

import json
import sys
import uuid
from datetime import datetime, timezone
from typing import Any, Dict, List, Literal, Optional, Union
from pydantic import BaseModel, Field, field_validator


# =============================================================================
# 1. CORE DATA CONTRACTS & AGENT I/O
# =============================================================================

class Citation(BaseModel):
    """Grounded reference citation for agent responses."""
    document_id: str = Field(..., description="Unique ID of source document or plate")
    title: str = Field(..., description="Human-readable title of citation")
    anchor_link: str = Field(..., description="In-app anchor URL e.g. #simulation or #cim")
    relevance_score: float = Field(default=1.0, ge=0.0, le=1.0)


class FollowUpOption(BaseModel):
    """Dynamic next-step suggestion in an architecture journey."""
    label: str = Field(..., min_length=2, max_length=120)
    query: str = Field(..., min_length=2)
    action_type: Literal["query", "tool", "navigate"] = "query"


class AgentQueryInput(BaseModel):
    """Inbound query schema with strict validation."""
    query_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    text: str = Field(..., min_length=1, max_length=2000, description="Raw user query")
    session_id: Optional[str] = Field(default=None)
    intent: Optional[Literal["general", "cim_workflow", "eval_bench", "clay_fin_audit", "navigation", "glossary"]] = "general"
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    @field_validator("text")
    @classmethod
    def strip_whitespace(cls, v: str) -> str:
        clean = v.strip()
        if not clean:
            raise ValueError("Query text cannot be empty or whitespace only")
        return clean


# =============================================================================
# 2. VECTOR KNOWLEDGE BASE CONTRACTS
# =============================================================================

class KnowledgeChunk(BaseModel):
    """Chunk entity in the hybrid vector knowledge base."""
    chunk_id: str = Field(..., description="Unique chunk hash or slug")
    source_document: str = Field(..., description="Source markdown path or plate ID")
    section_title: str = Field(..., description="Title of the containing section")
    content: str = Field(..., min_length=10)
    token_count: int = Field(default=0, ge=0)
    cosine_similarity: float = Field(default=0.0, ge=0.0, le=1.0)
    keywords: List[str] = Field(default_factory=list)


class KnowledgeRetrievalResult(BaseModel):
    """Output of vector search query."""
    query: str
    chunks_matched: List[KnowledgeChunk] = Field(default_factory=list)
    search_latency_ms: float = Field(default=0.0, ge=0.0)
    top_similarity_score: float = Field(default=0.0, ge=0.0, le=1.0)


# =============================================================================
# 3. PYDANTIC SKILL SCHEMAS
# =============================================================================

class CIMDeconstructionSkill(BaseModel):
    """Pydantic schema enforcing CIM data extraction invariants."""
    skill_name: Literal["cim-deconstructor"] = "cim-deconstructor"
    target_ebitda_reconciliation: bool = True
    extract_waterfall_revenue: bool = True
    audit_footnote_integrity: bool = True
    confidence_threshold: float = Field(default=0.92, ge=0.5, le=1.0)


class EvalBenchSkill(BaseModel):
    """Pydantic schema for multi-document Monte Carlo simulation benchmarks."""
    skill_name: Literal["eval-bench-evaluator"] = "eval-bench-evaluator"
    monte_carlo_runs: int = Field(default=50, ge=10, le=500)
    target_confidence_interval: float = Field(default=0.95, ge=0.8, le=0.99)
    synthesize_edge_case_distribution: bool = True


class BroadsheetNavigatorSkill(BaseModel):
    """Pydantic schema for coordinating in-app DOM section navigation."""
    skill_name: Literal["broadsheet-navigator"] = "broadsheet-navigator"
    valid_sections: List[str] = Field(
        default=["lead", "lifecycle", "cim", "roadmap", "simulation", "competitors", "plates"]
    )
    scroll_behavior: Literal["smooth", "instant"] = "smooth"


class CompetitorAuditorSkill(BaseModel):
    """Pydantic schema for comparative feature audit against Clay and Fin."""
    skill_name: Literal["competitor-auditor"] = "competitor-auditor"
    target_competitors: List[str] = Field(default=["Clay", "Fin (Intercom)"])
    evaluate_extensibility_moat: bool = True


# =============================================================================
# 4. MCP PROTOCOL (JSON-RPC 2.0) SCHEMAS
# =============================================================================

class MCPToolParameter(BaseModel):
    name: str
    type: str
    description: str
    required: bool = False


class MCPToolDefinition(BaseModel):
    name: str
    description: str
    parameters: List[MCPToolParameter] = Field(default_factory=list)


class JsonRpcRequest(BaseModel):
    """Strict JSON-RPC 2.0 Tool Call Request."""
    jsonrpc: Literal["2.0"] = "2.0"
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    method: Literal["tools/call", "tools/list", "resources/read"] = "tools/call"
    params: Dict[str, Any] = Field(default_factory=dict)


class JsonRpcResponse(BaseModel):
    """Strict JSON-RPC 2.0 Tool Call Response."""
    jsonrpc: Literal["2.0"] = "2.0"
    id: str
    result: Optional[Dict[str, Any]] = None
    error: Optional[Dict[str, Any]] = None


# =============================================================================
# 5. OBSERVABLE EXECUTION TRACE & RESPONSE
# =============================================================================

class TraceStep(BaseModel):
    """Observable step in the agent execution pipeline."""
    step_id: str = Field(default_factory=lambda: str(uuid.uuid4())[:8])
    subsystem: Literal[
        "KB_RETRIEVAL",
        "SKILL_ACTIVATION",
        "MCP_DISPATCH",
        "TOOL_EXECUTION",
        "SYNTHESIS"
    ]
    title: str = Field(..., min_length=2)
    description: str = Field(default="")
    payload: Dict[str, Any] = Field(default_factory=dict)
    elapsed_ms: float = Field(default=0.0, ge=0.0)
    status: Literal["pending", "executing", "completed", "failed"] = "completed"
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ExecutionTrace(BaseModel):
    """Complete trace envelope for an agent thought cycle."""
    trace_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    query_id: str
    steps: List[TraceStep] = Field(default_factory=list)
    total_elapsed_ms: float = Field(default=0.0, ge=0.0)
    pydantic_validated: bool = True


class AgentResponsePayload(BaseModel):
    """Final validated response returned to user."""
    response_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    query_id: str
    content_markdown: str = Field(..., min_length=1)
    citations: List[Citation] = Field(default_factory=list)
    follow_up_options: List[FollowUpOption] = Field(default_factory=list)
    trace: ExecutionTrace
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# =============================================================================
# 6. SELF-TESTING HARNESS
# =============================================================================

def run_self_test() -> bool:
    """Validate that all Pydantic schemas serialize, deserialize, and export JSON-Schema."""
    print("=== [PYDANTIC AGENT] Running Self-Test Suite ===")

    # 1. Test Query Validation
    query = AgentQueryInput(text="How does the CIM deconstruction workflow work?")
    assert query.text == "How does the CIM deconstruction workflow work?"
    print("✓ AgentQueryInput validated successfully")

    # 2. Test Skills
    cim_skill = CIMDeconstructionSkill()
    assert cim_skill.skill_name == "cim-deconstructor"
    eval_skill = EvalBenchSkill(monte_carlo_runs=100)
    assert eval_skill.monte_carlo_runs == 100
    print("✓ Pydantic Skills instantiated & validated")

    # 3. Test MCP JSON-RPC Request/Response
    req = JsonRpcRequest(
        method="tools/call",
        params={"name": "run_monte_carlo", "arguments": {"runs": 50}}
    )
    assert req.jsonrpc == "2.0"
    res = JsonRpcResponse(
        id=req.id,
        result={"status": "success", "simulated_accuracy": 0.942}
    )
    assert res.result["simulated_accuracy"] == 0.942
    print("✓ JSON-RPC 2.0 MCP Request/Response validated")

    # 4. Test Execution Trace & Response Payload
    step = TraceStep(
        subsystem="MCP_DISPATCH",
        title="Dispatched tool 'run_monte_carlo'",
        payload=req.model_dump(),
        elapsed_ms=24.5
    )
    trace = ExecutionTrace(
        query_id=query.query_id,
        steps=[step],
        total_elapsed_ms=24.5
    )
    payload = AgentResponsePayload(
        query_id=query.query_id,
        content_markdown="CIM Deconstruction executes across 3 stages...",
        citations=[
            Citation(
                document_id="02_built_use_case.md",
                title="CIM Deconstructor Architecture",
                anchor_link="#cim"
            )
        ],
        follow_up_options=[
            FollowUpOption(
                label="Run 50-sample Monte Carlo evaluation →",
                query="Run a 50-sample Monte Carlo test",
                action_type="tool"
            )
        ],
        trace=trace
    )
    json_output = payload.model_dump_json()
    assert len(json_output) > 100
    print(f"✓ AgentResponsePayload serialized strictly ({len(json_output)} bytes)")

    # 5. Export JSON-Schema definitions for frontend inspection
    schemas = {
        "AgentQueryInput": AgentQueryInput.model_json_schema(),
        "AgentResponsePayload": AgentResponsePayload.model_json_schema(),
        "ExecutionTrace": ExecutionTrace.model_json_schema(),
        "TraceStep": TraceStep.model_json_schema(),
        "JsonRpcRequest": JsonRpcRequest.model_json_schema(),
        "CIMDeconstructionSkill": CIMDeconstructionSkill.model_json_schema(),
        "EvalBenchSkill": EvalBenchSkill.model_json_schema(),
    }
    print(f"✓ Successfully generated JSON-Schema definitions for {len(schemas)} models")
    print("=== [PYDANTIC AGENT] ALL SELF-TESTS PASSED (100% GREEN) ===\n")
    return True


if __name__ == "__main__":
    if "--test" in sys.argv or len(sys.argv) == 1:
        success = run_self_test()
        sys.exit(0 if success else 1)
