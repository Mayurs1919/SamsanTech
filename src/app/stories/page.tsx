import type { Metadata } from "next";
import "../solutions/theme-light.css";
import LabsAndDeliveryClient from "../labs-and-delivery/LabsAndDeliveryClient";

export const metadata: Metadata = {
    title: "Stories | SAMSAN",
};

export default function StoriesPage() {
    return <LabsAndDeliveryClient />;
}
