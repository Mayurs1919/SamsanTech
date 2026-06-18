"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeInVariants, staggerContainerVariants, fadeUpVariants } from "@/lib/motion";

const metrics = [
    { value: "10+", label: "Years Domain Experience" },
    { value: "50M+", label: "Daily Telemetry Requests" },
    { value: "ISO 27001", label: "Security Certified" },
    { value: "3", label: "Global Delivery Regions" },
];

export default function TrustBar() {
    const shouldReduce = useReducedMotion();

    return (
        <section className="metrics-strip" aria-label="Key company metrics">
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
                        >
                            <div className="metric-value">{m.value}</div>
                            <div className="metric-label">{m.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
