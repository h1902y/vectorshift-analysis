import React, { useState } from 'react';
import { SCREENSHOTS_CATALOG } from '../../data/screenshotsData';
import { X, Search, ZoomIn, Filter } from 'lucide-react';

export function GalleryView() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  const categories = [
    { id: 'all', label: 'All Screenshots', count: 43 },
    { id: 'knowledge', label: 'Knowledge & RAG', count: 18 },
    { id: 'tables', label: 'Tables Module', count: 10 },
    { id: 'projects', label: 'Projects & Agents', count: 8 },
    { id: 'skills', label: 'Skills Architecture', count: 5 },
    { id: 'analytics', label: 'Analytics & Tracing', count: 2 },
  ];

  const filtered = SCREENSHOTS_CATALOG.filter(s => {
    const matchesCat = activeCategory === 'all' || s.cat === activeCategory;
    const matchesSearch = searchQuery === '' || 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="view-container">
      {/* Gallery Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="card-badge badge-indigo" style={{ marginBottom: '0.4rem' }}>Task 1 Audit Evidence</span>
          <h2>Live Builder View Exploration Gallery</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Complete audit catalog of all 43 real screenshots captured while exploring the live VectorShift platform.
          </p>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search screens, chunking, tables..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.45rem 0.8rem 0.45rem 2.2rem',
              color: 'var(--text-primary)',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {categories.map(c => (
          <button
            key={c.id}
            className={`btn-secondary ${activeCategory === c.id ? 'active' : ''}`}
            style={{
              fontSize: '0.8rem',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              borderColor: activeCategory === c.id ? 'var(--accent-primary)' : 'var(--border-subtle)',
              background: activeCategory === c.id ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-surface)',
              color: activeCategory === c.id ? '#ffffff' : 'var(--text-secondary)'
            }}
            onClick={() => setActiveCategory(c.id)}
          >
            {c.label} ({c.count})
          </button>
        ))}
      </div>

      {/* Screenshot Cards Grid */}
      <div className="card-grid-3">
        {filtered.map(item => (
          <div
            key={item.id}
            className="glass-card"
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
            onClick={() => setSelectedScreenshot(item)}
          >
            <div style={{
              height: '180px',
              background: 'var(--bg-base)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              marginBottom: '0.8rem',
              border: '1px solid var(--border-subtle)',
              position: 'relative'
            }}>
              <img
                src={`/screenshots/${item.name}`}
                alt={item.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(4px)',
                padding: '0.2rem 0.4rem',
                borderRadius: 'var(--radius-sm)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.7rem'
              }}>
                <ZoomIn size={12} /> Inspect
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
              <span className="card-badge badge-indigo" style={{ fontSize: '0.68rem' }}>
                {item.cat}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                {item.name}
              </span>
            </div>

            <h4 style={{ fontSize: '0.92rem', marginBottom: '0.3rem', color: 'var(--text-primary)' }}>
              {item.title}
            </h4>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', lineHeight: 1.4, marginTop: 'auto' }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedScreenshot && (
        <div className="modal-overlay" onClick={() => setSelectedScreenshot(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>{selectedScreenshot.title}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {selectedScreenshot.name} • Category: {selectedScreenshot.cat.toUpperCase()}
                </span>
              </div>
              <button
                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
                onClick={() => setSelectedScreenshot(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <img
                src={`/screenshots/${selectedScreenshot.name}`}
                alt={selectedScreenshot.title}
                className="modal-image"
              />
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1.2rem', textAlign: 'center', maxWidth: '750px', lineHeight: 1.5 }}>
                {selectedScreenshot.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
