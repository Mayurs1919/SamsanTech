import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn about Samsan Labs, our values, and our engineering philosophy.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
