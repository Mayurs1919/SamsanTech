"use client";

import { Hero } from "@/components/theme-light/Hero";
import { Section } from "@/components/theme-light/Section";
import { Card } from "@/components/theme-light/Card";
import { Button } from "@/components/theme-light/Button";
import { inter, manrope } from "@/app/solutions/fonts";
import { motion, useReducedMotion } from "framer-motion";

export default function LabsAndDeliveryClient() {
    const shouldReduce = useReducedMotion();
    return (
        <div className={`theme-light-corp ${inter.variable} ${manrope.variable}`}>
            <Hero
                eyebrow="SAMSAN Stories"
                title={<>Progress is made of <span>moments.</span></>}
                description="Meet the people, ideas, and milestones behind our work. Explore SAMSAN's event appearances, achievements, exhibitions, and team moments."
            />

            <Section variant="white" className="tl-stories-content">
                <div className="tl-container">
                    <motion.div initial={shouldReduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: shouldReduce ? 0 : .5 }}>
                        <Card variant="coming-soon" className="tl-stories-card">
                            <svg className="tl-stories-card__icon" viewBox="0 0 56 56" fill="none" aria-hidden="true">
                                <circle cx="28" cy="28" r="23" stroke="currentColor" strokeWidth="2" />
                                <path d="M28 15v14l9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h2>SDV Summit 2026</h2>
                            <span className="tl-stories-card__label">Content coming soon</span>
                            <p>SAMSAN Technische Labs participated as an exhibitor and award recipient, showcasing end-to-end SDV engineering capabilities—from embedded middleware to cloud-connected cockpit platforms.</p>
                            <Button href="/contact" variant="primary">Contact us in the meantime</Button>
                        </Card>
                    </motion.div>
                </div>
            </Section>
        </div>
    );
}
