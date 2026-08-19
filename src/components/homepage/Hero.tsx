"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion } from "framer-motion";



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
            {/* Responsive video container */}
            <style>{`
                .hero-video-container {
                    aspect-ratio: 16 / 9;
                    min-height: 220px;
                    width: 100%;
                    max-width: 100%;
                }
                @media (min-width: 900px) {
                    .hero-video-container {
                        aspect-ratio: 16 / 9;
                        min-height: unset;
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
                    margin: "0 auto",
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
                            <span style={{ color: "var(--mint)", fontWeight: 700 }}>//</span>
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
    return (
        <>
            <style>{`
                /* Hero: full-bleed 2-column grid — section IS the grid */
                .hero-section {
                    display: grid !important;
                    grid-template-columns: 1fr 1fr;
                    align-items: center;
                    min-height: 100vh;
                    padding: 0 !important;
                    gap: 0;
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                }
                /* absolute-positioned bg elements don't join the grid */
                .hero-glow, .hero-bg-grid {
                    position: absolute;
                    pointer-events: none;
                }
                .hero-text-col {
                    padding: 0 40px 0 64px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 24px;
                    position: relative;
                    z-index: 1;
                }
                .hero-video-col {
                    padding: 32px 48px 32px 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 110%;
                    position: relative;
                    z-index: 1;
                }
                /* Tablet */
                @media (max-width: 1024px) {
                    .hero-section {
                        grid-template-columns: 1fr;
                    }
                    .hero-text-col {
                        padding: 56px 32px 32px;
                        text-align: center;
                        align-items: center;
                    }
                    .hero-video-col {
                        padding: 0 72px 48px;
                        height: auto;
                    }
                    .hero-buttons-container {
                        justify-content: center !important;
                    }
                }
                /* Mobile */
                @media (max-width: 640px) {
                    .hero-text-col {
                        padding: 48px 20px 24px;
                    }
                    .hero-video-col {
                        padding: 0 20px 40px;
                    }
                    .hero-title {
                        font-size: clamp(2.2rem, 7vw, 3rem) !important;
                    }
                }
            `}</style>

            <section className="hero-section">
                {/* Background glow orb */}
                <div className="hero-glow" aria-hidden="true" />

                {/* Ambient dot grid — absolute so it doesn't participate in the 2-col grid */}
                <div className="hero-bg-grid" style={{
                    inset: 0,
                    backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                    opacity: 0.7,
                    zIndex: 0
                }} />

                {/* Left column — text */}
                <div className="hero-text-col">
                    <h1
                        className="hero-title"
                        style={{
                            fontSize: "clamp(3rem, 5.5vw, 4.8rem)",
                            fontWeight: 800,
                            lineHeight: 1.06,
                            letterSpacing: "-0.03em",
                            marginBottom: 0,
                            maxWidth: "100%",
                        }}
                    >
                        AI-led Automotive Engineering{" "}
                        <span className="gradient-text">for Software-Defined Mobility</span>
                    </h1>

                    <p
                        className="hero-lead"
                        style={{
                            fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                            lineHeight: 1.75,
                            maxWidth: "520px",
                            marginBottom: 0,
                        }}
                    >
                        SAMSAN Technische Labs helps OEMs, Tier-1s, semiconductor companies, and high-tech enterprises design, develop, validate, and scale next-generation cockpit, connected vehicle, SDV, embedded, cloud, and AI-driven engineering solutions.
                    </p>

                    <div
                        className="hero-buttons-container"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                            flexWrap: "wrap",
                            marginTop: "8px",
                            justifyContent: "flex-start",
                        }}
                    >
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

                {/* Right column — video */}
                <div className="hero-video-col">
                    <CinematicVideoPlayer />
                </div>
            </section>
        </>
    );
}
