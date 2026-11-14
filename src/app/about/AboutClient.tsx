"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Hero } from "@/components/theme-light/Hero";
import { Section } from "@/components/theme-light/Section";
import { Card } from "@/components/theme-light/Card";
import { Eyebrow } from "@/components/theme-light/Eyebrow";
import { Button } from "@/components/theme-light/Button";
import { CtaBand } from "@/components/theme-light/CtaBand";
import { inter, manrope } from "@/app/solutions/fonts";

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

const reasons: string[] = [
]

const companySpecs = [
    { key: "Headquarters", value: "STPI New Building, Hinjawadi Phase I, Pune, India" },
    { key: "Founded", value: "2023" },
    { key: "Founder", value: "Prashant Deshpande"},
    { key: "Team size", value: "60+ Engineers & Systems Architects" },
    { key: "Regions served", value: "India/APAC, South Korea" },
    { key: "Core domain", value: "Automotive Systems, Cockpit Engineering, Connected Mobility, Embedded Engineering" },
    // { key: "Compliance & safety", value: "ISO 26262 Road Vehicles Functional Safety & Secure Bootloaders" }
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
        address: "Novel TechPark, Bengaluru, Karnataka",
        // phone: "+91-895-692-7909",
        email: "india@samsanlabs.com",
        mapQuery: "46 4, Hosur Rd, Kudlu Gate, Krishna Reddy Industrial Area, Hosapalaya, Muneshwara Nagar, Bengaluru, Karnataka 560068",
        coordinates: "13.0305° N, 77.5649° E",
        tagColor: "#4DD8E8"
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

// LinkedIn SVG path
const LINKEDIN_SVG_PATH = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

function SpecRow({ specKey, specVal, shouldReduce }: { specKey: string; specVal: string; shouldReduce: boolean }) {
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
            role: "System Engineer & Technical Sales",
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
        <div className={`theme-light-corp about-theme ${inter.variable} ${manrope.variable}`}>

            {/* Page Hero */}
            <Hero
                className="about-hero"
                title="About SAMSAN Technische Labs"
                description="SAMSAN Technische Labs Pvt. Ltd. is a technology-reimagined systems design house powering global automotive megatrends with safety-critical software, digital cockpit engineering, and software-defined vehicle architectures."
            >
                <div className="about-hero-highlights">
                    {[
                        { title: "2023 FOUNDED", desc: "Automotive Systems Design" },
                        { title: "50+ ENGINEERS", desc: "Architects & Systems Experts" },
                        { title: "3 REGIONS", desc: "India, Europe & Americas" },
                        { title: "ISO 26262", desc: "Functional Safety Discipline" }
                    ].map((spec) => (
                        <Card key={spec.title} className="about-hero-stat">
                            <strong>{spec.title}</strong><span>{spec.desc}</span>
                        </Card>
                    ))}
                </div>
            </Hero>

            {/* SAMSAN Technische Labs Intro Section */}
            <Section variant="white" className="about-section about-mission-section">
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
                                className="about-mission-quote"
                                style={{
                                    borderLeft: "3px solid var(--teal)",
                                    paddingLeft: "24px",
                                    marginBottom: "32px",
                                    background: "transparent",
                                    paddingTop: "0",
                                    paddingBottom: "0",
                                    borderRadius: 0
                                }}
                            >
                                <span className="about-eyebrow">Mission statement</span>
                                <div style={{
                                    fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)",
                                    fontWeight: 700,
                                    lineHeight: "1.4",
                                    color: "#0B1320",
                                    fontFamily: "var(--font-display)"
                                }}>
                                    To empower OEMs, Tier-1s, and technology companies with products, accelerators, and engineering expertise for faster development, higher quality, and lasting competitive advantage.
                                </div>
                            </motion.div>

                            {/* Body Paragraphs container */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "720px" }}>
                                <p style={{
                                    fontSize: "17px",
                                    lineHeight: "1.7",
                                    color: "var(--body)",
                                    margin: 0,
                                    fontFamily: "var(--font-body)"
                                }}>
                                    SAMSAN Technische Labs Pvt. Ltd. is an automotive engineering and digital transformation company focused on connected mobility, cockpit engineering, embedded systems, SDV platforms, AI-led engineering automation, and strategic engineering capacity for global customers.
                                </p>
                                <p style={{
                                    fontSize: "17px",
                                    lineHeight: "1.7",
                                    color: "var(--body)",
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
                                <span className="about-eyebrow">AI &amp; digital embedded technologies</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Automotive Megatrends / Core Competencies */}
            <Section variant="alt" className="about-section about-competencies">
                <div className="container" style={{ maxWidth: "1400px" }}>
                    <div style={{ textAlign: "center", marginBottom: "56px" }}>
                        <Eyebrow>Core competencies</Eyebrow>
                        <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "#0B1320", fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>What We Specialize In</h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "28px" }}>
                        {megatrends.map((trend) => (
                            <Card
                                key={trend.title}
                                className="about-competency-card"
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
                            </Card>
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
            </Section>

            {/* Vision & Mission — Modern Section */}
            <Section variant="white" className="about-section about-vision">
                {/* Background ambient glows */}
                <div style={{
                    position: "absolute", top: "10%", left: "-10%",
                    width: "600px", height: "600px",
                    background: "radial-gradient(ellipse, rgba(77,216,232,0.08) 0%, transparent 70%)",
                    pointerEvents: "none", zIndex: 0
                }} />
                <div style={{
                    position: "absolute", bottom: "5%", right: "-5%",
                    width: "500px", height: "500px",
                    background: "radial-gradient(ellipse, rgba(232,82,26,0.07) 0%, transparent 70%)",
                    pointerEvents: "none", zIndex: 0
                }} />

                <div className="container" style={{ maxWidth: "1400px", position: "relative", zIndex: 1 }}>

                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: shouldReduce ? 0.01 : 0.55, ease: "easeOut" }}
                        style={{ textAlign: "center", marginBottom: "64px" }}
                    >
                        <span className="about-eyebrow">Who we are</span>
                        <h2 style={{
                            fontSize: "clamp(2rem, 3.5vw, 2.6rem)",
                            fontWeight: 800,
                            color: "#FFFFFF",
                            letterSpacing: "-0.025em",
                            fontFamily: "var(--font-display)",
                            margin: 0
                        }}>Vision &amp; Mission</h2>
                        <p style={{
                            marginTop: "16px",
                            fontSize: "1.05rem",
                            color: "#94A3B8",
                            fontFamily: "var(--font-body)",
                            maxWidth: "560px",
                            margin: "16px auto 0"
                        }}>The principles that guide everything we build, every system we design.</p>
                    </motion.div>

                    {/* Two-column cards */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                        gap: "32px"
                    }}>

                        {/* VISION CARD */}
                        <motion.div
                            initial={{ opacity: 0, y: shouldReduce ? 0 : 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: shouldReduce ? 0.01 : 0.55, delay: shouldReduce ? 0 : 0.05, ease: "easeOut" }}
                            style={{
                                background: "rgba(16, 24, 48, 0.65)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                border: "1px solid rgba(77, 216, 232, 0.18)",
                                borderRadius: "20px",
                                overflow: "hidden",
                                boxShadow: "0 16px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            {/* Image banner — full image, no overlay */}
                            <div style={{
                                height: "280px",
                                position: "relative",
                                overflow: "hidden",
                                flexShrink: 0
                            }}>
                                <div style={{
                                    position: "absolute", inset: 0,
                                    backgroundImage: "url('/images/vision_globe_connected.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }} />
                            </div>

                            {/* Text body */}
                            <div style={{ padding: "32px 36px 40px", display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
                                <div style={{
                                    width: "40px", height: "3px",
                                    background: "linear-gradient(90deg, #4DD8E8, rgba(77,216,232,0))",
                                    borderRadius: "2px",
                                    marginBottom: "4px"
                                }} />
                                <h3 style={{
                                    fontSize: "clamp(1.3rem, 2.2vw, 1.6rem)",
                                    fontWeight: 700,
                                    color: "#FFFFFF",
                                    lineHeight: "1.4",
                                    margin: 0,
                                    fontFamily: "var(--font-display)"
                                }}>
                                    To be a globally respected technology organization making products, systems, and business processes more intelligent and connected.
                                </h3>
                                <p style={{
                                    fontSize: "0.94rem",
                                    lineHeight: "1.75",
                                    color: "#94A3B8",
                                    margin: 0,
                                    fontFamily: "var(--font-body)"
                                }}>
                                    We envision a world where every vehicle, system, and enterprise process is powered by intelligent, connected technology — built on precision engineering and lasting trust.
                                </p>
                                <div style={{
                                    marginTop: "auto",
                                    paddingTop: "20px",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "8px"
                                }}>
                                    {["Global Respect", "Intelligence", "Connectivity"].map(tag => (
                                        <span key={tag} style={{
                                            fontSize: "0.76rem",
                                            fontFamily: "var(--font-mono)",
                                            fontWeight: 600,
                                            letterSpacing: "0.06em",
                                            padding: "5px 12px",
                                            borderRadius: "100px",
                                            background: "rgba(77,216,232,0.08)",
                                            border: "1px solid rgba(77,216,232,0.2)",
                                            color: "#4DD8E8"
                                        }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* MISSION CARD */}
                        <motion.div
                            initial={{ opacity: 0, y: shouldReduce ? 0 : 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: shouldReduce ? 0.01 : 0.55, delay: shouldReduce ? 0 : 0.15, ease: "easeOut" }}
                            style={{
                                background: "rgba(16, 24, 48, 0.65)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                border: "1px solid rgba(232, 82, 26, 0.22)",
                                borderRadius: "20px",
                                overflow: "hidden",
                                boxShadow: "0 16px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            {/* Image banner — full image, no overlay */}
                            <div style={{
                                height: "280px",
                                position: "relative",
                                overflow: "hidden",
                                flexShrink: 0
                            }}>
                                <div style={{
                                    position: "absolute", inset: 0,
                                    backgroundImage: "url('/images/mission_engineering_accelerator.jpg')",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }} />
                            </div>

                            {/* Text body */}
                            <div style={{ padding: "32px 36px 40px", display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
                                <div style={{
                                    width: "40px", height: "3px",
                                    background: "linear-gradient(90deg, #E8521A, rgba(232,82,26,0))",
                                    borderRadius: "2px",
                                    marginBottom: "4px"
                                }} />
                                <h3 style={{
                                    fontSize: "clamp(1.3rem, 2.2vw, 1.6rem)",
                                    fontWeight: 700,
                                    color: "#FFFFFF",
                                    lineHeight: "1.4",
                                    margin: 0,
                                    fontFamily: "var(--font-display)"
                                }}>
                                    To empower OEMs, Tier-1s, and technology companies with products, accelerators, and engineering expertise for faster development, higher quality, and lasting competitive advantage.
                                </h3>
                                <p style={{
                                    fontSize: "0.94rem",
                                    lineHeight: "1.75",
                                    color: "#94A3B8",
                                    margin: 0,
                                    fontFamily: "var(--font-body)"
                                }}>
                                    We deliver precision-engineered systems, proven accelerators, and deep automotive expertise to help global clients ship faster, build better, and compete with confidence.
                                </p>
                                <div style={{
                                    marginTop: "auto",
                                    paddingTop: "20px",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "8px"
                                }}>
                                    {["OEMs & Tier-1s", "Accelerators", "Engineering Expertise"].map(tag => (
                                        <span key={tag} style={{
                                            fontSize: "0.76rem",
                                            fontFamily: "var(--font-mono)",
                                            fontWeight: 600,
                                            letterSpacing: "0.06em",
                                            padding: "5px 12px",
                                            borderRadius: "100px",
                                            background: "rgba(232,82,26,0.08)",
                                            border: "1px solid rgba(232,82,26,0.22)",
                                            color: "#E8521A"
                                        }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                    </div>

                    {/* Divider pillars row */}
                    <motion.div
                        initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: shouldReduce ? 0.01 : 0.5, delay: shouldReduce ? 0 : 0.25, ease: "easeOut" }}
                        style={{
                            marginTop: "48px",
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                            gap: "16px"
                        }}
                    >
                        {reasons.map((reason, idx) => (
                            <div key={idx} style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: "12px",
                                padding: "18px 20px",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px"
                            }}>
                                <div style={{
                                    width: "8px", height: "8px",
                                    borderRadius: "50%",
                                    background: idx % 2 === 0 ? "#4DD8E8" : "#E8521A",
                                    flexShrink: 0,
                                    boxShadow: idx % 2 === 0 ? "0 0 8px rgba(77,216,232,0.6)" : "0 0 8px rgba(232,82,26,0.6)"
                                }} />
                                <span style={{
                                    fontSize: "0.88rem",
                                    color: "#CBD5E1",
                                    fontWeight: 600,
                                    fontFamily: "var(--font-body)"
                                }}>{reason}</span>
                            </div>
                        ))}
                    </motion.div>

                </div>
            </Section>

            {/* Spec Sheet Section */}
            <Section variant="alt" className="about-section about-facts">
                <div className="container" style={{ maxWidth: "960px" }}>
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span className="about-eyebrow">Company profile</span>
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
                        {companySpecs.map((spec) => (
                            <SpecRow key={spec.key} specKey={spec.key} specVal={spec.value} shouldReduce={shouldReduce} />
                        ))}
                    </motion.div>
                </div>
            </Section>

            {/* Leadership & Team Section */}
            <Section variant="white" className="about-section about-leadership">

                <div className="container">

                    {/* Section Header */}
                    <div style={{ textAlign: "center", marginBottom: "64px" }}>
                        <span className="about-eyebrow">Our leadership</span>
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
                                    zIndex: 1
                                }}
                            />

                            {/* Gradient Fade Overlay */}
                            <div className="about-image-overlay" style={{
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

                    {/* Board of advisors Sub-section */}
                    <div style={{ marginTop: "72px", marginBottom: "64px" }}>
                        <div className="about-subsection-heading">
                            {/* Left Decorative Line */}
                            <div style={{ flex: 1, height: "1px", background: "linear-gradient(270deg, rgba(139, 92, 246, 0.3), transparent)" }} />
                            {/* Pill */}
                            <div className="about-subsection-label" style={{
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
                                    Board of advisors
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
                                            }}
                                        />
                                        {/* Bottom Gradient Overlay */}
                                        <div className="about-image-overlay" style={{
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

                    {/* Leadership team Sub-section */}
                    <div>
                        <div className="about-subsection-heading">
                            {/* Left Decorative Line */}
                            <div style={{ flex: 1, height: "1px", background: "linear-gradient(270deg, rgba(77, 216, 232, 0.3), transparent)" }} />
                            {/* Pill */}
                            <div className="about-subsection-label" style={{
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
                                    Leadership team
                                </span>
                            </div>
                            {/* Right Decorative Line */}
                            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(77, 216, 232, 0.3), transparent)" }} />
                        </div>

                        {/* Leadership Grid */}
                        <div className="leadership-section-grid">
                            {leadershipMembers.map((member) => (
                                <article className="lead-card" key={member.name}>
                                    <div className="about-person-photo">
                                        <Image
                                            src={member.imagePath}
                                            alt={member.name.trim()}
                                            fill
                                            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                                            style={{ objectFit: "cover", objectPosition: "center top" }}
                                        />
                                    </div>
                                    <div className="lead-card-body">
                                        <span className="lead-dept-label">{member.dept}</span>
                                        <h4>{member.name}</h4>
                                        <p>{member.role}</p>
                                        <div className="lead-profile-row">
                                            <span>View Profile</span>
                                            <a
                                                href={member.linkedinUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`${member.name.trim()} on LinkedIn`}
                                                className="lead-linkedin-btn"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <path d={LINKEDIN_SVG_PATH} fill="currentColor" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            {/* Global engineering footprint & Operating Hubs Section (Light Theme) */}
            <Section variant="alt" className="about-section about-footprint">


                <div className="container" style={{ maxWidth: "1400px", position: "relative", zIndex: 1 }}>
                    <div style={{ textAlign: "center", marginBottom: "56px" }}>
                        <Eyebrow>Global engineering footprint</Eyebrow>
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
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Bottom CTA Section */}
            <CtaBand
                eyebrow="Next-gen mobility partnership"
                title="Ready to power your next engineering program?"
                description="Connect with SAMSAN Technische Labs to establish your dedicated COE or leverage our vehicle systems experts."
                className="about-cta"
            >
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
                                <Button
                                    href="/engagement-models"
                                    variant="outline"

                                >
                                    Explore Engagement Models
                                    <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                                        <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Button>
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
                                <Button
                                    href="/contact"
                                    variant="primary"
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
                                </Button>
                            </div>
                        </motion.div>
                    </div>
            </CtaBand>
        </div>
    );
}
