'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Logo } from './Logo';
import { navLinks, ctaLink } from '@/lib/site';

/**
 * Sticky white header. `solid` is kept for API compatibility with inner pages;
 * the Luce design uses the same solid header everywhere.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Nav({ solid = false }: { solid?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" aria-label="Villa Casa Mia, home">
          <Logo compact />
        </Link>

        <nav aria-label="Principale" className="site-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href={ctaLink.href} className="button header-cta">
          {ctaLink.label}
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="nav-mobile"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        id="nav-mobile"
        aria-label="Menu mobile"
        className="mobile-menu"
        data-open={open}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link href={ctaLink.href} className="button" onClick={() => setOpen(false)}>
          {ctaLink.label}
        </Link>
      </nav>
    </header>
  );
}
