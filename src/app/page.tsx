import type { Metadata } from "next";
import Hero from "@/components/homepage/Hero";
import AboutCompany from "@/components/homepage/AboutCompany";
import Partners from "@/components/homepage/Partners";
import WhoWeServe from "@/components/homepage/WhoWeServe";
import RingsOfSolution from "@/components/homepage/RingsOfSolution";
import Locations from "@/components/homepage/Locations";
import CTA from "@/components/homepage/CTA";

export const metadata: Metadata = {
    title: "Samsan Labs — Technology Reimagined Systems Company",
    description:
        "Samsan Labs delivers vehicle-grade embedded software, advanced artificial intelligence modeling, digital transformation architectures, and strategic validation programs.",
};

export default function Home() {
    return (
        <>
            <Hero />
            <AboutCompany />
            <Partners />
            <WhoWeServe />
            <RingsOfSolution />
            <Locations />
            <CTA />
        </>
    );
}
