# BATUM Technology — WordPress Migration: Phase 1 Audit

Scope: current-state report only, per the requested phased process (Audit →
Architecture → Design System → Build). No production changes in this phase.

## 1. Current website architecture

- **Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion,
  `lucide-react`. Repo: `chucklondeo/batumaccess`.
- **Build mode**: `next.config.mjs` sets `output: "export"` — a fully static
  export, no Node server, no database. `package.json`'s `start` script
  (`node scripts/static-server.js`) is a leftover from an earlier server-based
  iteration and is not the current deploy path.
- **Deployment**: per the site owner, Hostinger rebuilds the site from source
  on push to `main` ("Node.js/自动构建模式"). The repo no longer commits the
  built `out/` directory (removed in PR #4) — Hostinger's own build is the
  source of truth for what's live, not anything checked into git.
- **Content model**: all copy lives in `data/site.ts` (plus `data/seo-topics.json`
  and `data/seo.ts`), typed as `Record<LocaleKey, ...>` so TypeScript enforces
  every locale has every field. Editing content means editing this file and
  redeploying — there is no database, no admin UI with real persistence. An
  earlier "admin panel" (`/admin`) only writes to the browser's `localStorage`
  and offers Export/Import JSON as a manual copy-paste-into-code workflow — not
  a real CMS. This is the core motivation for the WordPress move.
- **Contact form**: posts directly to FormSubmit.co (`sales@batumaccess.com`),
  no backend. Git history shows an earlier SMTP-based inquiry flow (see
  `.env.example`, `scripts/test-smtp.js`) was abandoned in favor of FormSubmit,
  implying SMTP reliability problems on this hosting in the past — worth
  keeping in mind if a WordPress contact plugin defaults to `wp_mail()`.
- **Automation already in place**: `.github/workflows/seo-daily.yml` runs
  daily, expands `data/seo-topics.json` with new product×market keyword
  combinations via `scripts/generate-seo-content.mjs`, and opens a PR (human
  merges, nothing auto-publishes). This is Next.js/git-specific and will not
  carry over to WordPress as-is — Phase 2 needs an equivalent (Rank Math has
  no native "daily keyword rotation," so this becomes a design decision, not
  a lift-and-shift).

## 2. Current WordPress/server environment

- **Hosting**: Hostinger. Confirmed capable of both static (Next.js) and
  WordPress hosting.
- **New WordPress install**: the site owner has started a fresh WordPress
  install at a Hostinger temporary domain
  (`https://silver-hedgehog-360840.hostingersite.com/`), not yet connected to
  `batumaccess.com`. **I cannot inspect it** — this sandbox's network egress
  is allowlisted and blocks `*.hostingersite.com` (confirmed via a failed
  fetch), and I have no wp-admin credentials for it. Its current theme,
  active plugins, WordPress/PHP version, and whether a "starter template" was
  picked during Hostinger's onboarding wizard are all unknown until the site
  owner reports them or grants access.
- **`batumaccess.com` (production)**: still the live Next.js site as of the
  last check in this conversation. DNS/SSL/backup status for either the
  production domain or the new temporary WordPress install: **unknown, not
  inspectable from here.**
- A WordPress theme (`wordpress-theme/batum-technology/`) was already built
  in this repo in an earlier round, targeting **plain PHP, no page builder,
  no ACF** (see §7 below on why this doesn't match the new brief's Bricks +
  ACF Pro direction).

## 3. Existing content inventory (from `data/site.ts`)

- **4 products**, each with: name, summary, 3 spec bullets, 1 datasheet link
  (placeholder `.txt` files in `public/docs/`), 3 SEO keywords, category:
  - `servo-barrier-gate` (category: servo-barrier)
  - `servo-door-operator` (category: door-operator)
  - `anti-smash-radar` (category: radar)
  - `access-control-accessories` (category: accessory)
  - This is a **much smaller catalog** than the new brief's ~14 named
    products/solutions (Fast Speed Barrier Gate, ETC Highway Barrier Gate,
    Platform Screen Door, AFC Gate Mechanism, etc.) — Phase 2/4 needs new
    product content, not just a schema migration of the existing 4.
- **4 Solutions cards**, **4 Case cards**, **6 Software Feature cards**, **3
  FAQ items** — all short marketing copy, not the deep technical-spec content
  the new brief calls for (Technical Specifications repeater, certifications,
  cycle life, torque, protection rating, etc. don't exist in the current data
  at all).
- **8 locales**: en (default), zh-hant, es, vi, ms, th, ja, ko — full parity
  across all fields, enforced by TypeScript.
- **8 SEO Hub keyword phrases** (`data/seo-topics.json`), auto-rotated daily
  per §1.

## 4. Existing URL structure

Pattern: `/{slug}/` for English (default locale), `/{locale}/{slug}/` for the
other 7. Slugs: `solutions`, `products`, `cases`, `software`, `about`,
`contact`, `faq`, `seo-hub`, plus `/admin/` (English-only, not localized).
78 static pages total (7 locales × 9 routes + 8 English-only + home).

The new brief's proposed IA (`/products/`, `/products/barrier-gate/`,
`/solutions/`, `/solutions/highway-etc/`, `/applications/`, `/projects/`,
`/technology/`, `/downloads/`, `/blog/`) is **structurally different** —
individual product/solution detail pages don't exist today (current
`/products/` is one page listing all 4 products inline, not a hub linking to
per-product URLs). This is a real information-architecture change, not just
a re-skin.

