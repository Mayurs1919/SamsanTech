"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";

const sdvSummitPhotos = [
    {
        id: 1,
        src: "/stories/sdv-summit-2026/sdv-award-ceremony.jpg",
        alt: "SAMSAN team receiving award at SDV Summit 2026",
        caption: "Award Ceremony — SDV Summit 2026",
        desc: "SAMSAN Technische Labs honoured at the Software-Defined Vehicle Summit 2026 for outstanding contribution to SDV innovation and digital cockpit engineering.",
        tag: "Achievement",
        tagColor: "#F59E0B",
        span: "wide",
    },
    {
        id: 2,
        src: "/stories/sdv-summit-2026/sdv-team-booth.jpg",
        alt: "SAMSAN engineering team at the exhibition booth",
        caption: "Team SAMSAN — Booth Presence",
        desc: "Our engineers and leadership representing SAMSAN at the SDV Summit 2026, India.",
        tag: "Team",
        tagColor: "#4DD8E8",
        span: "normal",
    },
    {
        id: 3,
        src: "/stories/sdv-summit-2026/sdv-booth-display.jpg",
        alt: "SAMSAN exhibition booth showcasing SDV platforms",
        caption: "SAMSAN Booth — One Platform, Multiple SDV Use Cases",
        desc: "Our full exhibition booth displaying the Maestro platform, SAMCockpit, and SAMSAN Connect to global OEMs and Tier-1 partners.",
        tag: "Exhibition",
        tagColor: "#10B981",
        span: "normal",
    },
];



