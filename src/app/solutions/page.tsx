"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants, scaleInVariants } from "@/lib/motion";
import Link from "next/link";

const solutions = [
    {
        number: "01",
        accent: "violet",
        accentColor: "var(--violet-mid)",
        title: "Auto Embedded Solutions",
        href: "/solutions/auto-embedded",
        description: "Cockpit solutions, ADAS, Smart Clusters, Driver Monitoring Systems, and advanced AVNT platforms for the modern connected vehicle.",
        image: "/images/auto_cockpit_sys.png",
        items: [
            "Cockpit Solutions on Telechips",
            "Audio, Video, Navigation & Telematics (AVNT)",
            "Smart Cluster & Digital Instrument Panel",
            "Driver Monitoring System (DMS)",
            "Traffic Sign Recognition",
            "Advanced Driving Assistance Systems (ADAS)"
        ]
    },
    {
        number: "02",
        accent: "mint",
        accentColor: "var(--mint)",
        title: "Embedded Solutions",
        href: "/solutions/embedded",
        description: "End-to-end embedded engineering for IoT gateways, industrial controllers, smart building systems, and connected edge devices.",
        image: "/images/embedded_engineering.png",
        items: [
            "IoT Gateways & Edge Computing",
            "Industrial Automation Controllers",
            "Smart Building & Lighting Systems",
            "Embedded Linux & RTOS Development",
            "Hardware-Software Co-Design",
            "Protocol Stack Development"
        ]
    },
    {
        number: "03",
        accent: "rose",
        accentColor: "var(--rose)",
        title: "Digital Solutions",
        href: "/solutions/digital",
        description: "AI-powered web & mobile platforms, cloud-native architectures, and enterprise digital transformation for next-generation businesses.",
        image: "/images/digital_cloud_connectivity.png",
        items: [
            "Web & Mobile Application Development",
            "AI/ML & Data Analytics Platforms",
            "Cloud Infrastructure & DevOps",
            "Enterprise Digital Transformation",
            "PIKNIK NOW · vSEVA · TeKnowWiz"
        ]
    }
];

const stats = [
    { value: "50+", label: "Products Delivered" },
    { value: "20+", label: "OEM Partnerships" },
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
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={fadeUpVariants(shouldReduce)}>
                            <span className="badge" style={{ marginBottom: "24px" }}>Solutions & Products</span>
                        </motion.div>
                        <motion.h1 id="solutions-heading" variants={fadeUpVariants(shouldReduce)} style={{ marginBottom: "20px" }}>
                            SAMSAN Rings of Solutions
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

            {/* ── Solutions Cards ── */}
            <section className="section">
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "64px" }}>
                        <span className="badge violet" style={{ marginBottom: "16px" }}>Our Portfolio</span>
                        <h2 style={{ fontSize: "2.2rem", marginBottom: "16px" }}>Three Pillars of Innovation</h2>
                        <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", lineHeight: "1.7" }}>
                            Each solution vertical is backed by deep domain expertise, production-grade engineering, and a relentless focus on quality.
                        </p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
                        {solutions.map((sol, idx) => (
                            <motion.div
                                key={sol.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                            >
                                <Link href={sol.href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: idx % 2 === 0 ? "1.1fr 1fr" : "1fr 1.1fr",
                                        gap: "0",
                                        background: "rgba(13, 19, 35, 0.45)",
                                        border: "1px solid rgba(255, 255, 255, 0.06)",
                                        borderRadius: "var(--radius-lg)",
                                        overflow: "hidden",
                                        transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
                                        cursor: "pointer"
                                    }}
                                    className="accel-card"
                                    >
                                        {/* Image side */}
                                        <div style={{
                                            backgroundImage: `url('${sol.image}')`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            minHeight: "380px",
                                            position: "relative",
                                            order: idx % 2 === 0 ? 0 : 1
                                        }}>
                                            <div style={{
                                                position: "absolute", inset: 0,
                                                background: idx % 2 === 0
                                                    ? "linear-gradient(to right, rgba(10,15,28,0.2) 0%, rgba(10,15,28,0.85) 100%)"
                                                    : "linear-gradient(to left, rgba(10,15,28,0.2) 0%, rgba(10,15,28,0.85) 100%)"
                                            }}/>
                                            <div style={{
                                                position: "absolute", top: "24px",
                                                [idx % 2 === 0 ? "left" : "right"]: "24px"
                                            }}>
                                                <span style={{
                                                    fontFamily: "var(--font-mono)", fontSize: "11px",
                                                    letterSpacing: "0.12em", color: sol.accentColor,
                                                    background: "rgba(0,0,0,0.5)", padding: "6px 14px",
                                                    borderRadius: "100px", border: `1px solid ${sol.accentColor}30`
                                                }}>{sol.number}</span>
                                            </div>
                                        </div>

                                        {/* Content side */}
                                        <div style={{
                                            padding: "48px 44px",
                                            display: "flex", flexDirection: "column", justifyContent: "center",
                                            order: idx % 2 === 0 ? 1 : 0
                                        }}>
                                            <span className={`badge ${sol.accent}`} style={{ marginBottom: "16px", width: "fit-content" }}>
                                                {sol.accent === "violet" ? "Automotive" : sol.accent === "mint" ? "Embedded" : "Digital"}
                                            </span>
                                            <h3 style={{ fontSize: "1.8rem", marginBottom: "16px", color: "#fff", fontWeight: 700 }}>{sol.title}</h3>
                                            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "28px" }}>
                                                {sol.description}
                                            </p>
                                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                                                {sol.items.map((item) => (
                                                    <li key={item} style={{ fontSize: "0.85rem", color: "var(--text-primary)", position: "relative", paddingLeft: "18px" }}>
                                                        <span style={{
                                                            position: "absolute", left: 0, top: "7px",
                                                            width: "5px", height: "5px", borderRadius: "50%",
                                                            background: sol.accentColor
                                                        }}/>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: sol.accentColor, fontSize: "0.9rem", fontWeight: 600 }}>
                                                Explore Solutions
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-inner">
                        <h2>Need a custom solution?</h2>
                        <p>Our engineering teams can design, build, and deploy tailored systems for your specific requirements.</p>
                        <div className="cta-actions">
                            <Link href="/contact" className="btn btn-primary">Request a Consultation →</Link>
                            <Link href="/services" className="btn btn-outline">View Our Services</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
