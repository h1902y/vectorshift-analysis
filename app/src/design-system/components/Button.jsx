import React from 'react';
import { RefreshCw } from 'lucide-react';

/**
 * Button - Editorial button primitive supporting pills, solid CTAs, and ghost controls
 * @param {'pill' | 'solid' | 'outline' | 'ghost' | 'icon'} variant
 * @param {'sm' | 'md'} size
 * @param {boolean} active
 * @param {boolean} loading
 */
export function Button({
  children,
  variant = 'pill',
  size = 'sm',
  active = false,
  loading = false,
  icon = null,
  onClick,
  disabled = false,
  style = {},
  className = '',
  title
}) {
  const variantClass = `diff-btn--${variant}`;
  const sizeClass = `diff-btn--${size}`;
  const activeClass = active ? 'active' : '';

  return (
    <button
      type="button"
      className={`diff-btn ${variantClass} ${sizeClass} ${activeClass} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
      title={title}
    >
      {loading ? (
        <RefreshCw size={size === 'md' ? 14 : 11} className="spin-icon" />
      ) : icon ? (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>
      ) : null}
      {children && <span>{children}</span>}
    </button>
  );
}
