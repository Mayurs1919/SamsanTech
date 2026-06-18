"use client";

import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    const quickLinks = [
        { label: "Home",       href: "/" },
        { label: "About",      href: "/about" },
        { label: "Services",   href: "/services" },
        { label: "Solutions",  href: "/solutions" },
    ];

    const moreLinks = [
        { label: "Careers",    href: "/careers" },
        { label: "Gallery",    href: "/gallery" },
        { label: "Investors",  href: "/investors" },
        { label: "Contact",    href: "/contact" },
    ];

    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand column */}
                    <div className="footer-brand">
                        <Link href="/" className="brand" aria-label="Samsan Labs — Home">
                            <div className="brand-mark" aria-hidden="true">
                                <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 5.5C3 4.12 4.12 3 5.5 3h7C13.88 3 15 4.12 15 5.5v7C15 13.88 13.88 15 12.5 15h-7C4.12 15 3 13.88 3 12.5v-7Z" stroke="white" strokeWidth="1.4"/>
                                    <circle cx="9" cy="9" r="2.2" fill="white"/>
                                    <path d="M9 3v2M9 13v2M3 9h2M13 9h2" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                                </svg>
                            </div>
                            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.05rem" }}>
                                Samsan Labs
                            </span>
                        </Link>
                        <p style={{ marginTop: "16px", fontSize: "0.875rem", lineHeight: "1.8", maxWidth: "280px", color: "var(--text-secondary)" }}>
                            A specialized design house for Software Defined Vehicles, connected mobility, and AI-driven automotive innovation.
                        </p>
                        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-link">LinkedIn</a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer-social-link">GitHub</a>
                        </div>
                    </div>

                    {/* Quick Links column */}
                    <div className="footer-col">
                        <h5>Quick Links</h5>
                        {quickLinks.map((item) => (
                            <Link key={item.href} href={item.href}>{item.label}</Link>
                        ))}
                    </div>

                    {/* More Links column */}
                    <div className="footer-col">
                        <h5>The Platform</h5>
                        {moreLinks.map((item) => (
                            <Link key={item.href} href={item.href}>{item.label}</Link>
                        ))}
                    </div>

                    {/* Contact column */}
                    <div className="footer-col">
                        <h5>The Company</h5>
                        <p style={{ marginBottom: "6px" }}>info@samsanlabs.com</p>
                        <p style={{ marginBottom: "6px" }}>+91 00000 00000</p>
                        <p style={{ marginBottom: "6px" }}>Pune, India</p>
                        <p style={{ marginBottom: "6px" }}>Europe</p>
                        <p style={{ marginBottom: "6px" }}>United States</p>
                        <p style={{ marginBottom: "6px" }}>Japan · South Korea</p>
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
                    <span>© {year} Samsan Labs. All rights reserved.</span>
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
