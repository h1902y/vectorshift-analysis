import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../../design-system';

export function Masthead({ theme, toggleTheme, activeSection, onSelectSection }) {
  const [signal, setSignal] = useState('all');

  const sections = [
    { id: 'lead', num: 'TOP', label: 'Lead Story', type: 'executive' },
    { id: 'lifecycle', num: 'I', label: 'Lifecycle', type: 'executive' },
    { id: 'cim', num: 'II', label: 'CIM DAG', type: 'technical' },
    { id: 'roadmap', num: 'III', label: 'Roadmap', type: 'executive' },
    { id: 'simulation', num: 'IV', label: 'Eval Bench', type: 'technical' },
    { id: 'competitors', num: 'V', label: 'Teardown', type: 'executive' },
    { id: 'plates', num: 'VI', label: 'Plates (43)', type: 'technical' },
    { id: 'specimen', num: 'VII', label: 'Specimen', type: 'technical' }
  ];

  const scrollTo = (id) => {
    onSelectSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header style={{ marginBottom: '2.5rem' }}>
      {/* Top Metadata Navigation */}
      <div className="masthead-sub-bar">
        <div>
          <span>BY <strong>HARSHIT KRISHNA CHOUDHARY</strong> &middot; </span>
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

      {/* The Main Title */}
      <h1 className="masthead-main-title">Analysis of VectorShift</h1>
      
      {/* Prominent Author Byline & Date Bar */}
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.76rem',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        textAlign: 'center',
        color: 'var(--accent-burgundy)',
        margin: '0.35rem 0 0.25rem 0'
      }}>
        By Harshit Krishna Choudhary &middot; Thursday, September 3, 2026 &middot; Platform Product Manager Assessment
      </div>

      <div className="masthead-sub-motto">
        Architectural Evaluation &amp; Field Blueprint for Private Markets
      </div>

      {/* The Double Rule */}
      <div className="masthead-double-rule"></div>

      {/* Broadsheet Editorial Navigation Bar (Zero-Wrap Disciplined Index) */}
      <nav className="editorial-nav-bar" aria-label="Broadsheet Department Index">
        <div className="editorial-nav-sections">
          <span className="editorial-nav-label">
            <span>&sect;</span> DEPARTMENTS:
          </span>
          {sections.map(s => {
            const isHighlighted = signal === 'all' || s.type === signal;
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                type="button"
                className={`editorial-tab-btn ${isActive ? 'active' : ''}`}
                style={{
                  opacity: isHighlighted ? 1 : 0.45,
                  transform: isActive ? 'translateY(-1px)' : 'none'
                }}
                onClick={() => scrollTo(s.id)}
              >
                <span className="editorial-tab-num">{s.num}</span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        <div className="editorial-signal-group">
          <span className="editorial-signal-label">SIGNAL:</span>
          <div className="editorial-segmented-control" role="group" aria-label="Filter sections by signal">
            <button
              type="button"
              className={`editorial-segment-btn ${signal === 'all' ? 'active' : ''}`}
              onClick={() => setSignal('all')}
              title="Show all broadsheet sections"
            >
              ALL
            </button>
            <button
              type="button"
              className={`editorial-segment-btn ${signal === 'executive' ? 'active' : ''}`}
              onClick={() => setSignal('executive')}
              title="Highlight Executive Core sections"
            >
              CORE
            </button>
            <button
              type="button"
              className={`editorial-segment-btn ${signal === 'technical' ? 'active' : ''}`}
              onClick={() => setSignal('technical')}
              title="Highlight Technical Deep-Dive sections"
            >
              DEEP-DIVE
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
