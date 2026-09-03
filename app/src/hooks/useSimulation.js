import { useState } from 'react';
import { SIMULATION_NODES, SYNTHETIC_SCENARIOS, BENCHMARK_RUBRICS } from '../data/simulationEngine';

export function useSimulation() {
  const [nodes, setNodes] = useState(SIMULATION_NODES);
  const [scenarios, setScenarios] = useState(SYNTHETIC_SCENARIOS);
  const [rubrics, setRubrics] = useState(BENCHMARK_RUBRICS);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(3);
  const [activeEdgePayload, setActiveEdgePayload] = useState(null);
  const [hardeningApplied, setHardeningApplied] = useState(false);
  const [progress, setProgress] = useState(100);

  // Run full 50-scenario simulation batch
  const runBatchSimulation = () => {
    setIsRunning(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          // If hardening was applied, scenario 14 passes!
          if (hardeningApplied) {
            setRubrics(prevRubrics => prevRubrics.map(r => 
              r.key === 'edge_case' ? { ...r, score: 94, status: 'pass' } :
              r.key === 'math' ? { ...r, score: 99 } : r
            ));
          }
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  // Run single node using cached ancestors
  const runSingleNode = (nodeId) => {
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status: 'running' } : n));
    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status: 'passed' } : n));
    }, 400);
  };

  // Apply auto-hardening recommendation
  const applyHardening = () => {
    setHardeningApplied(true);
    // Update scenario #14 to passed
    setScenarios(prev => prev.map(s => s.id === 14 ? { ...s, status: 'passed', expectedOutcome: 'PASS (Hardened)' } : s));
    setRubrics(prev => prev.map(r => r.key === 'edge_case' ? { ...r, score: 92 } : r));
  };

  return {
    nodes,
    scenarios,
    rubrics,
    isRunning,
    progress,
    selectedNodeId,
    setSelectedNodeId,
    activeEdgePayload,
    setActiveEdgePayload,
    hardeningApplied,
    runBatchSimulation,
    runSingleNode,
    applyHardening
  };
}
