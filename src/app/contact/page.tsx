import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import "../solutions/theme-light.css";

export const metadata: Metadata = {
    title: "Contact | SAMSAN",
};

export default function ContactPage() {
    return <ContactClient />;
}
