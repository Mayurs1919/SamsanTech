"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

const pillars = [
    {
        title: "Vehicle Software Engineering",
        desc: "Active development in cockpit, telemetry, infotainment systems, functional safety, and AUTOSAR middleware.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4M6 8h12" strokeLinecap="round" />
            </svg>
        ),
        iconBg: "rgba(77, 216, 232, 0.12)",
        iconBorder: "rgba(77, 216, 232, 0.25)",
        iconColor: "#4DD8E8",
        iconGlow: "rgba(77, 216, 232, 0.2)",
        tags: ["AUTOSAR", "ADAS", "Cockpit"],
    },
    {
        title: "AI / ML",
        desc: "Deep model training, computer vision pipelines, synthetic data generation, and autonomous driving simulation.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
            </svg>
        ),
        iconBg: "rgba(139, 92, 246, 0.12)",
        iconBorder: "rgba(139, 92, 246, 0.25)",
        iconColor: "#8B5CF6",
        iconGlow: "rgba(139, 92, 246, 0.2)",
        tags: ["Computer Vision", "GenAI", "Simulation"],
    },
    {
        title: "Digital Transformation",
        desc: "Cloud telemetry platforms, remote fleet diagnostics, OTA pipeline orchestration, and IoT edge integration.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3v18M3 12h18M12 3l4 4M12 3L8 7M12 21l4-4M12 21l-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        iconBg: "rgba(255, 138, 61, 0.12)",
        iconBorder: "rgba(255, 138, 61, 0.25)",
        iconColor: "#FF8A3D",
        iconGlow: "rgba(255, 138, 61, 0.2)",
        tags: ["Cloud Native", "OTA", "IoT"],
    },
    {
        title: "Consulting & Strategic Staffing",
        desc: "Domain-aligned engineers, Build-Operate-Transfer (BOT) hubs, and managed Validation & Verification (V&V) execution.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 14v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        iconBg: "rgba(34, 197, 94, 0.12)",
        iconBorder: "rgba(34, 197, 94, 0.25)",
        iconColor: "#22C55E",
        iconGlow: "rgba(34, 197, 94, 0.2)",
        tags: ["BOT", "CoE", "V&V"],
    },
];

function CinematicVideoPlayer() {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        const vid = videoRef.current;
        if (!vid) return;
        vid.muted = !vid.muted;
        setIsMuted(vid.muted);
    };

    return (
        <>
            {/* Responsive min-height for the video container */}
            <style>{`
                .hero-video-container {
                    min-height: 400px;
                    aspect-ratio: 16 / 9;
                }
                @media (min-width: 640px) {
                    .hero-video-container {
                        min-height: 520px;
                    }
                }
                @media (min-width: 1024px) {
                    .hero-video-container {
                        min-height: 640px;
                    }
                }
            `}</style>
            <motion.div
                className="hero-video-container"
                initial={{ opacity: 0, scale: 0.96, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                style={{
                    position: "relative",
                    width: "100%",
                    margin: "56px auto 64px auto",
                    borderRadius: "20px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    overflow: "hidden",
                    boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(139, 92, 246, 0.15)",
                    background: "rgba(13, 19, 35, 0.3)",
                    backdropFilter: "blur(12px)",
                }}
                whileHover={{ scale: 1.008, borderColor: "rgba(139, 92, 246, 0.3)", boxShadow: "0 30px 70px rgba(0, 0, 0, 0.6), 0 0 50px rgba(139, 92, 246, 0.25)" }}
            >
                {/* Ambient glow */}
                <div style={{ position: "absolute", inset: "-20px", background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)", filter: "blur(20px)", zIndex: -1, pointerEvents: "none" }} />

                {/* Autoplay video */}
                <video
                    ref={videoRef}
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onError={(e) => console.error("Video load error:", e)}
                    src="/videos/samsan-demo.mp4"
                />

                {/* Dark gradient overlay */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10, 15, 28, 0.4) 0%, rgba(10, 15, 28, 0) 50%, rgba(10, 15, 28, 0.8) 100%)", pointerEvents: "none" }} />

                {/* Bottom caption overlay */}
                <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "80px", display: "flex", flexDirection: "column", gap: "8px", pointerEvents: "none", textAlign: "left" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ backgroundColor: "rgba(16, 185, 129, 0.15)", color: "var(--mint)", border: "1px solid rgba(16, 185, 129, 0.25)", fontSize: "0.7rem", padding: "3px 8px", borderRadius: "100px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--mint)", display: "inline-block" }} />
                            System Active
                        </span>
                        <span style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}>SAMSAN AI CORE v4.0</span>
                    </div>
                    <h4 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", margin: 0, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>Automotive Digital Concept &amp; ADAS HUD</h4>
                    <p style={{ fontSize: "0.85rem", color: "rgba(240, 244, 255, 0.75)", margin: 0, maxWidth: "500px", lineHeight: "1.4", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>A preview of our vehicle-grade intelligent instrument display rendering simulated real-time telemetry.</p>
                </div>

                {/* Top-right telemetry overlay */}
                <div style={{ position: "absolute", top: "24px", right: "24px", fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--violet-mid)", textAlign: "right", background: "rgba(10, 15, 28, 0.6)", padding: "8px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)", pointerEvents: "none", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <div>SYS STATUS: OK</div>
                    <div>FPS: 60.00</div>
                    <div>LATENCY: 12ms</div>
                    <div>SECURE LINK: ACTIVE</div>
                </div>

                {/* Click-to-unmute button */}
                <button
                    onClick={toggleMute}
                    aria-label="Toggle sound"
                    title={isMuted ? "Unmute video" : "Mute video"}
                    style={{
                        position: "absolute",
                        bottom: "16px",
                        right: "16px",
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        background: "rgba(0, 0, 0, 0.55)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        padding: 0,
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
                        transition: "background 0.2s ease, transform 0.15s ease",
                        zIndex: 10,
                        flexShrink: 0,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.75)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.55)")}
                >
                    {isMuted ? (
                        /* Muted icon */
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                    ) : (
                        /* Unmuted icon */
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                    )}
                </button>
            </motion.div>
        </>
    );
}

