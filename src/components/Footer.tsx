import Link from 'next/link';

import { siteConfig } from '@/lib/site';

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="font-semibold text-stone-800 mb-2">{siteConfig.name}</p>
            <p className="text-sm text-stone-500 leading-relaxed">
              {siteConfig.location.name}, {siteConfig.location.region}
              <br />
              {siteConfig.location.country}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-sm font-medium text-stone-700 mb-2">Esplora</p>
            <div className="flex flex-col gap-1.5">
              <Link href="/rooms" className="text-sm text-stone-500 hover:text-green-700">
                Camere
              </Link>
              <Link href="/story" className="text-sm text-stone-500 hover:text-green-700">
                La Storia
              </Link>
              <Link href="/yoga" className="text-sm text-stone-500 hover:text-green-700">
                Yoga
              </Link>
              <Link href="/blog" className="text-sm text-stone-500 hover:text-green-700">
                Blog
              </Link>
              <Link href="/book" className="text-sm text-stone-500 hover:text-green-700">
                Prenota
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-medium text-stone-700 mb-2">Contatti</p>
            <div className="flex flex-col gap-1.5 text-sm text-stone-500">
              <a href={`mailto:${siteConfig.author.email}`} className="hover:text-green-700">
                {siteConfig.author.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-200 text-center text-xs text-stone-400">
          {siteConfig.copyright}
        </div>
      </div>
    </footer>
  );
}
