import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Button, type ButtonVariant } from "./Button";

type CtaBandProps = {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  eyebrow?: string;
  secondaryVariant?: ButtonVariant;
  children?: ReactNode;
  className?: string;
};

export function CtaBand({ title, description, primaryLabel, primaryHref, secondaryLabel, secondaryHref, eyebrow = "Next steps", secondaryVariant = "ghost-on-dark", children, className = "" }: CtaBandProps) {
  return (
    <section className={`tl-cta-band ${className}`.trim()} aria-labelledby="solutions-cta-heading">
      <div className="tl-container">
        <div className="tl-cta-band__content">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h2 id="solutions-cta-heading">{title}</h2>
          <p>{description}</p>
          {primaryLabel && primaryHref && secondaryLabel && secondaryHref && <div className="tl-cta-band__actions">
            <Button href={primaryHref} variant="primary">{primaryLabel}<span aria-hidden="true">→</span></Button>
            <Button href={secondaryHref} variant={secondaryVariant}>{secondaryLabel}</Button>
          </div>}
          {children}
        </div>
      </div>
    </section>
  );
}
