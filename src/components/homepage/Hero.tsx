"use client";

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
    };

    return (
        <>
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
                    }
                }
            `}</style>

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


            </section>
        </>
    );
}
