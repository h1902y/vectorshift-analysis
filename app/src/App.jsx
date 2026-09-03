import React, { useState, useEffect } from 'react';
import { Masthead } from './components/newspaper/Masthead';
import { FrontPageStory } from './components/newspaper/FrontPageStory';
import { LifecycleStory } from './components/newspaper/LifecycleStory';
import { TechnicalBlueprint } from './components/newspaper/TechnicalBlueprint';
import { RoadmapStory } from './components/newspaper/RoadmapStory';
import { InteractiveStudioSection } from './components/newspaper/InteractiveStudioSection';
import { BenchmarkStory } from './components/newspaper/BenchmarkStory';
import { ExhibitsSection } from './components/newspaper/ExhibitsSection';
import { DesignSpecimenSection } from './components/newspaper/DesignSpecimenSection';
import { ResearchFooterGazette } from './components/newspaper/ResearchFooterGazette';
import { EditorialFooter } from './components/newspaper/EditorialFooter';
import { useSimulation } from './hooks/useSimulation';

export default function App() {
  const [theme, setTheme] = useState('light'); // Default to exact Daily Diff warm parchment
  const [activeSection, setActiveSection] = useState('lead');
  const simulation = useSimulation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Exact Daily Diff Top Burgundy Stripe */}
      <div className="top-ribbon-stripe"></div>

      <div className="broadsheet-wrapper">
        {/* Exact Daily Diff Masthead: Sub-bar, Title, Double Rule, Filter Pills */}
        <Masthead 
          theme={theme} 
          toggleTheme={toggleTheme} 
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        {/* The Continuous Editorial Broadsheet Flow */}
        <main>
          {/* Top Story: The Forward-Deployed Operator Thesis (Task 2) */}
          <FrontPageStory />

          {/* Section I: Agentic Application Lifecycle & Moat (Tasks 1 & 2) */}
          <LifecycleStory />

          {/* Section II: Technical Blueprint & CIM Deconstructor (Task 3) */}
          <TechnicalBlueprint />

          {/* Section III: Field Prioritization & 5 Ranked Interventions (Task 4) */}
          <RoadmapStory />

          {/* Section IV: Working Prototype: The Simulation & Eval Test Bench (Task 5) */}
          <InteractiveStudioSection simulation={simulation} />

          {/* Section V: Comparative Intelligence: VectorShift vs. Clay vs. Fin (Bonus) */}
          <BenchmarkStory />

          {/* Section VI: Field Evidence: 43 Photographic Exploration Plates (Task 1) */}
          <ExhibitsSection />

          {/* Section VII: Living Design System Specimen & Token Architecture */}
          <DesignSpecimenSection />

          {/* Section VIII: Notes, Prior Art & Empirical Citations Gazette */}
          <ResearchFooterGazette />
        </main>

        {/* Editorial Colophon & Footer */}
        <EditorialFooter />
      </div>
    </div>
  );
}
