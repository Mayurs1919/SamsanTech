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
        iconBg: "rgba(77, 216, 232, 0.12)",
        iconBorder: "rgba(77, 216, 232, 0.25)",
        iconColor: "#4DD8E8",
        iconGlow: "rgba(77, 216, 232, 0.2)",
        tags: ["AUTOSAR", "ADAS", "Cockpit"],
        url: "/engineering-offerings",
        destLabel: "Engineering Offerings",
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
        url: "/products-and-accelerators",
        destLabel: "Products & Accelerators",
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
        url: "/products-and-accelerators",
        destLabel: "Products & Accelerators",
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
        url: "/contact",
        destLabel: "Contact Us",
    },
];

export default function OfferingCards() {
    const shouldReduce = useReducedMotion();

    return (
        <section
            style={{
                width: "100%",
                display: "block",
                position: "relative",
                overflow: "hidden",
                padding: "64px 0",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
        >
            <style>{`
                .pillar-card {
                    position: relative;
                    background: rgba(13, 19, 35, 0.55);
                    border: none;
                    border-radius: 16px;
                    padding: 28px 24px;
                    overflow: hidden;
                    cursor: pointer;
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
                .pillar-card:hover .arrow-btn {
                    background: #4DD8E8 !important;
                    border-color: #4DD8E8 !important;
                }
                .pillar-card:hover .arrow-btn svg path {
                    stroke: #ffffff !important;
                }
                @media (max-width: 639px) {
                    .dest-label {
                        display: none !important;
                    }
                }
                .pillars-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 20px;
                    width: 100%;
                }
                @media (min-width: 640px) {
                    .pillars-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            `}</style>

            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "36px" }}>
                    <span className="badge" style={{ marginBottom: "16px", fontSize: "12px", letterSpacing: "0.12em", fontWeight: 500 }}>Our Offerings</span>
                    <h2 style={{
                        fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                        fontWeight: 700,
                        lineHeight: 1.12,
                        letterSpacing: "-0.01em",
                        color: "#ffffff",
                        marginBottom: "16px"
                    }}>
                        What We Do
                    </h2>
                    <p className="lead" style={{
                        maxWidth: "600px",
                        margin: "0 auto",
                        color: "var(--text-secondary)",
                        fontSize: "1.1rem",
                        lineHeight: "1.75"
                    }}>
                        Four core capabilities that power the full software-defined vehicle lifecycle.
                    </p>
                </div>

                <div
                    style={{
                        position: "relative",
                        zIndex: 2
                    }}
                >
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
                                <Link
                                    href={p.url}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                        width: "100%",
                                        textDecoration: "none",
                                        color: "inherit"
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

                                    {/* Bottom Arrow Row */}
                                    <div style={{
                                        marginTop: "20px",
                                        paddingTop: "16px",
                                        borderTop: "1px solid rgba(255, 255, 255, 0.032)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        zIndex: 2
                                    }}>
                                        <span className="dest-label" style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "10px",
                                            letterSpacing: "0.08em",
                                            textTransform: "uppercase",
                                            color: "rgba(156, 168, 196, 0.55)"
                                        }}>
                                            {p.destLabel}
                                        </span>

                                        <div className="arrow-btn" style={{
                                            width: "32px",
                                            height: "32px",
                                            borderRadius: "50%",
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255, 255, 255, 0.08)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: "all 0.2s ease"
                                        }}>
                                            <svg viewBox="0 0 14 14" style={{ width: "14px", height: "14px" }}>
                                                <path
                                                    d="M2 7h10M7 2l5 5-5 5"
                                                    style={{
                                                        stroke: "rgba(156, 168, 196, 0.55)",
                                                        fill: "none",
                                                        strokeWidth: 1.8,
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        transition: "stroke 0.2s ease"
                                                    }}
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
