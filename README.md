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

## Adding or removing a page

The site has no backend, so pages are added by editing code and redeploying — there is no live "add page" button. To add a page (using the existing FAQ page as a model):

1. Add the slug to `PageSlug` and `pageSlugs` in `data/site.ts`.
2. Add a `nav.<slug>` label and a `sections.<slug>` entry to `messages` for **all 6 locales**.
3. Add a render branch for the slug in `renderPageContent` in `components/site-shell.tsx`.
4. Create `app/<slug>/page.tsx` (English route) with `<PageView locale="en" slug="<slug>" />` — the localized routes under `app/[locale]/[slug]/page.tsx` and the sitemap pick it up automatically.

To remove a page, reverse the same steps. Run `npm run build` afterwards to confirm all locales still compile, then commit the changes (including the rebuilt `out/`).

## SEO content automation

`.github/workflows/seo-daily.yml` runs `scripts/generate-seo-content.mjs` once a day. It expands `data/seo-topics.json` with new product/market keyword combinations (never inventing facts — only combining products and export markets that are already in the data files), rebuilds the site, and opens a pull request. Review and merge the PR to publish; nothing is pushed straight to `main` automatically.

## BaZi Color Note

The current palette is a configurable five-element technology palette:

- Water: cyan for software intelligence.
- Metal: gold for precision and premium value.
- Wood: green for global growth.
- Fire: orange for conversion actions.

When exact birth date and time are available, adjust `app/globals.css` CSS variables and `data/site.ts` `baziPalette`.

