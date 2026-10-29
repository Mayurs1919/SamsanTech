"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";

// ── Consulting Pillars Data ───────────────────────────────────────
const consultingPillars = [
    {
        id: "digital-transformation",
        title: "Digital Transformation",
        subtitle: "Enterprise Modernization & Cloud Adoption",
        description:
            "We assist businesses and automotive enterprises in adopting next-generation digital technologies, AI/ML tools, cloud connectivity, and modern software paradigms to enhance operational efficiency and maintain competitive advantage.",
        points: [
            "Legacy engineering infrastructure & toolchain modernization",
            "Cloud-connected vehicle platforms & IoT strategy",
            "Industrial AI/ML workflow integration & automation",
            "Enterprise DevOps & CI/CD pipeline implementation",
        ],
        badge: "Strategy & Technology",
        accent: "#4DD8E8",
        accentBg: "rgba(77, 216, 232, 0.12)",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        ),
    },
    {
        id: "program-management",
        title: "Program Management",
        subtitle: "Strategic Execution & Agile Governance",
        description:
            "We provide end-to-end strategic oversight, agile program management, and cross-functional project coordination to guarantee on-time, budget-compliant execution for multi-site engineering initiatives.",
        points: [
            "Agile program execution & milestone governance",
            "Multi-site & cross-functional engineering coordination",
            "SLA, quality standards, & risk management frameworks",
            "Resource allocation & velocity optimization",
        ],
        badge: "Execution & Oversight",
        accent: "#3B82F6",
        accentBg: "rgba(59, 130, 246, 0.12)",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="12 8 8 12 12 16 16 12 12 8" />
            </svg>
        ),
    },
    {
        id: "coe-setup",
        title: "Technology Practice & CoE",
        subtitle: "Center of Excellence Establishment",
        description:
            "We help organizations establish, structure, and govern dedicated Centers of Excellence (CoE) and technology practices tailored to specific domains like SDV, AUTOSAR, ADAS/AD, Cyber Security, and Digital Cockpit.",
        points: [
            "Domain-specific CoE framework setup & governance",
            "Dedicated hardware-in-the-loop (HIL) & test lab creation",
            "Standardized knowledge bases & engineering best practices",
            "Scalable competency development & continuous training",
        ],
        badge: "Domain Hubs",
        accent: "#8B5CF6",
        accentBg: "rgba(139, 92, 246, 0.12)",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
            </svg>
        ),
    },
];

// ── Engagement / Staffing Models (4 Main Cards) ───────────────────
const staffingModels = [
    {
        id: "permanent-hire",
        title: "Permanent Hire",
        category: "Direct Placement",
        description:
            "Ideal for critical long-term leadership, core engineering, and specialized technical roles where long-term organizational retention is paramount.",
        bullets: [
            "Discuss & understand your position objectives, technical skill matrix, and culture requirements.",
            "Search, screen, shortlist, and recommend candidates from our vetted automotive & tech talent network.",
            "Complete end-to-end coordination with client from candidate shortlisting to offer negotiation and onboarding.",
        ],
        feeBadge: "One Time Fee",
        accent: "#F97316", // Vibrant Coral/Orange
        accentGlow: "rgba(249, 115, 22, 0.15)",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <polyline points="17 11 19 13 23 9" />
            </svg>
        ),
    },
    {
        id: "contract-staffing",
        title: "Contract Staffing",
        category: "Resource Augmentation",
        description:
            "Rapid access to domain-specialized engineers to seamlessly scale your project teams during peak development and execution phases.",
        bullets: [
            "Discuss & understand your project objectives, timeline demands, and technical resource requirements.",
            "Search, shortlist, screen, and recommend pre-vetted specialists from our active resource database.",
            "Full administrative support, compliance, payroll management, and coordination until successful onboarding.",
        ],
        feeBadge: "Monthly Rate",
        accent: "#3B82F6", // Electric Blue
        accentGlow: "rgba(59, 130, 246, 0.15)",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
        ),
    },
    {
        id: "contract-to-hire",
        title: "Contract To Hire",
        category: "Flexible Transition",
        description:
            "De-risk long-term hiring by evaluating real-world technical capabilities and team compatibility on active projects prior to full-time conversion.",
        bullets: [
            "Contract engineers work directly on client projects with a structured option to convert to full-time client role.",
            "Flexible transition window provided after 6 to 12 months of successful execution on contract.",
            "Optimal win-win evaluation approach for bright candidates ensuring long-term mutual benefit.",
        ],
        feeBadge: "Monthly Rate Transfer Fee",
        accent: "#8B5CF6", // Purple/Violet
        accentGlow: "rgba(139, 92, 246, 0.15)",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        id: "build-operate-transfer",
        title: "Build-Operate-Transfer",
        category: "Turnkey Capability",
        description:
            "Strategic setup of dedicated engineering teams or offshore labs with guaranteed operational efficiency, domain rigor, and eventual IP transfer.",
        bullets: [
            "Build & nurture a fresh engineering team for a predefined competence or program requirement.",
            "Operate and make the team fully productive under SAMSAN governance with strict SLA adherence.",
            "Seamless strategic option to transfer the operational team to customer keeping efficiency high.",
        ],
        feeBadge: "Monthly Rate Transfer Fee",
        accent: "#10B981", // Emerald Green
        accentGlow: "rgba(16, 185, 129, 0.15)",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
    },
];

