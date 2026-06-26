"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";

const solutions = [
    {
        id: "v-scope",
        badge: "Embedded Solution",
        title: "Real-Time Vehicle Health Monitoring System (V-Scope)",
        desc: "A comprehensive monitoring and optimization platform designed for modern fleet owners and developers. V-Scope connects directly to internal networks to provide real-time diagnostics, enhancing safety and operations.",
        bullets: [
            "Continuous vehicle health monitoring & predictive optimization",
            "Advanced driver, passenger, and cargo safety guardrails",
            "Real-time utilization, diagnostic, and telemetry monitoring",
            "Indirect energy optimization & range estimation algorithms"
        ],
        image: "/images/auto_cockpit_sys.png",
        imageAlt: "Vehicle Health Monitoring HUD wireframe",
        accent: "var(--violet-mid)"
    },
    {
        id: "tcu",
        badge: "Embedded Solution",
        title: "Telematics Control Unit (TCU)",
        desc: "Our Telematics Control Unit (TCU) offers cutting-edge connectivity and vehicle data solutions, enabling real-time monitoring, remote diagnostics, and seamless communication between vehicles and backend systems. Designed for enhanced safety, performance, and driver convenience, the TCU integrates GPS tracking, cellular communication, and IoT capabilities, paving the way for connected, autonomous, and smarter vehicles. Whether for fleet management or consumer applications, our TCU ensures reliable, secure, and efficient vehicle connectivity in a fast-evolving mobility landscape.",
        bullets: [],
        image: "/images/iot_gateway.png",
        imageAlt: "Telematics Control Unit with connected vehicle data dashboard",
        accent: "var(--mint)"
    },
    {
        id: "etc",
        badge: "Embedded Solution",
        title: "ETC (Electronic Toll Collection)",
        desc: "ETC (Electronic Toll Collection) is a cutting-edge system designed to streamline toll payments and reduce congestion on highways. By enabling vehicles to pass through toll booths without stopping, ETC uses RFID technology and prepaid toll tags to automatically deduct charges. This hassle-free, cashless system not only saves time for drivers but also enhances road safety and reduces fuel consumption. Perfect for busy highways, ETC is transforming road travel, making toll collection faster, smarter, and more efficient.",
        bullets: [],
        image: "/images/serve_infrastructure.png",
        imageAlt: "Electronic Toll Collection smart transportation infrastructure",
        accent: "var(--rose)"
    }
];

export default function EmbeddedSolutionsPage() {
    const shouldReduce = useReducedMotion();

    return (
        <div style={{ backgroundColor: "var(--midnight)", color: "var(--text-primary)", minHeight: "100vh" }}>
            {/* ── Page Hero with Dark Banner ── */}
            <section 
                style={{ 
                    position: "relative",
                    backgroundImage: "linear-gradient(rgba(10, 15, 28, 0.75), rgba(10, 15, 28, 0.85)), url('/images/gallery_hil.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "120px 0 100px 0",
                    color: "#ffffff"
                }}
                aria-labelledby="embedded-heading"
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
                        <motion.h1 id="embedded-heading" variants={fadeUpVariants(shouldReduce)} style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "20px", color: "#ffffff", letterSpacing: "-0.02em" }}>
                            Embedded Solutions
                        </motion.h1>
                    </motion.div>
                </div>
            </section>

            {/* ── Subtitle Block ── */}
            <section style={{ padding: "64px 0 32px 0", textAlign: "center", backgroundColor: "var(--midnight)" }}>
                <div className="container">
                    <span style={{ color: "var(--violet-mid)", textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.8rem", fontWeight: 700, display: "block", marginBottom: "8px" }}>Our Solution</span>
                    <h2 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#ffffff" }}>Embedded Solutions</h2>
                    <div style={{ width: "60px", height: "3px", backgroundColor: "var(--violet-mid)", margin: "16px auto 0 auto", borderRadius: "100px" }}></div>
                </div>
            </section>

            {/* ── Solutions Listings ── */}
            <section style={{ padding: "32px 0 80px 0", backgroundColor: "var(--midnight)" }}>
                <div className="container" style={{ display: "flex", flexDirection: "column", gap: "96px" }}>
                    {solutions.map((sol, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <motion.div
                                key={sol.id}
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
                                    height: "360px",
                                    position: "relative"
                                }}>
                                    <div
                                        style={{
                                            backgroundImage: `url('${sol.image}')`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            width: "100%",
                                            height: "100%"
                                        }}
                                        aria-label={sol.imageAlt}
                                    />
                                    {/* Overlay Gradient for tech feel */}
                                    <div style={{
                                        position: "absolute", inset: 0,
                                        background: `linear-gradient(to top, ${sol.accent}15, transparent)`
                                    }}/>
                                </div>

                                {/* Content Column */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <span style={{ 
                                        color: sol.accent, 
                                        fontWeight: 700, 
                                        fontSize: "0.8rem", 
                                        textTransform: "uppercase", 
                                        letterSpacing: "0.05em" 
                                    }}>
                                        {sol.badge}
                                    </span>
                                    <h3 style={{ 
                                        fontSize: "1.8rem", 
                                        fontWeight: 800, 
                                        color: "#ffffff",
                                        lineHeight: "1.3" 
                                    }}>
                                        {sol.title}
                                    </h3>
                                    <p style={{ 
                                        fontSize: "0.95rem", 
                                        color: "var(--text-secondary)", 
                                        lineHeight: "1.7",
                                        margin: 0
                                    }}>
                                        {sol.desc}
                                    </p>

                                    {sol.bullets.length > 0 && (
                                        <ul style={{ 
                                            listStyle: "none", 
                                            padding: 0, 
                                            margin: "8px 0 16px 0", 
                                            display: "flex", 
                                            flexDirection: "column", 
                                            gap: "10px" 
                                        }}>
                                            {sol.bullets.map((bullet, idx) => (
                                                <li key={idx} style={{ 
                                                    fontSize: "0.9rem", 
                                                    color: "var(--text-primary)", 
                                                    position: "relative", 
                                                    paddingLeft: "24px",
                                                    lineHeight: "1.5"
                                                }}>
                                                    <span style={{ 
                                                        position: "absolute", 
                                                        left: 0, 
                                                        top: "6px", 
                                                        width: "6px", 
                                                        height: "6px", 
                                                        borderRadius: "50%", 
                                                        backgroundColor: sol.accent 
                                                    }} />
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <motion.div
                                        whileHover={{ y: -2 }}
                                        whileTap={{ y: 0 }}
                                        style={{ width: "fit-content", marginTop: "12px" }}
                                    >
                                        <Link 
                                            href="/contact" 
                                            className="btn btn-outline"
                                            style={{ borderColor: `${sol.accent}50`, color: "#ffffff" }}
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
            <section style={{ backgroundColor: "rgba(10, 15, 28, 0.2)", padding: "80px 0", borderTop: "1px solid var(--border)" }}>
                <div className="container" style={{ textAlign: "center", maxWidth: "680px" }}>
                    <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#ffffff", marginBottom: "16px" }}>Ready to modernise your hardware?</h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.6", marginBottom: "32px" }}>
                        Partner with SAMSAN Technische Labs Pvt. Ltd. to design, build, and deploy secure, high-performance embedded systems.
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                        <Link 
                            href="/contact" 
                            className="btn btn-primary"
                        >
                            Request Architecture Review
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
