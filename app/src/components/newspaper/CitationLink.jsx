import React from 'react';
import { CITATIONS_DATA } from '../../data/citationsData';

export function CitationLink({ id, children }) {
  const citation = CITATIONS_DATA.find(c => c.id === id);
  const num = citation ? citation.number : id;
  const title = citation ? `${citation.badge} · ${citation.title}` : 'Citation';

  const handleClick = (e) => {
    e.preventDefault();
    const targetId = `citation-${id}`;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add pulse class
      el.classList.add('citation-pulse-active');
      setTimeout(() => {
        el.classList.remove('citation-pulse-active');
      }, 2500);
    }
  };

  return (
    <a
      href={`#citation-${id}`}
      onClick={handleClick}
      className="citation-inline-link"
      title={title}
      aria-label={`Citation ${num}: ${title}`}
    >
      [{children || num}]
    </a>
  );
}
