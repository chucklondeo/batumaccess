# Batum Technology WordPress theme

Replaces the earlier Next.js static site with a normal WordPress site, so staff can
add products and content from `wp-admin` without touching code.

## What's editable where

| Content | Where in wp-admin |
|---|---|
| Products (name, description, specs, category, datasheet upload, photo) | **Products** menu → Add New Product |
| Solutions cards | **Solutions** menu → Add New Solution |
| Case study cards | **Cases** menu → Add New Case |
| Software feature cards | **Software Features** menu → Add New Software Feature |
| FAQ entries | **FAQ** menu → Add New FAQ Item |
| About / Contact / SEO Hub page text | **Pages** — normal WordPress pages, edit like any page |
| Company email shown in the footer / contact form target | `inc/theme-setup.php` → `BATUM_INQUIRY_EMAIL` constant (code change) |

Products, Solutions, Cases, Software Features and FAQ are **custom post types**: use
**Add New** to create one, **Trash** to remove one. Nothing needs a code change or a
redeploy — WordPress saves straight to its database and the page updates immediately.

## Install

1. Zip the `batum-technology` folder (the folder itself, so `style.css` sits at the
   zip's root — not this `README.md`).
2. In `wp-admin` → **Appearance → Themes → Add New Theme → Upload Theme**, upload the
   zip, then **Activate**.
3. Install and activate the **Polylang** plugin (Plugins → Add New → search
   "Polylang") for multi-language support.
4. Install and activate **Contact Form 7** is *not* required — the Contact page
   template posts straight to `sales@batumaccess.com` via FormSubmit.co, the same
   service the previous Next.js site used. The first submission after activating a
   new domain may need a confirmation click sent to that inbox — that's FormSubmit's
   normal one-time verification, not a bug.

### Create the pages

Under **Pages → Add New**, create these pages. Set the **slug** (Permalink) exactly
as shown, and pick the matching template under **Page Attributes → Template**:

| Page title | Slug | Template |
|---|---|---|
| About | `about` | Default template |
| Contact | `contact` | Contact |
| Solutions | `solutions` | Solutions |
| Cases | `cases` | Cases |
| Software | `software` | Software |
| FAQ | `faq` | FAQ |
| SEO Hub | `seo-hub` | Default template |

The homepage (`/`) is handled automatically by the theme (`front-page.php`) — no
page needs to be created or set as the static homepage for it to work.

### Set up the menu

**Appearance → Menus** → create a menu, add the pages above plus a link to
**Products** (the Products archive, listed under Custom Links as `/products/`), then
assign it to the **Primary Menu** location.

### Add the first products

**Products → Add New Product**:
- Title = product name, Excerpt = short summary, main editor = full description
- Pick a **Product Category** in the sidebar (Servo Barrier / Door Operator / Radar /
  Accessories — pre-created by the theme)
- Fill in **Specs** (one per line) and **SEO keywords** in the Product Details box
- Click **Select or upload file** to attach the datasheet — this uses the real
  WordPress media library, so the file persists and downloads correctly (unlike the
  old Next.js admin panel's browser-only preview)
- Set a **Featured Image** for the product photo

### Multi-language content

Polylang's model is one translated post per language, edited from its own `wp-admin`
screen — it does not auto-translate. After activating Polylang and adding your
languages (the previous site covered English, Traditional Chinese, Spanish,
Vietnamese, Malay, Thai, Japanese and Korean), Polylang adds a language column to
every post list and a "+" icon to create each language's version of a Product,
Solution, Case, Software Feature, FAQ item, or Page. The theme has already
registered these post types as translatable and pre-registered its button/form
strings under **Languages → Translations** for you to fill in per language.

## Notes

- The theme is plain PHP (no build step, no Node dependency) — this matches how
  Hostinger's WordPress hosting normally works.
- Visual styling reuses the previous site's dark "five-element" color palette
  (`style.css`), but is a fresh, simpler implementation — animations and some finer
  layout details from the Next.js site were not reproduced 1:1.
- This theme was syntax-checked (`php -l`) on every file, but **has not been run
  against a live WordPress install** — this sandbox has no outbound access to
  wordpress.org to download WordPress core for a real test. Please do a pass through
  every page after activating on your actual Hostinger WordPress site and report
  anything that looks wrong.
