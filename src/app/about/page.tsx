"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Image from "next/image";

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

export default function AboutPage() {
    const shouldReduce = useReducedMotion();

    return (
        <div style={{ paddingBottom: "100px" }}>

            {/* Page Hero */}
            <section className="page-hero" aria-labelledby="about-heading">
                <div className="hero-glow" style={{ opacity: 0.15 }} />
                <div className="container">
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={fadeUpVariants(shouldReduce)}>
                            <span className="badge" style={{ marginBottom: "24px" }}>About Us</span>
                        </motion.div>
                        <motion.h1 id="about-heading" variants={fadeUpVariants(shouldReduce)} style={{ marginBottom: "20px" }}>
                            About Company
                        </motion.h1>
                        <motion.p className="lead" variants={fadeUpVariants(shouldReduce)} style={{ maxWidth: "580px" }}>
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
                            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, marginBottom: "24px", color: "#ffffff", letterSpacing: "-0.025em" }}>
                                SAMSAN Technische Labs Pvt. Ltd.
                            </h2>
                            <p style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "var(--text-primary)", marginBottom: "20px" }}>
                                SAMSAN Technische Labs Pvt. Ltd. is an automotive engineering and digital transformation company focused on connected mobility, cockpit engineering, embedded systems, SDV platforms, AI-led engineering automation, and strategic engineering capacity for global customers.
                            </p>
                            <p style={{ fontSize: "0.95rem", lineHeight: "1.8", color: "var(--text-secondary)" }}>
                                Our focus is to build safety-critical software that is always reliable, secure, and ready for production, bringing systems engineering excellence to automotive megatrends.
                            </p>
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
            </section>            {/* Leadership & Team Section */}
            <section style={{ borderTop: "1px solid var(--border)", background: "#0A0F1C", paddingTop: "72px", paddingBottom: "80px" }}>
                <div className="container">

                    {/* Section Header */}
                    <div style={{ textAlign: "center", marginBottom: "56px" }}>
                        <span className="badge" style={{ marginBottom: "12px" }}>Credibility</span>
                        <h2 style={{ fontSize: "2.3rem", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: "12px" }}>
                            Founder-led Credibility
                        </h2>
                        <p className="lead" style={{ maxWidth: "560px", margin: "0 auto", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                            Led by industry experts with deep domain knowledge in automotive systems and software.
                        </p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>

                        {/* ── CARD 1: CEO ────────────────────────────────────────── */}
                        <div
                            style={{
                                background: "rgba(255, 255, 255, 0.02)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                border: "1px solid rgba(255, 255, 255, 0.06)",
                                borderRadius: "24px",
                                padding: "40px",
                                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 50px rgba(0,0,0,0.3)",
                                width: "100%",
                                maxWidth: "480px",
                                margin: "0 auto",
                                textAlign: "center",
                                transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                            }}
                            className="group hover:border-white/15"
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLDivElement;
                                el.style.transform = "translateY(-4px)";
                                el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.1), 0 25px 60px rgba(0,0,0,0.45)";
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLDivElement;
                                el.style.transform = "translateY(0)";
                                el.style.boxShadow = "inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 20px 50px rgba(0,0,0,0.3)";
                            }}
                        >
                            <p style={{ fontSize: "35px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#94A3B8", marginBottom: "24px", fontWeight: 600 }}>
                                Founder & CEO
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                {/* Profile photo in proper gradient double-ring frame */}
                                <div style={{
                                    width: "104px",
                                    height: "104px",
                                    borderRadius: "50%",
                                    padding: "3px",
                                    background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.03))",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    marginBottom: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(10,15,28,0.8)", position: "relative" }}>
                                        <Image
                                            src="/images/team/prashant_deshpande.png"
                                            alt="Prashant Deshpande"
                                            fill
                                            sizes="96px"
                                            priority
                                            style={{ objectFit: "cover" }}
                                            className="transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                                <h3 style={{ fontSize: "25px", fontWeight: 700, color: "#FFFFFF", margin: 0, lineHeight: 1.3 }}>
                                    Prashant Deshpande
                                </h3>
                                <p style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#94A3B8", marginTop: "6px", marginBottom: "10px" }}>
                                    Founder, CEO & Managing Director
                                </p>
                                <p style={{ fontSize: "12px", color: "#94A3B8", lineHeight: "1.6", marginTop: 0, marginBottom: 0 }}>
                                    25+ years in automotive, embedded software, engineering delivery, business development, global customer management, and connected mobility solutions.
                                </p>
                            </div>
                        </div>

                        {/* ── CARD 2: Board of Advisors ───────────────────────────── */}
                        <div
                            style={{
                                background: "rgba(255, 255, 255, 0.02)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                border: "1px solid rgba(255, 255, 255, 0.06)",
                                borderRadius: "24px",
                                padding: "40px",
                                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 50px rgba(0,0,0,0.3)",
                                width: "100%",
                                maxWidth: "800px",
                                margin: "0 auto",
                                transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                            }}
                            className="group hover:border-white/15"
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLDivElement;
                                el.style.transform = "translateY(-4px)";
                                el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.1), 0 25px 60px rgba(0,0,0,0.45)";
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLDivElement;
                                el.style.transform = "translateY(0)";
                                el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 50px rgba(0,0,0,0.3)";
                            }}
                        >
                            <p style={{ fontSize: "35px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#94A3B8", marginBottom: "32px", textAlign: "center", fontWeight: 600 }}>
                                Board of Advisors
                            </p>

                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "48px" }}>
                                {[
                                    { name: "Ashok Saraf", role: "Senior Advisor", imagePath: "/images/team/ashok_saraf.png" },
                                    { name: "Anil Patwardhan", role: "Senior Advisor", imagePath: "/images/team/anil_patwardhan.png" }
                                ].map((member) => (
                                    <div key={member.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "220px", textAlign: "center" }}>
                                        <div style={{
                                            width: "92px",
                                            height: "92px",
                                            borderRadius: "50%",
                                            padding: "3px",
                                            background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.03))",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            marginBottom: "16px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}>
                                            <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(10,15,28,0.8)", position: "relative" }}>
                                                <Image
                                                    src={member.imagePath}
                                                    alt={member.name}
                                                    fill
                                                    sizes="88px"
                                                    style={{ objectFit: "cover" }}
                                                    className="transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                        </div>
                                        <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#FFFFFF", margin: 0, lineHeight: 1.3, minHeight: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            {member.name}
                                        </h3>
                                        <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#94A3B8", marginTop: "6px", marginBottom: 0 }}>
                                            {member.role}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── CARD 3: Leaders ────────────────────────────────────── */}
                        <div
                            style={{
                                background: "rgba(255, 255, 255, 0.02)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                border: "1px solid rgba(255, 255, 255, 0.06)",
                                borderRadius: "24px",
                                padding: "40px",
                                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 50px rgba(0,0,0,0.3)",
                                width: "100%",
                                maxWidth: "1200px",
                                margin: "0 auto",
                                transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                            }}
                            className="group hover:border-white/15"
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLDivElement;
                                el.style.transform = "translateY(-4px)";
                                el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.1), 0 25px 60px rgba(0,0,0,0.45)";
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLDivElement;
                                el.style.transform = "translateY(0)";
                                el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 50px rgba(0,0,0,0.3)";
                            }}
                        >
                            <p style={{ fontSize: "35px", textTransform: "uppercase", letterSpacing: "0.12em", color: "#94A3B8", marginBottom: "32px", textAlign: "center", fontWeight: 600 }}>
                                Leaders
                            </p>

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(5, 1fr)",
                                    gap: "32px",
                                }}
                                className="leadership-grid"
                            >
                                {[
                                    { name: "V. Shankaran", role: "Engineering Director – Embedded", imagePath: "/images/team/v_shankaran.png" },
                                    { name: "Sharana Gouda", role: "Engineering Director – Cockpit", imagePath: "/images/team/sharana_gouda.png" },
                                    { name: "Dr. Pradeep Bilurkar", role: "Chief Data Scientist", imagePath: "/images/team/dr_pradeep_bilurkar.png" },
                                    { name: "Pratik Waghmode", role: "Technical Sales", imagePath: "/images/team/pratik_waghmode.png" },
                                    { name: "Gaurav Joshi", role: "Accounts & Finance", imagePath: "/images/team/gaurav_joshi.png" }
                                ].map((member) => (
                                    <div key={member.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                        <div style={{
                                            width: "88px",
                                            height: "88px",
                                            borderRadius: "50%",
                                            padding: "3px",
                                            background: "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.03))",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            marginBottom: "16px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}>
                                            <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(10,15,28,0.8)", position: "relative" }}>
                                                <Image
                                                    src={member.imagePath}
                                                    alt={member.name}
                                                    fill
                                                    sizes="80px"
                                                    style={{ objectFit: "cover" }}
                                                    className="transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                        </div>
                                        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", margin: 0, lineHeight: 1.3, minHeight: "38px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            {member.name}
                                        </h3>
                                        <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#94A3B8", marginTop: "6px", marginBottom: 0 }}>
                                            {member.role}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
