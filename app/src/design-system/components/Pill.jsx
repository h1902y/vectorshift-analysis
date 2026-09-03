import React from 'react';
import { Button } from './Button';

/**
 * Pill - Classic Daily Diff filter pill selector (alias for Button variant="pill")
 */
export function Pill({ children, active = false, onClick, style = {}, className = '' }) {
  return (
    <Button
      variant="pill"
      size="sm"
      active={active}
      onClick={onClick}
      style={style}
      className={className}
    >
      {children}
    </Button>
  );
}
