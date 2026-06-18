import Link from "next/link";

export default function BlogPostPage() {
    return (
        <div className="container" style={{ padding: "120px 0", textAlign: "center" }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Blog Post</h1>
            <p style={{ color: "var(--text-secondary)", marginBottom: "30px" }}>This article is coming soon.</p>
            <Link href="/blog" className="btn btn-primary" style={{ display: "inline-block" }}>Back to Blog</Link>
        </div>
    );
}