function Lightbox({ photos, index, onClose, onPrev, onNext }: {
    photos: typeof sdvSummitPhotos;
    index: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}) {
    const photo = photos[index];
    return (
        <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
                position: "fixed", inset: 0, zIndex: 9999,
                background: "rgba(4,6,10,0.96)", backdropFilter: "blur(16px)",
                display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
            }}
        >
            <button onClick={onClose} aria-label="Close" style={{
                position: "absolute", top: "20px", right: "20px", width: "44px", height: "44px",
                borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)",
                color: "#F1F5F9", cursor: "pointer", fontSize: "1.1rem",
                display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10,
            }}>✕</button>

            {index > 0 && (
                <button onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous" style={{
                    position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
                    width: "48px", height: "48px", borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)",
                    color: "#F1F5F9", cursor: "pointer", fontSize: "1.5rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>‹</button>
            )}
            {index < photos.length - 1 && (
                <button onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next" style={{
                    position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)",
                    width: "48px", height: "48px", borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)",
                    color: "#F1F5F9", cursor: "pointer", fontSize: "1.5rem",
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>›</button>
            )}

            <motion.div
                key={photo.id}
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.22 }}
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: "min(900px, 88vw)", width: "100%", display: "flex", flexDirection: "column", gap: "18px" }}
            >
                <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
                    <Image src={photo.src} alt={photo.alt} width={900} height={600}
                        style={{ width: "100%", height: "auto", maxHeight: "70vh", objectFit: "contain", display: "block" }} />
                </div>
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "1rem", fontWeight: 700, color: "#F1F5F9", marginBottom: "4px" }}>{photo.caption}</div>
                    <div style={{ fontSize: "0.85rem", color: "#94A3B8", maxWidth: "560px", margin: "0 auto", lineHeight: 1.6 }}>{photo.desc}</div>
                    <div style={{ fontSize: "0.75rem", color: "#475569", marginTop: "10px", fontFamily: "var(--font-mono)" }}>
                        {index + 1} / {photos.length}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function LabsAndDeliveryClient() {
    const shouldReduce = useReducedMotion();
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
    const closeLightbox = useCallback(() => setLightboxIndex(null), []);
    const prevPhoto = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
    const nextPhoto = useCallback(() => setLightboxIndex((i) => (i !== null && i < sdvSummitPhotos.length - 1 ? i + 1 : i)), []);

    return (
        <div className="stories-page">
            <style>{`
                .stories-hero {
                    position: relative;
                    overflow: hidden;
                    padding: 142px 0 92px;
                    background: linear-gradient(145deg, #070A10 0%, #0A111B 58%, #101827 100%);
                }
                .stories-hero-grid {
                    position: absolute; inset: 0; pointer-events: none;
                    background-image: linear-gradient(rgba(77,216,232,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(77,216,232,.035) 1px, transparent 1px);
                    background-size: 56px 56px;
                    mask-image: radial-gradient(ellipse 80% 85% at 50% 45%, #000 12%, transparent 100%);
                }
                .stories-hero-layout {
                    position: relative; z-index: 1; display: grid;
                    grid-template-columns: minmax(0, 1.35fr) minmax(300px, .8fr);
                    align-items: center; gap: clamp(40px, 8vw, 112px);
                }
                .stories-eyebrow, .stories-kicker {
                    display: inline-flex; align-items: center; gap: 9px;
                    border-radius: 999px; padding: 7px 14px;
                    color: #4DD8E8; background: rgba(77,216,232,.08);
                    border: 1px solid rgba(77,216,232,.2);
                    font: 700 .7rem/1.2 var(--font-mono); letter-spacing: .11em; text-transform: uppercase;
                }
                .stories-hero h1 {
                    max-width: 720px; margin: 24px 0 20px; color: #F8FAFC;
                    font: 800 clamp(2.7rem, 5.3vw, 4.75rem)/1.04 var(--font-display);
                    letter-spacing: -.045em;
                }
                .stories-hero h1 span { color: #4DD8E8; }
                .stories-hero-copy { max-width: 620px; margin: 0; color: #A5B4C5; font: 400 1.06rem/1.8 var(--font-body); }
                .stories-hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
                .stories-action-primary, .stories-action-secondary {
                    display: inline-flex; align-items: center; justify-content: center; gap: 9px;
                    min-height: 48px; padding: 0 19px; border-radius: 9px;
                    font: 700 .9rem var(--font-body); text-decoration: none; transition: .2s ease;
                }
                .stories-action-primary { color: #07121A; background: #4DD8E8; border: 1px solid #4DD8E8; }
                .stories-action-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(77,216,232,.22); }
                .stories-action-secondary { color: #E2E8F0; background: rgba(255,255,255,.03); border: 1px solid rgba(203,213,225,.2); }
                .stories-action-secondary:hover { background: rgba(255,255,255,.08); border-color: rgba(203,213,225,.4); }
                .stories-feature-card {
                    padding: 28px; border: 1px solid rgba(148,163,184,.2); border-radius: 18px;
                    background: linear-gradient(145deg, rgba(20,31,45,.92), rgba(13,20,31,.94));
                    box-shadow: 0 24px 70px rgba(0,0,0,.22);
                }
                .stories-feature-label { color: #91A3B7; font: 700 .68rem var(--font-mono); letter-spacing: .13em; text-transform: uppercase; }
                .stories-feature-year { margin: 20px 0 4px; color: #4DD8E8; font: 800 3.4rem/.95 var(--font-display); letter-spacing: -.05em; }
                .stories-feature-card h2 { margin: 12px 0 8px; color: #F8FAFC; font: 700 1.35rem var(--font-display); }
                .stories-feature-card p { margin: 0; color: #9AAABD; font: .9rem/1.65 var(--font-body); }
                .stories-feature-tags { display: flex; flex-wrap: wrap; gap: 8px; padding-top: 20px; margin-top: 22px; border-top: 1px solid rgba(148,163,184,.16); }
                .stories-feature-tags span { padding: 6px 9px; color: #C8D3E0; border-radius: 7px; background: rgba(255,255,255,.05); font: 600 .7rem var(--font-body); }
                .stories-content { padding: 88px 0 96px; background: #F7F9FC; border-top: 1px solid #E2E8F0; }
                .stories-section-heading { display: flex; align-items: end; justify-content: space-between; gap: 28px; margin-bottom: 28px; }
                .stories-section-heading h2 { margin: 15px 0 8px; color: #0B1320; font: 800 clamp(1.8rem, 3vw, 2.55rem)/1.12 var(--font-display); letter-spacing: -.03em; }
                .stories-section-heading p { max-width: 650px; margin: 0; color: #64748B; font: .98rem/1.7 var(--font-body); }
                .stories-photo-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; align-items: stretch; }
                .story-photo-card {
                    display: flex; flex-direction: column; overflow: hidden; width: 100%; padding: 0;
                    text-align: left; border: 1px solid #E0E6EE; border-radius: 15px;
                    color: inherit; background: #fff; cursor: zoom-in;
                    box-shadow: 0 4px 18px rgba(11,19,32,.045); transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
                }
                .story-photo-card:hover { transform: translateY(-4px); border-color: #CBD5E1; box-shadow: 0 14px 34px rgba(11,19,32,.1); }
                .story-photo-image { position: relative; aspect-ratio: 4 / 3; overflow: hidden; background: #DCE5ED; }
                .story-photo-card img { transition: transform .4s ease; }
                .story-photo-card:hover img { transform: scale(1.035); }
                .story-photo-body { display: flex; flex: 1; flex-direction: column; align-items: flex-start; padding: 18px; }
                .story-photo-tag { display: inline-flex; margin-bottom: 11px; padding: 5px 9px; border-radius: 999px; font: 700 .65rem var(--font-mono); letter-spacing: .06em; text-transform: uppercase; }
                .story-photo-body h3 { margin: 0 0 7px; color: #0B1320; font: 750 1rem/1.4 var(--font-display); }
                .story-photo-body p { margin: 0; color: #64748B; font: .84rem/1.65 var(--font-body); }
                .story-photo-meta { margin-top: auto; padding-top: 15px; color: #8996A8; font: .68rem var(--font-mono); letter-spacing: .04em; }
                .stories-cta {
                    display: flex; align-items: center; justify-content: space-between; gap: 24px;
                    margin-top: 52px; padding: 26px 30px; border: 1px solid #E0E6EE; border-radius: 15px;
                    background: #fff; box-shadow: 0 4px 18px rgba(11,19,32,.04);
                }
                .stories-cta h2 { margin: 0 0 5px; color: #0B1320; font: 750 1.05rem var(--font-display); }
                .stories-cta p { margin: 0; color: #64748B; font: .88rem/1.6 var(--font-body); }
                @media (max-width: 900px) {
                    .stories-hero-layout { grid-template-columns: minmax(0, 1fr) minmax(260px, .85fr); gap: 32px; }
                    .stories-photo-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                }
                @media (max-width: 680px) {
                    .stories-hero { padding: 118px 0 66px; }
                    .stories-hero-layout { grid-template-columns: minmax(0, 1fr); gap: 34px; }
                    .stories-feature-card { max-width: 480px; }
                    .stories-content { padding: 64px 0 72px; }
                    .stories-section-heading { display: block; }
                    .stories-photo-grid { grid-template-columns: minmax(0, 1fr); gap: 16px; }
                    .stories-cta { align-items: flex-start; flex-direction: column; padding: 24px; }
                    .stories-cta-actions { width: 100%; }
                    .stories-cta-actions a { flex: 1; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .story-photo-card, .story-photo-card img, .stories-action-primary { transition: none; }
                }
            `}</style>

            <section className="stories-hero" aria-labelledby="stories-heading">
                <div className="stories-hero-grid" />
                <div className="container stories-hero-layout">
                    <motion.div variants={staggerContainerVariants} initial="hidden" animate="visible">
                        <motion.span variants={fadeUpVariants(shouldReduce)} className="stories-eyebrow">
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4DD8E8", boxShadow: "0 0 8px rgba(77,216,232,.8)" }} />
                            SAMSAN Stories
                        </motion.span>
                        <motion.h1 id="stories-heading" variants={fadeUpVariants(shouldReduce)}>
                            Progress is made of <span>moments.</span>
                        </motion.h1>
                        <motion.p variants={fadeUpVariants(shouldReduce)} className="stories-hero-copy">
                            Meet the people, ideas, and milestones behind our work. Explore SAMSAN&apos;s event appearances, achievements, exhibitions, and team moments.
                        </motion.p>
                        <motion.div variants={fadeUpVariants(shouldReduce)} className="stories-hero-actions">
                            <a className="stories-action-primary" href="#featured-story">Explore the latest story <span aria-hidden="true">↓</span></a>
                            <Link className="stories-action-secondary" href="/contact">Connect with our team <span aria-hidden="true">→</span></Link>
                        </motion.div>
                    </motion.div>

                    <motion.aside
                        className="stories-feature-card"
                        initial={{ opacity: 0, y: shouldReduce ? 0 : 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: shouldReduce ? 0 : .55, delay: .16 }}
                        aria-label="Featured company story"
                    >
                        <div className="stories-feature-label">Featured story · Latest milestone</div>
                        <div className="stories-feature-year">2026</div>
                        <h2>SDV Summit</h2>
                        <p>SAMSAN joined the summit as an exhibitor and award recipient, sharing our SDV engineering work with the automotive community.</p>
                        <div className="stories-feature-tags"><span>Achievement</span><span>Exhibition</span><span>Team</span></div>
                    </motion.aside>
                </div>
            </section>

            <main id="featured-story" className="stories-content">
                <div className="container">
                    <div className="stories-section-heading">
                        <div>
                            <span className="stories-kicker">Inside the event</span>
                            <h2>SDV Summit 2026</h2>
                            <p>SAMSAN Technische Labs participated as an exhibitor and award recipient, showcasing end-to-end SDV engineering capabilities—from embedded middleware to cloud-connected cockpit platforms.</p>
                        </div>
                    </div>

                    <motion.div layout className="stories-photo-grid">
                        {sdvSummitPhotos.map((photo, photoIndex) => {
                            return (
                                <motion.button
                                    layout
                                    key={photo.id}
                                    type="button"
                                    className="story-photo-card"
                                    onClick={() => openLightbox(photoIndex)}
                                    aria-label={`View photo: ${photo.caption}`}
                                    initial={{ opacity: 0, y: shouldReduce ? 0 : 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: shouldReduce ? 0 : .3 }}
                                >
                                    <div className="story-photo-image">
                                        <Image
                                            src={photo.src}
                                            alt={photo.alt}
                                            fill
                                            sizes="(max-width: 680px) 100vw, (max-width: 900px) 50vw, 33vw"
                                            priority={photo.id === 1}
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className="story-photo-body">
                                        <span className="story-photo-tag" style={{ color: photo.tagColor, background: `${photo.tagColor}14`, border: `1px solid ${photo.tagColor}35` }}>{photo.tag}</span>
                                        <h3>{photo.caption}</h3>
                                        <p>{photo.desc}</p>
                                        <div className="story-photo-meta">SDV SUMMIT 2026 <span aria-hidden="true">·</span> INDIA</div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </motion.div>

                    <motion.aside
                        className="stories-cta"
                        initial={{ opacity: 0, y: shouldReduce ? 0 : 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: shouldReduce ? 0 : .4 }}
                    >
                        <div>
                            <h2>Make the next milestone with us</h2>
                            <p>Explore opportunities to work with SAMSAN or get in touch with our team.</p>
                        </div>
                        <div className="stories-hero-actions stories-cta-actions" style={{ marginTop: 0 }}>
                            <Link href="/careers" className="stories-action-primary">Join the team <span aria-hidden="true">→</span></Link>
                            <Link href="/contact" className="stories-action-secondary" style={{ color: "#182536", borderColor: "#D8E0E9", background: "#fff" }}>Contact us</Link>
                        </div>
                    </motion.aside>
                </div>
            </main>

            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox photos={sdvSummitPhotos} index={lightboxIndex} onClose={closeLightbox} onPrev={prevPhoto} onNext={nextPhoto} />
                )}
            </AnimatePresence>
        </div>
    );
}
