import type { Metadata } from "next";
import "../solutions/theme-light.css";
import LabsAndDeliveryClient from "./LabsAndDeliveryClient";

export const metadata: Metadata = {
    title: "Stories | SAMSAN",
};

export default function LabsAndDeliveryPage() {
    return <LabsAndDeliveryClient />;
}
