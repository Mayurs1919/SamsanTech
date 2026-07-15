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
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            padding: "5px 11px",
            fontSize: "12px",
            color: "var(--text-secondary)",
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
                <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", flexShrink: 0 }}>
                    {chip.icon}
                </span>
            )}
            <span style={{ color: "var(--text-secondary)" }}>{chip.label}</span>
        </span>
    );
}

const productImages: Record<string, string> = {
    "vemeego": "/images/vemeego.png",
    "pikniknow": "/images/pikniknow.jpg",
    "twinlnk": "/images/twinlink.png",
    "maestro": "/images/maestro.png",
    "automate-ai": "/images/automate.png"
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
            style={{
                transitionDelay: shouldReduce ? "0s" : `${idx * 0.1}s`
            }}
        >
            <div className={`card ${flipped ? "flipped" : ""}`}>
                {/* FRONT FACE */}
                <div
                    className="card-front"
                    style={{
                        background: "rgba(13, 19, 35, 0.55)",
                        border: "1px solid var(--border)",
                        borderRadius: "16px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "28px 24px",
                        position: "absolute",
                        inset: 0,
                        backdropFilter: "blur(12px)",
                        overflow: "hidden"
                    }}
                >
                    {/* IMAGE or ICON */}
                    {productImg ? (
                        <div style={{ width: "100%", flex: "1 1 auto", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0, padding: "10px" }}>
                            <img
                                src={productImg}
                                alt={prod.title}
                                style={{
                                    maxWidth: "95%",
                                    maxHeight: "200px",
                                    width: "auto",
                                    height: "auto",
                                    objectFit: "contain",
                                    display: "block",
                                    filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.35))"
                                }}
                            />
                        </div>
                    ) : (
                        <div style={{ width: "96px", height: "96px", borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center", background: `rgba(${rgbStr}, 0.12)`, border: `1px solid rgba(${rgbStr}, 0.3)`, flexShrink: 0, marginBottom: "16px" }}>
                            {clonedIcon}
                        </div>
                    )}

                    {/* Divider */}
                    <div style={{ width: "75%", height: "1px", background: `linear-gradient(90deg, transparent, rgba(${rgbStr}, 0.45), transparent)`, margin: "12px 0 16px", flexShrink: 0 }} />

                    {/* Product name — ALL CAPS */}
                    <h3 style={{ fontSize: "0.85rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center", lineHeight: 1.4, fontFamily: "'Inter', system-ui, sans-serif", margin: 0, flexShrink: 0, background: `linear-gradient(135deg, #ffffff 60%, rgba(${rgbStr}, 0.95))`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        {prod.title}
                    </h3>
                </div>

                <div
                    className="card-back"
                    style={{
                        background: `linear-gradient(145deg, rgba(${rgbStr}, 0.08) 0%, rgba(13, 19, 35, 0.55) 40%)`,
                        border: `1px solid rgba(${rgbStr}, 0.35)`,
                        borderRadius: "16px",
                        display: "flex",
                        flexDirection: "column",
                        padding: "22px 20px",
                        gap: "10px",
                        backdropFilter: "blur(12px)",
                        overflowY: "hidden"
                    }}
                >
                    {/* A) DESCRIPTION */}
                    <p
                        style={{
                            fontSize: "0.82rem",
                            lineHeight: 1.55,
                            color: "var(--text-secondary)",
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
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px", flexShrink: 0 }}>
                        <span
                            style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "9px",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                color: "var(--text-muted)",
                                display: "block"
                            }}
                        >
                            Technologies
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
                            marginTop: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            width: "100%",
                            flexShrink: 0,
                            paddingTop: "4px"
                        }}
                    >
                        <Link
                            href={`/contact?product=${prod.id}`}
                            className="btn btn-primary"
                            style={{ width: "100%", justifyContent: "center", padding: "10px 16px", fontSize: "0.88rem" }}
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
                                style={{ width: "100%", justifyContent: "center", display: "flex", alignItems: "center", gap: "8px", padding: "9px 16px", fontSize: "0.88rem" }}
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
        description: "Advanced Driver Monitoring System (DMS) with real-time facial expression tracking to detect drowsiness and distraction — enhancing driving safety proactively.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20v-1a8 8 0 0 1 16 0v1" />
                <path d="M9 11l3 3 3-3" />
            </svg>
        ),
        techs: [
            { label: "OpenCV", logoUrl: Logos.opencv },
            { label: "TensorFlow", logoUrl: Logos.tensorflow },
            { label: "Kotlin", logoUrl: Logos.kotlin },
            { label: "CAN Bus", isBadge: true },
            { label: "HMI", isBadge: true },
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
    { value: "8+", label: "Industry Verticals" },
    { value: "100%", label: "On-Time Delivery" }
];

export default function SolutionsPage() {
    const shouldReduce = useReducedMotion();

    return (
        <div style={{ paddingBottom: "0" }}>

            {/* ── Page Hero ── */}
            <section className="page-hero" aria-labelledby="solutions-heading" style={{ paddingBottom: "100px" }}>
                <div className="container">
                    <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible">
                        <motion.div variants={fadeUpVariants(shouldReduce)}>
                            <span className="badge" style={{ marginBottom: "24px" }}>Products &amp; Accelerators</span>
                        </motion.div>
                        <motion.h1 id="solutions-heading" variants={fadeUpVariants(shouldReduce)} style={{ marginBottom: "20px" }}>
                            SAMSAN Products &amp; Accelerators
                        </motion.h1>
                        <motion.p className="lead" variants={fadeUpVariants(shouldReduce)} style={{ maxWidth: "620px" }}>
                            Production-proven solutions across automotive embedded, IoT, and digital platforms. From concept to deployment — engineered for reliability, safety, and scale.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── Stats Bar ── */}
            <section style={{
                borderTop: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
                background: "rgba(10,15,28,0.4)",
                padding: "48px 0"
            }}>
                <div className="container">
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px", textAlign: "center" }}
                    >
                        {stats.map((s, i) => (
                            <motion.div key={i} variants={fadeUpVariants(shouldReduce)}>
                                <div style={{
                                    fontSize: "2.8rem", fontWeight: 800,
                                    background: "linear-gradient(135deg, var(--violet-mid), var(--mint))",
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                    lineHeight: 1.1, marginBottom: "8px"
                                }}>{s.value}</div>
                                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", letterSpacing: "0.04em" }}>{s.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Product Cards Grid ── */}
            <section className="section">
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "64px" }}>
                        <span className="badge" style={{ marginBottom: "16px" }}>Our Portfolio</span>
                        <h2 style={{ fontSize: "2.2rem", marginBottom: "16px" }}>9 Products &amp; Accelerators</h2>
                        <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", lineHeight: "1.7" }}>
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

            {/* ── CTA ── */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-inner">
                        <h2>Need a custom solution?</h2>
                        <p>Our engineering teams can design, build, and deploy tailored systems for your specific requirements.</p>
                        <div className="cta-actions">
                            <Link href="/contact" className="btn btn-primary">Evaluate SAMSAN Accelerators</Link>
                            <Link href="/services" className="btn btn-outline">View Engineering Offerings</Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
