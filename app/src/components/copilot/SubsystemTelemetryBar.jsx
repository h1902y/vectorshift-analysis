import React from 'react';
import { ShieldCheck, Database, Wrench, Sparkles, ExternalLink } from 'lucide-react';

export function SubsystemTelemetryBar({ onOpenInspector }) {
  return (
    <div className="subsystem-telemetry-ribbon">
      <div className="telemetry-items-scroll">
        {/* Pydantic V2 Indicator */}
        <div 
          className="telemetry-chip pydantic clickable"
          onClick={onOpenInspector}
          title="Click to inspect Pydantic V2 JSON-Schemas"
        >
          <ShieldCheck size={12} style={{ color: 'var(--accent-crimson)' }} />
          <span>PYDANTIC V2: 8 SCHEMAS</span>
          <ExternalLink size={10} style={{ opacity: 0.6 }} />
        </div>

        {/* MCP Server Indicator */}
        <div 
          className="telemetry-chip mcp clickable"
          onClick={onOpenInspector}
          title="MCP Protocol: JSON-RPC 2.0 active"
        >
          <span className="telemetry-dot-pulse green" />
          <span>MCP: pydantic-mcp-v2.8 (11ms)</span>
        </div>

        {/* Vector KB Indicator */}
        <div className="telemetry-chip kb">
          <Database size={11} style={{ color: 'var(--ink-muted)' }} />
          <span>KB: 1,842 CHUNKS</span>
        </div>

        {/* Skills Indicator */}
        <div className="telemetry-chip skills">
          <Sparkles size={11} style={{ color: 'var(--accent-gold)' }} />
          <span>4 SKILLS MOUNTED</span>
        </div>

        {/* Tools Indicator */}
        <div className="telemetry-chip tools">
          <Wrench size={11} style={{ color: 'var(--ink-muted)' }} />
          <span>4 EXECUTABLE TOOLS</span>
        </div>
      </div>
    </div>
  );
}
