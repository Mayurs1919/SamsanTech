"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ServiceCard, { Logos, WifiIcon, BluetoothIcon, MqttIcon, type TechChip } from "@/components/ui/ServiceCard";

// ── Embedded service card data ───────────────────────────────────
const embeddedCards = [
    {
        number: "01",
        title: "Embedded Software",
        iconColor: "#06B6D4",
        description: "Platform software, OS, and middleware for automotive MCUs and devices.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M9 9h6v6H9z" />
                <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
            </svg>
        ),
        techs: [
            { label: "AUTOSAR", isBadge: true },
            { label: "Linux", logoUrl: Logos.linux },
            { label: "Android", logoUrl: Logos.android },
            { label: "QNX", isBadge: true },
            { label: "Bluetooth", icon: <BluetoothIcon /> },
            { label: "Wi-Fi", icon: <WifiIcon /> },
            { label: "CAN Bus", isBadge: true },
        ] as TechChip[]
    },
    {
        number: "02",
        title: "Internet of Things (IoT)",
        iconColor: "#F59E0B",
        description: "End-to-end IoT development from edge devices to cloud — with AI/ML integration.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
            </svg>
        ),
        techs: [
            { label: "MQTT", icon: <MqttIcon /> },
            { label: "AWS", logoUrl: Logos.aws },
            { label: "Firebase", logoUrl: Logos.firebase },
            { label: "TensorFlow", logoUrl: Logos.tensorflow },
            { label: "Node.js", logoUrl: Logos.nodejs },
            { label: "Docker", logoUrl: Logos.docker },
            { label: "Kubernetes", logoUrl: Logos.kubernetes },
        ] as TechChip[]
    },
    {
        number: "03",
        title: "Hardware Design",
        iconColor: "#10B981",
        description: "Electronic design and simulation across automotive, industrial, IoT, and custom domains.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <path d="M6 14h4v4M6 6h6v4M18 6h-4v4M14 18v-4h4" />
                <circle cx="10" cy="14" r="1" /><circle cx="12" cy="10" r="1" />
                <circle cx="14" cy="10" r="1" /><circle cx="14" cy="14" r="1" />
            </svg>
        ),
        techs: [
            { label: "SoC", isBadge: true },
            { label: "SaM", isBadge: true },
            { label: "SBC", isBadge: true },
            { label: "PCB Layout", isBadge: true },
            { label: "SPICE Sim", isBadge: true },
        ] as TechChip[]
    },
    {
        number: "04",
        title: "Verification & Validation",
        iconColor: "#8B5CF6",
        description: "Comprehensive testing from functional to environmental — with industry-standard toolchains.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 11 2 2 4-4" />
            </svg>
        ),
        techs: [
            { label: "MATLAB", isBadge: true },
            { label: "LabVIEW", isBadge: true },
            { label: "Rhapsody", isBadge: true },
            { label: "Canata++", isBadge: true },
            { label: "dSpace HIL", isBadge: true },
            { label: "Jenkins", logoUrl: Logos.jenkins },
            { label: "GitHub", logoUrl: Logos.github },
        ] as TechChip[]
    },
    {
        number: "05",
        title: "AUTOSAR, Functional Safety & Cybersecurity",
        iconColor: "#EF4444",
        description: "Expert consulting across AUTOSAR architecture, ISO 26262 functional safety, and automotive cybersecurity.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
        techs: [
            { label: "AUTOSAR", isBadge: true },
            { label: "ISO 26262", isBadge: true },
            { label: "UNECE WP.29", isBadge: true },
            { label: "FuSa", isBadge: true },
            { label: "CySec", isBadge: true },
        ] as TechChip[]
    }
];

// ── Showcase image data ──────────────────────────────────────────
const showcaseAutomotive = [
    { label: "Digital Dashboard Systems", url: "/images/digital-dashboard-systems.jpg" },
    { label: "Driver Assistance Displays", url: "/images/driver-assistance-displays.jpg" },
    { label: "In-Car Display Integration", url: "/images/in-car-display-integration.jpg" },
    { label: "Speed Recognition Systems", url: "/images/speed-recognition-systems.jpg" }
];

const showcaseProducts = [
    { label: "Handheld Scanning Devices", url: "/images/handheld-scanning-devices.jpg" },
    { label: "Robotic & Optical Instruments", url: "/images/robotic-optical-instruments.jpg" },
    { label: "Home Media Systems", url: "/images/home-media-systems.jpg" },
    { label: "PCB & SBC Boards", url: "/images/pcb-sbc-boards.jpg" }
];

