import type { Metadata } from "next";
import "../solutions/theme-light.css";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
    title: "Engineering Offerings | SAMSAN",
};

export default function ServicesPage() {
    return <ServicesClient />;
}
