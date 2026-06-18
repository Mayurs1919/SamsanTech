"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const fadeUp = (reduced: boolean | null, delay = 0) => ({
    hidden: { opacity: 0, y: reduced ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as any } },
});

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const services = [
    {
        accent: "violet",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5 9H3M5 15H3M19 9h2M19 15h2M9 5V3M15 5V3M9 19v2M15 19v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
            </svg>
        ),
        title: "Embedded Systems",
        description: "Vehicle-grade embedded software built for cockpit, telematics, and connectivity systems where timing and reliability aren't optional.",
        items: ["Cockpit & infotainment platforms", "Telematics & connectivity stacks", "Diagnostics & middleware"],
    },
    {
        accent: "mint",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M16 3a5 5 0 0 1 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ),
        title: "Digital & Cloud",
        description: "Cloud-native platforms for software-defined vehicles — built to integrate sensor data, scale with fleets, and ship updates continuously.",
        items: ["AI/ML & computer vision", "IoT integration & telemetry", "Full-stack & cloud-native platforms"],
    },
    {
        accent: "rose",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="17" cy="15" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13 10.5l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        ),
        title: "Consulting & Staffing",
        description: "Domain-aligned engineers in HMI, SDV, and validation, deployed exactly how your team needs them — flexibly and at scale.",
        items: ["Build-Operate-Transfer (BOT)", "Centers of Excellence (CoE)", "Managed engineering teams"],
    },
];

export default function ServicesPreview() {
    const shouldReduce = useReducedMotion();

    return (
        <section className="section" aria-labelledby="services-heading">
            <div className="container">
                {/* Header */}
                <motion.div
                    className="section-header"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    <motion.div variants={fadeUp(shouldReduce, 0)}>
                        <span className="badge">Services</span>
                    </motion.div>
                    <motion.h2 id="services-heading" variants={fadeUp(shouldReduce, 0.1)} style={{ marginTop: "16px", marginBottom: "14px" }}>
                        Full-stack vehicle software engineering
                    </motion.h2>
                    <motion.p className="lead" variants={fadeUp(shouldReduce, 0.2)}>
                        Three disciplines, one specialization — embedded, digital, and consulting, all exclusively in automotive.
                    </motion.p>
                </motion.div>

                {/* Cards */}
                <motion.div
                    className="services-grid"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {services.map((s) => (
                        <motion.div
                            key={s.title}
                            className="service-card"
                            variants={fadeUp(shouldReduce)}
                            whileHover={shouldReduce ? {} : { y: -6, transition: { duration: 0.25 } }}
                        >
                            <div className={`service-icon ${s.accent}`}>{s.icon}</div>
                            <h3>{s.title}</h3>
                            <p>{s.description}</p>
                            <ul>
                                {s.items.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Link */}
                <motion.div
                    style={{ marginTop: "40px", textAlign: "center" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                >
                    <motion.div whileHover={shouldReduce ? {} : { scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <Link href="/services" className="btn btn-outline" id="services-preview-link">
                            View all services
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
