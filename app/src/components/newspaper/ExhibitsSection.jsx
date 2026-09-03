import React, { useState } from 'react';
import { SCREENSHOTS_CATALOG } from '../../data/screenshotsData';
import { X, ZoomIn } from 'lucide-react';
import { NewspaperSection, Pill } from '../../design-system';

export function ExhibitsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedExhibit, setSelectedExhibit] = useState(null);

  const categories = [
    { id: 'all', label: 'All Plates', count: 43 },
    { id: 'knowledge', label: 'Knowledge & RAG', count: 18 },
    { id: 'tables', label: 'Tables Module', count: 10 },
    { id: 'projects', label: 'Projects & Agents', count: 8 },
    { id: 'skills', label: 'Skills Architecture', count: 5 },
    { id: 'analytics', label: 'Analytics & Tracing', count: 2 },
  ];

  const filtered = SCREENSHOTS_CATALOG.filter(s => activeCategory === 'all' || s.cat === activeCategory);

  return (
    <NewspaperSection
      id="plates"
      kicker="SECTION VI &middot; FIELD EVIDENCE (TASK 1)"
      byline="FORTY-THREE EXPLORATION PLATES &middot; LIVE PLATFORM AUDIT &middot; RETRIEVAL INSPECTION"
      headline="Field evidence: Forty-three photographic plates of the live builder platform"
      isLast={true}
    >
      {/* Filter Category Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {categories.map(c => (
          <Pill
            key={c.id}
            active={activeCategory === c.id}
            onClick={() => setActiveCategory(c.id)}
          >
            {c.label} ({c.count})
          </Pill>
        ))}
      </div>

      {/* Grid of Plates */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
        {filtered.map(item => (
          <div
            key={item.id}
            className="plate-card"
            onClick={() => setSelectedExhibit(item)}
          >
            <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--paper-bg)' }}>
              <img
                src={`/screenshots/${item.name}`}
                alt={item.title}
                loading="lazy"
              />
              <div style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                background: 'rgba(0, 0, 0, 0.75)',
                color: '#ffffff',
                fontSize: '0.62rem',
                fontFamily: 'var(--font-sans)',
                padding: '0.15rem 0.35rem',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem'
              }}>
                <ZoomIn size={10} /> Plate #{item.id}
              </div>
            </div>

            <div className="plate-caption">
              <strong style={{ display: 'block', color: 'var(--ink-primary)', fontSize: '0.82rem' }}>
                {item.title}
              </strong>
              <span style={{ display: 'block', color: 'var(--ink-muted)', fontSize: '0.72rem', marginTop: '0.2rem' }}>
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedExhibit && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(6px)',
            zIndex: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
          onClick={() => setSelectedExhibit(null)}
        >
          <div
            style={{
              background: 'var(--paper-bg)',
              border: '2px solid var(--ink-rule-subtle)',
              borderRadius: '4px',
              maxWidth: '920px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '1.5rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--ink-rule-subtle)', paddingBottom: '0.6rem', marginBottom: '0.8rem' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-burgundy)' }}>
                  Photographic Plate #{selectedExhibit.id} &middot; Category: {selectedExhibit.cat.toUpperCase()}
                </span>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--ink-primary)', marginTop: '0.2rem' }}>
                  {selectedExhibit.title}
                </h3>
              </div>
              <button
                style={{ background: 'none', border: 'none', color: 'var(--ink-primary)', cursor: 'pointer' }}
                onClick={() => setSelectedExhibit(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                src={`/screenshots/${selectedExhibit.name}`}
                alt={selectedExhibit.title}
                style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain', border: '1px solid var(--ink-rule-subtle)', borderRadius: '3px' }}
              />
              <p style={{ marginTop: '0.8rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--ink-secondary)', maxWidth: '680px', lineHeight: 1.45 }}>
                {selectedExhibit.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </NewspaperSection>
  );
}
