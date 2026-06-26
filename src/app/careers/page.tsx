"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";

interface Job {
    id: string;
    title: string;
    country: string;
    city: string;
    experience: string;
    category: "Cockpit & IVI" | "Connected Vehicle" | "Embedded & Safety" | "AI & Cloud" | "Management";
    type: string;
    description: string;
}

const initialJobs: Job[] = [
    {
        id: "1",
        title: "Android Automotive / AOSP Engineer",
        country: "India",
        city: "Pune",
        experience: "3-7 years",
        category: "Cockpit & IVI",
        type: "Full Time",
        description: "Develop and integrate Android Automotive OS (AAOS) / AOSP for next-generation in-vehicle infotainment systems. Work on app frameworks, HALs, and system services for automotive platforms."
    },
    {
        id: "2",
        title: "Infotainment Middleware Engineer",
        country: "India",
        city: "Pune",
        experience: "3-8 years",
        category: "Cockpit & IVI",
        type: "Full Time",
        description: "Design and implement middleware layers for IVI platforms — audio routing, Bluetooth/Wi-Fi stacks, media frameworks, and inter-process communication on QNX or Linux."
    },
    {
        id: "3",
        title: "Cluster / HMI Developer",
        country: "India",
        city: "Pune",
        experience: "2-6 years",
        category: "Cockpit & IVI",
        type: "Full Time",
        description: "Build digital instrument cluster and HMI applications using Qt/QML or HTML5-based frameworks. Integrate with vehicle signal buses and validate display rendering performance."
    },
    {
        id: "4",
        title: "Telematics / TCU Engineer",
        country: "India",
        city: "Pune",
        experience: "3-7 years",
        category: "Connected Vehicle",
        type: "Full Time",
        description: "Develop firmware and software for Telematics Control Units (TCU) — cellular connectivity, GNSS, OTA update pipelines, and remote diagnostics integration with cloud backends."
    },
    {
        id: "5",
        title: "AUTOSAR Engineer",
        country: "India",
        city: "Pune",
        experience: "3-8 years",
        category: "Embedded & Safety",
        type: "Full Time",
        description: "Configure and implement Classic or Adaptive AUTOSAR stacks. Work on BSWs, RTE generation, COM stack tuning, and ECU integration across multi-supplier projects."
    },
    {
        id: "6",
        title: "Functional Safety Engineer",
        country: "India",
        city: "Pune",
        experience: "4-10 years",
        category: "Embedded & Safety",
        type: "Full Time",
        description: "Drive ISO 26262 compliance activities — HARA, safety concept development, FMEA/FTA, safety case creation, and coordination with system and software teams for ASIL-rated products."
    },
    {
        id: "7",
        title: "Cybersecurity Engineer",
        country: "India",
        city: "Pune",
        experience: "3-8 years",
        category: "Embedded & Safety",
        type: "Full Time",
        description: "Implement automotive cybersecurity per UN R155/ISO 21434 — TARA, secure boot, key management, intrusion detection, and vulnerability assessment across ECUs and network layers."
    },
    {
        id: "8",
        title: "Embedded Linux / BSP Engineer",
        country: "India",
        city: "Pune",
        experience: "3-7 years",
        category: "Embedded & Safety",
        type: "Full Time",
        description: "Port and customize Linux BSPs for automotive SoCs (NXP, TI, Renesas, Qualcomm). Driver development, kernel configuration, Yocto/buildroot integration, and bring-up validation."
    },
    {
        id: "9",
        title: "Validation Automation Engineer",
        country: "India",
        city: "Pune",
        experience: "2-6 years",
        category: "Embedded & Safety",
        type: "Full Time",
        description: "Design and execute automated test frameworks for automotive ECUs and software stacks — HIL/SIL environments, test script development (Python/CAPL), traceability, and CI integration."
    },
    {
        id: "10",
        title: "GenAI / AI Engineering Automation Developer",
        country: "India",
        city: "Pune",
        experience: "2-6 years",
        category: "AI & Cloud",
        type: "Full Time",
        description: "Build GenAI-powered tools for engineering acceleration — requirements generation, test case synthesis, code review automation, and traceability using LLMs and RAG pipelines."
    },
    {
        id: "11",
        title: "Cloud / IoT Platform Engineer",
        country: "India",
        city: "Pune",
        experience: "3-7 years",
        category: "AI & Cloud",
        type: "Full Time",
        description: "Architect and develop cloud-connected vehicle platforms — telemetry ingestion, OTA management, IoT gateway integration, and real-time data pipelines on AWS / Azure / GCP."
    },
    {
        id: "12",
        title: "Technical Program Manager — Automotive",
        country: "India",
        city: "Pune",
        experience: "7-15 years",
        category: "Management",
        type: "Full Time",
        description: "Lead multi-track automotive software programs from requirements to SOP — stakeholder management, delivery governance, risk tracking, and cross-functional team coordination across OEM and Tier-1 programs."
    }
];

