import React from 'react';
import { LIFECYCLE_STAGES, PRIVATE_MARKET_MOAT } from '../../data/assessmentData';
import { NewspaperSection, GraphicCard, LedgerTable, BoxedCallout } from '../../design-system';

export function LifecycleStory() {
  const moatColumns = [
    { key: 'pillar', label: 'Moat Pillar', cellStyle: { fontWeight: 700 } },
    { 
      key: 'metric', 
      label: 'Audit Standard',
      cellStyle: { fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-burgundy)', fontWeight: 700 }
    }
  ];

  return (
    <NewspaperSection
      id="lifecycle"
      kicker="SECTION I &middot; AGENTIC APPLICATION LIFECYCLE (TASKS 1 & 2)"
      byline="PLATFORM AUDIT &middot; FIELD GOVERNANCE &middot; ARCHITECTURAL DISPATCH"
      headline="Beyond prompt engineering: The three pillars of the agentic application lifecycle"
    >
      <div className="story-grid-2col">
        {/* Left Graphic: Moat Table */}
        <GraphicCard
          figureNumber="FIG. 2"
          figureTitle="PRIVATE MARKET AUDIT STANDARDS"
          caption="Non-negotiable verification benchmarks in private buyout transactions."
        >
          <LedgerTable columns={moatColumns} data={PRIVATE_MARKET_MOAT} style={{ margin: 0 }} />
        </GraphicCard>

        {/* Right Drop Cap Editorial Text */}
        <div className="story-editorial-text">
          <p className="daily-drop-cap">
            Moving beyond isolated prompt composition, the true operational bottleneck in enterprise AI is lifecycle governance. Forward-deployed operators do not maintain static chatbot drawers; they maintain mission-critical pipelines that ingest shifting corporate data rooms, interface with external APIs, and execute high-stakes logic where mathematical inaccuracies are intolerable.
          </p>

          <p>
            To establish durable defensibility against commoditized AI wrappers, VectorShift must organize the builder around three non-overlapping lifecycle disciplines:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
            {LIFECYCLE_STAGES.map((s, i) => (
              <BoxedCallout
                key={s.id}
                title={`Stage 0${i + 1} &middot; ${s.name}`}
                style={{ padding: '0.8rem 1rem', marginBottom: 0 }}
              >
                <div style={{ fontSize: '0.82rem', color: 'var(--ink-secondary)' }}>
                  {s.description}
                </div>
              </BoxedCallout>
            ))}
          </div>
        </div>
      </div>
    </NewspaperSection>
  );
}
