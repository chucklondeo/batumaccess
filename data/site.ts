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

export type LocaleKey = "en" | "zh-hant" | "es" | "vi" | "ms" | "th";
export type PageSlug = "solutions" | "products" | "cases" | "software" | "about" | "faq" | "contact" | "seo-hub";

export const defaultLocale: LocaleKey = "en";

export const locales: Array<{ key: LocaleKey; label: string; native: string; market: string }> = [
  { key: "en", label: "English", native: "English", market: "Global" },
  { key: "zh-hant", label: "Traditional Chinese", native: "繁體中文", market: "Hong Kong / Taiwan" },
  { key: "es", label: "Spanish", native: "Español", market: "Spain / LATAM" },
  { key: "vi", label: "Vietnamese", native: "Tiếng Việt", market: "Vietnam" },
  { key: "ms", label: "Malay", native: "Bahasa Melayu", market: "Malaysia" },
  { key: "th", label: "Thai", native: "ไทย", market: "Thailand" }
];

export const pageSlugs: PageSlug[] = ["solutions", "products", "cases", "software", "about", "faq", "contact", "seo-hub"];

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
  th: "Batum Technology"
};

export const aboutHighlights: Record<LocaleKey, string[]> = {
  en: ["Drive control R&D", "Hardware manufacturing", "Low-voltage servo systems", "Safety-first product design"],
  "zh-hant": ["門禁驅動控制研發", "硬體生產製造", "低壓伺服系統", "安全優先的產品設計"],
  es: ["I+D en control de accionamiento", "Fabricación de hardware", "Sistemas servo de bajo voltaje", "Diseño de producto centrado en la seguridad"],
  vi: ["R&D điều khiển truyền động", "Sản xuất phần cứng", "Hệ thống servo điện áp thấp", "Thiết kế sản phẩm ưu tiên an toàn"],
  ms: ["R&D kawalan pemacu", "Pembuatan perkakasan", "Sistem servo voltan rendah", "Reka bentuk produk keutamaan keselamatan"],
  th: ["วิจัยและพัฒนาระบบควบคุมไดรฟ์", "การผลิตฮาร์ดแวร์", "ระบบเซอร์โวแรงดันต่ำ", "ออกแบบผลิตภัณฑ์โดยเน้นความปลอดภัยเป็นหลัก"]
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
      th: "ไม้กั้นรถยนต์เซอร์โวแรงดันต่ำ"
    },
    summary: {
      en: "Fast, stable and safety-focused parking lane barrier for commercial and public projects.",
      "zh-hant": "適用於商業與公共停車場的高速、穩定、安全型車道道閘。",
      es: "Barrera rápida y estable para carriles de estacionamiento comercial y público.",
      vi: "Barrier làn xe nhanh, ổn định và an toàn cho bãi đỗ thương mại và công cộng.",
      ms: "Palang parkir yang pantas, stabil dan selamat untuk projek komersial dan awam.",
      th: "ไม้กั้นช่องทางจอดรถที่รวดเร็ว เสถียร และเน้นความปลอดภัยสำหรับโครงการเชิงพาณิชย์และสาธารณะ"
    },
    specs: {
      en: ["24V low-voltage servo control", "Smooth acceleration and braking", "Radar and loop detector ready"],
      "zh-hant": ["24V 低壓伺服控制", "平順加減速曲線", "支援雷達與地感偵測"],
      es: ["Control servo 24V", "Aceleración y frenado suaves", "Preparada para radar y lazo"],
      vi: ["Điều khiển servo 24V", "Tăng giảm tốc mượt", "Sẵn sàng kết nối radar và vòng từ"],
      ms: ["Kawalan servo 24V", "Pecutan dan brek lancar", "Sedia untuk radar dan loop detector"],
      th: ["ควบคุมเซอร์โว 24V", "เร่งและเบรกนุ่มนวล", "รองรับเรดาร์และ loop detector"]
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
      th: "ชุดเปิดประตูเซอร์โว"
    },
    summary: {
      en: "Servo drive control for swing, sliding and pedestrian access door systems.",
      "zh-hant": "用於平開門、平移門與人行通道門的伺服驅動控制方案。",
      es: "Control servo para puertas batientes, corredizas y accesos peatonales.",
      vi: "Điều khiển servo cho cửa mở quay, cửa trượt và lối đi bộ.",
      ms: "Kawalan servo untuk pintu ayun, gelangsar dan akses pejalan kaki.",
      th: "ระบบควบคุมเซอร์โวสำหรับประตูบานสวิง บานเลื่อน และทางคนเดิน"
    },
    specs: {
      en: ["Low-noise movement", "Precise position control", "Access control integration"],
      "zh-hant": ["低噪音運行", "精準位置控制", "可整合門禁系統"],
      es: ["Movimiento silencioso", "Control preciso de posición", "Integración de control de acceso"],
      vi: ["Vận hành ít tiếng ồn", "Điều khiển vị trí chính xác", "Tích hợp kiểm soát ra vào"],
      ms: ["Pergerakan senyap", "Kawalan posisi tepat", "Integrasi kawalan akses"],
      th: ["การทำงานเสียงต่ำ", "ควบคุมตำแหน่งแม่นยำ", "เชื่อมต่อระบบควบคุมทางเข้า"]
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
      vi: "Radar an toàn chống đập kẹp",
      ms: "Radar keselamatan anti-hentam",
      th: "เรดาร์นิรภัยป้องกันการชนและหนีบ"
    },
    summary: {
      en: "Vehicle and pedestrian detection accessory for safer barrier and gate operation.",
      "zh-hant": "用於車輛與行人偵測，提高道閘與門禁設備安全性。",
      es: "Accesorio de detección de vehículos y peatones para operaciones más seguras.",
      vi: "Phụ kiện phát hiện xe và người đi bộ giúp vận hành an toàn hơn.",
      ms: "Aksesori pengesanan kenderaan dan pejalan kaki untuk operasi lebih selamat.",
      th: "อุปกรณ์ตรวจจับรถและคนเดินเพื่อเพิ่มความปลอดภัยของไม้กั้นและประตู"
    },
    specs: {
      en: ["Vehicle presence detection", "Anti-pinch safety logic", "Outdoor project ready"],
      "zh-hant": ["車輛存在偵測", "防夾安全邏輯", "適用戶外工程"],
      es: ["Detección de presencia vehicular", "Lógica anti-pinzamiento", "Lista para exterior"],
      vi: ["Phát hiện xe hiện diện", "Logic chống kẹp", "Phù hợp dự án ngoài trời"],
      ms: ["Pengesanan kehadiran kenderaan", "Logik anti-pinch", "Sesuai projek luar"],
      th: ["ตรวจจับรถในพื้นที่", "ตรรกะป้องกันการหนีบ", "เหมาะกับงานกลางแจ้ง"]
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
      th: "อุปกรณ์เสริมระบบควบคุมทางเข้า"
    },
    summary: {
      en: "Controllers, sensors, wiring modules and integration parts for parking and access projects.",
      "zh-hant": "控制器、感測器、線路模組與停車門禁整合配件。",
      es: "Controladores, sensores, cableado y piezas de integración para proyectos de acceso.",
      vi: "Bộ điều khiển, cảm biến, module dây và linh kiện tích hợp cho dự án.",
      ms: "Pengawal, sensor, modul pendawaian dan komponen integrasi projek.",
      th: "คอนโทรลเลอร์ เซนเซอร์ โมดูลสายไฟ และชิ้นส่วนเชื่อมต่อระบบ"
    },
    specs: {
      en: ["Modular wiring", "API and dry-contact support", "Project replacement parts"],
      "zh-hant": ["模組化接線", "支援 API 與乾接點", "工程備品配件"],
      es: ["Cableado modular", "API y contacto seco", "Repuestos de proyecto"],
      vi: ["Đấu dây module", "Hỗ trợ API và tiếp điểm khô", "Linh kiện thay thế"],
      ms: ["Pendawaian modular", "Sokongan API dan dry contact", "Alat ganti projek"],
      th: ["การเดินสายแบบโมดูล", "รองรับ API และ dry contact", "อะไหล่สำหรับโครงการ"]
    },
    document: "/docs/access-control-accessories.txt",
    keywords: ["access control accessories", "gate controller", "parking control parts"]
  }
];

