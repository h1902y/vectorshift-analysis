import React from 'react';
import { Award, ShieldCheck, ArrowRight, CheckCircle2, XCircle, Zap } from 'lucide-react';
import { PERSONA_TRIANGULATION, LIFECYCLE_STAGES, PRIVATE_MARKET_MOAT } from '../../data/assessmentData';

export function ExecutiveView({ onExplorePrototype }) {
  const { anchorICP, excludedPersonas } = PERSONA_TRIANGULATION;

  return (
    <div className="view-container">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-tagline">Platform Assessment Deliverable & Strategic Blueprint</div>
        <h1 className="hero-title">The Operating System for High-Stakes Knowledge Workflows</h1>
        <p className="hero-desc">
          VectorShift is not another generic automation tool. Its highest enterprise leverage is serving as the 
          <strong> private market intelligence engine</strong> for Private Equity, M&A, and corporate diligence—built 
          by <strong>Forward-Deployed AI Operators</strong> who assemble multi-document pipelines in the Builder View and deliver 
          locked-down White-Label Portals to functional teams.
        </p>

        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <div className="hero-stat-val">8</div>
            <div className="hero-stat-lbl">Core Platform Layers</div>
          </div>
          <div className="hero-stat-item">
            <div className="hero-stat-val">50+</div>
            <div className="hero-stat-lbl">DAG Canvas Nodes</div>
          </div>
          <div className="hero-stat-item">
            <div className="hero-stat-val">3 Surfaces</div>
            <div className="hero-stat-lbl">Visual, Python SDK & Portals</div>
          </div>
          <div className="hero-stat-item">
            <div className="hero-stat-val">-75%</div>
            <div className="hero-stat-lbl">Target Debugging Latency</div>
          </div>
        </div>
      </div>

      {/* MECE Persona Triangulation */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <span className="card-badge badge-indigo">Task 2 Triangulation</span>
          <h2 style={{ fontSize: '1.4rem' }}>Who VectorShift Is For (The MECE Persona Model)</h2>
        </div>

        <div className="card-grid-2">
          {/* Primary ICP Card */}
          <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-primary)', position: 'relative' }}>
            <div className="card-header-flex">
              <span className="card-badge badge-indigo">{anchorICP.tag}</span>
              <Award size={20} color="#818cf8" />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.4rem' }}>{anchorICP.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              {anchorICP.mission}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
              {anchorICP.roles.map((r, i) => (
                <span key={i} style={{ fontSize: '0.75rem', background: 'var(--bg-base)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', color: '#c7d2fe' }}>
                  {r}
                </span>
              ))}
            </div>

            <div style={{ background: 'var(--bg-base)', padding: '0.9rem 1.1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.84rem', marginBottom: '0.8rem' }}>
              <div style={{ color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '0.2rem' }}>Why VectorShift Wins:</div>
              {anchorICP.whyVectorShiftWins}
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--text-secondary)' }}>Acute Pain Without VectorShift:</strong> {anchorICP.corePainWithoutVectorShift}
            </div>
          </div>

          {/* Excluded Personas Comparison */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {excludedPersonas.map((p, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '1.2rem', background: 'rgba(14, 17, 26, 0.5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-rose)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Non-Builder: {p.title}
                  </span>
                  <XCircle size={16} color="#fb7185" />
                </div>
                <div style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                  {p.reasonExcluded}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.08)', padding: '0.4rem 0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <strong>How They Interact:</strong> {p.vectorShiftSurface}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The 3 Lifecycle Stages */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <span className="card-badge badge-cyan">Task 1 Architecture</span>
          <h2 style={{ fontSize: '1.4rem' }}>The Agentic Application Lifecycle</h2>
        </div>

        <div className="card-grid-3">
          {LIFECYCLE_STAGES.map(stage => (
            <div key={stage.id} className="glass-card">
              <div className="card-header-flex">
                <span className="card-badge badge-cyan">{stage.phase}</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{stage.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {stage.description}
              </p>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                  Key Capabilities
                </div>
                <ul style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {stage.keyCapabilities.map((cap, i) => (
                    <li key={i}>{cap}</li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'var(--bg-base)', padding: '0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.78rem', color: '#fca5a5' }}>
                <strong>Bottleneck Solved:</strong> {stage.bottleneck}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Private Market Moat */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <div className="card-header-flex">
          <div>
            <span className="card-badge badge-emerald" style={{ marginBottom: '0.4rem' }}>Domain Specialization</span>
            <h2 style={{ fontSize: '1.3rem' }}>The Private Market Intelligence Moat</h2>
          </div>
          <button className="btn-primary" onClick={onExplorePrototype}>
            Open #1 Simulation Studio <ArrowRight size={15} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginTop: '1rem' }}>
          {PRIVATE_MARKET_MOAT.map((item, idx) => (
            <div key={idx} style={{ background: 'var(--bg-base)', padding: '1.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{item.pillar}</span>
                <ShieldCheck size={16} color="#34d399" />
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontWeight: 600, marginBottom: '0.5rem' }}>
                Benchmark: {item.metric}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.45 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
