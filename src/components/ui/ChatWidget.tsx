"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const WELCOME_MESSAGE: Message = {
    role: "assistant",
    content:
        "Hi! I'm the SAMSAN Assistant. Ask me anything about our solutions, services, or how we can help with your engineering needs.",
};

const ERROR_MESSAGE =
    "I'm having trouble connecting right now. Please try again or visit our Contact page for assistance.";

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen, scrollToBottom]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 150);
        }
    }, [isOpen]);

    const handleOpen = () => {
        if (!hasOpened) {
            setHasOpened(true);
        }
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        // Reset conversation on close
        setTimeout(() => {
            setMessages([WELCOME_MESSAGE]);
            setInput("");
            setHasOpened(false);
        }, 300);
    };

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;

        const userMessage: Message = { role: "user", content: trimmed };
        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: updatedMessages.map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            if (!res.ok) throw new Error("API error");
            const data = await res.json();
            const reply = data.reply || ERROR_MESSAGE;
            setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: ERROR_MESSAGE },
            ]);
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
            {/* ── Floating Panel ── */}
            <div
                aria-live="polite"
                style={{
                    position: "fixed",
                    bottom: "88px",
                    right: "24px",
                    width: "360px",
                    height: "480px",
                    zIndex: 9999,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "20px",
                    overflow: "hidden",
                    backgroundColor: "#0d1324",
                    border: "1px solid rgba(139,92,246,0.25)",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(139,92,246,0.1)",
                    transform: isOpen ? "scale(1) translateY(0)" : "scale(0.92) translateY(16px)",
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? "all" : "none",
                    transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease",
                    transformOrigin: "bottom right",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "14px 18px",
                        background: "linear-gradient(135deg, rgba(124,58,237,0.35) 0%, rgba(139,92,246,0.2) 100%)",
                        borderBottom: "1px solid rgba(139,92,246,0.2)",
                        flexShrink: 0,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {/* Status dot */}
                        <span
                            style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor: "#10B981",
                                boxShadow: "0 0 6px #10B981",
                                flexShrink: 0,
                            }}
                        />
                        <span
                            style={{
                                color: "#F0F4FF",
                                fontWeight: 700,
                                fontSize: "0.9rem",
                                letterSpacing: "0.01em",
                            }}
                        >
                            SAMSAN Assistant
                        </span>
                    </div>
                    <button
                        onClick={handleClose}
                        aria-label="Close chat"
                        style={{
                            background: "rgba(255,255,255,0.08)",
                            border: "none",
                            borderRadius: "8px",
                            color: "#9CA8C4",
                            cursor: "pointer",
                            fontSize: "1.1rem",
                            width: "28px",
                            height: "28px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.15s, color 0.15s",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.16)";
                            (e.currentTarget as HTMLButtonElement).style.color = "#F0F4FF";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
                            (e.currentTarget as HTMLButtonElement).style.color = "#9CA8C4";
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Messages */}
                <div
                    role="log"
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        scrollbarWidth: "thin",
                        scrollbarColor: "rgba(139,92,246,0.3) transparent",
                    }}
                >
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: "82%",
                                    padding: "10px 14px",
                                    borderRadius:
                                        msg.role === "user"
                                            ? "16px 16px 4px 16px"
                                            : "16px 16px 16px 4px",
                                    backgroundColor:
                                        msg.role === "user"
                                            ? "rgba(139,92,246,0.85)"
                                            : "rgba(255,255,255,0.06)",
                                    color: "#F0F4FF",
                                    fontSize: "0.85rem",
                                    lineHeight: "1.55",
                                    border:
                                        msg.role === "user"
                                            ? "none"
                                            : "1px solid rgba(255,255,255,0.08)",
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                }}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isLoading && (
                        <div style={{ display: "flex", justifyContent: "flex-start" }}>
                            <div
                                style={{
                                    padding: "12px 16px",
                                    borderRadius: "16px 16px 16px 4px",
                                    backgroundColor: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    display: "flex",
                                    gap: "5px",
                                    alignItems: "center",
                                }}
                            >
                                {[0, 1, 2].map((dot) => (
                                    <span
                                        key={dot}
                                        style={{
                                            width: "7px",
                                            height: "7px",
                                            borderRadius: "50%",
                                            backgroundColor: "#8B5CF6",
                                            display: "inline-block",
                                            animation: "chatDotBounce 1.2s ease-in-out infinite",
                                            animationDelay: `${dot * 0.2}s`,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div
                    style={{
                        padding: "12px 14px",
                        borderTop: "1px solid rgba(255,255,255,0.07)",
                        backgroundColor: "rgba(10,15,28,0.6)",
                        flexShrink: 0,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                            background: "rgba(255,255,255,0.05)",
                            borderRadius: "12px",
                            border: "1px solid rgba(139,92,246,0.2)",
                            padding: "6px 8px 6px 14px",
                            transition: "border-color 0.15s",
                        }}
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            id="chat-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask me anything…"
                            disabled={isLoading}
                            style={{
                                flex: 1,
                                background: "transparent",
                                border: "none",
                                outline: "none",
                                color: "#F0F4FF",
                                fontSize: "0.85rem",
                                lineHeight: "1.4",
                            }}
                            aria-label="Chat message input"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim() || isLoading}
                            aria-label="Send message"
                            style={{
                                background:
                                    input.trim() && !isLoading
                                        ? "linear-gradient(135deg, #7C3AED, #8B5CF6)"
                                        : "rgba(255,255,255,0.08)",
                                border: "none",
                                borderRadius: "9px",
                                color: "#fff",
                                cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                                padding: "7px 12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "background 0.2s, transform 0.1s",
                                flexShrink: 0,
                            }}
                            onMouseEnter={(e) => {
                                if (input.trim() && !isLoading)
                                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                            }}
                        >
                            {/* Send icon */}
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"/>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                            </svg>
                        </button>
                    </div>

                    {/* Footer */}
                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "8px",
                            fontSize: "0.5rem",
                            color: "#4B5578",
                            letterSpacing: "0.05em",
                        }}
                    >
                        Powered by AI · SAMSAN Technische Labs
                    </p>
                </div>
            </div>

            {/* ── Floating Bubble Button ── */}
            <button
                onClick={isOpen ? handleClose : handleOpen}
                aria-label={isOpen ? "Close SAMSAN Assistant" : "Open SAMSAN Assistant"}
                aria-expanded={isOpen}
                style={{
                    position: "fixed",
                    bottom: "24px",
                    right: "24px",
                    zIndex: 10000,
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 24px rgba(124,58,237,0.45), 0 2px 8px rgba(0,0,0,0.3)",
                    transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 12px 32px rgba(124,58,237,0.6), 0 2px 8px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 8px 24px rgba(124,58,237,0.45), 0 2px 8px rgba(0,0,0,0.3)";
                }}
            >
                {/* Toggle icon: chat ↔ close */}
                <span
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.25s, opacity 0.2s",
                        transform: isOpen ? "rotate(90deg) scale(0.9)" : "rotate(0deg) scale(1)",
                    }}
                >
                    {isOpen ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                    )}
                </span>
            </button>

            {/* Keyframe animation for typing dots */}
            <style>{`
                @keyframes chatDotBounce {
                    0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
                    30% { transform: translateY(-5px); opacity: 1; }
                }
            `}</style>
        </>
    );
}
