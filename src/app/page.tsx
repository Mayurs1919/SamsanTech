import type { Metadata } from "next";
import Hero from "@/components/homepage/Hero";
import TrustBar from "@/components/homepage/TrustBar";
import AboutCompany from "@/components/homepage/AboutCompany";
import Partners from "@/components/homepage/Partners";
import WhoWeServe from "@/components/homepage/WhoWeServe";
import RingsOfSolution from "@/components/homepage/RingsOfSolution";
import Locations from "@/components/homepage/Locations";
import CTA from "@/components/homepage/CTA";

export const metadata: Metadata = {
    title: "SAMSAN Technische Labs Pvt. Ltd. — AI-led Automotive Engineering for Software-Defined Mobility",
    description:
        "SAMSAN Technische Labs Pvt. Ltd. delivers vehicle-grade embedded software, advanced artificial intelligence modeling, digital transformation architectures, and strategic validation programs.",
};

export default function Home() {
    return (
        <>
            {/* Slot 1: Hero */}
            <Hero />

            {/* Slot 2: Proof strip — engineers, solutions, accelerators, markets stats */}
            <TrustBar />

            {/* Slot 3: "What We Do" — 4 core offerings */}
            {/* Section not found — needs to be built separately */}

            {/* Slot 4: Engineering stack overview (silicon/BSP to cloud/AI) */}
            <RingsOfSolution />

            {/* Slot 5: Products & Accelerators preview (Refacto.ai, CabinIQ, TwinLnk, Maestro, AutoMATE.ai) */}
            {/* Section not found — needs to be built separately */}

            {/* Slot 6: Case Studies / proof of work preview */}
            {/* Section not found — needs to be built separately */}

            {/* Slot 7: Engagement Models preview */}
            {/* Section not found — needs to be built separately */}

            {/* Slot 8: "Who We Serve" */}
            <WhoWeServe />

            {/* Platforms & Tools (preserved from existing homepage) */}
            <Partners />

            {/* Slot 9: Founder/company credibility ("We Are SAMSAN") */}
            <AboutCompany />

            {/* Global Engineering Footprint (preserved from existing homepage) */}
            <Locations />

            {/* Slot 10: Final CTA */}
            <CTA />
        </>
    );
}
