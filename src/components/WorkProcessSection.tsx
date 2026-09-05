import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Search,
  Layers,
  BrainCircuit,
  Rocket,
  CheckCircle2,
  Compass,
  Clock3,
  FileCheck2,
} from 'lucide-react';

interface ProcessStep {
  id: number;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  icon: typeof Search;
  color: string;
  deliverables: string[];
}

const steps: ProcessStep[] = [
  {
    id: 1,
    title: 'Discovery',
    tagline: 'Understand before building',
    description:
      'A deep-dive into your business goals, users, and technical constraints. We define what success looks like — before a single line of code exists.',
    duration: 'Week 1',
    icon: Search,
    color: '#D4AF37',
    deliverables: ['Product brief & KPIs', 'Scope & timeline agreement', 'Risk radar & priorities'],
  },
  {
    id: 2,
    title: 'Architecture',
    tagline: 'Blueprint before bricks',
    description:
      'System design translated into concrete deliverables: data models, API contracts, and infrastructure diagrams that scale from day one.',
    duration: 'Week 1–2',
    icon: Layers,
    color: '#00F0FF',
    deliverables: ['ERD & data models', 'API contract (OpenAPI)', 'Infrastructure diagram'],
  },
  {
    id: 3,
    title: 'AI & Code',
    tagline: 'Build in fast, visible loops',
    description:
      'Iterative sprints with weekly demos. AI features wired into clean, tested code — you watch the product grow, not just the invoice.',
    duration: 'Weeks 2–8',
    icon: BrainCircuit,
    color: '#A855F7',
    deliverables: ['Weekly staging demos', '90%+ test coverage', 'CI/CD pipeline from day one'],
  },
  {
    id: 4,
    title: 'Launch & Scale',
    tagline: 'Ship confidently, grow calmly',
    description:
      'Zero-downtime deployment, observability dashboards, and a scaling plan. I stay involved post-launch to iterate on real user data.',
    duration: 'Week 8+',
    icon: Rocket,
    color: '#22C55E',
    deliverables: ['99.9% uptime SLO', 'Monitoring & alerts live', 'Post-launch growth sprints'],
  },
];

export const WorkProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [active, setActive] = useState(0);

  return (
    <section id="process" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-emerald-400 text-sm font-medium mb-4">
            <Compass className="w-4 h-4 inline mr-2" />
            How I Deliver
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Work <span className="text-gradient-gold">Process</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            A battle-tested 4-step system that ships products on time — every time
          </p>
        </motion.div>

        {/* Step rail */}
        <div className="relative mb-10">
          {/* Connector line */}
          <div className="absolute top-[26px] left-[12.5%] right-[12.5%] h-0.5 bg-white/10 hidden md:block">
            <motion.div
              className="h-full bg-gradient-to-r from-[#D4AF37] via-[#00F0FF] to-[#22C55E]"
              initial={{ width: '0%' }}
              animate={{ width: `${(active / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step, index) => {
              const isActive = active === index;
              const isPast = index < active;
              return (
                <motion.button
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.12 }}
                  onClick={() => setActive(index)}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Ghost number */}
                  <span
                    className={`absolute -top-6 text-4xl md:text-5xl font-black select-none transition-colors ${
                      isActive ? 'text-white/[0.08]' : 'text-white/[0.03]'
                    }`}
                  >
                    0{step.id}
                  </span>

                  {/* Node */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-[52px] h-[52px] rounded-2xl flex items-center justify-center border transition-all z-10 ${
                      isActive
                        ? 'border-transparent'
                        : 'bg-[#121216] border-white/15 group-hover:border-white/30'
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundColor: `${step.color}20`,
                            borderColor: step.color,
                            boxShadow: `0 0 24px ${step.color}45`,
                          }
                        : isPast
                        ? { borderColor: `${step.color}50` }
                        : undefined
                    }
                  >
                    <step.icon
                      className="w-5 h-5 transition-colors"
                      style={{ color: isActive || isPast ? step.color : 'rgba(255,255,255,0.4)' }}
                    />
                  </motion.div>

                  <p
                    className={`mt-3 text-sm font-semibold transition-colors ${
                      isActive ? 'text-white' : 'text-white/50 group-hover:text-white/75'
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-[10px] text-white/30 mt-0.5 hidden md:block">
                    {step.duration}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Active step detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="glass-card rounded-3xl p-6 md:p-10 spotlight-container"
          >
            <div className="spotlight" />
            {(() => {
              const step = steps[active];
              return (
                <div className="grid md:grid-cols-[1fr,1.4fr] gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${step.color}18` }}
                      >
                        <step.icon className="w-6 h-6" style={{ color: step.color }} />
                      </div>
                      <div>
                        <p
                          className="text-xs uppercase tracking-widest"
                          style={{ color: step.color }}
                        >
                          Phase 0{step.id}
                        </p>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-white/40 italic mb-3">" {step.tagline} "</p>
                    <p className="text-white/60 leading-relaxed mb-5">{step.description}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10">
                      <Clock3 className="w-4 h-4" style={{ color: step.color }} />
                      <span className="text-sm text-white/70">{step.duration}</span>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-5">
                      <FileCheck2 className="w-5 h-5" style={{ color: step.color }} />
                      <h4 className="font-semibold text-white">What you receive</h4>
                    </div>
                    <ul className="space-y-4">
                      {step.deliverables.map((d, i) => (
                        <motion.li
                          key={d}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + i * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2
                            className="w-5 h-5 shrink-0 mt-0.5"
                            style={{ color: step.color }}
                          />
                          <span className="text-white/70">{d}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Step navigation */}
                    <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/10">
                      <button
                        onClick={() => setActive((a) => Math.max(0, a - 1))}
                        disabled={active === 0}
                        className="text-sm text-white/40 hover:text-white transition-colors disabled:opacity-30"
                      >
                        ← Previous phase
                      </button>
                      <div className="flex gap-1.5">
                        {steps.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActive(i)}
                            data-active={i === active}
                            className={`touch-dot h-1.5 rounded-full transition-all ${
                              i === active ? 'w-6' : 'w-1.5 bg-white/20'
                            }`}
                            style={i === active ? { backgroundColor: step.color } : undefined}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
                        disabled={active === steps.length - 1}
                        className="text-sm text-white/40 hover:text-white transition-colors disabled:opacity-30"
                      >
                        Next phase →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
