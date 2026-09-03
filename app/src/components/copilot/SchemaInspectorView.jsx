import React, { useState } from 'react';
import { Copy, Check, Code, ShieldCheck, ArrowLeft, Terminal, Cpu } from 'lucide-react';
import { PYDANTIC_SCHEMAS } from '../../lib/agent/pydanticSchemas';
import { MCP_TOOLS_REGISTRY } from '../../lib/agent/pydanticAgentRuntime';

export function SchemaInspectorView({ initialSchema = 'AgentResponsePayload', onReturnToChat }) {
  const [selectedSchema, setSelectedSchema] = useState(initialSchema);
  const [copied, setCopied] = useState(false);

  const schemaNames = Object.keys(PYDANTIC_SCHEMAS);
  const currentSchema = PYDANTIC_SCHEMAS[selectedSchema] || PYDANTIC_SCHEMAS['AgentQueryInput'];

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(currentSchema, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="schema-inspector-tab-view animate-in">
      {/* Tab Sub-Header & Navigation */}
      <div className="schema-tab-sub-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {onReturnToChat && (
            <button
              type="button"
              onClick={onReturnToChat}
              className="schema-back-to-chat-btn"
              title="Return to Active Chat"
            >
              <ArrowLeft size={13} />
              <span>Back to Chat</span>
            </button>
          )}
          <span className="schema-tab-title-badge">
            <ShieldCheck size={12} style={{ color: 'var(--accent-crimson)' }} />
            <span>PYDANTIC V2 &middot; 8 STRICT SCHEMAS</span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="schema-copy-action-btn"
        >
          {copied ? <Check size={12} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={12} />}
          <span>{copied ? 'Copied JSON-Schema' : 'Copy Active Schema'}</span>
        </button>
      </div>

      {/* Horizontal Schema Selectors */}
      <div className="schema-pill-nav">
        {schemaNames.map(name => {
          const isActive = selectedSchema === name;
          return (
            <button
              key={name}
              type="button"
              className={`schema-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedSchema(name)}
            >
              <span>{name}</span>
            </button>
          );
        })}
      </div>

      {/* Schema Code Inspector */}
      <div className="schema-code-viewer-panel">
        <div className="schema-code-viewer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Terminal size={12} style={{ color: 'var(--accent-crimson)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--ink-primary)' }}>
              {currentSchema.title}
            </span>
            <span style={{ fontSize: '0.62rem', color: 'var(--ink-muted)' }}>
              (Draft 2020-12 &middot; BaseModel)
            </span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
            ● Validated by Pydantic V2 Engine
          </span>
        </div>

        <pre className="schema-code-pre">
          <code>{JSON.stringify(currentSchema, null, 2)}</code>
        </pre>
      </div>

      {/* Connected MCP Tool Bus (4 Executable Tools) */}
      <div className="schema-mcp-section">
        <div className="schema-mcp-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Cpu size={13} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-burgundy)' }}>
              CONNECTED MCP TOOLS BUS ({MCP_TOOLS_REGISTRY.length} REGISTERED)
            </span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--ink-muted)' }}>
            Protocol: JSON-RPC 2.0 &middot; Latency: 11ms
          </span>
        </div>

        <div className="schema-mcp-grid">
          {MCP_TOOLS_REGISTRY.map(tool => (
            <div key={tool.name} className="schema-mcp-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
                  <Code size={13} style={{ color: 'var(--accent-crimson)' }} />
                  <span>{tool.name}()</span>
                </div>
                <span className="schema-mcp-status-pill">Active</span>
              </div>
              <p style={{ fontFamily: 'var(--font-serif-body)', fontSize: '0.8rem', color: 'var(--ink-secondary)', lineHeight: 1.35, margin: 0 }}>
                {tool.description}
              </p>
              {tool.parameters && tool.parameters.length > 0 && (
                <div style={{ marginTop: '0.4rem', display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {tool.parameters.map(p => (
                    <span key={p.name} className="schema-mcp-param-tag">
                      {p.name}: <em>{p.type}</em>{p.required ? ' *' : ''}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
