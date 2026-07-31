"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";
import { runWorkerTask } from "@/utils/multithreadedWorker";

interface Job {
    id: string;
    title: string;
    slug: string;
    country: string;
    city: string;
    experience: string;
    category: "Embedded Engineering" | "HMI Development" | "Connectivity" | "Validation & Testing" | "Systems Engineering";
    type: string;
    description: string;
    skills: string[];
}

const initialJobs: Job[] = [
    {
        id: "1",
        title: "Linux BSP Developer",
        slug: "linux-bsp-developer",
        country: "India",
        city: "Pune",
        experience: "3–5 Years",
        category: "Embedded Engineering",
        type: "Full-time",
        description: "Hiring developers for Linux BSP and driver development across automotive embedded platforms.",
        skills: ["Embedded C", "Linux BSP", "Driver Development", "Qualcomm", "NXP", "TI", "Infineon"]
    },
    {
        id: "2",
        title: "Multimedia & Middleware Engineer",
        slug: "multimedia-middleware-engineer",
        country: "India",
        city: "Pune, Bangalore",
        experience: "3–5 Years",
        category: "Embedded Engineering",
        type: "Full-time",
        description: "Seeking candidates for multimedia and middleware development in automotive systems including audio/video frameworks and system-level programming.",
        skills: ["Android Media Framework", "Software Development", "Audio/Video Frameworks", "System Programming"]
    },
    {
        id: "3",
        title: "Multimedia & Middleware Engineer — OTA",
        slug: "multimedia-middleware-engineer-ota",
        country: "India",
        city: "Bangalore",
        experience: "5–7 Years",
        category: "Embedded Engineering",
        type: "Full-time",
        description: "Looking for professionals with experience in software update systems, update mechanisms, and system integration for automotive platforms.",
        skills: ["OTA Updates", "AOSP", "AAOS", "Java", "Kotlin", "System Integration"]
    },
    {
        id: "4",
        title: "Android HMI Engineer",
        slug: "android-hmi-engineer",
        country: "India",
        city: "Pune",
        experience: "5–8 Years",
        category: "HMI Development",
        type: "Full-time",
        description: "Hiring experienced HMI Engineers for Android-based automotive applications with system and user-level app development experience.",
        skills: ["Java", "Kotlin", "Jetpack", "HMI Development", "Android Automotive"]
    },
    {
        id: "5",
        title: "Connectivity Engineer",
        slug: "connectivity-engineer",
        country: "India",
        city: "Bangalore",
        experience: "7–9 Years",
        category: "Connectivity",
        type: "Full-time",
        description: "Looking for senior engineers in the automotive connectivity domain with hands-on experience in connectivity stack and integration.",
        skills: ["Bluetooth", "Wi-Fi", "AOSP", "Telematics", "Yocto Linux", "Connectivity Stack"]
    },
    {
        id: "6",
        title: "Media Projection Engineer",
        slug: "media-projection-engineer",
        country: "India",
        city: "Pune, Bangalore",
        experience: "2–7 Years",
        category: "HMI Development",
        type: "Full-time",
        description: "Seeking engineers with experience in smartphone projection systems and media projection integration for automotive applications.",
        skills: ["Android Auto", "Apple CarPlay", "Media Projection", "System Integration"]
    },
    {
        id: "7",
        title: "Android HMI Engineer — Unreal",
        slug: "android-hmi-engineer-unreal",
        country: "India",
        city: "Pune",
        experience: "3–8 Years",
        category: "HMI Development",
        type: "Full-time",
        description: "Hiring developers for advanced HMI development using Unreal Engine with experience in high-performance UI development.",
        skills: ["Java", "Kotlin", "Unreal Engine", "HMI Development", "High-Performance UI"]
    },
    {
        id: "8",
        title: "Automotive IVI Testing Engineer",
        slug: "automotive-ivi-testing-engineer",
        country: "India",
        city: "Pune",
        experience: "3–5 Years",
        category: "Validation & Testing",
        type: "Full-time",
        description: "Looking for IVI Test Engineers for infotainment system validation and test automation in automotive environments.",
        skills: ["Embedded C", "CAPL Scripting", "Python", "Robot Framework", "IVI Testing", "Test Automation"]
    },
    {
        id: "9",
        title: "HMI Tester",
        slug: "hmi-tester",
        country: "India",
        city: "Bangalore",
        experience: "3–8 Years",
        category: "Validation & Testing",
        type: "Full-time",
        description: "Seeking HMI Testers with strong experience in validating automotive HMI applications and test automation.",
        skills: ["Linux", "Python", "Appium", "Automation Scripting", "Android Testing", "Embedded Testing"]
    },
    {
        id: "10",
        title: "SPOC — V2X",
        slug: "spoc-v2x",
        country: "India",
        city: "Pune",
        experience: "3–8 Years",
        category: "Connectivity",
        type: "Full-time",
        description: "Looking for a SPOC with expertise in Vehicle-to-Everything (V2X) communication systems handling end-to-end V2X modules and integrations.",
        skills: ["Linux", "C++", "Middleware", "V2X Communication", "System Integration"]
    },
    {
        id: "11",
        title: "SPOC — RD ECU",
        slug: "spoc-rd-ecu",
        country: "India",
        city: "Pune",
        experience: "3–8 Years",
        category: "Embedded Engineering",
        type: "Full-time",
        description: "Hiring SPOC for RD ECU development and coordination with experience in ECU software development and automotive communication protocols.",
        skills: ["Linux", "C++", "Connectivity Protocols", "ECU Development", "Automotive Communication"]
    },
    {
        id: "12",
        title: "Android HAL Engineer",
        slug: "android-hal-engineer",
        country: "India",
        city: "Pune, Bangalore",
        experience: "3–8 Years",
        category: "Embedded Engineering",
        type: "Full-time",
        description: "Need engineers with strong experience in Android HAL layer development and understanding of Android architecture and low-level system integration.",
        skills: ["AOSP", "AAOS", "HIDL", "AIDL", "Soong/Make Build System", "Android Architecture"]
    },
    {
        id: "13",
        title: "Systems Engineer",
        slug: "systems-engineer",
        country: "India",
        city: "Pune",
        experience: "7+ Years",
        category: "Systems Engineering",
        type: "Full-time",
        description: "Looking for experienced Systems Engineers with strong background in requirements engineering, system architecture, and integration across automotive E/E domains.",
        skills: ["Requirements Engineering", "System Architecture", "CAN", "LIN", "Ethernet", "ISO 26262", "ISO 21434", "DOORS", "Polarion", "JIRA", "Enterprise Architect", "CANoe", "CANalyzer", "MBSE", "SysML", "UDS", "DoIP", "Agile"]
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
    const cities = ["All", "Pune", "Bangalore"];
    const experiences = ["All", "2–7 Years", "3–5 Years", "3–8 Years", "5–7 Years", "5–8 Years", "7–9 Years", "7+ Years"];
    const categories = ["All", "Embedded Engineering", "HMI Development", "Connectivity", "Validation & Testing", "Systems Engineering"];
    const types = ["All", "Full-time"];

    // Multithreaded Background Worker Filter Logic (off-main-thread processing for zero lag)
    const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs);

    useEffect(() => {
        let isMounted = true;
        const filterCriteria = {
            searchQuery,
            selectedCountry,
            selectedCity,
            selectedExp,
            selectedCategory,
            selectedType,
            jobs: initialJobs
        };

        runWorkerTask((data) => {
            return data.jobs.filter((job) => {
                const matchesSearch = job.title.toLowerCase().includes(data.searchQuery.toLowerCase().trim());
                const matchesCountry = data.selectedCountry === "All" || job.country.includes(data.selectedCountry);
                const matchesCity = data.selectedCity === "All" || job.city.includes(data.selectedCity);
                const matchesExp = data.selectedExp === "All" || job.experience === data.selectedExp;
                const matchesCategory = data.selectedCategory === "All" || job.category === data.selectedCategory;
                const matchesType = data.selectedType === "All" || job.type === data.selectedType;

                return matchesSearch && matchesCountry && matchesCity && matchesExp && matchesCategory && matchesType;
            });
        }, filterCriteria).then((result) => {
            if (isMounted) {
                setFilteredJobs(result);
            }
        }).catch(() => {
            if (isMounted) {
                setFilteredJobs(initialJobs.filter((job) => {
                    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
                    const matchesCountry = selectedCountry === "All" || job.country.includes(selectedCountry);
                    const matchesCity = selectedCity === "All" || job.city.includes(selectedCity);
                    const matchesExp = selectedExp === "All" || job.experience === selectedExp;
                    const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
                    const matchesType = selectedType === "All" || job.type === selectedType;
                    return matchesSearch && matchesCountry && matchesCity && matchesExp && matchesCategory && matchesType;
                }));
            }
        });

        return () => {
            isMounted = false;
        };
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
                                whileHover={{ y: -6, borderColor: "rgba(168, 85, 247, 0.5)", boxShadow: "0 14px 40px rgba(124, 58, 237, 0.25)" }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    background: "linear-gradient(135deg, rgba(13,19,35,0.6) 0%, rgba(20,28,50,0.4) 100%)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "var(--radius)",
                                    padding: "32px",
                                    position: "relative",
                                    overflow: "hidden",
                                    backdropFilter: "blur(12px)"
                                }}
                            >
                                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                                    <div style={{ color: "var(--violet-mid)", backgroundColor: "rgba(124,58,237,0.15)", padding: "10px", borderRadius: "12px", border: "1px solid rgba(124,58,237,0.3)" }}>
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13l-9-4.91V15l9 4.91 9-4.91v-3.91L12 16z"/>
                                        </svg>
                                    </div>
                                    <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#ffffff", margin: 0 }}>
                                        AI-Powered Learning & Growth
                                    </h3>
                                </div>
                                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.7", margin: 0 }}>
                                    We cultivate a culture of continuous learning and personal growth using AI-driven knowledge tools, workshops, and high-tech mentorship to unleash your full engineering potential.
                                </p>
                            </motion.div>

                            {/* Card 4 */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -6, borderColor: "rgba(77, 216, 232, 0.5)", boxShadow: "0 14px 40px rgba(0, 210, 255, 0.2)" }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                style={{
                                    background: "linear-gradient(135deg, rgba(13,19,35,0.6) 0%, rgba(20,28,50,0.4) 100%)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "var(--radius)",
                                    padding: "32px",
                                    position: "relative",
                                    overflow: "hidden",
                                    backdropFilter: "blur(12px)"
                                }}
                            >
                                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                                    <div style={{ color: "#4dd8e8", backgroundColor: "rgba(77,216,232,0.15)", padding: "10px", borderRadius: "12px", border: "1px solid rgba(77,216,232,0.3)" }}>
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
                        background: "rgba(13,19,35,0.5)",
                        padding: "24px",
                        borderRadius: "16px",
                        border: "1px solid rgba(124, 58, 237, 0.2)",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                        backdropFilter: "blur(12px)"
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
                                    backgroundColor: "rgba(10,15,28,0.7)",
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
                                backgroundColor: "rgba(10,15,28,0.7)",
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
                                backgroundColor: "rgba(10,15,28,0.7)",
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
                                backgroundColor: "rgba(10,15,28,0.7)",
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
                                backgroundColor: "rgba(10,15,28,0.7)",
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
                                backgroundColor: "rgba(10,15,28,0.7)",
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

                    {/* Jobs Display Grid with AI Animation */}
                    <motion.div 
                        layout
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                            gap: "24px"
                        }}
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredJobs.map((job) => (
                                <motion.div
                                    key={job.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    whileHover={{ 
                                        y: -8, 
                                        borderColor: "rgba(168, 85, 247, 0.6)",
                                        boxShadow: "0 20px 48px rgba(124, 58, 237, 0.22), 0 0 20px rgba(77, 216, 232, 0.15)"
                                    }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                    style={{
                                        background: "linear-gradient(145deg, rgba(13, 19, 35, 0.65) 0%, rgba(20, 28, 52, 0.5) 100%)",
                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                        borderRadius: "16px",
                                        padding: "30px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        overflow: "hidden",
                                        backdropFilter: "blur(14px)"
                                    }}
                                >
                                    {/* AI Futuristic Scanning Pulse Beam */}
                                    <motion.div 
                                        animate={{ x: ["-100%", "200%"] }}
                                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "40%",
                                            height: "2px",
                                            background: "linear-gradient(90deg, transparent, #4dd8e8, #a855f7, transparent)",
                                            pointerEvents: "none"
                                        }}
                                    />

                                    <div>
                                        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
                                            <span className="badge" style={{ fontSize: "9px", padding: "4px 10px", backgroundColor: "rgba(124, 58, 237, 0.2)", border: "1px solid rgba(124, 58, 237, 0.4)", color: "#c084fc" }}>
                                                {job.category}
                                            </span>
                                            <span className="badge rose" style={{ fontSize: "9px", padding: "4px 10px" }}>{job.type}</span>
                                            <span style={{ marginLeft: "auto", fontSize: "0.7rem", color: "#4dd8e8", display: "inline-flex", alignItems: "center", gap: "4px", fontWeight: 600 }}>
                                                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#4dd8e8", boxShadow: "0 0 8px #4dd8e8" }} />
                                                AI-Accelerated
                                            </span>
                                        </div>
                                        <h3 style={{ fontSize: "1.25rem", color: "#ffffff", fontWeight: 600, marginBottom: "12px", fontFamily: "var(--font-display)", lineHeight: "1.3" }}>
                                            {job.title}
                                        </h3>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "16px" }}>
                                            <div>📍 <strong>Location:</strong> {job.city}, {job.country}</div>
                                            <div>💼 <strong>Experience:</strong> {job.experience}</div>
                                        </div>
                                        <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.6", margin: "0 0 20px 0" }}>
                                            {job.description}
                                        </p>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
                                            {job.skills.map((skill) => (
                                                <motion.span
                                                    key={skill}
                                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(168, 85, 247, 0.15)", borderColor: "rgba(168, 85, 247, 0.4)" }}
                                                    style={{
                                                        fontSize: "0.75rem",
                                                        padding: "4px 9px",
                                                        borderRadius: "6px",
                                                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                                        color: "var(--text-secondary)",
                                                        transition: "all 0.2s ease"
                                                    }}
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                    <Link 
                                        href={`/contact?product=careers&role=${job.slug}`} 
                                        className="btn btn-outline" 
                                        style={{ 
                                            padding: "10px 18px", 
                                            fontSize: "0.85rem", 
                                            width: "100%",
                                            justifyContent: "center",
                                            border: "1px solid rgba(168, 85, 247, 0.3)",
                                            backgroundColor: "rgba(124, 58, 237, 0.05)",
                                            color: "#ffffff"
                                        }}
                                    >
                                        Apply Now →
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredJobs.length === 0 && (
                        <div style={{ textAlign: "center", padding: "60px", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                            No openings found for your selection. Try adjusting the filters or contact us at{" "}
                            <a href="mailto:india@samsanlabs.com" style={{ color: "var(--violet-mid)", textDecoration: "underline" }}>
                                india@samsanlabs.com
                            </a>
                        </div>
                    )}
                </div>
            </section>

        </div>
    );
}
