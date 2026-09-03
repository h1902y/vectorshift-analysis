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
import { ActInquiryBox } from './ActInquiryBox';
import { getAssetUrl } from '../../utils/assetHelper';

const PLATES_PER_PAGE = 12;
const LITERATURE_PER_PAGE = 6;

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
  const [selectedScreenExhibit, setSelectedScreenExhibit] = useState(null);
  const [platesPage, setPlatesPage] = useState(1);
  const [literaturePage, setLiteraturePage] = useState(1);

  // Listen for global jump events to ensure correct sub-view is visible
  useEffect(() => {
    const handleShowCitation = (e) => {
      setActiveDimension('literature');
      if (e.detail?.id) {
        const citIdx = CITATIONS_DATA.findIndex(c => c.id === e.detail.id);
        if (citIdx !== -1) {
          const targetPage = Math.floor(citIdx / LITERATURE_PER_PAGE) + 1;
          setLiteraturePage(targetPage);
        }
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
        const pId = Number(e.detail.id);
        const plateIdx = SCREENSHOTS_CATALOG.findIndex(p => p.id === pId);
        if (plateIdx !== -1) {
          const targetPage = Math.floor(plateIdx / PLATES_PER_PAGE) + 1;
          setPlatesPage(targetPage);
        }
        const found = SCREENSHOTS_CATALOG.find(p => p.id === pId);
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

  const scrollToArchiveTop = () => {
    const el = document.getElementById('archive-controls-top');
    if (el) {
      const navOffset = 70;
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

  // Pagination Slicing
  const totalPlatePages = Math.ceil(filteredPlates.length / PLATES_PER_PAGE) || 1;
  const currentPlatePage = Math.min(platesPage, totalPlatePages);
  const startPlateIdx = (currentPlatePage - 1) * PLATES_PER_PAGE;
  const displayedPlates = filteredPlates.slice(startPlateIdx, startPlateIdx + PLATES_PER_PAGE);

  const totalLiteraturePages = Math.ceil(filteredCitations.length / LITERATURE_PER_PAGE) || 1;
  const currentLiteraturePage = Math.min(literaturePage, totalLiteraturePages);
  const startLitIdx = (currentLiteraturePage - 1) * LITERATURE_PER_PAGE;
  const displayedCitations = filteredCitations.slice(startLitIdx, startLitIdx + LITERATURE_PER_PAGE);

  const jumpToStory = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const jumpToCitationFromModal = (citationId) => {
    setSelectedExhibit(null);
    setSelectedScreenExhibit(null);
    setActiveDimension('literature');
    const citIdx = CITATIONS_DATA.findIndex(c => c.id === citationId);
    if (citIdx !== -1) {
      const targetPage = Math.floor(citIdx / LITERATURE_PER_PAGE) + 1;
      setLiteraturePage(targetPage);
    }
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
        SECTION V &middot; RESEARCH, PRIOR ART &amp; FIELD EVIDENCE ARCHIVE (TASKS 1 &amp; 5)
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
        <h2 style={{ fontFamily: 'var(--font-serif-headline)', fontSize: '2.1rem', color: 'var(--ink-primary)', margin: 0 }}>
          The Research &amp; Field Evidence Archive
        </h2>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
          12 Literature Explainer Cards &middot; 43 Live Platform Exploration Plates
        </span>
      </div>

      <p style={{ fontFamily: 'var(--font-serif-body)', fontSize: '1.02rem', color: 'var(--ink-secondary)', maxWidth: '940px', lineHeight: 1.6, marginBottom: '1.2rem' }}>
        Every strategic thesis, persona assertion, and ranked builder intervention in my evaluation is grounded in empirical research. This unified archive pairs <strong>external literature</strong> (peer-reviewed arXiv papers, Mobbin UI teardowns, and practitioner debates) with <strong>my firsthand field ground truth</strong>: forty-three captured exploration plates from my audit of the live <code>app.vectorshift.ai</code> platform.
      </p>

      {/* ACT 5: The Central Inquiry & My Opinionated Verdict */}
      <ActInquiryBox
        actNumber={5}
        inquiryLabel="THE EMPIRICAL RIGOR (TASKS 1 & 5)"
        question="What verifiable evidence proves these architectural critiques reflect reality rather than subjective opinion?"
        opinion={
          <>
            Product roadmaps without empirical proof are merely preferences. I have triangulated every priority in this briefing against <strong>forty-three photographic exploration plates</strong> of my live exploration of the <code>app.vectorshift.ai</code> environment, verified <strong>Mobbin design patterns</strong> from category leaders, and <strong>peer-reviewed arXiv benchmark methodologies</strong>.
          </>
        }
      />

      {/* ── SCREEN-ONLY ARCHIVE CONTROLS & PAGINATION ── */}
      <div className="screen-only-archive">
      {/* PRIMARY DIMENSION SELECTOR: Literature vs Field Plates */}
      <div id="archive-controls-top" style={{ 
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
              onClick={() => { setActiveDimension('literature'); setLiteraturePage(1); setSearchQuery(''); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <BookOpen size={13} />
              <span>Prior Art &amp; Citations (12)</span>
            </button>
            <button
              type="button"
              className={`pill-btn ${activeDimension === 'plates' ? 'active' : ''}`}
              onClick={() => { setActiveDimension('plates'); setPlatesPage(1); setSearchQuery(''); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Camera size={13} />
              <span>Field Exploration Plates (43)</span>
            </button>
          </div>
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--ink-muted)' }}>
          {activeDimension === 'literature' 
            ? `Displaying ${filteredCitations.length} Findings · Page ${currentLiteraturePage} of ${totalLiteraturePages}` 
            : `Displaying ${filteredPlates.length} Exploration Plates · Page ${currentPlatePage} of ${totalPlatePages}`}
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
                onClick={() => { setCitationFilter(cat.key); setLiteraturePage(1); }}
              >
                {cat.label} <span style={{ opacity: 0.7, fontSize: '0.72rem', marginLeft: '3px' }}>({cat.count})</span>
              </button>
            ))
          ) : (
            plateCategories.map(cat => (
              <button
                key={cat.id}
                className={`pill-btn ${plateCategory === cat.id ? 'active' : ''}`}
                onClick={() => { setPlateCategory(cat.id); setPlatesPage(1); }}
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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setLiteraturePage(1);
              setPlatesPage(1);
            }}
            className="citations-search-input"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DIMENSION 1: LITERATURE & PRIOR ART CARDS (WITH STRUCTURED 2-ROW EVIDENCE) */}
      {/* ========================================================================= */}
      {activeDimension === 'literature' && (
        <div>
          <div className="citations-explainer-grid">
            {displayedCitations.map((item) => {
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

                  {/* ROW 1: 'SCREEN' EVIDENCE (Mobbin UI or Platform Screencap) */}
                  {item.screen && (
                    <div className="evidence-row-screen">
                      <div className="evidence-row-tag">
                        <Camera size={12} />
                        <span>ROW 1 &middot; SCREEN EVIDENCE ({item.screen.platform || 'Mobbin UI Screen'})</span>
                      </div>
                      <div className="evidence-screen-body">
                        <div 
                          className="screen-thumb-container" 
                          onClick={() => setSelectedScreenExhibit(item.screen)}
                          title="Click to inspect high-resolution screenshot in lightbox"
                        >
                          <img 
                            src={encodeURI(getAssetUrl(item.screen.thumbnail))} 
                            alt={item.screen.title} 
                            className="evidence-screen-thumb" 
                          />
                          <div className="screen-thumb-overlay">
                            <ZoomIn size={14} />
                          </div>
                        </div>
                        <div className="evidence-screen-meta">
                          <div className="evidence-screen-title">
                            {item.screen.title}
                          </div>
                          <div className="evidence-screen-pattern">
                            {item.screen.pattern}
                          </div>
                          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '3px' }}>
                            <button
                              type="button"
                              onClick={() => setSelectedScreenExhibit(item.screen)}
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                color: 'var(--accent-burgundy)',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px'
                              }}
                            >
                              <ZoomIn size={11} />
                              <span>Inspect Screen</span>
                            </button>
                            {item.screen.mobbinUrl && (
                              <a 
                                href={item.screen.mobbinUrl} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="mobbin-screen-link"
                              >
                                <span>Mobbin Catalog</span>
                                <ArrowUpRight size={11} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ROW 2: OFFICIAL 'DOCS' CITATION */}
                  {item.docs && (
                    <div className="evidence-row-docs">
                      <div className="evidence-row-tag">
                        <BookOpen size={12} />
                        <span>ROW 2 &middot; OFFICIAL DOCS CITATION</span>
                      </div>
                      <div className="evidence-docs-body">
                        <div className="evidence-docs-citation-line">
                          <a 
                            href={item.docs.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="evidence-docs-url"
                            title="Open official documentation in new tab"
                          >
                            <span>{item.docs.citation}</span>
                            <ArrowUpRight size={11} />
                          </a>
                        </div>
                        <div className="evidence-docs-spec">
                          &ldquo;{item.docs.specExcerpt}&rdquo;
                        </div>
                        <div className="evidence-docs-roadmap">
                          <span>✓</span> {item.docs.roadmapAnchor}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* The VectorShift Architectural Explainer */}
                  <div className="citation-explainer-callout">
                    <div className="citation-explainer-heading">
                      <span style={{ fontSize: '1rem' }}>💡</span>
                      <strong>The VectorShift Explainer &amp; Strategic Rationale:</strong>
                    </div>
                    <p className="citation-explainer-text">
                      {item.explainer}
                    </p>
                  </div>

                  {/* Mapped Field Plates Proof Row (with miniature screenshot thumbnail icons) */}
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
                      <div style={{ display: 'inline-flex', gap: '5px', flexWrap: 'wrap' }}>
                        {mappedPlates.slice(0, 4).map(p => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setSelectedExhibit(p)}
                            className="field-proof-thumb-pill"
                            title={`Inspect Plate #${p.id}: ${p.title}`}
                          >
                            <img 
                              src={encodeURI(getAssetUrl(`screenshots/${p.name}`))} 
                              alt={`Plate #${p.id}`}
                              className="field-proof-mini-thumb" 
                            />
                            <span>Plate #{p.id}</span>
                          </button>
                        ))}
                        {mappedPlates.length > 4 && (
                          <button
                            type="button"
                            onClick={() => setActiveDimension('plates')}
                            className="field-proof-thumb-pill"
                            style={{ fontStyle: 'italic' }}
                            title="View remaining plates in catalog"
                          >
                            <span>+{mappedPlates.length - 4} more</span>
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
                      {item.tags.map(t => (
                        <span key={t} className="citation-tag">#{t}</span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Literature Pagination */}
          <EditorialPagination
            currentPage={currentLiteraturePage}
            totalPages={totalLiteraturePages}
            totalItems={filteredCitations.length}
            itemsPerPage={LITERATURE_PER_PAGE}
            dimensionLabel="Explainer Citations"
            onPageChange={(page) => {
              setLiteraturePage(page);
              scrollToArchiveTop();
            }}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* DIMENSION 2: 43 PHOTOGRAPHIC EXPLORATION PLATES                           */}
      {/* ========================================================================= */}
      {activeDimension === 'plates' && (
        <div>
          <div className="exhibits-broadsheet-grid">
            {displayedPlates.map((item) => {
              const mappedCitationIds = getPlateCitations(item);

              return (
                <div 
                  key={item.id} 
                  className="exhibit-broadsheet-card"
                  onClick={() => setSelectedExhibit(item)}
                  title={`Click to inspect Plate #${item.id}: ${item.title}`}
                >
                  {/* Plate Header Bar */}
                  <div className="exhibit-card-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="exhibit-number-badge">PLATE #{item.id}</span>
                      <span className="exhibit-cat-tag">{item.cat}</span>
                    </div>
                    <div className="exhibit-inspect-hint">
                      <ZoomIn size={12} />
                      <span>Inspect</span>
                    </div>
                  </div>

                  {/* Plate Thumbnail with safe URL encoding */}
                  <div className="exhibit-img-container">
                    <img 
                      src={encodeURI(getAssetUrl(`screenshots/${item.name}`))} 
                      alt={item.title} 
                      loading="lazy"
                      className="exhibit-img"
                    />
                  </div>

                  {/* Plate Content Meta */}
                  <div className="exhibit-card-content">
                    <div className="exhibit-card-title">
                      {item.title}
                    </div>
                    <div className="exhibit-card-desc">
                      {item.desc}
                    </div>

                    {/* Empirical Evidence Badges */}
                    <div style={{ marginTop: '0.6rem', display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                        Proves:
                      </span>
                      {mappedCitationIds.map(cId => {
                        const cit = CITATIONS_DATA.find(c => c.id === cId);
                        return (
                          <button
                            key={cId}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              jumpToCitationFromModal(cId);
                            }}
                            style={{
                              background: 'var(--paper-surface-alt)',
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

          {/* Plates Pagination */}
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

      </div> {/* Close screen-only-archive */}

      {/* ── PRINT-ONLY DESERIALIZED ARCHIVE (CONTAINS ALL 11 CITATIONS & ALL 43 PLATES) ── */}
      <div className="print-only-archive" style={{ display: 'none' }}>
        {/* PART A HEADER */}
        <div style={{ borderBottom: '2px solid var(--ink-primary)', paddingBottom: '0.4rem', marginBottom: '1rem', breakInside: 'avoid' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-burgundy)', textTransform: 'uppercase' }}>
            SECTION V (PART A) · PEER-REVIEWED LITERATURE &amp; UI BENCHMARKS
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif-headline)', fontSize: '1.45rem', margin: '0.2rem 0', color: 'var(--ink-primary)' }}>
            Complete Annotated Bibliography &amp; Verification Citations (All 11 References)
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)', margin: 0, lineHeight: 1.4 }}>
            Unpaginated academic register linking external benchmark literature, Mobbin teardowns, and practitioner debates directly to each engineering priority in this evaluation.
          </p>
        </div>

        {/* ALL 11 CITATIONS DESERIALIZED */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {CITATIONS_DATA.map((item) => (
            <article 
              key={item.id}
              style={{
                background: 'var(--paper-surface-alt)',
                border: '1px solid var(--ink-rule-subtle)',
                borderRadius: '4px',
                padding: '0.9rem 1rem',
                breakInside: 'avoid',
                pageBreakInside: 'avoid'
              }}
            >
              {/* Citation Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 800, color: 'var(--accent-burgundy)' }}>
                    [{item.badge}]
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                    &middot; {item.category}
                  </span>
                </div>
                {item.url && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--ink-muted)' }}>
                    {item.url.replace('https://', '')}
                  </span>
                )}
              </div>

              {/* Title & Source */}
              <h4 style={{ fontFamily: 'var(--font-serif-headline)', fontSize: '1.05rem', color: 'var(--ink-primary)', margin: '0 0 0.2rem 0' }}>
                {item.title}
              </h4>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--ink-muted)', marginBottom: '0.6rem' }}>
                Source: {item.source}
              </div>

              {/* ROW 1: Screen Evidence with High Quality Preview */}
              {item.screen && (
                <div style={{ background: 'var(--paper-bg)', border: '1px solid var(--ink-rule-subtle)', borderRadius: '3px', padding: '0.65rem', marginBottom: '0.6rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-burgundy)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    &sect; ROW 1 &middot; SCREEN EVIDENCE ({item.screen.platform})
                  </div>
                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '220px', flexShrink: 0, border: '1px solid var(--ink-rule-subtle)', borderRadius: '3px', overflow: 'hidden', background: '#fafafa' }}>
                      <img 
                        src={encodeURI(getAssetUrl(item.screen.thumbnail))} 
                        alt={item.screen.title} 
                        style={{ width: '100%', height: 'auto', maxHeight: '140px', objectFit: 'contain', display: 'block' }} 
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-primary)', marginBottom: '0.2rem' }}>
                        {item.screen.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--ink-secondary)', lineHeight: 1.4 }}>
                        {item.screen.pattern}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ROW 2: Official Documentation Citation */}
              {item.docs && (
                <div style={{ background: 'var(--paper-bg)', borderLeft: '3px solid var(--accent-burgundy)', padding: '0.5rem 0.75rem', marginBottom: '0.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-burgundy)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    &sect; ROW 2 &middot; OFFICIAL SPECIFICATION CITATION
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-primary)', fontWeight: 600 }}>
                    {item.docs.citation}
                  </div>
                  <div style={{ fontStyle: 'italic', fontSize: '0.72rem', color: 'var(--ink-secondary)', margin: '0.2rem 0' }}>
                    "{item.docs.specExcerpt}"
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                    &check; {item.docs.roadmapAnchor}
                  </div>
                </div>
              )}

              {/* Verbatim Finding & Architectural Explainer */}
              <p style={{ fontSize: '0.74rem', color: 'var(--ink-primary)', lineHeight: 1.45, margin: '0.4rem 0' }}>
                <strong>Field Finding:</strong> {item.verbatimFinding}
              </p>
              <p style={{ fontSize: '0.74rem', color: 'var(--ink-secondary)', lineHeight: 1.45, margin: 0 }}>
                <strong>Strategic Synthesis:</strong> {item.explainer}
              </p>
            </article>
          ))}
        </div>

        {/* PART B: 43 EXPLORATION PLATES CATALOG */}
        <div style={{ breakBefore: 'page', pageBreakBefore: 'always', paddingTop: '1rem', marginTop: '1.5rem', borderTop: '2px solid var(--ink-primary)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-burgundy)', textTransform: 'uppercase' }}>
            SECTION V (PART B) · EMPIRICAL PLATFORM ARTIFACTS
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif-headline)', fontSize: '1.45rem', margin: '0.2rem 0', color: 'var(--ink-primary)' }}>
            The Field Audit Specimens: 43 Captured Platform Exploration Plates
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)', marginBottom: '0.9rem', lineHeight: 1.4 }}>
            Visual photographic catalog of 43 high-resolution exploration plates captured during firsthand testing of <code>app.vectorshift.ai</code> across knowledge bases, visual DAG canvas, table workflows, custom skills, and execution telemetry.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
            {SCREENSHOTS_CATALOG.map((p) => (
              <div 
                key={p.id}
                style={{
                  background: 'var(--paper-surface-alt)',
                  border: '1px solid var(--ink-rule-subtle)',
                  borderRadius: '3px',
                  padding: '0.45rem',
                  breakInside: 'avoid',
                  pageBreakInside: 'avoid',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.3rem'
                }}
              >
                <div style={{ width: '100%', height: '100px', overflow: 'hidden', borderRadius: '2px', border: '1px solid var(--ink-rule-subtle)', background: '#ffffff' }}>
                  <img 
                    src={encodeURI(getAssetUrl(`screenshots/${p.name}`))} 
                    alt={`Plate #${p.id}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', fontWeight: 800, color: 'var(--accent-burgundy)' }}>
                    PLATE #{p.id}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', textTransform: 'uppercase', background: 'var(--paper-bg)', padding: '0.1rem 0.3rem', borderRadius: '2px' }}>
                    {p.cat}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 700, color: 'var(--ink-primary)', lineHeight: 1.25 }}>
                  {p.title}
                </div>
                <div style={{ fontSize: '0.64rem', color: 'var(--ink-secondary)', lineHeight: 1.3 }}>
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Accessible Full-Resolution Broadsheet Plate Modal */}
      <ModalDialog
        isOpen={Boolean(selectedExhibit)}
        onClose={() => setSelectedExhibit(null)}
        title={selectedExhibit?.title || ''}
        subtitle={selectedExhibit ? `Photographic Plate #${selectedExhibit.id} · Category: ${selectedExhibit.cat.toUpperCase()}` : ''}
      >
        {selectedExhibit && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={encodeURI(getAssetUrl(`screenshots/${selectedExhibit.name}`))}
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

      {/* Accessible Full-Resolution Competitor & Mobbin Screen Lightbox Modal */}
      <ModalDialog
        isOpen={Boolean(selectedScreenExhibit)}
        onClose={() => setSelectedScreenExhibit(null)}
        title={selectedScreenExhibit?.title || ''}
        subtitle={selectedScreenExhibit ? `${selectedScreenExhibit.platform || 'Mobbin UI Screen'} · Competitive Benchmark Inspection` : ''}
      >
        {selectedScreenExhibit && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={encodeURI(getAssetUrl(selectedScreenExhibit.fullImage || selectedScreenExhibit.thumbnail))}
              alt={selectedScreenExhibit.title}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '56vh', 
                objectFit: 'contain', 
                border: '1px solid var(--ink-rule-subtle)', 
                borderRadius: '3px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)' 
              }}
            />

            <div style={{ marginTop: '1rem', width: '100%', background: 'var(--paper-surface-alt)', border: '1px solid var(--ink-rule-subtle)', borderRadius: '4px', padding: '0.85rem 1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-burgundy)', textTransform: 'uppercase' }}>
                  Observed UX &amp; Architecture Pattern
                </span>
                {selectedScreenExhibit.mobbinUrl && (
                  <a
                    href={selectedScreenExhibit.mobbinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mobbin-screen-link"
                    style={{ fontSize: '0.72rem' }}
                  >
                    <span>View in Mobbin Catalog</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--ink-secondary)', lineHeight: 1.5, margin: 0 }}>
                {selectedScreenExhibit.pattern}
              </p>
            </div>
          </div>
        )}
      </ModalDialog>
    </section>
  );
}
