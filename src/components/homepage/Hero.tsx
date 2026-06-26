"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

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
        accent: "rgba(124, 58, 237, 0.4)",
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
        accent: "rgba(236, 72, 153, 0.4)",
    },
    {
        title: "Digital Transformation",
        desc: "Cloud telemetry platforms, remote fleet diagnostics, OTA pipeline orchestration, and IoT edge integration.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3v18M3 12h18M12 3l4 4M12 3L8 7M12 21l4-4M12 21l-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        accent: "rgba(59, 130, 246, 0.4)",
    },
    {
        title: "Consulting & Strategic Staffing",
        desc: "Domain-aligned engineers, Build-Operate-Transfer (BOT) hubs, and managed Validation & Verification (V&V) execution.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm14 14v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        accent: "rgba(16, 185, 129, 0.4)",
    },
];

function CinematicVideoPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlayClick = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(err => {
                    console.log("Playback failed:", err);
                });
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{
                position: "relative",
                maxWidth: "840px",
                margin: "56px auto 64px auto",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                overflow: "hidden",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(139, 92, 246, 0.15)",
                background: "rgba(13, 19, 35, 0.3)",
                backdropFilter: "blur(12px)",
                cursor: "pointer"
            }}
            onClick={handlePlayClick}
            whileHover={{ scale: 1.015, borderColor: "rgba(139, 92, 246, 0.3)", boxShadow: "0 30px 70px rgba(0, 0, 0, 0.6), 0 0 50px rgba(139, 92, 246, 0.25)" }}
        >
            <div style={{ position: "absolute", inset: "-20px", background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)", filter: "blur(20px)", zIndex: -1, pointerEvents: "none" }} />
            <video ref={videoRef} style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }} loop muted playsInline src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-hud-interface-screen-loop-41604-large.mp4" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10, 15, 28, 0.4) 0%, rgba(10, 15, 28, 0) 50%, rgba(10, 15, 28, 0.8) 100%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", display: "flex", flexDirection: "column", gap: "8px", pointerEvents: "none", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ backgroundColor: "rgba(16, 185, 129, 0.15)", color: "var(--mint)", border: "1px solid rgba(16, 185, 129, 0.25)", fontSize: "0.7rem", padding: "3px 8px", borderRadius: "100px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--mint)", display: "inline-block" }} />
                        System Active
                    </span>
                    <span style={{ color: "rgba(255, 255, 255, 0.4)", fontSize: "0.75rem", fontFamily: "var(--font-mono)" }}>SAMSAN AI CORE v4.0</span>
                </div>
                <h4 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#ffffff", margin: 0, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>Automotive Digital Concept & ADAS HUD</h4>
                <p style={{ fontSize: "0.85rem", color: "rgba(240, 244, 255, 0.75)", margin: 0, maxWidth: "500px", lineHeight: "1.4", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>A preview of our vehicle-grade intelligent instrument display rendering simulated real-time telemetry.</p>
            </div>
            <div style={{ position: "absolute", top: "24px", right: "24px", fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--violet-mid)", textAlign: "right", background: "rgba(10, 15, 28, 0.6)", padding: "8px 12px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)", pointerEvents: "none", display: "flex", flexDirection: "column", gap: "2px" }}>
                <div>SYS STATUS: OK</div>
                <div>FPS: 60.00</div>
                <div>LATENCY: 12ms</div>
                <div>SECURE LINK: ACTIVE</div>
            </div>
            <AnimatePresence>
                {!isPlaying && (
                    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(10, 15, 28, 0.3), rgba(10, 15, 28, 0.7)), url('/images/auto_cockpit_sys.png')", backgroundSize: "cover", backgroundPosition: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} style={{ width: "70px", height: "70px", borderRadius: "50%", background: "rgba(139, 92, 246, 0.9)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)", border: "2px solid rgba(255, 255, 255, 0.2)", marginBottom: "16px" }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        </motion.div>
                        <span style={{ color: "#ffffff", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>Click to Play Concept Video</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
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
                    
                    <h1 style={{ marginBottom: "24px", fontWeight: 700, letterSpacing: "-0.03em" }}>
                        AI-led Automotive Engineering <br />
                        <span className="gradient-text">for Software-Defined Mobility</span>
                    </h1>

                    <p className="lead" style={{ maxWidth: "780px", margin: "0 auto 40px", color: "var(--text-secondary)" }}>
                        SAMSAN Technische Labs helps OEMs, Tier-1s, semiconductor companies, and high-tech enterprises design, develop, validate, and scale next-generation cockpit, connected vehicle, SDV, embedded, cloud, and AI-driven engineering solutions.
                    </p>

                    <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                        <Link href="/contact" className="btn btn-primary">
                            Discuss Your Mobility Engineering Need
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                                <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
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
                        <span className="badge rose" style={{ marginBottom: "16px" }}>Value Creation</span>
                        <h2 id="value-heading" style={{ fontSize: "2.2rem", fontWeight: 700, color: "#ffffff", marginBottom: "16px", letterSpacing: "-0.02em" }}>
                            Where SAMSAN Creates Value
                        </h2>
                        <p className="lead" style={{ maxWidth: "600px", margin: "0 auto", color: "var(--text-secondary)" }}>
                            How we align our specialized automotive engineering capabilities with your critical program requirements.
                        </p>
                    </div>

                    <div className="spec-table">
                        {/* Header Row */}
                        <div className="comparison-row comparison-header" style={{ borderBottom: "2px solid rgba(255, 255, 255, 0.12)" }}>
                            <div className="spec-key" style={{ background: "var(--navy-light)", color: "var(--text-primary)", fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em", borderRight: "1px solid rgba(255, 255, 255, 0.08)", padding: "18px 24px" }}>
                                Customer Need
                            </div>
                            <div className="spec-val" style={{ background: "var(--navy-light)", color: "var(--text-primary)", fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em", padding: "18px 28px" }}>
                                SAMSAN Response
                            </div>
                        </div>

                        {/* Row 1 */}
                        <div className="comparison-row">
                            <div className="spec-key">
                                Need cockpit / IVI / cluster engineering
                            </div>
                            <div className="spec-val">
                                Android Automotive, QNX/Linux, HMI, middleware, validation
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="comparison-row">
                            <div className="spec-key">
                                Need connected vehicle / telematics platform
                            </div>
                            <div className="spec-val">
                                TCU, cloud telemetry, OTA, IoT gateway, diagnostics
                            </div>
                        </div>

                        {/* Row 3 */}
                        <div className="comparison-row">
                            <div className="spec-key">
                                Need faster engineering lifecycle
                            </div>
                            <div className="spec-val">
                                GenAI requirements, test generation, traceability, code/test acceleration
                            </div>
                        </div>

                        {/* Row 4 */}
                        <div className="comparison-row">
                            <div className="spec-key">
                                Need automotive-domain capacity
                            </div>
                            <div className="spec-val">
                                Strategic staffing, CoE, BOT, managed teams
                            </div>
                        </div>

                        {/* Row 5 */}
                        <div className="comparison-row">
                            <div className="spec-key">
                                Need production-grade quality
                            </div>
                            <div className="spec-val">
                                ASPICE, ISO 26262, cybersecurity, MISRA, V&V discipline
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 4 Core Pillars Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "20px",
                    marginTop: "80px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    paddingTop: "80px",
                    position: "relative",
                    zIndex: 2
                }}>
                    {pillars.map((p, idx) => (
                        <motion.div
                            key={p.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ y: -6, borderColor: "rgba(255,255,255,0.15)" }}
                            style={{
                                background: "rgba(13, 19, 35, 0.45)",
                                border: "1px solid rgba(255, 255, 255, 0.06)",
                                borderRadius: "var(--radius)",
                                padding: "28px 24px",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                                transition: "all 0.3s ease",
                                cursor: "default"
                            }}
                        >
                            <div style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "8px",
                                background: "rgba(255,255,255,0.03)",
                                color: "var(--text-primary)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: "20px",
                                border: "1px solid rgba(255,255,255,0.08)"
                            }}>
                                {p.icon}
                            </div>
                            <h3 style={{ fontSize: "1.1rem", marginBottom: "12px", color: "#ffffff", fontWeight: 600 }}>{p.title}</h3>
                            <p style={{ fontSize: "0.85rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>{p.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
