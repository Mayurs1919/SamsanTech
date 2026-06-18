"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";

const digitalProducts = [
    {
        id: "maestro",
        badge: "Unified IoT Platform",
        title: "Maestro",
        desc: "Maestro unifies devices from different vendors—including vehicle cameras, building management systems, and industrial sensors—into a single operational dashboard. We operate the platform end-to-end; your team sees clear dashboards and timely alerts, while the infrastructure remains our responsibility.",
        image: "/images/iot_gateway.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2"/>
                <path d="M6 21h12M12 17v4"/>
            </svg>
        )
    },
    {
        id: "twinlink",
        badge: "Industrial Digital Twin",
        title: "TwinLink™",
        desc: "An advanced industrial digital twin and connectivity solution. TwinLink™ seamlessly bridges hardware and cloud connectivity, supporting complex industrial applications and focused IoT digital solutions for real-time asset monitoring.",
        image: "/images/serve_semiconductor.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M20 12l-8-8-8 8"/>
            </svg>
        )
    },
    {
        id: "mobile-apps",
        badge: "User Interface Platforms",
        title: "Mobile Applications & Platforms",
        desc: "High-performance custom mobile interfaces enabling end-users to interact with complex hardware systems. Includes real-time control dashboards, user onboarding, and seamless communication channels.",
        image: "/images/ai_digital_tech.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth="2"/>
                <circle cx="12" cy="18" r="1"/>
            </svg>
        )
    },
    {
        id: "samchat",
        badge: "AI Chat & Communication",
        title: "SamChat",
        desc: "A proprietary, intelligent chat-based communication platform focusing on AI chatbot integration, client assistance, automated customer service, and natural language query processing.",
        image: "/images/auto_cockpit_sys.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
        )
    },
    {
        id: "analytics",
        badge: "Enterprise Analytics",
        title: "Dashboard & Analytics Systems",
        desc: "Powerful data visualization and analysis pipelines that convert raw machine telemetry into actionable business insights. Displays historical telemetry, alerts, and system health charts.",
        image: "/images/digital_cloud_connectivity.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 20V10M12 20V4M6 20v-6"/>
            </svg>
        )
    },
    {
        id: "industrial-digital",
        badge: "OT-IT Integration",
        title: "Industrial & Production Systems",
        desc: "Real-world engineering meets digital operations. We develop the software bridge to integrate machinery, robotic hardware, and assembly line sensors with cloud orchestration networks.",
        image: "/images/serve_industrial.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
        )
    },
    {
        id: "gen-ai",
        badge: "Cognitive Computing",
        title: "AI & Generative AI",
        desc: "Integrate cutting-edge cognitive models, LLMs, and semantic search tools directly into your engineering workflows to automate specifications analysis and system verification.",
        image: "/images/embedded_engineering.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
        )
    },
    {
        id: "sdv",
        badge: "Automotive Software",
        title: "Software Defined Vehicle (SDV)",
        desc: "End-to-end software frameworks enabling over-the-air updates, isolated application containerization, and advanced vehicular communications inside a smart vehicle ecosystem.",
        image: "/images/serve_automotive.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18.5" cy="17.5" r="2.5"/>
                <circle cx="5.5" cy="17.5" r="2.5"/>
                <path d="M7 9h11l2 4v4H4v-4l3-4z"/>
            </svg>
        )
    },
    {
        id: "cockpit-sys",
        badge: "In-Vehicle HMI",
        title: "Driver & Cockpit Systems",
        desc: "Seamless integration between embedded automotive hardware and high-level digital user experiences. We power fluid HUDs, clusters, and multi-display dashboard setups.",
        image: "/images/gallery_hil.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20"/>
            </svg>
        )
    },
    {
        id: "lifecycle-delivery",
        badge: "Full Lifecycle Solutions",
        title: "End-to-End Delivery Services",
        desc: "TwinLink AI deployment and validation. SAMSAN supports the entire lifecycle from early stage consulting and systems design to cloud deployment and field validation.",
        image: "/images/serve_oems.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
        )
    }
];

