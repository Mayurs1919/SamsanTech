import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: {
        default: "Samsan Labs — Software Defined Vehicle Engineering",
        template: "%s | Samsan Labs",
    },
    description:
        "Samsan Labs is a specialized design house for Software Defined Vehicles, delivering embedded systems, cloud telemetry platforms, and AI architectures for connected mobility.",
    keywords: [
        "automotive software", "SDV", "software defined vehicle", "embedded systems",
        "ADAS", "telematics", "automotive AI", "HMI", "AUTOSAR",
    ],
    openGraph: {
        siteName: "Samsan Labs",
        locale: "en_IN",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>
                <Header />
                <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}