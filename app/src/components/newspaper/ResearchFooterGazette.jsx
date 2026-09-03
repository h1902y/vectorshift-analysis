import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  BookOpen, 
  MessageSquare, 
  Layout, 
  CheckCircle, 
  Search, 
  ArrowUp, 
  ZoomIn, 
  Camera, 
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { CITATIONS_DATA } from '../../data/citationsData';
import { SCREENSHOTS_CATALOG } from '../../data/screenshotsData';
import { ModalDialog } from '../../design-system';

const PLATES_PER_PAGE = 12;

// Intelligent mapping between exploration plates and research citations
function getPlateCitations(plate) {
  if (!plate) return ['c12'];
  if ([2, 3, 4].includes(plate.id)) return ['c1', 'c6', 'c12'];
  if ([19, 21, 22, 23, 25].includes(plate.id)) return ['c10', 'c11', 'c12'];
  if ([13, 14, 15, 16].includes(plate.id)) return ['c3', 'c10', 'c12'];
  if ([33, 34, 35, 37, 39, 40, 41].includes(plate.id)) return ['c2', 'c12'];
  if ([28, 29, 30, 31, 32].includes(plate.id)) return ['c9', 'c5', 'c12'];
  if ([6, 7, 17].includes(plate.id)) return ['c6', 'c10', 'c12'];
  if ([8, 9, 1].includes(plate.id)) return ['c5', 'c4', 'c12'];

  switch (plate.cat) {
    case 'knowledge': return ['c10', 'c11', 'c12'];
    case 'tables': return ['c2', 'c12'];
    case 'projects': return ['c1', 'c4', 'c12'];
    case 'skills': return ['c9', 'c5', 'c12'];
    case 'analytics': return ['c6', 'c10', 'c12'];
    default: return ['c12'];
  }
}

