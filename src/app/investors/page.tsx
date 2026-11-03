import type { Metadata } from "next";
import InvestorsClient from "./InvestorsClient";

export const metadata: Metadata = {
    title: "Strategic Partners | SAMSAN",
    description:
        "Explore SAMSAN strategic buyer alignment and our partnership ecosystem spanning ADAS, connectivity, AI and green mobility.",
};

export default function InvestorsPage() {
    return <InvestorsClient />;
}
