"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const serveItems = [
    { title: "Industrial Sectors", img: "/images/domain-industrial-sectors.png", icon: "factory" },
    { title: "Smart Infrastructure", img: "/images/domain-smart-infrastructure.png", icon: "network" },
    { title: "Automotive Embedded", img: "/images/domain-automotive-embedded.png", icon: "car" },
    { title: "Semiconductor Domain", img: "/images/domain-semiconductor.png", icon: "chip" },
    { title: "OEMs & Tier-1s", img: "/images/domain-oem-tier1.png", icon: "building" },
] as const;

function DomainIcon({ name }: { name: (typeof serveItems)[number]["icon"] }) {
    const common = {
        width: 20,
        height: 20,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.75,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        "aria-hidden": true as const,
    };

    switch (name) {
        case "factory":
            return <svg {...common}><path d="M3 21V9l6 3V9l6 3V5h5v16H3Z" /><path d="M7 16h.01M11 16h.01M15 16h.01M18 9h.01M1 21h22" /></svg>;
        case "network":
            return <svg {...common}><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="m10.8 7.2-4.6 8.6m7-8.6 4.6 8.6M7.5 18h9" /></svg>;
        case "car":
            return <svg {...common}><path d="m5 11 1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11l2 2v5h-2v-2H5v2H3v-5l2-2Z" /><path d="M5 11h14M7 14h.01M17 14h.01" /></svg>;
        case "chip":
            return <svg {...common}><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 9h6v6H9zM9 2v4m6-4v4m-6 12v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" /></svg>;
        case "building":
            return <svg {...common}><path d="M4 21V5l8-3v19M12 9h8v12M2 21h20M7 7h1m-1 4h1m-1 4h1m-1 4h1m8-5h1m-1 4h1" /></svg>;
    }
}

function DomainCard({ item, index }: { item: (typeof serveItems)[number]; index: number }) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });
    const shouldReduceMotion = useReducedMotion();
    const revealClass = isInView && !shouldReduceMotion ? " home-domain-card--revealed" : "";

    return (
        <article
            ref={ref}
            className={`home-domain-card${revealClass}`}
            style={{ "--reveal-delay": `${index * 0.08}s` } as React.CSSProperties}
        >
            <img src={item.img} alt={item.title} loading="lazy" />
            <div className="home-domain-card__label">
                <span className="home-domain-card__icon"><DomainIcon name={item.icon} /></span>
                <h3>{item.title}</h3>
            </div>
        </article>
    );
}

export default function WhoWeServe() {
    return (
        <section className="home-domain-section" id="who-we-serve-section" aria-labelledby="domain-heading">
            <div className="container">
                <header className="home-domain-heading">
                    <h2 id="domain-heading">Delivering Domain Expertise</h2>
                    <p>We design specialized technology architectures and high-integrity systems across primary embedded and digital mobility domains.</p>
                </header>
                <div className="home-domain-grid">
                    {serveItems.map((item, index) => <DomainCard key={item.title} item={item} index={index} />)}
                </div>
            </div>
            <style jsx global>{`
                .home-theme .home-domain-section { padding: 96px 24px; background: var(--bg-alt); }
                .home-theme .home-domain-section .container { width: min(100%, 1200px); max-width: 1200px; margin-inline: auto; padding: 0; }
                .home-theme .home-domain-heading { max-width: 720px; margin: 0 auto 40px; text-align: center; }
                .home-theme .home-domain-heading h2 { margin: 0 0 14px; color: var(--navy); font-family: var(--font-corp-manrope), Manrope, sans-serif; font-size: clamp(30px, 3vw, 40px); font-weight: 700; line-height: 1.2; text-wrap: balance; }
                .home-theme .home-domain-heading p { max-width: 640px; margin: 0 auto; color: var(--body); font-size: 16px; line-height: 1.65; }
                .home-theme .home-domain-grid { display: flex; flex-wrap: wrap; justify-content: center; align-items: stretch; gap: 20px; }
                .home-theme .home-domain-card { box-sizing: border-box; display: flex; flex: 0 0 calc((100% - 80px) / 5); flex-direction: column; min-width: 0; border: 1px solid var(--border); border-radius: 16px; overflow: hidden; color: var(--navy); background: #FFFFFF; box-shadow: 0 1px 2px rgba(11,19,32,.06), 0 8px 24px rgba(11,19,32,.06); transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease; }
                .home-theme .home-domain-card:hover { transform: translateY(-4px); border-color: var(--teal); box-shadow: 0 12px 32px rgba(11,19,32,.12); }
                .home-theme .home-domain-card > img { display: block; width: 100%; aspect-ratio: 4 / 3; flex: 0 0 auto; object-fit: cover; object-position: center; }
                .home-theme .home-domain-card__label { box-sizing: border-box; display: flex; height: 104px; min-height: 104px; flex: 0 0 104px; align-items: center; gap: 12px; padding: 16px 20px; }
                .home-theme .home-domain-card__icon { display: grid; width: 40px; height: 40px; flex: 0 0 40px; place-items: center; border-radius: 10px; color: var(--teal); background: rgba(0,95,138,.08); }
                .home-theme .home-domain-card__icon svg { display: block; }
                .home-theme .home-domain-card__label h3 { min-width: 0; margin: 0; color: var(--navy); font-family: var(--font-corp-manrope), Manrope, sans-serif; font-size: 17px; font-weight: 700; line-height: 1.3; text-wrap: balance; hyphens: auto; overflow-wrap: anywhere; }
                .home-theme .home-domain-card--revealed { animation: home-domain-fade-up .5s ease-out var(--reveal-delay, 0s); }
                @keyframes home-domain-fade-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
                @media (max-width: 1023px) and (min-width: 640px) { .home-theme .home-domain-card { flex-basis: calc((100% - 40px) / 3); } }
                @media (max-width: 639px) {
                    .home-theme .home-domain-section { padding: 64px 20px; }
                    .home-theme .home-domain-card { flex-basis: calc((100% - 20px) / 2); }
                    .home-theme .home-domain-card__label { gap: 8px; padding-inline: 12px; }
                }
                @media (max-width: 390px) {
                    .home-theme .home-domain-section { padding-inline: 12px; }
                    .home-theme .home-domain-card__label { padding-inline: 10px; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .home-theme .home-domain-card, .home-theme .home-domain-card--revealed { animation: none; transition: none; }
                    .home-theme .home-domain-card:hover { transform: none; }
                }
            `}</style>
        </section>
    );
}
