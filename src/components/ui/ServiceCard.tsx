"use client";

import Link from "next/link";
import { useState } from "react";

// ── Tech chip types ──────────────────────────────────────────────
export interface TechChip {
    label: string;
    /** Full CDN URL for devicon or other logo */
    logoUrl?: string;
    /** Inline SVG node (for wifi, bluetooth, map-pin etc.) */
    icon?: React.ReactNode;
    /** If true, renders as an amber micro-badge (for proprietary / niche tech) */
    isBadge?: boolean;
}

// ── ServiceCard props ────────────────────────────────────────────
export interface ServiceCardProps {
    number: string;
    title: string;
    /** Short 1-2 sentence description */
    description: string;
    /** SVG icon node */
    icon: React.ReactNode;
    /** CSS color value for icon tint — e.g. "#06B6D4" or "var(--mint)" */
    iconColor: string;
    /** Optional product image path (shows 16:9 banner below divider) */
    image?: string;
    /** Tech chip list */
    techs: TechChip[];
    /** If present, renders a "Contact For More" CTA button */
    contactSlug?: string;
    /** If present, renders a "Download Brochure" button linking to the file */
    brochurePath?: string;
    /** If true, description is shown in italic (pending content) */
    isPending?: boolean;
}

// ── Inline SVG icons used in chips ──────────────────────────────
const WifiIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
    </svg>
);

const BluetoothIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />
    </svg>
);

const MapPinIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const MqttIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
    </svg>
);

// ── Single tech chip ─────────────────────────────────────────────
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
            {/* Logo image from CDN */}
            {chip.logoUrl && !imgError && (
                <img
                    src={chip.logoUrl}
                    alt={chip.label}
                    height={16}
                    style={{ width: "auto", height: "16px", display: "block", flexShrink: 0 }}
                    onError={() => setImgError(true)}
                />
            )}
            {/* Inline SVG icon */}
            {chip.icon && (
                <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", flexShrink: 0 }}>
                    {chip.icon}
                </span>
            )}
            <span style={{ color: "var(--text-secondary)" }}>{chip.label}</span>
        </span>
    );
}

// ── Main ServiceCard ─────────────────────────────────────────────
export default function ServiceCard({
    number,
    title,
    description,
    icon,
    iconColor,
    image,
    techs,
    contactSlug,
    brochurePath,
    isPending = false,
}: ServiceCardProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: "rgba(13, 19, 35, 0.55)",
                border: `1px solid ${hovered ? "var(--border-hov)" : "var(--border)"}`,
                borderRadius: "12px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                height: "100%",
                backdropFilter: "blur(12px)",
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
                transition: "all 0.2s ease",
                boxShadow: hovered
                    ? "0 8px 24px rgba(0,0,0,0.3)"
                    : "0 4px 16px rgba(0,0,0,0.15)",
                justifyContent: "space-between"
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                {/* ROW 1 — Icon + Number */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        background: `${iconColor}1A`,
                        border: `1px solid ${iconColor}30`,
                        color: iconColor,
                        flexShrink: 0
                    }}>
                        {icon}
                    </div>
                    <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                        letterSpacing: "0.1em",
                        opacity: 0.45,
                        fontWeight: 400
                    }}>
                        {number}
                    </span>
                </div>

                {/* ROW 2 — Title */}
                <h3 style={{
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "0.01em",
                    marginTop: "14px",
                    marginBottom: "10px",
                    lineHeight: 1.35,
                    fontFamily: "var(--font-display)"
                }}>
                    {title}
                </h3>

                {/* ROW 3 — Description */}
                <p style={{
                    fontSize: "0.92rem",
                    color: isPending ? "var(--text-muted)" : "var(--text-secondary)",
                    lineHeight: 1.65,
                    margin: 0,
                    fontStyle: isPending ? "italic" : "normal"
                }}>
                    {description}
                </p>

                {/* Optional product image banner */}
                {image && (
                    <div style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16/9",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "1px solid var(--border)"
                    }}>
                        <img
                            src={image}
                            alt={title}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center",
                                display: "block"
                            }}
                        />
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(10,15,28,0.5) 0%, transparent 60%)",
                            pointerEvents: "none"
                        }} />
                    </div>
                )}

                {/* DIVIDER */}
                <div style={{ borderTop: "1px solid var(--border)", marginTop: "18px", marginBottom: "14px" }} />

                {/* ROW 4 — Technologies label */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10.5px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        display: "block",
                        marginBottom: "12px"
                    }}>
                        Technologies
                    </span>

                    {/* ROW 5 — Tech chips */}
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        filter: hovered ? "brightness(1.15)" : "none",
                        transition: "filter 0.2s ease"
                    }}>
                        {techs.map((chip, i) => (
                            <TechChipItem key={i} chip={chip} />
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Buttons — contact + brochure download */}
            {(contactSlug || brochurePath) && (
                <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    {contactSlug && (
                        <Link
                            href={`/contact?product=${contactSlug}`}
                            className="btn btn-primary"
                            style={{ width: "100%", justifyContent: "center" }}
                        >
                            Contact For More
                        </Link>
                    )}
                    {brochurePath && (
                        <a
                            href={brochurePath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                            style={{ width: "100%", justifyContent: "center", display: "flex", alignItems: "center", gap: "8px" }}
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
            )}
        </div>
    );
}

// ── Convenience helpers for common chips ─────────────────────────
const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";
export const Logos = {
    android:    `${CDN}android/android-original.svg`,
    linux:      `${CDN}linux/linux-original.svg`,
    python:     `${CDN}python/python-original.svg`,
    docker:     `${CDN}docker/docker-original.svg`,
    aws:        `${CDN}amazonwebservices/amazonwebservices-original-wordmark.svg`,
    kubernetes: `${CDN}kubernetes/kubernetes-plain.svg`,
    nodejs:     `${CDN}nodejs/nodejs-original.svg`,
    react:      `${CDN}react/react-original.svg`,
    flutter:    `${CDN}flutter/flutter-original.svg`,
    tensorflow: `${CDN}tensorflow/tensorflow-original.svg`,
    opencv:     `${CDN}opencv/opencv-original.svg`,
    kotlin:     `${CDN}kotlin/kotlin-original.svg`,
    firebase:   `${CDN}firebase/firebase-plain.svg`,
    github:     `${CDN}github/github-original.svg`,
    jenkins:    `${CDN}jenkins/jenkins-original.svg`,
};

export { WifiIcon, BluetoothIcon, MapPinIcon, MqttIcon };
