import type { Metadata } from "next";
import DigitalPlatformsClient from "./DigitalPlatformsClient";

export const metadata: Metadata = {
    title: "Digital Platforms | SAMSAN",
};

export default function DigitalPlatformsPage() {
    return <DigitalPlatformsClient />;
}
