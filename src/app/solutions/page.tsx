"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";
import ServiceCard, { Logos, WifiIcon, BluetoothIcon, MqttIcon, type TechChip } from "@/components/ui/ServiceCard";

function getCardColor(title: string) {
    if (title.startsWith("Digital Cockpit")) return "#4DD8E8";
    if (title.startsWith("TwinLnk")) return "#FF8A3D";
    if (title.startsWith("TCU")) return "#8B5CF6";
    if (title.startsWith("DMS Edge")) return "#22C55E";
    if (title.startsWith("Maestro")) return "#4DD8E8";
    if (title.startsWith("AutoMATE")) return "#FF8A3D";
    if (title.startsWith("CabinIQ")) return "#8B5CF6";
    if (title.startsWith("Vemeego")) return "#22C55E";
    if (title.startsWith("PiknikNow")) return "#FFC83D";
    return "#4DD8E8";
}

function getRgbString(color: string) {
    if (color === "#4DD8E8") return "77, 216, 232";
    if (color === "#FF8A3D") return "255, 138, 61";
    if (color === "#8B5CF6") return "139, 92, 246";
    if (color === "#22C55E") return "34, 197, 94";
    if (color === "#FFC83D") return "255, 200, 61";
    return "77, 216, 232";
}

function TechChipItem({ chip }: { chip: TechChip }) {
    const [imgError, setImgError] = useState(false);

    return (
        <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "20px",
            padding: "5px 11px",
            fontSize: "12px",
            color: "#CBD5E1",
            fontFamily: "var(--font-body)",
            whiteSpace: "nowrap"
        }}>
            {chip.logoUrl && !imgError && (
                <img
                    src={chip.logoUrl}
                    alt={chip.label}
                    height={16}
                    style={{ width: "auto", height: "16px", display: "block", flexShrink: 0 }}
                    onError={() => setImgError(true)}
                />
            )}
            {chip.icon && (
                <span style={{ color: "#94A3B8", display: "flex", alignItems: "center", flexShrink: 0 }}>
                    {chip.icon}
                </span>
            )}
            <span style={{ color: "#CBD5E1" }}>{chip.label}</span>
        </span>
    );
}

const productImages: Record<string, string> = {
    "digital-cockpit-solution": "/images/digital_cockpit.png",
    "vemeego": "/images/vemeego.png",
    "pikniknow": "/images/pikniknow.jpg",
    "twinlnk": "/images/twinlink.png",
    "maestro": "/images/maestro.png",
    "automate-ai": "/images/automate.png",
    "dms-edge": "/images/driver-health.png",
    "cabiniq": "/images/cabiniq.png"
};

