'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Logo } from './Logo';
import { navLinks, ctaLink } from '@/lib/site';

export function Nav({ solid = false }: { solid?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        solid ? 'villa-nav nav-solid' : 'villa-nav nav-over-hero'
      }`}
      aria-label="Primary"
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          <Logo compact />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors hover:text-green-700 ${
                  active ? 'text-green-700 font-medium' : 'text-stone-600'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={ctaLink.href}
            className="rounded-lg bg-green-700 text-white text-sm font-medium px-4 py-2 hover:bg-green-800 transition-colors"
          >
            {ctaLink.label}
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          className="md:hidden flex flex-col gap-1 p-2"
          aria-expanded={open}
          aria-controls="nav-mobile"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block w-5 h-0.5 bg-stone-700 transition-transform ${
              open ? 'translate-y-1.5 rotate-45' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-stone-700 transition-opacity ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-stone-700 transition-transform ${
              open ? '-translate-y-1.5 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="nav-mobile"
          className="md:hidden bg-white border-t border-stone-100 shadow-lg"
        >
          <div className="flex flex-col px-4 py-3 gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-stone-600 hover:text-green-700 py-1"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={ctaLink.href}
              className="rounded-lg bg-green-700 text-white text-sm font-medium px-4 py-2 text-center hover:bg-green-800 transition-colors"
              onClick={() => setOpen(false)}
            >
              {ctaLink.label}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
