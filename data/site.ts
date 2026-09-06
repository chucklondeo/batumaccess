import {
  BadgeCheck,
  Building2,
  Car,
  CloudCog,
  DoorOpen,
  Factory,
  Gauge,
  MapPinned,
  Radar,
  Settings,
  ShieldCheck,
  TrainFront,
  Wrench,
  Zap
} from "lucide-react";
import seoTopicsSeed from "./seo-topics.json";

export type LocaleKey = "en" | "zh-hant" | "es" | "vi" | "ms" | "th" | "ja" | "ko";
export type PageSlug = "solutions" | "products" | "cases" | "software" | "about" | "contact" | "faq" | "seo-hub";

export const defaultLocale: LocaleKey = "en";

export const locales: Array<{ key: LocaleKey; label: string; native: string; market: string }> = [
  { key: "en", label: "English", native: "English", market: "Global" },
  { key: "zh-hant", label: "Traditional Chinese", native: "繁體中文", market: "Hong Kong / Taiwan" },
  { key: "es", label: "Spanish", native: "Español", market: "Spain / LATAM" },
  { key: "vi", label: "Vietnamese", native: "Tiếng Việt", market: "Vietnam" },
  { key: "ms", label: "Malay", native: "Bahasa Melayu", market: "Malaysia" },
  { key: "th", label: "Thai", native: "ไทย", market: "Thailand" },
  { key: "ja", label: "Japanese", native: "日本語", market: "Japan" },
  { key: "ko", label: "Korean", native: "한국어", market: "South Korea" }
];

const hreflangTag: Record<LocaleKey, string> = {
  en: "en",
  "zh-hant": "zh-Hant",
  es: "es",
  vi: "vi",
  ms: "ms",
  th: "th",
  ja: "ja",
  ko: "ko"
};

export function hreflangAlternates(slug?: PageSlug): Record<string, string> {
  const entries: Record<string, string> = {};
  for (const locale of locales) {
    entries[hreflangTag[locale.key]] = localePath(locale.key, slug);
  }
  entries["x-default"] = localePath(defaultLocale, slug);
  return entries;
}

export const pageSlugs: PageSlug[] = ["solutions", "products", "cases", "software", "about", "contact", "faq", "seo-hub"];

export const iconMap = {
  barrier: Gauge,
  operator: DoorOpen,
  radar: Radar,
  accessory: Wrench,
  parking: Car,
  transit: TrainFront,
  building: Building2,
  factory: Factory,
  software: CloudCog,
  safety: ShieldCheck,
  map: MapPinned,
  fast: Zap,
  certified: BadgeCheck,
  settings: Settings
};

export const contact = {
  company: "Batum Technology / 巴圖姆（深圳）科技有限公司",
  email: "sales@batumaccess.com",
  phone: "+86 135 3425 3195",
  wechat: "13534253195",
  whatsappUrl: "https://wa.me/8613534253195"
};

export const companyName: Record<LocaleKey, string> = {
  en: "Batum Technology",
  "zh-hant": "巴圖姆（深圳）科技有限公司",
  es: "Batum Technology",
  vi: "Batum Technology",
  ms: "Batum Technology",
  th: "Batum Technology",
  ja: "Batum Technology",
  ko: "Batum Technology"
};

export const aboutHighlights: Record<LocaleKey, string[]> = {
  en: ["Drive control R&D", "Hardware manufacturing", "Low-voltage servo systems", "Safety-first product design"],
  "zh-hant": ["門禁驅動控制研發", "硬體生產製造", "低壓伺服系統", "安全優先的產品設計"],
  es: ["I+D en control de accionamiento", "Fabricación de hardware", "Sistemas servo de bajo voltaje", "Diseño de producto centrado en la seguridad"],
  vi: ["R&D điều khiển truyền động", "Sản xuất phần cứng", "Hệ thống servo điện áp thấp", "Thiết kế sản phẩm ưu tiên an toàn"],
  ms: ["R&D kawalan pemacu", "Pembuatan perkakasan", "Sistem servo voltan rendah", "Reka bentuk produk keutamaan keselamatan"],
  th: ["วิจัยและพัฒนาระบบควบคุมไดรฟ์", "การผลิตฮาร์ดแวร์", "ระบบเซอร์โวแรงดันต่ำ", "ออกแบบผลิตภัณฑ์โดยเน้นความปลอดภัยเป็นหลัก"],
  ja: ["駆動制御の研究開発", "ハードウェア製造", "低電圧サーボシステム", "安全最優先の製品設計"],
  ko: ["구동 제어 연구개발", "하드웨어 제조", "저전압 서보 시스템", "안전 최우선의 제품 설계"]
};

type Product = {
  id: string;
  category: "servo-barrier" | "door-operator" | "radar" | "accessory";
  icon: keyof typeof iconMap;
  name: Record<LocaleKey, string>;
  summary: Record<LocaleKey, string>;
  specs: Record<LocaleKey, string[]>;
  document: string;
  keywords: string[];
};

