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

export type LocaleKey = "en" | "zh-hant" | "es" | "vi" | "ms" | "th";
export type PageSlug = "solutions" | "products" | "cases" | "software" | "about" | "contact" | "faq" | "seo-hub";

export const defaultLocale: LocaleKey = "en";

export const locales: Array<{ key: LocaleKey; label: string; native: string; market: string }> = [
  { key: "en", label: "English", native: "English", market: "Global" },
  { key: "zh-hant", label: "Traditional Chinese", native: "繁體中文", market: "Hong Kong / Taiwan" },
  { key: "es", label: "Spanish", native: "Español", market: "Spain / LATAM" },
  { key: "vi", label: "Vietnamese", native: "Tiếng Việt", market: "Vietnam" },
  { key: "ms", label: "Malay", native: "Bahasa Melayu", market: "Malaysia" },
  { key: "th", label: "Thai", native: "ไทย", market: "Thailand" }
];

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
      th: "ไม้กั้นรถระบบเซอร์โวแรงดันต่ำ"
    },
    summary: {
      en: "Fast, stable and safety-focused parking lane barrier for commercial and public projects.",
      "zh-hant": "適用於商業與公共停車場的高速、穩定、安全型車道道閘。",
      es: "Barrera rápida y estable para carriles de estacionamiento comercial y público.",
      vi: "Barrier làn xe nhanh, ổn định và an toàn cho bãi đỗ thương mại và công cộng.",
      ms: "Palang parkir yang pantas, stabil dan selamat untuk projek komersial dan awam.",
      th: "ไม้กั้นรถที่รวดเร็ว เสถียร และเน้นความปลอดภัยสำหรับลานจอดเชิงพาณิชย์และโครงการสาธารณะ"
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
      th: "ระบบควบคุมเซอร์โวสำหรับประตูบานสวิง บานเลื่อน และทางเดินคน"
    },
    specs: {
      en: ["Low-noise movement", "Precise position control", "Access control integration"],
      "zh-hant": ["低噪音運行", "精準位置控制", "可整合門禁系統"],
      es: ["Movimiento silencioso", "Control preciso de posición", "Integración de control de acceso"],
      vi: ["Vận hành ít tiếng ồn", "Điều khiển vị trí chính xác", "Tích hợp kiểm soát ra vào"],
      ms: ["Pergerakan senyap", "Kawalan posisi tepat", "Integrasi kawalan akses"],
      th: ["การทำงานเสียงต่ำ", "ควบคุมตำแหน่งแม่นยำ", "เชื่อมต่อระบบควบคุมทางเข้าออก"]
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
      th: "เรดาร์นิรภัยกันชนและกันหนีบ"
    },
    summary: {
      en: "Vehicle and pedestrian detection accessory for safer barrier and gate operation.",
      "zh-hant": "用於車輛與行人偵測，提高道閘與門禁設備安全性。",
      es: "Accesorio de detección de vehículos y peatones para operaciones más seguras.",
      vi: "Phụ kiện phát hiện xe và người đi bộ, giúp vận hành an toàn hơn.",
      ms: "Aksesori pengesanan kenderaan dan pejalan kaki untuk operasi lebih selamat.",
      th: "อุปกรณ์ตรวจจับรถและคนเดินเพื่อเพิ่มความปลอดภัยให้ไม้กั้นและประตู"
    },
    specs: {
      en: ["Vehicle presence detection", "Anti-pinch safety logic", "Outdoor project ready"],
      "zh-hant": ["車輛存在偵測", "防夾安全邏輯", "適用戶外工程"],
      es: ["Detección de presencia vehicular", "Lógica anti-pinzamiento", "Lista para exterior"],
      vi: ["Phát hiện xe hiện diện", "Logic chống kẹt", "Phù hợp dự án ngoài trời"],
      ms: ["Pengesanan kehadiran kenderaan", "Logik anti-pinch", "Sesuai projek luar"],
      th: ["ตรวจจับการมีอยู่ของรถ", "ตรรกะนิรภัยกันหนีบ", "พร้อมสำหรับโครงการกลางแจ้ง"]
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
      th: "อุปกรณ์เสริมควบคุมทางเข้าออก"
    },
    summary: {
      en: "Controllers, sensors, wiring modules and integration parts for parking and access projects.",
      "zh-hant": "控制器、感測器、線路模組與停車門禁整合配件。",
      es: "Controladores, sensores, cableado y piezas de integración para proyectos de acceso.",
      vi: "Bộ điều khiển, cảm biến, module dây và linh kiện tích hợp cho dự án.",
      ms: "Pengawal, sensor, modul pendawaian dan komponen integrasi projek.",
      th: "คอนโทรลเลอร์ เซนเซอร์ โมดูลสายไฟ และชิ้นส่วนสำหรับรวมระบบ"
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
  homeKicker: contact.company,
  sections: {
    solutions: { kicker: "Solutions", title: "Integrated systems for vehicles, pedestrians and transit access", body: "Modular solutions combine servo control, access logic, radar safety and software integration." },
    products: { kicker: "Products", title: "Servo barrier, door operator, radar and accessory categories", body: "Each product module is structured for datasheets, project keywords and future upload management." },
    cases: { kicker: "Cases", title: "Application pages for parking lots, buildings, rail transit and ETC lanes", body: "Industry pages help buyers understand where the hardware and software fit into real projects." },
    software: { kicker: "Software", title: "Local server, cloud platform and global payment integration", body: "Parking software can support local deployment, cloud operation, multiple languages and country payment methods." },
    about: { kicker: "About Batum", title: "R&D and manufacturing company focused on low-voltage servo access control", body: "Batum develops drive control, motion control and hardware manufacturing capability for vehicle and pedestrian access systems. Products cover high-speed barrier gates, direct-drive pedestrian gates, platform screen door control, door operators and safety accessories. Safety is the first design objective." },
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
    homeKicker: contact.company,
    sections: {
      solutions: { kicker: "解決方案", title: "車輛、人行與軌道交通門禁的一體化系統", body: "以伺服控制、門禁邏輯、安全雷達和軟體整合組成模組化方案。" },
      products: { kicker: "產品", title: "伺服道閘、開門機、雷達與配件分類", body: "每個產品模組都可對應說明文件、工程關鍵詞和後續上傳管理。" },
      cases: { kicker: "案例", title: "停車場、商業建築、軌道交通與 ETC 車道應用", body: "行業頁面幫助海外買家理解硬體與軟體在實際項目中的使用方式。" },
      software: { kicker: "軟體", title: "本地伺服器、雲端平台與多國支付整合", body: "停車軟體可支援本地部署、雲端營運、多語言和不同國家的支付方式。" },
      about: { kicker: "關於巴圖姆", title: "專注低壓伺服門禁控制的研發與硬體製造公司", body: "巴圖姆具備門禁驅動控制、運動控制研發和硬體生產能力，產品覆蓋快速道閘、直驅人行通道閘、站台屏蔽門控制、開門機與安全配件。安全是我們的第一設計目標。" },
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
      about: { kicker: "Sobre Batum", title: "Empresa de I+D y fabricación enfocada en control servo de acceso", body: "Batum desarrolla control de accionamiento, control de movimiento y hardware para acceso vehicular y peatonal. Los productos cubren barreras rápidas, pasos peatonales direct-drive, puertas de andén, operadores de puerta y accesorios de seguridad." },
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
      about: { kicker: "Về Batum", title: "Công ty R&D và sản xuất tập trung vào điều khiển servo", body: "Batum phát triển điều khiển truyền động, điều khiển chuyển động và phần cứng cho hệ thống ra vào xe và người. Sản phẩm gồm barrier tốc độ cao, cổng người đi bộ direct-drive, cửa chắn sân ga, bộ mở cửa và phụ kiện an toàn." },
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
      about: { kicker: "Tentang Batum", title: "Syarikat R&D dan pembuatan kawalan akses servo", body: "Batum membangunkan kawalan pemacu, kawalan gerakan dan perkakasan untuk akses kenderaan dan pejalan kaki. Produk merangkumi palang pantas, pintu pejalan kaki direct-drive, pintu platform, penggerak pintu dan aksesori keselamatan." },
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
      about: { kicker: "เกี่ยวกับ Batum", title: "บริษัทวิจัยและผลิตระบบควบคุมทางเข้าออกเซอร์โว", body: "Batum พัฒนาการควบคุมไดรฟ์ การควบคุมการเคลื่อนที่ และฮาร์ดแวร์สำหรับระบบทางเข้าออกรถและคนเดิน สินค้าครอบคลุมไม้กั้นความเร็วสูง ประตูคนเดิน direct-drive ระบบประตูชานชาลา ชุดเปิดประตู และอุปกรณ์นิรภัย" },
      contact: { kicker: "ติดต่อ", title: "ส่งข้อมูลโครงการให้ Batum", body: "แบบฟอร์มจะส่งข้อมูลไปที่ sales@batumaccess.com" },
      faq: { kicker: "FAQ", title: "คำถามโครงการที่พบบ่อย", body: "คำตอบสำหรับผู้ซื้อที่เปรียบเทียบฮาร์ดแวร์จอดรถ สินค้าควบคุมทางเข้าออก และการติดตั้งซอฟต์แวร์" },
      "seo-hub": { kicker: "ความรู้", title: "หน้าความรู้แบบมีโครงสร้างสำหรับการค้นหา", body: "ใช้หน้านี้สำหรับความรู้สินค้า คำค้นหาหมวดหมู่ และเนื้อหาตลาด" }
    },
    productCategories: { "servo-barrier": "ไม้กั้นเซอร์โว", "door-operator": "ชุดเปิดประตู", radar: "เรดาร์", accessory: "อุปกรณ์เสริม" },
    download: "ดาวน์โหลดเอกสาร",
    contactIntro: "โปรดระบุประเทศ จำนวนเลน สินค้า และรูปแบบติดตั้งซอฟต์แวร์",
    firstSubmitNote: "คำถามจะถูกส่งไปที่ sales@batumaccess.com การใช้ FormSubmit ครั้งแรกอาจต้องยืนยันอีเมล",
    form: { name: "ชื่อ", company: "บริษัท", email: "Email", whatsapp: "WhatsApp", country: "ประเทศ", product: "สินค้า", message: "ข้อมูลโครงการ", submit: "ส่งคำถาม" }
  }
};

