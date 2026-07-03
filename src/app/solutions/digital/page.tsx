"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";

const digitalProducts = [
    {
        id: "maestro",
        badge: "IoT & Platform",
        title: "Maestro™",
        desc: "Unifies devices from different vendors — vehicle cameras, building management systems, and industrial sensors — into a single operational dashboard. Managed end-to-end by SAMSAN, Maestro provides real-time visibility, centralized monitoring, clear dashboards, and timely alerts. SAMSAN takes full responsibility for integration, maintenance, and platform reliability.",
        image: "/images/maestro.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2"/>
                <path d="M6 21h12M12 17v4"/>
            </svg>
        )
    },
    {
        id: "vemeego",
        badge: "Collaboration",
        title: "Vemeego",
        desc: "An intelligent workspace and video conferencing platform built for enhanced remote and corporate collaboration. Developed under the \"Make in India\" initiative by SAMSAN Technische Labs, Vemeego goes beyond basic video calling — delivering a rich digital workspace that brings teams together with context, structure, and productivity in mind.",
        image: "/images/vemeego.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
        )
    },
    {
        id: "pikniknow",
        badge: "Consumer & Travel",
        title: "PiknikNow",
        desc: "Discover unique picnic spots nearby, share travel stories with fellow explorers, and plan adventures to hidden destinations. Built for travel enthusiasts, photography lovers, and the social media generation — PiknikNow combines location discovery, community storytelling, and trip planning in one platform.",
        image: "/images/pikniknow.jpg",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
            </svg>
        )
    },
    {
        id: "twinlnk",
        badge: "IoT & Telematics",
        title: "TwinLnk™",
        desc: "An intelligent telematics and IoT gateway platform enabling secure, seamless data flow between edge devices and cloud applications. Built for automotive, industrial, and infrastructure environments — supporting real-time monitoring, remote diagnostics, remote configuration, and secure OTA firmware updates. Features multi-GNSS tracking, MQTT-based communication, edge intelligence, and rugged industrial-grade connectivity.",
        image: "/images/twinlink.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M20 12l-8-8-8 8"/>
            </svg>
        )
    },
    {
        id: "samchat",
        badge: "AI & Communication",
        title: "SamChat",
        desc: "Build, train, and deploy AI chatbots in minutes. Upload documents, FAQs, and data — SamChat's AI learns from your content and responds with accurate, context-aware answers. Designed for businesses, support teams, and startups looking to scale customer support and smart automation with 50+ integrations and enterprise-grade security.",
        image: "/images/samchat.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
        )
    },
    {
        id: "automate-ai",
        badge: "Automotive Software",
        title: "AutoMATE.ai",
        desc: "Contextual, voice-based AI assistant integrated directly into the vehicle cockpit. Provides intelligent access to vehicle functionalities, e-manuals, and diagnostics through natural language interaction — enabling drivers and technicians to get answers without leaving the driving context.",
        image: "/images/automate.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
            </svg>
        )
    },
    {
        id: "sdv",
        badge: "Automotive Software",
        title: "Software Defined Vehicle (SDV)",
        desc: "SAMSAN actively develops solutions across all four major SDV domains — SDV.ONBOARD (platform development, V-HAL/CAN management, HPC, middleware, FuSa & CySec), SDV.CLOUD (feature management, monetization, containerization, SOA), SDV.OFFBOARD (backend services, data analytics, cybersecurity), and SDV.DEV (cloud development environments, Virtual ECU, DevOps/CloudOps).",
        image: "/images/embedded_engineering.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18.5" cy="17.5" r="2.5"/><circle cx="5.5" cy="17.5" r="2.5"/>
                <path d="M7 9h11l2 4v4H4v-4l3-4z"/>
            </svg>
        )
    },
    {
        id: "driver-health",
        badge: "In-Vehicle HMI",
        title: "Driver Health & Wellness Monitoring",
        desc: "Monitors driver health in real time using sensors embedded in the steering wheel. Phase 1 (live): mobile app retrieving pulse and health data via Bluetooth, processing and visualizing structured health parameters. Phase 2 (in progress): integrating mmWave radar for vital signs, fatigue and emotion sensing, fall detection, and occupancy sensing — enhanced by generative AI for wellness insights.",
        image: "/images/driver-health.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
        )
    },
    {
        id: "sam-sanvaad",
        badge: "AI & Engineering",
        title: "Sam-Sanvaad",
        desc: "Converts any engineering document into an interactive, context-aware AI chatbot. Teams can interact with technical content — manuals, specifications, standards — based on context, document content, and personal preferences, eliminating manual document search.",
        image: "/images/sam-sanvaad.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
        )
    },
    {
        id: "stafd",
        badge: "Enterprise SaaS",
        title: "STAFD.IN",
        desc: "An AI-powered, cloud-native SaaS platform revolutionizing staffing in high-tech industries. Connects candidates, recruiters, and placement companies for seamless collaboration on tech projects — specializing in automotive software and semiconductor chip design. Powered by advanced analytics, intelligent matching algorithms, and AI-driven insights for efficient talent acquisition and targeted deployment.",
        image: "/images/stafd.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
        )
    }
];

