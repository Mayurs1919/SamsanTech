"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const valueData = [
    {
<<<<<<< HEAD
        need: "COCKPIT / IVI / CLUSTER ENGINEERING",
        response: "Android Automotive, QNX/Linux, Virtual SDK Cloud-Based , HMI, middleware, validation"
    },
    {
        need: "CONNECTED VEHICLE / TELEMATICS PLATFORM",
        response: "TCU, cloud telemetry, OTA, IoT gateway, diagnostics"
    },
    {
        need: "FASTER ENGINEERING LIFECYCLE",
        response: "GenAI requirements, test generation, traceability, code/test acceleration"
    },
    {
        need: "AUTOMOTIVE-DOMAIN CAPACITY",
        response: "Strategic staffing, CoE, BOT, managed teams"
    },
    {
        need: "PRODUCTION-GRADE QUALITY",
=======
        need: "NEED COCKPIT / IVI / CLUSTER ENGINEERING",
        response: "Android Automotive, QNX/Linux, HMI, middleware, validation"
    },
    {
        need: "NEED CONNECTED VEHICLE / TELEMATICS PLATFORM",
        response: "TCU, cloud telemetry, OTA, IoT gateway, diagnostics"
    },
    {
        need: "NEED FASTER ENGINEERING LIFECYCLE",
        response: "GenAI requirements, test generation, traceability, code/test acceleration"
    },
    {
        need: "NEED AUTOMOTIVE-DOMAIN CAPACITY",
        response: "Strategic staffing, CoE, BOT, managed teams"
    },
    {
        need: "NEED PRODUCTION-GRADE QUALITY",
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
        response: "ASPICE, ISO 26262, cybersecurity, MISRA, V&V discipline"
    }
];

function ValueRow({ need, response, index, shouldReduce }: { need: string; response: string; index: number; shouldReduce: boolean }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="comparison-row"
            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: "grid",
                background: isHovered ? "rgba(232, 82, 26, 0.04)" : "#FFFFFF",
                borderLeft: isHovered ? "3px solid #E8521A" : "3px solid transparent",
                borderBottom: index < valueData.length - 1 ? "1px solid #E2E8F0" : "none",
                transition: "background 0.2s ease, border-left-color 0.2s ease",
                marginLeft: isHovered ? "-3px" : "0px",
                minHeight: "64px"
            }}
        >
            <div className="spec-key" style={{
                padding: "20px 24px",
                fontSize: "0.88rem",
                letterSpacing: "0.04em",
                fontWeight: 700,
                color: "#E8521A",
                textTransform: "uppercase",
                background: "#F8FAFC",
                borderRight: "1px solid #E2E8F0",
                fontFamily: "var(--font-sans)",
                display: "flex",
                alignItems: "center"
            }}>
                {need}
            </div>
            <div className="spec-val" style={{
                padding: "20px 24px",
                fontSize: "0.95rem",
                color: "#0B1320",
                fontWeight: 400,
                lineHeight: "1.6",
                background: "transparent",
                fontFamily: "var(--font-sans)",
                display: "flex",
                alignItems: "center"
            }}>
                {response}
            </div>
        </motion.div>
    );
}

export default function ValueTable() {
    const shouldReduce = useReducedMotion();

    return (
        <section
            className="section-light"
            style={{
                width: "100%",
                display: "block",
                position: "relative",
                overflow: "hidden",
                padding: "80px 0",
                background: "#F8FAFC",
                borderTop: "1px solid #E2E8F0"
            }}
        >
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
<<<<<<< HEAD
=======
                        <span className="badge" style={{ marginBottom: "16px", color: "#E8521A", background: "rgba(232, 82, 26, 0.08)", border: "1px solid rgba(232, 82, 26, 0.2)" }}>
                            Value Creation
                        </span>
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
                        <h2 id="value-heading" style={{
                            fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                            fontWeight: 700,
                            lineHeight: 1.15,
                            letterSpacing: "-0.01em",
                            color: "#0B1320",
                            marginBottom: "16px"
                        }}>
                            Where SAMSAN Creates Value
                        </h2>
                        <p className="lead" style={{
                            maxWidth: "600px",
                            margin: "0 auto",
                            color: "#64748B",
                            fontSize: "1.05rem",
                            lineHeight: "1.75"
                        }}>
                            How we align our specialized automotive engineering capabilities with your critical program requirements.
                        </p>
                    </div>

                    <div className="spec-table value-table-responsive-wrapper" style={{
                        width: "100%",
                        maxWidth: "960px",
                        margin: "0 auto",
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "1px solid #E2E8F0",
                        background: "#FFFFFF",
                        boxShadow: "0 2px 12px rgba(11,19,32,0.04)"
                    }}>
                        {/* Table Header Row */}
                        <div className="comparison-row comparison-header" style={{
                            display: "grid",
                            borderBottom: "2px solid #E2E8F0",
                            background: "#F1F5F9"
                        }}>
                            <div className="spec-key" style={{
                                background: "#F1F5F9",
                                color: "#0B1320",
                                fontWeight: 700,
                                fontSize: "0.85rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                borderRight: "1px solid #E2E8F0",
                                padding: "18px 24px",
                                fontFamily: "var(--font-sans)"
                            }}>
                                CUSTOMER NEED
                            </div>
                            <div className="spec-val" style={{
                                background: "#F1F5F9",
                                color: "#0B1320",
                                fontWeight: 700,
                                fontSize: "0.85rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                padding: "18px 24px",
                                fontFamily: "var(--font-sans)"
                            }}>
<<<<<<< HEAD
                                SAMSAN SOLUTION
=======
                                SAMSAN RESPONSE
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
                            </div>
                        </div>

                        {/* Table Data Rows */}
                        {valueData.map((row, idx) => (
                            <ValueRow
                                key={idx}
                                need={row.need}
                                response={row.response}
                                index={idx}
                                shouldReduce={!!shouldReduce}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
