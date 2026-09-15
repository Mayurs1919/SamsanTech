"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";
import ServiceCard, { Logos, WifiIcon, BluetoothIcon, MqttIcon, type TechChip } from "@/components/ui/ServiceCard";

function getCardColor(title: string) {
    if (title.startsWith("Digital Cockpit")) return "#06B6D4";
    if (title.startsWith("TwinLnk")) return "#FF8A3D";
    if (title.startsWith("DMS Edge")) return "#EF4444";
    if (title.startsWith("Maestro")) return "#8B5CF6";
    if (title.startsWith("AutoMATE")) return "#EC4899";
    if (title.startsWith("CabinIQ")) return "#06B6D4";
    if (title.startsWith("Vemeego")) return "#8B5CF6";
    if (title.startsWith("PiknikNow")) return "#10B981";
    return "#06B6D4";
}

function getRgbString(color: string) {
    if (color === "#06B6D4") return "6, 182, 212";
    if (color === "#FF8A3D") return "255, 138, 61";
    if (color === "#8B5CF6") return "139, 92, 246";
    if (color === "#EF4444") return "239, 68, 68";
    if (color === "#EC4899") return "236, 72, 153";
    if (color === "#10B981") return "16, 185, 129";
    return "6, 182, 212";
}

function TechChipItem({ chip }: { chip: TechChip }) {
    const [imgError, setImgError] = useState(false);

    return (
        <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: "#F1F5F9",
            border: "1px solid #E2E8F0",
            borderRadius: "100px",
            padding: "4px 10px",
            fontSize: "11px",
            fontWeight: 500,
            color: "#334155",
            fontFamily: "var(--font-mono)",
            whiteSpace: "nowrap"
        }}>
            {chip.logoUrl && !imgError && (
                <img
                    src={chip.logoUrl}
                    alt={chip.label}
                    height={14}
                    style={{ width: "auto", height: "14px", display: "block", flexShrink: 0 }}
                    onError={() => setImgError(true)}
                />
            )}
            {chip.icon && (
                <span style={{ color: "#64748B", display: "flex", alignItems: "center", flexShrink: 0 }}>
                    {chip.icon}
                </span>
            )}
            <span>{chip.label}</span>
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

interface ProductItem {
    id: string;
    number: string;
    category: string;
    categoryLabel: string;
    title: string;
    description: string;
    highlights: string[];
    icon: React.ReactElement;
    techs: TechChip[];
    brochurePath?: string;
}