// ── Digital product card data ────────────────────────────────────
const digitalCards = [
    {
        number: "01",
        title: "Vemeego",
        iconColor: "#8B5CF6",
        image: "/images/vemeego.png",
        description: "An intelligent workspace and video conferencing platform built for remote and corporate collaboration. Developed under the Make in India initiative by SAMSAN Technische Labs.",
        techs: [
            { label: "React", logoUrl: Logos.react },
            { label: "Node.js", logoUrl: Logos.nodejs },
            { label: "WebRTC", isBadge: true },
            { label: "Make in India", isBadge: true },
        ] as TechChip[],
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 8-6 4 6 4V8Z" /><rect x="2" y="6" width="14" height="12" rx="2" ry="2" />
            </svg>
        ),
        slug: "vemeego"
    },
    {
        number: "02",
        title: "PiknikNow",
        iconColor: "#10B981",
        image: "/images/pikniknow.jpg",
        description: "Discover unique picnic spots nearby, share travel stories with fellow explorers, and plan adventures to hidden destinations.",
        techs: [
            { label: "Flutter", logoUrl: Logos.flutter },
            { label: "Firebase", logoUrl: Logos.firebase },
            { label: "Maps API", isBadge: true },
            { label: "Social", isBadge: true },
        ] as TechChip[],
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
            </svg>
        ),
        slug: "pikniknow"
    },
    {
        number: "03",
        title: "vSeva",
        iconColor: "#EC4899",
        image: undefined,
        description: "[Content Pending from CEO]",
        techs: [
            { label: "PLACEHOLDER — awaiting CEO tech stack info", isBadge: true },
        ] as TechChip[],
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
        slug: "vseva"
    }
];

// ── Showcase Image Card Component ────────────────────────────────
function ShowcaseImageCard({ label, imageUrl }: { label: string; imageUrl: string }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            style={{ display: "flex", flexDirection: "column" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={{
                position: "relative",
                aspectRatio: "16/9",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid var(--border)"
            }}>
                <img
                    src={imageUrl}
                    alt={label}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        display: "block",
                        transform: hovered ? "scale(1.04)" : "scale(1)",
                        transition: "transform 0.35s ease",
                        borderRadius: "inherit"
                    }}
                />
                <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 50%, rgba(10, 13, 17, 0.7) 100%)",
                    pointerEvents: "none"
                }} />
            </div>
            <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
                marginTop: "10px"
            }}>
                {label}
            </div>
        </div>
    );
}

// ── Animation Variants ───────────────────────────────────────────
const cardAnimationVariants = (shouldReduce: boolean) => ({
    hidden: {
        opacity: 0,
        y: shouldReduce ? 0 : 24
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: shouldReduce
            ? { duration: 0 }
            : { duration: 0.5, ease: "easeOut" as const }
    }
});

const containerAnimationVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const labelAnimationVariants = (shouldReduce: boolean) => ({
    hidden: {
        opacity: 0,
        y: shouldReduce ? 0 : 24
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: shouldReduce
            ? { duration: 0 }
            : { duration: 0.4, ease: "easeOut" as const }
    }
});

