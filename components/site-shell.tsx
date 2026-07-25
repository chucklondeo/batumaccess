import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronDown, Download, Mail, MessageCircle } from "lucide-react";
import {
  caseCards,
  contact,
  iconMap,
  localePath,
  locales,
  LocaleKey,
  messages,
  PageSlug,
  faqs,
  products,
  seoTopics,
  solutionCards
} from "@/data/site";
import { InquiryForm } from "@/components/inquiry-form";

const primaryNav: PageSlug[] = ["solutions", "products", "cases", "software", "about", "contact", "faq"];

export function SiteShell({ locale, children }: { locale: LocaleKey; children: React.ReactNode }) {
  const copy = messages[locale];

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-slate-200/10 bg-void/85 px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Link href={localePath(locale)} className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-water/30 bg-water/10 font-black text-water">
              B
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">Batum Technology</span>
              <span className="block text-xs text-steel">巴圖姆（深圳）科技有限公司</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            <Link className="text-sm text-steel hover:text-white" href={localePath(locale)}>
              {copy.nav.home}
            </Link>
            {primaryNav.map((slug) => (
              <Link key={slug} className="text-sm text-steel hover:text-white" href={localePath(locale, slug)}>
                {copy.nav[slug]}
              </Link>
            ))}
            <Link className="text-sm text-water hover:text-white" href={localePath(locale, "seo-hub")}>
              {copy.nav["seo-hub"]}
            </Link>
            <Link className="text-sm text-water hover:text-white" href="/admin/">
              {copy.nav.admin}
            </Link>
          </nav>

          <LanguageLinks locale={locale} />

          <nav className="flex w-full gap-3 overflow-x-auto pt-2 lg:hidden">
            {[...primaryNav, "seo-hub" as PageSlug].map((slug) => (
              <Link key={slug} className="shrink-0 rounded-full border border-white/10 px-3 py-2 text-xs text-steel" href={localePath(locale, slug)}>
                {copy.nav[slug]}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {children}

      <footer className="border-t border-white/10 px-5 py-8 text-sm text-steel">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span>{contact.company}</span>
          <span>{contact.email} · {contact.phone}</span>
        </div>
      </footer>
    </main>
  );
}

function LanguageLinks({ locale }: { locale: LocaleKey }) {
  const current = locales.find((item) => item.key === locale) ?? locales[0];

  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white">
        {current.native}
        <ChevronDown className="h-4 w-4 text-steel transition group-open:rotate-180" />
      </summary>
      <div className="absolute right-0 mt-3 grid min-w-48 gap-1 rounded-2xl border border-white/10 bg-[#07111f] p-2 shadow-2xl">
        {locales.map((item) => (
          <Link
            key={item.key}
            href={localePath(item.key)}
            className={`rounded-xl px-3 py-2 text-sm ${
              item.key === locale ? "bg-water text-void" : "text-steel hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {item.native}
          </Link>
        ))}
      </div>
    </details>
  );
}

export function HomeView({ locale }: { locale: LocaleKey }) {
  const copy = messages[locale];

  return (
    <SiteShell locale={locale}>
      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-water">{copy.homeKicker}</p>
            <h1 className="max-w-5xl text-balance text-5xl font-semibold tracking-[-0.04em] text-white sm:text-7xl">
              {copy.heroTitle}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-steel">{copy.heroBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="inline-flex items-center gap-2 rounded-full bg-water px-6 py-4 text-sm font-bold text-void" href={localePath(locale, "contact")}>
                {copy.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-6 py-4 text-sm font-bold text-white" href={localePath(locale, "products")}>
                {copy.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {products.map((product) => {
                const Icon = iconMap[product.icon];
                return (
                  <Link key={product.id} href={localePath(locale, "products")} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-1 hover:border-water/40">
                    <Icon className="mb-4 h-7 w-7 text-water" />
                    <h2 className="font-semibold text-white">{product.name[locale]}</h2>
                    <p className="mt-2 text-sm leading-6 text-steel">{product.summary[locale]}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <PageSection locale={locale} slug="solutions" compact />
      <PageSection locale={locale} slug="products" compact />
    </SiteShell>
  );
}

export function PageView({ locale, slug }: { locale: LocaleKey; slug: PageSlug }) {
  return (
    <SiteShell locale={locale}>
      <PageSection locale={locale} slug={slug} />
    </SiteShell>
  );
}

function PageSection({ locale, slug, compact = false }: { locale: LocaleKey; slug: PageSlug; compact?: boolean }) {
  const copy = messages[locale];
  const section = copy.sections[slug];
  const light = slug === "products" || slug === "cases";

  return (
    <section className={`px-5 ${compact ? "py-14" : "py-20"} sm:px-8 lg:px-12 ${light ? "light-section" : ""}`}>
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-water">{section.kicker}</p>
        <h1 className={`max-w-5xl text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-6xl ${light ? "text-void" : "text-white"}`}>
          {section.title}
        </h1>
        <p className={`mt-5 max-w-3xl text-base leading-8 sm:text-lg ${light ? "text-slate-600" : "text-steel"}`}>
          {section.body}
        </p>
        <div className="mt-10">{renderPageContent(locale, slug)}</div>
      </div>
    </section>
  );
}

function renderPageContent(locale: LocaleKey, slug: PageSlug) {
  const copy = messages[locale];

  if (slug === "products") return <ProductGrid locale={locale} />;
  if (slug === "solutions") return <CardGrid cards={solutionCards} />;
  if (slug === "cases") return <CardGrid cards={caseCards} />;
  if (slug === "software") return <SoftwareContent />;
  if (slug === "about") return <AboutContent locale={locale} />;
  if (slug === "contact") return <ContactContent locale={locale} />;
  if (slug === "faq") return <FaqContent locale={locale} />;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {seoTopics.map((topic) => (
        <article key={topic} className="glass-card rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-white">{topic}</h2>
          <p className="mt-4 text-sm leading-7 text-steel">
            {copy.sections["seo-hub"].body} {topic}.
          </p>
        </article>
      ))}
    </div>
  );
}

function FaqContent({ locale }: { locale: LocaleKey }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {faqs[locale].map((item) => (
        <article key={item.q} className="glass-card rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-white">{item.q}</h2>
          <p className="mt-4 text-sm leading-7 text-steel">{item.a}</p>
        </article>
      ))}
    </div>
  );
}

function CardGrid({ cards }: { cards: ReadonlyArray<{ icon: keyof typeof iconMap; title: string; body: string }> }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = iconMap[card.icon];
        return (
          <article key={card.title} className="glass-card rounded-3xl p-6">
            <Icon className="mb-5 h-8 w-8 text-gold" />
            <h2 className="text-2xl font-semibold text-white">{card.title}</h2>
            <p className="mt-4 text-sm leading-7 text-steel">{card.body}</p>
          </article>
        );
      })}
    </div>
  );
}

function ProductGrid({ locale }: { locale: LocaleKey }) {
  const copy = messages[locale];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => {
        const Icon = iconMap[product.icon];
        return (
          <article key={product.id} className="glass-card rounded-3xl p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <Icon className="h-9 w-9 text-water" />
              <span className="rounded-full border border-water/20 bg-water/10 px-3 py-1 text-xs font-semibold text-water">
                {copy.productCategories[product.category]}
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-white">{product.name[locale]}</h2>
            <p className="mt-3 text-sm leading-7 text-steel">{product.summary[locale]}</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-200">
              {product.specs[locale].map((spec) => (
                <li key={spec} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-wood" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
            <a className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-void" href={product.document} download>
              <Download className="h-4 w-4" />
              {copy.download}
            </a>
          </article>
        );
      })}
    </div>
  );
}

function SoftwareContent() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {["Local server deployment", "Cloud platform operation", "Global payment integration", "Multilingual UI", "API integration", "Parking data reporting"].map((item) => (
        <article key={item} className="glass-card rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-white">{item}</h2>
          <p className="mt-4 text-sm leading-7 text-steel">Structured for integrators, distributors and property operators that need reliable parking workflows.</p>
        </article>
      ))}
    </div>
  );
}

function AboutContent({ locale }: { locale: LocaleKey }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="glass-card rounded-3xl p-7">
        <h2 className="text-2xl font-semibold text-white">{contact.company}</h2>
        <p className="mt-5 text-sm leading-8 text-steel">{messages[locale].sections.about.body}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {["Drive control R&D", "Hardware manufacturing", "Low-voltage servo systems", "Safety-first product design"].map((item) => (
          <div key={item} className="glass-card rounded-3xl p-6">
            <h3 className="text-xl font-semibold text-white">{item}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactContent({ locale }: { locale: LocaleKey }) {
  const copy = messages[locale];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
      <div className="glass-card rounded-3xl p-7">
        <h2 className="text-2xl font-semibold text-white">{contact.company}</h2>
        <p className="mt-4 text-sm leading-7 text-steel">{copy.contactIntro}</p>
        <div className="mt-6 space-y-4 text-steel">
          <a className="flex items-center gap-3 hover:text-white" href={contact.whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle className="h-5 w-5 text-wood" /> WhatsApp: {contact.phone}
          </a>
          <span className="flex items-center gap-3"><MessageCircle className="h-5 w-5 text-water" /> WeChat: {contact.wechat}</span>
          <a className="flex items-center gap-3 hover:text-white" href={`mailto:${contact.email}`}>
            <Mail className="h-5 w-5 text-gold" /> {contact.email}
          </a>
        </div>
      </div>
      <InquiryForm copy={copy} locale={locale} />
    </div>
  );
}
