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
        <div style={{ paddingBottom: "80px" }}>
            <section className="page-hero" aria-labelledby="investors-heading">
                <div className="container">
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={fadeUpVariants(shouldReduce)}>
                            <span className="badge" style={{ marginBottom: "24px" }}>Corporate Growth</span>
                        </motion.div>
                        <motion.h1 id="investors-heading" variants={fadeUpVariants(shouldReduce)} style={{ marginBottom: "20px" }}>
                            Investors & Strategic Partners
                        </motion.h1>
                        <motion.p className="lead" variants={fadeUpVariants(shouldReduce)} style={{ maxWidth: "580px" }}>
                            Explore SAMSAN corporate metrics, partnership ecosystems, and download official capabilities briefings.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <section className="section compact">
                <div className="container">
                    
                    {/* Metrics Section */}
                    <div style={{ marginBottom: "64px" }}>
                        <span className="badge rose" style={{ marginBottom: "16px" }}>Financial Highlights</span>
                        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "32px", color: "#ffffff" }}>Performance at a Glance</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
                            {metrics.map((m) => (
                                <div
                                    key={m.label}
                                    style={{
                                        background: "rgba(13,19,35,0.4)",
                                        border: "1px solid rgba(255,255,255,0.05)",
                                        borderRadius: "var(--radius)",
                                        padding: "32px 24px",
                                        textAlign: "center"
                                    }}
                                >
                                    <div style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "2.5rem",
                                        fontWeight: 700,
                                        color: "var(--violet-mid)",
                                        lineHeight: 1,
                                        marginBottom: "8px"
                                    }}>
                                        {m.value}
                                    </div>
                                    <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                                        {m.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Why Strategic Buyers Choose SAMSAN Section */}
                    <div style={{ marginBottom: "80px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "64px" }}>
                        <span className="badge violet" style={{ marginBottom: "16px" }}>Strategic Alignment</span>
                        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "32px", color: "#ffffff" }}>
                            Why Strategic Buyers Choose SAMSAN
                        </h2>
                        
                        <div className="spec-table">
                            {/* Header Row */}
                            <div className="comparison-row comparison-header" style={{ borderBottom: "2px solid rgba(255, 255, 255, 0.12)" }}>
                                <div className="spec-key" style={{ background: "var(--navy-light)", color: "var(--text-primary)", fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em", borderRight: "1px solid rgba(255, 255, 255, 0.08)", padding: "18px 24px" }}>
                                    Strategic Buyer Gets
                                </div>
                                <div className="spec-val" style={{ background: "var(--navy-light)", color: "var(--text-primary)", fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em", padding: "18px 28px" }}>
                                    Why It Matters
                                </div>
                            </div>

                            {/* Row 1 */}
                            <div className="comparison-row">
                                <div className="spec-key">
                                    Automotive software engineering team
                                </div>
                                <div className="spec-val">
                                    Faster scale-up in cockpit, SDV, and connected mobility
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="comparison-row">
                                <div className="spec-key">
                                    Customer access and delivery references
                                </div>
                                <div className="spec-val">
                                    Faster market entry and credibility
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="comparison-row">
                                <div className="spec-key">
                                    Engineering accelerators
                                </div>
                                <div className="spec-val">
                                    Higher productivity and differentiated delivery
                                </div>
                            </div>

                            {/* Row 4 */}
                            <div className="comparison-row">
                                <div className="spec-key">
                                    India-based cost structure
                                </div>
                                <div className="spec-val">
                                    Margin advantage and scalable delivery
                                </div>
                            </div>

                            {/* Row 5 */}
                            <div className="comparison-row">
                                <div className="spec-key">
                                    Founder-led domain expertise
                                </div>
                                <div className="spec-val">
                                    Continuity and business development support
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resources Downloads */}
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "48px", alignItems: "start" }}>
                        <div>
                            <span className="badge mint" style={{ marginBottom: "16px" }}>Downloads</span>
                            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "24px", color: "#ffffff" }}>Corporate Briefings</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                {documents.map((doc) => (
                                    <div
                                        key={doc.title}
                                        style={{
                                            background: "rgba(13, 19, 35, 0.3)",
                                            border: "1px solid rgba(255,255,255,0.05)",
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
                                                background: "rgba(124, 58, 237, 0.1)",
                                                border: "1px solid rgba(124, 58, 237, 0.2)",
                                                color: "var(--violet-mid)",
                                                borderRadius: "6px",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontWeight: 700, fontSize: "0.75rem", fontFamily: "var(--font-mono)"
                                            }}>
                                                {doc.type}
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: "0.95rem", color: "#ffffff", fontWeight: 600 }}>{doc.title}</h3>
                                                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Size: {doc.size}</span>
                                            </div>
                                        </div>
                                        {doc.title === "SAMSAN Case Studies Snapshot" ? (
                                            <Link
                                                href="/case-studies"
                                                className="btn btn-outline"
                                                style={{ padding: "8px 16px", fontSize: "0.75rem", textDecoration: "none" }}
                                            >
                                                Download
                                            </Link>
                                        ) : (
                                            <button
                                                className="btn btn-outline"
                                                style={{ padding: "8px 16px", fontSize: "0.75rem" }}
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
                            background: "rgba(22, 30, 53, 0.45)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: "var(--radius-lg)",
                            padding: "40px",
                            backdropFilter: "blur(12px)"
                        }}>
                            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px", color: "#ffffff" }}>Partnership Inquiries</h2>
                            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "24px" }}>
                                Reach out directly to our corporate relations team to discuss joint venture frameworks, investment opportunities, or managed strategic CoE setups.
                            </p>
                            <a
                                href="mailto:corporate@samsanlabs.com"
                                className="btn btn-primary"
                                style={{ width: "100%", justifyContent: "center" }}
                            >
                                Request Strategic Partner Brief
                            </a>
                        </div>
                    </div>

                    {/* Our Partners Section */}
                    <div style={{ marginTop: "80px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "64px" }}>
                        <span
                            style={{
                                display: "inline-block",
                                fontFamily: "var(--font-mono)",
                                fontSize: "11px",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "var(--mint)",
                                marginBottom: "16px"
                            }}
                        >
                            // Our Partners
                        </span>
                        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "12px", color: "#ffffff" }}>
                            Technology &amp; Domain Partners
                        </h2>
                        <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.7", maxWidth: "600px", marginBottom: "40px" }}>
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
                                background: rgba(13, 19, 35, 0.4);
                                border: 1px solid rgba(255,255,255,0.07);
                                border-radius: var(--radius);
                                padding: 28px 24px;
                                opacity: 0;
                                transform: translateY(20px);
                                transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.2s ease, box-shadow 0.2s ease;
                            }
                            .partner-card:hover {
                                border-color: rgba(6,182,212,0.35);
                                transform: translateY(-3px);
                                box-shadow: 0 8px 24px rgba(0,0,0,0.2);
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
                                            background: "rgba(16,185,129,0.1)",
                                            border: "1px solid rgba(16,185,129,0.3)",
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "16px",
                                            fontWeight: 700,
                                            color: "var(--mint)",
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
                                            color: "#F59E0B",
                                            background: "rgba(245,158,11,0.12)",
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
                                        color: "var(--text-primary)",
                                        marginTop: "16px",
                                        marginBottom: "8px",
                                        fontFamily: "var(--font-display)"
                                    }}>
                                        {p.name}
                                    </div>
                                    {/* Description */}
                                    <p style={{
                                        fontSize: "0.9rem",
                                        color: "var(--text-secondary)",
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
        </div>
    );
}
