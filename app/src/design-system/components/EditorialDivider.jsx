import React from 'react';

/**
 * EditorialDivider - Authentic broadsheet dividers and colophon ornaments
 * @param {'double' | 'hairline' | 'thick' | 'ornament'} variant
 * @param {string} symbol
 */
export function EditorialDivider({
  variant = 'hairline',
  symbol = '❦',
  style = {}
}) {
  if (variant === 'ornament') {
    return (
      <div className="editorial-ornament" style={style}>
        <span>{symbol}</span>
      </div>
    );
  }

  const className = `editorial-rule-${variant}`;
  return <div className={className} style={style} />;
}
