import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  BrainCircuit,
  SendHorizontal,
  Calendar,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import type { Language } from '../localization';

/* ---------------------------------- Types ---------------------------------- */

interface ChatAction {
  label: string;
  type: 'book' | 'scroll';
  target?: string;
}

interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  action?: ChatAction;
}

interface KnowledgeEntry {
  keywords: string[];
  response: string;
  action?: ChatAction;
}

/* ---------------------------------- Knowledge base ---------------------------------- */

const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ['experience', 'years', 'career', 'history', 'background', 'worked', 'tajriba', 'karyera', 'ishlagan', 'опыт', 'карьера', 'работал'],
    response:
      "I'm a Middle Full-Stack Engineer at TechCorp Innovatsiya Markazi (2024–present), where I lead microservices architecture and AI integration.\n\nBefore that, I spent 2 years at SoftSolutions IT building enterprise React + Node.js ERP systems.\n\nI'm also completing my Computer Science degree at Tashkent University of Applied Sciences.",
  },
  {
    keywords: ['skill', 'stack', 'technology', 'technologies', 'tech', 'language', 'framework', 'ko\'nikma', 'texnologiya', 'stek', 'навык', 'технолог', 'стек'],
    response:
      'My core arsenal:\n\n• Frontend — React, TypeScript, Vue, Next.js, Tailwind (95%)\n• Backend — Node.js, Python, FastAPI, PostgreSQL, Redis (90%)\n• AI & Tools — OpenAI API, LangChain, TensorFlow, Docker, AWS (92%)\n\nI pick the right tool for the problem, not the trendiest one.',
  },
  {
    keywords: ['project', 'portfolio', 'built', 'demo', 'case', 'work', 'loyiha', 'ishlar', 'проект', 'портфолио', 'работы', 'sdk', 'action', 'bot', 'canvas'],
    response:
      "Here are Jasper's 4 Flagship Production Projects:\n\n1. 💳 UzPayment SDK — Universal multi-provider Fintech SDK (Click, Payme, Uzum, Paynet) with 100% test coverage.\n2. 🤖 AI Code Reviewer & Security Auditor — Google Gemini AI GitHub Action for PR reviews and OWASP vulnerability scans.\n3. 🎨 CollabFlow AI Canvas — Real-time multiplayer whiteboard with Gemini AI text-to-architecture engine.\n4. 🎙️ Voice2Deal AI (@Ovozli_SavdoBOT) — Voice-driven Retail POS, Inventory & Debt Ledger SaaS bot.\n\nClick any project card on the page to inspect architecture, source code, and live demos!",
  },
  {
    keywords: ['price', 'cost', 'budget', 'estimate', 'rate', 'much', 'charge', 'fee', 'narx', 'byudjet', 'qancha', 'цена', 'стоимость', 'бюджет', 'сколько'],
    response:
      'Project pricing depends on scope:\n\n• Landing page / MVP frontend — from $2,500\n• Full-stack application — from $5,500\n• AI-integrated platform — from $8,000\n\nFor an instant tailored estimate, try the Budget Calculator on this page — or book a free 15-min call and I will scope it with you.',
    action: { label: 'Get Instant Estimate', type: 'scroll', target: '#calculator' },
  },
  {
    keywords: ['contact', 'phone', 'email', 'telegram', 'reach', 'mail', 'call', 'aloqa', 'telefon', 'bog\'lan', 'контакт', 'телефон', 'связаться', 'звонок'],
    response:
      'Fastest ways to reach me:\n\n• Telegram — @Dr_eviluz (fastest response)\n• Email — salomh46@gmail.com\n• Phone — +998 90 508-33-02\n\nI usually reply within a few hours, Tashkent time (GMT+5).',
    action: { label: 'Book a Call Instead', type: 'book' },
  },
  {
    keywords: ['available', 'hire', 'freelance', 'book', 'start', 'begin', 'open', 'bo\'sh', 'yollash', 'boshlash', 'band', 'свободен', 'нанять', 'начать', 'заказать'],
    response:
      "Yes — I'm currently accepting new projects! I take on a limited number of clients to keep quality high.\n\nThe quickest way to start is a free 15-minute discovery call: we discuss your idea, timeline, and budget, and I reply with a technical plan within 24 hours.",
    action: { label: 'Book Free 15-min Call', type: 'book' },
  },
  {
    keywords: ['location', 'where', 'live', 'based', 'city', 'country', 'qayer', 'joylashuv', 'shahar', 'где', 'локация', 'город', 'страна'],
    response:
      "I'm based in Tashkent, Uzbekistan (GMT+5) — and work with clients worldwide. My timezone overlaps conveniently with both European and US mornings.",
  },
  {
    keywords: ['process', 'how', 'methodology', 'workflow', 'approach', 'agile', 'jarayon', 'qanday', 'ishlash', 'процесс', 'как', 'подход', 'методология'],
    response:
      'My delivery process has 4 stages:\n\n1. Discovery — goals, users, constraints\n2. Architecture — system blueprint before code\n3. AI & Code — weekly demos, clean tested builds\n4. Launch & Scale — zero-downtime deploys, 99.9% uptime SLO\n\nScroll to the Work Process section for the full interactive breakdown.',
    action: { label: 'View Process', type: 'scroll', target: '#process' },
  },
  {
    keywords: ['ai', 'artificial', 'intelligence', 'ml', 'model', 'gpt', 'llm', 'chatgpt', 'sun\'iy intellekt', 'model', 'ии', 'искусственный интеллект', 'модель'],
    response:
      'AI integration is my specialty. I have shipped:\n\n• LLM-powered content engines (OpenAI API, LangChain)\n• Medical symptom triage with TensorFlow\n• RAG pipelines with vector search\n• AI agents wired into business workflows\n\nTell me your use case and I will propose an approach.',
    action: { label: 'Discuss My AI Idea', type: 'book' },
  },
  {
    keywords: ['timeline', 'long', 'deadline', 'fast', 'quick', 'duration', 'muddat', 'qancha vaqt', 'tez', 'срок', 'долго', 'быстро', 'дедлайн'],
    response:
      'Typical timelines:\n\n• Landing page — 1–2 weeks\n• MVP web app — 3–6 weeks\n• AI-integrated platform — 6–12 weeks\n\nI give you a guaranteed date and hit it. Use the Budget Calculator for a scope-based estimate.',
  },
];

