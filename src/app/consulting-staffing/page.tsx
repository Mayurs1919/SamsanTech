import type { Metadata } from "next";
import ConsultingStaffingClient from "./ConsultingStaffingClient";

export const metadata: Metadata = {
    title: "Consulting & Staffing | SAMSAN",
};

export default function ConsultingStaffingPage() {
    return <ConsultingStaffingClient />;
}
