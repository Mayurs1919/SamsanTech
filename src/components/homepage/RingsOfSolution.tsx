"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const annotationNodes = [
    {
        id: "adas",
        label: "ADAS / AD",
        dot: { x: "28%", y: "20%" },
        bubble: { x: "4%", y: "14%" },
        line: { x1: "28%", y1: "20%", x2: "10%", y2: "16%" },
        delay: 0,
        pulseDelay: "0s"
    },
    {
        id: "ivi",
        label: "IVI Cockpit",
        dot: { x: "48%", y: "30%" },
        bubble: { x: "34%", y: "22%" },
        line: { x1: "48%", y1: "30%", x2: "40%", y2: "24%" },
        delay: 0.15,
        pulseDelay: "0.4s"
    },
    {
        id: "dms",
        label: "Driver Monitoring",
        dot: { x: "38%", y: "52%" },
        bubble: { x: "8%", y: "52%" },
        line: { x1: "38%", y1: "52%", x2: "18%", y2: "52%" },
        delay: 0.3,
        pulseDelay: "0.8s"
    },
    {
        id: "ecu",
        label: "ECU / MCU Firmware",
        dot: { x: "22%", y: "68%" },
        bubble: { x: "2%", y: "64%" },
        line: { x1: "22%", y1: "68%", x2: "12%", y2: "66%" },
        delay: 0.45,
        pulseDelay: "1.2s"
    },
    {
        id: "telematics",
        label: "Telematics & OTA",
        dot: { x: "72%", y: "48%" },
        bubble: { x: "74%", y: "42%" },
        line: { x1: "72%", y1: "48%", x2: "74%", y2: "44%" },
        delay: 0.6,
        pulseDelay: "1.6s"
    },
    {
        id: "v2x",
        label: "V2X Telemetry",
        dot: { x: "78%", y: "12%" },
        bubble: { x: "80%", y: "6%" },
        line: { x1: "78%", y1: "12%", x2: "80%", y2: "8%" },
        delay: 0.75,
        pulseDelay: "2.0s"
    }
];