export default function CareersPage() {
    const shouldReduce = useReducedMotion();

    // Filters state
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("All");
    const [selectedCity, setSelectedCity] = useState("All");
    const [selectedExp, setSelectedExp] = useState("All");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedType, setSelectedType] = useState("All");

    // Dynamic Filter Option Lists
    const countries = ["All", "India"];
    const cities = ["All", "Pune"];
    const experiences = ["All", "2-6 years", "3-7 years", "3-8 years", "4-10 years", "7-15 years"];
    const categories = ["All", "Cockpit & IVI", "Connected Vehicle", "Embedded & Safety", "AI & Cloud", "Management"];
    const types = ["All", "Full Time"];

    // Filter Logic
    const filteredJobs = useMemo(() => {
        return initialJobs.filter((job) => {
            const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 job.description.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesCountry = selectedCountry === "All" || job.country.includes(selectedCountry);
            const matchesCity = selectedCity === "All" || job.city.includes(selectedCity);
            const matchesExp = selectedExp === "All" || job.experience.includes(selectedExp);
            const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
            const matchesType = selectedType === "All" || job.type.includes(selectedType);

            return matchesSearch && matchesCountry && matchesCity && matchesExp && matchesCategory && matchesType;
        });
    }, [searchQuery, selectedCountry, selectedCity, selectedExp, selectedCategory, selectedType]);

    return (
        <div style={{ backgroundColor: "var(--midnight)", color: "var(--text-primary)", minHeight: "100vh" }}>
            
            {/* ── Hero Section with Handshake Background ── */}
            <section 
                style={{ 
                    position: "relative",
                    backgroundImage: "linear-gradient(rgba(10, 15, 28, 0.65), rgba(10, 15, 28, 0.8)), url('https://images.unsplash.com/photo-1521791136368-1a8682707636?q=80&w=1600&auto=format&fit=crop')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "200px 0 160px 0",
                    textAlign: "center",
                    overflow: "hidden"
                }}
            >
                {/* Slanted overlay divider */}
                <div 
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "120px",
                        backgroundColor: "var(--midnight)",
                        clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
                        zIndex: 10
                    }}
                />

                <div className="container" style={{ position: "relative", zIndex: 5 }}>
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div style={{ display: "flex", justifyContent: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <span>&gt;</span>
                            <span style={{ color: "var(--text-primary)" }}>Careers</span>
                        </div>
                        <motion.h1 
                            variants={fadeUpVariants(shouldReduce)}
                            style={{ 
                                fontFamily: "var(--font-display)", 
                                fontStyle: "italic", 
                                fontSize: "clamp(3rem, 7vw, 5rem)", 
                                color: "#ffffff",
                                margin: 0,
                                textShadow: "0 4px 16px rgba(0,0,0,0.5)"
                            }}
                        >
                            SAMSAN Careers
                        </motion.h1>
                        <motion.p
                            variants={fadeUpVariants(shouldReduce)}
                            style={{
                                color: "var(--text-secondary)",
                                fontSize: "1.15rem",
                                maxWidth: "580px",
                                margin: "20px auto 0 auto",
                                lineHeight: "1.6"
                            }}
                        >
                            Attract engineering talent, explore our collaborative culture, and build the future of technology with us.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── Culture & Values Section ── */}
            <section style={{ padding: "60px 0 100px 0", position: "relative" }}>
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <span className="badge" style={{ marginBottom: "16px" }}>Our Culture</span>
                        <h2 style={{ fontSize: "2.4rem", fontWeight: 700, fontFamily: "var(--font-display)" }}>
                            SAMSAN Careers
                        </h2>
                    </div>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "40px",
                        alignItems: "center"
                    }}>
                        {/* Left Column Culture Cards */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                            {/* Card 1 */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    background: "rgba(13,19,35,0.4)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "var(--radius)",
                                    padding: "32px",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                                }}
                            >
                                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                                    <div style={{ color: "var(--violet-mid)", backgroundColor: "var(--violet-soft)", padding: "8px", borderRadius: "50%" }}>
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M2 21h19v-2H2v2zM20 8h-2V5h2v3zm-4 0h-2V3h2v5zM12 8h-2V1h2v7zm-4 0H6v-3h2v3zm-4 0H2v5h2v-5zM2 13h19v-2H2v2zm0 4h19v-2H2v2z"/>
                                        </svg>
                                    </div>
                                    <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#ffffff", margin: 0 }}>
                                        Embrace An Empowering Work Environment
                                    </h3>
                                </div>
                                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.7", margin: 0 }}>
                                    At SAMSAN, we believe in fostering a flexible work environment that empowers our talented team to thrive. Join us, and you&apos;ll have the incredible opportunity to work on cutting-edge technology projects for global customers, making your mark on the world stage.
                                </p>
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                style={{
                                    background: "rgba(13,19,35,0.4)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "var(--radius)",
                                    padding: "32px",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                                }}
                            >
                                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                                    <div style={{ color: "var(--violet-mid)", backgroundColor: "var(--violet-soft)", padding: "8px", borderRadius: "50%" }}>
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                                        </svg>
                                    </div>
                                    <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#ffffff", margin: 0 }}>
                                        Be An Integral Part Of Our Growth Story
                                    </h3>
                                </div>
                                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.7", margin: 0 }}>
                                    As SAMSAN continues to embark on a journey of growth and success, we invite you to be an essential part of our story. Together, we&apos;ll shape the future, driving innovation and excellence in every endeavor.
                                </p>
                            </motion.div>
                        </div>

                        {/* Center Column: Core Values Graph */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "20px",
                                background: "radial-gradient(circle at center, rgba(124,58,237,0.08) 0%, transparent 70%)",
                                padding: "40px",
                                borderRadius: "50%"
                            }}>
                                {/* Central Core Values Node */}
                                <div style={{
                                    background: "linear-gradient(135deg, var(--blue), var(--violet-mid))",
                                    padding: "20px 30px",
                                    borderRadius: "100px",
                                    boxShadow: "0 0 30px var(--violet-glow)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    textAlign: "center"
                                }}>
                                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.8)" }}>Our Core</span>
                                    <h4 style={{ margin: "2px 0 0 0", color: "#ffffff", fontSize: "1.2rem", fontWeight: 700 }}>VALUES</h4>
                                </div>

                                {/* Nodes Layout */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
                                    {/* Collaboration Node */}
                                    <motion.div 
                                        whileHover={{ scale: 1.03 }}
                                        style={{
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1px solid var(--border)",
                                            borderRadius: "14px",
                                            padding: "16px 20px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "16px",
                                            backdropFilter: "blur(8px)"
                                        }}
                                    >
                                        <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--blue)" }}>01</div>
                                        <div>
                                            <h5 style={{ margin: 0, color: "#ffffff", fontSize: "0.95rem" }}>COLLABORATION</h5>
                                            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>One team, one goal, zero surprises!</p>
                                        </div>
                                    </motion.div>

                                    {/* Aspiration Node */}
                                    <motion.div 
                                        whileHover={{ scale: 1.03 }}
                                        style={{
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1px solid var(--border)",
                                            borderRadius: "14px",
                                            padding: "16px 20px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "16px",
                                            backdropFilter: "blur(8px)"
                                        }}
                                    >
                                        <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--violet-mid)" }}>02</div>
                                        <div>
                                            <h5 style={{ margin: 0, color: "#ffffff", fontSize: "0.95rem" }}>ASPIRATION</h5>
                                            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>Think Big. Deliver Big. Act Big.</p>
                                        </div>
                                    </motion.div>

                                    {/* Respect Node */}
                                    <motion.div 
                                        whileHover={{ scale: 1.03 }}
                                        style={{
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1px solid var(--border)",
                                            borderRadius: "14px",
                                            padding: "16px 20px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "16px",
                                            backdropFilter: "blur(8px)"
                                        }}
                                    >
                                        <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--rose)" }}>03</div>
                                        <div>
                                            <h5 style={{ margin: 0, color: "#ffffff", fontSize: "0.95rem" }}>RESPECT</h5>
                                            <p style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>Respect is earned. Honesty is expected.</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column Culture Cards */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                            {/* Card 3 */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    background: "rgba(13,19,35,0.4)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "var(--radius)",
                                    padding: "32px",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                                }}
                            >
                                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                                    <div style={{ color: "var(--violet-mid)", backgroundColor: "var(--violet-soft)", padding: "8px", borderRadius: "50%" }}>
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13l-9-4.91V15l9 4.91 9-4.91v-3.91L12 16z"/>
                                        </svg>
                                    </div>
                                    <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#ffffff", margin: 0 }}>
                                        A Culture Of Learning And Growth
                                    </h3>
                                </div>
                                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.7", margin: 0 }}>
                                    We cultivate a culture of continuous learning and personal growth. With access to resources, workshops, and mentorship, you&apos;ll have the tools to expand your knowledge and develop your skills, unleashing your full potential.
                                </p>
                            </motion.div>

                            {/* Card 4 */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                style={{
                                    background: "rgba(13,19,35,0.4)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "var(--radius)",
                                    padding: "32px",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
                                }}
                            >
                                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                                    <div style={{ color: "var(--violet-mid)", backgroundColor: "var(--violet-soft)", padding: "8px", borderRadius: "50%" }}>
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/>
                                        </svg>
                                    </div>
                                    <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#ffffff", margin: 0 }}>
                                        Unleash The High Performer Within
                                    </h3>
                                </div>
                                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.7", margin: 0 }}>
                                    At SAMSAN, we recognize and celebrate high performers. As you contribute your expertise and dedication, you&apos;ll discover the high achiever within you, propelling your career to new heights.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA Banner Strip ── */}
            <section style={{ backgroundColor: "#060913", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "40px 0" }}>
                <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Link 
                        href="#job-openings" 
                        className="btn btn-primary"
                    >
                        Explore Automotive Engineering Roles
                    </Link>
                </div>
            </section>

            {/* ── Job Openings Filter Area ── */}
            <section id="job-openings" style={{ padding: "80px 0 120px 0" }}>
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, fontFamily: "var(--font-display)", color: "#ffffff" }}>
                            Job Openings
                        </h2>
                    </div>

                    {/* Filter Inputs Grid */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                        gap: "16px",
                        marginBottom: "40px",
                        background: "rgba(13,19,35,0.3)",
                        padding: "24px",
                        borderRadius: "16px",
                        border: "1px solid var(--border)"
                    }}>
                        {/* Search Query */}
                        <div style={{ position: "relative" }}>
                            <input 
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "12px 16px",
                                    borderRadius: "8px",
                                    backgroundColor: "rgba(10,15,28,0.6)",
                                    border: "1px solid var(--border)",
                                    color: "#fff",
                                    outline: "none",
                                    fontSize: "0.85rem"
                                }}
                            />
                        </div>

                        {/* Country Filter */}
                        <select 
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            style={{
                                padding: "12px 16px",
                                borderRadius: "8px",
                                backgroundColor: "rgba(10,15,28,0.6)",
                                border: "1px solid var(--border)",
                                color: "#fff",
                                outline: "none",
                                fontSize: "0.85rem"
                            }}
                        >
                            <option value="All">All Countries</option>
                            {countries.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                        </select>

                        {/* City Filter */}
                        <select 
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            style={{
                                padding: "12px 16px",
                                borderRadius: "8px",
                                backgroundColor: "rgba(10,15,28,0.6)",
                                border: "1px solid var(--border)",
                                color: "#fff",
                                outline: "none",
                                fontSize: "0.85rem"
                            }}
                        >
                            <option value="All">All Cities</option>
                            {cities.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                        </select>

                        {/* Experience Filter */}
                        <select 
                            value={selectedExp}
                            onChange={(e) => setSelectedExp(e.target.value)}
                            style={{
                                padding: "12px 16px",
                                borderRadius: "8px",
                                backgroundColor: "rgba(10,15,28,0.6)",
                                border: "1px solid var(--border)",
                                color: "#fff",
                                outline: "none",
                                fontSize: "0.85rem"
                            }}
                        >
                            <option value="All">All Experiences</option>
                            {experiences.filter(e => e !== "All").map(e => <option key={e} value={e}>{e}</option>)}
                        </select>

                        {/* Job Category Filter */}
                        <select 
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={{
                                padding: "12px 16px",
                                borderRadius: "8px",
                                backgroundColor: "rgba(10,15,28,0.6)",
                                border: "1px solid var(--border)",
                                color: "#fff",
                                outline: "none",
                                fontSize: "0.85rem"
                            }}
                        >
                            <option value="All">All Categories</option>
                            {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                        </select>

                        {/* Job Type Filter */}
                        <select 
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            style={{
                                padding: "12px 16px",
                                borderRadius: "8px",
                                backgroundColor: "rgba(10,15,28,0.6)",
                                border: "1px solid var(--border)",
                                color: "#fff",
                                outline: "none",
                                fontSize: "0.85rem"
                            }}
                        >
                            <option value="All">All Types</option>
                            {types.filter(t => t !== "All").map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>

                    {/* Jobs Display Grid */}
                    <motion.div 
                        layout
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "24px"
                        }}
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredJobs.map((job) => (
                                <motion.div
                                    key={job.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        background: "rgba(13, 19, 35, 0.45)",
                                        border: "1px solid var(--border)",
                                        borderRadius: "var(--radius)",
                                        padding: "30px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        boxShadow: "0 10px 35px rgba(0,0,0,0.1)",
                                        backdropFilter: "blur(12px)"
                                    }}
                                >
                                    <div>
                                        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
                                            <span className="badge" style={{ fontSize: "8px", padding: "4px 10px" }}>{job.category}</span>
                                            <span className="badge rose" style={{ fontSize: "8px", padding: "4px 10px" }}>{job.type.split(",")[0]}</span>
                                        </div>
                                        <h3 style={{ fontSize: "1.25rem", color: "#ffffff", fontWeight: 600, marginBottom: "12px", fontFamily: "var(--font-display)" }}>
                                            {job.title}
                                        </h3>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
                                            <div>📍 <strong>Location:</strong> {job.country} ({job.city})</div>
                                            <div>💼 <strong>Experience:</strong> {job.experience}</div>
                                        </div>
                                        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.6", margin: "0 0 24px 0" }}>
                                            {job.description}
                                        </p>
                                    </div>
                                    <Link 
                                        href="/contact" 
                                        className="btn btn-outline" 
                                        style={{ 
                                            padding: "10px 18px", 
                                            fontSize: "0.8rem", 
                                            width: "100%",
                                            justifyContent: "center",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            backgroundColor: "rgba(255,255,255,0.02)"
                                        }}
                                    >
                                        More Details →
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredJobs.length === 0 && (
                        <div style={{ textAlign: "center", padding: "60px", color: "var(--text-secondary)" }}>
                            No job openings match your current filter selections.
                        </div>
                    )}
                </div>
            </section>

        </div>
    );
}