export type FaqItem = { q: string; a: string };

export const messages: Record<LocaleKey, {
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
}> = {
  en: {
    nav: { home: "Home", solutions: "Solutions", products: "Products", cases: "Cases", software: "Software", about: "About", faq: "FAQ", contact: "Contact", "seo-hub": "SEO Hub", admin: "Admin" },
    heroTitle: "Global Smart Parking & Access Control Technology",
    heroBody: "Low-voltage servo hardware, safety radar accessories and parking software for international parking, gate and transit projects.",
    primaryCta: "Submit Inquiry",
    secondaryCta: "View Products",
    homeKicker: "Batum Technology / 巴圖姆（深圳）科技有限公司",
    sections: {
      solutions: { kicker: "Solutions", title: "Integrated systems for vehicles, pedestrians and transit access", body: "Modular solutions combine servo control, access logic, radar safety and software integration." },
      products: { kicker: "Products", title: "Servo barrier, door operator, radar and accessory categories", body: "Each product module is structured for datasheets, project keywords and future upload management." },
      cases: { kicker: "Cases", title: "Application pages for parking lots, buildings, rail transit and ETC lanes", body: "Industry pages help buyers understand where the hardware and software fit into real projects." },
      software: { kicker: "Software", title: "Local server, cloud platform and global payment integration", body: "Parking software can support local deployment, cloud operation, multiple languages and country payment methods." },
      about: { kicker: "About Batum", title: "R&D and manufacturing company focused on low-voltage servo access control", body: "Batum is a company with strong R&D capability in access control drive control and comprehensive hardware manufacturing capability. Our products cover both vehicle and pedestrian access control — high-speed barrier gates, direct-drive pedestrian access gates, platform screen doors and door operators — all built as low-voltage servo solutions. Safety is our first design goal." },
      faq: { kicker: "FAQ", title: "Answers for buyers evaluating servo access control hardware", body: "Common questions about customization, certification, samples, lead time and after-sales support." },
      contact: { kicker: "Contact", title: "Send project requirements to Batum Technology", body: "The form sends directly to sales@batumaccess.com through FormSubmit." },
      "seo-hub": { kicker: "SEO Content Hub", title: "Structured keyword pages for long-term search growth", body: "Use this page for product knowledge, category keywords and market-specific content that can be expanded over time." }
    },
    productCategories: { "servo-barrier": "Servo Barrier", "door-operator": "Door Operator", radar: "Radar", accessory: "Accessories" },
    download: "Download datasheet",
    contactIntro: "Tell us the country, lane count, required products and software deployment mode.",
    firstSubmitNote: "First submission may require confirming the FormSubmit email sent to sales@batumaccess.com.",
    form: { name: "Name", company: "Company", email: "Email", whatsapp: "WhatsApp", country: "Country", product: "Interested product", message: "Project requirements", submit: "Submit Inquiry" }
  },
  "zh-hant": {
    nav: { home: "首頁", solutions: "解決方案", products: "產品", cases: "案例", software: "軟體", about: "關於我們", faq: "常見問題", contact: "聯絡我們", "seo-hub": "內容中心", admin: "管理後台" },
    heroTitle: "全球智慧停車與門禁控制技術",
    heroBody: "面向海外市場的低壓伺服硬體、安全雷達配件與停車軟體解決方案。",
    primaryCta: "提交詢盤",
    secondaryCta: "查看產品",
    homeKicker: "巴圖姆（深圳）科技有限公司",
    sections: {
      solutions: { kicker: "解決方案", title: "車輛、人行與軌道交通門禁的一體化系統", body: "以伺服控制、門禁邏輯、安全雷達和軟體整合組成模組化方案。" },
      products: { kicker: "產品", title: "伺服道閘、開門機、雷達與配件分類", body: "每個產品模組都可對應說明文件、工程關鍵詞和後續上傳管理。" },
      cases: { kicker: "案例", title: "停車場、商業建築、軌道交通與 ETC 車道應用", body: "行業頁面幫助海外買家理解硬體與軟體在實際項目中的使用方式。" },
      software: { kicker: "軟體", title: "本地伺服器、雲端平台與多國支付整合", body: "停車軟體可支援本地部署、雲端營運、多語言和不同國家的支付方式。" },
      about: { kicker: "關於巴圖姆", title: "專注低壓伺服門禁控制的研發與硬體製造公司", body: "巴圖姆是一家在門禁驅動控制方面擁有強大研發能力、並具備完整硬體生產能力的綜合實力企業。我們的產品涵蓋車輛與行人門禁，包括快速道閘、直驅人行通道閘、站台屏蔽門與開門機，全部採用低壓伺服解決方案。安全是我們的第一設計目標。" },
      faq: { kicker: "常見問題", title: "解答買家在評估伺服門禁硬體時的疑問", body: "關於客製化、認證、樣品、交期與售後支援的常見問題整理。" },
      contact: { kicker: "聯絡我們", title: "把項目需求發送給巴圖姆", body: "表單會透過 FormSubmit 直接發送至 sales@batumaccess.com。" },
      "seo-hub": { kicker: "內容中心", title: "用於長期搜尋成長的結構化關鍵詞頁面", body: "此頁可持續擴充產品知識、分類關鍵詞和市場內容。" }
    },
    productCategories: { "servo-barrier": "伺服道閘", "door-operator": "開門機", radar: "雷達", accessory: "其他配件" },
    download: "下載產品說明",
    contactIntro: "請告訴我們國家、車道數量、所需產品與軟體部署方式。",
    firstSubmitNote: "首次提交可能需要在 sales@batumaccess.com 確認 FormSubmit 郵件。",
    form: { name: "姓名", company: "公司", email: "郵箱", whatsapp: "WhatsApp", country: "國家", product: "感興趣產品", message: "項目需求", submit: "提交詢盤" }
  },
  es: {
    nav: { home: "Inicio", solutions: "Soluciones", products: "Productos", cases: "Casos", software: "Software", about: "Nosotros", faq: "Preguntas frecuentes", contact: "Contacto", "seo-hub": "Contenido SEO", admin: "Admin" },
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
      faq: { kicker: "Preguntas frecuentes", title: "Respuestas para compradores que evalúan hardware de control de acceso servo", body: "Preguntas comunes sobre personalización, certificación, muestras, plazos de entrega y soporte postventa." },
      contact: { kicker: "Contacto", title: "Envíe los requisitos del proyecto", body: "El formulario se envía directamente a sales@batumaccess.com mediante FormSubmit." },
      "seo-hub": { kicker: "Contenido SEO", title: "Páginas de palabras clave para crecimiento orgánico", body: "Use esta página para conocimiento de producto, categorías y contenido por mercado." }
    },
    productCategories: { "servo-barrier": "Barrera servo", "door-operator": "Operador de puerta", radar: "Radar", accessory: "Accesorios" },
    download: "Descargar ficha",
    contactIntro: "Indique país, carriles, productos requeridos y modo de despliegue.",
    firstSubmitNote: "El primer envío puede requerir confirmar el correo de FormSubmit en sales@batumaccess.com.",
    form: { name: "Nombre", company: "Empresa", email: "Email", whatsapp: "WhatsApp", country: "País", product: "Producto", message: "Requisitos", submit: "Enviar consulta" }
  },
  vi: {
    nav: { home: "Trang chủ", solutions: "Giải pháp", products: "Sản phẩm", cases: "Dự án", software: "Phần mềm", about: "Về chúng tôi", faq: "Câu hỏi thường gặp", contact: "Liên hệ", "seo-hub": "Nội dung SEO", admin: "Quản trị" },
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
      faq: { kicker: "Câu hỏi thường gặp", title: "Giải đáp cho khách hàng đang tìm hiểu phần cứng kiểm soát ra vào servo", body: "Các câu hỏi thường gặp về tùy chỉnh, chứng nhận, lấy mẫu, thời gian giao hàng và hỗ trợ hậu mãi." },
      contact: { kicker: "Liên hệ", title: "Gửi yêu cầu dự án cho Batum", body: "Biểu mẫu gửi trực tiếp đến sales@batumaccess.com qua FormSubmit." },
      "seo-hub": { kicker: "Nội dung SEO", title: "Trang từ khóa cho tăng trưởng tìm kiếm", body: "Dùng trang này cho kiến thức sản phẩm, từ khóa danh mục và nội dung thị trường." }
    },
    productCategories: { "servo-barrier": "Barrier servo", "door-operator": "Bộ mở cửa", radar: "Radar", accessory: "Phụ kiện" },
    download: "Tải tài liệu",
    contactIntro: "Hãy cho biết quốc gia, số làn, sản phẩm và cách triển khai phần mềm.",
    firstSubmitNote: "Lần gửi đầu tiên có thể cần xác nhận email FormSubmit tại sales@batumaccess.com.",
    form: { name: "Tên", company: "Công ty", email: "Email", whatsapp: "WhatsApp", country: "Quốc gia", product: "Sản phẩm", message: "Yêu cầu dự án", submit: "Gửi yêu cầu" }
  },
  ms: {
    nav: { home: "Laman Utama", solutions: "Penyelesaian", products: "Produk", cases: "Kes", software: "Perisian", about: "Tentang Kami", faq: "Soalan Lazim", contact: "Hubungi", "seo-hub": "Kandungan SEO", admin: "Admin" },
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
      faq: { kicker: "Soalan Lazim", title: "Jawapan untuk pembeli yang menilai perkakasan kawalan akses servo", body: "Soalan lazim mengenai penyesuaian, pensijilan, sampel, masa penghantaran dan sokongan selepas jualan." },
      contact: { kicker: "Hubungi", title: "Hantar keperluan projek kepada Batum", body: "Borang dihantar terus ke sales@batumaccess.com melalui FormSubmit." },
      "seo-hub": { kicker: "Kandungan SEO", title: "Halaman kata kunci untuk pertumbuhan carian", body: "Gunakan halaman ini untuk pengetahuan produk, kata kunci kategori dan kandungan pasaran." }
    },
    productCategories: { "servo-barrier": "Palang servo", "door-operator": "Penggerak pintu", radar: "Radar", accessory: "Aksesori" },
    download: "Muat turun dokumen",
    contactIntro: "Beritahu negara, bilangan lorong, produk dan mod pemasangan perisian.",
    firstSubmitNote: "Penghantaran pertama mungkin perlu mengesahkan email FormSubmit di sales@batumaccess.com.",
    form: { name: "Nama", company: "Syarikat", email: "Email", whatsapp: "WhatsApp", country: "Negara", product: "Produk", message: "Keperluan projek", submit: "Hantar pertanyaan" }
  },
  th: {
    nav: { home: "หน้าแรก", solutions: "โซลูชัน", products: "สินค้า", cases: "กรณีใช้งาน", software: "ซอฟต์แวร์", about: "เกี่ยวกับเรา", faq: "คำถามที่พบบ่อย", contact: "ติดต่อ", "seo-hub": "ศูนย์ SEO", admin: "ผู้ดูแล" },
    heroTitle: "เทคโนโลยีที่จอดรถอัจฉริยะและควบคุมทางเข้าระดับโลก",
    heroBody: "ฮาร์ดแวร์เซอร์โวแรงดันต่ำ เรดาร์นิรภัย และซอฟต์แวร์ที่จอดรถสำหรับโครงการนานาชาติ",
    primaryCta: "ส่งคำถาม",
    secondaryCta: "ดูสินค้า",
    homeKicker: "Batum Technology",
    sections: {
      solutions: { kicker: "โซลูชัน", title: "ระบบสำหรับรถ คนเดิน และขนส่งราง", body: "โซลูชันรวมการควบคุมเซอร์โว ตรรกะทางเข้า เรดาร์นิรภัย และซอฟต์แวร์" },
      products: { kicker: "สินค้า", title: "ไม้กั้นเซอร์โว ชุดเปิดประตู เรดาร์ และอุปกรณ์เสริม", body: "สินค้าแต่ละกลุ่มรองรับเอกสาร คีย์เวิร์ด และการจัดการข้อมูลในอนาคต" },
      cases: { kicker: "กรณีใช้งาน", title: "สำหรับลานจอด อาคาร รถไฟฟ้า และช่อง ETC", body: "หน้าอุตสาหกรรมช่วยอธิบายการใช้งานฮาร์ดแวร์และซอฟต์แวร์ในโครงการจริง" },
      software: { kicker: "ซอฟต์แวร์", title: "เซิร์ฟเวอร์ภายใน คลาวด์ และการชำระเงินหลายประเทศ", body: "ซอฟต์แวร์รองรับการติดตั้งภายใน คลาวด์ หลายภาษา และวิธีชำระเงินตามประเทศ" },
      about: { kicker: "เกี่ยวกับ Batum", title: "บริษัทวิจัย พัฒนา และผลิตระบบควบคุมทางเข้าเซอร์โว", body: "Batum เป็นบริษัทที่มีศักยภาพด้านการวิจัยและพัฒนาระบบควบคุมไดรฟ์สำหรับควบคุมทางเข้าอย่างแข็งแกร่ง พร้อมความสามารถด้านการผลิตฮาร์ดแวร์ที่ครบวงจร สินค้าของเราครอบคลุมการควบคุมทางเข้าทั้งสำหรับรถและคนเดิน ได้แก่ ไม้กั้นความเร็วสูง ประตูคนเดิน direct-drive ประตูกั้นชานชาลา และชุดเปิดประตู ทั้งหมดเป็นโซลูชันเซอร์โวแรงดันต่ำ ความปลอดภัยคือเป้าหมายการออกแบบอันดับหนึ่งของเรา" },
      faq: { kicker: "คำถามที่พบบ่อย", title: "คำตอบสำหรับผู้ซื้อที่กำลังพิจารณาฮาร์ดแวร์ควบคุมทางเข้าเซอร์โว", body: "คำถามที่พบบ่อยเกี่ยวกับการปรับแต่ง การรับรอง ตัวอย่างสินค้า ระยะเวลาส่งมอบ และการสนับสนุนหลังการขาย" },
      contact: { kicker: "ติดต่อ", title: "ส่งรายละเอียดโครงการถึง Batum", body: "แบบฟอร์มส่งตรงถึง sales@batumaccess.com ผ่าน FormSubmit" },
      "seo-hub": { kicker: "ศูนย์ SEO", title: "หน้าคีย์เวิร์ดเพื่อเพิ่มการค้นหา", body: "ใช้หน้านี้สำหรับความรู้สินค้า คีย์เวิร์ดหมวดหมู่ และเนื้อหาตลาด" }
    },
    productCategories: { "servo-barrier": "ไม้กั้นเซอร์โว", "door-operator": "ชุดเปิดประตู", radar: "เรดาร์", accessory: "อุปกรณ์เสริม" },
    download: "ดาวน์โหลดเอกสาร",
    contactIntro: "แจ้งประเทศ จำนวนช่องทาง สินค้าที่ต้องการ และรูปแบบซอฟต์แวร์",
    firstSubmitNote: "ครั้งแรกอาจต้องยืนยันอีเมล FormSubmit ที่ sales@batumaccess.com",
    form: { name: "ชื่อ", company: "บริษัท", email: "อีเมล", whatsapp: "WhatsApp", country: "ประเทศ", product: "สินค้า", message: "รายละเอียดโครงการ", submit: "ส่งคำถาม" }
  }
};

