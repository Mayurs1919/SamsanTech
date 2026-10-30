import type { Metadata } from "next";
import SolutionsClient from "./SolutionsClient";

export const metadata: Metadata = {
    title: "Products & Accelerators | SAMSAN",
};

export default function SolutionsPage() {
    return <SolutionsClient />;
}
