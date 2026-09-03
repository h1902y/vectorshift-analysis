import React from 'react';

export function NewspaperSection({ id, kicker, byline, headline, subtitle, children, isLast = false }) {
  return (
    <article 
      id={id} 
      className="article-container"
      style={isLast ? { borderBottom: 'none', marginBottom: '1.5rem', paddingBottom: '1.5rem' } : {}}
    >
      {kicker && (
        <div className="story-kicker">
          &bull; {kicker}
        </div>
      )}

      {byline && (
        <div className="story-byline">
          {byline}
        </div>
      )}

      {headline && (
        <h2 className="story-headline" style={subtitle ? { marginBottom: '0.6rem' } : {}}>
          {headline}
        </h2>
      )}

      {subtitle && (
        <div className="story-subtitle">
          {subtitle}
        </div>
      )}

      {children}
    </article>
  );
}