export const solutionCards = [
  { icon: "parking", title: "Smart parking", body: "LPR, barrier control, radar protection and parking payment workflows." },
  { icon: "transit", title: "Rail transit access", body: "AFC gates, platform screen door control and station access integration." },
  { icon: "operator", title: "Door operator control", body: "Low-voltage servo drive logic for automatic door and gate movement." },
  { icon: "safety", title: "Safety radar", body: "Anti-smash and anti-pinch detection for vehicle and pedestrian safety." }
] as const;

export const caseCards = [
  { icon: "parking", title: "Parking lots", body: "Ticketless parking entry, exit payment and vehicle access management." },
  { icon: "building", title: "Commercial buildings", body: "Office, hotel, mall and residential mixed-use entrance control." },
  { icon: "transit", title: "Rail transit", body: "AFC, platform screen door and passenger flow access systems." },
  { icon: "fast", title: "Highway ETC", body: "Fast vehicle lane control and integration with identification systems." }
] as const;

export const seoTopics = [
  "24V servo barrier gate manufacturer",
  "low voltage door operator control system",
  "anti-smash radar sensor for parking barrier",
  "parking management software local server deployment",
  "cloud parking platform with payment integration",
  "direct drive pedestrian access gate control"
];

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
  ]
};

export function localePath(locale: LocaleKey, slug?: PageSlug) {
  if (locale === defaultLocale) {
    return slug ? `/${slug}/` : "/";
  }
  return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}