export const products: Product[] = [
  {
    id: "servo-barrier-gate",
    category: "servo-barrier",
    icon: "barrier",
    name: {
      en: "Low-voltage Servo Barrier Gate",
      "zh-hant": "低壓伺服道閘",
      es: "Barrera vehicular servo de bajo voltaje",
      vi: "Barrier servo điện áp thấp",
      ms: "Palang servo voltan rendah",
      th: "ไม้กั้นรถระบบเซอร์โวแรงดันต่ำ",
      ja: "低電圧サーボ式バリアゲート",
      ko: "저전압 서보 차단기"
    },
    summary: {
      en: "Fast, stable and safety-focused parking lane barrier for commercial and public projects.",
      "zh-hant": "適用於商業與公共停車場的高速、穩定、安全型車道道閘。",
      es: "Barrera rápida y estable para carriles de estacionamiento comercial y público.",
      vi: "Barrier làn xe nhanh, ổn định và an toàn cho bãi đỗ thương mại và công cộng.",
      ms: "Palang parkir yang pantas, stabil dan selamat untuk projek komersial dan awam.",
      th: "ไม้กั้นรถที่รวดเร็ว เสถียร และเน้นความปลอดภัยสำหรับลานจอดเชิงพาณิชย์และโครงการสาธารณะ",
      ja: "商業施設・公共駐車場向けの高速・安定・安全性重視のレーンバリア。",
      ko: "상업 및 공공 주차장을 위한 빠르고 안정적이며 안전 중심의 차선 차단기."
    },
    specs: {
      en: ["24V low-voltage servo control", "Smooth acceleration and braking", "Radar and loop detector ready"],
      "zh-hant": ["24V 低壓伺服控制", "平順加減速曲線", "支援雷達與地感偵測"],
      es: ["Control servo 24V", "Aceleración y frenado suaves", "Preparada para radar y lazo"],
      vi: ["Điều khiển servo 24V", "Tăng giảm tốc mượt", "Sẵn sàng kết nối radar và vòng từ"],
      ms: ["Kawalan servo 24V", "Pecutan dan brek lancar", "Sedia untuk radar dan loop detector"],
      th: ["ควบคุมเซอร์โว 24V", "เร่งและเบรกนุ่มนวล", "รองรับเรดาร์และ loop detector"],
      ja: ["24V低電圧サーボ制御", "スムーズな加減速", "レーダー・ループ検知器対応"],
      ko: ["24V 저전압 서보 제어", "부드러운 가감속", "레이더 및 루프 감지기 지원"]
    },
    document: "/docs/servo-barrier-gate-datasheet.txt",
    keywords: ["servo barrier gate", "24V barrier gate", "parking barrier manufacturer"]
  },
  {
    id: "servo-door-operator",
    category: "door-operator",
    icon: "operator",
    name: {
      en: "Servo Door Operator",
      "zh-hant": "伺服開門機",
      es: "Operador de puerta servo",
      vi: "Bộ mở cửa servo",
      ms: "Penggerak pintu servo",
      th: "ชุดเปิดประตูเซอร์โว",
      ja: "サーボドアオペレーター",
      ko: "서보 도어 오퍼레이터"
    },
    summary: {
      en: "Servo drive control for swing, sliding and pedestrian access door systems.",
      "zh-hant": "用於平開門、平移門與人行通道門的伺服驅動控制方案。",
      es: "Control servo para puertas batientes, corredizas y accesos peatonales.",
      vi: "Điều khiển servo cho cửa mở quay, cửa trượt và lối đi bộ.",
      ms: "Kawalan servo untuk pintu ayun, gelangsar dan akses pejalan kaki.",
      th: "ระบบควบคุมเซอร์โวสำหรับประตูบานสวิง บานเลื่อน และทางเดินคน",
      ja: "開き戸・引き戸・歩行者用ドアシステム向けのサーボ駆動制御。",
      ko: "여닫이문, 미닫이문, 보행자 출입문 시스템을 위한 서보 구동 제어."
    },
    specs: {
      en: ["Low-noise movement", "Precise position control", "Access control integration"],
      "zh-hant": ["低噪音運行", "精準位置控制", "可整合門禁系統"],
      es: ["Movimiento silencioso", "Control preciso de posición", "Integración de control de acceso"],
      vi: ["Vận hành ít tiếng ồn", "Điều khiển vị trí chính xác", "Tích hợp kiểm soát ra vào"],
      ms: ["Pergerakan senyap", "Kawalan posisi tepat", "Integrasi kawalan akses"],
      th: ["การทำงานเสียงต่ำ", "ควบคุมตำแหน่งแม่นยำ", "เชื่อมต่อระบบควบคุมทางเข้าออก"],
      ja: ["低騒音動作", "高精度位置制御", "入退室管理システム連携"],
      ko: ["저소음 작동", "정밀 위치 제어", "출입 통제 시스템 연동"]
    },
    document: "/docs/servo-door-operator-datasheet.txt",
    keywords: ["servo door operator", "automatic door control", "low voltage servo drive"]
  },
  {
    id: "anti-smash-radar",
    category: "radar",
    icon: "radar",
    name: {
      en: "Anti-smash Safety Radar",
      "zh-hant": "防砸防夾安全雷達",
      es: "Radar de seguridad antiaplastamiento",
      vi: "Radar an toàn chống va chạm",
      ms: "Radar keselamatan anti-hentam",
      th: "เรดาร์นิรภัยกันชนและกันหนีบ",
      ja: "衝突防止安全レーダー",
      ko: "충돌·협착 방지 안전 레이더"
    },
    summary: {
      en: "Vehicle and pedestrian detection accessory for safer barrier and gate operation.",
      "zh-hant": "用於車輛與行人偵測，提高道閘與門禁設備安全性。",
      es: "Accesorio de detección de vehículos y peatones para operaciones más seguras.",
      vi: "Phụ kiện phát hiện xe và người đi bộ, giúp vận hành an toàn hơn.",
      ms: "Aksesori pengesanan kenderaan dan pejalan kaki untuk operasi lebih selamat.",
      th: "อุปกรณ์ตรวจจับรถและคนเดินเพื่อเพิ่มความปลอดภัยให้ไม้กั้นและประตู",
      ja: "バリアやゲートの安全な稼働のための車両・歩行者検知アクセサリー。",
      ko: "바리케이드 및 게이트의 안전한 작동을 위한 차량·보행자 감지 액세서리."
    },
    specs: {
      en: ["Vehicle presence detection", "Anti-pinch safety logic", "Outdoor project ready"],
      "zh-hant": ["車輛存在偵測", "防夾安全邏輯", "適用戶外工程"],
      es: ["Detección de presencia vehicular", "Lógica anti-pinzamiento", "Lista para exterior"],
      vi: ["Phát hiện xe hiện diện", "Logic chống kẹt", "Phù hợp dự án ngoài trời"],
      ms: ["Pengesanan kehadiran kenderaan", "Logik anti-pinch", "Sesuai projek luar"],
      th: ["ตรวจจับการมีอยู่ของรถ", "ตรรกะนิรภัยกันหนีบ", "พร้อมสำหรับโครงการกลางแจ้ง"],
      ja: ["車両存在検知", "挟み込み防止安全ロジック", "屋外設置対応"],
      ko: ["차량 감지", "협착 방지 안전 로직", "실외 프로젝트 지원"]
    },
    document: "/docs/safety-radar-datasheet.txt",
    keywords: ["barrier safety radar", "anti-smash radar", "anti-pinch radar"]
  },
  {
    id: "access-control-accessories",
    category: "accessory",
    icon: "accessory",
    name: {
      en: "Access Control Accessories",
      "zh-hant": "門禁控制配件",
      es: "Accesorios de control de acceso",
      vi: "Phụ kiện kiểm soát ra vào",
      ms: "Aksesori kawalan akses",
      th: "อุปกรณ์เสริมควบคุมทางเข้าออก",
      ja: "入退室管理アクセサリー",
      ko: "출입 통제 액세서리"
    },
    summary: {
      en: "Controllers, sensors, wiring modules and integration parts for parking and access projects.",
      "zh-hant": "控制器、感測器、線路模組與停車門禁整合配件。",
      es: "Controladores, sensores, cableado y piezas de integración para proyectos de acceso.",
      vi: "Bộ điều khiển, cảm biến, module dây và linh kiện tích hợp cho dự án.",
      ms: "Pengawal, sensor, modul pendawaian dan komponen integrasi projek.",
      th: "คอนโทรลเลอร์ เซนเซอร์ โมดูลสายไฟ และชิ้นส่วนสำหรับรวมระบบ",
      ja: "駐車場・入退室プロジェクト向けのコントローラー、センサー、配線モジュール、統合部品。",
      ko: "주차 및 출입 통제 프로젝트를 위한 컨트롤러, 센서, 배선 모듈 및 통합 부품."
    },
    specs: {
      en: ["Modular wiring", "API and dry-contact support", "Project replacement parts"],
      "zh-hant": ["模組化接線", "支援 API 與乾接點", "工程備品配件"],
      es: ["Cableado modular", "API y contacto seco", "Repuestos de proyecto"],
      vi: ["Đấu dây module", "Hỗ trợ API và tiếp điểm khô", "Linh kiện thay thế"],
      ms: ["Pendawaian modular", "Sokongan API dan dry contact", "Alat ganti projek"],
      th: ["การเดินสายแบบโมดูล", "รองรับ API และ dry contact", "อะไหล่สำหรับโครงการ"],
      ja: ["モジュール式配線", "APIおよびドライ接点対応", "プロジェクト用交換部品"],
      ko: ["모듈식 배선", "API 및 드라이 접점 지원", "프로젝트 교체 부품"]
    },
    document: "/docs/access-control-accessories.txt",
    keywords: ["access control accessories", "gate controller", "parking control parts"]
  }
];

type Copy = {
  nav: Record<PageSlug | "home" | "admin", string>;
  heroTitle: string;
  heroBody: string;
  primaryCta: string;
  secondaryCta: string;
  homeKicker: string;
  sections: Record<PageSlug, { kicker: string; title: string; body: string }>;
  productCategories: Record<Product["category"], string>;
  download: string;
  contactIntro: string;
  firstSubmitNote: string;
  form: { name: string; company: string; email: string; whatsapp: string; country: string; product: string; message: string; submit: string };
};

const english: Copy = {
  nav: { home: "Home", solutions: "Solutions", products: "Products", cases: "Cases", software: "Software", about: "About", contact: "Contact", faq: "FAQ", "seo-hub": "Insights", admin: "Content Hub" },
  heroTitle: "Global Smart Parking & Access Control Technology",
  heroBody: "Low-voltage servo hardware, safety radar accessories and parking software for international parking, gate and transit projects.",
  primaryCta: "Submit Inquiry",
  secondaryCta: "View Products",
  homeKicker: companyName.en,
  sections: {
    solutions: { kicker: "Solutions", title: "Integrated systems for vehicles, pedestrians and transit access", body: "Modular solutions combine servo control, access logic, radar safety and software integration." },
    products: { kicker: "Products", title: "Servo barrier, door operator, radar and accessory categories", body: "Each product module is structured for datasheets, project keywords and future upload management." },
    cases: { kicker: "Cases", title: "Application pages for parking lots, buildings, rail transit and ETC lanes", body: "Industry pages help buyers understand where the hardware and software fit into real projects." },
    software: { kicker: "Software", title: "Local server, cloud platform and global payment integration", body: "Parking software can support local deployment, cloud operation, multiple languages and country payment methods." },
    about: { kicker: "About Batum", title: "R&D and manufacturing company focused on low-voltage servo access control", body: "Batum is a company with strong R&D capability in access control drive control and comprehensive hardware manufacturing capability. Our products cover both vehicle and pedestrian access control — high-speed barrier gates, direct-drive pedestrian access gates, platform screen doors and door operators — all built as low-voltage servo solutions. Safety is our first design goal." },
    contact: { kicker: "Contact", title: "Send project requirements to Batum Technology", body: "The inquiry form sends project information to sales@batumaccess.com." },
    faq: { kicker: "FAQ", title: "Common project questions", body: "Clear answers for buyers comparing parking hardware, access control products and software deployment options." },
    "seo-hub": { kicker: "Insights", title: "Structured knowledge pages for search growth", body: "Use this section for product knowledge, category articles and market-specific content that can be expanded over time." }
  },
  productCategories: { "servo-barrier": "Servo Barrier", "door-operator": "Door Operator", radar: "Radar", accessory: "Accessories" },
  download: "Download datasheet",
  contactIntro: "Tell us the country, lane count, required products and software deployment mode.",
  firstSubmitNote: "Your inquiry will be sent to sales@batumaccess.com. First FormSubmit use may require mailbox confirmation.",
  form: { name: "Name", company: "Company", email: "Email", whatsapp: "WhatsApp", country: "Country", product: "Interested product", message: "Project requirements", submit: "Submit Inquiry" }
};

