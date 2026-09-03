import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowUp,
  Sparkles,
  Send,
  ArrowRight,
  RefreshCw,
  X,
  Cpu
} from 'lucide-react';
import { ROTATING_PROMPTS, POPOVER_CATEGORIES, PREDEFINED_JOURNEYS } from '../../data/agentKnowledgeBase';
import { PydanticAgentRuntime } from '../../lib/agent/pydanticAgentRuntime';
import { AgentTraceView } from './AgentTraceView';
import { AgentMarkdown } from './AgentMarkdown';
import { SchemaInspectorView } from './SchemaInspectorView';

export function FloatingAgentOmnichat({ onNavigate, onRunSimulation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [activeDialogTab, setActiveDialogTab] = useState('chat'); // 'chat' | 'schemas'
  const [selectedSchemaKey, setSelectedSchemaKey] = useState('AgentResponsePayload');
  const [promptIndex, setPromptIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');

  // Conversation & Runtime State
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeOptions, setActiveOptions] = useState([]);
  const [toolToast, setToolToast] = useState(null);

  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize Pydantic Agent Runtime
  const runtime = useMemo(() => {
    return new PydanticAgentRuntime({ onNavigate, onRunSimulation });
  }, [onNavigate, onRunSimulation]);

  // 1. Rotating placeholder animation
  useEffect(() => {
    if (isOpen || isFocused || isPopOpen) return;
    const timer = setInterval(() => {
      setPromptIndex(prev => (prev + 1) % ROTATING_PROMPTS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isOpen, isFocused, isPopOpen]);

  // 2. Click outside, Cmd+K, & Escape key listeners
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
        setIsHovered(false);
        setIsPopOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsFocused(false);
        setIsHovered(false);
        setIsPopOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // 3. Auto-scroll chat history
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Handle Query Submission
  const submitQuery = async (text) => {
    if (!text || !text.trim() || isLoading) return;
    const cleanText = text.trim();

    setIsFocused(false);
    setIsHovered(false);
    setIsPopOpen(false);
    setIsOpen(true);

    const userMsg = { role: 'user', content: cleanText };
    const assistantMsgIndex = messages.length + 1;

    // Add user message & placeholder assistant message
    setMessages(prev => [
      ...prev,
      userMsg,
      {
        role: 'assistant',
        content: '',
        trace: null,
        citations: [],
        followUpOptions: []
      }
    ]);
    setIsLoading(true);

    try {
      const result = await runtime.processQuery({
        text: cleanText,
        onTraceUpdate: (liveTrace) => {
          const lastStep = liveTrace.steps[liveTrace.steps.length - 1];
          if (lastStep) {
            setActiveSubsystem(lastStep.subsystem);
            if (lastStep.subsystem === 'TOOL_EXECUTION') {
              setToolToast(`⚡ MCP Dispatched: ${lastStep.title}`);
              setTimeout(() => setToolToast(null), 3800);
            }
          }
          setMessages(prev => {
            const next = [...prev];
            if (next[assistantMsgIndex]) {
              next[assistantMsgIndex] = {
                ...next[assistantMsgIndex],
                trace: liveTrace
              };
            }
            return next;
          });
        },
        onStreamDelta: (accumulatedMarkdown) => {
          setMessages(prev => {
            const next = [...prev];
            if (next[assistantMsgIndex]) {
              next[assistantMsgIndex] = {
                ...next[assistantMsgIndex],
                content: accumulatedMarkdown
              };
            }
            return next;
          });
        }
      });

      // Complete the assistant response
      setMessages(prev => {
        const next = [...prev];
        if (next[assistantMsgIndex]) {
          next[assistantMsgIndex] = {
            ...next[assistantMsgIndex],
            content: result.content,
            trace: result.trace,
            citations: result.citations,
            followUpOptions: result.followUpOptions
          };
        }
        return next;
      });
      setActiveOptions(result.followUpOptions || []);
    } catch (err) {
      console.error('[Pydantic Agent Error]:', err);
      setMessages(prev => {
        const next = [...prev];
        if (next[assistantMsgIndex]) {
          next[assistantMsgIndex] = {
            ...next[assistantMsgIndex],
            content: `**Agent Runtime Notice**: Encountered execution error: ${err.message}. Please retry with another architectural query.`
          };
        }
        return next;
      });
    } finally {
      setIsLoading(false);
      setActiveSubsystem(null);
    }
  };

  const handleStartJourney = (journey) => {
    if (journey.quickOptions) {
      setActiveOptions(journey.quickOptions);
    }
    submitQuery(journey.initialQuery);
  };

  const handleReset = () => {
    setMessages([]);
    setActiveOptions([]);
    setIsLoading(false);
  };

  const isSuggestionsOpen = (isHovered || isFocused || isPopOpen) && !isOpen;

  return (
    <>
      {/* ── PINNED BOTTOM FLOATING CONSOLE ── */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="floating-omnichat-anchor"
      >
        {/* ── HIGH-FIDELITY BLUEPRINT SUGGESTIONS POPOVER DRAWER ── */}
        {isSuggestionsOpen && (
          <div className="blueprint-suggestions-drawer animate-in">
            {/* CAD Corner Ticks */}
            <div className="corner-node tl" />
            <div className="corner-node tr" />

            {/* Popover Header */}
            <div className="blueprint-drawer-header">
              <span className="blueprint-header-title">
                <Sparkles size={12} style={{ color: 'var(--accent-crimson)' }} />
                <span>KNOWLEDGE GRAPH &middot; DIRECT DISPATCH</span>
              </span>
              <span className="blueprint-live-badge">
                <span className="telemetry-dot-pulse green" />
                <span>MCP ACTIVE</span>
              </span>
            </div>

            {/* Categorized Inquiries */}
            <div className="blueprint-drawer-body">
              {POPOVER_CATEGORIES.map(group => (
                <div key={group.category} className="blueprint-group">
                  <div className="blueprint-group-label">
                    <span className="blueprint-group-index">{group.index}</span>
                    <span className="blueprint-group-title">{group.category}</span>
                  </div>

                  <div className="blueprint-items-list">
                    {group.items.map(item => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => submitQuery(item.query)}
                        className="blueprint-item-btn"
                      >
                        <div className="blueprint-item-left">
                          <span className="blueprint-item-icon">{item.icon}</span>
                          <span className="blueprint-item-text">{item.label}</span>
                        </div>
                        <div className="blueprint-item-right">
                          <kbd className="blueprint-kbd">↵</kbd>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Telemetry Footnote */}
            <div className="blueprint-drawer-footer">
              <span>519 Pages &middot; 43 Evidence Plates &middot; Pydantic V2</span>
              <span>Click to query &rarr;</span>
            </div>
          </div>
        )}

        {/* ── THE MAIN INPUT CONSOLE (CRISP CAD RECTANGULAR GEOMETRY) ── */}
        <div
          onClick={() => {
            if (messages.length > 0) {
              setIsOpen(true);
            } else {
              setIsPopOpen(true);
              setIsFocused(true);
            }
          }}
          className="omnichat-input-bar"
        >
          {/* Agent Badge (Agent Chip) */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (messages.length > 0) {
                setIsOpen(true);
              } else {
                setIsPopOpen(prev => !prev);
              }
            }}
            className="omnichat-chip"
            title="Toggle Agent Drawer"
          >
            <span className="telemetry-dot-pulse green" />
            <span>
              {messages.length > 0 ? `AGENT (${messages.length})` : 'AGENT'}
            </span>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputVal.trim()) {
                submitQuery(inputVal.trim());
                setInputVal('');
              } else {
                setIsOpen(true);
              }
            }}
            className="omnichat-form"
          >
            <input
              type="text"
              value={inputVal}
              onClick={() => {
                if (messages.length > 0) setIsOpen(true);
                else {
                  setIsPopOpen(true);
                  setIsFocused(true);
                }
              }}
              onFocus={() => {
                if (messages.length > 0) setIsOpen(true);
                else {
                  setIsPopOpen(true);
                  setIsFocused(true);
                }
              }}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={
                messages.length > 0
                  ? "Resume conversation with Agent (⌘K)..."
                  : (isPopOpen || isFocused)
                    ? "Select an inquiry above or type your prompt..."
                    : ROTATING_PROMPTS[promptIndex]
              }
              className="omnichat-text-input"
            />

            <kbd className="omnichat-cmd-kbd" title="Press ⌘K to open">⌘K</kbd>

            <button
              type="submit"
              className="omnichat-submit-btn"
              title="Send to Agent"
            >
              <ArrowUp size={15} />
            </button>
          </form>
        </div>
      </div>

      {/* ── EXPANDED INTERACTIVE AGENT MODAL / DRAWER ── */}
      {isOpen && (
        <div
          className="omnichat-modal-overlay animate-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="omnichat-modal-container" onClick={e => e.stopPropagation()}>
            {/* Header Ribbon */}
            <div className="omnichat-modal-header" style={{ padding: '0.75rem 1.2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="telemetry-dot-pulse green" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em' }}>
                  AGENT
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.35)', fontSize: '0.75rem' }}>&middot;</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.72rem', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                  Architecture Oracle
                </span>
              </div>

              {/* Minimal Clean Tabs & Actions (Zero Pill Noise) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="omnichat-clean-tabs">
                  <button
                    type="button"
                    className={`omnichat-clean-tab ${activeDialogTab === 'chat' ? 'active' : ''}`}
                    onClick={() => setActiveDialogTab('chat')}
                  >
                    Chat
                  </button>

                  <button
                    type="button"
                    className={`omnichat-clean-tab ${activeDialogTab === 'schemas' ? 'active' : ''}`}
                    onClick={() => setActiveDialogTab('schemas')}
                  >
                    Schemas &amp; Tools (8)
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="omnichat-icon-btn"
                    title="Clear conversation"
                  >
                    <RefreshCw size={13} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="omnichat-icon-btn"
                    title="Close"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active MCP Tool Execution Toast Banner */}
            {toolToast && (
              <div className="omnichat-tool-toast-banner animate-in">
                <span className="telemetry-dot-pulse green" />
                <span>{toolToast}</span>
              </div>
            )}

            {activeDialogTab === 'chat' ? (
              <>
                {/* Modal Body / Chat Flow */}
                <div className="omnichat-modal-body">
              {/* Empty State: 4 Guided Architectural Journeys */}
              {messages.length === 0 && (
                <div className="guided-journeys-container">
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.5rem', background: 'var(--code-bg)', border: '1px solid var(--code-border)', borderRadius: '2px', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent-crimson)', marginBottom: '0.4rem' }}>
                      <Sparkles size={11} />
                      <span>GROUNDED IN 519 PAGES &middot; 43 EXPLORATION PLATES &middot; PYDANTIC CONTRACTS</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
                      Choose an Observable Architecture Journey
                    </h3>
                    <p style={{ fontFamily: 'var(--font-serif-body)', fontSize: '0.9rem', color: 'var(--ink-secondary)', marginTop: '0.2rem' }}>
                      Watch the agent execute vector chunk lookups, mount Pydantic skills, dispatch MCP tools, and manipulate the application.
                    </p>
                  </div>

                  <div className="guided-journeys-grid">
                    {PREDEFINED_JOURNEYS.map(journey => (
                      <button
                        key={journey.id}
                        type="button"
                        onClick={() => handleStartJourney(journey)}
                        className="journey-card-btn"
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '1.4rem' }}>{journey.icon}</span>
                          <ArrowRight size={14} className="journey-card-arrow" />
                        </div>
                        <div className="journey-card-title">{journey.title}</div>
                        <div className="journey-card-subtitle">{journey.subtitle}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`chat-message-bubble ${msg.role === 'user' ? 'user-turn' : 'assistant-turn'}`}
                >
                  <div className="chat-role-label">
                    <span>{msg.role === 'user' ? 'YOU' : 'AGENT'}</span>
                  </div>

                  <div className={`chat-bubble-card ${msg.role === 'user' ? 'user' : 'assistant'}`}>
                    {msg.role === 'assistant' ? (
                      <>
                        {/* Live Observable Execution Trace */}
                        {msg.trace && (
                          <AgentTraceView 
                            trace={msg.trace} 
                            onInspectSchema={(sName) => {
                              if (sName) setSelectedSchemaKey(sName);
                              setActiveDialogTab('schemas');
                            }} 
                          />
                        )}

                        {/* Markdown Formatted Content */}
                        <AgentMarkdown
                          content={msg.content}
                          isStreaming={isLoading && i === messages.length - 1}
                          onNavigate={(sec) => {
                            if (onNavigate) onNavigate(sec);
                            else {
                              const el = document.getElementById(sec);
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }}
                        />

                        {isLoading && i === messages.length - 1 && !msg.content && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--ink-secondary)', padding: '0.4rem 0' }}>
                            <span className="telemetry-dot-pulse green" style={{ width: 6, height: 6 }} />
                            <span>Synthesizing verified architectural response...</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.86rem', fontWeight: 600 }}>
                        {msg.content}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Dynamic Follow-Up Journey Chips */}
              {activeOptions.length > 0 && !isLoading && messages.length > 0 && (
                <div className="follow-up-options-container">
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800, color: 'var(--accent-crimson)', marginBottom: '0.4rem' }}>
                    NEXT STEPS IN THIS AGENTIC JOURNEY:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {activeOptions.map(opt => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => {
                          if (opt.action_type === 'navigate' && opt.target) {
                            if (onNavigate) onNavigate(opt.target);
                            else {
                              const el = document.getElementById(opt.target);
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          } else {
                            submitQuery(opt.query);
                          }
                        }}
                        className="follow-up-chip-btn"
                      >
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Modal Input Footer */}
            <div className="omnichat-modal-footer">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const input = form.elements.namedItem('chatInput');
                  if (input && input.value.trim()) {
                    submitQuery(input.value.trim());
                    input.value = '';
                  }
                }}
                style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
              >
                <input
                  name="chatInput"
                  type="text"
                  disabled={isLoading}
                  placeholder="Ask an architectural question, request an analysis, or trigger an MCP tool (⌘K)..."
                  className="omnichat-modal-input"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="omnichat-modal-send-btn"
                >
                  <span>Dispatch</span>
                  <Send size={12} />
                </button>
              </form>

              <div className="modal-telemetry-status">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Cpu size={11} style={{ color: 'var(--accent-crimson)' }} />
                  <span>Protocol: JSON-RPC 2.0 &middot; Pydantic V2 Invariants Active</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="telemetry-dot-pulse green" />
                  <span>100% Client/Local Verified</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="omnichat-modal-body omnichat-modal-body--schemas" style={{ padding: '0.9rem 1.2rem', overflowY: 'auto', flex: 1 }}>
            <SchemaInspectorView 
              initialSchema={selectedSchemaKey}
              onReturnToChat={() => setActiveDialogTab('chat')}
            />
          </div>
        )}
      </div>
    </div>
      )}
    </>
  );
}
