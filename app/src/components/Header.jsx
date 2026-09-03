import React from 'react';
import { Zap, FileText, Cpu, Layers, Database, Compass, BarChart3 } from 'lucide-react';

export function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'master', label: 'Executive Deliverable', icon: FileText },
    { id: 'prototype', label: '#1 Simulation Studio', icon: Cpu, badge: 'Prototype' },
    { id: 'improvements', label: 'Top 5 Improvements', icon: Layers },
    { id: 'architecture', label: 'CIM Deconstructor', icon: Database },
    { id: 'competitor', label: 'Clay & Fin Teardown', icon: Compass },
    { id: 'screenshots', label: 'Builder Screenshots', icon: BarChart3, badge: '43' },
  ];

  return (
    <header className="top-header">
      <div className="brand-section">
        <div className="logo-badge">
          <div className="logo-icon"><Zap size={18} /></div>
          VectorShift PM
        </div>
        <div className="candidate-pill">
          <div className="candidate-dot"></div>
          <span style={{ fontWeight: 600 }}>Harshit Krishna Choudhary</span>
          <span style={{ color: 'var(--text-dim)' }}>|</span>
          <span style={{ color: 'var(--text-secondary)' }}>Product Manager (Platform) Assessment</span>
        </div>
      </div>

      <nav className="nav-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`nav-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span style={{
                  fontSize: '0.65rem',
                  padding: '0.1rem 0.35rem',
                  borderRadius: 'var(--radius-full)',
                  background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(99, 102, 241, 0.2)',
                  color: isActive ? '#ffffff' : '#a5b4fc',
                  fontWeight: 700
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
