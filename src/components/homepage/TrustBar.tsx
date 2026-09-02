"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/motion";

const metrics = [
    { value: "50+", label: "Engineers" },
    { value: "20+", label: "Automotive Product Solutions" },
    { value: "10+", label: "Accelerators" },
    { value: "Global", label: "OEM / Tier-1 Engagements" },
    { value: "India Delivery", label: "with Global Market Reach" }
];

export default function TrustBar() {
    const shouldReduce = useReducedMotion();

    return (
        <section
            className="metrics-strip"
            aria-label="Key company metrics"
        >
            {/* Ambient background glow to smoothly blend with Hero */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                height: "100%",
                background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
                pointerEvents: "none",
                zIndex: 0
            }} />

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                <motion.div
                    className="metrics-grid"
                    variants={staggerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {metrics.map((m) => (
                        <motion.div
                            key={m.label}
                            className="metric-item"
                            variants={fadeUpVariants(shouldReduce)}
                            whileHover={shouldReduce ? undefined : { y: -4, scale: 1.02 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            <div className="metric-value">
                                {m.value}
                            </div>
                            <div className="metric-label">
                                {m.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
