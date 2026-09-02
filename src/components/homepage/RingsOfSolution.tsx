"use client";

import React from "react";

export default function RingsOfSolution() {
    return (
        <section 
            className="rings-section" 
            style={{
                position: "relative",
                padding: "80px 0 100px",
                background: "linear-gradient(180deg, var(--midnight) 0%, var(--navy) 100%)",
                overflow: "hidden"
            }}
        >
            <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 24px" }}>
                {/* Section Header */}
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
                    <h2 
                        style={{ 
                            fontSize: "clamp(2rem, 3.5vw, 2.8rem)", 
                            fontWeight: 800, 
                            color: "#FFFFFF",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.15
                        }}
                    >
                        The SAMSAN <span style={{ color: "#4DD8E8" }}>Ring of Solution</span>
                    </h2>
                    <p 
                        style={{ 
                            maxWidth: "560px", 
                            margin: "14px auto 0", 
                            fontSize: "1.05rem", 
                            lineHeight: "1.75",
                            color: "var(--text-secondary)"
                        }}
                    >
                        Our integrated engineering capability spans every domain of the Software Defined Vehicle — from silicon to cloud.
                    </p>
                </div>

                {/* Clean Image Container - No extra overlay animations or text elements */}
                <div 
                    style={{
                        position: "relative",
                        width: "100%",
                        maxWidth: "1100px",
                        margin: "0 auto",
                        borderRadius: "20px",
                        overflow: "hidden",
                        border: "1px solid rgba(77, 216, 232, 0.15)",
                        background: "rgba(10, 15, 28, 0.8)",
                        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
                    }}
                >
                    <img 
                        src="/images/samsan-vehicle-schematic.png"
                        alt="SAMSAN Software Defined Vehicle Engineering Architecture"
                        style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                            objectFit: "contain"
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
