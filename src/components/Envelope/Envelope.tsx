'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { Mail, Sparkles, GraduationCap, MapPin, Calendar, Users, PartyPopper } from 'lucide-react';
import Fireworks from '@/components/Fireworks/Fireworks';
import Disclaimer from '@/components/Disclaimer/Disclaimer';
import { useI18n } from '@/lib/i18n';
import { usePersonalisation } from '@/lib/personalisation';

interface EnvelopeProps {
  onOpenComplete: () => void;
  soundEnabled?: boolean;
}

// `BLESSINGS` is selected deterministically inside the component via a stable
// index derived from the current day-of-year so server- and client-rendered
// HTML match (no hydration mismatch from `Math.random()`).
const BLESSINGS = [
  "Welcome to HKUST — your future starts here.",
  "Every great journey begins with a single step. Today is yours.",
  "You're not just joining a university. You're joining a movement.",
  "The world needs what only you can build.",
  "From this moment forward, you belong to something extraordinary.",
  "Your curiosity led you here. Let it take you further.",
  "Congratulations on earning your place among the best.",
  "The best version of your story begins this September.",
];

function pickBlessing(): string {
  // Day-of-year is identical on server and client for the same calendar day,
  // so this is safe to compute during initial render. `useEffect` would
  // trigger a visible flash on the letter text — we want the same blessing
  // both at SSR and at hydration time.
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86_400_000);
  return BLESSINGS[dayOfYear % BLESSINGS.length];
}

