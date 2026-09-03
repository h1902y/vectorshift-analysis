import React from 'react';
import { Cpu, UserCheck, Lock, ArrowDown } from 'lucide-react';
import { NewspaperSection, GraphicCard, InlineCode, StatusBadge } from '../../design-system';
import { CitationLink } from './CitationLink';

export function FrontPageStory() {
  return (
    <NewspaperSection
      id="lead"
      kicker="TOP STORY &middot; THE STRATEGIC THESIS (TASK 2)"
      headline="The Forward-Deployed Operator: Why Private Equity cannot buy consumer chatbots"
    >
      <div className="story-grid-2col">
        {/* Left Graphic Box: Persona Triangulation */}
        <GraphicCard
          figureNumber="FIG. 1"
          figureTitle="THE PERSONA TRIANGULATION MODEL"
          caption="Architectural Duality: The Operator assembles the neural DAG engine; the deal executive consumes audit-grade output."
        >
          <div className="persona-model-container">
            {/* SURFACE 01: BUILDER PLATFORM */}
            <div className="persona-tier-card persona-tier-card--builder">
              <div className="persona-tier-header">
                <div className="persona-tier-eyebrow">
                  <Cpu size={12} className="persona-tier-icon" />
                  <span>SURFACE 01 &middot; BUILDER PLATFORM</span>
                </div>
                <StatusBadge variant="burgundy" dot>Primary ICP</StatusBadge>
              </div>

              <h4 className="persona-tier-title">The Forward-Deployed Operator</h4>
              <div className="persona-tier-role">Solutions Architect &middot; AI Engineering Lead</div>

              <div className="persona-spec-tags">
                <span className="persona-spec-tag">Visual DAG Studio</span>
                <span className="persona-spec-tag">Python SDK</span>
                <span className="persona-spec-tag">Regex Schemas</span>
              </div>

              <p className="persona-tier-desc">
                Constructs multi-node extraction graphs, configures custom embeddings, and ships white-label deal rooms in days.
              </p>
            </div>

            {/* HAND-OFF GATEWAY */}
            <div className="persona-bridge-connector">
              <div className="persona-bridge-line"></div>
              <div className="persona-bridge-pill">
                <Lock size={11} />
                <span>PACKAGING LAYER: <code className="persona-bridge-code">portal.pe-firm.com</code></span>
                <ArrowDown size={11} />
              </div>
              <div className="persona-bridge-line"></div>
            </div>

            {/* SURFACE 02: CONSUMPTION INTERFACE */}
            <div className="persona-tier-card persona-tier-card--consumer">
              <div className="persona-tier-header">
                <div className="persona-tier-eyebrow">
                  <UserCheck size={12} className="persona-tier-icon" />
                  <span>SURFACE 02 &middot; DEAL INTERFACE</span>
                </div>
                <StatusBadge variant="emerald" dot>End-User</StatusBadge>
              </div>

              <h4 className="persona-tier-title">The Managing Director</h4>
              <div className="persona-tier-role">Private Equity Partner &middot; Investment Committee</div>

              <div className="persona-spec-tags">
                <span className="persona-spec-tag">1-Page Tear Sheets</span>
                <span className="persona-spec-tag">Zero Node Wiring</span>
                <span className="persona-spec-tag">Audit Provenance</span>
              </div>

              <p className="persona-tier-desc">
                Interacts through locked-down executive forms with SSO. Consumes audit-grade citations without touching graph topology.
              </p>
            </div>
          </div>
        </GraphicCard>

        {/* Right Editorial Text with Burgundy Drop Cap */}
        <div className="story-editorial-text">
          <p className="daily-drop-cap">
            In private equity and corporate diligence, you might think an enterprise chatbot is the answer for accelerating deal velocity, but often, it is a sign you are fighting the realities of high finance. A Managing Director evaluating a seventy-million-dollar buyout will never configure an embedding dimension, wire a <InlineCode>Merge / Pick First</InlineCode> node, or tune a <InlineCode>voyageai/voyage-4-lite</InlineCode> threshold <CitationLink id="c12" />. Expecting them to do so guarantees catastrophic platform churn.
          </p>

          <p>
            Understanding where the true builder sits is crucial. By relying on the <strong>Forward-Deployed AI Operator</strong>—whether an internal Solutions Architect, an enterprise AI Lead, or an automation consultant—enterprises unlock maximum leverage. This operator is technical enough to write Python transformations and regex validation schemas, but needs the ten-times speed of VectorShift's visual DAG to deconstruct messy document dossiers in days rather than quarters <CitationLink id="c5" />.
          </p>

          <p>
            Most critically, VectorShift provides the <strong>packaging layer</strong> that pure developer libraries like LangGraph lack <CitationLink id="c5" />. With a single click, an operator publishes a locked-down, branded white-label portal (<InlineCode>portal.firm.com</InlineCode>) with SSO and RBAC. The deal team receives an intuitive web form, while the operator retains full governance over the underlying neural engine.
          </p>

          <p>
            This separation of surfaces ensures VectorShift remains fast by default for builders, while delivering audit-grade, hallucination-free intelligence to the partnership <CitationLink id="c3" /> <CitationLink id="c11" />.
          </p>
        </div>
      </div>
    </NewspaperSection>
  );
}