## 5. Existing SEO signals (migration-sensitive)

- `app/sitemap.ts` — auto-generated XML sitemap covering all locale × slug
  combinations.
- `app/robots.ts` — allows all, points to the sitemap.
- `hreflang` alternates (`<link rel="alternate" hreflang="...">`) on every
  route for all 8 languages + `x-default`, added recently (PR #6).
- JSON-LD: `Organization`, `WebSite`, `FAQPage` (`data/seo.ts`).
- **Unknown**: actual Google Search Console / Analytics data, current
  keyword rankings, indexed page count, or any backlinks — I have no access
  to Search Console, Analytics, Ahrefs, Semrush, or Baidu tools from this
  session. The brief's Phase 1 ask for "current performance" and "backlink-
  sensitive pages" **cannot be filled in without the site owner pulling that
  data** (or granting access to those accounts).

## 6. Current performance

**Not measurable from here** — this sandbox has no way to load
`batumaccess.com` in a browser or run Lighthouse against it (only an
allowlisted set of domains is reachable). If this matters before Phase 2,
please run PageSpeed Insights / Lighthouse yourself and share the report.

## 7. Migration risks

- **SEO continuity**: URL structure is changing (flat pages → per-product/
  per-solution detail pages). Every changed URL needs a 301 redirect from the
  old path, or the site loses whatever ranking/indexing it already has
  across 78 pages × 8 languages. This needs explicit mapping in Phase 2, not
  an afterthought.
- **Multilingual continuity**: the current site's 8-language parity is
  enforced by the TypeScript compiler; Polylang's model (one manually
  translated post per language, edited in `wp-admin`) has no such
  enforcement. Going from "TypeScript won't compile if a locale is missing a
  field" to "an editor might just forget to translate a new product" is a
  real workflow regression the content team needs to own.
- **Premium plugin dependency & cost**: Bricks Builder, ACF Pro, WP Rocket
  (or LiteSpeed Cache), and Fluent Forms Pro-tier features are **paid
  products**. I cannot purchase licenses, and I have no visibility into
  whether the site owner already holds any of these licenses. This blocks
  Phase 2 architecture decisions until confirmed (see Open Questions below).
- **Contact form deliverability**: git history shows this domain moved away
  from `wp_mail()`/SMTP once already (see §1). A WordPress form plugin
  defaulting to `wp_mail()` risks repeating that problem; keeping
  FormSubmit.co (already proven) or another transactional-email provider is
  lower-risk than trusting Hostinger's PHP mail.
- **No staging environment exists yet**. The brief requires one
  (`staging.batumaccess.com` or similar) before any production cutover — this
  needs to be provisioned on the Hostinger account, which requires the site
  owner's action (no access from here).
- **Tooling/access ceiling for this session**: I can write and version-control
  PHP/plugin code, ACF field-group JSON, documentation, and migration plans.
  I **cannot**: log into `wp-admin` or hPanel, install/activate plugins,
  purchase licenses, configure DNS/Cloudflare, connect Google Search
  Console/Analytics, or run a live Lighthouse test — all of those need either
  the site owner's direct action, or the site owner handing over specific
  credentials (a decision with real security weight I won't assume without
  being asked explicitly).

## Open questions before Phase 2 (Architecture)

1. **Bricks Builder + ACF Pro** — does the site owner already hold licenses
   for these? If not, is buying them (~$260 one-time for Bricks lifetime,
   ~$150/yr for ACF Pro relevant tier) approved, or should Phase 2 design
   around the **free stack already built** (native WP custom post types +
   native meta boxes, no page builder — this is what
   `wordpress-theme/batum-technology/` already does) instead?
2. **Which WordPress install is the target** — the new temporary
   `silver-hedgehog-360840.hostingersite.com` site, or a fresh install to be
   made later? What's currently active on it (default theme? a picked
   starter template? any plugins?) — needed before Phase 2 can assume a
   starting point.
3. **Content scope** — the new brief lists ~14 named products plus deep
   technical specs (torque, cycle life, protection rating, certifications,
   etc.) that don't exist in the current 4-product dataset. Is writing this
   new content in scope for this engagement, or will the site owner supply
   it once the CPT/field structure exists?
4. **Staging domain** — can the site owner provision
   `staging.batumaccess.com` (or similar) on Hostinger, so Phase 4 build/test
   work has somewhere to run before touching the live domain?
