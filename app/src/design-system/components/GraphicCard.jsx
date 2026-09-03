import React from 'react';

export function GraphicCard({ figureNumber, figureTitle, caption, children, style = {} }) {
  return (
    <div className="story-graphic-box" style={style}>
      <div style={{ width: '100%' }}>
        {(figureNumber || figureTitle) && (
          <div style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: '0.72rem', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            color: 'var(--accent-burgundy)', 
            letterSpacing: '0.06em', 
            marginBottom: '0.6rem' 
          }}>
            {figureNumber && <span>{figureNumber} &middot; </span>}
            {figureTitle}
          </div>
        )}

        {children}

        {caption && (
          <div style={{ 
            fontSize: '0.72rem', 
            color: 'var(--ink-muted)', 
            fontStyle: 'italic', 
            textAlign: 'center', 
            marginTop: '0.6rem',
            lineHeight: 1.35
          }}>
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}
