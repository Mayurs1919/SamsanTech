"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";

// Corporate details
const megatrends = [
    {
        title: "Connected Mobility Engineering",
        desc: "ADAS sensor fusion (cameras, radar, lidar), connected V2X systems, remote vehicle diagnostics, and cloud telemetry integration.",
        color: "var(--rose)"
    },
    {
        title: "Cockpit & In-Cabin Intelligence",
        desc: "Custom HMI systems, hypervisors, Android Automotive OS (AAOS), dual-screen control modules, and OTA software layers.",
        color: "var(--violet-mid)"
    },
    {
        title: "Software-Defined Vehicle Platforms",
        desc: "AUTOSAR architecture design, classic & adaptive middleware layers, vehicle service-oriented architectures (SOA), and system integration.",
        color: "var(--blue)"
    },
    {
        title: "AI-led Engineering Digitalization",
        desc: "GenAI requirements automation, automated test generation, ISO 26262 functional safety compliance, and secure cybersecurity bootloaders.",
        color: "var(--mint)"
    }
];

const reasons = [
    "Systems thinking",
    "Automotive discipline",
    "AI-led acceleration",
    "Production accountability"
];

const companySpecs = [
    { key: "HEADQUARTERS", value: "STPI New Building, Hinjawadi Phase I, Pune, India" },
    { key: "FOUNDED", value: "2023" },
    { key: "TEAM SIZE", value: "50+ Engineers & Systems Architects" },
    { key: "REGIONS SERVED", value: "India/APAC, Europe, United States, Japan, South Korea" },
    { key: "CORE DOMAIN", value: "Automotive Systems, Cockpit Engineering & Connected Mobility" },
    { key: "COMPLIANCE & SAFETY", value: "ISO 26262 Road Vehicles Functional Safety & Secure Bootloaders" }
];

// Profile Avatar Monogram Component to replace static photos with premium neon initials
function ProfileAvatar({ name, role, imagePath }: { name: string; role: string; imagePath?: string }) {
    if (imagePath) {
        return (
            <div style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                overflow: "hidden",
                margin: "0 auto 20px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255,255,255,0.1)",
                border: "2px solid rgba(255, 255, 255, 0.12)",
                position: "relative",
                background: "rgba(10, 15, 28, 0.6)"
            }}>
                <img
                    src={imagePath}
                    alt={name}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center"
                    }}
                />
                <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.4) 100%)",
                    pointerEvents: "none"
                }} />
            </div>
        );
    }

    const initials = name.split(" ").map(n => n[0]).join("");
    // Use role to assign a consistent gradient
    let grad = "var(--grad-violet)";
    if (role.includes("CEO") || role.includes("Founder")) grad = "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)";
    else if (role.includes("Advisor") || role.includes("Board")) grad = "linear-gradient(135deg, #3B82F6 0%, #EC4899 100%)";
    else grad = "linear-gradient(135deg, #10B981 0%, #3B82F6 100%)";

    return (
        <div style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: grad,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "#ffffff",
            margin: "0 auto 20px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255,255,255,0.1)",
            border: "2px solid rgba(255, 255, 255, 0.1)",
            position: "relative"
        }}>
            {initials}
            <div style={{
                position: "absolute",
                inset: "-4px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.06)",
                pointerEvents: "none"
            }} />
        </div>
    );
}

// LinkedIn SVG path
const LINKEDIN_SVG_PATH = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

function LinkedInIcon({ href, name, centered }: { href?: string; name: string; centered?: boolean }) {
    if (!href) {
        // Disabled state for people without a LinkedIn URL
        return (
            <div
                title="LinkedIn profile not available"
                style={{
                    position: centered ? "relative" : "absolute",
                    bottom: centered ? "auto" : "12px",
                    ...(centered
                        ? {
                            marginTop: "auto",
                            marginBottom: "-8px",
                            alignSelf: "center",
                        }
                        : { right: "16px" }),
                    width: "38px",
                    height: "38px",
                    borderRadius: "6px",
                    background: "rgba(22, 30, 53, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0.35,
                    cursor: "default",
                    zIndex: 5
                }}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d={LINKEDIN_SVG_PATH} fill="var(--text-secondary)" />
                </svg>
            </div>
        );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="linkedin-icon-btn"
            style={{
                position: centered ? "relative" : "absolute",
                bottom: centered ? "auto" : "12px",
                ...(centered
                    ? {
                        marginTop: "auto",
                        marginBottom: "-8px",
                        alignSelf: "center",
                    }
                    : { right: "16px" }),
                width: "38px",
                height: "38px",
                borderRadius: "6px",
                background: "rgba(22, 30, 53, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s, border-color 0.2s",
                zIndex: 5,
                textDecoration: "none"
            }}
        >
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d={LINKEDIN_SVG_PATH} fill="var(--text-secondary)" style={{ transition: "fill 0.2s" }} />
            </svg>
        </a>
    );
}

function SpecRow({ specKey, specVal, index, shouldReduce }: { specKey: string; specVal: string; index: number; shouldReduce: boolean }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: shouldReduce ? 0 : 12 },
                visible: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.01 : 0.4 } }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="spec-row"
            style={{
                display: "grid",
                gridTemplateColumns: "minmax(240px, 32%) 1fr",
                background: isHovered ? "rgba(232, 82, 26, 0.04)" : "#FFFFFF",
                borderLeft: isHovered ? "3px solid #E8521A" : "3px solid transparent",
                transition: "background 0.2s ease, border-left-color 0.2s ease",
                marginLeft: isHovered ? "-3px" : "0px",
                borderBottom: "1px solid #E2E8F0",
                minHeight: "64px"
            }}
        >
            <div className="spec-key" style={{
                fontSize: "0.88rem",
                letterSpacing: "0.04em",
                padding: "20px 24px",
                background: "#F8FAFC",
                borderRight: "1px solid #E2E8F0",
                color: "#E8521A",
                fontWeight: 700,
                textTransform: "uppercase",
                fontFamily: "var(--font-sans)",
                display: "flex",
                alignItems: "center"
            }}>
                {specKey}
            </div>
            <div className="spec-val" style={{
                fontSize: "0.95rem",
                lineHeight: "1.6",
                padding: "20px 24px",
                background: "#FFFFFF",
                color: "#0B1320",
                fontWeight: 400,
                fontFamily: "var(--font-sans)",
                display: "flex",
                alignItems: "center"
            }}>
                {specVal}
            </div>
        </motion.div>
    );
}

