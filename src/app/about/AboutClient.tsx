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

const globalHubs = [
    {
        region: "India (HQ)",
        city: "Pune (HQ)",
        address: "STPI New Building, Rajiv Gandhi Infotech Park, Phase I, Hinjawadi Pune - 411057",
        phone: "8956927909",
        email: "india@samsanlabs.com",
        mapQuery: "STPI, Rajiv Gandhi Infotech Park, Hinjawadi, Pune, Maharashtra 411057",
        coordinates: "18.5662° N, 73.7337° E",
        tagColor: "#4DD8E8"
    },
    {
        region: "India",
        city: "Bengaluru",
        address: "MSRIT Post, M S Ramaiah Nagar, MSR Nagar, Bengaluru, Karnataka - 560054",
        phone: "+91-895-692-7909",
        email: "india@samsanlabs.com",
        mapQuery: "M. S. Ramaiah Institute of Technology, Bengaluru, Karnataka 560054",
        coordinates: "13.0305° N, 77.5649° E",
        tagColor: "#4DD8E8"
    },
    {
        region: "United States",
        city: "Detroit",
        address: "Detroit Hub, Michigan, USA",
        email: "usa@samsanlabs.com",
        mapQuery: "Detroit, Michigan, USA",
        coordinates: "42.3314° N, 83.0458° W",
        tagColor: "#E8521A"
    },
    {
        region: "Europe / Germany",
        city: "Munich",
        address: "Europe / Germany Hub, Leopoldstraße, Germany",
        email: "europe@samsanlabs.com",
        mapQuery: "Leopoldstraße 244, 80807 München, Germany",
        coordinates: "48.1764° N, 11.5901° E",
        tagColor: "#3B82F6"
    },
    {
        region: "Japan",
        city: "Tokyo",
        address: "Tokyo Hub, Shibuya, Japan",
        email: "japan@samsanlabs.com",
        mapQuery: "Shibuya, Tokyo, Japan",
        coordinates: "35.6580° N, 139.7016° E",
        tagColor: "#10B981"
    },
    {
        region: "South Korea",
        city: "Seongnam",
        address: "28, hwangsaeul-ro 200 beAon-gil, Bundang-gu, Seongnam-si, Gyeonggi-do, Korea",
        phone: "+82-10-9779-5698",
        email: "india@samsanlabs.com",
        mapQuery: "28, Hwangsaeul-ro 200beon-gil, Bundang-gu, Seongnam-si, Gyeonggi-do, South Korea",
        coordinates: "37.3828° N, 127.1189° E",
        tagColor: "#A855F7"
    }
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

export default function AboutClient() {
    const shouldReduce = !!useReducedMotion();
    const [activeHub, setActiveHub] = useState(globalHubs[0]);

    const leadershipMembers = [
        {
            name: "V. SHANKARAN",
            role: "Engineering Director — Embedded",
            dept: "Embedded Engineering",
            imagePath: "/images/team/v_shankaran.png",
            glowColor: "#4DD8E8",
            linkedinUrl: "https://www.linkedin.com/in/shankaran-venugopalan-92759611/"
        },
        {
            name: "SHRIDHAR POPHALI ",
            role: "Engineering Director — Cockpit",
            dept: "Digital Cockpit & SDV",
            imagePath: "/images/team/shridhar_pophali.jpg",
            glowColor: "#4DD8E8",
            linkedinUrl: "https://www.linkedin.com/in/shridharpophali/"
        },
        {
            name: "SANJAY HEJIB",
            role: "Chief Operating Officer",
            dept: "Executive Leadership",
            imagePath: "/images/team/Sanjay.jpeg",
            glowColor: "#4DD8E8",
            linkedinUrl: "https://www.linkedin.com/in/sanjay-hejib-141a4a15/"
        },
        {
            name: "DR. PRADEEP BILURKAR",
            role: "Chief Data Scientist",
            dept: "Data & AI",
            imagePath: "/images/team/dr_pradeep_bilurkar.png",
            glowColor: "#4DD8E8",
            linkedinUrl: "https://www.linkedin.com/in/dr-pradeep-bilurkar-5a72922b/"
        },
        {
            name: "PRATIK WAGHMODE",
            role: "Technical Sales",
            dept: "Business Development",
            imagePath: "/images/team/pratik_waghmode.png",
            glowColor: "#4DD8E8",
            linkedinUrl: "https://www.linkedin.com/in/pratik-waghmode-742b3440/"
        },
        {
            name: "GAURAV JOSHI",
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
                paddingTop: "140px",
                paddingBottom: "96px",
                background: "var(--midnight)",
                overflow: "hidden",
                borderBottom: "none"
            }}>
                {/* Ambient glow effect */}
                <div style={{
                    position: "absolute",
                    top: "30%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "1100px", height: "550px",
                    background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(77, 216, 232, 0.12) 0%, transparent 70%)",
                    pointerEvents: "none", zIndex: 0
                }} />

                <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "1400px" }}>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: { staggerChildren: shouldReduce ? 0 : 0.1 }
                            }
                        }}
                    >


                        <motion.h1
                            id="about-heading"
                            variants={{
                                hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.01 : 0.6 } }
                            }}
                            style={{
                                fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
                                fontWeight: 800,
                                lineHeight: 1.1,
                                letterSpacing: "-0.02em",
                                marginBottom: "24px",
                                color: "#FFFFFF",
                                fontFamily: "var(--font-display)"
                            }}
                        >
                            About SAMSAN Technische Labs
                        </motion.h1>

                        <motion.p
                            className="lead"
                            variants={{
                                hidden: { opacity: 0, y: shouldReduce ? 0 : 16 },
                                visible: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.01 : 0.5 } }
                            }}
                            style={{
                                fontSize: "1.12rem",
                                lineHeight: 1.75,
                                maxWidth: "760px",
                                margin: "0 0 40px 0",
                                color: "#94A3B8",
                                fontFamily: "var(--font-body)"
                            }}
                        >
                            SAMSAN Technische Labs Pvt. Ltd. is a technology-reimagined systems design house powering global automotive megatrends with safety-critical software, digital cockpit engineering, and software-defined vehicle architectures.
                        </motion.p>

                        {/* Hero Quick Highlights Row */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0.01 : 0.5 } }
                            }}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                                gap: "16px",
                                marginTop: "24px"
                            }}
                        >
                            {[
                                { title: "2023 FOUNDED", desc: "Automotive Systems Design" },
                                { title: "50+ ENGINEERS", desc: "Architects & Systems Experts" },
                                { title: "3 REGIONS", desc: "India, Europe & Americas" },
                                { title: "ISO 26262", desc: "Functional Safety Discipline" }
                            ].map((spec, i) => (
                                <div
                                    key={i}
                                    style={{
                                        background: "rgba(16, 24, 48, 0.65)",
                                        backdropFilter: "blur(16px)",
                                        WebkitBackdropFilter: "blur(16px)",
                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                        borderRadius: "14px",
                                        padding: "18px 20px",
                                        boxShadow: "0 10px 24px rgba(0,0,0,0.2)"
                                    }}
                                >
                                    <div style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "0.76rem",
                                        fontWeight: 700,
                                        color: "#4DD8E8",
                                        letterSpacing: "0.08em",
                                        marginBottom: "4px"
                                    }}>
                                        {spec.title}
                                    </div>
                                    <div style={{
                                        fontFamily: "var(--font-body)",
                                        fontSize: "0.92rem",
                                        color: "#E2E8F0",
                                        fontWeight: 500
                                    }}>
                                        {spec.desc}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* SAMSAN Technische Labs Intro Section */}
            <section className="section-light section" style={{ background: "#FFFFFF", padding: "108px 0" }}>
                <div className="container" style={{ maxWidth: "1400px" }}>
                    <div className="about-two-col" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "64px", alignItems: "center" }}>
                        <div>
                            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.5rem)", fontWeight: 700, marginBottom: "28px", color: "#0B1320", letterSpacing: "-0.025em", fontFamily: "var(--font-display)" }}>
                                SAMSAN Technische Labs Pvt. Ltd.
                            </h2>

                            {/* Mission Block */}
                            <motion.div
                                initial={{ opacity: 0, x: shouldReduce ? 0 : -24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: shouldReduce ? 0.01 : 0.5, ease: "easeOut" }}
                                style={{
                                    borderLeft: "4px solid #E8521A",
                                    paddingLeft: "24px",
                                    marginBottom: "32px",
                                    background: "#F8FAFC",
                                    paddingTop: "16px",
                                    paddingBottom: "16px",
                                    borderRadius: "0 12px 12px 0"
                                }}
                            >
                                <div style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "11px",
                                    letterSpacing: "0.1em",
                                    color: "#E8521A",
                                    marginBottom: "8px",
                                    textTransform: "uppercase",
                                    fontWeight: 700
                                }}>
                                    Mission Statement
                                </div>
                                <div style={{
                                    fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                                    fontWeight: 600,
                                    lineHeight: "1.4",
                                    color: "#0B1320",
                                    fontFamily: "var(--font-display)"
                                }}>
                                    To design safe, connected, and intelligent systems that power the vehicle of the future.
                                </div>
                            </motion.div>

                            {/* Body Paragraphs container */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "720px" }}>
                                <p style={{
                                    fontSize: "1.05rem",
                                    lineHeight: "1.8",
                                    color: "#475569",
                                    margin: 0,
                                    fontFamily: "var(--font-body)"
                                }}>
                                    SAMSAN Technische Labs Pvt. Ltd. is an automotive engineering and digital transformation company focused on connected mobility, cockpit engineering, embedded systems, SDV platforms, AI-led engineering automation, and strategic engineering capacity for global customers.
                                </p>
                                <p style={{
                                    fontSize: "1.05rem",
                                    lineHeight: "1.8",
                                    color: "#475569",
                                    margin: 0,
                                    fontFamily: "var(--font-body)"
                                }}>
                                    Our focus is to build safety-critical software that is always reliable, secure, and ready for production, bringing systems engineering excellence to automotive megatrends.
                                </p>
                            </div>
                        </div>

                        {/* Interactive Side Graphic */}
                        <div style={{
                            background: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                            borderRadius: "16px",
                            padding: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: "360px",
                            position: "relative",
                            overflow: "hidden",
                            backgroundImage: "url('/images/ai_digital_tech.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            boxShadow: "0 12px 32px rgba(0,0,0,0.08)"
                        }}>
                            <div style={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(to top, rgba(11,19,32,0.85) 0%, rgba(11,19,32,0.2) 100%)",
                                zIndex: 1
                            }} />
                            <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                                <span className="badge" style={{ background: "rgba(255,255,255,0.2)", color: "#FFFFFF", backdropFilter: "blur(8px)", borderColor: "rgba(255,255,255,0.3)", padding: "8px 16px" }}>AI &amp; Digital Embedded Technologies</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Automotive Megatrends / Core Competencies */}
            <section className="section-light section" style={{ background: "#F8FAFC", padding: "108px 0" }}>
                <div className="container" style={{ maxWidth: "1400px" }}>
                    <div style={{ textAlign: "center", marginBottom: "56px" }}>
                        <span className="badge mint" style={{ marginBottom: "16px", fontFamily: "var(--font-mono)" }}>Core Competencies</span>
                        <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "#0B1320", fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>What We Specialize In</h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "28px" }}>
                        {megatrends.map((trend) => (
                            <div
                                key={trend.title}
                                style={{
                                    background: "#FFFFFF",
                                    border: "1px solid #E2E8F0",
                                    borderRadius: "16px",
                                    padding: "36px 30px",
                                    position: "relative",
                                    overflow: "hidden",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                                    transition: "transform 0.25s ease, boxShadow 0.25s ease, borderColor 0.25s ease"
                                }}
                            >
                                <div style={{
                                    width: "4px",
                                    height: "36px",
                                    background: trend.color,
                                    position: "absolute",
                                    left: 0,
                                    top: "36px",
                                    borderRadius: "0 4px 4px 0"
                                }} />
                                <h3 style={{ fontSize: "1.25rem", color: "#0B1320", marginBottom: "14px", fontWeight: 700, fontFamily: "var(--font-display)" }}>{trend.title}</h3>
                                <p style={{ fontSize: "0.92rem", lineHeight: "1.7", color: "#475569", margin: 0, fontFamily: "var(--font-body)" }}>{trend.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Cinematic Visual - Automotive Cockpit */}
                    <div style={{
                        marginTop: "56px",
                        width: "100%",
                        height: "380px",
                        borderRadius: "16px",
                        backgroundImage: "url('/images/auto_cockpit_sys.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                        overflow: "hidden",
                        border: "1px solid #E2E8F0",
                        boxShadow: "0 12px 36px rgba(0,0,0,0.08)"
                    }}>
                        <div style={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(to top, rgba(11,19,32,0.92) 0%, rgba(11,19,32,0.2) 100%)"
                        }} />
                        <div style={{
                            position: "absolute", bottom: "36px", left: "36px", right: "36px"
                        }}>
                            <h3 style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.85rem)", color: "#ffffff", fontWeight: 700, fontFamily: "var(--font-display)", margin: 0 }}>Next-Gen Hyper-Modern Cockpit Ecosystems</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Delivery Philosophy */}
            <section className="section-light section" style={{ background: "#FFFFFF", padding: "108px 0" }}>
                <div className="container" style={{ maxWidth: "1400px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "64px", alignItems: "start" }}>

                        {/* Vision Card */}
                        <div style={{
                            background: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                            borderRadius: "16px",
                            padding: "44px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.03)"
                        }}>
                            <span className="badge" style={{ marginBottom: "20px", color: "#E8521A", borderColor: "rgba(232, 82, 26, 0.2)", background: "rgba(232, 82, 26, 0.06)", fontFamily: "var(--font-mono)" }}>Our Vision</span>
                            <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.85rem)", fontWeight: 700, color: "#0B1320", marginBottom: "20px", lineHeight: "1.35", fontFamily: "var(--font-display)" }}>
                                To design safe, connected, and intelligent systems that power the vehicle of the future.
                            </h2>
                            <p style={{ fontSize: "0.98rem", lineHeight: "1.75", color: "#475569", fontFamily: "var(--font-body)", margin: "0 0 28px 0" }}>
                                SAMSAN bridges the gap between hardware restrictions and complex software layers. We are committed to engineering platforms that meet the highest functional safety standards while driving agile, digital-first feature delivery.
                            </p>
                            <div style={{
                                height: "220px",
                                borderRadius: "12px",
                                backgroundImage: "url('/images/embedded_engineering.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                border: "1px solid #E2E8F0"
                            }} />
                        </div>

                        {/* Why Choose Us / Delivery Philosophy */}
                        <div>
                            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)", fontWeight: 700, marginBottom: "28px", color: "#0B1320", fontFamily: "var(--font-display)" }}>Delivery Philosophy</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                                {reasons.map((reason, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            display: "flex",
                                            gap: "18px",
                                            background: "#F8FAFC",
                                            border: "1px solid #E2E8F0",
                                            borderRadius: "12px",
                                            padding: "20px 24px",
                                            alignItems: "center"
                                        }}
                                    >
                                        <div style={{
                                            width: "28px", height: "28px",
                                            borderRadius: "50%",
                                            background: "rgba(232, 82, 26, 0.12)",
                                            color: "#E8521A",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            flexShrink: 0
                                        }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8521A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <p style={{ fontSize: "0.95rem", color: "#0B1320", lineHeight: "1.5", margin: 0, fontWeight: 500, fontFamily: "var(--font-body)" }}>{reason}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Spec Sheet Section */}
            <section className="section-light section" style={{ background: "#F8FAFC", padding: "108px 0" }}>
                <div className="container" style={{ maxWidth: "960px" }}>
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span className="badge" style={{ marginBottom: "16px", color: "#E8521A", borderColor: "rgba(232, 82, 26, 0.2)", background: "rgba(232, 82, 26, 0.06)", fontFamily: "var(--font-mono)" }}>Company Profile</span>
                        <h2 style={{
                            fontSize: "clamp(1.8rem, 3vw, 2.3rem)",
                            fontWeight: 700,
                            color: "#0B1320",
                            fontFamily: "var(--font-display)"
                        }}>
                            Company Facts &amp; Specifications
                        </h2>
                    </div>

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
                            borderRadius: "16px",
                            overflow: "hidden",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.03)"
                        }}
                    >
                        {companySpecs.map((spec, idx) => (
                            <SpecRow key={spec.key} specKey={spec.key} specVal={spec.value} index={idx} shouldReduce={shouldReduce} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Leadership & Team Section */}
            <section className="section-dark" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "var(--midnight)", padding: "108px 0" }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    /* CEO Spotlight Card - Ultra Modern Glass & Ambient Glow */
                    .ceo-card {
                        width: 100%;
                        background: rgba(18, 24, 38, 0.75);
                        backdrop-filter: blur(16px);
                        -webkit-backdrop-filter: blur(16px);
                        border: 1px solid rgba(77, 216, 232, 0.18);
                        border-radius: 20px;
                        padding: 0;
                        overflow: hidden;
                        position: relative;
                        display: grid;
                        grid-template-columns: 400px 1fr;
                        align-items: stretch;
                        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                        margin-bottom: 64px;
                        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.08);
                    }

                    .ceo-card::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: radial-gradient(circle at 10% 20%, rgba(77, 216, 232, 0.08) 0%, transparent 45%),
                                    radial-gradient(circle at 90% 80%, rgba(255, 138, 61, 0.06) 0%, transparent 45%);
                        pointer-events: none;
                        z-index: 0;
                    }

                    .ceo-card:hover {
                        transform: translateY(-4px);
                        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45), 0 0 30px rgba(77, 216, 232, 0.15);
                        border-color: rgba(77, 216, 232, 0.4);
                    }

                    .ceo-card:hover .ceo-accent-line {
                        opacity: 1 !important;
                        box-shadow: 0 0 14px rgba(77, 216, 232, 0.7);
                    }

                    .ceo-photo-area {
                        position: relative;
                        overflow: hidden;
                        min-height: 480px;
                        background: radial-gradient(circle at 50% 35%, rgba(77, 216, 232, 0.15) 0%, rgba(13, 19, 35, 0.95) 85%);
                        border-right: 1px solid rgba(255, 255, 255, 0.06);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .ceo-photo-glow {
                        position: absolute;
                        width: 260px;
                        height: 260px;
                        border-radius: 50%;
                        background: radial-gradient(circle, rgba(77, 216, 232, 0.25) 0%, transparent 70%);
                        filter: blur(40px);
                        top: 20%;
                        left: 50%;
                        transform: translateX(-50%);
                        pointer-events: none;
                    }

                    .ceo-photo-badge {
                        position: absolute;
                        top: 20px;
                        left: 20px;
                        z-index: 4;
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                    }

                    .ceo-photo-badge-dot {
                        width: 7px;
                        height: 7px;
                        border-radius: 50%;
                        background: #4DD8E8;
                        box-shadow: 0 0 8px #4DD8E8;
                        animation: pulse-cyan 2s infinite;
                    }

                    @keyframes pulse-cyan {
                        0%, 100% { opacity: 1; transform: scale(1); }
                        50% { opacity: 0.5; transform: scale(1.3); }
                    }

                    .ceo-content-area {
                        padding: 44px 48px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        gap: 18px;
                        text-align: left;
                        position: relative;
                        z-index: 1;
                    }

                    .ceo-vision-quote {
                        position: relative;
                        padding: 14px 18px;
                        background: rgba(255, 255, 255, 0.025);
                        border-left: 3px solid #4DD8E8;
                        border-radius: 0 10px 10px 0;
                        font-style: italic;
                        font-size: 0.92rem;
                        line-height: 1.6;
                        color: #CBD5E1;
                    }

                    .ceo-stat-card {
                        flex: 1;
                        background: rgba(255, 255, 255, 0.03);
                        border: 1px solid rgba(255, 255, 255, 0.07);
                        border-radius: 12px;
                        padding: 14px 16px;
                        transition: all 0.25s ease;
                        display: flex;
                        flex-direction: column;
                        gap: 4px;
                    }

                    .ceo-stat-card:hover {
                        background: rgba(77, 216, 232, 0.06);
                        border-color: rgba(77, 216, 232, 0.25);
                        transform: translateY(-2px);
                    }

                    @media (max-width: 1023px) {
                        .ceo-card {
                            grid-template-columns: 1fr;
                        }
                        .ceo-photo-area {
                            min-height: 360px;
                            aspect-ratio: 4/3;
                            border-right: none;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                        }
                        .ceo-content-area {
                            padding: 36px 28px;
                        }
                    }

                    @media (max-width: 639px) {
                        .ceo-content-area {
                            padding: 28px 20px;
                        }
                        .ceo-stats-grid {
                            grid-template-columns: 1fr !important;
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
                        <span className="badge" style={{ marginBottom: "16px", color: "#4DD8E8", borderColor: "rgba(77, 216, 232, 0.25)", background: "rgba(77, 216, 232, 0.08)", fontFamily: "var(--font-mono)" }}>Our Leadership</span>
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
                                letterSpacing: "-0.02em",
                                fontFamily: "var(--font-display)"
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
                        {/* Top Animated Accent Line */}
                        <div className="ceo-accent-line" style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "3px",
                            borderRadius: "20px 20px 0 0",
                            background: "linear-gradient(90deg, #4DD8E8 0%, #FF8A3D 50%, #3B82F6 100%)",
                            opacity: 0.85,
                            transition: "opacity 0.25s ease",
                            zIndex: 2
                        }} />

                        {/* LEFT SIDE — PHOTO AREA */}
                        <div className="ceo-photo-area">
                            {/* Ambient Light Halo */}
                            <div className="ceo-photo-glow" />

                            <Image
                                src="/images/team/prashant_deshpande.png"
                                alt="PRASHANT DESHPANDE"
                                fill
                                sizes="(max-width: 1023px) 100vw, 400px"
                                priority
                                style={{
                                    objectFit: "cover",
                                    objectPosition: "center top",
                                    display: "block",
                                    mixBlendMode: "luminosity",
                                    opacity: 0.94,
                                    zIndex: 1
                                }}
                            />

                            {/* Gradient Fade Overlay */}
                            <div style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: "40%",
                                background: "linear-gradient(to bottom, transparent 0%, rgba(13, 19, 35, 0.85) 100%)",
                                pointerEvents: "none",
                                zIndex: 2
                            }} />
                        </div>

                        {/* RIGHT SIDE — CONTENT AREA */}
                        <div className="ceo-content-area">
                            {/* A) NAME */}
                            <h3 style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(2rem, 3vw, 2.6rem)",
                                fontWeight: 800,
                                letterSpacing: "-0.02em",
                                color: "#F8FAFC",
                                lineHeight: 1.1,
                                margin: 0
                            }}>
                                PRASHANT DESHPANDE
                            </h3>

                            {/* B) TITLE */}
                            <p style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "11.5px",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: "#FF8A3D",
                                fontWeight: 600,
                                margin: 0
                            }}>
                                Founder, CEO &amp; Managing Director
                            </p>

                            {/* C) EXECUTIVE VISION QUOTE */}
                            <div className="ceo-vision-quote">
                                &ldquo;Pioneering intelligent automotive software &amp; connected mobility solutions with 25+ years of engineering rigor and global customer vision.&rdquo;
                            </div>

                            {/* F) STATS GRID */}
                            <div className="ceo-stats-grid" style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: "12px",
                                marginTop: "4px"
                            }}>
                                <div className="ceo-stat-card">
                                    <span style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "1.65rem",
                                        fontWeight: 800,
                                        letterSpacing: "-0.02em",
                                        background: "linear-gradient(135deg, #FFFFFF 0%, #4DD8E8 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        lineHeight: 1
                                    }}>25+</span>
                                    <span style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "9.5px",
                                        letterSpacing: "0.07em",
                                        textTransform: "uppercase",
                                        color: "#94A3B8",
                                        marginTop: "4px"
                                    }}>Years Experience</span>
                                </div>
                                <div className="ceo-stat-card">
                                    <span style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "1.65rem",
                                        fontWeight: 800,
                                        letterSpacing: "-0.02em",
                                        background: "linear-gradient(135deg, #FFFFFF 0%, #FF8A3D 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        lineHeight: 1
                                    }}>50+</span>
                                    <span style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "9.5px",
                                        letterSpacing: "0.07em",
                                        textTransform: "uppercase",
                                        color: "#94A3B8",
                                        marginTop: "4px"
                                    }}>Engineers Led</span>
                                </div>
                                <div className="ceo-stat-card">
                                    <span style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "1.65rem",
                                        fontWeight: 800,
                                        letterSpacing: "-0.02em",
                                        background: "linear-gradient(135deg, #FFFFFF 0%, #3B82F6 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        lineHeight: 1
                                    }}>3</span>
                                    <span style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "9.5px",
                                        letterSpacing: "0.07em",
                                        textTransform: "uppercase",
                                        color: "#94A3B8",
                                        marginTop: "4px"
                                    }}>Global Regions</span>
                                </div>
                            </div>

                            {/* G) LINKEDIN ACTION ROW */}
                            <div style={{
                                marginTop: "8px",
                                paddingTop: "16px",
                                borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end"
                            }}>
                                <a
                                    href="https://www.linkedin.com/in/prashant-deshpande-samsan/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Prashant Deshpande on LinkedIn"
                                    className="linkedin-icon-btn"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        padding: "8px 16px",
                                        borderRadius: "10px",
                                        background: "rgba(10, 102, 194, 0.15)",
                                        border: "1px solid rgba(10, 102, 194, 0.35)",
                                        color: "#38BDF8",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        fontFamily: "var(--font-mono)",
                                        textDecoration: "none",
                                        transition: "all 0.25s ease"
                                    }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path d={LINKEDIN_SVG_PATH} fill="currentColor" />
                                    </svg>
                                    <span>Connect on LinkedIn</span>
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
                                    name: "ASHOK SARAF",
                                    role: "Senior Advisor — Strategy & Growth",
                                    dept: "Senior Advisor",
                                    imagePath: "/images/team/ashok_saraf.png",
                                    accentColor: "#8B5CF6",
                                    linkedinUrl: ""
                                },
                                {
                                    name: "ANIL PATWARDHAN",
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
                                        padding: "22px 24px 24px",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center"
                                    }}>
                                        {/* Centered Name */}
                                        <h4 style={{
                                            fontFamily: "var(--font-display)",
                                            fontSize: "1.25rem",
                                            fontWeight: 700,
                                            letterSpacing: "-0.015em",
                                            color: "#F8FAFC",
                                            lineHeight: 1.25,
                                            margin: "0 0 6px 0",
                                            textAlign: "center"
                                        }}>
                                            {member.name}
                                        </h4>

                                        {/* Centered Title / Role */}
                                        <p style={{
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "0.9rem",
                                            fontWeight: 500,
                                            color: "#94A3B8",
                                            lineHeight: 1.45,
                                            margin: 0,
                                            textAlign: "center"
                                        }}>
                                            {member.role}
                                        </p>

                                        {/* Bottom Action Row: View Profile + LinkedIn Link */}
                                        <div style={{
                                            marginTop: "18px",
                                            paddingTop: "14px",
                                            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        }}>
                                            <span style={{
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "0.85rem",
                                                fontWeight: 500,
                                                color: "#64748B"
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
                                                        width: "36px",
                                                        height: "36px",
                                                        borderRadius: "8px",
                                                        background: "rgba(255, 255, 255, 0.08)",
                                                        border: "1px solid rgba(255, 255, 255, 0.12)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        transition: "all 0.2s ease",
                                                        textDecoration: "none"
                                                    }}
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path d={LINKEDIN_SVG_PATH} fill="#94A3B8" style={{ transition: "fill 0.2s" }} />
                                                    </svg>
                                                </a>
                                            ) : (
                                                <div
                                                    title="LinkedIn profile not available"
                                                    style={{
                                                        width: "36px",
                                                        height: "36px",
                                                        borderRadius: "8px",
                                                        background: "rgba(255, 255, 255, 0.08)",
                                                        border: "1px solid rgba(255, 255, 255, 0.12)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        opacity: 0.35,
                                                        cursor: "default"
                                                    }}
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
                                            padding: "22px 24px 24px",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            textAlign: "center"
                                        }}>
                                            {/* Centered Name */}
                                            <h4 style={{
                                                fontFamily: "var(--font-display)",
                                                fontSize: "1.25rem",
                                                fontWeight: 700,
                                                letterSpacing: "-0.015em",
                                                color: "#F8FAFC",
                                                lineHeight: 1.25,
                                                margin: "0 0 6px 0",
                                                textAlign: "center"
                                            }}>
                                                {member.name}
                                            </h4>
                                            {/* Centered Title / Role */}
                                            <p style={{
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "0.9rem",
                                                fontWeight: 500,
                                                color: "#94A3B8",
                                                lineHeight: 1.45,
                                                margin: 0,
                                                textAlign: "center"
                                            }}>
                                                {member.role}
                                            </p>

                                            {/* Bottom Action Row: View Profile + LinkedIn Link */}
                                            <div style={{
                                                marginTop: "18px",
                                                paddingTop: "14px",
                                                borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                                                width: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between"
                                            }}>
                                                <span style={{
                                                    fontFamily: "var(--font-sans)",
                                                    fontSize: "0.85rem",
                                                    fontWeight: 500,
                                                    color: "#64748B"
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
                                                        width: "36px",
                                                        height: "36px",
                                                        borderRadius: "8px",
                                                        background: "rgba(255, 255, 255, 0.08)",
                                                        border: "1px solid rgba(255, 255, 255, 0.12)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        transition: "all 0.2s ease",
                                                        textDecoration: "none"
                                                    }}
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
                                            padding: "22px 24px 24px",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            textAlign: "center"
                                        }}>
                                            {/* Centered Name */}
                                            <h4 style={{
                                                fontFamily: "var(--font-display)",
                                                fontSize: "1.25rem",
                                                fontWeight: 700,
                                                letterSpacing: "-0.015em",
                                                color: "#F8FAFC",
                                                lineHeight: 1.25,
                                                margin: "0 0 6px 0",
                                                textAlign: "center"
                                            }}>
                                                {member.name}
                                            </h4>
                                            {/* Centered Title / Role */}
                                            <p style={{
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "0.9rem",
                                                fontWeight: 500,
                                                color: "#94A3B8",
                                                lineHeight: 1.45,
                                                margin: 0,
                                                textAlign: "center"
                                            }}>
                                                {member.role}
                                            </p>

                                            {/* Bottom Action Row: View Profile + LinkedIn Link */}
                                            <div style={{
                                                marginTop: "18px",
                                                paddingTop: "14px",
                                                borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                                                width: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between"
                                            }}>
                                                <span style={{
                                                    fontFamily: "var(--font-sans)",
                                                    fontSize: "0.85rem",
                                                    fontWeight: 500,
                                                    color: "#64748B"
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
                                                        width: "36px",
                                                        height: "36px",
                                                        borderRadius: "8px",
                                                        background: "rgba(255, 255, 255, 0.08)",
                                                        border: "1px solid rgba(255, 255, 255, 0.12)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        transition: "all 0.2s ease",
                                                        textDecoration: "none"
                                                    }}
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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

            {/* Global Engineering Footprint & Operating Hubs Section (Light Theme) */}
            <section className="section-light section" style={{ background: "#FAFAFC", padding: "108px 0", borderTop: "1px solid #E2E8F0", position: "relative" }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes presencePulseLight {
                        0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5); }
                        70% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
                        100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
                    }
                    .about-locations-grid {
                        display: grid;
                        grid-template-columns: 1.15fr 1.85fr;
                        gap: 36px;
                        align-items: stretch;
                    }
                    @media (max-width: 991px) {
                        .about-locations-grid {
                            grid-template-columns: 1fr;
                            gap: 28px;
                        }
                    }
                `}} />

                <div className="container" style={{ maxWidth: "1400px", position: "relative", zIndex: 1 }}>
                    <div style={{ textAlign: "center", marginBottom: "56px" }}>
                        <span className="badge" style={{ marginBottom: "16px", color: "#E8521A", borderColor: "rgba(232, 82, 26, 0.25)", background: "rgba(232, 82, 26, 0.06)", fontFamily: "var(--font-mono)" }}>
                            Global Engineering Footprint
                        </span>
                        <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.6rem)", fontWeight: 700, color: "#0B1320", fontFamily: "var(--font-display)", letterSpacing: "-0.02em", marginBottom: "16px" }}>
                            Global Presence &amp; Operating Hubs
                        </h2>
                        <p style={{ fontSize: "1.05rem", color: "#475569", maxWidth: "680px", margin: "0 auto", lineHeight: "1.7", fontFamily: "var(--font-body)" }}>
                            Delivering vehicle-grade software architectures, cockpit engineering, and digital transformation platforms from our worldwide technology hubs.
                        </p>
                    </div>



                    {/* Interactive 2-Column Hub Selector + Google Map */}
                    <div className="about-locations-grid">
                        {/* Left Column: Hub Selector Cards */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "14px",
                            maxHeight: "620px",
                            overflowY: "auto",
                            paddingRight: "6px"
                        }}>
                            {globalHubs.map((hub) => {
                                const isActive = activeHub.city === hub.city && activeHub.region === hub.region;
                                return (
                                    <motion.div
                                        key={`${hub.city}-${hub.region}`}
                                        onClick={() => setActiveHub(hub)}
                                        whileHover={{ x: 4 }}
                                        style={{
                                            background: isActive ? "rgba(59, 130, 246, 0.06)" : "#FFFFFF",
                                            border: isActive ? "1.5px solid #2563EB" : "1px solid #E2E8F0",
                                            borderRadius: "16px",
                                            padding: "20px 22px",
                                            cursor: "pointer",
                                            transition: "all 0.25s ease",
                                            boxShadow: isActive ? "0 8px 24px rgba(37, 99, 235, 0.12)" : "0 2px 10px rgba(0,0,0,0.03)"
                                        }}
                                    >
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                                            <span style={{
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "10px",
                                                color: isActive ? "#2563EB" : "#64748B",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.08em",
                                                fontWeight: 700
                                            }}>
                                                {hub.region}
                                            </span>
                                            {isActive && (
                                                <span style={{
                                                    width: "8px",
                                                    height: "8px",
                                                    borderRadius: "50%",
                                                    backgroundColor: "#2563EB",
                                                    boxShadow: "0 0 8px #2563EB"
                                                }} />
                                            )}
                                        </div>
                                        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0B1320", marginBottom: "8px", fontFamily: "var(--font-display)" }}>
                                            {hub.city} Hub
                                        </h3>
                                        <p style={{ fontSize: "0.85rem", color: "#475569", lineHeight: "1.5", marginBottom: "12px", fontFamily: "var(--font-body)" }}>
                                            {hub.address}
                                        </p>

                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
                                            {hub.phone && (
                                                <span style={{ fontSize: "0.78rem", color: "#64748B", fontFamily: "var(--font-mono)" }}>
                                                    Phone: {hub.phone}
                                                </span>
                                            )}
                                            <a
                                                href={`mailto:${hub.email}`}
                                                style={{
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "0.78rem",
                                                    color: isActive ? "#2563EB" : "#475569",
                                                    textDecoration: "underline"
                                                }}
                                            >
                                                {hub.email}
                                            </a>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Right Column: Google Maps Interactive Frame */}
                        <div style={{
                            position: "relative",
                            background: "#0F172A",
                            border: "1px solid #CBD5E1",
                            borderRadius: "20px",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            minHeight: "480px",
                            boxShadow: "0 20px 45px rgba(15, 23, 42, 0.15)"
                        }}>
                            {/* Map Telemetry Header */}
                            <div style={{
                                padding: "18px 24px",
                                background: "#0B1320",
                                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                zIndex: 2
                            }}>
                                <div>
                                    <span style={{ fontSize: "0.7rem", color: "#38BDF8", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
                                        Active Hub Location
                                    </span>
                                    <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", margin: 0, fontFamily: "var(--font-display)" }}>
                                        {activeHub.city} — {activeHub.region}
                                    </h4>
                                </div>
                                <div style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "11px",
                                    color: "rgba(255,255,255,0.6)",
                                    textAlign: "right"
                                }}>
                                    <div style={{ color: "#38BDF8", fontWeight: 600 }}>COORDINATES</div>
                                    <div>{activeHub.coordinates}</div>
                                </div>
                            </div>

                            {/* Google Map Embedded iframe */}
                            <div style={{ flex: 1, position: "relative", width: "100%", height: "100%", background: "#0c111e" }}>
                                <iframe
                                    title={`Map of SAMSAN Technische Labs Pvt. Ltd. ${activeHub.city} office`}
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(activeHub.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(1.2)" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA Section (Light Theme) */}
            <section className="section-light section" style={{ background: "#FAFAFC", borderTop: "1px solid #E2E8F0", padding: "108px 0", position: "relative" }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .cta-card-grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 28px;
                        margin-top: 40px;
                    }
                    @media (max-width: 868px) {
                        .cta-card-grid {
                            grid-template-columns: 1fr;
                            gap: 20px;
                        }
                    }
                    .cta-modular-card {
                        background: #FFFFFF;
                        border: 1px solid #E2E8F0;
                        border-radius: 20px;
                        padding: 36px 32px;
                        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                        display: flex;
                        flexDirection: column;
                        justify-content: space-between;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
                    }
                    .cta-modular-card:hover {
                        transform: translateY(-4px);
                        border-color: #CBD5E1;
                        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.06);
                    }
                `}} />

                <div className="container" style={{ maxWidth: "1200px" }}>
                    <motion.div
                        initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: shouldReduce ? 0.01 : 0.5 }}
                        style={{ textAlign: "center", marginBottom: "16px" }}
                    >
                        <span className="badge" style={{ marginBottom: "16px", color: "#E8521A", borderColor: "rgba(232, 82, 26, 0.25)", background: "rgba(232, 82, 26, 0.06)", fontFamily: "var(--font-mono)" }}>
                            Next-Gen Mobility Partnership
                        </span>
                        <h2 style={{
                            fontSize: "clamp(2rem, 3.5vw, 2.6rem)",
                            fontWeight: 700,
                            margin: "0 0 16px 0",
                            color: "#0B1320",
                            letterSpacing: "-0.02em",
                            fontFamily: "var(--font-display)"
                        }}>
                            Ready to power your next engineering program?
                        </h2>
                        <p style={{
                            fontSize: "1.08rem",
                            lineHeight: "1.7",
                            color: "#475569",
                            maxWidth: "640px",
                            margin: "0 auto",
                            fontFamily: "var(--font-body)"
                        }}>
                            Connect with SAMSAN Technische Labs to establish your dedicated COE or leverage our vehicle systems experts.
                        </p>
                    </motion.div>

                    {/* Modular Engagement Cards */}
                    <div className="cta-card-grid">
                        {/* Card 1: Dedicated COE Program */}
                        <motion.div
                            initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: shouldReduce ? 0.01 : 0.5, delay: 0.1 }}
                            className="cta-modular-card"
                        >
                            <div>
                                <div style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "6px 14px",
                                    borderRadius: "20px",
                                    background: "rgba(37, 99, 235, 0.08)",
                                    border: "1px solid rgba(37, 99, 235, 0.2)",
                                    color: "#2563EB",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    letterSpacing: "0.05em",
                                    textTransform: "uppercase",
                                    marginBottom: "20px"
                                }}>
                                    AUTOSAR &amp; SDV COE
                                </div>
                                <h3 style={{
                                    fontSize: "1.35rem",
                                    fontWeight: 700,
                                    color: "#0B1320",
                                    marginBottom: "12px",
                                    fontFamily: "var(--font-display)"
                                }}>
                                    Establish a Dedicated COE
                                </h3>
                                <p style={{
                                    fontSize: "0.95rem",
                                    color: "#475569",
                                    lineHeight: 1.6,
                                    marginBottom: "24px",
                                    fontFamily: "var(--font-body)"
                                }}>
                                    Build long-term engineering capacity with dedicated, ISO 26262 certified software teams tailored to your vehicle platform architecture.
                                </p>
                            </div>
                            <div>
                                <Link
                                    href="/engagement-models"
                                    className="btn btn-outline"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        width: "100%",
                                        justifyContent: "center",
                                        textDecoration: "none",
                                        borderColor: "#CBD5E1",
                                        color: "#0B1320",
                                        fontWeight: 600,
                                        padding: "12px 20px"
                                    }}
                                >
                                    Explore Engagement Models
                                    <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                                        <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Card 2: Systems Experts Consultation */}
                        <motion.div
                            initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: shouldReduce ? 0.01 : 0.5, delay: 0.2 }}
                            className="cta-modular-card"
                            style={{
                                background: "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)",
                                borderColor: "#CBD5E1"
                            }}
                        >
                            <div>
                                <div style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "6px 14px",
                                    borderRadius: "20px",
                                    background: "rgba(232, 82, 26, 0.08)",
                                    border: "1px solid rgba(232, 82, 26, 0.25)",
                                    color: "#E8521A",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    letterSpacing: "0.05em",
                                    textTransform: "uppercase",
                                    marginBottom: "20px"
                                }}>
                                    Expert Technical Advisory
                                </div>
                                <h3 style={{
                                    fontSize: "1.35rem",
                                    fontWeight: 700,
                                    color: "#0B1320",
                                    marginBottom: "12px",
                                    fontFamily: "var(--font-display)"
                                }}>
                                    Leverage Systems Experts
                                </h3>
                                <p style={{
                                    fontSize: "0.95rem",
                                    color: "#475569",
                                    lineHeight: 1.6,
                                    marginBottom: "24px",
                                    fontFamily: "var(--font-body)"
                                }}>
                                    Direct consultation and rapid deployment for embedded software, ADAS sensor fusion, digital cockpit HMI, and AUTOSAR stack validation.
                                </p>
                            </div>
                            <div>
                                <Link
                                    href="/contact"
                                    className="btn btn-primary"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        width: "100%",
                                        justifyContent: "center",
                                        textDecoration: "none",
                                        background: "#E8521A",
                                        color: "#FFFFFF",
                                        fontWeight: 600,
                                        padding: "12px 20px",
                                        boxShadow: "0 4px 14px rgba(232, 82, 26, 0.25)"
                                    }}
                                >
                                    Get Started Immediately
                                    <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                                        <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
