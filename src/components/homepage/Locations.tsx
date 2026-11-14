"use client";

import { useState, useCallback, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

/* ─── Hub data — untouched ────────────────────────────────────────────────── */
const hubs = [
    {
        region: "India",
        city: "Pune (HQ)",
        address: "STPI New Building, Rajiv Gandhi Infotech Park, Phase I, Hinjawadi Pune - 411057",
        phone: "8956927909",
        email: "india@samsanlabs.com",
        mapQuery: "STPI, Rajiv Gandhi Infotech Park, Hinjawadi, Pune, Maharashtra 411057",
        coordinates: "18.5662° N, 73.7337° E",
    },
    {
        region: "India",
        city: "Bengaluru",
        address: "Novel TechPark , Bengaluru, Karnataka",    
        email: "india@samsanlabs.com",
        mapQuery: "46 4, Hosur Rd, Kudlu Gate, Krishna Reddy Industrial Area, Hosapalaya, Muneshwara Nagar, Bengaluru, Karnataka 560068",
        coordinates: "13.0305° N, 77.5649° E",
    },
    {
        region: "South Korea",
        city: "Seongnam",
        address: "28, hwangsaeul-ro 200 beon-gil, Bundang-gu, Seongnam-si, Gyeonggi-do, Korea",
        phone: "+82-10-9779-5698",
        email: "india@samsanlabs.com",
        mapQuery: "28, Hwangsaeul-ro 200beon-gil, Bundang-gu, Seongnam-si, Gyeonggi-do, South Korea",
        coordinates: "37.3828° N, 127.1189° E",
    },
];

/* ─── Fade-up animation (once, 24 px, 0.5 s) ─────────────────────────────── */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Locations() {
    const [activeHub, setActiveHub] = useState(hubs[0]);
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: "-80px" });

    const selectHub = useCallback((hub: typeof hubs[0]) => setActiveHub(hub), []);

    return (
        <section
            ref={sectionRef}
            id="locations-section"
            style={{
                background: "var(--bg-alt, #f1f5f9)",
                padding: "96px 0",
                borderTop: "1px solid var(--border, #e2e8f0)",
            }}
        >
            {/* ── Scoped styles ── */}
            <style>{`
                /* Section container */
                #locations-section .loc-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                /* Two-column grid */
                #locations-section .loc-grid {
                    display: grid;
                    grid-template-columns: 38% 1fr;
                    gap: 32px;
                    align-items: start;
                    height: 560px;
                }

                /* Hub list column */
                #locations-section .loc-hub-list {
                    height: 560px;
                    overflow-y: auto;
                    padding-right: 8px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    /* Hide native scrollbar, show thin styled one */
                    scrollbar-width: thin;
                    scrollbar-color: #CBD5E1 transparent;
                }
                #locations-section .loc-hub-list::-webkit-scrollbar {
                    width: 6px;
                }
                #locations-section .loc-hub-list::-webkit-scrollbar-track {
                    background: transparent;
                }
                #locations-section .loc-hub-list::-webkit-scrollbar-thumb {
                    background: #CBD5E1;
                    border-radius: 6px;
                }

                /* Hub card */
                #locations-section .loc-card {
                    background: #ffffff;
                    border: 1px solid var(--border, #e2e8f0);
                    border-radius: 16px;
                    padding: 20px;
                    cursor: pointer;
                    transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
                    text-align: left;
                    width: 100%;
                    outline: none;
                }
                #locations-section .loc-card:hover {
                    border-color: var(--teal, #005F8A);
                }
                #locations-section .loc-card:focus-visible {
                    outline: 2px solid var(--teal, #005F8A);
                    outline-offset: 2px;
                }
                #locations-section .loc-card.active {
                    border: 1px solid var(--teal, #005F8A);
                    background: #ffffff;
                }

                /* Map panel */
                #locations-section .loc-map-panel {
                    height: 560px;
                    display: flex;
                    flex-direction: column;
                    border: 1px solid var(--border, #e2e8f0);
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
                    background: #ffffff;
                }

                /* Map header */
                #locations-section .loc-map-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px 20px;
                    background: #ffffff;
                    border-bottom: 1px solid var(--border, #e2e8f0);
                    flex-shrink: 0;
                }

                /* Map iframe wrapper */
                #locations-section .loc-map-iframe-wrap {
                    flex: 1;
                    min-height: 0;
                    position: relative;
                }
                #locations-section .loc-map-iframe-wrap iframe {
                    display: block;
                    width: 100%;
                    height: 100%;
                    border: 0;
                    /* NO filter — keep the default light Google Maps style */
                }

                /* Responsive: tablet & mobile */
                @media (max-width: 900px) {
                    #locations-section {
                        padding: 64px 0 !important;
                    }
                    #locations-section .loc-grid {
                        grid-template-columns: 1fr;
                        height: auto;
                    }
                    #locations-section .loc-hub-list {
                        height: auto;
                        max-height: 320px;
                    }
                    #locations-section .loc-map-panel {
                        height: 360px;
                    }
                }

                /* Reduced motion */
                @media (prefers-reduced-motion: reduce) {
                    #locations-section .loc-fade {
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }
            `}</style>

            <motion.div
                className="loc-container"
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                {/* Section heading */}
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
                    <h2 style={{
                        fontFamily: "var(--font-corp-manrope, Manrope, sans-serif)",
                        fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.025em",
                        color: "var(--navy, #0A1628)",
                        textWrap: "balance" as React.CSSProperties["textWrap"],
                        margin: "0 0 16px",
                    }}>
                        Global Engineering Footprint
                    </h2>
                    <p style={{
                        fontSize: "17px",
                        lineHeight: 1.7,
                        color: "var(--body, #374151)",
                        maxWidth: "720px",
                        margin: "0 auto",
                    }}>
                        Delivering high-integrity vehicle software architectures and digital platforms from our worldwide hubs.
                    </p>
                </div>

                {/* Two-column grid */}
                <div className="loc-grid">

                    {/* ── LEFT: Hub list ── */}
                    <div className="loc-hub-list" role="listbox" aria-label="Office locations">
                        {hubs.map((hub) => {
                            const isActive = activeHub.city === hub.city && activeHub.region === hub.region;
                            return (
                                <button
                                    key={`${hub.city}-${hub.region}`}
                                    className={`loc-card${isActive ? " active" : ""}`}
                                    role="option"
                                    aria-selected={isActive}
                                    onClick={() => selectHub(hub)}
                                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectHub(hub); } }}
                                >
                                    {/* Country label + active dot */}
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                                        <span style={{
                                            fontFamily: "var(--font-corp-inter, Inter, sans-serif)",
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            color: "var(--teal, #005F8A)",
                                            letterSpacing: 0,
                                            textTransform: "none",
                                        }}>
                                            {hub.region}
                                        </span>
                                        {isActive && (
                                            <span
                                                aria-hidden="true"
                                                style={{
                                                    width: "10px",
                                                    height: "10px",
                                                    borderRadius: "50%",
                                                    backgroundColor: "var(--teal, #005F8A)",
                                                    flexShrink: 0,
                                                }}
                                            />
                                        )}
                                    </div>

                                    {/* Hub name */}
                                    <h3 style={{
                                        fontFamily: "var(--font-corp-manrope, Manrope, sans-serif)",
                                        fontSize: "20px",
                                        fontWeight: 700,
                                        color: "var(--navy, #0A1628)",
                                        margin: "0 0 8px",
                                        textAlign: "left",
                                    }}>
                                        {hub.city} Hub
                                    </h3>

                                    {/* Address */}
                                    <p style={{
                                        fontSize: "15px",
                                        lineHeight: 1.6,
                                        color: "var(--body, #374151)",
                                        margin: "0 0 6px",
                                        textAlign: "left",
                                    }}>
                                        {hub.address}
                                    </p>

                                    {/* Phone */}
                                    {hub.phone && (
                                        <p style={{
                                            fontSize: "15px",
                                            lineHeight: 1.6,
                                            color: "var(--body, #374151)",
                                            margin: "0 0 6px",
                                            textAlign: "left",
                                        }}>
                                            {hub.phone}
                                        </p>
                                    )}

                                    {/* Email */}
                                    <a
                                        href={`mailto:${hub.email}`}
                                        onClick={(e) => e.stopPropagation()}
                                        style={{
                                            fontFamily: "var(--font-corp-inter, Inter, sans-serif)",
                                            fontSize: "15px",
                                            fontWeight: 600,
                                            color: "var(--teal, #005F8A)",
                                            textDecoration: "underline",
                                            display: "inline-block",
                                        }}
                                    >
                                        {hub.email}
                                    </a>
                                </button>
                            );
                        })}
                    </div>

                    {/* ── RIGHT: Map panel ── */}
                    <div className="loc-map-panel">
                        {/* Header bar */}
                        <div className="loc-map-header">
                            <div>
                                <div style={{
                                    fontFamily: "var(--font-corp-inter, Inter, sans-serif)",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: "var(--teal, #005F8A)",
                                    marginBottom: "4px",
                                }}>
                                    Active target
                                </div>
                                <div style={{
                                    fontFamily: "var(--font-corp-manrope, Manrope, sans-serif)",
                                    fontSize: "18px",
                                    fontWeight: 700,
                                    color: "var(--navy, #0A1628)",
                                    lineHeight: 1.2,
                                }}>
                                    {activeHub.city} — {activeHub.region}
                                </div>
                            </div>
                            <div style={{
                                fontFamily: "var(--font-corp-inter, Inter, sans-serif)",
                                fontSize: "14px",
                                color: "var(--muted, #64748b)",
                                textAlign: "right",
                            }}>
                                <div style={{ fontSize: "11px", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Lat / Long</div>
                                <div>{activeHub.coordinates}</div>
                            </div>
                        </div>

                        {/* Light map iframe — NO CSS filter applied */}
                        <div className="loc-map-iframe-wrap">
                            <iframe
                                key={activeHub.mapQuery}
                                title={`Map of SAMSAN Technische Labs – ${activeHub.city} office`}
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(activeHub.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
}
