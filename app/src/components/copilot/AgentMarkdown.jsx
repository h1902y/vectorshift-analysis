import React, { useState } from 'react';
import { Terminal, Check, Copy, ArrowRight, ExternalLink } from 'lucide-react';

export function AgentMarkdown({ content, onNavigate }) {
  if (!content) return null;

  // Split by code blocks
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
        return <FormattedParagraph key={idx} text={block} onNavigate={onNavigate} />;
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
          <span>{language || 'PYTHON / SCHEMA'}</span>
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

function FormattedParagraph({ text, onNavigate }) {
  const paragraphs = text.split(/\n\n+/);

  return (
    <>
      {paragraphs.map((para, pIdx) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        // Headers
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={pIdx} className="agent-md-h4">
              {renderInlineMarkdown(trimmed.replace(/^###\s+/, ''), onNavigate)}
            </h4>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={pIdx} className="agent-md-h3">
              {renderInlineMarkdown(trimmed.replace(/^##\s+/, ''), onNavigate)}
            </h3>
          );
        }
        if (trimmed.startsWith('# ')) {
          return (
            <h2 key={pIdx} className="agent-md-h2">
              {renderInlineMarkdown(trimmed.replace(/^#\s+/, ''), onNavigate)}
            </h2>
          );
        }

        // Bullet lists
        if (trimmed.split('\n').every(line => line.trim().startsWith('• ') || line.trim().startsWith('- ') || line.trim().startsWith('* ') || /^\d+\.\s/.test(line.trim()))) {
          const items = trimmed.split('\n').filter(l => l.trim().length > 0);
          return (
            <ul key={pIdx} className="agent-md-list">
              {items.map((item, iIdx) => {
                const cleanItem = item.replace(/^[•\-*]\s+/, '').replace(/^\d+\.\s+/, '');
                return (
                  <li key={iIdx} className="agent-md-list-item">
                    <span className="agent-md-bullet">›</span>
                    <span>{renderInlineMarkdown(cleanItem, onNavigate)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Blockquotes
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote key={pIdx} className="agent-md-blockquote">
              {renderInlineMarkdown(trimmed.replace(/^>\s+/, ''), onNavigate)}
            </blockquote>
          );
        }

        // Standard Paragraph
        const lines = trimmed.split('\n');
        return (
          <p key={pIdx} className="agent-md-p">
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {renderInlineMarkdown(line, onNavigate)}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
}

function renderInlineMarkdown(text, onNavigate) {
  if (!text) return null;

  // Process markdown links [label](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, label, url] = match;
    const index = match.index;

    if (index > lastIndex) {
      parts.push(formatInlineFormatting(text.substring(lastIndex, index)));
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
    parts.push(formatInlineFormatting(text.substring(lastIndex)));
  }

  return parts;
}

function formatInlineFormatting(str) {
  const tokens = str.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return tokens.map((token, i) => {
    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code key={i} className="agent-inline-code">
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith('**') && token.endsWith('**')) {
      return (
        <strong key={i} className="agent-bold">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith('*') && token.endsWith('*')) {
      return (
        <em key={i} className="agent-italic">
          {token.slice(1, -1)}
        </em>
      );
    }
    return token;
  });
}