function ProductCard({
    prod,
    idx,
    shouldReduce,
    onPreviewBrochure,
    onPreviewVideo
}: {
    prod: ProductItem;
    idx: number;
    shouldReduce: boolean;
    onPreviewBrochure?: (brochurePath: string, title: string) => void;
    onPreviewVideo?: (videoPath: string, title: string) => void;
}) {
    const [flipped, setFlipped] = useState(false);
    const [hovered, setHovered] = useState(false);
    const accentColor = getCardColor(prod.title);
    const rgbStr = getRgbString(accentColor);
    const productImg = productImages[prod.id];

    const clonedIcon = React.cloneElement(prod.icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, {
        width: 32,
        height: 32,
        stroke: accentColor,
        strokeWidth: 1.75,
        fill: "none"
    });

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: shouldReduce ? 0 : idx * 0.05 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                perspective: "1000px",
                height: "100%"
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    minHeight: "520px",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    borderRadius: "20px"
                }}
            >
                {/* ── FRONT FACE ── */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        background: "#FFFFFF",
                        border: hovered ? `1px solid rgba(${rgbStr}, 0.5)` : "1px solid rgba(15, 23, 42, 0.08)",
                        borderRadius: "20px",
                        padding: "28px 24px",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: hovered
                            ? `0 20px 40px -12px rgba(${rgbStr}, 0.2), 0 8px 16px -8px rgba(15, 23, 42, 0.08)`
                            : "0 4px 20px rgba(15, 23, 42, 0.05)",
                        transition: "border 0.3s ease, box-shadow 0.3s ease",
                        overflow: "hidden"
                    }}
                >
                    {/* Top Header Row */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginBottom: "18px" }}>
                        <span style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#94A3B8"
                        }}>
                            {prod.number}
                        </span>
                    </div>

                    {/* Product Image / Icon Banner */}
                    {(() => {
                        const isLightImage = ["twinlnk", "maestro", "vemeego", "cabiniq"].includes(prod.id);
                        return (
                            <div style={{
                                width: "100%",
                                height: "160px",
                                borderRadius: "14px",
                                background: productImg
                                    ? (isLightImage ? "#FFFFFF" : "#0F172A")
                                    : `rgba(${rgbStr}, 0.05)`,
                                border: productImg
                                    ? (isLightImage ? "1px solid #E2E8F0" : "1px solid rgba(255,255,255,0.08)")
                                    : `1px solid rgba(${rgbStr}, 0.15)`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: "20px",
                                padding: "8px 12px",
                                overflow: "hidden",
                                position: "relative"
                            }}>
                                {productImg ? (
                                    <img
                                        src={productImg}
                                        alt={prod.title}
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "144px",
                                            width: "auto",
                                            height: "auto",
                                            objectFit: "contain",
                                            filter: isLightImage ? "none" : "drop-shadow(0 8px 16px rgba(0,0,0,0.5))"
                                        }}
                                    />
                                ) : (
                                    <div style={{
                                        width: "64px",
                                        height: "64px",
                                        borderRadius: "16px",
                                        background: "#FFFFFF",
                                        border: `1px solid rgba(${rgbStr}, 0.25)`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        boxShadow: `0 8px 24px rgba(${rgbStr}, 0.15)`
                                    }}>
                                        {clonedIcon}
                                    </div>
                                )}
                            </div>
                        );
                    })()}

                    {/* Title */}
                    <h3 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        color: "#0F172A",
                        lineHeight: 1.3,
                        marginBottom: "10px"
                    }}>
                        {prod.title}
                    </h3>

                    {/* Description */}
                    <p style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9rem",
                        lineHeight: 1.65,
                        color: "#475569",
                        marginBottom: "20px",
                        flexGrow: 1
                    }}>
                        {prod.description}
                    </p>

                    {/* Tech Stack Chips */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
                        {prod.techs.slice(0, 5).map((chip, i) => (
                            <TechChipItem key={i} chip={chip} />
                        ))}
                        {prod.techs.length > 5 && (
                            <span style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "10px",
                                color: "#64748B",
                                alignSelf: "center",
                                paddingLeft: "2px"
                            }}>
                                +{prod.techs.length - 5} more
                            </span>
                        )}
                    </div>

                    {/* Bottom Action Row */}
                    <div style={{ display: "flex", gap: "8px", marginTop: "auto", flexWrap: "nowrap" }}>
                        <button
                            type="button"
                            onClick={() => setFlipped(true)}
                            title="Turn card for Technical Specs"
                            aria-label="Turn card for Technical Specs"
                            style={{
                                flex: "1 1 30%",
                                padding: "10px 8px",
                                borderRadius: "8px",
                                background: "#F1F5F9",
                                border: "1px solid #CBD5E1",
                                color: "#0F172A",
                                fontFamily: "var(--font-body)",
                                fontWeight: 600,
                                fontSize: "0.8rem",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "4px",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                whiteSpace: "nowrap"
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = "#E2E8F0";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = "#F1F5F9";
                            }}
                        >
                            ← Back
                        </button>

                        <button
                            type="button"
                            onClick={() => onPreviewBrochure ? onPreviewBrochure(prod.brochurePath || "/brochures/digital-cockpit-brochure.png", prod.title) : window.open(prod.brochurePath || "#", '_blank')}
                            title="View Brochure"
                            aria-label="View Brochure"
                            style={{
                                flex: "1 1 35%",
                                padding: "10px 8px",
                                borderRadius: "8px",
                                background: "rgba(239, 68, 68, 0.08)",
                                border: "1px solid rgba(239, 68, 68, 0.3)",
                                color: "#EF4444",
                                fontFamily: "var(--font-body)",
                                fontWeight: 600,
                                fontSize: "0.8rem",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "5px",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                whiteSpace: "nowrap"
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = "rgba(239, 68, 68, 0.14)";
                                e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.5)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = "rgba(239, 68, 68, 0.08)";
                                e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
                            }}
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Brochure
                        </button>

                        <button
                            type="button"
                            onClick={() => onPreviewVideo ? onPreviewVideo("/videos/samsan-demo.mp4", prod.title) : window.open("/videos/samsan-demo.mp4", '_blank')}
                            title="Watch Product Video"
                            aria-label="Watch Product Video"
                            style={{
                                flex: "1 1 35%",
                                padding: "10px 8px",
                                borderRadius: "8px",
                                background: "rgba(124, 58, 237, 0.08)",
                                border: "1px solid rgba(124, 58, 237, 0.3)",
                                color: "#7C3AED",
                                fontFamily: "var(--font-body)",
                                fontWeight: 600,
                                fontSize: "0.8rem",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "5px",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                whiteSpace: "nowrap"
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = "rgba(124, 58, 237, 0.16)";
                                e.currentTarget.style.borderColor = "rgba(124, 58, 237, 0.5)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = "rgba(124, 58, 237, 0.08)";
                                e.currentTarget.style.borderColor = "rgba(124, 58, 237, 0.3)";
                            }}
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            Video
                        </button>
                    </div>
                </div>

                {/* ── BACK FACE (Full Specs) ── */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: "#0D1117",
                        border: `1px solid rgba(${rgbStr}, 0.4)`,
                        borderRadius: "20px",
                        padding: "24px 22px",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: `0 20px 48px rgba(${rgbStr}, 0.25)`,
                        overflow: "hidden"
                    }}
                >
                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                        <h4 style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: accentColor,
                            margin: 0
                        }}>
                            {prod.title} — Technical Specs
                        </h4>
                        <button
                            type="button"
                            onClick={() => setFlipped(false)}
                            aria-label="Close specs view"
                            style={{
                                background: "rgba(255,255,255,0.08)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                color: "#FFFFFF",
                                borderRadius: "50%",
                                width: "28px",
                                height: "28px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer"
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Highlights */}
                    <div style={{ marginBottom: "16px", flexGrow: 1 }}>
                        <span style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "9px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--text-muted)",
                            display: "block",
                            marginBottom: "8px"
                        }}>
                            Key Capabilities
                        </span>
                        <ul style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px"
                        }}>
                            {prod.highlights.map((h, i) => (
                                <li key={i} style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "8px",
                                    fontSize: "0.82rem",
                                    color: "#CBD5E1",
                                    lineHeight: 1.4
                                }}>
                                    <span style={{ color: accentColor, fontWeight: 700, marginTop: "1px" }}>✓</span>
                                    <span>{h}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* All Tech Stack Tags */}
                    <div style={{ marginBottom: "18px" }}>
                        <span style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "9px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--text-muted)",
                            display: "block",
                            marginBottom: "8px"
                        }}>
                            Supported Technologies &amp; Protocols
                        </span>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                            {prod.techs.map((chip, i) => (
                                <span key={i} style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "10px",
                                    color: "#94A3B8",
                                    background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    padding: "3px 8px",
                                    borderRadius: "100px"
                                }}>
                                    {chip.label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "auto" }}>
                        <Link
                            href={`/contact?product=${prod.id}`}
                            className="btn btn-primary"
                            style={{
                                width: "100%",
                                justifyContent: "center",
                                backgroundColor: "#E8521A",
                                color: "#FFFFFF",
                                padding: "12px 16px",
                                fontSize: "0.9rem",
                                borderRadius: "8px",
                                fontWeight: 600,
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                boxShadow: "0 4px 14px rgba(232, 82, 26, 0.3)"
                            }}
                        >
                            Contact for Inquiry
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ── Products master dataset ──────────────────────────────────────
const products: ProductItem[] = [
    {
        id: "digital-cockpit-solution",
        number: "01",
        category: "automotive",
        categoryLabel: "Automotive eCockpit",
        title: "Digital Cockpit Solution",
        description: "World-class Intelligent Cockpit Solutions for Global OEMs and Tier-1 suppliers — integrating Instrument Clusters, Infotainment, Telematics, Smart Mirrors, HUDs, and Navigation into one seamless eCockpit.",
        highlights: [
            "Multi-display eCockpit orchestration (Cluster + IVI + HUD)",
            "Hypervisor-based Android & QNX isolation for ASIL-B safety",
            "3D HMI rendering with Unreal Engine / Unity integration",
            "OTA update manager for in-field feature deployments"
        ],
        brochurePath: "/brochures/digital-cockpit-brochure.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
        ]
    },
    {
        id: "twinlnk",
        number: "02",
        category: "telematics",
        categoryLabel: "IoT & Telematics",
        title: "TwinLnk™",
        description: "An intelligent telematics and IoT gateway platform enabling secure, seamless data flow between edge devices and cloud applications — built for automotive, industrial, and infrastructure environments.",
        highlights: [
            "High-frequency CAN Bus data ingestion & edge decoding",
            "Secure MQTT / HTTPS telemetry pipeline to AWS & Azure",
            "GNSS precision location mapping & geo-fencing engine",
            "Remote diagnostic code reader with automated alerts"
        ],
        brochurePath: "/brochures/twinlnk-brochure.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
        ]
    },

    {
        id: "dms-edge",
        number: "03",
        category: "automotive",
        categoryLabel: "Safety & ADAS",
        title: "DMS Edge",
        description: "AI-based Driver Monitoring System combines facial recognition, gaze tracking, and behavioural analytics to deliver intelligent in-cabin safety monitoring and real-time event detection.",
        highlights: [
            "Real-time drowsiness & distraction detection (<100ms latency)",
            "IR NIR camera support for zero-light night vision operational mode",
            "Edge neural inference optimized for Qualcomm Snapdragon & NXP",
            "Euro NCAP & GSR II compliance ready safety algorithms"
        ],
        brochurePath: "/brochures/dms-edge-brochure.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 5v2M12 17v2M5 12H3M21 12h-2" />
            </svg>
        ),
        techs: [
            { label: "OpenCV", logoUrl: Logos.opencv },
            { label: "TensorFlow", logoUrl: Logos.tensorflow },
            { label: "Python", isBadge: true },
            { label: "Gaze Tracking", isBadge: true },
            { label: "ADAS", isBadge: true },
        ]
    },
    {
        id: "maestro",
        number: "04",
        category: "telematics",
        categoryLabel: "Fleet & Operations",
        title: "Maestro™",
        description: "Unifies devices from different vendors — vehicle cameras, building management systems, and industrial sensors — into a single operational dashboard, managed end-to-end.",
        highlights: [
            "Single-pane-of-glass operations console for mixed device fleets",
            "Multi-tenant RBAC permissions & audit trail logging",
            "Automated incident alerts via SMS, Webhooks, & Push Notifications",
            "Customizable telemetry visualization dashboards"
        ],
        brochurePath: "/brochures/Maestro%20Standee%20TRL-7%204.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
        ]
    },
    {
        id: "automate-ai",
        number: "05",
        category: "automotive",
        categoryLabel: "In-Cabin GenAI",
        title: "AutoMATE.ai",
        description: "Contextual, voice-based AI assistant integrated directly into the vehicle cockpit — providing intelligent access to vehicle functionalities, e-manuals, and diagnostics through natural language.",
        highlights: [
            "Voice-first natural language vehicle control & setting adjustments",
            "RAG-enhanced Interactive Digital Vehicle Manual query engine",
            "Offline edge LLM mode for low-connectivity regions",
            "Personalized driver preferences memory & habit learning"
        ],
        brochurePath: "/brochures/automate-ai-brochure.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
        ]
    },
    {
        id: "cabiniq",
        number: "06",
        category: "automotive",
        categoryLabel: "In-Cabin Sensing",
        title: "CabinIQ™",
        description: "A modular, AI-powered in-cabin intelligence platform unifying Driver Monitoring (DMS), Occupant Monitoring (OMS), Health Monitoring, and Mood-Based Personalization.",
        highlights: [
            "Combined Driver (DMS) & Occupant (OMS) multi-camera analytics",
            "Child Presence Detection (CPD) & forgotten object alerting",
            "Non-invasive heart-rate & breathing rate estimation",
            "Dynamic mood-based ambient lighting & HVAC climate adjustment"
        ],
        brochurePath: "/brochures/cabiniq-brochure.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
        ),
        techs: [
            { label: "OpenCV", logoUrl: Logos.opencv },
            { label: "TensorFlow", logoUrl: Logos.tensorflow },
            { label: "DMS", isBadge: true },
            { label: "OMS", isBadge: true },
            { label: "AI Cabin", isBadge: true },
        ]
    },
    {
        id: "vemeego",
        number: "07",
        category: "smart-platforms",
        categoryLabel: "Digital Collaboration",
        title: "Vemeego",
        description: "An intelligent workspace and video conferencing platform built for enhanced remote and corporate collaboration — delivering a rich, structured digital workspace.",
        highlights: [
            "End-to-end encrypted WebRTC video conference rooms",
            "Interactive whiteboarding & live screen collaboration",
            "AI-powered meeting summary & automated action items generation",
            "Enterprise directory integration & SSO security"
        ],
        brochurePath: "/brochures/VeMee%20Flayer.png",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
        ]
    },
    {
        id: "pikniknow",
        number: "08",
        category: "smart-platforms",
        categoryLabel: "Consumer App Platform",
        title: "PiknikNow",
        description: "Discover unique picnic spots nearby, share travel stories with fellow explorers, and plan adventures to hidden destinations.",
        highlights: [
            "Curated outdoor location discovery & crowd density forecasting",
            "Community travel storyfeed with geotagged photo sharing",
            "Offline topographic map download support",
            "Group itinerary planning & expense sharing tool"
        ],
        brochurePath: "/brochures/PIKNIKNOW_BROUCHER.pdf",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
        techs: [
            { label: "Flutter", logoUrl: Logos.flutter },
            { label: "Firebase", logoUrl: Logos.firebase },
            { label: "Maps API", isBadge: true },
            { label: "Social", isBadge: true },
        ]
    },
];



