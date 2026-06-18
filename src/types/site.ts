export type NavItem = {
    label: string;
    href: string;
};

export type SocialLink = {
    label: string;
    href: string;
};

export type ContactInfo = {
    email: string;
    phone: string;
    address: string;
};

export type SiteConfig = {
    name: string;
    description: string;
    navItems: NavItem[];
    socialLinks: SocialLink[];
    contact: ContactInfo;
};  