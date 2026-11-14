import Link from "next/link";
import { inter, manrope } from "@/app/solutions/fonts";
import SamsanAnimatedLogo from "@/components/ui/SamsanAnimatedLogo";

export type ThemeLightFooterLink = { label: string; href: string };

export function Footer({ logoSrc = "/images/samsan_logo_base_transparent.png", description, navigationLinks, contactTitle = "The company", contactDetails, copyright, themeClassName = "theme-light-corp" }: {
  logoSrc?: string;
  description: string;
  navigationLinks: ThemeLightFooterLink[];
  contactTitle?: string;
  contactDetails: string[];
  copyright: string;
  themeClassName?: string;
}) {
  return (
    <footer className={`${themeClassName} tl-footer ${inter.variable} ${manrope.variable}`}>
      <div className="tl-container">
        <div className="tl-footer__grid">
          <div className="tl-footer__brand">
            <Link href="/" aria-label="SAMSAN home"><SamsanAnimatedLogo height="48px" /></Link>
            <p>{description}</p>
            <a className="tl-footer__social" href="https://www.linkedin.com/company/samsantechlabs" target="_blank" rel="noopener noreferrer" aria-label="SAMSAN Technische Labs on LinkedIn">in&nbsp; LinkedIn</a>
          </div>
          <nav className="tl-footer__nav" aria-label="Footer navigation">
            <h2>Navigate</h2>
            {navigationLinks.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          </nav>
          <div className="tl-footer__contact">
            <h2>{contactTitle}</h2>
            {contactDetails.map((detail, index) => detail.includes("@") ? <a key={`${index}-${detail}`} href={`mailto:${detail}`}>{detail}</a> : <p key={`${index}-${detail}`}>{detail}</p>)}
          </div>
        </div>
        <div className="tl-footer__copyright">{copyright}</div>
      </div>
    </footer>
  );
}
