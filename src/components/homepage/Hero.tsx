"use client";

import Link from "next/link";
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
                <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "900px", margin: "0 auto 60px" }}>
                    
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
                        Technology Reimagined <br />
                        <span className="gradient-text">Systems Company</span>
                    </h1>

                    <p className="lead" style={{ maxWidth: "680px", margin: "0 auto 40px", color: "var(--text-secondary)" }}>
                        Samsan Labs delivers vehicle-grade embedded software, advanced artificial intelligence modeling, digital transformation architectures, and strategic validation programs.
                    </p>

                    <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                        <Link href="/services" className="btn btn-primary">
                            Explore Services
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                                <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                        <Link href="/contact" className="btn btn-outline">
                            Talk to an Engineer
                        </Link>
                    </div>
                </div>

                {/* 4 Core Pillars Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "20px",
                    marginTop: "60px",
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
