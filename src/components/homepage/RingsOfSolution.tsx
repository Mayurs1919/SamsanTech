"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AnnotationNode {
    id: string;
    label: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    dotLeft?: number;
    dotTop?: number;
    labelLeft: number;
    labelTop: number;
    delay: number;
    dur: string;
    begin: string;
    isCloud?: boolean;
}

const annotationNodes: AnnotationNode[] = [
    {
        id: "ivi",
        label: "IVI Cockpit",
        x1: 50,
        y1: 32,
        x2: 32,
        y2: 12,
        dotLeft: 50,
        dotTop: 32,
        labelLeft: 28,
        labelTop: 10,
        delay: 0,
        dur: "2.2s",
        begin: "0s"
    },
    {
        id: "v2x",
        label: "V2X Telemetry",
        x1: 68,
        y1: 20,
        x2: 80,
        y2: 8,
        dotLeft: 68,
        dotTop: 20,
        labelLeft: 78,
        labelTop: 6,
        delay: 0.15,
        dur: "2.0s",
        begin: "1.0s"
    },
    {
        id: "adas",
        label: "ADAS / AD",
        x1: 30,
        y1: 68,
        x2: 10,
        y2: 60,
        dotLeft: 30,
        dotTop: 68,
        labelLeft: 4,
        labelTop: 58,
        delay: 0.3,
        dur: "2.6s",
        begin: "0.5s"
    },
    {
        id: "driver",
        label: "Driver Monitoring",
        x1: 53,
        y1: 42,
        x2: 64,
        y2: 60,
        dotLeft: 53,
        dotTop: 42,
        labelLeft: 60,
        labelTop: 62,
        delay: 0.45,
        dur: "2.8s",
        begin: "0.3s"
    },
    {
        id: "telematics",
        label: "Telematics & OTA",
        x1: 78,
        y1: 45,
        x2: 84,
        y2: 53,
        dotLeft: 78,
        dotTop: 45,
        labelLeft: 82,
        labelTop: 55,
        delay: 0.6,
        dur: "2.4s",
        begin: "1.2s"
    },
    {
        id: "ecu",
        label: "ECU / MCU Firmware",
        x1: 42,
        y1: 72,
        x2: 56,
        y2: 80,
        dotLeft: 42,
        dotTop: 72,
        labelLeft: 54,
        labelTop: 82,
        delay: 0.75,
        dur: "3.0s",
        begin: "0.7s"
    },
    {
        id: "genai",
        label: "GenAI Cloud Node",
        x1: 6,
        y1: 16,
        x2: 46,
        y2: 28,
        labelLeft: 3,
        labelTop: 4,
        delay: 0.9,
        dur: "3.2s",
        begin: "0.9s",
        isCloud: true
    }
];

const legendOrder = ["ivi", "adas", "v2x", "driver", "ecu", "telematics"];

