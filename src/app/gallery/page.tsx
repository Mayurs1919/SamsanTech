"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";

const galleryItems = [
    {
        title: "Hardware-in-the-Loop (HIL) Rig",
        category: "Verification Lab",
        img: "/images/gallery_hil.png",
        desc: "Automated real-time test benches validating ECU control firmware under simulated dynamics.",
    },
    {
        title: "Software Defined Cockpit",
        category: "IVI Systems",
        img: "/images/serve_automotive.png",
        desc: "Interactive reference console hosting hypervised Android Automotive OS systems.",
    },
    {
        title: "Silicon Validation Suite",
        category: "Firmware Bring-up",
        img: "/images/serve_semiconductor.png",
        desc: "Low-level diagnostic bench validating custom compiler toolchains and BSP drivers.",
    },
    {
        title: "Connected Fleet Hub",
        category: "Cloud Telematics",
        img: "/images/serve_infrastructure.png",
        desc: "Live operations screen routing cellular telemetry channels and scheduling OTA updates.",
    },
    {
        title: "Engineering Delivery Floor",
        category: "CoE Center",
        img: "/images/serve_oems.png",
        desc: "Collaborative design space where systems architects map complex controller structures.",
    },
    {
        title: "Industrial Telemetry Edge",
        category: "IIoT Systems",
        img: "/images/serve_industrial.png",
        desc: "Custom edge hardware gateways deployed in high-temperature chemical processing plants.",
    },
];

export default function GalleryPage() {
    const shouldReduce = useReducedMotion();

    return (
        <div style={{ paddingBottom: "80px" }}>
            <section className="page-hero" aria-labelledby="gallery-heading">
                <div className="container">
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={fadeUpVariants(shouldReduce)}>
                            <span className="badge" style={{ marginBottom: "24px" }}>Gallery</span>
                        </motion.div>
                        <motion.h1 id="gallery-heading" variants={fadeUpVariants(shouldReduce)} style={{ marginBottom: "20px" }}>
                            Inside SAMSAN Labs
                        </motion.h1>
                        <motion.p className="lead" variants={fadeUpVariants(shouldReduce)} style={{ maxWidth: "580px" }}>
                            A visual tour of our specialized simulation rigs, chip validation suites, and system testing laboratories.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <section className="section compact">
                <div className="container">
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "24px"
                    }}>
                        {galleryItems.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
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
                                <div style={{
                                    height: "220px",
                                    backgroundImage: `url(${item.img})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    position: "relative"
                                }}>
                                    <div style={{
                                        position: "absolute",
                                        top: "16px",
                                        left: "16px",
                                    }}>
                                        <span className="badge rose" style={{ fontSize: "9px" }}>{item.category}</span>
                                    </div>
                                </div>
                                <div style={{ padding: "24px" }}>
                                    <h3 style={{ fontSize: "1.15rem", color: "#ffffff", marginBottom: "8px", fontWeight: 600 }}>{item.title}</h3>
                                    <p style={{ fontSize: "0.82rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
