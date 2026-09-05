import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Play,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Activity,
  Sparkles,
  AlertTriangle,
  Copy,
  RotateCcw,
  Calendar,
  SquareTerminal,
  FileCode2,
  ShieldCheck,
  Zap,
  Mic,
  Volume2,
  Code,
  Check,
  Send,
  Sliders,
  Radio,
  Layers,
  MousePointer,
  Cpu,
  Bot
} from 'lucide-react';
import type { Project } from '../data/projects';
import { type Language } from '../localization';

/* ---------------------------------- Shared JSON renderer ---------------------------------- */

const JsonValue = ({ value, indent }: { value: unknown; indent: number }) => {
  const pad = '  '.repeat(indent);
  const padClose = '  '.repeat(Math.max(0, indent - 1));

  if (value === null) return <span className="text-gray-500">null</span>;
  if (typeof value === 'boolean')
    return <span className="text-amber-400">{String(value)}</span>;
  if (typeof value === 'number')
    return <span className="text-amber-300">{String(value)}</span>;
  if (typeof value === 'string')
    return <span className="text-emerald-400">"{value}"</span>;

  if (Array.isArray(value)) {
    return (
      <span>
        [{'\n'}
        {value.map((v, i) => (
          <span key={i}>
            {pad}
            <JsonValue value={v} indent={indent + 1} />
            {i < value.length - 1 ? ',' : ''}
            {'\n'}
          </span>
        ))}
        {padClose}]
      </span>
    );
  }

  const entries = Object.entries(value as Record<string, unknown>);
  return (
    <span>
      {'{'}{'\n'}
      {entries.map(([k, v], i) => (
        <span key={k}>
          {pad}
          <span className="text-cyan-300">"{k}"</span>: <JsonValue value={v} indent={indent + 1} />
          {i < entries.length - 1 ? ',' : ''}
          {'\n'}
        </span>
      ))}
      {padClose}{'}'}
    </span>
  );
};

/* ---------------------------------- 1. UzPayment SDK Demo ---------------------------------- */

