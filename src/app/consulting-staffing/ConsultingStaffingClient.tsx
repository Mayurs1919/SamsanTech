"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Hero } from "@/components/theme-light/Hero";
import { Section } from "@/components/theme-light/Section";
import { Button } from "@/components/theme-light/Button";
import { CtaBand } from "@/components/theme-light/CtaBand";
import { Chip } from "@/components/theme-light/Chip";
import { Card } from "@/components/theme-light/Card";
import { inter, manrope } from "@/app/solutions/fonts";

// ── Data ────────────────────────────────────────────────────────────

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
        accentLight: "rgba(77, 216, 232, 0.08)",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        accentLight: "rgba(59, 130, 246, 0.08)",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        accentLight: "rgba(139, 92, 246, 0.08)",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
];

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
            "Complete end-to-end coordination from candidate shortlisting to offer negotiation and onboarding.",
        ],
        feeBadge: "One Time Fee",
        accent: "#F97316",
        accentGlow: "rgba(249, 115, 22, 0.12)",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        accent: "#3B82F6",
        accentGlow: "rgba(59, 130, 246, 0.12)",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        feeBadge: "Monthly Rate + Transfer Fee",
        accent: "#8B5CF6",
        accentGlow: "rgba(139, 92, 246, 0.12)",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        feeBadge: "Monthly Rate + Transfer Fee",
        accent: "#10B981",
        accentGlow: "rgba(16, 185, 129, 0.12)",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
            </svg>
        ),
    },
];

const valuePillars = [
    {
        title: "Domain Specialization",
        desc: "Engineers specialized in SDV, AUTOSAR, ADAS/AD, Infotainment (IVI), and Cloud Connected Vehicles.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
        accent: "#4DD8E8",
    },
    {
        title: "Rigorous Technical Vetting",
        desc: "Candidates evaluated by senior practicing architects through multi-stage hands-on skill matrix checks.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
        accent: "#8B5CF6",
    },
    {
        title: "Rapid Turnaround",
        desc: "Pre-screened engineering talent pool enables candidate shortlisting within 48–72 hours.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        accent: "#F97316",
    },
    {
        title: "Flexible Commercials",
        desc: "Tailored model options — from direct placement to long-term BOT — aligned with your program budget.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
        accent: "#10B981",
    },
];

const domainSkills = [
    "AUTOSAR Classic & Adaptive", "ADAS / AD Systems", "Android Automotive OS",
    "Digital Cockpit & HMI", "Cloud & IoT Platforms", "Functional Safety (ISO 26262)",
    "Embedded C / C++", "Python & ML Pipelines", "Vehicle Telematics",
    "CAN / LIN / Ethernet", "OTA Update Frameworks", "Cybersecurity (TARA, AUTOSAR SecOC)",
];

const stats = [
    { value: "50+", label: "Engineers On-Bench" },
    { value: "48h", label: "Avg. Shortlist Time" },
    { value: "4", label: "Engagement Models" },
    { value: "6+", label: "Global Markets" },
];

// ── Component ───────────────────────────────────────────────────────

