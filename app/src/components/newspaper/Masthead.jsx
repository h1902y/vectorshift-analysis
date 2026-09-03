import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../../design-system';

export function Masthead({ theme, toggleTheme, activeSection, onSelectSection }) {
  const sections = [
    { id: 'lead', label: 'Top Story' },
    { id: 'lifecycle', label: 'I. Lifecycle' },
    { id: 'cim', label: 'II. CIM Blueprint' },
    { id: 'roadmap', label: 'III. 5 Improvements' },
    { id: 'simulation', label: 'IV. Simulation Lab' },
    { id: 'competitors', label: 'V. Clay & Fin Audit' },
    { id: 'plates', label: 'VI. 43 Plates' },
    { id: 'specimen', label: 'VII. Style Specimen' }
  ];

  const scrollTo = (id) => {
    onSelectSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header style={{ marginBottom: '2rem' }}>
      {/* Top Metadata Navigation (Exact Daily Diff Sub-Bar) */}
      <div className="masthead-sub-bar">
        <div>
          <span>&larr; ASSESSMENT &middot; </span>
          <a href="https://vectorshift.ai" target="_blank" rel="noreferrer">vectorshift.ai</a>
        </div>

        <div className="masthead-center-date">
          &lsaquo; THURSDAY, SEPTEMBER 3, 2026 &rsaquo;
        </div>

        <div className="masthead-right-actions">
          <span>7 SECTIONS &middot; 43 PLATES &middot; DESIGN SPECIMEN</span>
          <Button
            variant="icon"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Morning Edition (Warm Newsprint)' : 'Switch to Evening Edition (Dark Broadsheet)'}
            icon={theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          />
        </div>
      </div>

      {/* The Daily Diff Main Title */}
      <h1 className="masthead-main-title">The VectorShift Diff</h1>
      <div className="masthead-sub-motto">
        Architectural Evaluation & Field Blueprint for Private Markets
      </div>

      {/* The Double Rule */}
      <div className="masthead-double-rule"></div>

      {/* Filter / Category Pills Control Bar */}
      <div className="pills-control-bar">
        <div className="pills-group">
          <span className="pills-group-label">Section:</span>
          {sections.map(s => (
            <Button
              key={s.id}
              variant="pill"
              active={activeSection === s.id}
              onClick={() => scrollTo(s.id)}
            >
              {s.label}
            </Button>
          ))}
        </div>

        <div className="pills-group">
          <span className="pills-group-label">Signal:</span>
          <Button variant="pill" active>ALL</Button>
          <Button variant="pill">RECOMMENDED</Button>
          <Button variant="pill">MUST-READ</Button>
        </div>
      </div>
    </header>
  );
}
