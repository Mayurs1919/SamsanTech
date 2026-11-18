"use client";

import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { inter, manrope } from "@/app/solutions/fonts";
import { Hero } from "@/components/theme-light/Hero";
import { Section } from "@/components/theme-light/Section";
import { Card } from "@/components/theme-light/Card";
import { Chip } from "@/components/theme-light/Chip";
import { Button } from "@/components/theme-light/Button";
import { CAREER_JOBS } from "@/data/careers";

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
    const typeParam = searchParams.get("type") || "";
    const roleParam = (searchParams.get("role") || "").toLowerCase().trim();
    const productSlug = productParam.toLowerCase().trim();
    const isCareers = typeParam.toLowerCase() === "careers" || productSlug === "careers";
    const role = CAREER_JOBS.find(job => job.slug === roleParam);
    const roleDisplayName = role?.title || "General Application";
    const productDisplayName = PRODUCT_MAP[productSlug] || "";
    const isValidProduct = Boolean(productDisplayName) && !isCareers;

    const [activeHubId, setActiveHubId] = useState<string>("pune");
    const [currentState, setCurrentState] = useState<"form" | "submitted">("form");
    const [submitting, setSubmitting] = useState(false);

    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedInterest, setSelectedInterest] = useState("");
    const interest = isCareers ? "Careers" : isValidProduct ? getInterestFromProduct(productSlug) : selectedInterest;
    const [message, setMessage] = useState("");
    const [experience, setExperience] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [coverNote, setCoverNote] = useState("");
    const [submitError, setSubmitError] = useState("");

    const [errors, setErrors] = useState<Record<string, string>>({});
    const activeHub = HUBS.find(h => h.id === activeHubId) || HUBS[0];



    const validate = () => {
        const nextErrors: Record<string, string> = {};
        if (name.trim().length < 2) nextErrors.name = "Full name must be at least 2 characters.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email address.";
        if (isCareers) {
            if (!/^\d{7,15}$/.test(phone.replace(/[\s()+-]/g, ""))) nextErrors.phone = "Phone number must be between 7 and 15 digits.";
            if (!experience.trim()) nextErrors.experience = "Total experience is required.";
            if (linkedin && !/^https?:\/\//i.test(linkedin)) nextErrors.linkedin = "Please enter a valid LinkedIn URL.";
            if (coverNote.length > 1000) nextErrors.coverNote = "Cover note must be 1000 characters or fewer.";
        } else {
            if (!company.trim()) nextErrors.company = "Company name is required.";
            if (phone && !/^\d{7,15}$/.test(phone.replace(/[\s()+-]/g, ""))) nextErrors.phone = "Phone number must be between 7 and 15 digits.";
            if (!interest) nextErrors.interest = "Please select an interest area above.";
            if (message.trim().length < 10) nextErrors.message = "Message must be at least 10 characters.";
        }
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitError("");
        if (submitting || !validate()) return;
        const submittedData = new FormData(event.currentTarget);
        const resumeFile = submittedData.get("resume");
        if (isCareers && resumeFile instanceof File && resumeFile.size > 0) {
            const extension = resumeFile.name.toLowerCase().split(".").pop();
            if (resumeFile.size > 4 * 1024 * 1024 || !["pdf", "doc", "docx"].includes(extension || "")) {
                setErrors(previous => ({ ...previous, resume: resumeFile.size > 4 * 1024 * 1024 ? "Resume must be 4 MB or smaller." : "Resume must be a PDF, DOC, or DOCX file." }));
                return;
            }
        }
        setSubmitting(true);
        try {
            const formData = submittedData;
            formData.set("type", isCareers ? "careers" : "enquiry");
            formData.set("product", isCareers ? "careers" : productSlug);
            formData.set("interest", isCareers ? "Careers" : interest);
            formData.set("roleSlug", isCareers ? (role?.slug || "") : "");
            formData.set("roleTitle", isCareers ? roleDisplayName : "");
            formData.set("experience", experience);
            formData.set("linkedin", linkedin);
            formData.set("coverNote", coverNote);
            const response = await fetch("/api/contact", { method: "POST", body: formData });
            const result = await response.json().catch(() => null);
            if (!response.ok || !result?.ok) {
                setSubmitError(isCareers
                    ? "We couldn't send your application. Please try again, or email hr@samsanlabs.com"
                    : "We couldn't send your message. Please try again or contact us by email.");
                return;
            }
            setCurrentState("submitted");
        } catch {
            setSubmitError(isCareers
                ? "We couldn't send your application. Please try again, or email hr@samsanlabs.com"
                : "We couldn't send your message. Please try again or contact us by email.");
        } finally {
            setSubmitting(false);
        }
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
                                <h2>{currentState === "submitted" ? (isCareers ? "Application submitted" : "Inquiry Submitted") : (isCareers ? `Apply for ${roleDisplayName}` : "Schedule Technical Call")}</h2>
                            </div>

                            {currentState === "submitted" ? (
                                <div className="tl-contact-confirmation" role="status" aria-live="polite">
                                    <span className="tl-contact-confirmation__icon" aria-hidden="true">
                                        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                                    </span>
                                    {isCareers ? <>
                                        <p>Thank you, <strong>{name}</strong>. We&apos;ve received your application for <strong>{roleDisplayName}</strong>. Our HR team will contact you if your profile matches.</p>
                                        <div className="tl-contact-confirmation__actions">
                                            <Button href="/careers" variant="outline" className="tl-contact-career-back">Back to Career Page</Button>
                                            <Button href="/" variant="primary">Back to home</Button>
                                        </div>
                                    </> : <>
                                        <h3>Thank You for Reaching Out!</h3>
                                        <p>Thank you, <strong>{name}</strong>. We&apos;ve received your message and will reply to <strong>{email}</strong> soon.</p>
                                        <Button href="/" variant="outline">Return to Home Page</Button>
                                    </>}
                                </div>
                            ) : <>
                                {isCareers ? <div className="tl-contact-context" role="status">
                                    <span aria-hidden="true">🎯</span>
                                    <p>You&apos;re applying for: <strong>{roleDisplayName}</strong></p>
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
                                            setSelectedInterest(event.target.value);
                                            if (errors.interest) setErrors(previous => ({ ...previous, interest: "" }));
                                        }}
                                        disabled={submitting || isCareers}
                                        aria-invalid={Boolean(errors.interest)}
                                    >
                                        <option value="">Select Interest Area / Discipline *</option>
                                        {INTEREST_OPTIONS.map(option => <option key={option.id} value={option.id}>{option.icon} {isCareers && option.id === "Careers" ? "Careers" : option.label}</option>)}
                                    </select>
                                    {errors.interest && <span className="tl-contact-error">{errors.interest}</span>}
                                </label>

                                <form className="tl-contact-form" onSubmit={handleSubmit} encType="multipart/form-data">
                                    <input type="hidden" name="product" value={productSlug} />
                                    <input type="hidden" name="type" value={isCareers ? "careers" : "enquiry"} />
                                    <input type="hidden" name="roleSlug" value={isCareers ? (role?.slug || "") : ""} />
                                    <input type="hidden" name="roleTitle" value={isCareers ? roleDisplayName : ""} />
                                    <input type="hidden" name="interest" value={isCareers ? "Careers" : interest} />
                                    <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="contact-honeypot" />
                                    {submitError && <div className="tl-contact-submit-error" role="alert">{submitError}</div>}
                                    <div className="tl-contact-fields">
                                        <label className="tl-contact-field">
                                            <span>Full Name *</span>
                                            <input type="text" name="name" placeholder="Full Name *" value={name} onChange={event => { setName(event.target.value); if (errors.name) setErrors(previous => ({ ...previous, name: "" })); }} disabled={submitting} aria-invalid={Boolean(errors.name)} required />
                                            {errors.name && <small className="tl-contact-error">{errors.name}</small>}
                                        </label>
                                        <label className="tl-contact-field">
                                            <span>Email *</span>
                                            <input type="email" name="email" placeholder="Email *" value={email} onChange={event => { setEmail(event.target.value); if (errors.email) setErrors(previous => ({ ...previous, email: "" })); }} disabled={submitting} aria-invalid={Boolean(errors.email)} required />
                                            {errors.email && <small className="tl-contact-error">{errors.email}</small>}
                                        </label>
                                        {isCareers ? <>
                                            <label className="tl-contact-field">
                                                <span>Phone *</span>
                                                <input type="tel" name="phone" placeholder="Phone *" value={phone} onChange={event => { setPhone(event.target.value); if (errors.phone) setErrors(previous => ({ ...previous, phone: "" })); }} disabled={submitting} aria-invalid={Boolean(errors.phone)} required />
                                                {errors.phone && <small className="tl-contact-error">{errors.phone}</small>}
                                            </label>
                                            <label className="tl-contact-field">
                                                <span>Total experience in years *</span>
                                                <input type="number" name="experience" min="0" step="0.5" placeholder="Total experience in years *" value={experience} onChange={event => { setExperience(event.target.value); if (errors.experience) setErrors(previous => ({ ...previous, experience: "" })); }} disabled={submitting} aria-invalid={Boolean(errors.experience)} required />
                                                {errors.experience && <small className="tl-contact-error">{errors.experience}</small>}
                                            </label>
                                            <label className="tl-contact-field">
                                                <span>Current company (optional)</span>
                                                <input type="text" name="company" placeholder="Current company (optional)" value={company} onChange={event => setCompany(event.target.value)} disabled={submitting} />
                                            </label>
                                            <label className="tl-contact-field">
                                                <span>LinkedIn URL (optional)</span>
                                                <input type="url" name="linkedin" placeholder="LinkedIn URL (optional)" value={linkedin} onChange={event => { setLinkedin(event.target.value); if (errors.linkedin) setErrors(previous => ({ ...previous, linkedin: "" })); }} disabled={submitting} aria-invalid={Boolean(errors.linkedin)} />
                                                {errors.linkedin && <small className="tl-contact-error">{errors.linkedin}</small>}
                                            </label>
                                            <label className="tl-contact-field">
                                                <span>Cover note (optional, max 1000 characters)</span>
                                                <textarea name="coverNote" placeholder="Cover note (optional)" rows={4} maxLength={1000} value={coverNote} onChange={event => { setCoverNote(event.target.value); if (errors.coverNote) setErrors(previous => ({ ...previous, coverNote: "" })); }} disabled={submitting} aria-invalid={Boolean(errors.coverNote)} />
                                                {errors.coverNote && <small className="tl-contact-error">{errors.coverNote}</small>}
                                            </label>
                                            <label className="tl-contact-field">
                                                <span>Resume upload (optional; PDF, DOC or DOCX; max 4 MB)</span>
                                                <input type="file" name="resume" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" disabled={submitting} onChange={() => { if (errors.resume) setErrors(previous => ({ ...previous, resume: "" })); }} />
                                                {errors.resume && <small className="tl-contact-error">{errors.resume}</small>}
                                            </label>
                                        </> : <>
                                            <label className="tl-contact-field">
                                                <span>Company / Org *</span>
                                                <input type="text" name="company" placeholder="Company / Org *" value={company} onChange={event => { setCompany(event.target.value); if (errors.company) setErrors(previous => ({ ...previous, company: "" })); }} disabled={submitting} aria-invalid={Boolean(errors.company)} required />
                                                {errors.company && <small className="tl-contact-error">{errors.company}</small>}
                                            </label>
                                            <label className="tl-contact-field">
                                                <span>Phone Number (Optional)</span>
                                                <input type="tel" name="phone" placeholder="Phone Number (Optional)" value={phone} onChange={event => { setPhone(event.target.value); if (errors.phone) setErrors(previous => ({ ...previous, phone: "" })); }} disabled={submitting} aria-invalid={Boolean(errors.phone)} />
                                                {errors.phone && <small className="tl-contact-error">{errors.phone}</small>}
                                            </label>
                                            <label className="tl-contact-field">
                                                <span>Describe your engineering project or inquiry (minimum 10 characters) *</span>
                                                <textarea name="message" placeholder="Describe your engineering project or inquiry (minimum 10 characters) *" rows={4} value={message} onChange={event => { setMessage(event.target.value); if (errors.message) setErrors(previous => ({ ...previous, message: "" })); }} disabled={submitting} aria-invalid={Boolean(errors.message)} required />
                                                {errors.message && <small className="tl-contact-error">{errors.message}</small>}
                                            </label>
                                        </>}
                                    </div>
                                    <Button className="tl-contact-submit" type="submit" disabled={submitting}>
                                        {submitting ? <><svg className="contact-submit-spinner" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /></svg> Sending...</> : (isCareers ? "Submit Application →" : "Schedule Technical Consultation →")}
                                    </Button>
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
