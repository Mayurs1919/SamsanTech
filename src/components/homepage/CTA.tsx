import { CtaBand } from "@/components/theme-light/CtaBand";

export default function CTA() {
    return (
        <CtaBand
            title="Let's scope your engagement"
            description="Tell us which discipline you need first — embedded, digital, or consulting. We'll take it from there."
            primaryLabel="Discuss Your Mobility Engineering Need"
            primaryHref="/contact"
            secondaryLabel="See our services"
            secondaryHref="/engineering-offerings"
            showEyebrow={false}
            secondaryVariant="outline-on-dark"
            className="home-cta-band"
        />
    );
}
