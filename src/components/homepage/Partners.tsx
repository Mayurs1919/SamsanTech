"use client";

import { motion } from "framer-motion";

const technologies = [
    "AUTOSAR",
    "QNX",
    "Vector Tools",
    "Elektrobit",
    "Green Hills",
    "Wind River",
    "Android Automotive",
    "Linux",
    "Cloud-Native Stacks"
];

export default function Partners() {
    return (
        <section
            className="section compact"
            style={{
                borderTop: "1px solid rgba(15, 23, 42, 0.1)",
                borderBottom: "1px solid rgba(15, 23, 42, 0.1)",
            }}
        >
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "32px", maxWidth: "800px", margin: "0 auto 32px auto" }}>
                    <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        letterSpacing: "0.12em",
                        color: "#64748B",
                        textTransform: "uppercase"
                    }}>
                        Ecosystem Expertise
                    </span>
                    <h3 style={{
                        fontSize: "1.75rem",
                        color: "#0F172A",
                        marginTop: "8px",
                        marginBottom: "16px",
                        fontWeight: 600,
                        fontFamily: "var(--font-display)"
                    }}>
                        Platforms &amp; Tools Our Teams Work With
                    </h3>
                    <p style={{
                        color: "#334155",
                        fontSize: "0.95rem",
                        lineHeight: "1.8",
                        margin: 0
                    }}>
                        Our engineers work across leading automotive platforms, tools, operating systems, and middleware ecosystems including AUTOSAR, QNX, Vector tools, Elektrobit, Green Hills, Wind River, Android Automotive, Linux, and cloud-native stacks.
                    </p>
                </div>

                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: "900px",
                    margin: "0 auto"
                }}>
                    {technologies.map((tech) => (
                        <motion.div
                            key={tech}
                            whileHover={{
                                scale: 1.03,
                                borderColor: "rgba(15, 23, 42, 0.25)",
                                backgroundColor: "rgba(15, 23, 42, 0.06)"
                            }}
                            style={{
                                padding: "10px 20px",
                                background: "rgba(15, 23, 42, 0.04)",
                                border: "1px solid rgba(15, 23, 42, 0.12)",
                                borderRadius: "100px",
                                transition: "all 0.2s ease",
                                textAlign: "center",
                                cursor: "default"
                            }}
                        >
                            <span style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "0.85rem",
                                fontWeight: 500,
                                color: "#1E293B",
                                letterSpacing: "0.02em"
                            }}>
                                {tech}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
