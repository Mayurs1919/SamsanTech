"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";
import ServiceCard, { Logos, WifiIcon, BluetoothIcon, MqttIcon, type TechChip } from "@/components/ui/ServiceCard";

// ── Product card definitions ─────────────────────────────────────
const products = [
    {
        id: "digital-cockpit-solution",
        number: "01",
        iconColor: "#06B6D4",
        title: "Digital Cockpit Solution",
        description: "World-class Intelligent Cockpit Solutions for Global OEMs and Tier-1 suppliers — integrating Instrument Clusters, Infotainment, Telematics, Smart Mirrors, HUDs, and Navigation into one seamless eCockpit.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2" />
                <path d="M6 21h12M12 17v4" />
            </svg>
        ),
        techs: [
            { label: "Android", logoUrl: Logos.android },
            { label: "QNX", isBadge: true },
            { label: "Linux", logoUrl: Logos.linux },
            { label: "HMI", isBadge: true },
            { label: "Bluetooth", icon: <BluetoothIcon /> },
            { label: "Wi-Fi", icon: <WifiIcon /> },
            { label: "OTA", isBadge: true },
        ] as TechChip[]
    },
    {
        id: "twinlnk",
        number: "02",
        iconColor: "#F59E0B",
        title: "TwinLnk™",
        description: "An intelligent telematics and IoT gateway platform enabling secure, seamless data flow between edge devices and cloud applications — built for automotive, industrial, and infrastructure environments.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M20 12l-8-8-8 8" />
            </svg>
        ),
        techs: [
            { label: "MQTT", icon: <MqttIcon /> },
            { label: "AWS", logoUrl: Logos.aws },
            { label: "GNSS", isBadge: true },
            { label: "CAN Bus", isBadge: true },
            { label: "OTA", isBadge: true },
            { label: "Edge AI", isBadge: true },
        ] as TechChip[]
    },
    {
        id: "tcu",
        number: "03",
        iconColor: "#10B981",
        title: "TCU (Telematics Control Unit)",
        description: "Cutting-edge connectivity and vehicle data solutions enabling real-time monitoring, remote diagnostics, and seamless communication between vehicles and backend systems.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
            </svg>
        ),
        techs: [
            { label: "GPS", isBadge: true },
            { label: "4G/LTE", isBadge: true },
            { label: "CAN Bus", isBadge: true },
            { label: "AWS", logoUrl: Logos.aws },
            { label: "IoT", isBadge: true },
        ] as TechChip[]
    },
    {
        id: "dms-edge",
        number: "04",
        iconColor: "#EF4444",
        title: "DMS Edge",
        description: "Advanced Driver Monitoring System (DMS) with real-time facial expression tracking to detect drowsiness and distraction — enhancing driving safety proactively.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20v-1a8 8 0 0 1 16 0v1" />
                <path d="M9 11l3 3 3-3" />
            </svg>
        ),
        techs: [
            { label: "OpenCV", logoUrl: Logos.opencv },
            { label: "TensorFlow", logoUrl: Logos.tensorflow },
            { label: "Kotlin", logoUrl: Logos.kotlin },
            { label: "CAN Bus", isBadge: true },
            { label: "HMI", isBadge: true },
        ] as TechChip[]
    },
    {
        id: "maestro",
        number: "05",
        iconColor: "#8B5CF6",
        title: "Maestro™",
        description: "Unifies devices from different vendors — vehicle cameras, building management systems, and industrial sensors — into a single operational dashboard, managed end-to-end by SAMSAN.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
            </svg>
        ),
        techs: [
            { label: "AWS", logoUrl: Logos.aws },
            { label: "Docker", logoUrl: Logos.docker },
            { label: "MQTT", isBadge: true },
            { label: "IoT", isBadge: true },
            { label: "Dashboard", isBadge: true },
        ] as TechChip[]
    },
    {
        id: "automate-ai",
        number: "06",
        iconColor: "#EC4899",
        title: "AutoMATE.ai",
        description: "Contextual, voice-based AI assistant integrated directly into the vehicle cockpit — providing intelligent access to vehicle functionalities, e-manuals, and diagnostics through natural language interaction.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
            </svg>
        ),
        techs: [
            { label: "GenAI", isBadge: true },
            { label: "NLP", isBadge: true },
            { label: "Voice AI", isBadge: true },
            { label: "Android", logoUrl: Logos.android },
            { label: "Cockpit", isBadge: true },
        ] as TechChip[]
    },
    {
        id: "cabiniq",
        number: "07",
        iconColor: "#06B6D4",
        title: "CabinIQ™",
        description: "A modular, AI-powered in-cabin intelligence platform unifying Driver Monitoring (DMS), Occupant Monitoring (OMS), Health Monitoring, and Mood-Based Personalization.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
        ),
        techs: [
            { label: "OpenCV", logoUrl: Logos.opencv },
            { label: "TensorFlow", logoUrl: Logos.tensorflow },
            { label: "DMS", isBadge: true },
            { label: "OMS", isBadge: true },
            { label: "AI Cabin", isBadge: true },
        ] as TechChip[]
    },
    {
        id: "vemeego",
        number: "08",
        iconColor: "#8B5CF6",
        title: "Vemeego",
        description: "An intelligent workspace and video conferencing platform built for enhanced remote and corporate collaboration — going beyond basic video calling to deliver a rich, structured digital workspace.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        techs: [
            { label: "React", logoUrl: Logos.react },
            { label: "Node.js", logoUrl: Logos.nodejs },
            { label: "WebRTC", isBadge: true },
            { label: "Make in India", isBadge: true },
        ] as TechChip[]
    },
    {
        id: "pikniknow",
        number: "09",
        iconColor: "#10B981",
        title: "PiknikNow",
        description: "Discover unique picnic spots nearby, share travel stories with fellow explorers, and plan adventures to hidden destinations.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
        techs: [
            { label: "Flutter", logoUrl: Logos.flutter },
            { label: "Firebase", logoUrl: Logos.firebase },
            { label: "Maps API", isBadge: true },
            { label: "Social", isBadge: true },
        ] as TechChip[]
    },
];

