"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";

/* ─── Data ─────────────────────────────────────────────────── */

/** The five partner domains, laid out clockwise from the top of the hero orbit. */
const orbitNodes = [
    { label: "ADAS", x: 50, y: 12 },
    { label: "Connectivity", x: 86.1, y: 38.3 },
    { label: "AI & Perception", x: 72.3, y: 80.7 },
    { label: "Green Mobility", x: 27.7, y: 80.7 },
    { label: "Web & Mobile", x: 13.9, y: 38.3 },
];

const partners = [
    {
        logo: "/images/coreco.png",
        domain: "Web & Mobile",
        name: "Coreco",
        description:
            "Web and mobile app development experts — building scalable, modern applications for enterprise and consumer platforms.",
    },
    {
        logo: "/images/devanture.png",
        domain: "Connectivity",
        name: "Deventure",
        description:
            "Connectivity experts for automotive — specializing in vehicle communication protocols, telematics, and connected mobility solutions.",
    },
    {
        logo: "/images/edgetensor.png",
        logoDark: true,
        domain: "AI & Perception",
        name: "EdgeTensor",
        description:
            "AI-enabled perception stack and solutions for automotive — delivering intelligent sensing and real-time inference at the edge.",
    },
    {
        logo: "/images/pem_technologies.png",
        domain: "ADAS",
        name: "PEM Technologies Pvt Ltd",
        description:
            "ADAS consultants — providing deep expertise in advanced driver assistance systems, sensor fusion, and autonomous driving validation.",
    },
    {
        logo: "/images/prasah.png",
        domain: "Green Mobility",
        name: "Prasah Pvt Ltd",
        description:
            "Hydrogen fuel cell based mobility experts — pioneering clean energy propulsion systems for the next generation of vehicles.",
    },
];

const valueDrivers = [
    {
        advantage: "Automotive software engineering team",
        impact: "Faster scale-up in cockpit, SDV, and connected mobility programs",
    },
    {
        advantage: "Customer access & delivery references",
        impact: "Accelerated market entry, proven execution, and OEM credibility",
    },
    {
        advantage: "Reusable engineering accelerators",
        impact: "Higher productivity, reduced time-to-market, and IP differentiation",
    },
    {
        advantage: "India-based cost-optimised delivery",
        impact: "High margin advantage and scalable global engineering operations",
    },
    {
        advantage: "Founder-led domain expertise",
        impact: "Strategic continuity, domain leadership, and active BD support",
    },
];

/* ─── Reveal-on-scroll wrapper ──────────────────────────────── */

function Reveal({
    children,
    delay = 0,
    className,
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const shouldReduce = useReducedMotion();
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: shouldReduce ? 0 : 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
                shouldReduce
                    ? { duration: 0.05 }
                    : { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }
            }
        >
            {children}
        </motion.div>
    );
}

/* ─── Section heading ───────────────────────────────────────── */

function SectionHead({
    eyebrow,
    title,
    blurb,
    tone,
}: {
    eyebrow: string;
    title: React.ReactNode;
    blurb?: string;
    tone: "dark" | "light";
}) {
    return (
        <div className="sp-head">
            <span className={`sp-pill sp-pill-${tone}`}>{eyebrow}</span>
            <h2 className={`sp-h2 sp-h2-${tone}`}>{title}</h2>
            {blurb && <p className={`sp-blurb sp-blurb-${tone}`}>{blurb}</p>}
        </div>
    );
}

/* ─── Hero ecosystem orbit (decorative) ─────────────────────── */

function PartnerOrbit() {
    return (
        <div className="sp-orbit" aria-hidden="true">
            <div className="sp-orbit-ring" />

            <svg className="sp-orbit-lines" viewBox="0 0 100 100">
                <defs>
                    <linearGradient id="spLine" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="rgba(77,216,232,0.5)" />
                        <stop offset="100%" stopColor="rgba(232,82,26,0.3)" />
                    </linearGradient>
                </defs>
                {orbitNodes.map((n) => (
                    <line
                        key={n.label}
                        x1="50"
                        y1="50"
                        x2={n.x}
                        y2={n.y}
                        stroke="url(#spLine)"
                        strokeWidth="0.35"
                    />
                ))}
            </svg>

            <div className="sp-orbit-core">
                <span className="sp-orbit-core-name">SAMSAN</span>
                <span className="sp-orbit-core-sub">ecosystem</span>
            </div>

            {orbitNodes.map((n) => (
                <span
                    key={n.label}
                    className="sp-orbit-node"
                    style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                    {n.label}
                </span>
            ))}
        </div>
    );
}

