"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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
    "digital-cockpit-solution": "Digital Cockpit Solution",
    tcu: "TCU (Telematics Control Unit)",
    "dms-edge": "DMS Edge",
    cabiniq: "CabinIQ™",
    vseva: "vSeva"
};

const getInterestFromProduct = (slug: string): string => {
    if (slug === "sdv") return "SDV";
    if (slug === "stafd-in") return "Staffing";
    if (slug === "twinlnk" || slug === "maestro") return "Telematics";
    if (slug === "driver-health") return "Cockpit";
    return "AI Engineering"; // default for other products
};

function ContactPageContent() {
    const searchParams = useSearchParams();
    const productParam = searchParams.get("product") || "";
    const productSlug = productParam.toLowerCase().trim();
    const isValidProduct = productSlug && PRODUCT_MAP.hasOwnProperty(productSlug);
    const productDisplayName = isValidProduct ? PRODUCT_MAP[productSlug] : "";

    const [currentState, setCurrentState] = useState<"form" | "submitted">("form");
    const [submitting, setSubmitting] = useState(false);

    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [interest, setInterest] = useState("");
    const [message, setMessage] = useState("");

    // Errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    const shouldReduce = useReducedMotion();

    // Auto-populate interest dropdown on load based on product
    useEffect(() => {
        if (isValidProduct) {
            setInterest(getInterestFromProduct(productSlug));
        }
    }, [productSlug, isValidProduct]);

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
            newErrors.interest = "Please select what you are interested in.";
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
        <div style={{ backgroundColor: "var(--midnight)", color: "var(--text-primary)", minHeight: "100vh" }}>
            
            {/* ── Hero Banner Section with Diagonal Slanted Divider ── */}
            <section 
                style={{ 
                    position: "relative",
                    backgroundImage: "linear-gradient(rgba(10, 15, 28, 0.5), rgba(10, 15, 28, 0.7)), url('https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1600&auto=format&fit=crop')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "200px 0 160px 0",
                    textAlign: "center",
                    overflow: "hidden"
                }}
            >
                {/* Slanted overlay at bottom matching midnight background */}
                <div 
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "120px",
                        backgroundColor: "var(--midnight)",
                        clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
                        zIndex: 10
                    }}
                />
                
                <div className="container" style={{ position: "relative", zIndex: 5 }}>
                    <motion.div
                        variants={staggerContainerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.span 
                            variants={fadeUpVariants(shouldReduce)}
                            className="badge" 
                            style={{ marginBottom: "20px" }}
                        >
                            Get In Touch
                        </motion.span>
                        <motion.h1 
                            variants={fadeUpVariants(shouldReduce)}
                            style={{ 
                                fontFamily: "var(--font-display)", 
                                fontStyle: "italic", 
                                fontSize: "clamp(2.8rem, 6.5vw, 4.5rem)", 
                                color: "var(--text-primary)",
                                margin: 0,
                                textShadow: "0 4px 12px rgba(0,0,0,0.4)"
                            }}
                        >
                            Contact Us
                        </motion.h1>
                        <motion.p
                            variants={fadeUpVariants(shouldReduce)}
                            style={{
                                color: "var(--text-secondary)",
                                fontSize: "1.1rem",
                                maxWidth: "540px",
                                margin: "16px auto 0 auto",
                                lineHeight: "1.6"
                            }}
                        >
                            Tell us about your project or inquiry. Our engineering team is ready to collaborate.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── Main Content Section (Split Layout) ── */}
            <section style={{ padding: "20px 0 120px 0", position: "relative" }}>
                <div className="container">
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "40px",
                        alignItems: "stretch"
                    }}>
                        
                        {/* Left Section: Map */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            style={{
                                borderRadius: "var(--radius-lg)",
                                overflow: "hidden",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                                border: "1px solid var(--border)",
                                minHeight: "480px",
                                display: "flex"
                            }}
                        >
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.3813958936647!2d73.7296894!3d18.5917904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbc121555555%3A0xbc4db79d20c5c50b!2sSoftware+Technology+Parks+of+India!5e0!3m2!1sen!2sin!4v1718700000000!5m2!1sen!2sin"
                                width="100%" 
                                height="100%" 
                                style={{ border: 0, minHeight: "480px", filter: "invert(90%) hue-rotate(180deg) opacity(0.85)" }}
                                allowFullScreen={true} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </motion.div>

                        {/* Right Section: Split (Meet Us & Form/Confirmation) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                                gap: "32px",
                                padding: "40px",
                                borderRadius: "var(--radius-lg)",
                                backgroundColor: "rgba(13, 19, 35, 0.45)",
                                border: "1px solid var(--border)",
                                backdropFilter: "blur(24px)",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.25)"
                            }}
                        >
                            {/* Part 1: Meet Us */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                                <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--text-primary)", margin: 0, fontFamily: "var(--font-display)" }}>
                                    Meet Us
                                </h2>
                                
                                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                                    {/* Phone */}
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                                        <div style={{
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            width: "40px", height: "40px", borderRadius: "50%",
                                            backgroundColor: "var(--violet-soft)", color: "var(--violet-mid)",
                                            flexShrink: 0,
                                            boxShadow: "0 0 15px var(--violet-soft)"
                                        }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "4px" }}>Phone</span>
                                            <a href="tel:+918956927909" style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--text-primary)", textDecoration: "none" }} className="hover:text-[var(--violet-mid)] transition-colors">
                                                +91 89569 27909
                                            </a>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                                        <div style={{
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            width: "40px", height: "40px", borderRadius: "50%",
                                            backgroundColor: "var(--violet-soft)", color: "var(--violet-mid)",
                                            flexShrink: 0,
                                            boxShadow: "0 0 15px var(--violet-soft)"
                                        }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                                <polyline points="22,6 12,13 2,6"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "4px" }}>Email</span>
                                            <a href="mailto:india@samsanlabs.com" style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--text-primary)", textDecoration: "none" }} className="hover:text-[var(--violet-mid)] transition-colors">
                                                india@samsanlabs.com
                                            </a>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                                        <div style={{
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            width: "40px", height: "40px", borderRadius: "50%",
                                            backgroundColor: "var(--violet-soft)", color: "var(--violet-mid)",
                                            flexShrink: 0,
                                            boxShadow: "0 0 15px var(--violet-soft)"
                                        }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                                <circle cx="12" cy="10" r="3"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "4px" }}>Address</span>
                                            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.5", margin: 0 }}>
                                                STPI New Building, Rajiv Gandhi Infotech Park, Phase I, Hinjawadi, Pune 411 057
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Part 2: Contact Form / State Handler */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                                <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--text-primary)", margin: 0, fontFamily: "var(--font-display)" }}>
                                    {currentState === "form" ? "Contact" : "Submitted"}
                                </h2>

                                {currentState === "submitted" ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{ width: "100%" }}
                                    >
                                        {!isValidProduct ? (
                                            /* VARIANT A — No product parameter */
                                            <div style={{
                                                textAlign: "center", 
                                                padding: "24px", 
                                                backgroundColor: "rgba(10, 15, 28, 0.6)", 
                                                borderRadius: "var(--radius)",
                                                border: "1px solid rgba(16, 185, 129, 0.2)",
                                                boxShadow: "0 10px 25px rgba(16, 185, 129, 0.1)"
                                            }}>
                                                <div style={{
                                                    width: "48px", height: "48px",
                                                    borderRadius: "50%",
                                                    backgroundColor: "var(--mint-glow)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    margin: "0 auto 16px",
                                                    color: "var(--mint)",
                                                }}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                        <polyline points="20 6 9 17 4 12"/>
                                                    </svg>
                                                </div>
                                                <h4 style={{ color: "var(--text-primary)", margin: "0 0 12px 0", fontSize: "1.2rem", fontWeight: 700 }}>
                                                    Thank You for Reaching Out!
                                                </h4>
                                                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "0 0 20px 0", lineHeight: "1.55" }}>
                                                    We&apos;ve received your enquiry. A member of the SAMSAN team will get back to you at <strong style={{ color: "var(--text-primary)" }}>{email}</strong> within 1-2 business days.
                                                </p>
                                                <Link
                                                    href="/"
                                                    className="btn btn-primary"
                                                    style={{
                                                        padding: "10px 24px",
                                                        fontSize: "0.85rem",
                                                        width: "fit-content",
                                                        margin: "0 auto"
                                                    }}
                                                >
                                                    Back to Home
                                                </Link>
                                            </div>
                                        ) : (
                                            /* VARIANT B — Product parameter present (Brochure Flow) */
                                            <div style={{
                                                padding: "24px", 
                                                backgroundColor: "rgba(10, 15, 28, 0.6)", 
                                                borderRadius: "var(--radius)",
                                                border: "1px solid rgba(16, 185, 129, 0.2)",
                                                boxShadow: "0 10px 25px rgba(16, 185, 129, 0.1)"
                                            }}>
                                                <div style={{
                                                    width: "48px", height: "48px",
                                                    borderRadius: "50%",
                                                    backgroundColor: "var(--mint-glow)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    margin: "0 auto 16px",
                                                    color: "var(--mint)",
                                                }}>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                        <polyline points="20 6 9 17 4 12"/>
                                                    </svg>
                                                </div>
                                                <h4 style={{ color: "var(--text-primary)", margin: "0 0 8px 0", fontSize: "1.2rem", fontWeight: 700, textAlign: "center" }}>
                                                    Your Enquiry Has Been Submitted!
                                                </h4>
                                                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "0 0 20px 0", lineHeight: "1.5", textAlign: "center" }}>
                                                    Thank you for your interest in <strong style={{ color: "var(--text-primary)" }}>{productDisplayName}</strong>. Your brochure is now ready to access below.
                                                </p>

                                                {/* BROCHURE CARD */}
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "20px",
                                                    backgroundColor: "rgba(13, 19, 35, 0.45)",
                                                    border: "1px solid var(--border)",
                                                    borderRadius: "8px",
                                                    padding: "24px",
                                                    marginTop: "20px",
                                                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                                                    textAlign: "left"
                                                }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                                        {/* Document Icon SVG */}
                                                        <div style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            width: "44px",
                                                            height: "44px",
                                                            borderRadius: "8px",
                                                            backgroundColor: "rgba(245, 158, 11, 0.1)",
                                                            color: "#f59e0b",
                                                            flexShrink: 0
                                                        }}>
                                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                                                <polyline points="14 2 14 8 20 8"/>
                                                                <line x1="16" y1="13" x2="8" y2="13"/>
                                                                <line x1="16" y1="17" x2="8" y2="17"/>
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <h5 style={{ color: "var(--text-primary)", margin: "0 0 2px 0", fontSize: "0.9rem", fontWeight: 600 }}>
                                                                {productDisplayName} Brochure
                                                            </h5>
                                                            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", margin: 0 }}>
                                                                PDF Document · Available
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Side-by-side Buttons */}
                                                    <div style={{ display: "flex", gap: "12px", width: "100%" }}>
                                                        <a 
                                                            href={`/brochures/${productSlug}.pdf`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn btn-outline"
                                                            style={{ 
                                                                padding: "10px 14px", 
                                                                fontSize: "0.8rem",
                                                                flex: 1,
                                                                justifyContent: "center"
                                                            }}
                                                        >
                                                            View
                                                        </a>
                                                        <a 
                                                            href={`/brochures/${productSlug}.pdf`}
                                                            download={`SAMSAN-${productDisplayName}-Brochure.pdf`}
                                                            className="btn btn-primary"
                                                            style={{ 
                                                                padding: "10px 14px", 
                                                                fontSize: "0.8rem",
                                                                background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                                                                boxShadow: "0 4px 14px rgba(234, 88, 12, 0.4), 0 0 0 1px rgba(245, 158, 11, 0.5)",
                                                                color: "#ffffff",
                                                                flex: 1,
                                                                justifyContent: "center"
                                                            }}
                                                        >
                                                            Download
                                                        </a>
                                                    </div>
                                                </div>

                                                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "16px", textAlign: "center", lineHeight: "1.4" }}>
                                                    Having trouble? Email us at <a href="mailto:india@samsanlabs.com" style={{ color: "var(--violet-mid)", textDecoration: "underline" }}>india@samsanlabs.com</a> and we&apos;ll send the brochure directly.
                                                </p>

                                                <div style={{ marginTop: "24px", textAlign: "center" }}>
                                                    <Link 
                                                        href="/solutions" 
                                                        style={{ 
                                                            fontSize: "0.8rem", 
                                                            color: "var(--violet-mid)", 
                                                            textDecoration: "none", 
                                                            fontWeight: 600,
                                                            display: "inline-flex",
                                                            alignItems: "center",
                                                            gap: "6px"
                                                        }}
                                                    >
                                                        ← Back to Products &amp; Accelerators
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ) : (
                                    <>
                                        {/* Contextual banner ABOVE form */}
                                        {isValidProduct && (
                                            <div style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "12px",
                                                padding: "16px 20px",
                                                backgroundColor: "rgba(13, 19, 35, 0.6)",
                                                border: "1px solid var(--border)",
                                                borderRadius: "12px",
                                                marginBottom: "4px"
                                            }}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: "var(--violet-mid)" }}>
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                                    <polyline points="14 2 14 8 20 8"/>
                                                    <line x1="16" y1="13" x2="8" y2="13"/>
                                                    <line x1="16" y1="17" x2="8" y2="17"/>
                                                </svg>
                                                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", margin: 0, lineHeight: "1.4" }}>
                                                    You&apos;re one step away from accessing the <strong style={{ color: "var(--text-primary)" }}>{productDisplayName}</strong> brochure. Fill out the form below to unlock it.
                                                </p>
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                            {/* Hidden field for product slug */}
                                            <input type="hidden" name="product" value={productSlug} />

                                            {/* Name */}
                                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                                <input 
                                                    type="text" 
                                                    name="name" 
                                                    placeholder="Full Name" 
                                                    value={name}
                                                    onChange={(e) => {
                                                        setName(e.target.value);
                                                        if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                                                    }}
                                                    disabled={submitting}
                                                    style={{
                                                        padding: "12px 18px",
                                                        borderRadius: "12px",
                                                        border: errors.name ? "1px solid #ef4444" : "1px solid var(--border)",
                                                        backgroundColor: "rgba(10, 15, 28, 0.6)",
                                                        fontSize: "0.9rem",
                                                        color: "var(--text-primary)",
                                                        outline: "none",
                                                        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                                                        transition: "border-color 0.2s, box-shadow 0.2s"
                                                    }}
                                                    className="focus:border-[var(--violet-mid)] focus:ring-1 focus:ring-[var(--violet-mid)] placeholder:text-[#4B5578]"
                                                />
                                                {errors.name && (
                                                    <span style={{ color: "#ef4444", fontSize: "0.75rem", paddingLeft: "4px" }}>
                                                        {errors.name}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Email */}
                                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                                <input 
                                                    type="email" 
                                                    name="email" 
                                                    placeholder="Work Email" 
                                                    value={email}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                        if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                                                    }}
                                                    disabled={submitting}
                                                    style={{
                                                        padding: "12px 18px",
                                                        borderRadius: "12px",
                                                        border: errors.email ? "1px solid #ef4444" : "1px solid var(--border)",
                                                        backgroundColor: "rgba(10, 15, 28, 0.6)",
                                                        fontSize: "0.9rem",
                                                        color: "var(--text-primary)",
                                                        outline: "none",
                                                        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                                                        transition: "border-color 0.2s, box-shadow 0.2s"
                                                    }}
                                                    className="focus:border-[var(--violet-mid)] focus:ring-1 focus:ring-[var(--violet-mid)] placeholder:text-[#4B5578]"
                                                />
                                                {errors.email && (
                                                    <span style={{ color: "#ef4444", fontSize: "0.75rem", paddingLeft: "4px" }}>
                                                        {errors.email}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Company */}
                                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                                <input 
                                                    type="text" 
                                                    name="company" 
                                                    placeholder="Company" 
                                                    value={company}
                                                    onChange={(e) => {
                                                        setCompany(e.target.value);
                                                        if (errors.company) setErrors(prev => ({ ...prev, company: "" }));
                                                    }}
                                                    disabled={submitting}
                                                    style={{
                                                        padding: "12px 18px",
                                                        borderRadius: "12px",
                                                        border: errors.company ? "1px solid #ef4444" : "1px solid var(--border)",
                                                        backgroundColor: "rgba(10, 15, 28, 0.6)",
                                                        fontSize: "0.9rem",
                                                        color: "var(--text-primary)",
                                                        outline: "none",
                                                        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                                                        transition: "border-color 0.2s, box-shadow 0.2s"
                                                    }}
                                                    className="focus:border-[var(--violet-mid)] focus:ring-1 focus:ring-[var(--violet-mid)] placeholder:text-[#4B5578]"
                                                />
                                                {errors.company && (
                                                    <span style={{ color: "#ef4444", fontSize: "0.75rem", paddingLeft: "4px" }}>
                                                        {errors.company}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Phone Number */}
                                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                                <input 
                                                    type="tel" 
                                                    name="phone" 
                                                    placeholder="Phone Number (Optional)" 
                                                    value={phone}
                                                    onChange={(e) => {
                                                        setPhone(e.target.value);
                                                        if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
                                                    }}
                                                    disabled={submitting}
                                                    style={{
                                                        padding: "12px 18px",
                                                        borderRadius: "12px",
                                                        border: errors.phone ? "1px solid #ef4444" : "1px solid var(--border)",
                                                        backgroundColor: "rgba(10, 15, 28, 0.6)",
                                                        fontSize: "0.9rem",
                                                        color: "var(--text-primary)",
                                                        outline: "none",
                                                        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                                                        transition: "border-color 0.2s, box-shadow 0.2s"
                                                    }}
                                                    className="focus:border-[var(--violet-mid)] focus:ring-1 focus:ring-[var(--violet-mid)] placeholder:text-[#4B5578]"
                                                />
                                                {errors.phone && (
                                                    <span style={{ color: "#ef4444", fontSize: "0.75rem", paddingLeft: "4px" }}>
                                                        {errors.phone}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Interest Dropdown */}
                                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                                <select 
                                                    name="interest"
                                                    value={interest}
                                                    onChange={(e) => {
                                                        setInterest(e.target.value);
                                                        if (errors.interest) setErrors(prev => ({ ...prev, interest: "" }));
                                                    }}
                                                    disabled={submitting}
                                                    style={{
                                                        padding: "12px 18px",
                                                        borderRadius: "12px",
                                                        border: errors.interest ? "1px solid #ef4444" : "1px solid var(--border)",
                                                        backgroundColor: "rgba(10, 15, 28, 0.6)",
                                                        fontSize: "0.9rem",
                                                        color: "var(--text-primary)",
                                                        outline: "none",
                                                        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                                                        transition: "border-color 0.2s, box-shadow 0.2s",
                                                        cursor: "pointer"
                                                    }}
                                                    className="focus:border-[var(--violet-mid)] focus:ring-1 focus:ring-[var(--violet-mid)]"
                                                >
                                                    <option value="" disabled style={{ backgroundColor: "var(--midnight)", color: "#4B5578" }}>I am interested in...</option>
                                                    <option value="Cockpit" style={{ backgroundColor: "var(--midnight)", color: "var(--text-primary)" }}>Cockpit</option>
                                                    <option value="SDV" style={{ backgroundColor: "var(--midnight)", color: "var(--text-primary)" }}>SDV</option>
                                                    <option value="Telematics" style={{ backgroundColor: "var(--midnight)", color: "var(--text-primary)" }}>Telematics</option>
                                                    <option value="AI Engineering" style={{ backgroundColor: "var(--midnight)", color: "var(--text-primary)" }}>AI Engineering</option>
                                                    <option value="Staffing" style={{ backgroundColor: "var(--midnight)", color: "var(--text-primary)" }}>Staffing</option>
                                                    <option value="Investor Discussion" style={{ backgroundColor: "var(--midnight)", color: "var(--text-primary)" }}>Investor Discussion</option>
                                                    <option value="Partnership" style={{ backgroundColor: "var(--midnight)", color: "var(--text-primary)" }}>Partnership</option>
                                                    <option value="Careers" style={{ backgroundColor: "var(--midnight)", color: "var(--text-primary)" }}>Careers</option>
                                                </select>
                                                {errors.interest && (
                                                    <span style={{ color: "#ef4444", fontSize: "0.75rem", paddingLeft: "4px" }}>
                                                        {errors.interest}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Message */}
                                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                                <textarea 
                                                    name="message" 
                                                    placeholder="What are you building? (minimum 10 characters)" 
                                                    rows={4}
                                                    value={message}
                                                    onChange={(e) => {
                                                        setMessage(e.target.value);
                                                        if (errors.message) setErrors(prev => ({ ...prev, message: "" }));
                                                    }}
                                                    disabled={submitting}
                                                    style={{
                                                        padding: "12px 18px",
                                                        borderRadius: "12px",
                                                        border: errors.message ? "1px solid #ef4444" : "1px solid var(--border)",
                                                        backgroundColor: "rgba(10, 15, 28, 0.6)",
                                                        fontSize: "0.9rem",
                                                        color: "var(--text-primary)",
                                                        outline: "none",
                                                        boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                                                        resize: "none",
                                                        transition: "border-color 0.2s, box-shadow 0.2s"
                                                    }}
                                                    className="focus:border-[var(--violet-mid)] focus:ring-1 focus:ring-[var(--violet-mid)] placeholder:text-[#4B5578]"
                                                />
                                                {errors.message && (
                                                    <span style={{ color: "#ef4444", fontSize: "0.75rem", paddingLeft: "4px" }}>
                                                        {errors.message}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Submit Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(124, 58, 237, 0.45)" }}
                                                whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                disabled={submitting}
                                                style={{
                                                    padding: "14px 28px",
                                                    borderRadius: "100px",
                                                    border: "none",
                                                    background: "linear-gradient(135deg, var(--blue), var(--violet-mid))",
                                                    color: "#ffffff",
                                                    fontWeight: 600,
                                                    fontSize: "0.95rem",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: "8px",
                                                    boxShadow: "0 4px 14px rgba(124, 58, 237, 0.3)",
                                                    transition: "opacity 0.2s"
                                                }}
                                            >
                                                {submitting ? "Submitting..." : "Schedule a Discovery Call"}
                                            </motion.button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

        </div>
    );
}

export default function ContactPage() {
    return (
        <Suspense fallback={<div style={{ backgroundColor: "var(--midnight)", minHeight: "100vh" }} />}>
            <ContactPageContent />
        </Suspense>
    );
}
