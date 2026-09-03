import React, { useState } from 'react';
import { IMPROVEMENTS_DATA } from '../../data/improvementsData';
import { NewspaperSection, GraphicCard, LedgerTable, AccordionCard, StatusBadge } from '../../design-system';

export function RoadmapStory() {
  const [expandedId, setExpandedId] = useState('sim-eval-bench');

  const metricColumns = [
    { key: 'label', label: 'Target Metric', cellStyle: { fontWeight: 600 } },
    { key: 'before', label: 'Before', cellStyle: { fontFamily: 'var(--font-mono)' } },
    { 
      key: 'target', 
      label: 'Target',
      cellStyle: { fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-emerald)' }
    }
  ];

  const topMetricsData = [
    { label: 'Iteration Cycle Time', before: '48s', target: '12s (-75%)' },
    { label: 'Dev Token Consumption', before: '100%', target: '55% (-45%)' },
    { label: 'Pre-Flight Edge Catch', before: '~15%', target: '>=88%' },
    { label: '30-Day Creator Retention', before: 'Base', target: '+16% Lift' }
  ];

  return (
    <NewspaperSection
      id="roadmap"
      kicker="SECTION III &middot; FIELD PRIORITIZATION (TASK 4)"
      byline="BUILDER CANVAS AUDIT &middot; RANKED UX INTERVENTIONS &middot; VELOCITY ROADMAP"
      headline="Ranked roadmap: Five critical interventions for the builder canvas"
    >
      <div className="story-grid-2col" style={{ marginBottom: '2rem' }}>
        {/* Left Graphic: Top Metrics */}
        <GraphicCard
          figureNumber="FIG. 4"
          figureTitle="KEY VELOCITY GAINS (PRIORITY #1)"
          caption="Empirical before/after metrics from implementing local node caching and synthetic benchmarking."
        >
          <LedgerTable columns={metricColumns} data={topMetricsData} compact style={{ margin: 0 }} />
        </GraphicCard>

        {/* Right Drop Cap Editorial Text */}
        <div className="story-editorial-text">
          <p className="daily-drop-cap">
            Studying where forward-deployed builders lose time reveals that eighty percent of developer hours are expended debugging edge cases rather than connecting nodes. Forcing an operator to re-run an entire ten-node pipeline from scratch when a downstream prompt fails burns flow state and token capital.
          </p>

          <p>
            The five engineering interventions below are ranked strictly by enterprise retention leverage, prioritizing developer velocity, compile-time validation, and domain-native financial accuracy.
          </p>
        </div>
      </div>

      {/* 5 Ranked Interventions using AccordionCard */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {IMPROVEMENTS_DATA.map(item => {
          const isExpanded = expandedId === item.id;
          return (
            <AccordionCard
              key={item.id}
              title={item.title}
              badge={<StatusBadge variant="burgundy">Priority #{item.rank}</StatusBadge>}
              meta={<span>Pillar: <strong style={{ color: 'var(--ink-primary)' }}>{item.lifecyclePillar}</strong></span>}
              expanded={isExpanded}
              onToggle={() => setExpandedId(isExpanded ? null : item.id)}
            >
              <p style={{ color: 'var(--ink-secondary)', marginBottom: '0.6rem' }}>
                <strong>The Friction:</strong> {item.friction}
              </p>
              <p style={{ color: 'var(--ink-secondary)', marginBottom: '0.6rem' }}>
                <strong>Root Cause:</strong> {item.rootCause}
              </p>
              <p style={{ color: 'var(--ink-primary)', whiteSpace: 'pre-line' }}>
                <strong>The Engineering Solution:</strong> {item.solution}
              </p>
            </AccordionCard>
          );
        })}
      </div>
    </NewspaperSection>
  );
}
