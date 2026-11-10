"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "./Button";

type ProductCardProps = {
  number: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt: string;
  imageKind?: "banner" | "dark-banner" | "logo";
  chips: ReactNode;
  brochureLabel?: string;
  onBrochure: () => void;
  renderBack: (close: () => void) => ReactNode;
  index?: number;
};

export function ProductCard({ number, title, description, imageSrc, imageAlt, imageKind = "banner", chips, brochureLabel = "Brochure", onBrochure, renderBack, index = 0 }: ProductCardProps) {
  const [flipped, setFlipped] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="tl-card-motion product-card-motion"
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut", delay: reducedMotion ? 0 : index * 0.08 }}
    >
      <div className={`tl-product-card product-card-inner${flipped ? " is-flipped" : ""}`} style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        <article className="tl-product-card__face tl-product-card__front product-card-face product-card-front" aria-label={`${title} product details`}>
          <span className="tl-product-card__number product-number">{number}</span>
          <div className="tl-product-card__image product-image-area">
            {imageSrc ? <img className={`tl-product-card__img product-image product-image--${imageKind}`} src={imageSrc} alt={imageAlt} /> : <span className="tl-product-card__image-placeholder" aria-hidden="true">{title.slice(0, 1)}</span>}
          </div>
          <h3 className="tl-product-card__title product-title">{title}</h3>
          <p className="tl-product-card__description product-description">{description}</p>
          <div className="tl-product-card__chips product-chip-list">{chips}</div>
          <div className="tl-product-card__actions">
            <Button variant="outline" type="button" onClick={() => setFlipped(true)} ariaLabel={`View information for ${title}`}>Info</Button>
            <Button variant="primary" type="button" onClick={onBrochure} ariaLabel={`View brochure for ${title}`}>{brochureLabel}</Button>
          </div>
        </article>
        <article className="tl-product-card__face tl-product-card__back product-card-face product-card-back" aria-label={`${title} technical information`}>
          {renderBack(() => setFlipped(false))}
        </article>
      </div>
    </motion.div>
  );
}
