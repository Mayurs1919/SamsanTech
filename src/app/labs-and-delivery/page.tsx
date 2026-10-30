import type { Metadata } from "next";
import LabsAndDeliveryClient from "./LabsAndDeliveryClient";

export const metadata: Metadata = {
    title: "Labs & Delivery | SAMSAN",
};

export default function LabsAndDeliveryPage() {
    return <LabsAndDeliveryClient />;
}
