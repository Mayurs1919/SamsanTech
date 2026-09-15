"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

/* ─── Data ─────────────────────────────────────────────────── */
const metrics = [
    { label: "Revenue Growth YoY",      value: "+42%",      note: "Consistent ARR Growth" },
    { label: "Active OEM Engagements",  value: "8",         note: "Global OEM & Tier-1 Programs" },
    { label: "IP & Accelerators",       value: "3 Patents", note: "Pending Software IP" },
    { label: "Engineering Headcount",   value: "+30%",      note: "Scalable India Delivery" },
];

const partners = [
    {
        initial: "C",
        domain: "Web & Mobile",
        name: "Coreco",
        description:
            "Web and mobile app development experts — building scalable, modern applications for enterprise and consumer platforms.",
    },
    {
        initial: "D",
        domain: "Connectivity",
        name: "Deventure",
        description:
            "Connectivity experts for automotive — specializing in vehicle communication protocols, telematics, and connected mobility solutions.",
    },
    {
        initial: "E",
        domain: "AI & Perception",
        name: "EdgeTensor",
        description:
            "AI-enabled perception stack and solutions for automotive — delivering intelligent sensing and real-time inference at the edge.",
    },
    {
        initial: "P",
        domain: "ADAS",
        name: "PEM Technologies Pvt Ltd",
        description:
            "ADAS consultants — providing deep expertise in advanced driver assistance systems, sensor fusion, and autonomous driving validation.",
    },
    {
        initial: "P",
        domain: "Green Mobility",
        name: "Prasah Pvt Ltd",
        description:
            "Hydrogen fuel cell based mobility experts — pioneering clean energy propulsion systems for the next generation of vehicles.",
    },
];

const valueDrivers = [
    {
        advantage: "Automotive software engineering team",
        impact: "Faster scale-up in cockpit, SDV, and connected mobility programs",
    },
    {
        advantage: "Customer access & delivery references",
        impact: "Accelerated market entry, proven execution, and OEM credibility",
    },
    {
        advantage: "Reusable engineering accelerators",
        impact: "Higher productivity, reduced time-to-market, and IP differentiation",
    },
    {
        advantage: "India-based cost-optimised delivery",
        impact: "High margin advantage and scalable global engineering operations",
    },
    {
        advantage: "Founder-led domain expertise",
        impact: "Strategic continuity, domain leadership, and active BD support",
    },
];

/* ─── Shared style helpers ──────────────────────────────────── */
const pillLight = (color: string, bg: string, border: string): React.CSSProperties => ({
    display: "inline-block",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color,
    background: bg,
    border: `1px solid ${border}`,
    borderRadius: "20px",
    padding: "5px 14px",
    marginBottom: "16px",
});

