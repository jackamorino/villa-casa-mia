This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Website styling and local guides

Tailwind 4 is compiled through `@tailwindcss/postcss` in `postcss.config.mjs`.
After pulling dependency changes, run `npm install` to refresh the lockfile,
then `npm run typecheck` and `npm run build` before deploying to Vercel.

The `/explore` section contains local destination guides in
`src/lib/guides.ts`. Each guide has a dedicated server-rendered page,
metadata, Article structured data, visible questions and answers, links to
primary sources, and a sitemap entry. Keep practical details current and
avoid publishing unverified opening hours or journey times.

Brand assets are in `public/branding`. The header uses a compact vector
mark in `src/components/Logo.tsx`; the full illustrated logo is available
as `public/branding/villa-casa-mia-logo.png`.

The homepage uses the hero photograph and apartment photographs configured
in Sanity. If no hero photograph is configured, it displays an abstract
landscape illustration, not a photograph of the property. Add genuine
property imagery before launch. Booking integrations remain a separate
workstream; the current booking code has not been migrated to Hospitable.
