"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const fadeUp = (reduced: boolean | null, delay = 0) => ({
    hidden: { opacity: 0, y: reduced ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as any } },
});
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function CTA() {
    const shouldReduce = useReducedMotion();

    return (
        <section className="cta-section" aria-labelledby="cta-heading">
            <div className="container">
                <motion.div
                    className="cta-inner"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    <motion.div variants={fadeUp(shouldReduce, 0)}>
                        <span className="badge mint" style={{ marginBottom: "24px" }}>Ready to build?</span>
                    </motion.div>

                    <motion.h2 id="cta-heading" variants={fadeUp(shouldReduce, 0.1)}>
                        Let&apos;s scope your engagement
                    </motion.h2>

                    <motion.p className="lead" variants={fadeUp(shouldReduce, 0.2)}>
                        Tell us which discipline you need first — embedded, digital, or consulting. We&apos;ll take it from there.
                    </motion.p>

                    <motion.div className="cta-actions" variants={fadeUp(shouldReduce, 0.3)}>
                        <motion.div
                            whileHover={shouldReduce ? {} : { scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Link href="/contact" className="btn btn-primary" id="cta-primary-btn">
                                Contact Us
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                                    <path d="M2.5 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={shouldReduce ? {} : { scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Link href="/services" className="btn btn-outline" id="cta-secondary-btn">
                                See our services
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
