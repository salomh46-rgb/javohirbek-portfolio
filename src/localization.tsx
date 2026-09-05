import { useEffect } from 'react';

export type Language = 'EN' | 'UZ' | 'RU';

type TranslationTable = Record<string, string>;

const UZ: TranslationTable = {
  // Navigation and hero
  'Quest Map': 'Karyera yo\'li',
  Skills: 'Ko\'nikmalar',
  Process: 'Jarayon',
  Projects: 'Loyihalar',
  Reviews: 'Sharhlar',
  Contact: 'Aloqa',
  'Book a Call': 'Qo\'ng\'iroq band qilish',
  Book: 'Band qilish',
  'Mute interface sounds': 'Interfeys tovushlarini o\'chirish',
  'Enable interface sounds': 'Interfeys tovushlarini yoqish',
  'Available for new projects': 'Yangi loyihalar uchun ochiq',
  '2 slots left this month': 'Bu oyda 2 ta joy qoldi',
  'Senior Full-Stack & AI Engineer': 'Senior Full-Stack va AI muhandis',
  'Architecting intelligent digital experiences at the intersection of cutting-edge web technologies and artificial intelligence.':
    'Ilg\'or veb-texnologiyalar va sun\'iy intellekt kesishmasida aqlli raqamli mahsulotlar yarataman.',
  'Explore Work': 'Ishlarni ko\'rish',
  'Book 15-min Discovery Call': '15 daqiqalik tanishuv qo\'ng\'irog\'i',

  // Journey
  'Career Journey': 'Karyera yo\'li',
  Quest: 'Karyera',
  Map: 'yo\'li',
  'My professional adventure through the realms of code and innovation':
    'Kod va innovatsiyalar olamidagi professional yo\'lim',
  '2024 - Present': '2024 - Hozir',
  'Middle Full-Stack Engineer': 'Middle Full-Stack muhandis',
  'Leading microservices architecture and AI integration projects. Developing scalable enterprise solutions with modern tech stack.':
    'Mikroservis arxitekturasi va AI integratsiyasi loyihalariga yetakchilik qilaman. Zamonaviy texnologiyalar bilan kengayuvchan korporativ yechimlar yarataman.',
  'Full-Stack Developer': 'Full-Stack dasturchi',
  'Built comprehensive ERP systems using React and Node.js. Optimized database performance and implemented real-time features.':
    'React va Node.js asosida kompleks ERP tizimlarini yaratdim. Ma\'lumotlar bazasi unumdorligini oshirdim va real vaqt funksiyalarini joriy qildim.',
  'Bachelor of Computer Science': 'Kompyuter fanlari bakalavri',
  'Pursuing degree in Computer Science with focus on Software Engineering and Artificial Intelligence.':
    'Dasturiy injiniring va sun\'iy intellekt yo\'nalishida Kompyuter fanlari bo\'yicha tahsil olyapman.',
  Work: 'Ish',
  Education: 'Ta\'lim',

  // Skills
  Arsenal: 'Texnologiyalar',
  Tech: 'Texnologik',
  Stack: 'to\'plam',
  'Technologies I wield to craft digital excellence':
    'Mukammal raqamli mahsulotlar yaratishda foydalanadigan texnologiyalarim',
  Frontend: 'Frontend',
  Backend: 'Backend',
  'AI & Tools': 'AI va vositalar',
  'Tools & Technologies': 'Vositalar va texnologiyalar',

  // Process
  'How I Deliver': 'Qanday ishlayman',
  'Work Process': 'Ish jarayoni',
  'A battle-tested 4-step system that ships products on time — every time':
    'Mahsulotni har safar o\'z vaqtida yetkazadigan sinalgan 4 bosqichli tizim',
  Discovery: 'Tahlil',
  Architecture: 'Arxitektura',
  'AI & Code': 'AI va kod',
  'Launch & Scale': 'Ishga tushirish',
  'Understand before building': 'Yaratishdan oldin tushunish',
  'Blueprint before bricks': 'Koddan oldin aniq reja',
  'Build in fast, visible loops': 'Tez va shaffof iteratsiyalar',
  'Ship confidently, grow calmly': 'Ishonch bilan ishga tushirish',
  'A deep-dive into your business goals, users, and technical constraints. We define what success looks like — before a single line of code exists.':
    'Biznes maqsadlaringiz, foydalanuvchilar va texnik cheklovlarni chuqur o\'rganamiz. Bir qator kod yozilishidan oldin muvaffaqiyat mezonlarini belgilaymiz.',
  'System design translated into concrete deliverables: data models, API contracts, and infrastructure diagrams that scale from day one.':
    'Tizim dizaynini aniq natijalarga aylantiramiz: ma\'lumotlar modeli, API shartnomalari va birinchi kundan kengayadigan infratuzilma.',
  'Iterative sprints with weekly demos. AI features wired into clean, tested code — you watch the product grow, not just the invoice.':
    'Haftalik demo bilan iterativ sprintlar. AI funksiyalari toza va testlangan kodga ulanadi — mahsulot rivojini doim ko\'rib turasiz.',
  'Zero-downtime deployment, observability dashboards, and a scaling plan. I stay involved post-launch to iterate on real user data.':
    'To\'xtovsiz deploy, monitoring panellari va kengayish rejasi. Ishga tushgandan keyin ham real foydalanuvchi ma\'lumotlari asosida ishlashda davom etaman.',
  'What you receive': 'Siz oladigan natijalar',
  'Product brief & KPIs': 'Mahsulot brifi va KPIlar',
  'Scope & timeline agreement': 'Ko\'lam va muddat kelishuvi',
  'Risk radar & priorities': 'Xatarlar va ustuvorliklar',
  'ERD & data models': 'ERD va ma\'lumotlar modellari',
  'API contract (OpenAPI)': 'API shartnomasi (OpenAPI)',
  'Infrastructure diagram': 'Infratuzilma diagrammasi',
  'Weekly staging demos': 'Haftalik staging demolar',
  '90%+ test coverage': '90%+ test qamrovi',
  'CI/CD pipeline from day one': 'Birinchi kundan CI/CD',
  '99.9% uptime SLO': '99.9% uzluksiz ishlash SLOsi',
  'Monitoring & alerts live': 'Monitoring va ogohlantirishlar',
  'Post-launch growth sprints': 'Ishga tushgandan keyingi o\'sish sprintlari',
  'Previous phase': 'Oldingi bosqich',
  'Next phase': 'Keyingi bosqich',
  Phase: 'Bosqich',
  'Week 1': '1-hafta',
  'Week 1–2': '1–2-hafta',
  'Weeks 2–8': '2–8-hafta',
  'Week 8+': '8-haftadan keyin',

  // Projects
  'Featured Work': 'Tanlangan ishlar',
  Project: 'Loyiha',
  Showcase: 'namunalari',
  'Click any project to launch its interactive live demo':
    'Interaktiv jonli demoni ochish uchun istalgan loyihani bosing',
  'API Explorer': 'API Explorer',
  'Health AI Medical System': 'Health AI tibbiy tizimi',
  'Marketing Materials Generator': 'Marketing materiallari generatori',
  'A comprehensive API testing and documentation platform built with FastAPI and SQLite. Features real-time request/response monitoring and automated documentation generation.':
    'FastAPI va SQLite asosidagi API sinash va hujjatlashtirish platformasi. Real vaqt so\'rov/javob monitoringi va avtomatik hujjat yaratish imkoniyatiga ega.',
  'AI-powered medical diagnosis platform leveraging machine learning for symptom analysis and health recommendations. Includes patient management and doctor consultation features.':
    'Alomatlarni tahlil qilish va tavsiyalar berish uchun mashinaviy o\'rganishdan foydalanuvchi AI tibbiy platforma. Bemorlar boshqaruvi va shifokor konsultatsiyasini o\'z ichiga oladi.',
  'AI Content Studio for automated marketing material generation. Creates social media posts, ad copy, and visual assets using advanced language models.':
    'Marketing materiallarini avtomatik yaratadigan AI kontent studiyasi. Ilg\'or til modellari yordamida postlar, reklama matnlari va vizual materiallar yaratadi.',
  'Live Demo': 'Jonli demo',
  'Case Study': 'Batafsil',
  'Live Console Simulation': 'Jonli konsol simulyatsiyasi',
  'AI Triage Simulation': 'AI triaj simulyatsiyasi',
  'Content Engine Simulation': 'Kontent generatori simulyatsiyasi',
  'Interactive simulation of the production console': 'Ishchi konsolning interaktiv simulyatsiyasi',
  'Demo only — not medical advice': 'Faqat demo — tibbiy maslahat emas',
  'Pre-generated output demonstrating real model behavior': 'Haqiqiy model ishini ko\'rsatuvchi namunaviy natija',
  Overview: 'Umumiy ma\'lumot',
  'Key Features': 'Asosiy imkoniyatlar',
  'Discuss This Project': 'Bu loyihani muhokama qilish',
  'Estimate a Similar Build': 'O\'xshash loyihani hisoblash',
  Repo: 'Repozitoriy',
  'Developer Tooling': 'Dasturchilar vositasi',
  'AI Healthcare Platform': 'AI tibbiyot platformasi',
  'AI Content Studio': 'AI kontent studiyasi',
  'API Explorer is a full-featured REST client and auto-documentation hub designed for backend teams. It streams live request/response payloads, auto-generates OpenAPI specs, and keeps a versioned history of every call — cutting integration debugging time by more than half.':
    'API Explorer — backend jamoalar uchun to\'liq REST mijoz va avtomatik hujjatlashtirish markazi. Jonli so\'rov/javoblarni ko\'rsatadi, OpenAPI spetsifikatsiyasini yaratadi va har bir chaqiruv tarixini saqlaydi.',
  'Health AI is a clinical decision-support platform that combines a fine-tuned symptom-analysis model with a full patient-management suite. It triages cases by urgency, drafts consultation summaries, and gives physicians a clear probability-ranked differential — all under strict data-privacy controls.':
    'Health AI — alomatlarni tahlil qiluvchi model va bemorlar boshqaruvini birlashtirgan klinik qarorlarni qo\'llab-quvvatlash platformasi. Holatlarni shoshilinchlik bo\'yicha saralaydi va shifokorga ehtimollik asosidagi xulosalarni beradi.',
  'A brand-aware content engine that turns a one-line brief into ready-to-publish social posts, email campaigns, and product copy. Tone, audience, and platform presets let marketing teams ship consistent, on-brand material in seconds instead of hours.':
    'Bir qatorli brifni tayyor postlar, email kampaniyalari va mahsulot matniga aylantiradigan brendga mos kontent tizimi. Ohang, auditoriya va platforma sozlamalari orqali soatlar o\'rniga soniyalarda kontent yaratiladi.',
  'Real-time request / response monitoring': 'Real vaqt so\'rov va javob monitoringi',
  'Auto-generated OpenAPI documentation': 'Avtomatik OpenAPI hujjatlari',
  'JWT & OAuth2 auth flow testing': 'JWT va OAuth2 autentifikatsiya testi',
  'Versioned request history & collections': 'Versiyalangan so\'rovlar tarixi va kolleksiyalar',
  'Latency analytics dashboard': 'Kechikish tahlili paneli',
  'One-click mock servers': 'Bir bosishda mock serverlar',
  'Symptom analysis with confidence scoring': 'Ishonchlilik bahosi bilan alomat tahlili',
  'Urgency-based triage engine': 'Shoshilinchlik bo\'yicha triaj tizimi',
  'Patient records & history timelines': 'Bemor yozuvlari va tarixi',
  'Doctor consultation workspace': 'Shifokor konsultatsiyasi muhiti',
  'Auto-drafted clinical summaries': 'Avtomatik klinik xulosalar',
  'HIPAA-aligned data handling': 'HIPAA talablariga mos ma\'lumotlar boshqaruvi',
  'Brand voice & tone presets': 'Brend ovozi va ohang sozlamalari',
  'Multi-platform output (IG, X, LinkedIn)': 'Ko\'p platformali natija (IG, X, LinkedIn)',
  'Email subject-line A/B variants': 'Email mavzusi uchun A/B variantlar',
  'One-line brief to full campaign': 'Bir qator brifdan to\'liq kampaniya',
  'Team approval workflows': 'Jamoaviy tasdiqlash jarayoni',
  'Performance analytics loop': 'Natijalar tahlili sikli',
  'Avg. Response': 'O\'rtacha javob',
  'Endpoints Tested': 'Testlangan endpointlar',
  'Dev Hours Saved': 'Tejalgan ish soati',
  'Triage Accuracy': 'Triaj aniqligi',
  'Patients Served': 'Xizmat ko\'rsatilgan bemorlar',
  'Consult Time Saved': 'Tejalgan konsultatsiya vaqti',
  'Assets Generated': 'Yaratilgan materiallar',
  'Content Output': 'Kontent hajmi',
  'Engagement Lift': 'Faollik o\'sishi',
  'Request Builder': 'So\'rov konstruktori',
  'Code Sandbox': 'Kod sandboxi',
  'Fetch paginated user list': 'Sahifalangan foydalanuvchilar ro\'yxati',
  'Issue JWT access token': 'JWT kirish tokenini yaratish',
  'Live analytics snapshot': 'Jonli analitika holati',
  'Select an endpoint to execute a live request': 'Jonli so\'rov yuborish uchun endpoint tanlang',
  'Executing request…': 'So\'rov bajarilmoqda…',
  'Run code': 'Kodni ishga tushirish',
  'Running…': 'Bajarilmoqda…',
  'Live terminal': 'Jonli terminal',
  'Editable JavaScript sandbox': 'Tahrirlanadigan JavaScript sandbox',
  'Fetch users': 'Foydalanuvchilarni olish',
  'Create auth token': 'Kirish tokenini yaratish',
  'Read live analytics': 'Jonli analitikani o\'qish',
  'Select patient symptoms, then run the AI triage engine:': 'Bemor alomatlarini tanlang va AI triajini ishga tushiring:',
  Fever: 'Isitma',
  Headache: 'Bosh og\'rig\'i',
  Fatigue: 'Holsizlik',
  Cough: 'Yo\'tal',
  'Chest Pain': 'Ko\'krak og\'rig\'i',
  Dizziness: 'Bosh aylanishi',
  Nausea: 'Ko\'ngil aynishi',
  'Sore Throat': 'Tomoq og\'rig\'i',
  'Run AI Diagnosis': 'AI tashxisini ishga tushirish',
  'Cross-referencing 40k+ clinical patterns': '40 mingdan ortiq klinik holat bilan solishtirilmoqda',
  'Probable conditions': 'Ehtimoliy holatlar',
  'Start new assessment': 'Yangi tahlilni boshlash',
  'Urgent — See a Doctor Today': 'Shoshilinch — bugun shifokorga boring',
  'Moderate — Consult Within 24h': 'O\'rtacha — 24 soat ichida konsultatsiya',
  'Low — Self Care Recommended': 'Past — uy sharoitida parvarish',
  'Cardiovascular strain': 'Yurak-qon tomir zo\'riqishi',
  'Acute respiratory condition': 'O\'tkir nafas yo\'li holati',
  'Musculoskeletal issue': 'Mushak-skelet muammosi',
  'Viral upper-respiratory infection': 'Yuqori nafas yo\'llari virusli infeksiyasi',
  'Seasonal flu': 'Mavsumiy gripp',
  'Stress-related fatigue': 'Stress bilan bog\'liq charchoq',
  'Mild viral infection': 'Yengil virusli infeksiya',
  'Sleep deficit / fatigue': 'Uyqu yetishmasligi / charchoq',
  Dehydration: 'Suvsizlanish',
  'Chest pain requires prompt evaluation. Visit the nearest clinic or emergency department.':
    'Ko\'krak og\'rig\'i tezkor tekshiruvni talab qiladi. Eng yaqin klinika yoki shoshilinch yordam bo\'limiga boring.',
  'Rest, hydrate, and monitor symptoms. Book a tele-consultation if symptoms persist beyond 48 hours.':
    'Dam oling, ko\'proq suyuqlik iching va alomatlarni kuzating. 48 soatdan oshsa, onlayn konsultatsiya band qiling.',
  'Symptoms appear mild. Rest, fluids, and OTC remedies should help. Re-check if they worsen.':
    'Alomatlar yengil ko\'rinadi. Dam olish, suyuqlik va oddiy dorilar yordam berishi mumkin. Yomonlashsa qayta tekshirtiring.',
  'Social Media Post': 'Ijtimoiy tarmoq posti',
  'Email Subject Line': 'Email mavzusi',
  'Product Description': 'Mahsulot tavsifi',
  'Pick a content type and generate 3 AI variants': 'Kontent turini tanlang va 3 ta AI variant yarating',
  'Generate Variants': 'Variantlar yaratish',
  Generating: 'Yaratilmoqda',
  'Generating…': 'Yaratilmoqda…',
  Copied: 'Nusxalandi',
  Copy: 'Nusxalash',
  'Your workflow deserves an upgrade. Meet automation that thinks ahead — built with AI, designed for humans. Tap the link to see what your team could be doing instead. #Productivity #AI':
    'Ish jarayoningiz yangilanishga loyiq. Oldindan o\'ylaydigan, AI asosida yaratilgan va insonlar uchun mo\'ljallangan avtomatlashtirish bilan tanishing. #Unumdorlik #AI',
  'We analyzed 10,000 tasks. The pattern? The best teams automate the boring stuff. Here are the 5 workflows worth automating this week — thread below.':
    '10 000 ta vazifani tahlil qildik. Eng yaxshi jamoalar zerikarli ishlarni avtomatlashtiradi. Bu hafta avtomatlashtirishga arziydigan 5 jarayon quyida.',
  'POV: It is 9:00 AM and your content calendar is already done. Not magic — just Marketing AI. Free trial in bio.':
    'Soat 9:00, kontent taqvimingiz esa allaqachon tayyor. Sehr emas — bu Marketing AI. Bepul sinov havolasi bio-da.',
  'Your competitors already did this (you have 48 hours)': 'Raqobatchilaringiz buni allaqachon qildi (sizda 48 soat bor)',
  'A 10x content engine, explained in 90 seconds': '10x kontent tizimi — 90 soniyada tushuntiramiz',
  '[First Name], your Q1 marketing plan just got easier': '[Ism], Q1 marketing rejangiz endi ancha oson',
  'Meet the studio that never sleeps. The Marketing AI Generator transforms a single sentence into an entire campaign — on-brand visuals, scroll-stopping copy, and platform-perfect formatting. Write less. Launch more.':
    'Hech qachon uxlamaydigan studiya bilan tanishing. Marketing AI Generator bitta jumlani to\'liq kampaniyaga aylantiradi — brendga mos vizuallar, kuchli matn va mukammal format. Kamroq yozing. Ko\'proq ishga tushiring.',
  'Crafted for teams that move fast: one brief in, dozens of publish-ready assets out. Every output learns from your brand voice, so tone stays unmistakably you.':
    'Tezkor jamoalar uchun: bitta brif kiradi, o\'nlab tayyor material chiqadi. Har bir natija brend ovozingizni o\'rganadi.',
  'Stop staring at blank pages. From first draft to final export in under a minute — with analytics that close the loop on what actually converts.':
    'Bo\'sh sahifaga qarashni to\'xtating. Birinchi qoralamadan yakuniy eksportgacha bir daqiqadan kam — real konversiyani ko\'rsatuvchi tahlil bilan.',

  // Metrics and reviews
  'Proven Results': 'Isbotlangan natijalar',
  Client: 'Mijoz',
  Outcomes: 'natijalari',
  'Numbers first — then the people behind them': 'Avval raqamlar, keyin ularning ortidagi insonlar',
  'Uptime SLA in production': 'Production uzluksiz ishlashi',
  'Average API response time': 'O\'rtacha API javob vaqti',
  'Projects delivered end-to-end': 'To\'liq yakunlangan loyihalar',
  'Client satisfaction rate': 'Mijozlar mamnunligi',
  'Previous testimonial': 'Oldingi sharh',
  'Next testimonial': 'Keyingi sharh',
  'Javohir rebuilt our monolith into a microservices platform without a single minute of downtime. His AI integration work alone automated 60% of our support workflow. Rare mix of speed and rigor.':
    'Javohir monolit tizimimizni bir daqiqa ham to\'xtatmasdan mikroservis platformasiga aylantirdi. Uning AI integratsiyasi qo\'llab-quvvatlash jarayonining 60% ini avtomatlashtirdi. Tezlik va aniqlikning noyob uyg\'unligi.',
  'He delivered our ERP three weeks ahead of schedule — and it just works. The React architecture he set up is still the cleanest codebase our team has ever inherited.':
    'ERP tizimimizni muddatdan uch hafta oldin topshirdi va u mukammal ishlaydi. U yaratgan React arxitekturasi jamoamiz ko\'rgan eng toza kod bazasidir.',
  'The Health AI platform exceeded every expectation. Symptom triage accuracy hit 94% in pilot, and physicians actually enjoy using it. Investors were impressed — that says everything.':
    'Health AI platformasi barcha kutganimizdan oshib ketdi. Pilotda triaj aniqligi 94% ga yetdi va shifokorlar undan mamnun. Investorlar ham katta taassurot oldi.',
  'Marketing output went from 3 posts a week to 30 — without hiring anyone new. The content engine Javohir built understands our brand voice better than most humans we interviewed.':
    'Yangi xodim olmasdan haftalik kontent 3 tadan 30 taga oshdi. Javohir yaratgan tizim brend ovozimizni ko\'plab mutaxassislardan yaxshiroq tushunadi.',

  // Calculator
  'Project Estimator': 'Loyiha kalkulyatori',
  Budget: 'Byudjet',
  Calculator: 'kalkulyatori',
  'Get an instant estimate for your project scope': 'Loyihangiz uchun tezkor taxminiy hisob oling',
  'Select Services': 'Xizmatlarni tanlang',
  'Frontend Development': 'Frontend ishlab chiqish',
  'Backend Development': 'Backend ishlab chiqish',
  'AI Integration': 'AI integratsiyasi',
  'Database Design': 'Ma\'lumotlar bazasi dizayni',
  'API Development': 'API ishlab chiqish',
  'DevOps & Deployment': 'DevOps va deploy',
  'Project Complexity': 'Loyiha murakkabligi',
  simple: 'oddiy',
  medium: 'o\'rtacha',
  complex: 'murakkab',
  'Project Estimate': 'Loyiha hisobi',
  'Estimated Budget': 'Taxminiy byudjet',
  'Estimated Timeline': 'Taxminiy muddat',
  weeks: 'hafta',
  'Selected Services:': 'Tanlangan xizmatlar:',
  'Get Detailed Quote': 'Batafsil taklif olish',

  // Contact
  'Get in Touch': 'Bog\'lanish',
  'Contact Hub': 'Aloqa markazi',
  'Let\'s discuss your next project and bring your vision to life':
    'Keyingi loyihangizni muhokama qilaylik va g\'oyangizni hayotga tatbiq etaylik',
  'Send Message': 'Xabar yuborish',
  'Your Name': 'Ismingiz',
  'Email Address': 'Email manzil',
  Message: 'Xabar',
  'Tell me about your project...': 'Loyihangiz haqida yozing...',
  'Message Sent!': 'Xabar yuborildi!',
  'Prefer to talk it through?': 'Gaplashib olishni xohlaysizmi?',
  'Book a free 15-minute discovery call': 'Bepul 15 daqiqalik tanishuv qo\'ng\'irog\'ini band qiling',
  'Typical response time': 'Odatdagi javob vaqti',
  'Under 3 hours · GMT+5 timezone': '3 soatdan kam · GMT+5',
  Location: 'Joylashuv',
  'Tashkent, Uzbekistan': 'Toshkent, O\'zbekiston',

  // Booking
  '15-min Discovery Call': '15 daqiqalik tanishuv qo\'ng\'irog\'i',
  'Google Meet · Tashkent (GMT+5)': 'Google Meet · Toshkent (GMT+5)',
  Date: 'Sana',
  Time: 'Vaqt',
  Details: 'Ma\'lumotlar',
  'Pick a day that suits you:': 'Sizga qulay kunni tanlang:',
  'Available slots (GMT+5):': 'Bo\'sh vaqtlar (GMT+5):',
  'Your name': 'Ismingiz',
  'Email for the Meet link': 'Meet havolasi uchun email',
  'Confirm Booking': 'Band qilishni tasdiqlash',
  'You\'re booked in!': 'Qo\'ng\'iroq band qilindi!',
  '15-minute video call': '15 daqiqalik video qo\'ng\'iroq',
  'Done': 'Tayyor',
  'Ping on Telegram': 'Telegramda yozish',
  'Scheduling powered by Cal.com — no card required, cancel anytime':
    'Cal.com orqali rejalashtirish — karta kerak emas, istalgan payt bekor qilish mumkin',

  // Chat
  'Open Javohir AI assistant': 'Javohir AI yordamchisini ochish',
  'Online — replies instantly': 'Onlayn — darhol javob beradi',
  'Ask about skills, pricing, projects…': 'Ko\'nikma, narx yoki loyihalar haqida so\'rang…',
  'Trained on Javohir\'s real experience — human reply guaranteed on booking':
    'Javohirning haqiqiy tajribasi asosida — band qilishda shaxsiy javob kafolatlanadi',
};

