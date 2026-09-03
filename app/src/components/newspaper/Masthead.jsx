import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../../design-system';

export function Masthead({ theme, toggleTheme }) {
  return (
    <header className="broadsheet-masthead" style={{ marginBottom: '1.2rem' }}>
      {/* Top Metadata Navigation */}
      <div className="masthead-sub-bar">
        <div>
          <span>BY <strong>HARSHIT KRISHNA CHOUDHARY</strong> &middot; </span>
          <a href="https://vectorshift.ai" target="_blank" rel="noreferrer">vectorshift.ai</a>
        </div>

        <div className="masthead-center-date">
          &lsaquo; THURSDAY, SEPTEMBER 3, 2026 &rsaquo;
        </div>

        <div className="masthead-right-actions">
          <span>8 SECTIONS &middot; 43 PLATES &middot; 12 CITATIONS</span>
          <Button
            variant="icon"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Morning Edition (Warm Newsprint)' : 'Switch to Evening Edition (Dark Broadsheet)'}
            icon={theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          />
        </div>
      </div>

      {/* The Main Title */}
      <h1 className="masthead-main-title">Analysis of VectorShift</h1>

      <div className="masthead-sub-motto">
        Architectural Evaluation &amp; Field Blueprint for Private Markets
      </div>

      {/* The Classic Broadsheet Double Rule */}
      <div className="masthead-double-rule"></div>
    </header>
  );
}
