import React from 'react';

/**
 * MetricCard - Disciplined financial/technical KPI card
 * @param {string} label
 * @param {string|number} value
 * @param {string} delta
 * @param {'positive' | 'negative' | 'neutral'} deltaType
 * @param {string} subtitle
 * @param {React.ReactNode} badge
 */
export function MetricCard({
  label,
  value,
  delta = null,
  deltaType = 'positive',
  subtitle = null,
  badge = null,
  style = {}
}) {
  return (
    <div className="metric-card" style={style}>
      <div className="metric-card-label">
        <span>{label}</span>
        {badge}
      </div>
      <div className="metric-card-value">{value}</div>
      {delta && (
        <div className={`metric-card-delta metric-card-delta--${deltaType}`}>
          <span>{delta}</span>
        </div>
      )}
      {subtitle && (
        <div style={{ fontSize: '0.74rem', color: 'var(--ink-muted)', marginTop: '0.35rem' }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
