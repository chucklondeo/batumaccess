# BATUM Technology — WordPress Migration: Phase 2 Architecture

Decisions locked in from the Phase 1 open questions: **no paid plugins**
(no Bricks Builder, no ACF Pro) — native WordPress custom post types, native
meta boxes, and a hand-rolled repeater field (vanilla JS, no dependency) take
their place. **Content is placeholder** for now — the 14 products get seeded
with structurally-correct placeholder data so the site owner can replace the
text/specs/images per product without touching code.

## Plugin stack (free only)

| Concern | Choice | Why |
|---|---|---|
| Business logic (CPTs, taxonomies, fields, REST) | **`batum-core`** — custom plugin, this repo | Keeps content/business logic independent of the theme, per the "don't lose data if the theme changes" requirement |
| Page builder | **None** — plain PHP templates | No paid page builder; keeps output lightweight and fully version-controlled |
| Custom fields / repeaters | **Native meta boxes + a small hand-rolled repeater UI** in `batum-core` | ACF Pro's repeater field is the one paid feature this design leans on hardest; the plugin ships an equivalent free implementation instead |
| SEO | **Rank Math** (free tier) | Sitemap, per-post SEO title/description, Organization/Product/Article/FAQ schema, breadcrumbs |
| Multilingual | **Polylang** (free) | Per-language content, as scoped in Phase 1 |
| Caching | **LiteSpeed Cache** (free) if Hostinger's stack is LiteSpeed-based, else leave to a later performance pass | Confirm Hostinger's web server before installing — wrong cache plugin does nothing |
| Contact form | **Native form → FormSubmit.co**, matching the current site (see Phase 1 risk about `wp_mail()`) | Zero plugin dependency, already proven reliable on this domain |
| Forms plugin fallback | Fluent Forms (free tier) only if the native FormSubmit form turns out insufficient | Not installed by default — avoid plugin creep per the brief's own "don't stack lots of plugins" instruction |

## Custom post types (`batum-core` plugin)

| CPT | Slug | Purpose | Key fields |
|---|---|---|---|
| `batum_product` | `/products/{slug}/` | Product detail pages | model, short description (excerpt), gallery, video URL, highlights, **specs repeater** (parameter/value/unit), datasheet/manual/CAD PDFs, certifications, applications, related products, SEO fields |
| `batum_solution` | `/solutions/{slug}/` | Solution detail pages | challenge, approach, recommended products (relates to `batum_product`), advantages, diagram image |
| `batum_project` | `/projects/{slug}/` | Case studies | country/city, customer type (anonymizable), application, products used, quantity, date, problem/solution/result, gallery |
| `batum_download` | `/downloads/{slug}/` | Download center entries | file (media library), file type, related product |
| Blog | native WordPress **Posts** | `/blog/{slug}/` | Standard WP post — no new CPT needed, Rank Math handles Article schema natively |

## Taxonomies

- `product_category` (on `batum_product`) — pre-seeded with the 11 categories
  from the brief (§8): Barrier Gate Systems, Barrier Gate Controllers, Barrier
  Gate Mechanisms, Servo Motor Controllers, Pedestrian Gate Systems, AFC Gate
  Systems, Rail Transit Systems, Platform Screen Door Systems, Automatic Door
  Controllers, LPR & Parking Systems, Customized Motion Control — editors can
  add more later.
- `product_series` (on `batum_product`) — free text, e.g. product line names.
- `applications` (shared across `batum_product`, `batum_solution`,
  `batum_project`) — Highway ETC, Smart Parking, Commercial Parking, Metro
  AFC, Rail Transit, Platform Screen Door, Airport Access, Industrial
  Automation, Commercial Building, OEM/ODM.
- `download_category` (on `batum_download`) — Datasheets, Manuals,
  Catalogues, Certificates, CAD Drawings, Software, Firmware, Brochures.

## URL structure

```
/                       homepage
/products/              archive (all products)
/products/{slug}/       single product
/solutions/             archive
/solutions/{slug}/      single solution
/applications/          taxonomy archive (applications terms)
/projects/              archive
/projects/{slug}/       single project
/technology/            static Page
/downloads/             archive with search/filter
/blog/                  native post archive
/about/                 static Page
/contact/               static Page
```

No query-string IDs, no date-based permalinks — matches the brief's §15.

## SEO structure

- Rank Math handles: SEO title/meta description per post/product, canonical
  URLs, XML sitemap, robots.txt, breadcrumbs, OpenGraph/Twitter cards,
  redirections, 404 monitor.
- Schema: Rank Math covers Organization/WebSite/Article/Breadcrumb natively.
  `batum-core` adds a `Product` schema output on `single-batum_product.php`
  (price/offer fields are intentionally omitted — this is a B2B inquiry
  site, not e-commerce) and an `FAQPage` schema block usable on any page via
  a shortcode, matching the FAQ pattern already proven on the Next.js site.
- REST API: every CPT registers with `show_in_rest => true` (already how
  `batum-core` is written), so `/wp-json/wp/v2/batum_product` etc. are
  available for future automation (n8n/Zapier/Claude Code), gated by
  WordPress's normal application-password auth — nothing is publicly
  writable without authentication.

## What's deferred (not blocking Phase 4 placeholder build)

- Staging domain — not yet provisioned (open question from Phase 1).
- Which WordPress install is the real target — still only the temporary
  `hostingersite.com` install, unverified from this session.
- AI SEO Agent workflow (§17–18 of the brief) — draft-only automation
  reading Search Console, this needs Search Console access first; noted as a
  post-launch phase, not part of this build.
- Role-based admin access (Product Manager / Content Manager / Sales) — real
  but not needed to validate the placeholder architecture; add once real
  staff accounts exist.
