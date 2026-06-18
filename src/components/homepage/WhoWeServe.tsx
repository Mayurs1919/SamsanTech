"use client";

import { motion, useReducedMotion } from "framer-motion";

const serveItems = [
    {
        title: "Industrial Sectors",
        desc: "High-reliability control loops, sensor telemetry, and safety-critical edge processing.",
        img: "/images/serve_industrial.png",
        gridArea: "left-top",
    },
    {
        title: "Smart Infrastructure",
        desc: "Connected V2X nodes, cloud routing, intelligent traffic hubs, and network telemetry.",
        img: "/images/serve_infrastructure.png",
        gridArea: "left-bottom",
    },
    {
        title: "Automotive Embedded",
        desc: "Cockpit architectures, advanced ADAS modeling, infotainment layers, and AUTOSAR integrations.",
        img: "/images/serve_automotive.png",
        gridArea: "center",
        isFeatured: true,
    },
    {
        title: "Semiconductor Domain",
        desc: "Silicon validation, firmware adaptation, hardware abstraction layers, and compiler tooling.",
        img: "/images/serve_semiconductor.png",
        gridArea: "right-top",
    },
    {
        title: "OEMs & Tier-1s",
        desc: "Production scale deployments, validation verification programs, and strategic Build-Operate-Transfer centers.",
        img: "/images/serve_oems.png",
        gridArea: "right-bottom",
    },
];

export default function WhoWeServe() {
    const shouldReduce = useReducedMotion();

    return (
        <section className="section" id="who-we-serve-section" style={{ position: "relative", borderTop: "1px solid var(--border)" }}>
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "56px" }}>
                    <span className="badge mint" style={{ marginBottom: "16px" }}>Who We Serve</span>
                    <h2 style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.025em" }}>
                        Delivering Domain Expertise
                    </h2>
                    <p className="lead" style={{ maxWidth: "540px", margin: "12px auto 0" }}>
                        We design specialized technology architectures and high-integrity systems across primary embedded and digital mobility domains.
                    </p>
                </div>

                {/* Custom Responsive Grid */}
                <div className="serve-grid-container">
                    
                    {/* Left Column (Industrial & Infrastructure) */}
                    <div className="serve-col">
                        {serveItems.filter(item => item.gridArea.startsWith("left")).map((item, idx) => (
                            <motion.div
                                key={item.title}
                                whileHover={shouldReduce ? {} : { y: -6, scale: 1.01 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="serve-card-img"
                                style={{ backgroundImage: `url(${item.img})` }}
                            >
                                <div className="serve-card-overlay">
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Center Column (Featured Automotive Embedded) */}
                    <div className="serve-col serve-featured-col">
                        {serveItems.filter(item => item.isFeatured).map((item) => (
                            <motion.div
                                key={item.title}
                                whileHover={shouldReduce ? {} : { y: -6, scale: 1.01 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="serve-card-img serve-featured-card"
                                style={{ backgroundImage: `url(${item.img})` }}
                            >
                                <div className="serve-card-overlay featured-overlay">
                                    <span className="badge" style={{ alignSelf: "flex-start", marginBottom: "12px" }}>Core Expertise</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Column (Semiconductor & OEMs) */}
                    <div className="serve-col">
                        {serveItems.filter(item => item.gridArea.startsWith("right")).map((item, idx) => (
                            <motion.div
                                key={item.title}
                                whileHover={shouldReduce ? {} : { y: -6, scale: 1.01 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                                className="serve-card-img"
                                style={{ backgroundImage: `url(${item.img})` }}
                            >
                                <div className="serve-card-overlay">
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Custom CSS overrides for this grid */}
            <style jsx global>{`
                .serve-grid-container {
                    display: grid;
                    grid-template-columns: 1fr 1.2fr 1fr;
                    gap: 24px;
                }
                .serve-col {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                .serve-card-img {
                    height: 220px;
                    border-radius: var(--radius);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    background-size: cover;
                    background-position: center;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                }
                .serve-featured-card {
                    height: 464px;
                }
                .serve-card-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(10, 15, 28, 0.95) 0%, rgba(10, 15, 28, 0.6) 50%, rgba(10, 15, 28, 0.25) 100%);
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 24px;
                    transition: background 0.3s ease;
                }
                .serve-card-img:hover .serve-card-overlay {
                    background: linear-gradient(to top, rgba(10, 15, 28, 0.98) 0%, rgba(10, 15, 28, 0.7) 50%, rgba(10, 15, 28, 0.35) 100%);
                }
                .serve-card-overlay h3 {
                    font-size: 1.15rem;
                    color: #ffffff;
                    margin-bottom: 8px;
                    font-weight: 600;
                }
                .serve-card-overlay p {
                    font-size: 0.8rem;
                    line-height: 1.5;
                    color: var(--text-secondary);
                }
                .featured-overlay h3 {
                    font-size: 1.4rem;
                }
                .featured-overlay p {
                    font-size: 0.88rem;
                }

                @media (max-width: 900px) {
                    .serve-grid-container {
                        grid-template-columns: 1fr;
                    }
                    .serve-featured-card {
                        height: 320px;
                    }
                    .serve-card-img {
                        height: 200px;
                    }
                }
            `}</style>
        </section>
    );
}
