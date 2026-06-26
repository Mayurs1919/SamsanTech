"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";

const engagementModels = [
    {
        title: "Build-Operate-Transfer (BOT)",
        badge: "Scalable Team Acquisition",
        desc: "SAMSAN builds, nurtures, and operationalizes a specialized automotive engineering team tailored to your technology needs, with a structured pathway to transition ownership to your organization once stable.",
        accent: "var(--violet-mid)",
        accentBg: "rgba(124,58,237,0.12)",
        bullets: [
            "We recruit, onboard, and train engineers according to your project requirements.",
            "We manage day-to-day operations and ensure initial delivery milestones are met.",
            "Option to transition the fully operational team to your payroll after a predefined period (e.g. 12-18 months).",
            "Protects IP, reduces upfront capital risk, and guarantees a mature, high-performance team."
        ]
    },
    {
        title: "Centers of Excellence (CoE)",
        badge: "Domain-Specific Hubs",
        desc: "Establish dedicated research, development, and engineering hubs focused on core competency areas like HMI, ADAS/AD, Software Defined Vehicles (SDV), AUTOSAR, or cybersecurity.",
        accent: "var(--mint)",
        accentBg: "rgba(16,185,129,0.12)",
        bullets: [
            "Dedicated infrastructure, software toolchains, and hardware-in-the-loop (HIL) environments.",
            "Sustained engineering capacity focusing on long-term product roadmaps.",
            "Centralized knowledge base and shared best practices across projects.",
            "Flexible resource allocation to scale up or down based on program phases."
        ]
    },
    {
        title: "Managed Engineering Teams",
        badge: "End-to-End Delivery",
        desc: "Deploy cross-functional, self-managing SAMSAN engineering teams to take full ownership of specific program scopes, subsystems, or verification campaigns.",
        accent: "var(--rose)",
        accentBg: "rgba(236,72,153,0.12)",
        bullets: [
            "Direct program management, delivery ownership, and technical leadership by SAMSAN.",
            "Strict adherence to SLA and KPI metrics agreed upon with the client.",
            "High integration with client configuration management and CI/CD pipelines.",
            "Frees client management bandwidth to focus on core strategic roadmaps."
        ]
    }
];

const stats = [
    { value: "150+", label: "Engineers Deployed" },
    { value: "40+", label: "Active Programmes" },
    { value: "12+", label: "Countries Served" },
    { value: "98%", label: "Client Retention" }
];

