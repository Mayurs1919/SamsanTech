import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  selected?: boolean;
} & (ButtonHTMLAttributes<HTMLButtonElement> | HTMLAttributes<HTMLSpanElement>);

export function Chip({ children, selected = false, className = "", ...props }: ChipProps) {
  const classes = `tl-chip${selected ? " is-selected" : ""}${className ? ` ${className}` : ""}`;
  if ("onClick" in props || "type" in props) {
    return <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>;
  }
  return <span className={classes} {...(props as HTMLAttributes<HTMLSpanElement>)}>{children}</span>;
}
