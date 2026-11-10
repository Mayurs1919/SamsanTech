import type { ReactNode } from "react";

export function Eyebrow({ children, tone = "light", className = "" }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return <span className={`tl-eyebrow tl-eyebrow--${tone} ${className}`.trim()}><span aria-hidden="true" />{children}</span>;
}
