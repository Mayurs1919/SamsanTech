"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ServiceCard, { Logos, WifiIcon, BluetoothIcon, MqttIcon, type TechChip } from "@/components/ui/ServiceCard";

// ── Embedded service card data ───────────────────────────────────
const embeddedCards = [
    {
        number: "01",
        title: "Embedded Software",
        iconColor: "#06B6D4",
        description: "Platform software, OS, and middleware for automotive MCUs and devices.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M9 9h6v6H9z" />
                <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
            </svg>
        ),
        techs: [
            { label: "AUTOSAR", isBadge: true },
            { label: "Linux", logoUrl: Logos.linux },
            { label: "Android", logoUrl: Logos.android },
            { label: "QNX", isBadge: true },
            { label: "Bluetooth", icon: <BluetoothIcon /> },
            { label: "Wi-Fi", icon: <WifiIcon /> },
            { label: "CAN Bus", isBadge: true },
        ] as TechChip[]
    },
    {
        number: "02",
        title: "Internet of Things (IoT)",
        iconColor: "#F59E0B",
        description: "End-to-end IoT development from edge devices to cloud — with AI/ML integration.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
            </svg>
        ),
        techs: [
            { label: "MQTT", icon: <MqttIcon /> },
            { label: "AWS", logoUrl: Logos.aws },
            { label: "Firebase", logoUrl: Logos.firebase },
            { label: "TensorFlow", logoUrl: Logos.tensorflow },
            { label: "Node.js", logoUrl: Logos.nodejs },
            { label: "Docker", logoUrl: Logos.docker },
            { label: "Kubernetes", logoUrl: Logos.kubernetes },
        ] as TechChip[]
    },
    {
        number: "03",
        title: "Hardware Design",
        iconColor: "#10B981",
        description: "Electronic design and simulation across automotive, industrial, IoT, and custom domains.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <path d="M6 14h4v4M6 6h6v4M18 6h-4v4M14 18v-4h4" />
                <circle cx="10" cy="14" r="1" /><circle cx="12" cy="10" r="1" />
                <circle cx="14" cy="10" r="1" /><circle cx="14" cy="14" r="1" />
            </svg>
        ),
        techs: [
            { label: "SoC", isBadge: true },
            { label: "SaM", isBadge: true },
            { label: "SBC", isBadge: true },
            { label: "PCB Layout", isBadge: true },
            { label: "SPICE Sim", isBadge: true },
        ] as TechChip[]
    },
    {
        number: "04",
        title: "Verification & Validation",
        iconColor: "#8B5CF6",
        description: "Comprehensive testing from functional to environmental — with industry-standard toolchains.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 11 2 2 4-4" />
            </svg>
        ),
        techs: [
            { label: "MATLAB", isBadge: true },
            { label: "LabVIEW", isBadge: true },
            { label: "Rhapsody", isBadge: true },
            { label: "Canata++", isBadge: true },
            { label: "dSpace HIL", isBadge: true },
            { label: "Jenkins", logoUrl: Logos.jenkins },
            { label: "GitHub", logoUrl: Logos.github },
        ] as TechChip[]
    },
    {
        number: "05",
        title: "AUTOSAR, Functional Safety & Cybersecurity",
        iconColor: "#EF4444",
        description: "Expert consulting across AUTOSAR architecture, ISO 26262 functional safety, and automotive cybersecurity.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
        techs: [
            { label: "AUTOSAR", isBadge: true },
            { label: "ISO 26262", isBadge: true },
            { label: "UNECE WP.29", isBadge: true },
            { label: "FuSa", isBadge: true },
            { label: "CySec", isBadge: true },
        ] as TechChip[]
    }
];

