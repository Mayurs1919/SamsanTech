"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";

export default function LabsAndDeliveryPage() {
    const shouldReduce = useReducedMotion();

    return (
        <div style={{ paddingBottom: "80px", minHeight: "100vh", backgroundColor: "var(--midnight)" }}>
            
            {/* Page Hero */}
            <section className="page-hero" aria-labelledby="labs-heading" style={{ position: "relative", overflow: "hidden" }}>
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
                            <span style={{ color: "var(--text-primary)" }}>Labs & Delivery</span>
                        </div>

                        <motion.div variants={fadeUpVariants(shouldReduce)}>
                            <span className="badge" style={{ marginBottom: "20px" }}>Labs & Delivery</span>
                        </motion.div>
                        <motion.h1 id="labs-heading" variants={fadeUpVariants(shouldReduce)} style={{ marginBottom: "20px" }}>
                            Inside SAMSAN Labs & Delivery
                        </motion.h1>
                        <motion.p className="lead" variants={fadeUpVariants(shouldReduce)} style={{ maxWidth: "580px", color: "var(--text-secondary)" }}>
                            A visual tour of our secure workspaces, simulation environments, silicon validation suites, and delivery facilities.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Coming Soon Block */}
            <section className="section compact">
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
                            gap: "20px"
                        }}
                    >
                        {/* Hourglass Icon */}
                        <svg
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--mint)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M5 3h14" />
                            <path d="M5 21h14" />
                            <path d="M7 3v4.5A5 5 0 0 0 12 12a5 5 0 0 0 5-4.5V3" />
                            <path d="M7 21v-4.5A5 5 0 0 1 12 12a5 5 0 0 1 5 4.5V21" />
                        </svg>

                        {/* Heading */}
                        <h2 style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1.8rem",
                            fontWeight: 700,
                            color: "var(--text-primary)",
                            margin: 0
                        }}>
                            Labs & Delivery
                        </h2>

                        {/* Subheading */}
                        <span style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "12px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--mint)"
                        }}>
                            Content Coming Soon
                        </span>

                        {/* Description */}
                        <p style={{
                            fontSize: "1rem",
                            lineHeight: 1.75,
                            color: "var(--text-secondary)",
                            maxWidth: "480px",
                            margin: 0
                        }}>
                            We&apos;re preparing a detailed showcase of our engineering workspaces, cockpit demonstrators, validation benches, and team facilities. Check back soon.
                        </p>

                        {/* CTA Button */}
                        <motion.div
                            whileHover={shouldReduce ? {} : { scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            style={{ marginTop: "12px" }}
                        >
                            <Link href="/contact" className="btn btn-primary">
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
