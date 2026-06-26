"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";

const offerings = [
    {
        title: "Embedded Software",
        desc: "Embedded platform software, middleware and applications for various MCU and devices and operating systems. Device drivers / BSP, AUTOSAR framework, middleware components, HMIs, Communication and connectivity protocols, custom Tools."
    },
    {
        title: "Internet Of Things",
        desc: "Analog to Digital, IoT System Development, Gateways, connectivity protocols, Backend infrastructure / frameworks / cloud, Data Management & Analytics, AI / ML / DL management applications."
    },
    {
        title: "Hardware Design",
        desc: "Electronic System Design, Electronic Circuit Design, SoC/SoM/ SBC based electronics, Layout, Simulations /testing Automotive, Industrial, IoT, Custom."
    },
    {
        title: "Verification & Validation",
        desc: "Functional / Protocol / System Integration / Interoperability / Regression / Environmental / Matlab Simulink / Labview / Rhapsody / Cantata++ / dSpace HIL."
    },
    {
        title: "AUTOSAR & Cybersecurity",
        desc: "Consulting in AUTOSAR and Functional Safety, Cybersecurity."
    }
];

export default function EmbeddedSystemsPage() {
    const shouldReduce = useReducedMotion();

    return (
        <div style={{ paddingBottom: "80px" }}>
            {/* Page Hero */}
            <section className="page-hero" aria-labelledby="service-heading">
                <div className="container">
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={fadeUpVariants(shouldReduce)} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                            <Link href="/services" style={{ color: "var(--violet-mid)", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
                                Engineering Offerings
                            </Link>
                            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>/</span>
                            <span className="badge">Embedded Solutions</span>
                        </motion.div>
                        <motion.h1 id="service-heading" variants={fadeUpVariants(shouldReduce)} style={{ marginBottom: "20px" }}>
                            Embedded Solutions
                        </motion.h1>
                        <motion.p
                            className="lead"
                            variants={fadeUpVariants(shouldReduce)}
                            style={{ maxWidth: "700px" }}
                        >
                            Excellence in Product Design Engineering for High-Tech Industries. With a strong focus on the Automotive, Industrial, and Smart Building / Lighting sectors, we specialize in crafting Embedded devices and Products that elevate your Business to new heights.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Offerings */}
            <section className="section compact">
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "56px" }}>
                        <h2 style={{ fontSize: "1.8rem", marginBottom: "16px" }}>Excellence in Product Design Engineering</h2>
                        <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", lineHeight: "1.7" }}>
                            Our End-to-End Services include Consulting, Development, and Staffing, covering a diverse range of domains such as Embedded hardware, Platform Software, Middleware, HMI/Applications, and Specialized tools.
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "60px" }}>
                        {offerings.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUpVariants(shouldReduce)}
                                style={{
                                    background: "rgba(13, 19, 35, 0.45)",
                                    border: "1px solid rgba(255, 255, 255, 0.05)",
                                    borderRadius: "var(--radius)",
                                    padding: "32px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "16px"
                                }}
                            >
                                <div style={{
                                    width: "48px", height: "48px",
                                    borderRadius: "12px",
                                    background: "var(--grad-card)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "var(--violet-mid)"
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                                        <path d="M12 4v4M12 16v4M4 12h4M16 12h4" stroke="currentColor" strokeWidth="1.5"/>
                                    </svg>
                                </div>
                                <h3 style={{ fontSize: "1.2rem" }}>{item.title}</h3>
                                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Cinematic Visuals Grid */}
                    <div style={{ marginBottom: "60px" }}>
                        <h2 style={{ fontSize: "1.6rem", marginBottom: "32px", textAlign: "center" }}>Automotive & Engineering Solutions</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                            
                            <div style={{
                                height: "300px", borderRadius: "var(--radius-lg)",
                                backgroundImage: "url('/images/auto_cockpit_sys.png')",
                                backgroundSize: "cover", backgroundPosition: "center",
                                border: "1px solid rgba(255,255,255,0.08)",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                            }} />

                            <div style={{
                                height: "300px", borderRadius: "var(--radius-lg)",
                                backgroundImage: "url('/images/hardware_ecu.png')",
                                backgroundSize: "cover", backgroundPosition: "center",
                                border: "1px solid rgba(255,255,255,0.08)",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                            }} />

                        </div>
                    </div>
                    
                </div>
            </section>
        </div>
    );
}
