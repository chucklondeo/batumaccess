# Batum Technology Next.js Website

Advanced technology-style enterprise website for Batum Technology / 巴图姆（深圳）科技有限公司.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content Editing

The first version keeps product, solution, software, market and contact content in:

```txt
data/site.ts
```

This makes it easy to later connect a CMS or admin backend. The product cards already include SEO keyword fields and the `/products` page outputs Product structured data.

## Language

The home hero includes a client-side language switcher for English, Chinese, Spanish, Arabic, French, Portuguese and Russian. The content architecture is ready for full route-based i18n later.

## SEO

- `app/layout.tsx` includes global metadata.
- `app/products/page.tsx` includes product metadata and Product JSON-LD.
- `app/sitemap.ts` and `app/robots.ts` are included.
- `data/seo.ts` includes Organization and WebSite JSON-LD.

## BaZi Color Note

The current palette is a configurable five-element technology palette:

- Water: cyan for software intelligence.
- Metal: gold for precision and premium value.
- Wood: green for global growth.
- Fire: orange for conversion actions.

When exact birth date and time are available, adjust `app/globals.css` CSS variables and `data/site.ts` `baziPalette`.

