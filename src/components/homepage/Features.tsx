"use client";

import { motion, useReducedMotion } from "framer-motion";

const fadeUp = (reduced: boolean | null, delay = 0) => ({
    hidden: { opacity: 0, y: reduced ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as any } },
});
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const accelerators = [
    {
        number: "01",
        title: "GenAI AutoMATE",
        description: "Applies generative AI across the automotive software delivery pipeline — from code generation to test scaffolding — so teams spend their time on the parts of the system that actually differentiate the product.",
        tags: ["Code Generation", "Test Scaffolding", "Pipeline Automation"],
    },
    {
        number: "02",
        title: "GenAI System Engg",
        description: "Brings GenAI into requirements capture, architecture documentation, and validation planning — the system-engineering work that usually slows a programme down before a line of code is written.",
        tags: ["Requirements Capture", "Architecture Docs", "Validation Planning"],
    },
];

export default function Features() {
    const shouldReduce = useReducedMotion();

    return (
        <section className="section" style={{ background: "var(--navy)" }} aria-labelledby="accel-heading">
            <div className="container">
                <motion.div
                    className="section-header"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    <motion.div variants={fadeUp(shouldReduce)}>
                        <span className="badge rose">Accelerators</span>
                    </motion.div>
                    <motion.h2 id="accel-heading" variants={fadeUp(shouldReduce, 0.1)} style={{ marginTop: "16px", marginBottom: "14px" }}>
                        Pre-built, not bolted on.
                    </motion.h2>
                    <motion.p className="lead" variants={fadeUp(shouldReduce, 0.2)}>
                        GenAI tools we ship into every engagement from day one — not experiments, but production-proven accelerators.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="accelerators-grid"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {accelerators.map((a) => (
                        <motion.div
                            key={a.title}
                            className="accel-card"
                            variants={fadeUp(shouldReduce)}
                            whileHover={shouldReduce ? {} : { y: -5, transition: { duration: 0.25 } }}
                        >
                            <div className="accel-number">Accelerator {a.number}</div>
                            <h3>{a.title}</h3>
                            <p>{a.description}</p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "24px" }}>
                                {a.tags.map((tag) => (
                                    <span key={tag} style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.06em", color: "var(--text-muted)", border: "1px solid var(--border)", borderRadius: "100px", padding: "4px 12px" }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