// ── Value Pillars ────────────────────────────────────────────────
const valuePillars = [
    {
        title: "Domain Specialization",
        desc: "Engineers specialized in SDV, AUTOSAR, ADAS/AD, Infotainment (IVI), and Cloud Connected Vehicles.",
        icon: "⚡",
    },
    {
        title: "Rigorous Technical Vetting",
        desc: "Candidates evaluated by senior practicing architects through multi-stage hands-on skill matrix checks.",
        icon: "🎯",
    },
    {
        title: "Rapid Turnaround",
        desc: "Pre-screened engineering talent pool enables candidate shortlisting within 48-72 hours.",
        icon: "🚀",
    },
    {
        title: "Flexible Commercials",
        desc: "Tailored model options—from direct placement to long-term BOT—aligned with your program budget.",
        icon: "🛡️",
    },
];

export default function ConsultingStaffingClient() {
    const shouldReduce = useReducedMotion();
    const [activePillar, setActivePillar] = useState(0);

    return (
        <div style={{ backgroundColor: "var(--midnight)", color: "var(--text-primary)", minHeight: "100vh" }}>
            {/* ── 1. HERO BANNER SECTION ── */}
            <section
                style={{
                    position: "relative",
                    backgroundImage:
                        "radial-gradient(circle at 70% 30%, rgba(77, 216, 232, 0.12) 0%, transparent 60%), linear-gradient(180deg, rgba(10, 15, 28, 0.92) 0%, #0A0F1C 100%), url('/images/digital_cloud_connectivity.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "130px 0 90px 0",
                    borderBottom: "1px solid var(--border)",
                    overflow: "hidden",
                }}
                aria-labelledby="hero-title"
            >
                {/* Background ambient lighting */}
                <div
                    style={{
                        position: "absolute",
                        top: "-20%",
                        left: "15%",
                        width: "500px",
                        height: "500px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
                        pointerEvents: "none",
                        filter: "blur(60px)",
                    }}
                />

                <div className="container" style={{ position: "relative", zIndex: 2 }}>
                    <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible">
                        {/* Title & Lead */}
                        <motion.h1
                            id="hero-title"
                            variants={fadeUpVariants(shouldReduce)}
                            style={{
                                fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
                                fontWeight: 800,
                                color: "#FFFFFF",
                                letterSpacing: "-0.02em",
                                lineHeight: "1.15",
                                marginBottom: "20px",
                                maxWidth: "860px",
                            }}
                        >
                            Consulting & <span style={{ color: "#4DD8E8" }}>Staffing Solutions</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUpVariants(shouldReduce)}
                            style={{
                                fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                                color: "var(--text-secondary)",
                                maxWidth: "780px",
                                lineHeight: "1.7",
                                margin: 0,
                            }}
                        >
                            Empowering automotive OEMs, Tier-1 suppliers, and technology enterprises with expert technical advisory, management consulting, and flexible engineering talent augmentation.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── 2. TECHNICAL & MANAGEMENT CONSULTING SECTION ── */}
            <section style={{ padding: "90px 0", borderBottom: "1px solid var(--border)", position: "relative" }}>
                <div className="container">
                    {/* Section Header */}
                    <div style={{ marginBottom: "50px", textAlign: "left" }}>
                        <span
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                color: "#4DD8E8",
                                background: "rgba(77, 216, 232, 0.1)",
                                border: "1px solid rgba(77, 216, 232, 0.2)",
                                padding: "4px 14px",
                                borderRadius: "100px",
                                display: "inline-block",
                                marginBottom: "14px",
                            }}
                        >
                            OUR SERVICE
                        </span>
                        <h2 style={{ fontSize: "clamp(2rem, 3.2vw, 2.6rem)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.01em" }}>
                            Consulting — Technical & Management
                        </h2>
                        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", maxWidth: "720px", marginTop: "12px", lineHeight: "1.7" }}>
                            We provide expert strategic guidance, architectural oversight, and hands-on execution support across key technology and management domains:
                        </p>
                    </div>

                    {/* Content Grid: 2 Columns (Pillars Cards Left + Interactive Feature Widget Right) */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                            gap: "32px",
                            alignItems: "stretch",
                        }}
                    >
                        {/* Left Column: Interactive Pillar Cards */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            {consultingPillars.map((pillar, idx) => {
                                const isActive = activePillar === idx;
                                return (
                                    <motion.div
                                        key={pillar.id}
                                        onClick={() => setActivePillar(idx)}
                                        whileHover={{ x: 4 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            cursor: "pointer",
                                            padding: "24px",
                                            borderRadius: "16px",
                                            background: isActive ? "rgba(22, 30, 53, 0.8)" : "rgba(13, 19, 35, 0.45)",
                                            border: `1px solid ${isActive ? pillar.accent : "rgba(255, 255, 255, 0.08)"}`,
                                            boxShadow: isActive ? `0 10px 30px ${pillar.accentBg}` : "none",
                                            transition: "all 0.3s ease",
                                            position: "relative",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {/* Accent top line if active */}
                                        {isActive && (
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    height: "3px",
                                                    background: pillar.accent,
                                                }}
                                            />
                                        )}

                                        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                                            <div
                                                style={{
                                                    width: "44px",
                                                    height: "44px",
                                                    borderRadius: "12px",
                                                    background: pillar.accentBg,
                                                    color: pillar.accent,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    flexShrink: 0,
                                                    border: `1px solid ${pillar.accent}30`,
                                                }}
                                            >
                                                {pillar.icon}
                                            </div>

                                            <div>
                                                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                                                    <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                                                        {pillar.title}
                                                    </h3>
                                                </div>
                                                <div style={{ fontSize: "0.82rem", color: pillar.accent, fontWeight: 600, marginBottom: "8px" }}>
                                                    {pillar.subtitle}
                                                </div>
                                                <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
                                                    {pillar.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Right Column: Detailed Breakdown Card for Active Pillar */}
                        <div
                            style={{
                                background: "rgba(13, 19, 35, 0.75)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                border: `1px solid ${consultingPillars[activePillar].accent}40`,
                                borderRadius: "20px",
                                padding: "36px 30px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                boxShadow: `0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px ${consultingPillars[activePillar].accentBg}`,
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {/* Decorative background grid pattern */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
                                    backgroundSize: "20px 20px",
                                    opacity: 0.5,
                                    pointerEvents: "none",
                                }}
                            />

                            <div style={{ position: "relative", zIndex: 2 }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                                    <span
                                        style={{
                                            fontSize: "0.75rem",
                                            fontWeight: 700,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.08em",
                                            color: consultingPillars[activePillar].accent,
                                            background: consultingPillars[activePillar].accentBg,
                                            padding: "4px 12px",
                                            borderRadius: "100px",
                                            border: `1px solid ${consultingPillars[activePillar].accent}30`,
                                        }}
                                    >
                                        {consultingPillars[activePillar].badge}
                                    </span>
                                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginLeft: "auto" }}>
                                        Pillar 0{activePillar + 1} / 03
                                    </span>
                                </div>

                                <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "12px" }}>
                                    {consultingPillars[activePillar].title} Scope
                                </h3>

                                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "28px" }}>
                                    Our consultants bring decade-long industry experience from leading automotive Tier-1s and OEMs to help your team navigate technical complexity and accelerate delivery.
                                </p>

                                <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "14px" }}>
                                    Key Service Offerings:
                                </h4>

                                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
                                    {consultingPillars[activePillar].points.map((pt, i) => (
                                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "0.93rem", color: "var(--text-primary)", lineHeight: "1.5" }}>
                                            <span
                                                style={{
                                                    color: consultingPillars[activePillar].accent,
                                                    fontWeight: 800,
                                                    fontSize: "1.1rem",
                                                    lineHeight: "1",
                                                    marginTop: "2px",
                                                }}
                                            >
                                                ✓
                                            </span>
                                            <span>{pt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Bottom Card Footer */}
                            <div
                                style={{
                                    marginTop: "32px",
                                    paddingTop: "20px",
                                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    position: "relative",
                                    zIndex: 2,
                                }}
                            >
                                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                                    Tailored execution frameworks available
                                </div>
                                <Link
                                    href="/contact"
                                    style={{
                                        color: consultingPillars[activePillar].accent,
                                        fontSize: "0.88rem",
                                        fontWeight: 600,
                                        textDecoration: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                    }}
                                >
                                    Request Advisory <span>→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 3. ENGAGEMENT & STAFFING MODELS (4 CARDS MATCHING REFERENCE SCREENSHOT) ── */}
            <section style={{ padding: "90px 0", background: "rgba(10, 15, 28, 0.5)", borderBottom: "1px solid var(--border)" }}>
                <div className="container">
                    {/* Section Header */}
                    <div style={{ textAlign: "center", maxWidth: "740px", margin: "0 auto 60px auto" }}>
                        <span
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                color: "#3B82F6",
                                background: "rgba(59, 130, 246, 0.1)",
                                border: "1px solid rgba(59, 130, 246, 0.2)",
                                padding: "4px 14px",
                                borderRadius: "100px",
                                display: "inline-block",
                                marginBottom: "14px",
                            }}
                        >
                            FLEXIBLE COMMERCIAL MODELS
                        </span>
                        <h2 style={{ fontSize: "clamp(2.1rem, 3.5vw, 2.8rem)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.01em" }}>
                            Our Engagement & Staffing Models
                        </h2>
                        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", marginTop: "14px", lineHeight: "1.7" }}>
                            Choose from four structured, business-aligned engagement options designed to accommodate your team size, project duration, risk appetite, and budget requirements.
                        </p>
                    </div>

                    {/* 4 Cards Grid */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                            gap: "24px",
                            alignItems: "stretch",
                        }}
                    >
                        {staffingModels.map((model) => (
                            <motion.div
                                key={model.id}
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                style={{
                                    background: "rgba(13, 19, 35, 0.7)",
                                    backdropFilter: "blur(16px)",
                                    WebkitBackdropFilter: "blur(16px)",
                                    border: "1px solid rgba(255, 255, 255, 0.09)",
                                    borderRadius: "20px",
                                    padding: "28px 24px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    boxShadow: "0 12px 35px rgba(0, 0, 0, 0.35)",
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                {/* Top Glow Bar */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: "4px",
                                        background: model.accent,
                                    }}
                                />

                                <div>
                                    {/* Top Coral / Accent Header Pill (Matching Reference Screenshot Header Style) */}
                                    <div
                                        style={{
                                            background: model.accent,
                                            color: "#0A0F1C",
                                            fontWeight: 800,
                                            fontSize: "0.88rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.06em",
                                            padding: "10px 16px",
                                            borderRadius: "10px",
                                            textAlign: "center",
                                            boxShadow: `0 4px 15px ${model.accentGlow}`,
                                            marginBottom: "24px",
                                        }}
                                    >
                                        {model.title}
                                    </div>

                                    {/* Icon + Category */}
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                                        <div
                                            style={{
                                                width: "42px",
                                                height: "42px",
                                                borderRadius: "10px",
                                                background: model.accentGlow,
                                                color: model.accent,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                border: `1px solid ${model.accent}30`,
                                                flexShrink: 0,
                                            }}
                                        >
                                            {model.icon}
                                        </div>
                                        <div>
                                            <span style={{ fontSize: "0.76rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, display: "block" }}>
                                                {model.category}
                                            </span>
                                            <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF" }}>
                                                {model.title}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "24px" }}>
                                        {model.description}
                                    </p>

                                    {/* Feature Points ("Our Approach") */}
                                    <div style={{ marginBottom: "28px" }}>
                                        <div
                                            style={{
                                                fontSize: "0.78rem",
                                                fontWeight: 700,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.08em",
                                                color: model.accent,
                                                marginBottom: "12px",
                                            }}
                                        >
                                            Our Approach:
                                        </div>
                                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                                            {model.bullets.map((b, i) => (
                                                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.86rem", color: "var(--text-primary)", lineHeight: "1.5" }}>
                                                    <span
                                                        style={{
                                                            color: model.accent,
                                                            fontWeight: 800,
                                                            fontSize: "0.9rem",
                                                            marginTop: "2px",
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        •
                                                    </span>
                                                    <span>{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Bottom Fee Structure Badge (Matching Reference Screenshot Black Pill Style) */}
                                <div style={{ paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                                    <div
                                        style={{
                                            background: "#000000",
                                            color: "#FFFFFF",
                                            border: "1px solid rgba(255, 255, 255, 0.15)",
                                            borderRadius: "10px",
                                            padding: "10px 14px",
                                            textAlign: "center",
                                            fontSize: "0.82rem",
                                            fontWeight: 700,
                                            letterSpacing: "0.04em",
                                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                                        }}
                                    >
                                        {model.feeBadge}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4. WHY SAMSAN DIFFERENTIATORS ── */}
            <section style={{ padding: "90px 0", borderBottom: "1px solid var(--border)" }}>
                <div className="container">
                    <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 50px auto" }}>
                        <span
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                color: "#8B5CF6",
                                background: "rgba(139, 92, 246, 0.1)",
                                border: "1px solid rgba(139, 92, 246, 0.2)",
                                padding: "4px 14px",
                                borderRadius: "100px",
                                display: "inline-block",
                                marginBottom: "14px",
                            }}
                        >
                            THE SAMSAN ADVANTAGE
                        </span>
                        <h2 style={{ fontSize: "clamp(2rem, 3.2vw, 2.5rem)", fontWeight: 800, color: "#FFFFFF" }}>
                            Why Top Automotive & Tech Companies Choose Us
                        </h2>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                            gap: "24px",
                        }}
                    >
                        {valuePillars.map((v, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: "rgba(13, 19, 35, 0.5)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    borderRadius: "16px",
                                    padding: "24px",
                                }}
                            >
                                <div style={{ fontSize: "2rem", marginBottom: "14px" }}>{v.icon}</div>
                                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "8px" }}>
                                    {v.title}
                                </h3>
                                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
                                    {v.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 5. HIGH-CONVERSION CTA SECTION ── */}
            <section style={{ padding: "90px 0", background: "radial-gradient(circle at 50% 50%, rgba(77, 216, 232, 0.08) 0%, transparent 70%)" }}>
                <div className="container" style={{ textAlign: "center", maxWidth: "720px" }}>
                    <h2 style={{ fontSize: "clamp(2.1rem, 3.5vw, 2.8rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: "16px" }}>
                        Need Specialized Technical Guidance or Talent?
                    </h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "36px" }}>
                        Partner with SAMSAN Technische Labs to scale your engineering bandwidth, deploy domain-expert contract resources, or establish dedicated Centers of Excellence.
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                        <Link href="/contact" className="btn btn-primary" style={{ padding: "14px 32px", fontSize: "1rem" }}>
                            Schedule Staffing Consultation
                        </Link>
                        <Link href="/engineering-offerings" className="btn btn-outline" style={{ padding: "14px 28px", fontSize: "1rem" }}>
                            Explore Engineering Offerings
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
