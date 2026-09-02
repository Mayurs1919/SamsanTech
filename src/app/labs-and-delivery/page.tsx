"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";

export default function LabsAndDeliveryPage() {
    const shouldReduce = useReducedMotion();

    return (
        <div style={{ paddingBottom: "0" }}>

            {/* ── Page Hero — Dark Theme ── */}
            <section
                className="section-dark page-hero"
                aria-labelledby="labs-heading"
                style={{
                    background: "var(--midnight)",
                    padding: "140px 0 96px",
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                {/* Ambient violet glow */}
                <div style={{
                    position: "absolute",
                    top: "30%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "800px", height: "400px",
                    background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124, 58, 237, 0.12) 0%, transparent 70%)",
                    pointerEvents: "none", zIndex: 0
                }} />

                <div className="container" style={{ position: "relative", zIndex: 1 }}>
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={fadeUpVariants(shouldReduce)}>
                            <span
                                className="badge"
                                style={{
                                    marginBottom: "20px",
                                    color: "var(--violet-mid)",
                                    background: "rgba(139, 92, 246, 0.1)",
                                    border: "1px solid rgba(139, 92, 246, 0.25)",
                                    fontFamily: "var(--font-mono)",
                                    letterSpacing: "0.1em"
                                }}
                            >
                                Labs &amp; Delivery
                            </span>
                        </motion.div>

                        <motion.h1
                            id="labs-heading"
                            variants={fadeUpVariants(shouldReduce)}
                            style={{
                                marginBottom: "20px",
                                color: "var(--text-primary)",
                                fontFamily: "var(--font-display)",
                                fontWeight: 700,
                                lineHeight: 1.08,
                                fontSize: "clamp(2rem, 4vw, 3.2rem)"
                            }}
                        >
                            Inside SAMSAN Labs &amp; Delivery
                        </motion.h1>

                        <motion.p
                            className="lead"
                            variants={fadeUpVariants(shouldReduce)}
                            style={{
                                maxWidth: "580px",
                                color: "var(--text-secondary)",
                                lineHeight: 1.75,
                                fontFamily: "var(--font-body)",
                                fontSize: "1.05rem"
                            }}
                        >
                            A visual tour of our secure workspaces, simulation environments,
                            silicon validation suites, and delivery facilities.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── Coming Soon — Light Theme ── */}
            <section
                className="section-light section"
                style={{
                    background: "#F8FAFC",
                    padding: "108px 0",
                    position: "relative"
                }}
            >
                {/* Gradient fade from dark to light */}
                <div style={{
                    position: "absolute",
                    top: 0, left: 0, right: 0,
                    height: "64px",
                    background: "linear-gradient(to bottom, rgba(10, 15, 28, 0.05) 0%, transparent 100%)",
                    pointerEvents: "none",
                    zIndex: 1
                }} />

                <div className="container" style={{ position: "relative", zIndex: 2 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{
                            minHeight: "420px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            padding: "80px 40px",
                            gap: "20px",
                            background: "#FFFFFF",
                            borderRadius: "20px",
                            border: "1px solid rgba(15, 23, 42, 0.08)",
                            boxShadow: "0 4px 24px rgba(11, 19, 32, 0.07)",
                            maxWidth: "720px",
                            margin: "0 auto"
                        }}
                    >
                        {/* Icon */}
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            background: "rgba(232, 82, 26, 0.08)",
                            border: "1px solid rgba(232, 82, 26, 0.15)",
                            marginBottom: "8px"
                        }}>
                            <svg
                                width="40" height="40"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#E8521A"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M5 3h14" />
                                <path d="M5 21h14" />
                                <path d="M7 3v4.5A5 5 0 0 0 12 12a5 5 0 0 0 5-4.5V3" />
                                <path d="M7 21v-4.5A5 5 0 0 1 12 12a5 5 0 0 1 5 4.5V21" />
                            </svg>
                        </div>

                        {/* Heading */}
                        <h2 style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(1.6rem, 2.5vw, 2rem)",
                            fontWeight: 700,
                            color: "#0B1320",
                            margin: 0,
                            letterSpacing: "-0.02em",
                            lineHeight: 1.2
                        }}>
                            Labs &amp; Delivery
                        </h2>

                        {/* Status badge */}
                        <span style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.72rem",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            fontWeight: 600,
                            color: "#E8521A",
                            background: "rgba(232, 82, 26, 0.08)",
                            border: "1px solid rgba(232, 82, 26, 0.2)",
                            padding: "4px 12px",
                            borderRadius: "100px"
                        }}>
                            // Content Coming Soon
                        </span>

                        {/* Description */}
                        <p style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "1rem",
                            lineHeight: 1.75,
                            color: "#64748B",
                            maxWidth: "460px",
                            margin: 0
                        }}>
                            We&apos;re preparing a detailed showcase of our engineering workspaces,
                            cockpit demonstrators, validation benches, and team facilities.
                            Check back soon.
                        </p>

                        {/* CTA */}
                        <motion.div
                            whileHover={shouldReduce ? {} : { scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{ marginTop: "12px" }}
                        >
                            <Link
                                href="/contact"
                                className="btn btn-primary"
                                style={{
                                    backgroundColor: "#E8521A",
                                    color: "#FFFFFF",
                                    padding: "12px 28px",
                                    borderRadius: "8px",
                                    fontFamily: "var(--font-body)",
                                    fontWeight: 600,
                                    fontSize: "0.95rem",
                                    textDecoration: "none",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    transition: "background-color 0.2s ease"
                                }}
                            >
                                Contact Us in the Meantime
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
