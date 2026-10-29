"use client";

<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

function CountUpNumber({ target, suffix = "+" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const shouldReduce = useReducedMotion();
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (shouldReduce) {
      setCount(target);
      if (ref.current) ref.current.textContent = `${target}${suffix}`;
      return;
    }

    if (!isInView) {
      // Reset count to 0 when out of view so it re-animates smoothly next time it enters
      setCount(0);
      if (ref.current) ref.current.textContent = `0${suffix}`;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    let start: number | null = null;
    const duration = 1200; // 1.2 seconds

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Smooth custom ease-out curve (2.2 exponent) for continuous progress without final value sticking/lag
      const ease = 1 - Math.pow(1 - progress, 2.2);
      const current = Math.min(Math.floor(ease * target), target);

      if (ref.current) {
        ref.current.textContent = `${current}${suffix}`;
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        setCount(target);
        if (ref.current) {
          ref.current.textContent = `${target}${suffix}`;
        }
      }
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isInView, target, suffix, shouldReduce]);

  return (
    <span ref={ref} style={{ display: "inline-block" }}>
      {count}{suffix}
    </span>
  );
}
=======
import { motion, useReducedMotion } from "framer-motion";
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e

export default function AboutCompany() {
    const shouldReduce = useReducedMotion();

    return (
        <section className="section" id="about-company-section" style={{ position: "relative", overflow: "hidden", borderTop: "1px solid rgba(15, 23, 42, 0.1)" }}>
            
            {/* Background Glow */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "10%",
                width: "400px",
                height: "400px",
                background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
                transform: "translateY(-50%)"
            }} />

            <div className="container">
                <div className="about-company-grid">
                    
                    {/* Left side: Intro text */}
                    <div>
                        <span style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--rose)",
                            marginBottom: "16px",
                            display: "block"
                        }}>
                            A Technology Outcomes And Systems Company
                        </span>
                        
                        <h2 style={{ fontSize: "2.8rem", marginBottom: "28px", fontWeight: 700, letterSpacing: "-0.025em", color: "#FFFFFF" }}>
                            We Are SAMSAN
                        </h2>

                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <p style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "#F1F5F9" }}>
                                A specialized systems design house focused on high-integrity software platforms, embedded engineering, and digital transformation. Focused on Cockpit Engineering, ADAS, and connected mobility ecosystems.
                            </p>
                            <p style={{ fontSize: "0.95rem", lineHeight: "1.8", color: "#94A3B8" }}>
                                We deliver full-lifecycle engineering, from concept definition to deployment. Serving global tier-1s, OEMs, and technology companies with premium software-defined architectures.
                            </p>
                        </div>

                        <div style={{
                            marginTop: "32px",
                            borderLeft: "2px solid #8B5CF6",
                            paddingLeft: "16px"
                        }}>
                            <span style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "12px",
                                fontWeight: 600,
                                letterSpacing: "0.08em",
                                color: "#A78BFA",
                                textTransform: "uppercase"
                            }}>
                                Always in sync with the future
                            </span>
                        </div>
                    </div>

                    {/* Right side: Stats Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
<<<<<<< HEAD
                        viewport={{ once: false }}
=======
                        viewport={{ once: true }}
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
                        transition={{ duration: 0.6 }}
                        style={{
                            background: "#FFFFFF",
                            border: "1px solid rgba(15, 23, 42, 0.1)",
                            borderRadius: "var(--radius-lg)",
                            padding: "36px 28px",
                            boxShadow: "0 4px 24px rgba(15, 23, 42, 0.08)",
                            position: "relative",
                            overflow: "hidden"
                        }}
                    >
                        {/* Corner light streak */}
                        <div style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: "150px",
                            height: "1px",
                            background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)"
                        }} />

                        <div style={{ marginBottom: "40px" }}>
                            <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#0F172A", lineHeight: "1.3", letterSpacing: "-0.01em" }}>
<<<<<<< HEAD
                                Focus On Automotive, Cockpit Engineering &amp; Digital Transformation.
=======
                                Focus On Automotive, Cockpit Engineering & Digital Transformation.
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
                            </h3>
                        </div>

                        <style>{`
                            .about-stats-grid {
                                display: grid;
                                grid-template-columns: repeat(3, 1fr);
                                gap: 24px;
                                padding-top: 32px;
                                border-top: 1px solid rgba(15, 23, 42, 0.1);
                            }
                            @media (max-width: 640px) {
                                .about-stats-grid {
                                    grid-template-columns: 1fr;
                                    gap: 20px;
                                }
                            }
                        `}</style>

                        {/* Stats grid */}
                        <div className="about-stats-grid">
                            <div>
                                <div style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: "2.5rem",
                                    fontWeight: 700,
                                    color: "#0F172A",
                                    lineHeight: 1
                                }}>
<<<<<<< HEAD
                                    <CountUpNumber target={50} suffix="+" />
=======
                                    50+
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
                                </div>
                                <div style={{ fontSize: "0.78rem", color: "#64748B", marginTop: "6px", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>
                                    Projects Completed
                                </div>
                            </div>
                            <div>
                                <div style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: "2.5rem",
                                    fontWeight: 700,
                                    color: "#0F172A",
                                    lineHeight: 1
                                }}>
<<<<<<< HEAD
                                    <CountUpNumber target={6} suffix="+" />
=======
                                    6+
>>>>>>> f2d438bdbcd52a9285825a46541662390c9fbc9e
                                </div>
                                <div style={{ fontSize: "0.78rem", color: "#64748B", marginTop: "6px", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>
                                    Countries Served
                                </div>
                            </div>
                            <div>
                                <div style={{
                                    fontSize: "0.88rem",
                                    color: "#1E293B",
                                    lineHeight: 1.6,
                                    fontWeight: 500
                                }}>
                                    India delivery center with global customer and partner presence across Europe, US, Japan and South Korea
                                </div>
                                <div style={{ fontSize: "0.78rem", color: "#64748B", marginTop: "6px", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>
                                    Global Footprint
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
