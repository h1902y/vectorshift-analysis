import React, { useState } from 'react';
import { X, Check, Copy, Code, ShieldCheck } from 'lucide-react';
import { PYDANTIC_SCHEMAS } from '../../lib/agent/pydanticSchemas';
import { MCP_TOOLS_REGISTRY } from '../../lib/agent/pydanticAgentRuntime';

export function PydanticSchemaModal({ open, onClose }) {
  const [selectedSchema, setSelectedSchema] = useState('AgentResponsePayload');
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const schemaNames = Object.keys(PYDANTIC_SCHEMAS);
  const currentSchema = PYDANTIC_SCHEMAS[selectedSchema] || PYDANTIC_SCHEMAS['AgentQueryInput'];

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(currentSchema, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="pydantic-modal-overlay"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="pydantic-modal-card">
        {/* CAD Corner Nodes */}
        <div className="corner-node tl" />
        <div className="corner-node tr" />
        <div className="corner-node bl" />
        <div className="corner-node br" />

        {/* Modal Header */}
        <div className="pydantic-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShieldCheck size={18} style={{ color: 'var(--accent-crimson)' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-muted)' }}>
                PYDANTIC V2 SPECIFICATION INSPECTOR
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
                End-to-End Type Contracts & JSON-RPC Schemas
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)' }}
            title="Close Inspector"
          >
            <X size={18} />
          </button>
        </div>

        {/* Schema Switcher Tabs */}
        <div className="pydantic-schema-tabs">
          {schemaNames.map(name => (
            <button
              key={name}
              className={`pydantic-tab-btn ${selectedSchema === name ? 'active' : ''}`}
              onClick={() => setSelectedSchema(name)}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="pydantic-modal-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-muted)' }}>
              Schema Title: <strong style={{ color: 'var(--ink-primary)' }}>{currentSchema.title}</strong> &middot; Draft 2020-12
            </span>
            <button
              onClick={handleCopy}
              className="pydantic-copy-btn"
            >
              {copied ? <Check size={12} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={12} />}
              <span>{copied ? 'Copied JSON' : 'Copy JSON-Schema'}</span>
            </button>
          </div>

          <pre className="pydantic-schema-code">
            <code>{JSON.stringify(currentSchema, null, 2)}</code>
          </pre>

          {/* Active MCP Tools Registered */}
          <div style={{ marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px solid var(--ink-rule-subtle)' }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-burgundy)', marginBottom: '0.5rem' }}>
              Connected MCP Tools ({MCP_TOOLS_REGISTRY.length} Available)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {MCP_TOOLS_REGISTRY.map(tool => (
                <div key={tool.name} className="mcp-tool-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-primary)' }}>
                    <Code size={13} style={{ color: 'var(--accent-crimson)' }} />
                    <span>{tool.name}()</span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--ink-secondary)', marginTop: '0.2rem', lineHeight: 1.3 }}>
                    {tool.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pydantic-modal-footer">
          <span>⚡ Validated across Pydantic V2 BaseModel contracts in <code>scripts/pydantic_agent.py</code></span>
          <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>● 100% Type-Safe Invariant Gate</span>
        </div>
      </div>
    </div>
  );
}
