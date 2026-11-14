"use client";

import Link from "next/link";

const pillars = [
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
    {
        title: "Digital Transformation",
        desc: "Cloud telemetry platforms, remote fleet diagnostics, OTA , and IoT edge integration.",
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
];

export default function OfferingCards() {
    return (
        <section
            className="home-offerings-section"
            style={{
                width: "100%",
                display: "block",
                position: "relative",
                padding: "96px 24px",
            }}
        >
            <style>{`
                .pillar-card {
                    position: relative;
                    height: 100%;
                    background: #FFFFFF;
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    padding: 24px;
                    transition: transform 180ms ease, border-color 160ms ease, box-shadow 160ms ease;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 1px 2px rgba(11,19,32,.06), 0 8px 24px rgba(11,19,32,.06);
                }
                .pillar-card:hover {
                    transform: translateY(-4px);
                    border-color: var(--teal);
                    box-shadow: 0 12px 32px rgba(11,19,32,.12);
                }
                .pillar-card h3 {
                    color: var(--navy);
                    font-size: 20px;
                    font-weight: 700;
                    line-height: 1.35;
                    margin-top: 20px;
                    margin-bottom: 8px;
                }
                .pillar-card p { color: var(--body); font-size: 16px; line-height: 1.6; }
                .pillar-card .arrow-btn { color: var(--teal); border-color: var(--border); background: var(--bg-alt); }
                .pillar-card:hover .arrow-btn { color: #FFFFFF; border-color: var(--teal); background: var(--teal); }
                .home-offerings-section .container { width: min(100%, 1200px); max-width: 1200px; margin-inline: auto; padding: 0; }
                .home-offerings-section h2 { color: var(--navy) !important; font-family: var(--font-corp-manrope), Manrope, sans-serif !important; text-wrap: balance; }
                .home-offerings-section .lead { color: var(--body) !important; font-size: 16px !important; }
                .home-offerings-section .pillars-grid { grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); gap: 24px; }
                .home-offerings-section .pillar-card > a { color: var(--body) !important; }
                .home-offerings-section .dest-label { color: var(--muted) !important; font: 600 13px/1.4 var(--font-corp-inter), Inter, sans-serif !important; letter-spacing: 0 !important; text-transform: none !important; }
                .home-offerings-section .pillar-card .capability-tag { color: var(--body) !important; background: var(--bg-alt) !important; border-color: var(--border) !important; font: 500 13px/1.35 var(--font-corp-inter), Inter, sans-serif !important; letter-spacing: 0 !important;
                }
                @media (max-width: 760px) {
                    .home-offerings-section { padding: 64px 20px !important; }
                    .home-offerings-section .pillars-grid { grid-template-columns: 1fr; }
                }
            `}</style>

            <div className="container">
                <div
                    style={{
                        position: "relative",
                        zIndex: 2
                    }}
                >
                    <div className="pillars-grid" style={{ position: "relative", zIndex: 1 }}>
                        {pillars.map((p, idx) => (
                            <div
                                key={p.title}
                                className="pillar-card"
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
                                        fontFamily: "var(--font-corp-inter), Inter, sans-serif",
                                        fontSize: "14px",
                                        letterSpacing: "0.02em",
                                        color: "rgba(11,19,32,0.35)",
                                        fontWeight: 400,
                                        zIndex: 2
                                    }}>
                                        {String(idx + 1).padStart(2, "0")}
                                    </span>

                                    {/* Icon */}
                                    <div style={{
                                        width: "44px",
                                        height: "44px",
                                        borderRadius: "12px",
                                        background: "rgba(0,95,138,0.08)",
                                        border: "1px solid rgba(0,95,138,0.16)",
                                        color: "var(--teal)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                        position: "relative",
                                        zIndex: 2
                                    }}>
                                        {p.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 style={{
                                        fontSize: "20px",
                                        fontWeight: 700,
                                        lineHeight: 1.3,
                                        letterSpacing: "-0.01em",
                                        color: "var(--navy)",
                                        marginTop: "20px",
                                        marginBottom: "10px",
                                        position: "relative",
                                        zIndex: 2
                                    }}>{p.title}</h3>

                                    {/* Description */}
                                    <p style={{
                                        fontSize: "16px",
                                        lineHeight: "1.6",
                                        color: "var(--body)",
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
                                            <span key={tag} className="capability-tag" style={{
                                                fontFamily: "var(--font-corp-inter), Inter, sans-serif",
                                                fontSize: "13px",
                                                letterSpacing: "0",
                                                padding: "4px 10px",
                                                borderRadius: "20px",
                                                background: "var(--bg-alt)",
                                                border: "1px solid var(--border)",
                                                color: "var(--body)"
                                            }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Bottom Arrow Row */}
                                    <div style={{
                                        marginTop: "20px",
                                        paddingTop: "16px",
                                        borderTop: "1px solid var(--border)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        zIndex: 2
                                    }}>
                                        <span className="dest-label" style={{
                                            fontFamily: "var(--font-corp-inter), Inter, sans-serif",
                                            fontSize: "13px",
                                            letterSpacing: "0",
                                            textTransform: "none",
                                            color: "var(--muted)"
                                        }}>
                                            {p.destLabel}
                                        </span>

                                        <div className="arrow-btn" style={{
                                            width: "32px",
                                            height: "32px",
                                            borderRadius: "50%",
                                            background: "var(--bg-alt)",
                                            border: "1px solid var(--border)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: "all 0.2s ease"
                                        }}>
                                            <svg viewBox="0 0 14 14" style={{ width: "14px", height: "14px" }}>
                                                <path
                                                    d="M2 7h10M7 2l5 5-5 5"
                                                    style={{
                                                        stroke: "var(--teal)",
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
