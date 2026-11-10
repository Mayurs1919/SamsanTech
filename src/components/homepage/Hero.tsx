"use client";

import Link from "next/link";

const capabilities = [
    "Cockpit & ADAS HUD",
    "Vehicle-Grade SDV",
    "Embedded AI & Cloud",
    "AUTOSAR & ISO 26262",
];

export default function Hero() {
    return (
        <section className="home-hero" aria-labelledby="home-hero-title">
            <div className="home-hero__layout">
                <div className="home-hero__copy">
                    <h1 className="home-hero__title" id="home-hero-title">
                        AI-led Automotive Engineering{" "}
                        <span>for Software-Defined Mobility</span>
                    </h1>
                    <p className="home-hero__description">
                        SAMSAN Technische Labs helps <strong>OEMs, Tier-1s, and semiconductor leaders</strong> design, develop, validate, and scale next-generation <strong>digital cockpit, connected mobility, SDV, embedded, cloud</strong>, and AI engineering solutions.
                    </p>
                    <ul className="home-hero__chips" aria-label="Engineering capabilities">
                        {capabilities.map((capability) => (
                            <li className="home-hero__chip" key={capability}>
                                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                {capability}
                            </li>
                        ))}
                    </ul>
                    <div className="home-hero__actions">
                        <Link href="/contact" className="home-hero__button">
                            <span>Talk to Us</span>
                            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="home-hero__video-frame">
                    <video
                        className="home-hero__video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label="SAMSAN automotive engineering showcase"
                    >
                        <source src="/videos/samsan-demo-clean.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </section>
    );
}
