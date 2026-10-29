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

// Experience level sort order
const EXP_ORDER: Record<string, number> = {
    "0-2 Years": 0,
    "2-5 Years": 1,
    "5-8 Years": 2,
    "8+ Years":  3
};

// Default sort: by experience level ascending, then A-Z within each tier
const initialJobs: Job[] = [...rawJobs].sort((a, b) => {
    const expDiff = EXP_ORDER[a.experience] - EXP_ORDER[b.experience];
    return expDiff !== 0 ? expDiff : a.title.localeCompare(b.title);
});

const careerStats = [
    { value: "15+", label: "Open Positions" },
    { value: "5", label: "Specialized Engineering Domains" },
    { value: "4+", label: "Global Innovation Hubs" },
    { value: "100%", label: "Engineering Excellence" }
];

/* ── Interactive Job Row Component ── */
function JobRow({ job }: { job: Job }) {
    const [expanded, setExpanded] = useState(false);

    // Category badge color map
    const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
        "Embedded Engineering": { bg: "rgba(77, 216, 232, 0.08)", border: "rgba(77, 216, 232, 0.2)", text: "#4DD8E8" },
        "HMI Development":     { bg: "rgba(255, 138, 61, 0.08)", border: "rgba(255, 138, 61, 0.2)", text: "#FF8A3D" },
        "Connectivity":        { bg: "rgba(168, 85, 247, 0.08)", border: "rgba(168, 85, 247, 0.2)", text: "#A855F7" },
        "Validation & Testing":{ bg: "rgba(52, 211, 153, 0.08)", border: "rgba(52, 211, 153, 0.2)", text: "#34D399" },
        "Systems Engineering": { bg: "rgba(251, 191, 36, 0.08)", border: "rgba(251, 191, 36, 0.2)", text: "#FBBF24" }
    };
    const cc = categoryColors[job.category] || { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)", text: "#94A3B8" };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="job-row"
        >
            {/* Clickable Row Header */}
            <div
                className="job-row-header"
                onClick={() => setExpanded(!expanded)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpanded(!expanded); } }}
                aria-expanded={expanded}
            >
                {/* Title */}
                <h3 className="job-row-title">{job.title}</h3>

                {/* Category Badge */}
                <span className="job-row-badge" style={{
                    backgroundColor: cc.bg,
                    border: `1px solid ${cc.border}`,
                    color: cc.text
                }}>
                    {job.category}
                </span>

                {/* Location */}
                <span className="job-row-meta">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" opacity="0.5"/><circle cx="12" cy="9" r="2.5" fill="currentColor"/></svg>
                    {job.city}
                </span>

                {/* Expand Chevron */}
                <motion.svg
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    style={{ flexShrink: 0, color: "#475569" }}
                >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
            </div>

            {/* Expandable Detail Panel */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                    >
                        <div className="job-detail-panel">
                            {/* Meta Row */}
                            <div style={{
                                display: "flex",
                                gap: "20px",
                                flexWrap: "wrap",
                                marginBottom: "16px",
                                fontSize: "0.82rem",
                                color: "#94A3B8",
                                fontFamily: "var(--font-mono)"
                            }}>
                                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" stroke="#4DD8E8" strokeWidth="1.5"/><path d="M16 7V5a4 4 0 00-8 0v2" stroke="#4DD8E8" strokeWidth="1.5"/></svg>
                                    {job.type}
                                </span>
                                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#E8521A" strokeWidth="1.5"/><path d="M12 6v6l4 2" stroke="#E8521A" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                    {job.experience}
                                </span>
                                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#A855F7" strokeWidth="1.5"/></svg>
                                    {job.city}, {job.country}
                                </span>
                            </div>

                            {/* Description */}
                            <p style={{
                                fontSize: "0.9rem",
                                color: "#CBD5E1",
                                lineHeight: "1.7",
                                margin: "0 0 18px",
                                fontFamily: "var(--font-body)",
                                maxWidth: "700px"
                            }}>
                                {job.description}
                            </p>

                            {/* Skills */}
                            <div style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "6px",
                                marginBottom: "20px"
                            }}>
                                {job.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        style={{
                                            fontSize: "0.74rem",
                                            padding: "4px 10px",
                                            borderRadius: "6px",
                                            backgroundColor: "rgba(255,255,255,0.04)",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                            color: "#94A3B8",
                                            fontFamily: "var(--font-mono)"
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Apply CTA */}
                            <Link
                                href={`/contact?product=careers&role=${job.slug}`}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "10px 24px",
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    borderRadius: "8px",
                                    backgroundColor: "#E8521A",
                                    color: "#FFFFFF",
                                    textDecoration: "none",
                                    boxShadow: "0 4px 14px rgba(232, 82, 26, 0.25)",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                Apply Now
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ── Animated Stats Strip Component ── */
function AnimatedCounter({ target, suffix, duration = 1800 }: { target: number; suffix: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useState<HTMLSpanElement | null>(null);
    const elRef = { current: null as HTMLSpanElement | null };

    useState(() => {
        // noop — just for type compat
    });

    return (
        <span
            ref={(el) => {
                if (el && !hasStarted) {
                    const observer = new IntersectionObserver(
                        ([entry]) => {
                            if (entry.isIntersecting) {
                                setHasStarted(true);
                                observer.disconnect();
                                const startTime = performance.now();
                                const tick = (now: number) => {
                                    const elapsed = now - startTime;
                                    const progress = Math.min(elapsed / duration, 1);
                                    // Ease-out cubic
                                    const eased = 1 - Math.pow(1 - progress, 3);
                                    setCount(Math.floor(eased * target));
                                    if (progress < 1) requestAnimationFrame(tick);
                                    else setCount(target);
                                };
                                requestAnimationFrame(tick);
                            }
                        },
                        { threshold: 0.3 }
                    );
                    observer.observe(el);
                }
            }}
        >
            {count}{suffix}
        </span>
    );
}

function CareersStatsStrip({ stats, shouldReduce }: {
    stats: { value: string; label: string }[];
    shouldReduce: boolean | null;
}) {
    const statConfig = [
        {
            accentColor: "#4DD8E8",
            accentBg: "rgba(77,216,232,0.1)",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="#4DD8E8" strokeWidth="1.5"/>
                    <path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" stroke="#4DD8E8" strokeWidth="1.5"/>
                    <path d="M12 13v2m-2-1h4" stroke="#4DD8E8" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            ),
            target: 15, suffix: "+"
        },
        {
            accentColor: "#FF8A3D",
            accentBg: "rgba(255,138,61,0.1)",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#FF8A3D" strokeWidth="1.5"/>
                    <path d="M12 8v4l3 3" stroke="#FF8A3D" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            ),
            target: 5, suffix: ""
        },
        {
            accentColor: "#A855F7",
            accentBg: "rgba(168,85,247,0.1)",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#A855F7" strokeWidth="1.5" strokeLinejoin="round"/>
                    <circle cx="12" cy="9" r="2.5" stroke="#A855F7" strokeWidth="1.5"/>
                </svg>
            ),
            target: 4, suffix: "+"
        },
        {
            accentColor: "#34D399",
            accentBg: "rgba(52,211,153,0.1)",
            icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" stroke="#34D399" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
            ),
            target: 100, suffix: "%"
        }
    ];

    return (
        <section
            style={{
                background: "#080C12",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                padding: "72px 0"
            }}
        >
            <div className="container">
                <motion.div
                    variants={staggerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="careers-stats-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "20px"
                    }}
                >
                    {stats.map((s, i) => {
                        const cfg = statConfig[i];
                        return (
                            <motion.div
                                key={i}
                                variants={fadeUpVariants(shouldReduce)}
                                className="stat-card-v2"
                                style={{ "--accent": cfg.accentColor } as React.CSSProperties}
                            >
                                {/* Accent bar */}
                                <div style={{
                                    position: "absolute",
                                    bottom: 0, left: 0, right: 0, height: "2px",
                                    background: `linear-gradient(90deg, ${cfg.accentColor}00, ${cfg.accentColor}, ${cfg.accentColor}00)`
                                }} />

                                {/* Icon */}
                                <div style={{
                                    width: "44px", height: "44px",
                                    borderRadius: "12px",
                                    background: cfg.accentBg,
                                    border: `1px solid ${cfg.accentColor}30`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "20px"
                                }}>
                                    {cfg.icon}
                                </div>

                                {/* Animated number */}
                                <div style={{
                                    fontSize: "3rem",
                                    fontWeight: 800,
                                    fontFamily: "var(--font-display)",
                                    color: cfg.accentColor,
                                    lineHeight: 1,
                                    marginBottom: "8px",
                                    letterSpacing: "-0.02em"
                                }}>
                                    {shouldReduce ? s.value : (
                                        <AnimatedCounter
                                            target={cfg.target}
                                            suffix={cfg.suffix}
                                            duration={1600}
                                        />
                                    )}
                                </div>

                                {/* Label */}
                                <div style={{
                                    fontSize: "0.78rem",
                                    color: "#64748B",
                                    fontFamily: "var(--font-mono)",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    lineHeight: 1.4
                                }}>
                                    {s.label}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

export default function CareersClient() {
    const shouldReduce = useReducedMotion();

    // Standardized Filter Options
    const countries = ["All Countries", "India"];
    const cities = ["All Cities", "Pune", "Bangalore"];
    const experiences = ["All Experience", "0-2 Years", "2-5 Years", "5-8 Years", "8+ Years"];
    const categories = ["All Categories", "Embedded Engineering", "HMI Development", "Connectivity", "Validation & Testing", "Systems Engineering"];
    const types = ["All Types", "Full-time"];

    // Live filter state — updates results instantly on every change
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("All Countries");
    const [selectedCity, setSelectedCity] = useState("All Cities");
    const [selectedExp, setSelectedExp] = useState("All Experience");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedType, setSelectedType] = useState("All Types");

    // Memoized live filter — sorted by experience level then A-Z
    const filteredJobs = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        return initialJobs.filter((job) => {
            const matchesSearch = !query ||
                job.title.toLowerCase().includes(query) ||
                job.description.toLowerCase().includes(query) ||
                job.skills.some((s) => s.toLowerCase().includes(query));
            const matchesCountry = selectedCountry === "All Countries" || job.country.includes(selectedCountry);
            const matchesCity    = selectedCity    === "All Cities"    || job.city.includes(selectedCity);
            const matchesExp     = selectedExp     === "All Experience" || job.experience === selectedExp;
            const matchesCategory = selectedCategory === "All Categories" || job.category === selectedCategory;
            const matchesType    = selectedType    === "All Types"     || job.type === selectedType;
            return matchesSearch && matchesCountry && matchesCity && matchesExp && matchesCategory && matchesType;
        });
    }, [searchQuery, selectedCountry, selectedCity, selectedExp, selectedCategory, selectedType]);

    // Reset all filters
    const handleResetFilter = () => {
        setSearchQuery("");
        setSelectedCountry("All Countries");
        setSelectedCity("All Cities");
        setSelectedExp("All Experience");
        setSelectedCategory("All Categories");
        setSelectedType("All Types");
    };

    return (
        <div style={{ paddingBottom: "0" }}>

            {/* ── Page Hero — Premium Redesign ── */}
            <style>{`
                @keyframes careers-float-1 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-14px) rotate(1.5deg); }
                }
                @keyframes careers-float-2 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(-1deg); }
                }
                @keyframes careers-float-3 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-18px) rotate(2deg); }
                }
                @keyframes careers-pulse-ring {
                    0% { transform: scale(1); opacity: 0.4; }
                    100% { transform: scale(1.6); opacity: 0; }
                }
                @keyframes careers-shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .careers-hero-grid-bg {
                    position: absolute; inset: 0;
                    background-image:
                        linear-gradient(rgba(77,216,232,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(77,216,232,0.04) 1px, transparent 1px);
                    background-size: 56px 56px;
                    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
                    pointer-events: none;
                }
                .careers-hero-cta-primary {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 14px 28px;
                    background: linear-gradient(135deg, #E8521A 0%, #FF8A3D 100%);
                    color: #fff; border: none; border-radius: 10px;
                    font-size: 0.95rem; font-weight: 700; cursor: pointer;
                    font-family: var(--font-body); text-decoration: none;
                    box-shadow: 0 8px 24px rgba(232,82,26,0.35);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .careers-hero-cta-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 32px rgba(232,82,26,0.45);
                }
                .careers-hero-cta-secondary {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 14px 28px;
                    background: rgba(255,255,255,0.05);
                    color: #E2E8F0; border: 1px solid rgba(255,255,255,0.15);
                    border-radius: 10px; font-size: 0.95rem; font-weight: 600;
                    cursor: pointer; font-family: var(--font-body); text-decoration: none;
                    backdrop-filter: blur(8px);
                    transition: all 0.2s;
                }
                .careers-hero-cta-secondary:hover {
                    background: rgba(255,255,255,0.1);
                    border-color: rgba(255,255,255,0.3);
                    transform: translateY(-2px);
                }
                .careers-domain-chip {
                    display: inline-flex; align-items: center; gap: 6px;
                    padding: 8px 14px;
                    border-radius: 30px; font-size: 0.78rem; font-weight: 600;
                    font-family: var(--font-mono); letter-spacing: 0.04em;
                    white-space: nowrap; backdrop-filter: blur(12px);
                    border: 1px solid; cursor: default;
                    position: absolute;
                }
                .stat-card-v2 {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 20px;
                    padding: 32px 28px;
                    text-align: left;
                    position: relative;
                    overflow: hidden;
                    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
                }
                .stat-card-v2::before {
                    content: '';
                    position: absolute;
                    bottom: 0; left: 0; right: 0;
                    height: 2px;
                }
                .stat-card-v2:hover {
                    transform: translateY(-4px);
                    border-color: rgba(255,255,255,0.16);
                    box-shadow: 0 20px 48px rgba(0,0,0,0.4);
                }
                .stat-card-v2:hover::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.03), transparent);
                    pointer-events: none;
                }
                .stat-value-shimmer {
                    background: linear-gradient(90deg, #FFFFFF 0%, #4DD8E8 40%, #FFFFFF 60%, #FFFFFF 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: careers-shimmer 3s linear infinite;
                }
                @media (max-width: 900px) {
                    .careers-hero-two-col { flex-direction: column !important; gap: 48px !important; }
                    .careers-hero-right { display: none !important; }
                    .careers-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 520px) {
                    .careers-stats-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>

            <section
                className="section-dark page-hero"
                aria-labelledby="careers-heading"
                style={{
                    background: "linear-gradient(165deg, #06080C 0%, #090D14 55%, #0B1120 100%)",
                    padding: "130px 0 100px",
                    position: "relative",
                    overflow: "hidden",
                    minHeight: "92vh",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                {/* Dot-grid background */}
                <div className="careers-hero-grid-bg" />

                {/* Ambient glow orbs */}
                <div style={{
                    position: "absolute", top: "-10%", right: "-5%",
                    width: "640px", height: "640px",
                    background: "radial-gradient(circle, rgba(232,82,26,0.10) 0%, transparent 65%)",
                    pointerEvents: "none"
                }} />
                <div style={{
                    position: "absolute", bottom: "-15%", left: "-8%",
                    width: "560px", height: "560px",
                    background: "radial-gradient(circle, rgba(77,216,232,0.07) 0%, transparent 65%)",
                    pointerEvents: "none"
                }} />
                <div style={{
                    position: "absolute", top: "40%", left: "30%",
                    width: "400px", height: "400px",
                    background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 65%)",
                    pointerEvents: "none"
                }} />

                <div className="container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
                    <div className="careers-hero-two-col" style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "64px"
                    }}>
                        {/* ── Left: Content ── */}
                        <motion.div
                            variants={staggerContainerVariants}
                            initial="hidden"
                            animate="visible"
                            style={{ flex: "0 0 55%", maxWidth: "620px" }}
                        >
                            {/* Badge */}
                            <motion.div variants={fadeUpVariants(shouldReduce)} style={{ marginBottom: "24px" }}>
                                <span style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "7px 16px",
                                    background: "rgba(77,216,232,0.07)",
                                    border: "1px solid rgba(77,216,232,0.22)",
                                    borderRadius: "30px",
                                    fontSize: "0.73rem",
                                    fontFamily: "var(--font-mono)",
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: "#4DD8E8"
                                }}>
                                    <span style={{
                                        width: "6px", height: "6px", borderRadius: "50%",
                                        background: "#4DD8E8",
                                        boxShadow: "0 0 8px rgba(77,216,232,0.8)",
                                        flexShrink: 0
                                    }} />
                                    Now Hiring — Engineering Roles
                                </span>
                            </motion.div>

                            {/* H1 */}
                            <motion.h1
                                id="careers-heading"
                                variants={fadeUpVariants(shouldReduce)}
                                style={{
                                    fontSize: "clamp(2.6rem, 4.5vw, 3.8rem)",
                                    fontWeight: 800,
                                    fontFamily: "var(--font-display)",
                                    color: "#F1F5F9",
                                    letterSpacing: "-0.025em",
                                    marginBottom: "22px",
                                    lineHeight: 1.1
                                }}
                            >
                                Shape the Future of{" "}
                                <span style={{
                                    background: "linear-gradient(100deg, #4DD8E8 0%, #7DD3FC 40%, #E8521A 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text"
                                }}>
                                    Software‑Defined
                                </span>
                                <br />
                                <span style={{ color: "#F1F5F9" }}>Vehicles</span>
                            </motion.h1>

                            {/* Lead */}
                            <motion.p
                                variants={fadeUpVariants(shouldReduce)}
                                style={{
                                    color: "#94A3B8",
                                    fontSize: "1.08rem",
                                    lineHeight: 1.75,
                                    fontFamily: "var(--font-body)",
                                    marginBottom: "36px",
                                    maxWidth: "560px"
                                }}
                            >
                                Join specialized engineering CoEs across <strong style={{ color: "#CBD5E1" }}>SDV</strong>, <strong style={{ color: "#CBD5E1" }}>Android Automotive</strong>, <strong style={{ color: "#CBD5E1" }}>V2X</strong>, AI/ML, and Autonomous Systems. Build high-impact technology with global automotive leaders.
                            </motion.p>

                            {/* CTAs */}
                            <motion.div
                                variants={fadeUpVariants(shouldReduce)}
                                style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}
                            >
                                <a href="#job-openings" className="careers-hero-cta-primary">
                                    View Open Positions
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </a>
                                <a href="/contact" className="careers-hero-cta-secondary">
                                    Talk to Recruiting
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
                                </a>
                            </motion.div>

                            {/* Trust line */}
                            <motion.div
                                variants={fadeUpVariants(shouldReduce)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    marginTop: "36px"
                                }}
                            >
                                <div style={{ display: "flex" }}>
                                    {["#4DD8E8","#E8521A","#A855F7","#34D399"].map((c, i) => (
                                        <div key={i} style={{
                                            width: "30px", height: "30px", borderRadius: "50%",
                                            background: `radial-gradient(circle, ${c}33, ${c}11)`,
                                            border: `2px solid ${c}66`,
                                            marginLeft: i > 0 ? "-8px" : "0",
                                            zIndex: 4 - i,
                                            position: "relative"
                                        }} />
                                    ))}
                                </div>
                                <span style={{ fontSize: "0.82rem", color: "#64748B", fontFamily: "var(--font-body)" }}>
                                    5 engineering domains · India &amp; global delivery
                                </span>
                            </motion.div>
                        </motion.div>

                        {/* ── Right: Visual Card ── */}
                        <motion.div
                            className="careers-hero-right"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            style={{ flex: 1, position: "relative", height: "480px" }}
                        >
                            {/* Central glow circle */}
                            <div style={{
                                position: "absolute",
                                top: "50%", left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "200px", height: "200px"
                            }}>
                                {/* Pulse rings */}
                                {[1.3, 1.6, 2.0].map((scale, i) => (
                                    <div key={i} style={{
                                        position: "absolute",
                                        inset: 0,
                                        borderRadius: "50%",
                                        border: "1px solid rgba(77,216,232,0.2)",
                                        transform: `scale(${scale})`,
                                        animation: `careers-pulse-ring ${2 + i * 0.6}s ease-out ${i * 0.4}s infinite`
                                    }} />
                                ))}
                                {/* Central badge */}
                                <div style={{
                                    position: "absolute", inset: 0,
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, rgba(77,216,232,0.12), rgba(232,82,26,0.08))",
                                    border: "1px solid rgba(77,216,232,0.3)",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backdropFilter: "blur(12px)"
                                }}>
                                    <span style={{ fontSize: "2.2rem", fontWeight: 800, color: "#4DD8E8", fontFamily: "var(--font-mono)", lineHeight: 1 }}>15+</span>
                                    <span style={{ fontSize: "0.7rem", color: "#64748B", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px" }}>Open Roles</span>
                                </div>
                            </div>

                            {/* Floating domain chips */}
                            {[
                                { label: "Embedded Eng.", color: "#4DD8E8", top: "6%", left: "5%", anim: "careers-float-1", delay: "0s", dot: "#4DD8E8" },
                                { label: "HMI / Android", color: "#FF8A3D", top: "10%", right: "2%", anim: "careers-float-2", delay: "0.5s", dot: "#FF8A3D" },
                                { label: "V2X / Connectivity", color: "#A855F7", top: "42%", left: "0%", anim: "careers-float-3", delay: "1s", dot: "#A855F7" },
                                { label: "Validation & Test", color: "#34D399", bottom: "28%", right: "0%", anim: "careers-float-1", delay: "0.8s", dot: "#34D399" },
                                { label: "Systems Eng.", color: "#FBBF24", bottom: "8%", left: "12%", anim: "careers-float-2", delay: "0.3s", dot: "#FBBF24" },
                                { label: "SDV Platform", color: "#FB7185", top: "72%", right: "8%", anim: "careers-float-3", delay: "1.2s", dot: "#FB7185" },
                            ].map((chip, i) => (
                                <div
                                    key={i}
                                    className="careers-domain-chip"
                                    style={{
                                        top: chip.top, left: chip.left, right: chip.right, bottom: chip.bottom,
                                        background: `rgba(${chip.color === "#4DD8E8" ? "77,216,232" : chip.color === "#FF8A3D" ? "255,138,61" : chip.color === "#A855F7" ? "168,85,247" : chip.color === "#34D399" ? "52,211,153" : chip.color === "#FBBF24" ? "251,191,36" : "251,113,133"},0.08)`,
                                        borderColor: `${chip.color}33`,
                                        color: chip.color,
                                        animation: `${chip.anim} ${3 + i * 0.4}s ease-in-out ${chip.delay} infinite`
                                    }}
                                >
                                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: chip.dot, boxShadow: `0 0 6px ${chip.dot}` }} />
                                    {chip.label}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Stats Strip — Animated Counters ── */}
            <CareersStatsStrip stats={careerStats} shouldReduce={shouldReduce} />

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

            {/* ── Job Openings — Sidebar + Card Grid Layout ── */}
            <section
                id="job-openings"
                style={{
                    background: "#F8FAFC",
                    borderTop: "1px solid #E2E8F0",
                    padding: "80px 0 96px"
                }}
            >
                <div className="container">

                    {/* ── Section Header ── */}
                    <div style={{ marginBottom: "40px" }}>
                        <span style={{
                            fontSize: "0.75rem",
                            fontFamily: "var(--font-mono)",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#E8521A",
                            fontWeight: 700,
                            display: "block",
                            marginBottom: "10px"
                        }}>Current Opportunities</span>
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                            <div>
                                <h2 style={{
                                    fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
                                    fontWeight: 800,
                                    fontFamily: "var(--font-display)",
                                    color: "#0B1320",
                                    margin: 0,
                                    letterSpacing: "-0.02em",
                                    lineHeight: 1.1
                                }}>
                                    Open Positions
                                </h2>
                                <p style={{
                                    color: "#64748B",
                                    margin: "8px 0 0",
                                    fontSize: "1rem",
                                    fontFamily: "var(--font-body)"
                                }}>
                                    Find your next engineering role at SAMSAN
                                </p>
                            </div>
                            <div style={{
                                background: "linear-gradient(135deg, #0B1320 0%, #1A2540 100%)",
                                padding: "10px 20px",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            }}>
                                <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "#4DD8E8", fontFamily: "var(--font-mono)" }}>{filteredJobs.length}</span>
                                <span style={{ fontSize: "0.8rem", color: "#94A3B8", fontFamily: "var(--font-body)", lineHeight: 1.3 }}>open<br/>positions</span>
                            </div>
                        </div>
                    </div>

                    {/* ── Styles ── */}
                    <style>{`
                        .jobs-layout {
                            display: grid;
                            grid-template-columns: 260px 1fr;
                            gap: 28px;
                            align-items: start;
                        }
                        @media (max-width: 900px) {
                            .jobs-layout { grid-template-columns: 1fr; }
                            .jobs-sidebar { display: none; }
                        }
                        .jobs-sidebar {
                            background: #FFFFFF;
                            border: 1px solid #E2E8F0;
                            border-radius: 16px;
                            overflow: hidden;
                            position: sticky;
                            top: 96px;
                            box-shadow: 0 2px 16px rgba(11,19,32,0.06);
                        }
                        .sidebar-section {
                            border-bottom: 1px solid #F1F5F9;
                            padding: 18px 20px;
                        }
                        .sidebar-section:last-child { border-bottom: none; }
                        .sidebar-section-title {
                            font-size: 0.78rem;
                            font-weight: 700;
                            text-transform: uppercase;
                            letter-spacing: 0.08em;
                            color: #0B1320;
                            font-family: var(--font-mono);
                            margin: 0 0 14px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            cursor: pointer;
                        }
                        .filter-chip-group {
                            display: flex;
                            flex-direction: column;
                            gap: 8px;
                        }
                        .filter-chip {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            font-size: 0.84rem;
                            color: #475569;
                            font-family: var(--font-body);
                            cursor: pointer;
                            padding: 6px 10px;
                            border-radius: 8px;
                            transition: all 0.15s ease;
                            border: none;
                            background: transparent;
                            width: 100%;
                            text-align: left;
                        }
                        .filter-chip:hover { background: #F8FAFC; color: #0B1320; }
                        .filter-chip.active {
                            background: rgba(232, 82, 26, 0.06);
                            color: #E8521A;
                            font-weight: 600;
                        }
                        .filter-chip-dot {
                            width: 8px; height: 8px;
                            border-radius: 50%;
                            flex-shrink: 0;
                            background: #CBD5E1;
                            transition: background 0.15s;
                        }
                        .filter-chip.active .filter-chip-dot { background: #E8521A; }
                        .filter-chip-count {
                            margin-left: auto;
                            font-size: 0.72rem;
                            background: #F1F5F9;
                            color: #94A3B8;
                            padding: 2px 7px;
                            border-radius: 20px;
                            font-family: var(--font-mono);
                        }
                        .filter-chip.active .filter-chip-count {
                            background: rgba(232, 82, 26, 0.1);
                            color: #E8521A;
                        }

                        /* Search bar */
                        .jobs-search-bar {
                            display: flex;
                            gap: 10px;
                            margin-bottom: 24px;
                            background: #FFFFFF;
                            border: 1px solid #E2E8F0;
                            border-radius: 12px;
                            padding: 6px 6px 6px 16px;
                            box-shadow: 0 2px 8px rgba(11,19,32,0.04);
                            align-items: center;
                        }
                        .jobs-search-input {
                            flex: 1;
                            border: none;
                            outline: none;
                            font-size: 0.9rem;
                            color: #0B1320;
                            background: transparent;
                            font-family: var(--font-body);
                        }
                        .jobs-search-input::placeholder { color: #94A3B8; }
                        .jobs-search-btn {
                            background: linear-gradient(135deg, #E8521A, #FF8A3D);
                            color: #fff;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 8px;
                            font-size: 0.85rem;
                            font-weight: 600;
                            cursor: pointer;
                            font-family: var(--font-body);
                            display: flex;
                            align-items: center;
                            gap: 6px;
                            transition: opacity 0.2s;
                            white-space: nowrap;
                        }
                        .jobs-search-btn:hover { opacity: 0.9; }

                        /* Job Cards */
                        .jobs-grid {
                            display: grid;
                            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                            gap: 18px;
                        }
                        .job-card-v2 {
                            background: #FFFFFF;
                            border: 1px solid #E8EDF4;
                            border-radius: 16px;
                            padding: 24px;
                            display: flex;
                            flex-direction: column;
                            gap: 0;
                            transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
                            position: relative;
                            overflow: hidden;
                        }
                        .job-card-v2::after {
                            content: '';
                            position: absolute;
                            top: 0; left: 0; right: 0;
                            height: 3px;
                            background: linear-gradient(90deg, #E8521A, #FF8A3D);
                            opacity: 0;
                            transition: opacity 0.2s;
                        }
                        .job-card-v2:hover {
                            transform: translateY(-3px);
                            box-shadow: 0 12px 32px rgba(11,19,32,0.1);
                            border-color: rgba(232,82,26,0.25);
                        }
                        .job-card-v2:hover::after { opacity: 1; }
                        .job-card-title-v2 {
                            font-size: 1.05rem;
                            font-weight: 700;
                            color: #0B1320;
                            font-family: var(--font-display);
                            margin: 0 0 4px;
                            line-height: 1.3;
                            transition: color 0.15s;
                        }
                        .job-card-v2:hover .job-card-title-v2 { color: #E8521A; }
                        .job-apply-btn {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 6px;
                            padding: 10px 16px;
                            background: #0B1320;
                            color: #FFFFFF;
                            border: none;
                            border-radius: 9px;
                            font-size: 0.84rem;
                            font-weight: 600;
                            cursor: pointer;
                            text-decoration: none;
                            font-family: var(--font-body);
                            transition: all 0.2s ease;
                            flex: 1;
                        }
                        .job-apply-btn:hover {
                            background: #E8521A;
                        }
                        .job-details-btn {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 6px;
                            padding: 10px 14px;
                            background: transparent;
                            color: #475569;
                            border: 1px solid #E2E8F0;
                            border-radius: 9px;
                            font-size: 0.84rem;
                            font-weight: 500;
                            cursor: pointer;
                            font-family: var(--font-body);
                            transition: all 0.2s ease;
                        }
                        .job-details-btn:hover {
                            border-color: #E8521A;
                            color: #E8521A;
                        }
                        .job-skill-tag {
                            font-size: 0.71rem;
                            padding: 3px 9px;
                            border-radius: 5px;
                            background: #F1F5F9;
                            color: #475569;
                            font-family: var(--font-mono);
                            white-space: nowrap;
                        }
                        .no-jobs-state {
                            grid-column: 1/-1;
                            text-align: center;
                            padding: 64px 24px;
                            background: #FFFFFF;
                            border: 1px dashed #CBD5E1;
                            border-radius: 16px;
                        }
                    `}</style>

                    {/* ── Main layout: Sidebar + Content ── */}
                    <div className="jobs-layout">

                        {/* ── Left Sidebar Filters ── */}
                        <aside className="jobs-sidebar">
                            {/* Sidebar Header */}
                            <div style={{
                                padding: "16px 20px",
                                borderBottom: "1px solid #F1F5F9",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                background: "#FAFBFC"
                            }}>
                                <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0B1320", fontFamily: "var(--font-display)" }}>Filters</span>
                                <button onClick={handleResetFilter} style={{
                                    fontSize: "0.75rem",
                                    color: "#E8521A",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontFamily: "var(--font-body)",
                                    fontWeight: 600,
                                    padding: 0
                                }}>Clear all</button>
                            </div>

                            {/* Category Filter */}
                            <div className="sidebar-section">
                                <p className="sidebar-section-title">Domain</p>
                                <div className="filter-chip-group">
                                    {categories.map(cat => {
                                        const catColors: Record<string, string> = {
                                            "All Categories": "#64748B",
                                            "Embedded Engineering": "#4DD8E8",
                                            "HMI Development": "#FF8A3D",
                                            "Connectivity": "#A855F7",
                                            "Validation & Testing": "#34D399",
                                            "Systems Engineering": "#FBBF24"
                                        };
                                        const isActive = selectedCategory === cat;
                                        const count = cat === "All Categories"
                                            ? rawJobs.length
                                            : rawJobs.filter(j => j.category === cat).length;
                                        return (
                                            <button
                                                key={cat}
                                                className={`filter-chip ${isActive ? "active" : ""}`}
                                                onClick={() => setSelectedCategory(cat)}
                                            >
                                                <span className="filter-chip-dot" style={isActive ? { background: catColors[cat] || "#E8521A" } : {}} />
                                                <span style={{ flex: 1, textAlign: "left", fontSize: "0.82rem" }}>{cat === "All Categories" ? "All Domains" : cat}</span>
                                                <span className="filter-chip-count">{count}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Experience Filter */}
                            <div className="sidebar-section">
                                <p className="sidebar-section-title">Experience Level</p>
                                <div className="filter-chip-group">
                                    {experiences.map(exp => {
                                        const isActive = selectedExp === exp;
                                        const count = exp === "All Experience"
                                            ? rawJobs.length
                                            : rawJobs.filter(j => j.experience === exp).length;
                                        const expLabels: Record<string, string> = {
                                            "All Experience": "All Levels",
                                            "0-2 Years": "Entry Level (0–2 yrs)",
                                            "2-5 Years": "Mid Level (2–5 yrs)",
                                            "5-8 Years": "Senior (5–8 yrs)",
                                            "8+ Years": "Lead / Principal (8+)"
                                        };
                                        return (
                                            <button
                                                key={exp}
                                                className={`filter-chip ${isActive ? "active" : ""}`}
                                                onClick={() => setSelectedExp(exp)}
                                            >
                                                <span className="filter-chip-dot" />
                                                <span style={{ flex: 1, textAlign: "left", fontSize: "0.82rem" }}>{expLabels[exp] || exp}</span>
                                                <span className="filter-chip-count">{count}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* City Filter */}
                            <div className="sidebar-section">
                                <p className="sidebar-section-title">Location</p>
                                <div className="filter-chip-group">
                                    {cities.map(city => {
                                        const isActive = selectedCity === city;
                                        const count = city === "All Cities"
                                            ? rawJobs.length
                                            : rawJobs.filter(j => j.city.includes(city)).length;
                                        return (
                                            <button
                                                key={city}
                                                className={`filter-chip ${isActive ? "active" : ""}`}
                                                onClick={() => setSelectedCity(city)}
                                            >
                                                <span className="filter-chip-dot" />
                                                <span style={{ flex: 1, textAlign: "left", fontSize: "0.82rem" }}>
                                                    {city === "All Cities" ? "All Locations" : `${city}, India`}
                                                </span>
                                                <span className="filter-chip-count">{count}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Employment Type */}
                            <div className="sidebar-section">
                                <p className="sidebar-section-title">Job Type</p>
                                <div className="filter-chip-group">
                                    {types.map(t => {
                                        const isActive = selectedType === t;
                                        const count = t === "All Types"
                                            ? rawJobs.length
                                            : rawJobs.filter(j => j.type === t).length;
                                        return (
                                            <button
                                                key={t}
                                                className={`filter-chip ${isActive ? "active" : ""}`}
                                                onClick={() => setSelectedType(t)}
                                            >
                                                <span className="filter-chip-dot" />
                                                <span style={{ flex: 1, textAlign: "left", fontSize: "0.82rem" }}>{t === "All Types" ? "All Types" : t}</span>
                                                <span className="filter-chip-count">{count}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </aside>

                        {/* ── Right Content: Search + Cards ── */}
                        <div>
                            {/* Search Bar */}
                            <div className="jobs-search-bar">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: "#94A3B8" }}>
                                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M16 16l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                                <input
                                    type="text"
                                    className="jobs-search-input"
                                    placeholder="Search job title or skill (e.g. Android, AOSP, Python…)"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button className="jobs-search-btn">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="M16 16l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                                    Search
                                </button>
                            </div>

                            {/* Results Header */}
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "16px"
                            }}>
                                <p style={{
                                    fontSize: "0.9rem",
                                    color: "#475569",
                                    fontFamily: "var(--font-body)",
                                    margin: 0
                                }}>
                                    All Jobs{" "}
                                    <span style={{
                                        fontWeight: 700,
                                        color: "#0B1320",
                                        background: "#F1F5F9",
                                        padding: "2px 10px",
                                        borderRadius: "20px",
                                        fontSize: "0.85rem",
                                        fontFamily: "var(--font-mono)"
                                    }}>
                                        {filteredJobs.length}
                                    </span>
                                </p>
                                <span style={{
                                    fontSize: "0.78rem",
                                    color: "#94A3B8",
                                    fontFamily: "var(--font-mono)"
                                }}>
                                    Sorted by experience · {new Date().getFullYear()}
                                </span>
                            </div>

                            {/* Job Cards Grid */}
                            <AnimatePresence>
                                <div className="jobs-grid">
                                    {filteredJobs.length > 0 ? filteredJobs.map((job, idx) => {
                                        const catConfig: Record<string, { color: string; bg: string; border: string }> = {
                                            "Embedded Engineering": { color: "#4DD8E8", bg: "rgba(77,216,232,0.08)", border: "rgba(77,216,232,0.2)" },
                                            "HMI Development":      { color: "#FF8A3D", bg: "rgba(255,138,61,0.08)", border: "rgba(255,138,61,0.2)" },
                                            "Connectivity":         { color: "#A855F7", bg: "rgba(168,85,247,0.08)", border: "rgba(168,85,247,0.2)" },
                                            "Validation & Testing": { color: "#10B981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)" },
                                            "Systems Engineering":  { color: "#F59E0B", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" }
                                        };
                                        const cc = catConfig[job.category] || { color: "#64748B", bg: "rgba(100,116,139,0.08)", border: "rgba(100,116,139,0.2)" };
                                        const expShort: Record<string, string> = {
                                            "0-2 Years": "Entry",
                                            "2-5 Years": "Mid",
                                            "5-8 Years": "Senior",
                                            "8+ Years": "Lead"
                                        };

                                        return (
                                            <motion.div
                                                key={job.id}
                                                className="job-card-v2"
                                                initial={{ opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.97 }}
                                                transition={{ duration: 0.2, delay: idx * 0.03 }}
                                            >
                                                {/* Card Top: Category + Type */}
                                                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                                                    <span style={{
                                                        fontSize: "0.68rem",
                                                        fontWeight: 700,
                                                        fontFamily: "var(--font-mono)",
                                                        letterSpacing: "0.06em",
                                                        textTransform: "uppercase",
                                                        padding: "4px 10px",
                                                        borderRadius: "20px",
                                                        backgroundColor: cc.bg,
                                                        border: `1px solid ${cc.border}`,
                                                        color: cc.color,
                                                        whiteSpace: "nowrap"
                                                    }}>
                                                        {job.category}
                                                    </span>
                                                    <span style={{
                                                        fontSize: "0.68rem",
                                                        fontWeight: 600,
                                                        fontFamily: "var(--font-mono)",
                                                        letterSpacing: "0.04em",
                                                        textTransform: "uppercase",
                                                        padding: "4px 8px",
                                                        borderRadius: "6px",
                                                        backgroundColor: "#F1F5F9",
                                                        color: "#64748B"
                                                    }}>
                                                        {job.type}
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="job-card-title-v2">{job.title}</h3>

                                                {/* Meta row: Location + Experience */}
                                                <div style={{
                                                    display: "flex",
                                                    gap: "14px",
                                                    flexWrap: "wrap",
                                                    margin: "10px 0 14px",
                                                    fontSize: "0.8rem",
                                                    color: "#64748B",
                                                    fontFamily: "var(--font-body)"
                                                }}>
                                                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#CBD5E1"/><circle cx="12" cy="9" r="2.5" fill="#94A3B8"/></svg>
                                                        {job.city}, {job.country}
                                                    </span>
                                                    <span style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "4px",
                                                        color: "#E8521A",
                                                        fontWeight: 600,
                                                        fontSize: "0.78rem"
                                                    }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#E8521A" strokeWidth="1.5"/><path d="M12 7v5l3 3" stroke="#E8521A" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                                        {expShort[job.experience]} · {job.experience}
                                                    </span>
                                                </div>

                                                {/* Description */}
                                                <p style={{
                                                    fontSize: "0.82rem",
                                                    color: "#64748B",
                                                    lineHeight: "1.65",
                                                    margin: "0 0 16px",
                                                    fontFamily: "var(--font-body)",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden"
                                                } as React.CSSProperties}>
                                                    {job.description}
                                                </p>

                                                {/* Skill Tags */}
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "20px" }}>
                                                    {job.skills.slice(0, 4).map(s => (
                                                        <span key={s} className="job-skill-tag">{s}</span>
                                                    ))}
                                                    {job.skills.length > 4 && (
                                                        <span className="job-skill-tag" style={{ color: "#94A3B8" }}>+{job.skills.length - 4}</span>
                                                    )}
                                                </div>

                                                {/* Divider */}
                                                <div style={{ borderTop: "1px solid #F1F5F9", marginBottom: "16px" }} />

                                                {/* Action Row */}
                                                <div style={{ display: "flex", gap: "8px" }}>
                                                    <button className="job-details-btn">View details</button>
                                                    <Link
                                                        href={`/contact?product=careers&role=${job.slug}`}
                                                        className="job-apply-btn"
                                                    >
                                                        Apply now
                                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        );
                                    }) : (
                                        <div className="no-jobs-state">
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ display: "block", margin: "0 auto 16px", opacity: 0.3 }}>
                                                <circle cx="11" cy="11" r="8" stroke="#0B1320" strokeWidth="1.5"/>
                                                <path d="M16 16l5 5" stroke="#0B1320" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                            <p style={{ margin: "0 0 16px", color: "#64748B", fontSize: "0.95rem", fontFamily: "var(--font-body)" }}>
                                                No positions match your current filters.
                                            </p>
                                            <button
                                                onClick={handleResetFilter}
                                                style={{
                                                    padding: "10px 24px",
                                                    borderRadius: "8px",
                                                    background: "#E8521A",
                                                    color: "#fff",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    fontSize: "0.85rem",
                                                    fontWeight: 600,
                                                    fontFamily: "var(--font-body)"
                                                }}
                                            >
                                                Reset All Filters
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </AnimatePresence>
                        </div>
                    </div>
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
}
