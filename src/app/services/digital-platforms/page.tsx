"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";

const techStacks = [
    {
        title: "Web & Mobile Experiences",
        desc: "Crafting intelligent Web and Mobile App Solutions from conceptualization to product realization. Utilizing modern frameworks like React, Angular, Flutter, and React Native for seamless user experiences."
    },
    {
        title: "Backend & Middleware",
        desc: "Robust middleware and backend services powered by Python, Node.js, C#, and Java. Deep integration with advanced AI/ML models and computer vision pipelines using TensorFlow and OpenCV."
    },
    {
        title: "Data & Cloud Infrastructure",
        desc: "Scalable data management and cloud infrastructure spanning AWS and edge devices. Utilizing PostgreSQL, MongoDB, and enterprise databases, orchestrated flawlessly via Docker and Kubernetes."
    },
    {
        title: "DevOps & Collaboration",
        desc: "Streamlined delivery pipelines with advanced CI/CD, DevOps practices, and agile collaboration tools including JIRA, GitHub, and Microsoft Teams to ensure rapid, secure product realization."
    }
];

const digitalProducts = [
    { title: "PIKNIK NOW" },
    { title: "vSEVA" },
    { title: "TeKnowWiz" }
];

export default function DigitalPlatformsPage() {
    const shouldReduce = useReducedMotion();

    return (
        <div style={{ paddingBottom: "80px" }}>
            {/* Page Hero */}
            <section className="page-hero" aria-labelledby="service-heading">
                <div className="container">
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={fadeUpVariants(shouldReduce)} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                            <Link href="/services" style={{ color: "var(--violet-mid)", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
                                Services
                            </Link>
                            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>/</span>
                            <span className="badge">Digital Solutions</span>
                        </motion.div>
                        <motion.h1 id="service-heading" variants={fadeUpVariants(shouldReduce)} style={{ marginBottom: "20px" }}>
                            Digital Solutions
                        </motion.h1>
                        <motion.p
                            className="lead"
                            variants={fadeUpVariants(shouldReduce)}
                            style={{ maxWidth: "800px" }}
                        >
                            In today's interconnected World, Digitalization—combined with Connectivity, Cloud Computing, AI/ML and Data Analytics—permeates every aspect of our lives, including inside and outside vehicles. This abundance of Technology opens doors to innovative real-time use cases and, importantly, new Business Models.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Core Service Info */}
            <section className="section compact">
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "56px" }}>
                        <h2 style={{ fontSize: "1.8rem", marginBottom: "16px" }}>Transforming ideas into thriving realities</h2>
                        <p style={{ color: "var(--text-secondary)", maxWidth: "700px", margin: "0 auto", lineHeight: "1.7" }}>
                            At SAMSAN, we excel in crafting intelligent Web and Mobile App Solutions, guiding you from Conceptualization to Product realization. Embrace the potential of the Digital era with our Expertise.
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "80px" }}>
                        {techStacks.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUpVariants(shouldReduce)}
                                style={{
                                    background: "rgba(13, 19, 35, 0.45)",
                                    border: "1px solid rgba(255, 255, 255, 0.05)",
                                    borderRadius: "var(--radius)",
                                    padding: "32px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "16px"
                                }}
                            >
                                <div style={{
                                    width: "48px", height: "48px",
                                    borderRadius: "12px",
                                    background: "var(--grad-card)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "var(--mint)"
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M14 3C8.48 3 4 7.48 4 13s4.48 10 10 10 10-4.48 10-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                        <path d="M18 3a7 7 0 0 1 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                        <path d="M10 13l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <h3 style={{ fontSize: "1.2rem" }}>{item.title}</h3>
                                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Digital Solutions & Products */}
                    <div style={{ marginBottom: "60px", padding: "60px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                        <div style={{ textAlign: "center", marginBottom: "48px" }}>
                            <span className="badge violet" style={{ marginBottom: "16px" }}>Our Portfolio</span>
                            <h2 style={{ fontSize: "2rem", fontWeight: 700 }}>Digital Solutions & Products</h2>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                            {digitalProducts.map((product, idx) => (
                                <motion.div
                                    key={idx}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeUpVariants(shouldReduce)}
                                    style={{
                                        background: "linear-gradient(135deg, rgba(22, 30, 53, 0.4) 0%, rgba(27, 36, 64, 0.2) 100%)",
                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                        borderRadius: "var(--radius-lg)",
                                        padding: "40px 32px",
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        transition: "all 0.3s ease"
                                    }}
                                    className="product-card-hover"
                                >
                                    <div style={{
                                        width: "80px", height: "80px",
                                        borderRadius: "50%",
                                        background: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.05)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        marginBottom: "24px",
                                        color: "var(--text-secondary)"
                                    }}>
                                        {/* Placeholder Icon */}
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                            <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                                            <path d="M9 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                            <path d="M12 9v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                    </div>
                                    <h3 style={{ fontSize: "1.4rem", marginBottom: "20px", color: "#fff" }}>{product.title}</h3>
                                    <button className="btn btn-outline" style={{ marginTop: "auto", fontSize: "0.85rem", padding: "8px 24px", borderRadius: "100px" }}>
                                        Read More
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Cinematic Visual */}
                    <div style={{ marginTop: "60px" }}>
                        <div style={{
                            width: "100%", height: "400px", borderRadius: "var(--radius-lg)",
                            backgroundImage: "url('/images/digital_cloud_connectivity.png')",
                            backgroundSize: "cover", backgroundPosition: "center",
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                        }} />
                    </div>

                </div>
            </section>
        </div>
    );
}
