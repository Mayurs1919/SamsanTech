import type { Metadata } from "next";
import "../solutions/theme-light.css";
import { inter, manrope } from "../solutions/fonts";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
    title: "Careers | SAMSAN",
};

export default function CareersPage() {
    return <CareersClient fontClassName={`${inter.variable} ${manrope.variable}`} />;
}
