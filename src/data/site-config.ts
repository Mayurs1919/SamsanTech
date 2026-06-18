import type { SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
    name: "Samsan Labs",
    description: "A Technology Reimagined Systems Company. Focused on Automotive, Embedded Engineering & Digital Transformation.",
    navItems: [
        { label: "Home",        href: "/" },
        { label: "About",       href: "/about" },
        { label: "Services",    href: "/services" },
        { label: "Solutions",   href: "/solutions" },
        { label: "Careers",     href: "/careers" },
        { label: "Gallery",     href: "/gallery" },
        { label: "Investors",   href: "/investors" },
        { label: "Contact",     href: "/contact" },
    ],
    socialLinks: [
        { label: "LinkedIn", href: "#" },
        { label: "GitHub",   href: "#" },
    ],
    contact: {
        email: "info@samsanlabs.com",
        phone: "+91 00000 00000",
        address: "Pune, Maharashtra, India",
    },
};