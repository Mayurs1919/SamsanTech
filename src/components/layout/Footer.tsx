"use client";

import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    const navigateLinks = [
        { label: "Home",                     href: "/" },
        { label: "Engineering Offerings",     href: "/services" },
        { label: "Products & Accelerators",   href: "/solutions" },
        { label: "Case Studies",             href: "/case-studies" },
        { label: "Labs & Delivery",           href: "/labs-and-delivery" },
        { label: "Engagement Models",         href: "/engagement-models" },
        { label: "About",                    href: "/about" },
        { label: "Investors / Partners",     href: "/investors" },
        { label: "Careers",                  href: "/careers" },
        { label: "Contact",                  href: "/contact" },
    ];

    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand column */}
                    <div className="footer-brand">
                        <Link href="/" className="brand" aria-label="Samsan — Home">
                            <img
                                src="/images/samsan_logo_wordmark.png"
                                alt="Samsan"
                                style={{ height: "26px", width: "auto", display: "block", objectFit: "contain" }}
                            />
                        </Link>
                        <p style={{ marginTop: "16px", fontSize: "0.875rem", lineHeight: "1.8", maxWidth: "280px", color: "var(--text-secondary)" }}>
                            A specialized design house for Software Defined Vehicles, connected mobility, and AI-driven automotive innovation.
                        </p>
                        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-link">LinkedIn</a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer-social-link">GitHub</a>
                        </div>
                    </div>

                    {/* Navigate column */}
                    <div className="footer-col">
                        <h5>Navigate</h5>
                        {navigateLinks.map((item) => (
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
                    borderTop: "1px solid var(--border)",
                    padding: "28px 0 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                    flexWrap: "wrap",
                    gap: "12px"
                }}>
                    <span>© {year} SAMSAN Technische Labs Pvt. Ltd. All rights reserved.</span>
                    <span style={{ display: "flex", gap: "24px" }}>
                        <span>DPIIT Recognized Startup</span>
                        <span>ISO 27001 Certified</span>
                        <span>MISRA C/C++ Compliant</span>
                    </span>
                </div>
            </div>
        </footer>
    );
}
