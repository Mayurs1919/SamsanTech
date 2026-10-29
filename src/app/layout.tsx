<<<<<<< HEAD
import type { Metadata, Viewport } from "next";
=======
import type { Metadata } from "next";
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


<<<<<<< HEAD
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
};

=======
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
export const metadata: Metadata = {
    title: {
        default: "SAMSAN Technische Labs Pvt. Ltd. — Software Defined Vehicle Engineering",
        template: "%s | SAMSAN Technische Labs Pvt. Ltd.",
    },
    description:
        "SAMSAN Technische Labs Pvt. Ltd. is a specialized design house for Software Defined Vehicles, delivering embedded systems, cloud telemetry platforms, and AI architectures for connected mobility.",
    keywords: [
        "automotive software", "SDV", "software defined vehicle", "embedded systems",
        "ADAS", "telematics", "automotive AI", "HMI", "AUTOSAR",
    ],
    openGraph: {
        siteName: "SAMSAN Technische Labs Pvt. Ltd.",
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
                <main id="main-content" tabIndex={-1} style={{ outline: "none", overflowX: "hidden" }}>
                    {children}
                </main>
                <Footer />

            </body>
        </html>
    );
}