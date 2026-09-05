import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Clock3,
  Video,
  CheckCircle2,
  ChevronRight,
  Globe2,
  User,
  Mail,
  ExternalLink,
} from 'lucide-react';
import type { Language } from '../localization';
import { sendLead } from '../utils/leadCapture';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  language: Language;
}

const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

const locales: Record<Language, string> = {
  EN: 'en-US',
  UZ: 'uz-UZ',
  RU: 'ru-RU',
};

const confirmationCopy: Record<Language, { sent: string; timezone: string }> = {
  EN: {
    sent: 'A Google Meet invitation is on its way to',
    timezone: 'Tashkent time',
  },
  UZ: {
    sent: 'Google Meet taklifnomasi ushbu manzilga yuborilmoqda:',
    timezone: 'Toshkent vaqti',
  },
  RU: {
    sent: 'Приглашение Google Meet отправляется на адрес',
    timezone: 'Время Ташкента',
  },
};

export const BookingModal = ({ open, onClose, language }: BookingModalProps) => {
  const [step, setStep] = useState(0); // 0 date, 1 time, 2 details, 3 done
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingSubmitting, setBookingSubmitting] = useState(false);

  // Generate next 10 days (skip Sundays)
  const days = useMemo(() => {
    const list: Date[] = [];
    const d = new Date();
    while (list.length < 8) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0) list.push(new Date(d));
    }
    return list;
  }, [open]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(0);
        setDate(null);
        setTime(null);
        setName('');
        setEmail('');
      }, 300);
    }
  }, [open]);

  // Lock scroll + escape
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const formatDate = (d: Date) =>
    new Intl.DateTimeFormat(locales[language], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(d);

  const shortWeekday = (d: Date) =>
    new Intl.DateTimeFormat(locales[language], { weekday: 'short' }).format(d);

  const shortMonth = (d: Date) =>
    new Intl.DateTimeFormat(locales[language], { month: 'short' }).format(d);

  const canConfirm = name.trim().length > 1 && /.+@.+\..+/.test(email);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[calc(100vw-2rem)] lg:max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain rounded-3xl bg-[#121216] border border-white/10"
            style={{ boxShadow: '0 0 100px rgba(212,175,55,0.15)' }}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#00F0FF]/10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#00F0FF]/20 border border-white/10 flex items-center justify-center">
                    <Video className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg leading-tight">
                      15-min Discovery Call
                    </h3>
                    <p className="text-xs text-white/40 mt-0.5 flex items-center gap-1.5">
                      <Globe2 className="w-3 h-3" /> Google Meet · Tashkent (GMT+5)
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  aria-label="Close booking"
                >
                  <X className="w-4 h-4 text-white/70" />
                </button>
              </div>

              {/* Progress steps */}
              {step < 3 && (
                <div className="flex items-center gap-2 mt-4">
                  {['Date', 'Time', 'Details'].map((label, i) => (
                    <div key={label} className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full transition-colors ${
                          i === step
                            ? 'bg-[#D4AF37] text-black'
                            : i < step
                            ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                            : 'bg-white/5 text-white/30'
                        }`}
                      >
                        {label}
                      </span>
                      {i < 2 && <ChevronRight className="w-3 h-3 text-white/20" />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {/* STEP 0 — Date */}
                {step === 0 && (
                  <motion.div
                    key="date"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <p className="text-sm text-white/50 mb-4">Pick a day that suits you:</p>
                    <div className="grid grid-cols-4 gap-2">
                      {days.map((d) => (
                        <button
                          key={d.toISOString()}
                          onClick={() => {
                            setDate(d);
                            setStep(1);
                          }}
                          className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-all text-center group"
                        >
                          <p className="text-[10px] text-white/40 group-hover:text-[#D4AF37] uppercase">
                            {shortWeekday(d)}
                          </p>
                          <p className="text-lg font-bold text-white">{d.getDate()}</p>
                          <p className="text-[10px] text-white/40">
                            {shortMonth(d)}
                          </p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 1 — Time */}
                {step === 1 && date && (
                  <motion.div
                    key="time"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <button
                      onClick={() => setStep(0)}
                      className="text-xs text-white/40 hover:text-white mb-3 transition-colors"
                    >
                      ← {formatDate(date)}
                    </button>
                    <p className="text-sm text-white/50 mb-4">Available slots (GMT+5):</p>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            setTime(t);
                            setStep(2);
                          }}
                          className="py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#00F0FF]/50 hover:bg-[#00F0FF]/10 transition-all text-sm font-mono text-white/80 hover:text-white flex items-center justify-center gap-1.5"
                        >
                          <Clock3 className="w-3.5 h-3.5 text-[#00F0FF]/70" />
                          {t}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 — Details */}
                {step === 2 && date && time && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-white/40 hover:text-white mb-3 transition-colors"
                    >
                      ← {formatDate(date)} at {time}
                    </button>

                    <div className="rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-4 mb-5 flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#D4AF37]" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          {formatDate(date)} · {time} – {time.slice(0, 3)}
                          {String(parseInt(time.slice(3)) + 15).padStart(2, '0')}
                        </p>
                        <p className="text-xs text-white/40">15-minute video call</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email for the Meet link"
                          className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: canConfirm && !bookingSubmitting ? 1.02 : 1 }}
                      whileTap={{ scale: canConfirm && !bookingSubmitting ? 0.98 : 1 }}
                      onClick={async () => {
                        if (!canConfirm || !date || !time) return;
                        setBookingSubmitting(true);
                        try {
                          await sendLead({
                            name,
                            email,
                            source: 'booking',
                            bookingDate: date.toISOString(),
                            bookingTime: time,
                          });
                          setStep(3);
                        } finally {
                          setBookingSubmitting(false);
                        }
                      }}
                      disabled={!canConfirm || bookingSubmitting}
                      className="w-full mt-5 py-4 rounded-xl btn-primary text-black font-semibold disabled:opacity-40 flex items-center justify-center gap-2"
                    >
                      {bookingSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                        />
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          Confirm Booking
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                )}

                {/* STEP 3 — Success */}
                {step === 3 && date && time && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center mx-auto mb-5"
                    >
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </motion.div>
                    <h4 className="text-xl font-bold text-white mb-2">You're booked in!</h4>
                    <p className="text-white/50 text-sm mb-1">
                      {formatDate(date)} at {time} (GMT+5)
                    </p>
                    <p className="text-white/40 text-xs mb-6">
                      {confirmationCopy[language].sent}{' '}
                      <span className="text-[#D4AF37]">{email}</span>
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-white/70 hover:bg-white/10 transition-colors"
                      >
                        Done
                      </button>
                      <a
                        href="https://t.me/Dr_eviluz"
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-3 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-sm text-cyan-300 hover:bg-cyan-400/20 transition-colors flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Ping on Telegram
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-white/5 text-center">
              <p className="text-[10px] text-white/25">
                Scheduling powered by Cal.com — no card required, cancel anytime
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
