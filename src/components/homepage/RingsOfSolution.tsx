"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView, type Variants } from "framer-motion";

// ── Solution data (untouched) ────────────────────────────────────────────────
interface SolutionPoint {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    /** Position as % of panel width/height */
    x: number;
    y: number;
}

const solutions: SolutionPoint[] = [
    {
        id: 1,
        title: "Digital Cockpit",
        subtitle: "In-Vehicle Infotainment",
        description: "Digital Cluster & Infotainment for seamless and connected driving experience.",
        features: [
            "Digital Instrument Cluster",
            "Center Head Unit Display",
            "Rear Seat Entertainment",
            "Multi-Display Sync",
        ],
        x: 50.2,
        y: 37.5,
    },
    {
        id: 2,
        title: "ADAS Front Camera",
        subtitle: "Advanced Driver Assistance",
        description: "Road facing camera for lane detection, forward collision warning, adaptive cruise control and more.",
        features: [
            "Lane Departure Warning",
            "Forward Collision Alert",
            "Adaptive Cruise Control",
            "Traffic Sign Recognition",
        ],
        x: 25.9,
        y: 61.8,
    },
    {
        id: 3,
        title: "DMS",
        subtitle: "Driver Monitoring System",
        description: "Driver facing camera integrated near rear view mirror to monitor driver behavior and attention.",
        features: [
            "Drowsiness Detection",
            "Distraction Monitoring",
            "Gaze Tracking",
            "Fatigue Alerting",
        ],
        x: 52.4,
        y: 26.6,
    },
    {
        id: 4,
        title: "Telematics ECU",
        subtitle: "Connected Vehicle Gateway",
        description: "Telematics control unit located behind the cluster for connectivity, remote diagnostics, OTA updates and cloud services.",
        features: [
            "Remote Diagnostics",
            "OTA Firmware Updates",
            "Cloud Connectivity",
            "Fleet Management API",
        ],
        x: 58.6,
        y: 43.5,
    },
    {
        id: 5,
        title: "Surround View",
        subtitle: "360° Camera System",
        description: "360° visibility for parking assist and driving safety with multi-camera fusion.",
        features: [
            "Left Camera (Mirror)",
            "Right Camera (Mirror)",
            "Front Camera",
            "Rear Camera",
        ],
        x: 37.8,
        y: 32.1,
    },
];

