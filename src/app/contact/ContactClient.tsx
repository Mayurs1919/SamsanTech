"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { inter, manrope } from "@/app/solutions/fonts";
import { Hero } from "@/components/theme-light/Hero";
import { Section } from "@/components/theme-light/Section";
import { Card } from "@/components/theme-light/Card";
import { Chip } from "@/components/theme-light/Chip";
import { Button } from "@/components/theme-light/Button";

const PRODUCT_MAP: Record<string, string> = {
    maestro: "Maestro™",
    twinlnk: "TwinLnk™",
    samchat: "SamChat",
    "automate-ai": "AutoMATE.ai",
    "sam-sanvaad": "Sam-Sanvaad",
    "driver-health": "Driver Health & Wellness Monitoring",
    sdv: "Software Defined Vehicle (SDV)",
    "stafd-in": "STAFD.IN",
    vemeego: "Vemeego",
    pikniknow: "PiknikNow",
    refacto: "RefactoFlow",
    "digital-cockpit-solution": "Digital Cockpit Solution",
    "dms-edge": "DMS Edge",
    cabiniq: "CabinIQ™",
    vseva: "vSeva"
};

const ROLE_MAP: Record<string, string> = {
    "linux-bsp-developer": "Linux BSP Developer",
    "multimedia-middleware-engineer": "Multimedia & Middleware Engineer",
    "multimedia-middleware-engineer-ota": "Multimedia & Middleware Engineer — OTA",
    "android-hmi-engineer": "Android HMI Engineer",
    "connectivity-engineer": "Connectivity Engineer",
    "media-projection-engineer": "Media Projection Engineer",
    "android-hmi-engineer-unreal": "Android HMI Engineer — Unreal",
    "automotive-ivi-testing-engineer": "Automotive IVI Testing Engineer",
    "hmi-tester": "HMI Tester",
    "spoc-v2x": "SPOC — V2X",
    "spoc-rd-ecu": "SPOC — RD ECU",
    "android-hal-engineer": "Android HAL Engineer",
    "systems-engineer": "Systems Engineer"
};

interface HubInfo {
    id: string;
    name: string;
    region: string;
    city: string;
    country: string;
    address: string;
    phone: string;
    email: string;
    timezone: string;
    mapUrl: string;
    badge: string;
}

const HUBS: HubInfo[] = [
    {
        id: "pune",
        name: "Pune R&D Delivery Center",
        region: "India / APAC R&D HQ",
        city: "Pune",
        country: "India",
        address: "STPI New Building, Rajiv Gandhi Infotech Park, Phase I, Hinjawadi, Pune 411 057",
        phone: "+91 89569 27909",
        email: "india@samsanlabs.com",
        timezone: "IST (UTC+5:30)",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.3813958936647!2d73.7296894!3d18.5917904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbc121555555%3A0xbc4db79d20c5c50b!2sSoftware+Technology+Parks+of+India!5e0!3m2!1sen!2sin!4v1718700000000!5m2!1sen!2sin",
        badge: "Primary R&D Center"
    },
    {
        id: "europe",
        name: "Europe Automotive Hub",
        region: "Europe & UK",
        city: "Stuttgart / Munich",
        country: "Germany",
        address: "Automotive OEM Integration & Embedded Engineering Partner Hub, Germany",
        phone: "+49 711 9823010",
        email: "europe@samsanlabs.com",
        timezone: "CET (UTC+1)",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d84179.8454238575!2d9.1085023!3d48.7784485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799db34c1100001%3A0x400b24712c7f820!2sStuttgart%2C%20Germany!5e0!3m2!1sen!2sin!4v1718700000000!5m2!1sen!2sin",
        badge: "OEM & Tier-1 Integration"
    },
    {
        id: "americas",
        name: "Americas SDV Lab",
        region: "North America",
        city: "Detroit / Silicon Valley",
        country: "USA",
        address: "Software-Defined Vehicle & Connected Mobility Center, Detroit, MI, USA",
        phone: "+1 313 456 7890",
        email: "usa@samsanlabs.com",
        timezone: "EST (UTC-5) / PST (UTC-8)",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d188764.97541620606!2d-83.1818227!3d42.3527122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824ca0110cb1d75%3A0x5776864e35b9c4d2!2sDetroit%2C%20MI%2C%20USA!5e0!3m2!1sen!2sin!4v1718700000000!5m2!1sen!2sin",
        badge: "SDV & Platform Engineering"
    },
    {
        id: "apac",
        name: "APAC Autonomous Center",
        region: "Japan & South Korea",
        city: "Tokyo / Seoul",
        country: "Japan & Korea",
        address: "Cockpit & ADAS Systems Engineering Center, Shinagawa, Tokyo, Japan",
        phone: "+81 3 5432 1098",
        email: "apac@samsanlabs.com",
        timezone: "JST (UTC+9)",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207446.24819777977!2d139.6007849!3d35.6684415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b857628235d%3A0x4ce01222f6fa72d6!2sTokyo%2C%20Japan!5e0!3m2!1sen!2sin!4v1718700000000!5m2!1sen!2sin",
        badge: "ADAS & Cockpit Systems"
    }
];

