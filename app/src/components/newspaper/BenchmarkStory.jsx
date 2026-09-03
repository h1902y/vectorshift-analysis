import React from 'react';
import { STRATEGIC_PLAYBOOK } from '../../data/competitorData';
import { NewspaperSection, GraphicCard, LedgerTable, BoxedCallout, StatusBadge } from '../../design-system';
import { CitationLink } from './CitationLink';

export function BenchmarkStory() {
  const competitorColumns = [
    { key: 'platform', label: 'Platform', cellStyle: { fontWeight: 700 } },
    { key: 'unit', label: 'Core Unit' },
    { 
      key: 'metric', 
      label: 'Value Metric',
      cellStyle: { fontWeight: 700, color: 'var(--accent-burgundy)' }
    }
  ];

  const paradigmsData = [
    { platform: 'VectorShift', unit: 'Pipeline Run', metric: 'Subscription + Credits' },
    { platform: 'Clay', unit: 'Row Record', metric: 'Credits per Match' },
    { platform: 'Intercom Fin', unit: 'Resolved Ticket', metric: '$0.99 / Resolution' }
  ];

  return (
    <NewspaperSection
      id="competitors"
      kicker="SECTION V &middot; STRATEGIC AUDIT &amp; COMPETITIVE INTELLIGENCE"
      byline="GTM WATERFALLS &middot; DETERMINISTIC PROCEDURES &middot; OUTCOME PRICING"
      headline="The strategic playbook: Deconstructing Clay, Intercom Fin &amp; Dify"
    >
      <div className="story-grid-2col" style={{ marginBottom: '1.8rem' }}>
        {/* Left Graphic: Comparative Ledger */}
        <GraphicCard
          figureNumber="FIG. 6"
          figureTitle="THREE VERTICAL VALUE PARADIGMS"
          caption="Pricing and operational alignment across modern enterprise agent platforms."
        >
          <LedgerTable columns={competitorColumns} data={paradigmsData} compact style={{ margin: 0 }} />
        </GraphicCard>

        {/* Right Drop Cap Editorial Text */}
        <div className="story-editorial-text">
          <p className="daily-drop-cap">
            Comparing VectorShift against the category kings of enterprise verticalization reveals critical playbook maneuvers. Clay dominates outbound sales by turning spreadsheet columns into enrichment waterfalls <CitationLink id="c2" />, while Intercom Fin dominates customer support by refusing to charge for tokens, instead aligning pricing directly with business outcomes at ninety-nine cents per resolved ticket <CitationLink id="c3" />.
          </p>

          <p>
            To establish dominance in private market knowledge operations, VectorShift must borrow four proven mechanisms from these platforms:
          </p>
        </div>
      </div>

      {/* 4 Strategic Borrowing Boxes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {STRATEGIC_PLAYBOOK.map((item, idx) => (
          <BoxedCallout 
            key={idx} 
            badge={
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <StatusBadge variant="burgundy">Lesson #{idx + 1}</StatusBadge>
                {item.source.toLowerCase().includes('clay') ? <CitationLink id="c2" /> : item.source.toLowerCase().includes('fin') ? <CitationLink id="c3" /> : <CitationLink id="c5" />}
              </div>
            }
            subtitle={item.source}
            style={{ marginBottom: 0 }}
          >
            <strong style={{ fontSize: '0.94rem', color: 'var(--ink-primary)', display: 'block', marginBottom: '0.4rem', lineHeight: 1.3 }}>
              {item.lesson}
            </strong>
            <p style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>
              {item.description}
            </p>
          </BoxedCallout>
        ))}
      </div>
    </NewspaperSection>
  );
}
