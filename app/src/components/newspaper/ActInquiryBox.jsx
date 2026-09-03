import React from 'react';
import { HelpCircle, CheckCircle2 } from 'lucide-react';

export function ActInquiryBox({
  actNumber,
  inquiryLabel = "THE CENTRAL INQUIRY",
  question,
  opinion,
  style = {}
}) {
  return (
    <div className="act-inquiry-box" style={style}>
      <div className="act-inquiry-row">
        <div className="act-inquiry-badge">
          <HelpCircle size={13} />
          <span>{actNumber !== undefined ? `ACT ${actNumber} · ` : ''}{inquiryLabel}</span>
        </div>
        <div className="act-inquiry-question">
          &ldquo;{question}&rdquo;
        </div>
      </div>

      <div className="act-opinion-row">
        <div className="act-opinion-badge">
          <CheckCircle2 size={13} />
          <span>MY OPINIONATED VERDICT</span>
        </div>
        <div className="act-opinion-text">
          {opinion}
        </div>
      </div>
    </div>
  );
}
