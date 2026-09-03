import React from 'react';

export function BoxedCallout({ title, subtitle, children, style = {}, accent = null }) {
  const accentBorder = accent ? { borderLeft: `4px solid ${accent}` } : {};

  return (
    <div className="diff-box" style={{ ...accentBorder, ...style }}>
      {title && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <div className="diff-box-title" style={{ marginBottom: 0 }}>
            {title}
          </div>
          {subtitle && (
            <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-sans)' }}>
              {subtitle}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
