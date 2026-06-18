"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";

const consultingAreas = [
    {
        title: "Digital Transformation",
        desc: "We assist businesses in adopting digital technologies to enhance operations and remain competitive in an ever-evolving market.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        )
    },
    {
        title: "Program Management",
        desc: "We provide strategic oversight and project coordination to ensure successful execution of complex technology initiatives.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        )
    },
    {
        title: "Center of Excellence (CoE)",
        desc: "We help organizations establish and manage dedicated teams focused on specific technologies or domains, fostering continuous innovation.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M2 12L12 2L22 12L12 22L2 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8L16 12L12 16L8 12L12 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        )
    }
];

const staffingModels = [
    {
        title: "Permanent Hire",
        sub: "Helps Business to get the Best of the Talent in a Strategic Role",
        approach: [
            "Discuss & understand your position objectives and requirements.",
            "Search candidates from contacts, screen, shortlist & recommend.",
            "Coordinate with client from candidate shortlisting to onboarding."
        ],
        badge: "One Time Fee",
        accent: "var(--violet-mid)",
        accentBg: "rgba(124,58,237,0.12)"
    },
    {
        title: "Contract Staffing",
        sub: "To Manage the Uncertainty & Flexibility in Technical Team.",
        approach: [
            "Discuss & understand your position objectives and requirements.",
            "Search, shortlist, screen and recommend candidates from our existing database of resources.",
            "Coordinate until onboarding."
        ],
        badge: "Monthly Rate",
        accent: "var(--mint)",
        accentBg: "rgba(52,211,153,0.12)"
    },
    {
        title: "Contract To Hire",
        sub: "Option to Hire the Resources already Working on Contract.",
        approach: [
            "The resources already on contract can be transferred to customer role for a win-win approach.",
            "The option can be provided after 12 months of work on contract.",
            "For bright candidates for long term benefit of customers."
        ],
        badge: "Monthly Rate Transfer Fee",
        accent: "var(--rose)",
        accentBg: "rgba(236,72,153,0.12)"
    },
    {
        title: "Build-Operate-Transfer",
        sub: "Acquire a Tried/Tested & Operational Team",
        approach: [
            "Build & nurture a fresh team for a predefined competence or program and make it productive & operationalize.",
            "Option to transfer the team to customer keeping the efficiency same or better."
        ],
        badge: "Monthly Rate Transfer Fee",
        accent: "var(--violet-mid)",
        accentBg: "rgba(124,58,237,0.12)"
    }
];

const stats = [
    { value: "150+", label: "Engineers Deployed" },
    { value: "40+", label: "Active Programmes" },
    { value: "12+", label: "Countries Served" },
    { value: "98%", label: "Client Retention" }
];

