"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import SamsanAnimatedLogo from "@/components/ui/SamsanAnimatedLogo";
import { Footer as ThemeLightFooter } from "@/components/theme-light/Footer";
import { LIGHT_THEME_ROUTES } from "@/components/theme-light/routes";

function LegacyFooter() {
    const year = new Date().getFullYear();

    const navigateLinks = [
        { label: "Home",                     href: "/", isVisible: true },
        { label: "Engineering Offerings",     href: "/engineering-offerings", isVisible: true },
        { label: "Products & Accelerators",   href: "/products-and-accelerators", isVisible: true },
        { label: "Stories",                  href: "/labs-and-delivery", isVisible: true },
        { label: "Consulting & Staffing",     href: "/consulting-staffing", isVisible: true },
        { label: "About",                    href: "/about", isVisible: true },
        { label: "Careers",                  href: "/careers", isVisible: true },
        { label: "Contact",                  href: "/contact", isVisible: true },
        // Hidden items not in the approved list
        { label: "Engagement Models",         href: "/engagement-models", isVisible: false },
    ];

    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand column */}
                    <div className="footer-brand">
                        <Link href="/" className="brand" aria-label="Samsan — Home">
                            <SamsanAnimatedLogo height="56px" />
                        </Link>
                        <p style={{ marginTop: "16px", fontSize: "0.875rem", lineHeight: "1.8", maxWidth: "280px", color: "var(--text-secondary)" }}>
                            A specialized design house for Software Defined Vehicles, connected mobility, and AI-driven automotive innovation.
                        </p>
                        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                            <a
                                href="https://www.linkedin.com/company/samsantechlabs"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="SAMSAN Technische Labs on LinkedIn"
                                className="footer-social-link"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3z" />
                                </svg>
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>

                    {/* Navigate column */}
                    <div className="footer-col">
                        <h5>Navigate</h5>
                        {navigateLinks.filter(item => item.isVisible !== false).map((item) => (
                            <Link key={item.href} href={item.href}>{item.label}</Link>
                        ))}
                    </div>

                    {/* Empty spacer column to keep grid layout intact */}
                    <div></div>

                    {/* Contact column */}
                    <div className="footer-col">
                        <h5>The Company</h5>
                        <p style={{ marginBottom: "6px" }}>india@samsanlabs.com</p>
                        <p style={{ marginBottom: "6px" }}>+91 89569 27909</p>
                        <p style={{ marginBottom: "6px", lineHeight: "1.5" }}>STPI New Building, Rajiv Gandhi Infotech Park, Phase I, Hinjawadi, Pune 411057, India</p>
                    </div>
                </div>

                <div style={{
                    borderTop: "1px solid rgba(255,255,255,0.12)",
                    padding: "28px 0 0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: "0.88rem",
                    fontWeight: 500,
                    color: "#FFFFFF"
                }}>
                    <span style={{ color: "#FFFFFF", letterSpacing: "0.01em" }}>
                        © {year} SAMSAN Technische Labs Pvt. Ltd. All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}

const productsFooterLinks = [
    { label: "Home", href: "/" },
    { label: "Engineering Offerings", href: "/engineering-offerings" },
    { label: "Products & Accelerators", href: "/products-and-accelerators" },
    { label: "Stories", href: "/labs-and-delivery" },
    { label: "Consulting & Staffing", href: "/consulting-staffing" },
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
];

export default function Footer() {
    const pathname = usePathname();
    if (LIGHT_THEME_ROUTES.includes(pathname as (typeof LIGHT_THEME_ROUTES)[number])) {
        return <ThemeLightFooter
            description="A specialized design house for Software Defined Vehicles, connected mobility, and AI-driven automotive innovation."
            navigationLinks={productsFooterLinks}
            contactDetails={["india@samsanlabs.com", "+91 89569 27909", "STPI New Building, Rajiv Gandhi Infotech Park, Phase I, Hinjawadi, Pune 411057, India"]}
            copyright={`© ${new Date().getFullYear()} SAMSAN Technische Labs Pvt. Ltd. All rights reserved.`}
        />;
    }
    return <LegacyFooter />;
}