export default function Envelope({ onOpenComplete, soundEnabled: _soundEnabled }: EnvelopeProps) {
  const { t } = useI18n();
  const { name } = usePersonalisation();
  const [isOpening, setIsOpening] = useState(false);
  const [isLetterExpanded, setIsLetterExpanded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentBlessing] = useState(() => pickBlessing());
  const letterAudioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const topFlapRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particlesInitialized = useRef(false);

  // Play applause as soon as the letter expands (covers both Open Letter click
  // and the user clicking Continue to /hub — the same audio element is
  // re-triggered from currentTime=0).
  useEffect(() => {
    if (!isLetterExpanded) return;
    const audio = letterAudioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.volume = 0.7;
    audio.play().catch(() => {});
  }, [isLetterExpanded]);

  useEffect(() => {
    if (!containerRef.current || isOpening || particlesInitialized.current) return;
    particlesInitialized.current = true;

    const particles = containerRef.current.querySelectorAll('.particle');
    particles.forEach((particle, i) => {
      const config = PARTICLE_POSITIONS[i];
      if (!config) return;

      gsap.set(particle, { x: 0, y: 0, rotation: 0 });
      gsap.to(particle, {
        y: -30 + config.size * 2,
        x: -15 + config.size,
        rotation: 180,
        duration: 2 + config.size * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: config.delay,
      });
    });
  }, [isOpening]);

  const openSfxRef = useRef<HTMLAudioElement>(null);

  // Unlock browser audio context on mount — Chromium/Safari block any later
  // play() that isn't preceded by a user gesture, so we prime the audio
  // element with a muted, near-silent play right after the first user click
  // anywhere on the document.
  useEffect(() => {
    const audio = openSfxRef.current;
    if (!audio) return;

    const unlock = () => {
      audio.muted = true;
      audio.volume = 0;
      audio.play().then(() => {
        audio.pause();
        audio.currentTime = 0;
        audio.muted = false;
        audio.volume = 0.9;
      }).catch(() => {});
      document.removeEventListener('pointerdown', unlock);
      document.removeEventListener('keydown', unlock);
    };

    document.addEventListener('pointerdown', unlock, { once: true });
    document.addEventListener('keydown', unlock, { once: true });
    return () => {
      document.removeEventListener('pointerdown', unlock);
      document.removeEventListener('keydown', unlock);
    };
  }, []);

  const handleOpen = useCallback(() => {
    if (isOpening) return;
    setIsOpening(true);

    // Open sound — user-supplied mixkit applause MP3 (small, fast to load)
    if (openSfxRef.current) {
      openSfxRef.current.currentTime = 0;
      openSfxRef.current.volume = 0.9;
      openSfxRef.current.play().catch(() => {});
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => setIsLetterExpanded(true), 400);
      },
    });

    if (buttonRef.current) {
      tl.to(buttonRef.current, { opacity: 0, scale: 0.5, duration: 0.5, ease: 'power2.in' });
    }
    if (glowRef.current) {
      tl.to(glowRef.current, { scale: 2, opacity: 0, duration: 0.8, ease: 'power2.in' }, '-=0.3');
    }
    if (topFlapRef.current) {
      tl.to(topFlapRef.current, { rotationX: -180, transformOrigin: 'top center', duration: 1.2, ease: 'power2.inOut' }, '-=0.2');
    }
    if (letterRef.current) {
      tl.to(letterRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4');
      tl.to(letterRef.current, { boxShadow: '0 0 60px rgba(153, 102, 0, 0.8), 0 0 120px rgba(153, 102, 0, 0.4)', duration: 0.5 }, '-=0.3');
    }
    if (bottomRef.current) {
      tl.to(bottomRef.current, { y: -50, opacity: 0, duration: 0.6, ease: 'power2.in' }, '-=0.5');
    }
    if (envelopeRef.current) {
      tl.to(envelopeRef.current, { opacity: 0, scale: 0.9, duration: 0.8, ease: 'power2.in' }, '+=0.3');
    }
  }, [isOpening]);

  const handleContinue = useCallback(() => {
    // Replay applause to celebrate the transition into the hub page.
    if (letterAudioRef.current) {
      letterAudioRef.current.currentTime = 0;
      letterAudioRef.current.volume = 0.7;
      letterAudioRef.current.play().catch(() => {});
    }
    setIsTransitioning(true);
    setTimeout(() => onOpenComplete(), 600);
  }, [onOpenComplete]);

  const displayName = name || 'Admit';

  if (isLetterExpanded) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex flex-col items-center overflow-y-auto"
        style={{ background: 'linear-gradient(180deg, #00050f 0%, #000a18 30%, #001a33 60%, #000a18 100%)' }}
      >
        {/* Fireworks */}
        <Fireworks active={true} duration={6000} />

        {/* Audio — small MP3, fast load */}
        <audio ref={letterAudioRef} src="/admission-applause.mp3" preload="auto" />

        {/* Video — heavily blurred, decorative only */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <video
            src="/admission-celebration.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.05, filter: 'blur(16px) brightness(0.15)', transform: 'scale(1.4)' }}
            autoPlay
            loop
            muted
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black/90" />
        </div>

        {/* Playing indicator */}
        <div className="fixed top-6 right-6 z-[100] flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#003366]/80 border border-[#996600]/50 backdrop-blur-sm">
          <motion.div
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-[#996600]"
          />
          <span className="text-[#996600] text-xs font-medium">Celebrating...</span>
        </div>

        {/* Letter — full scrollable, larger */}
        <motion.div
          initial={{ scale: 0.6, y: 120, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-10 py-14 md:py-20"
        >
          {/* Top gold line */}
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#996600] to-transparent mb-12" />

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#003366] to-[#1a4d7c] flex items-center justify-center border-2 border-[#996600]/50 shadow-2xl mb-5"
            >
              <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-[#996600]" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#996600]/70 mb-3"
            >
              2026 INTAKE · OFFICIAL INVITATION
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Hong Kong University
              <br />
              <span className="text-[#996600]">of Science and Technology</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-[#C0C0C0] text-sm md:text-base tracking-widest mt-3"
            >
              香港科技大学
            </motion.p>
          </div>

          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="w-40 md:w-64 h-[1px] bg-gradient-to-r from-transparent via-[#996600]/70 to-transparent mx-auto mb-10 origin-center"
          />

          {/* Recipient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#996600]/60 mb-3">For</p>
            <p
              className="font-serif italic text-5xl md:text-7xl lg:text-8xl text-white"
              style={{ textShadow: '0 0 50px rgba(153,102,0,0.7)' }}
            >
              {displayName}
            </p>
            <p className="text-[#C0C0C0] mt-4 md:mt-5 text-sm md:text-base tracking-widest">
              2026 Intake · Offer Holder
            </p>
          </motion.div>

          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#996600]/70 to-transparent mx-auto mb-10 origin-center"
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="space-y-4 mb-12"
          >
            <div className="glass rounded-2xl p-5 md:p-8 border border-[#996600]/20">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#996600]" />
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#996600]">Welcome</span>
              </div>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                We are delighted to officially welcome you to the Hong Kong University of Science and Technology — Class of 2026 (Intake).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass rounded-2xl p-5 md:p-8 border border-[#996600]/20">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-[#996600]" />
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#996600]">Key Dates</span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Orientation</span>
                    <span className="text-white font-semibold">25 Aug 2026</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Semester begins</span>
                    <span className="text-white font-semibold">2 Sep 2026</span>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-5 md:p-8 border border-[#996600]/20">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-[#996600]" />
                  <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#996600]">Campus</span>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">
                  Clear Water Bay, Sai Kung, New Territories, Hong Kong
                </p>
              </div>
            </div>

            <div className="glass rounded-2xl p-5 md:p-8 border border-[#996600]/20">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-[#996600]" />
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#996600]">Community</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Join 10,000+ students from 60+ countries shaping the future.
              </p>
            </div>
          </motion.div>

          {/* Blessing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-3 px-8 py-5 rounded-full bg-gradient-to-r from-[#003366]/60 to-[#996600]/30 border border-[#996600]/50">
              <PartyPopper className="w-6 h-6 text-[#996600]" />
              <span className="text-[#d4a84b] text-base md:text-lg font-medium italic">
                {currentBlessing}
              </span>
            </div>
          </motion.div>

          {/* Continue button */}
          {!isTransitioning ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="text-center"
            >
              <motion.button
                onClick={handleContinue}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-4 px-14 py-6 rounded-full bg-gradient-to-r from-[#996600] to-[#d4a84b] text-white font-bold text-lg md:text-xl shadow-2xl shadow-[#996600]/40 hover:shadow-[#996600]/60 transition-all"
              >
                Continue to Admission Guide
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#003366]/50 border border-[#996600]/40">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-[#996600] border-t-transparent rounded-full"
                />
                <span className="text-[#996600] text-base">Opening your journey...</span>
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <div className="mt-16 text-center">
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#996600]/50 to-transparent mx-auto mb-4" />
            <p className="text-[#996600]/50 text-[10px] tracking-[0.3em] uppercase">
              Hong Kong University of Science and Technology · Admissions Office
            </p>
          </div>

          {/* Long-form disclaimer — required for legal clarity. */}
          <div className="mt-10">
            <Disclaimer variant="banner" />
          </div>

          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#996600] to-transparent mt-12" />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto px-2">
      {/* Open SFX — user-supplied MP3 (mixkit ending-show applause) */}
      <audio ref={openSfxRef} src="/admission-applause.mp3" preload="auto" />

      {/* Disclaimer pill above the envelope — required for legal clarity since
          this is a student-made project, not an official HKUST artefact. */}
      {!isOpening && <Disclaimer variant="envelope" className="mb-4" />}

      {/* Decorative particles around envelope */}
      {!isOpening &&
        PARTICLE_POSITIONS.map((config, i) => (
          <div
            key={i}
            className="particle absolute rounded-full pointer-events-none z-0"
            style={{
              left: `${config.x}%`,
              top: `${config.y}%`,
              width: config.size,
              height: config.size,
              background: COLORS[config.color],
              opacity: 0.4,
              boxShadow: `0 0 ${config.size * 2}px ${COLORS[config.color]}`,
            }}
          />
        ))}

      {/* Envelope box — single contained unit (button INSIDE) */}
      <div
        ref={envelopeRef}
        className="relative"
        style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
      >
        <div
          ref={glowRef}
          className="absolute inset-0 bg-gradient-to-br from-[#996600]/30 via-[#003366]/20 to-transparent rounded-3xl blur-2xl scale-100"
        />

        <div
          className="relative rounded-3xl overflow-hidden border border-[#996600]/30"
          style={{
            background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3c 50%, #081020 100%)',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* Top flap */}
          <div
            ref={topFlapRef}
            className="relative w-full h-40"
            style={{ transformStyle: 'preserve-3d', transformOrigin: 'top center' }}
          >
            <svg viewBox="0 0 400 160" className="w-full h-full drop-shadow-2xl" preserveAspectRatio="none">
              <defs>
                <linearGradient id="flapGradFinal" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#0d1f3c" />
                  <stop offset="50%" stopColor="#1a3a5c" />
                  <stop offset="100%" stopColor="#0d1f3c" />
                </linearGradient>
              </defs>
              <polygon points="0,160 200,0 400,160" fill="url(#flapGradFinal)" />
              <polygon points="0,160 200,0 400,160" fill="none" stroke="rgba(153,102,0,0.6)" strokeWidth="2" />
            </svg>
          </div>

          {/* Body */}
          <div ref={bottomRef} className="relative bg-[#0a1628]">
            <div className="text-center pt-6 px-8 space-y-1">
              <div className="flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.3em] text-white/40">
                <span className="w-12 h-px bg-white/20" />
                {t.home.envelope.seal}
                <span className="w-12 h-px bg-white/20" />
              </div>
              <p className="text-[#996600]/60 text-[9px] tracking-[0.25em] uppercase pt-1">
                {t.home.disclaimer.short}
              </p>
            </div>

            <div className="text-center mt-10 px-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#996600]/70 mb-2">
                {t.home.envelope.toLabel}
              </p>
              <p
                className="font-serif italic text-4xl md:text-5xl text-white"
                style={{ textShadow: '0 0 24px rgba(153,102,0,0.55)' }}
              >
                {displayName}
              </p>
              <p className="text-sm text-[#C0C0C0] mt-2 tracking-wider">
                {t.home.envelope.degree}
              </p>
            </div>

            {/* Open Letter button — fully inside the envelope so nothing clips it */}
            {!isOpening && (
              <div className="flex justify-center mt-10 px-8">
                <motion.button
                  ref={buttonRef}
                  onClick={handleOpen}
                  className="relative z-30 flex items-center justify-center gap-3 px-12 py-5 rounded-full bg-gradient-to-r from-[#996600] to-[#d4a84b] text-white font-bold text-lg shadow-2xl shadow-[#996600]/50 hover:shadow-[#996600]/70 transition-all whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Mail className="w-5 h-5" />
                  <span>{t.home.envelope.open}</span>
                </motion.button>
              </div>
            )}

            {/* Bottom inscription inside envelope */}
            <div className="text-center mt-8 pb-6 px-6">
              <p className="text-[#996600]/80 tracking-[0.3em] text-[10px] font-medium uppercase">
                Hong Kong University of Science and Technology
              </p>
            </div>
          </div>

          {/* Letter rising (hidden initially) */}
          <div
            ref={letterRef}
            className="absolute inset-x-4 top-1/2 -translate-y-1/2 p-8 rounded-2xl opacity-0 scale-90"
            style={{
              background: 'linear-gradient(180deg, #1a3a5c 0%, #0d1f3c 100%)',
              border: '1px solid rgba(153, 102, 0, 0.3)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#003366] to-[#1a4d7c] flex items-center justify-center border-2 border-[#996600]/30">
                <span className="text-[#996600] font-bold text-base">HKUST</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  {t.home.greeting} <span className="text-[#d4a84b]">{displayName}</span>{t.home.greetingSuffix}
                </h2>
                <p className="text-[#996600] text-sm tracking-wider">Welcome to HKUST</p>
              </div>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#996600] to-transparent mx-auto" />
              <p className="text-white/70 text-xs">{t.home.caption}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PARTICLE_POSITIONS = [
  { x: 25, y: 30, delay: 0.1, size: 6, color: 0 },
  { x: 45, y: 45, delay: 0.5, size: 4, color: 1 },
  { x: 65, y: 25, delay: 1.2, size: 5, color: 2 },
  { x: 30, y: 60, delay: 0.8, size: 7, color: 0 },
  { x: 55, y: 35, delay: 1.5, size: 4, color: 1 },
  { x: 75, y: 50, delay: 0.3, size: 6, color: 2 },
  { x: 35, y: 70, delay: 1.0, size: 5, color: 0 },
  { x: 60, y: 65, delay: 0.7, size: 8, color: 1 },
  { x: 40, y: 40, delay: 1.3, size: 4, color: 2 },
  { x: 70, y: 30, delay: 0.2, size: 5, color: 0 },
  { x: 50, y: 55, delay: 0.9, size: 6, color: 1 },
  { x: 25, y: 50, delay: 1.4, size: 4, color: 2 },
];

const COLORS = ['#996600', '#d4a84b', '#4a7eb5'];
