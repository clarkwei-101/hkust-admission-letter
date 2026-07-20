'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Envelope from '@/components/Envelope/Envelope';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import { useI18n } from '@/lib/i18n';
import { usePersonalisation } from '@/lib/personalisation';
import { LanguageSwitcher } from '@/components/Providers/Providers';
import { Sparkles, Edit3, Check, X, Volume2 } from 'lucide-react';

const ParticleBackground = dynamic(
  () => import('@/components/ParticleBackground/ParticleBackground'),
  { ssr: false }
);

type Stage = 'intro' | 'name' | 'envelope';

const ADMISSION_YEAR = new Date().getFullYear();

export default function HomePage() {
  const router = useRouter();
  const { t } = useI18n();
  const { name, setName } = usePersonalisation();
  const [stage, setStage] = useState<Stage>('intro');
  const [nameInput, setNameInput] = useState('');
  const [soundEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [videoDone, setVideoDone] = useState(false);
  // Browsers (Chrome/Safari) reject autoplay with audio unless it follows a
  // user gesture. We keep the video file muted and drive sound via a
  // separate <audio> element whose playback is gated by `audioStarted`.
  const [audioStarted, setAudioStarted] = useState(false);
  const [showBeginCta, setShowBeginCta] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleVideoEnd = useCallback(() => setVideoDone(true), []);

  const handleSkipVideo = useCallback(() => {
    if (audioRef.current) audioRef.current.pause();
    setVideoDone(true);
  }, []);

  const beginExperience = useCallback(() => {
    // Hard rewind the muted video so the audio + visual stay perfectly in
    // sync from this point onwards. The audio element is independent and
    // gets its own play() call inside the user-gesture handler. This is
    // the canonical Chromium- and Safari-compatible pattern: keep the
    // <video> muted and feed sound through a separate <audio> element so
    // its play() lives inside the user-gesture handler without touching
    // the already-playing video element.
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.85;
      audioRef.current.play().catch(() => {});
    }
    setAudioStarted(true);
    setShowBeginCta(false);
  }, []);

  useEffect(() => {
    if (!videoDone || stage !== 'intro') return;
    const timer = setTimeout(() => setStage('name'), 800);
    return () => clearTimeout(timer);
  }, [videoDone, stage]);

  const handleNameSubmit = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    setName(trimmed);
    setNameInput('');
    setIsEditing(false);
    setStage('envelope');
  };

  const handleEditName = () => {
    setNameInput(name || '');
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setNameInput('');
    setIsEditing(false);
  };

  const handleSkip = () => setStage('envelope');
  const handleOpenComplete = () => router.push('/hub');

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* ═══ INTRO STAGE — Full video, plays once ═══ */}
      <AnimatePresence>
        {stage === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-40"
          >
            {/* Video — file has no audio track; runs muted so autoplay
                is honoured on all browsers. The Jimeng soundtrack is
                served as a separate audio element below (gated by
                user gesture via the Begin CTA). */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src="/landing-hero.mp4"
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
            />

            {/* Dedicated audio element — only plays after the user has
                tapped the Begin CTA (which counts as the user gesture
                Chromium/Safari require before any audible playback). */}
            <audio
              ref={audioRef}
              src="/landing-hero-audio.m4a"
              preload="auto"
            />

            {/* Light overlay so text overlay is readable */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-[#000d1a]/20 to-black/30 pointer-events-none" />

            {/* Begin CTA — required user gesture that starts the audio.
                Stays visible until the user taps it. After it dismisses
                the experience plays through to the end. */}
            <AnimatePresence>
              {showBeginCta && !videoDone && (
                <motion.div
                  key="begin-cta"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 z-[60] flex flex-col items-center justify-center px-6"
                >
                  <div className="text-center space-y-6 max-w-md">
                    <div className="flex items-center justify-center gap-2 text-[#d4a84b] text-xs uppercase tracking-[0.3em]">
                      <span className="w-10 h-px bg-[#d4a84b]/60" />
                      HKUST · 2026 Intake
                      <span className="w-10 h-px bg-[#d4a84b]/60" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                      Your story begins <span className="text-[#d4a84b]">today</span>.
                    </h1>
                    <p className="text-white/70 text-sm md:text-base">
                      Tap below to start the cinematic intro with sound.
                      <br />
                      <span className="text-white/45 text-xs">点击下方按钮开启沉浸式体验(含声音)</span>
                    </p>
                    <motion.button
                      onClick={beginExperience}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-[#996600] to-[#d4a84b] text-white font-semibold text-base md:text-lg shadow-2xl shadow-[#996600]/40 hover:shadow-[#996600]/60 transition-all"
                    >
                      <Volume2 className="w-5 h-5" />
                      <span>Begin · 开始体验</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skip button — bottom right */}
            <div className="absolute bottom-8 right-8 z-50">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: videoDone ? 1 : 0.7 }}
                transition={{ delay: 1 }}
                onClick={handleSkipVideo}
                className="group px-5 py-2.5 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-white/75 text-sm hover:text-white hover:border-white/40 transition-all"
              >
                <span className="relative">
                  Skip intro
                  <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-white/60 group-hover:w-full transition-all duration-300" />
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ LANDING PAGE — HKUST deep-blue + gold background ═══ */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Light gold/dark gradient to deepen the PersistentVideo's look without hiding it */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000d1f]/30 via-transparent to-[#000a1a]/50" />

        {/* Animated particle field — gold accents that float above the video */}
        <ParticleBackground particleCount={50} color="#996600" />

        {/* Decorative gold lines — top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#996600]/50 to-transparent" />
        {/* Decorative gold lines — bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#996600]/50 to-transparent" />

        {/* Left vertical accent */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#996600]/30 to-transparent" />

        {/* Right vertical accent */}
        <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#996600]/30 to-transparent" />
      </div>

      {/* ═══ Content layers ═══ */}

      {/* Top-right language switcher */}
      <div className="fixed top-5 right-5 z-50">
        <LanguageSwitcher />
      </div>

      {/* AI Club Banner — bottom-left */}
      <div className="fixed bottom-6 left-6 z-40">
        <AIClubBanner />
      </div>

      {/* Stage: Name Question */}
      {stage === 'name' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-30 flex items-center justify-center"
        >
          <div className="w-full max-w-md text-center px-8">
            {/* CF icon with glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="mb-10 flex justify-center"
            >
              <div className="relative">
                {/* Outer glow */}
                <div className="absolute inset-0 rounded-2xl bg-[#996600]/25 blur-xl scale-110 animate-pulse" />
                {/* Breathing border ring */}
                <div className="absolute -inset-1.5 rounded-[1rem] border border-[#996600]/50 animate-[breathe-scale_3s_ease-in-out_infinite]" />
                {/* Icon */}
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-2xl border border-[#996600]/60 bg-[#001428]/70">
                  <img
                    src="/ai-club-icon.png"
                    alt="AI X SCI-FI Club"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Dynamic admission year */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-white/60 text-xs mb-10 tracking-[0.35em] uppercase"
            >
              2026 Intake · Admission Invitation
            </motion.p>

            {/* Name card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-2xl p-6 md:p-8 border border-[#996600]/25 mb-6"
            >
              {!isEditing ? (
                <div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-[#996600]" />
                    <span className="text-[#996600] text-sm font-medium">
                      {t.home.questionLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                      placeholder={t.home.questionPlaceholder}
                      className="flex-1 px-4 py-3 rounded-xl bg-[#0a1628]/70 border border-[#996600]/25 text-white placeholder-white/30 text-center font-medium text-lg focus:outline-none focus:border-[#996600]/60 transition-colors"
                      autoFocus
                      maxLength={30}
                      whileFocus={{ scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    />
                    <motion.button
                      onClick={handleNameSubmit}
                      whileHover={{ scale: 1.08, boxShadow: '0 0 22px rgba(153,102,0,0.6)' }}
                      whileTap={{ scale: 0.94 }}
                      disabled={!nameInput.trim()}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#996600] to-[#d4a84b] text-white font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#996600]/30"
                    >
                      <Check className="w-5 h-5" />
                    </motion.button>
                  </div>
                  {name && (
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <span className="text-white/40 text-xs">Current: </span>
                      <span className="text-[#996600] text-sm font-medium">{name}</span>
                      <button
                        onClick={handleEditName}
                        className="text-white/30 hover:text-[#996600] transition-colors"
                        aria-label="Edit name"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Edit3 className="w-4 h-4 text-[#996600]" />
                    <span className="text-[#996600] text-sm font-medium">Edit your name</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                      placeholder={t.home.questionPlaceholder}
                      className="flex-1 px-4 py-3 rounded-xl bg-[#0a1628]/70 border border-[#996600]/25 text-white placeholder-white/30 text-center font-medium text-lg focus:outline-none focus:border-[#996600]/60 transition-colors"
                      autoFocus
                      maxLength={30}
                      whileFocus={{ scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    />
                    <motion.button
                      onClick={handleCancelEdit}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      className="p-3 rounded-xl bg-white/10 text-white/60 hover:bg-white/20 transition-all"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      onClick={handleNameSubmit}
                      whileHover={{ scale: 1.08, boxShadow: '0 0 22px rgba(153,102,0,0.6)' }}
                      whileTap={{ scale: 0.94 }}
                      disabled={!nameInput.trim()}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#996600] to-[#d4a84b] text-white font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#996600]/30"
                    >
                      <Check className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Skip link */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={handleSkip}
              className="group text-white/30 text-xs hover:text-white/55 transition-colors relative"
            >
              <span className="relative">
                Continue without name
                <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-white/50 group-hover:w-full transition-all duration-300" />
              </span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Stage: Envelope */}
      {stage === 'envelope' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-20 flex items-center justify-center px-6"
        >
          <Envelope onOpenComplete={handleOpenComplete} soundEnabled={soundEnabled} />
        </motion.div>
      )}
    </main>
  );
}