export default function RingsOfSolution() {
    const shouldReduce = !!useReducedMotion();
    const [highlightedId, setHighlightedId] = useState<string | null>(null);

    const handleChipClick = (id: string) => {
        setHighlightedId(id);
    };

    useEffect(() => {
        if (highlightedId) {
            const timer = setTimeout(() => {
                setHighlightedId(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [highlightedId]);

    // Order nodes according to legend requirements
    const legendNodes = legendOrder
        .map(id => annotationNodes.find(node => node.id === id))
        .filter((node): node is AnnotationNode => !!node);

    return (
        <section 
            id="rings-of-solution-section" 
            style={{ 
                position: "relative", 
                padding: "80px 0", 
                background: "#0A0D11", 
                overflow: "hidden",
                width: "100%"
            }}
        >
            <style>{`
                #rings-of-solution-section::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    pointer-events: none;
                    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
                    background-size: 100% 40px;
                }

                @keyframes dotRing {
                    0% { 
                        width: 12px; height: 12px;
                        opacity: 0.8;
                        box-shadow: 0 0 0 0 rgba(77,216,232,0.6);
                    }
                    100% { 
                        width: 12px; height: 12px;
                        opacity: 0;
                        box-shadow: 0 0 0 16px rgba(77,216,232,0);
                    }
                }

                .origin-dot-container {
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    z-index: 4;
                    transform: translate(-50%, -50%);
                }

                .origin-dot {
                    width: 12px;
                    height: 12px;
                    background: #4DD8E8;
                    box-shadow: 
                        0 0 0 2px rgba(77,216,232,0.3),
                        0 0 12px #4DD8E8,
                        0 0 24px rgba(77,216,232,0.5);
                    border-radius: 50%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    transition: box-shadow 0.2s ease, transform 0.2s ease;
                }

                .origin-dot.highlighted {
                    box-shadow: 
                        0 0 20px #4DD8E8,
                        0 0 40px rgba(77,216,232,0.5) !important;
                    transform: scale(1.3);
                }

                .origin-dot-container::after {
                    content: "";
                    position: absolute;
                    inset: -8px;
                    border-radius: 50%;
                    border: 1px solid rgba(77,216,232,0.5);
                    animation: dotRing 2s ease-out infinite;
                }

                .annotation-label {
                    position: absolute;
                    font-family: 'IBM Plex Mono', monospace;
                    font-size: 11.5px;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #FFFFFF;
                    font-weight: 600;
                    text-shadow: 0 0 12px rgba(0,0,0,0.8);
                    white-space: nowrap;
                    transform: translateY(-50%);
                    z-index: 3;
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    pointer-events: none;
                }

                .annotation-tick {
                    width: 14px;
                    height: 1.5px;
                    background: #4DD8E8;
                    box-shadow: 0 0 6px #4DD8E8;
                    flex-shrink: 0;
                }

                .diagram-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 1000px;
                    margin: 48px auto 0;
                    aspect-ratio: 16 / 9;
                    border-radius: 20px;
                    overflow: hidden;
                    background: #020D1A;
                    border: 1px solid rgba(77,216,232,0.2);
                    box-shadow: 
                        0 0 0 1px rgba(77,216,232,0.05),
                        0 24px 64px rgba(0,0,0,0.5),
                        inset 0 0 60px rgba(2,13,26,0.4);
                }

                /* Scanning Line Radar Effect */
                .scanning-radar {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(77, 216, 232, 0.6),
                        transparent
                    );
                    pointer-events: none;
                    z-index: 6;
                    animation: scanLine 4s linear infinite;
                }

                @keyframes scanLine {
                    0% { top: 0%; opacity: 0; }
                    5% { opacity: 1; }
                    95% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }

                .svg-connector-layer {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 2;
                    overflow: visible;
                }

                .legend-row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 12px;
                    margin-top: 28px;
                    position: relative;
                    z-index: 3;
                }

                .legend-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 7px 16px;
                    background: rgba(22, 30, 53, 0.45);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 20px;
                    font-family: var(--font-mono), monospace;
                    font-size: 11px;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    color: var(--text-secondary);
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .legend-chip:hover {
                    border-color: rgba(77, 216, 232, 0.5);
                    color: #FFFFFF;
                }

                .legend-chip.active {
                    border-color: #4DD8E8;
                    background: rgba(77, 216, 232, 0.08);
                    color: #4DD8E8;
                }

                /* CSS Keyframe Animation for Pulse Dots along paths */
                .pulse-dot {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #4DD8E8;
                    box-shadow: 
                        0 0 8px #4DD8E8,
                        0 0 16px rgba(77, 216, 232, 0.6);
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    z-index: 5;
                }

                @keyframes pulse-ivi {
                    0% { left: 50%; top: 32%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { left: 32%; top: 12%; opacity: 0; }
                }
                .pulse-dot-ivi {
                    animation: pulse-ivi 2.2s linear infinite 0s;
                }

                @keyframes pulse-v2x {
                    0% { left: 68%; top: 20%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { left: 80%; top: 8%; opacity: 0; }
                }
                .pulse-dot-v2x {
                    animation: pulse-v2x 2.0s linear infinite 1.0s;
                }

                @keyframes pulse-adas {
                    0% { left: 30%; top: 68%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { left: 10%; top: 60%; opacity: 0; }
                }
                .pulse-dot-adas {
                    animation: pulse-adas 2.6s linear infinite 0.5s;
                }

                @keyframes pulse-driver {
                    0% { left: 53%; top: 42%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { left: 64%; top: 60%; opacity: 0; }
                }
                .pulse-dot-driver {
                    animation: pulse-driver 2.8s linear infinite 0.3s;
                }

                @keyframes pulse-telematics {
                    0% { left: 78%; top: 45%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { left: 84%; top: 53%; opacity: 0; }
                }
                .pulse-dot-telematics {
                    animation: pulse-telematics 2.4s linear infinite 1.2s;
                }

                @keyframes pulse-ecu {
                    0% { left: 42%; top: 72%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { left: 56%; top: 80%; opacity: 0; }
                }
                .pulse-dot-ecu {
                    animation: pulse-ecu 3.0s linear infinite 0.7s;
                }

                @keyframes pulse-genai {
                    0% { left: 6%; top: 16%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { left: 46%; top: 28%; opacity: 0; }
                }
                .pulse-dot-genai {
                    animation: pulse-genai 3.2s linear infinite 0.9s;
                }

                @media (max-width: 767px) {
                    .diagram-wrapper {
                        aspect-ratio: 4 / 3;
                    }
                    .annotation-label {
                        font-size: 9px;
                    }
                    .svg-connector-layer {
                        display: none;
                    }
                    .origin-dot-container::after {
                        display: none !important;
                    }
                    .pulse-dot {
                        display: none !important;
                    }
                    .cloud-node-wrapper {
                        display: none !important;
                    }
                    .legend-row {
                        flex-wrap: wrap;
                        justify-content: center;
                    }
                }

                @media (max-width: 479px) {
                    .annotation-label {
                        display: none !important;
                    }
                    .origin-dot-container {
                        display: none !important;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .origin-dot-container::after {
                        display: none !important;
                    }
                    .origin-dot {
                        transition: none !important;
                    }
                    .pulse-dot {
                        display: none !important;
                    }
                    .scanning-radar {
                        display: none !important;
                    }
                }
            `}</style>

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ textAlign: "center", marginBottom: "48px" }}
                >
                    <span 
                        className="badge" 
                        style={{ 
                            marginBottom: "16px", 
                            fontSize: "12px", 
                            letterSpacing: "0.12em", 
                            fontWeight: 500,
                            color: "var(--violet-mid)" 
                        }}
                    >
                        // Engineering Architecture
                    </span>
                    <h2 
                        style={{ 
                            fontSize: "clamp(2rem, 3.5vw, 2.8rem)", 
                            fontWeight: 800, 
                            color: "#FFFFFF",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.15
                        }}
                    >
                        The SAMSAN <span style={{ color: "#4DD8E8" }}>Ring of Solution</span>
                    </h2>
                    <p 
                        className="lead" 
                        style={{ 
                            maxWidth: "520px", 
                            margin: "12px auto 0", 
                            fontSize: "1rem", 
                            lineHeight: "1.75",
                            color: "var(--text-secondary)"
                        }}
                    >
                        Our integrated engineering capability spans every domain of the Software Defined Vehicle — from silicon to cloud.
                    </p>
                </motion.div>

                {/* Vehicle Diagram Container */}
                <motion.div 
                    className="diagram-wrapper"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                >
                    {/* Radar Scanning Line */}
                    {!shouldReduce && <div className="scanning-radar" />}

                    {/* Base vehicle image container */}
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        overflow: "hidden"
                    }}>
                        <img 
                            src="/images/samsan-vehicle-schematic.png"
                            alt="SAMSAN Software Defined Vehicle Engineering Architecture"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                objectPosition: "center center",
                                display: "block"
                            }}
                        />

                        {/* Vignette overlay */}
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(2, 13, 26, 0.4) 100%)",
                            pointerEvents: "none",
                            zIndex: 1
                        }} />
                    </div>

                    {/* SVG Connector Lines Layer */}
                    <svg className="svg-connector-layer" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {annotationNodes.map((node) => {
                            const isCloud = node.isCloud;
                            return (
                                <g key={`group-${node.id}`}>
                                    {/* Connection Path */}
                                    <motion.path
                                        d={`M ${node.x1} ${node.y1} L ${node.x2} ${node.y2}`}
                                        stroke={isCloud ? "rgba(77, 216, 232, 0.2)" : "rgba(77, 216, 232, 0.4)"}
                                        strokeWidth="0.8"
                                        strokeDasharray={isCloud ? "3 5" : "4 3"}
                                        fill="none"
                                        initial={{ strokeOpacity: 0 }}
                                        whileInView={{ strokeOpacity: isCloud ? 0.2 : 0.4 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
                                    />
                                </g>
                            );
                        })}
                    </svg>

                    {/* CSS-Animated Pulse Dots */}
                    {!shouldReduce && annotationNodes.map((node) => (
                        <div 
                            key={`pulse-${node.id}`} 
                            className={`pulse-dot pulse-dot-${node.id}`}
                        />
                    ))}

                    {/* HTML Annotation Overlays (Origin dots + Labels) */}
                    {annotationNodes.map((node) => {
                        if (node.isCloud) {
                            return (
                                <div key={node.id} className="cloud-node-wrapper" style={{ pointerEvents: "none" }}>
                                    <motion.div
                                        initial={shouldReduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={shouldReduce ? { duration: 0 } : {
                                            duration: 0.4,
                                            ease: "easeOut",
                                            delay: node.delay
                                        }}
                                        style={{
                                            position: "absolute",
                                            left: `${node.labelLeft}%`,
                                            top: `${node.labelTop}%`,
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "6px",
                                            pointerEvents: "auto",
                                            zIndex: 3
                                        }}
                                    >
                                        {/* Cloud SVG icon */}
                                        <svg 
                                            width="22" 
                                            height="22" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="#4DD8E8" 
                                            strokeWidth="1.5" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                        >
                                            <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.48 0-.95.07-1.4.2-1.15-2.25-3.6-3.7-6.6-3.7a7.5 7.5 0 0 0-7.5 7.5c0 3.04 2.46 5.5 5.5 5.5h11.5z"/>
                                        </svg>

                                        {/* Cloud text block */}
                                        <div 
                                            style={{ 
                                                fontFamily: "var(--font-mono), monospace", 
                                                fontSize: "10px", 
                                                letterSpacing: "0.05em", 
                                                color: "rgba(255,255,255,0.65)", 
                                                lineHeight: "1.8",
                                                fontWeight: 500
                                            }}
                                        >
                                            <div>GenAI AutoMATE</div>
                                            <div>GenAI System Engg</div>
                                            <div>SDV Applications</div>
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        }

                        const isActive = highlightedId === node.id;
                        return (
                            <div key={node.id} style={{ pointerEvents: "none" }}>
                                {/* Origin Dot & Pulse Ring */}
                                {node.dotLeft !== undefined && node.dotTop !== undefined && (
                                    <div 
                                        className="origin-dot-container"
                                        style={{
                                            left: `${node.dotLeft}%`,
                                            top: `${node.dotTop}%`
                                        }}
                                    >
                                        <div className={`origin-dot ${isActive ? "highlighted" : ""}`} />
                                    </div>
                                )}

                                {/* Label Text */}
                                <motion.div
                                    className="annotation-label"
                                    initial={shouldReduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={shouldReduce ? { duration: 0 } : {
                                        duration: 0.4,
                                        ease: "easeOut",
                                        delay: node.delay
                                    }}
                                    style={{
                                        left: `${node.labelLeft}%`,
                                        top: `${node.labelTop}%`
                                    }}
                                >
                                    <span className="annotation-tick" />
                                    {node.label}
                                </motion.div>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Below-Diagram Legend Row */}
                <div className="legend-row">
                    {legendNodes.map((node) => {
                        const isActive = highlightedId === node.id;
                        return (
                            <button
                                key={`chip-${node.id}`}
                                className={`legend-chip ${isActive ? "active" : ""}`}
                                onClick={() => handleChipClick(node.id)}
                            >
                                <span style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    background: "#4DD8E8"
                                }} />
                                {node.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
