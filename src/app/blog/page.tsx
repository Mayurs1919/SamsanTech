import Link from "next/link";

export default function BlogPage() {
    return (
        <div className="container" style={{ padding: "120px 0", textAlign: "center" }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Samsan Labs Blog</h1>
            <p style={{ color: "var(--text-secondary)", marginBottom: "30px" }}>Our technical insights and company updates are coming soon.</p>
            <Link href="/" className="btn btn-primary" style={{ display: "inline-block" }}>Back Home</Link>
        </div>
    );
}
