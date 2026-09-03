import React from 'react';

/**
 * StatusBadge - Disciplined editorial badge with semantic variants
 * @param {'burgundy' | 'crimson' | 'emerald' | 'gold' | 'navy' | 'neutral' | 'outline'} variant
 * @param {boolean} dot
 * @param {React.ReactNode} icon
 */
export function StatusBadge({ 
  children, 
  variant = 'neutral', 
  dot = false, 
  icon = null, 
  style = {}, 
  className = '' 
}) {
  return (
    <span 
      className={`status-badge status-badge--${variant} ${className}`}
      style={style}
    >
      {dot && <span className="status-badge-dot" />}
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
