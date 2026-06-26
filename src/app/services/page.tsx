"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";

const services = [
    {
        accent: "violet",
        number: "01",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <rect x="6" y="6" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M6 11H3M6 17H3M22 11h3M22 17h3M11 6V3M17 6V3M11 22v3M17 22v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <circle cx="14" cy="14" r="2.5" fill="currentColor"/>
            </svg>
        ),
        title: "Embedded Systems",
        href: "/services/embedded-systems",
        description: "Vehicle-grade embedded software built for cockpit, telematics, and connectivity systems where timing and reliability are mission-critical.",
        items: [
            "Cockpit & infotainment platforms",
            "Telematics & connectivity stacks",
            "Diagnostics & middleware",
            "Safety & functional safety (ISO 26262)",
        ],
    },
    {
        accent: "mint",
        number: "02",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <path d="M14 3C8.48 3 4 7.48 4 13s4.48 10 10 10 10-4.48 10-10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <path d="M18 3a7 7 0 0 1 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <path d="M10 13l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ),
        title: "Digital & Cloud Platforms",
        href: "/services/digital-platforms",
        description: "Cloud-native platforms for software-defined vehicles — built to ingest sensor data, scale across vehicle fleets, and ship OTA updates reliably.",
        items: [
            "AI/ML & computer vision systems",
            "IoT integration & fleet telemetry",
            "Full-stack & cloud-native platforms",
            "OTA update orchestration",
        ],
    },
    {
        accent: "rose",
        number: "03",
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="1.6"/>
                <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M14.5 13.5l2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
        ),
        title: "Engagement Models",
        href: "/engagement-models",
        description: "Explore our flexible models structured to align with your program timeline and organizational needs.",
        items: [],
        buttonText: "View Engagement Models",
    },
];

const accelerators = [
    {
        number: "01",
        title: "GenAI AutoMATE",
        description: "Applies generative AI across the automotive software delivery pipeline — from code generation to test scaffolding — so teams spend their time on the parts of the system that actually differentiate the product.",
        tags: ["Code Generation", "Test Scaffolding", "Pipeline Automation", "AUTOSAR Support"],
    },
    {
        number: "02",
        title: "GenAI System Engg",
        description: "Brings GenAI into requirements capture, architecture documentation, and validation planning — the system-engineering work that usually slows a programme down before a line of code is written.",
        tags: ["Requirements Capture", "Architecture Documentation", "Validation Planning", "Traceability"],
    },
];

export default function ServicesPage() {
    const shouldReduce = useReducedMotion();

    return (
        <>

            {/* Page Hero */}
            <section className="page-hero" aria-labelledby="services-page-heading">
                <div className="container">
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={fadeUpVariants(shouldReduce)}>
                            <span className="badge" style={{ marginBottom: "24px" }}>Engineering Offerings</span>
                        </motion.div>
                        <motion.h1 id="services-page-heading" variants={fadeUpVariants(shouldReduce)} style={{ marginBottom: "20px" }}>
                            Engineering across the full vehicle software stack
                        </motion.h1>
                        <motion.p className="lead" variants={fadeUpVariants(shouldReduce)} style={{ maxWidth: "580px" }}>
                            Three disciplines, one specialization. Everything we build sits inside Software Defined Vehicles, connected mobility, and AI-driven automotive innovation.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section" aria-labelledby="core-services-heading">
                <div className="container">
                    <div style={{ marginBottom: "56px" }}>
                        <h2 id="core-services-heading" style={{ marginBottom: "12px" }}>Core disciplines</h2>
                        <p className="lead" style={{ maxWidth: "520px" }}>
                            Each discipline is delivered by engineers who specialize exclusively in automotive software — not generalists adapting to the domain.
                        </p>
                    </div>

                    <motion.div
                        className="services-grid"
                        variants={staggerContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {services.map((s) => (
                            <motion.div
                                key={s.title}
                                variants={fadeUpVariants(shouldReduce)}
                            >
                                <Link href={s.href} className="service-card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginBottom: "24px",
                                    }}>
                                        <div className={`service-icon ${s.accent}`}>
                                            {s.icon}
                                        </div>
                                        <span style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "11px",
                                            color: "var(--text-muted)",
                                            letterSpacing: "0.08em",
                                        }}>
                                            {s.number}
                                        </span>
                                    </div>
                                    <h3>{s.title}</h3>
                                    <p>{s.description}</p>
                                    {s.items && s.items.length > 0 ? (
                                        <ul>
                                            {s.items.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div style={{ marginTop: "24px", color: "var(--rose)", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                                            {s.buttonText || "Learn More"}
                                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Accelerators */}
            <section className="section" style={{ background: "var(--navy)" }} aria-labelledby="accel-page-heading">
                <div className="container">
                    <div style={{ marginBottom: "56px" }}>
                        <span className="badge rose" style={{ marginBottom: "16px" }}>Accelerators</span>
                        <h2 id="accel-page-heading" style={{ marginTop: "16px", marginBottom: "12px" }}>
                            Pre-built, not bolted on.
                        </h2>
                        <p className="lead" style={{ maxWidth: "540px" }}>
                            GenAI AutoMATE and GenAI System Engg ship into engagements from day one — proven tools that compress delivery timelines, not experiments.
                        </p>
                    </div>

                    <motion.div
                        className="accelerators-grid"
                        variants={staggerContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {accelerators.map((a) => (
                            <motion.div
                                key={a.title}
                                className="accel-card"
                                variants={fadeUpVariants(shouldReduce)}
                            >
                                <div className="accel-number">Accelerator {a.number}</div>
                                <h3>{a.title}</h3>
                                <p>{a.description}</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "24px" }}>
                                    {a.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            style={{
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "10.5px",
                                                letterSpacing: "0.06em",
                                                color: "var(--text-muted)",
                                                border: "1px solid var(--border)",
                                                borderRadius: "100px",
                                                padding: "4px 12px",
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section" aria-labelledby="services-cta-heading">
                <div className="container">
                    <motion.div
                        className="cta-inner"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="badge mint" style={{ marginBottom: "24px" }}>Ready to build?</span>
                        <h2 id="services-cta-heading">Ready to scope an engagement?</h2>
                        <p className="lead">
                            Tell us which discipline you need first — we&apos;ll take it from there.
                        </p>
                        <div className="cta-actions">
                            <Link href="/contact" className="btn btn-primary" id="services-cta-btn">
                                Request Capability Walkthrough
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </>
    );
}