export const faqs: Record<LocaleKey, FaqItem[]> = {
  en: [
    { q: "Do you support OEM/ODM customization?", a: "Yes. Logo, color, voice prompts, housing and control parameters can be customized to match your brand and target market. Contact sales with your specification." },
    { q: "Do your products meet certification requirements for export markets?", a: "Products are designed around common international electrical and safety requirements, and we can provide technical documentation to support certification and customs clearance in your market. Contact us to confirm the specific certificates your country requires." },
    { q: "How long is the delivery lead time?", a: "Lead time depends on product configuration and order quantity. Send us your project details for an accurate estimate." },
    { q: "Can I get samples before placing a bulk order?", a: "Yes, sample units are available for evaluation before a bulk order. Contact sales for sample pricing and shipping options." },
    { q: "What after-sales support and warranty do you provide?", a: "Batum provides installation guidance, remote technical support and a manufacturer warranty on hardware. Contact sales for the warranty terms of your selected product." },
    { q: "Can the parking software support local payment methods and languages?", a: "Yes, the software supports multilingual interfaces and can integrate country-specific payment methods. Contact us to discuss your deployment requirements." }
  ],
  "zh-hant": [
    { q: "是否支援 OEM/ODM 客製化？", a: "支援。可依品牌與市場需求客製化 Logo、顏色、語音提示、外殼與控制參數，請聯絡銷售團隊提供您的規格需求。" },
    { q: "產品是否符合出口市場的認證要求？", a: "產品設計上符合常見的國際電氣與安全規範，並可提供技術文件協助您完成目標市場的認證與清關程序，具體所需證書請與我們聯繫確認。" },
    { q: "交期需要多久？", a: "交期依產品配置與訂購數量而定，請提供您的項目需求以取得準確交期。" },
    { q: "下大量訂單前可以先申請樣品嗎？", a: "可以，我們提供樣品供評估，下單前請聯絡銷售了解樣品價格與運送方式。" },
    { q: "售後服務與保修如何？", a: "巴圖姆提供安裝指導、遠端技術支援與硬體製造商保修，具體保修條款請洽銷售確認所選產品的保修內容。" },
    { q: "停車軟體能否支援當地語言與付款方式？", a: "可以，停車軟體支援多語言介面，並可整合當地國家的付款方式，請聯絡我們討論您的部署需求。" }
  ],
  es: [
    { q: "¿Ofrecen personalización OEM/ODM?", a: "Sí. Podemos personalizar logotipo, colores, mensajes de voz, carcasa y parámetros de control según su marca y mercado. Contacte a ventas con sus especificaciones." },
    { q: "¿Sus productos cumplen con las certificaciones para exportación?", a: "Los productos están diseñados conforme a los requisitos eléctricos y de seguridad internacionales habituales, y podemos proporcionar documentación técnica para apoyar la certificación y el despacho de aduana en su mercado. Contáctenos para confirmar los certificados específicos que necesita." },
    { q: "¿Cuánto tarda la entrega?", a: "El plazo de entrega depende de la configuración del producto y la cantidad del pedido. Envíenos los detalles de su proyecto para un plazo preciso." },
    { q: "¿Puedo solicitar muestras antes de un pedido grande?", a: "Sí, ofrecemos muestras para evaluación antes de un pedido al por mayor. Contacte a ventas para precios y envío de muestras." },
    { q: "¿Qué soporte postventa y garantía ofrecen?", a: "Batum ofrece orientación de instalación, soporte técnico remoto y garantía de fabricante en el hardware. Contacte a ventas para conocer los términos de garantía del producto elegido." },
    { q: "¿El software de parking admite pagos e idiomas locales?", a: "Sí, el software admite interfaces multilingües y puede integrar métodos de pago específicos de cada país. Contáctenos para hablar sobre su despliegue." }
  ],
  vi: [
    { q: "Có hỗ trợ OEM/ODM không?", a: "Có. Chúng tôi có thể tùy chỉnh logo, màu sắc, thông báo giọng nói, vỏ máy và tham số điều khiển theo thương hiệu và thị trường của bạn. Vui lòng liên hệ bộ phận kinh doanh với yêu cầu cụ thể." },
    { q: "Sản phẩm có đáp ứng chứng nhận xuất khẩu không?", a: "Sản phẩm được thiết kế theo các yêu cầu điện và an toàn quốc tế phổ biến, chúng tôi có thể cung cấp tài liệu kỹ thuật hỗ trợ chứng nhận và thông quan tại thị trường của bạn. Vui lòng liên hệ để xác nhận chứng nhận cụ thể cần thiết." },
    { q: "Thời gian giao hàng là bao lâu?", a: "Thời gian giao hàng phụ thuộc vào cấu hình sản phẩm và số lượng đặt hàng. Vui lòng gửi thông tin dự án để nhận thời gian giao hàng chính xác." },
    { q: "Có thể lấy mẫu trước khi đặt hàng lớn không?", a: "Có, chúng tôi cung cấp mẫu để đánh giá trước khi đặt hàng số lượng lớn. Vui lòng liên hệ để biết giá và cách gửi mẫu." },
    { q: "Chế độ hậu mãi và bảo hành như thế nào?", a: "Batum cung cấp hướng dẫn lắp đặt, hỗ trợ kỹ thuật từ xa và bảo hành từ nhà sản xuất. Vui lòng liên hệ để biết điều khoản bảo hành cho sản phẩm bạn chọn." },
    { q: "Phần mềm bãi đỗ có hỗ trợ thanh toán và ngôn ngữ địa phương không?", a: "Có, phần mềm hỗ trợ giao diện đa ngôn ngữ và có thể tích hợp phương thức thanh toán theo từng quốc gia. Vui lòng liên hệ để trao đổi về nhu cầu triển khai." }
  ],
  ms: [
    { q: "Adakah anda menyediakan penyesuaian OEM/ODM?", a: "Ya. Kami boleh menyesuaikan logo, warna, mesej suara, casing dan parameter kawalan mengikut jenama dan pasaran anda. Sila hubungi jualan dengan spesifikasi anda." },
    { q: "Adakah produk anda memenuhi pensijilan untuk pasaran eksport?", a: "Produk direka mengikut keperluan elektrik dan keselamatan antarabangsa yang biasa, dan kami boleh menyediakan dokumen teknikal untuk membantu pensijilan dan kelulusan kastam di pasaran anda. Sila hubungi kami untuk mengesahkan sijil khusus yang diperlukan." },
    { q: "Berapa lama masa penghantaran?", a: "Masa penghantaran bergantung kepada konfigurasi produk dan kuantiti pesanan. Sila hantar butiran projek anda untuk masa penghantaran yang tepat." },
    { q: "Bolehkah saya minta sampel sebelum pesanan pukal?", a: "Boleh, kami menyediakan sampel untuk penilaian sebelum pesanan pukal. Sila hubungi jualan untuk harga dan penghantaran sampel." },
    { q: "Apakah sokongan selepas jualan dan waranti yang disediakan?", a: "Batum menyediakan panduan pemasangan, sokongan teknikal jarak jauh dan waranti pengeluar untuk perkakasan. Sila hubungi jualan untuk terma waranti produk yang dipilih." },
    { q: "Adakah perisian parkir menyokong pembayaran dan bahasa tempatan?", a: "Ya, perisian menyokong antara muka pelbagai bahasa dan boleh disepadukan dengan kaedah pembayaran mengikut negara. Sila hubungi kami untuk membincangkan keperluan pemasangan anda." }
  ],
  th: [
    { q: "มีบริการรับผลิตแบบ OEM/ODM หรือไม่?", a: "มี เราสามารถปรับแต่งโลโก้ สี เสียงแจ้งเตือน ตัวเครื่อง และพารามิเตอร์การควบคุมให้ตรงกับแบรนด์และตลาดของคุณ กรุณาติดต่อฝ่ายขายพร้อมข้อกำหนดของคุณ" },
    { q: "สินค้าผ่านการรับรองสำหรับตลาดส่งออกหรือไม่?", a: "สินค้าออกแบบตามมาตรฐานไฟฟ้าและความปลอดภัยสากลทั่วไป และเรามีเอกสารทางเทคนิคเพื่อสนับสนุนการขอรับรองและพิธีการศุลกากรในตลาดของคุณ กรุณาติดต่อเราเพื่อยืนยันใบรับรองที่จำเป็นสำหรับประเทศของคุณ" },
    { q: "ใช้เวลาส่งมอบสินค้านานเท่าไร?", a: "ระยะเวลาส่งมอบขึ้นอยู่กับการตั้งค่าสินค้าและจำนวนที่สั่งซื้อ กรุณาส่งรายละเอียดโครงการเพื่อรับระยะเวลาที่ถูกต้อง" },
    { q: "สามารถขอตัวอย่างสินค้าก่อนสั่งซื้อจำนวนมากได้หรือไม่?", a: "ได้ เรามีตัวอย่างสินค้าให้ประเมินก่อนสั่งซื้อจำนวนมาก กรุณาติดต่อฝ่ายขายเรื่องราคาและการจัดส่งตัวอย่าง" },
    { q: "มีบริการหลังการขายและการรับประกันอย่างไร?", a: "Batum ให้คำแนะนำการติดตั้ง การสนับสนุนทางเทคนิคทางไกล และการรับประกันจากผู้ผลิตสำหรับฮาร์ดแวร์ กรุณาติดต่อฝ่ายขายเพื่อทราบเงื่อนไขการรับประกันของสินค้าที่คุณเลือก" },
    { q: "ซอฟต์แวร์ที่จอดรถรองรับภาษาและการชำระเงินในประเทศของฉันหรือไม่?", a: "รองรับ ซอฟต์แวร์มีอินเทอร์เฟซหลายภาษาและสามารถเชื่อมต่อวิธีการชำระเงินตามแต่ละประเทศ กรุณาติดต่อเราเพื่อพูดคุยเกี่ยวกับความต้องการในการติดตั้งของคุณ" }
  ]
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
  ]
};

export const seoTopics: string[] = seoTopicsSeed;

export function localePath(locale: LocaleKey, slug?: PageSlug) {
  if (locale === defaultLocale) {
    return slug ? `/${slug}/` : "/";
  }
  return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}