function ProductFlipCard({
    prod,
    idx,
    shouldReduce
}: {
    prod: any;
    idx: number;
    shouldReduce: boolean;
}) {
    const [flipped, setFlipped] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (shouldReduce) {
            setIsVisible(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (sceneRef.current) {
            observer.observe(sceneRef.current);
        }
        return () => observer.disconnect();
    }, [shouldReduce]);

    const iconColor = getCardColor(prod.title);
    const rgbStr = getRgbString(iconColor);

    const clonedIcon = React.cloneElement(prod.icon, {
        width: 44,
        height: 44,
        stroke: iconColor,
        strokeWidth: 1.5,
        fill: "none"
    });

    const brochurePath = (prod as { brochurePath?: string }).brochurePath;
    const productImg = productImages[prod.id];

    return (
        <div
            ref={sceneRef}
            className={`scene ${isVisible ? "visible" : ""}`}
            onClick={() => setFlipped(!flipped)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                transitionDelay: shouldReduce ? "0s" : `${idx * 0.1}s`
            }}
        >
            <div className={`card ${flipped ? "flipped" : ""}`}>
                {/* FRONT FACE */}
                <div
                    className="card-front"
                    style={{
                        background: "#0D1117",
                        border: `1px solid ${hovered ? `rgba(${rgbStr}, 0.6)` : "rgba(255, 255, 255, 0.12)"}`,
                        borderRadius: "16px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "28px 24px",
                        position: "absolute",
                        inset: 0,
                        overflow: "hidden",
                        boxShadow: hovered ? `0 20px 48px rgba(${rgbStr}, 0.25)` : "0 8px 32px rgba(0,0,0,0.3)",
                        transition: "all 0.3s ease"
                    }}
                >
                    {/* Card number */}
                    <span style={{
                        position: "absolute",
                        top: "16px",
                        right: "20px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        color: "rgba(255, 255, 255, 0.3)",
                        letterSpacing: "0.1em",
                        fontWeight: 600
                    }}>
                        {prod.number}
                    </span>

                    {/* IMAGE or ICON — constrained so title always fits */}
                    {productImg ? (
                        <div style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "8px 10px",
                            flexShrink: 1,
                            minHeight: 0
                        }}>
                            <img
                                src={productImg}
                                alt={prod.title}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "160px",
                                    width: "auto",
                                    height: "auto",
                                    objectFit: "contain",
                                    display: "block",
                                    filter: "drop-shadow(0 4px 20px rgba(0, 0, 0, 0.6))"
                                }}
                            />
                        </div>
                    ) : (
                        <div style={{
                            width: "88px",
                            height: "88px",
                            borderRadius: "22px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: `rgba(${rgbStr}, 0.12)`,
                            border: `1px solid rgba(${rgbStr}, 0.35)`,
                            flexShrink: 0,
                            marginBottom: "8px"
                        }}>
                            {clonedIcon}
                        </div>
                    )}

                    {/* Divider */}
                    <div style={{
                        width: "70%",
                        height: "1px",
                        background: `linear-gradient(90deg, transparent, rgba(${rgbStr}, 0.5), transparent)`,
                        margin: "10px 0 12px",
                        flexShrink: 0
                    }} />

                    {/* Product name — always visible, crisp white */}
                    <h3 style={{
                        fontSize: "0.92rem",
                        fontWeight: 800,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        textAlign: "center",
                        lineHeight: 1.3,
                        fontFamily: "var(--font-display)",
                        margin: 0,
                        flexShrink: 0,
                        color: "#FFFFFF",
                        textShadow: "0 1px 8px rgba(0,0,0,0.6)",
                        padding: "0 8px"
                    }}>
                        {prod.title}
                    </h3>

                    {/* Hover hint */}
                    <span style={{
                        fontSize: "10px",
                        fontFamily: "var(--font-mono)",
                        color: `rgba(${rgbStr}, 0.8)`,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        marginTop: "8px",
                        flexShrink: 0
                    }}>
                        Click to explore →
                    </span>
                </div>

                {/* BACK FACE */}
                <div
                    className="card-back"
                    style={{
                        background: "#0D1117",
                        border: `1px solid rgba(255, 255, 255, 0.12)`,
                        borderRadius: "16px",
                        display: "flex",
                        flexDirection: "column",
                        padding: "22px 20px",
                        gap: "14px",
                        overflowY: "hidden"
                    }}
                >
                    {/* TOP ACCENT PRODUCT NAME */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
                        <h4 style={{ color: iconColor, fontSize: "0.88rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", margin: 0, fontFamily: "var(--font-display)" }}>
                            {prod.title}
                        </h4>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "rgba(255, 255, 255, 0.4)" }}>
                            {prod.number}
                        </span>
                    </div>

                    {/* A) DESCRIPTION */}
                    <p
                        style={{
                            fontSize: "0.82rem",
                            lineHeight: 1.55,
                            color: "#CBD5E1",
                            margin: 0,
                            flexShrink: 1,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 5,
                            WebkitBoxOrient: "vertical"
                        }}
                    >
                        {prod.description}
                    </p>

                    {/* B) TECHNOLOGIES */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", flexShrink: 0, marginTop: "auto" }}>
                        <span
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "9px",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "#94A3B8",
                                display: "block"
                            }}
                        >
                            TECHNOLOGIES
                        </span>

                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "5px"
                            }}
                        >
                            {prod.techs.map((chip: any, i: number) => (
                                <TechChipItem key={i} chip={chip} />
                            ))}
                        </div>
                    </div>

                    {/* C) BUTTONS */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            width: "100%",
                            flexShrink: 0,
                            paddingTop: "6px"
                        }}
                    >
                        <Link
                            href={`/contact?product=${prod.id}`}
                            className="btn btn-primary"
                            style={{ width: "100%", justifyContent: "center", padding: "10px 16px", fontSize: "0.88rem", background: "#E8521A", color: "#FFFFFF" }}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            Contact For More
                        </Link>
                        {brochurePath && (
                            <a
                                href={brochurePath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline"
                                style={{ width: "100%", justifyContent: "center", display: "flex", alignItems: "center", gap: "8px", padding: "9px 16px", fontSize: "0.88rem", background: "transparent", color: "#FFFFFF", border: "1px solid rgba(255, 255, 255, 0.2)" }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                Download Brochure
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Product card definitions ─────────────────────────────────────
const products = [
    {
        id: "digital-cockpit-solution",
        number: "01",
        iconColor: "#06B6D4",
        title: "Digital Cockpit Solution",
        description: "World-class Intelligent Cockpit Solutions for Global OEMs and Tier-1 suppliers — integrating Instrument Clusters, Infotainment, Telematics, Smart Mirrors, HUDs, and Navigation into one seamless eCockpit.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2" />
                <path d="M6 21h12M12 17v4" />
            </svg>
        ),
        techs: [
            { label: "Android", logoUrl: Logos.android },
            { label: "QNX", isBadge: true },
            { label: "Linux", logoUrl: Logos.linux },
            { label: "HMI", isBadge: true },
            { label: "Bluetooth", icon: <BluetoothIcon /> },
            { label: "Wi-Fi", icon: <WifiIcon /> },
            { label: "OTA", isBadge: true },
        ] as TechChip[]
    },
    {
        id: "twinlnk",
        number: "02",
        iconColor: "#F59E0B",
        title: "TwinLnk™",
        description: "An intelligent telematics and IoT gateway platform enabling secure, seamless data flow between edge devices and cloud applications — built for automotive, industrial, and infrastructure environments.",
        brochurePath: "/brochures/TwinLnk%20-%20Product%20Brochure.pdf",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M20 12l-8-8-8 8" />
            </svg>
        ),
        techs: [
            { label: "MQTT", icon: <MqttIcon /> },
            { label: "AWS", logoUrl: Logos.aws },
            { label: "GNSS", isBadge: true },
            { label: "CAN Bus", isBadge: true },
            { label: "OTA", isBadge: true },
            { label: "Edge AI", isBadge: true },
        ] as TechChip[]
    },
    {
        id: "tcu",
        number: "03",
        iconColor: "#10B981",
        title: "TCU (Telematics Control Unit)",
        description: "Cutting-edge connectivity and vehicle data solutions enabling real-time monitoring, remote diagnostics, and seamless communication between vehicles and backend systems.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
            </svg>
        ),
        techs: [
            { label: "GPS", isBadge: true },
            { label: "4G/LTE", isBadge: true },
            { label: "CAN Bus", isBadge: true },
            { label: "AWS", logoUrl: Logos.aws },
            { label: "IoT", isBadge: true },
        ] as TechChip[]
    },
    {
        id: "dms-edge",
        number: "04",
        iconColor: "#EF4444",
        title: "DMS Edge",
        description: "AI-based Driver Monitoring System combines facial recognition, gaze tracking, and behavioural analytics to deliver intelligent in-cabin safety monitoring. The solution provides real-time event detection and actionable insights for next-generation connected vehicles.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 5v2M12 17v2M5 12H3M21 12h-2" strokeWidth="1.5" />
            </svg>
        ),
        techs: [
            { label: "OpenCV", logoUrl: Logos.opencv },
            { label: "TensorFlow", logoUrl: Logos.tensorflow },
            { label: "Python", isBadge: true },
            { label: "Gaze Tracking", isBadge: true },
            { label: "ADAS", isBadge: true },
        ] as TechChip[]
    },
    {
        id: "maestro",
        number: "05",
        iconColor: "#8B5CF6",
        title: "Maestro™",
        description: "Unifies devices from different vendors — vehicle cameras, building management systems, and industrial sensors — into a single operational dashboard, managed end-to-end by SAMSAN.",
        brochurePath: "/brochures/Maestro%20Standee%20TRL-7%204.png",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
            </svg>
        ),
        techs: [
            { label: "AWS", logoUrl: Logos.aws },
            { label: "Docker", logoUrl: Logos.docker },
            { label: "MQTT", isBadge: true },
            { label: "IoT", isBadge: true },
            { label: "Dashboard", isBadge: true },
        ] as TechChip[]
    },
    {
        id: "automate-ai",
        number: "06",
        iconColor: "#EC4899",
        title: "AutoMATE.ai",
        description: "Contextual, voice-based AI assistant integrated directly into the vehicle cockpit — providing intelligent access to vehicle functionalities, e-manuals, and diagnostics through natural language interaction.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
            </svg>
        ),
        techs: [
            { label: "GenAI", isBadge: true },
            { label: "NLP", isBadge: true },
            { label: "Voice AI", isBadge: true },
            { label: "Android", logoUrl: Logos.android },
            { label: "Cockpit", isBadge: true },
        ] as TechChip[]
    },
    {
        id: "cabiniq",
        number: "07",
        iconColor: "#06B6D4",
        title: "CabinIQ™",
        description: "A modular, AI-powered in-cabin intelligence platform unifying Driver Monitoring (DMS), Occupant Monitoring (OMS), Health Monitoring, and Mood-Based Personalization.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
        ),
        techs: [
            { label: "OpenCV", logoUrl: Logos.opencv },
            { label: "TensorFlow", logoUrl: Logos.tensorflow },
            { label: "DMS", isBadge: true },
            { label: "OMS", isBadge: true },
            { label: "AI Cabin", isBadge: true },
        ] as TechChip[]
    },
    {
        id: "vemeego",
        number: "08",
        iconColor: "#8B5CF6",
        title: "Vemeego",
        description: "An intelligent workspace and video conferencing platform built for enhanced remote and corporate collaboration — going beyond basic video calling to deliver a rich, structured digital workspace.",
        brochurePath: "/brochures/VeMee%20Flayer.png",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        techs: [
            { label: "React", logoUrl: Logos.react },
            { label: "Node.js", logoUrl: Logos.nodejs },
            { label: "WebRTC", isBadge: true },
            { label: "Make in India", isBadge: true },
        ] as TechChip[]
    },
    {
        id: "pikniknow",
        number: "09",
        iconColor: "#10B981",
        title: "PiknikNow",
        description: "Discover unique picnic spots nearby, share travel stories with fellow explorers, and plan adventures to hidden destinations.",
        brochurePath: "/brochures/PIKNIKNOW_BROUCHER.pdf",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
        techs: [
            { label: "Flutter", logoUrl: Logos.flutter },
            { label: "Firebase", logoUrl: Logos.firebase },
            { label: "Maps API", isBadge: true },
            { label: "Social", isBadge: true },
        ] as TechChip[]
    },
];

