import Link from 'next/link';

import { Logo } from './Logo';
import { navLinks, ctaLink, siteConfig } from '@/lib/site';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <Logo compact />
          <p className="footer-address">
            {siteConfig.location.name} (PD), {siteConfig.location.region}
            <br />
            {siteConfig.location.country}
          </p>
        </div>

        <div className="footer-cols">
          <div>
            <p>Esplora</p>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
            <Link href={ctaLink.href}>{ctaLink.label}</Link>
          </div>
          <div>
            <p>Contatti</p>
            <a href={`mailto:${siteConfig.author.email}`}>{siteConfig.author.email}</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{siteConfig.copyright}</span>
        <span>CIN IT028005C2IQGX948Q</span>
      </div>
    </footer>
  );
}
