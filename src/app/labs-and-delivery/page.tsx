"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";

export default function LabsAndDeliveryPage() {
    const shouldReduce = useReducedMotion();

    return (
        <div style={{ paddingBottom: "0" }}>
            
            {/* Page Hero (section-light) */}
            <section className="section-light page-hero" aria-labelledby="labs-heading" style={{ background: "#F8FAFC", padding: "80px 0 60px", position: "relative", overflow: "hidden" }}>
                <div className="container">
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Breadcrumbs */}
                        <div style={{ display: "flex", gap: "8px", fontSize: "0.85rem", color: "#64748B", marginBottom: "24px" }}>
                            <Link href="/" style={{ color: "#64748B", textDecoration: "none" }}>Home</Link>
                            <span style={{ fontWeight: 700, opacity: 0.6 }}>//</span>
                            <span style={{ color: "#0B1320", fontWeight: 600 }}>Labs &amp; Delivery</span>
                        </div>

                        <motion.div variants={fadeUpVariants(shouldReduce)}>
                            <span className="badge" style={{ marginBottom: "20px", color: "#E8521A", background: "rgba(232, 82, 26, 0.08)", border: "1px solid rgba(232, 82, 26, 0.2)" }}>Labs &amp; Delivery</span>
                        </motion.div>
                        <motion.h1 id="labs-heading" variants={fadeUpVariants(shouldReduce)} style={{ marginBottom: "20px", color: "#0B1320" }}>
                            Inside SAMSAN Labs &amp; Delivery
                        </motion.h1>
                        <motion.p className="lead" variants={fadeUpVariants(shouldReduce)} style={{ maxWidth: "580px", color: "#64748B" }}>
                            A visual tour of our secure workspaces, simulation environments, silicon validation suites, and delivery facilities.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Coming Soon Block (section-light) */}
            <section className="section-light section compact" style={{ background: "#F8FAFC", borderTop: "1px solid #E2E8F0", padding: "80px 0 120px 0" }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{
                            minHeight: "400px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            padding: "80px 40px",
                            gap: "20px",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "16px",
                            border: "1px solid #E2E8F0",
                            boxShadow: "0 2px 12px rgba(11,19,32,0.06)",
                            maxWidth: "720px",
                            margin: "0 auto"
                        }}
                    >
                        {/* Hourglass / Clock Icon */}
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(232, 82, 26, 0.08)",
                            marginBottom: "8px"
                        }}>
                            <svg
                                width="48"
                                height="48"
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
                            fontSize: "2rem",
                            fontWeight: 700,
                            color: "#0B1320",
                            margin: 0
                        }}>
                            Labs &amp; Delivery
                        </h2>

                        {/* Subheading */}
                        <span style={{
                            fontSize: "0.8rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            fontWeight: 700,
                            color: "#E8521A"
                        }}>
                            Content Coming Soon
                        </span>

                        {/* Description */}
                        <p style={{
                            fontSize: "1rem",
                            lineHeight: 1.75,
                            color: "#64748B",
                            maxWidth: "480px",
                            margin: 0
                        }}>
                            We&apos;re preparing a detailed showcase of our engineering workspaces, cockpit demonstrators, validation benches, and team facilities. Check back soon.
                        </p>

                        {/* CTA Button */}
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
                                    fontWeight: 600,
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

