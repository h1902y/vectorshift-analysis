import React from 'react';
import { Globe, ArrowUp } from 'lucide-react';
import { EditorialDivider } from '../../design-system';
import { ProfileCard } from '../ProfileCard';

function GithubIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function EditorialFooter() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 65;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const directoryLinks = [
    { id: 'lead', num: 'TOP', label: 'The Forward-Deployed Thesis' },
    { id: 'lifecycle', num: 'I', label: 'Application Lifecycle & Moat' },
    { id: 'cim', num: 'II', label: 'Technical Blueprint & CIM DAG' },
    { id: 'roadmap', num: 'III', label: '5 Ranked Builder UX Interventions' },
    { id: 'simulation', num: 'IV', label: 'Working Simulation Test Bench' },
    { id: 'competitors', num: 'V', label: 'Comparative Intelligence Teardown' },
    { id: 'plates', num: 'VI', label: '43 Photographic Exploration Plates' },
    { id: 'specimen', num: 'VII', label: 'Living Design System Specimen' },
    { id: 'citations-gazette', num: 'VIII', label: 'Research Notes & Citations' }
  ];

  return (
    <footer className="editorial-footer-container">
      <EditorialDivider variant="ornament" symbol="❦" style={{ marginTop: 0, marginBottom: '2.5rem' }} />

      <div className="editorial-colophon-box">
        <div className="editorial-colophon-grid">
          {/* Column 1: Colophon & Candidate Identity */}
          <div className="colophon-col colophon-col--main">
            <h2 className="colophon-masthead-title">Analysis of VectorShift</h2>
            <div className="colophon-masthead-sub">
              Architectural Evaluation &amp; Field Blueprint for Private Markets
            </div>

            <p className="colophon-description">
              An independent platform teardown, persona model, and field roadmap for VectorShift. Prepared by <strong>Harshit Choudhary</strong> for the Product Manager (Platform) evaluation. All assertions verified against 292 Mintlify documentation pages, 227 marketing assets, 43 live builder exploration plates, and an end-to-end editorial design system.
            </p>

            {/* Candidate Connect Icons */}
            <div className="colophon-social-row">
              <a
                href="https://github.com/harshit-vibes"
                target="_blank"
                rel="noreferrer"
                className="colophon-social-btn"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={14} />
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/harshitkrishnachoudhary"
                target="_blank"
                rel="noreferrer"
                className="colophon-social-btn"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={14} />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://h1902y.com"
                target="_blank"
                rel="noreferrer"
                className="colophon-social-btn"
                title="Personal Website (h1902y.com)"
                aria-label="Personal Website"
              >
                <Globe size={14} />
                <span>Website</span>
              </a>
            </div>
          </div>

          {/* Column 2: Clickable Directory */}
          <div className="colophon-col colophon-col--directory">
            <div className="colophon-section-eyebrow">
              <span>&sect;</span> Publication Directory
            </div>
            <nav className="colophon-dir-list" aria-label="Footer Publication Directory">
              {directoryLinks.map(link => (
                <button
                  key={link.id}
                  type="button"
                  className="colophon-dir-link"
                  onClick={() => scrollTo(link.id)}
                >
                  <span className="colophon-dir-num">{link.num}</span>
                  <span className="colophon-dir-title">{link.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Column 3: Candidate Profile from h1902y */}
          <div className="colophon-col colophon-col--dossier">
            <div className="colophon-section-eyebrow">
              <span>&sect;</span> Candidate Architect
            </div>

            <ProfileCard />

            <button
              type="button"
              className="colophon-top-btn"
              onClick={scrollToTop}
              title="Return to the top of the broadsheet"
            >
              <ArrowUp size={13} />
              <span>Back to Top of Publication</span>
            </button>
          </div>
        </div>

        {/* Bottom Colophon Strip */}
        <div className="colophon-bottom-strip">
          <div className="colophon-copyright">
            &copy; 2026 Analysis of VectorShift &middot; Prepared by Harshit Choudhary
          </div>

          <div className="colophon-typesetting">
            Typeset in Playfair Display, Inter, Newsreader &amp; JetBrains Mono
          </div>
        </div>
      </div>
    </footer>
  );
}
