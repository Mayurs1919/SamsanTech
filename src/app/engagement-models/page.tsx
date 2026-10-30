import type { Metadata } from "next";
import EngagementModelsClient from "./EngagementModelsClient";

export const metadata: Metadata = {
    title: "Engagement Models | SAMSAN",
};

export default function EngagementModelsPage() {
    return <EngagementModelsClient />;
}