const fallbackResponse =
  "Good question! I can help with topics like:\n\n• My experience & career\n• Skills and tech stack\n• Projects and live demos\n• Pricing & timelines\n• Booking a discovery call\n\nWhat would you like to know?";

const greeting =
  "Hello! I'm Javohir AI — the assistant of Asqarov Javohirbek, Senior Full-Stack & AI Engineer.\n\nAsk me anything about skills, experience, projects, or pricing — or tap a shortcut below.";

const quickPrompts = [
  'What are your skills?',
  'Show me your projects',
  'How much does it cost?',
  'Are you available?',
];

const UZ_CHAT: Record<string, string> = {
  [greeting]: 'Salom! Men Javohir AI — Senior Full-Stack va AI muhandis Asqarov Javohirbekning yordamchisiman.\n\nKo\'nikmalar, tajriba, loyihalar yoki narxlar haqida so\'rang — yoki pastdagi tezkor savollardan birini tanlang.',
  [fallbackResponse]: 'Yaxshi savol! Men quyidagi mavzularda yordam bera olaman:\n\n• Tajriba va karyera\n• Ko\'nikmalar va texnologik stek\n• Loyihalar va jonli demolar\n• Narxlar va muddatlar\n• Tanishuv qo\'ng\'irog\'ini band qilish\n\nNimani bilmoqchisiz?',
  'Hello! Great to meet you. Ask me about skills, projects, pricing — or book a free call with Javohir right away.': 'Salom! Tanishganimdan xursandman. Ko\'nikmalar, loyihalar yoki narxlar haqida so\'rang — yoxud Javohir bilan bepul qo\'ng\'iroqni hoziroq band qiling.',
  [knowledgeBase[0].response]: 'Men TechCorp Innovatsiya Markazida Middle Full-Stack muhandisiman (2024–hozir). U yerda mikroservis arxitekturasi va AI integratsiyasiga yetakchilik qilaman.\n\nUndan oldin SoftSolutions IT kompaniyasida 2 yil React + Node.js asosidagi korporativ ERP tizimlarini yaratdim.\n\nShuningdek, Toshkent Amaliy Fanlar Universitetida Kompyuter fanlari bo\'yicha tahsilni yakunlayapman.',
  [knowledgeBase[1].response]: 'Asosiy texnologiyalarim:\n\n• Frontend — React, TypeScript, Vue, Next.js, Tailwind (95%)\n• Backend — Node.js, Python, FastAPI, PostgreSQL, Redis (90%)\n• AI va vositalar — OpenAI API, LangChain, TensorFlow, Docker, AWS (92%)\n\nMen eng ommabop emas, muammo uchun eng to\'g\'ri vositani tanlayman.',
  [knowledgeBase[2].response]: 'Uchta asosiy loyiha:\n\n1. API Explorer — jonli so\'rov monitoringiga ega FastAPI test konsoli\n2. Health AI Medical System — ML asosidagi alomatlar triaj platformasi\n3. Marketing Materials Generator — bitta brifdan to\'liq kampaniya yaratuvchi AI studiya\n\nInteraktiv demoni sinash uchun istalgan loyiha kartasini bosing.',
  [knowledgeBase[3].response]: 'Loyiha narxi ko\'lamga bog\'liq:\n\n• Landing page / MVP frontend — $2,500 dan\n• Full-stack ilova — $5,500 dan\n• AI integratsiyali platforma — $8,000 dan\n\nTezkor shaxsiy hisob uchun Byudjet kalkulyatoridan foydalaning yoki bepul 15 daqiqalik qo\'ng\'iroqni band qiling.',
  [knowledgeBase[4].response]: 'Eng tez aloqa usullari:\n\n• Telegram — @Dr_eviluz (eng tez javob)\n• Email — salomh46@gmail.com\n• Telefon — +998 90 508-33-02\n\nOdatda Toshkent vaqti bilan bir necha soat ichida javob beraman (GMT+5).',
  [knowledgeBase[5].response]: 'Ha — hozir yangi loyihalarni qabul qilyapman! Sifatni yuqori saqlash uchun cheklangan miqdorda mijoz olaman.\n\nBoshlashning eng tez yo\'li — bepul 15 daqiqalik tanishuv qo\'ng\'irog\'i. G\'oya, muddat va byudjetni muhokama qilamiz, 24 soat ichida texnik reja yuboraman.',
  [knowledgeBase[6].response]: 'Men Toshkent, O\'zbekistonda (GMT+5) yashayman va butun dunyodagi mijozlar bilan ishlayman. Vaqt mintaqam Yevropa va AQShning ertalabki vaqtiga qulay mos keladi.',
  [knowledgeBase[7].response]: 'Ish jarayonim 4 bosqichdan iborat:\n\n1. Tahlil — maqsadlar, foydalanuvchilar, cheklovlar\n2. Arxitektura — koddan oldin tizim rejasi\n3. AI va kod — haftalik demo, toza va testlangan mahsulot\n4. Ishga tushirish — to\'xtovsiz deploy, 99.9% uptime\n\nTo\'liq interaktiv tavsif uchun Ish jarayoni bo\'limiga o\'ting.',
  [knowledgeBase[8].response]: 'AI integratsiyasi — mening asosiy mutaxassisligim. Men quyidagilarni yaratganman:\n\n• LLM asosidagi kontent tizimlari\n• TensorFlow bilan tibbiy triaj\n• Vektorli qidiruvli RAG pipeline\n• Biznes jarayonlariga ulangan AI agentlar\n\nVazifangizni ayting — mos yechim taklif qilaman.',
  [knowledgeBase[9].response]: 'Odatdagi muddatlar:\n\n• Landing page — 1–2 hafta\n• MVP veb-ilova — 3–6 hafta\n• AI integratsiyali platforma — 6–12 hafta\n\nMen aniq sanani kafolatlayman va unga amal qilaman. Ko\'lam bo\'yicha hisob uchun Byudjet kalkulyatoridan foydalaning.',
  'What are your skills?': 'Qanday ko\'nikmalaringiz bor?',
  'Show me your projects': 'Loyihalarni ko\'rsating',
  'How much does it cost?': 'Narxi qancha?',
  'Are you available?': 'Hozir bo\'shmisiz?',
  'Get Instant Estimate': 'Tezkor hisob olish',
  'Book a Call Instead': 'Qo\'ng\'iroqni band qilish',
  'Book Free 15-min Call': 'Bepul 15 daqiqalik qo\'ng\'iroq',
  'View Process': 'Jarayonni ko\'rish',
  'Discuss My AI Idea': 'AI g\'oyamni muhokama qilish',
  'Book Free Call': 'Bepul qo\'ng\'iroqni band qilish',
};