const UzPaymentDemo = () => {
  const [provider, setProvider] = useState<'click' | 'payme' | 'uzum' | 'paynet'>('click');
  const [amount, setAmount] = useState('150000');
  const [orderId, setOrderId] = useState('ORD-9842');
  const [activeTab, setActiveTab] = useState<'sdk' | 'response'>('sdk');
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<'idle' | 'executing' | 'success'>('idle');

  const getCodeSnippet = () => {
    switch (provider) {
      case 'click':
        return `import { UzPayment, ClickProvider } from 'uzpayment-sdk';

const payment = new UzPayment({
  provider: new ClickProvider({
    serviceId: process.env.CLICK_SERVICE_ID!,
    merchantId: process.env.CLICK_MERCHANT_ID!,
    secretKey: process.env.CLICK_SECRET_KEY!,
  })
});

// Generate signed checkout URL
const checkoutUrl = payment.createInvoiceUrl({
  amount: ${amount}, // ${Number(amount || 0).toLocaleString()} UZS
  orderId: '${orderId}',
  returnUrl: 'https://myshop.uz/payment/success'
});`;
      case 'payme':
        return `import { UzPayment, PaymeProvider } from 'uzpayment-sdk';

const payment = new UzPayment({
  provider: new PaymeProvider({
    merchantId: process.env.PAYME_MERCHANT_ID!,
    secretKey: process.env.PAYME_SECRET_KEY!,
    testMode: false
  })
});

// Create Base64 Paycom transaction link
const paymeLink = payment.createInvoiceUrl({
  amount: ${amount},
  orderId: '${orderId}'
});`;
      case 'uzum':
        return `import { UzPayment, UzumProvider } from 'uzpayment-sdk';

const payment = new UzPayment({
  provider: new UzumProvider({
    terminalId: process.env.UZUM_TERMINAL_ID!,
    secretKey: process.env.UZUM_SECRET_KEY!
  })
});

const paymentSession = await payment.initiateTransaction({
  amount: ${amount},
  orderId: '${orderId}',
  currency: '860' // UZS
});`;
      case 'paynet':
        return `import { UzPayment, PaynetProvider } from 'uzpayment-sdk';

const payment = new UzPayment({
  provider: new PaynetProvider({
    serviceId: process.env.PAYNET_SERVICE_ID!,
    secretKey: process.env.PAYNET_SECRET_KEY!
  })
});`;
    }
  };

  const getMockResponse = () => {
    const time = new Date().toISOString();
    return {
      status: 'SUCCESS',
      provider: provider.toUpperCase(),
      transactionId: `TX-${provider.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
      orderId: orderId,
      amount: Number(amount || 0),
      currency: 'UZS',
      signature: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      timestamp: time,
      providerLatency: '0.84ms',
      verified: true
    };
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTestCall = () => {
    setStatus('executing');
    setTimeout(() => {
      setStatus('success');
      setActiveTab('response');
    }, 600);
  };

  return (
    <div className="space-y-4 text-xs md:text-sm">
      {/* Provider Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10">
          {(['click', 'payme', 'uzum', 'paynet'] as const).map((p) => (
            <button
              key={p}
              onClick={() => {
                setProvider(p);
                setStatus('idle');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                provider === p
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'text-white/40 hover:text-white/80'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-28 px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
            placeholder="Amount UZS"
          />
          <button
            onClick={handleTestCall}
            disabled={status === 'executing'}
            className="px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
          >
            {status === 'executing' ? (
              <Activity className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            Run SDK
          </button>
        </div>
      </div>

      {/* Code / Output Tabs */}
      <div className="rounded-xl bg-black/60 border border-white/10 overflow-hidden font-mono">
        <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('sdk')}
              className={`text-xs pb-1 border-b-2 font-medium transition-colors ${
                activeTab === 'sdk'
                  ? 'text-cyan-400 border-cyan-400'
                  : 'text-white/40 border-transparent hover:text-white/70'
              }`}
            >
              TypeScript Example
            </button>
            <button
              onClick={() => setActiveTab('response')}
              className={`text-xs pb-1 border-b-2 font-medium transition-colors ${
                activeTab === 'response'
                  ? 'text-cyan-400 border-cyan-400'
                  : 'text-white/40 border-transparent hover:text-white/70'
              }`}
            >
              Response Output {status === 'success' && '🟢'}
            </button>
          </div>
          <button
            onClick={handleCopy}
            className="p-1 text-white/40 hover:text-white transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="p-4 text-xs overflow-x-auto max-h-60 leading-relaxed">
          {activeTab === 'sdk' ? (
            <pre className="text-cyan-300">
              <code>{getCodeSnippet()}</code>
            </pre>
          ) : (
            <pre className="text-emerald-400">
              <JsonValue value={getMockResponse()} indent={1} />
            </pre>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
          <span className="text-white/40 block">Crypto Engine</span>
          <span className="font-semibold text-cyan-400">Native Node crypto</span>
        </div>
        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
          <span className="text-white/40 block">Test Coverage</span>
          <span className="font-semibold text-emerald-400">100% Jest Passed</span>
        </div>
        <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
          <span className="text-white/40 block">Security</span>
          <span className="font-semibold text-amber-400">HMAC-SHA256 & Auth</span>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------- 2. AI Code Reviewer Demo ---------------------------------- */

const AICodeReviewerDemo = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [completed, setCompleted] = useState(true);

  const mockDiff = `@@ -14,6 +14,8 @@ router.post('/login', async (req, res) => {
-  const user = await db.query(\`SELECT * FROM users WHERE email = '\${req.body.email}'\`);
+  // Vulnerable Query detected
+  const query = "SELECT * FROM users WHERE email = '" + req.body.email + "' AND password = '" + req.body.password + "'";
+  const user = await db.query(query);`;

  const runAudit = () => {
    setAnalyzing(true);
    setCompleted(false);
    setTimeout(() => {
      setAnalyzing(false);
      setCompleted(true);
    }, 1200);
  };

  return (
    <div className="space-y-4 text-xs md:text-sm">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
            PR #42 Diff Analysis
          </span>
          <span className="text-white/40 text-xs font-mono">auth/login.controller.ts</span>
        </div>
        <button
          onClick={runAudit}
          disabled={analyzing}
          className="px-3 py-1.5 rounded-lg bg-amber-500 text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
        >
          {analyzing ? (
            <Activity className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Zap className="w-3.5 h-3.5 fill-current" />
          )}
          Re-Analyze Diff
        </button>
      </div>

      {/* Code diff view */}
      <div className="rounded-xl bg-black/60 border border-white/10 overflow-hidden font-mono text-xs">
        <div className="p-3 bg-red-500/10 border-b border-red-500/20 text-red-300">
          <pre>{mockDiff}</pre>
        </div>
      </div>

      {/* AI Review Result */}
      {completed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-[#18181f] border border-amber-500/30 p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white text-xs">Gemini 1.5 Security Audit Result</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold uppercase">
              Critical Risk: OWASP A03
            </span>
          </div>

          <div className="text-xs text-white/70 space-y-1.5">
            <p className="text-red-300 font-semibold">
              ⚠️ SQL Injection Vulnerability detected in string concatenation!
            </p>
            <p className="text-white/60">
              Directly inserting <code className="text-amber-300 font-mono">req.body.email</code> and password into raw SQL permits authentication bypass via <code className="text-amber-300 font-mono">' OR 1=1 --</code>.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[11px]">
            <p className="font-bold text-emerald-400 mb-1">💡 Suggested Secure Remediation:</p>
            <code>
              const query = 'SELECT * FROM users WHERE email = $1 AND password_hash = $2';<br/>
              const user = await db.query(query, [req.body.email, hashedPassword]);
            </code>
          </div>
        </motion.div>
      )}
    </div>
  );
};

/* ---------------------------------- 3. CollabFlow AI Canvas Demo ---------------------------------- */

const CollabFlowCanvasDemo = () => {
  const [prompt, setPrompt] = useState('Create an event-driven Fintech microservice architecture');
  const [generating, setGenerating] = useState(false);
  const [activeNodes, setActiveNodes] = useState([
    { id: 1, title: 'API Gateway (FastAPI)', type: 'Gateway', color: 'border-cyan-500 text-cyan-400' },
    { id: 2, title: 'Payment Consumer (Kafka)', type: 'Queue', color: 'border-purple-500 text-purple-400' },
    { id: 3, title: 'PostgreSQL Database', type: 'Storage', color: 'border-emerald-500 text-emerald-400' },
  ]);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setActiveNodes([
        { id: 1, title: 'Client Web & Mobile', type: 'Frontend', color: 'border-blue-400 text-blue-300' },
        { id: 2, title: 'Envoy Edge Proxy', type: 'Gateway', color: 'border-cyan-400 text-cyan-300' },
        { id: 3, title: 'Auth & Ledger Service', type: 'Core API', color: 'border-purple-400 text-purple-300' },
        { id: 4, title: 'Redis Cache & PubSub', type: 'In-Memory', color: 'border-red-400 text-red-300' },
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-4 text-xs md:text-sm">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-purple-500"
          placeholder="Describe your system architecture..."
        />
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="px-3.5 py-2 rounded-lg bg-purple-600 text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/30 shrink-0"
        >
          {generating ? <Activity className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          AI Draw Diagram
        </button>
      </div>

      {/* Canvas simulator */}
      <div className="relative h-44 rounded-xl bg-[#0e0e14] border border-white/10 p-4 overflow-hidden flex items-center justify-around">
        {/* Grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:16px_16px]" />

        {/* Live cursors */}
        <div className="absolute top-4 left-6 flex items-center gap-1 text-[10px] text-cyan-400 animate-pulse">
          <MousePointer className="w-3 h-3 fill-current" />
          <span>Jasper (Lead)</span>
        </div>
        <div className="absolute bottom-4 right-10 flex items-center gap-1 text-[10px] text-purple-400 animate-bounce">
          <MousePointer className="w-3 h-3 fill-current" />
          <span>Peer Architect</span>
        </div>

        {/* Dynamic Nodes */}
        {activeNodes.map((node) => (
          <motion.div
            key={node.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`relative z-10 px-3 py-2 rounded-lg bg-black/80 border ${node.color} shadow-lg text-center`}
          >
            <span className="text-[9px] uppercase tracking-wider block opacity-60">{node.type}</span>
            <span className="font-bold text-xs">{node.title}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-white/40">
        <span>⚡ WebSocket Sync: &lt; 45ms</span>
        <span>🧠 Gemini 1.5 Architecture Model</span>
        <span>🌐 100% Client-Side Canvas Rendering</span>
      </div>
    </div>
  );
};

/* ---------------------------------- 4. Voice2Deal AI Demo ---------------------------------- */

const Voice2DealDemo = () => {
  const [playing, setPlaying] = useState(false);
  const [phrase, setPhrase] = useState('Anvar akaga 2 ta Coca Cola va 1 ta non nasiyaga yozib qo\'y');
  const [parsed, setParsed] = useState<{
    customer: string;
    items: Array<{ name: string; qty: number; price: number }>;
    type: string;
    total: number;
  }>({
    customer: 'Anvar aka',
    items: [
      { name: 'Coca Cola 1.5L', qty: 2, price: 14000 },
      { name: 'Tandir non', qty: 1, price: 5000 },
    ],
    type: 'NASIYA (Qarz)',
    total: 33000,
  });

  const simulateVoice = (text: string, customData: typeof parsed) => {
    setPhrase(text);
    setPlaying(true);
    setTimeout(() => {
      setPlaying(false);
      setParsed(customData);
    }, 800);
  };

  return (
    <div className="space-y-4 text-xs md:text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() =>
              simulateVoice('Anvar akaga 2 ta Coca Cola va 1 ta non nasiyaga yozib qo\'y', {
                customer: 'Anvar aka',
                items: [
                  { name: 'Coca Cola 1.5L', qty: 2, price: 14000 },
                  { name: 'Tandir non', qty: 1, price: 5000 },
                ],
                type: 'NASIYA (Qarz)',
                total: 33000,
              })
            }
            className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-white/70 text-xs border border-white/10"
          >
            🎙️ Ovoz: Nasiya savdo
          </button>
          <button
            onClick={() =>
              simulateVoice('Naqdga 3 quti ChocoPie va 2 ta Snickers sotildi', {
                customer: 'Kassadagi xaridor',
                items: [
                  { name: 'ChocoPie (Quti)', qty: 3, price: 22000 },
                  { name: 'Snickers', qty: 2, price: 9000 },
                ],
                type: 'NAQD (To\'landi)',
                total: 84000,
              })
            }
            className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-white/70 text-xs border border-white/10"
          >
            🎙️ Ovoz: Naqd kassa
          </button>
        </div>

        <a
          href="https://t.me/Ovozli_SavdoBOT"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Send className="w-3.5 h-3.5" />
          Open @Ovozli_SavdoBOT
        </a>
      </div>

      {/* Voice Bar */}
      <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <Mic className={`w-4 h-4 ${playing ? 'animate-pulse' : ''}`} />
        </div>
        <div className="flex-1 font-mono text-xs text-white/80 italic truncate">
          "{phrase}"
        </div>
        <span className="text-[10px] text-emerald-400 font-semibold uppercase">
          {playing ? 'Tahlil qilinmoqda...' : 'Tugallandi'}
        </span>
      </div>

      {/* Structured Ledger Card */}
      <div className="rounded-xl bg-[#141d18] border border-emerald-500/30 p-4 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
          <span className="text-emerald-400 font-bold">Mijoz: {parsed.customer}</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
            {parsed.type}
          </span>
        </div>

        <div className="space-y-1 text-white/70">
          {parsed.items.map((item, idx) => (
            <div key={idx} className="flex justify-between">
              <span>• {item.name} × {item.qty}</span>
              <span>{(item.qty * item.price).toLocaleString()} UZS</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-2 border-t border-emerald-500/20 font-bold text-white">
          <span>Jami Summa:</span>
          <span className="text-emerald-400 text-sm">{parsed.total.toLocaleString()} UZS</span>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------- Modal ---------------------------------- */

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onBookCall: () => void;
  language: Language;
}

const demoComponents: Record<Project['id'], {
  title: string;
  disclaimer: string;
  render: (language: Language) => React.ReactNode;
}> = {
  'uzpayment-sdk': {
    title: 'Interactive Multi-Provider Gateway Simulator',
    disclaimer: 'Live HMAC signature and provider response engine',
    render: () => <UzPaymentDemo />,
  },
  'ai-code-reviewer': {
    title: 'Gemini 1.5 Flash Code Audit & OWASP Scanner',
    disclaimer: 'Real-time diff analysis and vulnerability diagnostics',
    render: () => <AICodeReviewerDemo />,
  },
  'collabflow-canvas': {
    title: 'Live WebSocket Collaborative Architecture Simulator',
    disclaimer: 'Sub-50ms sync simulation & AI diagram generator',
    render: () => <CollabFlowCanvasDemo />,
  },
  'voice2deal-ai': {
    title: 'Voice NLP POS & Retail Debt Ledger Simulator',
    disclaimer: 'Live Uzbek audio parsing & transaction ledger simulation',
    render: () => <Voice2DealDemo />,
  },
};

export const ProjectModal = ({
  project,
  onClose,
  onBookCall,
  language,
}: ProjectModalProps) => {
  // Lock body scroll + escape key
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[calc(100vw-2rem)] lg:max-w-4xl max-h-[calc(100dvh-2rem)] overflow-x-hidden overflow-y-auto overscroll-contain rounded-3xl bg-[#121216] border border-white/10 shadow-2xl"
            style={{ boxShadow: `0 0 120px ${project.color}25` }}
          >
            {/* Header */}
            <div
              className="sticky top-0 z-10 px-6 md:px-8 py-5 border-b border-white/10 backdrop-blur-xl bg-[#121216]/90 flex items-start justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${project.color}20` }}
                >
                  <project.icon className="w-6 h-6" style={{ color: project.color }} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest" style={{ color: project.color }}>
                    {project.category}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-white">{project.title}</h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Live Demo */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                        style={{ backgroundColor: project.color }}
                      />
                      <span
                        className="relative inline-flex rounded-full h-2.5 w-2.5"
                        style={{ backgroundColor: project.color }}
                      />
                    </span>
                    <h4 className="font-semibold text-white">
                      {demoComponents[project.id].title}
                    </h4>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-white/30">
                    {demoComponents[project.id].disclaimer}
                  </span>
                </div>
                <div
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-5"
                  style={{ boxShadow: `inset 0 0 60px ${project.color}08` }}
                >
                  {demoComponents[project.id].render(language)}
                </div>
              </div>

              {/* Overview + features */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Overview</h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {project.longDescription}
                  </p>

                  <div className="grid grid-cols-3 gap-3 mt-5">
                    {project.stats.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl bg-white/[0.03] border border-white/10 p-3 text-center"
                      >
                        <p className="text-lg font-bold" style={{ color: project.color }}>
                          {s.value}
                        </p>
                        <p className="text-[10px] text-white/40 mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Key Features</h4>
                  <ul className="space-y-2.5">
                    {project.features.map((f, i) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        className="flex items-start gap-2.5 text-sm text-white/60"
                      >
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: project.color }}
                        />
                        {f}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{ backgroundColor: `${project.color}15`, color: project.color }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Conversion actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onBookCall();
                  }}
                  className="flex-1 py-4 rounded-xl btn-primary text-black font-semibold flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Discuss This Project
                </button>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-4 rounded-xl bg-white/[0.05] border border-white/10 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                  Live Demo / Telegram
                </a>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 px-6 rounded-xl bg-white/[0.05] border border-white/10 text-white/70 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  GitHub Repo
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
