"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/motion";

// ── Smooth count-up using requestAnimationFrame ──────────────────
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { amount: 0.3 });
    const shouldReduce = useReducedMotion();
    const animationRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (shouldReduce) {
            setCount(target);
            if (ref.current) ref.current.textContent = `${target}${suffix}`;
            return;
        }

        if (!isInView) {
            // Reset count to 0 when out of view so it re-animates smoothly next time it enters
            setCount(0);
            if (ref.current) ref.current.textContent = `0${suffix}`;
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            return;
        }

        let start: number | null = null;
        const duration = 1200; // 1.2s optimal duration

        const step = (timestamp: number) => {
            if (start === null) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            // Smooth custom ease-out curve (2.2 exponent) for continuous progress without final value sticking/lag
            const ease = 1 - Math.pow(1 - progress, 2.2);
            const current = Math.min(Math.floor(ease * target), target);

            if (ref.current) {
                ref.current.textContent = `${current}${suffix}`;
            }

            if (progress < 1) {
                animationRef.current = requestAnimationFrame(step);
            } else {
                setCount(target);
                if (ref.current) {
                    ref.current.textContent = `${target}${suffix}`;
                }
            }
        };

        animationRef.current = requestAnimationFrame(step);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isInView, target, suffix, shouldReduce]);

    return (
        <span ref={ref} style={{ display: "inline-block" }}>
            {count}{suffix}
        </span>
    );
}

// ── Metric data ──────────────────────────────────────────────────
interface Metric {
    numericTarget?: number;
    value?: string;
    suffix?: string;
    label: string;
    /** Accent color for the number */
    accent: string;
}

const metrics: Metric[] = [
    { numericTarget: 50, suffix: "+", label: "Specialized", accent: "#7C3AED" },
    { numericTarget: 20, suffix: "+", label: "Automotive Product Solutions", accent: "#3B82F6" },
    { numericTarget: 10, suffix: "+", label: "Accelerators", accent: "#EC4899" },
    { value: "Global", label: "OEM / Tier-1 Engagements", accent: "#10B981" },
];

export default function TrustBar() {
    const shouldReduce = useReducedMotion();

    return (
        <section
            className="metrics-strip"
            aria-label="Key company metrics"
        >
            {/* Subtle gradient line at top */}
            <div style={{
                position: "absolute",
                top: 0,
                left: "10%",
                right: "10%",
                height: "1px",
                background: "linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.3) 30%, rgba(236, 72, 153, 0.3) 70%, transparent 100%)",
                pointerEvents: "none",
            }} />

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                <motion.div
                    className="metrics-grid"
                    variants={staggerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-60px" }}
                >
                    {metrics.map((m, index) => (
                        <motion.div
                            key={m.label}
                            className="metric-item"
                            variants={fadeUpVariants(shouldReduce)}
                        >
                            {/* Accent dot */}
                            <span className="metric-dot" style={{ background: m.accent }} />

                            <div className="metric-value" style={{
                                background: `linear-gradient(135deg, ${m.accent}, ${m.accent}cc)`,
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}>
                                {m.numericTarget != null ? (
                                    <CountUp target={m.numericTarget} suffix={m.suffix} />
                                ) : (
                                    m.value
                                )}
                            </div>
                            <div className="metric-label">
                                {m.label}
                            </div>

                            {/* Vertical divider — not on last item */}
                            {index < metrics.length - 1 && (
                                <span className="metric-divider" />
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Subtle gradient line at bottom */}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: "10%",
                right: "10%",
                height: "1px",
                background: "linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.2) 30%, rgba(16, 185, 129, 0.2) 70%, transparent 100%)",
                pointerEvents: "none",
            }} />
        </section>
    );
}
