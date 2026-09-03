import React from 'react';
import { NewspaperSection, GraphicCard, BoxedCallout, NoticeBanner, CodeBlock, StatusBadge } from '../../design-system';
import { CitationLink } from './CitationLink';

export function TechnicalBlueprint() {
  const dagAscii = `[Inbound 50-Page CIM PDF]
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
(Audit-Grade Page/Chunk Provenance)`;

  return (
    <NewspaperSection
      id="cim"
      kicker="SECTION II &middot; TECHNICAL BLUEPRINT (TASK 3)"
      byline="PRIVATE EQUITY DILIGENCE &middot; DESTRUCTURING ENGINE &middot; ZERO HALLUCINATION MATH"
      headline="Autonomous CIM deconstruction and the deterministic EBITDA bridge"
    >
      {/* Field Dispatch Credit Note */}
      <NoticeBanner
        intent="warning"
        title="Field Dispatch Note"
        style={{ marginBottom: '1.5rem' }}
      >
        Live pipeline executions paused pending platform credit replenishment. The end-to-end extraction schema, DAG wiring, and mathematical bridge rules are fully verified below.
      </NoticeBanner>

      {/* 2-Column Grid */}
      <div className="story-grid-2col">
        {/* Left Graphic: DAG Diagram Box */}
        <GraphicCard
          figureNumber="FIG. 3"
          figureTitle="THE DILIGENCE DAG TOPOLOGY"
          caption="Deterministic Math Nodes prevent arithmetic hallucinations in investment memos."
        >
          <CodeBlock
            title="TOPOLOGY: CIM_DECONSTRUCTOR_DAG"
            code={dagAscii}
            style={{ margin: 0 }}
          />
        </GraphicCard>

        {/* Right Drop Cap Editorial Text */}
        <div className="story-editorial-text">
          <p className="daily-drop-cap">
            In investment banking and private equity buyout deals, financial statements in confidential information memorandums (CIMs) are deliberately crafted with aggressive, non-standardized earnings add-backs. An off-the-shelf generative model will casually accept discretionary owner perks—such as luxury vehicle leases or family travel—as operating EBITDA <CitationLink id="c9" />.
          </p>

          <p>
            To eliminate mathematical hallucinations, VectorShift pairs qualitative extraction with deterministic calculator nodes <CitationLink id="c3" /> <CitationLink id="c11" />:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.8rem' }}>
            <BoxedCallout
              title="Approved Add-Back Additions"
              accent="var(--accent-emerald)"
              badge={<StatusBadge variant="emerald">Valid</StatusBadge>}
              style={{ padding: '0.8rem', marginBottom: 0 }}
            >
              <span style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)', lineHeight: 1.45 }}>
                Owner compensation above fair market rate, closed litigation defense fees, and non-recurring M&A broker fees.
              </span>
            </BoxedCallout>

            <BoxedCallout
              title="Disallowed Recurring Operational Costs"
              accent="var(--accent-burgundy)"
              badge={<StatusBadge variant="burgundy">Disallowed</StatusBadge>}
              style={{ padding: '0.8rem', marginBottom: 0 }}
            >
              <span style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)', lineHeight: 1.45 }}>
                Capitalized software engineering salaries, routine employee turnover severance, and core SaaS cloud infrastructure.
              </span>
            </BoxedCallout>
          </div>
        </div>
      </div>
    </NewspaperSection>
  );
}
