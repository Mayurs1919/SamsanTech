import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import "../solutions/theme-light.css";

export const metadata: Metadata = {
    title: "About | SAMSAN",
};

export default function AboutPage() {
    return <AboutClient />;
}