export default function ConsultingStaffingPage() {
    const shouldReduce = useReducedMotion();

    return (
        <div style={{ paddingBottom: "0" }}>
            {/* ── Page Hero ── */}
            <section className="page-hero" aria-labelledby="service-heading" style={{ paddingBottom: "100px" }}>
                <div className="container">
                    <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible">
                        <motion.div variants={fadeUpVariants(shouldReduce)} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                            <Link href="/services" style={{ color: "var(--violet-mid)", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
                                Services
                            </Link>
                            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>/</span>
                            <span className="badge">Consulting & Strategic Staffing</span>
                        </motion.div>
                        <motion.h1 id="service-heading" variants={fadeUpVariants(shouldReduce)} style={{ marginBottom: "20px" }}>
                            Consulting & Strategic Staffing
                        </motion.h1>
                        <motion.p className="lead" variants={fadeUpVariants(shouldReduce)} style={{ maxWidth: "700px" }}>
                            Domain-aligned engineers and management professionals deployed exactly how your programme needs them. We scale your engineering capacity and strategic oversight without compromising on quality.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── Impact Stats Bar ── */}
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
                                    fontSize: "2.8rem",
                                    fontWeight: 800,
                                    background: "linear-gradient(135deg, var(--violet-mid), var(--rose))",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    lineHeight: 1.1,
                                    marginBottom: "8px"
                                }}>{s.value}</div>
                                <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", letterSpacing: "0.04em" }}>{s.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Consulting Overview ── */}
            <section className="section compact">
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "60px", alignItems: "center", marginBottom: "0" }}>
                        <div>
                            <span className="badge violet" style={{ marginBottom: "16px" }}>Our Expertise</span>
                            <h2 style={{ fontSize: "2rem", marginBottom: "24px", fontWeight: 700 }}>Consulting — Technical & Management</h2>
                            <p style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "32px", fontSize: "1.05rem" }}>
                                We provide expert guidance and support to help your organization navigate complex technological and business challenges.
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                                {consultingAreas.map((area, i) => (
                                    <motion.div
                                        key={i}
                                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants(shouldReduce)}
                                        style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}
                                    >
                                        <div style={{
                                            width: "48px", height: "48px", borderRadius: "12px",
                                            background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: "var(--violet-mid)", flexShrink: 0
                                        }}>
                                            {area.icon}
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>{area.title}</h4>
                                            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.6" }}>{area.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Strategy Visual - CSS only (no external image dependency) */}
                        <div style={{ position: "relative" }}>
                            <div style={{
                                height: "500px", borderRadius: "var(--radius-lg)",
                                background: "linear-gradient(160deg, rgba(22,30,53,0.6) 0%, rgba(15,20,40,0.8) 100%)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                                position: "relative", overflow: "hidden"
                            }}>
                                {/* Animated gradient orbs */}
                                <div style={{
                                    position: "absolute", width: "300px", height: "300px",
                                    background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
                                    top: "-60px", right: "-60px", borderRadius: "50%",
                                    animation: "glow-pulse 5s ease-in-out infinite"
                                }}/>
                                <div style={{
                                    position: "absolute", width: "250px", height: "250px",
                                    background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)",
                                    bottom: "-40px", left: "-40px", borderRadius: "50%",
                                    animation: "glow-pulse 6s ease-in-out infinite reverse"
                                }}/>

                                {/* Dashed strategic framework lines */}
                                <div style={{
                                    position: "absolute", inset: "40px",
                                    border: "1px dashed rgba(255,255,255,0.12)",
                                    borderRadius: "var(--radius)"
                                }}/>
                                <div style={{
                                    position: "absolute", inset: "70px",
                                    border: "1px dashed rgba(255,255,255,0.06)",
                                    borderRadius: "var(--radius-sm)"
                                }}/>

                                {/* Center diamond icon */}
                                <div style={{
                                    position: "absolute", top: "50%", left: "50%",
                                    transform: "translate(-50%,-50%) rotate(45deg)",
                                    width: "60px", height: "60px",
                                    border: "2px solid rgba(124,58,237,0.5)",
                                    borderRadius: "12px",
                                    display: "flex", alignItems: "center", justifyContent: "center"
                                }}>
                                    <div style={{
                                        width: "24px", height: "24px",
                                        background: "var(--grad-violet)",
                                        borderRadius: "6px"
                                    }}/>
                                </div>

                                {/* Corner labels */}
                                <div style={{ position: "absolute", top: "24px", left: "24px" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>Strategy</span>
                                </div>
                                <div style={{ position: "absolute", top: "24px", right: "24px", textAlign: "right" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>Execution</span>
                                </div>
                                <div style={{ position: "absolute", bottom: "24px", left: "24px" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>Innovation</span>
                                </div>
                                <div style={{ position: "absolute", bottom: "24px", right: "24px", textAlign: "right" }}>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>Growth</span>
                                </div>

                                {/* Central title */}
                                <div style={{ position: "absolute", bottom: "60px", left: 0, right: 0, textAlign: "center" }}>
                                    <h3 style={{ color: "#fff", fontSize: "1.3rem", letterSpacing: "0.15em", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Strategic<br/>Excellence</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Staffing Models ── */}
            <section className="section compact" style={{
                background: "rgba(10, 15, 28, 0.3)",
                borderTop: "1px solid var(--border)",
                paddingTop: "80px"
            }}>
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "60px" }}>
                        <span className="badge rose" style={{ marginBottom: "16px" }}>Engagement Models</span>
                        <h2 style={{ fontSize: "2.2rem", marginBottom: "16px", fontWeight: 700 }}>Flexible Staffing Solutions</h2>
                        <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", lineHeight: "1.7" }}>
                            We offer multiple engagement models designed to adapt to your unique programme requirements, timelines, and budgets.
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                        {staffingModels.map((model, idx) => (
                            <motion.div
                                key={idx}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants(shouldReduce)}
                                style={{
                                    background: "rgba(13, 19, 35, 0.5)",
                                    border: "1px solid rgba(255, 255, 255, 0.06)",
                                    borderRadius: "var(--radius-lg)",
                                    padding: "40px 32px",
                                    position: "relative",
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100%",
                                    transition: "border-color 0.3s, box-shadow 0.3s",
                                    overflow: "hidden"
                                }}
                                className="accel-card"
                            >
                                {/* Top accent bar */}
                                <div style={{
                                    position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                                    background: model.accent
                                }}/>

                                {/* Number badge */}
                                <div style={{
                                    width: "36px", height: "36px", borderRadius: "10px",
                                    background: model.accentBg,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    marginBottom: "20px", fontFamily: "var(--font-mono)",
                                    fontSize: "13px", fontWeight: 700, color: model.accent
                                }}>
                                    {String(idx + 1).padStart(2, "0")}
                                </div>

                                <h3 style={{ fontSize: "1.35rem", marginBottom: "12px", color: "#fff" }}>{model.title}</h3>
                                <p style={{ fontSize: "0.85rem", color: model.accent, fontWeight: 600, marginBottom: "28px", lineHeight: "1.5" }}>
                                    {model.sub}
                                </p>

                                <div style={{ marginBottom: "32px", flexGrow: 1 }}>
                                    <h4 style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px", fontFamily: "var(--font-mono)" }}>Our Approach</h4>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                                        {model.approach.map((text, i) => (
                                            <li key={i} style={{
                                                fontSize: "0.88rem",
                                                color: "var(--text-secondary)",
                                                lineHeight: "1.6",
                                                position: "relative",
                                                paddingLeft: "20px"
                                            }}>
                                                <span style={{
                                                    position: "absolute", left: 0, top: "7px",
                                                    width: "6px", height: "6px", borderRadius: "50%", background: model.accent
                                                }}/>
                                                {text}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div style={{
                                    background: "rgba(0,0,0,0.4)",
                                    padding: "14px",
                                    borderRadius: "var(--radius-sm)",
                                    textAlign: "center",
                                    border: "1px solid rgba(255,255,255,0.05)",
                                    marginTop: "auto"
                                }}>
                                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                                        {model.badge}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Full-Width Visual Banner ── */}
            <section style={{ padding: "80px 0", borderTop: "1px solid var(--border)" }}>
                <div className="container">
                    <div style={{
                        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px"
                    }}>
                        <div style={{
                            height: "320px", borderRadius: "var(--radius-lg)",
                            backgroundImage: "url('/images/embedded_engineering.png')",
                            backgroundSize: "cover", backgroundPosition: "center",
                            border: "1px solid rgba(255,255,255,0.06)",
                            boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
                            position: "relative", overflow: "hidden"
                        }}>
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,15,28,0.9) 0%, rgba(10,15,28,0.2) 100%)" }}/>
                            <div style={{ position: "absolute", bottom: "28px", left: "28px" }}>
                                <span className="badge violet" style={{ marginBottom: "10px" }}>Engineering Teams</span>
                                <h3 style={{ fontSize: "1.3rem", color: "#fff" }}>Domain-Expert Deployment</h3>
                            </div>
                        </div>
                        <div style={{
                            height: "320px", borderRadius: "var(--radius-lg)",
                            backgroundImage: "url('/images/ai_digital_tech.png')",
                            backgroundSize: "cover", backgroundPosition: "center",
                            border: "1px solid rgba(255,255,255,0.06)",
                            boxShadow: "0 16px 40px rgba(0,0,0,0.3)",
                            position: "relative", overflow: "hidden"
                        }}>
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,15,28,0.9) 0%, rgba(10,15,28,0.2) 100%)" }}/>
                            <div style={{ position: "absolute", bottom: "28px", left: "28px" }}>
                                <span className="badge mint" style={{ marginBottom: "10px" }}>Technology Centres</span>
                                <h3 style={{ fontSize: "1.3rem", color: "#fff" }}>Centers of Excellence</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-inner">
                        <h2>Ready to scale your engineering team?</h2>
                        <p>Let&apos;s discuss how our flexible engagement models can accelerate your programme delivery.</p>
                        <div className="cta-actions">
                            <Link href="/contact" className="btn btn-primary">Get in Touch →</Link>
                            <Link href="/services" className="btn btn-outline">View All Services</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