const RU: TranslationTable = {
  // Navigation and hero
  'Quest Map': 'Путь карьеры',
  Skills: 'Навыки',
  Process: 'Процесс',
  Projects: 'Проекты',
  Reviews: 'Отзывы',
  Contact: 'Контакты',
  'Book a Call': 'Назначить звонок',
  Book: 'Звонок',
  'Mute interface sounds': 'Выключить звуки интерфейса',
  'Enable interface sounds': 'Включить звуки интерфейса',
  'Available for new projects': 'Открыт для новых проектов',
  '2 slots left this month': 'Осталось 2 места в этом месяце',
  'Senior Full-Stack & AI Engineer': 'Senior Full-Stack и AI-инженер',
  'Architecting intelligent digital experiences at the intersection of cutting-edge web technologies and artificial intelligence.':
    'Создаю интеллектуальные цифровые продукты на пересечении современных веб-технологий и искусственного интеллекта.',
  'Explore Work': 'Смотреть проекты',
  'Book 15-min Discovery Call': 'Забронировать 15-минутный звонок',

  // Journey
  'Career Journey': 'Карьерный путь',
  Quest: 'Карта',
  Map: 'карьеры',
  'My professional adventure through the realms of code and innovation':
    'Мой профессиональный путь в мире кода и инноваций',
  '2024 - Present': '2024 - Сейчас',
  'Middle Full-Stack Engineer': 'Middle Full-Stack инженер',
  'Leading microservices architecture and AI integration projects. Developing scalable enterprise solutions with modern tech stack.':
    'Руководство проектами по микросервисной архитектуре и интеграции AI. Разработка масштабируемых корпоративных решений.',
  'Full-Stack Developer': 'Full-Stack разработчик',
  'Built comprehensive ERP systems using React and Node.js. Optimized database performance and implemented real-time features.':
    'Разработал комплексные ERP-системы на React и Node.js. Оптимизировал базы данных и внедрил функции реального времени.',
  'Bachelor of Computer Science': 'Бакалавр компьютерных наук',
  'Pursuing degree in Computer Science with focus on Software Engineering and Artificial Intelligence.':
    'Получаю степень по компьютерным наукам со специализацией в программной инженерии и искусственном интеллекте.',
  Work: 'Работа',
  Education: 'Образование',

  // Skills
  Arsenal: 'Арсенал',
  Tech: 'Технологический',
  Stack: 'стек',
  'Technologies I wield to craft digital excellence':
    'Технологии, с которыми я создаю сильные цифровые продукты',
  Frontend: 'Фронтенд',
  Backend: 'Бэкенд',
  'AI & Tools': 'AI и инструменты',
  'Tools & Technologies': 'Инструменты и технологии',

  // Process
  'How I Deliver': 'Как я работаю',
  'Work Process': 'Процесс работы',
  'A battle-tested 4-step system that ships products on time — every time':
    'Проверенная система из 4 этапов для запуска продукта точно в срок',
  Discovery: 'Исследование',
  Architecture: 'Архитектура',
  'AI & Code': 'AI и код',
  'Launch & Scale': 'Запуск и рост',
  'Understand before building': 'Сначала понять, затем создавать',
  'Blueprint before bricks': 'Сначала схема, затем код',
  'Build in fast, visible loops': 'Быстрые и прозрачные итерации',
  'Ship confidently, grow calmly': 'Уверенный запуск и спокойный рост',
  'A deep-dive into your business goals, users, and technical constraints. We define what success looks like — before a single line of code exists.':
    'Глубоко изучаем цели бизнеса, пользователей и технические ограничения. Определяем критерии успеха до первой строки кода.',
  'System design translated into concrete deliverables: data models, API contracts, and infrastructure diagrams that scale from day one.':
    'Превращаем дизайн системы в конкретные результаты: модели данных, API-контракты и масштабируемую инфраструктуру.',
  'Iterative sprints with weekly demos. AI features wired into clean, tested code — you watch the product grow, not just the invoice.':
    'Итеративные спринты с еженедельными демо. AI-функции в чистом протестированном коде — вы видите развитие продукта.',
  'Zero-downtime deployment, observability dashboards, and a scaling plan. I stay involved post-launch to iterate on real user data.':
    'Развертывание без простоев, мониторинг и план масштабирования. После запуска я продолжаю улучшать продукт по реальным данным.',
  'What you receive': 'Что вы получаете',
  'Product brief & KPIs': 'Бриф продукта и KPI',
  'Scope & timeline agreement': 'Согласованный объем и сроки',
  'Risk radar & priorities': 'Риски и приоритеты',
  'ERD & data models': 'ERD и модели данных',
  'API contract (OpenAPI)': 'API-контракт (OpenAPI)',
  'Infrastructure diagram': 'Схема инфраструктуры',
  'Weekly staging demos': 'Еженедельные staging-демо',
  '90%+ test coverage': 'Покрытие тестами 90%+',
  'CI/CD pipeline from day one': 'CI/CD с первого дня',
  '99.9% uptime SLO': 'SLO доступности 99.9%',
  'Monitoring & alerts live': 'Мониторинг и уведомления',
  'Post-launch growth sprints': 'Спринты роста после запуска',
  'Previous phase': 'Предыдущий этап',
  'Next phase': 'Следующий этап',
  Phase: 'Этап',
  'Week 1': '1-я неделя',
  'Week 1–2': '1–2-я недели',
  'Weeks 2–8': '2–8-я недели',
  'Week 8+': 'После 8-й недели',

  // Projects
  'Featured Work': 'Избранные работы',
  Project: 'Проекты',
  Showcase: 'в действии',
  'Click any project to launch its interactive live demo':
    'Нажмите на проект, чтобы запустить интерактивное демо',
  'API Explorer': 'API Explorer',
  'Health AI Medical System': 'Медицинская система Health AI',
  'Marketing Materials Generator': 'Генератор маркетинговых материалов',
  'A comprehensive API testing and documentation platform built with FastAPI and SQLite. Features real-time request/response monitoring and automated documentation generation.':
    'Платформа для тестирования и документирования API на FastAPI и SQLite. Мониторинг запросов и ответов в реальном времени и автогенерация документации.',
  'AI-powered medical diagnosis platform leveraging machine learning for symptom analysis and health recommendations. Includes patient management and doctor consultation features.':
    'Медицинская AI-платформа для анализа симптомов и рекомендаций. Включает управление пациентами и консультации врачей.',
  'AI Content Studio for automated marketing material generation. Creates social media posts, ad copy, and visual assets using advanced language models.':
    'AI-студия для автоматического создания маркетинговых материалов, постов, рекламы и визуального контента.',
  'Live Demo': 'Живое демо',
  'Case Study': 'Подробнее',
  'Live Console Simulation': 'Симуляция живой консоли',
  'AI Triage Simulation': 'Симуляция AI-триажа',
  'Content Engine Simulation': 'Симуляция генератора контента',
  'Interactive simulation of the production console': 'Интерактивная симуляция рабочей консоли',
  'Demo only — not medical advice': 'Только демо — не медицинская консультация',
  'Pre-generated output demonstrating real model behavior': 'Пример результата, демонстрирующий работу модели',
  Overview: 'Обзор',
  'Key Features': 'Ключевые функции',
  'Discuss This Project': 'Обсудить этот проект',
  'Estimate a Similar Build': 'Оценить похожий проект',
  Repo: 'Репозиторий',
  'Developer Tooling': 'Инструменты разработчика',
  'AI Healthcare Platform': 'Медицинская AI-платформа',
  'AI Content Studio': 'AI-студия контента',
  'API Explorer is a full-featured REST client and auto-documentation hub designed for backend teams. It streams live request/response payloads, auto-generates OpenAPI specs, and keeps a versioned history of every call — cutting integration debugging time by more than half.':
    'API Explorer — полноценный REST-клиент и центр автодокументации для backend-команд. Он показывает запросы и ответы в реальном времени, создает OpenAPI-спецификации и хранит историю вызовов.',
  'Health AI is a clinical decision-support platform that combines a fine-tuned symptom-analysis model with a full patient-management suite. It triages cases by urgency, drafts consultation summaries, and gives physicians a clear probability-ranked differential — all under strict data-privacy controls.':
    'Health AI — платформа поддержки клинических решений, объединяющая модель анализа симптомов и управление пациентами. Она сортирует случаи по срочности и формирует вероятностные выводы для врачей.',
  'A brand-aware content engine that turns a one-line brief into ready-to-publish social posts, email campaigns, and product copy. Tone, audience, and platform presets let marketing teams ship consistent, on-brand material in seconds instead of hours.':
    'Контент-система, превращающая короткий бриф в готовые посты, email-кампании и описания продуктов. Настройки тона, аудитории и платформы позволяют создавать материалы за секунды.',
  'Real-time request / response monitoring': 'Мониторинг запросов и ответов в реальном времени',
  'Auto-generated OpenAPI documentation': 'Автоматическая документация OpenAPI',
  'JWT & OAuth2 auth flow testing': 'Тестирование JWT и OAuth2',
  'Versioned request history & collections': 'Версионированная история и коллекции запросов',
  'Latency analytics dashboard': 'Панель анализа задержек',
  'One-click mock servers': 'Mock-серверы в один клик',
  'Symptom analysis with confidence scoring': 'Анализ симптомов с оценкой уверенности',
  'Urgency-based triage engine': 'Триаж по уровню срочности',
  'Patient records & history timelines': 'Карточки и история пациентов',
  'Doctor consultation workspace': 'Рабочее место врача',
  'Auto-drafted clinical summaries': 'Автоматические клинические заключения',
  'HIPAA-aligned data handling': 'Обработка данных по стандартам HIPAA',
  'Brand voice & tone presets': 'Настройки голоса и тона бренда',
  'Multi-platform output (IG, X, LinkedIn)': 'Контент для нескольких платформ',
  'Email subject-line A/B variants': 'A/B-варианты тем писем',
  'One-line brief to full campaign': 'От одной строки до полной кампании',
  'Team approval workflows': 'Командное согласование',
  'Performance analytics loop': 'Цикл анализа эффективности',
  'Avg. Response': 'Средний ответ',
  'Endpoints Tested': 'Проверено endpoint-ов',
  'Dev Hours Saved': 'Сэкономлено часов',
  'Triage Accuracy': 'Точность триажа',
  'Patients Served': 'Обслужено пациентов',
  'Consult Time Saved': 'Экономия времени врача',
  'Assets Generated': 'Создано материалов',
  'Content Output': 'Объем контента',
  'Engagement Lift': 'Рост вовлеченности',
  'Request Builder': 'Конструктор запросов',
  'Code Sandbox': 'Песочница кода',
  'Fetch paginated user list': 'Получить список пользователей',
  'Issue JWT access token': 'Создать JWT-токен доступа',
  'Live analytics snapshot': 'Снимок аналитики в реальном времени',
  'Select an endpoint to execute a live request': 'Выберите endpoint для живого запроса',
  'Executing request…': 'Запрос выполняется…',
  'Run code': 'Запустить код',
  'Running…': 'Выполняется…',
  'Live terminal': 'Живой терминал',
  'Editable JavaScript sandbox': 'Редактируемая JavaScript-песочница',
  'Fetch users': 'Получить пользователей',
  'Create auth token': 'Создать токен доступа',
  'Read live analytics': 'Открыть живую аналитику',
  'Select patient symptoms, then run the AI triage engine:': 'Выберите симптомы пациента и запустите AI-триаж:',
  Fever: 'Температура',
  Headache: 'Головная боль',
  Fatigue: 'Усталость',
  Cough: 'Кашель',
  'Chest Pain': 'Боль в груди',
  Dizziness: 'Головокружение',
  Nausea: 'Тошнота',
  'Sore Throat': 'Боль в горле',
  'Run AI Diagnosis': 'Запустить AI-диагностику',
  'Cross-referencing 40k+ clinical patterns': 'Сопоставляем с 40 000+ клинических случаев',
  'Probable conditions': 'Вероятные состояния',
  'Start new assessment': 'Начать новую оценку',
  'Urgent — See a Doctor Today': 'Срочно — обратитесь к врачу сегодня',
  'Moderate — Consult Within 24h': 'Средне — консультация в течение 24 часов',
  'Low — Self Care Recommended': 'Низкий риск — рекомендуется самопомощь',
  'Cardiovascular strain': 'Сердечно-сосудистая нагрузка',
  'Acute respiratory condition': 'Острое респираторное состояние',
  'Musculoskeletal issue': 'Проблема опорно-двигательной системы',
  'Viral upper-respiratory infection': 'Вирусная инфекция верхних дыхательных путей',
  'Seasonal flu': 'Сезонный грипп',
  'Stress-related fatigue': 'Усталость, связанная со стрессом',
  'Mild viral infection': 'Легкая вирусная инфекция',
  'Sleep deficit / fatigue': 'Недосыпание / усталость',
  Dehydration: 'Обезвоживание',
  'Chest pain requires prompt evaluation. Visit the nearest clinic or emergency department.':
    'Боль в груди требует срочной оценки. Обратитесь в ближайшую клинику или отделение неотложной помощи.',
  'Rest, hydrate, and monitor symptoms. Book a tele-consultation if symptoms persist beyond 48 hours.':
    'Отдыхайте, пейте больше жидкости и следите за симптомами. Если они сохраняются более 48 часов, запишитесь на консультацию.',
  'Symptoms appear mild. Rest, fluids, and OTC remedies should help. Re-check if they worsen.':
    'Симптомы выглядят легкими. Отдых, жидкость и безрецептурные средства должны помочь. Обратитесь повторно при ухудшении.',
  'Social Media Post': 'Пост для соцсетей',
  'Email Subject Line': 'Тема письма',
  'Product Description': 'Описание продукта',
  'Pick a content type and generate 3 AI variants': 'Выберите тип контента и создайте 3 AI-варианта',
  'Generate Variants': 'Создать варианты',
  Generating: 'Создание',
  'Generating…': 'Создание…',
  Copied: 'Скопировано',
  Copy: 'Копировать',
  'Your workflow deserves an upgrade. Meet automation that thinks ahead — built with AI, designed for humans. Tap the link to see what your team could be doing instead. #Productivity #AI':
    'Ваш рабочий процесс заслуживает обновления. Автоматизация, которая думает наперед: создана на AI, разработана для людей. #Продуктивность #AI',
  'We analyzed 10,000 tasks. The pattern? The best teams automate the boring stuff. Here are the 5 workflows worth automating this week — thread below.':
    'Мы проанализировали 10 000 задач. Лучшие команды автоматизируют рутину. Ниже — 5 процессов, которые стоит автоматизировать уже на этой неделе.',
  'POV: It is 9:00 AM and your content calendar is already done. Not magic — just Marketing AI. Free trial in bio.':
    '9:00 утра, а ваш контент-план уже готов. Не магия — просто Marketing AI. Бесплатный тест по ссылке в профиле.',
  'Your competitors already did this (you have 48 hours)': 'Ваши конкуренты уже сделали это (у вас есть 48 часов)',
  'A 10x content engine, explained in 90 seconds': 'Контент-система 10x за 90 секунд',
  '[First Name], your Q1 marketing plan just got easier': '[Имя], ваш маркетинговый план на Q1 стал проще',
  'Meet the studio that never sleeps. The Marketing AI Generator transforms a single sentence into an entire campaign — on-brand visuals, scroll-stopping copy, and platform-perfect formatting. Write less. Launch more.':
    'Студия, которая никогда не спит. Marketing AI Generator превращает одну фразу в целую кампанию: фирменные визуалы, сильный текст и идеальный формат. Пишите меньше. Запускайте больше.',
  'Crafted for teams that move fast: one brief in, dozens of publish-ready assets out. Every output learns from your brand voice, so tone stays unmistakably you.':
    'Для быстрых команд: один бриф на входе, десятки готовых материалов на выходе. Система изучает голос бренда и сохраняет ваш тон.',
  'Stop staring at blank pages. From first draft to final export in under a minute — with analytics that close the loop on what actually converts.':
    'Хватит смотреть на пустой лист. От первого черновика до экспорта меньше чем за минуту — с аналитикой реальной конверсии.',

  // Metrics and reviews
  'Proven Results': 'Доказанные результаты',
  Client: 'Результаты',
  Outcomes: 'клиентов',
  'Numbers first — then the people behind them': 'Сначала цифры, затем люди, стоящие за ними',
  'Uptime SLA in production': 'Доступность в production',
  'Average API response time': 'Среднее время ответа API',
  'Projects delivered end-to-end': 'Проектов сдано под ключ',
  'Client satisfaction rate': 'Удовлетворенность клиентов',
  'Previous testimonial': 'Предыдущий отзыв',
  'Next testimonial': 'Следующий отзыв',
  'Javohir rebuilt our monolith into a microservices platform without a single minute of downtime. His AI integration work alone automated 60% of our support workflow. Rare mix of speed and rigor.':
    'Джавохир превратил наш монолит в микросервисную платформу без единой минуты простоя. Только интеграция AI автоматизировала 60% поддержки. Редкое сочетание скорости и качества.',
  'He delivered our ERP three weeks ahead of schedule — and it just works. The React architecture he set up is still the cleanest codebase our team has ever inherited.':
    'Он сдал ERP на три недели раньше срока, и она просто работает. Созданная им React-архитектура — самая чистая кодовая база, которую получала наша команда.',
  'The Health AI platform exceeded every expectation. Symptom triage accuracy hit 94% in pilot, and physicians actually enjoy using it. Investors were impressed — that says everything.':
    'Платформа Health AI превзошла ожидания. Точность триажа достигла 94% в пилоте, а врачам действительно нравится с ней работать. Инвесторы были впечатлены.',
  'Marketing output went from 3 posts a week to 30 — without hiring anyone new. The content engine Javohir built understands our brand voice better than most humans we interviewed.':
    'Без найма новых сотрудников выпуск контента вырос с 3 до 30 постов в неделю. Система Джавохира понимает голос нашего бренда лучше большинства специалистов.',

  // Calculator
  'Project Estimator': 'Оценка проекта',
  Budget: 'Калькулятор',
  Calculator: 'бюджета',
  'Get an instant estimate for your project scope': 'Получите быструю оценку стоимости проекта',
  'Select Services': 'Выберите услуги',
  'Frontend Development': 'Frontend-разработка',
  'Backend Development': 'Backend-разработка',
  'AI Integration': 'Интеграция AI',
  'Database Design': 'Проектирование базы данных',
  'API Development': 'Разработка API',
  'DevOps & Deployment': 'DevOps и развертывание',
  'Project Complexity': 'Сложность проекта',
  simple: 'простой',
  medium: 'средний',
  complex: 'сложный',
  'Project Estimate': 'Оценка проекта',
  'Estimated Budget': 'Ориентировочный бюджет',
  'Estimated Timeline': 'Ориентировочный срок',
  weeks: 'нед.',
  'Selected Services:': 'Выбранные услуги:',
  'Get Detailed Quote': 'Получить точную оценку',

  // Contact
  'Get in Touch': 'Связаться',
  'Contact Hub': 'Контактный центр',
  'Let\'s discuss your next project and bring your vision to life':
    'Обсудим ваш следующий проект и воплотим идею в жизнь',
  'Send Message': 'Отправить сообщение',
  'Your Name': 'Ваше имя',
  'Email Address': 'Email',
  Message: 'Сообщение',
  'Tell me about your project...': 'Расскажите о вашем проекте...',
  'Message Sent!': 'Сообщение отправлено!',
  'Prefer to talk it through?': 'Предпочитаете обсудить голосом?',
  'Book a free 15-minute discovery call': 'Забронируйте бесплатный 15-минутный звонок',
  'Typical response time': 'Обычно отвечаю',
  'Under 3 hours · GMT+5 timezone': 'Менее чем за 3 часа · GMT+5',
  Location: 'Локация',
  'Tashkent, Uzbekistan': 'Ташкент, Узбекистан',

  // Booking
  '15-min Discovery Call': '15-минутный ознакомительный звонок',
  'Google Meet · Tashkent (GMT+5)': 'Google Meet · Ташкент (GMT+5)',
  Date: 'Дата',
  Time: 'Время',
  Details: 'Данные',
  'Pick a day that suits you:': 'Выберите удобный день:',
  'Available slots (GMT+5):': 'Доступное время (GMT+5):',
  'Your name': 'Ваше имя',
  'Email for the Meet link': 'Email для ссылки Meet',
  'Confirm Booking': 'Подтвердить бронирование',
  'You\'re booked in!': 'Звонок забронирован!',
  '15-minute video call': '15-минутный видеозвонок',
  Done: 'Готово',
  'Ping on Telegram': 'Написать в Telegram',
  'Scheduling powered by Cal.com — no card required, cancel anytime':
    'Планирование через Cal.com — карта не нужна, отмена в любое время',

  // Chat
  'Open Javohir AI assistant': 'Открыть помощника Javohir AI',
  'Online — replies instantly': 'Онлайн — отвечает мгновенно',
  'Ask about skills, pricing, projects…': 'Спросите о навыках, ценах или проектах…',
  'Trained on Javohir\'s real experience — human reply guaranteed on booking':
    'Обучен на реальном опыте Джавохира — личный ответ после бронирования',
};