const specializedCards = [
    {
        number: "01",
        title: "System Engineering",
        iconColor: "#06B6D4",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="5" r="3" />
                <circle cx="5" cy="19" r="3" />
                <circle cx="19" cy="19" r="3" />
                <path d="M12 8v8M12 16H5M12 16h7" />
            </svg>
        ),
        techs: [
            { label: "[PLACEHOLDER]", isBadge: true }
        ] as TechChip[]
    },
    {
        number: "02",
        title: "Platform Engineering",
        iconColor: "#F59E0B",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5M12 2L2 7l10 5 10-5-10-5z" />
            </svg>
        ),
        techs: [
            { label: "[PLACEHOLDER]", isBadge: true }
        ] as TechChip[]
    },
    {
        number: "03",
        title: "V&V Services",
        iconColor: "#10B981",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 11 2 2 4-4" />
            </svg>
        ),
        techs: [
            { label: "[PLACEHOLDER]", isBadge: true }
        ] as TechChip[]
    },
    {
        number: "04",
        title: "HMI Development",
        iconColor: "#8B5CF6",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
        techs: [
            { label: "[PLACEHOLDER]", isBadge: true }
        ] as TechChip[]
    },
    {
        number: "05",
        title: "App Development",
        iconColor: "#EC4899",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
        ),
        techs: [
            { label: "[PLACEHOLDER]", isBadge: true }
        ] as TechChip[]
    },
    {
        number: "06",
        title: "Full-Stack Web Development",
        iconColor: "#3B82F6",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        techs: [
            { label: "[PLACEHOLDER]", isBadge: true }
        ] as TechChip[]
    },
    {
        number: "07",
        title: "AI/ML Engineering",
        iconColor: "#10B981",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
            </svg>
        ),
        techs: [
            { label: "[PLACEHOLDER]", isBadge: true }
        ] as TechChip[]
    },
    {
        number: "08",
        title: "Cloud Engineering",
        iconColor: "#06B6D4",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
            </svg>
        ),
        techs: [
            { label: "[PLACEHOLDER]", isBadge: true }
        ] as TechChip[]
    }
];

// ── Animation Variants ───────────────────────────────────────────
const cardAnimationVariants = (shouldReduce: boolean) => ({
    hidden: {
        opacity: 0,
        y: shouldReduce ? 0 : 24
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: shouldReduce
            ? { duration: 0 }
            : { duration: 0.5, ease: "easeOut" as const }
    }
});

const containerAnimationVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const labelAnimationVariants = (shouldReduce: boolean) => ({
    hidden: {
        opacity: 0,
        y: shouldReduce ? 0 : 24
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: shouldReduce
            ? { duration: 0 }
            : { duration: 0.4, ease: "easeOut" as const }
    }
});