/* ─── Client Component ──────────────────────────────────────── */

export default function InvestorsClient() {
    const shouldReduce = useReducedMotion();

    return (
        <div className="sp-page">
            <style>{`
        .sp-page {
            --cyan: #4DD8E8;
            --orange: #E8521A;
            --amber: #F59E0B;
            --ink: #0B1320;
            --ink-soft: #475569;
            --paper: #F8FAFC;
            --panel: #111622;
        }

        /* ---------- Shared type ---------- */
        .sp-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            border-radius: 999px;
            padding: 6px 16px;
            margin-bottom: 20px;
        }
        .sp-pill::before {
            content: "";
            width: 6px; height: 6px;
            border-radius: 50%;
        }
        .sp-pill-dark {
            color: var(--cyan);
            background: rgba(77,216,232,0.07);
            border: 1px solid rgba(77,216,232,0.24);
        }
        .sp-pill-dark::before { background: var(--cyan); box-shadow: 0 0 8px rgba(77,216,232,0.8); }
        .sp-pill-light {
            color: var(--orange);
            background: rgba(232,82,26,0.07);
            border: 1px solid rgba(232,82,26,0.2);
        }
        .sp-pill-light::before { background: var(--orange); box-shadow: 0 0 8px rgba(232,82,26,0.5); }

        .sp-h1 {
            font-family: var(--font-display);
            font-size: clamp(2.5rem, 4.6vw, 3.7rem);
            font-weight: 700;
            letter-spacing: -0.03em;
            line-height: 1.06;
            color: #FFFFFF;
            margin: 0 0 22px;
        }
        .sp-h2 {
            font-family: var(--font-display);
            font-size: clamp(1.8rem, 3.1vw, 2.5rem);
            font-weight: 700;
            letter-spacing: -0.02em;
            line-height: 1.15;
            margin: 0 0 14px;
        }
        .sp-h2-dark { color: #F0F4FF; }
        .sp-h2-light { color: var(--ink); }

        .sp-blurb {
            font-family: var(--font-body);
            font-size: 1.05rem;
            line-height: 1.75;
            max-width: 640px;
            margin: 0;
        }
        .sp-blurb-dark { color: #9CA8C4; }
        .sp-blurb-light { color: var(--ink-soft); }

        .sp-head { margin-bottom: 44px; }

        /* ---------- Hero ---------- */
        .sp-hero {
            position: relative;
            overflow: hidden;
            background:
                radial-gradient(700px 420px at 88% 6%, rgba(77,216,232,0.10) 0%, transparent 64%),
                radial-gradient(560px 420px at 4% 92%, rgba(232,82,26,0.07) 0%, transparent 66%),
                linear-gradient(180deg, #06080C 0%, var(--midnight) 100%);
            padding: clamp(118px, 13vw, 168px) 0 clamp(80px, 8vw, 112px);
        }
        .sp-hero::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image:
                linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
            background-size: 68px 68px;
            mask-image: radial-gradient(ellipse 80% 65% at 50% 32%, #000 18%, transparent 100%);
            -webkit-mask-image: radial-gradient(ellipse 80% 65% at 50% 32%, #000 18%, transparent 100%);
            pointer-events: none;
        }
        .sp-hero-grid {
            position: relative;
            z-index: 1;
            display: grid;
            grid-template-columns: minmax(0, 1.06fr) minmax(0, 0.94fr);
            gap: clamp(40px, 5vw, 72px);
            align-items: center;
        }
        .sp-rule {
            width: 76px; height: 3px;
            border-radius: 2px;
            background: linear-gradient(90deg, var(--cyan), var(--orange));
            margin-bottom: 28px;
        }

        /* Domain chips stand in for the orbit on narrow screens */
        .sp-chips {
            display: none;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 32px;
        }
        .sp-chip {
            font-family: var(--font-mono);
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: #B8C4DC;
            background: rgba(255,255,255,0.035);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            padding: 7px 12px;
        }

        /* ---------- Orbit ---------- */
        .sp-orbit {
            position: relative;
            width: 100%;
            max-width: 440px;
            aspect-ratio: 1 / 1;
            margin: 0 auto;
        }
        .sp-orbit-ring {
            position: absolute;
            left: 50%; top: 50%;
            width: 76%; height: 76%;
            transform: translate(-50%, -50%);
            border: 1px dashed rgba(255,255,255,0.14);
            border-radius: 50%;
            animation: sp-spin 72s linear infinite;
        }
        @keyframes sp-spin { to { transform: translate(-50%, -50%) rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .sp-orbit-ring { animation: none; } }

        .sp-orbit-lines {
            position: absolute;
            inset: 0;
            width: 100%; height: 100%;
            overflow: visible;
        }
        .sp-orbit-core {
            position: absolute;
            left: 50%; top: 50%;
            transform: translate(-50%, -50%);
            width: 118px; height: 118px;
            border-radius: 50%;
            background: radial-gradient(circle at 32% 28%, #1B2440 0%, #0C111E 78%);
            border: 1px solid rgba(77,216,232,0.3);
            box-shadow: 0 0 44px rgba(77,216,232,0.16), inset 0 0 22px rgba(77,216,232,0.06);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2px;
        }
        .sp-orbit-core-name {
            font-family: var(--font-display);
            font-size: 1.02rem;
            font-weight: 700;
            letter-spacing: 0.06em;
            color: #FFFFFF;
        }
        .sp-orbit-core-sub {
            font-family: var(--font-mono);
            font-size: 8.5px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(77,216,232,0.78);
        }
        .sp-orbit-node {
            position: absolute;
            transform: translate(-50%, -50%);
            font-family: var(--font-mono);
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.07em;
            text-transform: uppercase;
            color: #D3DCEB;
            white-space: nowrap;
            background: rgba(12,17,30,0.92);
            border: 1px solid rgba(255,255,255,0.14);
            border-radius: 999px;
            padding: 7px 13px;
            transition: color .24s ease, border-color .24s ease, background .24s ease;
        }
        .sp-orbit-node:hover {
            color: var(--cyan);
            border-color: rgba(77,216,232,0.45);
            background: rgba(77,216,232,0.08);
        }

        /* ---------- Partner ecosystem (light) ---------- */
        .sp-partners {
            background: var(--paper);
            border-top: 1px solid #E2E8F0;
            padding: clamp(80px, 8.5vw, 112px) 0;
        }
        .sp-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 26px;
            align-items: stretch;
        }
        /* Grid item wrapper — lets each card stretch to the full row height */
        .sp-cell { display: flex; }
        .sp-card {
            position: relative;
            flex: 1;
            display: flex;
            flex-direction: column;
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 18px;
            padding: 30px 28px 32px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(11,19,32,0.04);
            transition: transform .28s cubic-bezier(.16,1,.3,1), box-shadow .28s ease, border-color .28s ease;
        }
        .sp-card::after {
            content: "";
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--orange), var(--amber));
            transform: scaleX(0);
            transform-origin: left;
            transition: transform .34s cubic-bezier(.16,1,.3,1);
        }
        .sp-card:hover {
            transform: translateY(-6px);
            border-color: rgba(232,82,26,0.28);
            box-shadow: 0 22px 44px rgba(11,19,32,0.11);
        }
        .sp-card:hover::after { transform: scaleX(1); }

        .sp-card-top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 14px;
            margin-bottom: 22px;
        }
        .sp-logo {
            width: 116px; height: 46px;
            border-radius: 10px;
            background: #FFFFFF;
            border: 1px solid rgba(15,23,42,0.1);
            display: flex; align-items: center; justify-content: center;
            padding: 7px 11px;
            flex-shrink: 0;
            transition: border-color .24s ease;
        }
        .sp-card:hover .sp-logo { border-color: rgba(15,23,42,0.2); }
        .sp-logo img { width: 100%; height: 100%; object-fit: contain; display: block; }
        .sp-logo-dark { background: #0E1117; border-color: rgba(15,23,42,0.5); }

        .sp-domain {
            font-family: var(--font-mono);
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--orange);
            background: rgba(232,82,26,0.07);
            border: 1px solid rgba(232,82,26,0.18);
            border-radius: 999px;
            padding: 5px 11px;
            white-space: nowrap;
        }
        .sp-card h3 {
            font-family: var(--font-display);
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--ink);
            margin: 0 0 10px;
            letter-spacing: -0.015em;
            line-height: 1.3;
        }
        .sp-card p {
            font-family: var(--font-body);
            font-size: 0.93rem;
            color: var(--ink-soft);
            line-height: 1.7;
            margin: 0;
        }

        /* ---------- Strategic alignment (dark) ---------- */
        .sp-alignment {
            background: linear-gradient(180deg, var(--midnight) 0%, #0D1323 100%);
            border-top: 1px solid rgba(255,255,255,0.06);
            padding: clamp(80px, 8.5vw, 112px) 0;
        }
        .sp-table {
            border: 1px solid rgba(255,255,255,0.09);
            border-radius: 18px;
            overflow: hidden;
            background: var(--panel);
            box-shadow: 0 20px 60px rgba(0,0,0,0.34);
        }
        .sp-row {
            display: grid;
            grid-template-columns: 56px 1fr 1.15fr;
            align-items: stretch;
            border-bottom: 1px solid rgba(255,255,255,0.07);
            border-left: 3px solid transparent;
            transition: background .24s ease, border-left-color .24s ease;
        }
        .sp-row:last-child { border-bottom: none; }
        .sp-row:hover {
            background: rgba(77,216,232,0.045);
            border-left-color: var(--cyan);
        }
        .sp-row-head {
            background: rgba(255,255,255,0.025);
            border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        .sp-row-head:hover { background: rgba(255,255,255,0.025); border-left-color: transparent; }

        .sp-idx {
            font-family: var(--font-mono);
            font-size: 12px;
            font-weight: 700;
            color: rgba(77,216,232,0.62);
            display: flex; align-items: center; justify-content: center;
            border-right: 1px solid rgba(255,255,255,0.06);
        }
        .sp-adv, .sp-imp {
            font-family: var(--font-body);
            padding: 22px 28px;
            display: flex; align-items: center;
            line-height: 1.6;
        }
        .sp-adv {
            font-weight: 600;
            font-size: 0.98rem;
            color: #F0F4FF;
            letter-spacing: -0.005em;
            border-right: 1px solid rgba(255,255,255,0.06);
        }
        .sp-imp { font-size: 0.95rem; color: #9CA8C4; }

        .sp-th {
            font-family: var(--font-mono);
            font-size: 10.5px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #7A8AA8;
            padding: 18px 28px;
            display: flex; align-items: center;
        }

        /* ---------- CTA (dark, gradient-continuous with alignment) ---------- */
        .sp-cta {
            background: linear-gradient(180deg, #0D1323 0%, var(--midnight) 100%);
            padding: clamp(80px, 8.5vw, 112px) 0;
        }
        .sp-cta-card {
            position: relative;
            overflow: hidden;
            background: linear-gradient(160deg, #131A2B 0%, var(--panel) 100%);
            border: 1px solid rgba(255,255,255,0.09);
            border-radius: 24px;
            padding: clamp(44px, 6vw, 72px) clamp(24px, 5vw, 56px);
            text-align: center;
            box-shadow: 0 28px 70px rgba(0,0,0,0.36);
        }
        .sp-cta-card::before {
            content: "";
            position: absolute;
            top: -40%; left: 50%;
            transform: translateX(-50%);
            width: 620px; height: 620px;
            background: radial-gradient(circle, rgba(77,216,232,0.09) 0%, transparent 68%);
            pointer-events: none;
        }
        .sp-cta-rule {
            position: absolute;
            top: 0; left: 50%;
            transform: translateX(-50%);
            width: 168px; height: 3px;
            background: linear-gradient(90deg, var(--cyan), var(--orange));
            border-radius: 0 0 4px 4px;
        }
        .sp-cta-inner { position: relative; z-index: 1; }
        .sp-cta h2 {
            font-family: var(--font-display);
            font-size: clamp(1.9rem, 3.2vw, 2.6rem);
            font-weight: 700;
            color: #FFFFFF;
            letter-spacing: -0.025em;
            line-height: 1.15;
            margin: 0 0 16px;
        }
        .sp-cta p {
            font-family: var(--font-body);
            font-size: 1.05rem;
            line-height: 1.75;
            color: #9CA8C4;
            max-width: 560px;
            margin: 0 auto 36px;
        }
        .sp-actions {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            flex-wrap: wrap;
        }
        .sp-btn {
            display: inline-flex;
            align-items: center;
            gap: 9px;
            font-family: var(--font-body);
            font-size: 0.98rem;
            font-weight: 600;
            padding: 14px 30px;
            border-radius: 12px;
            text-decoration: none;
            transition: transform .22s ease, box-shadow .22s ease, background .22s ease, border-color .22s ease, color .22s ease;
        }
        .sp-btn-primary {
            background: var(--orange);
            color: #FFFFFF;
            box-shadow: 0 6px 20px rgba(232,82,26,0.32);
        }
        .sp-btn-primary:hover {
            transform: translateY(-2px);
            background: #F2611F;
            box-shadow: 0 12px 30px rgba(232,82,26,0.42);
        }
        .sp-btn-ghost {
            color: #CBD5E1;
            border: 1px solid rgba(255,255,255,0.18);
            background: rgba(255,255,255,0.02);
        }
        .sp-btn-ghost:hover {
            transform: translateY(-2px);
            color: var(--cyan);
            border-color: rgba(77,216,232,0.44);
            background: rgba(77,216,232,0.06);
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 1024px) {
            .sp-hero-grid { grid-template-columns: 1fr; gap: 54px; }
            .sp-hero-text { max-width: 660px; }
            .sp-grid { grid-template-columns: repeat(2, 1fr); }
            .sp-adv, .sp-imp { padding: 20px 22px; }
            .sp-th { padding: 16px 22px; }
            .sp-orbit { max-width: 400px; }
        }
        @media (max-width: 768px) {
            .sp-row { grid-template-columns: 44px 1fr; }
            /* Two column headers no longer fit side-by-side; label each impact cell inline */
            .sp-row-head { display: none; }
            .sp-imp {
                grid-column: 2;
                display: block;
                border-top: 1px dashed rgba(255,255,255,0.08);
                padding-top: 14px;
                padding-bottom: 22px;
                color: #8494B2;
            }
            .sp-imp::before {
                content: "Why it matters";
                display: block;
                font-family: var(--font-mono);
                font-size: 9.5px;
                font-weight: 700;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                color: #6B7A96;
                margin-bottom: 6px;
            }
            .sp-adv { border-right: none; }
            .sp-head { margin-bottom: 34px; }
        }
        @media (max-width: 640px) {
            .sp-grid { grid-template-columns: 1fr; gap: 20px; }
            .sp-h1 { font-size: clamp(2.1rem, 9vw, 2.8rem); }
            .sp-blurb { font-size: 1rem; }
            .sp-actions { flex-direction: column; width: 100%; }
            .sp-btn { width: 100%; justify-content: center; }
            /* The orbit needs room for its labels; swap it for the chip row */
            .sp-orbit { display: none; }
            .sp-hero-grid { gap: 0; }
            .sp-chips { display: flex; }
        }
        @media (max-width: 420px) {
            .sp-card { padding: 24px 20px 26px; }
            .sp-card-top { flex-direction: column; align-items: flex-start; }
            .sp-row { grid-template-columns: 36px 1fr; }
        }
      `}</style>

            {/* ══════════════════════════════════════════
                §1  PAGE HERO  —  dark
            ══════════════════════════════════════════ */}
            <section className="sp-hero" aria-labelledby="strategic-partners-heading">
                <div className="container">
                    <div className="sp-hero-grid">
                        <motion.div
                            className="sp-hero-text"
                            variants={staggerContainerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={fadeUpVariants(shouldReduce)}>
                                <span className="sp-pill sp-pill-dark">
                                    Corporate Growth &amp; Ecosystem
                                </span>
                            </motion.div>

                            <motion.h1
                                id="strategic-partners-heading"
                                className="sp-h1"
                                variants={fadeUpVariants(shouldReduce)}
                            >
                                Strategic Partners
                            </motion.h1>

                            <motion.div
                                className="sp-rule"
                                variants={fadeUpVariants(shouldReduce)}
                            />

                            <motion.p
                                className="sp-blurb sp-blurb-dark"
                                variants={fadeUpVariants(shouldReduce)}
                            >
                                Explore SAMSAN corporate growth, strategic buyer alignment, and
                                our partnership ecosystem spanning ADAS, connectivity, AI and
                                green mobility.
                            </motion.p>

                            <motion.div
                                className="sp-chips"
                                variants={fadeUpVariants(shouldReduce)}
                            >
                                {orbitNodes.map((n) => (
                                    <span key={n.label} className="sp-chip">
                                        {n.label}
                                    </span>
                                ))}
                            </motion.div>
                        </motion.div>

                        <Reveal delay={0.15}>
                            <PartnerOrbit />
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                §2  PARTNER ECOSYSTEM  —  light
                    occupies the slot of the removed Financial Highlights band
            ══════════════════════════════════════════ */}
            <section className="sp-partners">
                <div className="container">
                    <Reveal>
                        <SectionHead
                            tone="light"
                            eyebrow="Partner Ecosystem"
                            title="Technology & Domain Partners"
                            blurb="SAMSAN collaborates with specialised technology and domain partners to deliver end-to-end automotive software and hardware engineering solutions."
                        />
                    </Reveal>

                    <div className="sp-grid">
                        {partners.map((p, i) => (
                            <Reveal key={p.name} className="sp-cell" delay={(i % 3) * 0.07}>
                                <article className="sp-card">
                                    <div className="sp-card-top">
                                        <div className={`sp-logo${p.logoDark ? " sp-logo-dark" : ""}`}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={p.logo}
                                                alt={`${p.name} logo`}
                                                loading="lazy"
                                            />
                                        </div>
                                        <span className="sp-domain">{p.domain}</span>
                                    </div>

                                    <h3>{p.name}</h3>
                                    <p>{p.description}</p>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                §3  STRATEGIC ALIGNMENT  —  dark
            ══════════════════════════════════════════ */}
            <section className="sp-alignment">
                <div className="container">
                    <Reveal>
                        <SectionHead
                            tone="dark"
                            eyebrow="Strategic Alignment"
                            title="Why Strategic Buyers Choose SAMSAN"
                            blurb="Key value drivers and advantages delivered to OEMs, Tier-1 automotive suppliers, and technology investors."
                        />
                    </Reveal>

                    <Reveal delay={0.08}>
                        <div className="sp-table" aria-label="Strategic value drivers" role="list">
                            <div className="sp-row sp-row-head" aria-hidden="true">
                                <div />
                                <div className="sp-th">Strategic Buyer Gets</div>
                                <div className="sp-th">Why It Matters</div>
                            </div>

                            {valueDrivers.map((driver, idx) => (
                                <div className="sp-row" role="listitem" key={driver.advantage}>
                                    <div className="sp-idx" aria-hidden="true">
                                        {String(idx + 1).padStart(2, "0")}
                                    </div>
                                    <div className="sp-adv">{driver.advantage}</div>
                                    <div className="sp-imp">{driver.impact}</div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                §4  CTA  —  dark, gradient-continuous with §3
            ══════════════════════════════════════════ */}
            <section className="sp-cta" aria-labelledby="strategic-partners-cta">
                <div className="container">
                    <Reveal>
                        <div className="sp-cta-card">
                            <div className="sp-cta-rule" />
                            <div className="sp-cta-inner">
                                <span className="sp-pill sp-pill-dark">
                                    Strategic Partnership
                                </span>

                                <h2 id="strategic-partners-cta">
                                    Explore Strategic Opportunities
                                </h2>

                                <p>
                                    Connect with our corporate leadership team to discuss CoE
                                    setups, joint ventures, investments, or strategic alliances.
                                </p>

                                <div className="sp-actions">
                                    <a
                                        href="mailto:india@samsanlabs.com"
                                        className="sp-btn sp-btn-primary"
                                    >
                                        Request Investor Materials
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M3 8h10M9 4l4 4-4 4"
                                                stroke="currentColor"
                                                strokeWidth="1.7"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>

                                    <Link href="/services" className="sp-btn sp-btn-ghost">
                                        View Engineering Offerings
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
