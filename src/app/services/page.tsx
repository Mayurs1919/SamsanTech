import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
    title: "Engineering Offerings | SAMSAN",
};

export default function ServicesPage() {
    return <ServicesClient />;
}
