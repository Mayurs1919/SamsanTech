"use client";

<<<<<<< HEAD
import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
=======
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
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
    };

    return (
        <>
<<<<<<< HEAD
            <style>{`
                .ferrari-hero-section {
                    position: relative;
                    width: 100%;
                    min-height: calc(100vh - var(--header-h));
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding-top: calc(var(--header-h) + 40px);
                    padding-bottom: 64px;
                    padding-left: 32px;
                    padding-right: 32px;
                    overflow: hidden;
                    box-sizing: border-box;
                    background: #0A0F1C;
                }

                /* Full-Bleed Background Video */
                .ferrari-video-bg {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    z-index: 0;
                }

                /* Gradient Vignette Overlays for Maximum Text Contrast */
                .ferrari-hero-overlay-top {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 180px;
                    background: linear-gradient(to bottom, rgba(10, 15, 28, 0.85) 0%, rgba(10, 15, 28, 0.3) 60%, transparent 100%);
                    z-index: 1;
                    pointer-events: none;
                }
                .ferrari-hero-overlay-bottom {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 50% 90%, rgba(10, 15, 28, 0.95) 0%, rgba(10, 15, 28, 0.75) 45%, rgba(10, 15, 28, 0.25) 80%, transparent 100%),
                                linear-gradient(to top, #0A0F1C 0%, rgba(10, 15, 28, 0.85) 40%, transparent 80%);
                    z-index: 1;
                    pointer-events: none;
                }

                /* Center Content Container */
                .ferrari-hero-content {
                    position: relative;
                    z-index: 2;
                    max-width: 980px;
                    margin: 0 auto;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                }

                /* Hero Title */
                .ferrari-hero-title {
                    font-family: var(--font-display, 'Space Grotesk', sans-serif);
                    font-size: clamp(2.4rem, 4.5vw, 4.2rem);
                    font-weight: 800;
                    line-height: 1.1;
                    letter-spacing: -0.03em;
                    color: #FFFFFF;
                    margin: 0;
                    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
                }
                .ferrari-title-gradient {
                    background: linear-gradient(135deg, #C084FC 0%, #E879F9 50%, #38BDF8 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    display: inline-block;
                }

                /* Lead Paragraph */
                .ferrari-hero-desc {
                    font-family: var(--font-body, 'DM Sans', sans-serif);
                    font-size: clamp(1rem, 1.2vw, 1.15rem);
                    line-height: 1.68;
                    color: #E2E8F0;
                    max-width: 760px;
                    margin: 0;
                    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
                }

                /* Capability Pills */
                .ferrari-capabilities {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    flex-wrap: wrap;
                }
                .ferrari-capability-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 14px;
                    border-radius: 100px;
                    background: rgba(10, 15, 28, 0.6);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(10px);
                    font-size: 0.8rem;
                    color: #CBD5E1;
                    font-weight: 500;
                    transition: all 0.2s ease;
                }
                .ferrari-capability-pill:hover {
                    border-color: rgba(192, 132, 252, 0.5);
                    color: #FFFFFF;
                }

                /* CTA Button Row */
                .ferrari-cta-row {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 16px;
                    margin-top: 6px;
                }
                .ferrari-btn-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px 36px;
                    border-radius: 100px;
                    background: linear-gradient(135deg, #7C3AED 0%, #C084FC 50%, #EC4899 100%);
                    color: #FFFFFF;
                    font-family: var(--font-display, 'Space Grotesk', sans-serif);
                    font-size: 1rem;
                    font-weight: 700;
                    letter-spacing: -0.01em;
                    box-shadow: 0 8px 30px rgba(124, 58, 237, 0.5);
                    transition: all 0.25s ease;
                    text-decoration: none;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                .ferrari-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 35px rgba(124, 58, 237, 0.7);
                }
                .ferrari-btn-arrow {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.2s ease;
                }
                .ferrari-btn-primary:hover .ferrari-btn-arrow {
                    transform: translateX(3px);
                }

                /* Bottom-Right Play/Pause Toggle Button (Ferrari Style) */
                .ferrari-video-toggle {
                    position: absolute;
                    bottom: 32px;
                    right: 32px;
                    z-index: 10;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: rgba(10, 15, 28, 0.65);
                    border: 1px solid rgba(255, 255, 255, 0.25);
                    backdrop-filter: blur(12px);
                    color: #FFFFFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .ferrari-video-toggle:hover {
                    background: rgba(255, 255, 255, 0.15);
                    border-color: rgba(255, 255, 255, 0.5);
                    transform: scale(1.08);
                }

                /* Responsive Breakpoints */
                @media (max-width: 768px) {
                    .ferrari-hero-section {
                        padding-left: 20px;
                        padding-right: 20px;
                        padding-bottom: 40px;
                        min-height: 85vh;
                    }
                    .ferrari-hero-title {
                        font-size: clamp(2rem, 6.5vw, 2.8rem);
                    }
                    .ferrari-video-toggle {
                        bottom: 20px;
                        right: 20px;
                        width: 38px;
                        height: 38px;
=======
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
                    padding-top: calc(var(--header-h) + 48px) !important;
                    padding-bottom: 56px !important;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                    gap: 48px;
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                    box-sizing: border-box;
                }
                /* absolute-positioned bg elements don't join the grid */
                .hero-glow, .hero-bg-grid {
                    position: absolute;
                    pointer-events: none;
                }
                .hero-text-col {
                    padding: 20px 24px 20px 64px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 28px;
                    position: relative;
                    z-index: 1;
                }
                .hero-video-col {
                    padding: 20px 56px 20px 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    z-index: 1;
                }
                /* Tablet */
                @media (max-width: 1024px) {
                    .hero-section {
                        grid-template-columns: 1fr;
                        min-height: auto;
                        padding-top: calc(var(--header-h) + 24px) !important;
                        padding-bottom: 40px !important;
                    }
                    .hero-text-col {
                        padding: 24px 32px;
                        text-align: center;
                        align-items: center;
                    }
                    .hero-video-col {
                        padding: 0 40px 32px;
                        height: auto;
                    }
                    .hero-buttons-container {
                        justify-content: center !important;
                    }
                }
                /* Mobile */
                @media (max-width: 640px) {
                    .hero-section {
                        padding-top: calc(var(--header-h) + 20px) !important;
                        padding-bottom: 36px !important;
                    }
                    .hero-text-col {
                        padding: 16px 20px;
                    }
                    .hero-video-col {
                        padding: 0 20px 24px;
                    }
                    .hero-title {
                        font-size: clamp(2rem, 7.5vw, 2.8rem) !important;
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
                    }
                }
            `}</style>

<<<<<<< HEAD
            <section className="ferrari-hero-section">
                {/* Full-Bleed Video Background */}
                <video
                    ref={videoRef}
                    className="ferrari-video-bg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                >
                    <source src="/videos/samsan-demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Top and Bottom Gradient Vignettes */}
                <div className="ferrari-hero-overlay-top" aria-hidden="true" />
                <div className="ferrari-hero-overlay-bottom" aria-hidden="true" />

                {/* Strategically Positioned Centered Content Overlay */}
                <div className="ferrari-hero-content">
                    {/* Main Headline */}
                    <motion.h1
                        className="ferrari-hero-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    >
                        AI-led Automotive Engineering{" "}
                        <span className="ferrari-title-gradient">for Software-Defined Mobility</span>
                    </motion.h1>

                    {/* Lead Paragraph */}
                    <motion.p
                        className="ferrari-hero-desc"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        SAMSAN Technische Labs helps <strong style={{ color: "#FFFFFF", fontWeight: 600 }}>OEMs, Tier-1s, and semiconductor leaders</strong> design, develop, validate, and scale next-generation <strong style={{ color: "#FFFFFF", fontWeight: 600 }}>digital cockpit, connected vehicle, SDV, embedded, cloud</strong>, and AI engineering solutions.
                    </motion.p>

                    {/* Capability Pills */}
                    <motion.div
                        className="ferrari-capabilities"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                    >
                        <span className="ferrari-capability-pill">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            Cockpit &amp; ADAS HUD
                        </span>
                        <span className="ferrari-capability-pill">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            Vehicle-Grade SDV
                        </span>
                        <span className="ferrari-capability-pill">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            Embedded AI &amp; Cloud
                        </span>
                        <span className="ferrari-capability-pill">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            AUTOSAR &amp; ISO 26262
                        </span>
                    </motion.div>

                    {/* CTA Button Row */}
                    <motion.div
                        className="ferrari-cta-row"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    >
                        <Link href="/contact" className="ferrari-btn-primary">
                            <span>TALK TO ENGINEER</span>
                            <span className="ferrari-btn-arrow">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </Link>
                    </motion.div>
                </div>


=======
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
                            fontSize: "clamp(2.8rem, 4.8vw, 4.8rem)",
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
                            fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
                            lineHeight: 1.8,
                            maxWidth: "540px",
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
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
            </section>
        </>
    );
}
