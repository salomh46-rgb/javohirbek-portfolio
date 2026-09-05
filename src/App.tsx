import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Code2, 
  Brain, 
  Sparkles, 
  ArrowRight, 
  Mail,
  Phone,
  MapPin,
  Send,
  Briefcase,
  GraduationCap,
  ChevronRight,
  Terminal,
  Database,
  Layers,
  Zap,
  CheckCircle2,
  MessageCircle,
  Globe,
  Palette,
  Server,
  Cloud,
  Bot,
  Calendar,
  Atom,
  FileCode2,
  Braces,
  Hexagon,
  Package,
  Play,
  Volume2,
  VolumeX,
  Menu,
  X
} from 'lucide-react';
import { projects, type Project } from './data/projects';
import { ProjectModal } from './components/ProjectModal';
import { AIChatWidget } from './components/AIChatWidget';
import { WorkProcessSection } from './components/WorkProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BookingModal } from './components/BookingModal';
import { UISoundEngine } from './components/UISoundEngine';
import { AutoTranslator, type Language } from './localization';
import { sendLead } from './utils/leadCapture';

// Particle Background Component
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
  }>>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particleCount = window.innerWidth <= 768 ? 40 : 80;

    const seedParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? '#D4AF37' : '#00F0FF'
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const nextParticleCount = window.innerWidth <= 768 ? 40 : 80;
      if (nextParticleCount !== particleCount) {
        particleCount = nextParticleCount;
        seedParticles();
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    seedParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      // Render every 2nd frame for performance (30fps)
      if (frameCount % 2 === 0) {
        ctx.fillStyle = 'rgba(13, 13, 15, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particlesRef.current.forEach((particle, i) => {
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;

          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();

          // Draw connections (only check every 5th particle for performance)
          if (i % 5 === 0) {
            particlesRef.current.slice(i + 1).forEach((other, j) => {
              if (j % 3 !== 0) return;
              const dx = particle.x - other.x;
              const dy = particle.y - other.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - distance / 100)})`;
                ctx.stroke();
              }
            });
          }

          // Mouse interaction
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.2 * (1 - distance / 150)})`;
            ctx.stroke();
          }
        });
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

