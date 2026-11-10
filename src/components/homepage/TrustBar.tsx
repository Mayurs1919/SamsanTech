"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(target);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { amount: 0.3, once: true });
    const shouldReduce = useReducedMotion();
    const animationRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (shouldReduce || !isInView) {
            setCount(target);
            return;
        }

        let start: number | null = null;
        const duration = 1200;
        const step = (timestamp: number) => {
            if (start === null) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 2.2);
            setCount(Math.min(Math.floor(eased * target), target));
            if (progress < 1) animationRef.current = requestAnimationFrame(step);
        };

        animationRef.current = requestAnimationFrame(step);
        return () => {
            if (animationRef.current !== undefined) cancelAnimationFrame(animationRef.current);
        };
    }, [isInView, shouldReduce, target]);

    return <span ref={ref}>{count}{suffix}</span>;
}

const metrics = [
    { numericTarget: 50, suffix: "+", label: "Specialized" },
    { numericTarget: 20, suffix: "+", label: "Automotive Product Solutions" },
    { numericTarget: 10, suffix: "+", label: "Accelerators" },
    { value: "Global", label: "OEM / Tier-1 Engagements" },
];

export default function TrustBar() {
    return (
        <section className="metrics-strip" aria-label="Key company metrics">
            <div className="container">
                <div className="metrics-grid">
                    {metrics.map((metric) => (
                        <div className="metric-item" key={metric.label}>
                            <div className="metric-value">
                                {metric.numericTarget != null
                                    ? <CountUp target={metric.numericTarget} suffix={metric.suffix} />
                                    : metric.value}
                            </div>
                            <div className="metric-label">{metric.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
