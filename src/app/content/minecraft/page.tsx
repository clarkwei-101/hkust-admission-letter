'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation/Navigation';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import { useI18n } from '@/lib/i18n';
import {
  Blocks, Map, Hammer, Package, Download, GitBranch, ArrowRight,
  Database, Wand2, Wrench, Boxes, Building2, Sparkles, Trophy,
  Mountain, DoorOpen, Bird,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const LANDMARK_KEYS = [
  { key: 'landmarkDome',     color: '#FF6B6B' },
  { key: 'landmarkSundial',  color: '#FFD93D' },
  { key: 'landmarkAtrium',   color: '#FF64C8' },
  { key: 'landmarkFountain', color: '#6BCB77' },
  { key: 'landmarkLG7',      color: '#FF8C00' },
  { key: 'landmarkUnderpass', color: '#808080' },
  { key: 'landmarkSeaview',  color: '#4D96FF' },
  { key: 'landmarkLibrary',  color: '#9467BD' },
];

const STEP_ICONS = [Database, Wand2, Hammer, Package, Wrench, Trophy, Mountain];

interface V19Building {
  name: string;
  detail: string;
  blocks: string;
}

interface V20Refinement {
  name: string;
  detail: string;
}

interface V18Detail {
  name: string;
  detail: string;
}

export default function MinecraftPage() {
  const { t, locale } = useI18n();
  const isZh = locale === 'zh';
  const m = t.minecraft;

  const [activeTab, setActiveTab] = useState<'v17' | 'v18' | 'v19' | 'v20'>('v20');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render SSR-equivalent placeholder (no framer-motion, no activeTab state bound
    // to client-only props) so hydration is byte-for-byte identical. After mount,
    // we render the full content with animations.
    return (
      <main className="min-h-screen relative overflow-hidden">
        <Navigation showBackButton title={isZh ? '港科 Minecraft' : 'HKUST Minecraft'} />
        <div className="relative z-10 pt-24 md:pt-32 pb-20 px-4 md:px-6">
          <div className="container-hkust mx-auto max-w-5xl space-y-20 text-center">
            <Blocks className="w-20 h-20 text-[#6BCB77] mx-auto mt-10" />
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              <span className="text-gradient-gold">{m.title}</span>
            </h1>
            <p className="text-white/50 text-sm">{m.heroBadge}</p>
          </div>
        </div>
      </main>
    );
  }

  // v1.9 buildings (13)
  const v19Buildings: V19Building[] = [
    m.v19Building1, m.v19Building2, m.v19Building3, m.v19Building4,
    m.v19Building5, m.v19Building6, m.v19Building7, m.v19Building8,
    m.v19Building9, m.v19Building10, m.v19Building11, m.v19Building12,
    m.v19Building13,
  ];

  // v1.8 details (11)
  const v18Details: V18Detail[] = [
    m.v18Detail1, m.v18Detail2, m.v18Detail3, m.v18Detail4, m.v18Detail5,
    m.v18Detail6, m.v18Detail7, m.v18Detail8, m.v18Detail9, m.v18Detail10,
    m.v18Detail11,
  ];

  // v2.0 refinements (4)
  const v20Refinements: V20Refinement[] = [
    m.v20Refinement1, m.v20Refinement2, m.v20Refinement3, m.v20Refinement4,
  ];

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
              <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-2xl border border-[#996600]/30 bg-gradient-to-br from-[#6BCB77] to-[#1a4d2e] flex items-center justify-center animate-pulse-glow">
                <Boxes className="w-14 h-14 text-white" />
              </div>
            </motion.div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#996600]/60 mb-3">
                {m.eyebrow}
              </p>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                <span className="text-gradient-gold">{m.title}</span>
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
          <div className="h-px bg-gradient-to-r from-transparent via-[#996600]/40 to-transparent" />

          {/* Hi-res top-down map */}
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
                src="/hkust-minecraft-topdown-v2.0.png"
                alt="HKUST in Minecraft v2.0 — 408×488 annotated top-down with anchored buildings, smoothed slopes, complete RED 火鸟 sundial with 12 hour-markers, and entrance gates on every large building"
                className="w-full h-auto block"
              />
            </motion.div>
          </motion.section>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#996600]/40 to-transparent" />

          {/* Version progression */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#996600]/10 border border-[#996600]/30 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#d4a84b]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#d4a84b]">
                  {isZh ? '版本演进' : 'Progression'}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {m.sectionProgressTitle}
              </h2>
              <p className="text-white/50 text-sm max-w-xl mx-auto">{m.sectionProgressBody}</p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                { v: 'v1.7', stat: m.v17Stat, fidelity: 90, color: '#FFD93D', label: isZh ? '12 地标' : '12 landmarks' },
                { v: 'v1.8', stat: m.v18Stat, fidelity: 98, color: '#4D96FF', label: isZh ? '21k 细节' : '21k details' },
                { v: 'v1.9', stat: m.v19Stat, fidelity: 99, color: '#6BCB77', label: isZh ? '13 新建筑' : '13 new buildings' },
                { v: 'v2.0', stat: m.v20Stat, fidelity: 99.5, color: '#FF6B6B', label: isZh ? '物理 + 大门' : 'physics + gates' },
              ].map(({ v, stat, fidelity, color, label }, i) => (
                <motion.div
                  key={v}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass rounded-2xl p-5 border border-white/10 hover:border-white/30 transition-all"
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <span
                      className="text-3xl font-bold tracking-tight"
                      style={{ color }}
                    >
                      {v}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-white/40">
                      {label}
                    </span>
                  </div>
                  <div className="text-white/70 text-sm mb-3 leading-relaxed min-h-[3em]">{stat}</div>
                  {/* Fidelity bar */}
                  <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: color, boxShadow: `0 0 12px ${color}80` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${fidelity}%` }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="mt-2 flex items-baseline justify-between text-[10px] uppercase tracking-widest">
                    <span className="text-white/40">{isZh ? '还原度' : 'Fidelity'}</span>
                    <span className="font-bold" style={{ color }}>{fidelity}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#996600]/40 to-transparent" />

          {/* Methodology (6 steps) */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
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
              {[m.step1Title, m.step2Title, m.step3Title, m.step4Title, m.step5Title, m.step6Title, m.step7Title].map((title, i) => {
                const Icon = STEP_ICONS[i];
                const bodyKey = `step${i + 1}Body` as const;
                const isV20 = i === 6;
                return (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    className={`glass rounded-2xl p-6 border transition-all ${
                      isV20 ? 'border-[#FF6B6B]/40 shadow-lg shadow-[#FF6B6B]/10' : 'border-[#996600]/20 hover:border-[#996600]/40'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center shadow-lg ${
                          isV20 ? 'bg-gradient-to-br from-[#FF6B6B] to-[#FF6B6B]/60 shadow-[#FF6B6B]/30' : 'bg-gradient-to-br from-[#996600] to-[#d4a84b] shadow-[#996600]/30'
                        }`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold mb-2 text-sm">{title}</h3>
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
          <div className="h-px bg-gradient-to-r from-transparent via-[#996600]/40 to-transparent" />

          {/* Tabbed What's New: v1.7 / v1.8 / v1.9 */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6BCB77]/10 border border-[#6BCB77]/30 mb-4">
                <Hammer className="w-3.5 h-3.5 text-[#6BCB77]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#6BCB77]">
                  {isZh ? '新增内容' : "What's New"}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {activeTab === 'v17' && m.landmarksTitle}
                {activeTab === 'v18' && m.v18DetailsTitle}
                {activeTab === 'v19' && m.v19BuildingsTitle}
                {activeTab === 'v20' && m.v20RefinementsTitle}
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-full glass border border-white/10 p-1 gap-1">
                {([
                  { id: 'v17' as const, label: 'v1.7', color: '#FFD93D' },
                  { id: 'v18' as const, label: 'v1.8', color: '#4D96FF' },
                  { id: 'v19' as const, label: 'v1.9', color: '#6BCB77' },
                  { id: 'v20' as const, label: 'v2.0', color: '#FF6B6B' },
                ]).map(({ id, label, color }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                      activeTab === id
                        ? 'text-white shadow-lg'
                        : 'text-white/50 hover:text-white/80'
                    }`}
                    style={
                      activeTab === id
                        ? { background: color, boxShadow: `0 0 20px ${color}40` }
                        : {}
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="grid md:grid-cols-2 gap-4">
              {activeTab === 'v17' && LANDMARK_KEYS.map(({ key, color }, i) => {
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
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -4 }}
                    className="glass rounded-2xl p-5 border transition-all"
                    style={{ borderColor: `${color}40` }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-lg"
                        style={{ background: color }}
                      >
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold mb-1.5">{lm.name}</h3>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-white/40 w-14 shrink-0">COORD</span>
                            <span className="text-white/70 font-mono">{lm.coord}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-white/40 w-14 shrink-0">SIZE</span>
                            <span className="text-white/70">{lm.size}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-white/40 w-14 shrink-0">MATERIAL</span>
                            <span className="text-white/70">{lm.material}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {activeTab === 'v18' && v18Details.map((d, i) => (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-5 border border-[#4D96FF]/20 hover:border-[#4D96FF]/40 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#4D96FF] to-[#7B2FFF] flex items-center justify-center shadow-lg shadow-[#4D96FF]/30">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold mb-1.5 text-sm leading-snug">{d.name}</h3>
                      <p className="text-white/55 text-xs leading-relaxed">{d.detail}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {activeTab === 'v19' && v19Buildings.map((b, i) => (
                <motion.div
                  key={b.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-5 border border-[#6BCB77]/20 hover:border-[#6BCB77]/40 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#6BCB77] to-[#1a4d2e] flex items-center justify-center shadow-lg shadow-[#6BCB77]/30">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 mb-1.5">
                        <h3 className="text-white font-bold text-sm leading-snug">{b.name}</h3>
                        <span className="text-[10px] uppercase tracking-widest text-[#6BCB77] font-bold shrink-0">
                          {b.blocks}
                        </span>
                      </div>
                      <p className="text-white/55 text-xs leading-relaxed">{b.detail}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {activeTab === 'v20' && v20Refinements.map((r, i) => {
                const V20_ICONS = [Mountain, Building2, Bird, DoorOpen];
                const V20Icon = V20_ICONS[i];
                return (
                  <motion.div
                    key={r.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -4 }}
                    className="glass rounded-2xl p-5 border border-[#FF6B6B]/20 hover:border-[#FF6B6B]/40 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FF6B6B]/60 flex items-center justify-center shadow-lg shadow-[#FF6B6B]/30">
                        <V20Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold mb-1.5 text-sm leading-snug">{r.name}</h3>
                        <p className="text-white/55 text-xs leading-relaxed">{r.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#6BCB77]/40 to-transparent" />

          {/* Download — Latest & Legacy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-6"
          >
            {/* Latest */}
            <div className="text-center glass rounded-3xl p-10 md:p-14 border border-[#FF6B6B]/30 bg-gradient-to-br from-[#3a1010]/40 to-transparent">
              <Blocks className="w-10 h-10 text-[#FF6B6B] mx-auto mb-4 animate-float-slow" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B6B]/20 border border-[#FF6B6B]/40 mb-4">
                <Sparkles className="w-3 h-3 text-[#FF6B6B]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#FF6B6B] font-bold">
                  v2.0 · {isZh ? '新版本' : 'New Release'}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {m.downloadTitle}
              </h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto text-sm">{m.downloadBody}</p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <a
                  href="/hkust-minecraft-world/HKUST-2026-Bedrock-v2.0.mcworld"
                  download
                  className="px-10 py-4 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] text-white font-bold text-base shadow-xl shadow-[#FF6B6B]/40 hover:shadow-[#FF6B6B]/60 transition-all inline-flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  {m.downloadLatest}
                </a>
                <a
                  href="https://github.com/clarkwei-101/hkust-minecraft/releases/tag/v2.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all inline-flex items-center gap-2"
                >
                  <GitBranch className="w-5 h-5" />
                  {m.downloadGithub}
                </a>
              </div>
            </div>

            {/* Legacy / Hi-res */}
            <div className="grid md:grid-cols-3 gap-5">
              <div className="text-center glass rounded-2xl p-6 border border-[#6BCB77]/20">
                <Download className="w-6 h-6 text-[#6BCB77] mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2 text-sm">v1.9 (Previous)</h3>
                <p className="text-white/45 text-xs mb-4">{isZh ? '上一版,100% 建筑物' : 'Previous release — 100% buildings'}</p>
                <a
                  href="/hkust-minecraft-world/HKUST-2026-Bedrock-v1.9.mcworld"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-[#6BCB77]/40 text-[#6BCB77] text-xs font-semibold hover:bg-[#6BCB77]/10 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  {m.downloadPrev}
                </a>
              </div>
              <div className="text-center glass rounded-2xl p-6 border border-[#d4a84b]/20">
                <Download className="w-6 h-6 text-[#d4a84b] mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2 text-sm">v1.7 (Legacy)</h3>
                <p className="text-white/45 text-xs mb-4">{isZh ? '历史版本,12 个地标' : 'Legacy release with 12 landmarks'}</p>
                <a
                  href="/hkust-minecraft-world/HKUST-2026-Bedrock-v1.7.mcworld"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-[#d4a84b]/40 text-[#d4a84b] text-xs font-semibold hover:bg-[#d4a84b]/10 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  {m.downloadLegacy}
                </a>
              </div>
              <div className="text-center glass rounded-2xl p-6 border border-[#4D96FF]/20">
                <Map className="w-6 h-6 text-[#4D96FF] mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2 text-sm">{m.downloadTopdownLabel}</h3>
                <p className="text-white/45 text-xs mb-4">408 × 488 annotated PNG</p>
                <a
                  href="/hkust-minecraft-topdown-v2.0.png"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-[#4D96FF]/40 text-[#4D96FF] text-xs font-semibold hover:bg-[#4D96FF]/10 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  {m.downloadTopdownButton}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Arnis CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
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