// Navigation Component
const Navigation = ({
  onBookCall,
  soundEnabled,
  onToggleSound,
  language,
  onLanguageChange,
}: {
  onBookCall: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: 'Quest Map', href: '#timeline' },
    { name: 'Skills', href: '#skills' },
    { name: 'Process', href: '#process' },
    { name: 'Projects', href: '#projects' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 backdrop-blur-md ${
        scrolled
          ? 'py-3 bg-[#0D0D0F]/80 border-b border-white/10 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.8)]'
          : 'py-5 bg-[#0D0D0F]/40 border-b border-white/[0.04]'
      }`}
    >
      {/* Gold hairline accent that fades in on scroll */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), rgba(0,240,255,0.35), transparent)',
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          <motion.a
            href="#"
            className="text-xl font-bold text-gradient-gold"
            whileHover={{ scale: 1.05 }}
          >
            AJ
          </motion.a>

          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-white/60 hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#00F0FF] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div
              data-no-translate="true"
              className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10"
              aria-label="Language selector"
            >
              {(['EN', 'UZ', 'RU'] as Language[]).map((item) => (
                <button
                  key={item}
                  onClick={() => onLanguageChange(item)}
                  className={`h-8 min-w-8 px-1.5 rounded-full text-[10px] font-bold tracking-wide transition-all ${
                    language === item
                      ? 'bg-[#D4AF37] text-black shadow-[0_0_14px_rgba(212,175,55,0.25)]'
                      : 'text-white/40 hover:text-white'
                  }`}
                  aria-pressed={language === item}
                >
                  {item}
                </button>
              ))}
            </div>

            <motion.button
              data-sound-toggle="true"
              onClick={onToggleSound}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/55 hover:text-[#00F0FF] hover:border-[#00F0FF]/30 transition-colors"
              aria-label={soundEnabled ? 'Mute interface sounds' : 'Enable interface sounds'}
              title={soundEnabled ? 'Mute interface sounds' : 'Enable interface sounds'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </motion.button>

            <motion.button
              onClick={onBookCall}
              className="px-5 py-2.5 rounded-full btn-primary text-sm font-semibold text-black flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Book a Call</span>
              <span className="sm:hidden">Book</span>
            </motion.button>

            <motion.button
              data-sound="click"
              onClick={() => setMobileMenuOpen((open) => !open)}
              whileTap={{ scale: 0.92 }}
              className="lg:hidden w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-[#00F0FF]/30 transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="lg:hidden fixed inset-x-3 top-[76px] bottom-3 z-[61] rounded-3xl border border-white/10 bg-[#101014]/95 backdrop-blur-2xl shadow-2xl overflow-y-auto"
          >
            <div className="p-5">
              <p className="px-2 text-[10px] uppercase tracking-[0.24em] text-white/30 mb-3">
                Navigation
              </p>
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.045 }}
                    className="flex min-h-12 items-center justify-between px-3 rounded-xl text-lg text-white/75 hover:text-white hover:bg-white/[0.05] transition-colors"
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="w-4 h-4 text-white/25" />
                  </motion.a>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookCall();
                  }}
                  className="w-full min-h-12 rounded-xl btn-primary text-black font-semibold flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book a 15-min Discovery Call
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Hero Section
const HeroSection = ({ onBookCall }: { onBookCall: () => void }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Ambient sphere parallax — drifts slower than content for depth
  const sphereY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const sphereScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)',
          y,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* ---------- Ambient 3D Sphere behind the headline ---------- */}
      <motion.div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ y: sphereY, scale: sphereScale, opacity: sphereOpacity }}
      >
        <div className="relative w-[min(88vw,780px)] aspect-square -translate-y-[6%]">
          {/* Outer atmospheric bloom */}
          <div className="absolute inset-0 rounded-full sphere-glow" />

          {/* Rotating conic sheen */}
          <div className="absolute inset-[14%] rounded-full sphere-sheen" />

          {/* Wireframe mesh shell */}
          <div className="absolute inset-[16%] sphere-mesh" />

          {/* Core body */}
          <div className="absolute inset-[18%] rounded-full sphere-core" />

          {/* Specular highlight */}
          <div
            className="absolute left-[30%] top-[26%] w-[16%] h-[12%] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,252,235,0.5) 0%, transparent 70%)',
              filter: 'blur(10px)',
            }}
          />

          {/* Orbital rings */}
          <div className="absolute inset-[6%] sphere-orbit" />
          <div className="absolute inset-[1%] sphere-orbit sphere-orbit-cyan" />

          {/* Drifting light motes */}
          {[
            { top: '18%', left: '24%', size: 4, color: '#D4AF37', dur: 7 },
            { top: '70%', left: '18%', size: 3, color: '#00F0FF', dur: 9 },
            { top: '30%', left: '80%', size: 3, color: '#00F0FF', dur: 8 },
            { top: '78%', left: '72%', size: 4, color: '#D4AF37', dur: 11 },
            { top: '50%', left: '90%', size: 2, color: '#FFFFFF', dur: 6 },
          ].map((mote, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                top: mote.top,
                left: mote.left,
                width: mote.size,
                height: mote.size,
                backgroundColor: mote.color,
                boxShadow: `0 0 12px ${mote.color}`,
              }}
              animate={{ y: [0, -18, 0], opacity: [0.25, 0.9, 0.25] }}
              transition={{
                duration: mote.dur,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.8,
              }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ opacity }}
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-white/80">Open for product, AI, and SaaS work</span>
          <span className="text-white/20">·</span>
          <span className="text-sm text-white/50">Available for new projects</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          style={{ textShadow: '0 4px 40px rgba(13,13,15,0.85), 0 2px 12px rgba(13,13,15,0.6)' }}
        >
          <span className="block text-white">Asqarov</span>
          <span className="block text-gradient-gold">Javohirbek</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/60 mb-4"
        >
          Full-Stack Engineer • AI Automation Builder • Product Developer
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base md:text-lg text-white/40 max-w-2xl mx-auto mb-10"
        >
          I design and build fast, scalable web products, internal tools, and AI-powered experiences that help businesses automate operations and turn ideas into real customer value.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            className="group px-8 py-4 rounded-full btn-primary text-black font-semibold flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.button
            onClick={onBookCall}
            className="px-8 py-4 rounded-full glass text-white font-semibold hover:border-[#00F0FF]/40 hover:bg-[#00F0FF]/5 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="w-5 h-5 text-[#00F0FF]" />
            Book 15-min Discovery Call
          </motion.button>
        </motion.div>

        {/* Tech Stack Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {['React', 'Node.js', 'Python', 'AI/ML', 'TypeScript', 'PostgreSQL'].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="px-4 py-2 rounded-full glass text-sm text-white/60 hover:text-white hover:border-[#D4AF37]/50 transition-colors cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// Quest Map (Timeline) Section
const QuestMapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const experiences = [
    {
      period: '2024 - Present',
      title: 'Full-Stack & AI Engineer',
      company: 'Independent Consultant / Product Engineering',
      description: 'Building product-facing web applications, automation flows, and AI-enabled business tools that solve real operational bottlenecks for clients and startups.',
      skills: ['Product Engineering', 'AI Workflows', 'SaaS UX', 'System Design'],
      icon: Briefcase,
      type: 'work'
    },
    {
      period: '2022 - 2024',
      title: 'Frontend & Full-Stack Developer',
      company: 'Digital Product Studio',
      description: 'Delivered web platforms, dashboards, and internal tools using React, Node.js, and backend integrations for business and customer workflows.',
      skills: ['React', 'Node.js', 'APIs', 'Database Design'],
      icon: Code2,
      type: 'work'
    },
    {
      period: '2020 - 2024',
      title: 'Computer Science & Software Engineering',
      company: 'University Studies',
      description: 'Focused on software engineering, algorithms, data structures, and modern application architecture with practical product implementation.',
      skills: ['Algorithms', 'Data Structures', 'AI', 'Software Engineering'],
      icon: GraduationCap,
      type: 'education'
    },
  ];

  return (
    <section id="timeline" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-[#D4AF37] text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 inline mr-2" />
            Career Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Quest <span className="text-gradient-gold">Map</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            My professional adventure through the realms of code and innovation
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute left-1/2 top-0 bottom-0 w-0.5 timeline-line origin-top hidden md:block"
          />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="glass-card rounded-2xl p-6 md:p-8 spotlight-container group">
                    <div className="spotlight" />
                    
                    <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium">
                        {exp.period}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        exp.type === 'work' ? 'bg-[#00F0FF]/10 text-[#00F0FF]' : 'bg-purple-500/10 text-purple-400'
                      }`}>
                        {exp.type === 'work' ? 'Work' : 'Education'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                    <p className="text-[#D4AF37] font-medium mb-3">{exp.company}</p>
                    <p className="text-white/50 text-sm mb-4">{exp.description}</p>

                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 rounded-md bg-white/5 text-white/60 text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="w-14 h-14 rounded-full glass flex items-center justify-center glow-gold"
                  >
                    <exp.icon className="w-6 h-6 text-[#D4AF37]" />
                  </motion.div>
                </div>

                {/* Empty Space for Other Side */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Tech Stack Section
const TechStackSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const categories = [
    {
      name: 'Frontend',
      percentage: 95,
      icon: Layers,
      color: '#D4AF37',
      technologies: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux']
    },
    {
      name: 'Backend',
      percentage: 90,
      icon: Server,
      color: '#00F0FF',
      technologies: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis']
    },
    {
      name: 'AI & Tools',
      percentage: 92,
      icon: Brain,
      color: '#A855F7',
      technologies: ['TensorFlow', 'PyTorch', 'OpenAI API', 'LangChain', 'Docker', 'AWS']
    },
  ];

  const tools = [
    { name: 'React', icon: Atom, color: '#61DAFB' },
    { name: 'TypeScript', icon: FileCode2, color: '#3178C6' },
    { name: 'Python', icon: Braces, color: '#3776AB' },
    { name: 'Node.js', icon: Hexagon, color: '#3C873A' },
    { name: 'PostgreSQL', icon: Database, color: '#336791' },
    { name: 'Docker', icon: Package, color: '#0DB7ED' },
    { name: 'AWS', icon: Cloud, color: '#FF9900' },
    { name: 'TensorFlow', icon: Brain, color: '#FF6F00' },
  ];

  return (
    <section id="skills" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-[#00F0FF] text-sm font-medium mb-4">
            <Terminal className="w-4 h-4 inline mr-2" />
            Arsenal
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Tech <span className="text-gradient-cyan">Stack</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Technologies I wield to craft digital excellence
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 md:p-8 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <category.icon className="w-6 h-6" style={{ color: category.color }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{category.name}</h3>
                  <span className="text-2xl font-bold" style={{ color: category.color }}>
                    {category.percentage}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${category.percentage}%` } : {}}
                  transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: category.color }}
                />
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/5 text-white/60 text-xs hover:bg-white/10 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">Tools & Technologies</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-default group"
              >
                <tool.icon
                  className="w-7 h-7 group-hover:scale-110 transition-transform"
                  style={{ color: tool.color }}
                />
                <span className="text-xs text-white/60 text-center">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Project Showcase Section
const ProjectShowcaseSection = ({ onOpenProject }: { onOpenProject: (p: Project) => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-[#A855F7] text-sm font-medium mb-4">
            <Zap className="w-4 h-4 inline mr-2" />
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Project <span className="text-gradient-gold">Showcase</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Click any project to launch its interactive live demo
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 }}
              className="group perspective"
            >
              <motion.div
                role="button"
                tabIndex={0}
                data-sound="open"
                whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass-card rounded-2xl overflow-hidden h-full tilt-card cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => onOpenProject(project)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onOpenProject(project);
                  }
                }}
              >
                {/* Project Visual */}
                <div 
                  className="h-44 flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: `${project.color}10` }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${project.color}25 0%, transparent 70%)`
                    }}
                  />
                  {/* Grid overlay inside visual */}
                  <div className="absolute inset-0 grid-pattern opacity-60" />
                  
                  <div
                    className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      backgroundColor: `${project.color}18`,
                      border: `1px solid ${project.color}40`,
                      boxShadow: `0 0 40px ${project.color}30`,
                    }}
                  >
                    <project.icon className="w-8 h-8" style={{ color: project.color }} />
                  </div>

                  {/* Live demo hint */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-3 h-3" style={{ color: project.color }} />
                    <span className="text-[10px] font-medium text-white/80">Live Demo</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md text-xs"
                        style={{ backgroundColor: `${project.color}15`, color: project.color }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <motion.button
                      data-sound="open"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProject(project);
                      }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-center flex items-center justify-center gap-2 transition-colors"
                      style={{ backgroundColor: project.color, color: '#000' }}
                    >
                      <Play className="w-4 h-4" />
                      Live Demo
                    </motion.button>
                    <motion.button
                      data-sound="open"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProject(project);
                      }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 text-sm font-medium text-center flex items-center justify-center gap-2 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                      Case Study
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Budget Calculator Section
const BudgetCalculatorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    { id: 'frontend', name: 'Frontend Development', price: 2500, icon: Palette },
    { id: 'backend', name: 'Backend Development', price: 3000, icon: Server },
    { id: 'ai', name: 'AI Integration', price: 4000, icon: Brain },
    { id: 'database', name: 'Database Design', price: 1500, icon: Database },
    { id: 'api', name: 'API Development', price: 2000, icon: Globe },
    { id: 'devops', name: 'DevOps & Deployment', price: 1800, icon: Cloud },
  ];

  // Pre-selected so visitors see a real estimate the moment they scroll in
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'frontend',
    'backend',
    'ai',
  ]);
  const [complexity, setComplexity] = useState<'simple' | 'medium' | 'complex'>('medium');

  const complexityMultipliers = {
    simple: 0.7,
    medium: 1,
    complex: 1.5
  };

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const basePrice = selectedServices.reduce((total, id) => {
      const service = services.find(s => s.id === id);
      return total + (service?.price || 0);
    }, 0);
    return Math.round(basePrice * complexityMultipliers[complexity]);
  };

  const calculateTimeline = () => {
    const baseWeeks = selectedServices.length * 2;
    const multiplier = complexity === 'simple' ? 0.7 : complexity === 'complex' ? 1.5 : 1;
    return Math.max(1, Math.round(baseWeeks * multiplier));
  };

  return (
    <section id="calculator" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-[#00F0FF] text-sm font-medium mb-4">
            <Bot className="w-4 h-4 inline mr-2" />
            Project Estimator
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Budget <span className="text-gradient-cyan">Calculator</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Get an instant estimate for your project scope
          </p>
        </motion.div>

        <div className="grid min-w-0 lg:grid-cols-2 gap-8">
          {/* Services Selection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="min-w-0 glass rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">Select Services</h3>
            <div className="space-y-3">
              {services.map((service, index) => (
                <motion.button
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => toggleService(service.id)}
                  className={`w-full p-4 rounded-xl flex items-center justify-between transition-all ${
                    selectedServices.includes(service.id)
                      ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/50'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <service.icon className={`w-5 h-5 ${
                      selectedServices.includes(service.id) ? 'text-[#D4AF37]' : 'text-white/50'
                    }`} />
                    <span className={selectedServices.includes(service.id) ? 'text-white' : 'text-white/70'}>
                      {service.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/50 text-sm">${service.price.toLocaleString()}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedServices.includes(service.id)
                        ? 'border-[#D4AF37] bg-[#D4AF37]'
                        : 'border-white/30'
                    }`}>
                      {selectedServices.includes(service.id) && (
                        <CheckCircle2 className="w-3 h-3 text-black" />
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Complexity Selection */}
            <div className="mt-8">
              <h4 className="text-sm font-medium text-white/60 mb-3">Project Complexity</h4>
              <div className="flex gap-2">
                {(['simple', 'medium', 'complex'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setComplexity(level)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                      complexity === level
                        ? 'bg-[#00F0FF] text-black'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Estimate Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="min-w-0 glass rounded-2xl p-6 md:p-8 flex flex-col"
          >
            <h3 className="text-xl font-bold text-white mb-6">Project Estimate</h3>

            <div className="flex-1 space-y-6">
              {/* Estimated Budget */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20">
                <p className="text-white/60 text-sm mb-1">Estimated Budget</p>
                <motion.p
                  key={calculateTotal()}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl md:text-5xl font-bold text-gradient-gold"
                >
                  ${calculateTotal().toLocaleString()}
                </motion.p>
              </div>

              {/* Estimated Timeline */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-[#00F0FF]/10 to-transparent border border-[#00F0FF]/20">
                <p className="text-white/60 text-sm mb-1">Estimated Timeline</p>
                <motion.p
                  key={calculateTimeline()}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl md:text-5xl font-bold text-gradient-cyan"
                >
                  {calculateTimeline()} weeks
                </motion.p>
              </div>

              {/* Selected Summary */}
              {selectedServices.length > 0 && (
                <div className="p-4 rounded-xl bg-white/5">
                  <p className="text-white/60 text-sm mb-2">Selected Services:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedServices.map((id) => {
                      const service = services.find(s => s.id === id);
                      return (
                        <span key={id} className="px-2 py-1 rounded-md bg-[#D4AF37]/20 text-[#D4AF37] text-xs">
                          {service?.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full py-4 rounded-xl btn-primary text-black font-semibold text-center flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Get Detailed Quote
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = ({ onBookCall }: { onBookCall: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendLead({
        name: formState.name,
        email: formState.email,
        message: formState.message,
        source: 'contact',
      });
      setSubmitted(true);
    } catch {
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitted(false), 3000);
      setFormState({ name: '', email: '', message: '' });
    }
  };

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+998 90 508-33-02', href: 'tel:+998905083302' },
    { icon: MessageCircle, label: 'Telegram', value: '@Dr_eviluz', href: 'https://t.me/Dr_eviluz' },
    { icon: Mail, label: 'Email', value: 'salomh46@gmail.com', href: 'mailto:salomh46@gmail.com' },
    { icon: MapPin, label: 'Location', value: 'Tashkent, Uzbekistan', href: '#' },
  ];

  return (
    <section id="contact" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-[#D4AF37] text-sm font-medium mb-4">
            <MessageCircle className="w-4 h-4 inline mr-2" />
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Contact <span className="text-gradient-gold">Hub</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Let's discuss your next project and bring your vision to life
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Your Name</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Message</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl btn-primary text-black font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                  />
                ) : submitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Fast booking banner */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 }}
              onClick={onBookCall}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-xl p-5 text-left transition-all relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(0,240,255,0.08))',
                border: '1px solid rgba(212,175,55,0.35)',
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">Prefer to talk it through?</p>
                  <p className="text-white/50 text-sm">Book a free 15-minute discovery call</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>

            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="glass-card rounded-xl p-5 flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                  <info.icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">{info.label}</p>
                  <p className="text-white font-medium group-hover:text-[#D4AF37] transition-colors">
                    {info.value}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/30 ml-auto group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
              </motion.a>
            ))}

            {/* Response time hint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="glass rounded-xl p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div>
                <p className="text-white/50 text-sm">Typical response time</p>
                <p className="text-white font-medium">Under 3 hours · GMT+5 timezone</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="relative py-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gradient-gold">AJ</span>
            <span className="text-white/40">|</span>
            <span className="text-white/40 text-sm">Full-Stack & AI Engineer</span>
          </div>
          
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Asqarov Javohirbek. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {['GitHub', 'LinkedIn', 'Telegram'].map((social) => (
              <a
                key={social}
                href={social === 'Telegram' ? 'https://t.me/Dr_eviluz' : '#'}
                target={social === 'Telegram' ? '_blank' : undefined}
                rel={social === 'Telegram' ? 'noreferrer' : undefined}
                className="text-white/40 hover:text-[#D4AF37] text-sm transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('aj-ui-sound');
    return saved === null ? true : saved === 'on';
  });
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('aj-language');
    return saved === 'UZ' || saved === 'RU' ? saved : 'EN';
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const openBooking = () => setBookingOpen(true);

  const toggleSound = () => {
    setSoundEnabled((current) => {
      const next = !current;
      localStorage.setItem('aj-ui-sound', next ? 'on' : 'off');
      return next;
    });
  };

  const changeLanguage = (next: Language) => {
    setLanguage(next);
    localStorage.setItem('aj-language', next);
    document.documentElement.lang = next.toLowerCase();
  };

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
    document.title =
      language === 'UZ'
        ? 'Asqarov Javohirbek | Full-Stack va AI muhandis'
        : language === 'RU'
        ? 'Аскаров Джавохирбек | Full-Stack и AI-инженер'
        : 'Asqarov Javohirbek | Full-Stack & AI Engineer';
  }, [language]);

  return (
    <div className="relative min-h-screen bg-[#0D0D0F] overflow-x-hidden">
      <UISoundEngine enabled={soundEnabled} />
      <AutoTranslator language={language} />
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Particle Background */}
      <ParticleBackground />

      {/* Mouse Spotlight */}
      <div
        className="fixed pointer-events-none z-40 w-96 h-96 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transition: 'left 0.1s ease-out, top 0.1s ease-out',
        }}
      />

      {/* Navigation */}
      <Navigation
        onBookCall={openBooking}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        language={language}
        onLanguageChange={changeLanguage}
      />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection onBookCall={openBooking} />
        <QuestMapSection />
        <TechStackSection />
        <WorkProcessSection />
        <ProjectShowcaseSection onOpenProject={setActiveProject} />
        <TestimonialsSection />
        <BudgetCalculatorSection />
        <ContactSection onBookCall={openBooking} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating booking pill (above chat) */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        onClick={openBooking}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 z-[60] group"
        aria-label="Book a discovery call"
      >
        <span className="absolute inset-0 rounded-full bg-[#D4AF37] opacity-40 blur-lg group-hover:opacity-70 transition-opacity" />
        <span className="relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#D4AF37] text-black text-xs font-bold">
          <Calendar className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Book a Call</span>
        </span>
      </motion.button>

      {/* Overlays */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onBookCall={openBooking}
        language={language}
      />
      <AIChatWidget onBookCall={openBooking} language={language} />
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        language={language}
      />
    </div>
  );
}

export default App;