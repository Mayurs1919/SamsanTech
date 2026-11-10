import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "outline" | "ghost-on-dark" | "outline-on-dark";
type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  ariaLabel?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href">;

export function Button({ children, variant = "primary", href, className = "", ariaLabel, ...props }: ButtonProps) {
  const classes = `tl-button tl-button--${variant} ${className}`.trim();
  if (href) {
    return <Link href={href} className={classes} aria-label={ariaLabel} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</Link>;
  }
  return <button className={classes} aria-label={ariaLabel} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>;
}