// ── Fade-up animation (once, 24px, 0.5s) ────────────────────────────────────
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// ── Hotspot ──────────────────────────────────────────────────────────────────
function Hotspot({
    point,
    isActive,
    anyOpen,
    onClick,
    shouldReduce,
}: {
    point: SolutionPoint;
    isActive: boolean;
    anyOpen: boolean;
    onClick: () => void;
    shouldReduce: boolean;
}) {
    const showPulse = !shouldReduce && !anyOpen;

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={`${point.title} — click to explore`}
            aria-expanded={isActive}
            style={{
                position: "absolute",
                left: `${point.x}%`,
                top: `${point.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: isActive ? 20 : 10,
                /* 44×44 hit area, 40px visible circle */
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                outline: "none",
                borderRadius: "50%",
            }}
            className={`ros-hs${isActive ? " ros-hs--open" : ""}`}
        >
            {/* Pulse ring — only while nothing is open */}
            {showPulse && (
                <span
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "2px solid rgba(255,255,255,0.6)",
                        transform: "translate(-50%,-50%)",
                        animation: "ros-pulse 2.4s ease-out infinite",
                        pointerEvents: "none",
                    }}
                />
            )}

            {/* Visible circle */}
            <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: isActive ? "var(--cta, #E8491D)" : "#FFFFFF",
                    boxShadow: "0 0 0 4px rgba(255,255,255,0.28), 0 6px 16px rgba(0,0,0,0.35)",
                    transition: "background 0.2s ease, transform 0.2s ease",
                    color: isActive ? "#FFFFFF" : "#005F8A",
                    flexShrink: 0,
                }}
            >
                <svg
                    width="20" height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden="true"
                    style={{
                        transform: isActive ? "rotate(45deg)" : "none",
                        transition: "transform 0.2s ease",
                    }}
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </span>
        </button>
    );
}

// ── Popup card ───────────────────────────────────────────────────────────────
function Popup({
    point,
    onClose,
    isMobile,
}: {
    point: SolutionPoint;
    onClose: () => void;
    isMobile: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        function onDown(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                if ((e.target as HTMLElement).closest(".ros-hs")) return;
                onClose();
            }
        }
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, [onClose]);

    // Close on Escape
    useEffect(() => {
        function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    // Focus trap: move focus into popup on open
    useEffect(() => {
        const el = ref.current?.querySelector<HTMLElement>("button, [tabindex]");
        el?.focus();
    }, []);

    // Position: flip toward centre near edges. Mobile → pinned bottom.
    const flipLeft = point.x > 55;
    const positionStyle: React.CSSProperties = isMobile
        ? { left: "12px", right: "12px", bottom: "12px", top: "auto", width: "auto", maxWidth: "none" }
        : flipLeft
            ? { right: `${100 - point.x + 5}%`, top: `clamp(8px, ${Math.max(point.y - 6, 2)}%, calc(100% - 340px))` }
            : { left: `${point.x + 5}%`, top: `clamp(8px, ${Math.max(point.y - 6, 2)}%, calc(100% - 340px))` };

    return (
        <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label={point.title}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            style={{
                position: "absolute",
                zIndex: 40,
                width: "280px",
                maxWidth: "280px",
                background: "#FFFFFF",
                border: "1px solid var(--border, #E2E8F0)",
                borderRadius: "12px",
                padding: "16px 18px",
                boxShadow: "0 12px 32px rgba(0,0,0,0.3)",
                ...positionStyle,
            }}
        >
            {/* Caret */}
            {!isMobile && (
                <span
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        top: "18px",
                        ...(flipLeft ? { right: "-9px", borderLeft: "10px solid #FFFFFF" } : { left: "-9px", borderRight: "10px solid #FFFFFF" }),
                        borderTop: "7px solid transparent",
                        borderBottom: "7px solid transparent",
                        width: 0,
                        height: 0,
                    }}
                />
            )}

            {/* Close */}
            <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    border: "1px solid var(--border, #E2E8F0)",
                    background: "transparent",
                    cursor: "pointer",
                    color: "var(--muted, #64748B)",
                }}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            {/* Title */}
            <div style={{ paddingRight: "24px", marginBottom: "8px" }}>
                <div style={{
                    fontFamily: "var(--font-corp-manrope, Manrope, sans-serif)",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--navy, #0A1628)",
                    marginBottom: "2px",
                }}>
                    {point.title}
                </div>
                <div style={{
                    fontFamily: "var(--font-corp-inter, Inter, sans-serif)",
                    fontSize: "13px",
                    color: "var(--muted, #64748B)",
                }}>
                    {point.subtitle}
                </div>
            </div>

            {/* Body */}
            <p style={{
                fontFamily: "var(--font-corp-inter, Inter, sans-serif)",
                fontSize: "14px",
                lineHeight: 1.55,
                color: "var(--body, #374151)",
                margin: "0 0 12px",
            }}>
                {point.description}
            </p>

            {/* Features */}
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                {point.features.map((f) => (
                    <li key={f} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontFamily: "var(--font-corp-inter, Inter, sans-serif)",
                        fontSize: "13px",
                        color: "var(--body, #374151)",
                    }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--teal, #005F8A)", flexShrink: 0 }} />
                        {f}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function RingsOfSolution() {
    const [activeId, setActiveId] = useState<number | null>(null);
    const shouldReduce = useReducedMotion() ?? false;
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: "-80px" });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 767px)");
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const toggle = useCallback((id: number) => setActiveId((prev) => (prev === id ? null : id)), []);
    const close = useCallback(() => setActiveId(null), []);
    const activePoint = solutions.find((s) => s.id === activeId) ?? null;

    return (
        <section
            ref={sectionRef}
            id="rings-of-solution"
            style={{
                background: "var(--bg-alt)",
                padding: "96px 0",
                position: "relative",
            }}
        >
            {/* Scoped keyframes + styles */}
            <style>{`
                @keyframes ros-pulse {
                    0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.7; }
                    70%  { transform: translate(-50%,-50%) scale(1.65); opacity: 0;   }
                    100% { transform: translate(-50%,-50%) scale(1.65); opacity: 0;   }
                }
                .ros-hs:hover span:last-child,
                .ros-hs:focus-visible span:last-child { transform: scale(1.08); }
                .ros-hs:focus-visible { outline: 2px solid #A7E3FF; outline-offset: 3px; }
                @media (max-width: 767px) {
                    #rings-of-solution { padding: 64px 0 !important; }
                }
                @media (prefers-reduced-motion: reduce) {
                    #rings-of-solution [style*="animation"] { animation: none !important; }
                }
            `}</style>

            <motion.div
                variants={fadeUp}
                initial={shouldReduce ? "visible" : "hidden"}
                animate={inView ? "visible" : "hidden"}
                style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
            >
                {/* ── Section heading ── */}
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
                    <h2 style={{
                        fontFamily: "var(--font-corp-manrope, Manrope, sans-serif)",
                        fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
                        fontWeight: 700,
                        color: "var(--navy, #0A1628)",
                        letterSpacing: "-0.025em",
                        lineHeight: 1.15,
                        textWrap: "balance" as React.CSSProperties["textWrap"],
                        margin: "0 0 16px",
                    }}>
                        The SAMSAN <span style={{ color: "var(--teal, #005F8A)" }}>Ring of Solution</span>
                    </h2>
                    <p style={{
                        maxWidth: "640px",
                        margin: "0 auto",
                        fontSize: "17px",
                        lineHeight: 1.7,
                        color: "var(--body, #374151)",
                    }}>
                        Our integrated engineering capability spans every domain of the Software Defined Vehicle — from silicon to cloud.
                    </p>
                </div>

                {/* ── Single diagram panel ── */}
                {/*
                  Double-frame diagnosis: the baked-in vehicle image file contains
                  its own rounded-rectangle border. Because objectFit:contain leaves
                  letterbox space the CSS wrapper border showed as a second frame.
                  Fix: inner scaling layer (scale 1.08) so the outer overflow:hidden
                  crops the image's built-in border. Hotspots live in the same layer
                  so their % positions stay correctly mapped to the car parts.
                */}
                <div
                    style={{
                        maxWidth: "1000px",
                        margin: "0 auto",
                        borderRadius: "20px",
                        overflow: "hidden",
                        border: "1px solid var(--border, #E2E8F0)",
                        boxShadow: "0 24px 60px rgba(11,19,32,0.18)",
                        background: "#020D1A",
                        position: "relative",
                        aspectRatio: "16 / 9",
                    }}
                >
                    {/* Inner layer scaled up to crop the baked-in image border */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            transform: "scale(1.08)",
                            transformOrigin: "center center",
                        }}
                    >
                        {/* Vehicle image */}
                        <img
                            src="/images/samsan-vehicle-schematic-custom.png"
                            alt="SAMSAN Software Defined Vehicle Engineering Architecture"
                            draggable={false}
                            style={{
                                display: "block",
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                userSelect: "none",
                                filter: "none",
                            }}
                        />

                        {/* Hotspots — inside the scaled layer so % coords still map to the car */}
                        {solutions.map((pt) => (
                            <Hotspot
                                key={pt.id}
                                point={pt}
                                isActive={activeId === pt.id}
                                anyOpen={activeId !== null}
                                onClick={() => toggle(pt.id)}
                                shouldReduce={shouldReduce}
                            />
                        ))}
                    </div>

                    {/* Popup rendered in the outer panel so it isn't clipped by inner scale */}
                    <AnimatePresence mode="wait">
                        {activePoint && (
                            <Popup
                                key={activePoint.id}
                                point={activePoint}
                                onClose={close}
                                isMobile={isMobile}
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* ── Legend chips ── */}
                <div
                    role="group"
                    aria-label="Explore vehicle engineering solutions"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "12px",
                        marginTop: "24px",
                    }}
                >
                    {solutions.map((pt) => {
                        const isActive = activeId === pt.id;
                        return (
                            <button
                                key={pt.id}
                                type="button"
                                onClick={() => toggle(pt.id)}
                                aria-pressed={isActive}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "8px 16px",
                                    borderRadius: "20px",
                                    border: `1px solid ${isActive ? "var(--teal, #005F8A)" : "var(--border, #E2E8F0)"}`,
                                    background: isActive ? "var(--teal, #005F8A)" : "var(--bg-alt)",
                                    cursor: "pointer",
                                    fontFamily: "var(--font-corp-inter, Inter, sans-serif)",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    color: isActive ? "#FFFFFF" : "var(--body, #374151)",
                                    transition: "all 0.2s ease",
                                    whiteSpace: "nowrap",
                                    flexShrink: 0,
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--teal, #005F8A)";
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border, #E2E8F0)";
                                }}
                            >
                                <span style={{
                                    fontWeight: 600,
                                    color: isActive ? "#FFFFFF" : "var(--teal, #005F8A)",
                                    minWidth: "20px",
                                }}>
                                    0{pt.id}
                                </span>
                                {pt.title}
                            </button>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
}
