"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";
import { useState } from "react";

const autoSolutions = [
    {
        id: "cockpit",
        title: "Cockpit Solutions on Telechips",
        subtitle: "Next-Gen Software Solutions for Integrated Cockpits",
        desc: "With Telechips' chipset family as the primary technology platform, SAMSAN offers complete Software Solutions for Cockpit Systems tailored for global OEMs and Tier 1 suppliers. Co-designed Linux & Android Cockpit Solutions feature deep optimization and rich features.",
        features: [
            "Seamless Navigation & Multimedia",
            "Advanced Tuner Integration",
            "Rear View Camera & Virtual Reality Overlay",
            "Smart App Store & Hypervisor/Virtualization Integration",
            "Multi-display orchestration (Instrument Cluster, Infotainment, HUD)"
        ],
        image: "/images/auto_cockpit_sys.png",
        accent: "var(--violet-mid)"
    },
    {
        id: "avnt",
        title: "Audio, Video, Navigation & Telematics (AVNT)",
        subtitle: "One-Stop Solution for Connected Automotive Infotainment",
        desc: "SAMSAN possesses deep experience in developing Linux & Android Audio, Video, Navigation & Telematics (AVNT) software suites. Our customized infotainment solutions support a wide range of features from low-cost systems to premium cockpits.",
        features: [
            "Customized user experience design designed to amaze",
            "Optimized media playback engines & audio routing",
            "Global navigation software integration",
            "Secure cellular connectivity & cloud syncing",
            "Over-the-Air (OTA) firmware upgrade readiness"
        ],
        image: "/images/serve_oems.png",
        accent: "var(--mint)"
    },
    {
        id: "cluster",
        title: "Smart Cluster & Digital Instrument Panel",
        subtitle: "Safety-Critical Instrument Displays and Dial Animations",
        desc: "SAMSAN has developed a versatile software platform to design standard mechanical clusters as well as advanced digital smart clusters. Deployed with standard CAN protocols, UDS diagnostics, and OSEK RTOS based solutions.",
        features: [
            "Liquid-smooth dial animations and layouts",
            "Comprehensive screen control & status indicators",
            "Safety alerts (speed warning, collision warning)",
            "Real-time trip statistics & battery status monitoring",
            "Integrated backup camera feed & warning icons"
        ],
        image: "/images/serve_semiconductor.png",
        accent: "var(--rose)"
    },
    {
        id: "dms",
        title: "Driver Monitoring System (DMS)",
        subtitle: "AI-Powered Driver Fatigue & Distraction Detection",
        desc: "SAMSAN provides complete software solutions for DMS. The system matches facial expressions, head movements, and eye metrics (yawning, closed eyes, drowsiness, distraction) to warn the driver or trigger vehicle safety systems.",
        features: [
            "Near-infrared (NIR) camera integration for low-light stability",
            "Real-time facial detection and tracking",
            "Gaze estimation & eye-opening ratio calculation",
            "Multi-stage alerting: audible, visual HMI, and cloud-telemetry",
            "Integration with ADAS for speed reduction triggers"
        ],
        image: "/images/serve_automotive.png",
        accent: "var(--violet-mid)"
    },
    {
        id: "tsr",
        title: "Traffic Sign Recognition (TSR)",
        subtitle: "Camera-Based Regulatory Sign Detection & Adherence",
        desc: "SAMSAN's TSR solutions detect speed limits and other regulatory road signs, warning the driver or coordinating with ADAS features like lane keep assist, lane departure warning, and adaptive cruise control for an integrated safety suite.",
        features: [
            "Deep learning based sign detection and classification",
            "Real-time HUD/instrument cluster notification",
            "Intelligent integration with ADAS & cruise control",
            "Works across varying weather & nighttime conditions",
            "Forward collision and blind spot coordination"
        ],
        image: "/images/gallery_hil.png",
        accent: "var(--mint)"
    },
    {
        id: "adas",
        title: "Advanced Driving Assistance Systems (ADAS)",
        subtitle: "Integrated Perception, Fusion, and Decision-Making Stacks",
        desc: "We provide complete Software Solutions for ADAS, including lane departure warning, blind spot detection, forward collision warning, rear cross-traffic alert, adaptive cruise control, autonomous emergency braking, and surroundings view monitoring.",
        features: [
            "Multi-sensor fusion (Camera, LiDAR, Radar, Ultrasonic)",
            "Automatic high beam and pedestrian detection",
            "Traffic jam assist & park assist automation",
            "ISO 26262 functional safety compliant designs",
            "Seamless HMI visualization in the cockpit"
        ],
        image: "/images/hardware_ecu.png",
        accent: "var(--rose)"
    }
];

const products = [
    { title: "eCockpit Platform", category: "Cockpit", desc: "A pre-integrated software platform combining IVI and Cluster on a single SoC using hypervisor tech." },
    { title: "SVM (Surround View Monitor)", category: "ADAS", desc: "Ultra-low latency 3D bowl-view rendering of vehicle surroundings using 4 fish-eye cameras." },
    { title: "DMS Engine", category: "Safety", desc: "Deployable facial landmark and fatigue classification model optimized for automotive edge NPU." },
    { title: "ADAS Fusion Core", category: "ADAS", desc: "Sensor fusion middleware to handle and synchronize data from camera, radar, and lidar streams." },
    { title: "Smart Cluster Suite", category: "HMI", desc: "Fast-booting RTOS based cluster rendering package booting under 1.2 seconds." }
];