export const messages: Record<LocaleKey, Copy> = {
  en: english,
  "zh-hant": {
    nav: { home: "首頁", solutions: "解決方案", products: "產品", cases: "案例", software: "軟體", about: "關於我們", contact: "聯絡我們", faq: "常見問題", "seo-hub": "知識中心", admin: "內容後台" },
    heroTitle: "全球智慧停車與門禁控制技術",
    heroBody: "面向海外市場的低壓伺服硬體、安全雷達配件與停車軟體解決方案。",
    primaryCta: "提交詢盤",
    secondaryCta: "查看產品",
    homeKicker: companyName["zh-hant"],
    sections: {
      solutions: { kicker: "解決方案", title: "車輛、人行與軌道交通門禁的一體化系統", body: "以伺服控制、門禁邏輯、安全雷達和軟體整合組成模組化方案。" },
      products: { kicker: "產品", title: "伺服道閘、開門機、雷達與配件分類", body: "每個產品模組都可對應說明文件、工程關鍵詞和後續上傳管理。" },
      cases: { kicker: "案例", title: "停車場、商業建築、軌道交通與 ETC 車道應用", body: "行業頁面幫助海外買家理解硬體與軟體在實際項目中的使用方式。" },
      software: { kicker: "軟體", title: "本地伺服器、雲端平台與多國支付整合", body: "停車軟體可支援本地部署、雲端營運、多語言和不同國家的支付方式。" },
      about: { kicker: "關於巴圖姆", title: "專注低壓伺服門禁控制的研發與硬體製造公司", body: "巴圖姆是一家在門禁驅動控制方面擁有強大研發能力、並具備完整硬體生產能力的綜合實力企業。我們的產品涵蓋車輛與行人門禁，包括快速道閘、直驅人行通道閘、站台屏蔽門與開門機，全部採用低壓伺服解決方案。安全是我們的第一設計目標。" },
      contact: { kicker: "聯絡我們", title: "把項目需求發送給巴圖姆", body: "詢盤表單會把項目信息發送至 sales@batumaccess.com。" },
      faq: { kicker: "常見問題", title: "項目採購常見問題", body: "幫助買家快速了解停車硬體、門禁產品與軟體部署方式。" },
      "seo-hub": { kicker: "知識中心", title: "用於長期搜尋成長的結構化內容頁面", body: "此頁可持續擴充產品知識、分類關鍵詞和市場內容。" }
    },
    productCategories: { "servo-barrier": "伺服道閘", "door-operator": "開門機", radar: "雷達", accessory: "其他配件" },
    download: "下載產品說明",
    contactIntro: "請告訴我們國家、車道數量、所需產品與軟體部署方式。",
    firstSubmitNote: "詢盤將發送至 sales@batumaccess.com。首次使用 FormSubmit 可能需要在郵箱確認。",
    form: { name: "姓名", company: "公司", email: "郵箱", whatsapp: "WhatsApp", country: "國家", product: "感興趣產品", message: "項目需求", submit: "提交詢盤" }
  },
  es: {
    nav: { home: "Inicio", solutions: "Soluciones", products: "Productos", cases: "Casos", software: "Software", about: "Nosotros", contact: "Contacto", faq: "FAQ", "seo-hub": "Conocimiento", admin: "Panel" },
    heroTitle: "Tecnología global de parking inteligente y control de acceso",
    heroBody: "Hardware servo de bajo voltaje, radar de seguridad y software de parking para proyectos internacionales.",
    primaryCta: "Enviar consulta",
    secondaryCta: "Ver productos",
    homeKicker: "Batum Technology",
    sections: {
      solutions: { kicker: "Soluciones", title: "Sistemas integrados para vehículos, peatones y transporte", body: "Las soluciones combinan control servo, lógica de acceso, radar de seguridad e integración de software." },
      products: { kicker: "Productos", title: "Barrera servo, operador de puerta, radar y accesorios", body: "Cada producto está estructurado para fichas técnicas, palabras clave y gestión futura." },
      cases: { kicker: "Casos", title: "Aplicaciones para parkings, edificios, tránsito y ETC", body: "Las páginas por industria explican cómo se aplican hardware y software en proyectos reales." },
      software: { kicker: "Software", title: "Servidor local, nube y pagos globales", body: "El software puede soportar despliegue local, operación cloud, idiomas y métodos de pago por país." },
      about: { kicker: "Sobre Batum", title: "Empresa de I+D y fabricación enfocada en control servo de acceso", body: "Batum es una empresa con una fuerte capacidad de I+D en control de accionamiento para control de acceso y una capacidad integral de fabricación de hardware. Nuestros productos cubren el control de acceso vehicular y peatonal — barreras de alta velocidad, puertas peatonales de accionamiento directo, puertas de andén y operadores de puerta — todos como soluciones servo de bajo voltaje. La seguridad es nuestro primer objetivo de diseño." },
      contact: { kicker: "Contacto", title: "Envíe los requisitos del proyecto", body: "El formulario envía la información a sales@batumaccess.com." },
      faq: { kicker: "FAQ", title: "Preguntas comunes de proyectos", body: "Respuestas para compradores que comparan hardware de parking, productos de acceso y despliegue de software." },
      "seo-hub": { kicker: "Conocimiento", title: "Páginas estructuradas para crecimiento orgánico", body: "Use esta página para conocimiento de producto, categorías y contenido por mercado." }
    },
    productCategories: { "servo-barrier": "Barrera servo", "door-operator": "Operador de puerta", radar: "Radar", accessory: "Accesorios" },
    download: "Descargar ficha",
    contactIntro: "Indique país, carriles, productos requeridos y modo de despliegue.",
    firstSubmitNote: "La consulta se enviará a sales@batumaccess.com. El primer uso de FormSubmit puede requerir confirmación.",
    form: { name: "Nombre", company: "Empresa", email: "Email", whatsapp: "WhatsApp", country: "País", product: "Producto", message: "Requisitos", submit: "Enviar consulta" }
  },
  vi: {
    nav: { home: "Trang chủ", solutions: "Giải pháp", products: "Sản phẩm", cases: "Dự án", software: "Phần mềm", about: "Về chúng tôi", contact: "Liên hệ", faq: "FAQ", "seo-hub": "Kiến thức", admin: "Quản trị" },
    heroTitle: "Công nghệ bãi đỗ xe thông minh và kiểm soát ra vào toàn cầu",
    heroBody: "Phần cứng servo điện áp thấp, radar an toàn và phần mềm bãi đỗ cho dự án quốc tế.",
    primaryCta: "Gửi yêu cầu",
    secondaryCta: "Xem sản phẩm",
    homeKicker: "Batum Technology",
    sections: {
      solutions: { kicker: "Giải pháp", title: "Hệ thống cho xe, người đi bộ và giao thông công cộng", body: "Giải pháp kết hợp điều khiển servo, logic ra vào, radar an toàn và tích hợp phần mềm." },
      products: { kicker: "Sản phẩm", title: "Barrier servo, bộ mở cửa, radar và phụ kiện", body: "Mỗi sản phẩm có cấu trúc cho tài liệu, từ khóa và quản lý nội dung sau này." },
      cases: { kicker: "Dự án", title: "Ứng dụng cho bãi đỗ, tòa nhà, metro và ETC", body: "Trang ngành giúp khách hàng hiểu cách dùng phần cứng và phần mềm trong dự án thực tế." },
      software: { kicker: "Phần mềm", title: "Máy chủ nội bộ, nền tảng cloud và thanh toán toàn cầu", body: "Phần mềm hỗ trợ triển khai nội bộ, vận hành cloud, đa ngôn ngữ và phương thức thanh toán theo quốc gia." },
      about: { kicker: "Về Batum", title: "Công ty R&D và sản xuất tập trung vào điều khiển servo", body: "Batum là công ty có năng lực R&D mạnh về điều khiển truyền động cho hệ thống kiểm soát ra vào và năng lực sản xuất phần cứng toàn diện. Sản phẩm của chúng tôi bao gồm kiểm soát ra vào cho xe và người đi bộ — barrier tốc độ cao, cổng người đi bộ dẫn động trực tiếp, cửa chắn sân ga và bộ mở cửa — tất cả đều là giải pháp servo điện áp thấp. An toàn là mục tiêu thiết kế hàng đầu của chúng tôi." },
      contact: { kicker: "Liên hệ", title: "Gửi yêu cầu dự án cho Batum", body: "Biểu mẫu gửi thông tin đến sales@batumaccess.com." },
      faq: { kicker: "FAQ", title: "Câu hỏi dự án thường gặp", body: "Câu trả lời cho khách hàng đang so sánh phần cứng bãi đỗ, sản phẩm ra vào và triển khai phần mềm." },
      "seo-hub": { kicker: "Kiến thức", title: "Trang nội dung có cấu trúc cho tìm kiếm", body: "Dùng trang này cho kiến thức sản phẩm, từ khóa danh mục và nội dung thị trường." }
    },
    productCategories: { "servo-barrier": "Barrier servo", "door-operator": "Bộ mở cửa", radar: "Radar", accessory: "Phụ kiện" },
    download: "Tải tài liệu",
    contactIntro: "Hãy cho biết quốc gia, số làn, sản phẩm và cách triển khai phần mềm.",
    firstSubmitNote: "Yêu cầu sẽ gửi đến sales@batumaccess.com. Lần đầu dùng FormSubmit có thể cần xác nhận.",
    form: { name: "Tên", company: "Công ty", email: "Email", whatsapp: "WhatsApp", country: "Quốc gia", product: "Sản phẩm", message: "Yêu cầu dự án", submit: "Gửi yêu cầu" }
  },
  ms: {
    nav: { home: "Laman Utama", solutions: "Penyelesaian", products: "Produk", cases: "Kes", software: "Perisian", about: "Tentang Kami", contact: "Hubungi", faq: "FAQ", "seo-hub": "Pengetahuan", admin: "Panel" },
    heroTitle: "Teknologi parkir pintar dan kawalan akses global",
    heroBody: "Perkakasan servo voltan rendah, radar keselamatan dan perisian parkir untuk projek antarabangsa.",
    primaryCta: "Hantar pertanyaan",
    secondaryCta: "Lihat produk",
    homeKicker: "Batum Technology",
    sections: {
      solutions: { kicker: "Penyelesaian", title: "Sistem untuk kenderaan, pejalan kaki dan transit", body: "Penyelesaian menggabungkan kawalan servo, logik akses, radar keselamatan dan integrasi perisian." },
      products: { kicker: "Produk", title: "Palang servo, penggerak pintu, radar dan aksesori", body: "Setiap produk distrukturkan untuk dokumen, kata kunci dan pengurusan masa depan." },
      cases: { kicker: "Kes", title: "Aplikasi untuk parkir, bangunan, transit dan ETC", body: "Halaman industri menerangkan penggunaan perkakasan dan perisian dalam projek sebenar." },
      software: { kicker: "Perisian", title: "Pelayan tempatan, cloud dan integrasi bayaran global", body: "Perisian menyokong pemasangan tempatan, operasi cloud, pelbagai bahasa dan bayaran negara." },
      about: { kicker: "Tentang Batum", title: "Syarikat R&D dan pembuatan kawalan akses servo", body: "Batum adalah syarikat dengan keupayaan R&D yang kukuh dalam kawalan pemacu untuk kawalan akses serta keupayaan pembuatan perkakasan yang menyeluruh. Produk kami merangkumi kawalan akses kenderaan dan pejalan kaki — palang berkelajuan tinggi, pintu pejalan kaki pemacu langsung, pintu platform dan penggerak pintu — semuanya sebagai penyelesaian servo voltan rendah. Keselamatan adalah objektif reka bentuk utama kami." },
      contact: { kicker: "Hubungi", title: "Hantar keperluan projek kepada Batum", body: "Borang menghantar maklumat kepada sales@batumaccess.com." },
      faq: { kicker: "FAQ", title: "Soalan projek yang biasa", body: "Jawapan untuk pembeli yang membandingkan perkakasan parkir, produk akses dan pemasangan perisian." },
      "seo-hub": { kicker: "Pengetahuan", title: "Halaman kandungan untuk pertumbuhan carian", body: "Gunakan halaman ini untuk pengetahuan produk, kata kunci kategori dan kandungan pasaran." }
    },
    productCategories: { "servo-barrier": "Palang servo", "door-operator": "Penggerak pintu", radar: "Radar", accessory: "Aksesori" },
    download: "Muat turun dokumen",
    contactIntro: "Beritahu negara, bilangan lorong, produk dan mod pemasangan perisian.",
    firstSubmitNote: "Pertanyaan akan dihantar ke sales@batumaccess.com. Penggunaan pertama FormSubmit mungkin perlu pengesahan.",
    form: { name: "Nama", company: "Syarikat", email: "Email", whatsapp: "WhatsApp", country: "Negara", product: "Produk", message: "Keperluan projek", submit: "Hantar pertanyaan" }
  },
  th: {
    nav: { home: "หน้าแรก", solutions: "โซลูชัน", products: "สินค้า", cases: "กรณีใช้งาน", software: "ซอฟต์แวร์", about: "เกี่ยวกับเรา", contact: "ติดต่อ", faq: "FAQ", "seo-hub": "ความรู้", admin: "จัดการ" },
    heroTitle: "เทคโนโลยีที่จอดรถอัจฉริยะและควบคุมทางเข้าออกระดับโลก",
    heroBody: "ฮาร์ดแวร์เซอร์โวแรงดันต่ำ เรดาร์นิรภัย และซอฟต์แวร์จอดรถสำหรับโครงการต่างประเทศ",
    primaryCta: "ส่งคำถาม",
    secondaryCta: "ดูสินค้า",
    homeKicker: "Batum Technology",
    sections: {
      solutions: { kicker: "โซลูชัน", title: "ระบบสำหรับรถ คนเดิน และระบบขนส่ง", body: "โซลูชันรวมการควบคุมเซอร์โว ตรรกะทางเข้าออก เรดาร์นิรภัย และการเชื่อมต่อซอฟต์แวร์" },
      products: { kicker: "สินค้า", title: "ไม้กั้นเซอร์โว ชุดเปิดประตู เรดาร์ และอุปกรณ์เสริม", body: "สินค้าถูกจัดโครงสร้างสำหรับเอกสาร คำค้นหา และการจัดการเนื้อหาในอนาคต" },
      cases: { kicker: "กรณีใช้งาน", title: "ลานจอดรถ อาคาร ระบบราง และช่องทาง ETC", body: "หน้าอุตสาหกรรมช่วยให้ลูกค้าเข้าใจการใช้งานฮาร์ดแวร์และซอฟต์แวร์ในโครงการจริง" },
      software: { kicker: "ซอฟต์แวร์", title: "เซิร์ฟเวอร์ภายใน แพลตฟอร์ม cloud และการชำระเงินทั่วโลก", body: "ซอฟต์แวร์รองรับการติดตั้งภายใน การทำงานบน cloud หลายภาษา และวิธีชำระเงินตามประเทศ" },
      about: { kicker: "เกี่ยวกับ Batum", title: "บริษัทวิจัยและผลิตระบบควบคุมทางเข้าออกเซอร์โว", body: "Batum เป็นบริษัทที่มีศักยภาพด้านการวิจัยและพัฒนาระบบควบคุมไดรฟ์สำหรับควบคุมทางเข้าอย่างแข็งแกร่ง พร้อมความสามารถด้านการผลิตฮาร์ดแวร์ที่ครบวงจร สินค้าของเราครอบคลุมการควบคุมทางเข้าทั้งสำหรับรถและคนเดิน ได้แก่ ไม้กั้นความเร็วสูง ประตูคนเดิน direct-drive ประตูกั้นชานชาลา และชุดเปิดประตู ทั้งหมดเป็นโซลูชันเซอร์โวแรงดันต่ำ ความปลอดภัยคือเป้าหมายการออกแบบอันดับหนึ่งของเรา" },
      contact: { kicker: "ติดต่อ", title: "ส่งข้อมูลโครงการให้ Batum", body: "แบบฟอร์มจะส่งข้อมูลไปที่ sales@batumaccess.com" },
      faq: { kicker: "FAQ", title: "คำถามโครงการที่พบบ่อย", body: "คำตอบสำหรับผู้ซื้อที่เปรียบเทียบฮาร์ดแวร์จอดรถ สินค้าควบคุมทางเข้าออก และการติดตั้งซอฟต์แวร์" },
      "seo-hub": { kicker: "ความรู้", title: "หน้าความรู้แบบมีโครงสร้างสำหรับการค้นหา", body: "ใช้หน้านี้สำหรับความรู้สินค้า คำค้นหาหมวดหมู่ และเนื้อหาตลาด" }
    },
    productCategories: { "servo-barrier": "ไม้กั้นเซอร์โว", "door-operator": "ชุดเปิดประตู", radar: "เรดาร์", accessory: "อุปกรณ์เสริม" },
    download: "ดาวน์โหลดเอกสาร",
    contactIntro: "โปรดระบุประเทศ จำนวนเลน สินค้า และรูปแบบติดตั้งซอฟต์แวร์",
    firstSubmitNote: "คำถามจะถูกส่งไปที่ sales@batumaccess.com การใช้ FormSubmit ครั้งแรกอาจต้องยืนยันอีเมล",
    form: { name: "ชื่อ", company: "บริษัท", email: "Email", whatsapp: "WhatsApp", country: "ประเทศ", product: "สินค้า", message: "ข้อมูลโครงการ", submit: "ส่งคำถาม" }
  },
  ja: {
    nav: { home: "ホーム", solutions: "ソリューション", products: "製品", cases: "導入事例", software: "ソフトウェア", about: "会社概要", contact: "お問い合わせ", faq: "よくある質問", "seo-hub": "インサイト", admin: "コンテンツ管理" },
    heroTitle: "グローバルスマート駐車場・入退室管理技術",
    heroBody: "国際的な駐車場、ゲート、交通プロジェクト向けの低電圧サーボハードウェア、安全レーダーアクセサリー、駐車場ソフトウェア。",
    primaryCta: "お問い合わせ",
    secondaryCta: "製品を見る",
    homeKicker: companyName.ja,
    sections: {
      solutions: { kicker: "ソリューション", title: "車両・歩行者・交通アクセスのための統合システム", body: "サーボ制御、入退室ロジック、レーダー安全機能、ソフトウェア統合を組み合わせたモジュール型ソリューション。" },
      products: { kicker: "製品", title: "サーボバリア、ドアオペレーター、レーダー、アクセサリーのカテゴリー", body: "各製品モジュールは資料、キーワード、今後のアップロード管理に対応した構成になっています。" },
      cases: { kicker: "導入事例", title: "駐車場、商業施設、鉄道交通、ETCレーン向けの活用ページ", body: "業界別ページにより、実際のプロジェクトにおけるハードウェアとソフトウェアの適用方法を理解しやすくなります。" },
      software: { kicker: "ソフトウェア", title: "ローカルサーバー、クラウドプラットフォーム、グローバル決済統合", body: "駐車場ソフトウェアはローカル展開、クラウド運用、多言語対応、各国の決済方法に対応可能です。" },
      about: { kicker: "Batumについて", title: "低電圧サーボ入退室管理に特化した研究開発・製造企業", body: "Batumは入退室管理の駆動制御において高い研究開発力を持ち、総合的なハードウェア製造能力を備えた企業です。当社の製品は車両・歩行者の入退室管理の両方をカバーしており、高速バリアゲート、直動式歩行者ゲート、プラットフォームスクリーンドア、ドアオペレーターなど、すべて低電圧サーボソリューションとして構築されています。安全性が当社の第一の設計目標です。" },
      contact: { kicker: "お問い合わせ", title: "Batum Technologyにプロジェクト要件をお送りください", body: "お問い合わせフォームの内容は sales@batumaccess.com に送信されます。" },
      faq: { kicker: "よくある質問", title: "プロジェクトに関するよくある質問", body: "駐車場ハードウェア、入退室管理製品、ソフトウェア導入方法を比較検討中の購入者向けの明確な回答。" },
      "seo-hub": { kicker: "インサイト", title: "検索流入拡大のための構造化コンテンツページ", body: "このセクションは製品知識、カテゴリー記事、市場別コンテンツを今後拡充していくために使用します。" }
    },
    productCategories: { "servo-barrier": "サーボバリア", "door-operator": "ドアオペレーター", radar: "レーダー", accessory: "アクセサリー" },
    download: "資料をダウンロード",
    contactIntro: "国、レーン数、必要な製品、ソフトウェアの導入方式をお知らせください。",
    firstSubmitNote: "お問い合わせは sales@batumaccess.com に送信されます。初回のFormSubmit利用時はメールでの確認が必要な場合があります。",
    form: { name: "お名前", company: "会社名", email: "メールアドレス", whatsapp: "WhatsApp", country: "国", product: "興味のある製品", message: "プロジェクト要件", submit: "お問い合わせを送信" }
  },
  ko: {
    nav: { home: "홈", solutions: "솔루션", products: "제품", cases: "사례", software: "소프트웨어", about: "회사 소개", contact: "문의하기", faq: "자주 묻는 질문", "seo-hub": "인사이트", admin: "콘텐츠 관리" },
    heroTitle: "글로벌 스마트 주차 및 출입 통제 기술",
    heroBody: "국제 주차, 게이트, 교통 프로젝트를 위한 저전압 서보 하드웨어, 안전 레이더 액세서리, 주차 소프트웨어.",
    primaryCta: "문의하기",
    secondaryCta: "제품 보기",
    homeKicker: companyName.ko,
    sections: {
      solutions: { kicker: "솔루션", title: "차량, 보행자 및 교통 출입을 위한 통합 시스템", body: "서보 제어, 출입 로직, 레이더 안전 기능, 소프트웨어 통합을 결합한 모듈형 솔루션." },
      products: { kicker: "제품", title: "서보 바리케이드, 도어 오퍼레이터, 레이더 및 액세서리 카테고리", body: "각 제품 모듈은 데이터시트, 프로젝트 키워드, 향후 업로드 관리를 위해 구성되어 있습니다." },
      cases: { kicker: "사례", title: "주차장, 건물, 철도 교통 및 ETC 차로를 위한 활용 페이지", body: "산업별 페이지는 구매자가 실제 프로젝트에서 하드웨어와 소프트웨어가 어떻게 적용되는지 이해하는 데 도움을 줍니다." },
      software: { kicker: "소프트웨어", title: "로컬 서버, 클라우드 플랫폼 및 글로벌 결제 통합", body: "주차 소프트웨어는 로컬 배포, 클라우드 운영, 다국어 지원 및 국가별 결제 방식을 지원할 수 있습니다." },
      about: { kicker: "Batum 소개", title: "저전압 서보 출입 통제에 집중하는 연구개발 및 제조 기업", body: "Batum은 출입 통제 구동 제어 분야에서 강력한 연구개발 역량과 종합적인 하드웨어 제조 역량을 갖춘 기업입니다. 당사의 제품은 차량 및 보행자 출입 통제를 모두 아우르며, 고속 바리케이드 게이트, 직동식 보행자 게이트, 플랫폼 스크린도어, 도어 오퍼레이터 등 모두 저전압 서보 솔루션으로 구성되어 있습니다. 안전은 저희의 최우선 설계 목표입니다." },
      contact: { kicker: "문의하기", title: "Batum Technology에 프로젝트 요구사항을 보내주세요", body: "문의 양식의 내용은 sales@batumaccess.com 으로 전송됩니다." },
      faq: { kicker: "자주 묻는 질문", title: "프로젝트 관련 자주 묻는 질문", body: "주차 하드웨어, 출입 통제 제품, 소프트웨어 배포 방식을 비교 중인 구매자를 위한 명확한 답변." },
      "seo-hub": { kicker: "인사이트", title: "검색 유입 성장을 위한 구조화된 콘텐츠 페이지", body: "이 섹션은 제품 지식, 카테고리별 콘텐츠, 시장별 콘텐츠를 지속적으로 확장하는 데 사용됩니다." }
    },
    productCategories: { "servo-barrier": "서보 바리케이드", "door-operator": "도어 오퍼레이터", radar: "레이더", accessory: "액세서리" },
    download: "데이터시트 다운로드",
    contactIntro: "국가, 차로 수, 필요한 제품 및 소프트웨어 배포 방식을 알려주세요.",
    firstSubmitNote: "문의 내용은 sales@batumaccess.com 으로 전송됩니다. FormSubmit 최초 사용 시 이메일 확인이 필요할 수 있습니다.",
    form: { name: "이름", company: "회사명", email: "이메일", whatsapp: "WhatsApp", country: "국가", product: "관심 제품", message: "프로젝트 요구사항", submit: "문의 보내기" }
  }
};

