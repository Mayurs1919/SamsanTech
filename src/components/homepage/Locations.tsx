"use client";

import { motion } from "framer-motion";

const hubs = [
    {
        region: "India",
        city: "Pune",
        address: "SAMSAN Towers, Baner Tech District, Pune, Maharashtra",
        email: "pune.office@samsanlabs.com",
    },
    {
        region: "Germany",
        city: "Munich",
        address: "Leopoldstraße 244, 80807 München, Germany",
        email: "munich.hub@samsanlabs.com",
    },
    {
        region: "USA",
        city: "Detroit",
        address: "Woodward Avenue, Detroit, Michigan",
        email: "usa.sales@samsanlabs.com",
    },
    {
        region: "Japan",
        city: "Tokyo",
        address: "Shibuya Sky Tower, Shibuya, Tokyo, Japan",
        email: "tokyo.office@samsanlabs.com",
    },
    {
        region: "South Korea",
        city: "Seoul",
        address: "Teheran-ro, Gangnam-gu, Seoul, South Korea",
        email: "seoul.office@samsanlabs.com",
    },
];

export default function Locations() {
    return (
        <section className="section" id="locations-section" style={{ position: "relative", borderTop: "1px solid var(--border)" }}>
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
                    <span className="badge mint" style={{ marginBottom: "16px" }}>Our Locations</span>
                    <h2 style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.025em" }}>
                        Global Engineering Footprint
                    </h2>
                    <p className="lead" style={{ maxWidth: "540px", margin: "12px auto 0" }}>
                        Delivering high-integrity vehicle software architectures and digital ecosystems from 5 world-class technology hubs.
                    </p>
                </div>

                {/* World Map SVG representation */}
                <div style={{
                    position: "relative",
                    background: "rgba(10, 15, 28, 0.3)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    borderRadius: "var(--radius-lg)",
                    padding: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "48px",
                    overflow: "hidden"
                }}>
                    <svg width="100%" height="auto" viewBox="0 0 1000 450" fill="none" opacity="0.6" style={{ maxWidth: "800px" }}>
                        {/* Minimalist World Map Outlines / Abstract grid */}
                        <path d="M150,150 Q180,100 230,120 T350,150 T450,120 T600,100 T750,120 T850,150" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="5 5" />
                        <path d="M150,250 Q220,320 350,300 T500,280 T700,320 T900,280" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="5 5" />

                        {/* Continents abstract circles */}
                        <circle cx="250" cy="180" r="70" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                        <circle cx="500" cy="160" r="60" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                        <circle cx="680" cy="220" r="50" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                        <circle cx="820" cy="180" r="50" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                        {/* Location Nodes with Pulse Animation */}
                        {/* USA (Detroit) */}
                        <g>
                            <circle cx="260" cy="160" r="6" fill="var(--blue)" />
                            <circle cx="260" cy="160" r="14" stroke="var(--blue)" strokeWidth="1" opacity="0.5" />
                            <text x="260" y="145" fill="#ffffff" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">USA</text>
                        </g>

                        {/* Germany (Munich) */}
                        <g>
                            <circle cx="500" cy="140" r="6" fill="var(--violet-mid)" />
                            <circle cx="500" cy="140" r="14" stroke="var(--violet-mid)" strokeWidth="1" opacity="0.5" />
                            <text x="500" y="125" fill="#ffffff" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">Germany</text>
                        </g>

                        {/* India (Pune) */}
                        <g>
                            <circle cx="670" cy="220" r="6" fill="var(--rose)" />
                            <circle cx="670" cy="220" r="14" stroke="var(--rose)" strokeWidth="1" opacity="0.5" />
                            <text x="670" y="205" fill="#ffffff" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">India (HQ)</text>
                        </g>

                        {/* South Korea */}
                        <g>
                            <circle cx="800" cy="160" r="6" fill="var(--mint)" />
                            <circle cx="800" cy="160" r="14" stroke="var(--mint)" strokeWidth="1" opacity="0.5" />
                            <text x="800" y="145" fill="#ffffff" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">South Korea</text>
                        </g>

                        {/* Japan (Tokyo) */}
                        <g>
                            <circle cx="840" cy="170" r="6" fill="var(--blue)" />
                            <circle cx="840" cy="170" r="14" stroke="var(--blue)" strokeWidth="1" opacity="0.5" />
                            <text x="840" y="190" fill="#ffffff" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-mono)">Japan</text>
                        </g>
                    </svg>
                </div>

                {/* Hub Cards Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "24px"
                }}>
                    {hubs.map((hub) => (
                        <div
                            key={hub.city}
                            style={{
                                background: "rgba(13, 19, 35, 0.4)",
                                border: "1px solid rgba(255, 255, 255, 0.05)",
                                borderRadius: "var(--radius)",
                                padding: "28px 24px",
                                backdropFilter: "blur(10px)",
                                transition: "border-color 0.2s"
                            }}
                        >
                            <span style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "10px",
                                color: "var(--violet-mid)",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em",
                                fontWeight: 600,
                                display: "block",
                                marginBottom: "8px"
                            }}>
                                {hub.region}
                            </span>
                            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", marginBottom: "12px" }}>
                                {hub.city} Hub
                            </h3>
                            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "16px", minHeight: "40px" }}>
                                {hub.address}
                            </p>
                            <a
                                href={`mailto:${hub.email}`}
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.78rem",
                                    color: "var(--text-primary)",
                                    textDecoration: "underline",
                                    transition: "color 0.2s"
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = "var(--violet-mid)"}
                                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-primary)"}
                            >
                                {hub.email}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
