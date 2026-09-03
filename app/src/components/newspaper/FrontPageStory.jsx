import React from 'react';
import { PERSONA_TRIANGULATION } from '../../data/assessmentData';
import { NewspaperSection, GraphicCard, InlineCode } from '../../design-system';

export function FrontPageStory() {
  const { anchorICP, excludedPersonas } = PERSONA_TRIANGULATION;

  return (
    <NewspaperSection
      id="lead"
      kicker="TOP STORY &middot; THE STRATEGIC THESIS (TASK 2)"
      byline={
        <>
          BY <strong>HARSHIT KRISHNA CHOUDHARY</strong> &middot; CANDIDATE FOR PRODUCT MANAGER (PLATFORM) &middot; <a href="#lead">DISCUSS &rsaquo;</a> &middot; &#9432;
        </>
      }
      headline="The Forward-Deployed Operator: Why Private Equity cannot buy consumer chatbots"
    >
      <div className="story-grid-2col">
        {/* Left Graphic Box */}
        <GraphicCard
          figureNumber="FIG. 1"
          figureTitle="THE PERSONA TRIANGULATION MODEL"
          caption="Architectural Duality: The Operator assembles the engine; the executive consumes the output."
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {/* Anchor Box */}
            <div style={{ background: 'var(--paper-bg)', borderLeft: '4px solid var(--accent-burgundy)', padding: '0.6rem 0.8rem', borderRadius: '2px', border: '1px solid var(--ink-rule-subtle)' }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-burgundy)', textTransform: 'uppercase' }}>
                Anchor ICP: The Forward-Deployed Operator
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ink-secondary)', marginTop: '0.2rem' }}>
                Builds on Visual DAG + Python SDK &middot; Ships White-Label Portals to Deal Teams.
              </div>
            </div>

            {/* Hand-off Indicator */}
            <div style={{ textAlign: 'center', color: 'var(--ink-muted)', fontSize: '0.7rem', fontWeight: 700 }}>
              &darr; Packaging Layer Hand-Off (portal.firm.com)
            </div>

            {/* End-User Box */}
            <div style={{ background: 'var(--paper-bg)', borderLeft: '4px solid var(--accent-emerald)', padding: '0.6rem 0.8rem', borderRadius: '2px', border: '1px solid var(--ink-rule-subtle)' }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-emerald)', textTransform: 'uppercase' }}>
                End-User View: The Managing Director
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ink-secondary)', marginTop: '0.2rem' }}>
                Consumes 1-Page Tear Sheets &middot; Zero Node Wiring &middot; Audit-Grade Citations.
              </div>
            </div>
          </div>
        </GraphicCard>

        {/* Right Editorial Text with Burgundy Drop Cap */}
        <div className="story-editorial-text">
          <p className="daily-drop-cap">
            In private equity and corporate diligence, you might think an enterprise chatbot is the answer for accelerating deal velocity, but often, it is a sign you are fighting the realities of high finance. A Managing Director evaluating a seventy-million-dollar buyout will never configure an embedding dimension, wire a <InlineCode>Merge / Pick First</InlineCode> node, or tune a <InlineCode>voyageai/voyage-4-lite</InlineCode> threshold. Expecting them to do so guarantees catastrophic platform churn.
          </p>

          <p>
            Understanding where the true builder sits is crucial. By relying on the <strong>Forward-Deployed AI Operator</strong>—whether an internal Solutions Architect, an enterprise AI Lead, or an automation consultant—enterprises unlock maximum leverage. This operator is technical enough to write Python transformations and regex validation schemas, but needs the ten-times speed of VectorShift's visual DAG to deconstruct messy document dossiers in days rather than quarters.
          </p>

          <p>
            Most critically, VectorShift provides the <strong>packaging layer</strong> that pure developer libraries like LangGraph lack. With a single click, an operator publishes a locked-down, branded white-label portal (<InlineCode>portal.firm.com</InlineCode>) with SSO and RBAC. The deal team receives an intuitive web form, while the operator retains full governance over the underlying neural engine.
          </p>

          <p>
            This separation of surfaces ensures VectorShift remains fast by default for builders, while delivering audit-grade, hallucination-free intelligence to the partnership.
          </p>
        </div>
      </div>
    </NewspaperSection>
  );
}