export default function RingsOfSolution() {
    const shouldReduce = !!useReducedMotion();
    const [highlightedId, setHighlightedId] = useState<string | null>(null);

    const handleChipClick = (id: string) => {
        setHighlightedId(id);
        const timer = setTimeout(() => {
            setHighlightedId(null);
        }, 1500);
        return () => clearTimeout(timer);
    };

    return (
        <section 
            id="rings-of-solution-section" 
            style={{ 
                position: "relative", 
                padding: "96px 0", 
                background: "#0A0D11", 
                overflow: "hidden" 
            }}
        >
            {/* Custom stylesheet for responsive behavior, pulse animations and grid-lines */}
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

                @keyframes dotPulse {
                    0% { box-shadow: 0 0 0 0 rgba(77,216,232,0.5); }
                    70% { box-shadow: 0 0 0 8px rgba(77,216,232,0); }
                    100% { box-shadow: 0 0 0 0 rgba(77,216,232,0); }
                }

                .pulsing-dot {
                    animation: dotPulse 2.5s infinite;
                }

                .annotation-bubble {
                    position: absolute;
                    background: rgba(10, 13, 17, 0.85);
                    border: 1px solid rgba(77, 216, 232, 0.4);
                    border-radius: 8px;
                    padding: 8px 14px;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    white-space: nowrap;
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    font-family: var(--font-mono);
                    font-size: 12px;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    color: #FFFFFF;
                    transition: all 0.2s ease;
                    z-index: 5;
                }

                .annotation-bubble:hover {
                    border-color: rgba(77, 216, 232, 0.8);
                    box-shadow: 0 0 16px rgba(77, 216, 232, 0.2);
                    transform: translateY(-2px);
                }

                .annotation-bubble.highlighted {
                    border-color: rgba(77, 216, 232, 1) !important;
                    box-shadow: 0 0 20px rgba(77, 216, 232, 0.5) !important;
                    transform: translateY(-2px);
                }

                .diagram-wrapper {
                    position: relative;
                    max-width: 880px;
                    margin: 56px auto 0;
                    aspect-ratio: 16 / 9;
                }

                .svg-connector-layer {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 1;
                    display: block;
                }

                .legend-row {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 12px;
                    margin-top: 32px;
                    position: relative;
                    z-index: 3;
                }

                .legend-chip {
                    font-family: var(--font-mono);
                    font-size: 11px;
                    letter-spacing: 0.06em;
                    padding: 6px 14px;
                    border-radius: 20px;
                    background: rgba(22, 30, 53, 0.45);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    color: var(--text-secondary);
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .legend-chip:hover {
                    background: rgba(77, 216, 232, 0.1);
                    border-color: rgba(77, 216, 232, 0.4);
                    color: #FFFFFF;
                }

                @media (max-width: 767px) {
                    .diagram-wrapper {
                        aspect-ratio: 4 / 3;
                    }
                    .annotation-bubble {
                        font-size: 10px;
                        padding: 6px 10px;
                    }
                    .svg-connector-layer {
                        display: none;
                    }
                }
            `}</style>

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                {/* Section Header */}
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
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
                            fontSize: "clamp(1.8rem, 3vw, 2.4rem)", 
                            fontWeight: 700, 
                            color: "#FFFFFF",
                            letterSpacing: "-0.01em",
                            lineHeight: 1.15
                        }}
                    >
                        The SAMSAN Ring of Solution
                    </h2>
                    <p 
                        className="lead" 
                        style={{ 
                            maxWidth: "540px", 
                            margin: "12px auto 0", 
                            fontSize: "1rem", 
                            lineHeight: "1.7",
                            color: "var(--text-secondary)"
                        }}
                    >
                        Our integrated engineering capability spans every domain of the Software Defined Vehicle — from silicon to cloud.
                    </p>
                </div>

                {/* Vehicle Diagram Container */}
                <div className="diagram-wrapper">
                    {/* Base vehicle image (No text or baked-in labels) */}
                    <motion.img 
                        src="/images/samsan-vehicle-schematic.png"
                        alt="SAMSAN Software Defined Vehicle Engineering Architecture"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            objectPosition: "center",
                            display: "block"
                        }}
                    />

                    {/* SVG Connector Lines Layer */}
                    <svg className="svg-connector-layer">
                        {annotationNodes.map((node) => (
                            <motion.line
                                key={`line-${node.id}`}
                                x1={node.line.x1}
                                y1={node.line.y1}
                                x2={node.line.x2}
                                y2={node.line.y2}
                                stroke="rgba(77, 216, 232, 0.35)"
                                strokeWidth="1.5"
                                strokeDasharray="4 4"
                                initial={shouldReduce ? { pathLength: 1 } : { pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={shouldReduce ? { duration: 0 } : {
                                    duration: 0.5,
                                    ease: "easeOut",
                                    delay: node.delay + 0.4 // draws in right after the bubble appears
                                }}
                            />
                        ))}
                        {/* Cloud Node Dashed Connector */}
                        <motion.line
                            x1="12%"
                            y1="12%"
                            x2="30%"
                            y2="18%"
                            stroke="rgba(77, 216, 232, 0.35)"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                            initial={shouldReduce ? { pathLength: 1 } : { pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={shouldReduce ? { duration: 0 } : {
                                duration: 0.5,
                                ease: "easeOut",
                                delay: 0.9 + 0.4
                            }}
                        />
                    </svg>

                    {/* HTML Annotation Overlays (Dots + Bubbles) */}
                    {annotationNodes.map((node) => (
                        <div key={node.id} style={{ pointerEvents: "none" }}>
                            {/* Connector dot at vehicle zone */}
                            <div 
                                className="pulsing-dot"
                                style={{
                                    position: "absolute",
                                    left: node.dot.x,
                                    top: node.dot.y,
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "50%",
                                    background: "#4DD8E8",
                                    transform: "translate(-50%, -50%)",
                                    boxShadow: "0 0 12px rgba(77,216,232,0.7)",
                                    animationDelay: node.pulseDelay,
                                    zIndex: 6
                                }}
                            />

                            {/* Label Bubble */}
                            <motion.div
                                className={`annotation-bubble ${highlightedId === node.id ? "highlighted" : ""}`}
                                initial={shouldReduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={shouldReduce ? { duration: 0 } : {
                                    duration: 0.4,
                                    ease: "easeOut",
                                    delay: node.delay
                                }}
                                style={{
                                    left: node.bubble.x,
                                    top: node.bubble.y,
                                    transform: "translate(-10%, -50%)",
                                    pointerEvents: "auto"
                                }}
                            >
                                <span style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    background: "#4DD8E8",
                                    flexShrink: 0
                                }} />
                                {node.label}
                            </motion.div>
                        </div>
                    ))}

                    {/* CLOUD NODE (top-left, GenAI) */}
                    <div style={{ pointerEvents: "none" }}>
                        <motion.div
                            initial={shouldReduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={shouldReduce ? { duration: 0 } : {
                                duration: 0.4,
                                ease: "easeOut",
                                delay: 0.9
                            }}
                            style={{
                                position: "absolute",
                                left: "8%",
                                top: "6%",
                                transform: "translate(0, -50%)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "6px",
                                pointerEvents: "auto",
                                zIndex: 5
                            }}
                        >
                            {/* Cloud SVG icon */}
                            <svg 
                                width="28" 
                                height="28" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="#4DD8E8" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.48 0-.95.07-1.4.2-1.15-2.25-3.6-3.7-6.6-3.7a7.5 7.5 0 0 0-7.5 7.5c0 3.04 2.46 5.5 5.5 5.5h11.5z"/>
                            </svg>

                            {/* Small text block */}
                            <div 
                                style={{ 
                                    fontFamily: "var(--font-mono)", 
                                    fontSize: "10px", 
                                    letterSpacing: "0.05em", 
                                    color: "rgba(255,255,255,0.5)", 
                                    lineHeight: "1.6" 
                                }}
                            >
                                <div>GenAI AutoMATE</div>
                                <div>GenAI System Engg</div>
                                <div>SDV Applications</div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Below-Diagram Legend Row */}
                <div className="legend-row">
                    {annotationNodes.map((node) => (
                        <button
                            key={`chip-${node.id}`}
                            className="legend-chip"
                            onClick={() => handleChipClick(node.id)}
                            style={{
                                border: highlightedId === node.id ? "1px solid rgba(77, 216, 232, 0.6)" : undefined,
                                color: highlightedId === node.id ? "#FFFFFF" : undefined,
                                background: highlightedId === node.id ? "rgba(77, 216, 232, 0.15)" : undefined,
                            }}
                        >
                            • {node.label}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