export default function EngagementModelsPage() {
    const shouldReduce = useReducedMotion();

    return (
        <div style={{ backgroundColor: "var(--midnight)", color: "var(--text-primary)", minHeight: "100vh" }}>
            {/* ── Page Hero with Dark Banner ── */}
            <section 
                style={{ 
                    position: "relative",
                    backgroundImage: "linear-gradient(rgba(10, 15, 28, 0.8), rgba(10, 15, 28, 0.85)), url('/images/digital_cloud_connectivity.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "120px 0 100px 0",
                    color: "#ffffff"
                }}
                aria-labelledby="engagement-heading"
            >
                <div className="container">
                    <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible">
                        <motion.div variants={fadeUpVariants(shouldReduce)} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                            <Link href="/services" style={{ color: "var(--violet-mid)", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
                                Engineering Offerings
                            </Link>
                            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>/</span>
                            <span style={{ color: "#ffffff", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "100px", padding: "4px 12px", fontSize: "0.75rem", fontWeight: 600 }}>Engagement Models</span>
                        </motion.div>
                        <motion.h1 id="engagement-heading" variants={fadeUpVariants(shouldReduce)} style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "20px", color: "#ffffff", letterSpacing: "-0.02em" }}>
                            Engagement Models
                        </motion.h1>
                        <motion.p className="lead" variants={fadeUpVariants(shouldReduce)} style={{ maxWidth: "700px", color: "var(--text-secondary)" }}>
                            Flexible cooperation structures designed to align with your program timelines, resource requirements, and risk appetite. Build operational strength and maintain deep technological control.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── Impact Stats Bar ── */}
            <section style={{
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
                background: "rgba(10,15,28,0.4)",
                padding: "48px 0"
            }}>
                <div className="container">
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", textAlign: "center" }}
                    >
                        {stats.map((s, i) => (
                            <motion.div key={i} variants={fadeUpVariants(shouldReduce)}>
                                <div style={{
                                    fontSize: "2.8rem",
                                    fontWeight: 800,
                                    background: "linear-gradient(135deg, var(--violet-mid), var(--rose))",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    lineHeight: 1.1,
                                    marginBottom: "8px"
                                }}>{s.value}</div>
                                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", letterSpacing: "0.04em" }}>{s.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Models Section ── */}
            <section style={{ padding: "80px 0", backgroundColor: "var(--midnight)" }}>
                <div className="container" style={{ display: "flex", flexDirection: "column", gap: "96px" }}>
                    {engagementModels.map((model, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <motion.div
                                key={model.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                                    gap: "64px",
                                    alignItems: "center",
                                    padding: "48px",
                                    borderRadius: "24px",
                                    backgroundColor: isEven ? "rgba(13, 19, 35, 0.45)" : "rgba(22, 30, 53, 0.3)",
                                    border: "1px solid var(--border)",
                                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                                    backdropFilter: "blur(12px)",
                                    WebkitBackdropFilter: "blur(12px)"
                                }}
                            >
                                {/* Left/Right visual asset */}
                                <div style={{
                                    order: isEven ? 0 : 1,
                                    height: "360px",
                                    borderRadius: "16px",
                                    background: `linear-gradient(135deg, rgba(13,19,35,0.85) 0%, rgba(22,30,53,0.55) 100%)`,
                                    border: "1px solid rgba(255,255,255,0.06)",
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                                    position: "relative",
                                    overflow: "hidden",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "40px"
                                }}>
                                    {/* Decorative subtle lines */}
                                    <div style={{
                                        position: "absolute", inset: "24px",
                                        border: "1px dashed rgba(255,255,255,0.08)",
                                        borderRadius: "12px"
                                    }}/>
                                    
                                    {/* Central illustrative badge icon */}
                                    <div style={{
                                        width: "90px", height: "90px",
                                        borderRadius: "24px",
                                        background: model.accentBg,
                                        border: `1px solid ${model.accent}30`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: model.accent,
                                        boxShadow: `0 8px 30px ${model.accent}15`,
                                        zIndex: 2
                                    }}>
                                        {index === 0 && (
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5"/>
                                                <path d="M12 8v8M8 12h8" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                        {index === 1 && (
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                        {index === 2 && (
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                    </div>

                                    {/* Background decorative title */}
                                    <div style={{
                                        position: "absolute", bottom: "32px", left: 0, right: 0,
                                        textAlign: "center", zIndex: 1
                                    }}>
                                        <span style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "10px",
                                            letterSpacing: "0.2em",
                                            textTransform: "uppercase",
                                            color: "var(--text-muted)",
                                            display: "block"
                                        }}>SAMSAN Delivery framework</span>
                                    </div>
                                </div>

                                {/* Content Column */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <span style={{
                                            color: model.accent,
                                            fontWeight: 700,
                                            fontSize: "0.8rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                            background: model.accentBg,
                                            padding: "4px 12px",
                                            borderRadius: "100px",
                                            border: `1px solid ${model.accent}20`
                                        }}>
                                            {model.badge}
                                        </span>
                                    </div>
                                    <h3 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ffffff", lineHeight: "1.3" }}>
                                        {model.title}
                                    </h3>
                                    <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.7" }}>
                                        {model.desc}
                                    </p>

                                    <ul style={{ listStyle: "none", padding: 0, margin: "8px 0 16px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
                                        {model.bullets.map((bullet, idx) => (
                                            <li key={idx} style={{ fontSize: "0.9rem", color: "var(--text-primary)", position: "relative", paddingLeft: "24px", lineHeight: "1.55" }}>
                                                <span style={{
                                                    position: "absolute", left: 0, top: "7px",
                                                    width: "6px", height: "6px", borderRadius: "50%",
                                                    backgroundColor: model.accent
                                                }} />
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>

                                    <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }} style={{ width: "fit-content" }}>
                                        <Link href="/contact" className="btn btn-outline" style={{ borderColor: `${model.accent}50`, color: "#ffffff" }}>
                                            Inquire Model
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ── High-Conversion Outcome CTA ── */}
            <section style={{ backgroundColor: "rgba(10, 15, 28, 0.2)", padding: "80px 0", borderTop: "1px solid var(--border)" }}>
                <div className="container" style={{ textAlign: "center", maxWidth: "680px" }}>
                    <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#ffffff", marginBottom: "16px" }}>Ready to scope an engagement?</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.6", marginBottom: "32px" }}>
                        Partner with SAMSAN Technische Labs Pvt. Ltd. to build, scale, and manage your custom engineering programs.
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                        <Link href="/contact" className="btn btn-primary">
                            Request Program Consultation
                        </Link>
                        <Link href="/services" className="btn btn-outline">
                            View Engineering Offerings
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
