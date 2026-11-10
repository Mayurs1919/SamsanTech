"use client";

import React, { useState, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Logos, WifiIcon, BluetoothIcon, MqttIcon, type TechChip } from "@/components/ui/ServiceCard";
import { Button } from "@/components/theme-light/Button";
import { CtaBand } from "@/components/theme-light/CtaBand";
import { Eyebrow } from "@/components/theme-light/Eyebrow";
import { ProductCard } from "@/components/theme-light/ProductCard";
import { Section } from "@/components/theme-light/Section";

const fadeUp = (reduced: boolean) => ({
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: reduced ? { duration: 0 } : { duration: 0.5, ease: "easeOut" as const },
    },
});

const stagger = (reduced: boolean) => ({
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : 0.08 } },
});

function TechChipItem({ chip }: { chip: TechChip }) {
    const [imgError, setImgError] = useState(false);

    return (
        <span className="tl-chip" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            background: "var(--bg-alt)",
            border: "1px solid var(--border)",
            borderRadius: "100px",
            padding: "4px 10px",
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--body)",
            fontFamily: "var(--font-corp-inter)",
            whiteSpace: "nowrap"
        }}>
            {chip.logoUrl && !imgError && (
                <img
                    src={chip.logoUrl}
                    alt={chip.label}
                    width={14}
                    height={14}
                    style={{ width: "14px", height: "14px", display: "block", flexShrink: 0, objectFit: "contain" }}
                    onError={() => setImgError(true)}
                />
            )}
            {chip.icon && (
                <span style={{ color: "var(--muted)", display: "flex", alignItems: "center", flexShrink: 0 }}>
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
    "refacto": "/images/refacto.png",
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

// ── Products master dataset ──────────────────────────────────────
const products: ProductItem[] = [
    {
        id: "automate-ai",
        number: "01",
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
        number: "02",
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
        id: "digital-cockpit-solution",
        number: "03",
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
        id: "dms-edge",
        number: "04",
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
        number: "05",
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
        id: "pikniknow",
        number: "06",
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
    {
        id: "refacto",
        number: "07",
        category: "smart-platforms",
        categoryLabel: "AI Document Intelligence",
        title: "RefactoFlow",
        description: "An AI web application by Astrasoft that turns uploaded documents — specs, RFPs and scanned files — into traced use cases, requirements and test cases. Each artifact links to its source, your team reviews and approves it, and everything exports to Excel.",
        highlights: [
            "Multi-format upload with OCR: PDF, Word, Excel, images & scans up to 25 MB",
            "AI generation chain: use cases → requirements → test cases with end-to-end traceability",
            "Human review workflow: draft, approved or rejected status per artifact",
            "Excel export with three sheets and full traceability columns; JWT-secured workspaces"
        ],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
        ),
        techs: [
            { label: "AI / LLM", isBadge: true },
            { label: "OCR", isBadge: true },
            { label: "React", logoUrl: Logos.react },
            { label: "Node.js", logoUrl: Logos.nodejs },
            { label: "JWT Auth", isBadge: true },
        ]
    },
    {
        id: "twinlnk",
        number: "08",
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
        id: "vemeego",
        number: "09",
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
];



const stats = [
    { value: "9", label: "Products" },
    { value: "Global", label: "OEM & Tier-1 delivery" }
];

function ProductBackPanel({ product, onClose }: { product: ProductItem; onClose: () => void }) {
    return (
        <div className="tl-product-back">
            <div className="tl-product-back__header">
                <h3>{product.title} — Technical Specs</h3>
                <Button variant="outline" type="button" className="tl-product-back__close" onClick={onClose} ariaLabel="Close specs view">×</Button>
            </div>
            <div className="tl-product-back__capabilities">
                <span className="tl-product-back__label">Key Capabilities</span>
                <ul>{product.highlights.map((highlight, index) => <li key={index}><span aria-hidden="true">✓</span>{highlight}</li>)}</ul>
            </div>
            <div className="tl-product-back__technologies">
                <span className="tl-product-back__label">Supported Technologies &amp; Protocols</span>
                <div>{product.techs.map((chip, index) => <span className="tl-chip" key={`${chip.label}-${index}`}>{chip.label}</span>)}</div>
            </div>
            <Button href={`/contact?product=${product.id}`} variant="primary" className="tl-product-back__contact">Contact for inquiry</Button>
        </div>
    );
}

// ── Brochure form field types ───────────────────────────────────────────
interface BrochureModal {
    product: ProductItem;
    step: "preview" | "form" | "success";
    pendingAction: "view" | "download";
}

const PRODUCT_DISPLAY_MAP: Record<string, string> = {
    "automate-ai": "AutoMATE.ai",
    cabiniq: "CabinIQ™",
    "digital-cockpit-solution": "Digital Cockpit Solution",
    "dms-edge": "DMS Edge",
    maestro: "Maestro™",
    pikniknow: "PiknikNow",
    refacto: "RefactoFlow",
    twinlnk: "TwinLnk™",
    vemeego: "Vemeego",
};

export default function SolutionsClient({ fontClassName = "" }: { fontClassName?: string }) {
    const shouldReduce = useReducedMotion();

    // ── Brochure modal state ─────────────────────────────────────────────
    const [brochureModal, setBrochureModal] = useState<BrochureModal | null>(null);

    // ── Inline enquiry form state ────────────────────────────────────────
    const [bName, setBName] = useState("");
    const [bCompany, setBCompany] = useState("");
    const [bEmail, setBEmail] = useState("");
    const [bPhone, setBPhone] = useState("");
    const [bMessage, setBMessage] = useState("");
    const [bErrors, setBErrors] = useState<Record<string, string>>({});
    const [bSubmitting, setBSubmitting] = useState(false);
    const [bServerError, setBServerError] = useState("");

    const resetBrochureForm = useCallback(() => {
        setBName(""); setBCompany(""); setBEmail(""); setBPhone(""); setBMessage("");
        setBErrors({}); setBSubmitting(false); setBServerError("");
    }, []);

    const openBrochureModal = useCallback((product: ProductItem) => {
        resetBrochureForm();
        setBMessage(`I'd like to access the official ${product.title} brochure.`);
        setBrochureModal({ product, step: "preview", pendingAction: "download" });
    }, [resetBrochureForm]);

    const closeBrochureModal = useCallback(() => {
        setBrochureModal(null);
        resetBrochureForm();
    }, [resetBrochureForm]);

    const validateBrochureForm = () => {
        const errs: Record<string, string> = {};
        if (!bName.trim() || bName.trim().length < 2) errs.name = "Full name is required (min 2 characters).";
        if (!bEmail.trim()) { errs.email = "Email address is required."; }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bEmail)) errs.email = "Please enter a valid email.";
        if (!bCompany.trim()) errs.company = "Company name is required.";
        if (!bMessage.trim() || bMessage.trim().length < 10) errs.message = "Please describe your enquiry (min 10 characters).";
        setBErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleBrochureSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!brochureModal) return;
        if (!validateBrochureForm()) return;

        setBSubmitting(true);
        setBServerError("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "brochure_request",
                    name: bName.trim(),
                    email: bEmail.trim(),
                    company: bCompany.trim(),
                    phone: bPhone.trim(),
                    message: bMessage.trim(),
                    product: brochureModal.product.id,
                    productDisplayName: PRODUCT_DISPLAY_MAP[brochureModal.product.id] || brochureModal.product.title,
                }),
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Submission failed. Please try again.");
            }

            setBrochureModal(prev => prev ? { ...prev, step: "success" } : null);
        } catch (err: unknown) {
            setBServerError(err instanceof Error ? err.message : "Submission failed. Please try again.");
        } finally {
            setBSubmitting(false);
        }
    };

    return (
        <div className={`theme-light-corp ${fontClassName}`}>
            <Section variant="navy" className="solutions-hero" aria-labelledby="solutions-heading">
                <div className="tl-container">
                    <div className="solutions-hero-layout">
                        <motion.div className="solutions-hero-copy" variants={fadeUp(!!shouldReduce)} initial={shouldReduce ? false : "hidden"} whileInView="visible" viewport={{ once: true }}>
                            <Eyebrow tone="dark">Products &amp; Accelerators</Eyebrow>
                            <h1 className="solutions-h1" id="solutions-heading">SAMSAN Products &amp; Accelerators</h1>
                            <p className="solutions-lead">Production-proven software platforms and hardware accelerators across automotive eCockpit, Telematics, ADAS, and Smart IoT environments. Engineered for safety, scale, and immediate deployment.</p>
                        </motion.div>
                        <motion.div className="solutions-stats" variants={stagger(!!shouldReduce)} initial={shouldReduce ? false : "hidden"} whileInView="visible" viewport={{ once: true }}>
                            {stats.map(stat => <div className="solutions-stat-tile" key={stat.value}><span className="solutions-stat-value">{stat.value}</span><span className="solutions-stat-label">{stat.label}</span></div>)}
                        </motion.div>
                    </div>
                </div>
            </Section>

            <Section variant="white" className="solutions-portfolio">
                <div className="tl-container">
                    <motion.div className="solutions-section-header" variants={fadeUp(!!shouldReduce)} initial={shouldReduce ? false : "hidden"} whileInView="visible" viewport={{ once: true }}>
                        <Eyebrow>Our portfolio</Eyebrow>
                        <h2>Production-Ready Accelerators &amp; Platforms</h2>
                        <p>Each accelerator is engineered with production-grade reliability, open architecture interfaces, and comprehensive documentation to drastically reduce your time-to-market.</p>
                    </motion.div>
                    <div className="solutions-grid">
                        {products.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                number={product.number}
                                title={product.title}
                                description={product.description}
                                imageSrc={productImages[product.id]}
                                imageAlt={product.title}
                                imageKind={["maestro", "refacto", "vemeego"].includes(product.id) ? "logo" : ["digital-cockpit-solution", "twinlnk"].includes(product.id) ? "dark-banner" : "banner"}
                                index={index}
                                chips={<>{product.techs.slice(0, 4).map((chip, chipIndex) => <TechChipItem key={`${chip.label}-${chipIndex}`} chip={chip} />)}{product.techs.length > 4 && <span className="tl-chip-more">+{product.techs.length - 4} more</span>}</>}
                                onBrochure={() => openBrochureModal(product)}
                                renderBack={(close) => <ProductBackPanel product={product} onClose={close} />}
                            />
                        ))}
                    </div>
                </div>
            </Section>

            <CtaBand
                title="Ready to Accelerate Your Product Roadmap?"
                description="Our engineering teams can customize, integrate, and scale these IP accelerators for your specific vehicle architecture or enterprise requirements."
                primaryLabel="Evaluate SAMSAN accelerators"
                primaryHref="/contact"
                secondaryLabel="View engineering services"
                secondaryHref="/services"
            />

            {/* ── Brochure Modal — multi-step gated workflow ── */}
            <AnimatePresence>
                {brochureModal && (
                    <motion.div
                        key="brochure-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeBrochureModal}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 9999,
                            backgroundColor: "rgba(11, 19, 32, 0.90)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "24px"
                        }}
                    >
                        <motion.div
                            key="brochure-modal"
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: "#0F172A",
                                border: "1px solid rgba(255,255,255,0.15)",
                                borderRadius: "20px",
                                maxWidth: brochureModal.step === "preview" ? "1050px" : "600px",
                                width: "100%",
                                maxHeight: "92vh",
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                                boxShadow: "0 30px 70px -15px rgba(0,0,0,0.8)",
                                transition: "max-width 0.35s ease"
                            }}
                        >
                            {/* ── Modal Header ── */}
                            <div style={{
                                padding: "18px 24px",
                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                background: "rgba(15,23,42,0.95)",
                                flexShrink: 0
                            }}>
                                <div>
                                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-display)", margin: 0 }}>
                                        {brochureModal.product.title} — Official Brochure
                                    </h3>
                                    <span style={{ fontSize: "0.78rem", color: "#94A3B8", fontFamily: "var(--font-mono)" }}>
                                        {brochureModal.step === "preview"
                                            ? "SAMSAN Technische Labs Enterprise Documentation"
                                            : brochureModal.step === "form"
                                            ? "Complete the enquiry form to unlock brochure access"
                                            : "Brochure access granted — enquiry sent to our team"}
                                    </span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    {brochureModal.step === "form" && (
                                        <button
                                            type="button"
                                            onClick={() => setBrochureModal(prev => prev ? { ...prev, step: "preview" } : null)}
                                            aria-label="Back to preview"
                                            style={{
                                                background: "rgba(255,255,255,0.06)",
                                                border: "1px solid rgba(255,255,255,0.12)",
                                                color: "#94A3B8",
                                                padding: "8px 14px",
                                                borderRadius: "8px",
                                                cursor: "pointer",
                                                fontSize: "0.8rem",
                                                fontWeight: 500,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px",
                                                transition: "all 0.2s"
                                            }}
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="15 18 9 12 15 6" /></svg>
                                            Back
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={closeBrochureModal}
                                        aria-label="Close brochure modal"
                                        style={{
                                            background: "rgba(255,255,255,0.08)",
                                            border: "1px solid rgba(255,255,255,0.15)",
                                            color: "#FFFFFF",
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            cursor: "pointer",
                                            fontSize: "1rem",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >✕</button>
                                </div>
                            </div>

                            {/* ══════════════════════════════════════════════
                                STEP 1 — RESTRICTED PREVIEW
                            ══════════════════════════════════════════════ */}
                            {brochureModal.step === "preview" && (
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
                                        minHeight: "420px",
                                        userSelect: "none",
                                        WebkitUserSelect: "none"
                                    }}
                                >
                                    {/* Watermark overlay */}
                                    <div style={{
                                        position: "absolute", inset: 0, zIndex: 10,
                                        pointerEvents: "none", opacity: 0.28,
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='380' height='200'%3E%3Ctext x='50%25' y='50%25' fill='%23FFFFFF' font-size='11' font-family='sans-serif' font-weight='bold' text-anchor='middle' transform='rotate(-25 190 100)' opacity='0.75'%3ESAMSAN TECH LABS %E2%80%A2 PROTECTED PREVIEW%3C/text%3E%3C/svg%3E")`,
                                        backgroundRepeat: "repeat"
                                    }} />

                                    {/* Floating restricted-access CTA overlay */}
                                    <div style={{
                                        position: "absolute", top: "50%", left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        zIndex: 20,
                                        background: "rgba(15,23,42,0.92)",
                                        backdropFilter: "blur(20px)",
                                        WebkitBackdropFilter: "blur(20px)",
                                        border: "1px solid rgba(232,82,26,0.45)",
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
                                        {/* Badge */}
                                        <div style={{
                                            display: "inline-flex", alignItems: "center", gap: "6px",
                                            padding: "6px 14px", borderRadius: "100px",
                                            background: "rgba(232,82,26,0.15)",
                                            border: "1px solid rgba(232,82,26,0.35)",
                                            color: "#FF8C5A", fontSize: "0.8rem", fontWeight: 700,
                                            fontFamily: "var(--font-mono)", letterSpacing: "0.1em",
                                            textTransform: "uppercase"
                                        }}>
                                            🔒 Restricted Preview Mode
                                        </div>

                                        <h4 style={{
                                            color: "#FFFFFF", fontSize: "1.45rem", fontWeight: 700,
                                            fontFamily: "var(--font-display)", lineHeight: 1.3, margin: 0
                                        }}>
                                            Full Spec Content Protected
                                        </h4>

                                        <p style={{
                                            color: "#94A3B8", fontSize: "0.95rem", lineHeight: 1.65,
                                            fontFamily: "var(--font-body)", maxWidth: "480px", margin: 0
                                        }}>
                                            This preview is restricted to low-resolution blurred mode.
                                            Submit a quick enquiry to get instant access to the full
                                            high-resolution brochure &amp; specifications.
                                        </p>

                                        {/* CTA Buttons */}
                                        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
                                            <button
                                                type="button"
                                                onClick={() => setBrochureModal(prev => prev ? { ...prev, step: "form", pendingAction: "view" } : null)}
                                                style={{
                                                    padding: "12px 24px", borderRadius: "10px",
                                                    background: "rgba(255,255,255,0.08)",
                                                    border: "1px solid rgba(255,255,255,0.2)",
                                                    color: "#FFFFFF", fontWeight: 600, fontSize: "0.9rem",
                                                    cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px",
                                                    transition: "all 0.2s ease"
                                                }}
                                            >
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                                View Brochure
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setBrochureModal(prev => prev ? { ...prev, step: "form", pendingAction: "download" } : null)}
                                                style={{
                                                    padding: "12px 24px", borderRadius: "10px",
                                                    background: "#E8521A",
                                                    border: "none",
                                                    color: "#FFFFFF", fontWeight: 600, fontSize: "0.9rem",
                                                    cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px",
                                                    boxShadow: "0 4px 18px rgba(232,82,26,0.45)",
                                                    transition: "all 0.2s ease"
                                                }}
                                            >
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                    <polyline points="7 10 12 15 17 10" />
                                                    <line x1="12" y1="15" x2="12" y2="3" />
                                                </svg>
                                                Download Full Brochure
                                            </button>
                                        </div>
                                    </div>

                                    {/* Blurred brochure content in background */}
                                    <div style={{
                                        width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                                        filter: "blur(6px) brightness(0.9)",
                                        pointerEvents: "none", userSelect: "none"
                                    }}>
                                        {brochureModal.product.brochurePath?.toLowerCase().endsWith(".pdf") ? (
                                            <iframe
                                                src={brochureModal.product.brochurePath}
                                                style={{ width: "100%", height: "72vh", border: "none", borderRadius: "12px", pointerEvents: "none" }}
                                                title={brochureModal.product.title}
                                            />
                                        ) : (
                                            <img
                                                src={brochureModal.product.brochurePath || "/brochures/digital-cockpit-brochure.png"}
                                                alt={brochureModal.product.title}
                                                draggable={false}
                                                style={{ maxWidth: "100%", maxHeight: "75vh", objectFit: "contain", borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* ══════════════════════════════════════════════
                                STEP 2 — ENQUIRY FORM
                            ══════════════════════════════════════════════ */}
                            {brochureModal.step === "form" && (
                                <div style={{ padding: "32px", overflowY: "auto", flexGrow: 1 }}>
                                    {/* Context banner */}
                                    <div style={{
                                        display: "flex", alignItems: "center", gap: "12px",
                                        padding: "14px 18px", borderRadius: "12px",
                                        background: "rgba(232,82,26,0.08)",
                                        border: "1px solid rgba(232,82,26,0.2)",
                                        marginBottom: "24px"
                                    }}>
                                        <span style={{ fontSize: "1.4rem" }}>📄</span>
                                        <div>
                                            <p style={{ margin: 0, color: "#FF8C5A", fontWeight: 600, fontSize: "0.85rem", fontFamily: "var(--font-mono)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Brochure Access Request</p>
                                            <p style={{ margin: 0, color: "#94A3B8", fontSize: "0.88rem", marginTop: "2px" }}>Unlocking access to <strong style={{ color: "#FFFFFF" }}>{brochureModal.product.title}</strong> official brochure</p>
                                        </div>
                                    </div>

                                    {/* Error banner */}
                                    {bServerError && (
                                        <div style={{
                                            padding: "12px 16px", borderRadius: "10px",
                                            background: "rgba(239,68,68,0.1)",
                                            border: "1px solid rgba(239,68,68,0.3)",
                                            color: "#FCA5A5", fontSize: "0.88rem", marginBottom: "20px"
                                        }}>
                                            {bServerError}
                                        </div>
                                    )}

                                    <form onSubmit={handleBrochureSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                        {/* Name */}
                                        <div>
                                            <label style={{ display: "block", color: "#CBD5E1", fontSize: "0.84rem", fontWeight: 500, marginBottom: "6px" }}>
                                                Full Name <span style={{ color: "#E8521A" }}>*</span>
                                            </label>
                                            <input
                                                type="text" placeholder="Your full name"
                                                value={bName}
                                                onChange={e => { setBName(e.target.value); setBErrors(p => ({ ...p, name: "" })); }}
                                                disabled={bSubmitting}
                                                style={{
                                                    width: "100%", padding: "11px 14px", borderRadius: "9px", fontSize: "0.9rem",
                                                    background: "rgba(255,255,255,0.05)",
                                                    border: `1px solid ${bErrors.name ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.12)"}`,
                                                    color: "#FFFFFF", outline: "none", boxSizing: "border-box"
                                                }}
                                            />
                                            {bErrors.name && <p style={{ margin: "4px 0 0", color: "#FCA5A5", fontSize: "0.8rem" }}>{bErrors.name}</p>}
                                        </div>

                                        {/* Company */}
                                        <div>
                                            <label style={{ display: "block", color: "#CBD5E1", fontSize: "0.84rem", fontWeight: 500, marginBottom: "6px" }}>
                                                Company Name <span style={{ color: "#E8521A" }}>*</span>
                                            </label>
                                            <input
                                                type="text" placeholder="Your company or organisation"
                                                value={bCompany}
                                                onChange={e => { setBCompany(e.target.value); setBErrors(p => ({ ...p, company: "" })); }}
                                                disabled={bSubmitting}
                                                style={{
                                                    width: "100%", padding: "11px 14px", borderRadius: "9px", fontSize: "0.9rem",
                                                    background: "rgba(255,255,255,0.05)",
                                                    border: `1px solid ${bErrors.company ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.12)"}`,
                                                    color: "#FFFFFF", outline: "none", boxSizing: "border-box"
                                                }}
                                            />
                                            {bErrors.company && <p style={{ margin: "4px 0 0", color: "#FCA5A5", fontSize: "0.8rem" }}>{bErrors.company}</p>}
                                        </div>

                                        {/* Email + Phone side-by-side */}
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                                            <div>
                                                <label style={{ display: "block", color: "#CBD5E1", fontSize: "0.84rem", fontWeight: 500, marginBottom: "6px" }}>
                                                    Email Address <span style={{ color: "#E8521A" }}>*</span>
                                                </label>
                                                <input
                                                    type="email" placeholder="Work email"
                                                    value={bEmail}
                                                    onChange={e => { setBEmail(e.target.value); setBErrors(p => ({ ...p, email: "" })); }}
                                                    disabled={bSubmitting}
                                                    style={{
                                                        width: "100%", padding: "11px 14px", borderRadius: "9px", fontSize: "0.9rem",
                                                        background: "rgba(255,255,255,0.05)",
                                                        border: `1px solid ${bErrors.email ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.12)"}`,
                                                        color: "#FFFFFF", outline: "none", boxSizing: "border-box"
                                                    }}
                                                />
                                                {bErrors.email && <p style={{ margin: "4px 0 0", color: "#FCA5A5", fontSize: "0.8rem" }}>{bErrors.email}</p>}
                                            </div>
                                            <div>
                                                <label style={{ display: "block", color: "#CBD5E1", fontSize: "0.84rem", fontWeight: 500, marginBottom: "6px" }}>
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel" placeholder="Optional"
                                                    value={bPhone}
                                                    onChange={e => setBPhone(e.target.value)}
                                                    disabled={bSubmitting}
                                                    style={{
                                                        width: "100%", padding: "11px 14px", borderRadius: "9px", fontSize: "0.9rem",
                                                        background: "rgba(255,255,255,0.05)",
                                                        border: "1px solid rgba(255,255,255,0.12)",
                                                        color: "#FFFFFF", outline: "none", boxSizing: "border-box"
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Product of interest (read-only) */}
                                        <div>
                                            <label style={{ display: "block", color: "#CBD5E1", fontSize: "0.84rem", fontWeight: 500, marginBottom: "6px" }}>
                                                Product of Interest
                                            </label>
                                            <input
                                                type="text"
                                                value={PRODUCT_DISPLAY_MAP[brochureModal.product.id] || brochureModal.product.title}
                                                readOnly
                                                style={{
                                                    width: "100%", padding: "11px 14px", borderRadius: "9px", fontSize: "0.9rem",
                                                    background: "rgba(255,255,255,0.03)",
                                                    border: "1px solid rgba(255,255,255,0.08)",
                                                    color: "#64748B", outline: "none", cursor: "not-allowed", boxSizing: "border-box"
                                                }}
                                            />
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label style={{ display: "block", color: "#CBD5E1", fontSize: "0.84rem", fontWeight: 500, marginBottom: "6px" }}>
                                                Enquiry Message <span style={{ color: "#E8521A" }}>*</span>
                                            </label>
                                            <textarea
                                                placeholder="Describe your use case or project context..."
                                                rows={4}
                                                value={bMessage}
                                                onChange={e => { setBMessage(e.target.value); setBErrors(p => ({ ...p, message: "" })); }}
                                                disabled={bSubmitting}
                                                style={{
                                                    width: "100%", padding: "11px 14px", borderRadius: "9px", fontSize: "0.9rem",
                                                    background: "rgba(255,255,255,0.05)",
                                                    border: `1px solid ${bErrors.message ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.12)"}`,
                                                    color: "#FFFFFF", outline: "none", resize: "vertical",
                                                    fontFamily: "inherit", boxSizing: "border-box"
                                                }}
                                            />
                                            {bErrors.message && <p style={{ margin: "4px 0 0", color: "#FCA5A5", fontSize: "0.8rem" }}>{bErrors.message}</p>}
                                        </div>

                                        {/* Submit */}
                                        <button
                                            type="submit"
                                            disabled={bSubmitting}
                                            style={{
                                                padding: "14px 28px", borderRadius: "10px",
                                                background: bSubmitting ? "rgba(232,82,26,0.5)" : "#E8521A",
                                                border: "none", color: "#FFFFFF", fontWeight: 700,
                                                fontSize: "0.95rem", cursor: bSubmitting ? "not-allowed" : "pointer",
                                                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                                boxShadow: bSubmitting ? "none" : "0 4px 18px rgba(232,82,26,0.4)",
                                                transition: "all 0.2s ease", marginTop: "4px"
                                            }}
                                        >
                                            {bSubmitting ? (
                                                <>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                                    </svg>
                                                    Submitting Enquiry...
                                                </>
                                            ) : (
                                                <>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                                        <path d="M9 12l2 2 4-4" />
                                                        <path d="M21 12V7l-9-4L3 7v10l9 4 2.5-1.1" />
                                                    </svg>
                                                    Submit Enquiry &amp; Unlock Brochure →
                                                </>
                                            )}
                                        </button>

                                        <p style={{ margin: 0, color: "#64748B", fontSize: "0.78rem", textAlign: "center" }}>
                                            Your enquiry will be sent to the SAMSAN engineering team. Brochure access is granted immediately after submission.
                                        </p>
                                    </form>
                                </div>
                            )}

                            {/* ══════════════════════════════════════════════
                                STEP 3 — SUCCESS / BROCHURE ACCESS
                            ══════════════════════════════════════════════ */}
                            {brochureModal.step === "success" && (
                                <div style={{
                                    padding: "40px 36px", display: "flex", flexDirection: "column",
                                    alignItems: "center", textAlign: "center", gap: "20px", flexGrow: 1
                                }}>
                                    {/* Animated success ring */}
                                    <div style={{
                                        width: "72px", height: "72px", borderRadius: "50%",
                                        background: "rgba(16,185,129,0.12)",
                                        border: "2px solid rgba(16,185,129,0.4)",
                                        display: "flex", alignItems: "center", justifyContent: "center"
                                    }}>
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>

                                    <div>
                                        <h3 style={{ margin: 0, color: "#FFFFFF", fontSize: "1.4rem", fontWeight: 700, fontFamily: "var(--font-display)" }}>
                                            Brochure Access Granted! 🎉
                                        </h3>
                                        <p style={{ margin: "8px 0 0", color: "#94A3B8", fontSize: "0.92rem", lineHeight: 1.6 }}>
                                            Thank you, <strong style={{ color: "#FFFFFF" }}>{bName}</strong>. Your enquiry has been sent to the SAMSAN team.
                                            Access the <strong style={{ color: "#FFFFFF" }}>{brochureModal.product.title}</strong> official brochure below.
                                        </p>
                                    </div>

                                    {/* Brochure card */}
                                    <div style={{
                                        width: "100%", padding: "20px", borderRadius: "14px",
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        display: "flex", alignItems: "center", justifyContent: "space-between",
                                        gap: "16px", flexWrap: "wrap"
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                            <div style={{
                                                width: "46px", height: "46px", borderRadius: "10px",
                                                background: "rgba(16,185,129,0.1)",
                                                border: "1px solid rgba(16,185,129,0.25)",
                                                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                                            }}>
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                    <polyline points="14 2 14 8 20 8" />
                                                    <line x1="16" y1="13" x2="8" y2="13" />
                                                    <line x1="16" y1="17" x2="8" y2="17" />
                                                </svg>
                                            </div>
                                            <div style={{ textAlign: "left" }}>
                                                <strong style={{ display: "block", color: "#FFFFFF", fontSize: "0.9rem" }}>
                                                    {PRODUCT_DISPLAY_MAP[brochureModal.product.id] || brochureModal.product.title} — Technical Brochure
                                                </strong>
                                                <small style={{ color: "#64748B", fontSize: "0.78rem" }}>Official Documentation · Access Granted</small>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
                                            {brochureModal.product.brochurePath && (
                                                <>
                                                    <a
                                                        href={brochureModal.product.brochurePath}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            padding: "10px 18px", borderRadius: "8px",
                                                            background: "rgba(255,255,255,0.07)",
                                                            border: "1px solid rgba(255,255,255,0.15)",
                                                            color: "#FFFFFF", fontWeight: 600, fontSize: "0.85rem",
                                                            textDecoration: "none", display: "inline-flex",
                                                            alignItems: "center", gap: "6px"
                                                        }}
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                                        View
                                                    </a>
                                                    <a
                                                        href={brochureModal.product.brochurePath}
                                                        download={`SAMSAN-${(PRODUCT_DISPLAY_MAP[brochureModal.product.id] || brochureModal.product.title).replace(/[™©®]/g, "").trim()}-Brochure`}
                                                        style={{
                                                            padding: "10px 18px", borderRadius: "8px",
                                                            background: "#E8521A",
                                                            border: "none",
                                                            color: "#FFFFFF", fontWeight: 600, fontSize: "0.85rem",
                                                            textDecoration: "none", display: "inline-flex",
                                                            alignItems: "center", gap: "6px",
                                                            boxShadow: "0 4px 14px rgba(232,82,26,0.4)"
                                                        }}
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                            <polyline points="7 10 12 15 17 10" />
                                                            <line x1="12" y1="15" x2="12" y2="3" />
                                                        </svg>
                                                        Download
                                                    </a>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <p style={{ margin: 0, color: "#64748B", fontSize: "0.8rem" }}>
                                        ✓ Enquiry sent to <strong style={{ color: "#94A3B8" }}>info@samsanlabs.com</strong> &amp; <strong style={{ color: "#94A3B8" }}>india@samsanlabs.com</strong>.
                                        Our team will follow up with you shortly.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={closeBrochureModal}
                                        style={{
                                            padding: "10px 22px", borderRadius: "8px",
                                            background: "transparent",
                                            border: "1px solid rgba(255,255,255,0.15)",
                                            color: "#94A3B8", fontSize: "0.85rem", cursor: "pointer"
                                        }}
                                    >Close</button>
                                </div>
                            )}

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>



        </div>
    );
}