const stats = [
    { value: "9+", label: "Products & Accelerators" },
    { value: "Global", label: "OEM/Tier-1 Engagements" },
    { value: "8+", label: "Industry Verticals" }
];

export default function SolutionsPage() {
    const shouldReduce = useReducedMotion();

    return (
        <div style={{ paddingBottom: "0" }}>

            {/* ── Page Hero (Dark Theme Upper Part) ── */}
            <section className="section-dark page-hero" aria-labelledby="solutions-heading" style={{ background: "#0A0D11", padding: "80px 0 60px" }}>
                <div className="container">
                    <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible">
                        <motion.div variants={fadeUpVariants(shouldReduce)}>
                            <span className="badge" style={{ marginBottom: "24px", color: "#4DD8E8", background: "rgba(77, 216, 232, 0.08)", border: "1px solid rgba(77, 216, 232, 0.2)" }}>
                                Products &amp; Accelerators
                            </span>
                        </motion.div>
                        <motion.h1 id="solutions-heading" variants={fadeUpVariants(shouldReduce)} style={{ marginBottom: "20px", color: "#FFFFFF" }}>
                            SAMSAN Products &amp; Accelerators
                        </motion.h1>
                        <motion.p className="lead" variants={fadeUpVariants(shouldReduce)} style={{ maxWidth: "620px", color: "#94A3B8" }}>
                            Production-proven solutions across automotive embedded, IoT, and digital platforms. From concept to deployment — engineered for reliability, safety, and scale.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── Stats Bar (Dark Theme Upper Part) ── */}
            <section className="section-dark" style={{
                borderTop: "1px solid rgba(255,255,255,0.07)",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                background: "#0D1117",
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
                        {stats.map((s, i) => (
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

            {/* ── Product Cards Grid (Light Theme starting from Products & Accelerators down to footer) ── */}
            <section className="section-light section" style={{ background: "#F8FAFC", borderTop: "1px solid #E2E8F0", padding: "80px 0" }}>
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "64px" }}>
                        <span className="badge" style={{ marginBottom: "16px", color: "#E8521A", background: "rgba(232, 82, 26, 0.08)", border: "1px solid rgba(232, 82, 26, 0.2)" }}>
                            Our Portfolio
                        </span>
                        <h2 style={{ fontSize: "2.2rem", marginBottom: "16px", color: "#0B1320" }}>9 Products &amp; Accelerators</h2>
                        <p style={{ color: "#64748B", maxWidth: "600px", margin: "0 auto", lineHeight: "1.7" }}>
                            Each product is backed by deep domain expertise, production-grade engineering, and a relentless focus on quality. Contact us for a brochure or discovery call.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {products.map((prod, idx) => (
                            <div key={prod.id} className="col-span-1">
                                <ProductFlipCard
                                    prod={prod}
                                    idx={idx}
                                    shouldReduce={!!shouldReduce}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA (Light Theme) ── */}
            <section className="section-light cta-section" style={{ background: "#FFFFFF", borderTop: "1px solid #E2E8F0", padding: "80px 0" }}>
                <div className="container">
                    <div className="cta-inner">
                        <h2 style={{ color: "#FFFFFF" }}>Need a custom solution?</h2>
                        <p style={{ color: "#CBD5E1" }}>Our engineering teams can design, build, and deploy tailored systems for your specific requirements.</p>
                        <div className="cta-actions">
                            <Link href="/contact" className="btn btn-primary" style={{ background: "#E8521A", color: "#FFFFFF" }}>Evaluate SAMSAN Accelerators</Link>
                            <Link href="/services" className="btn btn-outline" style={{ border: "1px solid rgba(255, 255, 255, 0.2)", color: "#FFFFFF", background: "transparent" }}>View Engineering Offerings</Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
