import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate, AnimatePresence } from 'framer-motion';
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Timer,
  FolderKanban,
  Users,
} from 'lucide-react';

/* ---------------------------------- Metrics ---------------------------------- */

interface Metric {
  icon: typeof Timer;
  value: number;
  prefix?: string;
  suffix: string;
  decimals?: number;
  label: string;
  color: string;
}

const metrics: Metric[] = [
  {
    icon: ShieldCheck,
    value: 99.9,
    suffix: '%',
    decimals: 1,
    label: 'Uptime SLA in production',
    color: '#22C55E',
  },
  {
    icon: Timer,
    value: 47,
    prefix: '<',
    suffix: 'ms',
    label: 'Average API response time',
    color: '#00F0FF',
  },
  {
    icon: FolderKanban,
    value: 30,
    suffix: '+',
    label: 'Projects delivered end-to-end',
    color: '#D4AF37',
  },
  {
    icon: Users,
    value: 100,
    suffix: '%',
    label: 'Client satisfaction rate',
    color: '#A855F7',
  },
];

const Counter = ({ metric }: { metric: Metric }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, metric.value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, metric.value]);

  const formatted = metric.decimals
    ? display.toFixed(metric.decimals)
    : Math.round(display).toString();

  return (
    <span ref={ref}>
      {metric.prefix}
      {formatted}
      {metric.suffix}
    </span>
  );
};

/* ---------------------------------- Testimonials ---------------------------------- */

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  color: string;
  project: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Javohir rebuilt our monolith into a microservices platform without a single minute of downtime. His AI integration work alone automated 60% of our support workflow. Rare mix of speed and rigor.',
    name: 'Davron Karimov',
    role: 'CTO',
    company: 'TechCorp Innovatsiya Markazi',
    initials: 'DK',
    color: '#D4AF37',
    project: 'Microservices & AI Integration',
  },
  {
    quote:
      'He delivered our ERP three weeks ahead of schedule — and it just works. The React architecture he set up is still the cleanest codebase our team has ever inherited.',
    name: 'Malika Rahimova',
    role: 'Product Owner',
    company: 'SoftSolutions IT',
    initials: 'MR',
    color: '#00F0FF',
    project: 'Enterprise ERP Platform',
  },
  {
    quote:
      'The Health AI platform exceeded every expectation. Symptom triage accuracy hit 94% in pilot, and physicians actually enjoy using it. Investors were impressed — that says everything.',
    name: 'Timur Yusupov',
    role: 'Founder & CEO',
    company: 'MedPort Health',
    initials: 'TY',
    color: '#A855F7',
    project: 'Health AI Medical System',
  },
  {
    quote:
      'Marketing output went from 3 posts a week to 30 — without hiring anyone new. The content engine Javohir built understands our brand voice better than most humans we interviewed.',
    name: 'Nodira Alimova',
    role: 'Head of Marketing',
    company: 'GrowthLab Agency',
    initials: 'NA',
    color: '#22C55E',
    project: 'AI Content Studio',
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => go(1), 6000);
    return () => clearInterval(timer);
  }, [paused]);

  const current = testimonials[index];

  return (
    <section id="reviews" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-[#22C55E] text-sm font-medium mb-4">
            <ShieldCheck className="w-4 h-4 inline mr-2" />
            Proven Results
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Client <span className="text-gradient-cyan">Outcomes</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Numbers first — then the people behind them
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center group relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 120%, ${metric.color}15 0%, transparent 70%)`,
                }}
              />
              <metric.icon
                className="w-6 h-6 mx-auto mb-3"
                style={{ color: metric.color }}
              />
              <p className="text-3xl md:text-4xl font-bold text-white mb-1.5 tabular-nums">
                <Counter metric={metric} />
              </p>
              <p className="text-xs text-white/40">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Giant quote mark */}
            <Quote
              className="absolute -top-4 -left-2 w-32 h-32 text-white/[0.03] rotate-180"
              strokeWidth={1}
            />

            <div className="min-h-[220px] md:min-h-[180px] flex items-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.figure
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: 60 * direction }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 * direction }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="relative z-10 w-full"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]"
                      />
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-3xl">
                    "{current.quote}"
                  </blockquote>

                  <figcaption className="flex flex-wrap items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{
                        background: `linear-gradient(135deg, ${current.color}40, ${current.color}15)`,
                        border: `1px solid ${current.color}50`,
                        color: current.color,
                      }}
                    >
                      {current.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{current.name}</p>
                      <p className="text-sm text-white/40">
                        {current.role} — {current.company}
                      </p>
                    </div>
                    <span
                      className="ml-auto hidden sm:inline-block px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{
                        backgroundColor: `${current.color}12`,
                        color: current.color,
                        border: `1px solid ${current.color}30`,
                      }}
                    >
                      {current.project}
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    data-active={i === index}
                    className={`touch-dot h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? 'w-8 bg-[#D4AF37]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => go(-1)}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4 text-white/70" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => go(1)}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4 text-white/70" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