export default function DigitalSolutionsPage() {
    const shouldReduce = useReducedMotion();

    return (
        <div style={{ backgroundColor: "#ffffff", color: "#0f172a", minHeight: "100vh" }}>
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
                            <Link href="/solutions" style={{ color: "#f26522", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
                                Solutions
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
            <section style={{ padding: "64px 0 32px 0", textAlign: "center", backgroundColor: "#ffffff" }}>
                <div className="container">
                    <span style={{ color: "#f26522", textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "8px" }}>Our Solution</span>
                    <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#0f172a" }}>Digital Solutions & Products</h2>
                    <div style={{ width: "60px", height: "3px", backgroundColor: "#f26522", margin: "16px auto 0 auto", borderRadius: "100px" }}></div>
                </div>
            </section>

            {/* ── Products Listings ── */}
            <section style={{ padding: "32px 0 80px 0", backgroundColor: "#ffffff" }}>
                <div className="container" style={{ display: "flex", flexDirection: "column", gap: "96px" }}>
                    {digitalProducts.map((prod, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <motion.div
                                key={prod.id}
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
                                    backgroundColor: isEven ? "#f8fafc" : "#ffffff",
                                    border: isEven ? "1px solid rgba(0, 0, 0, 0.04)" : "none",
                                    boxShadow: isEven ? "0 10px 30px rgba(0, 0, 0, 0.02)" : "none"
                                }}
                            >
                                {/* Image Column */}
                                <div style={{ 
                                    order: isEven ? 0 : 1,
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    border: "1px solid rgba(0, 0, 0, 0.08)",
                                    boxShadow: "0 12px 28px rgba(0, 0, 0, 0.05)",
                                    height: "360px",
                                    position: "relative"
                                }}>
                                    <div
                                        style={{
                                            backgroundImage: `url('${prod.image}')`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            width: "100%",
                                            height: "100%"
                                        }}
                                        aria-label={prod.title}
                                    />
                                    {/* Overlay Gradient for tech feel */}
                                    <div style={{
                                        position: "absolute", inset: 0,
                                        background: "linear-gradient(to top, rgba(242,101,34,0.08), transparent)"
                                    }}/>
                                </div>

                                {/* Content Column */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                        <div style={{
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            width: "44px", height: "44px", borderRadius: "12px",
                                            backgroundColor: "rgba(242, 101, 34, 0.1)", color: "#f26522",
                                            border: "1px solid rgba(242, 101, 34, 0.15)"
                                        }}>
                                            {prod.icon}
                                        </div>
                                        <span style={{ 
                                            color: "#f26522", 
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
                                        color: "#0f172a",
                                        lineHeight: "1.3" 
                                    }}>
                                        {prod.title}
                                    </h3>
                                    <p style={{ 
                                        fontSize: "0.95rem", 
                                        color: "#475569", 
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
                                            style={{ 
                                                display: "inline-block",
                                                backgroundColor: "#f26522",
                                                color: "#ffffff",
                                                padding: "14px 28px",
                                                borderRadius: "100px",
                                                fontWeight: 600,
                                                fontSize: "0.9rem",
                                                textDecoration: "none",
                                                boxShadow: "0 4px 14px rgba(242, 101, 34, 0.25)",
                                                transition: "background-color 0.2s, box-shadow 0.2s"
                                            }}
                                            className="hover:bg-[#d84e12] hover:shadow-lg"
                                        >
                                            Contact For More..
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ── High-Conversion Outcome CTA ── */}
            <section style={{ backgroundColor: "#f8fafc", padding: "80px 0", borderTop: "1px solid rgba(0, 0, 0, 0.05)" }}>
                <div className="container" style={{ textAlign: "center", maxWidth: "680px" }}>
                    <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>Ready to deploy digital solutions?</h2>
                    <p style={{ color: "#475569", fontSize: "1rem", lineHeight: "1.6", marginBottom: "32px" }}>
                        Partner with Samsan Labs to customize, scale, and manage your IoT, AI, and digital platforms.
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                        <Link 
                            href="/contact" 
                            style={{ 
                                display: "inline-block",
                                backgroundColor: "#f26522",
                                color: "#ffffff",
                                padding: "14px 32px",
                                borderRadius: "100px",
                                fontWeight: 600,
                                fontSize: "0.95rem",
                                textDecoration: "none",
                                boxShadow: "0 4px 14px rgba(242, 101, 34, 0.25)",
                                transition: "all 0.2s"
                            }}
                            className="hover:bg-[#d84e12] hover:shadow-lg"
                        >
                            Request Product Sandbox Access
                        </Link>
                        <Link 
                            href="/solutions" 
                            style={{ 
                                display: "inline-block",
                                border: "1px solid rgba(15, 23, 42, 0.15)",
                                color: "#0f172a",
                                padding: "14px 32px",
                                borderRadius: "100px",
                                fontWeight: 600,
                                fontSize: "0.95rem",
                                textDecoration: "none",
                                backgroundColor: "#ffffff",
                                transition: "all 0.2s"
                            }}
                            className="hover:bg-slate-50"
                        >
                            View Other Solutions
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
