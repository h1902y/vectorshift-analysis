import React from 'react';

/**
 * ScoreProgress - Editorial metric progress bar for quantitative evaluation & benchmarks
 * @param {string} label
 * @param {number} score
 * @param {number} max
 * @param {string} unit
 * @param {number} passThreshold
 */
export function ScoreProgress({
  label,
  score,
  max = 100,
  unit = '%',
  passThreshold = 90,
  style = {}
}) {
  const percentage = Math.min(100, Math.max(0, (score / max) * 100));
  const isPassing = score >= passThreshold;
  const fillColor = isPassing ? 'var(--accent-emerald)' : 'var(--accent-burgundy)';

  return (
    <div className="score-progress-wrap" style={style}>
      <div className="score-progress-header">
        <span style={{ color: 'var(--ink-secondary)', fontWeight: 500 }}>{label}</span>
        <span 
          style={{ 
            fontFamily: 'var(--font-mono)', 
            fontWeight: 700, 
            color: fillColor 
          }}
        >
          {score}{unit}
        </span>
      </div>
      <div className="score-progress-track">
        <div 
          className="score-progress-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: fillColor
          }}
        />
      </div>
    </div>
  );
}
