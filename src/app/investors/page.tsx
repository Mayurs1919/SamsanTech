<<<<<<< HEAD
import type { Metadata } from "next";
import InvestorsClient from "./InvestorsClient";

export const metadata: Metadata = {
    title: "Investors & Strategic Partners | SAMSAN",
    description:
        "Explore SAMSAN corporate metrics, strategic buyer alignment, and our partnership ecosystem spanning ADAS, connectivity, AI and green mobility.",
};

export default function InvestorsPage() {
    return <InvestorsClient />;
=======
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

const metrics = [
    { label: "Revenue Growth YoY", value: "+42%", note: "Consistent ARR Growth" },
    { label: "Active OEM Engagements", value: "8", note: "Global OEM & Tier-1 Programs" },
    { label: "IP & Accelerators", value: "3 Patents", note: "Pending Software IP" },
    { label: "Engineering Headcount", value: "+30%", note: "Scalable India Delivery" }
];

const documents = [
    { title: "SAMSAN Engineering Capabilities Deck", type: "PDF", filePath: "/documents/samsan-engineering-capabilities-deck.pdf" },
    { title: "SAMSAN Investor / Strategic Partner Brief", type: "PDF", filePath: "/documents/samsan-investor-partner-brief.pdf" },
    { title: "SAMSAN Products & Accelerators One-Pager", type: "PDF", filePath: "/documents/samsan-products-accelerators-one-pager.pdf" },
    { title: "SAMSAN Case Studies Snapshot", type: "PDF", filePath: "/documents/samsan-case-studies-snapshot.pdf" },
    { title: "ISO / Quality / Compliance Credentials", type: "PDF", filePath: "/documents/samsan-compliance-credentials.pdf" }
];

const partners = [
    {
        initial: "C",
        domain: "Web & Mobile",
        name: "Coreco",
        description: "Web and mobile app development experts — building scalable, modern applications for enterprise and consumer platforms."
    },
    {
        initial: "D",
        domain: "Connectivity",
        name: "Deventure",
        description: "Connectivity experts for automotive — specializing in vehicle communication protocols, telematics, and connected mobility solutions."
    },
    {
        initial: "E",
        domain: "AI & Perception",
        name: "EdgeTensor",
        description: "AI-enabled perception stack and solutions for automotive — delivering intelligent sensing and real-time inference at the edge."
    },
    {
        initial: "P",
        domain: "ADAS",
        name: "PEM Technologies Pvt Ltd",
        description: "ADAS consultants — providing deep expertise in advanced driver assistance systems, sensor fusion, and autonomous driving validation."
    },
    {
        initial: "P",
        domain: "Green Mobility",
        name: "Prasah Pvt Ltd",
        description: "Hydrogen fuel cell based mobility experts — pioneering clean energy propulsion systems for the next generation of vehicles."
    }
];

const valueDrivers = [
    {
        advantage: "Automotive software engineering team",
        impact: "Faster scale-up in cockpit, SDV, and connected mobility programs"
    },
    {
        advantage: "Customer access & delivery references",
        impact: "Accelerated market entry, proven execution, and OEM credibility"
    },
    {
        advantage: "Reusable engineering accelerators",
        impact: "Higher productivity, reduced time-to-market, and IP differentiation"
    },
    {
        advantage: "India-based cost-optimized delivery",
        impact: "High margin advantage and scalable global engineering operations"
    },
    {
        advantage: "Founder-led domain expertise",
        impact: "Strategic continuity, domain leadership, and active BD support"
    }
];

export default function InvestorsPage() {
    const shouldReduce = useReducedMotion();
    const partnerCardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (shouldReduce) {
            partnerCardsRef.current.forEach((el) => {
                if (el) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }
            });
            return;
        }
        const observers: IntersectionObserver[] = [];
        partnerCardsRef.current.forEach((el, i) => {
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            if (el) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }
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
        <div style={{ paddingBottom: "0" }}>

            {/* ── Page Hero (section-dark) ── */}
            <section
                className="section-dark page-hero"
                aria-labelledby="investors-heading"
                style={{
                    background: "linear-gradient(180deg, #06080C 0%, var(--midnight) 100%)",
                    padding: "140px 0 96px",
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                {/* Background glow orbs */}
                <div style={{
                    position: "absolute",
                    top: "-20%", right: "10%",
                    width: "500px", height: "500px",
                    background: "radial-gradient(circle, rgba(77, 216, 232, 0.07) 0%, transparent 70%)",
                    pointerEvents: "none"
                }} />
                <div style={{
                    position: "absolute",
                    bottom: "-10%", left: "5%",
                    width: "400px", height: "400px",
                    background: "radial-gradient(circle, rgba(232, 82, 26, 0.06) 0%, transparent 70%)",
                    pointerEvents: "none"
                }} />

                <div className="container" style={{ position: "relative", zIndex: 1 }}>
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >

                        <motion.div variants={fadeUpVariants(shouldReduce)}>
                            <span
                                style={{
                                    display: "inline-block",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: "#4DD8E8",
                                    background: "rgba(77, 216, 232, 0.08)",
                                    border: "1px solid rgba(77, 216, 232, 0.25)",
                                    borderRadius: "20px",
                                    padding: "5px 14px",
                                    marginBottom: "20px"
                                }}
                            >
                                Corporate Growth &amp; Ecosystem
                            </span>
                        </motion.div>

                        <motion.h1
                            id="investors-heading"
                            variants={fadeUpVariants(shouldReduce)}
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
                                fontWeight: 700,
                                color: "#FFFFFF",
                                letterSpacing: "-0.02em",
                                lineHeight: 1.15,
                                marginBottom: "20px"
                            }}
                        >
                            Investors &amp; Strategic Partners
                        </motion.h1>

                        <motion.p
                            className="lead"
                            variants={fadeUpVariants(shouldReduce)}
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)",
                                lineHeight: 1.7,
                                color: "#94A3B8",
                                maxWidth: "620px",
                                margin: 0
                            }}
                        >
                            Explore SAMSAN corporate metrics, strategic buyer alignment, partnership ecosystems, and download official capabilities briefings.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── Financial Highlights & Strategic Alignment (section-light) ── */}
            <section
                className="section-light"
                style={{
                    background: "#F8FAFC",
                    borderTop: "1px solid #E2E8F0",
                    padding: "108px 0"
                }}
            >
                <div className="container">

                    {/* Metrics Strip */}
                    <div style={{ marginBottom: "72px" }}>
                        <span
                            style={{
                                display: "inline-block",
                                fontFamily: "var(--font-mono)",
                                fontSize: "11px",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "#E8521A",
                                background: "rgba(232, 82, 26, 0.08)",
                                border: "1px solid rgba(232, 82, 26, 0.2)",
                                borderRadius: "20px",
                                padding: "5px 14px",
                                marginBottom: "16px"
                            }}
                        >
                            // Financial Highlights
                        </span>

                        <h2
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
                                fontWeight: 700,
                                color: "#0B1320",
                                letterSpacing: "-0.01em",
                                marginBottom: "32px",
                                lineHeight: 1.2
                            }}
                        >
                            Performance at a Glance
                        </h2>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
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
                                        textAlign: "left",
                                        boxShadow: "0 2px 12px rgba(11, 19, 32, 0.05)",
                                        position: "relative",
                                        overflow: "hidden"
                                    }}
                                >
                                    {/* Top orange line indicator */}
                                    <div style={{
                                        position: "absolute",
                                        top: 0, left: 0, right: 0,
                                        height: "3px",
                                        background: "linear-gradient(90deg, #E8521A, #F59E0B)"
                                    }} />

                                    <div style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "2.6rem",
                                        fontWeight: 700,
                                        color: "#E8521A",
                                        lineHeight: 1,
                                        letterSpacing: "-0.02em",
                                        marginBottom: "10px"
                                    }}>
                                        {m.value}
                                    </div>

                                    <div style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "1.05rem",
                                        fontWeight: 700,
                                        color: "#0B1320",
                                        marginBottom: "6px"
                                    }}>
                                        {m.label}
                                    </div>

                                    <div style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.78rem",
                                        color: "#64748B",
                                        letterSpacing: "0.02em"
                                    }}>
                                        {m.note}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Why Strategic Buyers Choose SAMSAN Section */}
                    <div>
                        <span
                            style={{
                                display: "inline-block",
                                fontFamily: "var(--font-mono)",
                                fontSize: "11px",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "#E8521A",
                                background: "rgba(232, 82, 26, 0.08)",
                                border: "1px solid rgba(232, 82, 26, 0.2)",
                                borderRadius: "20px",
                                padding: "5px 14px",
                                marginBottom: "16px"
                            }}
                        >
                            // Strategic Alignment
                        </span>

                        <h2
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
                                fontWeight: 700,
                                color: "#0B1320",
                                letterSpacing: "-0.01em",
                                marginBottom: "12px",
                                lineHeight: 1.2
                            }}
                        >
                            Why Strategic Buyers Choose SAMSAN
                        </h2>

                        <p
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "1.05rem",
                                color: "#475569",
                                maxWidth: "620px",
                                marginBottom: "36px",
                                lineHeight: 1.7
                            }}
                        >
                            Key value drivers and advantages delivered to OEMs, Tier-1 automotive suppliers, and technology investors.
                        </p>

                        <style>{`
                            .investor-row {
                                display: grid;
                                grid-template-columns: 1fr 1.2fr;
                                border-bottom: 1px solid #E2E8F0;
                                transition: background 0.2s ease, border-left-color 0.2s ease;
                                border-left: 3px solid transparent;
                            }
                            .investor-row:not(.investor-header):hover {
                                background: rgba(232, 82, 26, 0.03) !important;
                                border-left-color: #E8521A;
                            }
                            @media (max-width: 640px) {
                                .investor-row { grid-template-columns: 1fr; }
                            }
                        `}</style>

                        <div
                            style={{
                                border: "1px solid #E2E8F0",
                                borderRadius: "16px",
                                overflow: "hidden",
                                background: "#FFFFFF",
                                boxShadow: "0 4px 20px rgba(11, 19, 32, 0.05)"
                            }}
                        >
                            {/* Header Row */}
                            <div className="investor-row investor-header" style={{ background: "#F1F5F9", borderBottom: "2px solid #E2E8F0" }}>
                                <div style={{
                                    fontFamily: "var(--font-sans)",
                                    color: "#0B1320",
                                    fontWeight: 700,
                                    fontSize: "0.85rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                    borderRight: "1px solid #E2E8F0",
                                    padding: "18px 28px"
                                }}>
                                    Strategic Buyer Gets
                                </div>
                                <div style={{
                                    fontFamily: "var(--font-sans)",
                                    color: "#0B1320",
                                    fontWeight: 700,
                                    fontSize: "0.85rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                    padding: "18px 28px"
                                }}>
                                    Why It Matters
                                </div>
                            </div>

                            {/* Data Rows */}
                            {valueDrivers.map((driver, index) => (
                                <div
                                    key={driver.advantage}
                                    className="investor-row"
                                    style={{ borderBottom: index === valueDrivers.length - 1 ? "none" : "1px solid #E2E8F0" }}
                                >
                                    <div style={{
                                        fontFamily: "var(--font-sans)",
                                        color: "#0B1320",
                                        borderRight: "1px solid #E2E8F0",
                                        padding: "20px 28px",
                                        fontWeight: 700,
                                        fontSize: "0.95rem",
                                        lineHeight: 1.5,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px"
                                    }}>
                                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#E8521A", display: "inline-block", flexShrink: 0 }} />
                                        {driver.advantage}
                                    </div>
                                    <div style={{
                                        fontFamily: "var(--font-sans)",
                                        color: "#334155",
                                        padding: "20px 28px",
                                        fontSize: "0.95rem",
                                        fontWeight: 400,
                                        lineHeight: 1.6,
                                        display: "flex",
                                        alignItems: "center"
                                    }}>
                                        {driver.impact}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* ── Downloads & Corporate Briefings (section-dark) ── */}
            <section
                className="section-dark"
                style={{
                    background: "var(--midnight)",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    padding: "108px 0"
                }}
            >
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "48px", alignItems: "start" }}>

                        {/* Left Column: Download list */}
                        <div>
                            <span
                                style={{
                                    display: "inline-block",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: "#4DD8E8",
                                    background: "rgba(77, 216, 232, 0.08)",
                                    border: "1px solid rgba(77, 216, 232, 0.2)",
                                    borderRadius: "20px",
                                    padding: "5px 14px",
                                    marginBottom: "16px"
                                }}
                            >
                                // Official Briefings
                            </span>

                            <h2
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: "clamp(1.75rem, 2.5vw, 2.2rem)",
                                    fontWeight: 700,
                                    marginBottom: "12px",
                                    color: "#F8FAFC",
                                    lineHeight: 1.2
                                }}
                            >
                                Verified Corporate Decks &amp; Snapshots
                            </h2>

                            <p
                                style={{
                                    fontFamily: "var(--font-body)",
                                    color: "#94A3B8",
                                    marginBottom: "28px",
                                    fontSize: "1rem",
                                    lineHeight: 1.65
                                }}
                            >
                                Access verified corporate decks, product one-pagers, case study snapshots, and compliance credentials.
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                                {documents.map((doc) => (
                                    <div
                                        key={doc.title}
                                        style={{
                                            background: "#111622",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            borderRadius: "12px",
                                            padding: "18px 24px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            transition: "border-color 0.2s ease, background 0.2s ease"
                                        }}
                                    >
                                        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                                            <div style={{
                                                width: "44px", height: "44px",
                                                background: "rgba(77, 216, 232, 0.1)",
                                                border: "1px solid rgba(77, 216, 232, 0.25)",
                                                color: "#4DD8E8",
                                                borderRadius: "8px",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontWeight: 700, fontSize: "0.78rem", fontFamily: "var(--font-mono)",
                                                flexShrink: 0
                                            }}>
                                                {doc.type}
                                            </div>
                                            <div>
                                                <h3 style={{
                                                    fontFamily: "var(--font-display)",
                                                    fontSize: "1rem",
                                                    color: "#F8FAFC",
                                                    fontWeight: 700,
                                                    margin: 0
                                                }}>
                                                    {doc.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <a
                                            href={doc.filePath}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary"
                                            style={{
                                                padding: "8px 18px",
                                                fontSize: "0.82rem",
                                                background: "#E8521A",
                                                color: "#FFFFFF",
                                                fontWeight: 600,
                                                fontFamily: "var(--font-body)",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "6px",
                                                textDecoration: "none",
                                                borderRadius: "8px",
                                                flexShrink: 0,
                                                boxShadow: "0 2px 10px rgba(232, 82, 26, 0.2)"
                                            }}
                                        >
                                            Download
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                                <path d="M7 2v7.5M3.5 6.5L7 10l3.5-3.5M2 12h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Direct Partner Contact Card */}
                        <div
                            style={{
                                background: "#111622",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: "20px",
                                padding: "40px",
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            <div style={{
                                position: "absolute",
                                top: 0, left: 0, right: 0, height: "3px",
                                background: "linear-gradient(90deg, #4DD8E8, #E8521A)"
                            }} />

                            <span
                                style={{
                                    display: "inline-block",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: "#E8521A",
                                    background: "rgba(232, 82, 26, 0.1)",
                                    border: "1px solid rgba(232, 82, 26, 0.25)",
                                    borderRadius: "16px",
                                    padding: "4px 12px",
                                    marginBottom: "20px"
                                }}
                            >
                                Executive Direct Line
                            </span>

                            <h2
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: "1.6rem",
                                    fontWeight: 700,
                                    marginBottom: "16px",
                                    color: "#F8FAFC",
                                    lineHeight: 1.25
                                }}
                            >
                                Partnership Inquiries
                            </h2>

                            <p
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: "0.95rem",
                                    color: "#94A3B8",
                                    lineHeight: "1.7",
                                    marginBottom: "28px"
                                }}
                            >
                                Reach out directly to our corporate relations team to request official investor decks, discuss joint venture frameworks, or manage strategic CoE setups.
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#CBD5E1", fontSize: "0.9rem", fontFamily: "var(--font-mono)" }}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                        <path d="M2.5 4h11a1 1 0 011 1v7a1 1 0 01-1 1h-11a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="#4DD8E8" strokeWidth="1.5" />
                                        <path d="M14 5l-6 4.5L2 5" stroke="#4DD8E8" strokeWidth="1.5" />
                                    </svg>
                                    india@samsanlabs.com
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#CBD5E1", fontSize: "0.9rem", fontFamily: "var(--font-mono)" }}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                        <path d="M12.5 10.5v2a1 1 0 01-1.1.99A12.8 12.8 0 012.5 4.6a1 1 0 011-.99h2a1 1 0 011 .86c.07.5.18 1 .35 1.48a1 1 0 01-.25 1.05L5.6 7.9a10.3 10.3 0 004.5 4.5l.9-.99a1 1 0 011.05-.25c.48.17.98.28 1.48.35a1 1 0 01.87 1z" stroke="#4DD8E8" strokeWidth="1.5" />
                                    </svg>
                                    +91 89569 27909
                                </div>
                            </div>

                            <a
                                href="mailto:india@samsanlabs.com"
                                className="btn btn-primary"
                                style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    background: "#E8521A",
                                    color: "#FFFFFF",
                                    padding: "13px 24px",
                                    fontWeight: 600,
                                    fontSize: "0.95rem",
                                    fontFamily: "var(--font-body)",
                                    boxShadow: "0 4px 16px rgba(232, 82, 26, 0.3)"
                                }}
                            >
                                Request Investor Materials
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Our Partners Section (section-light) ── */}
            <section
                className="section-light"
                style={{
                    background: "#F8FAFC",
                    borderTop: "1px solid #E2E8F0",
                    padding: "108px 0"
                }}
            >
                <div className="container">
                    <div>
                        <span
                            style={{
                                display: "inline-block",
                                fontFamily: "var(--font-mono)",
                                fontSize: "11px",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "#E8521A",
                                background: "rgba(232, 82, 26, 0.08)",
                                border: "1px solid rgba(232, 82, 26, 0.2)",
                                borderRadius: "20px",
                                padding: "5px 14px",
                                marginBottom: "16px"
                            }}
                        >
                            // Partner Ecosystem
                        </span>

                        <h2
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
                                fontWeight: 700,
                                marginBottom: "12px",
                                color: "#0B1320",
                                lineHeight: 1.2
                            }}
                        >
                            Technology &amp; Domain Partners
                        </h2>

                        <p
                            style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "1.05rem",
                                color: "#475569",
                                lineHeight: "1.7",
                                maxWidth: "620px",
                                marginBottom: "40px"
                            }}
                        >
                            SAMSAN collaborates with specialized technology and domain partners to deliver end-to-end automotive software and hardware engineering solutions.
                        </p>

                        <style>{`
                            .partners-grid {
                                display: grid;
                                grid-template-columns: repeat(3, 1fr);
                                gap: 24px;
                            }
                            @media (max-width: 900px) {
                                .partners-grid { grid-template-columns: repeat(2, 1fr); }
                            }
                            @media (max-width: 600px) {
                                .partners-grid { grid-template-columns: 1fr; }
                            }
                            .partner-card {
                                background: #FFFFFF;
                                border: 1px solid #E2E8F0;
                                border-radius: 16px;
                                padding: 32px 28px;
                                boxShadow: 0 2px 12px rgba(11, 19, 32, 0.05);
                                opacity: 0;
                                transform: translateY(20px);
                                transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.2s ease, box-shadow 0.2s ease;
                            }
                            .partner-card:hover {
                                border-color: rgba(232, 82, 26, 0.35);
                                transform: translateY(-4px);
                                box-shadow: 0 12px 28px rgba(11, 19, 32, 0.08);
                            }
                        `}</style>

                        <div className="partners-grid">
                            {partners.map((p, i) => (
                                <div
                                    key={p.name}
                                    className="partner-card"
                                    ref={(el) => { partnerCardsRef.current[i] = el; }}
                                >
                                    {/* Top row with initial avatar & domain pill */}
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                                        <div style={{
                                            width: "44px", height: "44px",
                                            borderRadius: "10px",
                                            background: "rgba(0, 95, 138, 0.08)",
                                            border: "1px solid rgba(0, 95, 138, 0.2)",
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "1rem",
                                            fontWeight: 700,
                                            color: "#005F8A",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0
                                        }}>
                                            {p.initial}
                                        </div>

                                        <div style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "10px",
                                            fontWeight: 700,
                                            letterSpacing: "0.08em",
                                            textTransform: "uppercase",
                                            color: "#E8521A",
                                            background: "rgba(232, 82, 26, 0.08)",
                                            border: "1px solid rgba(232, 82, 26, 0.18)",
                                            padding: "4px 10px",
                                            borderRadius: "20px"
                                        }}>
                                            {p.domain}
                                        </div>
                                    </div>

                                    {/* Name */}
                                    <h3 style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "1.2rem",
                                        fontWeight: 700,
                                        color: "#0B1320",
                                        margin: "0 0 10px 0",
                                        letterSpacing: "-0.01em"
                                    }}>
                                        {p.name}
                                    </h3>

                                    {/* Description */}
                                    <p style={{
                                        fontFamily: "var(--font-body)",
                                        fontSize: "0.92rem",
                                        color: "#475569",
                                        lineHeight: "1.65",
                                        margin: 0
                                    }}>
                                        {p.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Standardized Light Bottom CTA ── */}
            <section
                className="section-light"
                style={{ background: "#F8FAFC", borderTop: "1px solid #E2E8F0", padding: "108px 0" }}
                aria-labelledby="investors-cta-heading"
            >
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: shouldReduce ? 0.01 : 0.5 }}
                        style={{
                            background: "#FFFFFF",
                            border: "1px solid #E2E8F0",
                            borderRadius: "20px",
                            padding: "64px 48px",
                            textAlign: "center",
                            boxShadow: "0 4px 24px rgba(11, 19, 32, 0.05)",
                            position: "relative",
                            overflow: "hidden"
                        }}
                    >
                        {/* Top accent bar */}
                        <div style={{
                            position: "absolute",
                            top: 0, left: "50%",
                            transform: "translateX(-50%)",
                            width: "120px", height: "3px",
                            background: "linear-gradient(90deg, #E8521A, #F59E0B)",
                            borderRadius: "0 0 4px 4px"
                        }} />

                        <span style={{
                            display: "inline-block",
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#E8521A",
                            background: "rgba(232, 82, 26, 0.07)",
                            border: "1px solid rgba(232, 82, 26, 0.22)",
                            borderRadius: "20px",
                            padding: "5px 14px",
                            marginBottom: "24px"
                        }}>
                            Strategic Partnership
                        </span>

                        <h2
                            id="investors-cta-heading"
                            style={{
                                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                                fontWeight: 700,
                                color: "#0B1320",
                                fontFamily: "var(--font-display)",
                                letterSpacing: "-0.02em",
                                margin: "0 0 16px 0",
                                lineHeight: 1.2
                            }}
                        >
                            Explore Strategic Opportunities
                        </h2>

                        <p style={{
                            fontSize: "1.05rem",
                            lineHeight: 1.7,
                            color: "#475569",
                            fontFamily: "var(--font-body)",
                            maxWidth: "560px",
                            margin: "0 auto 36px"
                        }}>
                            Connect with our corporate leadership team to discuss CoE setups, joint ventures, investments, or strategic alliances.
                        </p>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
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
                                    boxShadow: "0 4px 14px rgba(232, 82, 26, 0.28)",
                                    padding: "13px 28px",
                                    fontWeight: 600,
                                    fontFamily: "var(--font-body)"
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
                                    color: "#0B1320",
                                    borderColor: "#CBD5E1",
                                    padding: "13px 28px",
                                    fontWeight: 600,
                                    fontFamily: "var(--font-body)"
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
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
}
