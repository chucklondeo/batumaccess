<?php
/**
 * Real (non-placeholder) copy for the evergreen pages — About, Technology,
 * Contact — in English plus the 7 other languages the previous Next.js site
 * supported. Used by the "BATUM Seed Content" tools page to (a) fill these
 * pages with real English copy instead of whatever placeholder text an
 * editor typed while testing the templates, and (b) create their Polylang
 * translations in one click instead of retyping 7 languages by hand.
 *
 * When adding languages in Polylang (Languages -> Languages -> Add New),
 * use these exact language codes so this file's keys line up with what
 * Polylang stores: en, zh-hant, es, vi, ms, th, ja, ko.
 */

if (!defined('ABSPATH')) exit;

function batum_site_pages_en() {
    return [
        'about' => [
            'title' => 'About Batum',
            'template' => 'default',
            'content' => "<p>BATUM develops motion control systems for intelligent access applications. Our engineering work spans servo control, embedded electronics, firmware and motion algorithms, together with the mechanical engineering needed to turn that control system into a reliable barrier gate, door operator or platform screen door drive.</p><p>We build every product around 24V low-voltage servo technology, because it gives us precise, repeatable motion with a safety margin that higher-voltage systems don't offer. Safety is the first requirement in every design decision we make — not an added feature.</p>"
        ],
        'technology' => [
            'title' => 'Technology',
            'template' => 'page-templates/template-technology.php',
            'content' => "<p>Every BATUM product is built on the same foundation: a servo controller and motion control algorithm developed in-house. This lets us tune acceleration, deceleration and holding torque precisely for each application — from a 0.3-second highway ETC barrier to a platform screen door that has to open and close thousands of times a day without drifting out of calibration.</p><p>Low-voltage 24V control keeps the system safer to install and service than higher-voltage alternatives, without giving up speed or holding force.</p>"
        ],
        'contact' => [
            'title' => 'Contact',
            'template' => 'page-templates/template-contact.php',
            'content' => "<p>Tell us your project's country, lane or door count, and the products you're evaluating — our engineering team will follow up with a configuration recommendation and quotation.</p>"
        ]
    ];
}

