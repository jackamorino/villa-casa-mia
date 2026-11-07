import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import Script from 'next/script';

import { JsonLd } from '@/components/JsonLd';
import { websiteJsonLd, localBusinessJsonLd } from '@/lib/seo';
import { siteConfig, SITE_URL } from '@/lib/site';

import './globals.css';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  icons: { icon: '/branding/villa-casa-mia-mark.svg', apple: '/branding/villa-casa-mia-logo.png' },
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'Villa Casa Mia',
    'Arquà Petrarca',
    'Colli Euganei',
    'appartamenti Arquà Petrarca',
    'cosa fare Colli Euganei',
    'yoga retreat Italia',
    'vacanza colline',
    'prenotazione diretta',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: SITE_URL,
    types: { 'application/rss+xml': `${SITE_URL}/feed.xml` },
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang="it" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <a href="#main" className="skip-link">
          Vai al contenuto
        </a>
        <JsonLd data={[websiteJsonLd(), localBusinessJsonLd()]} />
        {children}
        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.outbound-links.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
