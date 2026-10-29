"use client";

<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SamsanAnimatedLogo from "@/components/ui/SamsanAnimatedLogo";

interface SubmenuItem {
    label: string;
    href: string;
}

interface NavItem {
    label: string;
    href: string;
    submenu?: SubmenuItem[];
    isVisible?: boolean;
}

const navItems: NavItem[] = [
    { label: "Home", href: "/", isVisible: true },
    { label: "Engineering Offerings", href: "/engineering-offerings", isVisible: true },
    { label: "Products & Accelerators", href: "/products-and-accelerators", isVisible: true },
<<<<<<< HEAD
    { label: "Stories", href: "/labs-and-delivery", isVisible: true },
    { label: "Investors / Partners", href: "/investors", isVisible: true },
    { label: "Consulting & Staffing", href: "/consulting-staffing", isVisible: true },
    { label: "About", href: "/about", isVisible: true },
    { label: "Careers", href: "/careers", isVisible: true },
=======
    { label: "Labs & Delivery", href: "/labs-and-delivery", isVisible: true },
    { label: "Investors / Partners", href: "/investors", isVisible: true },
    { label: "About", href: "/about", isVisible: true },
    { label: "Careers", href: "/careers", isVisible: true },
    { label: "Contact", href: "/contact", isVisible: true },
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
    // Hidden items not in the approved list
    { label: "Engagement Models", href: "/engagement-models", isVisible: false },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
<<<<<<< HEAD
    const [navHidden, setNavHidden] = useState(false);
    const lastScrollY = useRef(0);
=======
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

    const pathname = usePathname();
    const shouldReduce = useReducedMotion();
    const isContactPage = pathname === "/contact";

    useEffect(() => {
        setIsOpen(false);
        setHoveredItem(null);
        setExpandedMobileItem(null);
    }, [pathname]);

    useEffect(() => {
<<<<<<< HEAD
        const SCROLL_THRESHOLD = 80;   // px — below this, always show nav
        const HIDE_DELTA = 40;         // px scrolled down before hiding

        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 40);

            if (y < SCROLL_THRESHOLD) {
                // Near the top — always fully visible
                setNavHidden(false);
            } else if (y > lastScrollY.current + HIDE_DELTA) {
                // Scrolling down — hide nav (logo stays)
                setNavHidden(true);
            } else if (y < lastScrollY.current - 10) {
                // Scrolling up — reveal nav
                setNavHidden(false);
            }

            lastScrollY.current = y;
        };

=======
        const onScroll = () => setScrolled(window.scrollY > 40);
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

<<<<<<< HEAD
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const isItemActive = (href: string) => {
        if (pathname === href) return true;
        if (href === "/engineering-offerings" && (pathname.startsWith("/services") || pathname === "/engineering-offerings")) return true;
        if (href === "/products-and-accelerators" && (pathname.startsWith("/solutions") || pathname === "/products-and-accelerators")) return true;
        return false;
    };

    // Shared animation variants for nav elements (not the logo)
    const navAnimate = navHidden && !isOpen
        ? { opacity: 0, filter: "blur(8px)", y: -10, pointerEvents: "none" as const }
        : { opacity: 1, filter: "blur(0px)", y: 0, pointerEvents: "auto" as const };

    const navTransition = shouldReduce
        ? { duration: 0 }
        : { duration: 0.38, ease: "easeInOut" as const };

=======
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
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
<<<<<<< HEAD

                    {/* ── Brand / Logo — ALWAYS VISIBLE, never hidden ── */}
=======
                    {/* Brand */}
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
                    <Link href="/" className="brand" aria-label="Samsan — Home">
                        <SamsanAnimatedLogo height="80px" />
                    </Link>

<<<<<<< HEAD
                    {/* ── Desktop Nav Links — fades/blurs out on scroll-down ── */}
                    <motion.ul
                        className="nav-links"
                        role="list"
                        animate={navAnimate}
                        transition={navTransition}
                    >
                        {navItems.filter(item => item.isVisible !== false).map((item) => {
                            const hasSubmenu = !!item.submenu;
                            const isActive = isItemActive(item.href) || (hasSubmenu && pathname.startsWith(item.href));
=======
                    {/* Desktop Links */}
                    <ul className="nav-links" role="list">
                        {navItems.filter(item => item.isVisible !== false).map((item) => {
                            const hasSubmenu = !!item.submenu;
                            const isActive = pathname === item.href || (hasSubmenu && pathname.startsWith(item.href));
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e

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
<<<<<<< HEAD
                    </motion.ul>

                    {/* ── Desktop CTA + Hamburger — fades/blurs out on scroll-down ── */}
                    <motion.div
                        className="nav-actions"
                        animate={navAnimate}
                        transition={navTransition}
                    >
                        {/* Always reserve the button's space; hide it on contact page */}
=======
                    </ul>

                        {/* Desktop CTA + hamburger (grid col 3 — right) */}
                    <div className="nav-actions">
                        {/* Always reserve the button's space; hide it on the contact page so layout stays stable */}
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
                        <Link
                            href="/contact"
                            className="btn btn-primary"
                            style={{ visibility: isContactPage ? "hidden" : "visible", pointerEvents: isContactPage ? "none" : "auto" }}
                            aria-hidden={isContactPage}
                            tabIndex={isContactPage ? -1 : undefined}
                        >
                            Get Started
                            <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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
<<<<<<< HEAD
                    </motion.div>
=======
                    </div>
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
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
                            {navItems.filter(item => item.isVisible !== false).map((item) => {
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
<<<<<<< HEAD
                                                className={isItemActive(item.href) ? "active" : ""}
=======
                                                className={pathname === item.href ? "active" : ""}
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </div>
                                );
                            })}
                            {!isContactPage && (
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
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}
