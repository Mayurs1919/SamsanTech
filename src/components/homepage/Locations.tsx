"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        address: "MSRIT Post, M S Ramaiah Nagar, MSR Nagar, Bengaluru, Karnataka - 560054",
        phone: "+91-895-692-7909",
        email: "india@samsanlabs.com",
        mapQuery: "M. S. Ramaiah Institute of Technology, Bengaluru, Karnataka 560054",
        coordinates: "13.0305° N, 77.5649° E",
    },
    {
        region: "USA",
        city: "Detroit",
        address: "Detroit Hub, Michigan, USA",
        email: "usa@samsanlabs.com",
        mapQuery: "Detroit, Michigan, USA",
        coordinates: "42.3314° N, 83.0458° W",
    },
    {
        region: "Japan",
        city: "Tokyo",
        address: "Tokyo Hub, Shibuya, Japan",
        email: "japan@samsanlabs.com",
        mapQuery: "Shibuya, Tokyo, Japan",
        coordinates: "35.6580° N, 139.7016° E",
    },
    {
        region: "Europe / Germany",
        city: "Munich",
        address: "Europe / Germany Hub, Leopoldstraße, Germany",
        email: "europe@samsanlabs.com",
        mapQuery: "Leopoldstraße 244, 80807 München, Germany",
        coordinates: "48.1764° N, 11.5901° E",
    },
    {
        region: "South Korea",
        city: "Seongnam",
        address: "28, hwangsaeul-ro 200 beAon-gil, Bundang-gu, Seongnam-si, Gyeonggi-do, Korea",
        phone: "+82-10-9779-5698",
        email: "india@samsanlabs.com",
        mapQuery: "28, Hwangsaeul-ro 200beon-gil, Bundang-gu, Seongnam-si, Gyeonggi-do, South Korea",
        coordinates: "37.3828° N, 127.1189° E",
    },
];

export default function Locations() {
    const [activeHub, setActiveHub] = useState(hubs[0]);

    return (
        <section className="section" id="locations-section" style={{ position: "relative", borderTop: "1px solid var(--border)", padding: "100px 0" }}>
            {/* Ambient Background Glow */}
            <div style={{
                position: "absolute",
                top: "20%",
                left: "10%",
                width: "600px",
                height: "600px",
                background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)",
                pointerEvents: "none"
            }} />

            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "56px" }}>
                    <span className="badge mint" style={{ marginBottom: "16px" }}>Our Locations</span>
                    <h2 style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.025em" }}>
                        Global Engineering Footprint
                    </h2>
                    <p className="lead" style={{ maxWidth: "600px", margin: "12px auto 0", color: "var(--text-secondary)" }}>
                        Delivering high-integrity vehicle software architectures and digital platforms from our worldwide hubs.
                    </p>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1.1fr 1.9fr",
                    gap: "36px",
                    alignItems: "stretch",
                }}>
                    {/* Left: Location Hub Selector Cards */}
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px",
                        maxHeight: "600px",
                        overflowY: "auto",
                        paddingRight: "6px",
                    }}>
                        {hubs.map((hub) => {
                            const isActive = activeHub.city === hub.city && activeHub.region === hub.region;
                            return (
                                <motion.div
                                    key={`${hub.city}-${hub.region}`}
                                    onClick={() => setActiveHub(hub)}
                                    whileHover={{ x: 4 }}
                                    style={{
                                        background: isActive ? "rgba(59, 130, 246, 0.08)" : "rgba(13, 19, 35, 0.45)",
                                        border: isActive ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(255, 255, 255, 0.05)",
                                        borderRadius: "14px",
                                        padding: "20px",
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        boxShadow: isActive ? "0 4px 20px rgba(59, 130, 246, 0.08)" : "none",
                                    }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                                        <span style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "10px",
                                            color: isActive ? "var(--blue)" : "rgba(255, 255, 255, 0.4)",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.08em",
                                            fontWeight: 600
                                        }}>
                                            {hub.region}
                                        </span>
                                        {isActive && (
                                            <span style={{
                                                width: "8px",
                                                height: "8px",
                                                borderRadius: "50%",
                                                backgroundColor: "var(--blue)",
                                                boxShadow: "0 0 10px var(--blue)"
                                            }} />
                                        )}
                                    </div>
                                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>
                                        {hub.city} Hub
                                    </h3>
                                    <p style={{ fontSize: "0.82rem", color: "rgba(240, 244, 255, 0.6)", lineHeight: "1.5", marginBottom: "12px" }}>
                                        {hub.address}
                                    </p>
                                    
                                    {hub.phone && (
                                        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", margin: "0 0 4px 0" }}>
                                            Phone: {hub.phone}
                                        </p>
                                    )}
                                    <a
                                        href={`mailto:${hub.email}`}
                                        style={{
                                            fontFamily: "var(--font-mono)",
                                            fontSize: "0.78rem",
                                            color: isActive ? "var(--blue)" : "rgba(255, 255, 255, 0.4)",
                                            textDecoration: "underline",
                                        }}
                                    >
                                        {hub.email}
                                    </a>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Right: Premium Google Maps Embed Card */}
                    <div style={{
                        position: "relative",
                        background: "rgba(10, 15, 28, 0.5)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "20px",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "450px",
                        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
                    }}>
                        {/* Map Header Overlay */}
                        <div style={{
                            padding: "16px 24px",
                            background: "rgba(13, 19, 35, 0.8)",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            zIndex: 2,
                        }}>
                            <div>
                                <span style={{ fontSize: "0.7rem", color: "var(--blue)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                                    Active Target
                                </span>
                                <h4 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#ffffff", margin: 0 }}>
                                    {activeHub.city} — {activeHub.region}
                                </h4>
                            </div>
                            <div style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "10px",
                                color: "rgba(255,255,255,0.4)",
                                textAlign: "right",
                            }}>
                                <div>LAT/LONG</div>
                                <div>{activeHub.coordinates}</div>
                            </div>
                        </div>

                        {/* Map iframe Container */}
                        <div style={{ flex: 1, position: "relative", width: "100%", height: "100%", background: "#0c111e" }}>
                            <iframe
                                title={`Map of SAMSAN Technische Labs Pvt. Ltd. ${activeHub.city} office`}
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(activeHub.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(1.2)" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
