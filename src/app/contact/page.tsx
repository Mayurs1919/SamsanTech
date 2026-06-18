"use client";

import { useState, useTransition } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";

export default function ContactPage() {
    const [isPending, startTransition] = useTransition();
    const [isSuccess, setIsSuccess] = useState(false);
    const [formError, setFormError] = useState("");
    const shouldReduce = useReducedMotion();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError("");
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;

        if (!name || !message) {
            setFormError("Please fill in both Name and Message before sending.");
            return;
        }

        startTransition(async () => {
            try {
                const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, message })
                });
                
                if (response.ok) {
                    setIsSuccess(true);
                } else {
                    setFormError("Failed to send message. Please try again.");
                }
            } catch (err) {
                setFormError("An unexpected error occurred. Please try again.");
            }
        });
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

                        {/* Right Section: Split (Meet Us & Form) */}
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
                                            backgroundColor: "rgba(242, 101, 34, 0.15)", color: "#f26522",
                                            flexShrink: 0,
                                            boxShadow: "0 0 15px rgba(242, 101, 34, 0.1)"
                                        }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "4px" }}>Phone</span>
                                            <a href="tel:+918956927909" style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--text-primary)", textDecoration: "none" }} className="hover:text-[#f26522] transition-colors">
                                                +91 89569 27909
                                            </a>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                                        <div style={{
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            width: "40px", height: "40px", borderRadius: "50%",
                                            backgroundColor: "rgba(242, 101, 34, 0.15)", color: "#f26522",
                                            flexShrink: 0,
                                            boxShadow: "0 0 15px rgba(242, 101, 34, 0.1)"
                                        }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                                <polyline points="22,6 12,13 2,6"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "4px" }}>Email</span>
                                            <a href="mailto:india@samsanlabs.com" style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--text-primary)", textDecoration: "none" }} className="hover:text-[#f26522] transition-colors">
                                                india@samsanlabs.com
                                            </a>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                                        <div style={{
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            width: "40px", height: "40px", borderRadius: "50%",
                                            backgroundColor: "rgba(242, 101, 34, 0.15)", color: "#f26522",
                                            flexShrink: 0,
                                            boxShadow: "0 0 15px rgba(242, 101, 34, 0.1)"
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

                            {/* Part 2: Contact Form */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                                <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--text-primary)", margin: 0, fontFamily: "var(--font-display)" }}>
                                    Contact
                                </h2>

                                {isSuccess ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{ 
                                            textAlign: "center", 
                                            padding: "24px", 
                                            backgroundColor: "rgba(10, 15, 28, 0.6)", 
                                            borderRadius: "var(--radius)",
                                            border: "1px solid rgba(16, 185, 129, 0.2)",
                                            boxShadow: "0 10px 25px rgba(16, 185, 129, 0.1)"
                                        }}
                                    >
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
                                        <h4 style={{ color: "var(--text-primary)", margin: "0 0 8px 0", fontSize: "1.1rem", fontWeight: 600 }}>Message Sent!</h4>
                                        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: "0 0 20px 0", lineHeight: "1.5" }}>
                                            Thank you. We will get back to you shortly.
                                        </p>
                                        <button
                                            onClick={() => setIsSuccess(false)}
                                            style={{
                                                padding: "10px 20px",
                                                border: "1px solid var(--border)",
                                                borderRadius: "100px",
                                                background: "rgba(255,255,255,0.04)",
                                                color: "var(--text-primary)",
                                                fontSize: "0.8rem",
                                                fontWeight: 500,
                                                cursor: "pointer",
                                                transition: "all 0.2s"
                                            }}
                                            className="hover:bg-white/5"
                                        >
                                            Send Another
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                        {formError && (
                                            <div style={{
                                                padding: "10px 14px",
                                                backgroundColor: "rgba(239, 68, 68, 0.1)",
                                                border: "1px solid rgba(239, 68, 68, 0.2)",
                                                borderRadius: "8px",
                                                color: "#ef4444",
                                                fontSize: "0.8rem"
                                            }}>
                                                {formError}
                                            </div>
                                        )}

                                        {/* Name */}
                                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                placeholder="Name" 
                                                disabled={isPending}
                                                required
                                                style={{
                                                    padding: "12px 18px",
                                                    borderRadius: "12px",
                                                    border: "1px solid var(--border)",
                                                    backgroundColor: "rgba(10, 15, 28, 0.6)",
                                                    fontSize: "0.9rem",
                                                    color: "var(--text-primary)",
                                                    outline: "none",
                                                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                                                    transition: "border-color 0.2s, box-shadow 0.2s"
                                                }}
                                                className="focus:border-[#f26522] focus:ring-1 focus:ring-[#f26522] placeholder:text-[#4B5578]"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                            <input 
                                                type="email" 
                                                name="email" 
                                                placeholder="Email (Optional)" 
                                                disabled={isPending}
                                                style={{
                                                    padding: "12px 18px",
                                                    borderRadius: "12px",
                                                    border: "1px solid var(--border)",
                                                    backgroundColor: "rgba(10, 15, 28, 0.6)",
                                                    fontSize: "0.9rem",
                                                    color: "var(--text-primary)",
                                                    outline: "none",
                                                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                                                    transition: "border-color 0.2s, box-shadow 0.2s"
                                                }}
                                                className="focus:border-[#f26522] focus:ring-1 focus:ring-[#f26522] placeholder:text-[#4B5578]"
                                            />
                                        </div>

                                        {/* Message */}
                                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                            <textarea 
                                                name="message" 
                                                placeholder="Message" 
                                                rows={4}
                                                disabled={isPending}
                                                required
                                                style={{
                                                    padding: "12px 18px",
                                                    borderRadius: "12px",
                                                    border: "1px solid var(--border)",
                                                    backgroundColor: "rgba(10, 15, 28, 0.6)",
                                                    fontSize: "0.9rem",
                                                    color: "var(--text-primary)",
                                                    outline: "none",
                                                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
                                                    resize: "none",
                                                    transition: "border-color 0.2s, box-shadow 0.2s"
                                                }}
                                                className="focus:border-[#f26522] focus:ring-1 focus:ring-[#f26522] placeholder:text-[#4B5578]"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(124, 58, 237, 0.45)" }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={isPending}
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
                                            {isPending ? "Sending..." : "Send"}
                                        </motion.button>
                                    </form>
                                )}
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

        </div>
    );
}
