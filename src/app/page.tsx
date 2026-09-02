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
import Hero from "@/components/homepage/Hero";
import TrustBar from "@/components/homepage/TrustBar";
import ValueTable from "@/components/homepage/ValueTable";
import OfferingCards from "@/components/homepage/OfferingCards";
import RingsOfSolution from "@/components/homepage/RingsOfSolution";
import WhoWeServe from "@/components/homepage/WhoWeServe";
import Partners from "@/components/homepage/Partners";
import AboutCompany from "@/components/homepage/AboutCompany";
import CTA from "@/components/homepage/CTA";

export const metadata: Metadata = {
    title: "SAMSAN Technische Labs Pvt. Ltd. — AI-led Automotive Engineering for Software-Defined Mobility",
    description:
        "SAMSAN Technische Labs Pvt. Ltd. delivers vehicle-grade embedded software, advanced artificial intelligence modeling, digital transformation architectures, and strategic validation programs.",
};

export default function Home() {
    return (
        <>
            {/* DARK — Hero & Proof Strip */}
            <div className="section-dark">
                <Hero />
                <TrustBar />
            </div>

            {/* LIGHT — Where SAMSAN Creates Value */}
            <div className="section-light">
                <ValueTable />
            </div>

            {/* DARK — 4 Core Offering Cards */}
            <div className="section-dark">
                <OfferingCards />
            </div>

            {/* LIGHT — Who We Serve */}
            <div className="section-light">
                <WhoWeServe />
            </div>

            {/* DARK — Ring of Solution */}
            <div className="section-dark">
                <RingsOfSolution />
            </div>

            {/* LIGHT — Platforms & Tools */}
            <div className="section-light">
                <Partners />
            </div>

            {/* DARK — We Are SAMSAN / Founder Spotlight */}
            <div className="section-dark">
                <AboutCompany />
            </div>

            {/* DARK — Final CTA */}
            <div className="section-dark">
                <CTA />
            </div>
        </>
    );
}