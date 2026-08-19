"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

const metrics = [
    { label: "Revenue Growth YoY", value: "+42%" },
    { label: "Active OEM Engagements", value: "8" },
    { label: "IP/Accelerator Patents", value: "3 Pending" },
    { label: "Headcount Growth", value: "+30%" }
];

const documents = [
    { title: "SAMSAN Engineering Capabilities Deck", size: "4.5 MB", type: "PDF" },
    { title: "SAMSAN Investor / Strategic Partner Brief", size: "3.8 MB", type: "PDF" },
    { title: "SAMSAN Products & Accelerators One-Pager", size: "2.4 MB", type: "PDF" },
    { title: "SAMSAN Case Studies Snapshot", size: "1.8 MB", type: "PDF" },
    { title: "ISO / Quality / Compliance Credentials", size: "1.5 MB", type: "PDF" }
];

const partners = [
    {
        initial: "E",
        domain: "AI & Perception",
        name: "EdgeTensor",
        description: "AI-enabled perception stack and solutions for automotive — delivering intelligent sensing and real-time inference at the edge."
    },
    {
        initial: "D",
        domain: "Connectivity",
        name: "Deventure",
        description: "Connectivity experts for automotive — specializing in vehicle communication protocols, telematics, and connected mobility solutions."
    },
    {
        initial: "C",
        domain: "Web & Mobile",
        name: "Coreco",
        description: "Web and mobile app development experts — building scalable, modern applications for enterprise and consumer platforms."
    },
    {
        initial: "P",
        domain: "Green Mobility",
        name: "Prasah Pvt Ltd",
        description: "Hydrogen fuel cell based mobility experts — pioneering clean energy propulsion systems for the next generation of vehicles."
    },
    {
        initial: "P",
        domain: "ADAS",
        name: "PEM Technologies Pvt Ltd",
        description: "ADAS consultants — providing deep expertise in advanced driver assistance systems, sensor fusion, and autonomous driving validation."
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
                        }, i * 100);
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
            <section className="section-dark page-hero" aria-labelledby="investors-heading" style={{ background: "#0A0D11", padding: "80px 0 60px" }}>
                <div className="container">
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={fadeUpVariants(shouldReduce)}>
                            <span className="badge" style={{ marginBottom: "24px", color: "#4DD8E8", background: "rgba(77, 216, 232, 0.08)", border: "1px solid rgba(77, 216, 232, 0.2)" }}>
                                Corporate Growth
                            </span>
                        </motion.div>
                        <motion.h1 id="investors-heading" variants={fadeUpVariants(shouldReduce)} style={{ marginBottom: "20px", color: "#FFFFFF" }}>
                            Investors & Strategic Partners
                        </motion.h1>
                        <motion.p className="lead" variants={fadeUpVariants(shouldReduce)} style={{ maxWidth: "580px", color: "#94A3B8" }}>
                            Explore SAMSAN corporate metrics, partnership ecosystems, and download official capabilities briefings.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── Strategic Buyer & Metrics Section (section-light) ── */}
            <section className="section-light section compact" style={{ background: "#F8FAFC", borderTop: "1px solid #E2E8F0", padding: "80px 0" }}>
                <div className="container">
                    
                    {/* Metrics Section */}
                    <div style={{ marginBottom: "64px" }}>
                        <span className="badge" style={{ marginBottom: "16px", color: "#E8521A", background: "rgba(232, 82, 26, 0.08)", border: "1px solid rgba(232, 82, 26, 0.2)" }}>
                            Financial Highlights
                        </span>
                        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "32px", color: "#0B1320" }}>Performance at a Glance</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
                            {metrics.map((m) => (
                                <div
                                    key={m.label}
                                    style={{
                                        background: "#FFFFFF",
                                        border: "1px solid #E2E8F0",
                                        borderRadius: "var(--radius)",
                                        padding: "32px 24px",
                                        textAlign: "center",
                                        boxShadow: "0 2px 12px rgba(11,19,32,0.06)"
                                    }}
                                >
                                    <div style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "2.5rem",
                                        fontWeight: 700,
                                        color: "#E8521A",
                                        lineHeight: 1,
                                        marginBottom: "8px"
                                    }}>
                                        {m.value}
                                    </div>
                                    <div style={{ fontSize: "0.85rem", color: "#64748B" }}>
                                        {m.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Why Strategic Buyers Choose SAMSAN Section */}
                    <div>
                        <span className="badge" style={{ marginBottom: "16px", color: "#E8521A", background: "rgba(232, 82, 26, 0.08)", border: "1px solid rgba(232, 82, 26, 0.2)" }}>
                            Strategic Alignment
                        </span>
                        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "16px", color: "#0B1320" }}>
                            Why Strategic Buyers Choose SAMSAN
                        </h2>
                        <p style={{ color: "#64748B", maxWidth: "600px", marginBottom: "32px", lineHeight: "1.6" }}>
                            Key value drivers and advantages delivered to OEMs, Tier-1 suppliers, and technology investors.
                        </p>
                        
                        <style>{`
                            .investor-row {
                                display: grid;
                                grid-template-columns: 1fr 1fr;
                                border-bottom: 1px solid #E2E8F0;
                                transition: background 0.2s ease;
                            }
                            .investor-row:not(.investor-header):hover {
                                background: rgba(232, 82, 26, 0.04) !important;
                            }
                            @media (max-width: 640px) {
                                .investor-row { grid-template-columns: 1fr; }
                            }
                        `}</style>

                        <div style={{ border: "1px solid #E2E8F0", borderRadius: "12px", overflow: "hidden", background: "#FFFFFF" }}>
                            {/* Header Row */}
                            <div className="investor-row investor-header" style={{ background: "#F1F5F9", borderBottom: "1px solid #E2E8F0" }}>
                                <div style={{ color: "#64748B", fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em", borderRight: "1px solid #E2E8F0", padding: "18px 24px" }}>
                                    Strategic Buyer Gets
                                </div>
                                <div style={{ color: "#64748B", fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em", padding: "18px 28px" }}>
                                    Why It Matters
                                </div>
                            </div>

                            {/* Row 1 */}
                            <div className="investor-row">
                                <div style={{ color: "#E8521A", borderRight: "1px solid #E2E8F0", padding: "18px 24px", fontWeight: 600, fontSize: "0.92rem" }}>
                                    Automotive software engineering team
                                </div>
                                <div style={{ color: "#2D3A4A", padding: "18px 28px", fontSize: "0.92rem" }}>
                                    Faster scale-up in cockpit, SDV, and connected mobility
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="investor-row">
                                <div style={{ color: "#E8521A", borderRight: "1px solid #E2E8F0", padding: "18px 24px", fontWeight: 600, fontSize: "0.92rem" }}>
                                    Customer access and delivery references
                                </div>
                                <div style={{ color: "#2D3A4A", padding: "18px 28px", fontSize: "0.92rem" }}>
                                    Faster market entry and credibility
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="investor-row">
                                <div style={{ color: "#E8521A", borderRight: "1px solid #E2E8F0", padding: "18px 24px", fontWeight: 600, fontSize: "0.92rem" }}>
                                    Engineering accelerators
                                </div>
                                <div style={{ color: "#2D3A4A", padding: "18px 28px", fontSize: "0.92rem" }}>
                                    Higher productivity and differentiated delivery
                                </div>
                            </div>

                            {/* Row 4 */}
                            <div className="investor-row">
                                <div style={{ color: "#E8521A", borderRight: "1px solid #E2E8F0", padding: "18px 24px", fontWeight: 600, fontSize: "0.92rem" }}>
                                    India-based cost structure
                                </div>
                                <div style={{ color: "#2D3A4A", padding: "18px 28px", fontSize: "0.92rem" }}>
                                    Margin advantage and scalable delivery
                                </div>
                            </div>

                            {/* Row 5 */}
                            <div className="investor-row" style={{ borderBottom: "none" }}>
                                <div style={{ color: "#E8521A", borderRight: "1px solid #E2E8F0", padding: "18px 24px", fontWeight: 600, fontSize: "0.92rem" }}>
                                    Founder-led domain expertise
                                </div>
                                <div style={{ color: "#2D3A4A", padding: "18px 28px", fontSize: "0.92rem" }}>
                                    Continuity and business development support
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ── Downloads / Corporate Briefings (section-dark) ── */}
            <section className="section-dark section" style={{ background: "#0A0D11", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "80px 0" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "48px", alignItems: "start" }}>
                        <div>
                            <span className="badge" style={{ marginBottom: "16px", color: "#4DD8E8", background: "rgba(77, 216, 232, 0.08)", border: "1px solid rgba(77, 216, 232, 0.2)" }}>
                                Downloads
                            </span>
                            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "12px", color: "#F1F5F9" }}>Corporate Briefings</h2>
                            <p style={{ color: "#94A3B8", marginBottom: "24px", fontSize: "0.95rem" }}>
                                Access verified corporate decks, product one-pagers, and compliance documentations.
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                {documents.map((doc) => (
                                    <div
                                        key={doc.title}
                                        style={{
                                            background: "#161B22",
                                            border: "1px solid rgba(255,255,255,0.07)",
                                            borderRadius: "var(--radius-sm)",
                                            padding: "20px 24px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                                            <div style={{
                                                width: "40px", height: "40px",
                                                background: "rgba(77, 216, 232, 0.1)",
                                                border: "1px solid rgba(77, 216, 232, 0.2)",
                                                color: "#4DD8E8",
                                                borderRadius: "6px",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontWeight: 700, fontSize: "0.75rem", fontFamily: "var(--font-mono)"
                                            }}>
                                                {doc.type}
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: "0.95rem", color: "#F1F5F9", fontWeight: 600 }}>{doc.title}</h3>
                                                <span style={{ fontSize: "0.78rem", color: "#94A3B8", fontFamily: "var(--font-mono)" }}>Size: {doc.size}</span>
                                            </div>
                                        </div>
                                        {doc.title === "SAMSAN Case Studies Snapshot" ? (
                                            <Link
                                                href="/case-studies"
                                                className="btn btn-outline"
                                                style={{ padding: "8px 16px", fontSize: "0.75rem", textDecoration: "none", color: "#4DD8E8", borderColor: "rgba(77, 216, 232, 0.3)", background: "transparent" }}
                                            >
                                                View
                                            </Link>
                                        ) : (
                                            <button
                                                className="btn btn-primary"
                                                style={{ padding: "8px 16px", fontSize: "0.75rem", background: "#E8521A", color: "#FFFFFF" }}
                                                onClick={() => alert("Simulating file download...")}
                                            >
                                                Download
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Partner Contact Card */}
                        <div style={{
                            background: "#161B22",
                            border: "1px solid rgba(255,255,255,0.07)",
                            borderRadius: "var(--radius-lg)",
                            padding: "40px",
                        }}>
                            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px", color: "#F1F5F9" }}>Partnership Inquiries</h2>
                            <p style={{ fontSize: "0.88rem", color: "#94A3B8", lineHeight: "1.6", marginBottom: "24px" }}>
                                Reach out directly to our corporate relations team to request official investor materials, discuss joint venture frameworks, or managed strategic CoE setups.
                            </p>
                            <a
                                href="mailto:corporate@samsanlabs.com"
                                className="btn btn-primary"
                                style={{ width: "100%", justifyContent: "center", background: "#E8521A", color: "#FFFFFF" }}
                            >
                                Request Investor Materials
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Our Partners Section (section-light) ── */}
            <section className="section-light section" style={{ background: "#F8FAFC", borderTop: "1px solid #E2E8F0", padding: "80px 0" }}>
                <div className="container">
                    <div>
                        <span
                            style={{
                                display: "inline-block",
                                fontFamily: "var(--font-mono)",
                                fontSize: "11px",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "#E8521A",
                                marginBottom: "16px"
                            }}
                        >
                            // Our Partners
                        </span>
                        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "12px", color: "#0B1320" }}>
                            Technology &amp; Domain Partners
                        </h2>
                        <p style={{ fontSize: "0.95rem", color: "#64748B", lineHeight: "1.7", maxWidth: "600px", marginBottom: "40px" }}>
                            SAMSAN collaborates with specialized technology and domain partners to deliver end-to-end automotive engineering solutions.
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
                                border-radius: var(--radius);
                                padding: 28px 24px;
                                box-shadow: 0 2px 12px rgba(11,19,32,0.06);
                                opacity: 0;
                                transform: translateY(20px);
                                transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.2s ease, box-shadow 0.2s ease;
                            }
                            .partner-card:hover {
                                border-color: rgba(232,82,26,0.3);
                                transform: translateY(-3px);
                                box-shadow: 0 8px 24px rgba(11,19,32,0.1);
                            }
                        `}</style>

                        <div className="partners-grid">
                            {partners.map((p, i) => (
                                <div
                                    key={p.name}
                                    className="partner-card"
                                    ref={(el) => { partnerCardsRef.current[i] = el; }}
                                >
                                    {/* Top row */}
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0" }}>
                                        {/* Initial badge */}
                                        <div style={{
                                            width: "48px", height: "48px",
                                            borderRadius: "10px",
                                            background: "rgba(0, 95, 138, 0.08)",
                                            border: "1px solid rgba(0, 95, 138, 0.2)",
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "16px",
                                            fontWeight: 700,
                                            color: "#005F8A",
                                            textAlign: "center",
                                            lineHeight: "48px",
                                            flexShrink: 0
                                        }}>
                                            {p.initial}
                                        </div>
                                        {/* Domain tag */}
                                        <div style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "10px",
                                            letterSpacing: "0.08em",
                                            textTransform: "uppercase",
                                            color: "#E8521A",
                                            background: "rgba(232, 82, 26, 0.08)",
                                            padding: "4px 10px",
                                            borderRadius: "20px"
                                        }}>
                                            {p.domain}
                                        </div>
                                    </div>
                                    {/* Name */}
                                    <div style={{
                                        fontSize: "1.05rem",
                                        fontWeight: 700,
                                        color: "#0B1320",
                                        marginTop: "16px",
                                        marginBottom: "8px",
                                        fontFamily: "var(--font-display)"
                                    }}>
                                        {p.name}
                                    </div>
                                    {/* Description */}
                                    <p style={{
                                        fontSize: "0.9rem",
                                        color: "#64748B",
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

            {/* ── CTA Band (section-dark) ── */}
            <section className="section-dark cta-section" style={{ background: "#0A0D11", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "80px 0" }}>
                <div className="container">
                    <div className="cta-inner">
                        <h2 style={{ color: "#FFFFFF" }}>Explore Partnership Opportunities</h2>
                        <p style={{ color: "#94A3B8" }}>Connect with our corporate leadership team to discuss CoE setups, investments, or strategic alliances.</p>
                        <div className="cta-actions">
                            <a href="mailto:corporate@samsanlabs.com" className="btn btn-primary" style={{ background: "#E8521A", color: "#FFFFFF" }}>Request Investor Materials</a>
                            <Link href="/services" className="btn btn-outline" style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#FFFFFF", background: "transparent" }}>View Engineering Offerings</Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