function batum_site_pages_translations() {
    return [
        'zh-hant' => [
            'about' => [
                'title' => '關於巴圖姆',
                'content' => '<p>巴圖姆專注於為智慧型出入管理應用開發運動控制系統。我們的工程能力涵蓋伺服控制、嵌入式電子、韌體與運動演算法，並具備將這套控制系統轉化為可靠道閘、開門機或月台門驅動裝置所需的機械工程能力。</p><p>我們的每一項產品都以 24V 低壓伺服技術為核心，因為它能提供精準、可重複的運動控制，並具備高壓系統所沒有的安全餘裕。安全是我們每一項設計決策的第一要求，而不是附加功能。</p>'
            ],
            'technology' => [
                'title' => '技術',
                'content' => '<p>巴圖姆的每一項產品都建立在同一個基礎之上：自主研發的伺服控制器與運動控制演算法。這讓我們能針對不同應用精準調校加速、減速與保持扭力——從 0.3 秒開啟的高速公路 ETC 道閘，到每天需要開關數千次而不失準的月台門系統。</p><p>24V 低壓控制在安裝與維護上比高壓方案更安全，同時不犧牲速度與夾持力。</p>'
            ],
            'contact' => [
                'title' => '聯絡我們',
                'content' => '<p>請告訴我們您項目所在國家、車道或門的數量，以及您正在評估的產品，我們的工程團隊將盡快回覆配置建議與報價。</p>'
            ]
        ],
        'es' => [
            'about' => [
                'title' => 'Sobre Batum',
                'content' => "<p>BATUM desarrolla sistemas de control de movimiento para aplicaciones de acceso inteligente. Nuestro trabajo de ingeniería abarca control servo, electrónica embebida, firmware y algoritmos de movimiento, junto con la ingeniería mecánica necesaria para convertir ese sistema de control en una barrera, un operador de puerta o un accionamiento de puerta de andén fiable.</p><p>Construimos cada producto en torno a la tecnología servo de bajo voltaje 24V, porque ofrece un movimiento preciso y repetible con un margen de seguridad que los sistemas de mayor voltaje no ofrecen. La seguridad es el primer requisito en cada decisión de diseño que tomamos, no una función añadida.</p>"
            ],
            'technology' => [
                'title' => 'Tecnología',
                'content' => "<p>Cada producto de BATUM se construye sobre la misma base: un controlador servo y un algoritmo de control de movimiento desarrollados internamente. Esto nos permite ajustar con precisión la aceleración, la desaceleración y el par de retención para cada aplicación, desde una barrera de ETC en autopista que abre en 0.3 segundos hasta una puerta de andén que debe abrir y cerrar miles de veces al día sin perder calibración.</p><p>El control de bajo voltaje de 24V es más seguro de instalar y mantener que las alternativas de mayor voltaje, sin renunciar a velocidad ni fuerza de sujeción.</p>"
            ],
            'contact' => [
                'title' => 'Contacto',
                'content' => '<p>Indíquenos el país de su proyecto, el número de carriles o puertas, y los productos que está evaluando; nuestro equipo de ingeniería le responderá con una recomendación de configuración y una cotización.</p>'
            ]
        ],
        'vi' => [
            'about' => [
                'title' => 'Về Batum',
                'content' => '<p>BATUM phát triển các hệ thống điều khiển chuyển động cho các ứng dụng kiểm soát ra vào thông minh. Công việc kỹ thuật của chúng tôi bao gồm điều khiển servo, điện tử nhúng, firmware và thuật toán chuyển động, cùng với kỹ thuật cơ khí cần thiết để biến hệ thống điều khiển đó thành một barrier, bộ mở cửa hoặc hệ thống truyền động cửa chắn sân ga đáng tin cậy.</p><p>Chúng tôi xây dựng mọi sản phẩm dựa trên công nghệ servo điện áp thấp 24V, vì nó mang lại chuyển động chính xác, lặp lại được với biên độ an toàn mà các hệ thống điện áp cao hơn không có. An toàn là yêu cầu hàng đầu trong mọi quyết định thiết kế của chúng tôi, chứ không phải một tính năng bổ sung.</p>'
            ],
            'technology' => [
                'title' => 'Công nghệ',
                'content' => '<p>Mọi sản phẩm của BATUM đều được xây dựng trên cùng một nền tảng: bộ điều khiển servo và thuật toán điều khiển chuyển động do chúng tôi tự phát triển. Điều này cho phép chúng tôi tinh chỉnh chính xác gia tốc, giảm tốc và mô-men giữ cho từng ứng dụng — từ barrier ETC cao tốc mở trong 0.3 giây đến cửa chắn sân ga phải đóng mở hàng nghìn lần mỗi ngày mà không bị lệch hiệu chuẩn.</p><p>Điều khiển điện áp thấp 24V an toàn hơn khi lắp đặt và bảo trì so với các phương án điện áp cao hơn, mà không phải đánh đổi tốc độ hay lực giữ.</p>'
            ],
            'contact' => [
                'title' => 'Liên hệ',
                'content' => '<p>Hãy cho chúng tôi biết quốc gia của dự án, số làn hoặc số cửa, và các sản phẩm bạn đang cân nhắc — đội ngũ kỹ thuật của chúng tôi sẽ phản hồi với đề xuất cấu hình và báo giá.</p>'
            ]
        ],
        'ms' => [
            'about' => [
                'title' => 'Tentang Batum',
                'content' => '<p>BATUM membangunkan sistem kawalan gerakan untuk aplikasi kawalan akses pintar. Kerja kejuruteraan kami merangkumi kawalan servo, elektronik terbenam, firmware dan algoritma gerakan, bersama kejuruteraan mekanikal yang diperlukan untuk menukar sistem kawalan itu menjadi palang, penggerak pintu atau pemacu pintu platform yang boleh dipercayai.</p><p>Kami membina setiap produk berdasarkan teknologi servo voltan rendah 24V, kerana ia memberikan gerakan yang tepat dan boleh diulang dengan margin keselamatan yang tidak dimiliki oleh sistem voltan lebih tinggi. Keselamatan adalah keperluan utama dalam setiap keputusan reka bentuk kami — bukan ciri tambahan.</p>'
            ],
            'technology' => [
                'title' => 'Teknologi',
                'content' => '<p>Setiap produk BATUM dibina atas asas yang sama: pengawal servo dan algoritma kawalan gerakan yang dibangunkan sendiri. Ini membolehkan kami menala dengan tepat pecutan, nyahpecutan dan daya tahan bagi setiap aplikasi — daripada palang ETC lebuh raya yang membuka dalam 0.3 saat kepada pintu platform yang perlu dibuka dan ditutup beribu kali sehari tanpa tersasar dari penentukuran.</p><p>Kawalan voltan rendah 24V lebih selamat untuk dipasang dan diselenggara berbanding alternatif voltan lebih tinggi, tanpa mengorbankan kelajuan atau daya cengkaman.</p>'
            ],
            'contact' => [
                'title' => 'Hubungi',
                'content' => '<p>Beritahu kami negara projek anda, bilangan lorong atau pintu, dan produk yang sedang anda pertimbangkan — pasukan kejuruteraan kami akan membalas dengan cadangan konfigurasi dan sebut harga.</p>'
            ]
        ],
        'th' => [
            'about' => [
                'title' => 'เกี่ยวกับ Batum',
                'content' => '<p>Batum พัฒนาระบบควบคุมการเคลื่อนที่สำหรับแอปพลิเคชันควบคุมทางเข้าอัจฉริยะ งานด้านวิศวกรรมของเราครอบคลุมการควบคุมเซอร์โว อิเล็กทรอนิกส์แบบฝังตัว เฟิร์มแวร์ และอัลกอริทึมการเคลื่อนที่ ควบคู่กับวิศวกรรมเครื่องกลที่จำเป็นในการเปลี่ยนระบบควบคุมนั้นให้กลายเป็นไม้กั้น ชุดเปิดประตู หรือระบบขับเคลื่อนประตูกั้นชานชาลาที่เชื่อถือได้</p><p>เราสร้างสินค้าทุกชิ้นบนพื้นฐานเทคโนโลยีเซอร์โวแรงดันต่ำ 24V เพราะให้การเคลื่อนที่ที่แม่นยำ ทำซ้ำได้ และมีระยะขอบด้านความปลอดภัยที่ระบบแรงดันสูงกว่าไม่มี ความปลอดภัยคือข้อกำหนดอันดับแรกในการตัดสินใจออกแบบทุกครั้งของเรา ไม่ใช่ฟีเจอร์เสริม</p>'
            ],
            'technology' => [
                'title' => 'เทคโนโลยี',
                'content' => '<p>สินค้าทุกชิ้นของ Batum สร้างขึ้นบนพื้นฐานเดียวกัน คือตัวควบคุมเซอร์โวและอัลกอริทึมควบคุมการเคลื่อนที่ที่พัฒนาขึ้นเอง ทำให้เราสามารถปรับความเร่ง ความหน่วง และแรงบิดยึดได้อย่างแม่นยำสำหรับแต่ละแอปพลิเคชัน ตั้งแต่ไม้กั้นทางด่วน ETC ที่เปิดใน 0.3 วินาที ไปจนถึงประตูกั้นชานชาลาที่ต้องเปิดปิดหลายพันครั้งต่อวันโดยไม่คลาดเคลื่อน</p><p>การควบคุมแรงดันต่ำ 24V ปลอดภัยกว่าในการติดตั้งและบำรุงรักษาเมื่อเทียบกับทางเลือกแรงดันสูงกว่า โดยไม่ต้องแลกกับความเร็วหรือแรงยึด</p>'
            ],
            'contact' => [
                'title' => 'ติดต่อ',
                'content' => '<p>แจ้งประเทศของโครงการ จำนวนช่องทางหรือประตู และสินค้าที่กำลังพิจารณา ทีมวิศวกรของเราจะติดต่อกลับพร้อมคำแนะนำการตั้งค่าและใบเสนอราคา</p>'
            ]
        ],
        'ja' => [
            'about' => [
                'title' => '会社概要',
                'content' => '<p>Batumは、インテリジェントな入退室管理アプリケーション向けのモーションコントロールシステムを開発しています。当社のエンジニアリングはサーボ制御、組み込み電子回路、ファームウェア、モーションアルゴリズムに及び、さらにその制御システムを信頼性の高いバリアゲート、ドアオペレーター、プラットフォームスクリーンドア駆動装置へと具現化するための機械工学も備えています。</p><p>すべての製品を24V低電圧サーボ技術を基盤に構築しているのは、それが高電圧システムにはない安全マージンを持ちながら、精密で再現性のある動作を実現できるからです。安全性は付加機能ではなく、あらゆる設計判断における最優先要件です。</p>'
            ],
            'technology' => [
                'title' => 'テクノロジー',
                'content' => '<p>Batumのすべての製品は同じ基盤の上に構築されています。それは自社開発のサーボコントローラーとモーション制御アルゴリズムです。これにより、0.3秒で開く高速道路ETCバリアから、キャリブレーションのずれなく1日に何千回も開閉するプラットフォームスクリーンドアまで、アプリケーションごとに加速・減速・保持トルクを精密に調整できます。</p><p>24V低電圧制御は、速度や保持力を犠牲にすることなく、高電圧の代替方式よりも設置・保守の面で安全です。</p>'
            ],
            'contact' => [
                'title' => 'お問い合わせ',
                'content' => '<p>プロジェクトの国、レーンまたはドアの数、ご検討中の製品をお知らせください。当社のエンジニアリングチームが構成のご提案とお見積りをご連絡いたします。</p>'
            ]
        ],
        'ko' => [
            'about' => [
                'title' => '회사 소개',
                'content' => '<p>Batum은 지능형 출입 통제 애플리케이션을 위한 모션 컨트롤 시스템을 개발합니다. 당사의 엔지니어링 역량은 서보 제어, 임베디드 전자, 펌웨어, 모션 알고리즘을 아우르며, 이 제어 시스템을 신뢰할 수 있는 바리케이드, 도어 오퍼레이터, 플랫폼 스크린도어 구동 장치로 구현하는 데 필요한 기계공학 역량도 갖추고 있습니다.</p><p>모든 제품은 24V 저전압 서보 기술을 기반으로 제작되는데, 이는 고전압 시스템에는 없는 안전 여유를 확보하면서 정밀하고 반복 가능한 동작을 제공하기 때문입니다. 안전은 부가 기능이 아니라 모든 설계 결정에서 가장 우선하는 요구사항입니다.</p>'
            ],
            'technology' => [
                'title' => '기술',
                'content' => '<p>Batum의 모든 제품은 동일한 기반 위에 만들어집니다. 바로 자체 개발한 서보 컨트롤러와 모션 제어 알고리즘입니다. 이를 통해 0.3초 만에 열리는 고속도로 ETC 바리케이드부터 하루에도 수천 번 오차 없이 열고 닫혀야 하는 플랫폼 스크린도어까지, 애플리케이션별로 가속, 감속, 유지 토크를 정밀하게 조정할 수 있습니다.</p><p>24V 저전압 제어는 속도나 유지력을 희생하지 않으면서도 고전압 대안보다 설치와 유지보수 측면에서 더 안전합니다.</p>'
            ],
            'contact' => [
                'title' => '문의하기',
                'content' => '<p>프로젝트 국가, 차로 또는 문 수, 검토 중인 제품을 알려주세요. 저희 엔지니어링 팀이 구성 제안과 견적으로 회신해 드리겠습니다.</p>'
            ]
        ]
    ];
}
