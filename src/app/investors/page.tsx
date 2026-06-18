"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";

const metrics = [
    { label: "Revenue Growth YoY", value: "+42%" },
    { label: "Active OEM Engagements", value: "8" },
    { label: "IP/Accelerator Patents", value: "3 Pending" },
    { label: "Headcount Growth", value: "+30%" }
];

const documents = [
    { title: "SAMSAN Capabilities Presentation 2026", size: "4.2 MB", type: "PDF" },
    { title: "AUTOSAR System Engineering Brief", size: "2.1 MB", type: "PDF" },
    { title: "ISO 27001 Certification Confirmation", size: "1.5 MB", type: "PDF" },
    { title: "Company Profile & Financial Overview", size: "3.8 MB", type: "PDF" }
];

export default function InvestorsPage() {
    const shouldReduce = useReducedMotion();

    return (
        <div style={{ paddingBottom: "80px" }}>
            <section className="page-hero" aria-labelledby="investors-heading">
                <div className="container">
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={fadeUpVariants(shouldReduce)}>
                            <span className="badge" style={{ marginBottom: "24px" }}>Corporate Growth</span>
                        </motion.div>
                        <motion.h1 id="investors-heading" variants={fadeUpVariants(shouldReduce)} style={{ marginBottom: "20px" }}>
                            Investors & Strategic Partners
                        </motion.h1>
                        <motion.p className="lead" variants={fadeUpVariants(shouldReduce)} style={{ maxWidth: "580px" }}>
                            Explore SAMSAN corporate metrics, partnership ecosystems, and download official capabilities briefings.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <section className="section compact">
                <div className="container">
                    
                    {/* Metrics Section */}
                    <div style={{ marginBottom: "64px" }}>
                        <span className="badge rose" style={{ marginBottom: "16px" }}>Financial Highlights</span>
                        <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "32px", color: "#ffffff" }}>Performance at a Glance</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
                            {metrics.map((m) => (
                                <div
                                    key={m.label}
                                    style={{
                                        background: "rgba(13,19,35,0.4)",
                                        border: "1px solid rgba(255,255,255,0.05)",
                                        borderRadius: "var(--radius)",
                                        padding: "32px 24px",
                                        textAlign: "center"
                                    }}
                                >
                                    <div style={{
                                        fontFamily: "var(--font-display)",
                                        fontSize: "2.5rem",
                                        fontWeight: 700,
                                        color: "var(--violet-mid)",
                                        lineHeight: 1,
                                        marginBottom: "8px"
                                    }}>
                                        {m.value}
                                    </div>
                                    <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                                        {m.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Resources Downloads */}
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "48px", alignItems: "start" }}>
                        <div>
                            <span className="badge mint" style={{ marginBottom: "16px" }}>Downloads</span>
                            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "24px", color: "#ffffff" }}>Corporate Briefings</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                {documents.map((doc) => (
                                    <div
                                        key={doc.title}
                                        style={{
                                            background: "rgba(13, 19, 35, 0.3)",
                                            border: "1px solid rgba(255,255,255,0.05)",
                                            borderRadius: "var(--radius-sm)",
                                            padding: "20px 24px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                                            <div style={{
                                                width: "40px", height: "40px",
                                                background: "rgba(124, 58, 237, 0.1)",
                                                border: "1px solid rgba(124, 58, 237, 0.2)",
                                                color: "var(--violet-mid)",
                                                borderRadius: "6px",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontWeight: 700, fontSize: "0.75rem", fontFamily: "var(--font-mono)"
                                            }}>
                                                {doc.type}
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: "0.95rem", color: "#ffffff", fontWeight: 600 }}>{doc.title}</h3>
                                                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Size: {doc.size}</span>
                                            </div>
                                        </div>
                                        <button
                                            className="btn btn-outline"
                                            style={{ padding: "8px 16px", fontSize: "0.75rem" }}
                                            onClick={() => alert("Simulating file download...")}
                                        >
                                            Download
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Partner Contact Card */}
                        <div style={{
                            background: "rgba(22, 30, 53, 0.45)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: "var(--radius-lg)",
                            padding: "40px",
                            backdropFilter: "blur(12px)"
                        }}>
                            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "16px", color: "#ffffff" }}>Partnership Inquiries</h2>
                            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "24px" }}>
                                Reach out directly to our corporate relations team to discuss joint venture frameworks, investment opportunities, or managed strategic CoE setups.
                            </p>
                            <a
                                href="mailto:corporate@samsanlabs.com"
                                className="btn btn-primary"
                                style={{ width: "100%", justifyContent: "center" }}
                            >
                                Contact Corporate Relations
                            </a>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