const ENTERPRISE_DIVIDER_AFTER_INDEX = 5; // Insert divider after card index 5 (card 6)

export default function DigitalSolutionsPage() {
    const shouldReduce = useReducedMotion();
    const accents = ["var(--rose)", "var(--violet-mid)", "var(--mint)"];

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
                aria-labelledby="digital-heading"
            >
                <div className="container">
                    <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible">
                        <motion.div variants={fadeUpVariants(shouldReduce)} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                            <Link href="/solutions" style={{ color: "var(--violet-mid)", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
                                Products &amp; Accelerators
                            </Link>
                            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>/</span>
                            <span style={{ color: "#ffffff", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "100px", padding: "4px 12px", fontSize: "0.75rem", fontWeight: 600 }}>Detail Solution</span>
                        </motion.div>
                        <motion.h1 id="digital-heading" variants={fadeUpVariants(shouldReduce)} style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "20px", color: "#ffffff", letterSpacing: "-0.02em" }}>
                            Digital Solutions
                        </motion.h1>
                    </motion.div>
                </div>
            </section>

            {/* ── Subtitle Block ── */}
            <section style={{ padding: "64px 0 32px 0", textAlign: "center", backgroundColor: "var(--midnight)" }}>
                <div className="container">
                    <span style={{ color: "var(--violet-mid)", textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "8px" }}>Our Solution</span>
                    <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#ffffff" }}>Digital Solutions & Products</h2>
                    <div style={{ width: "60px", height: "3px", backgroundColor: "var(--violet-mid)", margin: "16px auto 0 auto", borderRadius: "100px" }}></div>
                </div>
            </section>

            {/* ── Products Listings ── */}
            <section style={{ padding: "32px 0 80px 0", backgroundColor: "var(--midnight)" }}>
                <div className="container" style={{ display: "flex", flexDirection: "column", gap: "96px" }}>
                    {digitalProducts.map((prod, index) => {
                        const isEven = index % 2 === 0;
                        const accent = accents[index % accents.length];
                        const isWhiteBgLogo = ["maestro", "vemeego", "pikniknow", "samchat", "automate-ai", "stafd", "twinlnk", "driver-health", "sam-sanvaad"].includes(prod.id);
                        const isContainImage = ["maestro", "vemeego", "pikniknow", "samchat", "automate-ai", "stafd", "twinlnk", "driver-health", "sam-sanvaad"].includes(prod.id);
                        const isLogoImage = isContainImage;
                        const cardHeight = prod.id === "twinlnk" ? "480px" : "360px";
                        return (
                            <div key={prod.id} style={{ display: "contents" }}>
                                {index === ENTERPRISE_DIVIDER_AFTER_INDEX + 1 && (
                                    <div style={{ 
                                        display: "flex", 
                                        flexDirection: "column", 
                                        alignItems: "center", 
                                        gap: "16px",
                                        width: "100%",
                                        padding: "16px 0",
                                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                                        borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
                                    }}>
                                        <span style={{ 
                                            color: "var(--violet-mid)", 
                                            fontWeight: 700, 
                                            fontSize: "0.8rem", 
                                            textTransform: "uppercase", 
                                            letterSpacing: "0.15em"
                                        }}>
                                            Enterprise &amp; Beyond
                                        </span>
                                    </div>
                                )}
                                <motion.div
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
                                {/* Image Column */}
                                <div style={{ 
                                    order: isEven ? 0 : 1,
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    boxShadow: "0 12px 28px rgba(0, 0, 0, 0.3)",
                                    height: cardHeight,
                                    position: "relative",
                                    backgroundColor: isWhiteBgLogo ? "#ffffff" : "transparent",
                                    padding: isWhiteBgLogo ? "32px" : "0",
                                    boxSizing: "border-box"
                                }}>
                                    <div
                                        style={{
                                            backgroundImage: `url('${prod.image}')`,
                                            backgroundSize: isContainImage ? "contain" : "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                            width: "100%",
                                            height: "100%"
                                        }}
                                        aria-label={prod.title}
                                    />
                                    {/* Overlay Gradient for tech feel */}
                                    {!isLogoImage && (
                                        <div style={{
                                            position: "absolute", inset: 0,
                                            background: `linear-gradient(to top, ${accent}15, transparent)`
                                        }}/>
                                    )}
                                </div>

                                {/* Content Column */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <div style={{
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            width: "44px", height: "44px", borderRadius: "12px",
                                            backgroundColor: `${accent}15`, color: accent,
                                            border: `1px solid ${accent}25`
                                        }}>
                                            {prod.icon}
                                        </div>
                                        <span style={{ 
                                            color: accent, 
                                            fontWeight: 700, 
                                            fontSize: "0.8rem", 
                                            textTransform: "uppercase", 
                                            letterSpacing: "0.05em" 
                                        }}>
                                            {prod.badge}
                                        </span>
                                    </div>
                                    <h3 style={{ 
                                        fontSize: "1.8rem", 
                                        fontWeight: 800, 
                                        color: "#ffffff",
                                        lineHeight: "1.3" 
                                    }}>
                                        {prod.title}
                                    </h3>
                                    <p style={{ 
                                        fontSize: "0.95rem", 
                                        color: "var(--text-secondary)", 
                                        lineHeight: "1.7",
                                        margin: 0
                                    }}>
                                        {prod.desc}
                                    </p>

                                    <motion.div
                                        whileHover={{ y: -2 }}
                                        whileTap={{ y: 0 }}
                                        style={{ width: "fit-content", marginTop: "12px" }}
                                    >
                                        <Link 
                                            href="/contact" 
                                            className="btn btn-outline"
                                            style={{ borderColor: `${accent}50`, color: "#ffffff" }}
                                        >
                                            Contact For More..
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
                </div>
            </section>

            {/* ── High-Conversion Outcome CTA ── */}
            <section style={{ backgroundColor: "rgba(10, 15, 28, 0.2)", padding: "80px 0", borderTop: "1px solid var(--border)" }}>
                <div className="container" style={{ textAlign: "center", maxWidth: "680px" }}>
                    <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#ffffff", marginBottom: "16px" }}>Ready to deploy digital solutions?</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.6", marginBottom: "32px" }}>
                        Partner with SAMSAN Technische Labs Pvt. Ltd. to customize, scale, and manage your IoT, AI, and digital platforms.
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                        <Link 
                            href="/contact" 
                            className="btn btn-primary"
                        >
                            Request Product Sandbox Access
                        </Link>
                        <Link 
                            href="/solutions" 
                            className="btn btn-outline"
                        >
                            View Other Products &amp; Accelerators
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
