import React, { useState } from 'react';
import { Play, Zap, ArrowRight, X, Check } from 'lucide-react';
import { 
  NewspaperSection, 
  GraphicCard, 
  BoxedCallout, 
  InlineCode, 
  Button, 
  StatusBadge, 
  ScoreProgress,
  CodeBlock 
} from '../../design-system';
import { CitationLink } from './CitationLink';

export function InteractiveStudioSection({ simulation }) {
  const {
    nodes,
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

  const [activeStep, setActiveStep] = useState(1);

  const solutionSteps = [
    { num: 1, title: 'Topology & Cache', citationId: 'c1', label: 'DAG REPL' },
    { num: 2, title: 'World Model (50x)', citationId: 'c6', label: 'Cartesian Suite' },
    { num: 3, title: 'Cached Batch Run', citationId: 'c7', label: '<12s Latency' },
    { num: 4, title: 'LLM Rubric Audit', citationId: 'c8', label: 'Judge Scores' },
    { num: 5, title: 'Auto-Hardening', citationId: 'c9', label: '+4% Verified Lift' }
  ];

  return (
    <NewspaperSection
      id="simulation"
      kicker="SECTION IV &middot; WORKING PROTOTYPE (TASK 5)"
      byline="SYNTHETIC WORLD MODEL &middot; EPHEMERAL NODE CACHE &middot; PROMPT AUTO-HARDENING"
      headline="The Simulation & Eval Test Bench: An interactive data desk prototype"
    >
      {/* 2-Column Grid */}
      <div className="story-grid-2col" style={{ marginBottom: '1.8rem' }}>
        {/* Left Graphic: Benchmark Score Box */}
        <GraphicCard
          figureNumber="FIG. 5"
          figureTitle="SIMULATION SCORECARD & ACCURACY"
          caption="Quantitative evaluation against ground-truth private equity diligence rubrics."
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-burgundy)' }}>
              BENCHMARK GOLD INDEX
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: hardeningApplied ? 'var(--accent-emerald)' : 'var(--ink-primary)' }}>
              {hardeningApplied ? '98%' : '94%'}
            </span>
          </div>

          <div style={{ fontSize: '0.74rem', color: 'var(--ink-muted)', marginBottom: '0.9rem' }}>
            Evaluated across 50 synthetic stress scenarios <CitationLink id="c8" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {rubrics.map(r => (
              <ScoreProgress
                key={r.key}
                label={r.name}
                score={r.score}
                unit={r.unit}
                passThreshold={95}
              />
            ))}
          </div>
        </GraphicCard>

        {/* Right Drop Cap Editorial Text */}
        <div className="story-editorial-text">
          <p className="daily-drop-cap">
            In private equity diligence, an investment committee will never deploy an autonomous pipeline on a fifty-million-dollar buyout based on a sample size of one manual test prompt <CitationLink id="c6" />. Decision-makers demand empirical backtesting: <em>“How does this agent behave when presented with forty-eight pages of distressed debt and non-GAAP add-backs?”</em>
          </p>

          <p>
            The interactive desk below demonstrates our solution: a synthetic Cartesian generator (<InlineCode>Scenario x Persona</InlineCode> <CitationLink id="c6" />) evaluating outputs against quantitative rubrics <CitationLink id="c8" />, with single-node caching for sub-two-second iteration cycles <CitationLink id="c1" /> <CitationLink id="c7" />.
          </p>
        </div>
      </div>

      {/* 5-Stage Progressive Solution Flow Stepper */}
      <div style={{ 
        background: 'var(--paper-surface-alt)', 
        border: '1px solid var(--ink-rule-subtle)', 
        borderRadius: '4px', 
        padding: '0.7rem 1rem', 
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-burgundy)' }}>
            Solution Flow:
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {solutionSteps.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div 
                onClick={() => setActiveStep(step.num)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '3px',
                  background: activeStep === step.num ? 'var(--accent-burgundy)' : 'var(--paper-bg)',
                  color: activeStep === step.num ? '#ffffff' : 'var(--ink-secondary)',
                  border: '1px solid var(--ink-rule-subtle)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  fontWeight: 600
                }}
              >
                <span>{step.num}. {step.title}</span>
                <CitationLink id={step.citationId} />
              </div>
              {idx < solutionSteps.length - 1 && (
                <span style={{ color: 'var(--ink-muted)', fontSize: '0.7rem' }}>➔</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* The Interactive Lab Bench Frame */}
      <BoxedCallout style={{ padding: 0, overflow: 'hidden' }}>
        {/* Bench Header Bar */}
        <div style={{ background: 'var(--paper-surface-alt)', borderBottom: '1px solid var(--ink-rule-subtle)', padding: '0.75rem 1.1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-burgundy)' }}>
              Interactive Test Desk
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: 'var(--paper-bg)', padding: '0.15rem 0.5rem', border: '1px solid var(--ink-rule-subtle)', borderRadius: '2px' }}>
              CIM_Deconstructor_v2.0
            </span>
          </div>

          <Button
            variant="solid"
            size="sm"
            loading={isRunning}
            onClick={() => {
              setActiveStep(3);
              runBatchSimulation();
            }}
            icon={!isRunning ? <Play size={12} /> : null}
          >
            {isRunning ? `Testing (${progress}%)...` : 'Run 50-Scenario Test Bench'}
          </Button>
        </div>

        {/* Bench Body */}
        <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Nodes Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            {nodes.map((node, idx) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <React.Fragment key={node.id}>
                  <div
                    style={{
                      background: 'var(--paper-surface-alt)',
                      border: isSelected ? '2px solid var(--accent-burgundy)' : '1px solid var(--ink-rule-subtle)',
                      borderRadius: '4px',
                      padding: '0.7rem',
                      width: '200px',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s ease'
                    }}
                    onClick={() => setSelectedNodeId(node.id)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.76rem', fontWeight: 700, color: 'var(--ink-primary)' }}>
                        {node.name}
                      </span>
                      <StatusBadge 
                        variant={node.status === 'cached' ? 'navy' : node.status === 'running' ? 'gold' : 'emerald'}
                      >
                        {node.status}
                      </StatusBadge>
                    </div>

                    <div style={{ fontSize: '0.7rem', color: 'var(--ink-secondary)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                      {node.description}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-dim)' }}>
                        {node.latency}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        style={{ padding: '0.15rem 0.45rem', fontSize: '0.65rem' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          runSingleNode(node.id);
                        }}
                      >
                        Run Node
                      </Button>
                    </div>
                  </div>

                  {idx < nodes.length - 1 && (
                    <div
                      style={{ color: 'var(--ink-muted)', cursor: 'pointer', padding: '0.2rem' }}
                      title="Inspect wire payload"
                      onClick={() => setActiveEdgePayload({
                        from: node.name,
                        to: nodes[idx + 1].name,
                        data: JSON.stringify(node.cachedData, null, 2)
                      })}
                    >
                      <ArrowRight size={14} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Wire Payload Drawer */}
          {activeEdgePayload && (
            <div style={{ background: 'var(--paper-bg)', border: '1px solid var(--ink-rule-subtle)', borderRadius: '3px', padding: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.74rem', fontWeight: 700, color: 'var(--accent-burgundy)' }}>
                  Transmitted Wire Payload: {activeEdgePayload.from} ➔ {activeEdgePayload.to}
                </span>
                <button 
                  type="button"
                  style={{ background: 'none', border: 'none', color: 'var(--ink-muted)', cursor: 'pointer' }} 
                  onClick={() => setActiveEdgePayload(null)}
                >
                  <X size={14} />
                </button>
              </div>
              <CodeBlock
                code={activeEdgePayload.data}
                allowCopy={true}
                style={{ margin: 0 }}
              />
            </div>
          )}

          {/* Auto-Hardening Recommendation */}
          <div style={{ background: 'var(--paper-surface-alt)', border: '1px solid var(--ink-rule-subtle)', padding: '0.9rem', borderRadius: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-burgundy)' }}>
                <Zap size={14} /> Automated Prompt Hardener (Triggered by Scenario #14 Failure)
              </div>
              {hardeningApplied && (
                <StatusBadge variant="emerald" dot>
                  Rule Injected
                </StatusBadge>
              )}
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', marginBottom: '0.7rem', lineHeight: 1.45 }}>
              “In scenario #14, the LLM accepted recurring engineering payroll as a one-time add-back.
              Recommended prompt constraint: <em style={{ color: 'var(--ink-primary)' }}>‘Exclude capitalized software developer salaries from EBITDA add-backs even if labeled non-recurring by seller.’</em>”
            </p>

            <Button
              variant={hardeningApplied ? 'outline' : 'solid'}
              size="sm"
              onClick={() => {
                setActiveStep(5);
                applyHardening();
              }}
              disabled={hardeningApplied}
              icon={hardeningApplied ? <Check size={12} /> : null}
            >
              {hardeningApplied ? 'Hardened Rule Active in System Prompt (+4% Lift)' : 'Apply Hardened Rule to Node 3'}
            </Button>
          </div>
        </div>
      </BoxedCallout>
    </NewspaperSection>
  );
}
