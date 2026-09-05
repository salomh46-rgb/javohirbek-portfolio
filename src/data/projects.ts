import type { LucideIcon } from 'lucide-react';
import { CreditCard, Bot, Layout, Mic } from 'lucide-react';

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  id: 'uzpayment-sdk' | 'ai-code-reviewer' | 'collabflow-canvas' | 'voice2deal-ai';
  title: string;
  category: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  tags: string[];
  color: string;
  features: string[];
  stats: ProjectStat[];
  repo: string;
  demo: string;
}

export const projects: Project[] = [
  {
    id: 'uzpayment-sdk',
    title: 'UzPayment Multi-Provider SDK',
    category: 'Fintech & Payment Infrastructure',
    description:
      'Universal, zero-dependency Node.js/TypeScript SDK integrating Click, Payme, Uzum Bank, and Paynet with strict HMAC security.',
    longDescription:
      'UzPayment SDK is an enterprise-grade payment aggregation library built for Uzbekistan fintech ecosystems. It standardizes disparate provider protocols (JSON-RPC, REST, Form-POST) into a single strongly-typed interface with automated signature generation, webhook verification, and state machine transaction handling.',
    icon: CreditCard,
    tags: ['TypeScript', 'Node.js', 'Fintech', 'HMAC-SHA256', 'Jest', 'OpenSource'],
    color: '#00F0FF',
    features: [
      'Single API for Click, Payme, Uzum Bank & Paynet',
      'Zero external runtime dependencies (native crypto)',
      '100% Unit Test coverage with Jest',
      'Automated signature generation and webhook verification',
      'Idempotency & state machine transaction recovery',
      'Strict TypeScript type definitions & ready-to-use Express middleware',
    ],
    stats: [
      { label: 'Test Coverage', value: '100%' },
      { label: 'Providers', value: '4 Gates' },
      { label: 'Latency Overhead', value: '< 1ms' },
    ],
    repo: 'https://github.com/salomh46-rgb/uzpayment-sdk',
    demo: 'https://github.com/salomh46-rgb/uzpayment-sdk#readme',
  },
  {
    id: 'ai-code-reviewer',
    title: 'AI Code Reviewer & Security Auditor',
    category: 'AI Agents & DevOps CI/CD',
    description:
      'Google Gemini 1.5 Flash powered GitHub Action that automatically reviews Pull Requests, identifies OWASP vulnerabilities, and estimates latency.',
    longDescription:
      'An autonomous AI Code Reviewer action integrated into GitHub CI/CD pipelines. It parses git diffs, analyzes code against OWASP Top 10 vulnerabilities (SQLi, XSS, Secret Leaks, Insecure Deserialization), and posts formatted markdown feedback with line-by-line fix suggestions and complexity assessments.',
    icon: Bot,
    tags: ['Google Gemini AI', 'GitHub Action', 'TypeScript', 'OWASP Security', 'DevOps', 'CI/CD'],
    color: '#D4AF37',
    features: [
      'Automated Pull Request inline commentary & summary',
      'OWASP Top 10 & CWE security vulnerability scanning',
      'Algorithmic time/space complexity analysis (Big-O)',
      'Secret and token leakage detection before merge',
      'GitHub Action runner with intelligent token budgeting',
      'Zero-leakage secret handling adhering to GitHub security standards',
    ],
    stats: [
      { label: 'Review Speed', value: '< 4.5s' },
      { label: 'OWASP Scans', value: '100%' },
      { label: 'Dev Time Saved', value: '80%' },
    ],
    repo: 'https://github.com/salomh46-rgb/ai-code-reviewer-action',
    demo: 'https://github.com/salomh46-rgb/ai-code-reviewer-action#readme',
  },
  {
    id: 'collabflow-canvas',
    title: 'CollabFlow AI Canvas',
    category: 'Real-Time WebSockets & Generative UI',
    description:
      'Multiplayer collaborative infinite canvas with live cursor syncing and Google Gemini AI text-to-system architecture generator.',
    longDescription:
      'CollabFlow AI is a real-time collaborative workspace engineered with Next.js 14, WebSockets, HTML5 Canvas, and Gemini AI. Distributed engineering teams can brainstorm, draw diagrams, track peer cursors in sub-50ms latency, and generate complete microservice architectures from simple natural language prompts.',
    icon: Layout,
    tags: ['Next.js 14', 'React', 'WebSockets', 'HTML5 Canvas', 'Tailwind CSS', 'Gemini AI'],
    color: '#A855F7',
    features: [
      'Sub-50ms multiplayer cursor and object synchronization',
      'Natural Language to Architecture Diagrammer powered by Gemini AI',
      'Infinite zoom, pan, freehand drawing and smart geometric shapes',
      'Room-based WebSocket architecture with heartbeat reconnection',
      'Export to SVG, High-Res PNG, and JSON schema',
      'Optimistic UI state management with conflict resolution',
    ],
    stats: [
      { label: 'Sync Latency', value: '< 50ms' },
      { label: 'AI Gen Time', value: '< 2.5s' },
      { label: 'Concurrent Users', value: '1,000+' },
    ],
    repo: 'https://github.com/salomh46-rgb/collabflow-ai-canvas',
    demo: 'https://github.com/salomh46-rgb/collabflow-ai-canvas#readme',
  },
  {
    id: 'voice2deal-ai',
    title: 'Voice2Deal AI SaaS Bot',
    category: 'Voice NLP & Retail ERP Automation',
    description:
      'Voice-driven AI Retail POS, Real-Time Inventory, and Debt Ledger Telegram SaaS serving merchants across Uzbekistan.',
    longDescription:
      'Voice2Deal AI transforms chaotic store operations into hands-free automation. Retail store owners speak or record voice messages in Uzbek/Russian to record sales, manage customer debt ledgers ("Nasiya"), track stock, and generate daily PDF/Excel reports instantly.',
    icon: Mic,
    tags: ['Python', 'FastAPI', 'Telegram Bot API', 'Speech-to-Text', 'PostgreSQL', 'Redis'],
    color: '#10B981',
    features: [
      'Voice-to-Transaction parsing for fast-paced retail stores',
      'Nasiya (Customer Debt Ledger) tracking with automated reminders',
      'Real-time barcode inventory & low-stock notifications',
      'Multi-lingual NLP engine (Uzbek Latin/Cyrillic, Russian)',
      'Automated daily accounting & PDF revenue generation',
      'Production deployment with 99.9% uptime SLA',
    ],
    stats: [
      { label: 'Voice Parsing', value: '< 1.8s' },
      { label: 'Accuracy', value: '98.5%' },
      { label: 'Transactions', value: '10K+/mo' },
    ],
    repo: 'https://github.com/salomh46-rgb/voice2deal-ai-bot',
    demo: 'https://t.me/Ovozli_SavdoBOT',
  },
];
