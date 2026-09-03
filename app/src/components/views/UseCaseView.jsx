import React from 'react';
import { Database, AlertTriangle, ShieldCheck, FileCheck, CheckCircle2, XCircle } from 'lucide-react';

export function UseCaseView() {
  return (
    <div className="view-container">
      <div style={{ marginBottom: '1.5rem' }}>
        <span className="card-badge badge-emerald" style={{ marginBottom: '0.4rem' }}>Task 3 Built Architecture</span>
        <h2>Autonomous CIM Deconstructor & Deal Tear Sheet Generator</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          Deconstructs 50-page confidential information memorandums (PDF/PPTX) into audit-grade investment tear sheets with provenance citations.
        </p>
      </div>

      {/* Credit Status Notice */}
      <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 'var(--radius-sm)', padding: '0.9rem 1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <AlertTriangle size={20} color="#f59e0b" style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.85rem', color: '#fef3c7', lineHeight: 1.45 }}>
          <strong>Platform Status Notice:</strong> Live cloud execution was paused awaiting platform credit replenishment by the VectorShift team. The full pipeline DAG, JSON schema contracts, and EBITDA normalization rules are specified and validated below.
        </span>
      </div>

      {/* Visual DAG Architecture */}
      <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '0.8rem' }}>End-to-End Pipeline DAG Flow</h3>
        <div style={{ background: 'var(--bg-base)', padding: '1.4rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#93c5fd', overflowX: 'auto', lineHeight: 1.5 }}>
{`[Inbound PDF CIM (40-60 pages)]
       │
       ▼
[Node 1: Doc Parser Node] ────────> Extracts OCR Text + Bounding Box Coordinates
       │
       ▼
[Node 2: Claude 3.5 Sonnet Node] ──> Structured Output Schema (Pydantic guaranteed)
       │
       ├───────────────────────────────────────────────────┐
       ▼                                                   ▼
[Node 3: EBITDA Bridge & Math Node]             [Node 4: Mandate Hurdle Evaluator]
• Reconciles reported vs adjusted               • ARR >= $5M
• Excludes recurring developer payroll          • Gross Margin >= 70%
• Audits owner compensation add-backs           • Max Customer Churn <= 5%
       │                                                   │
       └─────────────────────────┬─────────────────────────┘
                                 │
                                 ▼
       [Node 5: Standardized Deal Tear Sheet Generator]
       • 1-Page Investment Committee Briefing
       • Exact Provenance Citations (Page, Paragraph, Table)`}
        </div>
      </div>

      {/* Dual Column: JSON Schema & Normalization Rules */}
      <div className="card-grid-2">
        {/* Output Schema */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <h3 style={{ fontSize: '1.1rem' }}>Production JSON Output Contract</h3>
            <span className="card-badge badge-indigo">Schema Enforced</span>
          </div>
          <pre style={{ background: 'var(--bg-base)', padding: '1.1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.76rem', color: '#a7f3d0', overflowX: 'auto', maxHeight: '380px' }}>
{`{
  "deal_metadata": {
    "target_name": "Apex Logistics Solutions, Inc.",
    "industry": "Vertical Supply Chain SaaS",
    "founded_year": 2018,
    "headcount": 42
  },
  "financial_summary": {
    "reporting_currency": "USD",
    "trailing_twelve_months_revenue": 8450000,
    "yoy_revenue_growth_rate": 0.42,
    "gross_margin_percentage": 0.74,
    "reported_ebitda": 1820000,
    "adjusted_ebitda": 2150000,
    "identified_addbacks": [
      { 
        "item": "Owner compensation above market", 
        "amount": 180000, 
        "status": "approved",
        "citation": { "page": 24, "table": "Addback_Sched_A" }
      },
      { 
        "item": "One-time patent settlement fee", 
        "amount": 150000, 
        "status": "approved",
        "citation": { "page": 26, "note": "Footnote 3" }
      },
      { 
        "item": "Capitalized software engineering wages", 
        "amount": 120000, 
        "status": "rejected_recurring",
        "disallowance_reason": "Recurring developer payroll required to maintain platform"
      }
    ]
  },
  "mandate_evaluation": {
    "overall_status": "QUALIFIED_PROCEED_TO_IC",
    "arr_hurdle_met": true,
    "margin_hurdle_met": true,
    "growth_hurdle_met": true
  }
}`}
          </pre>
        </div>

        {/* EBITDA Normalization Rules */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.8rem' }}>Deterministic Accounting Normalization Rules</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.83rem' }}>
            <div style={{ background: 'var(--bg-base)', padding: '0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontWeight: 600, marginBottom: '0.3rem' }}>
                <CheckCircle2 size={15} /> Approved Add-Back Categories
              </div>
              <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <li>Owner personal perks (luxury vehicle leases, country club dues).</li>
                <li>One-off litigation defense fees for settled disputes.</li>
                <li>M&A broker advisory success fees paid during prior rounds.</li>
              </ul>
            </div>

            <div style={{ background: 'var(--bg-base)', padding: '0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fb7185', fontWeight: 600, marginBottom: '0.3rem' }}>
                <XCircle size={15} /> Strictly Disallowed Add-Backs
              </div>
              <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <li>Capitalized software engineering / R&D payroll.</li>
                <li>Recurring enterprise software licenses (AWS, Salesforce).</li>
                <li>Severance paid for routine personnel turnover.</li>
              </ul>
            </div>

            <div style={{ background: 'rgba(99, 102, 241, 0.08)', padding: '0.9rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(99, 102, 241, 0.25)', color: 'var(--text-secondary)' }}>
              <strong style={{ color: '#c7d2fe' }}>Deployable Surface:</strong> Web Form with drag-and-drop PDF dropzone. Associates drop a deck and receive a 1-page PDF memo and Slack alert in &lt;30 seconds.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
