"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface SubmenuItem {
    label: string;
    href: string;
}

interface NavItem {
    label: string;
    href: string;
    submenu?: SubmenuItem[];
}

const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    {
        label: "Engineering Offerings",
        href: "/services",
        submenu: [
            { label: "Embedded Systems", href: "/services/embedded-systems" },
            { label: "Digital & Cloud Platforms", href: "/services/digital-platforms" },
        ]
    },
    {
        label: "Products & Accelerators",
        href: "/solutions",
        submenu: [
            { label: "Auto Embedded Solutions", href: "/solutions/auto-embedded" },
            { label: "Embedded Solutions", href: "/solutions/embedded" },
            { label: "Digital Solutions", href: "/solutions/digital" },
        ]
    },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Labs & Delivery", href: "/labs-and-delivery" },
    { label: "Engagement Models", href: "/engagement-models" },
    { label: "About", href: "/about" },
    { label: "Investors / Partners", href: "/investors" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

    const pathname = usePathname();
    const shouldReduce = useReducedMotion();

    useEffect(() => {
        setIsOpen(false);
        setHoveredItem(null);
        setExpandedMobileItem(null);
    }, [pathname]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 16);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <>
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none"
                style={{ background: "var(--violet)", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.85rem" }}
            >
                Skip to main content
            </a>

            <header className={`site-header ${scrolled ? "scrolled" : ""} ${isOpen ? "menu-open" : ""}`}>
                <nav className="nav-inner" aria-label="Primary navigation">
                    {/* Brand */}
                    <Link href="/" className="brand" aria-label="Samsan — Home">
                        <img
                            src="/images/samsan_logo_wordmark.png"
                            alt="Samsan"
                        />
                    </Link>

                    {/* Desktop Links */}
                    <ul className="nav-links" role="list">
                        {navItems.map((item) => {
                            const hasSubmenu = !!item.submenu;
                            const isActive = pathname === item.href || (hasSubmenu && pathname.startsWith(item.href));

                            return (
                                <li
                                    key={item.href}
                                    style={{ position: "relative" }}
                                    onMouseEnter={() => hasSubmenu && setHoveredItem(item.label)}
                                    onMouseLeave={() => hasSubmenu && setHoveredItem(null)}
                                >
                                    <Link
                                        href={item.href}
                                        className={`${isActive ? "active" : ""} flex items-center gap-1.5`}
                                    >
                                        {item.label}
                                        {hasSubmenu && (
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                style={{
                                                    transform: hoveredItem === item.label ? "rotate(180deg)" : "rotate(0deg)",
                                                    transition: "transform 0.2s ease"
                                                }}
                                            >
                                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </Link>

                                    {hasSubmenu && (
                                        <AnimatePresence>
                                            {hoveredItem === item.label && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.15 }}
                                                    style={{
                                                        position: "absolute",
                                                        top: "100%",
                                                        left: "50%",
                                                        transform: "translateX(-50%)",
                                                        marginTop: "12px",
                                                        background: "rgba(10, 15, 28, 0.95)",
                                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                                        borderRadius: "16px",
                                                        padding: "8px",
                                                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                                                        zIndex: 1000,
                                                        minWidth: "260px",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "4px",
                                                        backdropFilter: "blur(20px)"
                                                    }}
                                                >
                                                    {item.submenu?.map((sub) => (
                                                        <Link
                                                            key={sub.href}
                                                            href={sub.href}
                                                            style={{
                                                                padding: "10px 16px",
                                                                borderRadius: "10px",
                                                                fontSize: "0.82rem",
                                                                color: pathname === sub.href ? "#fff" : "var(--text-secondary)",
                                                                background: pathname === sub.href ? "rgba(255,255,255,0.06)" : "transparent",
                                                                transition: "all 0.2s ease",
                                                                textDecoration: "none",
                                                                display: "block",
                                                                whiteSpace: "nowrap"
                                                            }}
                                                            className="hover:bg-white/5 hover:text-white"
                                                        >
                                                            {sub.label}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    {/* Desktop CTA + hamburger (grid col 3 — right) */}
                    <div className="nav-actions">
                        <Link href="/contact" className="btn btn-primary">
                            Get Started
                            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>

                        {/* Hamburger — shown on small screens, hidden on desktop via CSS */}
                        <button
                            className="hamburger"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-expanded={isOpen}
                            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                {isOpen ? (
                                    <>
                                        <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                                    </>
                                ) : (
                                    <>
                                        <path d="M3 4h14M3 10h14M3 16h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                                    </>
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* Mobile menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="mobile-nav"
                            initial={shouldReduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                            animate={shouldReduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                            exit={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                        >
                            {navItems.map((item) => {
                                const hasSubmenu = !!item.submenu;
                                const isMobileExpanded = expandedMobileItem === item.label;

                                return (
                                    <div key={item.href} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                                        {hasSubmenu ? (
                                            <div>
                                                <button
                                                    onClick={() => setExpandedMobileItem(isMobileExpanded ? null : item.label)}
                                                    className="w-full text-left flex justify-between items-center px-6 py-4 text-sm font-medium"
                                                    style={{ color: "var(--text-primary)", background: "transparent", border: "none" }}
                                                >
                                                    {item.label}
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        style={{
                                                            transform: isMobileExpanded ? "rotate(180deg)" : "rotate(0deg)",
                                                            transition: "transform 0.2s ease",
                                                            color: "var(--text-secondary)"
                                                        }}
                                                    >
                                                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                                <AnimatePresence>
                                                    {isMobileExpanded && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            style={{ overflow: "hidden", background: "rgba(0,0,0,0.2)", paddingLeft: "16px" }}
                                                        >
                                                            {item.submenu?.map((sub) => (
                                                                <Link
                                                                    key={sub.href}
                                                                    href={sub.href}
                                                                    className={`block px-6 py-3 text-xs ${pathname === sub.href ? "active" : ""}`}
                                                                    onClick={() => setIsOpen(false)}
                                                                >
                                                                    {sub.label}
                                                                </Link>
                                                            ))}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className={pathname === item.href ? "active" : ""}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </div>
                                );
                            })}
                            <div className="nav-cta-mobile">
                                <Link
                                    href="/contact"
                                    className="btn btn-primary"
                                    onClick={() => setIsOpen(false)}
                                    style={{ width: "100%", justifyContent: "center" }}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}
