import React, { useState } from 'react';
import { SCREENSHOTS_CATALOG } from '../../data/screenshotsData';
import { CITATIONS_DATA } from '../../data/citationsData';
import { ZoomIn, BookOpen, ArrowDown } from 'lucide-react';
import { NewspaperSection, Button, ModalDialog } from '../../design-system';
import { CitationLink } from './CitationLink';

// Intelligent mapping between exploration plates and research citations
function getPlateCitations(plate) {
  if (!plate) return ['c12'];
  // Specific high-leverage exploration plates
  if ([2, 3, 4].includes(plate.id)) return ['c1', 'c6', 'c12'];
  if ([19, 21, 22, 23, 25].includes(plate.id)) return ['c10', 'c11', 'c12'];
  if ([13, 14, 15, 16].includes(plate.id)) return ['c3', 'c10', 'c12'];
  if ([33, 34, 35, 37, 39, 40, 41].includes(plate.id)) return ['c2', 'c12'];
  if ([28, 29, 30, 31, 32].includes(plate.id)) return ['c9', 'c5', 'c12'];
  if ([6, 7, 17].includes(plate.id)) return ['c6', 'c10', 'c12'];
  if ([8, 9, 1].includes(plate.id)) return ['c5', 'c4', 'c12'];

  // Categorical defaults
  switch (plate.cat) {
    case 'knowledge': return ['c10', 'c11', 'c12'];
    case 'tables': return ['c2', 'c12'];
    case 'projects': return ['c1', 'c4', 'c12'];
    case 'skills': return ['c9', 'c5', 'c12'];
    case 'analytics': return ['c6', 'c10', 'c12'];
    default: return ['c12'];
  }
}

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

  const jumpToCitation = (citationId) => {
    const el = document.getElementById(`citation-${citationId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('citation-pulse-active');
      setTimeout(() => {
        el.classList.remove('citation-pulse-active');
      }, 2500);
    }
  };

  const jumpToFooterGazette = () => {
    const el = document.getElementById('citations-gazette');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filtered = SCREENSHOTS_CATALOG.filter(s => activeCategory === 'all' || s.cat === activeCategory);

  const modalCitations = selectedExhibit ? getPlateCitations(selectedExhibit).map(cId => 
    CITATIONS_DATA.find(c => c.id === cId)
  ).filter(Boolean) : [];

  return (
    <NewspaperSection
      id="plates"
      kicker="SECTION VI &middot; FIELD EVIDENCE (TASK 1)"
      byline="FORTY-THREE EXPLORATION PLATES &middot; LIVE PLATFORM AUDIT &middot; RETRIEVAL INSPECTION"
      headline="Field evidence: Forty-three photographic plates of the live builder platform"
    >
      {/* Intelligent Research Mapping Banner */}
      <div className="research-mapping-banner">
        <div className="research-mapping-info">
          <div className="research-mapping-kicker">
            <BookOpen size={13} style={{ color: 'var(--accent-burgundy)' }} />
            <span>INTELLIGENT EVIDENCE MAPPING &middot; REVERSE-INDEX TO RESEARCH FOOTER</span>
          </div>
          <p className="research-mapping-text">
            Every plate in this 43-screen archive provides empirical ground truth for my strategic recommendations. Select an evidence cluster below to jump directly to its verified explainer box in the Research Footer Gazette:
          </p>
        </div>

        <div className="research-mapping-actions">
          <button 
            type="button"
            onClick={() => jumpToCitation('c12')} 
            className="research-map-chip chip-audit"
            title="Jump to Section VIII: Platform Audit Dossier [C-12]"
          >
            <span>Audit Dossier [C-12]</span>
            <ArrowDown size={11} />
          </button>

          <button 
            type="button"
            onClick={() => jumpToCitation('c10')} 
            className="research-map-chip"
            title="Jump to Section VIII: RAG & Chunking Citations [C-10, C-11]"
          >
            <span>RAG &amp; Chunking [C-10, C-11]</span>
            <ArrowDown size={11} />
          </button>

          <button 
            type="button"
            onClick={() => jumpToCitation('c2')} 
            className="research-map-chip"
            title="Jump to Section VIII: Table Action Engine [C-02]"
          >
            <span>Table Workflows [C-02]</span>
            <ArrowDown size={11} />
          </button>

          <button 
            type="button"
            onClick={() => jumpToCitation('c1')} 
            className="research-map-chip"
            title="Jump to Section VIII: DAG Node REPL & Caching [C-01, C-04]"
          >
            <span>In-Canvas REPL [C-01, C-04]</span>
            <ArrowDown size={11} />
          </button>

          <button 
            type="button"
            onClick={() => jumpToCitation('c9')} 
            className="research-map-chip"
            title="Jump to Section VIII: Financial Math & Skills [C-09]"
          >
            <span>Finance Skills [C-09]</span>
            <ArrowDown size={11} />
          </button>

          <button 
            type="button"
            onClick={() => jumpToFooterGazette()} 
            className="research-map-chip chip-all"
            title="Jump to Section VIII: Research Citations Gazette"
          >
            <span>All 12 Citations in Footer &darr;</span>
          </button>
        </div>
      </div>

      {/* Filter Category Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {categories.map(c => (
          <Button
            key={c.id}
            variant="pill"
            active={activeCategory === c.id}
            onClick={() => setActiveCategory(c.id)}
          >
            {c.label} ({c.count})
          </Button>
        ))}
      </div>

      {/* Grid of Plates with Intelligent Citation Mapping */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.3rem' }}>
        {filtered.map(item => {
          const mappedCitations = getPlateCitations(item);
          return (
            <div
              key={item.id}
              className="plate-card"
              onClick={() => setSelectedExhibit(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setSelectedExhibit(item);
              }}
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
                <span style={{ display: 'block', color: 'var(--ink-muted)', fontSize: '0.72rem', marginTop: '0.2rem', marginBottom: '0.5rem' }}>
                  {item.desc}
                </span>

                {/* Intelligent Citation Mini-Row */}
                <div 
                  className="plate-citations-row"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="plate-citations-label">Research:</span>
                  <div style={{ display: 'inline-flex', gap: '3px' }}>
                    {mappedCitations.map(cId => (
                      <CitationLink key={cId} id={cId} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Accessible Broadsheet Modal Primitive with Research Mapping */}
      <ModalDialog
        isOpen={Boolean(selectedExhibit)}
        onClose={() => setSelectedExhibit(null)}
        title={selectedExhibit?.title || ''}
        subtitle={selectedExhibit ? `Photographic Plate #${selectedExhibit.id} · Category: ${selectedExhibit.cat.toUpperCase()}` : ''}
      >
        {selectedExhibit && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={`/screenshots/${selectedExhibit.name}`}
              alt={selectedExhibit.title}
              style={{ maxWidth: '100%', maxHeight: '55vh', objectFit: 'contain', border: '1px solid var(--ink-rule-subtle)', borderRadius: '3px' }}
            />
            <p style={{ marginTop: '0.9rem', textAlign: 'center', fontSize: '0.86rem', color: 'var(--ink-secondary)', maxWidth: '680px', lineHeight: 1.5 }}>
              {selectedExhibit.desc}
            </p>

            {/* Modal Research Mapping Section */}
            <div className="modal-research-mapping-box">
              <div className="modal-research-header">
                <BookOpen size={14} style={{ color: 'var(--accent-burgundy)' }} />
                <span>Mapped Empirical Research &amp; Footer Explainer Boxes</span>
              </div>
              <p className="modal-research-desc">
                This exploration plate provides empirical ground truth for the following research citations in the footer:
              </p>

              <div className="modal-research-list">
                {modalCitations.map(citation => (
                  <div key={citation.id} className="modal-research-item">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="citation-badge-mono">[{citation.badge}]</span>
                        <strong style={{ fontSize: '0.84rem', color: 'var(--ink-primary)' }}>
                          {citation.title}
                        </strong>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedExhibit(null);
                          jumpToCitation(citation.id);
                        }}
                        className="modal-research-jump-btn"
                        title={`Jump to ${citation.badge} in Research Footer`}
                      >
                        <span>Inspect Explainer Box</span>
                        <ArrowDown size={11} />
                      </button>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--ink-muted)', marginTop: '0.2rem', fontStyle: 'italic' }}>
                      {citation.source}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </ModalDialog>
    </NewspaperSection>
  );
}
