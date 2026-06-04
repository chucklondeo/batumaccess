import {
  Aperture,
  BadgeCheck,
  Building2,
  Cable,
  Car,
  CloudCog,
  CreditCard,
  DoorOpen,
  Factory,
  Gauge,
  Globe2,
  Languages,
  LockKeyhole,
  MapPinned,
  Radar,
  Server,
  ShieldCheck,
  TrainFront,
  Zap
} from "lucide-react";

export type LocaleKey = "en" | "zh" | "es" | "ar" | "fr" | "pt" | "ru";

export const locales: Array<{ key: LocaleKey; label: string; market: string }> = [
  { key: "en", label: "English", market: "Global" },
  { key: "zh", label: "中文", market: "China" },
  { key: "es", label: "Español", market: "LATAM" },
  { key: "ar", label: "العربية", market: "Middle East" },
  { key: "fr", label: "Français", market: "EU / Africa" },
  { key: "pt", label: "Português", market: "Brazil" },
  { key: "ru", label: "Русский", market: "Eurasia" }
];

export const localizedHero: Record<LocaleKey, { eyebrow: string; title: string; body: string; cta: string; secondary: string }> = {
  en: {
    eyebrow: "Batum Technology / 巴图姆（深圳）科技有限公司",
    title: "Global Smart Parking & Access Control Technology",
    body: "Integrated hardware and software for smart parking, rail transit gates, door operators, safety radar and global payment-ready parking platforms.",
    cta: "Plan a Global Project",
    secondary: "Explore Systems"
  },
  zh: {
    eyebrow: "巴图姆（深圳）科技有限公司",
    title: "全球智慧停车与门禁控制技术",
    body: "面向海外市场的智慧停车、轨道交通门禁、开门机、防砸防夹雷达和停车支付软件综合解决方案。",
    cta: "提交项目需求",
    secondary: "查看系统方案"
  },
  es: {
    eyebrow: "Batum Technology",
    title: "Tecnología global para parking inteligente y control de acceso",
    body: "Hardware y software integrados para estacionamientos, puertas AFC, radares de seguridad y pagos internacionales.",
    cta: "Planificar proyecto",
    secondary: "Ver soluciones"
  },
  ar: {
    eyebrow: "Batum Technology",
    title: "تقنيات عالمية للمواقف الذكية والتحكم في الدخول",
    body: "منظومات أجهزة وبرمجيات للمواقف الذكية وبوابات النقل والرادار الآمن والدفع العالمي.",
    cta: "ابدأ مشروعك",
    secondary: "استكشف الحلول"
  },
  fr: {
    eyebrow: "Batum Technology",
    title: "Technologie mondiale de parking intelligent et contrôle d'accès",
    body: "Matériel et logiciel intégrés pour parking, accès transport, radar de sécurité et paiement mondial.",
    cta: "Planifier un projet",
    secondary: "Voir les solutions"
  },
  pt: {
    eyebrow: "Batum Technology",
    title: "Tecnologia global para estacionamento inteligente e controle de acesso",
    body: "Hardware e software para estacionamentos, portões de transporte, radar de segurança e pagamentos globais.",
    cta: "Planejar projeto",
    secondary: "Ver soluções"
  },
  ru: {
    eyebrow: "Batum Technology",
    title: "Глобальные технологии умной парковки и контроля доступа",
    body: "Аппаратные и программные решения для парковок, транспортных турникетов, радаров безопасности и платежей.",
    cta: "Обсудить проект",
    secondary: "Смотреть решения"
  }
};

export const navItems = [
  { label: "Solutions", href: "#solutions" },
  { label: "Products", href: "#products" },
  { label: "Software", href: "#software" },
  { label: "Technology", href: "#technology" },
  { label: "Global", href: "#global" },
  { label: "Contact", href: "#contact" }
];

export const solutions = [
  {
    icon: Car,
    title: "Smart Parking",
    body: "Barrier gates, LPR cameras, radar detection, cloud boxes and parking operation software for commercial and public parking lots."
  },
  {
    icon: TrainFront,
    title: "Rail Transit Access",
    body: "AFC gates, platform screen door integration and high-frequency movement control for metro, station and transit access projects."
  },
  {
    icon: DoorOpen,
    title: "Door Operator Control",
    body: "Stable low-voltage servo motion control for door openers, gate systems and automatic access control applications."
  },
  {
    icon: Radar,
    title: "Anti-smash / Anti-pinch Radar",
    body: "Radar accessories for vehicle detection, people safety, anti-smashing protection and more reliable barrier operation."
  },
  {
    icon: CreditCard,
    title: "Parking Payment Software",
    body: "Multi-country payment integration, local deployment, cloud operation, multilingual UI and API-ready parking workflows."
  }
];

