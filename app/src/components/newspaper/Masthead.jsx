import React from 'react';
import { Moon, Sun } from 'lucide-react';

export function Masthead({ theme, toggleTheme, activeSection, onSelectSection }) {
  const sections = [
    { id: 'lead', label: 'Top Story' },
    { id: 'lifecycle', label: 'I. Lifecycle' },
    { id: 'cim', label: 'II. CIM Blueprint' },
    { id: 'roadmap', label: 'III. 5 Improvements' },
    { id: 'simulation', label: 'IV. Simulation Lab' },
    { id: 'competitors', label: 'V. Clay & Fin Audit' },
    { id: 'plates', label: 'VI. 43 Plates' }
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
          <span>6 SECTIONS &middot; 43 PLATES</span>
          <button 
            onClick={toggleTheme}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-secondary)', display: 'flex', alignItems: 'center' }}
            title="Toggle Evening/Morning Edition"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
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
            <button
              key={s.id}
              className={`pill-btn ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => scrollTo(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="pills-group">
          <span className="pills-group-label">Signal:</span>
          <button className="pill-btn active">ALL</button>
          <button className="pill-btn">RECOMMENDED</button>
          <button className="pill-btn">MUST-READ</button>
        </div>
      </div>
    </header>
  );
}