const TABLES: Record<Exclude<Language, 'EN'>, TranslationTable> = { UZ, RU };

const reverseTables = Object.fromEntries(
  Object.entries(TABLES).map(([language, table]) => [
    language,
    new Map(Object.entries(table).map(([english, translated]) => [translated, english])),
  ]),
) as Record<Exclude<Language, 'EN'>, Map<string, string>>;

const resolveEnglish = (value: string) => {
  if (value in UZ || value in RU) return value;
  return reverseTables.UZ.get(value) ?? reverseTables.RU.get(value) ?? value;
};

const translate = (value: string, language: Language) => {
  const english = resolveEnglish(value);
  if (language === 'EN') return english;
  return TABLES[language][english] ?? english;
};

/**
 * Localizes static React output without coupling every visual component to a
 * translation library. Dynamic terminal/code regions opt out with
 * data-no-translate so code remains untouched.
 */
export const AutoTranslator = ({ language }: { language: Language }) => {
  useEffect(() => {
    let applying = false;

    const shouldSkip = (element: Element | null) =>
      !element ||
      Boolean(element.closest('script, style, pre, code, textarea, [data-no-translate="true"]'));

    const translateTextNode = (node: Text) => {
      if (shouldSkip(node.parentElement)) return;
      const value = node.nodeValue ?? '';
      const match = value.match(/^(\s*)(.*?)(\s*)$/s);
      if (!match || !match[2]) return;
      const next = `${match[1]}${translate(match[2], language)}${match[3]}`;
      if (next !== value) node.nodeValue = next;
    };

    const translateAttributes = (element: Element) => {
      if (shouldSkip(element)) return;
      ['placeholder', 'title', 'aria-label'].forEach((attribute) => {
        const value = element.getAttribute(attribute);
        if (!value) return;
        const next = translate(value, language);
        if (next !== value) element.setAttribute(attribute, next);
      });
    };

    const walk = (root: Node) => {
      if (root.nodeType === Node.TEXT_NODE) {
        translateTextNode(root as Text);
        return;
      }
      if (root.nodeType !== Node.ELEMENT_NODE && root !== document.body) return;
      const element = root as Element;
      if (root !== document.body && shouldSkip(element)) return;
      if (root !== document.body) translateAttributes(element);

      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
      let current = walker.nextNode();
      while (current) {
        if (current.nodeType === Node.TEXT_NODE) translateTextNode(current as Text);
        else translateAttributes(current as Element);
        current = walker.nextNode();
      }
    };

    applying = true;
    walk(document.body);
    applying = false;

    const observer = new MutationObserver((mutations) => {
      if (applying) return;
      applying = true;
      mutations.forEach((mutation) => {
        if (mutation.type === 'characterData') walk(mutation.target);
        mutation.addedNodes.forEach(walk);
      });
      applying = false;
    });

    observer.observe(document.body, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);

  return null;
};

export const translateUI = translate;