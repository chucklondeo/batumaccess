# BATUM Technology WordPress site (v2)

Two pieces, per the "content survives a theme change" requirement:

- **`batum-core`** (plugin) — all business logic: Products, Solutions,
  Projects, Downloads, their taxonomies and fields, REST API support, and
  Product/FAQ schema. Install this first.
- **`batum-technology`** (theme) — presentation only. No page builder, no
  ACF — every "no paid plugins" decision from Phase 1 is reflected here.

See `docs/wordpress-migration/` in the repo root for the audit and
architecture write-ups behind these decisions.

## Install order

1. **Plugin first**: zip the `batum-core` folder itself (so `batum-core.php`
   sits at the zip's root), then in `wp-admin` → **Plugins → Add New Plugin
   → Upload Plugin**, upload it, and **Activate**.
2. **Theme second**: zip the `batum-technology` folder, then **Appearance →
   Themes → Add New Theme → Upload Theme**, upload, **Activate**. (The theme
   shows an admin notice if the plugin isn't active yet — activate the
   plugin first to avoid it.)
3. Install and activate **Polylang** (free) for multi-language support.
4. Install and activate **Rank Math** (free) for SEO — sitemap, per-page SEO
   title/description, Organization/Article schema, redirections, breadcrumbs.
   The theme prints no title/meta tags of its own, so there's nothing to
   conflict with.
5. No page builder, no ACF, no Contact Form 7 needed — the Contact page
   template posts straight to `sales@batumaccess.com` via FormSubmit.co (the
   same service the original Next.js site used, chosen specifically because
   this domain's `wp_mail()`/SMTP delivery was unreliable in the past — see
   the Phase 1 audit).

## What's editable where

| Content | Where in wp-admin |
|---|---|
| Products (name, model, specs table, gallery, video, datasheet/manual/CAD, certifications, related products/solutions) | **Products** menu → Add New Product |
| Solutions (challenge/approach/architecture/advantages, recommended products) | **Solutions** menu → Add New Solution |
| Projects / case studies (country, customer, problem/solution/result, gallery) | **Projects** menu → Add New Project |
| Downloads (any file + category + related product) | **Downloads** menu → Add New Download |
| Blog / Technology Insights articles | **Posts** — native WordPress posts |
| Home / About / Technology / Contact page text | **Pages** — edit like any normal page |
| Product/Solution/Project/Download categories & Applications | Each CPT's own taxonomy screen (pre-seeded with the categories from the brief; add more anytime) |
| SEO title, meta description, sitemap | Rank Math, per post/page |
| Company inquiry email | `batum-core/batum-core.php` → `BATUM_INQUIRY_EMAIL` constant (code change) |

Every custom post type: **Add New** to create, **Trash** to remove — no code
change or redeploy needed.

### The Specs table (the ACF-Pro-repeater replacement)

Each Product's "Technical Specifications" meta box is a free-form table:
click **+ Add Row**, fill in Parameter / Value / Unit (e.g. `Rated Voltage |
24 | VDC`), repeat as needed. This is `batum-core`'s hand-rolled equivalent
of ACF Pro's repeater field — same editing experience, no license required.

### Create the pages

Under **Pages → Add New**:

| Page title | Slug | Template |
|---|---|---|
| About Batum | `about` | Default template |
| Technology | `technology` | Technology |
| Contact | `contact` | Contact |

**Do not** create Pages titled/slugged `products`, `solutions`, `projects`,
or `downloads` — those URLs are already handled by the plugin's custom post
type archives (`/products/`, `/solutions/`, `/projects/`, `/downloads/`);
creating a Page with the same slug will conflict with it.

The homepage (`/`) is handled automatically by the theme (`front-page.php`).
The blog (`/blog/`) needs its "Posts page" set under **Settings → Reading**
if you want a dedicated `/blog/` URL rather than the homepage showing posts.

### Set up the menu

**Appearance → Menus** → build a menu with: Home, Products, Solutions,
Technology, Applications *(optional — links to a taxonomy term, or skip)*,
Projects, Downloads, Blog, About Batum, Contact. Assign it to **Primary
Menu**. Until you do this, the theme shows a matching fallback menu
automatically, so the site is navigable from the moment the theme activates.

### Placeholder content

**Tools → BATUM Seed Content** creates the 14 products named in the brief
(24V Low Voltage Servo Controller, Fast Speed Barrier Gate, ETC Highway
Barrier Gate, etc.) as **drafts** with placeholder descriptions and a couple
of placeholder spec rows, in their correct categories — so every template
(archive, single, homepage "Featured Products") can be reviewed end-to-end
before real product content exists. Safe to click more than once — it skips
any title that already exists. Replace the placeholder text, add real specs,
photos, and datasheets, then publish each one for real.

### Multi-language content

Polylang's model is one translated post per language, edited from its own
`wp-admin` screen — it does not auto-translate. `batum-core` and the theme
both register their post types/taxonomies as Polylang-translatable and
pre-register the theme's button/form strings under **Languages →
Translations**. Start with English; add other languages in **Languages →
Languages** whenever you're ready — nothing in the code assumes a fixed
language list.

## Notes

- Deliberately **no Bricks Builder, no ACF Pro, no Elementor** — every
  custom field and repeater is hand-rolled in `batum-core`, per the "no paid
  plugins, keep it universal" decision. See
  `docs/wordpress-migration/phase-2-architecture.md` for the full plugin
  stack and why.
- Design direction: white/off-white base with graphite-black type, dark
  navy sections for ~20–30% of each page, electric-blue accent — see
  `batum-technology/style.css` for the token list (`--white`, `--navy`,
  `--servo-blue`, etc).
- Every PHP file in both the plugin and theme passes `php -l`, but **neither
  has been run against a live WordPress install** — this sandbox has no
  outbound access to wordpress.org to download WordPress core for an
  end-to-end test. Please do a full pass (desktop + mobile, every page type,
  the contact form, the seed-content button) on your actual Hostinger
  WordPress site and report anything that looks wrong.
- REST API is open by default for every custom post type
  (`/wp-json/wp/v2/batum_product` etc.) for future automation, gated by
  WordPress's normal authenticated-write / public-read behavior — nothing is
  publicly writable without an application password.
