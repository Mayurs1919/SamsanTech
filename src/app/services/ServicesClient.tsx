"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import ServiceCard, { Logos, type TechChip } from "@/components/ui/ServiceCard";
import { manrope, inter } from "@/app/solutions/fonts";
import { Button } from "@/components/theme-light/Button";
import { CtaBand } from "@/components/theme-light/CtaBand";
import { Eyebrow } from "@/components/theme-light/Eyebrow";
import { Hero } from "@/components/theme-light/Hero";
import { Section } from "@/components/theme-light/Section";

// ── Engineering service data ─────────────────────────────────────
const specializedCards = [
    {
        number: "01",
        title: "System Engineering",
        iconColor: "#06B6D4",
        description: "E/E architecture, system architecture, MBSE, functional decomposition, requirements engineering, interface definition, system integration, diagnostics, safety, cybersecurity, and V&V.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="5" r="3" />
                <circle cx="5" cy="19" r="3" />
                <circle cx="19" cy="19" r="3" />
                <path d="M12 8v8M12 16H5M12 16h7" />
            </svg>
        ),
        techs: [
            { label: "IBM DOORS", isBadge: true },
            { label: "Polarion", isBadge: true },
            { label: "Jama", isBadge: true },
            { label: "Enterprise Architect", isBadge: true },
            { label: "PREEvision", isBadge: true },
            { label: "CANoe", isBadge: true },
            { label: "CANalyzer", isBadge: true },
            { label: "CANdb++", isBadge: true },
        ] as TechChip[]
    },
    {
        number: "02",
        title: "Platform Engineering",
        iconColor: "#F59E0B",
        description: "Enables OEMs and Tier-1s to build scalable platforms for eCockpit, Infotainment, Digital Cluster, ADAS, DMS, Telematics, Gateway, and other domain/zonal ECUs, with support for Linux, Android Automotive, QNX, and AUTOSAR-based environments.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5M12 2L2 7l10 5 10-5-10-5z" />
            </svg>
        ),
        techs: [
            { label: "NVIDIA Jetson", isBadge: true },
            { label: "Qualcomm", isBadge: true },
            { label: "TI", isBadge: true },
            { label: "Renesas", isBadge: true },
            { label: "NXP", isBadge: true },
            { label: "Telechips", isBadge: true },
            { label: "Linux", logoUrl: Logos.linux },
            { label: "Yocto", isBadge: true },
            { label: "QNX", isBadge: true },
            { label: "Android Automotive", logoUrl: Logos.android },
            { label: "FreeRTOS", isBadge: true },
            { label: "AUTOSAR", isBadge: true },
            { label: "ISO 26262", isBadge: true },
            { label: "ISO 21434", isBadge: true },
            { label: "ASPICE", isBadge: true },
            { label: "MISRA", isBadge: true },
        ] as TechChip[]
    },
    {
        number: "03",
        title: "V&V Services",
        iconColor: "#10B981",
        description: "Complete V&V lifecycle — from requirements analysis and test-case development to automated testing, integration testing, HIL/SIL/MIL validation, defect management, regression testing, and final release validation.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 11 2 2 4-4" />
            </svg>
        ),
        techs: [
            { label: "DOORS", isBadge: true },
            { label: "Polarion", isBadge: true },
            { label: "CAPL", isBadge: true },
            { label: "dSPACE HIL", isBadge: true },
            { label: "MATLAB/Simulink", isBadge: true },
            { label: "CANoe", isBadge: true },
            { label: "CANalyzer", isBadge: true },
            { label: "TRACE32", isBadge: true },
            { label: "GDB", isBadge: true },
            { label: "Wireshark", isBadge: true },
        ] as TechChip[]
    },
    {
        number: "04",
        title: "HMI Development",
        iconColor: "#8B5CF6",
        description: "Development of intuitive, responsive, and automotive-grade HMI for digital cockpit systems, including Digital Instrument Cluster, Infotainment/IVI, Head-Up Display (HUD), Rear Seat Entertainment, DMS/ADAS visualization, and vehicle settings.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
        techs: [
            { label: "Qt/QML", logoUrl: Logos.qt },
            { label: "OpenGL ES", isBadge: true },
            { label: "Android Automotive", logoUrl: Logos.android },
            { label: "Qt Quick 2D/3D", isBadge: true },
            { label: "Figma", logoUrl: Logos.figma },
            { label: "Android Studio", logoUrl: Logos.android },
        ] as TechChip[]
    },
    {
        number: "05",
        title: "Full-Stack Web Development",
        iconColor: "#3B82F6",
        description: "End-to-end web applications and digital platforms for automotive use cases, covering frontend UI, backend services, APIs, databases, cloud integration, and vehicle/ECU data connectivity.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        techs: [
            { label: "React.js", logoUrl: Logos.react },
            { label: "Angular", logoUrl: Logos.angular },
            { label: "Vue.js", logoUrl: Logos.vue },
            { label: "HTML5", logoUrl: Logos.html5 },
            { label: "CSS3", logoUrl: Logos.css3 },
            { label: "JavaScript", logoUrl: Logos.javascript },
            { label: "TypeScript", logoUrl: Logos.typescript },
            { label: "Node.js", logoUrl: Logos.nodejs },
            { label: "Python", logoUrl: Logos.python },
            { label: "Java", logoUrl: Logos.java },
            { label: "C++", logoUrl: Logos.cplusplus },
            { label: "REST", isBadge: true },
            { label: "GraphQL", isBadge: true },
            { label: "MQTT", isBadge: true },
            { label: "WebSocket", isBadge: true },
            { label: "MySQL", logoUrl: Logos.mysql },
            { label: "MongoDB", logoUrl: Logos.mongodb },
        ] as TechChip[]
    },
    {
        number: "06",
        title: "AI/ML Engineering",
        iconColor: "#10B981",
        description: "Developing, deploying, and optimizing AI/ML solutions for vehicle perception, driver and occupant monitoring, ADAS, intelligent cockpit, and in-vehicle personalization.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" />
            </svg>
        ),
        techs: [
            { label: "Python", logoUrl: Logos.python },
            { label: "PyTorch", logoUrl: Logos.pytorch },
            { label: "CUDA", isBadge: true },
            { label: "TensorRT", isBadge: true },
            { label: "ONNX Runtime", isBadge: true },
            { label: "OpenCV", logoUrl: Logos.opencv },
            { label: "DeepStream", isBadge: true },
            { label: "YOLO", isBadge: true },
            { label: "Detectron2", isBadge: true },
        ] as TechChip[]
    },
    {
        number: "07",
        title: "Cloud Engineering",
        iconColor: "#06B6D4",
        description: "Designing scalable, secure cloud platforms connecting vehicles, ECUs, mobile apps, and backend systems. Enables vehicle data collection, telemetry, remote diagnostics, OTA updates, fleet management, connected services, and AI/ML analytics.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
            </svg>
        ),
        techs: [
            { label: "AWS", logoUrl: Logos.aws },
            { label: "Azure", logoUrl: Logos.azure },
            { label: "Google Cloud", logoUrl: Logos.googlecloud },
            { label: "Docker", logoUrl: Logos.docker },
            { label: "Kubernetes", logoUrl: Logos.kubernetes },
            { label: "Git", logoUrl: Logos.git },
            { label: "GitHub/GitLab", logoUrl: Logos.github },
            { label: "Jenkins", logoUrl: Logos.jenkins },
            { label: "Microservices", isBadge: true },
            { label: "REST", isBadge: true },
            { label: "OAuth 2.0", isBadge: true },
            { label: "TLS/SSL", isBadge: true },
            { label: "WebSockets", isBadge: true },
            { label: "AWS IoT Core", isBadge: true },
            { label: "Azure IoT Hub", isBadge: true },
        ] as TechChip[]
    },
    {
        number: "08",
        title: "Internet of Things (IoT)",
        iconColor: "#F59E0B",
        description: "Enables vehicles, ECUs, sensors, mobile applications, cloud platforms, and backend services to communicate and exchange data in real time — supporting connected vehicle services, remote monitoring, predictive maintenance, diagnostics, fleet management, OTA updates, and analytics.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
            </svg>
        ),
        techs: [
            { label: "MQTT", isBadge: true },
            { label: "HTTPS", isBadge: true },
            { label: "REST APIs", isBadge: true },
            { label: "WebSockets", isBadge: true },
            { label: "OTA Platforms", isBadge: true },
        ] as TechChip[]
    },
    {
        number: "09",
        title: "Hardware Design",
        iconColor: "#EC4899",
        description: "Complete development of electronic hardware for vehicle systems — from concept and architecture through schematic design, PCB layout, prototype development, validation, and production readiness.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <path d="M6 14h4v4M6 6h6v4M18 6h-4v4M14 18v-4h4" />
                <circle cx="10" cy="14" r="1" /><circle cx="12" cy="10" r="1" />
                <circle cx="14" cy="10" r="1" /><circle cx="14" cy="14" r="1" />
            </svg>
        ),
        techs: [
            { label: "Altium Designer", isBadge: true },
            { label: "Cadence OrCAD", isBadge: true },
            { label: "Cadence Allegro", isBadge: true },
            { label: "KiCad", isBadge: true },
            { label: "PSpice/LTspice", isBadge: true },
            { label: "MATLAB/Simulink", isBadge: true },
        ] as TechChip[]
    },
    {
        number: "10",
        title: "Virtualization",
        iconColor: "#EF4444",
        description: "Enables multiple automotive software environments or operating systems to run independently on a single high-performance automotive computing platform — partitioning CPU, GPU, memory, storage, and I/O resources for Infotainment, Digital Cluster, ADAS, DMS, Telematics, and Connectivity domains.",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
                <path d="M7 8h10M7 11h4" />
            </svg>
        ),
        techs: [
            { label: "QNX Hypervisor", isBadge: true },
            { label: "Xen", isBadge: true },
            { label: "Jailhouse", isBadge: true },
            { label: "KVM", isBadge: true },
            { label: "Linux VM", isBadge: true },
            { label: "Android VM", isBadge: true },
            { label: "Guest OS Mgmt", isBadge: true },
        ] as TechChip[]
    },
];

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
export default function ServicesClient() {
    const shouldReduce = useReducedMotion() ?? false;
    const pathname = usePathname();

    if (pathname === "/engineering-offerings") {
        return <EngineeringOfferingsLight />;
    }

    return (
        <div className="offerings-page">

            {/* SECTION 0 — PAGE HEADER */}
            <section className="section-dark page-hero offerings-hero" aria-labelledby="services-page-heading" style={{ background: "linear-gradient(135deg, #080D18 0%, #101B30 58%, #0A1322 100%)", padding: "clamp(128px, 15vw, 184px) 0 clamp(72px, 9vw, 112px)" }}>
                <div className="hero-glow" style={{ opacity: 0.15 }} />
                <div className="container">
                    <motion.div className="offerings-hero-content"
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
                            <span className="badge" style={{ marginBottom: "24px", letterSpacing: "0.12em", fontFamily: "var(--font-mono)", color: "#4DD8E8", background: "rgba(77, 216, 232, 0.08)", border: "1px solid rgba(77, 216, 232, 0.2)" }}>
                                Engineering Offerings
                            </span>
                        </motion.div>
                        <motion.h1
                            id="services-page-heading"
                            style={{ marginBottom: "20px", fontWeight: 750, lineHeight: 1.08, letterSpacing: "-0.035em", color: "#FFFFFF", maxWidth: "900px" }}
                            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                            transition={shouldReduce ? { duration: 0 } : { duration: 0.6, ease: "easeOut", delay: 0.1 }}
                        >
                            Engineering services for the next generation of mobility
                        </motion.h1>
                        <motion.p
                            className="lead"
                            style={{ maxWidth: "700px", fontSize: "clamp(1rem, 1.4vw, 1.15rem)", lineHeight: "1.75", color: "#AAB6C8", margin: "0" }}
                            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                            transition={shouldReduce ? { duration: 0 } : { duration: 0.6, ease: "easeOut", delay: 0.35 }}
                        >
                            From embedded platforms and hardware to connected systems, cloud, AI, and validation, our teams support global OEM and Tier-1 programs across the full engineering lifecycle.
                        </motion.p>
                        <div className="offerings-hero-actions">
                            <Link href="#specialized-services-heading" className="btn btn-primary">Explore capabilities <span aria-hidden="true">↓</span></Link>
                            <Link href="/contact?product=engineering-offerings" className="offerings-contact-link">Discuss your program <span aria-hidden="true">→</span></Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ENGINEERING SERVICES */}
            <section className="section-light section offerings-section" aria-labelledby="specialized-services-heading">
                <div className="container">
                    <div className="offerings-section-heading">
                        <motion.span
                            className="badge"
                            variants={labelAnimationVariants(shouldReduce)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            style={{ marginBottom: "14px", display: "inline-block", color: "#0F9FB1", background: "rgba(77, 216, 232, 0.1)", border: "1px solid rgba(77, 216, 232, 0.28)" }}
                        >
                            Engineering Services
                        </motion.span>
                        <h2 id="specialized-services-heading" style={{ marginTop: "0", marginBottom: "16px", fontWeight: 750, letterSpacing: "-0.025em", color: "#0B1320", maxWidth: "780px" }}>
                            Specialized Services Across the Full Engineering Lifecycle
                        </h2>
                        <p style={{ fontSize: "1.05rem", lineHeight: "1.75", maxWidth: "680px", color: "#526176", margin: "0" }}>
                            Domain-aligned engineering services delivered by 60+ specialists across automotive, embedded, digital, and AI engineering disciplines.
                        </p>
                        <div className="offerings-summary" aria-label="Engineering services overview">
                            <span><strong>10</strong> engineering disciplines</span>
                            <span><strong>50+</strong> domain specialists</span>
                            <span><strong>End-to-end</strong> program support</span>
                        </div>
                    </div>

                    <style>{`
                        .specialized-flex-grid {
                            display: grid;
                            grid-template-columns: repeat(3, minmax(0, 1fr));
                            align-items: stretch;
                            gap: 22px;
                        }
                        .specialized-card-wrapper { min-width: 0; display: flex; }
                        .specialized-card-wrapper > div { min-height: 100%; }
                        @media (min-width: 1025px) {
                            .specialized-card-wrapper:last-child:nth-child(3n + 1) { grid-column: 2; }
                        }
                        @media (max-width: 1024px) {
                            .specialized-flex-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                        }
                        @media (max-width: 640px) {
                            .specialized-flex-grid { grid-template-columns: minmax(0, 1fr); gap: 16px; }
                        }
                    `}</style>

                    <motion.div className="specialized-flex-grid"
                        variants={containerAnimationVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {specializedCards
                            .slice()
                            .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }))
                            .map((card, index) => (
                                <motion.div key={card.title} className="specialized-card-wrapper" variants={cardAnimationVariants(shouldReduce)}>
                                    <ServiceCard
                                        number={String(index + 1).padStart(2, "0")}
                                        title={card.title}
                                        description={card.description}
                                        icon={card.icon}
                                        iconColor={card.iconColor}
                                        techs={card.techs}
                                        techsLabel="CAPABILITIES"
                                        theme="light"
                                        compact
                                    />
                                </motion.div>
                            ))}
                    </motion.div>
                </div>
            </section>

            {/* CONTACT CTA */}
            <section
                className="section-light offerings-cta"
                style={{ background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}
                aria-labelledby="services-cta-heading"
            >
                <div className="container">
                    <motion.div className="offerings-cta-card"
                        initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: shouldReduce ? 0.01 : 0.5 }}
                        style={{
                            background: "#FFFFFF",
                            border: "1px solid #E2E8F0",
                            borderRadius: "20px",
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
                            Start an Engagement
                        </span>

                        <h2
                            id="services-cta-heading"
                            style={{
                                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                                fontWeight: 700,
                                color: "#0B1320",
                                fontFamily: "var(--font-display)",
                                letterSpacing: "-0.02em",
                                margin: "0 0 20px 0",
                                lineHeight: 1.2
                            }}
                        >
                            Ready to scope an engineering engagement?
                        </h2>

                        <p style={{
                            fontSize: "1.05rem",
                            lineHeight: 1.75,
                            color: "#475569",
                            fontFamily: "var(--font-body)",
                            maxWidth: "520px",
                            margin: "0 auto 40px"
                        }}>
                            Tell us what you&apos;re building — we&apos;ll match the right discipline and team to your program.
                        </p>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
                            <Link
                                href="/contact?product=engineering-offerings"
                                className="btn btn-primary"
                                id="services-cta-btn"
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
                                Request Capability Walkthrough
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                            <Link
                                href="/engagement-models"
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
                                View Engagement Models
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}

function EngineeringOfferingsLight() {
    const shouldReduce = useReducedMotion() ?? false;
    const listVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: shouldReduce ? 0 : 0.08 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
        visible: { opacity: 1, y: 0, transition: shouldReduce ? { duration: 0 } : { duration: 0.5, ease: "easeOut" as const } },
    };

    return (
        <div className={`theme-light-corp engineering-offerings-theme ${inter.variable} ${manrope.variable}`}>
            <Hero
                layout="split"
                eyebrow="Engineering Offerings"
                title="Engineering services for the next generation of mobility"
                description="From embedded platforms and hardware to connected systems, cloud, AI, and validation, our teams support global OEM and Tier-1 programs across the full engineering lifecycle."
                stats={[
                    { value: "10", label: "Engineering disciplines" },
                    { value: "50+", label: "Domain specialists" },
                    { value: "End-to-end", label: "Program support" },
                ]}
            >
                <div className="tl-hero__actions">
                    <Button href="#specialized-services-heading" variant="primary">Explore capabilities <span aria-hidden="true">↓</span></Button>
                    <Button href="/contact?product=engineering-offerings" variant="outline-on-dark">Discuss your program <span aria-hidden="true">→</span></Button>
                </div>
            </Hero>

            <Section variant="alt" className="tl-service-section" aria-labelledby="specialized-services-heading">
                <div className="tl-container">
                    <motion.div className="tl-section-heading tl-section-heading--centered" variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <Eyebrow>Engineering services</Eyebrow>
                        <h2 id="specialized-services-heading">Specialized Services Across the Full Engineering Lifecycle</h2>
                        <p>Domain-aligned engineering services delivered by 60+ specialists across automotive, embedded, digital, and AI engineering disciplines.</p>
                    </motion.div>
                    <motion.div className="tl-service-grid" variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {specializedCards
                            .slice()
                            .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }))
                            .map((card, index) => (
                                <motion.div key={card.title} className="tl-service-grid__item" variants={itemVariants}>
                                    <ServiceCard
                                        number={String(index + 1).padStart(2, "0")}
                                        title={card.title}
                                        description={card.description}
                                        icon={card.icon}
                                        iconColor={card.iconColor}
                                        techs={card.techs}
                                        theme="light-corp"
                                        compact
                                    />
                                </motion.div>
                            ))}
                    </motion.div>
                </div>
            </Section>

            <CtaBand
                title="Ready to scope an engineering engagement?"
                description="Tell us what you’re building — we’ll match the right discipline and team to your program."
                primaryLabel="Request Capability Walkthrough"
                primaryHref="/contact?product=engineering-offerings"
                secondaryLabel="View Engagement Models"
                secondaryHref="/engagement-models"
                secondaryVariant="outline-on-dark"
            />
        </div>
    );
}
