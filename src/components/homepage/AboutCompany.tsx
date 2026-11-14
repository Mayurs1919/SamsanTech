"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

function CountUpNumber({ target, suffix = "+" }: { target: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { amount: 0.3, once: true });
    const shouldReduce = useReducedMotion();

    useEffect(() => {
        if (!ref.current || shouldReduce || !isInView) return;

        let start: number | null = null;
        let frame = 0;
        const duration = 1200;
        const step = (timestamp: number) => {
            if (start === null) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 2.2);
            const current = Math.min(Math.floor(eased * target), target);
            if (ref.current) ref.current.textContent = `${current}${suffix}`;
            if (progress < 1) frame = requestAnimationFrame(step);
            else if (ref.current) ref.current.textContent = `${target}${suffix}`;
        };

        ref.current.textContent = `0${suffix}`;
        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [isInView, shouldReduce, suffix, target]);

    return <span ref={ref}>{target}{suffix}</span>;
}

export default function AboutCompany() {
    return (
        <section className="home-about-section" id="about-company-section">
            <div className="container">
                <div className="home-about-grid">
                    <div className="home-about-copy">
                        <p className="home-about-eyebrow">A technology outcomes and systems company</p>
                        <h2>We Are SAMSAN</h2>
                        <div className="home-about-paragraphs">
                            <p>
                                A specialized systems design house focused on high-integrity software platforms, embedded engineering, and digital transformation. Focused on Cockpit Engineering, ADAS, and connected mobility ecosystems.
                            </p>
                            <p>
                                We deliver full-lifecycle engineering, from concept definition to deployment. Serving global tier-1s, OEMs, and technology companies with premium software-defined architectures.
                            </p>
                        </div>
                        <p className="home-about-signoff">Always in sync with the future</p>
                    </div>

                    <div className="home-about-card">
                        <h3>Focus On Automotive, Cockpit Engineering &amp; Digital Transformation.</h3>
                        <div className="home-about-stats">
                            <div className="home-about-stat">
                                <div className="home-about-stat__number"><CountUpNumber target={50} suffix="+" /></div>
                                <div className="home-about-stat__label">Projects Completed</div>
                            </div>
                            <div className="home-about-stat">
                                <div className="home-about-stat__number"><CountUpNumber target={6} suffix="+" /></div>
                                <div className="home-about-stat__label">Countries Served</div>
                            </div>
                            <div className="home-about-stat">
                                <div className="home-about-stat__delivery">
                                    India delivery center with global customer and partner presence across Europe, US, Japan and South Korea
                                </div>
                                <div className="home-about-stat__label home-about-stat__label--teal">Global Footprint</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                .home-theme .home-about-section { padding: 96px 24px; background: var(--bg-alt); }
                .home-theme .home-about-section .container { width: min(100%, 1200px); max-width: 1200px; margin-inline: auto; padding: 0; }
                .home-theme .home-about-grid { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr); align-items: center; gap: 48px; }
                .home-theme .home-about-eyebrow { margin: 0 0 16px; color: var(--teal); font-size: 14px; font-weight: 600; letter-spacing: .02em; line-height: 1.4; }
                .home-theme .home-about-copy h2 { margin: 0 0 24px; color: var(--navy); font-family: var(--font-corp-manrope), Manrope, sans-serif; font-size: clamp(32px, 3.5vw, 44px); font-weight: 700; line-height: 1.15; text-wrap: balance; }
                .home-theme .home-about-paragraphs { display: flex; flex-direction: column; gap: 18px; }
                .home-theme .home-about-paragraphs p { margin: 0; color: var(--body); font-size: 17px; line-height: 1.7; }
                .home-theme .home-about-signoff { margin: 28px 0 0; padding-left: 16px; border-left: 3px solid var(--teal); color: var(--teal); font-size: 16px; font-weight: 600; line-height: 1.5; }
                .home-theme .home-about-card { min-width: 0; padding: 32px; border: 1px solid var(--border); border-radius: 16px; color: var(--body); background: #FFFFFF; box-shadow: 0 1px 2px rgba(11,19,32,.06), 0 8px 24px rgba(11,19,32,.06); }
                .home-theme .home-about-card h3 { margin: 0 0 28px; color: var(--navy); font-family: var(--font-corp-manrope), Manrope, sans-serif; font-size: 20px; font-weight: 700; line-height: 1.4; text-wrap: balance; }
                .home-theme .home-about-stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 20px; padding-top: 24px; border-top: 1px solid var(--border); }
                .home-theme .home-about-stat { min-width: 0; }
                .home-theme .home-about-stat__number { color: var(--teal); font-family: var(--font-corp-manrope), Manrope, sans-serif; font-size: 40px; font-weight: 800; line-height: 1.1; }
                .home-theme .home-about-stat__label { margin-top: 6px; color: var(--body); font-size: 14px; font-weight: 400; line-height: 1.45; text-transform: none; }
                .home-theme .home-about-stat__label--teal { color: var(--teal); font-weight: 600; }
                .home-theme .home-about-stat__delivery { color: var(--body); font-size: 16px; line-height: 1.6; }
                @media (max-width: 760px) {
                    .home-theme .home-about-section { padding: 64px 20px; }
                    .home-theme .home-about-grid { grid-template-columns: 1fr; gap: 32px; }
                    .home-theme .home-about-card { padding: 24px; }
                }
                @media (max-width: 420px) { .home-theme .home-about-stats { grid-template-columns: 1fr; } }
            `}</style>
        </section>
    );
}
