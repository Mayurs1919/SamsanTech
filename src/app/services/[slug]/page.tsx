import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ServiceSlugPage({ params }: PageProps) {
    const { slug } = await params;
    
    // Redirect standard paths if accessed via dynamic route
    if (slug === "embedded-systems" || slug === "digital-platforms" || slug === "consulting-staffing") {
        return (
            <div className="container" style={{ padding: "120px 0", textAlign: "center" }}>
                <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Redirecting...</h1>
                <Link href={`/services/${slug}`} className="btn btn-primary">Go to Service Page</Link>
            </div>
        );
    }

    notFound();
}
