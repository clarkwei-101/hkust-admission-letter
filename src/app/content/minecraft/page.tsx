'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation/Navigation';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import { useI18n } from '@/lib/i18n';
import {
  Blocks,
  Map,
  Hammer,
  Package,
  Download,
  GitBranch,
  ArrowRight,
  Database,
  Wand2,
  Wrench,
  Boxes,
} from 'lucide-react';

const LANDMARK_KEYS = [
  { key: 'landmarkDome',     icon: '🔴', color: '#FF6B6B' },
  { key: 'landmarkSundial',  icon: '🟡', color: '#FFD93D' },
  { key: 'landmarkFountain', icon: '🟢', color: '#6BCB77' },
  { key: 'landmarkSeaview',  icon: '🔵', color: '#4D96FF' },
  { key: 'landmarkLibrary',  icon: '🟣', color: '#9467BD' },
];

const STEP_ICONS = [Database, Wand2, Hammer, Package];

export default function MinecraftPage() {
  const { t, locale } = useI18n();
  const isZh = locale === 'zh';
  const m = t.minecraft;

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation showBackButton title={isZh ? '港科 Minecraft' : 'HKUST Minecraft'} />

      <div className="relative z-10 pt-24 md:pt-32 pb-20 px-4 md:px-6">
        <div className="container-hkust mx-auto max-w-5xl space-y-20">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block"
            >
              <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-2xl border border-[#996600]/30 bg-[#1a4d2e] flex items-center justify-center">
                <Boxes className="w-14 h-14 text-[#6BCB77]" />
              </div>
            </motion.div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#996600]/60 mb-3">
                {m.eyebrow}
              </p>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                <span className="text-[#6BCB77]">{m.title}</span>
              </h1>
              <p className="text-[#C0C0C0] text-sm mt-2 tracking-widest">{m.heroBadge}</p>
            </div>

            <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {m.subtitle}
            </p>

            <p className="text-white/50 text-sm max-w-3xl mx-auto leading-relaxed">
              {m.description}
            </p>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#6BCB77]/40 to-transparent" />

          {/* Top-down map */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6BCB77]/10 border border-[#6BCB77]/30 mb-4">
                <Map className="w-3.5 h-3.5 text-[#6BCB77]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#6BCB77]">
                  {isZh ? '顶视地图' : 'Top-Down Map'}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {m.sectionMapTitle}
              </h2>
              <p className="text-white/50 text-sm max-w-xl mx-auto">{m.sectionMapBody}</p>
            </div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl overflow-hidden border border-[#6BCB77]/20 shadow-2xl shadow-[#6BCB77]/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hkust-minecraft-topdown-v1.1.png"
                alt="HKUST in Minecraft v1.1 — annotated top-down map with 5 hand-built landmark pins"
                className="w-full h-auto block"
              />
            </motion.div>
          </motion.section>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#6BCB77]/40 to-transparent" />

          {/* Methodology */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#996600]/10 border border-[#996600]/30 mb-4">
                <Wrench className="w-3.5 h-3.5 text-[#d4a84b]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4a84b]">
                  {isZh ? '方法' : 'Methodology'}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {m.sectionMethodologyTitle}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {[m.step1Title, m.step2Title, m.step3Title, m.step4Title].map((title, i) => {
                const Icon = STEP_ICONS[i];
                const bodyKey = `step${i + 1}Body` as const;
                return (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="glass rounded-2xl p-6 border border-[#996600]/20 hover:border-[#996600]/40 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#996600] to-[#d4a84b] flex items-center justify-center shadow-lg shadow-[#996600]/30">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold mb-2">{title}</h3>
                        <p className="text-white/55 text-sm leading-relaxed">
                          {m[bodyKey as keyof typeof m] as string}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#6BCB77]/40 to-transparent" />

          {/* Landmarks */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6BCB77]/10 border border-[#6BCB77]/30 mb-4">
                <Hammer className="w-3.5 h-3.5 text-[#6BCB77]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#6BCB77]">
                  {isZh ? '手工建筑' : 'Hand-Built'}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {m.landmarksTitle}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {LANDMARK_KEYS.map(({ key, color }, i) => {
                const lm = m[key as 'landmarkDome'] as {
                  name: string;
                  coord: string;
                  size: string;
                  material: string;
                };
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="glass rounded-2xl p-6 border transition-all"
                    style={{ borderColor: `${color}40` }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                        style={{ background: color }}
                      >
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold mb-2">{lm.name}</h3>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-white/40 w-16 shrink-0">COORD</span>
                            <span className="text-white/70 font-mono">{lm.coord}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-white/40 w-16 shrink-0">SIZE</span>
                            <span className="text-white/70">{lm.size}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-white/40 w-16 shrink-0">MATERIAL</span>
                            <span className="text-white/70">{lm.material}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#6BCB77]/40 to-transparent" />

          {/* Download CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center glass rounded-3xl p-10 md:p-14 border border-[#6BCB77]/30 bg-gradient-to-br from-[#1a4d2e]/40 to-transparent"
          >
            <Blocks className="w-8 h-8 text-[#6BCB77] mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {m.downloadTitle}
            </h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto">{m.downloadBody}</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="/hkust-minecraft-world/HKUST-2026-Bedrock-v1.1.mcworld"
                download
                className="px-10 py-4 rounded-full bg-gradient-to-r from-[#6BCB77] to-[#4D96FF] text-white font-bold text-lg shadow-xl shadow-[#6BCB77]/40 hover:shadow-[#6BCB77]/60 transition-all inline-flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                {m.downloadButton}
              </a>
              <a
                href="https://github.com/clarkwei-101/hkust-minecraft/releases/tag/v1.1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all inline-flex items-center gap-2"
              >
                <GitBranch className="w-5 h-5" />
                {m.downloadGithub}
              </a>
            </div>
          </motion.div>

          {/* Arnis CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-center glass rounded-2xl p-8 border border-[#996600]/20"
          >
            <h3 className="text-xl font-bold text-white mb-2">{m.ctaTitle}</h3>
            <p className="text-white/50 mb-6 max-w-md mx-auto text-sm">{m.ctaBody}</p>
            <a
              href="https://github.com/louis-e/arnis"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#996600] to-[#d4a84b] text-white font-semibold shadow-lg shadow-[#996600]/30 hover:shadow-[#996600]/50 transition-all"
            >
              {m.ctaButton}
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-40">
        <AIClubBanner />
      </div>
    </main>
  );
}
