import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Clock, Database, Sparkles, Cpu, Wrench, ShieldCheck } from 'lucide-react';

export function AgentTraceView({ trace, onInspectSchema }) {
  const [expanded, setExpanded] = useState(true);
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
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="telemetry-dot-pulse green" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--ink-primary)' }}>
            OBSERVABLE EXECUTION TRACE &middot; {trace.steps.length} STEPS
          </span>
          <span className="pydantic-validation-pill">
            <CheckCircle size={10} />
            <span>Pydantic V2 Validated</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-muted)' }}>
            <Clock size={11} style={{ display: 'inline', marginRight: '0.2rem' }} />
            {trace.total_elapsed_ms}ms
          </span>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)' }}>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
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
