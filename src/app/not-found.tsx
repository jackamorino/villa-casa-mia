import Link from 'next/link';

import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';

export default function NotFound() {
  return (
    <>
      <Nav solid />

      <main id="main" className="pt-20">
        <div className="flex flex-col items-center justify-center px-4 py-24 sm:py-32 text-center">
          <span className="text-6xl font-bold text-green-700">404</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 mt-4">
            Pagina non trovata
          </h1>
          <p className="text-stone-500 mt-3 max-w-md">
            La pagina che stai cercando non esiste o è stata spostata.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-green-700 px-6 py-3 text-sm font-medium text-white hover:bg-green-800 transition-colors"
          >
            Torna alla home
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