// ── Page component ───────────────────────────────────────────────
export default function ServicesPage() {
    const shouldReduce = useReducedMotion() ?? false;

    return (
        <div style={{ paddingBottom: "100px" }}>

            {/* SECTION 0 — PAGE HEADER */}
            <section className="page-hero" aria-labelledby="services-page-heading" style={{ padding: "80px 0" }}>
                <div className="hero-glow" style={{ opacity: 0.15 }} />
                <div className="container">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 }
                        }}
                    >
                        <motion.div
                            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                            transition={shouldReduce ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
                        >
                            <span className="badge" style={{ marginBottom: "24px", letterSpacing: "0.12em", fontFamily: "var(--font-mono)" }}>
                                // Engineering Offerings
                            </span>
                        </motion.div>
                        <motion.h1
                            id="services-page-heading"
                            style={{ marginBottom: "20px", fontWeight: 700, lineHeight: 1.08 }}
                            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                            transition={shouldReduce ? { duration: 0 } : { duration: 0.6, ease: "easeOut", delay: 0.1 }}
                        >
                            Excellence in Product Design Engineering for High-Tech Industries
                        </motion.h1>
                        <motion.p
                            className="lead"
                            style={{ maxWidth: "640px", fontSize: "1.1rem", lineHeight: "1.7", color: "var(--text-secondary)" }}
                            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                            transition={shouldReduce ? { duration: 0 } : { duration: 0.6, ease: "easeOut", delay: 0.35 }}
                        >
                            Two core practice areas — Automotive Embedded Engineering and Digital Solutions — delivered by 50+ domain-aligned engineers across global OEM and Tier-1 engagements.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 1 — AUTOMOTIVE EMBEDDED SOLUTIONS */}
            <section className="section" style={{ borderTop: "1px solid var(--border)", padding: "80px 0" }} aria-labelledby="embedded-solutions-heading">
                <div className="container">
                    <div style={{ marginBottom: "48px" }}>
                        <motion.span
                            className="badge"
                            variants={labelAnimationVariants(shouldReduce)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            style={{ marginBottom: "8px", display: "inline-block" }}
                        >
                            // Automotive Embedded Solutions & Products
                        </motion.span>
                        <h2 id="embedded-solutions-heading" style={{ marginTop: "0", marginBottom: "16px", fontWeight: 700, letterSpacing: "0.01em" }}>
                            Embedded Engineering, End to End.
                        </h2>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6"
                        variants={containerAnimationVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {embeddedCards.map((card, idx) => {
                            let colClass = "col-span-1 md:col-span-1 lg:col-span-2";
                            if (idx === 3) colClass = "col-span-1 md:col-span-1 lg:col-span-2 lg:col-start-2";
                            if (idx === 4) colClass = "col-span-1 md:col-span-2 lg:col-span-2 lg:col-start-4";

                            return (
                                <motion.div key={card.title} className={colClass} variants={cardAnimationVariants(shouldReduce)}>
                                    <ServiceCard
                                        number={card.number}
                                        title={card.title}
                                        description={card.description}
                                        icon={card.icon}
                                        iconColor={card.iconColor}
                                        techs={card.techs}
                                    />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2 — PRODUCT SHOWCASE */}
            <section className="section" style={{ borderTop: "1px solid var(--border)", background: "rgba(10,15,28,0.2)", padding: "80px 0" }} aria-labelledby="showcase-heading">
                <div className="container">
                    <div style={{ marginBottom: "40px" }}>
                        <motion.span
                            className="badge"
                            variants={labelAnimationVariants(shouldReduce)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            style={{ marginBottom: "8px", display: "inline-block" }}
                        >
                            // Real-World Applications
                        </motion.span>
                        <h2 id="showcase-heading" style={{ marginTop: "0", marginBottom: "16px", fontWeight: 700, letterSpacing: "0.01em" }}>
                            Embedded Solutions in Action.
                        </h2>
                        <p style={{ fontSize: "1rem", lineHeight: "1.65", maxWidth: "580px", color: "var(--text-secondary)", margin: "0" }}>
                            Real-world automotive applications across digital dashboards, driver assistance systems, in-car displays, and speed recognition.
                        </p>
                    </div>

                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        variants={containerAnimationVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {showcaseAutomotive.map((item) => (
                            <motion.div key={item.label} variants={cardAnimationVariants(shouldReduce)}>
                                <ShowcaseImageCard label={item.label} imageUrl={item.url} />
                            </motion.div>
                        ))}
                    </motion.div>

                    <div style={{ marginTop: "56px", marginBottom: "32px" }}>
                        <motion.span
                            className="badge rose"
                            variants={labelAnimationVariants(shouldReduce)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            // Engineering Products
                        </motion.span>
                    </div>

                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        variants={containerAnimationVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {showcaseProducts.map((item) => (
                            <motion.div key={item.label} variants={cardAnimationVariants(shouldReduce)}>
                                <ShowcaseImageCard label={item.label} imageUrl={item.url} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* SECTION 3 — DIGITAL SOLUTIONS */}
            <section className="section" style={{ borderTop: "1px solid var(--border)", padding: "80px 0" }} aria-labelledby="digital-solutions-heading">
                <div className="container">
                    <div style={{ marginBottom: "48px" }}>
                        <motion.span
                            className="badge"
                            variants={labelAnimationVariants(shouldReduce)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            style={{ marginBottom: "8px", display: "inline-block" }}
                        >
                            // Digital Solutions & Products
                        </motion.span>
                        <h2 id="digital-solutions-heading" style={{ marginTop: "0", marginBottom: "16px", fontWeight: 700, letterSpacing: "0.01em" }}>
                            Software Products Built for the Next Generation.
                        </h2>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerAnimationVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {digitalCards.map((card) => (
                            <motion.div key={card.title} className="col-span-1" variants={cardAnimationVariants(shouldReduce)}>
                                <ServiceCard
                                    number={card.number}
                                    title={card.title}
                                    description={card.description}
                                    icon={card.icon}
                                    iconColor={card.iconColor}
                                    image={card.image}
                                    techs={card.techs}
                                    contactSlug={card.slug}
                                    isPending={card.title === "vSeva"}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* SECTION 4 — BOTTOM CTA */}
            <section className="cta-section" style={{ padding: "80px 0" }} aria-labelledby="services-cta-heading">
                <div className="container">
                    <motion.div
                        className="cta-inner"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 id="services-cta-heading">Ready to scope an engineering engagement?</h2>
                        <p className="lead">
                            Tell us what you're building — we'll match the right discipline and team to your program.
                        </p>
                        <div className="cta-actions">
                            <Link href="/contact?product=engineering-offerings" className="btn btn-primary" id="services-cta-btn">
                                Request Capability Walkthrough
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