export default function Hero() {
    const shouldReduce = useReducedMotion();

    return (
        <section className="hero-section" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "140px", paddingBottom: "80px" }}>
            <div className="hero-glow" aria-hidden="true" />

            {/* Ambient Background Grid */}
            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                opacity: 0.7,
                pointerEvents: "none",
                zIndex: 0
            }} />

            <div className="container">
                <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "900px", margin: "0 auto 20px" }}>

                    {/* Brand Orb Graphic */}
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
                        <div style={{
                            width: "140px",
                            height: "140px",
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
                            border: "1px stroke rgba(255,255,255,0.06)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 40px rgba(124, 58, 237, 0.1)"
                        }}>
                            {/* Circuit sphere graphic */}
                            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
                                <circle cx="50" cy="50" r="30" strokeDasharray="3 3" />
                                <circle cx="50" cy="50" r="20" stroke="rgba(124, 58, 237, 0.6)" strokeWidth="1.5" />
                                <path d="M50 10v20M50 70v20M10 50h20M70 50h20" strokeLinecap="round" />
                                <circle cx="50" cy="10" r="2.5" fill="var(--violet-mid)" />
                                <circle cx="50" cy="90" r="2.5" fill="var(--rose)" />
                                <circle cx="10" cy="50" r="2.5" fill="var(--blue)" />
                                <circle cx="90" cy="50" r="2.5" fill="var(--mint)" />
                            </svg>
                        </div>
                    </div>

                    <span className="badge" style={{ marginBottom: "20px" }}>Specialized Design House</span>

                    <h1 style={{
                        marginBottom: "24px",
                        fontWeight: 800,
                        fontSize: "clamp(2.6rem, 5.5vw, 4rem)",
                        lineHeight: 1.06,
                        letterSpacing: "-0.02em"
                    }}>
                        AI-led Automotive Engineering <br />
                        <span className="gradient-text">for Software-Defined Mobility</span>
                    </h1>

                    <p className="lead" style={{
                        maxWidth: "680px",
                        margin: "0 auto 40px",
                        color: "var(--text-secondary)",
                        fontSize: "1.1rem",
                        lineHeight: "1.75"
                    }}>
                        SAMSAN Technische Labs helps OEMs, Tier-1s, semiconductor companies, and high-tech enterprises design, develop, validate, and scale next-generation cockpit, connected vehicle, SDV, embedded, cloud, and AI-driven engineering solutions.
                    </p>

                    <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                        <Link href="/contact" className="btn btn-primary">
                            Discuss Your Mobility Engineering Need
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                                <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link href="/contact" className="btn btn-outline">
                            Talk to an Engineer
                        </Link>
                    </div>
                </div>

                {/* Cinematic Interactive Video Showcase */}
                <CinematicVideoPlayer />

                {/* Where SAMSAN Creates Value Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        marginTop: "80px",
                        marginBottom: "80px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                        paddingTop: "80px",
                        textAlign: "left"
                    }}
                >
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <span className="badge rose" style={{ marginBottom: "16px", fontSize: "12px", letterSpacing: "0.12em", fontWeight: 500 }}>Value Creation</span>
                        <h2 id="value-heading" style={{
                            fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                            fontWeight: 700,
                            lineHeight: 1.12,
                            letterSpacing: "-0.01em",
                            color: "#ffffff",
                            marginBottom: "16px"
                        }}>
                            Where SAMSAN Creates Value
                        </h2>
                        <p className="lead" style={{
                            maxWidth: "600px",
                            margin: "0 auto",
                            color: "var(--text-secondary)",
                            fontSize: "1.1rem",
                            lineHeight: "1.75"
                        }}>
                            How we align our specialized automotive engineering capabilities with your critical program requirements.
                        </p>
                    </div>

                    <div className="spec-table" style={{ maxWidth: "900px", margin: "0 auto", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                        {/* Header Row */}
                        <div className="comparison-row comparison-header" style={{ borderBottom: "2px solid rgba(255, 255, 255, 0.12)" }}>
                            <div className="spec-key" style={{ background: "var(--navy-light)", color: "var(--text-primary)", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", borderRight: "1px solid rgba(255, 255, 255, 0.08)", padding: "16px 24px" }}>
                                Customer Need
                            </div>
                            <div className="spec-val" style={{ background: "var(--navy-light)", color: "var(--text-primary)", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", padding: "16px 24px" }}>
                                SAMSAN Response
                            </div>
                        </div>

                        {/* Row 1 */}
                        <motion.div
                            className="comparison-row"
                            style={{ background: "rgba(13,19,35,0.6)", minHeight: "64px" }}
                            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: "easeOut", delay: 0 }}
                        >
                            <div className="spec-key" style={{ padding: "20px 24px", fontSize: "12px", letterSpacing: "0.06em", fontWeight: 600, color: "var(--mint)", textTransform: "uppercase" }}>
                                Need cockpit / IVI / cluster engineering
                            </div>
                            <div className="spec-val" style={{ padding: "20px 24px", fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 400 }}>
                                Android Automotive, QNX/Linux, HMI, middleware, validation
                            </div>
                        </motion.div>

                        {/* Row 2 */}
                        <motion.div
                            className="comparison-row"
                            style={{ background: "rgba(255,255,255,0.025)", minHeight: "64px" }}
                            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: "easeOut", delay: 0.08 }}
                        >
                            <div className="spec-key" style={{ padding: "20px 24px", fontSize: "12px", letterSpacing: "0.06em", fontWeight: 600, color: "var(--mint)", textTransform: "uppercase" }}>
                                Need connected vehicle / telematics platform
                            </div>
                            <div className="spec-val" style={{ padding: "20px 24px", fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 400 }}>
                                TCU, cloud telemetry, OTA, IoT gateway, diagnostics
                            </div>
                        </motion.div>

                        {/* Row 3 */}
                        <motion.div
                            className="comparison-row"
                            style={{ background: "rgba(13,19,35,0.6)", minHeight: "64px" }}
                            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: "easeOut", delay: 0.16 }}
                        >
                            <div className="spec-key" style={{ padding: "20px 24px", fontSize: "12px", letterSpacing: "0.06em", fontWeight: 600, color: "var(--mint)", textTransform: "uppercase" }}>
                                Need faster engineering lifecycle
                            </div>
                            <div className="spec-val" style={{ padding: "20px 24px", fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 400 }}>
                                GenAI requirements, test generation, traceability, code/test acceleration
                            </div>
                        </motion.div>

                        {/* Row 4 */}
                        <motion.div
                            className="comparison-row"
                            style={{ background: "rgba(255,255,255,0.025)", minHeight: "64px" }}
                            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: "easeOut", delay: 0.24 }}
                        >
                            <div className="spec-key" style={{ padding: "20px 24px", fontSize: "12px", letterSpacing: "0.06em", fontWeight: 600, color: "var(--mint)", textTransform: "uppercase" }}>
                                Need automotive-domain capacity
                            </div>
                            <div className="spec-val" style={{ padding: "20px 24px", fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 400 }}>
                                Strategic staffing, CoE, BOT, managed teams
                            </div>
                        </motion.div>

                        {/* Row 5 */}
                        <motion.div
                            className="comparison-row"
                            style={{ background: "rgba(13,19,35,0.6)", minHeight: "64px" }}
                            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: "easeOut", delay: 0.32 }}
                        >
                            <div className="spec-key" style={{ padding: "20px 24px", fontSize: "12px", letterSpacing: "0.06em", fontWeight: 600, color: "var(--mint)", textTransform: "uppercase" }}>
                                Need production-grade quality
                            </div>
                            <div className="spec-val" style={{ padding: "20px 24px", fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 400 }}>
                                ASPICE, ISO 26262, cybersecurity, MISRA, V&amp;V discipline
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* 4 Core Pillars Grid */}
                <style>{`
                    .pillar-card {
                        position: relative;
                        background: rgba(13, 19, 35, 0.55);
                        border: none;
                        border-radius: 16px;
                        padding: 36px 32px;
                        overflow: hidden;
                        cursor: default;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                        display: flex;
                        flex-direction: column;
                    }
                    .pillar-card::before {
                        content: "";
                        position: absolute;
                        inset: 0;
                        border-radius: 16px;
                        padding: 1px;
                        background: linear-gradient(
                            135deg,
                            rgba(77, 216, 232, 0.3),
                            rgba(255, 138, 61, 0.0),
                            rgba(77, 216, 232, 0.1)
                        );
                        -webkit-mask:
                            linear-gradient(#fff 0 0) content-box,
                            linear-gradient(#fff 0 0);
                        -webkit-mask-composite: xor;
                        mask-composite: exclude;
                        pointer-events: none;
                        transition: background 0.3s ease;
                    }
                    .pillar-card:hover::before {
                        background: linear-gradient(
                            135deg,
                            rgba(77, 216, 232, 0.6),
                            rgba(255, 138, 61, 0.2),
                            rgba(77, 216, 232, 0.3)
                        );
                    }
                    .pillar-card::after {
                        content: "";
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 120px;
                        height: 120px;
                        background: radial-gradient(
                            circle at top right,
                            rgba(77, 216, 232, 0.08) 0%,
                            transparent 70%
                        );
                        border-radius: 0 16px 0 100%;
                        pointer-events: none;
                    }
                    .pillar-card:hover {
                        transform: translateY(-4px);
                        box-shadow: 0 16px 40px rgba(0,0,0,0.35);
                    }
                    .pillars-grid {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: 24px;
                    }
                    @media (min-width: 640px) {
                        .pillars-grid {
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }
                `}</style>
                <div style={{
                    marginTop: "80px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    paddingTop: "80px",
                    position: "relative",
                    zIndex: 2
                }}>
                    {/* Subtle radial glow behind the grid */}
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: "none",
                        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(77, 216, 232, 0.04) 0%, transparent 70%)"
                    }} />

                    <div className="pillars-grid" style={{ position: "relative", zIndex: 1 }}>
                        {pillars.map((p, idx) => (
                            <motion.div
                                key={p.title}
                                className="pillar-card"
                                initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={shouldReduce ? { duration: 0 } : {
                                    duration: 0.5,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                    delay: idx * 0.12
                                }}
                            >
                                {/* Card number */}
                                <span style={{
                                    position: "absolute",
                                    top: "28px",
                                    right: "28px",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "11px",
                                    letterSpacing: "0.1em",
                                    color: "rgba(255,255,255,0.12)",
                                    fontWeight: 400,
                                    zIndex: 2
                                }}>
                                    {String(idx + 1).padStart(2, "0")}
                                </span>

                                {/* Icon */}
                                <div style={{
                                    width: "52px",
                                    height: "52px",
                                    borderRadius: "12px",
                                    background: p.iconBg,
                                    border: `1px solid ${p.iconBorder}`,
                                    color: p.iconColor,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    boxShadow: `0 0 16px ${p.iconGlow}`,
                                    position: "relative",
                                    zIndex: 2
                                }}>
                                    {p.icon}
                                </div>

                                {/* Title */}
                                <h3 style={{
                                    fontSize: "1.2rem",
                                    fontWeight: 700,
                                    lineHeight: 1.3,
                                    letterSpacing: "-0.01em",
                                    color: "#ffffff",
                                    marginTop: "20px",
                                    marginBottom: "10px",
                                    position: "relative",
                                    zIndex: 2
                                }}>{p.title}</h3>

                                {/* Description */}
                                <p style={{
                                    fontSize: "0.93rem",
                                    lineHeight: "1.7",
                                    color: "var(--text-secondary)",
                                    margin: 0,
                                    marginBottom: "20px",
                                    flexGrow: 1,
                                    position: "relative",
                                    zIndex: 2
                                }}>{p.desc}</p>

                                {/* Capability Tags */}
                                <div style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "8px",
                                    position: "relative",
                                    zIndex: 2
                                }}>
                                    {p.tags.map(tag => (
                                        <span key={tag} style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "11px",
                                            letterSpacing: "0.05em",
                                            padding: "4px 10px",
                                            borderRadius: "20px",
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            color: "rgba(240, 244, 255, 0.6)"
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
