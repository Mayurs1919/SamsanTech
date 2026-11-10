import type { Metadata } from "next";
import "../solutions/theme-light.css";
import ConsultingStaffingClient from "./ConsultingStaffingClient";

export const metadata: Metadata = {
    title: "Consulting & Staffing | SAMSAN",
};

export default function ConsultingStaffingPage() {
    return <ConsultingStaffingClient />;
}
