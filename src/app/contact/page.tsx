"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AboutCompany from "@/components/homepage/AboutCompany";

const PRODUCT_MAP: Record<string, string> = {
    maestro: "Maestro™",
    twinlnk: "TwinLnk™",
    samchat: "SamChat",
    "automate-ai": "AutoMATE.ai",
    "sam-sanvaad": "Sam-Sanvaad",
    "driver-health": "Driver Health & Wellness Monitoring",
    sdv: "Software Defined Vehicle (SDV)",
    "stafd-in": "STAFD.IN",
    vemeego: "Vemeego",
    pikniknow: "PiknikNow",
    "digital-cockpit-solution": "Digital Cockpit Solution",
    "dms-edge": "DMS Edge",
    cabiniq: "CabinIQ™",
    vseva: "vSeva"
};

const ROLE_MAP: Record<string, string> = {
    "linux-bsp-developer": "Linux BSP Developer",
    "multimedia-middleware-engineer": "Multimedia & Middleware Engineer",
    "multimedia-middleware-engineer-ota": "Multimedia & Middleware Engineer — OTA",
    "android-hmi-engineer": "Android HMI Engineer",
    "connectivity-engineer": "Connectivity Engineer",
    "media-projection-engineer": "Media Projection Engineer",
    "android-hmi-engineer-unreal": "Android HMI Engineer — Unreal",
    "automotive-ivi-testing-engineer": "Automotive IVI Testing Engineer",
    "hmi-tester": "HMI Tester",
    "spoc-v2x": "SPOC — V2X",
    "spoc-rd-ecu": "SPOC — RD ECU",
    "android-hal-engineer": "Android HAL Engineer",
    "systems-engineer": "Systems Engineer"
};

interface HubInfo {
    id: string;
    name: string;
    region: string;
    city: string;
    country: string;
    address: string;
    phone: string;
    email: string;
    timezone: string;
    mapUrl: string;
    badge: string;
}

const HUBS: HubInfo[] = [
    {
        id: "pune",
        name: "Pune R&D Delivery Center",
        region: "India / APAC R&D HQ",
        city: "Pune",
        country: "India",
        address: "STPI New Building, Rajiv Gandhi Infotech Park, Phase I, Hinjawadi, Pune 411 057",
        phone: "+91 89569 27909",
        email: "india@samsanlabs.com",
        timezone: "IST (UTC+5:30)",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.3813958936647!2d73.7296894!3d18.5917904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbc121555555%3A0xbc4db79d20c5c50b!2sSoftware+Technology+Parks+of+India!5e0!3m2!1sen!2sin!4v1718700000000!5m2!1sen!2sin",
        badge: "Primary R&D Center"
    },
    {
        id: "europe",
        name: "Europe Automotive Hub",
        region: "Europe & UK",
        city: "Stuttgart / Munich",
        country: "Germany",
        address: "Automotive OEM Integration & Embedded Engineering Partner Hub, Germany",
        phone: "+49 711 9823010",
        email: "europe@samsanlabs.com",
        timezone: "CET (UTC+1)",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d84179.8454238575!2d9.1085023!3d48.7784485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799db34c1100001%3A0x400b24712c7f820!2sStuttgart%2C%20Germany!5e0!3m2!1sen!2sin!4v1718700000000!5m2!1sen!2sin",
        badge: "OEM & Tier-1 Integration"
    },
    {
        id: "americas",
        name: "Americas SDV Lab",
        region: "North America",
        city: "Detroit / Silicon Valley",
        country: "USA",
        address: "Software-Defined Vehicle & Connected Mobility Center, Detroit, MI, USA",
        phone: "+1 313 456 7890",
        email: "usa@samsanlabs.com",
        timezone: "EST (UTC-5) / PST (UTC-8)",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d188764.97541620606!2d-83.1818227!3d42.3527122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824ca0110cb1d75%3A0x5776864e35b9c4d2!2sDetroit%2C%20MI%2C%20USA!5e0!3m2!1sen!2sin!4v1718700000000!5m2!1sen!2sin",
        badge: "SDV & Platform Engineering"
    },
    {
        id: "apac",
        name: "APAC Autonomous Center",
        region: "Japan & South Korea",
        city: "Tokyo / Seoul",
        country: "Japan & Korea",
        address: "Cockpit & ADAS Systems Engineering Center, Shinagawa, Tokyo, Japan",
        phone: "+81 3 5432 1098",
        email: "apac@samsanlabs.com",
        timezone: "JST (UTC+9)",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207446.24819777977!2d139.6007849!3d35.6684415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b857628235d%3A0x4ce01222f6fa72d6!2sTokyo%2C%20Japan!5e0!3m2!1sen!2sin!4v1718700000000!5m2!1sen!2sin",
        badge: "ADAS & Cockpit Systems"
    }
];