const stats = [
    { value: "9+", label: "Products & Accelerators" },
    { value: "Global", label: "OEM/Tier-1 Engagements" },
    { value: "8+", label: "Industry Verticals" },
    { value: "100%", label: "On-Time Delivery" }
];

export default function SolutionsPage() {
    const shouldReduce = useReducedMotion();

    return (
        <div style={{ paddingBottom: "0" }}>

            {/* ── Page Hero ── */}
            <section className="page-hero" aria-labelledby="solutions-heading" style={{ paddingBottom: "100px" }}>
                <div className="container">
                    <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible">
                        <motion.div variants={fadeUpVariants(shouldReduce)}>
                            <span className="badge" style={{ marginBottom: "24px" }}>Products &amp; Accelerators</span>
                        </motion.div>
                        <motion.h1 id="solutions-heading" variants={fadeUpVariants(shouldReduce)} style={{ marginBottom: "20px" }}>
                            SAMSAN Products &amp; Accelerators
                        </motion.h1>
                        <motion.p className="lead" variants={fadeUpVariants(shouldReduce)} style={{ maxWidth: "620px" }}>
                            Production-proven solutions across automotive embedded, IoT, and digital platforms. From concept to deployment — engineered for reliability, safety, and scale.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── Stats Bar ── */}
            <section style={{
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
                background: "rgba(10,15,28,0.4)",
                padding: "48px 0"
            }}>
                <div className="container">
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px", textAlign: "center" }}
                    >
                        {stats.map((s, i) => (
                            <motion.div key={i} variants={fadeUpVariants(shouldReduce)}>
                                <div style={{
                                    fontSize: "2.8rem", fontWeight: 800,
                                    background: "linear-gradient(135deg, var(--violet-mid), var(--mint))",
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                    lineHeight: 1.1, marginBottom: "8px"
                                }}>{s.value}</div>
                                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", letterSpacing: "0.04em" }}>{s.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Product Cards Grid ── */}
            <section className="section">
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "64px" }}>
                        <span className="badge" style={{ marginBottom: "16px" }}>Our Portfolio</span>
                        <h2 style={{ fontSize: "2.2rem", marginBottom: "16px" }}>9 Products &amp; Accelerators</h2>
                        <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", lineHeight: "1.7" }}>
                            Each product is backed by deep domain expertise, production-grade engineering, and a relentless focus on quality. Contact us for a brochure or discovery call.
                        </p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
                        variants={staggerContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {products.map((prod, idx) => (
                            <motion.div
                                key={prod.id}
                                className="col-span-1"
                                variants={fadeUpVariants(shouldReduce)}
                                transition={{ delay: (idx % 3) * 0.07 }}
                            >
                                <ServiceCard
                                    number={prod.number}
                                    title={prod.title}
                                    description={prod.description}
                                    icon={prod.icon}
                                    iconColor={prod.iconColor}
                                    techs={prod.techs}
                                    contactSlug={prod.id}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-inner">
                        <h2>Need a custom solution?</h2>
                        <p>Our engineering teams can design, build, and deploy tailored systems for your specific requirements.</p>
                        <div className="cta-actions">
                            <Link href="/contact" className="btn btn-primary">Evaluate SAMSAN Accelerators</Link>
                            <Link href="/services" className="btn btn-outline">View Engineering Offerings</Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
