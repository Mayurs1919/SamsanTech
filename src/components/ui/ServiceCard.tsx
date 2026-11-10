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
    description: string | React.ReactNode;
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
    /** Label for the tech chips section, defaults to Technologies */
    techsLabel?: string;
    /** Theme variant for card styling */
    theme?: "light" | "dark" | "dark-slate" | "light-corp";
    /** Tighter spacing for dense catalog grids */
    compact?: boolean;
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
function TechChipItem({ chip, theme = "dark" }: { chip: TechChip; theme?: "light" | "dark" | "dark-slate" | "light-corp" }) {
    const [imgError, setImgError] = useState(false);
    const isLight = theme === "light";
    const isSlate = theme === "dark-slate";
    const isCorp = theme === "light-corp";

    const chipBg = isCorp ? "var(--bg-alt)" : isSlate ? "rgba(148,163,184,0.12)" : isLight ? "#F1F5F9" : "rgba(255, 255, 255, 0.05)";
    const chipBorder = isCorp || isSlate ? "1px solid var(--border)" : isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.08)";
    const chipTextColor = isCorp || isSlate ? "var(--body)" : isLight ? "#64748B" : "#94A3B8";

    return (
        <span className={isCorp ? "tl-service-chip" : isSlate ? "tds-service-chip" : undefined} style={{
            display: "inline-flex",
            alignItems: "center",
            gap: isCorp ? "8px" : "6px",
            background: chipBg,
            border: chipBorder,
            borderRadius: "20px",
            padding: isCorp ? "4px 10px" : "5px 11px",
            fontSize: isCorp || isSlate ? "13px" : "12px",
            color: chipTextColor,
            fontFamily: "var(--font-body)",
            whiteSpace: "nowrap"
        }}>
            {/* Logo image from CDN */}
            {chip.logoUrl && !imgError && (
                <img
                    src={chip.logoUrl}
                    alt={chip.label}
                    width={16}
                    height={16}
                    style={{ width: "16px", height: "16px", display: "block", flexShrink: 0, objectFit: "contain", ...(isSlate ? { padding: "2px", borderRadius: "6px", background: "#F8FAFC", boxSizing: "content-box" as const } : {}) }}
                    onError={() => setImgError(true)}
                />
            )}
            {/* Inline SVG icon */}
            {chip.icon && (
                <span style={{ color: chipTextColor, display: "flex", alignItems: "center", flexShrink: 0 }}>
                    {chip.icon}
                </span>
            )}
            <span style={{ color: chipTextColor }}>{chip.label}</span>
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
    techsLabel = "Technologies",
    theme = "dark",
    compact = false
}: ServiceCardProps) {
    const [hovered, setHovered] = useState(false);
    const isLight = theme === "light";
    const isSlate = theme === "dark-slate";
    const isCorp = theme === "light-corp";

    const cardBg = isSlate ? (hovered ? "var(--surface-hover)" : "var(--surface)") : isLight ? "#FFFFFF" : "#161B22";
    const cardBorder = isSlate
        ? `1px ${isPending ? "dashed" : "solid"} ${hovered ? "var(--teal)" : "var(--border)"}`
        : isLight
        ? `1px solid ${hovered ? "rgba(232, 82, 26, 0.3)" : "#E2E8F0"}`
        : `1px solid ${hovered ? "rgba(77, 216, 232, 0.4)" : "rgba(255, 255, 255, 0.07)"}`;
    const cardShadow = isSlate
        ? "0 8px 24px rgba(0,0,0,0.25)"
        : isLight
        ? (hovered ? "0 8px 24px rgba(11, 19, 32, 0.1)" : "0 2px 12px rgba(11, 19, 32, 0.06)")
        : (hovered ? "0 8px 24px rgba(0,0,0,0.3)" : "0 4px 16px rgba(0,0,0,0.15)");
    const numberColor = isSlate ? "rgba(248,250,252,0.35)" : isLight ? "rgba(11, 19, 32, 0.15)" : "rgba(255, 255, 255, 0.1)";
    const titleColor = isSlate ? "var(--navy)" : isLight ? "#0B1320" : "#FFFFFF";
    const descColor = isSlate ? "var(--body)" : isLight ? "#475569" : "#CBD5E1";
    const labelColor = isSlate ? "var(--muted)" : isLight ? "#64748B" : "#94A3B8";
    const dividerColor = isSlate ? "var(--border)" : isLight ? "#E2E8F0" : "rgba(255, 255, 255, 0.12)";

    if (isCorp) {
        return (
            <article className="tl-service-card">
                <div className="tl-service-card__header">
                    <span className="tl-service-card__icon" aria-hidden="true">{icon}</span>
                    <span className="tl-service-card__number">{number}</span>
                </div>
                <h3>{title}</h3>
                <div className="tl-service-card__description">
                    {typeof description === "string" ? <p>{description}</p> : description}
                </div>
                <div className="tl-service-card__capabilities">
                    <span className="tl-service-card__label">Capabilities</span>
                    <div className="tl-service-card__chips">
                        {techs.map((chip, index) => <TechChipItem key={`${chip.label}-${index}`} chip={chip} theme="light-corp" />)}
                    </div>
                </div>
            </article>
        );
    }

    return (
            <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
                className={isSlate ? "tds-service-card" : undefined}
            style={{
                background: cardBg,
                border: cardBorder,
                borderRadius: isSlate ? "16px" : "12px",
                padding: compact ? "24px" : "28px",
                display: "flex",
                flexDirection: "column",
                gap: compact ? "14px" : "20px",
                height: "100%",
                width: "100%",
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
                transition: "all 0.2s ease",
                boxShadow: cardShadow,
                justifyContent: "space-between"
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: compact ? "14px" : "20px" }}>

                {/* ROW 1 — Icon + Number */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className={isSlate ? "tds-service-icon" : undefined} style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        background: isSlate ? "rgba(56,189,248,0.12)" : `${iconColor}1A`,
                        border: isSlate ? "1px solid rgba(56,189,248,0.25)" : `1px solid ${iconColor}30`,
                        color: isSlate ? "var(--teal)" : iconColor,
                        flexShrink: 0
                    }}>
                        {icon}
                    </div>
                    <span className={isSlate ? "tds-service-number" : undefined} style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: isSlate ? "13px" : "12px",
                        color: numberColor,
                        letterSpacing: "0.1em",
                        fontWeight: 400
                    }}>
                        {number}
                    </span>
                </div>

                {/* ROW 2 — Title */}
                <h3 style={{
                    fontSize: isSlate ? "20px" : "1.15rem",
                    fontWeight: 700,
                    color: titleColor,
                    letterSpacing: "0.01em",
                    marginTop: compact ? "8px" : "14px",
                    marginBottom: compact ? "6px" : "10px",
                    lineHeight: 1.35,
                    fontFamily: "var(--font-display)"
                }}>
                    {title}
                </h3>

                {/* ROW 3 — Description */}
                {typeof description === "string" ? (
                    <p style={{
                        fontSize: isSlate ? "16px" : "0.92rem",
                        color: isPending ? (isSlate ? "var(--muted)" : "var(--text-muted)") : descColor,
                        lineHeight: 1.65,
                        margin: 0,
                        fontStyle: isPending ? "italic" : "normal"
                    }}>
                        {description}
                    </p>
                ) : (
                    description
                )}

                {/* Optional product image banner */}
                {image && (
                    <div style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16/9",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: `1px solid ${dividerColor}`
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
                    </div>
                )}

                {/* DIVIDER */}
                <div style={{ borderTop: `1px solid ${dividerColor}`, marginTop: compact ? "10px" : "18px", marginBottom: compact ? "8px" : "14px" }} />

                {/* ROW 4 — Technologies label */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <span className={isSlate ? "tds-tech-label" : undefined} style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10.5px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: labelColor,
                        display: "block",
                        marginBottom: compact ? "4px" : "12px"
                    }}>
                        {techsLabel}
                    </span>

                    {/* ROW 5 — Tech chips */}
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        filter: hovered ? "brightness(1.08)" : "none",
                        transition: "filter 0.2s ease"
                    }}>
                        {techs.map((chip, i) => (
                            <TechChipItem key={i} chip={chip} theme={theme} />
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
                            download
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
    azure:      `${CDN}azure/azure-original.svg`,
    googlecloud:`${CDN}googlecloud/googlecloud-original.svg`,
    kubernetes: `${CDN}kubernetes/kubernetes-plain.svg`,
    nodejs:     `${CDN}nodejs/nodejs-original.svg`,
    react:      `${CDN}react/react-original.svg`,
    angular:    `${CDN}angularjs/angularjs-original.svg`,
    vue:        `${CDN}vuejs/vuejs-original.svg`,
    html5:      `${CDN}html5/html5-original.svg`,
    css3:       `${CDN}css3/css3-original.svg`,
    javascript: `${CDN}javascript/javascript-original.svg`,
    typescript: `${CDN}typescript/typescript-original.svg`,
    java:       `${CDN}java/java-original.svg`,
    cplusplus:  `${CDN}cplusplus/cplusplus-original.svg`,
    mysql:      `${CDN}mysql/mysql-original.svg`,
    mongodb:    `${CDN}mongodb/mongodb-original.svg`,
    pytorch:    `${CDN}pytorch/pytorch-original.svg`,
    opencv:     `${CDN}opencv/opencv-original.svg`,
    flutter:    `${CDN}flutter/flutter-original.svg`,
    tensorflow: `${CDN}tensorflow/tensorflow-original.svg`,
    kotlin:     `${CDN}kotlin/kotlin-original.svg`,
    firebase:   `${CDN}firebase/firebase-plain.svg`,
    git:        `${CDN}git/git-original.svg`,
    github:     `${CDN}github/github-original.svg`,
    gitlab:     `${CDN}gitlab/gitlab-original.svg`,
    jenkins:    `${CDN}jenkins/jenkins-original.svg`,
    qt:         `${CDN}qt/qt-original.svg`,
    figma:      `${CDN}figma/figma-original.svg`,
};

export { WifiIcon, BluetoothIcon, MapPinIcon, MqttIcon };
