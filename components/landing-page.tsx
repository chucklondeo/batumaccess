"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Database,
  Mail,
  Menu,
  MessageCircle,
  Search,
  Sparkles,
  X
} from "lucide-react";
import { FloatingOrbit } from "@/components/floating-orbit";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MotionCard } from "@/components/motion-card";
import { Section } from "@/components/section";
import {
  baziPalette,
  contact,
  globalMarkets,
  industries,
  LocaleKey,
  localizedHero,
  navItems,
  products,
  softwareModules,
  solutions,
  stats,
  technologies
} from "@/data/site";

export function LandingPage() {
  const [locale, setLocale] = useState<LocaleKey>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const hero = localizedHero[locale];

  const productSchema = useMemo(
    () =>
      products.map((product) => ({
        name: product.name,
        seo: product.seo,
        specs: product.specs
      })),
    []
  );

  return (
    <main className="relative overflow-hidden">
      <FloatingOrbit />
      <Header
        locale={locale}
        onLocaleChange={setLocale}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((value) => !value)}
      />

      <section className="relative min-h-screen px-5 pb-20 pt-28 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-steel backdrop-blur-2xl">
              <Sparkles className="h-4 w-4 text-gold" />
              <span>{hero.eyebrow}</span>
            </div>
            <h1 className="text-balance text-5xl font-semibold tracking-[-0.045em] text-white sm:text-7xl lg:text-8xl">
              {hero.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-steel sm:text-xl">{hero.body}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-water px-6 py-4 text-sm font-bold text-void shadow-glow transition hover:bg-gold"
              >
                {hero.cta}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a
                href="#solutions"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-6 py-4 text-sm font-bold text-white backdrop-blur-xl transition hover:border-water/60"
              >
                {hero.secondary}
                <ChevronRight className="h-4 w-4 text-gold" />
              </a>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
                  <div className="text-lg font-semibold text-white">{stat.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.22em] text-steel">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotateX: 8 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <SystemVisual />
          </motion.div>
        </div>
      </section>

      <Section
        id="solutions"
        eyebrow="Solutions"
        title="One technology stack for smart parking, transit access and safety control"
        body="Batum Technology combines field hardware, motion control, radar safety and parking software into modular solutions for international projects."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {solutions.map((solution, index) => (
            <MotionCard key={solution.title} delay={index * 0.05} className="p-6">
              <solution.icon className="mb-6 h-8 w-8 text-water" />
              <h3 className="text-xl font-semibold text-white">{solution.title}</h3>
              <p className="mt-4 text-sm leading-7 text-steel">{solution.body}</p>
            </MotionCard>
          ))}
        </div>
      </Section>

      <Section
        id="products"
        eyebrow="Products"
        title="Product modules designed for global project delivery"
        body="Products are data-driven cards. Later you can connect a CMS, WordPress API, Shopify, Strapi, Sanity or your own admin panel without redesigning the frontend."
        className="bg-white/[0.02]"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <MotionCard key={product.name} delay={index * 0.04} className="group overflow-hidden p-6">
              <div className="mb-7 flex items-center justify-between">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-water/20 bg-water/10">
                  <product.icon className="h-7 w-7 text-water" />
                </div>
                <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                  SEO: {product.seo}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-white">{product.name}</h3>
              <p className="mt-2 text-sm text-steel">{product.tag}</p>
              <div className="mt-6 space-y-3">
                {product.specs.map((spec) => (
                  <div key={spec} className="flex items-center gap-3 text-sm text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-wood" />
                    {spec}
                  </div>
                ))}
              </div>
              <div className="mt-7 h-1 rounded-full bg-gradient-to-r from-water via-wood to-gold opacity-70 transition group-hover:opacity-100" />
            </MotionCard>
          ))}
        </div>
      </Section>

      <Section
        id="software"
        eyebrow="Software"
        title="Local server + cloud platform + global payment integration"
        body="The parking software layer is built for different countries, currencies, languages, payment gateways and deployment policies."
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <MotionCard className="p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <Database className="h-7 w-7 text-gold" />
              <h3 className="text-2xl font-semibold text-white">Parking Operating System</h3>
            </div>
            <div className="space-y-4">
              {softwareModules.map((module) => (
                <div key={module.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-3">
                    <module.icon className="h-5 w-5 text-water" />
                    <span className="font-semibold text-white">{module.title}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-steel">{module.body}</p>
                </div>
              ))}
            </div>
          </MotionCard>
          <SoftwareDashboard />
        </div>
      </Section>

      <Section
        id="technology"
        eyebrow="Technology"
        title="Motion control and safety logic beneath every project"
        body="The engineering narrative is SEO-friendly and sales-friendly: control voltage, motion stability, radar safety, APIs and deployment flexibility."
        className="bg-white/[0.02]"
      >
        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <MotionCard className="p-7">
            <h3 className="text-2xl font-semibold text-white">BaZi-inspired technology palette</h3>
            <p className="mt-4 text-sm leading-7 text-steel">
              The current palette uses a five-element logic until your exact birth data is provided: water for software intelligence, metal for precision, wood for growth and fire for conversion.
            </p>
            <div className="mt-6 grid gap-3">
              {baziPalette.map((item) => (
                <div key={item.name} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                  <span className="h-5 w-5 rounded-full" style={{ backgroundColor: item.color }} />
                  <div>
                    <div className="font-semibold text-white">{item.name}</div>
                    <div className="text-xs text-steel">{item.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </MotionCard>
          <div className="grid gap-4 md:grid-cols-2">
            {technologies.map((item, index) => (
              <MotionCard key={item} delay={index * 0.04} className="p-5">
                <div className="mb-4 text-3xl font-semibold text-gold">{String(index + 1).padStart(2, "0")}</div>
                <p className="text-lg font-medium leading-7 text-white">{item}</p>
              </MotionCard>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="global"
        eyebrow="Global Market"
        title="International-first language, payment and deployment strategy"
        body="The site structure supports market-specific SEO landing pages for Hong Kong, Singapore, Middle East, Europe and Southeast Asia."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {globalMarkets.map((market, index) => (
            <MotionCard key={market.region} delay={index * 0.05} className="p-6">
              <div className="mb-6 h-28 rounded-3xl border border-white/10 bg-gradient-to-br from-water/20 via-white/[0.04] to-gold/10 p-4">
                <div className="h-full rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.35),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(246,200,95,0.22),transparent_42%)]" />
              </div>
              <h3 className="text-xl font-semibold text-white">{market.region}</h3>
              <p className="mt-3 text-sm leading-7 text-steel">{market.detail}</p>
            </MotionCard>
          ))}
        </div>
      </Section>

      <Section
        id="cases"
        eyebrow="Case / Industries"
        title="Use cases that convert technical capability into buyer confidence"
        body="Each industry block can become a future SEO landing page with cases, product lists, FAQs, downloadable specs and inquiry CTAs."
        className="bg-white/[0.02]"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {industries.map((industry, index) => (
            <MotionCard key={industry.title} delay={index * 0.05} className="p-6">
              <industry.icon className="mb-6 h-8 w-8 text-gold" />
              <h3 className="text-2xl font-semibold text-white">{industry.title}</h3>
              <p className="mt-4 text-sm leading-7 text-steel">{industry.body}</p>
            </MotionCard>
          ))}
        </div>
      </Section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Tell us your lane count, deployment market and software requirements"
        body="This static form is ready for wiring to an API route, CRM, email provider or headless CMS submission workflow."
      >
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <MotionCard className="p-7">
            <h3 className="text-2xl font-semibold text-white">{contact.company}</h3>
            <div className="mt-6 space-y-4 text-steel">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-wood" />
                <span>{contact.whatsapp}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold" />
                <a href={`mailto:${contact.email}`} className="hover:text-white">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-water" />
                <span>SEO-ready pages for product, country, industry and technology keywords.</span>
              </div>
            </div>
          </MotionCard>
          <InquiryForm />
        </div>
      </Section>

      <footer className="border-t border-white/10 px-5 py-8 text-sm text-steel sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span>Batum Technology / 巴图姆（深圳）科技有限公司</span>
          <span>Global smart parking, access control and parking payment software.</span>
        </div>
      </footer>

      <script
        type="application/json"
        id="batum-product-content-model"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </main>
  );
}

function Header({
  locale,
  onLocaleChange,
  menuOpen,
  onMenuToggle
}: {
  locale: LocaleKey;
  onLocaleChange: (locale: LocaleKey) => void;
  menuOpen: boolean;
  onMenuToggle: () => void;
}) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-void/70 px-5 py-4 backdrop-blur-2xl sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-water/30 bg-water/10 text-lg font-black text-water shadow-glow">
            B
          </div>
          <div>
            <div className="font-semibold tracking-tight text-white">Batum Technology</div>
            <div className="text-xs text-steel">巴图姆（深圳）科技有限公司</div>
          </div>
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-steel transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher locale={locale} onLocaleChange={onLocaleChange} />
          <a href="#contact" className="rounded-full bg-white px-4 py-2 text-sm font-bold text-void transition hover:bg-gold">
            Inquiry
          </a>
        </div>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] lg:hidden"
          onClick={onMenuToggle}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {menuOpen ? (
        <div className="mx-auto mt-4 grid max-w-7xl gap-3 rounded-3xl border border-white/10 bg-obsidian/95 p-4 lg:hidden">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="rounded-2xl px-4 py-3 text-steel hover:bg-white/5 hover:text-white">
              {item.label}
            </a>
          ))}
          <LanguageSwitcher locale={locale} onLocaleChange={onLocaleChange} />
        </div>
      ) : null}
    </header>
  );
}

