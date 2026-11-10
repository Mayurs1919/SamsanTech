import type { HTMLAttributes, ReactNode } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  variant?: "white" | "alt" | "navy";
  children: ReactNode;
};

export function Section({ variant = "white", className = "", children, ...props }: SectionProps) {
  return <section className={`tl-section tl-section--${variant} ${className}`.trim()} {...props}>{children}</section>;
}
