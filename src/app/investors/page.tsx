import type { Metadata } from "next";
import InvestorsClient from "./InvestorsClient";

export const metadata: Metadata = {
    title: "Investors & Strategic Partners | SAMSAN",
    description:
        "Explore SAMSAN corporate metrics, strategic buyer alignment, and our partnership ecosystem spanning ADAS, connectivity, AI and green mobility.",
};

export default function InvestorsPage() {
    return <InvestorsClient />;
}