export const products = [
  {
    icon: Gauge,
    name: "Barrier Gate",
    tag: "Smart parking lane control",
    specs: ["24V servo control", "Stable arm motion", "Radar safety ready"],
    seo: "high speed parking barrier gate manufacturer"
  },
  {
    icon: LockKeyhole,
    name: "AFC Gate",
    tag: "Rail transit fare access",
    specs: ["High throughput", "Access control API", "Durable gate movement"],
    seo: "AFC gate supplier for rail transit"
  },
  {
    icon: Aperture,
    name: "PSD Platform Screen Door",
    tag: "Transit platform safety",
    specs: ["Modular control", "Safety interlock", "Station integration"],
    seo: "platform screen door control system"
  },
  {
    icon: BadgeCheck,
    name: "LPR Camera",
    tag: "Ticketless parking recognition",
    specs: ["Plate capture", "Whitelist support", "Night operation"],
    seo: "LPR camera for smart parking"
  },
  {
    icon: Radar,
    name: "Radar Sensor",
    tag: "Anti-smash safety detection",
    specs: ["Vehicle presence", "Anti-pinch logic", "Weather resistant"],
    seo: "barrier gate anti-smash radar sensor"
  },
  {
    icon: CloudCog,
    name: "Parking Cloud Box",
    tag: "Edge-to-cloud parking bridge",
    specs: ["Local server sync", "Cloud API", "Payment gateway ready"],
    seo: "parking cloud box for payment integration"
  }
];

export const softwareModules = [
  { icon: Server, title: "Local Server Deployment", body: "On-premise parking control for sensitive projects, offline continuity and local data ownership." },
  { icon: CloudCog, title: "Cloud Platform", body: "Centralized sites, real-time occupancy, remote support and SaaS-style operational dashboards." },
  { icon: Languages, title: "Multilingual Operation", body: "Prepared for English, Chinese, Spanish, Arabic, French, Portuguese, Russian and more." },
  { icon: CreditCard, title: "Global Payment Integration", body: "Designed to connect regional payment gateways, subscriptions, QR payments and settlement workflows." },
  { icon: Cable, title: "API Integration", body: "Open integration layer for LPR, access control, ERP, property systems and smart city platforms." }
];

export const technologies = [
  "24V low-voltage servo control architecture",
  "Stable motion curves for barrier and gate systems",
  "Safety radar logic for anti-smash and anti-pinch protection",
  "Parking payment software with API integration",
  "Local + cloud hybrid deployment options",
  "Internationalized UI, currency and payment workflows"
];

export const globalMarkets = [
  { region: "Hong Kong", detail: "Dense parking, mixed-use properties and transit-adjacent access control." },
  { region: "Singapore", detail: "High-standard smart building and commercial parking operations." },
  { region: "Middle East", detail: "Mall, hotel, airport and city-scale parking payment projects." },
  { region: "Europe", detail: "Compliance-aware deployments with local server and integration needs." },
  { region: "Southeast Asia", detail: "Fast-growing residential, commercial and infrastructure projects." }
];

export const industries = [
  { icon: Building2, title: "Parking Lots", body: "Ticketless LPR entry, barrier gates, radar safety and parking payment workflows." },
  { icon: Zap, title: "Highway ETC", body: "Fast lane movement, vehicle identification and reliable gate control." },
  { icon: TrainFront, title: "Rail Transit", body: "AFC gate, PSD control and transit access integration." },
  { icon: Factory, title: "Commercial Buildings", body: "Office parks, hotels, malls and mixed-use access management." }
];


export const contact = {
  phone: "+86 135 3425 3195",
  whatsapp: "13534253195",
  whatsappUrl: "https://wa.me/8613534253195",
  wechat: "13534253195",
  email: "sales@batumaccess.com",
  company: "Batum Technology / 巴图姆（深圳）科技有限公司"
};

export const stats = [
  { label: "Deployment Modes", value: "Local + Cloud" },
  { label: "Market Languages", value: "7+" },
  { label: "Payment Workflow", value: "Global Ready" },
  { label: "Control Platform", value: "24V Servo" }
];

export const IconMap = { Globe2, ShieldCheck, MapPinned };
