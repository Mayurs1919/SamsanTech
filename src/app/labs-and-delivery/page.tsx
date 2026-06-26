"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";

// Real classification (Actual vs Representative vs Illustrative) needs sign-off per image before publish
const labsItems = [
    {
        title: "Main Engineering Delivery Floor",
        category: "Engineering Workspaces",
        img: "/images/serve_oems.png",
        desc: "Secure, high-bandwidth design workspaces where systems architects and software engineers collaborate on complex mobility systems.",
        authenticity: "Representative"
    },
    {
        title: "Software-Defined Cockpit Console",
        category: "Cockpit / IVI Demonstrators",
        img: "/images/serve_automotive.png",
        desc: "Interactive reference cockpit hosting hypervised Android Automotive OS, digital cluster platforms, and multi-display HMI environments.",
        authenticity: "Representative"
    },
    {
        title: "Hardware-in-the-Loop (HIL) Test Suite",
        category: "Validation & Test Benches",
        img: "/images/gallery_hil.png",
        desc: "Automated real-time test benches validating ECU control firmware under virtualized vehicle dynamics and network loads.",
        authenticity: "Representative"
    },
    {
        title: "Connected Fleet Management Hub",
        category: "Cloud / IoT Dashboards",
        img: "/images/serve_infrastructure.png",
        desc: "Live telemetry dashboard monitoring diagnostic signals, routing cellular telemetry data, and managing OTA update packages.",
        authenticity: "Representative"
    },
    {
        title: "Automotive Gateway Edge Platform",
        category: "Product Accelerators",
        img: "/images/serve_industrial.png",
        desc: "Prototype gateway hardware and middleware packages accelerating vehicle-to-cloud security, compute, and connectivity tasks.",
        authenticity: "Representative"
    },
    {
        title: "Collaborative Innovation Sessions",
        category: "Team & Culture",
        img: "/images/serve_semiconductor.png",
        desc: "Continuous learning workshops, design sprints, and cross-functional teams solving engineering challenges.",
        authenticity: "Representative"
    }
];

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

            {/* Grid Section */}
            <section className="section compact">
                <div className="container">
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "32px"
                    }}>
                        {labsItems.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                whileHover={{ y: -6 }}
                                style={{
                                    background: "rgba(13, 19, 35, 0.4)",
                                    border: "1px solid rgba(255, 255, 255, 0.05)",
                                    borderRadius: "var(--radius-lg)",
                                    overflow: "hidden",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                {/* Image Container */}
                                <div style={{
                                    height: "240px",
                                    backgroundImage: `url(${item.img})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    position: "relative"
                                }}>
                                    {/* Category Badge - Left */}
                                    <div style={{
                                        position: "absolute",
                                        top: "16px",
                                        left: "16px",
                                    }}>
                                        <span className="badge rose" style={{ fontSize: "9px" }}>{item.category}</span>
                                    </div>

                                    {/* Authenticity Caption Overlay - Right */}
                                    <div style={{
                                        position: "absolute",
                                        top: "16px",
                                        right: "16px",
                                    }}>
                                        <span className="badge" style={{ 
                                            fontSize: "8px", 
                                            textTransform: "uppercase", 
                                            background: "rgba(0, 0, 0, 0.7)", 
                                            border: "1px solid rgba(255, 255, 255, 0.15)", 
                                            color: "rgba(255, 255, 255, 0.9)",
                                            padding: "4px 8px",
                                            borderRadius: "4px",
                                            letterSpacing: "0.05em",
                                            fontWeight: 600
                                        }}>
                                            {/* Code Comment: Real classification (Actual vs Representative vs Illustrative) needs sign-off per image before publish */}
                                            {item.authenticity}
                                        </span>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div style={{ padding: "28px" }}>
                                    <h3 style={{ fontSize: "1.2rem", color: "#ffffff", marginBottom: "12px", fontWeight: 600 }}>{item.title}</h3>
                                    <p style={{ fontSize: "0.85rem", lineHeight: "1.6", color: "var(--text-secondary)", margin: 0 }}>{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
