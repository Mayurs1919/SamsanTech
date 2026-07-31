"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function ValueTable() {
    const shouldReduce = useReducedMotion();

    return (
        <section
            style={{
                width: "100%",
                display: "block",
                position: "relative",
                overflow: "hidden",
                padding: "64px 0",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
        >
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div style={{ textAlign: "center", marginBottom: "36px" }}>
                        <span className="badge rose" style={{ marginBottom: "16px", fontSize: "12px", letterSpacing: "0.12em", fontWeight: 500 }}>Value Creation</span>
                        <h2 id="value-heading" style={{
                            fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                            fontWeight: 700,
                            lineHeight: 1.12,
                            letterSpacing: "-0.01em",
                            color: "#ffffff",
                            marginBottom: "16px"
                        }}>
                            Where SAMSAN Creates Value
                        </h2>
                        <p className="lead" style={{
                            maxWidth: "600px",
                            margin: "0 auto",
                            color: "var(--text-secondary)",
                            fontSize: "1.1rem",
                            lineHeight: "1.75"
                        }}>
                            How we align our specialized automotive engineering capabilities with your critical program requirements.
                        </p>
                    </div>

                    <div className="spec-table" style={{ width: "100%", maxWidth: "900px", margin: "0 auto", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                        {/* Header Row */}
                        <div className="comparison-row comparison-header" style={{ borderBottom: "2px solid rgba(255, 255, 255, 0.12)" }}>
                            <div className="spec-key" style={{ background: "var(--navy-light)", color: "var(--text-primary)", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", borderRight: "1px solid rgba(255, 255, 255, 0.08)", padding: "18px 24px" }}>
                                Customer Need
                            </div>
                            <div className="spec-val" style={{ background: "var(--navy-light)", color: "var(--text-primary)", fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", padding: "18px 24px" }}>
                                SAMSAN Response
                            </div>
                        </div>

                        {/* Row 1 */}
                        <motion.div
                            className="comparison-row"
                            style={{ background: "rgba(13,19,35,0.6)", minHeight: "64px" }}
                            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: "easeOut", delay: 0 }}
                        >
                            <div className="spec-key" style={{ padding: "18px 24px", fontSize: "12px", letterSpacing: "0.06em", fontWeight: 600, color: "var(--mint)", textTransform: "uppercase" }}>
                                Need cockpit / IVI / cluster engineering
                            </div>
                            <div className="spec-val" style={{ padding: "18px 24px", fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 400 }}>
                                Android Automotive, QNX/Linux, HMI, middleware, validation
                            </div>
                        </motion.div>

                        {/* Row 2 */}
                        <motion.div
                            className="comparison-row"
                            style={{ background: "rgba(255,255,255,0.025)", minHeight: "64px" }}
                            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: "easeOut", delay: 0.08 }}
                        >
                            <div className="spec-key" style={{ padding: "18px 24px", fontSize: "12px", letterSpacing: "0.06em", fontWeight: 600, color: "var(--mint)", textTransform: "uppercase" }}>
                                Need connected vehicle / telematics platform
                            </div>
                            <div className="spec-val" style={{ padding: "18px 24px", fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 400 }}>
                                TCU, cloud telemetry, OTA, IoT gateway, diagnostics
                            </div>
                        </motion.div>

                        {/* Row 3 */}
                        <motion.div
                            className="comparison-row"
                            style={{ background: "rgba(13,19,35,0.6)", minHeight: "64px" }}
                            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: "easeOut", delay: 0.16 }}
                        >
                            <div className="spec-key" style={{ padding: "18px 24px", fontSize: "12px", letterSpacing: "0.06em", fontWeight: 600, color: "var(--mint)", textTransform: "uppercase" }}>
                                Need faster engineering lifecycle
                            </div>
                            <div className="spec-val" style={{ padding: "18px 24px", fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 400 }}>
                                GenAI requirements, test generation, traceability, code/test acceleration
                            </div>
                        </motion.div>

                        {/* Row 4 */}
                        <motion.div
                            className="comparison-row"
                            style={{ background: "rgba(255,255,255,0.025)", minHeight: "64px" }}
                            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: "easeOut", delay: 0.24 }}
                        >
                            <div className="spec-key" style={{ padding: "18px 24px", fontSize: "12px", letterSpacing: "0.06em", fontWeight: 600, color: "var(--mint)", textTransform: "uppercase" }}>
                                Need automotive-domain capacity
                            </div>
                            <div className="spec-val" style={{ padding: "18px 24px", fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 400 }}>
                                Strategic staffing, CoE, BOT, managed teams
                            </div>
                        </motion.div>

                        {/* Row 5 */}
                        <motion.div
                            className="comparison-row"
                            style={{ background: "rgba(13,19,35,0.6)", minHeight: "64px" }}
                            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: "easeOut", delay: 0.32 }}
                        >
                            <div className="spec-key" style={{ padding: "18px 24px", fontSize: "12px", letterSpacing: "0.06em", fontWeight: 600, color: "var(--mint)", textTransform: "uppercase" }}>
                                Need production-grade quality
                            </div>
                            <div className="spec-val" style={{ padding: "18px 24px", fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 400 }}>
                                ASPICE, ISO 26262, cybersecurity, MISRA, V&amp;V discipline
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
