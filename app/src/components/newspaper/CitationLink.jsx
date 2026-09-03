import React from 'react';
import { CITATIONS_DATA } from '../../data/citationsData';

export function CitationLink({ id, children }) {
  const citation = CITATIONS_DATA.find(c => c.id === id);
  const num = citation ? citation.number : id;
  const title = citation ? `${citation.badge} · ${citation.title}` : 'Citation';

  const handleClick = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('show-citation', { detail: { id } }));
    const targetId = `citation-${id}`;
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('citation-pulse-active');
        setTimeout(() => {
          el.classList.remove('citation-pulse-active');
        }, 2500);
      }
    }, 80);
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
