"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/motion";

const metrics = [
    { value: "50+", label: "Engineers" },
    { value: "20+", label: "Automotive Product Solutions" },
    { value: "10+", label: "Accelerators" },
    { value: "Global", label: "OEM/Tier-1 Engagements" },
    { value: "India Delivery", label: "with Global Market Reach" }
];

export default function TrustBar() {
    const shouldReduce = useReducedMotion();

    return (
        <section
            className="metrics-strip"
            aria-label="Key company metrics"
            style={{ background: "#0A0D11" }}
        >
            <div className="container">
                <motion.div
                    className="metrics-grid"
                    variants={staggerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                >
                    {metrics.map((m) => (
                        <motion.div
                            key={m.label}
                            className="metric-item"
                            variants={fadeUpVariants(shouldReduce)}
                            style={{ background: "#12161C" }}
                        >
                            <div
                                className="metric-value"
                                style={{
                                    background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                                    backgroundSize: "200% auto",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                {m.value}
                            </div>
                            <div
                                className="metric-label"
                                style={{ color: "#94A3B8" }}
                            >
                                {m.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
