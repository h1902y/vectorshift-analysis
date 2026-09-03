import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, MessageSquare, Layout, CheckCircle, Search, ArrowUp } from 'lucide-react';
import { CITATIONS_DATA } from '../../data/citationsData';

export function ResearchFooterGazette() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'all', label: 'All Citations', count: CITATIONS_DATA.length },
    { key: 'mobbin', label: 'Mobbin UI', count: CITATIONS_DATA.filter(c => c.categoryKey === 'mobbin').length },
    { key: 'hn', label: 'HackerNews', count: CITATIONS_DATA.filter(c => c.categoryKey === 'hn').length },
    { key: 'arxiv', label: 'Academic arXiv', count: CITATIONS_DATA.filter(c => c.categoryKey === 'arxiv').length },
    { key: 'audit', label: 'Field Audit', count: CITATIONS_DATA.filter(c => c.categoryKey === 'audit').length },
  ];

  const filteredCitations = CITATIONS_DATA.filter(item => {
    const matchesCategory = activeFilter === 'all' || item.categoryKey === activeFilter;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.verbatimFinding.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.explainer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const jumpToStory = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      case 'mobbin': return '#1d4ed8'; // Blue
      case 'hn': return '#c2410c'; // Orange-brown
      case 'arxiv': return 'var(--accent-burgundy)'; // Burgundy
      case 'audit': return 'var(--accent-emerald)'; // Emerald
      default: return 'var(--ink-secondary)';
    }
  };

  return (
    <section id="citations-gazette" className="citations-gazette-section">
      {/* Section Header */}
      <div className="section-kicker" style={{ color: 'var(--accent-burgundy)' }}>
        VII. Notes, Prior Art &amp; Empirical Citations Gazette
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
        <h2 style={{ fontFamily: 'var(--font-serif-headline)', fontSize: '1.9rem', color: 'var(--ink-primary)', margin: 0 }}>
          The Research &amp; Evidence Archive
        </h2>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
          12 Verified Explainer Items &middot; Peer-Reviewed, Mobbin &amp; Community Citations
        </span>
      </div>

      <p style={{ fontFamily: 'var(--font-serif-body)', fontSize: '1.02rem', color: 'var(--ink-secondary)', maxWidth: '900px', lineHeight: 1.55, marginBottom: '1.5rem' }}>
        Every thesis, persona assertion, and ranked builder intervention in this broadsheet is grounded in empirical research. Below is the full explainer registry detailing the verbatim findings, source literature, and exact architectural takeaways for VectorShift.
      </p>

      {/* Control Bar: Filters & Quick Search */}
      <div className="citations-control-bar">
        <div className="citations-filter-pills">
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`pill-btn ${activeFilter === cat.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.key)}
            >
              {cat.label} <span style={{ opacity: 0.7, fontSize: '0.72rem', marginLeft: '3px' }}>({cat.count})</span>
            </button>
          ))}
        </div>

        <div className="citations-search-box">
          <Search size={14} style={{ color: 'var(--ink-muted)', marginRight: '6px' }} />
          <input
            type="text"
            placeholder="Search citations, keywords, authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="citations-search-input"
          />
        </div>
      </div>

      {/* Explainer Boxes Grid */}
      <div className="citations-explainer-grid">
        {filteredCitations.map((item) => (
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
        ))}
      </div>

      {filteredCitations.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--ink-muted)', fontStyle: 'italic' }}>
          No citations matched your filter or search query.
        </div>
      )}
    </section>
  );
}
