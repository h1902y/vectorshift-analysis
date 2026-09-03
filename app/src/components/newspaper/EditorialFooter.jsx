import React from 'react';

export function EditorialFooter() {
  return (
    <footer className="diff-footer">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div style={{ maxWidth: '600px' }}>
          <strong style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--ink-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            The VectorShift Diff &middot; Assessment Colophon
          </strong>
          <p style={{ color: 'var(--ink-secondary)', fontSize: '0.86rem', marginTop: '0.4rem', lineHeight: 1.5 }}>
            An independent platform teardown, persona model, and field roadmap for VectorShift. Prepared by <strong>Harshit Krishna Choudhary</strong> for the Product Manager (Platform) evaluation. All assertions verified against 292 Mintlify documentation pages, 227 marketing assets, and 43 live builder exploration plates.
          </p>
        </div>

        <div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-muted)', marginBottom: '0.4rem' }}>
            Candidate Deliverables
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span>Tasks 1 &amp; 2 &middot; Persona &amp; Lifecycle</span>
            <span>Task 3 &middot; CIM Deconstructor</span>
            <span>Task 4 &middot; 5 Builder UX Interventions</span>
            <span>Task 5 &middot; Simulation Bench Prototype</span>
            <span>Bonus &middot; Clay &amp; Fin Teardown</span>
          </div>
        </div>
      </div>

      <div className="diff-footer-links">
        <span>&copy; 2026 The VectorShift Diff</span>
        <span>&bull;</span>
        <span>New York &amp; San Francisco</span>
        <span>&bull;</span>
        <span>Typeset in Playfair, Inter &amp; Newsreader</span>
      </div>
    </footer>
  );
}
