"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const nodes = [
    {
        id: "adas",
        label: "ADAS / AD",
        x: "30%",
        y: "28%",
        title: "Advanced Driver Assistance Systems",
        desc: "Sensor fusion pipelines, computer vision integration, path planning, and safety critical functional validation (ISO 26262).",
    },
    {
        id: "ivi",
        label: "IVI Cockpit",
        x: "48%",
        y: "36%",
        title: "In-Vehicle Infotainment",
        desc: "Android Automotive OS customizations, Hypervisor configurations, dual screen HMI design, and media player framework tuning.",
    },
    {
        id: "v2x",
        label: "V2X Telemetry",
        x: "72%",
        y: "22%",
        title: "Vehicle-to-Everything",
        desc: "C-V2X and DSRC stack integration, secure message signing, OTA credential deployment, and warning dispatch frameworks.",
    },
    {
        id: "telematics",
        label: "Telematics & OTA",
        x: "82%",
        y: "45%",
        title: "Cloud Connectivity Hub",
        desc: "High-throughput MQTT telemetry brokers, remote diagnostics agents, dual-bank A/B system partition updates, and edge data compression.",
    },
    {
        id: "ecu",
        label: "ECU / MCU Firmware",
        x: "22%",
        y: "65%",
        title: "Low-Level Controller Firmware",
        desc: "AUTOSAR Classic and Adaptive middleware setup, secure boot configurations, CAN/LIN/Ethernet driver development, and hardware bring-up.",
    },
    {
        id: "dms",
        label: "Driver Monitoring",
        x: "42%",
        y: "58%",
        title: "DMS / OMS",
        desc: "Infrared gaze tracking, drowsiness classifier models, occupant presence detection, and cockpit security validation.",
    },
];

export default function RingsOfSolution() {
    const [activeNode, setActiveNode] = useState(nodes[0]);

    return (
        <section className="section" id="rings-of-solution-section" style={{ position: "relative", borderTop: "1px solid var(--border)", overflow: "hidden" }}>
            
            {/* Ambient background glow */}
            <div style={{
                position: "absolute",
                top: "30%",
                right: "5%",
                width: "450px",
                height: "450px",
                background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
                pointerEvents: "none"
            }} />

            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
                    <span className="badge rose" style={{ marginBottom: "16px" }}>Rings of Solution</span>
                    <h2 style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.025em" }}>
                        SAMSAN Rings Of Solution
                    </h2>
                    <p className="lead" style={{ maxWidth: "600px", margin: "12px auto 0" }}>
                        Interactive vehicle-defined software layers. Hover or tap on the active nodes to explore subsystem designs.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "48px", alignItems: "center" }}>
                    
                    {/* Left side: Interactive Blueprint Map */}
                    <div style={{
                        position: "relative",
                        background: "rgba(10, 15, 28, 0.4)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        borderRadius: "var(--radius-lg)",
                        height: "420px",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "inset 0 0 40px rgba(0,0,0,0.6)"
                    }}>
                        
                        {/* Blueprint background grid */}
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                            backgroundSize: "20px 20px"
                        }} />

                        {/* Blueprint SVG wireframe Car */}
                        <svg width="80%" height="80%" viewBox="0 0 600 300" fill="none" opacity="0.4" style={{ position: "absolute", pointerEvents: "none" }}>
                            {/* Car body outline */}
                            <path d="M 50 180 L 70 140 L 120 135 L 200 90 L 380 90 L 460 135 L 530 140 L 550 180 L 530 220 L 480 220 C 480 200, 420 200, 420 220 L 180 220 C 180 200, 120 200, 120 220 L 70 220 Z" stroke="var(--blue)" strokeWidth="1.5" strokeDasharray="5 3" />
                            {/* Chassis structures */}
                            <line x1="100" y1="180" x2="500" y2="180" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" />
                            {/* Wheels */}
                            <circle cx="150" cy="220" r="30" stroke="var(--blue)" strokeWidth="2" />
                            <circle cx="150" cy="220" r="10" fill="rgba(59, 130, 246, 0.2)" stroke="var(--blue)" strokeWidth="1" />
                            <circle cx="450" cy="220" r="30" stroke="var(--blue)" strokeWidth="2" />
                            <circle cx="450" cy="220" r="10" fill="rgba(59, 130, 246, 0.2)" stroke="var(--blue)" strokeWidth="1" />
                            {/* Connectivity signals */}
                            <path d="M 380 90 A 40 40 0 0 1 420 50" stroke="var(--rose)" strokeWidth="1.5" strokeDasharray="3 3" />
                            <circle cx="420" cy="50" r="4" fill="var(--rose)" />
                        </svg>

                        {/* Subsystem Hotspots */}
                        {nodes.map((node) => (
                            <button
                                key={node.id}
                                onClick={() => setActiveNode(node)}
                                onMouseEnter={() => setActiveNode(node)}
                                style={{
                                    position: "absolute",
                                    left: node.x,
                                    top: node.y,
                                    transform: "translate(-50%, -50%)",
                                    background: activeNode.id === node.id ? "var(--violet)" : "rgba(13, 19, 35, 0.8)",
                                    border: `1px solid ${activeNode.id === node.id ? "#ffffff" : "rgba(255,255,255,0.2)"}`,
                                    borderRadius: "100px",
                                    padding: "6px 14px",
                                    color: "#ffffff",
                                    fontSize: "0.75rem",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    transition: "all 0.25s ease",
                                    boxShadow: activeNode.id === node.id ? "0 0 20px var(--violet-glow)" : "0 4px 10px rgba(0,0,0,0.3)",
                                    zIndex: activeNode.id === node.id ? 10 : 2
                                }}
                            >
                                <span style={{
                                    display: "inline-block",
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    background: activeNode.id === node.id ? "#ffffff" : "var(--blue)",
                                    marginRight: "6px"
                                }} />
                                {node.label}
                            </button>
                        ))}
                    </div>

                    {/* Right side: Detailed Information Card */}
                    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeNode.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.25 }}
                                style={{
                                    background: "rgba(22, 30, 53, 0.45)",
                                    border: "1px solid rgba(255, 255, 255, 0.06)",
                                    borderRadius: "var(--radius-lg)",
                                    padding: "40px",
                                    backdropFilter: "blur(12px)",
                                    minHeight: "260px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center"
                                }}
                            >
                                <span className="badge rose" style={{ alignSelf: "flex-start", marginBottom: "16px" }}>Subsystem Detail</span>
                                <h3 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#ffffff", marginBottom: "16px", letterSpacing: "-0.015em" }}>
                                    {activeNode.title}
                                </h3>
                                <p style={{ fontSize: "0.95rem", lineHeight: "1.7", color: "var(--text-secondary)" }}>
                                    {activeNode.desc}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