const RU_CHAT: Record<string, string> = {
  [greeting]: 'Здравствуйте! Я Javohir AI — помощник Асқарова Джавохирбека, Senior Full-Stack и AI-инженера.\n\nСпросите меня о навыках, опыте, проектах или ценах — либо выберите быстрый вопрос ниже.',
  [fallbackResponse]: 'Хороший вопрос! Я могу рассказать о:\n\n• Опыте и карьере\n• Навыках и технологическом стеке\n• Проектах и живых демо\n• Ценах и сроках\n• Бронировании ознакомительного звонка\n\nЧто вы хотите узнать?',
  'Hello! Great to meet you. Ask me about skills, projects, pricing — or book a free call with Javohir right away.': 'Здравствуйте! Рад знакомству. Спросите о навыках, проектах или ценах — либо сразу забронируйте бесплатный звонок с Джавохиром.',
  [knowledgeBase[0].response]: 'Я Middle Full-Stack инженер в TechCorp Innovatsiya Markazi (с 2024 года), где руковожу микросервисной архитектурой и интеграцией AI.\n\nДо этого 2 года работал в SoftSolutions IT над корпоративными ERP-системами на React + Node.js.\n\nТакже завершаю обучение по компьютерным наукам в Ташкентском университете прикладных наук.',
  [knowledgeBase[1].response]: 'Мой основной стек:\n\n• Frontend — React, TypeScript, Vue, Next.js, Tailwind (95%)\n• Backend — Node.js, Python, FastAPI, PostgreSQL, Redis (90%)\n• AI и инструменты — OpenAI API, LangChain, TensorFlow, Docker, AWS (92%)\n\nЯ выбираю лучший инструмент для задачи, а не самый модный.',
  [knowledgeBase[2].response]: 'Три ключевых проекта:\n\n1. API Explorer — консоль тестирования FastAPI с живым мониторингом\n2. Health AI Medical System — ML-платформа триажа симптомов\n3. Marketing Materials Generator — AI-студия, превращающая один бриф в кампанию\n\nНажмите на карточку проекта, чтобы попробовать интерактивное демо.',
  [knowledgeBase[3].response]: 'Цена зависит от объема:\n\n• Landing page / MVP frontend — от $2,500\n• Full-stack приложение — от $5,500\n• Платформа с AI — от $8,000\n\nДля мгновенной оценки используйте калькулятор бюджета или забронируйте бесплатный 15-минутный звонок.',
  [knowledgeBase[4].response]: 'Быстрее всего связаться со мной так:\n\n• Telegram — @Dr_eviluz\n• Email — salomh46@gmail.com\n• Телефон — +998 90 508-33-02\n\nОбычно отвечаю в течение нескольких часов по времени Ташкента (GMT+5).',
  [knowledgeBase[5].response]: 'Да — сейчас я принимаю новые проекты! Чтобы сохранять высокое качество, беру ограниченное число клиентов.\n\nСамый быстрый старт — бесплатный 15-минутный звонок: обсудим идею, сроки и бюджет, а в течение 24 часов я пришлю технический план.',
  [knowledgeBase[6].response]: 'Я нахожусь в Ташкенте, Узбекистан (GMT+5), и работаю с клиентами по всему миру. Мой часовой пояс удобно пересекается с Европой и утром США.',
  [knowledgeBase[7].response]: 'Мой процесс состоит из 4 этапов:\n\n1. Исследование — цели, пользователи, ограничения\n2. Архитектура — схема системы до кода\n3. AI и код — еженедельные демо и тесты\n4. Запуск и рост — без простоев, uptime 99.9%\n\nПерейдите к разделу процесса для интерактивного описания.',
  [knowledgeBase[8].response]: 'Интеграция AI — моя специализация. Я запускал:\n\n• Контент-системы на LLM\n• Медицинский триаж на TensorFlow\n• RAG-пайплайны с векторным поиском\n• AI-агентов в бизнес-процессах\n\nРасскажите о задаче — предложу подход.',
  [knowledgeBase[9].response]: 'Типичные сроки:\n\n• Landing page — 1–2 недели\n• MVP-приложение — 3–6 недель\n• Платформа с AI — 6–12 недель\n\nЯ фиксирую дату и соблюдаю ее. Для оценки по объему используйте калькулятор бюджета.',
  'What are your skills?': 'Какие у вас навыки?',
  'Show me your projects': 'Покажите проекты',
  'How much does it cost?': 'Сколько это стоит?',
  'Are you available?': 'Вы сейчас свободны?',
  'Get Instant Estimate': 'Получить быструю оценку',
  'Book a Call Instead': 'Назначить звонок',
  'Book Free 15-min Call': 'Бесплатный 15-минутный звонок',
  'View Process': 'Смотреть процесс',
  'Discuss My AI Idea': 'Обсудить AI-идею',
  'Book Free Call': 'Назначить бесплатный звонок',
};

