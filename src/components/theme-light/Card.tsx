import type { HTMLAttributes, ReactNode } from "react";

export function Card({ children, className = "", variant = "default", ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode; variant?: "default" | "coming-soon" }) {
  return <div className={`tl-card tl-card--${variant} ${className}`.trim()} {...props}>{children}</div>;
}
