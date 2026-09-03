import React from 'react';

export function JumpBar() {
  const sections = [
    { id: 'lead', label: 'Front Page' },
    { id: 'lifecycle', label: 'I. App Lifecycle' },
    { id: 'cim', label: 'II. CIM Blueprint' },
    { id: 'roadmap', label: 'III. 5 Improvements' },
    { id: 'simulation', label: 'IV. Simulation Studio' },
    { id: 'research-archive', label: 'VI. Research & Evidence' }
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="newspaper-jumpbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-crimson)', letterSpacing: '0.1em' }}>
          Broadsheet Index ➔
        </span>
      </div>

      <nav className="jumpbar-links">
        {sections.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollTo(s.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.74rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--ink-secondary)',
              padding: '0.2rem 0.4rem',
              transition: 'color 0.15s ease'
            }}
            onMouseEnter={e => e.target.style.color = 'var(--accent-crimson)'}
            onMouseLeave={e => e.target.style.color = 'var(--ink-secondary)'}
          >
            {s.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
