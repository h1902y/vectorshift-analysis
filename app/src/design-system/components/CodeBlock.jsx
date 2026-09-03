import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

/**
 * CodeBlock - Monospace code and ASCII diagram block with provenance title bar
 */
export function CodeBlock({
  title = null,
  language = null,
  code,
  allowCopy = true,
  style = {}
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(typeof code === 'string' ? code : String(code));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-container" style={style}>
      {(title || language || allowCopy) && (
        <div className="code-block-header">
          <span>{title || language || 'RAW SPECIFICATION'}</span>
          {allowCopy && (
            <button
              type="button"
              onClick={handleCopy}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: copied ? 'var(--accent-emerald)' : 'var(--ink-secondary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600
              }}
              title="Copy to clipboard"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          )}
        </div>
      )}
      <pre className="code-block-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}
