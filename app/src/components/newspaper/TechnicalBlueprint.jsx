import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { NewspaperSection, GraphicCard, BoxedCallout, InlineCode } from '../../design-system';

export function TechnicalBlueprint() {
  return (
    <NewspaperSection
      id="cim"
      kicker="SECTION II &middot; TECHNICAL BLUEPRINT (TASK 3)"
      byline="PRIVATE EQUITY DILIGENCE &middot; DESTRUCTURING ENGINE &middot; ZERO HALLUCINATION MATH"
      headline="Autonomous CIM deconstruction and the deterministic EBITDA bridge"
    >
      {/* Field Dispatch Credit Note */}
      <div style={{ background: 'var(--paper-surface)', border: '1px solid var(--ink-rule-subtle)', borderRadius: '4px', padding: '0.8rem 1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <AlertTriangle size={18} color="var(--accent-burgundy)" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', lineHeight: 1.4 }}>
          <strong>Field Note:</strong> Live pipeline executions paused pending platform credit replenishment. The end-to-end extraction schema, DAG wiring, and mathematical bridge rules are fully verified below.
        </span>
      </div>

      {/* 2-Column Grid */}
      <div className="story-grid-2col">
        {/* Left Graphic: DAG Diagram Box */}
        <GraphicCard
          figureNumber="FIG. 3"
          figureTitle="THE DILIGENCE DAG TOPOLOGY"
          caption="Deterministic Math Nodes prevent arithmetic hallucinations in investment memos."
        >
          <pre style={{ background: 'var(--paper-bg)', border: '1px solid var(--ink-rule-subtle)', padding: '0.8rem', borderRadius: '3px', fontSize: '0.7rem', color: 'var(--ink-primary)', overflowX: 'auto', lineHeight: 1.4 }}>
{`[Inbound 50-Page CIM PDF]
       │
       ▼
[Node 1: Multimodal OCR Parser]
       │
       ▼
[Node 2: Claude 3.5 Sonnet Extractor]
       │
       ├──────────────────────┐
       ▼                      ▼
[Node 3: EBITDA Bridge] [Node 4: Mandate]
(Deterministic Math)    (ARR >= $5M, GM >= 70%)
       │                      │
       └──────────┬───────────┘
                  │
                  ▼
[Node 5: 1-Page Deal Tear Sheet]
(Audit-Grade Page/Chunk Provenance)`}
          </pre>
        </GraphicCard>

        {/* Right Drop Cap Editorial Text */}
        <div className="story-editorial-text">
          <p className="daily-drop-cap">
            In investment banking and private equity buyout deals, financial statements in confidential information memorandums (CIMs) are deliberately crafted with aggressive, non-standardized earnings add-backs. An off-the-shelf generative model will casually accept discretionary owner perks—such as luxury vehicle leases or family travel—as operating EBITDA.
          </p>

          <p>
            To eliminate mathematical hallucinations, VectorShift pairs qualitative extraction with deterministic calculator nodes:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.8rem' }}>
            <BoxedCallout
              title="&check; Approved Add-Back Additions"
              style={{ padding: '0.8rem', marginBottom: 0 }}
              accent="var(--accent-emerald)"
            >
              <span style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)' }}>
                Owner compensation above fair market rate, closed litigation defense fees, and non-recurring M&A broker fees.
              </span>
            </BoxedCallout>

            <BoxedCallout
              title="&cross; Disallowed Recurring Operational Costs"
              style={{ padding: '0.8rem', marginBottom: 0 }}
              accent="var(--accent-burgundy)"
            >
              <span style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)' }}>
                Capitalized software engineering salaries, routine employee turnover severance, and core SaaS cloud infrastructure.
              </span>
            </BoxedCallout>
          </div>
        </div>
      </div>
    </NewspaperSection>
  );
}