/* ─── Page ──────────────────────────────────────────────────── */
export default function InvestorsPage() {
    const shouldReduce = useReducedMotion();
    const partnerRefs = useRef<(HTMLDivElement | null)[]>([]);

    /* Stagger partner cards on scroll */
    useEffect(() => {
        if (shouldReduce) {
            partnerRefs.current.forEach((el) => {
                if (el) { el.style.opacity = "1"; el.style.transform = "none"; }
            });
            return;
        }
        const observers: IntersectionObserver[] = [];
        partnerRefs.current.forEach((el, i) => {
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            if (el) { el.style.opacity = "1"; el.style.transform = "none"; }
                        }, i * 90);
                        obs.disconnect();
                    }
                },
                { threshold: 0.15 }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, [shouldReduce]);

    return (
        <div>

            {/* ══════════════════════════════════════════
                §1  PAGE HERO  —  dark
            ══════════════════════════════════════════ */}
            <section
                className="section-dark page-hero"
                aria-labelledby="investors-heading"
                style={{
                    background: "linear-gradient(180deg,#06080C 0%,var(--midnight) 100%)",
                    padding: "140px 0 96px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Decorative glows */}
                <div style={{
                    position: "absolute", top: "-20%", right: "10%",
                    width: "520px", height: "520px",
                    background: "radial-gradient(circle,rgba(77,216,232,0.07) 0%,transparent 70%)",
                    pointerEvents: "none",
                }} />
                <div style={{
                    position: "absolute", bottom: "-10%", left: "5%",
                    width: "400px", height: "400px",
                    background: "radial-gradient(circle,rgba(232,82,26,0.06) 0%,transparent 70%)",
                    pointerEvents: "none",
                }} />

                <div className="container" style={{ position: "relative", zIndex: 1 }}>
                    <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible">

                        <motion.div variants={fadeUpVariants(shouldReduce)}>
                            <span style={pillLight("#4DD8E8","rgba(77,216,232,0.08)","rgba(77,216,232,0.25)")}>
                                Corporate Growth &amp; Ecosystem
                            </span>
                        </motion.div>

                        <motion.h1
                            id="investors-heading"
                            variants={fadeUpVariants(shouldReduce)}
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(2.4rem,4vw,3.4rem)",
                                fontWeight: 700,
                                color: "#FFFFFF",
                                letterSpacing: "-0.02em",
                                lineHeight: 1.15,
                                marginBottom: "20px",
                            }}
                        >
                            Investors &amp; Strategic Partners
                        </motion.h1>

                        <motion.p
                            className="lead"
                            variants={fadeUpVariants(shouldReduce)}
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "clamp(1.05rem,1.5vw,1.2rem)",
                                lineHeight: 1.7,
                                color: "#94A3B8",
                                maxWidth: "620px",
                                margin: 0,
                            }}
                        >
                            Explore SAMSAN corporate metrics, strategic buyer alignment, and our
                            partnership ecosystem spanning ADAS, connectivity, AI and green mobility.
                        </motion.p>

                    </motion.div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                §2  FINANCIAL HIGHLIGHTS  —  light
            ══════════════════════════════════════════ */}
            <section
                className="section-light"
                style={{
                    background: "#F8FAFC",
                    borderTop: "1px solid #E2E8F0",
                    padding: "108px 0",
                }}
            >
                <div className="container">
                    <span style={pillLight("#E8521A","rgba(232,82,26,0.08)","rgba(232,82,26,0.2)")}>
                        // Financial Highlights
                    </span>

                    <h2 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.75rem,2.5vw,2.25rem)",
                        fontWeight: 700,
                        color: "#0B1320",
                        letterSpacing: "-0.01em",
                        marginBottom: "36px",
                        lineHeight: 1.2,
                    }}>
                        Performance at a Glance
                    </h2>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                        gap: "24px",
                    }}>
                        {metrics.map((m) => (
                            <motion.div
                                key={m.label}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    background: "#FFFFFF",
                                    border: "1px solid #E2E8F0",
                                    borderRadius: "16px",
                                    padding: "32px 24px",
                                    boxShadow: "0 2px 12px rgba(11,19,32,0.05)",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                {/* accent top bar */}
                                <div style={{
                                    position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                                    background: "linear-gradient(90deg,#E8521A,#F59E0B)",
                                }} />

                                <div style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: "2.6rem",
                                    fontWeight: 700,
                                    color: "#E8521A",
                                    lineHeight: 1,
                                    letterSpacing: "-0.02em",
                                    marginBottom: "10px",
                                }}>
                                    {m.value}
                                </div>

                                <div style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: "1.02rem",
                                    fontWeight: 700,
                                    color: "#0B1320",
                                    marginBottom: "6px",
                                }}>
                                    {m.label}
                                </div>

                                <div style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.78rem",
                                    color: "#64748B",
                                    letterSpacing: "0.02em",
                                }}>
                                    {m.note}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                §3  STRATEGIC ALIGNMENT  —  dark
            ══════════════════════════════════════════ */}
            <section
                className="section-dark"
                style={{
                    background: "var(--midnight)",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    padding: "108px 0",
                }}
            >
                <div className="container">
                    <span style={pillLight("#4DD8E8","rgba(77,216,232,0.08)","rgba(77,216,232,0.25)")}>
                        // Strategic Alignment
                    </span>

                    <h2 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.75rem,2.5vw,2.25rem)",
                        fontWeight: 700,
                        color: "#F8FAFC",
                        letterSpacing: "-0.01em",
                        marginBottom: "12px",
                        lineHeight: 1.2,
                    }}>
                        Why Strategic Buyers Choose SAMSAN
                    </h2>

                    <p style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "1.05rem",
                        color: "#94A3B8",
                        maxWidth: "620px",
                        marginBottom: "40px",
                        lineHeight: 1.7,
                    }}>
                        Key value drivers and advantages delivered to OEMs, Tier-1 automotive
                        suppliers, and technology investors.
                    </p>

                    <style>{`
                        .inv-row {
                            display: grid;
                            grid-template-columns: 1fr 1.2fr;
                            border-bottom: 1px solid rgba(255,255,255,0.07);
                            transition: background 0.2s ease, border-left-color 0.2s ease;
                            border-left: 3px solid transparent;
                        }
                        .inv-row:not(.inv-header):hover {
                            background: rgba(77,216,232,0.04) !important;
                            border-left-color: #4DD8E8;
                        }
                        @media (max-width:640px) { .inv-row { grid-template-columns:1fr; } }
                    `}</style>

                    <div style={{
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "16px",
                        overflow: "hidden",
                        background: "#111622",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                    }}>
                        {/* Header */}
                        <div className="inv-row inv-header" style={{ borderBottom: "2px solid rgba(255,255,255,0.09)" }}>
                            <div style={{
                                fontFamily: "var(--font-sans)",
                                color: "#94A3B8",
                                fontWeight: 700,
                                fontSize: "0.8rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.07em",
                                borderRight: "1px solid rgba(255,255,255,0.07)",
                                padding: "18px 28px",
                            }}>
                                Strategic Buyer Gets
                            </div>
                            <div style={{
                                fontFamily: "var(--font-sans)",
                                color: "#94A3B8",
                                fontWeight: 700,
                                fontSize: "0.8rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.07em",
                                padding: "18px 28px",
                            }}>
                                Why It Matters
                            </div>
                        </div>

                        {/* Rows */}
                        {valueDrivers.map((driver, idx) => (
                            <div
                                key={driver.advantage}
                                className="inv-row"
                                style={{ borderBottom: idx === valueDrivers.length - 1 ? "none" : undefined }}
                            >
                                <div style={{
                                    fontFamily: "var(--font-sans)",
                                    color: "#F1F5F9",
                                    borderRight: "1px solid rgba(255,255,255,0.07)",
                                    padding: "20px 28px",
                                    fontWeight: 600,
                                    fontSize: "0.95rem",
                                    lineHeight: 1.5,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}>
                                    <span style={{
                                        width: "6px", height: "6px",
                                        borderRadius: "50%",
                                        background: "#4DD8E8",
                                        display: "inline-block",
                                        flexShrink: 0,
                                    }} />
                                    {driver.advantage}
                                </div>
                                <div style={{
                                    fontFamily: "var(--font-sans)",
                                    color: "#94A3B8",
                                    padding: "20px 28px",
                                    fontSize: "0.95rem",
                                    fontWeight: 400,
                                    lineHeight: 1.6,
                                    display: "flex",
                                    alignItems: "center",
                                }}>
                                    {driver.impact}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                §4  PARTNER ECOSYSTEM  —  light
            ══════════════════════════════════════════ */}
            <section
                className="section-light"
                style={{
                    background: "#F8FAFC",
                    borderTop: "1px solid #E2E8F0",
                    padding: "108px 0",
                }}
            >
                <div className="container">
                    <span style={pillLight("#E8521A","rgba(232,82,26,0.08)","rgba(232,82,26,0.2)")}>
                        // Partner Ecosystem
                    </span>

                    <h2 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.75rem,2.5vw,2.25rem)",
                        fontWeight: 700,
                        color: "#0B1320",
                        letterSpacing: "-0.01em",
                        marginBottom: "12px",
                        lineHeight: 1.2,
                    }}>
                        Technology &amp; Domain Partners
                    </h2>

                    <p style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "1.05rem",
                        color: "#475569",
                        maxWidth: "620px",
                        marginBottom: "44px",
                        lineHeight: 1.7,
                    }}>
                        SAMSAN collaborates with specialised technology and domain partners to deliver
                        end-to-end automotive software and hardware engineering solutions.
                    </p>

                    <style>{`
                        .partners-grid {
                            display: grid;
                            grid-template-columns: repeat(3, 1fr);
                            gap: 24px;
                        }
                        @media (max-width:900px) { .partners-grid { grid-template-columns: repeat(2,1fr); } }
                        @media (max-width:580px) { .partners-grid { grid-template-columns: 1fr; } }
                        .partner-card {
                            background: #FFFFFF;
                            border: 1px solid #E2E8F0;
                            border-radius: 16px;
                            padding: 32px 28px;
                            opacity: 0;
                            transform: translateY(20px);
                            transition: opacity 0.5s ease, transform 0.5s ease,
                                        border-color 0.22s ease, box-shadow 0.22s ease;
                        }
                        .partner-card:hover {
                            border-color: rgba(232,82,26,0.35);
                            transform: translateY(-4px) !important;
                            box-shadow: 0 14px 32px rgba(11,19,32,0.09);
                        }
                    `}</style>

                    <div className="partners-grid">
                        {partners.map((p, i) => (
                            <div
                                key={p.name}
                                className="partner-card"
                                ref={(el) => { partnerRefs.current[i] = el; }}
                            >
                                {/* Top row */}
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: "20px",
                                }}>
                                    {/* Avatar */}
                                    <div style={{
                                        width: "44px", height: "44px",
                                        borderRadius: "10px",
                                        background: "rgba(0,95,138,0.08)",
                                        border: "1px solid rgba(0,95,138,0.2)",
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "1rem",
                                        fontWeight: 700,
                                        color: "#005F8A",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}>
                                        {p.initial}
                                    </div>

                                    {/* Domain pill */}
                                    <div style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "10px",
                                        fontWeight: 700,
                                        letterSpacing: "0.08em",
                                        textTransform: "uppercase",
                                        color: "#E8521A",
                                        background: "rgba(232,82,26,0.08)",
                                        border: "1px solid rgba(232,82,26,0.18)",
                                        padding: "4px 10px",
                                        borderRadius: "20px",
                                    }}>
                                        {p.domain}
                                    </div>
                                </div>

                                <h3 style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: "1.18rem",
                                    fontWeight: 700,
                                    color: "#0B1320",
                                    margin: "0 0 10px 0",
                                    letterSpacing: "-0.01em",
                                }}>
                                    {p.name}
                                </h3>

                                <p style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: "0.92rem",
                                    color: "#475569",
                                    lineHeight: 1.65,
                                    margin: 0,
                                }}>
                                    {p.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                §5  CTA  —  dark
            ══════════════════════════════════════════ */}
            <section
                className="section-dark"
                style={{
                    background: "var(--midnight)",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    padding: "108px 0",
                }}
                aria-labelledby="investors-cta-heading"
            >
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: shouldReduce ? 0.01 : 0.5 }}
                        style={{
                            background: "#111622",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "20px",
                            padding: "64px 48px",
                            textAlign: "center",
                            boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        {/* Top accent */}
                        <div style={{
                            position: "absolute",
                            top: 0, left: "50%",
                            transform: "translateX(-50%)",
                            width: "140px", height: "3px",
                            background: "linear-gradient(90deg,#4DD8E8,#E8521A)",
                            borderRadius: "0 0 4px 4px",
                        }} />

                        <span style={pillLight("#4DD8E8","rgba(77,216,232,0.08)","rgba(77,216,232,0.25)")}>
                            Strategic Partnership
                        </span>

                        <h2
                            id="investors-cta-heading"
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(1.8rem,3vw,2.4rem)",
                                fontWeight: 700,
                                color: "#FFFFFF",
                                letterSpacing: "-0.02em",
                                margin: "0 0 16px 0",
                                lineHeight: 1.2,
                            }}
                        >
                            Explore Strategic Opportunities
                        </h2>

                        <p style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "1.05rem",
                            lineHeight: 1.7,
                            color: "#94A3B8",
                            maxWidth: "560px",
                            margin: "0 auto 36px",
                        }}>
                            Connect with our corporate leadership team to discuss CoE setups, joint
                            ventures, investments, or strategic alliances.
                        </p>

                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "16px",
                            flexWrap: "wrap",
                        }}>
                            <a
                                href="mailto:india@samsanlabs.com"
                                className="btn btn-primary"
                                style={{
                                    background: "#E8521A",
                                    color: "#FFFFFF",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    textDecoration: "none",
                                    boxShadow: "0 4px 16px rgba(232,82,26,0.32)",
                                    padding: "13px 28px",
                                    fontWeight: 600,
                                    fontFamily: "var(--font-body)",
                                }}
                            >
                                Request Investor Materials
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>

                            <Link
                                href="/services"
                                className="btn btn-outline"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    textDecoration: "none",
                                    color: "#CBD5E1",
                                    borderColor: "rgba(255,255,255,0.2)",
                                    padding: "13px 28px",
                                    fontWeight: 600,
                                    fontFamily: "var(--font-body)",
                                }}
                            >
                                View Engineering Offerings
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
