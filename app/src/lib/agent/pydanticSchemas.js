/**
 * Pydantic V2 JSON-Schema Specifications & Runtime Type Validator
 * Matches scripts/pydantic_agent.py 1-to-1 for end-to-end type safety.
 */

export const PYDANTIC_SCHEMAS = {
  AgentQueryInput: {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "AgentQueryInput",
    description: "Inbound query schema with strict validation",
    type: "object",
    properties: {
      query_id: { type: "string", format: "uuid" },
      text: { type: "string", minLength: 1, maxLength: 2000, description: "Raw user query" },
      session_id: { type: ["string", "null"] },
      intent: { 
        type: "string", 
        enum: ["general", "cim_workflow", "eval_bench", "clay_fin_audit", "navigation", "glossary"] 
      },
      timestamp: { type: "string", format: "date-time" }
    },
    required: ["text"]
  },

  ExecutionTrace: {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "ExecutionTrace",
    description: "Complete trace envelope for an agent thought cycle",
    type: "object",
    properties: {
      trace_id: { type: "string", format: "uuid" },
      query_id: { type: "string" },
      steps: { type: "array", items: { $ref: "#/definitions/TraceStep" } },
      total_elapsed_ms: { type: "number", minimum: 0 },
      pydantic_validated: { type: "boolean" }
    },
    required: ["trace_id", "query_id", "steps", "total_elapsed_ms"]
  },

  TraceStep: {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "TraceStep",
    description: "Observable step in the agent execution pipeline",
    type: "object",
    properties: {
      step_id: { type: "string" },
      subsystem: { 
        type: "string", 
        enum: ["KB_RETRIEVAL", "SKILL_ACTIVATION", "MCP_DISPATCH", "TOOL_EXECUTION", "SYNTHESIS"] 
      },
      title: { type: "string", minLength: 2 },
      description: { type: "string" },
      payload: { type: "object" },
      elapsed_ms: { type: "number", minimum: 0 },
      status: { type: "string", enum: ["pending", "executing", "completed", "failed"] },
      timestamp: { type: "string", format: "date-time" }
    },
    required: ["step_id", "subsystem", "title", "payload", "elapsed_ms", "status"]
  },

  JsonRpcRequest: {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "JsonRpcRequest",
    description: "Standard JSON-RPC 2.0 MCP Protocol Tool Call Request",
    type: "object",
    properties: {
      jsonrpc: { type: "string", const: "2.0" },
      id: { type: "string" },
      method: { type: "string", enum: ["tools/call", "tools/list", "resources/read"] },
      params: { 
        type: "object",
        properties: {
          name: { type: "string" },
          arguments: { type: "object" }
        },
        required: ["name"]
      }
    },
    required: ["jsonrpc", "id", "method", "params"]
  },

  JsonRpcResponse: {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "JsonRpcResponse",
    description: "Standard JSON-RPC 2.0 MCP Protocol Response",
    type: "object",
    properties: {
      jsonrpc: { type: "string", const: "2.0" },
      id: { type: "string" },
      result: { type: ["object", "null"] },
      error: { type: ["object", "null"] }
    },
    required: ["jsonrpc", "id"]
  },

  CIMDeconstructionSkill: {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "CIMDeconstructionSkill",
    description: "Pydantic schema enforcing CIM data extraction invariants",
    type: "object",
    properties: {
      skill_name: { type: "string", const: "cim-deconstructor" },
      target_ebitda_reconciliation: { type: "boolean", default: true },
      extract_waterfall_revenue: { type: "boolean", default: true },
      audit_footnote_integrity: { type: "boolean", default: true },
      confidence_threshold: { type: "number", minimum: 0.5, maximum: 1.0 }
    },
    required: ["skill_name"]
  },

  EvalBenchSkill: {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "EvalBenchSkill",
    description: "Pydantic schema for multi-document Monte Carlo simulation benchmarks",
    type: "object",
    properties: {
      skill_name: { type: "string", const: "eval-bench-evaluator" },
      monte_carlo_runs: { type: "integer", minimum: 10, maximum: 500, default: 50 },
      target_confidence_interval: { type: "number", minimum: 0.8, maximum: 0.99, default: 0.95 },
      synthesize_edge_case_distribution: { type: "boolean", default: true }
    },
    required: ["skill_name", "monte_carlo_runs"]
  },

  BroadsheetNavigatorSkill: {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "BroadsheetNavigatorSkill",
    description: "Pydantic schema for coordinating in-app DOM section navigation",
    type: "object",
    properties: {
      skill_name: { type: "string", const: "broadsheet-navigator" },
      valid_sections: { 
        type: "array", 
        items: { type: "string" } 
      },
      scroll_behavior: { type: "string", enum: ["smooth", "instant"], default: "smooth" }
    },
    required: ["skill_name"]
  },

  CompetitorAuditorSkill: {
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "CompetitorAuditorSkill",
    description: "Pydantic schema for comparative feature audit against Clay and Fin",
    type: "object",
    properties: {
      skill_name: { type: "string", const: "competitor-auditor" },
      target_competitors: { type: "array", items: { type: "string" } },
      evaluate_extensibility_moat: { type: "boolean", default: true }
    },
    required: ["skill_name"]
  }
};

/**
 * Lightweight runtime structural validator mimicking Pydantic V2 validation.
 */
export function validatePydanticSchema(schemaName, data) {
  const schema = PYDANTIC_SCHEMAS[schemaName];
  if (!schema) {
    return { valid: false, errors: [`Unknown schema: ${schemaName}`] };
  }

  const errors = [];

  // Check required fields
  if (schema.required) {
    for (const field of schema.required) {
      if (data[field] === undefined || data[field] === null || data[field] === "") {
        errors.push(`Missing required field: '${field}'`);
      }
    }
  }

  // Type & constraint checks
  if (schema.properties) {
    for (const [key, prop] of Object.entries(schema.properties)) {
      if (data[key] !== undefined && data[key] !== null) {
        const val = data[key];
        if (prop.type === "string" && typeof val !== "string") {
          errors.push(`Field '${key}' must be a string (got ${typeof val})`);
        }
        if (prop.type === "number" && typeof val !== "number") {
          errors.push(`Field '${key}' must be a number (got ${typeof val})`);
        }
        if (prop.type === "boolean" && typeof val !== "boolean") {
          errors.push(`Field '${key}' must be a boolean (got ${typeof val})`);
        }
        if (prop.type === "array" && !Array.isArray(val)) {
          errors.push(`Field '${key}' must be an array`);
        }
        if (prop.enum && !prop.enum.includes(val)) {
          errors.push(`Field '${key}' must be one of: [${prop.enum.join(", ")}]`);
        }
        if (prop.minimum !== undefined && val < prop.minimum) {
          errors.push(`Field '${key}' (${val}) is below minimum (${prop.minimum})`);
        }
        if (prop.maximum !== undefined && val > prop.maximum) {
          errors.push(`Field '${key}' (${val}) exceeds maximum (${prop.maximum})`);
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    schemaTitle: schema.title,
    schema
  };
}