function SystemVisual() {
  return (
    <div className="glass-card relative overflow-hidden rounded-[2rem] p-5 sm:p-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(34,211,238,0.26),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(246,200,95,0.18),transparent_34%)]" />
      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-water">Control OS</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Global Parking Node</h2>
          </div>
          <div className="rounded-full border border-wood/30 bg-wood/10 px-3 py-1 text-xs font-semibold text-wood">
            Live
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="text-5xl font-semibold tracking-tight text-white">24V</div>
            <div className="mt-2 text-sm text-steel">Low-voltage servo control</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="text-5xl font-semibold tracking-tight text-gold">99.9</div>
            <div className="mt-2 text-sm text-steel">Motion stability target</div>
          </div>
        </div>
        <div className="mt-4 rounded-3xl border border-white/10 bg-black/20 p-5">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-steel">Lane intelligence pipeline</span>
            <span className="text-water">LPR + Radar + Payment</span>
          </div>
          <div className="grid gap-3">
            {["Vehicle plate captured", "Radar safety area clear", "Payment or whitelist matched", "Barrier opens with servo curve"].map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-water/10 text-xs text-water">{index + 1}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-water via-wood to-gold"
                    initial={{ width: "0%" }}
                    animate={{ width: `${72 + index * 7}%` }}
                    transition={{ duration: 1.2, delay: 0.4 + index * 0.15 }}
                  />
                </div>
                <span className="w-44 text-xs text-steel">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SoftwareDashboard() {
  return (
    <MotionCard className="overflow-hidden p-0">
      <div className="border-b border-white/10 bg-white/[0.05] px-5 py-4">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-fire" />
          <span className="h-3 w-3 rounded-full bg-gold" />
          <span className="h-3 w-3 rounded-full bg-wood" />
        </div>
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-2">
        {[
          ["Local Server", "Offline continuity", "88%"],
          ["Cloud Platform", "Multi-site control", "94%"],
          ["Payment Gateway", "Country adapters", "76%"],
          ["Language Pack", "Market localization", "91%"]
        ].map(([title, subtitle, value]) => (
          <div key={title} className="rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">{title}</span>
              <span className="text-sm text-gold">{value}</span>
            </div>
            <p className="mt-2 text-sm text-steel">{subtitle}</p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-water to-gold" style={{ width: value }} />
            </div>
          </div>
        ))}
      </div>
    </MotionCard>
  );
}

function InquiryForm() {
  return (
    <MotionCard className="p-6 sm:p-8">
      <form className="grid gap-4 md:grid-cols-2">
        {["Name", "Company", "Email", "WhatsApp", "Country", "Interested Product"].map((field) => (
          <label key={field} className="grid gap-2 text-sm font-semibold text-white">
            {field}
            <input
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-steel focus:border-water"
              placeholder={field}
              type={field === "Email" ? "email" : "text"}
            />
          </label>
        ))}
        <label className="grid gap-2 text-sm font-semibold text-white md:col-span-2">
          Project Requirements
          <textarea
            className="min-h-36 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-steel focus:border-water"
            placeholder="Tell us about parking spaces, lanes, payment country, deployment mode and integration needs."
          />
        </label>
        <button
          type="button"
          className="group md:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-water to-gold px-6 py-4 text-sm font-black text-void transition hover:shadow-gold"
        >
          Submit Inquiry
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </button>
      </form>
    </MotionCard>
  );
}

