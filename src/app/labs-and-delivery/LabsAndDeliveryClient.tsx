"use client";

import Image from "next/image";
import { Hero } from "@/components/theme-light/Hero";
import { Section } from "@/components/theme-light/Section";
import { Button } from "@/components/theme-light/Button";
import { inter, manrope } from "@/app/solutions/fonts";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const photos = [
    {
        src: "/stories/sdv-summit-2026/sdv-award-ceremony.jpg",
        caption: "Award Ceremony",
        description: "SAMSAN Technische Labs receiving recognition at the SDV Summit 2026 for outstanding contribution to Software-Defined Vehicle engineering.",
        span: "wide", // takes 2 columns
    },
    {
        src: "/stories/sdv-summit-2026/sdv-booth-display.jpg",
        caption: "Exhibition Booth",
        description: "SAMSAN's full-scale exhibition booth showcasing Maestro, SAMCockpit, and end-to-end SDV platform capabilities.",
        span: "normal",
    },
    {
        src: "/stories/sdv-summit-2026/sdv-team-booth.jpg",
        caption: "Team at the Booth",
        description: "The SAMSAN engineering team representing the company at the event, Oct 8–9, Hyderabad.",
        span: "normal",
    },
];

const fadeUp = (delay = 0): Variants => ({
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const, delay } },
});

export default function LabsAndDeliveryClient() {
    const shouldReduce = useReducedMotion();

    return (
        <div className={`theme-light-corp ${inter.variable} ${manrope.variable}`}>
            <Hero
                eyebrow="SAMSAN Stories"
                title={<>Progress is made of <span>moments.</span></>}
                description="Meet the people, ideas, and milestones behind our work. Explore SAMSAN's event appearances, achievements, exhibitions, and team moments."
            />

            <Section variant="white">
                <div className="tl-container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

                    {/* ── Event header card ── */}
                    <motion.div
                        variants={fadeUp(0)}
                        initial={shouldReduce ? false : "hidden"}
                        whileInView="visible"
                        viewport={{ once: true }}
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "20px",
                            padding: "28px 32px",
                            background: "#FFFFFF",
                            border: "1px solid var(--border, #E2E8F0)",
                            borderRadius: "16px",
                            boxShadow: "0 1px 2px rgba(11,19,32,.05), 0 8px 24px rgba(11,19,32,.06)",
                            marginBottom: "36px",
                        }}
                    >
                        <div>
                            {/* Event label */}
                            <div style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "10px",
                                padding: "5px 12px",
                                borderRadius: "999px",
                                background: "rgba(0,95,138,0.08)",
                                border: "1px solid rgba(0,95,138,0.18)",
                            }}>
                                <span style={{
                                    display: "inline-block",
                                    width: "7px",
                                    height: "7px",
                                    borderRadius: "50%",
                                    background: "var(--teal, #005F8A)",
                                }} />
                                <span style={{
                                    fontFamily: "var(--font-corp-inter, Inter, sans-serif)",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: "var(--teal, #005F8A)",
                                    letterSpacing: "0.01em",
                                }}>
                                    Exhibition · Award 
                                </span>
                            </div>
                            <h2 style={{
                                fontFamily: "var(--font-corp-manrope, Manrope, sans-serif)",
                                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                                fontWeight: 700,
                                color: "var(--navy, #0A1628)",
                                margin: "0 0 10px",
                                lineHeight: 1.2,
                            }}>
                                SDV Summit 2026
                            </h2>
                            <p style={{
                                fontFamily: "var(--font-corp-inter, Inter, sans-serif)",
                                fontSize: "15px",
                                lineHeight: 1.65,
                                color: "var(--body, #374151)",
                                maxWidth: "600px",
                                margin: 0,
                            }}>
                                SAMSAN Technische Labs participated as an exhibitor and award recipient at the SDV Summit, showcasing end-to-end Software-Defined Vehicle engineering capabilities — from embedded middleware to cloud-connected cockpit platforms.
                            </p>
                        </div>
                        <div style={{ flexShrink: 0 }}>
                            <Button href="/contact" variant="primary">Get in touch</Button>
                        </div>
                    </motion.div>

                    {/* ── Photo gallery ── */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gridTemplateRows: "auto auto",
                        gap: "20px",
                    }}>
                        {/* Award photo — spans 2 columns */}
                        <motion.div
                            variants={fadeUp(0.1)}
                            initial={shouldReduce ? false : "hidden"}
                            whileInView="visible"
                            viewport={{ once: true }}
                            style={{ gridColumn: "1 / 3" }}
                        >
                            <PhotoCard photo={photos[0]} priority />
                        </motion.div>

                        {/* Booth display — 1 column, same row */}
                        <motion.div
                            variants={fadeUp(0.2)}
                            initial={shouldReduce ? false : "hidden"}
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <PhotoCard photo={photos[1]} />
                        </motion.div>

                        {/* Team photo — spans full width */}
                        <motion.div
                            variants={fadeUp(0.3)}
                            initial={shouldReduce ? false : "hidden"}
                            whileInView="visible"
                            viewport={{ once: true }}
                            style={{ gridColumn: "1 / -1" }}
                        >
                            <PhotoCard photo={photos[2]} wide />
                        </motion.div>
                    </div>

                    {/* Responsive overrides via scoped style */}
                    <style>{`
                        @media (max-width: 768px) {
                            .stories-grid { grid-template-columns: 1fr !important; }
                            .stories-grid > * { grid-column: 1 / -1 !important; }
                        }
                    `}</style>

                </div>
            </Section>
        </div>
    );
}

// ── Photo card sub-component ─────────────────────────────────────────────────
function PhotoCard({
    photo,
    priority = false,
    wide = false,
}: {
    photo: typeof photos[0];
    priority?: boolean;
    wide?: boolean;
}) {
    return (
        <div style={{
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid var(--border, #E2E8F0)",
            boxShadow: "0 1px 2px rgba(11,19,32,.05), 0 8px 24px rgba(11,19,32,.07)",
            background: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            height: "100%",
        }}>
            {/* Image */}
            <div style={{
                position: "relative",
                width: "100%",
                aspectRatio: wide ? "21 / 7" : "4 / 3",
                overflow: "hidden",
                background: "#0A1628",
                flexShrink: 0,
            }}>
                <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    priority={priority}
                    sizes="(max-width: 768px) 100vw, 66vw"
                    style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />
            </div>

            {/* Caption bar */}
            <div style={{
                padding: "16px 20px",
                borderTop: "1px solid var(--border, #E2E8F0)",
            }}>
                <div style={{
                    fontFamily: "var(--font-corp-manrope, Manrope, sans-serif)",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "var(--navy, #0A1628)",
                    marginBottom: "4px",
                }}>
                    {photo.caption}
                </div>
                <div style={{
                    fontFamily: "var(--font-corp-inter, Inter, sans-serif)",
                    fontSize: "13px",
                    lineHeight: 1.55,
                    color: "var(--muted, #64748B)",
                }}>
                    {photo.description}
                </div>
            </div>
        </div>
    );
}
