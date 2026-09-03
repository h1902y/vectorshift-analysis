import React from 'react';

export function Pill({ children, active = false, onClick, style = {} }) {
  return (
    <button
      className={`pill-btn ${active ? 'active' : ''}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}
