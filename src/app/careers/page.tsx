<<<<<<< HEAD
import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
    title: "Careers | SAMSAN",
};

export default function CareersPage() {
    return <CareersClient />;
=======
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";

interface Job {
    id: string;
    title: string;
    slug: string;
    country: string;
    city: string;
    experience: "0-2 Years" | "2-5 Years" | "5-8 Years" | "8+ Years";
    category: "Embedded Engineering" | "HMI Development" | "Connectivity" | "Validation & Testing" | "Systems Engineering";
    type: string;
    description: string;
    skills: string[];
}

// Standardized Job Openings list — sorted alphabetically by title by default
const rawJobs: Job[] = [
    {
        id: "1",
        title: "Android HAL Engineer",
        slug: "android-hal-engineer",
        country: "India",
        city: "Pune, Bangalore",
        experience: "2-5 Years",
        category: "Embedded Engineering",
        type: "Full-time",
        description: "Need engineers with strong experience in Android HAL layer development, HIDL/AIDL interfaces, and low-level system integration across automotive architectures.",
        skills: ["AOSP", "AAOS", "HIDL", "AIDL", "Soong/Make", "Android Architecture"]
    },
    {
        id: "2",
        title: "Android HMI Engineer",
        slug: "android-hmi-engineer",
        country: "India",
        city: "Pune",
        experience: "5-8 Years",
        category: "HMI Development",
        type: "Full-time",
        description: "Hiring experienced HMI Engineers for Android-based automotive cockpit applications with system and user-level app development experience.",
        skills: ["Java", "Kotlin", "Jetpack", "HMI Development", "Android Automotive"]
    },
    {
        id: "3",
        title: "Android HMI Engineer — Unreal",
        slug: "android-hmi-engineer-unreal",
        country: "India",
        city: "Pune",
        experience: "5-8 Years",
        category: "HMI Development",
        type: "Full-time",
        description: "Hiring developers for advanced cockpit HMI development using Unreal Engine with experience in high-performance 3D UI rendering.",
        skills: ["Java", "Kotlin", "Unreal Engine", "HMI Development", "High-Performance UI"]
    },
    {
        id: "4",
        title: "Associate Embedded Test Engineer",
        slug: "associate-embedded-test-engineer",
        country: "India",
        city: "Pune",
        experience: "0-2 Years",
        category: "Validation & Testing",
        type: "Full-time",
        description: "Entry-level position for passionate engineers looking to build a career in automotive embedded testing, test script execution, and validation.",
        skills: ["Embedded C", "Python", "Manual Testing", "CAN Protocol", "Test Automation"]
    },
    {
        id: "5",
        title: "Automotive IVI Testing Engineer",
        slug: "automotive-ivi-testing-engineer",
        country: "India",
        city: "Pune",
        experience: "2-5 Years",
        category: "Validation & Testing",
        type: "Full-time",
        description: "Looking for IVI Test Engineers for in-vehicle infotainment system validation, CAPL scripting, and test automation in automotive environments.",
        skills: ["Embedded C", "CAPL Scripting", "Python", "Robot Framework", "IVI Testing", "Test Automation"]
    },
    {
        id: "6",
        title: "Connectivity Engineer",
        slug: "connectivity-engineer",
        country: "India",
        city: "Bangalore",
        experience: "8+ Years",
        category: "Connectivity",
        type: "Full-time",
        description: "Looking for senior engineers in the automotive connectivity domain with hands-on experience in telematics, Bluetooth/Wi-Fi stack, and Yocto Linux.",
        skills: ["Bluetooth", "Wi-Fi", "AOSP", "Telematics", "Yocto Linux", "Connectivity Stack"]
    },
    {
        id: "7",
        title: "HMI Tester",
        slug: "hmi-tester",
        country: "India",
        city: "Bangalore",
        experience: "2-5 Years",
        category: "Validation & Testing",
        type: "Full-time",
        description: "Seeking HMI Testers with strong experience in validating automotive HMI applications, UI automated testing, and Appium scripting.",
        skills: ["Linux", "Python", "Appium", "Automation Scripting", "Android Testing", "Embedded Testing"]
    },
    {
        id: "8",
        title: "Junior Android HMI Developer",
        slug: "junior-android-hmi-developer",
        country: "India",
        city: "Bangalore",
        experience: "0-2 Years",
        category: "HMI Development",
        type: "Full-time",
        description: "Entry-level role for Android developers eager to learn automotive cockpit interfaces, Kotlin UI development, and HMI framework architecture.",
        skills: ["Java", "Kotlin", "Android SDK", "Git", "UI Components"]
    },
    {
        id: "9",
        title: "Linux BSP Developer",
        slug: "linux-bsp-developer",
        country: "India",
        city: "Pune",
        experience: "2-5 Years",
        category: "Embedded Engineering",
        type: "Full-time",
        description: "Hiring developers for Linux BSP and driver development across automotive embedded platforms (Qualcomm, NXP, TI, Infineon).",
        skills: ["Embedded C", "Linux BSP", "Driver Development", "Qualcomm", "NXP", "TI", "Infineon"]
    },
    {
        id: "10",
        title: "Media Projection Engineer",
        slug: "media-projection-engineer",
        country: "India",
        city: "Pune, Bangalore",
        experience: "2-5 Years",
        category: "HMI Development",
        type: "Full-time",
        description: "Seeking engineers with experience in smartphone projection systems (Android Auto, Apple CarPlay) and media projection integration for automotive platforms.",
        skills: ["Android Auto", "Apple CarPlay", "Media Projection", "System Integration"]
    },
    {
        id: "11",
        title: "Multimedia & Middleware Engineer",
        slug: "multimedia-middleware-engineer",
        country: "India",
        city: "Pune, Bangalore",
        experience: "2-5 Years",
        category: "Embedded Engineering",
        type: "Full-time",
        description: "Seeking candidates for multimedia and middleware development in automotive systems including audio/video frameworks and system-level programming.",
        skills: ["Android Media Framework", "Software Development", "Audio/Video Frameworks", "System Programming"]
    },
    {
        id: "12",
        title: "Multimedia & Middleware Engineer — OTA",
        slug: "multimedia-middleware-engineer-ota",
        country: "India",
        city: "Bangalore",
        experience: "5-8 Years",
        category: "Embedded Engineering",
        type: "Full-time",
        description: "Looking for professionals with experience in software update systems, OTA mechanisms, AOSP/AAOS, and system integration for automotive platforms.",
        skills: ["OTA Updates", "AOSP", "AAOS", "Java", "Kotlin", "System Integration"]
    },
    {
        id: "13",
        title: "SPOC — RD ECU",
        slug: "spoc-rd-ecu",
        country: "India",
        city: "Pune",
        experience: "5-8 Years",
        category: "Embedded Engineering",
        type: "Full-time",
        description: "Hiring Single Point of Contact (SPOC) for RD ECU development and coordination with experience in ECU software development and automotive communication protocols.",
        skills: ["Linux", "C++", "Connectivity Protocols", "ECU Development", "Automotive Communication"]
    },
    {
        id: "14",
        title: "SPOC — V2X",
        slug: "spoc-v2x",
        country: "India",
        city: "Pune",
        experience: "5-8 Years",
        category: "Connectivity",
        type: "Full-time",
        description: "Looking for a SPOC with expertise in Vehicle-to-Everything (V2X) communication systems handling end-to-end V2X modules and integrations.",
        skills: ["Linux", "C++", "Middleware", "V2X Communication", "System Integration"]
    },
    {
        id: "15",
        title: "Systems Engineer",
        slug: "systems-engineer",
        country: "India",
        city: "Pune",
        experience: "8+ Years",
        category: "Systems Engineering",
        type: "Full-time",
        description: "Looking for senior Systems Engineers with strong background in requirements engineering, system architecture, and integration across automotive E/E domains.",
        skills: ["Requirements Engineering", "System Architecture", "CAN", "LIN", "Ethernet", "ISO 26262", "ISO 21434", "DOORS", "Polarion", "JIRA", "MBSE", "SysML", "UDS", "DoIP"]
    }
];

// Ensure alphabetical sorting by title by default
const initialJobs: Job[] = [...rawJobs].sort((a, b) => a.title.localeCompare(b.title));

const careerStats = [
    { value: "15+", label: "Open Positions" },
    { value: "5", label: "Specialized Engineering Domains" },
    { value: "4+", label: "Global Innovation Hubs" },
    { value: "100%", label: "Engineering Excellence" }
];

export default function CareersPage() {
    const shouldReduce = useReducedMotion();

    // Standardized Filter Options
    const countries = ["All Countries", "India"];
    const cities = ["All Cities", "Pune", "Bangalore"];
    const experiences = ["All Experience", "0-2 Years", "2-5 Years", "5-8 Years", "8+ Years"];
    const categories = ["All Categories", "Embedded Engineering", "HMI Development", "Connectivity", "Validation & Testing", "Systems Engineering"];
    const types = ["All Types", "Full-time"];

    // Active Filter Controls State
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("All Countries");
    const [selectedCity, setSelectedCity] = useState("All Cities");
    const [selectedExp, setSelectedExp] = useState("All Experience");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedType, setSelectedType] = useState("All Types");

    // Applied Filter State (updates on button click or change)
    const [appliedFilters, setAppliedFilters] = useState({
        searchQuery: "",
        selectedCountry: "All Countries",
        selectedCity: "All Cities",
        selectedExp: "All Experience",
        selectedCategory: "All Categories",
        selectedType: "All Types"
    });

    // Pure, synchronous, zero-lag memoized filter computation
    const filteredJobs = useMemo(() => {
        const query = appliedFilters.searchQuery.toLowerCase().trim();
        const countryFilter = appliedFilters.selectedCountry;
        const cityFilter = appliedFilters.selectedCity;
        const expFilter = appliedFilters.selectedExp;
        const catFilter = appliedFilters.selectedCategory;
        const typeFilter = appliedFilters.selectedType;

        const results = initialJobs.filter((job) => {
            const matchesSearch = !query ||
                job.title.toLowerCase().includes(query) ||
                job.description.toLowerCase().includes(query) ||
                job.skills.some((s) => s.toLowerCase().includes(query));

            const matchesCountry = countryFilter === "All Countries" || job.country.includes(countryFilter);
            const matchesCity = cityFilter === "All Cities" || job.city.includes(cityFilter);
            const matchesExp = expFilter === "All Experience" || job.experience === expFilter;
            const matchesCategory = catFilter === "All Categories" || job.category === catFilter;
            const matchesType = typeFilter === "All Types" || job.type === typeFilter;

            return matchesSearch && matchesCountry && matchesCity && matchesExp && matchesCategory && matchesType;
        });

        return results.sort((a, b) => a.title.localeCompare(b.title));
    }, [appliedFilters]);

    // Apply Filter Button Handler (also auto-syncs state)
    const handleApplyFilter = (overrideState?: Partial<typeof appliedFilters>) => {
        setAppliedFilters(prev => ({
            searchQuery: overrideState?.searchQuery !== undefined ? overrideState.searchQuery : searchQuery,
            selectedCountry: overrideState?.selectedCountry !== undefined ? overrideState.selectedCountry : selectedCountry,
            selectedCity: overrideState?.selectedCity !== undefined ? overrideState.selectedCity : selectedCity,
            selectedExp: overrideState?.selectedExp !== undefined ? overrideState.selectedExp : selectedExp,
            selectedCategory: overrideState?.selectedCategory !== undefined ? overrideState.selectedCategory : selectedCategory,
            selectedType: overrideState?.selectedType !== undefined ? overrideState.selectedType : selectedType
        }));
    };

    // Reset Filter Button Handler
    const handleResetFilter = () => {
        setSearchQuery("");
        setSelectedCountry("All Countries");
        setSelectedCity("All Cities");
        setSelectedExp("All Experience");
        setSelectedCategory("All Categories");
        setSelectedType("All Types");

        setAppliedFilters({
            searchQuery: "",
            selectedCountry: "All Countries",
            selectedCity: "All Cities",
            selectedExp: "All Experience",
            selectedCategory: "All Categories",
            selectedType: "All Types"
        });
    };

    return (
        <div style={{ paddingBottom: "0" }}>

            {/* ── Page Hero (section-dark) ── */}
            <section
                className="section-dark page-hero"
                aria-labelledby="careers-heading"
                style={{
                    background: "linear-gradient(180deg, #06080C 0%, var(--midnight) 100%)",
                    padding: "140px 0 96px",
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                {/* Background ambient glow */}
                <div style={{
                    position: "absolute",
                    top: "-20%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "800px",
                    height: "400px",
                    background: "radial-gradient(ellipse, rgba(77, 216, 232, 0.08) 0%, rgba(232, 82, 26, 0.04) 40%, transparent 70%)",
                    pointerEvents: "none"
                }} />

                <div className="container" style={{ position: "relative", zIndex: 1 }}>
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >

                        <motion.div variants={fadeUpVariants(shouldReduce)}>
                            <span
                                className="badge"
                                style={{
                                    marginBottom: "20px",
                                    display: "inline-block",
                                    color: "#4DD8E8",
                                    background: "rgba(77, 216, 232, 0.08)",
                                    border: "1px solid rgba(77, 216, 232, 0.2)",
                                    padding: "6px 14px",
                                    borderRadius: "20px",
                                    fontSize: "0.78rem",
                                    fontFamily: "var(--font-mono)",
                                    letterSpacing: "0.06em",
                                    textTransform: "uppercase"
                                }}
                            >
                                Join Our Engineering Team
                            </span>
                        </motion.div>

                        <motion.h1
                            id="careers-heading"
                            variants={fadeUpVariants(shouldReduce)}
                            style={{
                                fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
                                fontWeight: 800,
                                fontFamily: "var(--font-display)",
                                color: "#FFFFFF",
                                letterSpacing: "-0.02em",
                                marginBottom: "20px",
                                lineHeight: 1.15
                            }}
                        >
                            Shape the Future of <br />
                            <span style={{
                                background: "linear-gradient(90deg, #FFFFFF 30%, #4DD8E8 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}>
                                Software-Defined Vehicles
                            </span>
                        </motion.h1>

                        <motion.p
                            className="lead"
                            variants={fadeUpVariants(shouldReduce)}
                            style={{
                                color: "#94A3B8",
                                maxWidth: "620px",
                                fontSize: "1.1rem",
                                lineHeight: 1.7,
                                fontFamily: "var(--font-body)",
                                margin: 0
                            }}
                        >
                            Join specialized engineering CoEs across SDV, Android Automotive, V2X, AI/ML, and Autonomous Systems. Build high-impact technology with global automotive leaders.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── Experience Band / Stats Strip (section-dark) ── */}
            <section className="section-dark" style={{
                background: "#0D1117",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                padding: "44px 0"
            }}>
                <div className="container">
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "32px",
                            textAlign: "center"
                        }}
                    >
                        {careerStats.map((s, i) => (
                            <motion.div key={i} variants={fadeUpVariants(shouldReduce)}>
                                <div style={{
                                    fontSize: "2.6rem",
                                    fontWeight: 800,
                                    fontFamily: "var(--font-display)",
                                    color: "#FFFFFF",
                                    lineHeight: 1.1,
                                    marginBottom: "6px"
                                }}>{s.value}</div>
                                <div style={{
                                    fontSize: "0.82rem",
                                    color: "#94A3B8",
                                    fontFamily: "var(--font-mono)",
                                    letterSpacing: "0.05em",
                                    textTransform: "uppercase"
                                }}>{s.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Culture & Values Section (section-light) ── */}
            <section className="section-light section" style={{ background: "#F8FAFC", borderTop: "1px solid #E2E8F0", padding: "88px 0" }}>
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "64px" }}>
                        <span className="badge" style={{
                            marginBottom: "16px",
                            display: "inline-block",
                            color: "#E8521A",
                            background: "rgba(232, 82, 26, 0.08)",
                            border: "1px solid rgba(232, 82, 26, 0.2)",
                            padding: "5px 14px",
                            borderRadius: "20px",
                            fontSize: "0.78rem",
                            fontFamily: "var(--font-mono)",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase"
                        }}>
                            Our Culture & Ethos
                        </span>
                        <h2 style={{
                            fontSize: "clamp(2rem, 3vw, 2.5rem)",
                            fontWeight: 800,
                            fontFamily: "var(--font-display)",
                            color: "#0B1320",
                            marginBottom: "16px",
                            letterSpacing: "-0.01em"
                        }}>
                            Life at SAMSAN
                        </h2>
                        <p style={{
                            color: "#64748B",
                            maxWidth: "620px",
                            margin: "0 auto",
                            lineHeight: "1.7",
                            fontSize: "1.05rem",
                            fontFamily: "var(--font-body)"
                        }}>
                            We build an environment where engineering excellence, domain innovation, and career progression thrive together.
                        </p>
                    </div>

                    <style>{`
                        .culture-card-enhanced {
                            background: #FFFFFF;
                            border: 1px solid #E2E8F0;
                            border-radius: 16px;
                            padding: 32px;
                            box-shadow: 0 4px 16px rgba(11, 19, 32, 0.04);
                            transition: all 0.25s ease;
                        }
                        .culture-card-enhanced:hover {
                            border-color: rgba(232, 82, 26, 0.35);
                            box-shadow: 0 12px 32px rgba(11, 19, 32, 0.08);
                            transform: translateY(-3px);
                        }
                        .value-node-item {
                            background: #FFFFFF;
                            border: 1px solid #E2E8F0;
                            border-radius: 12px;
                            padding: 16px 20px;
                            display: flex;
                            align-items: center;
                            gap: 16px;
                            box-shadow: 0 2px 8px rgba(11, 19, 32, 0.03);
                            transition: transform 0.2s ease, border-color 0.2s ease;
                        }
                        .value-node-item:hover {
                            transform: translateX(4px);
                            border-color: rgba(232, 82, 26, 0.3);
                        }
                    `}</style>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "32px",
                        alignItems: "stretch"
                    }}>
                        {/* Left Column Culture Cards */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                            {/* Card 1 */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="culture-card-enhanced"
                            >
                                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700, color: "#E8521A" }}>// 01</span>
                                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0B1320", margin: 0, fontFamily: "var(--font-display)" }}>
                                        Empowering Work Environment
                                    </h3>
                                </div>
                                <p style={{ fontSize: "0.92rem", color: "#64748B", lineHeight: "1.7", margin: 0, fontFamily: "var(--font-body)" }}>
                                    At SAMSAN, we foster a flexible work culture that empowers engineering teams to own complex automotive projects. Work directly on cutting-edge embedded software for tier-1 suppliers and global OEMs.
                                </p>
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="culture-card-enhanced"
                            >
                                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700, color: "#E8521A" }}>// 02</span>
                                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0B1320", margin: 0, fontFamily: "var(--font-display)" }}>
                                        Integral Part of Our Growth
                                    </h3>
                                </div>
                                <p style={{ fontSize: "0.92rem", color: "#64748B", lineHeight: "1.7", margin: 0, fontFamily: "var(--font-body)" }}>
                                    As SAMSAN scales its domain CoEs across SDV, Android Automotive, and V2X, you will drive key technological milestones and directly influence industry-defining software architecture.
                                </p>
                            </motion.div>
                        </div>

                        {/* Center Column: Core Values Graph */}
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "20px",
                                background: "#FFFFFF",
                                border: "1px solid #E2E8F0",
                                padding: "36px 28px",
                                borderRadius: "20px",
                                boxShadow: "0 4px 20px rgba(11, 19, 32, 0.05)",
                                width: "100%"
                            }}>
                                {/* Central Core Values Node */}
                                <div style={{
                                    background: "rgba(232, 82, 26, 0.07)",
                                    border: "1px solid rgba(232, 82, 26, 0.22)",
                                    padding: "14px 28px",
                                    borderRadius: "100px",
                                    textAlign: "center"
                                }}>
                                    <span style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#E8521A", fontFamily: "var(--font-mono)", fontWeight: 700 }}>Our Engineering</span>
                                    <h4 style={{ margin: "2px 0 0 0", color: "#0B1320", fontSize: "1.25rem", fontWeight: 800, fontFamily: "var(--font-display)" }}>VALUES</h4>
                                </div>

                                {/* Nodes Layout */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
                                    {/* Collaboration Node */}
                                    <div className="value-node-item">
                                        <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#E8521A", fontFamily: "var(--font-mono)" }}>01</div>
                                        <div>
                                            <h5 style={{ margin: 0, color: "#0B1320", fontSize: "0.95rem", fontWeight: 700, fontFamily: "var(--font-display)" }}>COLLABORATION</h5>
                                            <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748B" }}>One team, clear ownership, zero surprises.</p>
                                        </div>
                                    </div>

                                    {/* Aspiration Node */}
                                    <div className="value-node-item">
                                        <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#E8521A", fontFamily: "var(--font-mono)" }}>02</div>
                                        <div>
                                            <h5 style={{ margin: 0, color: "#0B1320", fontSize: "0.95rem", fontWeight: 700, fontFamily: "var(--font-display)" }}>ASPIRATION</h5>
                                            <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748B" }}>Think big. Deliver excellence. Continuous innovation.</p>
                                        </div>
                                    </div>

                                    {/* Respect Node */}
                                    <div className="value-node-item">
                                        <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#E8521A", fontFamily: "var(--font-mono)" }}>03</div>
                                        <div>
                                            <h5 style={{ margin: 0, color: "#0B1320", fontSize: "0.95rem", fontWeight: 700, fontFamily: "var(--font-display)" }}>RESPECT</h5>
                                            <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748B" }}>Respect is earned. Transparency is paramount.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column Culture Cards */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                            {/* Card 3 */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3 }}
                                className="culture-card-enhanced"
                            >
                                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700, color: "#E8521A" }}>// 03</span>
                                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0B1320", margin: 0, fontFamily: "var(--font-display)" }}>
                                        Continuous Technical Learning
                                    </h3>
                                </div>
                                <p style={{ fontSize: "0.92rem", color: "#64748B", lineHeight: "1.7", margin: 0, fontFamily: "var(--font-body)" }}>
                                    We cultivate a culture of ongoing skill enrichment through domain workshops, platform certifications, hands-on lab access, and high-tech engineering mentorship.
                                </p>
                            </motion.div>

                            {/* Card 4 */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="culture-card-enhanced"
                            >
                                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700, color: "#E8521A" }}>// 04</span>
                                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0B1320", margin: 0, fontFamily: "var(--font-display)" }}>
                                        High Performance Recognition
                                    </h3>
                                </div>
                                <p style={{ fontSize: "0.92rem", color: "#64748B", lineHeight: "1.7", margin: 0, fontFamily: "var(--font-body)" }}>
                                    At SAMSAN, exceptional engineering output is recognized and rewarded. As you contribute your domain expertise, you accelerate your leadership trajectory.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Job Openings Filter Area (section-dark) ── */}
            <section
                id="job-openings"
                className="section-dark section"
                style={{
                    background: "var(--midnight)",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    padding: "88px 0"
                }}
            >
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <span className="badge" style={{
                            marginBottom: "16px",
                            display: "inline-block",
                            color: "#4DD8E8",
                            background: "rgba(77, 216, 232, 0.08)",
                            border: "1px solid rgba(77, 216, 232, 0.2)",
                            padding: "5px 14px",
                            borderRadius: "20px",
                            fontSize: "0.78rem",
                            fontFamily: "var(--font-mono)",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase"
                        }}>
                            Current Opportunities
                        </span>
                        <h2 style={{
                            fontSize: "clamp(2rem, 3vw, 2.5rem)",
                            fontWeight: 800,
                            fontFamily: "var(--font-display)",
                            color: "#F1F5F9",
                            marginBottom: "12px",
                            letterSpacing: "-0.01em"
                        }}>
                            Explore Job Openings
                        </h2>
                        <p style={{ color: "#94A3B8", maxWidth: "600px", margin: "0 auto", fontSize: "1rem", fontFamily: "var(--font-body)" }}>
                            Filter by domain, experience, location, or search keywords to find your next engineering role.
                        </p>
                    </div>

                    {/* Filter Controls Panel */}
                    <div style={{
                        background: "#111622",
                        padding: "28px",
                        borderRadius: "20px",
                        border: "1px solid rgba(255,255,255,0.09)",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
                        marginBottom: "36px"
                    }}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                            gap: "14px",
                            alignItems: "center"
                        }}>
                            {/* Search Query */}
                            <div style={{ position: "relative" }}>
                                <input
                                    type="text"
                                    placeholder="Search title, skill..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setSearchQuery(val);
                                        handleApplyFilter({ searchQuery: val });
                                    }}
                                    style={{
                                        width: "100%",
                                        padding: "12px 16px",
                                        borderRadius: "10px",
                                        backgroundColor: "#080B10",
                                        border: "1px solid rgba(255,255,255,0.14)",
                                        color: "#F1F5F9",
                                        outline: "none",
                                        fontSize: "0.88rem",
                                        fontFamily: "var(--font-body)"
                                    }}
                                />
                            </div>

                            {/* Country Filter */}
                            <select
                                value={selectedCountry}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSelectedCountry(val);
                                    handleApplyFilter({ selectedCountry: val });
                                }}
                                style={{
                                    padding: "12px 16px",
                                    borderRadius: "10px",
                                    backgroundColor: "#080B10",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    color: "#F1F5F9",
                                    outline: "none",
                                    fontSize: "0.88rem",
                                    fontFamily: "var(--font-body)",
                                    cursor: "pointer"
                                }}
                            >
                                {countries.map(c => <option key={c} value={c} style={{ background: "#080B10", color: "#F1F5F9" }}>{c}</option>)}
                            </select>

                            {/* City Filter */}
                            <select
                                value={selectedCity}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSelectedCity(val);
                                    handleApplyFilter({ selectedCity: val });
                                }}
                                style={{
                                    padding: "12px 16px",
                                    borderRadius: "10px",
                                    backgroundColor: "#080B10",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    color: "#F1F5F9",
                                    outline: "none",
                                    fontSize: "0.88rem",
                                    fontFamily: "var(--font-body)",
                                    cursor: "pointer"
                                }}
                            >
                                {cities.map(c => <option key={c} value={c} style={{ background: "#080B10", color: "#F1F5F9" }}>{c}</option>)}
                            </select>

                            {/* Experience Filter */}
                            <select
                                value={selectedExp}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSelectedExp(val);
                                    handleApplyFilter({ selectedExp: val });
                                }}
                                style={{
                                    padding: "12px 16px",
                                    borderRadius: "10px",
                                    backgroundColor: "#080B10",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    color: "#F1F5F9",
                                    outline: "none",
                                    fontSize: "0.88rem",
                                    fontFamily: "var(--font-body)",
                                    cursor: "pointer"
                                }}
                            >
                                {experiences.map(e => <option key={e} value={e} style={{ background: "#080B10", color: "#F1F5F9" }}>{e}</option>)}
                            </select>

                            {/* Category Filter */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSelectedCategory(val);
                                    handleApplyFilter({ selectedCategory: val });
                                }}
                                style={{
                                    padding: "12px 16px",
                                    borderRadius: "10px",
                                    backgroundColor: "#080B10",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    color: "#F1F5F9",
                                    outline: "none",
                                    fontSize: "0.88rem",
                                    fontFamily: "var(--font-body)",
                                    cursor: "pointer"
                                }}
                            >
                                {categories.map(c => <option key={c} value={c} style={{ background: "#080B10", color: "#F1F5F9" }}>{c}</option>)}
                            </select>

                            {/* Type Filter */}
                            <select
                                value={selectedType}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSelectedType(val);
                                    handleApplyFilter({ selectedType: val });
                                }}
                                style={{
                                    padding: "12px 16px",
                                    borderRadius: "10px",
                                    backgroundColor: "#080B10",
                                    border: "1px solid rgba(255,255,255,0.14)",
                                    color: "#F1F5F9",
                                    outline: "none",
                                    fontSize: "0.88rem",
                                    fontFamily: "var(--font-body)",
                                    cursor: "pointer"
                                }}
                            >
                                {types.map(t => <option key={t} value={t} style={{ background: "#080B10", color: "#F1F5F9" }}>{t}</option>)}
                            </select>
                        </div>

                        {/* Action Buttons Row: Apply Filter & Reset Filter */}
                        <div style={{
                            marginTop: "20px",
                            paddingTop: "18px",
                            borderTop: "1px solid rgba(255,255,255,0.07)",
                            display: "flex",
                            gap: "12px",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            flexWrap: "wrap"
                        }}>
                            <button
                                type="button"
                                onClick={() => handleApplyFilter()}
                                style={{
                                    padding: "11px 24px",
                                    borderRadius: "8px",
                                    backgroundColor: "#E8521A",
                                    color: "#FFFFFF",
                                    border: "none",
                                    fontWeight: 600,
                                    fontSize: "0.88rem",
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    boxShadow: "0 4px 16px rgba(232, 82, 26, 0.35)",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                🔍 Apply Filter
                            </button>

                            <button
                                type="button"
                                onClick={handleResetFilter}
                                style={{
                                    padding: "11px 24px",
                                    borderRadius: "8px",
                                    backgroundColor: "transparent",
                                    color: "#94A3B8",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    fontWeight: 600,
                                    fontSize: "0.88rem",
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                🔄 Reset Filter
                            </button>
                        </div>
                    </div>

                    {/* Results Counter Header */}
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "24px",
                        padding: "0 4px"
                    }}>
                        <div style={{ fontSize: "0.9rem", color: "#94A3B8", fontFamily: "var(--font-mono)" }}>
                            Showing <strong style={{ color: "#4DD8E8" }}>{filteredJobs.length}</strong> {filteredJobs.length === 1 ? "Role" : "Roles"} <span style={{ opacity: 0.6, fontSize: "0.8rem" }}>(Sorted A-Z)</span>
                        </div>
                    </div>

                    <style>{`
                        .job-card-enhanced {
                            background: #111622;
                            border: 1px solid rgba(255, 255, 255, 0.08);
                            border-radius: 18px;
                            padding: 28px;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            position: relative;
                            overflow: hidden;
                            transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
                        }
                        .job-card-enhanced::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            height: 3px;
                            background: linear-gradient(90deg, #E8521A, #4DD8E8);
                            opacity: 0;
                            transition: opacity 0.25s ease;
                        }
                        .job-card-enhanced:hover {
                            border-color: rgba(232, 82, 26, 0.4);
                            box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
                            transform: translateY(-4px);
                        }
                        .job-card-enhanced:hover::before {
                            opacity: 1;
                        }
                        .job-title-text {
                            transition: color 0.2s ease;
                        }
                        .job-card-enhanced:hover .job-title-text {
                            color: #FF8A3D !important;
                        }
                    `}</style>

                    {/* Jobs Display Grid */}
                    <motion.div
                        layout
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                            gap: "24px",
                            minHeight: filteredJobs.length > 0 ? "320px" : "auto",
                            alignItems: "stretch"
                        }}
                    >
                        <AnimatePresence>
                            {filteredJobs.map((job) => (
                                <motion.div
                                    key={job.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{
                                        opacity: { duration: 0.2 },
                                        scale: { duration: 0.2 },
                                        layout: { duration: 0.25, ease: "easeOut" }
                                    }}
                                    className="job-card-enhanced"
                                >
                                    <div>
                                        {/* Category & Experience Badges */}
                                        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
                                            <span style={{
                                                fontSize: "10px",
                                                fontFamily: "var(--font-mono)",
                                                letterSpacing: "0.06em",
                                                textTransform: "uppercase",
                                                padding: "4px 10px",
                                                borderRadius: "20px",
                                                backgroundColor: "rgba(255, 138, 61, 0.1)",
                                                border: "1px solid rgba(255, 138, 61, 0.25)",
                                                color: "#FF8A3D",
                                                fontWeight: 600
                                            }}>
                                                {job.category}
                                            </span>
                                            <span style={{
                                                fontSize: "10px",
                                                fontFamily: "var(--font-mono)",
                                                letterSpacing: "0.06em",
                                                padding: "4px 10px",
                                                borderRadius: "20px",
                                                backgroundColor: "rgba(77, 216, 232, 0.1)",
                                                border: "1px solid rgba(77, 216, 232, 0.25)",
                                                color: "#4DD8E8",
                                                fontWeight: 600
                                            }}>
                                                ⏱️ {job.experience}
                                            </span>
                                        </div>

                                        {/* Job Title */}
                                        <h3 className="job-title-text" style={{ fontSize: "1.25rem", color: "#F1F5F9", fontWeight: 700, marginBottom: "12px", lineHeight: "1.3", fontFamily: "var(--font-display)" }}>
                                            {job.title}
                                        </h3>

                                        {/* Meta Information */}
                                        <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.82rem", color: "#94A3B8", marginBottom: "16px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                                <span style={{ color: "#4DD8E8" }}>📍</span> <strong>Location:</strong> {job.city}, {job.country}
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                                <span style={{ color: "#E8521A" }}>💼</span> <strong>Type:</strong> {job.type}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p style={{ fontSize: "0.88rem", color: "#94A3B8", lineHeight: "1.65", margin: "0 0 20px 0", fontFamily: "var(--font-body)" }}>
                                            {job.description}
                                        </p>

                                        {/* Skill Tags */}
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
                                            {job.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    style={{
                                                        fontSize: "0.75rem",
                                                        padding: "4px 9px",
                                                        borderRadius: "6px",
                                                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                                        color: "#94A3B8",
                                                        fontFamily: "var(--font-mono)"
                                                    }}
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Apply CTA Button */}
                                    <Link
                                        href={`/contact?product=careers&role=${job.slug}`}
                                        className="btn btn-primary"
                                        style={{
                                            padding: "11px 18px",
                                            fontSize: "0.85rem",
                                            width: "100%",
                                            justifyContent: "center",
                                            backgroundColor: "#E8521A",
                                            color: "#FFFFFF",
                                            fontWeight: 600,
                                            borderRadius: "8px",
                                            textDecoration: "none",
                                            boxShadow: "0 4px 14px rgba(232, 82, 26, 0.25)",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            transition: "all 0.2s ease"
                                        }}
                                    >
                                        Apply Now →
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredJobs.length === 0 && (
                        <div style={{
                            textAlign: "center",
                            padding: "60px 20px",
                            background: "#111622",
                            borderRadius: "18px",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "#94A3B8",
                            fontSize: "0.95rem"
                        }}>
                            <div style={{ fontSize: "2rem", marginBottom: "12px" }}>🔍</div>
                            No open roles matched your selected filters. Try clearing some criteria or click <strong>Reset Filter</strong>.
                            <div style={{ marginTop: "16px" }}>
                                <button
                                    onClick={handleResetFilter}
                                    style={{
                                        padding: "10px 20px",
                                        borderRadius: "8px",
                                        backgroundColor: "#E8521A",
                                        color: "#FFFFFF",
                                        border: "none",
                                        cursor: "pointer",
                                        fontSize: "0.85rem",
                                        fontWeight: 600
                                    }}
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ── Standardized Light Bottom CTA ── */}
            <section
                className="section-light"
                style={{ background: "#F8FAFC", borderTop: "1px solid #E2E8F0", padding: "80px 0" }}
                aria-labelledby="careers-cta-heading"
            >
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: shouldReduce ? 0.01 : 0.5 }}
                        style={{
                            background: "#FFFFFF",
                            border: "1px solid #E2E8F0",
                            borderRadius: "20px",
                            padding: "64px 48px",
                            textAlign: "center",
                            boxShadow: "0 4px 24px rgba(11, 19, 32, 0.05)",
                            position: "relative",
                            overflow: "hidden"
                        }}
                    >
                        {/* Subtle top accent line */}
                        <div style={{
                            position: "absolute",
                            top: 0, left: "50%",
                            transform: "translateX(-50%)",
                            width: "120px", height: "3px",
                            background: "linear-gradient(90deg, #E8521A, #F59E0B)",
                            borderRadius: "0 0 4px 4px"
                        }} />

                        <span style={{
                            display: "inline-block",
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#E8521A",
                            background: "rgba(232, 82, 26, 0.07)",
                            border: "1px solid rgba(232, 82, 26, 0.22)",
                            borderRadius: "20px",
                            padding: "5px 14px",
                            marginBottom: "24px"
                        }}>
                            Talent Network
                        </span>

                        <h2
                            id="careers-cta-heading"
                            style={{
                                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                                fontWeight: 700,
                                color: "#0B1320",
                                fontFamily: "var(--font-display)",
                                letterSpacing: "-0.02em",
                                margin: "0 0 16px 0",
                                lineHeight: 1.2
                            }}
                        >
                            Don&apos;t see a matching role?
                        </h2>

                        <p style={{
                            fontSize: "1.05rem",
                            lineHeight: 1.7,
                            color: "#475569",
                            fontFamily: "var(--font-body)",
                            maxWidth: "540px",
                            margin: "0 auto 36px"
                        }}>
                            Send your resume directly to our talent acquisition team for upcoming embedded engineering openings.
                        </p>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                            <a
                                href="mailto:india@samsanlabs.com"
                                className="btn btn-primary"
                                style={{
                                    background: "#E8521A",
                                    color: "#FFFFFF",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    textDecoration: "none",
                                    boxShadow: "0 4px 14px rgba(232, 82, 26, 0.28)",
                                    padding: "13px 28px",
                                    fontWeight: 600
                                }}
                            >
                                Submit General Resume
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <Link
                                href="/services"
                                className="btn btn-outline"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    textDecoration: "none",
                                    color: "#0B1320",
                                    borderColor: "#CBD5E1",
                                    padding: "13px 28px",
                                    fontWeight: 600
                                }}
                            >
                                View Engineering Offerings
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
}