const INTEREST_OPTIONS = [
    { id: "Cockpit", label: "Cockpit & HUD", icon: "🚗" },
    { id: "SDV", label: "Software-Defined Vehicle", icon: "⚡" },
    { id: "Telematics", label: "Telematics & Cloud", icon: "📡" },
    { id: "AI Engineering", label: "Embedded AI & ADAS", icon: "🧠" },
    { id: "Staffing", label: "Engineering Staffing", icon: "👥" },
    { id: "Investor Discussion", label: "Investor Inquiry", icon: "📈" },
    { id: "Partnership", label: "Tech Partnership", icon: "🤝" },
    { id: "Careers", label: "Careers & Jobs", icon: "🎯" }
];

const getInterestFromProduct = (slug: string): string => {
    if (slug === "careers") return "Careers";
    if (slug === "sdv") return "SDV";
    if (slug === "stafd-in") return "Staffing";
    if (slug === "twinlnk" || slug === "maestro") return "Telematics";
    if (slug === "driver-health") return "Cockpit";
    return "AI Engineering";
};

function ContactPageContent() {
    const searchParams = useSearchParams();
    const productParam = searchParams.get("product") || "";
    const roleParam = searchParams.get("role") || "";
    const productSlug = productParam.toLowerCase().trim();
    const isCareers = productSlug === "careers";
    const isValidProduct = productSlug && (PRODUCT_MAP.hasOwnProperty(productSlug) || isCareers);
    const productDisplayName = isValidProduct && !isCareers ? PRODUCT_MAP[productSlug] : "";
    const roleDisplayName = ROLE_MAP[roleParam] || (roleParam ? roleParam.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "");

    const [activeHubId, setActiveHubId] = useState<string>("pune");
    const [currentState, setCurrentState] = useState<"form" | "submitted">("form");
    const [submitting, setSubmitting] = useState(false);

    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [interest, setInterest] = useState("");
    const [message, setMessage] = useState("");

    const [errors, setErrors] = useState<Record<string, string>>({});
    const activeHub = HUBS.find(h => h.id === activeHubId) || HUBS[0];

    useEffect(() => {
        if (isCareers) {
            setInterest("Careers");
        } else if (isValidProduct) {
            setInterest(getInterestFromProduct(productSlug));
        }
    }, [productSlug, isCareers, isValidProduct]);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!name || name.trim().length < 2) {
            newErrors.name = "Full name must be at least 2 characters.";
        }

        if (!email) {
            newErrors.email = "Work email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!company || company.trim().length === 0) {
            newErrors.company = "Company name is required.";
        }

        if (phone && !/^\d{7,15}$/.test(phone)) {
            newErrors.phone = "Phone number must be between 7 and 15 digits.";
        }

        if (!interest) {
            newErrors.interest = "Please select an interest area above.";
        }

        if (!message || message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setCurrentState("submitted");
        }, 600);
    };

    return (
        <div className={`theme-light-corp contact-theme ${inter.variable} ${manrope.variable}`}>
            <Hero
                eyebrow="Contact"
                eyebrowClassName="tl-contact-hero__eyebrow"
                title={<>Let&apos;s Engineer Your Next Vehicle Platform</>}
                description="Connect directly with our lead automotive software architects and engineering directors. Fast turnaround, strict NDA execution, and global deployment."
            >
                <div className="tl-contact-trust" aria-label="SAMSAN credentials">
                    <span><i aria-hidden="true">✓</i>ISO 26262 &amp; ASPICE Ready</span>
                    <span><i aria-hidden="true">✓</i>Tier-1 &amp; OEM Partner Track Record</span>
                    <span><i aria-hidden="true">✓</i>Direct Engineering Lead Access</span>
                </div>
            </Hero>

            <Section variant="white" className="tl-contact-main">
                <div className="tl-container">
                    <div className="tl-contact-grid">
                        <aside className="tl-contact-info" aria-label="Contact information">
                            <div className="tl-contact-info__intro">
                                <span className="tl-contact-label">Global presence</span>
                                <h2>Select SAMSAN Engineering Hub</h2>
                                <p>Global Presence &amp; Delivery Network</p>
                            </div>

                            <div className="tl-contact-hubs" aria-label="Select a SAMSAN engineering hub">
                                {HUBS.map(hub => <Chip
                                    key={hub.id}
                                    type="button"
                                    selected={hub.id === activeHubId}
                                    aria-pressed={hub.id === activeHubId}
                                    onClick={() => setActiveHubId(hub.id)}
                                >{hub.city} ({hub.country})</Chip>)}
                            </div>

                            <motion.div key={activeHub.id} className="tl-contact-hub-detail" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                                <Card className="tl-contact-info-card">
                                    <span className="tl-contact-hub-region">{activeHub.region}</span>
                                    <h3>{activeHub.name}</h3>
                                    <span className="tl-contact-hub-badge">{activeHub.badge}</span>

                                    <div className="tl-contact-info-groups">
                                        <div className="tl-contact-info-group">
                                            <span className="tl-contact-label">Headquarters</span>
                                            <p>{activeHub.address}</p>
                                        </div>
                                        <div className="tl-contact-info-group">
                                            <span className="tl-contact-label">Email</span>
                                            <a href={`mailto:${activeHub.email}`}>{activeHub.email}</a>
                                        </div>
                                        <div className="tl-contact-info-group">
                                            <span className="tl-contact-label">Phone</span>
                                            <a href={`tel:${activeHub.phone}`}>{activeHub.phone}</a>
                                        </div>
                                        <div className="tl-contact-info-group">
                                            <span className="tl-contact-label">Global presence</span>
                                            <p>{activeHub.city}, {activeHub.country} · {activeHub.timezone}</p>
                                        </div>
                                    </div>
                                </Card>

                                <div className="tl-contact-map">
                                    <iframe
                                        title={`${activeHub.name} map`}
                                        src={activeHub.mapUrl}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        allowFullScreen
                                    />
                                </div>
                            </motion.div>
                        </aside>

                        <Card className="tl-contact-form-card">
                            <div className="tl-contact-form-heading">
                                <h2>{currentState === "form" ? "Schedule Technical Call" : "Inquiry Submitted"}</h2>
                                <span>✓ Direct SLA Enabled</span>
                            </div>

                            {currentState === "submitted" ? (
                                <div className="tl-contact-confirmation" role="status" aria-live="polite">
                                    <span className="tl-contact-confirmation__icon" aria-hidden="true">
                                        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>
                                    {!isValidProduct ? <>
                                        <h3>Thank You for Reaching Out!</h3>
                                        <p>We&apos;ve received your technical inquiry. A senior member of the SAMSAN engineering team will get back to you at <strong>{email}</strong> within 24 hours.</p>
                                        <Button href="/" variant="outline">Return to Home Page</Button>
                                    </> : <>
                                        <h3>Your Brochure Request Is Ready!</h3>
                                        <p>Thank you for your interest in <strong>{productDisplayName}</strong>. Access your official brochure below.</p>
                                        <Card className="tl-contact-brochure">
                                            <div className="tl-contact-brochure__details">
                                                <span className="tl-contact-brochure__icon" aria-hidden="true">
                                                    <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/></svg>
                                                </span>
                                                <span><strong>{productDisplayName} Technical Brochure</strong><small>PDF Architecture Document · Ready</small></span>
                                            </div>
                                            <div className="tl-contact-brochure__actions">
                                                <Button href={`/brochures/${productSlug}.pdf`} variant="outline" target="_blank" rel="noopener noreferrer">View brochure</Button>
                                                <a className="tl-button tl-button--primary" href={`/brochures/${productSlug}.pdf`} download={`SAMSAN-${productDisplayName}-Brochure.pdf`}>Download brochure</a>
                                            </div>
                                        </Card>
                                        <Link className="tl-contact-back-link" href="/products-and-accelerators">← Explore All Accelerators</Link>
                                    </>}
                                </div>
                            ) : <>
                                {isCareers ? <div className="tl-contact-context" role="status">
                                    <span aria-hidden="true">🎯</span>
                                    <p>Applying for: <strong>{roleDisplayName || "General Application"}</strong></p>
                                </div> : isValidProduct ? <div className="tl-contact-context" role="status">
                                    <span aria-hidden="true">📄</span>
                                    <p>Unlocking brochure for: <strong>{productDisplayName}</strong></p>
                                </div> : null}

                                <label className="tl-contact-field tl-contact-interest">
                                    <span className="tl-contact-field-label">Select Interest Area / Discipline *</span>
                                    <select
                                        name="interest"
                                        value={interest}
                                        onChange={event => {
                                            setInterest(event.target.value);
                                            if (errors.interest) setErrors(previous => ({ ...previous, interest: "" }));
                                        }}
                                        disabled={submitting}
                                        aria-invalid={Boolean(errors.interest)}
                                    >
                                        <option value="">Select Interest Area / Discipline *</option>
                                        {INTEREST_OPTIONS.map(option => <option key={option.id} value={option.id}>{option.icon} {option.label}</option>)}
                                    </select>
                                    {errors.interest && <span className="tl-contact-error">{errors.interest}</span>}
                                </label>

                                <form className="tl-contact-form" onSubmit={handleSubmit}>
                                    <input type="hidden" name="product" value={productSlug} />
                                    <div className="tl-contact-fields">
                                        <label className="tl-contact-field">
                                            <span>Full Name *</span>
                                            <input type="text" name="name" placeholder="Full Name *" value={name} onChange={event => { setName(event.target.value); if (errors.name) setErrors(previous => ({ ...previous, name: "" })); }} disabled={submitting} aria-invalid={Boolean(errors.name)} />
                                            {errors.name && <small className="tl-contact-error">{errors.name}</small>}
                                        </label>
                                        <div className="tl-contact-fields__row">
                                            <label className="tl-contact-field">
                                                <span>Work Email *</span>
                                                <input type="email" name="email" placeholder="Work Email *" value={email} onChange={event => { setEmail(event.target.value); if (errors.email) setErrors(previous => ({ ...previous, email: "" })); }} disabled={submitting} aria-invalid={Boolean(errors.email)} />
                                                {errors.email && <small className="tl-contact-error">{errors.email}</small>}
                                            </label>
                                            <label className="tl-contact-field">
                                                <span>Company / Org *</span>
                                                <input type="text" name="company" placeholder="Company / Org *" value={company} onChange={event => { setCompany(event.target.value); if (errors.company) setErrors(previous => ({ ...previous, company: "" })); }} disabled={submitting} aria-invalid={Boolean(errors.company)} />
                                                {errors.company && <small className="tl-contact-error">{errors.company}</small>}
                                            </label>
                                        </div>
                                        <label className="tl-contact-field">
                                            <span>Phone Number (Optional)</span>
                                            <input type="tel" name="phone" placeholder="Phone Number (Optional)" value={phone} onChange={event => { setPhone(event.target.value); if (errors.phone) setErrors(previous => ({ ...previous, phone: "" })); }} disabled={submitting} aria-invalid={Boolean(errors.phone)} />
                                            {errors.phone && <small className="tl-contact-error">{errors.phone}</small>}
                                        </label>
                                        <label className="tl-contact-field">
                                            <span>Describe your engineering project or inquiry (minimum 10 characters) *</span>
                                            <textarea name="message" placeholder="Describe your engineering project or inquiry (minimum 10 characters) *" rows={4} value={message} onChange={event => { setMessage(event.target.value); if (errors.message) setErrors(previous => ({ ...previous, message: "" })); }} disabled={submitting} aria-invalid={Boolean(errors.message)} />
                                            {errors.message && <small className="tl-contact-error">{errors.message}</small>}
                                        </label>
                                    </div>
                                    <Button className="tl-contact-submit" type="submit" disabled={submitting}>{submitting ? "Processing Inquiry..." : "Schedule Technical Consultation →"}</Button>
                                </form>
                            </>}
                        </Card>
                    </div>
                </div>
            </Section>

            <Section variant="alt" className="tl-contact-about">
                <div className="tl-container tl-contact-about__grid">
                    <div>
                        <span className="tl-eyebrow"><span aria-hidden="true" />A Technology Outcomes And Systems Company</span>
                        <h2>We Are SAMSAN</h2>
                        <div className="tl-contact-about__copy">
                            <p>A specialized systems design house focused on high-integrity software platforms, embedded engineering, and digital transformation. Focused on Cockpit Engineering, ADAS, and connected mobility ecosystems.</p>
                            <p>We deliver full-lifecycle engineering, from concept definition to deployment. Serving global tier-1s, OEMs, and technology companies with premium software-defined architectures.</p>
                        </div>
                        <span className="tl-contact-about__tagline">Always in sync with the future</span>
                    </div>
                    <Card className="tl-contact-about__card">
                        <h3>Focus On Automotive, Cockpit Engineering &amp; Digital Transformation.</h3>
                        <div className="tl-contact-about__stats">
                            <div><strong>50+</strong><span>Projects Completed</span></div>
                            <div><strong>6+</strong><span>Countries Served</span></div>
                            <div><p>India delivery center with global customer and partner presence across Europe, US, Japan and South Korea</p><span>Global Footprint</span></div>
                        </div>
                    </Card>
                </div>
            </Section>

            <Section variant="white" className="tl-contact-assurances">
                <div className="tl-container tl-contact-assurances__grid">
                    <Card><h3>🏛️ Pune R&amp;D Delivery HQ</h3><p>STPI New Building, Phase I, Hinjawadi. Engineering house for Cockpit, ADAS, and SDV solutions.</p></Card>
                    <Card><h3>⚡ 24-Hour SLA Response</h3><p>Direct communication channel to senior leadership via <a href="mailto:india@samsanlabs.com">india@samsanlabs.com</a>.</p></Card>
                    <Card><h3>🌍 Global Integration Tracks</h3><p>Active customer programs &amp; partner presence across Europe, North America, Japan, and South Korea.</p></Card>
                </div>
            </Section>
        </div>
    );
}

export default function ContactClient() {
    return (
        <Suspense fallback={<div className="theme-light-corp tl-contact-loading" /> }>
            <ContactPageContent />
        </Suspense>
    );
}
