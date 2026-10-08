"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ── Solution data ────────────────────────────────────────────────
interface SolutionPoint {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    /** Position as % of image width/height */
    x: number;
    y: number;
    /** Accent color */
    accent: string;
    /** SVG icon path(s) */
    iconPath: React.ReactNode;
}

const solutions: SolutionPoint[] = [
    {
        id: 1,
        title: "IVI Cockpit",
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
        accent: "#4DD8E8",
        iconPath: (
            <>
                <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="12" y1="18" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5" />
            </>
        ),
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
        accent: "#3B82F6",
        iconPath: (
            <>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </>
        ),
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
        accent: "#8B5CF6",
        iconPath: (
            <>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </>
        ),
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
        accent: "#10B981",
        iconPath: (
            <>
                <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <circle cx="12" cy="20" r="1" fill="currentColor" />
            </>
        ),
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
        accent: "#EC4899",
        iconPath: (
            <>
                <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <line x1="2" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <line x1="16" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <line x1="12" y1="2" x2="12" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <line x1="12" y1="16" x2="12" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            </>
        ),
    },
];

// ── Pulsing "+" Hotspot ──────────────────────────────────────────
function Hotspot({
    point,
    isActive,
    onClick,
    shouldReduce,
}: {
    point: SolutionPoint;
    isActive: boolean;
    onClick: () => void;
    shouldReduce: boolean;
}) {
    return (
        <button
            onClick={onClick}
            aria-label={`Explore ${point.title}`}
            aria-expanded={isActive}
            className="ros-hotspot"
            style={{
                position: "absolute",
                left: `${point.x}%`,
                top: `${point.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: isActive ? 20 : 10,
            }}
        >
            {/* Outer pulse ring */}
            {!shouldReduce && !isActive && (
                <span
                    className="ros-pulse-ring"
                    style={{ borderColor: point.accent }}
                />
            )}

            {/* Inner circle */}
            <span
                className="ros-hotspot-inner"
                style={{
                    background: isActive ? point.accent : "rgba(10, 15, 28, 0.85)",
                    borderColor: point.accent,
                    color: isActive ? "#0A0F1C" : point.accent,
                }}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    {isActive ? (
                        <line x1="5" y1="12" x2="19" y2="12" />
                    ) : (
                        <>
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </>
                    )}
                </svg>
            </span>
        </button>
    );
}

// ── Detail Panel (Floating Popover) ──────────────────────────────
function DetailPanel({
    point,
    onClose,
}: {
    point: SolutionPoint;
    onClose: () => void;
}) {
    const panelRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                const target = e.target as HTMLElement;
                if (target.closest(".ros-hotspot")) return;
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [onClose]);

    // Close on Escape
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [onClose]);

    // Position: place popover near the hotspot, offset to the right
    // If hotspot is on right side of image (>55%), flip to the left
    const flipLeft = point.x > 55;
    const positionStyle: React.CSSProperties = flipLeft
        ? { right: `${100 - point.x + 4}%`, top: `${Math.max(point.y - 5, 2)}%` }
        : { left: `${point.x + 4}%`, top: `${Math.max(point.y - 5, 2)}%` };

    return (
        <motion.div
            ref={panelRef}
            className="ros-detail-panel"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{ "--accent": point.accent, ...positionStyle } as React.CSSProperties}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="ros-panel-close"
                aria-label="Close details"
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            {/* Header */}
            <div className="ros-panel-header">
                <div className="ros-panel-icon" style={{ background: `${point.accent}18`, borderColor: `${point.accent}40` }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: point.accent }}>
                        {point.iconPath}
                    </svg>
                </div>
                <div>
                    <span className="ros-panel-number" style={{ color: point.accent }}>
                        0{point.id}
                    </span>
                    <h3 className="ros-panel-title">{point.title}</h3>
                    <p className="ros-panel-subtitle">{point.subtitle}</p>
                </div>
            </div>

            {/* Divider */}
            <div className="ros-panel-divider" style={{ background: `linear-gradient(90deg, ${point.accent}30, transparent)` }} />

            {/* Description */}
            <p className="ros-panel-desc">{point.description}</p>

            {/* Features */}
            <div className="ros-panel-features">
                <span className="ros-panel-features-label">Key Capabilities</span>
                <ul className="ros-panel-features-list">
                    {point.features.map((f, i) => (
                        <motion.li
                            key={f}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + i * 0.06, duration: 0.25 }}
                        >
                            <span className="ros-feature-dot" style={{ background: point.accent }} />
                            {f}
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

// ── Main Component ───────────────────────────────────────────────
export default function RingsOfSolution() {
    const [activeId, setActiveId] = useState<number | null>(null);
    const shouldReduce = useReducedMotion() ?? false;
    const containerRef = useRef<HTMLDivElement>(null);

    const handleToggle = useCallback((id: number) => {
        setActiveId((prev) => (prev === id ? null : id));
    }, []);

    const handleClose = useCallback(() => {
        setActiveId(null);
    }, []);

    const activePoint = solutions.find((s) => s.id === activeId) ?? null;

    return (
        <section
            className="rings-section"
            style={{
                position: "relative",
                padding: "80px 0 100px",
                background: "linear-gradient(180deg, var(--midnight) 0%, var(--navy) 100%)",
                overflow: "hidden",
            }}
        >
            <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 24px" }}>
                {/* Section Header */}
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
                    <motion.h2
                        initial={shouldReduce ? {} : { opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{
                            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                            fontWeight: 800,
                            color: "#FFFFFF",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.15,
                        }}
                    >
                        The SAMSAN <span style={{ color: "#4DD8E8" }}>Ring of Solution</span>
                    </motion.h2>
                    <motion.p
                        initial={shouldReduce ? {} : { opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.12 }}
                        style={{
                            maxWidth: "560px",
                            margin: "14px auto 0",
                            fontSize: "1.05rem",
                            lineHeight: "1.75",
                            color: "var(--text-secondary)",
                        }}
                    >
                        Our integrated engineering capability spans every domain of the Software Defined Vehicle — from silicon to cloud.
                    </motion.p>
                </div>

                {/* Interactive Image + Floating Popover */}
                <div
                    ref={containerRef}
                    className="ros-layout"
                >
                    <div className="ros-image-container">
                        <img
                            src="/images/samsan-vehicle-schematic.png"
                            alt="SAMSAN Software Defined Vehicle Engineering Architecture"
                            className="ros-vehicle-img"
                            draggable={false}
                        />

                        {/* Subtle radial ambient glow */}
                        <div className="ros-image-overlay" />

                        {/* Connection lines / glow indicators */}
                        <svg
                            className="ros-connection-lines"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            {solutions.map((pt) => {
                                const isActive = activeId === pt.id;
                                return (
                                    <circle
                                        key={pt.id}
                                        cx={pt.x}
                                        cy={pt.y}
                                        r={isActive ? "1.8" : "0.6"}
                                        fill={isActive ? pt.accent : `${pt.accent}60`}
                                        style={{ transition: "all 0.3s ease" }}
                                    />
                                );
                            })}
                        </svg>

                        {/* Hotspot markers */}
                        {solutions.map((pt) => (
                            <Hotspot
                                key={pt.id}
                                point={pt}
                                isActive={activeId === pt.id}
                                onClick={() => handleToggle(pt.id)}
                                shouldReduce={shouldReduce}
                            />
                        ))}

                        {/* Floating popover panel (positioned near hotspot) */}
                        <AnimatePresence mode="wait">
                            {activePoint && (
                                <DetailPanel
                                    key={activePoint.id}
                                    point={activePoint}
                                    onClose={handleClose}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