export default function AboutPage() {
    const shouldReduce = !!useReducedMotion();

    const leadershipMembers = [
        {
            name: "V. Shankaran",
            role: "Engineering Director — Embedded",
            dept: "Embedded Engineering",
            imagePath: "/images/team/v_shankaran.png",
            glowColor: "#4DD8E8",
            linkedinUrl: "https://www.linkedin.com/in/shankaran-venugopalan-92759611/"
        },
        {
            name: "Shridhar Pophali",
            role: "Engineering Director — Cockpit",
            dept: "Digital Cockpit | Telematics | SDV | Android Automotive | HMI | ",
            imagePath: "/images/team/shridhar_pophali.jpg",
            glowColor: "#4DD8E8",
            linkedinUrl: "https://www.linkedin.com/in/shridharpophali/"
        },
        {
            name: "Dr. Pradeep Bilurkar",
            role: "Chief Data Scientist",
            dept: "Data & AI",
            imagePath: "/images/team/dr_pradeep_bilurkar.png",
            glowColor: "#4DD8E8",
            linkedinUrl: "https://www.linkedin.com/in/dr-pradeep-bilurkar-5a72922b/"
        },
        {
            name: "Pratik Waghmode",
            role: "Technical Sales",
            dept: "Business Development",
            imagePath: "/images/team/pratik_waghmode.png",
            glowColor: "#4DD8E8",
            linkedinUrl: "https://www.linkedin.com/in/pratik-waghmode-742b3440/"
        },
        {
            name: "Gaurav Joshi",
            role: "Accounts & Finance",
            dept: "Finance & Operations",
            imagePath: "/images/team/gaurav_joshi.png",
            glowColor: "#4DD8E8",
            linkedinUrl: "https://www.linkedin.com/in/gaurav-joshi-a3677b147/"
        }
    ];

    return (
        <div style={{ paddingBottom: "0px" }}>

            {/* Page Hero */}
            <section className="section-dark page-hero" aria-labelledby="about-heading" style={{
                position: "relative",
                minHeight: "320px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                background: "#0A0D11"
            }}>
                <div className="container">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                        <motion.div
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { duration: shouldReduce ? 0.01 : 0.4 } }
                            }}
                        >
                            <span className="badge" style={{ marginBottom: "16px", fontSize: "12px", letterSpacing: "0.12em", color: "#4DD8E8", borderColor: "rgba(77, 216, 232, 0.2)", background: "rgba(77, 216, 232, 0.06)" }}>About Us</span>
                        </motion.div>
                        <motion.h1
                            id="about-heading"
                            variants={{
                                hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.01 : 0.6, delay: shouldReduce ? 0 : 0.1 } }
                            }}
                            style={{
                                fontSize: "clamp(2.4rem, 4.5vw, 3.4rem)",
                                fontWeight: 800,
                                lineHeight: 1.08,
                                letterSpacing: "-0.02em",
                                marginBottom: "20px",
                                color: "#FFFFFF"
                            }}
                        >
                            About Company
                        </motion.h1>
                        <motion.p
                            className="lead"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { duration: shouldReduce ? 0.01 : 0.5, delay: shouldReduce ? 0 : 0.3 } }
                            }}
                            style={{
                                fontSize: "1.1rem",
                                lineHeight: 1.75,
                                maxWidth: "580px",
                                margin: "0 auto",
                                color: "#94A3B8"
                            }}
                        >
                            SAMSAN Technische Labs Pvt. Ltd. is a technology reimagined systems design house powering global automotive megatrends.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* SAMSAN Technische Labs Intro Section */}
            <section className="section-light section compact" style={{ borderTop: "1px solid #E2E8F0", background: "#FFFFFF" }}>
                <div className="container">
                    <div className="about-two-col" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "60px", alignItems: "center" }}>
                        <div>
                            <span className="badge" style={{ marginBottom: "16px", color: "#E8521A", borderColor: "rgba(232, 82, 26, 0.2)", background: "rgba(232, 82, 26, 0.06)" }}>Company Overview</span>
                            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, marginBottom: "28px", color: "#0B1320", letterSpacing: "-0.025em" }}>
                                SAMSAN Technische Labs Pvt. Ltd.
                            </h2>

                            {/* Mission Block */}
                            <motion.div
                                initial={{ opacity: 0, x: shouldReduce ? 0 : -24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: shouldReduce ? 0.01 : 0.5, ease: "easeOut" }}
                                style={{
                                    borderLeft: "3px solid #F59E0B",
                                    paddingLeft: "28px",
                                    marginBottom: "28px"
                                }}
                            >
                                <div style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "11px",
                                    letterSpacing: "0.1em",
                                    color: "#E8521A",
                                    marginBottom: "10px",
                                    textTransform: "uppercase"
                                }}>
                                    // Mission
                                </div>
                                <div style={{
                                    fontSize: "clamp(1.3rem, 2.2vw, 1.65rem)",
                                    fontWeight: 600,
                                    lineHeight: "1.4",
                                    fontStyle: "normal",
                                    color: "#0B1320"
                                }}>
                                    To design safe, connected, and intelligent systems that power the vehicle of the future.
                                </div>
                            </motion.div>

                            {/* Body Paragraphs container */}
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={{
                                    visible: {
                                        transition: {
                                            staggerChildren: shouldReduce ? 0 : 0.15
                                        }
                                    }
                                }}
                                style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "720px" }}
                            >
                                <motion.p
                                    variants={{
                                        hidden: { opacity: 0, y: shouldReduce ? 0 : 10 },
                                        visible: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.01 : 0.4 } }
                                    }}
                                    style={{
                                        fontSize: "1rem",
                                        lineHeight: "1.8",
                                        color: "#64748B",
                                        margin: 0
                                    }}
                                >
                                    SAMSAN Technische Labs Pvt. Ltd. is an automotive engineering and digital transformation company focused on connected mobility, cockpit engineering, embedded systems, SDV platforms, AI-led engineering automation, and strategic engineering capacity for global customers.
                                </motion.p>
                                <motion.p
                                    variants={{
                                        hidden: { opacity: 0, y: shouldReduce ? 0 : 10 },
                                        visible: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.01 : 0.4 } }
                                    }}
                                    style={{
                                        fontSize: "1rem",
                                        lineHeight: "1.8",
                                        color: "#64748B",
                                        margin: 0
                                    }}
                                >
                                    Our focus is to build safety-critical software that is always reliable, secure, and ready for production, bringing systems engineering excellence to automotive megatrends.
                                </motion.p>
                            </motion.div>
                        </div>

                        {/* Interactive Side Graphic */}
                        <div style={{
                            background: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                            borderRadius: "var(--radius-lg)",
                            padding: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: "300px",
                            position: "relative",
                            overflow: "hidden",
                            backgroundImage: "url('/images/ai_digital_tech.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.06)"
                        }}>
                            <div style={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(to top, rgba(11,19,32,0.85) 0%, rgba(11,19,32,0.2) 100%)",
                                zIndex: 1
                            }} />
                            <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                                <span className="badge" style={{ background: "rgba(255,255,255,0.2)", color: "#FFFFFF", backdropFilter: "blur(4px)", borderColor: "rgba(255,255,255,0.3)" }}>AI & Digital Embedded Technologies</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Automotive Megatrends */}
            <section className="section-light section compact" style={{ borderTop: "1px solid #E2E8F0", background: "#F8FAFC" }}>
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <span className="badge mint" style={{ marginBottom: "16px" }}>Core Competencies</span>
                        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#0B1320" }}>What We Specialize In</h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
                        {megatrends.map((trend) => (
                            <div
                                key={trend.title}
                                style={{
                                    background: "#FFFFFF",
                                    border: "1px solid #E2E8F0",
                                    borderRadius: "var(--radius)",
                                    padding: "32px 28px",
                                    position: "relative",
                                    overflow: "hidden",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
                                }}
                            >
                                <div style={{
                                    width: "4px",
                                    height: "32px",
                                    background: trend.color,
                                    position: "absolute",
                                    left: 0,
                                    top: "32px",
                                    borderRadius: "0 4px 4px 0"
                                }} />
                                <h3 style={{ fontSize: "1.2rem", color: "#0B1320", marginBottom: "14px", fontWeight: 600 }}>{trend.title}</h3>
                                <p style={{ fontSize: "0.85rem", lineHeight: "1.65", color: "#64748B" }}>{trend.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Cinematic Visual - Automotive Cockpit */}
                    <div style={{
                        marginTop: "48px",
                        width: "100%",
                        height: "350px",
                        borderRadius: "var(--radius-lg)",
                        backgroundImage: "url('/images/auto_cockpit_sys.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                        overflow: "hidden",
                        border: "1px solid #E2E8F0",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
                    }}>
                        <div style={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(to top, rgba(11,19,32,0.9) 0%, rgba(11,19,32,0.1) 100%)"
                        }} />
                        <div style={{
                            position: "absolute", bottom: "32px", left: "32px", right: "32px"
                        }}>
                            <span className="badge violet" style={{ marginBottom: "12px" }}>Automotive Cockpit Systems</span>
                            <h3 style={{ fontSize: "1.6rem", color: "#ffffff", fontWeight: 600 }}>Next-Gen Hyper-Modern Cockpit Ecosystems</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Why Choose Us */}
            <section className="section-light section compact" style={{ borderTop: "1px solid #E2E8F0", background: "#FFFFFF" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "60px", alignItems: "start" }}>

                        {/* Vision Card */}
                        <div style={{
                            background: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                            borderRadius: "var(--radius-lg)",
                            padding: "44px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.04)"
                        }}>
                            <span className="badge" style={{ marginBottom: "20px", color: "#E8521A", borderColor: "rgba(232, 82, 26, 0.2)", background: "rgba(232, 82, 26, 0.06)" }}>Our Vision</span>
                            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#0B1320", marginBottom: "20px", lineHeight: "1.3" }}>
                                To design safe, connected, and intelligent systems that power the vehicle of the future.
                            </h2>
                            <p style={{ fontSize: "0.95rem", lineHeight: "1.7", color: "#64748B" }}>
                                SAMSAN bridges the gap between hardware restrictions and complex software layers. We are committed to engineering platforms that meet the highest functional safety standards while driving agile, digital-first feature delivery.
                            </p>
                            <div style={{
                                marginTop: "32px",
                                height: "200px",
                                borderRadius: "var(--radius-sm)",
                                backgroundImage: "url('/images/embedded_engineering.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                border: "1px solid #E2E8F0"
                            }} />
                        </div>

                        {/* Why Choose Us */}
                        <div>
                            <span className="badge rose" style={{ marginBottom: "16px" }}>Our Philosophy</span>
                            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "24px", color: "#0B1320" }}>Delivery Philosophy</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                {reasons.map((reason, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            display: "flex",
                                            gap: "16px",
                                            background: "#F1F5F9",
                                            border: "1px solid #E2E8F0",
                                            borderRadius: "var(--radius-sm)",
                                            padding: "16px 20px",
                                            alignItems: "center"
                                        }}
                                    >
                                        <div style={{
                                            width: "24px", height: "24px",
                                            borderRadius: "50%",
                                            background: "rgba(232, 82, 26, 0.12)",
                                            color: "#E8521A",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            flexShrink: 0,
                                            fontSize: "0.8rem",
                                            fontWeight: 700
                                        }}>
                                            ✓
                                        </div>
                                        <p style={{ fontSize: "0.88rem", color: "#0B1320", lineHeight: "1.4", margin: 0, fontWeight: 500 }}>{reason}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Spec Sheet Section */}
            <section className="section-light section compact" style={{ borderTop: "1px solid #E2E8F0", background: "#F8FAFC" }}>
                <div className="container">
                    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                        <span className="badge" style={{ marginBottom: "16px", color: "#E8521A", borderColor: "rgba(232, 82, 26, 0.2)", background: "rgba(232, 82, 26, 0.06)" }}>Company Profile</span>
                        <h2 style={{
                            fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                            fontWeight: 700,
                            marginBottom: "32px",
                            color: "#0B1320"
                        }}>
                            Company Facts & Specifications
                        </h2>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: shouldReduce ? 0 : 0.08
                                    }
                                }
                            }}
                            className="spec-table"
                            style={{
                                background: "#FFFFFF",
                                border: "1px solid #E2E8F0",
                                borderRadius: "12px",
                                overflow: "hidden"
                            }}
                        >
                            {companySpecs.map((spec, idx) => (
                                <SpecRow key={spec.key} specKey={spec.key} specVal={spec.value} index={idx} shouldReduce={shouldReduce} />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Global Presence Section */}
            <section className="section-dark section compact" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#0A0D11" }}>
                <div className="container">
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @keyframes presencePulse {
                            0% { box-shadow: 0 0 0 0 rgba(77, 216, 232, 0.5); }
                            70% { box-shadow: 0 0 0 10px rgba(77, 216, 232, 0); }
                            100% { box-shadow: 0 0 0 0 rgba(77, 216, 232, 0); }
                        }
                    `}} />

                    <span className="badge rose" style={{ marginBottom: "16px" }}>Presence</span>
                    <h2 style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", fontWeight: 700, marginBottom: "32px", color: "#ffffff" }}>
                        Global Presence
                    </h2>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: shouldReduce ? 0 : 0.2
                                }
                            }
                        }}
                        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}
                    >
                        {[
                            { region: "India/APAC", city: "Pune (HQ) & Bengaluru", delay: "0s" },
                            { region: "Europe", city: "Munich, Germany", delay: "0.5s" },
                            { region: "United States", city: "Detroit, Michigan", delay: "1s" }
                        ].map((node) => (
                            <motion.div
                                key={node.region}
                                variants={{
                                    hidden: { opacity: 0, scale: shouldReduce ? 1 : 0.8 },
                                    visible: { opacity: 1, scale: 1, transition: { duration: shouldReduce ? 0.01 : 0.5 } }
                                }}
                                style={{
                                    background: "#161B22",
                                    border: "1px solid rgba(255, 255, 255, 0.07)",
                                    borderRadius: "16px",
                                    padding: "32px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "20px"
                                }}
                            >
                                <div style={{
                                    width: "14px",
                                    height: "14px",
                                    borderRadius: "50%",
                                    backgroundColor: "#4DD8E8",
                                    boxShadow: "0 0 10px rgba(77, 216, 232, 0.8)",
                                    animation: "presencePulse 2s infinite",
                                    animationDelay: node.delay,
                                    flexShrink: 0
                                }} />
                                <div>
                                    <h3 style={{
                                        fontSize: "13px",
                                        letterSpacing: "0.06em",
                                        fontWeight: 600,
                                        color: "#ffffff",
                                        margin: 0,
                                        textTransform: "uppercase"
                                    }}>
                                        {node.region}
                                    </h3>
                                    <p style={{
                                        fontSize: "0.9rem",
                                        color: "#94A3B8",
                                        margin: "4px 0 0 0",
                                        lineHeight: "1.4"
                                    }}>
                                        {node.city}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Leadership & Team Section */}
            <section className="section-dark" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#0A0D11", padding: "96px 0" }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    /* CEO Spotlight Card */
                    .ceo-card {
                        width: 100%;
                        background: #161B22;
                        border: 1px solid rgba(255, 255, 255, 0.07);
                        border-radius: 16px;
                        padding: 0;
                        overflow: hidden;
                        position: relative;
                        display: grid;
                        grid-template-columns: 380px 1fr;
                        align-items: stretch;
                        transition: box-shadow 0.25s ease, border-color 0.25s ease;
                        margin-bottom: 64px;
                    }

                    .ceo-card:hover {
                        box-shadow: 0 20px 48px rgba(0,0,0,0.35);
                        border-color: rgba(77, 216, 232, 0.4);
                    }

                    .ceo-card:hover .ceo-accent-line {
                        opacity: 1 !important;
                    }

                    .ceo-photo-area {
                        position: relative;
                        overflow: hidden;
                        min-height: 420px;
                        background: linear-gradient(180deg, #1a2235 0%, #0f1720 100%);
                    }

                    .ceo-content-area {
                        padding: 48px 44px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        gap: 16px;
                        text-align: left;
                    }

                    @media (max-width: 1023px) {
                        .ceo-card {
                            grid-template-columns: 1fr;
                        }
                        .ceo-photo-area {
                            min-height: 320px;
                            aspect-ratio: 4/3;
                        }
                        .ceo-content-area {
                            padding: 32px 28px;
                        }
                    }

                    @media (max-width: 639px) {
                        .ceo-content-area {
                            padding: 28px 20px;
                        }
                    }

                    /* Board of Advisors Grid & Cards */
                    .advisors-grid {
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        gap: 24px;
                        flex-wrap: wrap;
                    }

                    .advisor-card {
                        background: #161B22;
                        border: 1px solid rgba(255, 255, 255, 0.07);
                        border-radius: 16px;
                        padding: 0;
                        overflow: hidden;
                        position: relative;
                        width: calc(33.333% - 16px);
                        max-width: 340px;
                        transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
                        cursor: default;
                    }

                    .advisor-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 16px 40px rgba(0,0,0,0.3);
                        border-color: rgba(139, 92, 246, 0.4);
                    }

                    .advisor-card:hover .advisor-accent-line {
                        opacity: 1 !important;
                    }

                    .advisor-card:hover .advisor-dept-label {
                        filter: brightness(1.2);
                    }

                    @media (max-width: 1023px) {
                        .advisor-card {
                            width: calc(50% - 12px);
                        }
                    }

                    @media (max-width: 639px) {
                        .advisor-card {
                            width: 100%;
                            max-width: 100%;
                        }
                    }

                    /* Leadership Section Grid Layout */
                    .leadership-section-grid {
                        width: 100%;
                    }

                    .leadership-grid-top {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 24px;
                    }

                    .leadership-grid-bottom {
                        display: flex;
                        justify-content: center;
                        gap: 24px;
                        margin-top: 24px;
                    }

                    .leadership-grid-bottom .lead-card {
                        width: calc(33.333% - 16px);
                    }

                    /* Lead Card Container */
                    .lead-card {
                        background: #161B22;
                        border: 1px solid rgba(255, 255, 255, 0.07);
                        border-radius: 16px;
                        padding: 0;
                        overflow: hidden;
                        position: relative;
                        transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
                        cursor: default;
                    }

                    .lead-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 16px 40px rgba(0,0,0,0.3);
                        border-color: rgba(77, 216, 232, 0.4);
                    }

                    /* Hover animations */
                    .lead-card:hover .lead-accent-line {
                        opacity: 1 !important;
                    }

                    .lead-card:hover .lead-dept-label {
                        filter: brightness(1.2);
                    }

                    /* LinkedIn button hover */
                    .lead-linkedin-btn:hover {
                        background: #0A66C2 !important;
                        border-color: #0A66C2 !important;
                    }
                    .lead-linkedin-btn:hover svg path {
                        fill: #ffffff !important;
                    }

                    /* Responsive overrides */
                    @media (max-width: 1023px) {
                        .leadership-section-grid {
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: center;
                            gap: 24px;
                        }
                        .leadership-grid-top, .leadership-grid-bottom {
                            display: contents;
                        }
                        .leadership-section-grid .lead-card {
                            width: calc(50% - 12px);
                            min-width: 280px;
                        }
                    }

                    @media (max-width: 639px) {
                        .leadership-section-grid .lead-card {
                            width: 100%;
                            min-width: unset;
                        }
                    }

                    @media (prefers-reduced-motion: reduce) {
                        .lead-card {
                            transform: none !important;
                            transition: none !important;
                        }
                    }

                    /* Team Card — base */
                    .team-card {
                        width: 260px;
                        min-height: 320px;
                        box-sizing: border-box;
                        background: #161B22;
                        border: 1px solid rgba(255, 255, 255, 0.07);
                        border-radius: 16px;
                        padding: 28px 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                        gap: 0;
                        position: relative;
                        overflow: hidden;
                        flex-shrink: 0;
                        transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
                        cursor: default;
                    }

                    .team-card:hover {
                        transform: translateY(-5px);
                        border-color: rgba(77, 216, 232, 0.35);
                        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
                    }

                    .team-card:hover .team-tooltip {
                        opacity: 1 !important;
                    }

                    .team-card:hover .card-accent-line {
                        opacity: 1 !important;
                    }

                    .team-tooltip {
                        position: absolute;
                        top: -36px;
                        left: 50%;
                        transform: translateX(-50%);
                        background: rgba(10, 13, 17, 0.9);
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        border-radius: 6px;
                        padding: 5px 10px;
                        font-family: var(--font-mono);
                        font-size: 10px;
                        letter-spacing: 0.06em;
                        color: #ffffff;
                        white-space: nowrap;
                        opacity: 0;
                        pointer-events: none;
                        transition: opacity 0.2s ease;
                        z-index: 10;
                    }

                    @media (prefers-reduced-motion: reduce) {
                        * {
                            animation: none !important;
                            transition: none !important;
                        }
                    }

                    /* LinkedIn icon hover */
                    .linkedin-icon-btn:hover {
                        background: #0A66C2 !important;
                        border-color: #0A66C2 !important;
                    }
                    .linkedin-icon-btn:hover svg path {
                        fill: #ffffff !important;
                    }
                `}} />
                <div className="container">

                    {/* Section Header */}
                    <div style={{ textAlign: "center", marginBottom: "64px" }}>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: shouldReduce ? 0.01 : 0.4 }}
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "11px",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "#4DD8E8",
                                display: "block",
                                marginBottom: "12px"
                            }}
                        >
                            // Our Leadership
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: shouldReduce ? 0.01 : 0.5, delay: shouldReduce ? 0 : 0.1 }}
                            style={{
                                fontSize: "clamp(2rem, 3.5vw, 2.6rem)",
                                fontWeight: 700,
                                color: "#ffffff",
                                marginBottom: "16px",
                                lineHeight: "1.25",
                                letterSpacing: "-0.02em"
                            }}
                        >
                            Meet Our Leadership Team
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: shouldReduce ? 0.01 : 0.4, delay: shouldReduce ? 0 : 0.25 }}
                            style={{
                                fontSize: "1.1rem",
                                lineHeight: 1.7,
                                maxWidth: "580px",
                                margin: "0 auto",
                                color: "#94A3B8"
                            }}
                        >
                            Our experienced professionals are dedicated to delivering excellence, innovation, and outstanding results for our clients.
                        </motion.p>
                    </div>

                    {/* CEO Spotlight Card */}
                    <motion.div
                        initial={{ opacity: 0, y: shouldReduce ? 0 : 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: shouldReduce ? 0.01 : 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="ceo-card"
                    >
                        {/* Top Accent Line */}
                        <div className="ceo-accent-line" style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "3px",
                            borderRadius: "16px 16px 0 0",
                            background: "linear-gradient(90deg, #4DD8E8 0%, #FF8A3D 50%, #4DD8E8 100%)",
                            opacity: 0.85,
                            transition: "opacity 0.25s ease",
                            zIndex: 2
                        }} />

                        {/* LEFT SIDE — PHOTO AREA */}
                        <div className="ceo-photo-area">
                            <Image
                                src="/images/team/prashant_deshpande.png"
                                alt="Prashant Deshpande"
                                fill
                                sizes="(max-width: 1023px) 100vw, 380px"
                                priority
                                style={{
                                    objectFit: "cover",
                                    objectPosition: "center top",
                                    display: "block",
                                    mixBlendMode: "luminosity",
                                    opacity: 0.92
                                }}
                            />
                            {/* Bottom Gradient Overlay */}
                            <div style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: "35%",
                                background: "linear-gradient(to bottom, transparent, rgba(13, 19, 35, 0.55))",
                                pointerEvents: "none"
                            }} />
                        </div>

                        {/* RIGHT SIDE — CONTENT AREA */}
                        <div className="ceo-content-area">
                            {/* A) DEPARTMENT TAG */}
                            <span style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "10px",
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                fontWeight: 600,
                                color: "#4DD8E8",
                                marginBottom: "4px"
                            }}>
                                Chief Executive Officer
                            </span>

                            {/* B) NAME */}
                            <h3 style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
                                fontWeight: 800,
                                letterSpacing: "-0.02em",
                                color: "#F1F5F9",
                                lineHeight: 1.1,
                                margin: 0
                            }}>
                                Prashant Deshpande
                            </h3>

                            {/* C) TITLE */}
                            <p style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "11.5px",
                                letterSpacing: "0.07em",
                                textTransform: "uppercase",
                                color: "#FF8A3D",
                                marginBottom: "4px",
                                marginTop: 0
                            }}>
                                Founder, CEO & Managing Director
                            </p>

                            {/* D) DIVIDER */}
                            <div style={{
                                width: "40px",
                                height: "2px",
                                background: "linear-gradient(90deg, #4DD8E8, #FF8A3D)",
                                borderRadius: "1px",
                                margin: 0
                            }} />

                            {/* E) BIO TEXT */}
                            <p style={{
                                fontSize: "0.97rem",
                                lineHeight: 1.75,
                                color: "#94A3B8",
                                maxWidth: "500px",
                                margin: 0
                            }}>
                                25+ years in automotive, embedded software, engineering delivery, business development, global customer management, and connected mobility solutions.
                            </p>

                            {/* F) STATS ROW */}
                            <div style={{ display: "flex", gap: "32px", marginTop: "8px" }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <span style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "1.7rem",
                                        fontWeight: 800,
                                        letterSpacing: "-0.02em",
                                        color: "#F1F5F9",
                                        lineHeight: 1
                                    }}>25+</span>
                                    <span style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "10px",
                                        letterSpacing: "0.07em",
                                        textTransform: "uppercase",
                                        color: "#94A3B8",
                                        display: "block",
                                        marginTop: "5px"
                                    }}>Years Experience</span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <span style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "1.7rem",
                                        fontWeight: 800,
                                        letterSpacing: "-0.02em",
                                        color: "#F1F5F9",
                                        lineHeight: 1
                                    }}>50+</span>
                                    <span style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "10px",
                                        letterSpacing: "0.07em",
                                        textTransform: "uppercase",
                                        color: "#94A3B8",
                                        display: "block",
                                        marginTop: "5px"
                                    }}>Engineers Led</span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <span style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "1.7rem",
                                        fontWeight: 800,
                                        letterSpacing: "-0.02em",
                                        color: "#F1F5F9",
                                        lineHeight: 1
                                    }}>3</span>
                                    <span style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "10px",
                                        letterSpacing: "0.07em",
                                        textTransform: "uppercase",
                                        color: "#94A3B8",
                                        display: "block",
                                        marginTop: "5px"
                                    }}>Global Regions</span>
                                </div>
                            </div>

                            {/* G) LINKEDIN ROW */}
                            <div style={{
                                marginTop: "20px",
                                paddingTop: "18px",
                                borderTop: "1px solid rgba(255, 255, 255, 0.04)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                <span style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "10px",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    color: "rgba(255, 255, 255, 0.36)"
                                }}>
                                    View Profile
                                </span>
                                <a
                                    href="https://www.linkedin.com/in/prashant-deshpande-samsan/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Prashant Deshpande on LinkedIn"
                                    className="lead-linkedin-btn"
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "6px",
                                        background: "rgba(255, 255, 255, 0.06)",
                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        transition: "all 0.2s ease",
                                        textDecoration: "none"
                                    }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path d={LINKEDIN_SVG_PATH} fill="#94A3B8" style={{ transition: "fill 0.2s" }} />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Board of Advisors Sub-section */}
                    <div style={{ marginBottom: "64px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px", justifyContent: "center" }}>
                            {/* Left Decorative Line */}
                            <div style={{ flex: 1, height: "1px", background: "linear-gradient(270deg, rgba(139, 92, 246, 0.3), transparent)" }} />
                            {/* Pill */}
                            <div style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "8px 18px",
                                borderRadius: "24px",
                                border: "1px solid rgba(139, 92, 246, 0.3)",
                                backgroundColor: "rgba(139, 92, 246, 0.06)",
                                color: "#8B5CF6",
                                flexShrink: 0
                            }}>
                                <div style={{
                                    width: "7px",
                                    height: "7px",
                                    borderRadius: "50%",
                                    backgroundColor: "#8B5CF6",
                                    flexShrink: 0
                                }} />
                                <span style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "12px",
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    fontWeight: 600
                                }}>
                                    Board of Advisors
                                </span>
                            </div>
                            {/* Right Decorative Line */}
                            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(139, 92, 246, 0.3), transparent)" }} />
                        </div>

                        {/* Advisors Grid */}
                        <motion.div
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: shouldReduce ? 0 : 0.08
                                    }
                                }
                            }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="advisors-grid"
                        >
                            {[
                                {
                                    name: "Ashok Saraf",
                                    role: "Senior Advisor — Strategy & Growth",
                                    dept: "Senior Advisor",
                                    imagePath: "/images/team/ashok_saraf.png",
                                    accentColor: "#8B5CF6",
                                    linkedinUrl: ""
                                },
                                {
                                    name: "Anil Patwardhan",
                                    role: "Senior Advisor — Technology & Governance",
                                    dept: "Senior Advisor",
                                    imagePath: "/images/team/anil_patwardhan.png",
                                    accentColor: "#8B5CF6",
                                    linkedinUrl: ""
                                }
                            ].map((member) => (
                                <motion.div
                                    key={member.name}
                                    variants={{
                                        hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: shouldReduce ? 0.01 : 0.5,
                                                ease: [0.25, 0.46, 0.45, 0.94]
                                            }
                                        }
                                    }}
                                    className="advisor-card"
                                >
                                    {/* Top Accent Line */}
                                    <div className="advisor-accent-line" style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: "3px",
                                        borderRadius: "16px 16px 0 0",
                                        background: member.accentColor,
                                        opacity: 0.7,
                                        transition: "opacity 0.25s ease"
                                    }} />

                                    {/* Photo Area */}
                                    <div style={{
                                        width: "100%",
                                        aspectRatio: "1/1",
                                        position: "relative",
                                        overflow: "hidden",
                                        background: "linear-gradient(180deg, #1a2235 0%, #0f1720 100%)"
                                    }}>
                                        <Image
                                            src={member.imagePath}
                                            alt={member.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            style={{
                                                objectFit: "cover",
                                                objectPosition: "center top",
                                                display: "block",
                                                mixBlendMode: "luminosity",
                                                opacity: 0.92
                                            }}
                                        />
                                        {/* Bottom Gradient Overlay */}
                                        <div style={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: "40%",
                                            background: "linear-gradient(to bottom, transparent, rgba(13, 19, 35, 0.55))",
                                            pointerEvents: "none"
                                        }} />
                                    </div>

                                    {/* Card Body */}
                                    <div style={{
                                        padding: "20px 22px 22px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "4px",
                                        textAlign: "left"
                                    }}>
                                        {/* Department Tag */}
                                        <span className="advisor-dept-label" style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "10px",
                                            letterSpacing: "0.1em",
                                            textTransform: "uppercase",
                                            fontWeight: 600,
                                            color: "#8B5CF6",
                                            marginBottom: "6px",
                                            transition: "filter 0.25s ease"
                                        }}>
                                            {member.dept}
                                        </span>

                                        {/* Name */}
                                        <h4 style={{
                                            fontFamily: "var(--font-display)",
                                            fontSize: "1.15rem",
                                            fontWeight: 700,
                                            letterSpacing: "-0.01em",
                                            color: "#F1F5F9",
                                            lineHeight: 1.2,
                                            margin: "0 0 4px 0"
                                        }}>
                                            {member.name}
                                        </h4>

                                        {/* Title */}
                                        <p style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "11px",
                                            letterSpacing: "0.06em",
                                            textTransform: "uppercase",
                                            color: "#94A3B8",
                                            lineHeight: 1.5,
                                            margin: 0
                                        }}>
                                            {member.role}
                                        </p>

                                        {/* LinkedIn Link Section */}
                                        <div style={{
                                            marginTop: "16px",
                                            paddingTop: "14px",
                                            borderTop: "1px solid rgba(255, 255, 255, 0.04)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        }}>
                                            <span style={{
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "10px",
                                                letterSpacing: "0.08em",
                                                textTransform: "uppercase",
                                                color: "rgba(255, 255, 255, 0.36)"
                                            }}>
                                                View Profile
                                            </span>
                                            {member.linkedinUrl ? (
                                                <a
                                                    href={member.linkedinUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`${member.name} on LinkedIn`}
                                                    className="lead-linkedin-btn"
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        borderRadius: "6px",
                                                        background: "rgba(255, 255, 255, 0.06)",
                                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        transition: "all 0.2s ease",
                                                        textDecoration: "none"
                                                    }}
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path d={LINKEDIN_SVG_PATH} fill="#94A3B8" style={{ transition: "fill 0.2s" }} />
                                                    </svg>
                                                </a>
                                            ) : (
                                                <div
                                                    title="LinkedIn profile not available"
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        borderRadius: "6px",
                                                        background: "rgba(255, 255, 255, 0.06)",
                                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        opacity: 0.35,
                                                        cursor: "default"
                                                    }}
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path d={LINKEDIN_SVG_PATH} fill="#94A3B8" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Leadership Team Sub-section */}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px", justifyContent: "center" }}>
                            {/* Left Decorative Line */}
                            <div style={{ flex: 1, height: "1px", background: "linear-gradient(270deg, rgba(77, 216, 232, 0.3), transparent)" }} />
                            {/* Pill */}
                            <div style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "8px 18px",
                                borderRadius: "24px",
                                border: "1px solid rgba(77,216,232,0.3)",
                                backgroundColor: "rgba(77,216,232,0.06)",
                                color: "#4DD8E8",
                                flexShrink: 0
                            }}>
                                <div style={{
                                    width: "7px",
                                    height: "7px",
                                    borderRadius: "50%",
                                    backgroundColor: "#4DD8E8",
                                    flexShrink: 0
                                }} />
                                <span style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "12px",
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    fontWeight: 600
                                }}>
                                    Leadership Team
                                </span>
                            </div>
                            {/* Right Decorative Line */}
                            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(77, 216, 232, 0.3), transparent)" }} />
                        </div>

                        {/* Leadership Grid */}
                        <motion.div
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: {
                                        staggerChildren: shouldReduce ? 0 : 0.08
                                    }
                                }
                            }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="leadership-section-grid"
                        >
                            {/* Top Row (3 cards) */}
                            <div className="leadership-grid-top">
                                {leadershipMembers.slice(0, 3).map((member) => (
                                    <motion.div
                                        key={member.name}
                                        variants={{
                                            hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
                                            visible: {
                                                opacity: 1,
                                                y: 0,
                                                transition: {
                                                    duration: shouldReduce ? 0.01 : 0.5,
                                                    ease: [0.25, 0.46, 0.45, 0.94]
                                                }
                                            }
                                        }}
                                        className="lead-card"
                                    >
                                        {/* Top Accent Line */}
                                        <div className="lead-accent-line" style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: "3px",
                                            borderRadius: "16px 16px 0 0",
                                            background: member.glowColor,
                                            opacity: 0.7,
                                            transition: "opacity 0.25s ease"
                                        }} />

                                        {/* Photo Area */}
                                        <div style={{
                                            width: "100%",
                                            aspectRatio: "1/1",
                                            position: "relative",
                                            overflow: "hidden",
                                            background: "linear-gradient(180deg, #1a2235 0%, #0f1720 100%)"
                                        }}>
                                            <Image
                                                src={member.imagePath}
                                                alt={member.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                style={{
                                                    objectFit: "cover",
                                                    objectPosition: "center top",
                                                    display: "block",
                                                    mixBlendMode: "luminosity",
                                                    opacity: 0.92
                                                }}
                                            />
                                            {/* Bottom Gradient Overlay */}
                                            <div style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                height: "40%",
                                                background: "linear-gradient(to bottom, transparent, rgba(13, 19, 35, 0.55))",
                                                pointerEvents: "none"
                                            }} />
                                        </div>

                                        {/* Card Body */}
                                        <div className="lead-card-body" style={{
                                            padding: "20px 22px 22px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "4px",
                                            textAlign: "left"
                                        }}>
                                            {/* Department Label */}
                                            <span className="lead-dept-label" style={{
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "10px",
                                                letterSpacing: "0.1em",
                                                textTransform: "uppercase",
                                                fontWeight: 600,
                                                color: member.glowColor,
                                                marginBottom: "6px",
                                                transition: "filter 0.25s ease"
                                            }}>
                                                {member.dept}
                                            </span>
                                            {/* Name */}
                                            <h4 style={{
                                                fontFamily: "var(--font-display)",
                                                fontSize: "1.15rem",
                                                fontWeight: 700,
                                                letterSpacing: "-0.01em",
                                                color: "#F1F5F9",
                                                lineHeight: 1.2,
                                                margin: "0 0 4px 0"
                                            }}>
                                                {member.name}
                                            </h4>
                                            {/* Title */}
                                            <p style={{
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "11px",
                                                letterSpacing: "0.06em",
                                                textTransform: "uppercase",
                                                color: "#94A3B8",
                                                lineHeight: 1.5,
                                                margin: 0
                                            }}>
                                                {member.role}
                                            </p>

                                            {/* LinkedIn Link Section */}
                                            <div style={{
                                                marginTop: "16px",
                                                paddingTop: "14px",
                                                borderTop: "1px solid rgba(255, 255, 255, 0.04)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between"
                                            }}>
                                                <span style={{
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "10px",
                                                    letterSpacing: "0.08em",
                                                    textTransform: "uppercase",
                                                    color: "rgba(255, 255, 255, 0.36)"
                                                }}>
                                                    View Profile
                                                </span>
                                                <a
                                                    href={member.linkedinUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`${member.name} on LinkedIn`}
                                                    className="lead-linkedin-btn"
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        borderRadius: "6px",
                                                        background: "rgba(255, 255, 255, 0.06)",
                                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        transition: "all 0.2s ease",
                                                        textDecoration: "none"
                                                    }}
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path d={LINKEDIN_SVG_PATH} fill="#94A3B8" style={{ transition: "fill 0.2s" }} />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Bottom Row (2 cards centered) */}
                            <div className="leadership-grid-bottom">
                                {leadershipMembers.slice(3).map((member) => (
                                    <motion.div
                                        key={member.name}
                                        variants={{
                                            hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
                                            visible: {
                                                opacity: 1,
                                                y: 0,
                                                transition: {
                                                    duration: shouldReduce ? 0.01 : 0.5,
                                                    ease: [0.25, 0.46, 0.45, 0.94]
                                                }
                                            }
                                        }}
                                        className="lead-card"
                                    >
                                        {/* Top Accent Line */}
                                        <div className="lead-accent-line" style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: "3px",
                                            borderRadius: "16px 16px 0 0",
                                            background: member.glowColor,
                                            opacity: 0.7,
                                            transition: "opacity 0.25s ease"
                                        }} />

                                        {/* Photo Area */}
                                        <div style={{
                                            width: "100%",
                                            aspectRatio: "1/1",
                                            position: "relative",
                                            overflow: "hidden",
                                            background: "linear-gradient(180deg, #1a2235 0%, #0f1720 100%)"
                                        }}>
                                            <Image
                                                src={member.imagePath}
                                                alt={member.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                style={{
                                                    objectFit: "cover",
                                                    objectPosition: "center top",
                                                    display: "block",
                                                    mixBlendMode: "luminosity",
                                                    opacity: 0.92
                                                }}
                                            />
                                            {/* Bottom Gradient Overlay */}
                                            <div style={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                height: "40%",
                                                background: "linear-gradient(to bottom, transparent, rgba(13, 19, 35, 0.55))",
                                                pointerEvents: "none"
                                            }} />
                                        </div>

                                        {/* Card Body */}
                                        <div className="lead-card-body" style={{
                                            padding: "20px 22px 22px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "4px",
                                            textAlign: "left"
                                        }}>
                                            {/* Department Label */}
                                            <span className="lead-dept-label" style={{
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "10px",
                                                letterSpacing: "0.1em",
                                                textTransform: "uppercase",
                                                fontWeight: 600,
                                                color: member.glowColor,
                                                marginBottom: "6px",
                                                transition: "filter 0.25s ease"
                                            }}>
                                                {member.dept}
                                            </span>
                                            {/* Name */}
                                            <h4 style={{
                                                fontFamily: "var(--font-display)",
                                                fontSize: "1.15rem",
                                                fontWeight: 700,
                                                letterSpacing: "-0.01em",
                                                color: "#F1F5F9",
                                                lineHeight: 1.2,
                                                margin: "0 0 4px 0"
                                            }}>
                                                {member.name}
                                            </h4>
                                            {/* Title */}
                                            <p style={{
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "11px",
                                                letterSpacing: "0.06em",
                                                textTransform: "uppercase",
                                                color: "#94A3B8",
                                                lineHeight: 1.5,
                                                margin: 0
                                            }}>
                                                {member.role}
                                            </p>

                                            {/* LinkedIn Link Section */}
                                            <div style={{
                                                marginTop: "16px",
                                                paddingTop: "14px",
                                                borderTop: "1px solid rgba(255, 255, 255, 0.04)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between"
                                            }}>
                                                <span style={{
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "10px",
                                                    letterSpacing: "0.08em",
                                                    textTransform: "uppercase",
                                                    color: "rgba(255, 255, 255, 0.36)"
                                                }}>
                                                    View Profile
                                                </span>
                                                <a
                                                    href={member.linkedinUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`${member.name} on LinkedIn`}
                                                    className="lead-linkedin-btn"
                                                    style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        borderRadius: "6px",
                                                        background: "rgba(255, 255, 255, 0.06)",
                                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        transition: "all 0.2s ease",
                                                        textDecoration: "none"
                                                    }}
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path d={LINKEDIN_SVG_PATH} fill="#94A3B8" style={{ transition: "fill 0.2s" }} />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA Section */}
            <section className="section-dark" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#0A0D11", padding: "100px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
                {/* Background Glow */}
                <div style={{
                    position: "absolute",
                    bottom: "0",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "600px",
                    height: "300px",
                    background: "radial-gradient(circle, rgba(77, 216, 232, 0.06) 0%, transparent 70%)",
                    pointerEvents: "none"
                }} />

                <div className="container">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: shouldReduce ? 0.01 : 0.5 }}
                        style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}
                    >
                        <h2 style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.2rem)", fontWeight: 700, margin: 0, color: "#ffffff", letterSpacing: "-0.02em" }}>
                            Ready to power your next engineering program?
                        </h2>
                        <p style={{ fontSize: "1rem", lineHeight: "1.7", color: "#94A3B8", maxWidth: "480px", margin: "0 auto" }}>
                            Connect with SAMSAN Technische Labs to establish your dedicated COE or leverage our vehicle systems experts.
                        </p>
                        <Link href="/contact" className="btn btn-primary" style={{ display: "inline-flex", textDecoration: "none", background: "#E8521A", color: "#FFFFFF" }}>
                            Get Started
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
