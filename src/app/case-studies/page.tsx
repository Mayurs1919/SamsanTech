"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";

const caseStudies = [
    {
        title: "Digital Cockpit Engineering for Asian OEM",
        scope: "IVI / cluster / HMI / cockpit integration",
        value: "Faster cockpit feature development and production readiness"
    },
    {
        title: "Linux IVI Platform Development",
        scope: "BSP, middleware, application integration, diagnostics",
        value: "Vehicle-grade software platform support"
    },
    {
        title: "Android Automotive Porting",
        scope: "AAOS, HAL, VHAL, middleware, app integration",
        value: "Reduced platform bring-up time"
    },
    {
        title: "DMS / Driver Wellness Solution",
        scope: "Computer vision, in-cabin sensing, alerts, dashboard",
        value: "Safety and driver experience enhancement"
    },
    {
        title: "TCU / Connected Vehicle Gateway",
        scope: "Device connectivity, cloud telemetry, OTA readiness",
        value: "Foundation for connected mobility services"
    },
    {
        title: "GenAI Engineering Automation",
        scope: "Requirements, test generation, traceability, validation intelligence",
        value: "Productivity improvement across engineering lifecycle"
    }
];

export default function CaseStudiesPage() {
    const shouldReduce = useReducedMotion();

    return (
        <div style={{ paddingBottom: "100px", minHeight: "100vh", backgroundColor: "var(--midnight)" }}>
            
            {/* Page Hero */}
            <section className="page-hero" aria-labelledby="case-studies-heading" style={{ position: "relative", overflow: "hidden" }}>
                <div className="container">
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Breadcrumbs */}
                        <div style={{ display: "flex", gap: "8px", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "24px" }}>
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <span>&gt;</span>
                            <span style={{ color: "var(--text-primary)" }}>Case Studies</span>
                        </div>

                        <motion.div variants={fadeUpVariants(shouldReduce)}>
                            <span className="badge violet" style={{ marginBottom: "20px" }}>Case Studies</span>
                        </motion.div>
                        <motion.h1 id="case-studies-heading" variants={fadeUpVariants(shouldReduce)} style={{ marginBottom: "20px" }}>
                            Proven Engineering Success
                        </motion.h1>
                        <motion.p className="lead" variants={fadeUpVariants(shouldReduce)} style={{ maxWidth: "580px", color: "var(--text-secondary)" }}>
                            A track record of high-performance delivery across automotive infotainment, connected gateways, and AI-led automation.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Grid Section */}
            <section className="section compact">
                <div className="container">
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                        gap: "32px"
                    }}>
                        {caseStudies.map((study, index) => (
                            <motion.div
                                key={study.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                whileHover={{ y: -6 }}
                                style={{ height: "100%", display: "flex" }}
                            >
                                <div className="accel-card" style={{ 
                                    padding: "36px", 
                                    display: "flex", 
                                    flexDirection: "column", 
                                    gap: "20px", 
                                    width: "100%",
                                    justifyContent: "space-between"
                                }}>
                                    <h3 style={{ 
                                        fontSize: "1.3rem", 
                                        color: "#ffffff", 
                                        fontWeight: 700, 
                                        margin: 0, 
                                        lineHeight: "1.4",
                                        fontFamily: "var(--font-display)" 
                                    }}>
                                        {study.title}
                                    </h3>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "8px" }}>
                                        <div>
                                            <span style={{ 
                                                fontSize: "0.75rem", 
                                                textTransform: "uppercase", 
                                                letterSpacing: "0.08em", 
                                                color: "var(--text-muted)", 
                                                display: "block", 
                                                marginBottom: "4px" 
                                            }}>Scope</span>
                                            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: 0, lineHeight: "1.6" }}>
                                                {study.scope}
                                            </p>
                                        </div>
                                        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "12px" }}>
                                            <span style={{ 
                                                fontSize: "0.75rem", 
                                                textTransform: "uppercase", 
                                                letterSpacing: "0.08em", 
                                                color: "var(--text-muted)", 
                                                display: "block", 
                                                marginBottom: "4px" 
                                            }}>Value</span>
                                            <p style={{ fontSize: "0.9rem", color: "var(--mint)", margin: 0, lineHeight: "1.6", fontWeight: 500 }}>
                                                {study.value}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-inner">
                        <h2>Ready to accelerate your program?</h2>
                        <p>Discuss how our proven engineering methodologies can be applied to your automotive platform.</p>
                        <div className="cta-actions">
                            <Link href="/contact" className="btn btn-primary">
                                View Relevant Case Studies
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                                    <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