export default function ConsultingStaffingClient() {
    const shouldReduce = useReducedMotion();
    const [activePillar, setActivePillar] = useState(0);

    return (
        <div className={`theme-light-corp consulting-theme ${inter.variable} ${manrope.variable}`}>

            <Hero
                className="cs-theme-hero"
                eyebrow="Consulting & strategic staffing"
                title={<>Expert Engineering Talent & Strategic Advisory</>}
                description="Empowering automotive OEMs, Tier-1 suppliers, and technology enterprises with expert technical advisory, management consulting, and flexible engineering talent augmentation — from 48-hour shortlisting to full BOT capability."
            >
                <div className="tl-hero__actions">
                    <Button href="/contact" variant="primary">Schedule a Consultation <span aria-hidden="true">→</span></Button>
                    <Button href="/engagement-models" variant="outline-on-dark">View Engagement Models</Button>
                </div>
            </Hero>

            {/* ══════════════════════════════════════════════════════════
                2. CONSULTING PILLARS — Light background
            ══════════════════════════════════════════════════════════ */}
            <Section variant="white" className="cs-section">
                <div className="container tl-container">
                    {/* Header */}
                    <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 64px" }}>
                        <span style={{
                            fontFamily: "var(--font-mono)", fontSize: "0.78rem", fontWeight: 700,
                            textTransform: "uppercase", letterSpacing: "0.1em",
                            color: "#4DD8E8", background: "rgba(77,216,232,0.1)",
                            border: "1px solid rgba(77,216,232,0.25)",
                            padding: "5px 16px", borderRadius: "100px",
                            display: "inline-block", marginBottom: "16px",
                        }}>
                            Our service areas
                        </span>
                        <h2 style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)", fontWeight: 800, color: "#0B1320", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "16px" }}>
                            Technical & Management Consulting
                        </h2>
                        <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: "1.75", margin: 0 }}>
                            Expert strategic guidance, architectural oversight, and hands-on execution support across key technology and management domains.
                        </p>
                    </div>

                    {/* Interactive Two-Column Layout */}
                    <div className="cs-consulting-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "32px", alignItems: "start" }}>
                        {/* Left: Clickable Pillar Cards */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            {consultingPillars.map((pillar, idx) => {
                                const isActive = activePillar === idx;
                                return (
                                    <motion.div
                                        key={pillar.id}
                                        onClick={() => setActivePillar(idx)}
                                        whileHover={{ y: -4 }}
                                        transition={{ duration: 0.18 }}
                                        style={{
                                            cursor: "pointer", padding: "22px 24px", borderRadius: "16px",
                                            background: isActive ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                                            border: `1.5px solid ${isActive ? pillar.accent : "#E2E8F0"}`,
                                            boxShadow: isActive ? `0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px ${pillar.accent}20` : "0 2px 8px rgba(0,0,0,0.04)",
                                            transition: "all 0.25s ease",
                                            position: "relative", overflow: "hidden",
                                        }}
                                    >
                                        {isActive && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: pillar.accent }} />}

                                        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                                            <div style={{
                                                width: "44px", height: "44px", borderRadius: "12px",
                                                background: isActive ? pillar.accentBg : "#F1F5F9",
                                                color: pillar.accent,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                flexShrink: 0, border: `1px solid ${isActive ? pillar.accent + "30" : "#E2E8F0"}`,
                                                transition: "all 0.25s",
                                            }}>
                                                {pillar.icon}
                                            </div>
                                            <div>
                                                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                                                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0B1320", margin: 0 }}>{pillar.title}</h3>
                                                </div>
                                                <div style={{ fontSize: "0.8rem", color: pillar.accent, fontWeight: 600, marginBottom: "6px" }}>{pillar.subtitle}</div>
                                                <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: "1.6", margin: 0 }}>{pillar.description}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Right: Detail Panel */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activePillar}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: shouldReduce ? 0 : 0.25 }}
                                style={{
                                    background: "#FFFFFF", borderRadius: "20px",
                                    border: `1.5px solid ${consultingPillars[activePillar].accent}30`,
                                    boxShadow: `0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px ${consultingPillars[activePillar].accent}15`,
                                    padding: "36px 32px", position: "relative", overflow: "hidden",
                                }}
                            >
                                {/* Top accent stripe */}
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: `linear-gradient(90deg, ${consultingPillars[activePillar].accent}, ${consultingPillars[activePillar].accent}60)` }} />

                                {/* Subtle bg pattern */}
                                <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />

                                <div style={{ position: "relative", zIndex: 2 }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                                        <span style={{
                                            fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase",
                                            letterSpacing: "0.08em", color: consultingPillars[activePillar].accent,
                                            background: consultingPillars[activePillar].accentBg,
                                            padding: "4px 12px", borderRadius: "100px",
                                            border: `1px solid ${consultingPillars[activePillar].accent}30`,
                                        }}>
                                            {consultingPillars[activePillar].badge}
                                        </span>
                                        <span style={{ fontSize: "0.78rem", color: "#94A3B8", fontFamily: "var(--font-mono)" }}>
                                            0{activePillar + 1} / 03
                                        </span>
                                    </div>

                                    <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#0B1320", marginBottom: "12px" }}>
                                        {consultingPillars[activePillar].title}
                                    </h3>
                                    <p style={{ fontSize: "0.93rem", color: "#475569", lineHeight: "1.75", marginBottom: "28px" }}>
                                        Our consultants bring decade-long industry experience from leading automotive Tier-1s and OEMs to help your team navigate technical complexity and accelerate delivery.
                                    </p>

                                    <div style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#94A3B8", marginBottom: "14px" }}>
                                        Key Service Offerings
                                    </div>

                                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                                        {consultingPillars[activePillar].points.map((pt, i) => (
                                            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "0.92rem", color: "#334155", lineHeight: "1.6" }}>
                                                <span style={{
                                                    width: "20px", height: "20px", borderRadius: "50%",
                                                    background: consultingPillars[activePillar].accentBg,
                                                    color: consultingPillars[activePillar].accent,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    flexShrink: 0, fontSize: "0.65rem", fontWeight: 800, marginTop: "2px",
                                                    border: `1px solid ${consultingPillars[activePillar].accent}30`,
                                                }}>✓</span>
                                                {pt}
                                            </li>
                                        ))}
                                    </ul>

                                    <div style={{ marginTop: "32px", paddingTop: "20px", borderTop: "1px solid #F1F5F9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <span style={{ fontSize: "0.82rem", color: "#94A3B8" }}>Tailored execution frameworks available</span>
                                        <Link href="/contact" style={{ color: consultingPillars[activePillar].accent, fontSize: "0.88rem", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
                                            Request Advisory <span aria-hidden>→</span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </Section>

            {/* ══════════════════════════════════════════════════════════
                3. DOMAIN EXPERTISE STRIP — Dark band
            ══════════════════════════════════════════════════════════ */}
            <Section variant="alt" className="cs-section cs-domain-section">
                <div className="container tl-container">
                    <div style={{ textAlign: "center", marginBottom: "36px" }}>
                        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#9CA8C4", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-mono)" }}>
                            Domain Competencies We Staff For
                        </h3>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
                        {domainSkills.map((skill) => (
                            <Chip key={skill} className="cs-skill-chip">{skill}</Chip>
                        ))}
                    </div>
                </div>
            </Section>

            {/* ══════════════════════════════════════════════════════════
                4. ENGAGEMENT & STAFFING MODELS — Light background
            ══════════════════════════════════════════════════════════ */}
            <Section variant="white" className="cs-section">
                <div className="container tl-container">
                    <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 64px" }}>
                        <span style={{
                            fontFamily: "var(--font-mono)", fontSize: "0.78rem", fontWeight: 700,
                            textTransform: "uppercase", letterSpacing: "0.1em",
                            color: "#3B82F6", background: "rgba(59,130,246,0.08)",
                            border: "1px solid rgba(59,130,246,0.2)",
                            padding: "5px 16px", borderRadius: "100px",
                            display: "inline-block", marginBottom: "16px",
                        }}>
                            Flexible commercial models
                        </span>
                        <h2 style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)", fontWeight: 800, color: "#0B1320", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "16px" }}>
                            Our Engagement & Staffing Models
                        </h2>
                        <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: "1.75", margin: 0 }}>
                            Four structured, business-aligned engagement options designed to accommodate your team size, project duration, risk appetite, and budget requirements.
                        </p>
                    </div>

                    <div className="cs-staffing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
                        {staffingModels.map((model) => (
                            <motion.div
                                key={model.id}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.22, ease: "easeOut" }}
                                style={{
                                    background: "#FFFFFF", borderRadius: "20px",
                                    border: "1.5px solid #E2E8F0",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                                    overflow: "hidden", display: "flex", flexDirection: "column",
                                    transition: "box-shadow 0.25s, border-color 0.25s",
                                }}
                            >
                                {/* Colour Header Band */}
                                <div style={{
                                    background: model.accent, padding: "16px 22px",
                                    display: "flex", alignItems: "center", gap: "12px",
                                }}>
                                    <div style={{
                                        width: "36px", height: "36px", borderRadius: "10px",
                                        background: "rgba(255,255,255,0.2)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#FFFFFF", flexShrink: 0,
                                    }}>
                                        {model.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.75)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{model.category}</div>
                                        <div style={{ fontSize: "1rem", fontWeight: 800, color: "#FFFFFF" }}>{model.title}</div>
                                    </div>
                                </div>

                                {/* Body */}
                                <div style={{ padding: "24px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                                    <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.7", marginBottom: "20px" }}>{model.description}</p>

                                    <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: model.accent, marginBottom: "12px" }}>
                                        Our Approach
                                    </div>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                                        {model.bullets.map((b, i) => (
                                            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.86rem", color: "#334155", lineHeight: "1.55" }}>
                                                <span style={{
                                                    width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0, marginTop: "2px",
                                                    background: model.accentGlow, color: model.accent,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    fontSize: "0.6rem", fontWeight: 800,
                                                    border: `1px solid ${model.accent}30`,
                                                }}>•</span>
                                                {b}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Fee Badge */}
                                    <div style={{ marginTop: "24px", paddingTop: "18px", borderTop: "1px solid #F1F5F9" }}>
                                        <div style={{
                                            display: "inline-flex", alignItems: "center", gap: "8px",
                                            padding: "8px 16px", borderRadius: "100px",
                                            background: "#0B1320", color: "#FFFFFF",
                                            fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.03em",
                                        }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                            {model.feeBadge}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* ══════════════════════════════════════════════════════════
                5. WHY SAMSAN — Soft light grey
            ══════════════════════════════════════════════════════════ */}
            <Section variant="alt" className="cs-section">
                <div className="container tl-container">
                    <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 60px" }}>
                        <span style={{
                            fontFamily: "var(--font-mono)", fontSize: "0.78rem", fontWeight: 700,
                            textTransform: "uppercase", letterSpacing: "0.1em",
                            color: "#8B5CF6", background: "rgba(139,92,246,0.08)",
                            border: "1px solid rgba(139,92,246,0.2)",
                            padding: "5px 16px", borderRadius: "100px",
                            display: "inline-block", marginBottom: "16px",
                        }}>
                            The SAMSAN advantage
                        </span>
                        <h2 style={{ fontSize: "clamp(1.9rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0B1320", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                            Why Top Automotive & Tech Companies Choose Us
                        </h2>
                    </div>

                    <div className="cs-value-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
                        {valuePillars.map((v, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    background: "#FFFFFF", borderRadius: "18px",
                                    border: "1.5px solid #E2E8F0",
                                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                                    padding: "28px 24px", position: "relative", overflow: "hidden",
                                }}
                            >
                                {/* Top accent line */}
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: v.accent }} />

                                <div style={{
                                    width: "48px", height: "48px", borderRadius: "14px",
                                    background: `${v.accent}12`, color: v.accent,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    marginBottom: "20px", border: `1px solid ${v.accent}25`,
                                }}>
                                    {v.icon}
                                </div>
                                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0B1320", marginBottom: "10px" }}>{v.title}</h3>
                                <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: "1.65", margin: 0 }}>{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* ══════════════════════════════════════════════════════════
                6. HOW IT WORKS — White with numbered steps
            ══════════════════════════════════════════════════════════ */}
            <Section variant="white" className="cs-section">
                <div className="container tl-container">
                    <div style={{ textAlign: "center", maxWidth: "620px", margin: "0 auto 64px" }}>
                        <span style={{
                            fontFamily: "var(--font-mono)", fontSize: "0.78rem", fontWeight: 700,
                            textTransform: "uppercase", letterSpacing: "0.1em",
                            color: "#F97316", background: "rgba(249,115,22,0.08)",
                            border: "1px solid rgba(249,115,22,0.2)",
                            padding: "5px 16px", borderRadius: "100px",
                            display: "inline-block", marginBottom: "16px",
                        }}>
                            Our process
                        </span>
                        <h2 style={{ fontSize: "clamp(1.9rem, 3vw, 2.5rem)", fontWeight: 800, color: "#0B1320", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                            How We Work With You
                        </h2>
                    </div>

                    <div className="cs-process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2px", background: "#E2E8F0", borderRadius: "20px", overflow: "hidden" }}>
                        {[
                            { step: "01", title: "Discovery Call", desc: "We understand your technical requirements, team gaps, and timelines." },
                            { step: "02", title: "Talent Mapping", desc: "We identify and map the best-fit engineers from our vetted talent pool." },
                            { step: "03", title: "Shortlisting", desc: "Curated candidate profiles delivered within 48–72 hours of engagement." },
                            { step: "04", title: "Interview & Select", desc: "You interview, assess, and select. We coordinate everything end-to-end." },
                            { step: "05", title: "Onboarding", desc: "Seamless integration with full admin, compliance, and payroll support." },
                        ].map((s, i) => (
                            <Card key={i} className="cs-process-card" style={{ background: "#FFFFFF", padding: "32px 24px", textAlign: "center" }}>
                                <div style={{
                                    width: "48px", height: "48px", borderRadius: "14px",
                                    background: "linear-gradient(135deg, #0A0F1C, #161E35)",
                                    color: "#FFFFFF", display: "flex", alignItems: "center",
                                    justifyContent: "center", fontWeight: 800, fontSize: "0.9rem",
                                    fontFamily: "var(--font-mono)", margin: "0 auto 18px",
                                }}>
                                    {s.step}
                                </div>
                                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0B1320", marginBottom: "8px" }}>{s.title}</h3>
                                <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: "1.6", margin: 0 }}>{s.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </Section>

            <CtaBand
                eyebrow="Let's build together"
                title="Need Specialized Technical Guidance or Talent?"
                description="Partner with SAMSAN to scale your engineering bandwidth, deploy domain-expert contract resources, or establish dedicated Centers of Excellence — globally."
                primaryLabel="Schedule Staffing Consultation"
                primaryHref="/contact"
                secondaryLabel="Explore Engineering Offerings"
                secondaryHref="/engineering-offerings"
                secondaryVariant="outline-on-dark"
                className="cs-theme-cta"
            />
        </div>
    );
}
