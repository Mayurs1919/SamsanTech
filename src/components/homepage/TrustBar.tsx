"use client";

<<<<<<< HEAD
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
=======
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/motion";

const metrics = [
    { value: "50+", label: "Engineers" },
    { value: "20+", label: "Automotive Product Solutions" },
    { value: "10+", label: "Accelerators" },
    { value: "Global", label: "OEM / Tier-1 Engagements" },
    { value: "India Delivery", label: "with Global Market Reach" }
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
];

export default function TrustBar() {
    const shouldReduce = useReducedMotion();

    return (
        <section
            className="metrics-strip"
            aria-label="Key company metrics"
        >
<<<<<<< HEAD
            {/* Subtle gradient line at top */}
            <div style={{
                position: "absolute",
                top: 0,
                left: "10%",
                right: "10%",
                height: "1px",
                background: "linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.3) 30%, rgba(236, 72, 153, 0.3) 70%, transparent 100%)",
                pointerEvents: "none",
=======
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
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
            }} />

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                <motion.div
                    className="metrics-grid"
                    variants={staggerContainerVariants}
                    initial="hidden"
                    whileInView="visible"
<<<<<<< HEAD
                    viewport={{ once: false, margin: "-60px" }}
                >
                    {metrics.map((m, index) => (
=======
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {metrics.map((m) => (
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
                        <motion.div
                            key={m.label}
                            className="metric-item"
                            variants={fadeUpVariants(shouldReduce)}
<<<<<<< HEAD
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
=======
                            whileHover={shouldReduce ? undefined : { y: -4, scale: 1.02 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            <div className="metric-value">
                                {m.value}
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
                            </div>
                            <div className="metric-label">
                                {m.label}
                            </div>
<<<<<<< HEAD

                            {/* Vertical divider — not on last item */}
                            {index < metrics.length - 1 && (
                                <span className="metric-divider" />
                            )}
=======
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
                        </motion.div>
                    ))}
                </motion.div>
            </div>
<<<<<<< HEAD

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
=======
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
        </section>
    );
}
