import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Database, Sparkles, Cpu, Wrench, ShieldCheck } from 'lucide-react';

export function AgentTraceView({ trace, onInspectSchema }) {
  const [expanded, setExpanded] = useState(false);
  const [inspectedStep, setInspectedStep] = useState(null);

  if (!trace || !trace.steps || trace.steps.length === 0) return null;

  const getSubsystemIcon = (subsystem) => {
    switch (subsystem) {
      case 'KB_RETRIEVAL':
        return <Database size={13} style={{ color: 'var(--accent-gold)' }} />;
      case 'SKILL_ACTIVATION':
        return <Sparkles size={13} style={{ color: 'var(--accent-crimson)' }} />;
      case 'MCP_DISPATCH':
        return <Cpu size={13} style={{ color: 'var(--accent-emerald)' }} />;
      case 'TOOL_EXECUTION':
        return <Wrench size={13} style={{ color: 'var(--accent-burgundy)' }} />;
      default:
        return <ShieldCheck size={13} style={{ color: 'var(--accent-emerald)' }} />;
    }
  };

  return (
    <div className="agent-trace-container">
      {/* CAD Corner Ticks */}
      <div className="corner-node tl" />
      <div className="corner-node tr" />

      {/* Header bar of trace */}
      <div 
        className="agent-trace-header"
        onClick={() => setExpanded(prev => !prev)}
        style={{ cursor: 'pointer', padding: '0.38rem 0.65rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span className="telemetry-dot-pulse green" style={{ width: 6, height: 6 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 600, color: 'var(--ink-secondary)' }}>
            Verified across {trace.steps.length} execution steps ({trace.total_elapsed_ms}ms)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent-burgundy)', fontWeight: 700 }}>
            {expanded ? 'Hide Trace' : 'Inspect Trace'}
          </span>
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </div>
      </div>

      {/* Step Stepper Body */}
      {expanded && (
        <div className="agent-trace-steps">
          {trace.steps.map((step, idx) => (
            <div 
              key={step.step_id || idx} 
              className={`agent-trace-step-row ${inspectedStep === step.step_id ? 'inspected' : ''}`}
              onClick={() => setInspectedStep(prev => prev === step.step_id ? null : step.step_id)}
            >
              <div className="trace-step-left">
                <span className="trace-step-idx">{idx + 1}</span>
                <span className="trace-subsystem-badge">
                  {getSubsystemIcon(step.subsystem)}
                  <span>{step.subsystem}</span>
                </span>
                <span className="trace-step-title">{step.title}</span>
              </div>

              <div className="trace-step-right">
                <span className="trace-step-time">{step.elapsed_ms}ms</span>
                <span className="trace-inspect-btn">
                  {inspectedStep === step.step_id ? 'Hide JSON' : 'Inspect JSON'}
                </span>
              </div>

              {/* Expandable Step Payload Inspector */}
              {inspectedStep === step.step_id && (
                <div className="trace-payload-drawer" onClick={e => e.stopPropagation()}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--ink-muted)' }}>
                      Strict Pydantic Validated Payload &middot; Step ID: {step.step_id}
                    </span>
                    {onInspectSchema && (
                      <button
                        type="button"
                        onClick={() => onInspectSchema('TraceStep')}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, color: 'var(--accent-crimson)', textDecoration: 'underline', padding: 0 }}
                        title="Open in Schemas Tab"
                      >
                        View Schema in Tab &rarr;
                      </button>
                    )}
                  </div>
                  <pre className="trace-payload-json">
                    <code>{JSON.stringify(step.payload, null, 2)}</code>
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
