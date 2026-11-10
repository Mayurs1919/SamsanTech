"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { inter, manrope } from "@/app/solutions/fonts";
import SamsanAnimatedLogo from "@/components/ui/SamsanAnimatedLogo";

export type ThemeLightNavLink = { label: string; href: string };

export function Navbar({ links, logoSrc, getStartedHref = "/contact", getStartedLabel = "Get started", trailing, themeClassName = "theme-light-corp", showGetStarted = true }: {
  links: ThemeLightNavLink[];
  logoSrc?: string;
  getStartedHref?: string;
  getStartedLabel?: string;
  trailing?: ReactNode;
  themeClassName?: string;
  showGetStarted?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || (href === "/products-and-accelerators" && pathname.startsWith("/solutions"));

  return (
    <header className={`${themeClassName} tl-navbar ${inter.variable} ${manrope.variable}`}>
      <nav className="tl-navbar__inner" aria-label="Primary navigation">
        <Link className="tl-navbar__brand" href="/" aria-label="SAMSAN home">
          {logoSrc ? <img src={logoSrc} alt="SAMSAN — in step with the NEXT" /> : <SamsanAnimatedLogo width="176px" height="57px" />}
        </Link>
        <ul className="tl-navbar__links">
          {links.map(link => <li key={link.href}><Link href={link.href} className={isActive(link.href) ? "is-active" : undefined} aria-current={isActive(link.href) ? "page" : undefined}>{link.label}</Link></li>)}
        </ul>
        <div className="tl-navbar__actions">
          {showGetStarted && <Link className="tl-button tl-button--primary tl-navbar__cta" href={getStartedHref}>{getStartedLabel}<span aria-hidden="true">→</span></Link>}
          <button className="tl-navbar__toggle" type="button" aria-expanded={open} aria-label={open ? "Close navigation menu" : "Open navigation menu"} onClick={() => setOpen(value => !value)}>
            {open ? <span aria-hidden="true">×</span> : <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></svg>}
          </button>
        </div>
      </nav>
        {open && <div className="tl-navbar__drawer">
        {links.map(link => <Link key={link.href} href={link.href} className={isActive(link.href) ? "is-active" : undefined} aria-current={isActive(link.href) ? "page" : undefined} onClick={() => setOpen(false)}>{link.label}</Link>)}
        {showGetStarted && <Link className="tl-button tl-button--primary" href={getStartedHref} onClick={() => setOpen(false)}>{getStartedLabel}<span aria-hidden="true">→</span></Link>}
        {trailing}
      </div>}
    </header>
  );
}