// ── Page component ───────────────────────────────────────────────
export default function ServicesPage() {
    const shouldReduce = useReducedMotion() ?? false;

    return (
        <div style={{ paddingBottom: "100px" }}>

            {/* SECTION 0 — PAGE HEADER */}
            <section className="section-dark page-hero" aria-labelledby="services-page-heading" style={{ background: "#0A0D11", padding: "80px 0" }}>
                <div className="hero-glow" style={{ opacity: 0.15 }} />
                <div className="container">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 }
                        }}
                    >
                        <motion.div
                            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                            transition={shouldReduce ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
                        >
                            <span className="badge" style={{ marginBottom: "24px", letterSpacing: "0.12em", fontFamily: "var(--font-mono)", color: "#4DD8E8", background: "rgba(77, 216, 232, 0.08)", border: "1px solid rgba(77, 216, 232, 0.2)" }}>
                                Engineering Offerings
                            </span>
                        </motion.div>
                        <motion.h1
                            id="services-page-heading"
                            style={{ marginBottom: "20px", fontWeight: 700, lineHeight: 1.08, color: "#FFFFFF" }}
                            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                            transition={shouldReduce ? { duration: 0 } : { duration: 0.6, ease: "easeOut", delay: 0.1 }}
                        >
                            Excellence in Product Design Engineering for High-Tech Industries
                        </motion.h1>
                        <motion.p
                            className="lead"
                            style={{ maxWidth: "640px", fontSize: "1.1rem", lineHeight: "1.7", color: "#94A3B8" }}
                            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                            transition={shouldReduce ? { duration: 0 } : { duration: 0.6, ease: "easeOut", delay: 0.35 }}
                        >
                            Two core practice areas — Automotive Embedded Engineering and Digital Solutions — delivered by 50+ domain-aligned engineers across global OEM and Tier-1 engagements.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 1 — AUTOMOTIVE EMBEDDED SOLUTIONS */}
            <section className="section-light section" style={{ background: "#F8FAFC", borderTop: "1px solid #E2E8F0", padding: "80px 0" }} aria-labelledby="embedded-solutions-heading">
                <div className="container">
                    <div style={{ marginBottom: "48px" }}>
                        <motion.span
                            className="badge"
                            variants={labelAnimationVariants(shouldReduce)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            style={{ marginBottom: "8px", display: "inline-block", color: "#E8521A", background: "rgba(232, 82, 26, 0.08)", border: "1px solid rgba(232, 82, 26, 0.2)" }}
                        >
                            Automotive Embedded Solutions & Products
                        </motion.span>
                        <h2 id="embedded-solutions-heading" style={{ marginTop: "0", marginBottom: "16px", fontWeight: 700, letterSpacing: "0.01em", color: "#0B1320" }}>
                            Embedded Engineering, End to End.
                        </h2>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6"
                        variants={containerAnimationVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {embeddedCards.map((card, idx) => {
                            let colClass = "col-span-1 md:col-span-1 lg:col-span-2";
                            if (idx === 3) colClass = "col-span-1 md:col-span-1 lg:col-span-2 lg:col-start-2";
                            if (idx === 4) colClass = "col-span-1 md:col-span-2 lg:col-span-2 lg:col-start-4";

                            return (
                                <motion.div key={card.title} className={colClass} variants={cardAnimationVariants(shouldReduce)}>
                                    <ServiceCard
                                        number={card.number}
                                        title={card.title}
                                        description={card.description}
                                        icon={card.icon}
                                        iconColor={card.iconColor}
                                        techs={card.techs}
                                        techsLabel="CAPABILITIES"
                                        theme="light"
                                    />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2 — SPECIALIZED SERVICES */}
            <section className="section-dark section" style={{ background: "#0A0D11", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "80px 0" }} aria-labelledby="specialized-services-heading">
                <div className="container">
                    <div style={{ marginBottom: "48px" }}>
                        <motion.span
                            className="badge"
                            variants={labelAnimationVariants(shouldReduce)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            style={{ marginBottom: "8px", display: "inline-block", color: "#4DD8E8", background: "rgba(77, 216, 232, 0.08)", border: "1px solid rgba(77, 216, 232, 0.2)" }}
                        >
                            Engineering Services
                        </motion.span>
                        <h2 id="specialized-services-heading" style={{ marginTop: "0", marginBottom: "16px", fontWeight: 700, letterSpacing: "0.01em", color: "#F1F5F9" }}>
                            Specialized Services Across the Full Engineering Lifecycle
                        </h2>
                        <p style={{ fontSize: "1.05rem", lineHeight: "1.7", maxWidth: "600px", color: "#94A3B8", margin: "0" }}>
                            Domain-aligned engineering services delivered by 50+ specialists across automotive, embedded, digital, and AI engineering disciplines.
                        </p>
                    </div>

                    <style>{`
                        .specialized-flex-grid {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 24px;
                            justify-content: center;
                        }
                        .specialized-card-wrapper {
                            width: calc(33.333% - 16px);
                        }
                        @media (max-width: 1024px) {
                            .specialized-card-wrapper {
                                width: calc(50% - 12px);
                            }
                        }
                        @media (max-width: 640px) {
                            .specialized-card-wrapper {
                                width: 100%;
                            }
                        }
                    `}</style>

                    <motion.div
                        className="specialized-flex-grid"
                        variants={containerAnimationVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {specializedCards.map((card) => (
                            <motion.div key={card.title} className="specialized-card-wrapper" variants={cardAnimationVariants(shouldReduce)}>
                                <ServiceCard
                                    number={card.number}
                                    title={card.title}
                                    description={
                                        <div style={{
                                            border: "1px dashed rgba(255,255,255,0.2)",
                                            borderRadius: "8px",
                                            padding: "12px 16px",
                                            textAlign: "center",
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "0.8rem",
                                            color: "#94A3B8",
                                            background: "rgba(255,255,255,0.03)"
                                        }}>
                                            Content coming soon
                                        </div>
                                    }
                                    icon={card.icon}
                                    iconColor={card.iconColor}
                                    techs={card.techs}
                                    techsLabel="CAPABILITIES"
                                    theme="dark"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* SECTION 4 — BOTTOM CTA */}
            <section className="section-light cta-section" style={{ background: "#F8FAFC", borderTop: "1px solid #E2E8F0", padding: "80px 0" }} aria-labelledby="services-cta-heading">
                <div className="container">
                    <motion.div
                        className="cta-inner"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 id="services-cta-heading" style={{ color: "#e9ecefff" }}>Ready to scope an engineering engagement?</h2>
                        <p className="lead" style={{ color: "#e9ecefff" }}>
                            Tell us what you're building — we'll match the right discipline and team to your program.
                        </p>
                        <div className="cta-actions">
                            <Link href="/contact?product=engineering-offerings" className="btn btn-primary" id="services-cta-btn" style={{ background: "#E8521A", color: "#FFFFFF" }}>
                                Request Capability Walkthrough
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
