import { 
  VECTORSHIFT_MOAT_PILLARS, 
  TAXONOMY_MATRIX, 
  STRATEGIC_PLAYBOOK 
} from '../../data/competitorData';
import { NewspaperSection, GraphicCard, LedgerTable, BoxedCallout, StatusBadge } from '../../design-system';
import { CitationLink } from './CitationLink';
import { ActInquiryBox } from './ActInquiryBox';

export function BenchmarkStory() {
  const taxonomyColumns = [
    { key: 'dimension', label: 'Strategic Dimension', cellStyle: { fontWeight: 700, width: '22%' } },
    { key: 'categoryA', label: 'Category A: Agent Builders (LangChain, CrewAI, Mastra)', cellStyle: { fontSize: '0.74rem', color: 'var(--ink-secondary)', width: '26%' } },
    { key: 'categoryB', label: 'Category B: Vertical AI (Clay, Fin, Gong, Sierra, Harvey)', cellStyle: { fontSize: '0.74rem', color: 'var(--ink-secondary)', width: '26%' } },
    { 
      key: 'vectorShift', 
      label: 'VectorShift: Best of Both Worlds', 
      cellStyle: { 
        fontSize: '0.76rem', 
        fontWeight: 700, 
        color: 'var(--accent-burgundy)', 
        background: 'rgba(185, 28, 28, 0.03)',
        width: '26%'
      } 
    }
  ];

  return (
    <NewspaperSection
      id="competitors"
      kicker="SECTION IV &middot; STRATEGIC AUDIT &amp; COMPETITIVE INTELLIGENCE (BONUS)"
      byline="HORIZONTAL BUILDERS &middot; OPINIONATED VERTICAL AI &middot; THE DUAL-SURFACE PALANTIR MODEL"
      headline="The strategic playbook: Bridging horizontal agent builders and opinionated vertical AI"
    >
      {/* ACT 4: The Central Inquiry & My Opinionated Verdict */}
      <ActInquiryBox
        actNumber={4}
        inquiryLabel="THE COMPETITIVE MOAT (BONUS TEARDOWN)"
        question="How does VectorShift defend its market territory against horizontal agent builders (LangChain, CrewAI, Mastra) versus opinionated vertical AI (Clay, Fin, Gong, Sierra, Harvey)?"
        opinion={
          <>
            VectorShift wins by being the <strong>best of both worlds</strong> through its <strong>dual modes</strong>: the composable power of an AI agent builder for operators paired with the opinionated, white-label packaging of vertical AI for business consumers. By pairing this dual-surface product with the <strong>Palantir forward-deployed services model</strong> and <strong>Grok-like rapid iteration speed</strong>, VectorShift bridges the fatal gap between raw developer code and rigid vertical SaaS.
          </>
        }
      />

      {/* Top Editorial Narrative & 2 Categories Grid */}
      <div className="story-grid-2col" style={{ marginBottom: '1.8rem' }}>
        {/* Left Graphic: The Two Extremes */}
        <GraphicCard
          figureNumber="FIG. 6"
          figureTitle="THE TWO CATEGORIES OF COMPETITION"
          caption="The structural trade-off between open code composability and opinionated client packaging."
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {/* Category A Card */}
            <div style={{ background: 'var(--paper-surface-alt)', border: '1px solid var(--ink-rule-subtle)', borderRadius: '4px', padding: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 800, color: 'var(--ink-primary)', textTransform: 'uppercase' }}>
                  CATEGORY A: AGENT BUILDERS
                </span>
                <StatusBadge variant="navy">Builder-Only</StatusBadge>
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '0.3rem' }}>
                LangChain / LangGraph, CrewAI, Mastra, n8n, Dify
              </div>
              <div style={{ fontSize: '0.73rem', color: 'var(--ink-secondary)', lineHeight: 1.4, marginBottom: '0.4rem' }}>
                <strong>Strength:</strong> Arbitrary code composability and open-ended DAGs.
              </div>
              <div style={{ fontSize: '0.73rem', color: 'var(--accent-burgundy)', lineHeight: 1.4, background: 'rgba(185, 28, 28, 0.05)', padding: '0.4rem', borderRadius: '2px' }}>
                <strong>Fatal Flaw (Terminal Trap):</strong> Zero client packaging layer. You cannot email a LangGraph state graph or terminal CLI to a private equity Managing Director.
              </div>
            </div>

            {/* Category B Card */}
            <div style={{ background: 'var(--paper-surface-alt)', border: '1px solid var(--ink-rule-subtle)', borderRadius: '4px', padding: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 800, color: 'var(--ink-primary)', textTransform: 'uppercase' }}>
                  CATEGORY B: OPINIONATED VERTICAL AI
                </span>
                <StatusBadge variant="emerald">Consumer-Only</StatusBadge>
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '0.3rem' }}>
                Clay, Intercom Fin, Gong, Sierra, Harvey
              </div>
              <div style={{ fontSize: '0.73rem', color: 'var(--ink-secondary)', lineHeight: 1.4, marginBottom: '0.4rem' }}>
                <strong>Strength:</strong> Flawless domain-native UI and instant time-to-value.
              </div>
              <div style={{ fontSize: '0.73rem', color: 'var(--accent-burgundy)', lineHeight: 1.4, background: 'rgba(185, 28, 28, 0.05)', padding: '0.4rem', borderRadius: '2px' }}>
                <strong>Fatal Flaw (Walled Garden Ceiling):</strong> Rigid, inflexible architectures. If an enterprise needs a custom EBITDA formula or internal ERP sync, there is no developer escape hatch.
              </div>
            </div>
          </div>
        </GraphicCard>

        {/* Right Drop Cap Editorial Text */}
        <div className="story-editorial-text">
          <p className="daily-drop-cap">
            The enterprise AI ecosystem is fractured between two opposite extremes. On one side stand the <strong>Horizontal AI Agent Builders</strong> (LangChain, CrewAI, Mastra, Dify)—developer frameworks boasting infinite Python composability, but crippled by what I call the <em>Terminal Trap</em>: they produce code scripts and JSON dumps that non-technical business partners cannot touch <CitationLink id="c5" />.
          </p>

          <p>
            On the opposing side stand the <strong>Opinionated Vertical AI Platforms</strong> (Clay for outbound enrichment, Intercom Fin for customer support, Harvey for legal workflows). They deliver polished, out-of-the-box business outcomes and outcome-based pricing <CitationLink id="c2" /> <CitationLink id="c3" />, but trap the customer in rigid walled gardens. The moment an investment committee requires custom accounting logic or private VPC compliance, the platform breaks down.
          </p>

          <p>
            VectorShift&rsquo;s strategic wedge is that it resolves this false dichotomy: it provides the <strong>best of both worlds</strong> through a dual-mode platform, merges deployment services with software via the <strong>Palantir forward-deployed model</strong>, and executes with <strong>Grok-like rapid iteration speed</strong>.
          </p>
        </div>
      </div>

      {/* THREE PILLARS OF VECTORSHIFT'S MOAT */}
      <div className="moat-pillars-block" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.8rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 800, color: 'var(--accent-burgundy)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            VECTORSHIFT&rsquo;S STRATEGIC SYNTHESIS: THREE PILLARS OF DEFENSIBILITY
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {VECTORSHIFT_MOAT_PILLARS.map(p => (
            <div 
              key={p.id}
              style={{
                background: 'var(--paper-surface-alt)',
                border: '1px solid var(--ink-rule-subtle)',
                borderTop: '3px solid var(--accent-burgundy)',
                borderRadius: '4px',
                padding: '1.1rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 800, color: 'var(--accent-burgundy)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                  {p.pillar}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '0.6rem' }}>
                  {p.subtitle}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', lineHeight: 1.5, marginBottom: '0.8rem' }}>
                  {p.description}
                </p>
              </div>

              <div style={{ background: 'var(--paper-bg)', border: '1px solid var(--ink-rule-subtle)', padding: '0.5rem 0.75rem', borderRadius: '3px', fontSize: '0.73rem', color: 'var(--ink-primary)', fontStyle: 'italic' }}>
                &ldquo;{p.operatorValue}&rdquo;
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMPREHENSIVE TAXONOMY LEDGER TABLE */}
      <div style={{ marginBottom: '1.5rem' }}>
        <GraphicCard
          figureNumber="FIG. 7"
          figureTitle="ARCHITECTURAL TAXONOMY &amp; ENTERPRISE POSITIONING MATRIX"
          caption="Systematic evaluation across target user duality, extensibility ceilings, packaging layers, and commercial models."
        >
          <LedgerTable columns={taxonomyColumns} data={TAXONOMY_MATRIX} compact style={{ margin: 0 }} />
        </GraphicCard>
      </div>

      {/* 4 Strategic Borrowing Boxes */}
      <div className="playbook-lessons-block">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.8rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 800, color: 'var(--accent-burgundy)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            OPERATIONAL PLAYBOOK: FOUR PROVEN LESSONS TO BORROW
          </span>
        </div>

        <div className="strategic-playbook-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {STRATEGIC_PLAYBOOK.map((item, idx) => (
            <BoxedCallout 
              key={idx} 
              badge={
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <StatusBadge variant="burgundy">Lesson #{idx + 1}</StatusBadge>
                  {item.source.toLowerCase().includes('clay') ? <CitationLink id="c2" /> : item.source.toLowerCase().includes('fin') ? <CitationLink id="c3" /> : <CitationLink id="c5" />}
                </div>
              }
              subtitle={`${item.source} · ${item.category}`}
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
      </div>
    </NewspaperSection>
  );
}
