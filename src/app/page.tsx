// import type { Metadata } from "next";
// import Hero from "@/components/homepage/Hero";
// import TrustBar from "@/components/homepage/TrustBar";
// import ValueTable from "@/components/homepage/ValueTable";
// import OfferingCards from "@/components/homepage/OfferingCards";
// import RingsOfSolution from "@/components/homepage/RingsOfSolution";
// import WhoWeServe from "@/components/homepage/WhoWeServe";
// import Partners from "@/components/homepage/Partners";
// import AboutCompany from "@/components/homepage/AboutCompany";
// import Locations from "@/components/homepage/Locations";
// import CTA from "@/components/homepage/CTA";

// export const metadata: Metadata = {
//     title: "SAMSAN Technische Labs Pvt. Ltd. — AI-led Automotive Engineering for Software-Defined Mobility",
//     description:
//         "SAMSAN Technische Labs Pvt. Ltd. delivers vehicle-grade embedded software, advanced artificial intelligence modeling, digital transformation architectures, and strategic validation programs.",
// };

// export default function Home() {
//     return (
//         <>
//             {/* Slot 1: Hero — text left, video right */}
//             <Hero />

//             {/* Slot 2: Proof strip — engineers, solutions, accelerators, markets stats */}
//             <TrustBar />

//             {/* Slot 3: Where SAMSAN Creates Value — customer need vs response table */}
//             <ValueTable />

//             {/* Slot 4: 4 Core Offering Cards */}
//             <OfferingCards />

//             {/* Slot 5: Engineering stack overview (silicon/BSP to cloud/AI) */}
//             <RingsOfSolution />

//             {/* Slot 6: Who We Serve */}
//             <WhoWeServe />

//             {/* Platforms & Tools */}
//             <Partners />

//             {/* Slot 7: Founder/company credibility ("We Are SAMSAN") */}
//             <AboutCompany />

//             {/* Global Engineering Footprint */}
//             <Locations />

//             {/* Slot 8: Final CTA */}
//             <CTA />
//         </>
//     );
// }

import type { Metadata } from "next";
import "./solutions/theme-light.css";
import { inter, manrope } from "./solutions/fonts";
import Hero from "@/components/homepage/Hero";
import TrustBar from "@/components/homepage/TrustBar";
import ValueTable from "@/components/homepage/ValueTable";
import RingsOfSolution from "@/components/homepage/RingsOfSolution";
import WhoWeServe from "@/components/homepage/WhoWeServe";
import Partners from "@/components/homepage/Partners";
import AboutCompany from "@/components/homepage/AboutCompany";
import Locations from "@/components/homepage/Locations";
import CTA from "@/components/homepage/CTA";

export const metadata: Metadata = {
    title: "SAMSAN Technische Labs Pvt. Ltd. — AI-led Automotive Engineering for Software-Defined Mobility",
    description:
        "SAMSAN Technische Labs Pvt. Ltd. delivers vehicle-grade embedded software, advanced artificial intelligence modeling, digital transformation architectures, and strategic validation programs.",
};

// Shared theme class applied to every section wrapper.
// Each component is responsible for its own section background color.
const T = `theme-light-corp home-theme ${inter.variable} ${manrope.variable}`;

export default function Home() {
    return (
        <>
            <div className={T}><Hero /></div>
            <div className={T}><TrustBar /></div>
            <div className={T}><ValueTable /></div>
            {/* WhoWeServe: var(--bg) white */}
            <div className={T}><WhoWeServe /></div>
            {/* RingsOfSolution: var(--bg-alt) light gray */}
            <div className={T}><RingsOfSolution /></div>
            {/* Platforms: var(--bg) white */}
            <div className={T}><Partners /></div>
            {/* AboutCompany: var(--bg-alt) light gray */}
            <div className={T}><AboutCompany /></div>
            {/* Locations: var(--bg) white */}
            <Locations />
            {/* CTA: teal */}
            <div className={T}><CTA /></div>
        </>
    );
}