const stats = [
    { value: "8+", label: "Production Accelerators" },
    { value: "Global", label: "OEM & Tier-1 Deployment" },
    { value: "8+", label: "Industry Verticals" }
];

export default function SolutionsPage() {
    const shouldReduce = useReducedMotion();
    const [previewBrochure, setPreviewBrochure] = useState<{ path: string; title: string } | null>(null);
    const [previewVideo, setPreviewVideo] = useState<{ path: string; title: string } | null>(null);

    return (
        <div style={{ paddingBottom: "0" }}>

            {/* ── Page Hero — Dark Theme ── */}
            <section
                className="section-dark page-hero"
                aria-labelledby="solutions-heading"
                style={{
                    background: "var(--midnight)",
                    paddingTop: "140px",
                    paddingBottom: "96px",
                    position: "relative",
                    overflow: "hidden",
                    borderBottom: "none"
                }}
            >
                {/* Ambient violet background glow */}
                <div style={{
                    position: "absolute",
                    top: "30%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "1100px", height: "550px",
                    background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
                    pointerEvents: "none", zIndex: 0
                }} />

                <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "1400px" }}>
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                            gap: "40px",
                            alignItems: "center"
                        }}>
                            {/* Left Column: Title & Intro */}
                            <div>
                                <motion.div variants={fadeUpVariants(shouldReduce)}>
                                    <span
                                        className="badge"
                                        style={{
                                            marginBottom: "20px",
                                            color: "var(--violet-mid)",
                                            background: "rgba(139, 92, 246, 0.1)",
                                            border: "1px solid rgba(139, 92, 246, 0.25)",
                                            fontFamily: "var(--font-mono)",
                                            letterSpacing: "0.1em"
                                        }}
                                    >
                                        Products &amp; Accelerators
                                    </span>
                                </motion.div>

                                <motion.h1
                                    id="solutions-heading"
                                    variants={fadeUpVariants(shouldReduce)}
                                    style={{
                                        marginBottom: "20px",
                                        color: "#FFFFFF",
                                        fontFamily: "var(--font-display)",
                                        fontWeight: 700,
                                        lineHeight: 1.1,
                                        fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
                                        letterSpacing: "-0.02em"
                                    }}
                                >
                                    SAMSAN Products &amp; Accelerators
                                </motion.h1>

                                <motion.p
                                    className="lead"
                                    variants={fadeUpVariants(shouldReduce)}
                                    style={{
                                        maxWidth: "680px",
                                        color: "var(--text-secondary)",
                                        lineHeight: 1.7,
                                        fontFamily: "var(--font-body)",
                                        fontSize: "1.08rem",
                                        marginBottom: "0"
                                    }}
                                >
                                    Production-proven software platforms and hardware accelerators across automotive eCockpit, Telematics, ADAS, and Smart IoT environments. Engineered for safety, scale, and immediate deployment.
                                </motion.p>
                            </div>

                            {/* Right Column: 3 Glassmorphic Metric Cards */}
                            <motion.div
                                variants={fadeUpVariants(shouldReduce)}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                                    gap: "16px"
                                }}
                            >
                                {stats.map((s, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={shouldReduce ? undefined : { y: -4, scale: 1.02 }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                        style={{
                                            background: "rgba(16, 24, 48, 0.7)",
                                            backdropFilter: "blur(20px)",
                                            WebkitBackdropFilter: "blur(20px)",
                                            border: "1px solid rgba(255, 255, 255, 0.08)",
                                            borderRadius: "16px",
                                            padding: "24px 20px",
                                            textAlign: "center",
                                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)"
                                        }}
                                    >
                                        <div style={{
                                            fontFamily: "var(--font-display)",
                                            fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)",
                                            fontWeight: 700,
                                            letterSpacing: "-0.03em",
                                            lineHeight: 1.1,
                                            marginBottom: "8px",
                                            background: "var(--grad-accent)",
                                            backgroundSize: "200% auto",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text"
                                        }}>
                                            {s.value}
                                        </div>
                                        <div style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "0.72rem",
                                            fontWeight: 500,
                                            color: "var(--text-secondary)",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.08em",
                                            lineHeight: 1.35
                                        }}>
                                            {s.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Product Showcase Grid — Light Theme ── */}
            <section
                className="section-light section"
                style={{
                    background: "#F8FAFC",
                    padding: "108px 0",
                    position: "relative"
                }}
            >
                <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "1400px" }}>
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{ textAlign: "center", marginBottom: "48px" }}
                    >
                        <span
                            className="badge"
                            style={{
                                marginBottom: "16px",
                                color: "#E8521A",
                                background: "rgba(232, 82, 26, 0.08)",
                                border: "1px solid rgba(232, 82, 26, 0.2)",
                                fontFamily: "var(--font-mono)",
                                letterSpacing: "0.1em"
                            }}
                        >
                            Our Portfolio
                        </span>
                        <h2 style={{
                            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                            marginBottom: "16px",
                            color: "#0B1320",
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            letterSpacing: "-0.02em"
                        }}>
                            Production-Ready Accelerators &amp; Platforms
                        </h2>
                        <p style={{
                            color: "#64748B",
                            maxWidth: "620px",
                            margin: "0 auto",
                            lineHeight: "1.75",
                            fontFamily: "var(--font-body)",
                            fontSize: "1rem"
                        }}>
                            Each accelerator is engineered with production-grade reliability, open architecture interfaces,
                            and comprehensive documentation to drastically reduce your time-to-market.
                        </p>
                    </motion.div>



                    {/* Product Cards Grid */}
                    <motion.div
                        layout
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                            gap: "32px",
                            alignItems: "stretch"
                        }}
                    >
                        <AnimatePresence>
                            {products.map((prod, idx) => (
                                <ProductCard
                                    key={prod.id}
                                    prod={prod}
                                    idx={idx}
                                    shouldReduce={!!shouldReduce}
                                    onPreviewBrochure={(path, title) => setPreviewBrochure({ path, title })}
                                    onPreviewVideo={(path, title) => setPreviewVideo({ path, title })}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* ── Standardized Light Bottom CTA ── */}
            <section
                className="section-light"
                style={{ background: "#F8FAFC", borderTop: "1px solid #E2E8F0", padding: "108px 0" }}
                aria-labelledby="solutions-cta-heading"
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
                        <span
                            className="badge"
                            style={{
                                marginBottom: "16px",
                                color: "#E8521A",
                                background: "rgba(232, 82, 26, 0.08)",
                                border: "1px solid rgba(232, 82, 26, 0.2)",
                                fontFamily: "var(--font-mono)",
                                letterSpacing: "0.1em"
                            }}
                        >
                            Next Steps
                        </span>
                        <h2
                            id="solutions-cta-heading"
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
                            Ready to Accelerate Your Product Roadmap?
                        </h2>

                        <p style={{
                            fontSize: "1.05rem",
                            lineHeight: 1.7,
                            color: "#475569",
                            fontFamily: "var(--font-body)",
                            maxWidth: "580px",
                            margin: "0 auto 36px"
                        }}>
                            Our engineering teams can customize, integrate, and scale these IP accelerators for your specific vehicle architecture or enterprise requirements.
                        </p>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                            <Link
                                href="/contact"
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
                                Evaluate SAMSAN Accelerators
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
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
                                View Engineering Services
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Interactive Product Brochure Modal Lightbox ── */}
            <AnimatePresence>
                {previewBrochure && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setPreviewBrochure(null)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 9999,
                            backgroundColor: "rgba(11, 19, 32, 0.88)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "24px"
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: "#0F172A",
                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                borderRadius: "20px",
                                maxWidth: "1050px",
                                width: "100%",
                                maxHeight: "92vh",
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                                boxShadow: "0 30px 70px -15px rgba(0,0,0,0.8)"
                            }}
                        >
                            {/* Modal Header Bar */}
                            <div style={{
                                padding: "18px 24px",
                                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                background: "rgba(15, 23, 42, 0.95)"
                            }}>
                                <div>
                                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-display)", margin: 0 }}>
                                        {previewBrochure.title} — Official Brochure
                                    </h3>
                                    <span style={{ fontSize: "0.78rem", color: "#94A3B8", fontFamily: "var(--font-mono)" }}>
                                        SAMSAN Technische Labs Enterprise Documentation
                                    </span>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <button
                                        type="button"
                                        onClick={() => setPreviewBrochure(null)}
                                        aria-label="Close brochure modal"
                                        style={{
                                            background: "rgba(255,255,255,0.08)",
                                            border: "1px solid rgba(255,255,255,0.15)",
                                            color: "#FFFFFF",
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "50%",
                                            cursor: "pointer",
                                            fontSize: "1.1rem",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: "background 0.2s ease"
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {/* Modal Content / Protected Preview Area */}
                            <div
                                onContextMenu={(e) => e.preventDefault()}
                                style={{
                                    padding: "24px",
                                    position: "relative",
                                    overflow: "hidden",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "#020617",
                                    flexGrow: 1,
                                    userSelect: "none",
                                    WebkitUserSelect: "none"
                                }}
                            >
                                {/* Diagonal Translucent Watermark Overlay Layer */}
                                <div style={{
                                    position: "absolute",
                                    inset: 0,
                                    zIndex: 10,
                                    pointerEvents: "none",
                                    opacity: 0.28,
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='380' height='200'%3E%3Ctext x='50%25' y='50%25' fill='%23FFFFFF' font-size='11' font-family='sans-serif' font-weight='bold' text-anchor='middle' transform='rotate(-25 190 100)' opacity='0.75'%3ESAMSAN TECH LABS %E2%80%A2 PROTECTED PREVIEW%3C/text%3E%3C/svg%3E")`,
                                    backgroundRepeat: "repeat"
                                }} />

                                {/* Floating Glassmorphic Restricted-View Overlay CTA */}
                                <div style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    zIndex: 20,
                                    background: "rgba(15, 23, 42, 0.92)",
                                    backdropFilter: "blur(20px)",
                                    WebkitBackdropFilter: "blur(20px)",
                                    border: "1px solid rgba(232, 82, 26, 0.45)",
                                    borderRadius: "20px",
                                    padding: "36px 44px",
                                    textAlign: "center",
                                    maxWidth: "580px",
                                    width: "90%",
                                    boxShadow: "0 25px 60px rgba(0,0,0,0.75)",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "18px"
                                }}>
                                    <div style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        padding: "6px 14px",
                                        borderRadius: "100px",
                                        background: "rgba(232, 82, 26, 0.15)",
                                        border: "1px solid rgba(232, 82, 26, 0.35)",
                                        color: "#FF8C5A",
                                        fontSize: "0.8rem",
                                        fontWeight: 700,
                                        fontFamily: "var(--font-mono)",
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase"
                                    }}>
                                        🔒 Restricted Preview Mode
                                    </div>

                                    <h4 style={{
                                        color: "#FFFFFF",
                                        fontSize: "1.45rem",
                                        fontWeight: 700,
                                        fontFamily: "var(--font-display)",
                                        lineHeight: 1.3,
                                        margin: 0
                                    }}>
                                        Full Spec Content Protected
                                    </h4>

                                    <p style={{
                                        color: "#94A3B8",
                                        fontSize: "0.95rem",
                                        lineHeight: 1.65,
                                        fontFamily: "var(--font-body)",
                                        maxWidth: "480px",
                                        margin: 0
                                    }}>
                                        This preview is restricted to low-resolution blurred mode. Download the official brochure for full unblurred high-resolution diagrams &amp; specifications.
                                    </p>

                                    <a
                                        href={previewBrochure.path}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            marginTop: "4px",
                                            padding: "13px 30px",
                                            borderRadius: "10px",
                                            background: "#E8521A",
                                            color: "#FFFFFF",
                                            fontWeight: 600,
                                            fontSize: "0.95rem",
                                            textDecoration: "none",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            boxShadow: "0 4px 18px rgba(232, 82, 26, 0.45)",
                                            transition: "all 0.2s ease"
                                        }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        Download Full Brochure
                                    </a>
                                </div>

                                {/* Blurred Content (PDF iframe or image) */}
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    filter: "blur(6px) brightness(0.9)",
                                    pointerEvents: "none",
                                    userSelect: "none"
                                }}>
                                    {previewBrochure.path.toLowerCase().endsWith(".pdf") ? (
                                        <iframe
                                            src={previewBrochure.path}
                                            style={{ width: "100%", height: "72vh", border: "none", borderRadius: "12px", pointerEvents: "none" }}
                                            title={previewBrochure.title}
                                        />
                                    ) : (
                                        <img
                                            src={previewBrochure.path}
                                            alt={previewBrochure.title}
                                            draggable={false}
                                            style={{ maxWidth: "100%", maxHeight: "75vh", objectFit: "contain", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}
                                        />
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Interactive Product Video Modal Lightbox ── */}
            <AnimatePresence>
                {previewVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setPreviewVideo(null)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 9999,
                            backgroundColor: "rgba(11, 19, 32, 0.88)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "24px"
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: "#0F172A",
                                border: "1px solid rgba(255, 255, 255, 0.15)",
                                borderRadius: "20px",
                                maxWidth: "960px",
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                                boxShadow: "0 30px 70px -15px rgba(0,0,0,0.8)"
                            }}
                        >
                            {/* Modal Header */}
                            <div style={{
                                padding: "18px 24px",
                                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                background: "rgba(15, 23, 42, 0.95)"
                            }}>
                                <div>
                                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-display)", margin: 0 }}>
                                        {previewVideo.title} — Product Demonstration
                                    </h3>
                                    <span style={{ fontSize: "0.78rem", color: "#94A3B8", fontFamily: "var(--font-mono)" }}>
                                        SAMSAN Accelerators Live Demonstration
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setPreviewVideo(null)}
                                    aria-label="Close video modal"
                                    style={{
                                        background: "rgba(255,255,255,0.08)",
                                        border: "1px solid rgba(255,255,255,0.15)",
                                        color: "#FFFFFF",
                                        width: "36px",
                                        height: "36px",
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                        fontSize: "1.1rem",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        transition: "background 0.2s ease"
                                    }}
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Video Player */}
                            <div style={{ padding: "0", background: "#000000", display: "flex", justifyContent: "center", position: "relative" }}>
                                <video
                                    src={previewVideo.path}
                                    controls
                                    autoPlay
                                    style={{ width: "100%", maxHeight: "72vh", objectFit: "contain" }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
