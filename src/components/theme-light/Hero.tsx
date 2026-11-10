"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./Eyebrow";
import { StatTile } from "./StatTile";

export function Hero({ eyebrow, title, description, children, className = "", eyebrowClassName = "", layout = "single", align = "start", stats = [] }: {
  eyebrow?: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  className?: string;
  eyebrowClassName?: string;
  layout?: "single" | "split";
  align?: "start" | "center";
  stats?: { value: string; label: string }[];
}) {
  const shouldReduce = useReducedMotion();
  return (
    <section className={`tl-hero ${layout === "split" ? "tl-hero--split" : ""} ${className}`.trim()}>
      <div className="tl-container">
        <div className="tl-hero__layout">
          <motion.div
            className={`tl-hero__copy ${align === "center" ? "tl-hero__copy--center" : ""}`.trim()}
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduce ? 0 : 0.5 }}
          >
            {eyebrow && <Eyebrow className={eyebrowClassName} tone="dark">{eyebrow}</Eyebrow>}
            <h1>{title}</h1>
            <p>{description}</p>
            {children}
          </motion.div>
          {layout === "split" && <div className="tl-hero__stats">{stats.map(stat => <StatTile key={`${stat.value}-${stat.label}`} {...stat} />)}</div>}
        </div>
      </div>
    </section>
  );
}