const INTEREST_OPTIONS = [
    { id: "Cockpit", label: "Cockpit & HUD", icon: "🚗" },
    { id: "SDV", label: "Software-Defined Vehicle", icon: "⚡" },
    { id: "Telematics", label: "Telematics & Cloud", icon: "📡" },
    { id: "AI Engineering", label: "Embedded AI & ADAS", icon: "🧠" },
    { id: "Staffing", label: "Engineering Staffing", icon: "👥" },
    { id: "Investor Discussion", label: "Investor Inquiry", icon: "📈" },
    { id: "Partnership", label: "Tech Partnership", icon: "🤝" },
    { id: "Careers", label: "Careers & Jobs", icon: "🎯" }
];

const getInterestFromProduct = (slug: string): string => {
    if (slug === "careers") return "Careers";
    if (slug === "sdv") return "SDV";
    if (slug === "stafd-in") return "Staffing";
    if (slug === "twinlnk" || slug === "maestro") return "Telematics";
    if (slug === "driver-health") return "Cockpit";
    return "AI Engineering";
};

function ContactPageContent() {
    const searchParams = useSearchParams();
    const productParam = searchParams.get("product") || "";
    const roleParam = searchParams.get("role") || "";
    const productSlug = productParam.toLowerCase().trim();
    const isCareers = productSlug === "careers";
    const isValidProduct = productSlug && (PRODUCT_MAP.hasOwnProperty(productSlug) || isCareers);
    const productDisplayName = isValidProduct && !isCareers ? PRODUCT_MAP[productSlug] : "";
    const roleDisplayName = ROLE_MAP[roleParam] || (roleParam ? roleParam.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "");

    const [activeHubId, setActiveHubId] = useState<string>("pune");
    const [currentState, setCurrentState] = useState<"form" | "submitted">("form");
    const [submitting, setSubmitting] = useState(false);

    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [interest, setInterest] = useState("");
    const [message, setMessage] = useState("");

    const [errors, setErrors] = useState<Record<string, string>>({});
    const shouldReduce = useReducedMotion();

    const activeHub = HUBS.find(h => h.id === activeHubId) || HUBS[0];

    useEffect(() => {
        if (isCareers) {
            setInterest("Careers");
        } else if (isValidProduct) {
            setInterest(getInterestFromProduct(productSlug));
        }
    }, [productSlug, isCareers, isValidProduct]);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!name || name.trim().length < 2) {
            newErrors.name = "Full name must be at least 2 characters.";
        }

        if (!email) {
            newErrors.email = "Work email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!company || company.trim().length === 0) {
            newErrors.company = "Company name is required.";
        }

        if (phone && !/^\d{7,15}$/.test(phone)) {
            newErrors.phone = "Phone number must be between 7 and 15 digits.";
        }

        if (!interest) {
            newErrors.interest = "Please select an interest area above.";
        }

        if (!message || message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setCurrentState("submitted");
        }, 600);
    };

    return (
        <div>
            {/* ── Section 1: Hero Banner (section-dark) ── */}
            <div className="section-dark">
                <section
                    style={{
                        position: "relative",
                        backgroundImage: "linear-gradient(180deg, rgba(10, 15, 28, 0.45) 0%, rgba(10, 15, 28, 0.85) 100%), url('https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1600&auto=format&fit=crop')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        padding: "190px 0 110px 0",
                        textAlign: "center",
                        overflow: "hidden"
                    }}
                >
                    {/* Glowing radial background accents */}
                    <div
                        style={{
                            position: "absolute",
                            top: "30%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "600px",
                            height: "300px",
                            background: "radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, transparent 70%)",
                            pointerEvents: "none"
                        }}
                    />

                    {/* Bottom Slanted Divider */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "80px",
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
                            <motion.h1
                                variants={fadeUpVariants(shouldReduce)}
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: "clamp(2.8rem, 6vw, 4.2rem)",
                                    fontWeight: 700,
                                    color: "#FFFFFF",
                                    margin: 0,
                                    letterSpacing: "-0.02em",
                                    textShadow: "0 4px 20px rgba(0,0,0,0.6)"
                                }}
                            >
                                Let&apos;s Engineer Your Next Vehicle Platform
                            </motion.h1>

                            <motion.p
                                variants={fadeUpVariants(shouldReduce)}
                                style={{
                                    color: "#CBD5E1",
                                    fontSize: "1.15rem",
                                    maxWidth: "620px",
                                    margin: "18px auto 0 auto",
                                    lineHeight: "1.65"
                                }}
                            >
                                Connect directly with our lead automotive software architects and engineering directors. Fast turnaround, strict NDA execution, and global deployment.
                            </motion.p>

                            {/* Trust Pill Bar */}
                            <motion.div
                                variants={fadeUpVariants(shouldReduce)}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "24px",
                                    flexWrap: "wrap",
                                    marginTop: "32px"
                                }}
                            >
                                <span style={{ fontSize: "0.85rem", color: "#94A3B8", display: "flex", alignItems: "center", gap: "6px" }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                    ISO 26262 &amp; ASPICE Ready
                                </span>
                                <span style={{ fontSize: "0.85rem", color: "#94A3B8", display: "flex", alignItems: "center", gap: "6px" }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                    Tier-1 &amp; OEM Partner Track Record
                                </span>
                                <span style={{ fontSize: "0.85rem", color: "#94A3B8", display: "flex", alignItems: "center", gap: "6px" }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                    Direct Engineering Lead Access
                                </span>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </div>

            {/* ── Section 2: "We Are SAMSAN" Section (section-dark) — Under Photo ── */}
            <div className="section-dark">
                <AboutCompany />
            </div>

            {/* ── Section 3: Interactive R&D Hubs & Contact Form (section-light) ── */}
            <div className="section-light">
                <section style={{ padding: "80px 0 110px 0", position: "relative" }}>
                    <div className="container">

                        {/* Interactive Global Hubs Switcher */}
                        <div style={{ marginBottom: "50px", textAlign: "center" }}>
                            <div style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#7C3AED", marginBottom: "8px" }}>
                                Global Presence &amp; Delivery Network
                            </div>
                            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#0F172A", margin: "0 0 24px 0", fontFamily: "var(--font-display)" }}>
                                Select SAMSAN Engineering Hub
                            </h2>

                            {/* Hub Selector Buttons */}
                            <div style={{
                                display: "inline-flex",
                                gap: "8px",
                                background: "#FFFFFF",
                                padding: "6px",
                                borderRadius: "100px",
                                border: "1px solid rgba(15, 23, 42, 0.12)",
                                boxShadow: "0 4px 20px rgba(15, 23, 42, 0.05)",
                                flexWrap: "wrap",
                                justifyContent: "center"
                            }}>
                                {HUBS.map((hub) => {
                                    const isActive = hub.id === activeHubId;
                                    return (
                                        <button
                                            key={hub.id}
                                            onClick={() => setActiveHubId(hub.id)}
                                            style={{
                                                padding: "10px 22px",
                                                borderRadius: "100px",
                                                border: "none",
                                                background: isActive ? "linear-gradient(135deg, #7C3AED, #C084FC)" : "transparent",
                                                color: isActive ? "#FFFFFF" : "#475569",
                                                fontWeight: isActive ? 600 : 500,
                                                fontSize: "0.88rem",
                                                cursor: "pointer",
                                                transition: "all 0.25s ease",
                                                boxShadow: isActive ? "0 4px 12px rgba(124, 58, 237, 0.3)" : "none"
                                            }}
                                        >
                                            {hub.city} ({hub.country})
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Main Grid: Map & Form */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                            gap: "40px",
                            alignItems: "stretch"
                        }}>

                            {/* Left Column: Dynamic Interactive Hub Card & Map */}
                            <motion.div
                                key={activeHub.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "24px"
                                }}
                            >
                                {/* Active Hub Details Card */}
                                <div style={{
                                    backgroundColor: "#FFFFFF",
                                    borderRadius: "var(--radius-lg)",
                                    padding: "32px",
                                    border: "1px solid rgba(15, 23, 42, 0.08)",
                                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)"
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                                        <div>
                                            <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7C3AED" }}>
                                                {activeHub.region}
                                            </span>
                                            <h3 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#0F172A", margin: "4px 0 0 0" }}>
                                                {activeHub.name}
                                            </h3>
                                        </div>
                                        <span style={{ fontSize: "0.75rem", fontWeight: 600, padding: "4px 12px", borderRadius: "100px", background: "rgba(124, 58, 237, 0.08)", color: "#7C3AED", border: "1px solid rgba(124, 58, 237, 0.15)" }}>
                                            {activeHub.badge}
                                        </span>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "24px" }}>
                                        <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                                            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(124, 58, 237, 0.08)", color: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                📍
                                            </div>
                                            <div>
                                                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748B", textTransform: "uppercase" }}>Address</div>
                                                <div style={{ fontSize: "0.92rem", color: "#1E293B", fontWeight: 500, lineHeight: "1.5" }}>{activeHub.address}</div>
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                                            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(124, 58, 237, 0.08)", color: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                📞
                                            </div>
                                            <div>
                                                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748B", textTransform: "uppercase" }}>Direct Phone</div>
                                                <a href={`tel:${activeHub.phone}`} style={{ fontSize: "0.92rem", color: "#0F172A", fontWeight: 600, textDecoration: "none" }}>{activeHub.phone}</a>
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                                            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(124, 58, 237, 0.08)", color: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                ✉️
                                            </div>
                                            <div>
                                                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748B", textTransform: "uppercase" }}>Direct Email</div>
                                                <a href={`mailto:${activeHub.email}`} style={{ fontSize: "0.92rem", color: "#7C3AED", fontWeight: 600, textDecoration: "none" }}>{activeHub.email}</a>
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                                            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(124, 58, 237, 0.08)", color: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                🕒
                                            </div>
                                            <div>
                                                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748B", textTransform: "uppercase" }}>Timezone</div>
                                                <div style={{ fontSize: "0.92rem", color: "#1E293B", fontWeight: 500 }}>{activeHub.timezone}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Map Frame */}
                                <div style={{
                                    borderRadius: "var(--radius-lg)",
                                    overflow: "hidden",
                                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                                    border: "1px solid rgba(15, 23, 42, 0.1)",
                                    minHeight: "320px",
                                    flex: 1
                                }}>
                                    <iframe
                                        src={activeHub.mapUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, minHeight: "320px" }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </motion.div>

                            {/* Right Column: Premium Inquiry Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                style={{
                                    padding: "38px",
                                    borderRadius: "var(--radius-lg)",
                                    backgroundColor: "#FFFFFF",
                                    border: "1px solid rgba(15, 23, 42, 0.1)",
                                    boxShadow: "0 20px 45px rgba(15, 23, 42, 0.06)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between"
                                }}
                            >
                                <div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                                        <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#0F172A", margin: 0, fontFamily: "var(--font-display)" }}>
                                            {currentState === "form" ? "Schedule Technical Call" : "Inquiry Submitted"}
                                        </h2>
                                        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#10B981" }}>
                                            ✓ Direct SLA Enabled
                                        </span>
                                    </div>

                                    {currentState === "submitted" ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            style={{ width: "100%" }}
                                        >
                                            {!isValidProduct ? (
                                                <div style={{
                                                    textAlign: "center",
                                                    padding: "32px 24px",
                                                    backgroundColor: "#F8FAFC",
                                                    borderRadius: "16px",
                                                    border: "1px solid rgba(16, 185, 129, 0.3)",
                                                    boxShadow: "0 10px 25px rgba(16, 185, 129, 0.08)"
                                                }}>
                                                    <div style={{
                                                        width: "56px", height: "56px",
                                                        borderRadius: "50%",
                                                        backgroundColor: "rgba(16, 185, 129, 0.12)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        margin: "0 auto 16px",
                                                        color: "#10B981",
                                                    }}>
                                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                    </div>
                                                    <h4 style={{ color: "#0F172A", margin: "0 0 12px 0", fontSize: "1.3rem", fontWeight: 700 }}>
                                                        Thank You for Reaching Out!
                                                    </h4>
                                                    <p style={{ fontSize: "0.92rem", color: "#334155", margin: "0 0 24px 0", lineHeight: "1.6" }}>
                                                        We&apos;ve received your technical inquiry. A senior member of the SAMSAN engineering team will get back to you at <strong style={{ color: "#0F172A" }}>{email}</strong> within 24 hours.
                                                    </p>
                                                    <Link
                                                        href="/"
                                                        className="btn btn-primary"
                                                        style={{
                                                            padding: "12px 28px",
                                                            fontSize: "0.9rem",
                                                            width: "fit-content",
                                                            margin: "0 auto"
                                                        }}
                                                    >
                                                        Return to Home Page
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div style={{
                                                    padding: "28px",
                                                    backgroundColor: "#F8FAFC",
                                                    borderRadius: "16px",
                                                    border: "1px solid rgba(16, 185, 129, 0.3)",
                                                    boxShadow: "0 10px 25px rgba(16, 185, 129, 0.08)"
                                                }}>
                                                    <div style={{
                                                        width: "52px", height: "52px",
                                                        borderRadius: "50%",
                                                        backgroundColor: "rgba(16, 185, 129, 0.12)",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        margin: "0 auto 16px",
                                                        color: "#10B981",
                                                    }}>
                                                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                    </div>
                                                    <h4 style={{ color: "#0F172A", margin: "0 0 8px 0", fontSize: "1.25rem", fontWeight: 700, textAlign: "center" }}>
                                                        Your Brochure Request Is Ready!
                                                    </h4>
                                                    <p style={{ fontSize: "0.88rem", color: "#334155", margin: "0 0 20px 0", lineHeight: "1.5", textAlign: "center" }}>
                                                        Thank you for your interest in <strong style={{ color: "#0F172A" }}>{productDisplayName}</strong>. Access your official brochure below.
                                                    </p>

                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "20px",
                                                        backgroundColor: "#FFFFFF",
                                                        border: "1px solid rgba(15, 23, 42, 0.1)",
                                                        borderRadius: "12px",
                                                        padding: "20px",
                                                        boxShadow: "0 6px 20px rgba(15, 23, 42, 0.05)",
                                                        textAlign: "left"
                                                    }}>
                                                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                                            <div style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                width: "44px",
                                                                height: "44px",
                                                                borderRadius: "8px",
                                                                backgroundColor: "rgba(245, 158, 11, 0.1)",
                                                                color: "#d97706",
                                                                flexShrink: 0
                                                            }}>
                                                                📄
                                                            </div>
                                                            <div>
                                                                <h5 style={{ color: "#0F172A", margin: "0 0 2px 0", fontSize: "0.95rem", fontWeight: 600 }}>
                                                                    {productDisplayName} Technical Brochure
                                                                </h5>
                                                                <p style={{ fontSize: "0.78rem", color: "#64748B", margin: 0 }}>
                                                                    PDF Architecture Document · Ready
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div style={{ display: "flex", gap: "12px", width: "100%" }}>
                                                            <a
                                                                href={`/brochures/${productSlug}.pdf`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="btn btn-outline"
                                                                style={{
                                                                    padding: "10px 14px",
                                                                    fontSize: "0.82rem",
                                                                    flex: 1,
                                                                    justifyContent: "center"
                                                                }}
                                                            >
                                                                View Brochure
                                                            </a>
                                                            <a
                                                                href={`/brochures/${productSlug}.pdf`}
                                                                download={`SAMSAN-${productDisplayName}-Brochure.pdf`}
                                                                className="btn btn-primary"
                                                                style={{
                                                                    padding: "10px 14px",
                                                                    fontSize: "0.82rem",
                                                                    background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                                                                    color: "#ffffff",
                                                                    flex: 1,
                                                                    justifyContent: "center"
                                                                }}
                                                            >
                                                                Download PDF
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                                                        <Link
                                                            href="/products-and-accelerators"
                                                            style={{
                                                                fontSize: "0.85rem",
                                                                color: "#7C3AED",
                                                                textDecoration: "none",
                                                                fontWeight: 600,
                                                                display: "inline-flex",
                                                                alignItems: "center",
                                                                gap: "6px"
                                                            }}
                                                        >
                                                            ← Explore All Accelerators
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    ) : (
                                        <>
                                            {/* Context Banner */}
                                            {isCareers ? (
                                                <div style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "12px",
                                                    padding: "14px 18px",
                                                    backgroundColor: "rgba(124, 58, 237, 0.06)",
                                                    border: "1px solid rgba(124, 58, 237, 0.2)",
                                                    borderRadius: "12px",
                                                    marginBottom: "18px"
                                                }}>
                                                    🎯
                                                    <p style={{ fontSize: "0.85rem", color: "#334155", margin: 0 }}>
                                                        Applying for: <strong style={{ color: "#0F172A" }}>{roleDisplayName || "General Application"}</strong>
                                                    </p>
                                                </div>
                                            ) : isValidProduct ? (
                                                <div style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "12px",
                                                    padding: "14px 18px",
                                                    backgroundColor: "rgba(124, 58, 237, 0.06)",
                                                    border: "1px solid rgba(124, 58, 237, 0.2)",
                                                    borderRadius: "12px",
                                                    marginBottom: "18px"
                                                }}>
                                                    📄
                                                    <p style={{ fontSize: "0.85rem", color: "#334155", margin: 0 }}>
                                                        Unlocking brochure for: <strong style={{ color: "#0F172A" }}>{productDisplayName}</strong>
                                                    </p>
                                                </div>
                                            ) : null}

                                            {/* Discipline Chip Selector */}
                                            <div style={{ marginBottom: "20px" }}>
                                                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                                                    Select Interest Area / Discipline *
                                                </label>
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                                    {INTEREST_OPTIONS.map((opt) => {
                                                        const isSelected = interest === opt.id;
                                                        return (
                                                            <button
                                                                key={opt.id}
                                                                type="button"
                                                                onClick={() => {
                                                                    setInterest(opt.id);
                                                                    if (errors.interest) setErrors(prev => ({ ...prev, interest: "" }));
                                                                }}
                                                                style={{
                                                                    display: "inline-flex",
                                                                    alignItems: "center",
                                                                    gap: "6px",
                                                                    padding: "7px 13px",
                                                                    borderRadius: "100px",
                                                                    border: isSelected ? "1px solid #7C3AED" : "1px solid #E2E8F0",
                                                                    background: isSelected ? "rgba(124, 58, 237, 0.12)" : "#F8FAFC",
                                                                    color: isSelected ? "#7C3AED" : "#475569",
                                                                    fontWeight: isSelected ? 600 : 500,
                                                                    fontSize: "0.82rem",
                                                                    cursor: "pointer",
                                                                    transition: "all 0.2s"
                                                                }}
                                                            >
                                                                <span>{opt.icon}</span>
                                                                <span>{opt.label}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                {errors.interest && (
                                                    <span style={{ color: "#ef4444", fontSize: "0.75rem", display: "block", marginTop: "6px" }}>
                                                        {errors.interest}
                                                    </span>
                                                )}
                                            </div>

                                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                                <input type="hidden" name="product" value={productSlug} />

                                                {/* Full Name */}
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        placeholder="Full Name *"
                                                        value={name}
                                                        onChange={(e) => {
                                                            setName(e.target.value);
                                                            if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                                                        }}
                                                        disabled={submitting}
                                                        style={{
                                                            width: "100%",
                                                            padding: "12px 16px",
                                                            borderRadius: "10px",
                                                            border: errors.name ? "1px solid #ef4444" : "1px solid #CBD5E1",
                                                            backgroundColor: "#F8FAFC",
                                                            fontSize: "0.9rem",
                                                            color: "#0F172A",
                                                            outline: "none",
                                                            boxSizing: "border-box"
                                                        }}
                                                    />
                                                    {errors.name && <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>{errors.name}</span>}
                                                </div>

                                                {/* Work Email & Phone Row */}
                                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                                    <div>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            placeholder="Work Email *"
                                                            value={email}
                                                            onChange={(e) => {
                                                                setEmail(e.target.value);
                                                                if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                                                            }}
                                                            disabled={submitting}
                                                            style={{
                                                                width: "100%",
                                                                padding: "12px 16px",
                                                                borderRadius: "10px",
                                                                border: errors.email ? "1px solid #ef4444" : "1px solid #CBD5E1",
                                                                backgroundColor: "#F8FAFC",
                                                                fontSize: "0.9rem",
                                                                color: "#0F172A",
                                                                outline: "none",
                                                                boxSizing: "border-box"
                                                            }}
                                                        />
                                                        {errors.email && <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>{errors.email}</span>}
                                                    </div>

                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="company"
                                                            placeholder="Company / Org *"
                                                            value={company}
                                                            onChange={(e) => {
                                                                setCompany(e.target.value);
                                                                if (errors.company) setErrors(prev => ({ ...prev, company: "" }));
                                                            }}
                                                            disabled={submitting}
                                                            style={{
                                                                width: "100%",
                                                                padding: "12px 16px",
                                                                borderRadius: "10px",
                                                                border: errors.company ? "1px solid #ef4444" : "1px solid #CBD5E1",
                                                                backgroundColor: "#F8FAFC",
                                                                fontSize: "0.9rem",
                                                                color: "#0F172A",
                                                                outline: "none",
                                                                boxSizing: "border-box"
                                                            }}
                                                        />
                                                        {errors.company && <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>{errors.company}</span>}
                                                    </div>
                                                </div>

                                                {/* Phone Number */}
                                                <div>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        placeholder="Phone Number (Optional)"
                                                        value={phone}
                                                        onChange={(e) => {
                                                            setPhone(e.target.value);
                                                            if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
                                                        }}
                                                        disabled={submitting}
                                                        style={{
                                                            width: "100%",
                                                            padding: "12px 16px",
                                                            borderRadius: "10px",
                                                            border: errors.phone ? "1px solid #ef4444" : "1px solid #CBD5E1",
                                                            backgroundColor: "#F8FAFC",
                                                            fontSize: "0.9rem",
                                                            color: "#0F172A",
                                                            outline: "none",
                                                            boxSizing: "border-box"
                                                        }}
                                                    />
                                                    {errors.phone && <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>{errors.phone}</span>}
                                                </div>

                                                {/* Message */}
                                                <div>
                                                    <textarea
                                                        name="message"
                                                        placeholder="Describe your engineering project or inquiry (minimum 10 characters) *"
                                                        rows={4}
                                                        value={message}
                                                        onChange={(e) => {
                                                            setMessage(e.target.value);
                                                            if (errors.message) setErrors(prev => ({ ...prev, message: "" }));
                                                        }}
                                                        disabled={submitting}
                                                        style={{
                                                            width: "100%",
                                                            padding: "12px 16px",
                                                            borderRadius: "10px",
                                                            border: errors.message ? "1px solid #ef4444" : "1px solid #CBD5E1",
                                                            backgroundColor: "#F8FAFC",
                                                            fontSize: "0.9rem",
                                                            color: "#0F172A",
                                                            outline: "none",
                                                            resize: "none",
                                                            boxSizing: "border-box"
                                                        }}
                                                    />
                                                    {errors.message && <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>{errors.message}</span>}
                                                </div>

                                                {/* Submit Button */}
                                                <motion.button
                                                    whileHover={{ scale: 1.02, boxShadow: "0 8px 25px rgba(124, 58, 237, 0.35)" }}
                                                    whileTap={{ scale: 0.98 }}
                                                    type="submit"
                                                    disabled={submitting}
                                                    style={{
                                                        padding: "14px 28px",
                                                        borderRadius: "100px",
                                                        border: "none",
                                                        background: "linear-gradient(135deg, #7C3AED, #C084FC)",
                                                        color: "#ffffff",
                                                        fontWeight: 600,
                                                        fontSize: "0.95rem",
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        gap: "8px",
                                                        boxShadow: "0 4px 14px rgba(124, 58, 237, 0.25)"
                                                    }}
                                                >
                                                    {submitting ? "Processing Inquiry..." : "Schedule Technical Consultation →"}
                                                </motion.button>
                                            </form>
                                        </>
                                    )}
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </section>
            </div>

            {/* ── Section 4: Direct Leadership & SLA Guarantee Strip (section-dark) ── */}
            <div className="section-dark">
                <section style={{ padding: "88px 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="container">
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                            gap: "28px"
                        }}>
                            <div style={{
                                padding: "30px",
                                borderRadius: "16px",
                                background: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.08)"
                            }}>
                                <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "8px" }}>
                                    🏛️ Pune R&D Delivery HQ
                                </div>
                                <p style={{ fontSize: "0.92rem", color: "#94A3B8", lineHeight: "1.6", margin: 0 }}>
                                    STPI New Building, Phase I, Hinjawadi. Engineering house for Cockpit, ADAS, and SDV solutions.
                                </p>
                            </div>

                            <div style={{
                                padding: "30px",
                                borderRadius: "16px",
                                background: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.08)"
                            }}>
                                <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "8px" }}>
                                    ⚡ 24-Hour SLA Response
                                </div>
                                <p style={{ fontSize: "0.92rem", color: "#94A3B8", lineHeight: "1.6", margin: 0 }}>
                                    Direct communication channel to senior leadership via <a href="mailto:india@samsanlabs.com" style={{ color: "#A78BFA", fontWeight: 600 }}>india@samsanlabs.com</a>.
                                </p>
                            </div>

                            <div style={{
                                padding: "30px",
                                borderRadius: "16px",
                                background: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.08)"
                            }}>
                                <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "8px" }}>
                                    🌍 Global Integration Tracks
                                </div>
                                <p style={{ fontSize: "0.92rem", color: "#94A3B8", lineHeight: "1.6", margin: 0 }}>
                                    Active customer programs &amp; partner presence across Europe, North America, Japan, and South Korea.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default function ContactPage() {
    return (
        <Suspense fallback={<div style={{ backgroundColor: "var(--midnight)", minHeight: "100vh" }} />}>
            <ContactPageContent />
        </Suspense>
    );
}
