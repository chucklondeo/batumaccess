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

const uiCopy: Record<
  LocaleKey,
  {
    nav: string[];
    inquiry: string;
    sections: {
      solutions: [string, string, string];
      products: [string, string, string];
      software: [string, string, string];
      technology: [string, string, string];
      global: [string, string, string];
      cases: [string, string, string];
      contact: [string, string, string];
    };
    productSupport: string;
    baziTitle: string;
    baziBody: string;
    contactNote: string;
    formFields: string[];
    formMessage: string;
    formPlaceholder: string;
    submit: string;
    footer: string;
  }
> = {
  en: {
    nav: ["Solutions", "Products", "Software", "Technology", "Global", "Contact"],
    inquiry: "Inquiry",
    sections: {
      solutions: ["Solutions", "One technology stack for smart parking, transit access and safety control", "Batum Technology combines field hardware, motion control, radar safety and parking software into modular solutions for international projects."],
      products: ["Products", "Product modules designed for global project delivery", "Product content is structured for future CMS or admin upload without redesigning the frontend."],
      software: ["Software", "Local server + cloud platform + global payment integration", "The parking software layer is built for different countries, currencies, languages, payment gateways and deployment policies."],
      technology: ["Technology", "Motion control and safety logic beneath every project", "The engineering narrative supports control voltage, motion stability, radar safety, APIs and deployment flexibility."],
      global: ["Global Market", "International-first language, payment and deployment strategy", "The site structure supports market-specific landing pages for Hong Kong, Singapore, Middle East, Europe and Southeast Asia."],
      cases: ["Case / Industries", "Use cases that convert technical capability into buyer confidence", "Each industry block can become a future landing page with cases, product lists, FAQs, specs and inquiry CTAs."],
      contact: ["Contact", "Tell us your lane count, deployment market and software requirements", "This form is ready for wiring to an API route, CRM, email provider or headless CMS submission workflow."]
    },
    productSupport: "Structured content ready",
    baziTitle: "BaZi-inspired technology palette",
    baziBody: "Calibrated from lunar 1986-01-19, 06:30 in Yongding, Longyan: a wood-fire leaning profile is balanced with water blue, metal gold, silver white and restrained fire accents for a steadier international technology brand.",
    contactNote: "Product, country, industry and technology pages are prepared for search optimization.",
    formFields: ["Name", "Company", "Email", "WhatsApp", "Country", "Interested Product"],
    formMessage: "Project Requirements",
    formPlaceholder: "Tell us about parking spaces, lanes, payment country, deployment mode and integration needs.",
    submit: "Submit Inquiry",
    footer: "Global smart parking, access control and parking payment software."
  },
  zh: {
    nav: ["解决方案", "产品", "软件", "技术", "全球市场", "联系"],
    inquiry: "询盘",
    sections: {
      solutions: ["解决方案", "智慧停车、轨道交通门禁与安全控制的一体化技术栈", "巴图姆科技将现场硬件、运动控制、安全雷达和停车软件组合成面向海外项目的模块化方案。"],
      products: ["产品中心", "面向全球项目交付的产品模块", "产品内容采用结构化方式，后续接入 CMS 或后台上传时不需要重做前端。"],
      software: ["软件平台", "本地服务器 + 云平台 + 全球支付融合", "停车软件支持不同国家、货币、语言、支付通道和部署政策。"],
      technology: ["核心技术", "贯穿每个项目的运动控制与安全逻辑", "技术表达围绕低压控制、运动稳定、防砸防夹雷达、API 和部署灵活性展开。"],
      global: ["全球市场", "优先考虑国际语言、支付和部署策略", "站点结构支持香港、新加坡、中东、欧洲、东南亚等市场的独立落地页。"],
      cases: ["案例 / 行业", "用行业场景建立海外客户信任", "每个行业模块后续都可以扩展为案例、产品清单、FAQ、规格资料和询盘入口。"],
      contact: ["联系", "告诉我们车道数量、部署国家和软件需求", "表单后续可以接入 API、CRM、邮件系统或无头 CMS。"]
    },
    productSupport: "结构化内容已预留",
    baziTitle: "基于八字取向的科技配色",
    baziBody: "根据农历 1986 年正月十九、早上 6:30、福建龙岩永定的资料，整体以木火偏显为参考，用水蓝、金色、银白和克制的火色做平衡，使品牌更稳、更国际化。",
    contactNote: "产品、国家、行业和技术页面已为搜索优化预留结构。",
    formFields: ["姓名", "公司", "邮箱", "WhatsApp", "国家", "感兴趣产品"],
    formMessage: "项目需求",
    formPlaceholder: "请说明车位数量、车道数量、支付国家、部署方式和集成需求。",
    submit: "提交询盘",
    footer: "全球智慧停车、门禁控制与停车支付软件。"
  },
  es: {
    nav: ["Soluciones", "Productos", "Software", "Tecnologia", "Global", "Contacto"],
    inquiry: "Consulta",
    sections: {
      solutions: ["Soluciones", "Una plataforma para parking inteligente, acceso y seguridad", "Batum Technology combina hardware, control de movimiento, radar de seguridad y software de parking para proyectos internacionales."],
      products: ["Productos", "Modulos de producto para proyectos globales", "El contenido de producto esta estructurado para conectar un CMS o panel de administracion sin redisenar el sitio."],
      software: ["Software", "Servidor local + nube + pagos globales", "El software soporta paises, monedas, idiomas, pasarelas de pago y politicas de despliegue diferentes."],
      technology: ["Tecnologia", "Control de movimiento y seguridad para cada proyecto", "La arquitectura comunica control de voltaje, estabilidad, radar de seguridad, APIs y despliegue flexible."],
      global: ["Mercado global", "Estrategia internacional de idioma, pago y despliegue", "La estructura permite paginas por mercado para Hong Kong, Singapur, Medio Oriente, Europa y Sudeste Asiatico."],
      cases: ["Casos / Industrias", "Casos que convierten tecnologia en confianza", "Cada industria puede evolucionar a una pagina con casos, productos, FAQs, fichas e inquiry."],
      contact: ["Contacto", "Comparta carriles, mercado y requisitos de software", "El formulario esta listo para API, CRM, email o CMS headless."]
    },
    productSupport: "Contenido estructurado",
    baziTitle: "Paleta tecnologica inspirada en BaZi",
    baziBody: "La paleta equilibra un perfil madera-fuego con azul agua, oro metalico, blanco plata y acentos de fuego controlados para una marca tecnologica estable.",
    contactNote: "Las paginas de producto, pais, industria y tecnologia estan preparadas para busqueda.",
    formFields: ["Nombre", "Empresa", "Email", "WhatsApp", "Pais", "Producto"],
    formMessage: "Requisitos del proyecto",
    formPlaceholder: "Indique plazas, carriles, pais de pago, modo de despliegue e integraciones.",
    submit: "Enviar consulta",
    footer: "Parking inteligente global, control de acceso y software de pago."
  },
  ar: {
    nav: ["Solutions", "Products", "Software", "Technology", "Global", "Contact"],
    inquiry: "Inquiry",
    sections: {
      solutions: ["Solutions", "Integrated technology for parking, access and safety", "Hardware, motion control, safety radar and parking software for international projects."],
      products: ["Products", "Product modules for global delivery", "Structured product content is ready for future CMS or admin upload."],
      software: ["Software", "Local server + cloud platform + global payments", "Software prepared for countries, currencies, languages and payment gateways."],
      technology: ["Technology", "Motion control and safety logic", "Control voltage, stable motion, radar safety, APIs and flexible deployment."],
      global: ["Global Market", "International language, payment and deployment strategy", "Landing page structure for Hong Kong, Singapore, Middle East, Europe and Southeast Asia."],
      cases: ["Cases / Industries", "Use cases that build buyer trust", "Industry blocks can grow into pages with cases, products, FAQs and inquiry CTAs."],
      contact: ["Contact", "Share lane count, market and software needs", "Ready for API, CRM, email or headless CMS."]
    },
    productSupport: "Structured content ready",
    baziTitle: "BaZi-inspired technology palette",
    baziBody: "A wood-fire leaning profile is balanced with water blue, metal gold, silver white and restrained fire accents.",
    contactNote: "Search-ready product, country, industry and technology page structure.",
    formFields: ["Name", "Company", "Email", "WhatsApp", "Country", "Product"],
    formMessage: "Project Requirements",
    formPlaceholder: "Tell us about spaces, lanes, payment country, deployment mode and integration needs.",
    submit: "Submit Inquiry",
    footer: "Global smart parking, access control and parking payment software."
  },
  fr: {
    nav: ["Solutions", "Produits", "Logiciel", "Technologie", "Global", "Contact"],
    inquiry: "Demande",
    sections: {
      solutions: ["Solutions", "Une plateforme pour parking, acces et securite", "Materiel, controle de mouvement, radar de securite et logiciel de parking pour projets internationaux."],
      products: ["Produits", "Modules produits pour livraison globale", "Le contenu produit est structure pour un futur CMS ou panneau admin."],
      software: ["Logiciel", "Serveur local + cloud + paiements mondiaux", "Le logiciel prend en charge pays, devises, langues, paiements et modes de deploiement."],
      technology: ["Technologie", "Controle de mouvement et logique de securite", "Tension de controle, stabilite, radar, API et deploiement flexible."],
      global: ["Marche global", "Strategie internationale de langue, paiement et deploiement", "Structure prete pour Hong Kong, Singapour, Moyen-Orient, Europe et Asie du Sud-Est."],
      cases: ["Cas / Industries", "Des cas qui creent la confiance", "Chaque secteur peut devenir une page avec cas, produits, FAQ et CTA."],
      contact: ["Contact", "Indiquez voies, marche et besoins logiciel", "Formulaire pret pour API, CRM, email ou CMS headless."]
    },
    productSupport: "Contenu structure",
    baziTitle: "Palette technologie inspiree BaZi",
    baziBody: "Profil bois-feu equilibre par bleu eau, or metal, blanc argent et accents feu contenus.",
    contactNote: "Structure prete pour pages produit, pays, industrie et technologie.",
    formFields: ["Nom", "Societe", "Email", "WhatsApp", "Pays", "Produit"],
    formMessage: "Besoins du projet",
    formPlaceholder: "Indiquez places, voies, pays de paiement, deploiement et integrations.",
    submit: "Envoyer",
    footer: "Parking intelligent, controle d'acces et logiciel de paiement."
  },
  pt: {
    nav: ["Solucoes", "Produtos", "Software", "Tecnologia", "Global", "Contato"],
    inquiry: "Contato",
    sections: {
      solutions: ["Solucoes", "Tecnologia integrada para parking, acesso e seguranca", "Hardware, controle de movimento, radar de seguranca e software para projetos internacionais."],
      products: ["Produtos", "Modulos para entrega global", "Conteudo estruturado para futuro CMS ou painel administrativo."],
      software: ["Software", "Servidor local + nuvem + pagamentos globais", "Suporte a paises, moedas, idiomas, gateways e politicas de implantacao."],
      technology: ["Tecnologia", "Controle de movimento e seguranca", "Baixa tensao, movimento estavel, radar, API e implantacao flexivel."],
      global: ["Mercado global", "Estrategia internacional de idioma, pagamento e implantacao", "Estrutura para Hong Kong, Singapura, Oriente Medio, Europa e Sudeste Asiatico."],
      cases: ["Casos / Industrias", "Casos que geram confianca", "Cada industria pode virar uma pagina com casos, produtos, FAQs e CTA."],
      contact: ["Contato", "Informe faixas, mercado e requisitos", "Formulario pronto para API, CRM, email ou CMS headless."]
    },
    productSupport: "Conteudo estruturado",
    baziTitle: "Paleta tecnologica inspirada em BaZi",
    baziBody: "Perfil madeira-fogo equilibrado por azul agua, ouro metal, branco prata e acentos de fogo contidos.",
    contactNote: "Estrutura pronta para busca por produto, pais, industria e tecnologia.",
    formFields: ["Nome", "Empresa", "Email", "WhatsApp", "Pais", "Produto"],
    formMessage: "Requisitos do projeto",
    formPlaceholder: "Informe vagas, faixas, pais de pagamento, implantacao e integracoes.",
    submit: "Enviar",
    footer: "Parking inteligente, controle de acesso e software de pagamento."
  },
  ru: {
    nav: ["Solutions", "Products", "Software", "Technology", "Global", "Contact"],
    inquiry: "Inquiry",
    sections: {
      solutions: ["Solutions", "Integrated technology for parking, access and safety", "Hardware, motion control, safety radar and parking software for international projects."],
      products: ["Products", "Product modules for global delivery", "Structured product content is ready for future CMS or admin upload."],
      software: ["Software", "Local server + cloud platform + global payments", "Software prepared for countries, currencies, languages and payment gateways."],
      technology: ["Technology", "Motion control and safety logic", "Control voltage, stable motion, radar safety, APIs and flexible deployment."],
      global: ["Global Market", "International language, payment and deployment strategy", "Landing page structure for Hong Kong, Singapore, Middle East, Europe and Southeast Asia."],
      cases: ["Cases / Industries", "Use cases that build buyer trust", "Industry blocks can grow into pages with cases, products, FAQs and inquiry CTAs."],
      contact: ["Contact", "Share lane count, market and software needs", "Ready for API, CRM, email or headless CMS."]
    },
    productSupport: "Structured content ready",
    baziTitle: "BaZi-inspired technology palette",
    baziBody: "A wood-fire leaning profile is balanced with water blue, metal gold, silver white and restrained fire accents.",
    contactNote: "Search-ready product, country, industry and technology page structure.",
    formFields: ["Name", "Company", "Email", "WhatsApp", "Country", "Product"],
    formMessage: "Project Requirements",
    formPlaceholder: "Tell us about spaces, lanes, payment country, deployment mode and integration needs.",
    submit: "Submit Inquiry",
    footer: "Global smart parking, access control and parking payment software."
  }
};

