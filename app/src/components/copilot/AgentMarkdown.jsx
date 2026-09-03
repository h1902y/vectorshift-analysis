import React, { useState } from 'react';
import { 
  Terminal, 
  Check, 
  Copy, 
  ArrowRight, 
  ExternalLink,
  Info,
  Lightbulb,
  AlertTriangle,
  AlertCircle,
  ShieldAlert,
  CheckSquare,
  Square
} from 'lucide-react';

/**
 * AgentMarkdown - Full GitHub Flavored Markdown (GFM) Renderer for Agent Chat Bubbles
 * Supports:
 * - GFM Tables (| Col 1 | Col 2 | with column alignment)
 * - Fenced Code Blocks with copy button & syntax language label
 * - GFM Alerts (> [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING], > [!CAUTION])
 * - GFM Task Lists (- [ ] and - [x])
 * - Strikethrough (~~text~~)
 * - Headers (# through ####)
 * - Ordered Lists & Bullet Lists
 * - Blockquotes
 * - Horizontal Rules (---)
 * - Autolinks (https://...)
 * - Internal section jump chips ([Section](#id))
 */
export function AgentMarkdown({ content, onNavigate, isStreaming = false }) {
  if (!content) return null;

  // Split by fenced code blocks (```...```)
  const blocks = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="agent-markdown-flow">
      {blocks.map((block, idx) => {
        if (block.startsWith('```') && block.endsWith('```')) {
          const lines = block.slice(3, -3).trim().split('\n');
          const language = lines[0]?.match(/^[a-zA-Z0-9_-]+$/) ? lines[0] : '';
          const codeContent = language ? lines.slice(1).join('\n') : lines.join('\n');
          return <CodeSnippet key={idx} language={language} code={codeContent} />;
        }
        return (
          <React.Fragment key={idx}>
            <GfmBlockContent text={block} onNavigate={onNavigate} />
            {isStreaming && idx === blocks.length - 1 && (
              <span className="agent-ink-cursor" aria-hidden="true">▋</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function CodeSnippet({ language, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="agent-code-block">
      <div className="agent-code-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Terminal size={12} style={{ color: 'var(--accent-crimson)' }} />
          <span>{language ? language.toUpperCase() : 'PYTHON / SCHEMA'}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="agent-copy-btn"
        >
          {copied ? <Check size={11} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={11} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="agent-code-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function GfmBlockContent({ text, onNavigate }) {
  // Split into chunks by double newline
  const rawSections = text.split(/\n\n+/);

  return (
    <>
      {rawSections.map((section, sIdx) => {
        const trimmed = section.trim();
        if (!trimmed) return null;

        // 1. GFM Table Check
        const lines = trimmed.split('\n');
        if (isGfmTable(lines)) {
          return <GfmTable key={sIdx} lines={lines} onNavigate={onNavigate} />;
        }

        // 2. Horizontal Rule Check
        if (/^(?:---|\*\*\*|___)\s*$/.test(trimmed)) {
          return <hr key={sIdx} className="agent-gfm-hr" />;
        }

        // 3. GFM Alert Check (> [!NOTE], > [!TIP], etc.)
        if (/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i.test(lines[0])) {
          return <GfmAlert key={sIdx} lines={lines} onNavigate={onNavigate} />;
        }

        // 4. Standard Blockquote
        if (lines.every(l => l.trim().startsWith('>'))) {
          const quoteContent = lines.map(l => l.trim().replace(/^>\s?/, '')).join('\n');
          return (
            <blockquote key={sIdx} className="agent-md-blockquote">
              {renderInlineGfm(quoteContent, onNavigate)}
            </blockquote>
          );
        }

        // 5. Headers
        if (trimmed.startsWith('#### ')) {
          return (
            <h5 key={sIdx} className="agent-md-h5" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 800, color: 'var(--ink-primary)', margin: '0.4rem 0 0.1rem' }}>
              {renderInlineGfm(trimmed.replace(/^####\s+/, ''), onNavigate)}
            </h5>
          );
        }
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={sIdx} className="agent-md-h4">
              {renderInlineGfm(trimmed.replace(/^###\s+/, ''), onNavigate)}
            </h4>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={sIdx} className="agent-md-h3">
              {renderInlineGfm(trimmed.replace(/^##\s+/, ''), onNavigate)}
            </h3>
          );
        }
        if (trimmed.startsWith('# ')) {
          return (
            <h2 key={sIdx} className="agent-md-h2">
              {renderInlineGfm(trimmed.replace(/^#\s+/, ''), onNavigate)}
            </h2>
          );
        }

        // 6. GFM Task List Check (- [ ] or - [x])
        if (lines.some(l => /^[•\-*]\s+\[([ xX])\]\s+/.test(l.trim()))) {
          return (
            <ul key={sIdx} className="agent-gfm-task-list">
              {lines.map((line, lIdx) => {
                const taskMatch = line.trim().match(/^[•\-*]\s+\[([ xX])\]\s+(.*)/);
                if (taskMatch) {
                  const isChecked = taskMatch[1].toLowerCase() === 'x';
                  const taskText = taskMatch[2];
                  return (
                    <li key={lIdx} className="agent-gfm-task-item">
                      <span className="agent-gfm-checkbox">
                        {isChecked ? (
                          <CheckSquare size={14} style={{ color: 'var(--accent-emerald)' }} />
                        ) : (
                          <Square size={14} style={{ color: 'var(--ink-muted)' }} />
                        )}
                      </span>
                      <span style={{ textDecoration: isChecked ? 'line-through' : 'none', opacity: isChecked ? 0.75 : 1 }}>
                        {renderInlineGfm(taskText, onNavigate)}
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={lIdx} style={{ paddingLeft: '1.2rem' }}>
                    {renderInlineGfm(line, onNavigate)}
                  </li>
                );
              })}
            </ul>
          );
        }

        // 7. Ordered List
        if (lines.every(l => /^\d+\.\s+/.test(l.trim()))) {
          return (
            <ol key={sIdx} className="agent-gfm-ol">
              {lines.map((line, lIdx) => {
                const textOnly = line.trim().replace(/^\d+\.\s+/, '');
                return (
                  <li key={lIdx}>
                    {renderInlineGfm(textOnly, onNavigate)}
                  </li>
                );
              })}
            </ol>
          );
        }

        // 8. Bullet List
        if (lines.every(l => /^[•\-*]\s+/.test(l.trim()))) {
          return (
            <ul key={sIdx} className="agent-md-list">
              {lines.map((line, lIdx) => {
                const textOnly = line.trim().replace(/^[•\-*]\s+/, '');
                return (
                  <li key={lIdx} className="agent-md-list-item">
                    <span className="agent-md-bullet">›</span>
                    <span>{renderInlineGfm(textOnly, onNavigate)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // 9. Standard Paragraph with mixed line breaks
        return (
          <div key={sIdx} className="agent-md-p" style={{ margin: '0.35rem 0', lineHeight: 1.55 }}>
            {lines.map((line, lIdx) => {
              const isBullet = /^[•\-*]\s+/.test(line.trim());
              if (isBullet) {
                const cleanItem = line.trim().replace(/^[•\-*]\s+/, '');
                return (
                  <div key={lIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', margin: '0.2rem 0' }}>
                    <span className="agent-md-bullet">›</span>
                    <span>{renderInlineGfm(cleanItem, onNavigate)}</span>
                  </div>
                );
              }
              return (
                <div key={lIdx} style={{ marginBottom: lIdx < lines.length - 1 ? '0.2rem' : 0 }}>
                  {renderInlineGfm(line, onNavigate)}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

/**
 * GFM Table Detector
 * Requires: Header row with pipes, and separator row with dashes/colons
 */
function isGfmTable(lines) {
  if (lines.length < 2) return false;
  const headerLine = lines[0].trim();
  const sepLine = lines[1].trim();

  if (!headerLine.includes('|') || !sepLine.includes('|')) return false;

  // Delimiter row must consist of dashes, colons, pipes, and whitespace
  const sepClean = sepLine.replace(/^\|/, '').replace(/\|$/, '');
  const cells = sepClean.split('|');
  return cells.length >= 1 && cells.every(c => /^\s*:?-+:?\s*$/.test(c));
}

function GfmTable({ lines, onNavigate }) {
  const headerRaw = lines[0].trim().replace(/^\|/, '').replace(/\|$/, '');
  const headers = headerRaw.split('|').map(h => h.trim());

  const sepRaw = lines[1].trim().replace(/^\|/, '').replace(/\|$/, '');
  const alignments = sepRaw.split('|').map(s => {
    const trimmed = s.trim();
    const leftColon = trimmed.startsWith(':');
    const rightColon = trimmed.endsWith(':');
    if (leftColon && rightColon) return 'align-center';
    if (rightColon) return 'align-right';
    return 'align-left';
  });

  const bodyRows = lines.slice(2).map(line => {
    const raw = line.trim().replace(/^\|/, '').replace(/\|$/, '');
    return raw.split('|').map(c => c.trim());
  }).filter(row => row.length > 0 && row.some(c => c !== ''));

  return (
    <div className="agent-gfm-table-wrapper">
      <table className="agent-gfm-table">
        <thead>
          <tr>
            {headers.map((h, hIdx) => (
              <th key={hIdx} className={alignments[hIdx] || 'align-left'}>
                {renderInlineGfm(h, onNavigate)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((cell, cIdx) => (
                <td key={cIdx} className={alignments[cIdx] || 'align-left'}>
                  {renderInlineGfm(cell, onNavigate)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * GFM Alert Renderer (> [!NOTE], > [!TIP], etc.)
 */
function GfmAlert({ lines, onNavigate }) {
  const firstLine = lines[0].trim();
  const alertMatch = firstLine.match(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
  const type = alertMatch ? alertMatch[1].toUpperCase() : 'NOTE';

  const bodyLines = lines.slice(1).map(l => l.trim().replace(/^>\s?/, ''));

  const getAlertMeta = (t) => {
    switch (t) {
      case 'TIP':
        return { icon: <Lightbulb size={13} />, title: 'Tip', className: 'tip' };
      case 'IMPORTANT':
        return { icon: <AlertCircle size={13} />, title: 'Important', className: 'important' };
      case 'WARNING':
        return { icon: <AlertTriangle size={13} />, title: 'Warning', className: 'warning' };
      case 'CAUTION':
        return { icon: <ShieldAlert size={13} />, title: 'Caution', className: 'caution' };
      case 'NOTE':
      default:
        return { icon: <Info size={13} />, title: 'Note', className: 'note' };
    }
  };

  const meta = getAlertMeta(type);

  return (
    <div className={`agent-gfm-alert ${meta.className}`}>
      <div className="agent-gfm-alert-header">
        {meta.icon}
        <span>{meta.title}</span>
      </div>
      <div className="agent-gfm-alert-body">
        {bodyLines.map((l, idx) => (
          <div key={idx} style={{ marginBottom: idx < bodyLines.length - 1 ? '0.2rem' : 0 }}>
            {renderInlineGfm(l, onNavigate)}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Renders inline GFM syntax:
 * - Links [label](url)
 * - Autolinks https://...
 * - Strikethrough ~~del~~
 * - Inline code `code`
 * - Bold **bold** / __bold__
 * - Italic *italic* / _italic_
 */
function renderInlineGfm(text, onNavigate) {
  if (!text) return null;

  // 1. Process markdown links [label](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, label, url] = match;
    const index = match.index;

    if (index > lastIndex) {
      parts.push(...parseInlineFormatting(text.substring(lastIndex, index)));
    }

    if (url.startsWith('#')) {
      const sectionId = url.replace('#', '');
      parts.push(
        <button
          key={`${url}-${index}`}
          type="button"
          onClick={() => {
            if (onNavigate) {
              onNavigate(sectionId);
            } else {
              const el = document.getElementById(sectionId);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="agent-action-chip"
        >
          <span>{label}</span>
          <ArrowRight size={10} />
        </button>
      );
    } else {
      parts.push(
        <a
          key={`${url}-${index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="agent-external-link"
        >
          <span>{label}</span>
          <ExternalLink size={10} style={{ display: 'inline', marginLeft: '2px' }} />
        </a>
      );
    }

    lastIndex = index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(...parseInlineFormatting(text.substring(lastIndex)));
  }

  return parts;
}

function parseInlineFormatting(str) {
  // Matches: `code`, ~~strike~~, ***bold italic***, **bold**, *italic*, and raw URLs
  const tokenRegex = /(`[^`]+`|~~[^~]+~~|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s)<>]+)/g;
  const tokens = str.split(tokenRegex);

  return tokens.map((token, i) => {
    if (!token) return null;

    // Inline Code
    if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
      return (
        <code key={i} className="agent-inline-code">
          {token.slice(1, -1)}
        </code>
      );
    }

    // GFM Strikethrough ~~text~~
    if (token.startsWith('~~') && token.endsWith('~~') && token.length >= 4) {
      return (
        <del key={i} className="agent-gfm-del">
          {token.slice(2, -2)}
        </del>
      );
    }

    // Bold + Italic ***text***
    if (token.startsWith('***') && token.endsWith('***') && token.length >= 6) {
      return (
        <strong key={i} className="agent-bold">
          <em className="agent-italic">{token.slice(3, -3)}</em>
        </strong>
      );
    }

    // Bold **text**
    if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
      return (
        <strong key={i} className="agent-bold">
          {token.slice(2, -2)}
        </strong>
      );
    }

    // Italic *text*
    if (token.startsWith('*') && token.endsWith('*') && token.length >= 2) {
      return (
        <em key={i} className="agent-italic">
          {token.slice(1, -1)}
        </em>
      );
    }

    // GFM Autolinks (raw https://... URLs)
    if (/^https?:\/\//.test(token)) {
      return (
        <a
          key={i}
          href={token}
          target="_blank"
          rel="noopener noreferrer"
          className="agent-external-link"
        >
          <span>{token}</span>
          <ExternalLink size={10} style={{ display: 'inline', marginLeft: '2px' }} />
        </a>
      );
    }

    return token;
  });
}