function EditorialPagination({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  dimensionLabel, 
  onPageChange 
}) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="archive-pagination-bar">
      <div className="archive-pagination-info">
        <span className="archive-pagination-kicker">&sect; ARCHIVE REGISTER:</span>
        <span>
          Showing <strong>{startItem}&ndash;{endItem}</strong> of <strong>{totalItems}</strong> {dimensionLabel} &middot; Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
      </div>

      <div className="archive-pagination-controls">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="archive-page-btn archive-page-nav-btn"
          title="Previous Page"
          aria-label="Previous Page"
        >
          <ChevronLeft size={13} />
          <span>Prev</span>
        </button>

        <div className="archive-page-numbers">
          {pageNumbers.map(pageNum => (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`archive-page-btn archive-page-num-btn ${pageNum === currentPage ? 'active' : ''}`}
              aria-label={`Page ${pageNum}`}
              aria-current={pageNum === currentPage ? 'page' : undefined}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="archive-page-btn archive-page-nav-btn"
          title="Next Page"
          aria-label="Next Page"
        >
          <span>Next</span>
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

export function ResearchFooterGazette() {
  const [activeDimension, setActiveDimension] = useState('literature'); // 'literature' | 'plates'
  const [citationFilter, setCitationFilter] = useState('all');
  const [plateCategory, setPlateCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExhibit, setSelectedExhibit] = useState(null);

  // Listen for global jump events to ensure correct sub-view is visible
  useEffect(() => {
    const handleShowCitation = (e) => {
      setActiveDimension('literature');
      if (e.detail?.id) {
        setTimeout(() => {
          const el = document.getElementById(`citation-${e.detail.id}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('citation-pulse-active');
            setTimeout(() => el.classList.remove('citation-pulse-active'), 2500);
          }
        }, 120);
      }
    };

    const handleShowPlate = (e) => {
      setActiveDimension('plates');
      if (e.detail?.id) {
        const found = SCREENSHOTS_CATALOG.find(p => p.id === Number(e.detail.id));
        if (found) {
          setSelectedExhibit(found);
        }
      }
    };

    window.addEventListener('show-citation', handleShowCitation);
    window.addEventListener('show-plate', handleShowPlate);

    return () => {
      window.removeEventListener('show-citation', handleShowCitation);
      window.removeEventListener('show-plate', handleShowPlate);
    };
  }, []);

  const citationCategories = [
    { key: 'all', label: 'All Citations', count: CITATIONS_DATA.length },
    { key: 'mobbin', label: 'Mobbin UI', count: CITATIONS_DATA.filter(c => c.categoryKey === 'mobbin').length },
    { key: 'hn', label: 'HackerNews', count: CITATIONS_DATA.filter(c => c.categoryKey === 'hn').length },
    { key: 'arxiv', label: 'Academic arXiv', count: CITATIONS_DATA.filter(c => c.categoryKey === 'arxiv').length },
    { key: 'audit', label: 'Field Audit', count: CITATIONS_DATA.filter(c => c.categoryKey === 'audit').length },
  ];

  const plateCategories = [
    { id: 'all', label: 'All Plates', count: 43 },
    { id: 'knowledge', label: 'Knowledge & RAG', count: 18 },
    { id: 'tables', label: 'Tables Module', count: 10 },
    { id: 'projects', label: 'Projects & Agents', count: 8 },
    { id: 'skills', label: 'Skills Architecture', count: 5 },
    { id: 'analytics', label: 'Analytics & Tracing', count: 2 },
  ];

  const filteredCitations = CITATIONS_DATA.filter(item => {
    const matchesCategory = citationFilter === 'all' || item.categoryKey === citationFilter;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.verbatimFinding.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.explainer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredPlates = SCREENSHOTS_CATALOG.filter(item => {
    const matchesCategory = plateCategory === 'all' || item.cat === plateCategory;
    const matchesSearch = searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cat.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const jumpToStory = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const jumpToCitationFromModal = (citationId) => {
    setSelectedExhibit(null);
    setActiveDimension('literature');
    setTimeout(() => {
      const el = document.getElementById(`citation-${citationId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('citation-pulse-active');
        setTimeout(() => el.classList.remove('citation-pulse-active'), 2500);
      }
    }, 120);
  };

  const getCategoryIcon = (categoryKey) => {
    switch(categoryKey) {
      case 'mobbin': return <Layout size={13} />;
      case 'hn': return <MessageSquare size={13} />;
      case 'arxiv': return <BookOpen size={13} />;
      case 'audit': return <CheckCircle size={13} />;
      default: return <BookOpen size={13} />;
    }
  };

  const getCategoryColor = (categoryKey) => {
    switch(categoryKey) {
      case 'mobbin': return '#1d4ed8';
      case 'hn': return '#c2410c';
      case 'arxiv': return 'var(--accent-burgundy)';
      case 'audit': return 'var(--accent-emerald)';
      default: return 'var(--ink-secondary)';
    }
  };

  const modalCitations = selectedExhibit ? getPlateCitations(selectedExhibit).map(cId => 
    CITATIONS_DATA.find(c => c.id === cId)
  ).filter(Boolean) : [];

  return (
    <section id="research-archive" className="citations-gazette-section">
      {/* Anchor compatibility hooks for existing deep links */}
      <div id="citations-gazette" style={{ position: 'relative', top: '-80px' }} />
      <div id="plates" style={{ position: 'relative', top: '-80px' }} />

      {/* Section Header */}
      <div className="section-kicker" style={{ color: 'var(--accent-burgundy)' }}>
        SECTION VI &middot; RESEARCH, PRIOR ART &amp; FIELD EVIDENCE ARCHIVE (TASKS 1 &amp; 5)
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
        <h2 style={{ fontFamily: 'var(--font-serif-headline)', fontSize: '2.1rem', color: 'var(--ink-primary)', margin: 0 }}>
          The Research &amp; Field Evidence Archive
        </h2>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
          12 Literature Explainer Cards &middot; 43 Live Platform Exploration Plates
        </span>
      </div>

      <p style={{ fontFamily: 'var(--font-serif-body)', fontSize: '1.02rem', color: 'var(--ink-secondary)', maxWidth: '940px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Every strategic thesis, persona assertion, and ranked builder intervention in this broadsheet is grounded in empirical research. This unified archive pairs <strong>external literature</strong> (peer-reviewed arXiv papers, Mobbin UI teardowns, and practitioner debates) with <strong>firsthand field ground truth</strong> (forty-three captured plates of the live <code>app.vectorshift.ai</code> platform).
      </p>

      {/* PRIMARY DIMENSION SELECTOR: Literature vs Field Plates */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.8rem', 
        padding: '0.8rem 1rem', 
        background: 'var(--paper-surface-alt)', 
        border: '1px solid var(--ink-rule-subtle)', 
        borderRadius: '4px',
        marginBottom: '1.4rem',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-burgundy)' }}>
            Archive Dimension:
          </span>
          <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
            <button
              type="button"
              className={`pill-btn ${activeDimension === 'literature' ? 'active' : ''}`}
              onClick={() => { setActiveDimension('literature'); setSearchQuery(''); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <BookOpen size={13} />
              <span>Prior Art &amp; Citations (12)</span>
            </button>
            <button
              type="button"
              className={`pill-btn ${activeDimension === 'plates' ? 'active' : ''}`}
              onClick={() => { setActiveDimension('plates'); setSearchQuery(''); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Camera size={13} />
              <span>Field Exploration Plates (43)</span>
            </button>
          </div>
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--ink-muted)' }}>
          {activeDimension === 'literature' ? 'Displaying 12 Peer-Reviewed & Industry Findings' : 'Displaying 43 High-Res Platform Screencaps'}
        </div>
      </div>

      {/* SUB-CONTROL BAR: Filters & Quick Search */}
      <div className="citations-control-bar" style={{ marginBottom: '1.5rem' }}>
        {/* Category Pills depending on active dimension */}
        <div className="citations-filter-pills">
          {activeDimension === 'literature' ? (
            citationCategories.map(cat => (
              <button
                key={cat.key}
                className={`pill-btn ${citationFilter === cat.key ? 'active' : ''}`}
                onClick={() => setCitationFilter(cat.key)}
              >
                {cat.label} <span style={{ opacity: 0.7, fontSize: '0.72rem', marginLeft: '3px' }}>({cat.count})</span>
              </button>
            ))
          ) : (
            plateCategories.map(cat => (
              <button
                key={cat.id}
                className={`pill-btn ${plateCategory === cat.id ? 'active' : ''}`}
                onClick={() => setPlateCategory(cat.id)}
              >
                {cat.label} <span style={{ opacity: 0.7, fontSize: '0.72rem', marginLeft: '3px' }}>({cat.count})</span>
              </button>
            ))
          )}
        </div>

        {/* Real-time search box */}
        <div className="citations-search-box">
          <Search size={14} style={{ color: 'var(--ink-muted)', marginRight: '6px' }} />
          <input
            type="text"
            placeholder={activeDimension === 'literature' ? "Search citations, authors, findings..." : "Search 43 plates by title or caption..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="citations-search-input"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DIMENSION 1: LITERATURE & PRIOR ART CARDS                                */}
      {/* ========================================================================= */}
      {activeDimension === 'literature' && (
        <div className="citations-explainer-grid">
          {filteredCitations.map((item) => {
            const mappedPlates = SCREENSHOTS_CATALOG.filter(p => getPlateCitations(p).includes(item.id));
            
            return (
              <article 
                key={item.id} 
                id={`citation-${item.id}`}
                className="citation-explainer-card"
              >
                {/* Card Header */}
                <div className="citation-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="citation-badge-mono">[{item.badge}]</span>
                    <span 
                      className="citation-category-pill"
                      style={{ color: getCategoryColor(item.categoryKey), borderColor: `${getCategoryColor(item.categoryKey)}44` }}
                    >
                      {getCategoryIcon(item.categoryKey)}
                      <span>{item.category}</span>
                    </span>
                  </div>

                  {item.url && (
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="citation-source-link"
                      title="Open canonical source link"
                    >
                      <span>Canonical Source</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>

                {/* Title & Source */}
                <h3 className="citation-card-title">
                  {item.title}
                </h3>
                <div className="citation-card-source">
                  {item.source}
                </div>

                {/* Verbatim Finding Block */}
                <div className="citation-finding-box">
                  <div className="citation-finding-label">Verbatim Evidence / Finding:</div>
                  <blockquote className="citation-finding-quote">
                    &ldquo;{item.verbatimFinding}&rdquo;
                  </blockquote>
                </div>

                {/* The VectorShift Architectural Explainer */}
                <div className="citation-explainer-callout">
                  <div className="citation-explainer-heading">
                    <span style={{ fontSize: '1rem' }}>💡</span>
                    <strong>The VectorShift Explainer &amp; Architectural Rationale:</strong>
                  </div>
                  <p className="citation-explainer-text">
                    {item.explainer}
                  </p>
                </div>

                {/* Mapped Field Plates Proof Row */}
                {item.id === 'c12' ? (
                  <div style={{ 
                    background: 'rgba(21, 128, 61, 0.08)', 
                    border: '1px solid rgba(21, 128, 61, 0.25)', 
                    borderRadius: '4px', 
                    padding: '0.6rem 0.8rem', 
                    marginBottom: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--ink-secondary)' }}>
                      <strong style={{ color: 'var(--accent-emerald)' }}>Field Evidence Ground Truth:</strong> 43 High-Resolution Exploration Plates captured across all platform modules.
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveDimension('plates')}
                      className="modal-research-jump-btn"
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                    >
                      <span>Explore All 43 Plates</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                ) : mappedPlates.length > 0 && (
                  <div style={{ 
                    background: 'var(--paper-bg)', 
                    border: '1px solid var(--ink-rule-subtle)', 
                    borderRadius: '3px', 
                    padding: '0.45rem 0.65rem', 
                    marginBottom: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent-burgundy)', textTransform: 'uppercase' }}>
                      Field Proof:
                    </span>
                    <div style={{ display: 'inline-flex', gap: '4px', flexWrap: 'wrap' }}>
                      {mappedPlates.slice(0, 4).map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setSelectedExhibit(p);
                          }}
                          style={{
                            background: 'var(--paper-surface-alt)',
                            border: '1px solid var(--ink-rule-subtle)',
                            borderRadius: '2px',
                            padding: '0.1rem 0.35rem',
                            fontSize: '0.66rem',
                            fontFamily: 'var(--font-mono)',
                            color: 'var(--ink-secondary)',
                            cursor: 'pointer'
                          }}
                          title={`Click to inspect Plate #${p.id}: ${p.title}`}
                        >
                          Plate #{p.id}
                        </button>
                      ))}
                      {mappedPlates.length > 4 && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveDimension('plates');
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '0.66rem',
                            color: 'var(--accent-burgundy)',
                            cursor: 'pointer',
                            textDecoration: 'underline'
                          }}
                        >
                          +{mappedPlates.length - 4} more
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Card Footer: Bidirectional link & Tags */}
                <div className="citation-card-footer">
                  <button 
                    onClick={() => jumpToStory(item.storyRefId)}
                    className="citation-jump-btn"
                    title={`Jump back to ${item.storyRefLabel}`}
                  >
                    <ArrowUp size={12} />
                    <span>Referenced in: {item.storyRefLabel}</span>
                  </button>

                  <div className="citation-tags-row">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="citation-tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* DIMENSION 2: FIELD AUDIT PLATES (43 HIGH-RES SCREENCAPS)                  */}
      {/* ========================================================================= */}
      {activeDimension === 'plates' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
            {filteredPlates.map(item => {
              const mappedCitations = getPlateCitations(item);

              return (
                <div
                  key={item.id}
                  id={`plate-${item.id}`}
                  className="plate-card"
                  onClick={() => setSelectedExhibit(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setSelectedExhibit(item);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--paper-bg)' }}>
                    <img
                      src={`/screenshots/${item.name}`}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      background: 'rgba(0, 0, 0, 0.78)',
                      color: '#ffffff',
                      fontSize: '0.65rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '0.15rem 0.4rem',
                      borderRadius: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <ZoomIn size={10} /> Plate #{item.id}
                    </div>

                    <div style={{
                      position: 'absolute',
                      bottom: '6px',
                      left: '6px',
                      background: 'var(--paper-surface)',
                      color: 'var(--ink-secondary)',
                      fontSize: '0.62rem',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '0.1rem 0.35rem',
                      borderRadius: '2px',
                      border: '1px solid var(--ink-rule-subtle)'
                    }}>
                      {item.cat}
                    </div>
                  </div>

                  <div className="plate-caption" style={{ padding: '0.8rem' }}>
                    <strong style={{ display: 'block', color: 'var(--ink-primary)', fontSize: '0.84rem', marginBottom: '0.2rem' }}>
                      {item.title}
                    </strong>
                    <span style={{ display: 'block', color: 'var(--ink-muted)', fontSize: '0.74rem', marginBottom: '0.6rem', lineHeight: 1.35 }}>
                      {item.desc}
                    </span>

                    {/* Mapped Literature Badges */}
                    <div 
                      className="plate-citations-row"
                      onClick={(e) => e.stopPropagation()}
                      style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}
                    >
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.66rem', color: 'var(--ink-muted)' }}>
                        Research:
                      </span>
                      {mappedCitations.map(cId => {
                        const cit = CITATIONS_DATA.find(c => c.id === cId);
                        return (
                          <button
                            key={cId}
                            type="button"
                            onClick={() => jumpToCitationFromModal(cId)}
                            style={{
                              background: 'var(--paper-bg)',
                              border: '1px solid var(--ink-rule-subtle)',
                              borderRadius: '2px',
                              padding: '0.1rem 0.35rem',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.65rem',
                              color: 'var(--accent-burgundy)',
                              cursor: 'pointer'
                            }}
                            title={cit ? cit.title : cId}
                          >
                            [{cit ? cit.badge : cId}]
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPlates.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--ink-muted)', fontStyle: 'italic' }}>
              No photographic plates matched your filter or search query.
            </div>
          )}

          <EditorialPagination
            currentPage={currentPlatePage}
            totalPages={totalPlatePages}
            totalItems={filteredPlates.length}
            itemsPerPage={PLATES_PER_PAGE}
            dimensionLabel="Field Exploration Plates"
            onPageChange={(page) => {
              setPlatesPage(page);
              scrollToArchiveTop();
            }}
          />
        </div>
      )}

      {/* Accessible Full-Resolution Broadsheet Modal with Literature Grounding */}
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
            <p style={{ marginTop: '0.9rem', textAlign: 'center', fontSize: '0.88rem', color: 'var(--ink-secondary)', maxWidth: '680px', lineHeight: 1.5 }}>
              {selectedExhibit.desc}
            </p>

            {/* Modal Research Mapping Section */}
            <div className="modal-research-mapping-box" style={{ width: '100%', marginTop: '1rem' }}>
              <div className="modal-research-header">
                <BookOpen size={14} style={{ color: 'var(--accent-burgundy)' }} />
                <span>Mapped Empirical Literature &amp; Explainer Cards</span>
              </div>
              <p className="modal-research-desc">
                This exploration plate provides empirical ground truth for the following research citations:
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
                        onClick={() => jumpToCitationFromModal(citation.id)}
                        className="modal-research-jump-btn"
                        title={`Jump to ${citation.badge} in Research Archive`}
                      >
                        <span>Inspect Explainer Box</span>
                        <ArrowRight size={11} />
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
    </section>
  );
}
