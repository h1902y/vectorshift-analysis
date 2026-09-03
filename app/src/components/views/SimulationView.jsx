import React from 'react';
import { Play, RefreshCw, Zap, ArrowRight, X, AlertTriangle, Check, Layers } from 'lucide-react';

export function SimulationView({ simulation }) {
  const {
    nodes,
    scenarios,
    rubrics,
    isRunning,
    progress,
    selectedNodeId,
    setSelectedNodeId,
    activeEdgePayload,
    setActiveEdgePayload,
    hardeningApplied,
    runBatchSimulation,
    runSingleNode,
    applyHardening
  } = simulation;

  return (
    <div className="view-container">
      {/* Header & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="card-badge badge-indigo" style={{ marginBottom: '0.4rem' }}>Task 5 Deep Dive Prototype</span>
          <h2>The Simulation & Eval Test Bench</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Empirical World Model benchmarking suite (Scenario x Persona) with step-by-step DAG caching.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button 
            className="btn-primary"
            onClick={runBatchSimulation}
            disabled={isRunning}
          >
            {isRunning ? <RefreshCw size={16} className="spin-icon" /> : <Play size={16} />}
            {isRunning ? `Evaluating Scenarios (${progress}%)...` : 'Run 50-Scenario Test Bench'}
          </button>
        </div>
      </div>

      {/* Main Studio Frame */}
      <div className="sim-studio">
        <div className="sim-studio-toolbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Target Pipeline:</span>
            <span style={{ fontSize: '0.85rem', color: '#a5b4fc', background: 'var(--bg-base)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)' }}>
              CIM_Deconstructor_v2.0
            </span>
            <span className="card-badge badge-emerald">50 Synthetic Vectors</span>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Engine Status: <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Topological Subgraph Cache Active</span>
          </div>
        </div>

        <div className="sim-studio-grid">
          {/* Visual DAG Canvas */}
          <div className="sim-canvas-area">
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Interactive Canvas: Click a node to debug or run individually. Click connecting arrows to inspect wire payloads.
            </div>

            {/* Nodes Container */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', margin: '0.5rem 0' }}>
              {nodes.map((node, index) => {
                const isSelected = selectedNodeId === node.id;
                return (
                  <React.Fragment key={node.id}>
                    <div
                      className={`proto-node ${node.status} ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedNodeId(node.id)}
                    >
                      <div className="proto-node-header">
                        <span style={{ fontSize: '0.82rem' }}>{node.name}</span>
                        <span className={`proto-node-status status-${node.status}`}>
                          {node.status === 'cached' && '⚡ Cached'}
                          {node.status === 'running' && '● Running'}
                          {node.status === 'passed' && '✓ Passed'}
                          {node.status === 'active' && 'Active'}
                          {node.status === 'ready' && 'Ready'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                        {node.description}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                          {node.latency}
                        </span>
                        <button
                          className="btn-secondary"
                          style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            runSingleNode(node.id);
                          }}
                        >
                          Run Node
                        </button>
                      </div>
                    </div>

                    {index < nodes.length - 1 && (
                      <div
                        style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '0.2rem' }}
                        title="Click to inspect transmitted payload"
                        onClick={() => setActiveEdgePayload({
                          from: node.name,
                          to: nodes[index + 1].name,
                          data: JSON.stringify(node.cachedData, null, 2)
                        })}
                      >
                        <ArrowRight size={16} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Edge Payload Inspector */}
            {activeEdgePayload && (
              <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', padding: '0.8rem 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                    Payload Wire Inspector: {activeEdgePayload.from} ➔ {activeEdgePayload.to}
                  </span>
                  <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => setActiveEdgePayload(null)}>
                    <X size={14} />
                  </button>
                </div>
                <pre style={{ fontSize: '0.75rem', color: '#93c5fd', whiteSpace: 'pre-wrap', maxHeight: '120px', overflowY: 'auto' }}>
                  {activeEdgePayload.data}
                </pre>
              </div>
            )}

            {/* Auto-Hardening Recommendation Box */}
            <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: 'var(--radius-md)', padding: '1.2rem', marginTop: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Zap size={16} color="#818cf8" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c7d2fe' }}>
                    Automated Instruction Hardener (Generated from Scenario #14 Failure)
                  </span>
                </div>
                {hardeningApplied && <span className="card-badge badge-emerald">Rule Injected & Active</span>}
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.8rem', lineHeight: 1.5 }}>
                "In scenario #14, the LLM accepted capitalized engineering salaries as a one-time add-back.
                Recommended prompt constraint: <em style={{ color: '#e2e8f0' }}>'Exclude recurring developer and R&D payroll from EBITDA add-backs even if categorized as non-recurring by seller.'</em>"
              </p>

              <button
                className={hardeningApplied ? "btn-secondary" : "btn-primary"}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                onClick={applyHardening}
                disabled={hardeningApplied}
              >
                {hardeningApplied ? <Check size={14} /> : null}
                {hardeningApplied ? 'Hardened Rule Active in System Prompt' : 'Apply Hardened Constraint to Node 3'}
              </button>
            </div>
          </div>

          {/* Benchmark Rubric Sidebar */}
          <div className="sim-sidebar">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Quantitative Rubrics</span>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: hardeningApplied ? '#34d399' : '#a5b4fc' }}>
                  {hardeningApplied ? '98%' : '94%'}
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
                Evaluated against ground truth gold labels
              </div>

              {rubrics.map(r => (
                <div key={r.key} className="rubric-bar-container">
                  <div className="rubric-bar-label">
                    <span>{r.name}</span>
                    <span style={{ fontWeight: 600, color: r.score >= 95 ? '#6ee7b7' : '#fcd34d' }}>
                      {r.score}{r.unit}
                    </span>
                  </div>
                  <div className="rubric-bar-track">
                    <div 
                      className="rubric-bar-fill" 
                      style={{ 
                        width: `${r.score}%`, 
                        background: r.score >= 95 ? 'var(--accent-emerald)' : 'var(--accent-amber)' 
                      }}
                    ></div>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                    {r.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Edge Cases Evaluated */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
                Simulated Edge Cases ({scenarios.length})
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {scenarios.map(s => {
                  const isPass = s.status === 'passed';
                  return (
                    <div key={s.id} className="scenario-item">
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                          #{s.id}: {s.title}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: isPass ? '#6ee7b7' : '#fb7185' }}>
                          {isPass ? `Passed (Provenance ${s.provenanceScore}%)` : s.failureReason}
                        </div>
                      </div>
                      {isPass ? <Check size={16} color="#34d399" /> : <AlertTriangle size={16} color="#fb7185" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