type CardItem = { icon: keyof typeof iconMap; title: string; body: string };

export const solutionCards: Record<LocaleKey, CardItem[]> = {
  en: [
    { icon: "parking", title: "Smart parking", body: "LPR, barrier control, radar protection and parking payment workflows." },
    { icon: "transit", title: "Rail transit access", body: "AFC gates, platform screen door control and station access integration." },
    { icon: "operator", title: "Door operator control", body: "Low-voltage servo drive logic for automatic door and gate movement." },
    { icon: "safety", title: "Safety radar", body: "Anti-smash and anti-pinch detection for vehicle and pedestrian safety." }
  ],
  "zh-hant": [
    { icon: "parking", title: "智慧停車", body: "車牌辨識、道閘控制、雷達防護與停車繳費流程。" },
    { icon: "transit", title: "軌道交通門禁", body: "自動售票閘機（AFC）、站台屏蔽門控制與車站門禁整合。" },
    { icon: "operator", title: "開門機控制", body: "用於自動門與閘門動作的低壓伺服驅動邏輯。" },
    { icon: "safety", title: "安全雷達", body: "針對車輛與行人安全的防砸防夾偵測。" }
  ],
  es: [
    { icon: "parking", title: "Parking inteligente", body: "Reconocimiento de placas, control de barreras, protección por radar y flujos de pago de parking." },
    { icon: "transit", title: "Acceso a tránsito ferroviario", body: "Puertas AFC, control de puertas de andén e integración de acceso a estaciones." },
    { icon: "operator", title: "Control de operador de puerta", body: "Lógica de accionamiento servo de bajo voltaje para el movimiento automático de puertas y portones." },
    { icon: "safety", title: "Radar de seguridad", body: "Detección antiaplastamiento y antipinzamiento para la seguridad de vehículos y peatones." }
  ],
  vi: [
    { icon: "parking", title: "Bãi đỗ xe thông minh", body: "Nhận diện biển số, điều khiển barrier, bảo vệ bằng radar và quy trình thanh toán bãi đỗ." },
    { icon: "transit", title: "Kiểm soát ra vào giao thông đường sắt", body: "Cổng AFC, điều khiển cửa chắn sân ga và tích hợp kiểm soát ra vào nhà ga." },
    { icon: "operator", title: "Điều khiển bộ mở cửa", body: "Logic truyền động servo điện áp thấp cho chuyển động của cửa và cổng tự động." },
    { icon: "safety", title: "Radar an toàn", body: "Phát hiện chống đập và chống kẹp cho an toàn của xe và người đi bộ." }
  ],
  ms: [
    { icon: "parking", title: "Parkir pintar", body: "Pengecaman plat nombor, kawalan palang, perlindungan radar dan aliran pembayaran parkir." },
    { icon: "transit", title: "Akses transit rel", body: "Pintu AFC, kawalan pintu platform dan integrasi akses stesen." },
    { icon: "operator", title: "Kawalan penggerak pintu", body: "Logik pemacu servo voltan rendah untuk pergerakan pintu dan get automatik." },
    { icon: "safety", title: "Radar keselamatan", body: "Pengesanan anti-hentam dan anti-pinch untuk keselamatan kenderaan dan pejalan kaki." }
  ],
  th: [
    { icon: "parking", title: "ที่จอดรถอัจฉริยะ", body: "การอ่านทะเบียนรถ การควบคุมไม้กั้น การป้องกันด้วยเรดาร์ และขั้นตอนการชำระเงินที่จอดรถ" },
    { icon: "transit", title: "การเข้าถึงระบบขนส่งทางราง", body: "ประตู AFC การควบคุมประตูกั้นชานชาลา และการเชื่อมต่อระบบเข้าออกสถานี" },
    { icon: "operator", title: "การควบคุมชุดเปิดประตู", body: "ตรรกะการขับเคลื่อนเซอร์โวแรงดันต่ำสำหรับการเคลื่อนที่ของประตูและไม้กั้นอัตโนมัติ" },
    { icon: "safety", title: "เรดาร์นิรภัย", body: "การตรวจจับป้องกันการชนและหนีบเพื่อความปลอดภัยของรถและคนเดิน" }
  ],
  ja: [
    { icon: "parking", title: "スマート駐車場", body: "ナンバープレート認識、バリア制御、レーダー保護、駐車料金決済のワークフロー。" },
    { icon: "transit", title: "鉄道交通アクセス", body: "AFCゲート、プラットフォームスクリーンドア制御、駅構内アクセス統合。" },
    { icon: "operator", title: "ドアオペレーター制御", body: "自動ドア・ゲート動作のための低電圧サーボ駆動ロジック。" },
    { icon: "safety", title: "安全レーダー", body: "車両・歩行者の安全のための衝突・挟み込み防止検知。" }
  ],
  ko: [
    { icon: "parking", title: "스마트 주차", body: "번호판 인식, 차단기 제어, 레이더 보호, 주차 결제 워크플로우." },
    { icon: "transit", title: "철도 교통 출입", body: "AFC 게이트, 플랫폼 스크린도어 제어, 역사 출입 통합." },
    { icon: "operator", title: "도어 오퍼레이터 제어", body: "자동문 및 게이트 작동을 위한 저전압 서보 구동 로직." },
    { icon: "safety", title: "안전 레이더", body: "차량 및 보행자 안전을 위한 충돌·협착 방지 감지." }
  ]
};

