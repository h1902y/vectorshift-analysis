import React, { useState } from 'react';
import { IMPROVEMENTS_DATA } from '../../data/improvementsData';
import { Layers, ChevronDown, ChevronUp, TrendingUp, CheckCircle2 } from 'lucide-react';

export function ImprovementsView({ onOpenSimulation }) {
  const [expandedId, setExpandedId] = useState('sim-eval-bench');

  return (
    <div className="view-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <span className="card-badge badge-cyan" style={{ marginBottom: '0.4rem' }}>Task 4 Prioritization</span>
        <h2>Top 5 Builder View Improvements (Ranked)</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          Ranked by enterprise retention impact and velocity leverage for the Forward-Deployed AI Operator across the full lifecycle.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {IMPROVEMENTS_DATA.map(item => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="glass-card"
              style={{
                borderLeft: `4px solid var(--accent-${item.badgeColor})`,
                transition: 'all 0.2s ease'
              }}
            >
              {/* Card Header Bar */}
              <div 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <span className={`card-badge badge-${item.badgeColor}`}>
                    Priority #{item.rank}
                  </span>
                  <h3 style={{ fontSize: '1.15rem' }}>{item.title}</h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Pillar: <strong style={{ color: 'var(--text-secondary)' }}>{item.lifecyclePillar}</strong>
                  </span>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div style={{ marginTop: '1.2rem', paddingTop: '1.2rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '1.2rem' }}>
                    {/* Screen & Friction */}
                    <div style={{ background: 'var(--bg-base)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                        Screen & Specific Friction
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '0.3rem' }}>
                        {item.screen}
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                        {item.friction}
                      </p>
                    </div>

                    {/* Who It Affects & Root Cause */}
                    <div style={{ background: 'var(--bg-base)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-amber)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                        Target Users & Architectural Root Cause
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                        <strong>Affects:</strong> {item.affectedUsers}
                      </p>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        <strong>Root Cause:</strong> {item.rootCause}
                      </p>
                    </div>

                    {/* Solution Blueprint */}
                    <div style={{ background: 'var(--bg-base)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                        Proposed Engineering Solution
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', whiteSpace: 'pre-line', lineHeight: 1.45 }}>
                        {item.solution}
                      </p>
                      {item.rank === 1 && (
                        <button 
                          className="btn-primary" 
                          style={{ marginTop: '0.8rem', padding: '0.35rem 0.8rem', fontSize: '0.78rem' }}
                          onClick={onOpenSimulation}
                        >
                          Launch Prototype View
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Quantitative Target Metrics */}
                  <div style={{ background: 'rgba(21, 25, 38, 0.6)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.8rem' }}>
                      Measurable Success Metrics
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      {item.metrics.map((m, idx) => (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{m.label}</span>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.2rem' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{m.target}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>(from {m.before})</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>{m.change}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
