"use client";

import { Chip } from "@/components/theme-light/Chip";
import { Eyebrow } from "@/components/theme-light/Eyebrow";

const technologies = [
    "AUTOSAR",
    "QNX",
    "Vector Tools",
    "Elektrobit",
    "Green Hills",
    "Wind River",
    "Android Automotive",
    "Linux",
    "Cloud-Native Stacks"
];

export default function Partners() {
    return (
        <section className="home-platforms-section">
            <div className="container">
                <header className="home-platforms-heading">
                    <Eyebrow>Ecosystem expertise</Eyebrow>
                    <h2>Platforms &amp; Tools Our Teams Work With</h2>
                    <p>
                        Our engineers work across leading automotive platforms, tools, operating systems, and middleware ecosystems including AUTOSAR, QNX, Vector tools, Elektrobit, Green Hills, Wind River, Android Automotive, Linux, and cloud-native stacks.
                    </p>
                </header>
                <div className="home-platforms-chips" aria-label="Platforms and tools">
                    {technologies.map((tech) => (
                        <Chip key={tech} className="home-platform-chip">{tech}</Chip>
                    ))}
                </div>
            </div>
            <style jsx global>{`
                .home-theme .home-platforms-section { padding: 96px 24px; background: var(--bg); }
                .home-theme .home-platforms-section .container { width: min(100%, 1200px); max-width: 1200px; margin-inline: auto; padding: 0; }
                .home-theme .home-platforms-heading { max-width: 800px; margin: 0 auto 32px; text-align: center; }
                .home-theme .home-platforms-heading .tl-eyebrow { justify-content: center; margin-bottom: 12px; }
                .home-theme .home-platforms-heading h2 { margin: 0 0 16px; color: var(--navy); font-family: var(--font-corp-manrope), Manrope, sans-serif; font-size: clamp(28px, 3vw, 38px); font-weight: 700; line-height: 1.2; text-wrap: balance; }
                .home-theme .home-platforms-heading p { max-width: 720px; margin: 0 auto; color: var(--body); font-size: 16px; line-height: 1.65; }
                .home-theme .home-platforms-chips { display: flex; max-width: 900px; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px; margin: 0 auto; }
                .home-theme .tl-chip.home-platform-chip { min-height: 40px; padding: 8px 16px; border-color: var(--border); border-radius: 20px; color: var(--body); background: #FFFFFF; font-size: 13px; }
                .home-theme .tl-chip.home-platform-chip:hover { border-color: var(--teal); color: var(--teal); background: #FFFFFF; }
                @media (max-width: 760px) { .home-theme .home-platforms-section { padding: 64px 20px; } }
            `}</style>
        </section>
    );
}