export const caseCards: Record<LocaleKey, CardItem[]> = {
  en: [
    { icon: "parking", title: "Parking lots", body: "Ticketless parking entry, exit payment and vehicle access management." },
    { icon: "building", title: "Commercial buildings", body: "Office, hotel, mall and residential mixed-use entrance control." },
    { icon: "transit", title: "Rail transit", body: "AFC, platform screen door and passenger flow access systems." },
    { icon: "fast", title: "Highway ETC", body: "Fast vehicle lane control and integration with identification systems." }
  ],
  "zh-hant": [
    { icon: "parking", title: "停車場", body: "免票入場、出場繳費與車輛出入管理。" },
    { icon: "building", title: "商業建築", body: "辦公室、飯店、商場與住宅混合用途的出入口控制。" },
    { icon: "transit", title: "軌道交通", body: "自動售票閘機、站台屏蔽門與人流出入系統。" },
    { icon: "fast", title: "高速公路 ETC", body: "快速車道控制與識別系統整合。" }
  ],
  es: [
    { icon: "parking", title: "Estacionamientos", body: "Entrada sin boleto, pago de salida y gestión de acceso vehicular." },
    { icon: "building", title: "Edificios comerciales", body: "Control de acceso para uso mixto de oficinas, hoteles, centros comerciales y residencial." },
    { icon: "transit", title: "Tránsito ferroviario", body: "Sistemas de acceso AFC, puertas de andén y flujo de pasajeros." },
    { icon: "fast", title: "ETC en autopistas", body: "Control de carril rápido para vehículos e integración con sistemas de identificación." }
  ],
  vi: [
    { icon: "parking", title: "Bãi đỗ xe", body: "Vào không cần vé, thanh toán khi ra và quản lý ra vào xe." },
    { icon: "building", title: "Tòa nhà thương mại", body: "Kiểm soát lối vào cho văn phòng, khách sạn, trung tâm thương mại và khu dân cư hỗn hợp." },
    { icon: "transit", title: "Giao thông đường sắt", body: "Hệ thống AFC, cửa chắn sân ga và kiểm soát luồng hành khách." },
    { icon: "fast", title: "ETC trên đường cao tốc", body: "Điều khiển làn xe nhanh và tích hợp với hệ thống nhận diện." }
  ],
  ms: [
    { icon: "parking", title: "Tempat letak kereta", body: "Kemasukan tanpa tiket, pembayaran keluar dan pengurusan akses kenderaan." },
    { icon: "building", title: "Bangunan komersial", body: "Kawalan pintu masuk untuk pejabat, hotel, pusat membeli-belah dan kediaman bercampur." },
    { icon: "transit", title: "Transit rel", body: "Sistem AFC, pintu platform dan kawalan aliran penumpang." },
    { icon: "fast", title: "ETC lebuh raya", body: "Kawalan lorong pantas dan integrasi dengan sistem pengecaman." }
  ],
  th: [
    { icon: "parking", title: "ลานจอดรถ", body: "เข้าโดยไม่ใช้ตั๋ว ชำระเงินตอนออก และการจัดการเข้าออกของรถ" },
    { icon: "building", title: "อาคารพาณิชย์", body: "ควบคุมทางเข้าสำหรับสำนักงาน โรงแรม ห้างสรรพสินค้า และที่พักอาศัยแบบผสมผสาน" },
    { icon: "transit", title: "ระบบขนส่งทางราง", body: "ระบบ AFC ประตูกั้นชานชาลา และควบคุมการเข้าออกของผู้โดยสาร" },
    { icon: "fast", title: "ETC บนทางหลวง", body: "ควบคุมช่องทางความเร็วสูงและเชื่อมต่อกับระบบระบุตัวตน" }
  ],
  ja: [
    { icon: "parking", title: "駐車場", body: "チケットレス入場、出場時決済、車両アクセス管理。" },
    { icon: "building", title: "商業施設", body: "オフィス、ホテル、モール、住宅複合施設の入口管理。" },
    { icon: "transit", title: "鉄道交通", body: "AFC、プラットフォームスクリーンドア、旅客動線アクセスシステム。" },
    { icon: "fast", title: "高速道路ETC", body: "高速車線制御と識別システムとの統合。" }
  ],
  ko: [
    { icon: "parking", title: "주차장", body: "무티켓 입차, 출차 시 결제, 차량 출입 관리." },
    { icon: "building", title: "상업용 건물", body: "오피스, 호텔, 몰, 주거 복합시설의 출입 통제." },
    { icon: "transit", title: "철도 교통", body: "AFC, 플랫폼 스크린도어, 승객 동선 출입 시스템." },
    { icon: "fast", title: "고속도로 ETC", body: "고속 차로 제어 및 식별 시스템 통합." }
  ]
};