const localizeChat = (value: string, language: Language) => {
  if (language === 'UZ') return UZ_CHAT[value] ?? value;
  if (language === 'RU') return RU_CHAT[value] ?? value;
  return value;
};

const findResponse = (input: string, language: Language): { response: string; action?: ChatAction } => {
  const lower = input.toLowerCase();
  if (/^(hi|hello|hey|salom|assalom|yo|привет|здравствуй|здравствуйте|добрый (день|вечер)|good (morning|day|evening))\b/.test(lower))
    return {
      response: localizeChat('Hello! Great to meet you. Ask me about skills, projects, pricing — or book a free call with Javohir right away.', language),
      action: { label: localizeChat('Book Free Call', language), type: 'book' },
    };
  for (const entry of knowledgeBase) {
    if (entry.keywords.some((k) => lower.includes(k)))
      return {
        response: localizeChat(entry.response, language),
        action: entry.action
          ? { ...entry.action, label: localizeChat(entry.action.label, language) }
          : undefined,
      };
  }
  return { response: localizeChat(fallbackResponse, language) };
};

/* ---------------------------------- Typing bubble ---------------------------------- */

const AssistantBubble = ({ text }: { text: string }) => {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= text.length) return;
    const t = setTimeout(() => setShown((s) => Math.min(s + 3, text.length)), 12);
    return () => clearTimeout(t);
  }, [shown, text]);

  return (
    <span className="whitespace-pre-wrap">
      {text.slice(0, shown)}
      {shown < text.length && <span className="animate-pulse text-[#00F0FF]">▍</span>}
    </span>
  );
};

