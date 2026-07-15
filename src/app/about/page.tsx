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
                background: isHovered ? "rgba(22, 30, 53, 0.6)" : "transparent",
                borderLeft: isHovered ? "3px solid #4DD8E8" : "3px solid transparent",
                transition: "background 0.2s ease, border-left-color 0.2s ease",
                marginLeft: isHovered ? "-3px" : "0px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
            }}
        >
            <div className="spec-key" style={{
                fontSize: "11.5px",
                letterSpacing: "0.08em",
                padding: "20px 24px",
                minWidth: "200px",
                background: "transparent",
                borderRight: "1px solid rgba(255, 255, 255, 0.08)",
                color: "var(--violet-mid)"
            }}>
                {specKey}
            </div>
            <div className="spec-val" style={{
                fontSize: "0.95rem",
                lineHeight: "1.6",
                padding: "20px 24px",
                background: "transparent"
            }}>
                {specVal}
            </div>
        </motion.div>
    );
}

export default function AboutPage() {
    const shouldReduce = !!useReducedMotion();

    return (
        <div style={{ paddingBottom: "0px" }}>

            {/* Page Hero */}
            <section className="page-hero" aria-labelledby="about-heading" style={{
                position: "relative",
                minHeight: "320px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(77, 216, 232, 0.06) 0%, transparent 70%)"
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
                            <span className="badge" style={{ marginBottom: "16px", fontSize: "12px", letterSpacing: "0.12em" }}>About Us</span>
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
                                marginBottom: "20px"
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
                                color: "var(--text-secondary)"
                            }}
                        >
                            SAMSAN Technische Labs Pvt. Ltd. is a technology reimagined systems design house powering global automotive megatrends.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* SAMSAN Technische Labs Intro Section */}
            <section className="section compact" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="container">
                    <div className="about-two-col" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "60px", alignItems: "center" }}>
                        <div>
                            <span className="badge rose" style={{ marginBottom: "16px" }}>Company Overview</span>
                            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, marginBottom: "28px", color: "#ffffff", letterSpacing: "-0.025em" }}>
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
                                    color: "#F59E0B",
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
                                    color: "#ffffff"
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
                                        color: "rgba(240, 244, 255, 0.85)",
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
                                        color: "rgba(240, 244, 255, 0.85)",
                                        margin: 0
                                    }}
                                >
                                    Our focus is to build safety-critical software that is always reliable, secure, and ready for production, bringing systems engineering excellence to automotive megatrends.
                                </motion.p>
                            </motion.div>
                        </div>

                        {/* Interactive Side Graphic */}
                        <div style={{
                            background: "rgba(13, 19, 35, 0.45)",
                            border: "1px solid rgba(255, 255, 255, 0.06)",
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
                            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                        }}>
                            <div style={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(to top, rgba(10,15,28,0.9) 0%, rgba(10,15,28,0.3) 100%)",
                                zIndex: 1
                            }} />
                            <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                                <span className="badge" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)" }}>AI & Digital Embedded Technologies</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Automotive Megatrends */}
            <section className="section compact" style={{ borderTop: "1px solid var(--border)", background: "rgba(10,15,28,0.2)" }}>
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <span className="badge mint" style={{ marginBottom: "16px" }}>Core Competencies</span>
                        <h2 style={{ fontSize: "2.2rem", fontWeight: 700 }}>What We Specialize In</h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
                        {megatrends.map((trend) => (
                            <div
                                key={trend.title}
                                style={{
                                    background: "rgba(13, 19, 35, 0.45)",
                                    border: "1px solid rgba(255, 255, 255, 0.05)",
                                    borderRadius: "var(--radius)",
                                    padding: "32px 28px",
                                    position: "relative",
                                    overflow: "hidden"
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
                                <h3 style={{ fontSize: "1.2rem", color: "#ffffff", marginBottom: "14px", fontWeight: 600 }}>{trend.title}</h3>
                                <p style={{ fontSize: "0.85rem", lineHeight: "1.65", color: "var(--text-secondary)" }}>{trend.desc}</p>
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
                        border: "1px solid rgba(255,255,255,0.06)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
                    }}>
                        <div style={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(to top, rgba(10,15,28,0.95) 0%, rgba(10,15,28,0.1) 100%)"
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
            <section className="section compact" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "60px", alignItems: "start" }}>

                        {/* Vision Card */}
                        <div style={{
                            background: "linear-gradient(135deg, rgba(22, 30, 53, 0.5) 0%, rgba(27, 36, 64, 0.5) 100%)",
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                            borderRadius: "var(--radius-lg)",
                            padding: "44px",
                            boxShadow: "0 15px 35px rgba(0,0,0,0.2)"
                        }}>
                            <span className="badge" style={{ marginBottom: "20px" }}>Our Vision</span>
                            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#ffffff", marginBottom: "20px", lineHeight: "1.3" }}>
                                To design safe, connected, and intelligent systems that power the vehicle of the future.
                            </h2>
                            <p style={{ fontSize: "0.95rem", lineHeight: "1.7", color: "var(--text-secondary)" }}>
                                SAMSAN bridges the gap between hardware restrictions and complex software layers. We are committed to engineering platforms that meet the highest functional safety standards while driving agile, digital-first feature delivery.
                            </p>
                            <div style={{
                                marginTop: "32px",
                                height: "200px",
                                borderRadius: "var(--radius-sm)",
                                backgroundImage: "url('/images/embedded_engineering.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                border: "1px solid rgba(255,255,255,0.1)"
                            }} />
                        </div>

                        {/* Why Choose Us */}
                        <div>
                            <span className="badge rose" style={{ marginBottom: "16px" }}>Our Philosophy</span>
                            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "24px", color: "#ffffff" }}>Delivery Philosophy</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                {reasons.map((reason, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            display: "flex",
                                            gap: "16px",
                                            background: "rgba(13, 19, 35, 0.3)",
                                            border: "1px solid rgba(255,255,255,0.04)",
                                            borderRadius: "var(--radius-sm)",
                                            padding: "16px 20px",
                                            alignItems: "center"
                                        }}
                                    >
                                        <div style={{
                                            width: "24px", height: "24px",
                                            borderRadius: "50%",
                                            background: "rgba(124, 58, 237, 0.15)",
                                            color: "var(--violet-mid)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            flexShrink: 0,
                                            fontSize: "0.8rem",
                                            fontWeight: 700
                                        }}>
                                            ✓
                                        </div>
                                        <p style={{ fontSize: "0.88rem", color: "var(--text-primary)", lineHeight: "1.4" }}>{reason}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Spec Sheet Section */}
            <section className="section compact" style={{ borderTop: "1px solid var(--border)", background: "rgba(10,15,28,0.15)" }}>
                <div className="container">
                    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                        <span className="badge violet" style={{ marginBottom: "16px" }}>Company Profile</span>
                        <h2 style={{
                            fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                            fontWeight: 700,
                            marginBottom: "32px",
                            color: "#ffffff"
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
                                background: "rgba(13, 19, 35, 0.2)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
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
            <section className="section compact" style={{ borderTop: "1px solid var(--border)" }}>
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
                                    background: "rgba(13, 19, 35, 0.45)",
                                    border: "1px solid rgba(255, 255, 255, 0.06)",
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
                                        color: "var(--text-secondary)",
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
            </section>            {/* Leadership & Team Section */}
            <section style={{ borderTop: "1px solid var(--border)", background: "#0A0F1C", padding: "96px 0" }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    /* Responsive CEO Card */
                    .ceo-card {
                        width: 100%;
                        background: rgba(13, 19, 35, 0.55);
                        border-radius: 20px;
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        padding: 48px;
                        display: grid;
                        grid-template-columns: 280px 1fr;
                        gap: 48px;
                        align-items: center;
                        position: relative;
                        overflow: hidden;
                        margin-bottom: 48px;
                    }

                    @media (max-width: 1023px) {
                        .ceo-card {
                            grid-template-columns: 1fr;
                            text-align: center;
                            padding: 36px 28px;
                        }
                        .ceo-card-text {
                            align-items: center;
                            text-align: center !important;
                        }
                        .ceo-stat-row {
                            justify-content: center;
                        }
                    }

                    @media (max-width: 639px) {
                        .ceo-card {
                            padding: 28px 20px;
                        }
                        .ceo-photo-container {
                            width: 180px !important;
                            height: 180px !important;
                        }
                    }

                    /* Advisors Grid */
                    .advisors-grid {
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                        flex-wrap: wrap;
                    }

                    /* Leadership Grid */
                    .leadership-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 260px);
                        justify-content: center;
                        gap: 20px;
                    }

                    @media (max-width: 1023px) {
                        .leadership-grid {
                            grid-template-columns: repeat(2, 260px);
                            justify-content: center;
                        }
                    }

                    @media (max-width: 639px) {
                        .leadership-grid {
                            grid-template-columns: repeat(2, 1fr);
                            justify-content: center;
                        }
                    }

                    /* Team Card — base */
                    .team-card {
                        width: 260px;
                        min-height: 320px;
                        box-sizing: border-box;
                        background: rgba(13, 19, 35, 0.55);
                        border: 1px solid rgba(255, 255, 255, 0.08);
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
                `}} />
                <div className="container">

                    {/* Section Header */}
                    <div style={{ textAlign: "center", marginBottom: "56px" }}>
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
                                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                                fontWeight: 700,
                                color: "#ffffff",
                                marginBottom: "12px",
                                lineHeight: "1.2",
                                letterSpacing: "-0.025em"
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
                                fontSize: "1rem",
                                lineHeight: 1.7,
                                maxWidth: "520px",
                                margin: "0 auto",
                                color: "var(--text-secondary)"
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
                        {/* CEO Background Accents */}
                        <div style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: "300px",
                            height: "300px",
                            background: "radial-gradient(circle at top right, rgba(77, 216, 232, 0.07) 0%, transparent 70%)",
                            pointerEvents: "none"
                        }} />
                        <div style={{
                            position: "absolute",
                            top: 0,
                            left: "60px",
                            right: "60px",
                            height: "1px",
                            background: "linear-gradient(90deg, transparent, rgba(77, 216, 232, 0.5) 30%, rgba(77, 216, 232, 0.5) 70%, transparent)"
                        }} />

                        {/* CEO PHOTO (Left column) */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                            <div className="ceo-photo-container" style={{ width: "240px", height: "240px", position: "relative" }}>
                                {/* Layer 1: Outer glow */}
                                <div style={{
                                    position: "absolute",
                                    inset: "-3px",
                                    borderRadius: "18px",
                                    background: "linear-gradient(135deg, rgba(77, 216, 232, 0.6), rgba(77, 216, 232, 0.0) 50%, rgba(255, 138, 61, 0.4))",
                                    zIndex: 0
                                }} />
                                {/* Layer 2: Inner dark separator */}
                                <div style={{
                                    position: "absolute",
                                    inset: "-1px",
                                    borderRadius: "17px",
                                    background: "#0A0F1C",
                                    zIndex: 0
                                }} />
                                {/* Image */}
                                <div style={{ width: "100%", height: "100%", borderRadius: "16px", overflow: "hidden", position: "relative", zIndex: 1 }}>
                                    <Image
                                        src="/images/team/prashant_deshpande.png"
                                        alt="Prashant Deshpande"
                                        fill
                                        sizes="240px"
                                        priority
                                        style={{ objectFit: "cover", objectPosition: "center top" }}
                                    />
                                </div>
                            </div>

                            {/* CEO ROLE BADGE */}
                            <div style={{
                                marginTop: "16px",
                                textAlign: "center",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "6px 14px",
                                background: "rgba(77, 216, 232, 0.08)",
                                border: "1px solid rgba(77, 216, 232, 0.3)",
                                borderRadius: "20px",
                                fontFamily: "var(--font-mono)",
                                fontSize: "11px",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: "#4DD8E8"
                            }}>
                                <span>●</span> Chief Executive Officer
                            </div>
                        </div>

                        {/* CEO TEXT CONTENT (Right column) */}
                        <div className="ceo-card-text" style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "left" }}>
                            <div>
                                <h3 style={{
                                    fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
                                    fontWeight: 800,
                                    letterSpacing: "-0.02em",
                                    color: "#ffffff",
                                    lineHeight: 1.1,
                                    margin: 0
                                }}>
                                    Prashant Deshpande
                                </h3>
                                <p style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "12px",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    color: "#F59E0B",
                                    margin: "8px 0 0 0"
                                }}>
                                    Founder, CEO & Managing Director
                                </p>
                            </div>

                            <div style={{ width: "48px", height: "2px", background: "#4DD8E8", borderRadius: "1px", margin: "4px 0" }} />

                            <p style={{
                                fontSize: "1rem",
                                lineHeight: 1.75,
                                color: "var(--text-secondary)",
                                maxWidth: "560px",
                                margin: 0
                            }}>
                                25+ years in automotive, embedded software, engineering delivery, business development, global customer management, and connected mobility solutions.
                            </p>

                            {/* Stat Row */}
                            <div className="ceo-stat-row" style={{ display: "flex", gap: "32px", marginTop: "8px" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.6rem", fontWeight: 700, color: "#4DD8E8", lineHeight: 1 }}>25+</span>
                                    <span style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-secondary)" }}>Years Experience</span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.6rem", fontWeight: 700, color: "#4DD8E8", lineHeight: 1 }}>50+</span>
                                    <span style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-secondary)" }}>Engineers Led</span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.6rem", fontWeight: 700, color: "#4DD8E8", lineHeight: 1 }}>3</span>
                                    <span style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-secondary)" }}>Global Regions</span>
                                </div>
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
                                border: "1px solid rgba(139,92,246,0.3)",
                                backgroundColor: "rgba(139,92,246,0.06)",
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
                                    role: "Senior Advisor",
                                    label: "Senior Advisor",
                                    tooltip: "Advisory Board",
                                    imagePath: "/images/team/ashok_saraf.png",
                                    glowColor: "#8B5CF6",
                                    labelColor: "rgba(139, 92, 246, 0.8)"
                                },
                                {
                                    name: "Anil Patwardhan",
                                    role: "Senior Advisor",
                                    label: "Senior Advisor",
                                    tooltip: "Advisory Board",
                                    imagePath: "/images/team/anil_patwardhan.png",
                                    glowColor: "#8B5CF6",
                                    labelColor: "rgba(139, 92, 246, 0.8)"
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
                                    className="team-card"
                                >
                                    {/* Bottom Accent Line */}
                                    <div className="card-accent-line" style={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: "20%",
                                        right: "20%",
                                        height: "2px",
                                        borderRadius: "1px 1px 0 0",
                                        background: member.glowColor,
                                        opacity: 0,
                                        transition: "opacity 0.3s ease"
                                    }} />

                                    {/* Tooltip */}
                                    <div className="team-tooltip">
                                        {member.tooltip}
                                    </div>

                                    {/* Photo Container */}
                                    <div style={{ width: "160px", height: "160px", position: "relative", flexShrink: 0 }}>
                                        {/* Outer glow layer */}
                                        <div style={{
                                            position: "absolute",
                                            inset: "-3px",
                                            borderRadius: "17px",
                                            background: `linear-gradient(135deg, ${member.glowColor} 0%, transparent 60%)`,
                                            zIndex: 0
                                        }} />
                                        {/* Inner separator layer */}
                                        <div style={{
                                            position: "absolute",
                                            inset: "-1px",
                                            borderRadius: "15px",
                                            background: "rgba(13, 19, 35, 0.55)",
                                            zIndex: 0
                                        }} />
                                        {/* Photo */}
                                        <div style={{ width: "100%", height: "100%", borderRadius: "14px", overflow: "hidden", position: "relative", zIndex: 1 }}>
                                            <Image
                                                src={member.imagePath}
                                                alt={member.name}
                                                fill
                                                sizes="160px"
                                                style={{ objectFit: "cover", objectPosition: "center top" }}
                                            />
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <span style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "10px",
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        color: member.labelColor,
                                        marginTop: "16px",
                                        marginBottom: "4px"
                                    }}>
                                        {member.label}
                                    </span>
                                    <h4 style={{
                                        fontSize: "1.1rem",
                                        fontWeight: 800,
                                        letterSpacing: "0.02em",
                                        textTransform: "capitalize",
                                        color: "#ffffff",
                                        lineHeight: 1.2,
                                        textAlign: "center",
                                        marginTop: "2px",
                                        marginBottom: "6px"
                                    }}>
                                        {member.name}
                                    </h4>
                                    <p style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "12px",
                                        letterSpacing: "0.07em",
                                        textTransform: "uppercase",
                                        color: "var(--text-secondary)",
                                        lineHeight: 1.5,
                                        textAlign: "center",
                                        marginTop: 0,
                                        marginBottom: 0
                                    }}>
                                        {member.role}
                                    </p>
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
                            className="leadership-grid"
                        >
                            {[
                                {
                                    name: "V. Shankaran",
                                    role: "Engineering Director — Embedded",
                                    label: "Leader",
                                    tooltip: "Embedded Systems",
                                    imagePath: "/images/team/v_shankaran.png",
                                    glowColor: "#4DD8E8",
                                    labelColor: "rgba(77, 216, 232, 0.8)"
                                },
                                {
                                    name: "Sharana Gouda",
                                    role: "Engineering Director — Cockpit",
                                    label: "Leader",
                                    tooltip: "Cockpit Engineering",
                                    imagePath: "/images/team/sharana_gouda.png",
                                    glowColor: "#4DD8E8",
                                    labelColor: "rgba(77, 216, 232, 0.8)"
                                },
                                {
                                    name: "Dr. Pradeep Bilurkar",
                                    role: "Chief Data Scientist",
                                    label: "Leader",
                                    tooltip: "Data & AI",
                                    imagePath: "/images/team/dr_pradeep_bilurkar.png",
                                    glowColor: "#FF8A3D",
                                    labelColor: "rgba(255, 138, 61, 0.8)"
                                },
                                {
                                    name: "Pratik Waghmode",
                                    role: "Technical Sales",
                                    label: "Leader",
                                    tooltip: "Business Development",
                                    imagePath: "/images/team/pratik_waghmode.png",
                                    glowColor: "#22C55E",
                                    labelColor: "rgba(34, 197, 94, 0.8)"
                                },
                                {
                                    name: "Gaurav Joshi",
                                    role: "Accounts & Finance",
                                    label: "Leader",
                                    tooltip: "Finance & Operations",
                                    imagePath: "/images/team/gaurav_joshi.png",
                                    glowColor: "#FFC83D",
                                    labelColor: "rgba(255, 200, 61, 0.8)"
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
                                    className="team-card"
                                >
                                    {/* Bottom Accent Line */}
                                    <div className="card-accent-line" style={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: "20%",
                                        right: "20%",
                                        height: "2px",
                                        borderRadius: "1px 1px 0 0",
                                        background: member.glowColor,
                                        opacity: 0,
                                        transition: "opacity 0.3s ease"
                                    }} />

                                    {/* Tooltip */}
                                    <div className="team-tooltip">
                                        {member.tooltip}
                                    </div>

                                    {/* Photo Container */}
                                    <div style={{ width: "160px", height: "160px", position: "relative", flexShrink: 0 }}>
                                        {/* Outer glow layer */}
                                        <div style={{
                                            position: "absolute",
                                            inset: "-3px",
                                            borderRadius: "17px",
                                            background: `linear-gradient(135deg, ${member.glowColor} 0%, transparent 60%)`,
                                            zIndex: 0
                                        }} />
                                        {/* Inner separator layer */}
                                        <div style={{
                                            position: "absolute",
                                            inset: "-1px",
                                            borderRadius: "15px",
                                            background: "rgba(13, 19, 35, 0.55)",
                                            zIndex: 0
                                        }} />
                                        {/* Photo */}
                                        <div style={{ width: "100%", height: "100%", borderRadius: "14px", overflow: "hidden", position: "relative", zIndex: 1 }}>
                                            <Image
                                                src={member.imagePath}
                                                alt={member.name}
                                                fill
                                                sizes="160px"
                                                style={{ objectFit: "cover", objectPosition: "center top" }}
                                            />
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <span style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "10px",
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        color: member.labelColor,
                                        marginTop: "16px",
                                        marginBottom: "4px"
                                    }}>
                                        {member.label}
                                    </span>
                                    <h4 style={{
                                        fontSize: "1.1rem",
                                        fontWeight: 800,
                                        letterSpacing: "0.02em",
                                        textTransform: "capitalize",
                                        color: "#ffffff",
                                        lineHeight: 1.2,
                                        textAlign: "center",
                                        marginTop: "2px",
                                        marginBottom: "6px"
                                    }}>
                                        {member.name}
                                    </h4>
                                    <p style={{
                                        fontFamily: "var(--font-mono)",
                                        fontSize: "12px",
                                        letterSpacing: "0.07em",
                                        textTransform: "uppercase",
                                        color: "var(--text-secondary)",
                                        lineHeight: 1.5,
                                        textAlign: "center",
                                        marginTop: 0,
                                        marginBottom: 0
                                    }}>
                                        {member.role}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA Section */}
            <section style={{ borderTop: "1px solid var(--border)", padding: "100px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
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
                        <p style={{ fontSize: "1rem", lineHeight: "1.7", color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto" }}>
                            Connect with SAMSAN Technische Labs to establish your dedicated COE or leverage our vehicle systems experts.
                        </p>
                        <Link href="/contact" className="btn btn-primary" style={{ display: "inline-flex", textDecoration: "none" }}>
                            Get Started
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
