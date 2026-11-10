import type { Metadata } from "next";
import "./theme-light.css";
import { inter, manrope } from "./fonts";
import SolutionsClient from "./SolutionsClient";

export const metadata: Metadata = {
    title: "Products & Accelerators | SAMSAN",
};

export default function SolutionsPage() {
    return <SolutionsClient fontClassName={`${inter.variable} ${manrope.variable}`} />;
}
