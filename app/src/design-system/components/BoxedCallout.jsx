import React from 'react';

/**
 * BoxedCallout - Disciplined editorial callout box
 * @param {string|React.ReactNode} title
 * @param {string|React.ReactNode} subtitle
 * @param {string} accent - e.g. 'var(--accent-burgundy)' or 'var(--accent-emerald)'
 * @param {'default' | 'sunken' | 'raised'} variant
 */
export function BoxedCallout({
  title,
  subtitle,
  children,
  style = {},
  accent = null,
  variant = 'default',
  badge = null
}) {
  const accentBorder = accent ? { borderLeft: `4px solid ${accent}` } : {};
  const variantBg = variant === 'sunken' 
    ? { background: 'var(--paper-sunken)' } 
    : variant === 'raised' 
    ? { background: 'var(--paper-surface-alt)', boxShadow: 'var(--shadow-editorial)' } 
    : {};

  return (
    <div className="diff-box" style={{ ...variantBg, ...accentBorder, ...style }}>
      {(title || subtitle || badge) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {badge}
            {title && (
              <div className="diff-box-title" style={{ marginBottom: 0 }}>
                {title}
              </div>
            )}
          </div>
          {subtitle && (
            <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
              {subtitle}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