export const softwareFeatures: Record<LocaleKey, Array<{ title: string; body: string }>> = {
  en: [
    { title: "Local server deployment", body: "Install the parking platform on an on-site server for buyers who require offline operation or strict data residency." },
    { title: "Cloud platform operation", body: "Run the platform on Batum's cloud infrastructure for fast rollout across multiple sites without local server maintenance." },
    { title: "Global payment integration", body: "Connect country-specific payment gateways and QR/card methods for ticketless and unattended parking." },
    { title: "Multilingual UI", body: "Operator and customer-facing screens can switch between languages to match local staff and drivers." },
    { title: "API integration", body: "Open interfaces let system integrators connect the platform with existing property, ERP or access control systems." },
    { title: "Parking data reporting", body: "Occupancy, revenue and lane usage reports help operators track performance and plan capacity." }
  ],
  "zh-hant": [
    { title: "本地伺服器部署", body: "為需要離線運作或嚴格資料留存要求的買家，將停車平台安裝於現場伺服器。" },
    { title: "雲端平台營運", body: "在巴圖姆雲端基礎架構上運行平台，快速在多個場站部署，無需維護本地伺服器。" },
    { title: "全球支付整合", body: "串接各國支付閘道與 QR/信用卡付款方式，支援無人化與免票停車。" },
    { title: "多語言介面", body: "操作端與客戶端畫面可切換語言，配合當地員工與駕駛使用。" },
    { title: "API 整合", body: "開放介面讓系統整合商可將平台與既有物業、ERP 或門禁系統串接。" },
    { title: "停車數據報表", body: "佔用率、營收與車道使用報表協助營運方追蹤績效並規劃產能。" }
  ],
  es: [
    { title: "Despliegue en servidor local", body: "Instale la plataforma de parking en un servidor local para compradores que requieren operación sin conexión o residencia estricta de datos." },
    { title: "Operación en plataforma cloud", body: "Ejecute la plataforma en la infraestructura cloud de Batum para un despliegue rápido en múltiples sitios sin mantener servidores locales." },
    { title: "Integración de pagos globales", body: "Conecte pasarelas de pago específicas de cada país y métodos QR/tarjeta para parking sin boleto y desatendido." },
    { title: "Interfaz multilingüe", body: "Las pantallas de operador y cliente pueden cambiar de idioma según el personal local y los conductores." },
    { title: "Integración por API", body: "Las interfaces abiertas permiten a los integradores conectar la plataforma con sistemas existentes de propiedad, ERP o control de acceso." },
    { title: "Informes de datos de parking", body: "Los informes de ocupación, ingresos y uso de carriles ayudan a los operadores a medir el rendimiento y planificar capacidad." }
  ],
  vi: [
    { title: "Triển khai máy chủ nội bộ", body: "Cài đặt phần mềm bãi đỗ trên máy chủ tại chỗ cho khách hàng cần vận hành offline hoặc yêu cầu lưu trữ dữ liệu nghiêm ngặt." },
    { title: "Vận hành trên nền tảng cloud", body: "Chạy phần mềm trên hạ tầng cloud của Batum để triển khai nhanh tại nhiều địa điểm mà không cần duy trì máy chủ nội bộ." },
    { title: "Tích hợp thanh toán toàn cầu", body: "Kết nối cổng thanh toán theo từng quốc gia và phương thức QR/thẻ cho bãi đỗ không cần vé và không người trông." },
    { title: "Giao diện đa ngôn ngữ", body: "Màn hình cho người vận hành và khách hàng có thể đổi ngôn ngữ phù hợp với nhân viên và lái xe địa phương." },
    { title: "Tích hợp API", body: "Giao diện mở cho phép đơn vị tích hợp hệ thống kết nối phần mềm với hệ thống bất động sản, ERP hoặc kiểm soát ra vào hiện có." },
    { title: "Báo cáo dữ liệu bãi đỗ", body: "Báo cáo tỷ lệ sử dụng, doanh thu và làn xe giúp đơn vị vận hành theo dõi hiệu suất và lập kế hoạch công suất." }
  ],
  ms: [
    { title: "Pemasangan pelayan tempatan", body: "Pasang platform parkir pada pelayan di lokasi untuk pembeli yang memerlukan operasi luar talian atau keperluan kediaman data yang ketat." },
    { title: "Operasi platform cloud", body: "Jalankan platform pada infrastruktur cloud Batum untuk pelancaran pantas merentasi pelbagai lokasi tanpa perlu menyelenggara pelayan tempatan." },
    { title: "Integrasi bayaran global", body: "Sambungkan get bayaran mengikut negara dan kaedah QR/kad untuk parkir tanpa tiket dan tanpa pengawal." },
    { title: "Antara muka pelbagai bahasa", body: "Skrin operator dan pelanggan boleh menukar bahasa mengikut kakitangan tempatan dan pemandu." },
    { title: "Integrasi API", body: "Antara muka terbuka membolehkan pengintegrasi sistem menyambungkan platform dengan sistem hartanah, ERP atau kawalan akses sedia ada." },
    { title: "Laporan data parkir", body: "Laporan kadar penggunaan, hasil dan penggunaan lorong membantu pengendali menjejaki prestasi dan merancang kapasiti." }
  ],
  th: [
    { title: "การติดตั้งเซิร์ฟเวอร์ภายใน", body: "ติดตั้งซอฟต์แวร์ที่จอดรถบนเซิร์ฟเวอร์ภายในสถานที่ สำหรับผู้ซื้อที่ต้องการทำงานแบบออฟไลน์หรือมีข้อกำหนดด้านการเก็บข้อมูลที่เข้มงวด" },
    { title: "การดำเนินงานบนคลาวด์", body: "รันซอฟต์แวร์บนโครงสร้างพื้นฐานคลาวด์ของ Batum เพื่อเปิดใช้งานได้รวดเร็วในหลายสถานที่โดยไม่ต้องดูแลเซิร์ฟเวอร์ภายใน" },
    { title: "การเชื่อมต่อการชำระเงินทั่วโลก", body: "เชื่อมต่อเกตเวย์การชำระเงินตามแต่ละประเทศและวิธีการชำระผ่าน QR/บัตร สำหรับที่จอดรถแบบไม่ใช้ตั๋วและไม่มีเจ้าหน้าที่" },
    { title: "อินเทอร์เฟซหลายภาษา", body: "หน้าจอสำหรับผู้ปฏิบัติงานและลูกค้าสามารถเปลี่ยนภาษาให้เหมาะกับพนักงานท้องถิ่นและผู้ขับขี่" },
    { title: "การเชื่อมต่อ API", body: "อินเทอร์เฟซแบบเปิดให้ผู้รวมระบบเชื่อมต่อซอฟต์แวร์กับระบบอสังหาริมทรัพย์ ERP หรือระบบควบคุมทางเข้าที่มีอยู่" },
    { title: "รายงานข้อมูลที่จอดรถ", body: "รายงานอัตราการใช้งาน รายได้ และการใช้ช่องทางช่วยให้ผู้ดำเนินงานติดตามประสิทธิภาพและวางแผนกำลังการรองรับ" }
  ],
  ja: [
    { title: "ローカルサーバー展開", body: "オフライン運用や厳格なデータ保管要件が必要な購入者向けに、駐車場プラットフォームをオンサイトサーバーに設置します。" },
    { title: "クラウドプラットフォーム運用", body: "Batumのクラウドインフラ上でプラットフォームを稼働し、ローカルサーバーの保守なしで複数拠点への迅速な展開を実現します。" },
    { title: "グローバル決済統合", body: "国別の決済ゲートウェイやQR/カード決済を接続し、チケットレス・無人駐車を実現します。" },
    { title: "多言語UI", body: "オペレーター画面・顧客向け画面は、現地スタッフやドライバーに合わせて言語を切り替えられます。" },
    { title: "API統合", body: "オープンなインターフェースにより、システムインテグレーターが既存の物件管理・ERP・入退室管理システムとプラットフォームを連携できます。" },
    { title: "駐車データレポート", body: "稼働率、収益、車線利用状況のレポートにより、運営者はパフォーマンスの把握と容量計画を行えます。" }
  ],
  ko: [
    { title: "로컬 서버 배포", body: "오프라인 운영이나 엄격한 데이터 보관 요건이 필요한 구매자를 위해 주차 플랫폼을 현장 서버에 설치합니다." },
    { title: "클라우드 플랫폼 운영", body: "Batum의 클라우드 인프라에서 플랫폼을 운영하여 로컬 서버 유지보수 없이 여러 사이트에 신속하게 배포할 수 있습니다." },
    { title: "글로벌 결제 통합", body: "국가별 결제 게이트웨이와 QR/카드 결제 방식을 연동하여 무티켓·무인 주차를 지원합니다." },
    { title: "다국어 UI", body: "운영자 및 고객 화면은 현지 직원과 운전자에 맞게 언어를 전환할 수 있습니다." },
    { title: "API 통합", body: "개방형 인터페이스를 통해 시스템 통합업체가 기존 부동산, ERP 또는 출입 통제 시스템과 플랫폼을 연동할 수 있습니다." },
    { title: "주차 데이터 리포트", body: "점유율, 수익, 차로 이용 현황 리포트를 통해 운영자가 성과를 추적하고 용량을 계획할 수 있습니다." }
  ]
};

