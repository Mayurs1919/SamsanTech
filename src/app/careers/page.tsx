"use client";

import { useState, useEffect } from "react";
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

    // Draft / Pending Filter State (for selection before clicking Apply)
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("All Countries");
    const [selectedCity, setSelectedCity] = useState("All Cities");
    const [selectedExp, setSelectedExp] = useState("All Experience");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedType, setSelectedType] = useState("All Types");

    // Applied Filter State (triggers job list update)
    const [appliedFilters, setAppliedFilters] = useState({
        searchQuery: "",
        selectedCountry: "All Countries",
        selectedCity: "All Cities",
        selectedExp: "All Experience",
        selectedCategory: "All Categories",
        selectedType: "All Types"
    });

    const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs);

    // Filter Triggering Effect
    useEffect(() => {
        let isMounted = true;

        const filterCriteria = {
            searchQuery: appliedFilters.searchQuery,
            selectedCountry: appliedFilters.selectedCountry,
            selectedCity: appliedFilters.selectedCity,
            selectedExp: appliedFilters.selectedExp,
            selectedCategory: appliedFilters.selectedCategory,
            selectedType: appliedFilters.selectedType,
            jobs: initialJobs
        };

        runWorkerTask((data) => {
            const query = data.searchQuery.toLowerCase().trim();
            const countryFilter = data.selectedCountry;
            const cityFilter = data.selectedCity;
            const expFilter = data.selectedExp;
            const catFilter = data.selectedCategory;
            const typeFilter = data.selectedType;

            const results = data.jobs.filter((job) => {
                const matchesSearch = !query ||
                    job.title.toLowerCase().includes(query) ||
                    job.description.toLowerCase().includes(query) ||
                    job.skills.some((s: string) => s.toLowerCase().includes(query));

                const matchesCountry = countryFilter === "All Countries" || job.country.includes(countryFilter);
                const matchesCity = cityFilter === "All Cities" || job.city.includes(cityFilter);
                const matchesExp = expFilter === "All Experience" || job.experience === expFilter;
                const matchesCategory = catFilter === "All Categories" || job.category === catFilter;
                const matchesType = typeFilter === "All Types" || job.type === typeFilter;

                return matchesSearch && matchesCountry && matchesCity && matchesExp && matchesCategory && matchesType;
            });

            // Always return sorted alphabetically by job title
            return results.sort((a: Job, b: Job) => a.title.localeCompare(b.title));
        }, filterCriteria).then((result) => {
            if (isMounted) {
                setFilteredJobs(result);
            }
        }).catch(() => {
            if (isMounted) {
                const query = appliedFilters.searchQuery.toLowerCase().trim();
                const results = initialJobs.filter((job) => {
                    const matchesSearch = !query ||
                        job.title.toLowerCase().includes(query) ||
                        job.description.toLowerCase().includes(query) ||
                        job.skills.some(s => s.toLowerCase().includes(query));

                    const matchesCountry = appliedFilters.selectedCountry === "All Countries" || job.country.includes(appliedFilters.selectedCountry);
                    const matchesCity = appliedFilters.selectedCity === "All Cities" || job.city.includes(appliedFilters.selectedCity);
                    const matchesExp = appliedFilters.selectedExp === "All Experience" || job.experience === appliedFilters.selectedExp;
                    const matchesCategory = appliedFilters.selectedCategory === "All Categories" || job.category === appliedFilters.selectedCategory;
                    const matchesType = appliedFilters.selectedType === "All Types" || job.type === appliedFilters.selectedType;

                    return matchesSearch && matchesCountry && matchesCity && matchesExp && matchesCategory && matchesType;
                });
                setFilteredJobs(results.sort((a, b) => a.title.localeCompare(b.title)));
            }
        });

        return () => {
            isMounted = false;
        };
    }, [appliedFilters]);

    // Handle Apply Filter Button
    const handleApplyFilter = () => {
        setAppliedFilters({
            searchQuery,
            selectedCountry,
            selectedCity,
            selectedExp,
            selectedCategory,
            selectedType
        });
    };

    // Handle Reset Filter Button
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

            {/* ── Page Hero (section-light) ── */}
            <section className="section-dark page-hero" aria-labelledby="careers-heading" style={{ background: "#0A0D11", padding: "80px 0 60px" }}>
                <div className="container">
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div style={{ display: "flex", gap: "8px", fontSize: "0.85rem", color: "#94A3B8", marginBottom: "16px" }}>
                            <Link href="/" style={{ color: "#94A3B8", textDecoration: "none" }}>Home</Link>
                            <span style={{ fontWeight: 700, opacity: 0.6, color: "#94A3B8" }}>//</span>
                            <span style={{ color: "#FFFFFF", fontWeight: 600 }}>Careers</span>
                        </div>
                        <motion.div variants={fadeUpVariants(shouldReduce)}>
                            <span className="badge" style={{ marginBottom: "24px", color: "#4DD8E8", background: "rgba(77, 216, 232, 0.08)", border: "1px solid rgba(77, 216, 232, 0.2)" }}>
                                Join Our Engineering Team
                            </span>
                        </motion.div>
                        <motion.h1
                            id="careers-heading"
                            variants={fadeUpVariants(shouldReduce)}
                            style={{
                                marginBottom: "20px",
                                color: "#FFFFFF"
                            }}
                        >
                            SAMSAN Careers
                        </motion.h1>
                        <motion.p
                            className="lead"
                            variants={fadeUpVariants(shouldReduce)}
                            style={{
                                color: "#94A3B8",
                                maxWidth: "580px"
                            }}
                        >
                            Explore engineering opportunities, join our domain-led teams, and help build the future of software-defined vehicle mobility.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── Culture & Values Section (section-light) ── */}
            <section className="section-light section" style={{ background: "#F8FAFC", borderTop: "1px solid #E2E8F0", padding: "80px 0" }}>
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <span className="badge" style={{ marginBottom: "16px", color: "#E8521A", background: "rgba(232, 82, 26, 0.08)", border: "1px solid rgba(232, 82, 26, 0.2)" }}>
                            Our Culture
                        </span>
                        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#0B1320", marginBottom: "16px" }}>
                            Life at SAMSAN
                        </h2>
                        <p style={{ color: "#64748B", maxWidth: "600px", margin: "0 auto", lineHeight: "1.7" }}>
                            We build an environment where engineering excellence, innovation, and career progression thrive.
                        </p>
                    </div>

                    <style>{`
                        .culture-card {
                            background: #FFFFFF;
                            border: 1px solid #E2E8F0;
                            border-radius: 12px;
                            padding: 32px;
                            box-shadow: 0 2px 12px rgba(11,19,32,0.06);
                            transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
                        }
                        .culture-card:hover {
                            border-color: rgba(232,82,26,0.3);
                            box-shadow: 0 8px 24px rgba(11,19,32,0.1);
                            transform: translateY(-2px);
                        }
                        .value-node {
                            background: #FFFFFF;
                            border: 1px solid #E2E8F0;
                            border-radius: 12px;
                            padding: 16px 20px;
                            display: flex;
                            align-items: center;
                            gap: 16px;
                            box-shadow: 0 2px 8px rgba(11,19,32,0.04);
                        }
                    `}</style>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "32px",
                        alignItems: "center"
                    }}>
                        {/* Left Column Culture Cards */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                            {/* Card 1 */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="culture-card"
                            >
                                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700, color: "#E8521A" }}>// 01</span>
                                    <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#0B1320", margin: 0 }}>
                                        Empowering Work Environment
                                    </h3>
                                </div>
                                <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: "1.7", margin: 0 }}>
                                    At SAMSAN, we believe in fostering a flexible work environment that empowers our engineering teams. Work on cutting-edge automotive embedded systems for global OEM customers.
                                </p>
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="culture-card"
                            >
                                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700, color: "#E8521A" }}>// 02</span>
                                    <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#0B1320", margin: 0 }}>
                                        Integral Part of Our Growth
                                    </h3>
                                </div>
                                <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: "1.7", margin: 0 }}>
                                    As SAMSAN scales its domain CoEs across SDV, Android Automotive, and V2X, you will drive key technological milestones and shape industry solutions.
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
                                background: "#FFFFFF",
                                border: "1px solid #E2E8F0",
                                padding: "32px",
                                borderRadius: "24px",
                                boxShadow: "0 2px 12px rgba(11,19,32,0.06)",
                                width: "100%"
                            }}>
                                {/* Central Core Values Node */}
                                <div style={{
                                    background: "rgba(232, 82, 26, 0.08)",
                                    border: "1px solid rgba(232, 82, 26, 0.2)",
                                    padding: "16px 28px",
                                    borderRadius: "100px",
                                    textAlign: "center"
                                }}>
                                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#E8521A" }}>Our Core</span>
                                    <h4 style={{ margin: "2px 0 0 0", color: "#0B1320", fontSize: "1.2rem", fontWeight: 700 }}>VALUES</h4>
                                </div>

                                {/* Nodes Layout */}
                                <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
                                    {/* Collaboration Node */}
                                    <div className="value-node">
                                        <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#E8521A", fontFamily: "var(--font-mono)" }}>01</div>
                                        <div>
                                            <h5 style={{ margin: 0, color: "#0B1320", fontSize: "0.95rem", fontWeight: 600 }}>COLLABORATION</h5>
                                            <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748B" }}>One team, one goal, zero surprises!</p>
                                        </div>
                                    </div>

                                    {/* Aspiration Node */}
                                    <div className="value-node">
                                        <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#E8521A", fontFamily: "var(--font-mono)" }}>02</div>
                                        <div>
                                            <h5 style={{ margin: 0, color: "#0B1320", fontSize: "0.95rem", fontWeight: 600 }}>ASPIRATION</h5>
                                            <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748B" }}>Think Big. Deliver Big. Act Big.</p>
                                        </div>
                                    </div>

                                    {/* Respect Node */}
                                    <div className="value-node">
                                        <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#E8521A", fontFamily: "var(--font-mono)" }}>03</div>
                                        <div>
                                            <h5 style={{ margin: 0, color: "#0B1320", fontSize: "0.95rem", fontWeight: 600 }}>RESPECT</h5>
                                            <p style={{ margin: 0, fontSize: "0.78rem", color: "#64748B" }}>Respect is earned. Honesty is expected.</p>
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
                                className="culture-card"
                            >
                                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700, color: "#E8521A" }}>// 03</span>
                                    <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#0B1320", margin: 0 }}>
                                        Continuous Technical Learning
                                    </h3>
                                </div>
                                <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: "1.7", margin: 0 }}>
                                    We cultivate a culture of ongoing skill enrichment through domain workshops, platform certifications, and high-tech engineering mentorship.
                                </p>
                            </motion.div>

                            {/* Card 4 */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="culture-card"
                            >
                                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700, color: "#E8521A" }}>// 04</span>
                                    <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#0B1320", margin: 0 }}>
                                        High Performance Recognition
                                    </h3>
                                </div>
                                <p style={{ fontSize: "0.88rem", color: "#64748B", lineHeight: "1.7", margin: 0 }}>
                                    At SAMSAN, high performance is recognized and rewarded. As you contribute your engineering expertise, you&apos;ll accelerate your career trajectory.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Experience Band / Stats Strip (section-dark) ── */}
            <section className="section-dark" style={{
                background: "#0A0D11",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                padding: "48px 0"
            }}>
                <div className="container">
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", textAlign: "center" }}
                    >
                        {careerStats.map((s, i) => (
                            <motion.div key={i} variants={fadeUpVariants(shouldReduce)}>
                                <div style={{
                                    fontSize: "2.8rem", fontWeight: 800,
                                    color: "#FFFFFF",
                                    lineHeight: 1.1, marginBottom: "8px"
                                }}>{s.value}</div>
                                <div style={{ fontSize: "0.85rem", color: "#94A3B8", letterSpacing: "0.04em" }}>{s.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Job Openings Filter Area (section-dark) ── */}
            <section id="job-openings" className="section-dark section" style={{ background: "#0A0D11", padding: "80px 0" }}>
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span className="badge" style={{ marginBottom: "16px", color: "#4DD8E8", background: "rgba(77, 216, 232, 0.08)", border: "1px solid rgba(77, 216, 232, 0.2)" }}>
                            Current Opportunities
                        </span>
                        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#F1F5F9", marginBottom: "12px" }}>
                            Explore Job Openings
                        </h2>
                        <p style={{ color: "#94A3B8", maxWidth: "600px", margin: "0 auto", fontSize: "0.95rem" }}>
                            Filter by domain, experience, location, or search keywords to find your next engineering role.
                        </p>
                    </div>

                    {/* Filter Controls Panel */}
                    <div style={{
                        background: "#161B22",
                        padding: "24px",
                        borderRadius: "16px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                        marginBottom: "32px"
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
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "11px 14px",
                                        borderRadius: "8px",
                                        backgroundColor: "#0D1117",
                                        border: "1px solid rgba(255,255,255,0.12)",
                                        color: "#F1F5F9",
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
                                    padding: "11px 14px",
                                    borderRadius: "8px",
                                    backgroundColor: "#0D1117",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    color: "#F1F5F9",
                                    outline: "none",
                                    fontSize: "0.85rem"
                                }}
                            >
                                {countries.map(c => <option key={c} value={c} style={{ background: "#0D1117", color: "#F1F5F9" }}>{c}</option>)}
                            </select>

                            {/* City Filter */}
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                style={{
                                    padding: "11px 14px",
                                    borderRadius: "8px",
                                    backgroundColor: "#0D1117",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    color: "#F1F5F9",
                                    outline: "none",
                                    fontSize: "0.85rem"
                                }}
                            >
                                {cities.map(c => <option key={c} value={c} style={{ background: "#0D1117", color: "#F1F5F9" }}>{c}</option>)}
                            </select>

                            {/* Experience Filter */}
                            <select
                                value={selectedExp}
                                onChange={(e) => setSelectedExp(e.target.value)}
                                style={{
                                    padding: "11px 14px",
                                    borderRadius: "8px",
                                    backgroundColor: "#0D1117",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    color: "#F1F5F9",
                                    outline: "none",
                                    fontSize: "0.85rem"
                                }}
                            >
                                {experiences.map(e => <option key={e} value={e} style={{ background: "#0D1117", color: "#F1F5F9" }}>{e}</option>)}
                            </select>

                            {/* Category Filter */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                style={{
                                    padding: "11px 14px",
                                    borderRadius: "8px",
                                    backgroundColor: "#0D1117",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    color: "#F1F5F9",
                                    outline: "none",
                                    fontSize: "0.85rem"
                                }}
                            >
                                {categories.map(c => <option key={c} value={c} style={{ background: "#0D1117", color: "#F1F5F9" }}>{c}</option>)}
                            </select>

                            {/* Type Filter */}
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                style={{
                                    padding: "11px 14px",
                                    borderRadius: "8px",
                                    backgroundColor: "#0D1117",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    color: "#F1F5F9",
                                    outline: "none",
                                    fontSize: "0.85rem"
                                }}
                            >
                                {types.map(t => <option key={t} value={t} style={{ background: "#0D1117", color: "#F1F5F9" }}>{t}</option>)}
                            </select>
                        </div>

                        {/* Action Buttons Row: Apply Filter & Reset Filter */}
                        <div style={{
                            marginTop: "20px",
                            paddingTop: "16px",
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                            display: "flex",
                            gap: "12px",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            flexWrap: "wrap"
                        }}>
                            <button
                                type="button"
                                onClick={handleApplyFilter}
                                style={{
                                    padding: "10px 22px",
                                    borderRadius: "8px",
                                    backgroundColor: "#E8521A",
                                    color: "#FFFFFF",
                                    border: "none",
                                    fontWeight: 600,
                                    fontSize: "0.85rem",
                                    cursor: "pointer",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    boxShadow: "0 4px 14px rgba(232, 82, 26, 0.3)",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                🔍 Apply Filter
                            </button>

                            <button
                                type="button"
                                onClick={handleResetFilter}
                                style={{
                                    padding: "10px 22px",
                                    borderRadius: "8px",
                                    backgroundColor: "transparent",
                                    color: "#94A3B8",
                                    border: "1px solid rgba(255, 255, 255, 0.18)",
                                    fontWeight: 600,
                                    fontSize: "0.85rem",
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
                        .job-card-item {
                            background: #161B22;
                            border: 1px solid rgba(255, 255, 255, 0.08);
                            border-radius: 16px;
                            padding: 28px;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
                        }
                        .job-card-item:hover {
                            border-color: rgba(32, 26, 24, 0.35);
                            box-shadow: 0 10px 30px rgba(229, 220, 220, 0.79);
                            transform: translateY(-4px);
                        }
                        .job-card-title {
                            transition: color 0.2s ease;
                        }
                        .job-card-item:hover .job-card-title {
                            color: #FF8A3D !important;
                        }
                    `}</style>

                    {/* Jobs Display Grid */}
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
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="job-card-item"
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
                                        <h3 className="job-card-title" style={{ fontSize: "1.25rem", color: "#F1F5F9", fontWeight: 700, marginBottom: "12px", lineHeight: "1.3" }}>
                                            {job.title}
                                        </h3>

                                        {/* Meta Information */}
                                        <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.82rem", color: "#94A3B8", marginBottom: "16px" }}>
                                            <div>📍 <strong>Location:</strong> {job.city}, {job.country}</div>
                                            <div>💼 <strong>Type:</strong> {job.type}</div>
                                        </div>

                                        {/* Description */}
                                        <p style={{ fontSize: "0.88rem", color: "#94A3B8", lineHeight: "1.65", margin: "0 0 20px 0" }}>
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
                                                        color: "#94A3B8"
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
                                            textDecoration: "none"
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
                            background: "#161B22",
                            borderRadius: "16px",
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
                                        padding: "8px 18px",
                                        borderRadius: "6px",
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

            {/* ── CTA Band (section-light) ── */}
            <section className="section-light cta-section" style={{ background: "#F8FAFC", borderTop: "1px solid #E2E8F0", padding: "80px 0" }}>
                <div className="container">
                    <div className="cta-inner">
                        <h2 style={{ color: "#FFFFFF" }}>Don&apos;t see a matching role?</h2>
                        <p style={{ color: "#CBD5E1" }}>Send your resume directly to our talent acquisition team for upcoming embedded engineering openings.</p>
                        <div className="cta-actions">
                            <a href="mailto:india@samsanlabs.com" className="btn btn-primary" style={{ background: "#E8521A", color: "#FFFFFF" }}>Submit General Resume</a>
                            <Link href="/services" className="btn btn-outline" style={{ border: "1px solid rgba(255, 255, 255, 0.2)", color: "#FFFFFF", background: "transparent" }}>View Engineering Offerings</Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
