import React from 'react';

/**
 * GraphicCard - Editorial graphic container for charts, DAG diagrams, and figures
 */
export function GraphicCard({
  figureNumber,
  figureTitle,
  caption,
  badge = null,
  headerAction = null,
  children,
  style = {}
}) {
  return (
    <div className="story-graphic-box" style={style}>
      <div style={{ width: '100%' }}>
        {(figureNumber || figureTitle || badge || headerAction) && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '0.75rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '0.72rem', 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              color: 'var(--accent-burgundy)', 
              letterSpacing: '0.06em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              {figureNumber && <span>{figureNumber} &middot; </span>}
              <span>{figureTitle}</span>
              {badge}
            </div>
            {headerAction}
          </div>
        )}

        {children}

        {caption && (
          <div style={{ 
            fontSize: '0.72rem', 
            color: 'var(--ink-muted)', 
            fontStyle: 'italic', 
            textAlign: 'center', 
            marginTop: '0.75rem',
            lineHeight: 1.4,
            borderTop: '1px solid var(--ink-rule-subtle)',
            paddingTop: '0.5rem'
          }}>
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}
