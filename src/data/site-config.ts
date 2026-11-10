import type { SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
    name: "SAMSAN Technische Labs Pvt. Ltd.",
    description: "AI-led Automotive Engineering for Software-Defined Mobility. Focused on Automotive, Cockpit Engineering & Digital Transformation.",
    navItems: [
        { label: "Home",                     href: "/" },
        { label: "Engineering Offerings",     href: "/engineering-offerings" },
        { label: "Products & Accelerators",   href: "/products-and-accelerators" },
        { label: "Labs & Delivery",           href: "/labs-and-delivery" },
        { label: "About",                    href: "/about" },
        { label: "Careers",                  href: "/careers" },
        { label: "Contact",                  href: "/contact" },
        // Hidden items
        { label: "Engagement Models",         href: "/engagement-models" },
    ],
    socialLinks: [
        { label: "LinkedIn", href: "#" },
        { label: "GitHub",   href: "#" },
    ],
    contact: {
        email: "india@samsanlabs.com",
        phone: "+91 89569 27909",
        address: "STPI New Building, Rajiv Gandhi Infotech Park, Phase I, Hinjawadi, Pune 411057, India",
    },
};
