"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp?: string;
}

const getTimeDetails = () => {
    const d = new Date();
    const hours = d.getHours();
    const timeString = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    let timeOfDay = "Morning";
    let greeting = "Good morning";
    
    if (hours >= 12 && hours < 17) {
        timeOfDay = "Afternoon";
        greeting = "Good afternoon";
    } else if (hours >= 17 && hours < 22) {
        timeOfDay = "Evening";
        greeting = "Good evening";
    } else if (hours >= 22 || hours < 5) {
        timeOfDay = "Night";
        greeting = "Hello";
    }
    
    return { timeString, timeOfDay, greeting };
};

const ERROR_MESSAGE =
    "I'm having trouble connecting right now. Please try again or reach out to our team at india@samsanlabs.com";

const SUGGESTION_CHIPS = [
    { label: "⚡ SDV Platform", query: "What are your Software Defined Vehicle (SDV) engineering capabilities?" },
    { label: "🚗 Engineering Services", query: "What core automotive engineering services does SAMSAN provide?" },
    { label: "🤖 TwinLnk & Accelerators", query: "Tell me about TwinLnk, Maestro, and your AI accelerators." },
    { label: "👤 Leadership Team", query: "Who is the CEO and leadership team at SAMSAN?" },
    { label: "📧 Contact & Offices", query: "Where is SAMSAN located and how can I contact sales?" },
];

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const { greeting, timeString } = getTimeDetails();
        setMessages([
            {
                role: "assistant",
                content: `${greeting}! Welcome to SAMSAN Technische Labs! I am your AI Engineering Assistant. Ask me about our Software Defined Vehicle (SDV) stacks, automotive accelerators, leadership team, or engineering engagement models.`,
                timestamp: timeString,
            }
        ]);
    }, []);

    const getTime = () => {
        return getTimeDetails().timeString;
    };

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen, scrollToBottom]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 200);
        }
    }, [isOpen]);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleClearChat = () => {
        const { greeting, timeString } = getTimeDetails();
        setMessages([
            {
                role: "assistant",
                content: `${greeting}! Welcome to SAMSAN Technische Labs! I am your AI Engineering Assistant. Ask me about our Software Defined Vehicle (SDV) stacks, automotive accelerators, leadership team, or engineering engagement models.`,
                timestamp: timeString,
            }
        ]);
        setInput("");
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const sendMessage = async (overrideText?: string) => {
        const trimmed = (overrideText || input).trim();
        if (!trimmed || isLoading) return;

        const { timeString, timeOfDay } = getTimeDetails();
        const userMsg: Message = { role: "user", content: trimmed, timestamp: timeString };
        const newHistory = [...messages, userMsg];

        setMessages(newHistory);
        if (!overrideText) setInput("");
        setIsLoading(true);

        // Prepare placeholder assistant message for streaming
        const assistantIndex = newHistory.length;
        setMessages((prev) => [
            ...prev,
            { role: "assistant", content: "", timestamp: timeString },
        ]);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: newHistory.map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                    userTime: timeString,
                    timeOfDay: timeOfDay,
                }),
            });

            if (!res.ok) throw new Error("API error");

            if (res.body) {
                const reader = res.body.getReader();
                const decoder = new TextDecoder();
                let accumulated = "";

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value, { stream: true });
                    accumulated += chunk;

                    setMessages((prev) => {
                        const copy = [...prev];
                        if (copy[assistantIndex]) {
                            copy[assistantIndex] = {
                                ...copy[assistantIndex],
                                content: accumulated,
                            };
                        }
                        return copy;
                    });
                }
            } else {
                const data = await res.json();
                setMessages((prev) => {
                    const copy = [...prev];
                    if (copy[assistantIndex]) {
                        copy[assistantIndex] = {
                            ...copy[assistantIndex],
                            content: data.reply || ERROR_MESSAGE,
                        };
                    }
                    return copy;
                });
            }
        } catch {
            setMessages((prev) => {
                const copy = [...prev];
                if (copy[assistantIndex]) {
                    copy[assistantIndex] = {
                        ...copy[assistantIndex],
                        content: ERROR_MESSAGE,
                    };
                }
                return copy;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* ── Productive AI Assistant Chat Window Panel ── */}
            <div
                aria-live="polite"
                style={{
                    position: "fixed",
                    bottom: "100px",
                    right: "28px",
                    width: "440px",
                    maxWidth: "calc(100vw - 32px)",
                    height: "640px",
                    maxHeight: "calc(100vh - 120px)",
                    zIndex: 9999,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "24px",
                    overflow: "hidden",
                    backgroundColor: "#0B101D",
                    border: "1px solid rgba(77, 216, 232, 0.25)",
                    boxShadow: "0 32px 96px rgba(0, 0, 0, 0.75), 0 0 40px rgba(139, 92, 246, 0.15)",
                    transform: isOpen ? "scale(1) translateY(0)" : "scale(0.88) translateY(24px)",
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? "all" : "none",
                    transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s ease",
                    transformOrigin: "bottom right",
                    backdropFilter: "blur(20px)",
                }}
            >
                {/* Header Gradient Top Line */}
                <div style={{
                    height: "3px",
                    width: "100%",
                    background: "linear-gradient(90deg, #4DD8E8 0%, #8B5CF6 50%, #FF8A3D 100%)"
                }} />

                {/* Header Container */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px 20px",
                        background: "rgba(15, 23, 42, 0.85)",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                        flexShrink: 0,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        {/* Bot Avatar Icon */}
                        <div
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "12px",
                                background: "linear-gradient(135deg, rgba(77,216,232,0.2) 0%, rgba(139,92,246,0.3) 100%)",
                                border: "1px solid rgba(77,216,232,0.3)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 0 16px rgba(77,216,232,0.25)",
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4DD8E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
                                <rect x="4" y="8" width="16" height="12" rx="4"/>
                                <circle cx="9" cy="13" r="1.5" fill="#4DD8E8"/>
                                <circle cx="15" cy="13" r="1.5" fill="#8B5CF6"/>
                                <path d="M9 17h6"/>
                            </svg>
                        </div>

                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span
                                    style={{
                                        color: "#ffffff",
                                        fontWeight: 800,
                                        fontSize: "0.95rem",
                                        letterSpacing: "-0.01em",
                                        fontFamily: "var(--font-display)",
                                    }}
                                >
                                    SAMSAN Copilot
                                </span>
                                <span style={{
                                    fontSize: "9px",
                                    fontFamily: "var(--font-mono)",
                                    padding: "2px 6px",
                                    borderRadius: "10px",
                                    background: "rgba(77, 216, 232, 0.12)",
                                    color: "#4DD8E8",
                                    border: "1px solid rgba(77, 216, 232, 0.3)",
                                    fontWeight: 600,
                                    textTransform: "uppercase"
                                }}>
                                    AI ACTIVE
                                </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                                <span
                                    style={{
                                        width: "6px",
                                        height: "6px",
                                        borderRadius: "50%",
                                        backgroundColor: "#10B981",
                                        boxShadow: "0 0 8px #10B981",
                                    }}
                                />
                                <span style={{ color: "var(--text-secondary)", fontSize: "0.72rem" }}>
                                    Real-time Streaming • Productive Assistant
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {/* Clear Chat Button */}
                        <button
                            onClick={handleClearChat}
                            title="Reset Chat"
                            aria-label="Clear chat history"
                            style={{
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "8px",
                                color: "var(--text-secondary)",
                                cursor: "pointer",
                                width: "32px",
                                height: "32px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.15s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.14)";
                                e.currentTarget.style.color = "#ffffff";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                                e.currentTarget.style.color = "var(--text-secondary)";
                            }}
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>

                        {/* Close Window Button */}
                        <button
                            onClick={handleClose}
                            title="Close Window"
                            aria-label="Close assistant"
                            style={{
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "8px",
                                color: "var(--text-secondary)",
                                cursor: "pointer",
                                width: "32px",
                                height: "32px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.15s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(239,68,68,0.2)";
                                e.currentTarget.style.color = "#ef4444";
                                e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                                e.currentTarget.style.color = "var(--text-secondary)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Messages Container */}
                <div
                    role="log"
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        scrollbarWidth: "thin",
                        scrollbarColor: "rgba(77,216,232,0.3) transparent",
                    }}
                >
                    {/* Suggestion Quick Chips */}
                    {messages.length <= 1 && (
                        <div style={{ marginBottom: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                            <span style={{
                                fontSize: "10px",
                                fontFamily: "var(--font-mono)",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                color: "rgba(255,255,255,0.4)"
                            }}>
                                Suggested Prompts
                            </span>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                                {SUGGESTION_CHIPS.map((chip, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => sendMessage(chip.query)}
                                        disabled={isLoading}
                                        style={{
                                            padding: "6px 12px",
                                            borderRadius: "16px",
                                            background: "rgba(255, 255, 255, 0.04)",
                                            border: "1px solid rgba(77, 216, 232, 0.2)",
                                            color: "#E2E8F0",
                                            fontSize: "0.78rem",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                            textAlign: "left",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "rgba(77, 216, 232, 0.12)";
                                            e.currentTarget.style.borderColor = "#4DD8E8";
                                            e.currentTarget.style.color = "#ffffff";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                                            e.currentTarget.style.borderColor = "rgba(77, 216, 232, 0.2)";
                                            e.currentTarget.style.color = "#E2E8F0";
                                        }}
                                    >
                                        {chip.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                                gap: "4px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    maxWidth: "90%",
                                    flexDirection: msg.role === "user" ? "row-reverse" : "row",
                                    alignItems: "flex-start",
                                }}
                            >
                                {/* Mini Avatar */}
                                {msg.role === "assistant" && (
                                    <div
                                        style={{
                                            width: "28px",
                                            height: "28px",
                                            borderRadius: "8px",
                                            background: "rgba(77,216,232,0.15)",
                                            border: "1px solid rgba(77,216,232,0.3)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                            marginTop: "2px",
                                        }}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4DD8E8" strokeWidth="2">
                                            <rect x="4" y="8" width="16" height="12" rx="3"/>
                                            <circle cx="9" cy="13" r="1" fill="#4DD8E8"/>
                                            <circle cx="15" cy="13" r="1" fill="#8B5CF6"/>
                                        </svg>
                                    </div>
                                )}

                                {/* Bubble Box */}
                                <div
                                    className="chat-bubble"
                                    style={{
                                        position: "relative",
                                        padding: "12px 16px",
                                        borderRadius:
                                            msg.role === "user"
                                                ? "20px 20px 4px 20px"
                                                : "20px 20px 20px 4px",
                                        background:
                                            msg.role === "user"
                                                ? "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)"
                                                : "rgba(255, 255, 255, 0.05)",
                                        color: "#F1F5F9",
                                        fontSize: "0.88rem",
                                        lineHeight: "1.6",
                                        border:
                                            msg.role === "user"
                                                ? "1px solid rgba(139, 92, 246, 0.5)"
                                                : "1px solid rgba(255, 255, 255, 0.08)",
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word",
                                        boxShadow:
                                            msg.role === "user"
                                                ? "0 4px 14px rgba(124, 58, 237, 0.3)"
                                                : "0 4px 12px rgba(0, 0, 0, 0.2)",
                                    }}
                                >
                                    {msg.content || (
                                        <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
                                            <span className="dot-pulse" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4DD8E8" }} />
                                            <span className="dot-pulse" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#8B5CF6", animationDelay: "0.2s" }} />
                                            <span className="dot-pulse" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF8A3D", animationDelay: "0.4s" }} />
                                        </span>
                                    )}

                                    {/* Copy Action for Assistant Messages */}
                                    {msg.role === "assistant" && msg.content && (
                                        <button
                                            onClick={() => copyToClipboard(msg.content, i)}
                                            title="Copy answer"
                                            style={{
                                                marginTop: "8px",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "4px",
                                                background: "transparent",
                                                border: "none",
                                                color: copiedIndex === i ? "#10B981" : "rgba(255,255,255,0.4)",
                                                fontSize: "0.72rem",
                                                cursor: "pointer",
                                                padding: 0,
                                                transition: "color 0.15s ease",
                                            }}
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                            </svg>
                                            {copiedIndex === i ? "Copied!" : "Copy response"}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Timestamp */}
                            <span
                                style={{
                                    fontSize: "0.68rem",
                                    color: "rgba(255, 255, 255, 0.35)",
                                    padding: "0 4px",
                                    fontFamily: "var(--font-mono)",
                                }}
                            >
                                {msg.timestamp || ""}
                            </span>
                        </div>
                    ))}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Dock Area */}
                <div
                    style={{
                        padding: "14px 18px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                        backgroundColor: "rgba(10, 15, 28, 0.85)",
                        flexShrink: 0,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "center",
                            background: "rgba(255, 255, 255, 0.04)",
                            borderRadius: "16px",
                            border: "1px solid rgba(77, 216, 232, 0.25)",
                            padding: "8px 10px 8px 16px",
                            transition: "all 0.2s ease",
                            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)",
                        }}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            id="chat-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your question or request..."
                            disabled={isLoading}
                            style={{
                                flex: 1,
                                background: "transparent",
                                border: "none",
                                outline: "none",
                                color: "#F8FAFC",
                                fontSize: "0.9rem",
                                lineHeight: "1.4",
                            }}
                            aria-label="Chat message input"
                        />
                        <button
                            onClick={() => sendMessage()}
                            disabled={!input.trim() || isLoading}
                            aria-label="Send message"
                            style={{
                                background:
                                    input.trim() && !isLoading
                                        ? "linear-gradient(135deg, #4DD8E8 0%, #7C3AED 100%)"
                                        : "rgba(255,255,255,0.06)",
                                border: "none",
                                borderRadius: "12px",
                                color: "#ffffff",
                                cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                                width: "44px",
                                height: "44px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                                flexShrink: 0,
                                boxShadow: input.trim() && !isLoading ? "0 4px 16px rgba(77,216,232,0.4)" : "none",
                            }}
                            onMouseEnter={(e) => {
                                if (input.trim() && !isLoading)
                                    e.currentTarget.style.transform = "scale(1.08)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                        >
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"/>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                            </svg>
                        </button>
                    </div>

                    {/* Footer Branding */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: "10px",
                            padding: "0 4px",
                        }}
                    >
                        <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-mono)" }}>
                            SAMSAN Intelligence • Groq LLaMA
                        </span>
                        <span style={{ fontSize: "0.68rem", color: "#4DD8E8", fontFamily: "var(--font-mono)" }}>
                            samsanlabs.com
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Prominent Floating Trigger Button (Large + Gentle Float Animation) ── */}
            <div
                style={{
                    position: "fixed",
                    bottom: "28px",
                    right: "28px",
                    zIndex: 10000,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                {/* Active Tooltip Label on Hover / Floating status */}
                {!isOpen && (
                    <div
                        className="bot-tooltip-label"
                        onClick={handleOpen}
                        style={{
                            padding: "8px 14px",
                            borderRadius: "14px",
                            background: "rgba(13, 19, 35, 0.9)",
                            border: "1px solid rgba(77, 216, 232, 0.3)",
                            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                            color: "#ffffff",
                            fontSize: "0.82rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            backdropFilter: "blur(12px)",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            transition: "all 0.25s ease",
                            animation: "chatBotFloat 3.5s ease-in-out infinite",
                        }}
                    >
                        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4DD8E8", boxShadow: "0 0 8px #4DD8E8" }} />
                        Talk to SAMSAN AI
                    </div>
                )}

                <button
                    onClick={isOpen ? handleClose : handleOpen}
                    aria-label={isOpen ? "Close SAMSAN AI Assistant" : "Open SAMSAN AI Assistant"}
                    aria-expanded={isOpen}
                    style={{
                        position: "relative",
                        width: "68px",
                        height: "68px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #7C3AED 0%, #4DD8E8 100%)",
                        border: "2px solid rgba(255, 255, 255, 0.2)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 12px 36px rgba(124, 58, 237, 0.55), 0 0 24px rgba(77, 216, 232, 0.35)",
                        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        animation: isOpen ? "none" : "chatBotFloat 3.5s ease-in-out infinite",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.12)";
                        e.currentTarget.style.boxShadow =
                            "0 16px 44px rgba(124,58,237,0.7), 0 0 32px rgba(77,216,232,0.5)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow =
                            "0 12px 36px rgba(124, 58, 237, 0.55), 0 0 24px rgba(77, 216, 232, 0.35)";
                    }}
                >
                    {/* Live Pulse Ring */}
                    {!isOpen && (
                        <div
                            style={{
                                position: "absolute",
                                inset: "-6px",
                                borderRadius: "50%",
                                border: "1.5px solid rgba(77, 216, 232, 0.6)",
                                animation: "chatBotPulseRing 2.4s ease-out infinite",
                                pointerEvents: "none",
                            }}
                        />
                    )}

                    {/* Toggle Icon */}
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "transform 0.3s ease, opacity 0.2s",
                            transform: isOpen ? "rotate(90deg) scale(0.9)" : "rotate(0deg) scale(1)",
                        }}
                    >
                        {isOpen ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        ) : (
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
                                <rect x="4" y="8" width="16" height="12" rx="4"/>
                                <circle cx="9" cy="13" r="1.5" fill="#ffffff"/>
                                <circle cx="15" cy="13" r="1.5" fill="#ffffff"/>
                                <path d="M9 17h6"/>
                            </svg>
                        )}
                    </span>
                </button>
            </div>

            {/* CSS Keyframe Animations */}
            <style>{`
                @keyframes chatBotFloat {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes chatBotPulseRing {
                    0% { transform: scale(0.95); opacity: 0.8; }
                    50% { transform: scale(1.15); opacity: 0.3; }
                    100% { transform: scale(1.3); opacity: 0; }
                }
                @keyframes dotPulseAnim {
                    0%, 100% { opacity: 0.3; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
                .dot-pulse {
                    animation: dotPulseAnim 1.2s infinite ease-in-out;
                }
            `}</style>
        </>
    );
}
