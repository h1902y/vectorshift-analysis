import React, { useState } from 'react';
import { 
  Palette, 
  Type, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Play
} from 'lucide-react';
import { 
  NewspaperSection, 
  GraphicCard, 
  BoxedCallout, 
  StatusBadge, 
  Button, 
  MetricCard, 
  ScoreProgress, 
  NoticeBanner, 
  AccordionCard, 
  CodeBlock, 
  EditorialDivider, 
  LedgerTable, 
  InlineCode,
  ModalDialog
} from '../../design-system';

export function DesignSpecimenSection() {
  const [activeTab, setActiveTab] = useState('primitives');
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const triggerLoadingDemo = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 2000);
  };

  const sampleLedgerColumns = [
    { key: 'token', label: 'Design Token', cellStyle: { fontWeight: 700 } },
    { key: 'cssVar', label: 'CSS Variable', cellStyle: { fontFamily: 'var(--font-mono)' } },
    { key: 'role', label: 'Editorial Semantics' },
    { 
      key: 'preview', 
      label: 'Sample Output',
      render: (val, row) => (
        <span style={{ fontFamily: 'var(--font-mono)', color: row.color || 'inherit', fontWeight: 600 }}>
          {val}
        </span>
      )
    }
  ];

  const sampleLedgerData = [
    { token: 'Burgundy Brand', cssVar: '--accent-burgundy', role: 'Operator anchor & main CTA', preview: '#801414 / #a82020', color: 'var(--accent-burgundy)' },
    { token: 'Crimson Alert', cssVar: '--accent-crimson', role: 'Kickers & high-priority flags', preview: '#9b1c31 / #d12e47', color: 'var(--accent-crimson)' },
    { token: 'Emerald Audit', cssVar: '--accent-emerald', role: 'Pass grade & 100% accuracy', preview: '#15803d / #22c55e', color: 'var(--accent-emerald)' },
    { token: 'Gold Caution', cssVar: '--accent-gold', role: 'Non-GAAP warnings & limits', preview: '#b45309 / #d97706', color: 'var(--accent-gold)' },
    { token: 'Navy Informational', cssVar: '--accent-navy', role: 'Metadata & external citations', preview: '#1e3a8a / #3b82f6', color: 'var(--accent-navy)' }
  ];

  return (
    <NewspaperSection
      id="specimen"
      kicker="SECTION VII &middot; DESIGN SYSTEM SPECIMEN (LIVING STYLEGUIDE)"
      byline="DESIGN TOKENS &middot; EDITORIAL PRIMITIVES &middot; COMPONENT ARCHITECTURE &middot; ACCESSIBILITY"
      headline="The living specimen: Production-grade editorial tokens and React primitives"
    >
      {/* Introduction Banner */}
      <NoticeBanner
        intent="info"
        title="Editorial Design System Verification"
        style={{ marginBottom: '1.8rem' }}
      >
        This living specimen documents all design tokens, font scales, and atomic React primitives powering <em>The VectorShift Diff</em>. Every element adheres to high-contrast financial publishing guidelines with full dark-mode parity.
      </NoticeBanner>

      {/* Sub-Navigation Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.8rem' }}>
        <Button
          variant="pill"
          active={activeTab === 'primitives'}
          onClick={() => setActiveTab('primitives')}
          icon={<Layers size={13} />}
        >
          Component Primitives
        </Button>
        <Button
          variant="pill"
          active={activeTab === 'tokens'}
          onClick={() => setActiveTab('tokens')}
          icon={<Palette size={13} />}
        >
          Color &amp; Elevation Tokens
        </Button>
        <Button
          variant="pill"
          active={activeTab === 'typography'}
          onClick={() => setActiveTab('typography')}
          icon={<Type size={13} />}
        >
          Typographic Hierarchy
        </Button>
      </div>

      {/* TAB 1: COMPONENT PRIMITIVES */}
      {activeTab === 'primitives' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Status Badges Specimen */}
          <BoxedCallout title="1. Status Badges (Semantic Intents & Sizing)">
            <p style={{ fontSize: '0.82rem', color: 'var(--ink-secondary)', marginBottom: '1rem' }}>
              Micro-labels for stage gates, pipeline confidence, and operator status:
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <StatusBadge variant="burgundy" dot>Operator ICP</StatusBadge>
              <StatusBadge variant="emerald" dot>Audit Grade (98%)</StatusBadge>
              <StatusBadge variant="crimson" dot>Mandate Failure</StatusBadge>
              <StatusBadge variant="gold" dot>Add-Back Caution</StatusBadge>
              <StatusBadge variant="navy" dot>Live Synced</StatusBadge>
              <StatusBadge variant="neutral">Draft 0.2</StatusBadge>
              <StatusBadge variant="outline">Uncommitted</StatusBadge>
              <StatusBadge variant="emerald" icon={<ShieldCheck size={11} />}>Verified DAG</StatusBadge>
            </div>
          </BoxedCallout>

          {/* Buttons & Interactive Controls Specimen */}
          <BoxedCallout title="2. Button Primitives & State Handling">
            <p style={{ fontSize: '0.82rem', color: 'var(--ink-secondary)', marginBottom: '1rem' }}>
              Standardized action controls across broadsheet pills, solid primary CTAs, outlines, and icon triggers:
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button variant="solid" size="md" icon={<Sparkles size={14} />}>
                Execute Pipeline
              </Button>
              <Button variant="solid" size="sm" icon={<Play size={12} />}>
                Run Single Node
              </Button>
              <Button 
                variant="outline" 
                size="md" 
                loading={btnLoading}
                onClick={triggerLoadingDemo}
              >
                {btnLoading ? 'Simulating 50 Runs...' : 'Test Async Loader'}
              </Button>
              <Button variant="pill" active>
                Active Broadsheet Filter
              </Button>
              <Button variant="pill">
                Default Filter
              </Button>
              <Button variant="ghost" size="sm">
                Colophon Index &rsaquo;
              </Button>
              <Button 
                variant="solid" 
                size="sm"
                onClick={() => setDemoModalOpen(true)}
              >
                Inspect Modal Primitive &rsaquo;
              </Button>
            </div>
          </BoxedCallout>

          {/* Metric Cards & Progress Specimen */}
          <div className="story-grid-2col">
            <GraphicCard
              figureNumber="FIG. S1"
              figureTitle="METRIC CARD & BENCHMARK GAUGES"
              caption="Live data cards for latency, token consumption, and audit scores."
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', width: '100%', marginBottom: '1rem' }}>
                <MetricCard
                  label="Cycle Latency"
                  value="12s"
                  delta="-75% Lift"
                  deltaType="positive"
                  subtitle="Sub-node cache active"
                  badge={<StatusBadge variant="emerald">PASS</StatusBadge>}
                />
                <MetricCard
                  label="Dev Token Burn"
                  value="55%"
                  delta="-45% Reduction"
                  deltaType="positive"
                  subtitle="Pre-flight validation"
                  badge={<StatusBadge variant="burgundy">OPTIMIZED</StatusBadge>}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', width: '100%' }}>
                <ScoreProgress label="EBITDA Bridge Determinism" score={100} unit="%" />
                <ScoreProgress label="Non-GAAP Add-Back Extraction" score={96} unit="%" />
                <ScoreProgress label="Uncalibrated Generic LLM" score={52} unit="%" passThreshold={80} />
              </div>
            </GraphicCard>

            <div>
              <BoxedCallout title="3. Accordion & Collapsible Components" style={{ height: '100%' }}>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-secondary)', marginBottom: '1rem' }}>
                  Self-contained collapsible components for multi-level roadmaps and friction analysis:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <AccordionCard
                    title="Pre-Flight Edge Linting"
                    badge={<StatusBadge variant="burgundy">Rank #1</StatusBadge>}
                    meta="Compiler Validation"
                    defaultExpanded={true}
                  >
                    <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
                      Validates type signatures, unhandled null outputs, and orphaned edge references before paying for GPU inference.
                    </p>
                  </AccordionCard>

                  <AccordionCard
                    title="Deterministic Arithmetic Enclaves"
                    badge={<StatusBadge variant="emerald">Rank #2</StatusBadge>}
                    meta="Mathematical Purity"
                  >
                    <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)' }}>
                      Strict boundary ensuring financial sums and EBITDA multiples are computed via deterministic Python calculators rather than generative token prediction.
                    </p>
                  </AccordionCard>
                </div>
              </BoxedCallout>
            </div>
          </div>

          {/* Notice Banners & Code Blocks Specimen */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <NoticeBanner intent="warning" title="Field Dispatch Warning">
                Rate-limit threshold reached on external SEC Edgar endpoints. Backoff active.
              </NoticeBanner>
              <NoticeBanner intent="alert" title="Circuit Breaker Tripped">
                Disallowed recurring operational cost detected in management add-back column.
              </NoticeBanner>
              <NoticeBanner intent="success" title="Deal Room Reconciled">
                Forty-eight diligence documents extracted with 100% chunk provenance.
              </NoticeBanner>
            </div>

            <CodeBlock
              title="SPECIFICATION: DETERMINISTIC BRIDGE SCHEMA"
              language="python"
              code={`def calculate_adjusted_ebitda(raw_ebitda: float, add_backs: list) -> float:
    """Eliminate LLM arithmetic hallucination via deterministic bridge"""
    approved_add_backs = sum(item.amount for item in add_backs if item.is_allowable)
    return round(raw_ebitda + approved_add_backs, 2)`}
            />
          </div>
        </div>
      )}

      {/* TAB 2: COLOR & ELEVATION TOKENS */}
      {activeTab === 'tokens' && (
        <div>
          <LedgerTable
            columns={sampleLedgerColumns}
            data={sampleLedgerData}
            striped
          />

          <EditorialDivider variant="ornament" symbol="§" />

          {/* Swatch Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'var(--paper-surface)', border: '1px solid var(--ink-rule-subtle)', padding: '1rem', borderRadius: '4px' }}>
              <div style={{ height: '40px', background: 'var(--paper-bg)', border: '1px solid var(--ink-rule-subtle)', borderRadius: '2px', marginBottom: '0.5rem' }}></div>
              <strong style={{ fontSize: '0.82rem' }}>--paper-bg</strong>
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>Morning: #f4efe6 &middot; Evening: #131418</div>
            </div>

            <div style={{ background: 'var(--paper-surface)', border: '1px solid var(--ink-rule-subtle)', padding: '1rem', borderRadius: '4px' }}>
              <div style={{ height: '40px', background: 'var(--paper-surface)', border: '1px solid var(--ink-rule-subtle)', borderRadius: '2px', marginBottom: '0.5rem' }}></div>
              <strong style={{ fontSize: '0.82rem' }}>--paper-surface</strong>
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>Morning: #eae4d6 &middot; Evening: #1b1d24</div>
            </div>

            <div style={{ background: 'var(--paper-surface)', border: '1px solid var(--ink-rule-subtle)', padding: '1rem', borderRadius: '4px' }}>
              <div style={{ height: '40px', background: 'var(--paper-sunken)', border: '1px solid var(--ink-rule-subtle)', borderRadius: '2px', marginBottom: '0.5rem' }}></div>
              <strong style={{ fontSize: '0.82rem' }}>--paper-sunken</strong>
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>Morning: #ded6c3 &middot; Evening: #0d0e12</div>
            </div>

            <div style={{ background: 'var(--paper-surface)', border: '1px solid var(--ink-rule-subtle)', padding: '1rem', borderRadius: '4px' }}>
              <div style={{ height: '40px', background: 'var(--accent-burgundy)', borderRadius: '2px', marginBottom: '0.5rem' }}></div>
              <strong style={{ fontSize: '0.82rem', color: 'var(--ink-primary)' }}>--accent-burgundy</strong>
              <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>Morning: #801414 &middot; Evening: #a82020</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TYPOGRAPHIC HIERARCHY */}
      {activeTab === 'typography' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <BoxedCallout title="Display Headline (Playfair Display, 900)">
            <h1 style={{ fontFamily: 'var(--font-serif-headline)', fontSize: '2.8rem', lineHeight: 1.05, letterSpacing: '-0.025em', color: 'var(--ink-primary)', marginBottom: '0.5rem' }}>
              The Forward-Deployed Operator
            </h1>
            <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>
              font-family: 'Playfair Display' &middot; font-weight: 900 &middot; letter-spacing: -0.025em
            </p>
          </BoxedCallout>

          <BoxedCallout title="Section Headline (Inter, 800)">
            <h2 style={{ fontFamily: 'var(--font-sans-headline)', fontSize: '2rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.025em', color: 'var(--ink-primary)', marginBottom: '0.5rem' }}>
              Five critical interventions for the builder canvas
            </h2>
            <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>
              font-family: 'Inter' &middot; font-weight: 800 &middot; letter-spacing: -0.025em
            </p>
          </BoxedCallout>

          <BoxedCallout title="Editorial Body (Newsreader with Burgundy Drop Cap)">
            <p className="daily-drop-cap" style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--ink-primary)' }}>
              In private equity diligence, an investment committee will never deploy an autonomous pipeline on a fifty-million-dollar buyout based on a sample size of one manual test prompt. Decision-makers demand empirical backtesting, audit-grade verification, and reproducible execution logs before releasing capital.
            </p>
            <p style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)', marginTop: '0.8rem' }}>
              font-family: 'Newsreader' &middot; font-size: 1.05rem &middot; line-height: 1.7 &middot; ::first-letter Playfair Display 4.4rem
            </p>
          </BoxedCallout>

          <BoxedCallout title="Data & Provenance Monospace (JetBrains Mono)">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--ink-secondary)', background: 'var(--paper-sunken)', padding: '0.8rem', borderRadius: '3px' }}>
              [2026-09-03 21:52:00] PIPELINE_START: CIM_Deconstructor_v2.0 --deterministic-math=true --cache=enabled (12ms)
            </div>
          </BoxedCallout>
        </div>
      )}

      {/* Interactive Modal Primitive Demo */}
      <ModalDialog
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        title="Accessible Editorial Modal Specimen"
        subtitle="DESIGN SYSTEM &middot; MODAL DIALOG PRIMITIVE"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--ink-primary)' }}>
            This modal implements broadsheet framing, backdrop blurring (<code>backdrop-filter: blur(8px)</code>), automatic <code>document.body</code> scroll locking, keyboard accessibility (press <InlineCode>Escape</InlineCode> to close), and focus containment.
          </p>

          <NoticeBanner intent="success" title="Accessibility Standards">
            WCAG 2.1 AA compliant with trap focus, ARIA role="dialog", and aria-modal="true".
          </NoticeBanner>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', marginTop: '0.5rem' }}>
            <Button variant="outline" size="sm" onClick={() => setDemoModalOpen(false)}>
              Dismiss
            </Button>
            <Button variant="solid" size="sm" onClick={() => setDemoModalOpen(false)}>
              Confirm &amp; Proceed
            </Button>
          </div>
        </div>
      </ModalDialog>
    </NewspaperSection>
  );
}
