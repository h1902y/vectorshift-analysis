import React, { useState, useEffect } from 'react';
import { Masthead } from './components/newspaper/Masthead';
import { StickySectionNav } from './components/newspaper/StickySectionNav';
import { FrontPageStory } from './components/newspaper/FrontPageStory';
import { LifecycleStory } from './components/newspaper/LifecycleStory';
import { TechnicalBlueprint } from './components/newspaper/TechnicalBlueprint';
import { RoadmapStory } from './components/newspaper/RoadmapStory';
import { InteractiveStudioSection } from './components/newspaper/InteractiveStudioSection';
import { BenchmarkStory } from './components/newspaper/BenchmarkStory';
import { ResearchFooterGazette } from './components/newspaper/ResearchFooterGazette';
import { DesignSpecimenSection } from './components/newspaper/DesignSpecimenSection';
import { EditorialFooter } from './components/newspaper/EditorialFooter';
import { FloatingAgentOmnichat } from './components/copilot/FloatingAgentOmnichat';
import { useSimulation } from './hooks/useSimulation';

export default function App() {
  const [activeSection, setActiveSection] = useState('lead');
  const simulation = useSimulation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const navOffset = 65;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleRunSimulation = () => {
    handleNavigate('simulation');
    if (simulation && simulation.runBatchSimulation) {
      simulation.runBatchSimulation();
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Exact Daily Diff Top Burgundy Stripe */}
      <div className="top-ribbon-stripe"></div>

      <div className="broadsheet-wrapper">
        {/* Exact Daily Diff Masthead: Sub-bar, Title, Double Rule */}
        <Masthead />

        {/* Sticky Sectional Navigation Bar (Scroll-Spy Active) */}
        <StickySectionNav 
          activeSection={activeSection}
          onActiveSectionChange={setActiveSection}
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

          {/* Section VI: Research, Prior Art & Field Evidence Archive (Tasks 1 & 5) */}
          <ResearchFooterGazette />

          {/* Section VII: Living Design System Specimen & Token Architecture */}
          <DesignSpecimenSection />
        </main>

        {/* Editorial Colophon & Footer */}
        <EditorialFooter />
      </div>

      {/* Pydantic End-to-End Observable AI Agent Omnichat */}
      <FloatingAgentOmnichat 
        onNavigate={handleNavigate}
        onRunSimulation={handleRunSimulation}
      />
    </div>
  );
}