export function LandingPage() {
  const [locale, setLocale] = useState<LocaleKey>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const hero = localizedHero[locale];
  const copy = uiCopy[locale];

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
        copy={copy}
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
        eyebrow={copy.sections.solutions[0]}
        title={copy.sections.solutions[1]}
        body={copy.sections.solutions[2]}
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
        eyebrow={copy.sections.products[0]}
        title={copy.sections.products[1]}
        body={copy.sections.products[2]}
        className="light-section"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <MotionCard key={product.name} delay={index * 0.04} className="group overflow-hidden p-6">
              <div className="mb-7 flex items-center justify-between">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-water/20 bg-water/10">
                  <product.icon className="h-7 w-7 text-water" />
                </div>
                <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                  {copy.productSupport}
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
        eyebrow={copy.sections.software[0]}
        title={copy.sections.software[1]}
        body={copy.sections.software[2]}
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
        eyebrow={copy.sections.technology[0]}
        title={copy.sections.technology[1]}
        body={copy.sections.technology[2]}
        className="light-section"
      >
        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <MotionCard className="p-7">
            <h3 className="text-2xl font-semibold text-white">{copy.baziTitle}</h3>
            <p className="mt-4 text-sm leading-7 text-steel">
              {copy.baziBody}
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
        eyebrow={copy.sections.global[0]}
        title={copy.sections.global[1]}
        body={copy.sections.global[2]}
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
        eyebrow={copy.sections.cases[0]}
        title={copy.sections.cases[1]}
        body={copy.sections.cases[2]}
        className="light-section"
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
        eyebrow={copy.sections.contact[0]}
        title={copy.sections.contact[1]}
        body={copy.sections.contact[2]}
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
                <span>{copy.contactNote}</span>
              </div>
            </div>
          </MotionCard>
          <InquiryForm copy={copy} />
        </div>
      </Section>

      <footer className="border-t border-white/10 px-5 py-8 text-sm text-steel sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span>Batum Technology / 巴图姆（深圳）科技有限公司</span>
          <span>{copy.footer}</span>
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
  onMenuToggle,
  copy
}: {
  locale: LocaleKey;
  onLocaleChange: (locale: LocaleKey) => void;
  menuOpen: boolean;
  onMenuToggle: () => void;
  copy: (typeof uiCopy)[LocaleKey];
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
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-steel transition hover:text-white">
              {copy.nav[index] ?? item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher locale={locale} onLocaleChange={onLocaleChange} />
          <a href="#contact" className="rounded-full bg-white px-4 py-2 text-sm font-bold text-void transition hover:bg-gold">
            {copy.inquiry}
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
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} className="rounded-2xl px-4 py-3 text-steel hover:bg-white/5 hover:text-white">
              {copy.nav[index] ?? item.label}
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

function InquiryForm({ copy }: { copy: (typeof uiCopy)[LocaleKey] }) {
  return (
    <MotionCard className="p-6 sm:p-8">
      <form className="grid gap-4 md:grid-cols-2">
        {copy.formFields.map((field) => (
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
          {copy.formMessage}
          <textarea
            className="min-h-36 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-steel focus:border-water"
            placeholder={copy.formPlaceholder}
          />
        </label>
        <button
          type="button"
          className="group md:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-water to-gold px-6 py-4 text-sm font-black text-void transition hover:shadow-gold"
        >
          {copy.submit}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </button>
      </form>
    </MotionCard>
  );
}
