import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Strategic Partners | SAMSAN",
    description:
        "Explore SAMSAN strategic buyer alignment and our partnership ecosystem spanning ADAS, connectivity, AI and green mobility.",
};

export default function InvestorsPage() {
    notFound();
}