export const seoTopics: string[] = seoTopicsSeed;

export const faqs: Record<LocaleKey, Array<{ q: string; a: string }>> = {
  en: [
    { q: "Can Batum parking software be deployed locally?", a: "Yes. Batum parking software can be planned for local server deployment or cloud platform operation depending on the project network and operator requirements." },
    { q: "Which product categories are available?", a: "The current categories include low-voltage servo barrier gates, servo door operators, safety radar sensors and access control accessories." },
    { q: "Can products include downloadable documents?", a: "Yes. Product cards support datasheet download links, and the content hub can record document names and draft document links." }
  ],
  "zh-hant": [
    { q: "停車軟體可以本地部署嗎？", a: "可以。可根據項目網路與營運需求規劃本地伺服器部署或雲端平台營運。" },
    { q: "目前有哪些產品分類？", a: "目前包含低壓伺服道閘、伺服開門機、安全雷達與門禁控制配件。" },
    { q: "產品可以下載說明文件嗎？", a: "可以。產品卡片支援說明文件下載連結，內容後台可記錄文件名稱與草稿連結。" }
  ],
  es: [
    { q: "¿El software puede instalarse localmente?", a: "Sí. Puede planificarse como servidor local o plataforma cloud según la red del proyecto." },
    { q: "¿Qué categorías de productos existen?", a: "Barrera servo, operador de puerta servo, radar de seguridad y accesorios de control de acceso." },
    { q: "¿Los productos pueden tener documentos descargables?", a: "Sí. Las tarjetas de producto admiten enlaces de descarga de fichas técnicas." }
  ],
  vi: [
    { q: "Phần mềm có thể triển khai nội bộ không?", a: "Có. Có thể dùng máy chủ nội bộ hoặc nền tảng cloud theo yêu cầu dự án." },
    { q: "Có những nhóm sản phẩm nào?", a: "Barrier servo, bộ mở cửa servo, radar an toàn và phụ kiện kiểm soát ra vào." },
    { q: "Sản phẩm có tài liệu tải xuống không?", a: "Có. Thẻ sản phẩm hỗ trợ liên kết tải tài liệu kỹ thuật." }
  ],
  ms: [
    { q: "Bolehkah perisian dipasang secara tempatan?", a: "Boleh. Ia boleh dirancang untuk pelayan tempatan atau platform cloud mengikut projek." },
    { q: "Apakah kategori produk?", a: "Palang servo, penggerak pintu servo, radar keselamatan dan aksesori kawalan akses." },
    { q: "Bolehkah produk mempunyai dokumen muat turun?", a: "Boleh. Kad produk menyokong pautan muat turun dokumen." }
  ],
  th: [
    { q: "ซอฟต์แวร์ติดตั้งภายในได้หรือไม่?", a: "ได้ สามารถวางแผนเป็นเซิร์ฟเวอร์ภายในหรือแพลตฟอร์ม cloud ตามเงื่อนไขโครงการ" },
    { q: "มีหมวดสินค้าใดบ้าง?", a: "ไม้กั้นเซอร์โว ชุดเปิดประตูเซอร์โว เรดาร์นิรภัย และอุปกรณ์ควบคุมทางเข้าออก" },
    { q: "สินค้ามีเอกสารดาวน์โหลดได้หรือไม่?", a: "ได้ การ์ดสินค้ารองรับลิงก์ดาวน์โหลดเอกสารทางเทคนิค" }
  ],
  ja: [
    { q: "Batumの駐車場ソフトウェアはローカル展開できますか？", a: "はい。プロジェクトのネットワークや運用要件に応じて、ローカルサーバー展開またはクラウドプラットフォーム運用を計画できます。" },
    { q: "どのような製品カテゴリーがありますか？", a: "現在のカテゴリーには、低電圧サーボバリアゲート、サーボドアオペレーター、安全レーダーセンサー、入退室管理アクセサリーが含まれます。" },
    { q: "製品にはダウンロード可能な資料がありますか？", a: "はい。製品カードは資料ダウンロードリンクに対応しており、コンテンツ管理画面で資料名やリンクの下書きを記録できます。" }
  ],
  ko: [
    { q: "Batum 주차 소프트웨어를 로컬로 배포할 수 있나요?", a: "네. 프로젝트 네트워크와 운영 요구사항에 따라 로컬 서버 배포 또는 클라우드 플랫폼 운영으로 계획할 수 있습니다." },
    { q: "어떤 제품 카테고리가 있나요?", a: "현재 카테고리에는 저전압 서보 바리케이드, 서보 도어 오퍼레이터, 안전 레이더 센서, 출입 통제 액세서리가 포함됩니다." },
    { q: "제품에 다운로드 가능한 문서가 포함되나요?", a: "네. 제품 카드는 데이터시트 다운로드 링크를 지원하며, 콘텐츠 관리 화면에서 문서명과 초안 링크를 기록할 수 있습니다." }
  ]
};

export function localePath(locale: LocaleKey, slug?: PageSlug) {
  if (locale === defaultLocale) {
    return slug ? `/${slug}/` : "/";
  }
  return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}
