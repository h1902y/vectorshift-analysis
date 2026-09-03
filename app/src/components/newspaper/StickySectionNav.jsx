import React, { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'lead', num: 'TOP', label: 'Lead Story' },
  { id: 'lifecycle', num: 'I', label: 'Lifecycle' },
  { id: 'cim', num: 'II', label: 'CIM DAG' },
  { id: 'roadmap', num: 'III', label: 'Roadmap' },
  { id: 'simulation', num: 'IV', label: 'Eval Bench' },
  { id: 'competitors', num: 'V', label: 'Teardown' },
  { id: 'research-archive', num: 'VI', label: 'Research & Evidence' },
  { id: 'specimen', num: 'VII', label: 'Specimen' }
];

export function StickySectionNav({ activeSection, onActiveSectionChange }) {
  const [isStuck, setIsStuck] = useState(false);

  // Smooth scroll handler invoked ONLY on user click with sticky offset compensation
  const scrollTo = (id) => {
    if (onActiveSectionChange) {
      onActiveSectionChange(id);
    }
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

  // Passive Scroll Spy: ONLY updates active highlight state without triggering scroll!
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // Detect when navbar is sticking past the masthead
          setIsStuck(scrollY > 160);

          // Determine currently visible section
          const triggerLine = scrollY + 120;

          for (let i = SECTIONS.length - 1; i >= 0; i--) {
            const el = document.getElementById(SECTIONS[i].id);
            if (el) {
              if (el.offsetTop <= triggerLine) {
                if (onActiveSectionChange && activeSection !== SECTIONS[i].id) {
                  onActiveSectionChange(SECTIONS[i].id);
                }
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial active calculation on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, onActiveSectionChange]);

  return (
    <nav 
      className={`sticky-sectional-nav ${isStuck ? 'sticky-sectional-nav--stuck' : ''}`}
      aria-label="Sectional Navigation"
    >
      <div className="sticky-sectional-track">
        {SECTIONS.map(s => {
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              type="button"
              className={`editorial-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => scrollTo(s.id)}
              aria-current={isActive ? 'true' : undefined}
            >
              <span className="editorial-tab-num">{s.num}</span>
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
