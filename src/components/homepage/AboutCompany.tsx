"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AboutCompany() {
    const shouldReduce = useReducedMotion();

    return (
        <section className="section" id="about-company-section" style={{ position: "relative", overflow: "hidden", borderTop: "1px solid var(--border)" }}>
            
            {/* Background Glow */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "10%",
                width: "400px",
                height: "400px",
                background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
                transform: "translateY(-50%)"
            }} />

            <div className="container">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
                    
                    {/* Left side: Intro text */}
                    <div>
                        <span style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--rose)",
                            marginBottom: "16px",
                            display: "block"
                        }}>
                            A Technology Outcomes And Systems Company
                        </span>
                        
                        <h2 style={{ fontSize: "2.8rem", marginBottom: "28px", fontWeight: 700, letterSpacing: "-0.025em" }}>
                            We Are SAMSAN
                        </h2>

                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <p style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "var(--text-primary)" }}>
                                A specialized systems design house focused on high-integrity software platforms, embedded engineering, and digital transformation. Focused on Cockpit Engineering, ADAS, and connected mobility ecosystems.
                            </p>
                            <p style={{ fontSize: "0.95rem", lineHeight: "1.8", color: "var(--text-secondary)" }}>
                                We deliver full-lifecycle engineering, from concept definition to deployment. Serving global tier-1s, OEMs, and technology companies with premium software-defined architectures.
                            </p>
                        </div>

                        <div style={{
                            marginTop: "32px",
                            borderLeft: "2px solid var(--violet-mid)",
                            paddingLeft: "16px"
                        }}>
                            <span style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "12px",
                                fontWeight: 500,
                                letterSpacing: "0.08em",
                                color: "var(--text-secondary)",
                                textTransform: "uppercase"
                            }}>
                                Always in sync with the future
                            </span>
                        </div>
                    </div>

                    {/* Right side: Stats Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            background: "linear-gradient(135deg, rgba(22, 30, 53, 0.4) 0%, rgba(27, 36, 64, 0.4) 100%)",
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                            borderRadius: "var(--radius-lg)",
                            padding: "48px 40px",
                            backdropFilter: "blur(20px)",
                            position: "relative",
                            overflow: "hidden"
                        }}
                    >
                        {/* Corner light streak */}
                        <div style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: "150px",
                            height: "1px",
                            background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)"
                        }} />

                        <div style={{ marginBottom: "40px" }}>
                            <span className="badge" style={{ marginBottom: "16px" }}>Specialized Design House</span>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#ffffff", lineHeight: "1.3", letterSpacing: "-0.01em" }}>
                                Focus On Automotive, Cockpit Engineering & Digital Transformation.
                            </h3>
                        </div>

                        {/* Stats grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                            <div>
                                <div style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: "2.5rem",
                                    fontWeight: 700,
                                    color: "var(--text-primary)",
                                    lineHeight: 1
                                }}>
                                    50+
                                </div>
                                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "6px", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>
                                    Projects Completed
                                </div>
                            </div>
                            <div>
                                <div style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: "2.5rem",
                                    fontWeight: 700,
                                    color: "var(--text-primary)",
                                    lineHeight: 1
                                }}>
                                    6+
                                </div>
                                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "6px", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>
                                    Countries Served
                                </div>
                            </div>
                            <div>
                                <div style={{
                                    fontSize: "0.88rem",
                                    color: "var(--text-primary)",
                                    lineHeight: 1.6,
                                    fontWeight: 500
                                }}>
                                    India delivery center with global customer and partner presence across Europe, US, Japan and South Korea
                                </div>
                                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "6px", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>
                                    Global Footprint
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