export default function AutoEmbeddedSolutionsPage() {
    const shouldReduce = useReducedMotion();
    const [activeTab, setActiveTab] = useState("cockpit");

    const currentSolution = autoSolutions.find(sol => sol.id === activeTab) || autoSolutions[0];

    return (
        <div style={{ paddingBottom: "100px" }}>
            {/* Page Hero */}
            <section className="page-hero" aria-labelledby="solution-heading">
                <div className="container">
                    <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible">
                        <motion.div variants={fadeUpVariants(shouldReduce)} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                            <Link href="/solutions" style={{ color: "var(--violet-mid)", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
                                Products &amp; Accelerators
                            </Link>
                            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>/</span>
                            <span className="badge">Auto Embedded Solutions</span>
                        </motion.div>
                        <motion.h1 id="solution-heading" variants={fadeUpVariants(shouldReduce)} style={{ marginBottom: "20px" }}>
                            Auto Embedded Solutions
                        </motion.h1>
                        <motion.p className="lead" variants={fadeUpVariants(shouldReduce)} style={{ maxWidth: "800px" }}>
                            Explore SAMSAN&apos;s full-stack automotive engineering portfolio. From IVI systems and smart instrument clusters to deep-learning ADAS and Driver Monitoring stacks, we power next-generation intelligent vehicles.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Interactive Tab Explorer */}
            <section className="section compact">
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <span className="badge violet" style={{ marginBottom: "12px" }}>Interactive Showroom</span>
                        <h2 style={{ fontSize: "1.8rem", fontWeight: 700 }}>Explore Our Sub-Solutions</h2>
                    </div>

                    {/* Tab Buttons */}
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: "12px",
                        marginBottom: "48px",
                        borderBottom: "1px solid var(--border)",
                        paddingBottom: "24px"
                    }}>
                        {autoSolutions.map((sol) => (
                            <button
                                key={sol.id}
                                onClick={() => setActiveTab(sol.id)}
                                style={{
                                    padding: "10px 20px",
                                    borderRadius: "100px",
                                    border: activeTab === sol.id ? `1px solid ${sol.accent}` : "1px solid rgba(255,255,255,0.06)",
                                    background: activeTab === sol.id ? `${sol.accent}15` : "rgba(13,19,35,0.3)",
                                    color: activeTab === sol.id ? "#fff" : "var(--text-secondary)",
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    transition: "all 0.3s ease"
                                }}
                            >
                                {sol.title.split(" (")[0]}
                            </button>
                        ))}
                    </div>

                    {/* Interactive Tab Panel */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1.1fr 1fr",
                            gap: "56px",
                            alignItems: "center",
                            background: "rgba(13, 19, 35, 0.4)",
                            border: "1px solid rgba(255, 255, 255, 0.05)",
                            borderRadius: "var(--radius-lg)",
                            padding: "56px",
                            backdropFilter: "blur(10px)"
                        }}
                    >
                        <div>
                            <span className="badge" style={{ borderColor: currentSolution.accent, color: "#fff", background: `${currentSolution.accent}20`, marginBottom: "20px" }}>
                                {currentSolution.subtitle}
                            </span>
                            <h3 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "20px", color: "#fff" }}>
                                {currentSolution.title}
                            </h3>
                            <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "32px", fontSize: "0.95rem" }}>
                                {currentSolution.desc}
                            </p>

                            <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "16px", fontFamily: "var(--font-mono)" }}>Key Capabilities</h4>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
                                {currentSolution.features.map((feat, idx) => (
                                    <li key={idx} style={{ fontSize: "0.9rem", color: "var(--text-primary)", position: "relative", paddingLeft: "24px" }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ position: "absolute", left: 0, top: "4px", color: currentSolution.accent }}>
                                            <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/contact" className="btn btn-outline" style={{ borderColor: currentSolution.accent, color: "#fff" }}>
                                Contact to Know More
                            </Link>
                        </div>

                        {/* Interactive Image Panel */}
                        <div style={{
                            position: "relative",
                            height: "440px",
                            borderRadius: "var(--radius-lg)",
                            overflow: "hidden",
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                        }}>
                            <div
                                style={{
                                    backgroundImage: `url('${currentSolution.image}')`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    width: "100%",
                                    height: "100%"
                                }}
                            />
                            <div style={{
                                position: "absolute", inset: 0,
                                background: `linear-gradient(to top, rgba(10,15,28,0.9) 0%, rgba(10,15,28,0.1) 100%)`
                            }}/>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Products & Deliverables Section */}
            <section className="section compact" style={{ borderTop: "1px solid var(--border)", background: "rgba(10,15,28,0.2)" }}>
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "56px" }}>
                        <span className="badge rose" style={{ marginBottom: "12px" }}>Software Packages</span>
                        <h2 style={{ fontSize: "2rem", fontWeight: 700 }}>Auto Embedded Products</h2>
                        <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", lineHeight: "1.7" }}>
                            Pre-packaged, customizable IP cores and middleware suites to accelerate your automotive time-to-market.
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
                        {products.map((prod, idx) => (
                            <motion.div
                                key={idx}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants(shouldReduce)}
                                style={{
                                    background: "rgba(13, 19, 35, 0.45)",
                                    border: "1px solid rgba(255, 255, 255, 0.05)",
                                    borderRadius: "var(--radius)",
                                    padding: "32px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    height: "100%"
                                }}
                            >
                                <div>
                                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--rose)", background: "rgba(236,72,153,0.1)", padding: "4px 10px", borderRadius: "100px", display: "inline-block", marginBottom: "16px" }}>
                                        {prod.category}
                                    </span>
                                    <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "12px", color: "#fff" }}>{prod.title}</h3>
                                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>{prod.desc}</p>
                                </div>
                                <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
                                    <Link href="/contact" style={{ fontSize: "0.8rem", color: "var(--rose)", textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                                        Inquire Product
                                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
