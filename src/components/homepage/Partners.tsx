"use client";

import { motion } from "framer-motion";

const partnerLogos = [
    { name: "AUTOSAR", subtitle: "Premium Partner" },
    { name: "QNX", subtitle: "Real-time OS" },
    { name: "VECTOR", subtitle: "Embedded Testing" },
    { name: "ELEKTROBIT", subtitle: "Software Products" },
    { name: "GREEN HILLS", subtitle: "Safety Certified" },
    { name: "WIND RIVER", subtitle: "Edge Computing" }
];

export default function Partners() {
    return (
        <section className="section compact" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "rgba(10, 15, 28, 0.2)" }}>
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        letterSpacing: "0.12em",
                        color: "var(--text-muted)",
                        textTransform: "uppercase"
                    }}>
                        Collaborating with industry standards
                    </span>
                    <h3 style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginTop: "8px", fontWeight: 500 }}>
                        Our Partners & Customers
                    </h3>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: "24px",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    {partnerLogos.map((logo) => (
                        <motion.div
                            key={logo.name}
                            whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.15)" }}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "20px 16px",
                                background: "rgba(255, 255, 255, 0.02)",
                                border: "1px solid rgba(255, 255, 255, 0.05)",
                                borderRadius: "var(--radius-sm)",
                                transition: "all 0.25s ease",
                                textAlign: "center",
                                cursor: "default"
                            }}
                        >
                            <span style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "1.15rem",
                                fontWeight: 700,
                                color: "#ffffff",
                                letterSpacing: "-0.02em"
                            }}>
                                {logo.name}
                            </span>
                            <span style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "8.5px",
                                color: "var(--text-muted)",
                                marginTop: "4px",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em"
                            }}>
                                {logo.subtitle}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
