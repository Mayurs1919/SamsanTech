import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 - Page Not Found | SAMSAN Technische Labs",
    description: "The requested page could not be found on SAMSAN Technische Labs.",
};

export default function NotFound() {
    return (
        <div
            style={{
                minHeight: "70vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "48px 24px",
                textAlign: "center",
                background: "var(--bg-dark, #0a0f1c)",
                color: "#ffffff",
            }}
        >
            <div
                style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "0.85rem",
                    color: "var(--violet-mid, #8b5cf6)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                    padding: "6px 14px",
                    borderRadius: "100px",
                    background: "rgba(139, 92, 246, 0.1)",
                    border: "1px solid rgba(139, 92, 246, 0.2)",
                }}
            >
                // 404 STATUS :: ROUTE_NOT_FOUND
            </div>
            <h1
                style={{
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    fontWeight: 800,
                    marginBottom: "16px",
                    background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                Page Not Found
            </h1>
            <p
                style={{
                    fontSize: "1.1rem",
                    color: "rgba(240, 244, 255, 0.7)",
                    maxWidth: "520px",
                    lineHeight: 1.6,
                    marginBottom: "32px",
                }}
            >
                The page or telemetry route you are trying to access does not exist or has been relocated within the SAMSAN engineering portal.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
                <Link href="/" className="btn btn-primary">
                    Return to Home
                </Link>
                <Link href="/services" className="btn btn-outline">
                    Explore Engineering Offerings
                </Link>
            </div>
        </div>
    );
}
