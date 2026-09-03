import React from 'react';
import { COMPETITOR_MATRIX, STRATEGIC_PLAYBOOK } from '../../data/competitorData';
import { Compass, Lightbulb, ArrowRight, ShieldCheck } from 'lucide-react';

export function CompetitorView() {
  return (
    <div className="view-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <span className="card-badge badge-purple" style={{ marginBottom: '0.4rem' }}>Strategic Benchmark</span>
        <h2>Architectural Benchmark: VectorShift vs. Clay vs. Intercom Fin</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          Deconstructing the three leading verticalized agent platforms to identify VectorShift's core moat and prioritized borrowings.
        </p>
      </div>

      {/* Comparative Table */}
      <div className="glass-card" style={{ marginBottom: '2rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-medium)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '0.9rem 1rem' }}>Dimension</th>
              <th style={{ padding: '0.9rem 1rem', color: 'var(--accent-primary)', fontWeight: 700 }}>VectorShift</th>
              <th style={{ padding: '0.9rem 1rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>Clay (GTM Engine)</th>
              <th style={{ padding: '0.9rem 1rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>Intercom Fin (Support CX)</th>
              <th style={{ padding: '0.9rem 1rem', color: '#cbd5e1', fontWeight: 700 }}>Dify.ai (LLM Ops)</th>
            </tr>
          </thead>
          <tbody>
            {COMPETITOR_MATRIX.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {row.dimension}
                </td>
                <td style={{ padding: '0.85rem 1rem', background: 'rgba(99, 102, 241, 0.04)', color: '#c7d2fe' }}>
                  {row.vectorShift}
                </td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>
                  {row.clay}
                </td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>
                  {row.fin}
                </td>
                <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>
                  {row.dify}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Strategic Playbook Cards */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <Lightbulb size={20} color="#f59e0b" />
          <h3 style={{ fontSize: '1.25rem' }}>The Strategic Playbook: What VectorShift Must Steal</h3>
        </div>

        <div className="card-grid-2">
          {STRATEGIC_PLAYBOOK.map((item, idx) => (
            <div key={idx} className="glass-card">
              <div className="card-header-flex">
                <span className="card-badge badge-amber">{item.source}</span>
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                {item.lesson}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
