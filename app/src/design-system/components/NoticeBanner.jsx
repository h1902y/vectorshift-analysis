import React from 'react';
import { AlertTriangle, Info, CheckCircle2, AlertCircle } from 'lucide-react';

/**
 * NoticeBanner - Editorial dispatch callout and warning banner
 * @param {'info' | 'warning' | 'alert' | 'success'} intent
 * @param {string} title
 */
export function NoticeBanner({
  intent = 'info',
  title = null,
  children,
  icon = null,
  style = {}
}) {
  const getDefaultIcon = () => {
    switch (intent) {
      case 'warning':
        return <AlertTriangle size={17} color="var(--accent-gold)" />;
      case 'alert':
        return <AlertCircle size={17} color="var(--accent-burgundy)" />;
      case 'success':
        return <CheckCircle2 size={17} color="var(--accent-emerald)" />;
      case 'info':
      default:
        return <Info size={17} color="var(--accent-navy)" />;
    }
  };

  return (
    <div className={`notice-banner notice-banner--${intent}`} style={style}>
      <div style={{ flexShrink: 0, marginTop: '2px' }}>
        {icon || getDefaultIcon()}
      </div>
      <div style={{ flex: 1 }}>
        {title && <div className="notice-banner-title">{title}</div>}
        <div style={{ color: 'var(--ink-secondary)' }}>{children}</div>
      </div>
    </div>
  );
}
