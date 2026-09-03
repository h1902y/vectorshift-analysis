import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * AccordionCard - Collapsible editorial card with title, badge, and metadata
 */
export function AccordionCard({
  title,
  badge = null,
  meta = null,
  children,
  expanded: controlledExpanded = undefined,
  onToggle = null,
  defaultExpanded = false,
  style = {}
}) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const handleToggle = () => {
    if (onToggle) {
      onToggle(!isExpanded);
    } else {
      setInternalExpanded(!isExpanded);
    }
  };

  return (
    <div className={`accordion-card ${isExpanded ? 'expanded' : ''}`} style={style}>
      <div 
        className="accordion-header"
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {badge}
          <strong style={{ fontSize: '0.98rem', color: 'var(--ink-primary)', letterSpacing: '-0.01em' }}>
            {title}
          </strong>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--ink-muted)', fontSize: '0.76rem' }}>
          {meta}
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {isExpanded && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </div>
  );
}