/* ---------------------------------- Widget ---------------------------------- */

interface AIChatWidgetProps {
  onBookCall: () => void;
  language: Language;
}

export const AIChatWidget = ({ onBookCall, language }: AIChatWidgetProps) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousLanguageRef = useRef(language);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  };

  const openChat = () => {
    setOpen(true);
    if (!hasInteracted) {
      setHasInteracted(true);
      setThinking(true);
      setTimeout(() => {
        idRef.current += 1;
        setMessages([
          {
            id: idRef.current,
            role: 'assistant',
            text: localizeChat(greeting, language),
          },
        ]);
        setThinking(false);
      }, 700);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  // Restart the conversation in the newly selected language.
  useEffect(() => {
    if (previousLanguageRef.current === language) return;
    previousLanguageRef.current = language;
    setMessages([]);
    setInput('');
    setHasInteracted(open);

    if (!open) {
      setThinking(false);
      return;
    }

    setThinking(true);
    const timer = setTimeout(() => {
      idRef.current += 1;
      setMessages([
        {
          id: idRef.current,
          role: 'assistant',
          text: localizeChat(greeting, language),
        },
      ]);
      setThinking(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [language, open]);

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || thinking) return;

    idRef.current += 1;
    const userMsg: ChatMessage = { id: idRef.current, role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setThinking(true);

    const { response, action } = findResponse(text, language);
    const delay = Math.min(1400, 400 + text.length * 20);

    setTimeout(() => {
      idRef.current += 1;
      setMessages((prev) => [
        ...prev,
        { id: idRef.current, role: 'assistant', text: response, action },
      ]);
      setThinking(false);
    }, delay);
  };

  const handleAction = (action: ChatAction) => {
    if (action.type === 'book') {
      setOpen(false);
      onBookCall();
    } else if (action.target) {
      setOpen(false);
      document.querySelector(action.target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={openChat}
            className="fixed bottom-6 right-6 z-[70] group"
            aria-label="Open Javohir AI assistant"
          >
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#00F0FF] opacity-60 blur-lg group-hover:opacity-90 transition-opacity" />
            <span className="relative flex items-center gap-2.5 px-4 py-3.5 rounded-2xl bg-[#141419] border border-white/15">
              <span className="relative">
                <BrainCircuit className="w-6 h-6 text-[#D4AF37]" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#141419]" />
              </span>
              <span className="hidden sm:block text-sm font-semibold text-white">
                Javohir <span className="text-gradient-cyan">AI</span>
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-6 right-6 z-[80] w-[calc(100vw-3rem)] sm:w-[24rem] rounded-3xl overflow-hidden bg-[#121216] border border-white/15 shadow-2xl flex flex-col"
            style={{ height: 'min(560px, calc(100vh - 6rem))', boxShadow: '0 20px 80px rgba(0,0,0,0.6), 0 0 60px rgba(212,175,55,0.08)' }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/10 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#00F0FF]/10 flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#00F0FF]/20 border border-white/10 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-[#D4AF37]" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#121216]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm">
                  Javohir <span className="text-gradient-cyan">AI</span>
                </p>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online — replies instantly
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-1' : ''}`}>
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-black rounded-br-md font-medium'
                          : 'bg-white/[0.06] border border-white/10 text-white/85 rounded-bl-md'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <AssistantBubble text={msg.text} />
                      ) : (
                        msg.text
                      )}
                    </div>
                    {msg.action && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: Math.min(1, msg.text.length * 0.004) }}
                        onClick={() => handleAction(msg.action!)}
                        className="mt-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/20 transition-colors flex items-center gap-1.5"
                      >
                        {msg.action.type === 'book' ? (
                          <Calendar className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5" />
                        )}
                        {msg.action.label}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Thinking indicator */}
              {thinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/[0.06] border border-white/10 flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]"
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Quick prompts */}
              {messages.length <= 1 && !thinking && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {quickPrompts.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(localizeChat(q, language))}
                      className="px-3 py-1.5 rounded-full text-xs bg-white/[0.04] border border-white/10 text-white/60 hover:border-[#D4AF37]/40 hover:text-white transition-colors"
                    >
                      {localizeChat(q, language)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="p-3 border-t border-white/10 bg-white/[0.02] flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, pricing, projects…"
                className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                disabled={!input.trim() || thinking}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center disabled:opacity-40 shrink-0"
                aria-label="Send message"
              >
                <SendHorizontal className="w-4 h-4 text-black" />
              </motion.button>
            </form>

            {/* Footer hint */}
            <div className="px-4 py-2 border-t border-white/5 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#D4AF37]/60" />
              <p className="text-[10px] text-white/25">
                Trained on Javohir's real experience — human reply guaranteed on booking
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
