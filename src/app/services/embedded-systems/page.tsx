import type { Metadata } from "next";
import EmbeddedSystemsClient from "./EmbeddedSystemsClient";

export const metadata: Metadata = {
    title: "Embedded Systems | SAMSAN",
};

export default function EmbeddedSystemsPage() {
    return <EmbeddedSystemsClient />;
}
