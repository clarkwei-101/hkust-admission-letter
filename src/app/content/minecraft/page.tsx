'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation/Navigation';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import { useI18n } from '@/lib/i18n';
import {
  Blocks, Map, Hammer, Package, Download, GitBranch, ArrowRight,
  Database, Wand2, Wrench, Boxes, Building2, Sparkles, Trophy,
  Mountain, DoorOpen, Bird, Anchor, Play,
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

const STEP_ICONS = [Database, Wand2, Hammer, Package, Wrench, Trophy, Mountain, Anchor];

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
                src="/hkust-minecraft-topdown-v2.1.png"
                alt="HKUST in Minecraft v2.1 — every building fully grounded from ground up, full RED 火鸟 sundial, 25+ entrance gates, 408,000 blocks"
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

            <div className="grid md:grid-cols-5 gap-3">
              {[
                { v: 'v1.7', stat: m.v17Stat, fidelity: 90, color: '#FFD93D', label: isZh ? '12 地标' : '12 landmarks' },
                { v: 'v1.8', stat: m.v18Stat, fidelity: 98, color: '#4D96FF', label: isZh ? '21k 细节' : '21k details' },
                { v: 'v1.9', stat: m.v19Stat, fidelity: 99, color: '#6BCB77', label: isZh ? '13 新建筑' : '13 new buildings' },
                { v: 'v2.0', stat: m.v20Stat, fidelity: 99.5, color: '#FF8C42', label: isZh ? '物理 + 大门' : 'physics + gates' },
                { v: 'v2.1', stat: m.v21Stat, fidelity: 99.9, color: '#FF6B6B', label: isZh ? '全程贴地' : 'fully grounded' },
                { v: 'v2.3', stat: m.v23Stat, fidelity: 99.95, color: '#00D4FF', label: isZh ? '生活化' : 'lived-in' },
                { v: 'v2.4', stat: m.v24Stat, fidelity: 99.95, color: '#9C27B0', label: isZh ? '精修' : 'polished', current: true },
              ].map(({ v, stat, fidelity, color, label, current }, i) => (
                <motion.div
                  key={v}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className={`glass rounded-2xl p-4 border transition-all relative overflow-hidden ${
                    current
                      ? 'border-[#FF6B6B]/50 shadow-lg shadow-[#FF6B6B]/20'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  {current && (
                    <div className="absolute top-0 right-0 px-2 py-0.5 bg-[#FF6B6B] text-[8px] uppercase tracking-widest text-white font-bold rounded-bl-lg">
                      {isZh ? '最新' : 'Latest'}
                    </div>
                  )}
                  <div className="flex items-baseline justify-between mb-2">
                    <span
                      className="text-2xl md:text-3xl font-bold tracking-tight"
                      style={{ color }}
                    >
                      {v}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-white/40">{label}</span>
                  </div>
                  <div className="text-white/70 text-xs mb-2 leading-relaxed min-h-[3em]">{stat}</div>
                  <div className="relative h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ background: color, boxShadow: `0 0 12px ${color}80` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${fidelity}%` }}
                      transition={{ delay: 0.8 + i * 0.08, duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="mt-1.5 flex items-baseline justify-between text-[9px] uppercase tracking-widest">
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
              {[m.step1Title, m.step2Title, m.step3Title, m.step4Title, m.step5Title, m.step6Title, m.step7Title, m.step8Title].map((title, i) => {
                const Icon = STEP_ICONS[i];
                const bodyKey = `step${i + 1}Body` as const;
                const isV20 = i === 6;
                const isV21 = i === 7;
                return (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    className={`glass rounded-2xl p-6 border transition-all ${
                      isV21
                        ? 'border-[#FF6B6B]/60 shadow-xl shadow-[#FF6B6B]/30 ring-1 ring-[#FF6B6B]/30'
                        : isV20
                        ? 'border-[#FF8C42]/40 shadow-lg shadow-[#FF8C42]/10'
                        : 'border-[#996600]/20 hover:border-[#996600]/40'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center shadow-lg ${
                          isV21
                            ? 'bg-gradient-to-br from-[#FF6B6B] to-[#FF1493] shadow-[#FF6B6B]/50'
                            : isV20
                            ? 'bg-gradient-to-br from-[#FF8C42] to-[#FF8C42]/60 shadow-[#FF8C42]/30'
                            : 'bg-gradient-to-br from-[#996600] to-[#d4a84b] shadow-[#996600]/30'
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

          {/* v2.1 BEFORE/AFTER — Full Grounding Showcase */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 mb-4">
                <Anchor className="w-3.5 h-3.5 text-[#FF6B6B]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#FF6B6B]">
                  {isZh ? 'v2.1 全程贴地 · 完整火鸟日晷 · 大门入口' : 'v2.1 Fully Grounded · Full Firebird Sundial · Entrance Gates'}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {m.v21ShowcaseTitle}
              </h2>
              <p className="text-white/55 text-sm max-w-2xl mx-auto">{m.v21ShowcaseBody}</p>
            </div>

            {/* Before/After visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75 }}
              className="glass rounded-3xl p-3 md:p-5 border border-[#FF6B6B]/30 overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hkust-minecraft-grounding-v2.1.png"
                alt="Before (v2.0) — buildings float on slope; After (v2.1) — column-anchored stone_bricks fill all gaps, every building built from ground up"
                className="w-full h-auto rounded-2xl block"
              />
              <div className="grid grid-cols-2 gap-4 mt-4 px-2">
                <div className="text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-widest">
                    {isZh ? '修正前' : 'Before'}
                  </span>
                  <p className="text-white/50 text-xs mt-2">{m.v21BeforeLabel}</p>
                </div>
                <div className="text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-widest">
                    {isZh ? '修正后' : 'After'}
                  </span>
                  <p className="text-white/50 text-xs mt-2">{m.v21AfterLabel}</p>
                </div>
              </div>
            </motion.div>

            {/* Two side-by-side fix cards */}
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  icon: Anchor,
                  title: m.v21Fix1Title,
                  body: m.v21Fix1Body,
                  color: '#00D4FF',
                  coord: m.v21Fix1Coord,
                },
                {
                  icon: Building2,
                  title: m.v21Fix2Title,
                  body: m.v21Fix2Body,
                  color: '#7B2FFF',
                  coord: m.v21Fix2Coord,
                },
              ].map(({ icon: Icon, title, body, color, coord }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.85 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-6 border transition-all"
                  style={{ borderColor: `${color}40` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${color}, ${color}80)`,
                        boxShadow: `0 8px 20px ${color}40`,
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 mb-2">
                        <h3 className="text-white font-bold text-sm leading-snug">{title}</h3>
                        <span
                          className="text-[10px] uppercase tracking-widest font-bold shrink-0"
                          style={{ color }}
                        >
                          {coord}
                        </span>
                      </div>
                      <p className="text-white/55 text-xs leading-relaxed">{body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stat strip */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { num: m.v21Stat1, label: isZh ? '悬浮建筑' : 'Floating blocks', color: '#00D4FF' },
                { num: m.v21Stat2, label: isZh ? '新增块数' : 'New blocks', color: '#7B2FFF' },
                { num: m.v21Stat3, label: isZh ? '贴地建筑' : 'Grounded buildings', color: '#FF6B6B' },
              ].map(({ num, label, color }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + i * 0.08 }}
                  className="glass rounded-xl p-4 border border-white/10 text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold mb-1" style={{ color }}>{num}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/50">{label}</div>
                </motion.div>
              ))}
            </div>

            {/* Academic Concourse — Most Dramatic Fix */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15 }}
              className="glass rounded-3xl p-3 md:p-5 border border-[#FF6B6B]/30 overflow-hidden"
            >
              <div className="text-center mb-4 px-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 mb-3">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#FF6B6B] font-bold">
                    {isZh ? '最戏剧性修复 · 学术楼穹顶' : 'Most Dramatic Fix · Academic Concourse'}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                  {isZh ? '162 块石砖填补 15-block 漂浮空隙' : '162 stone_bricks filled a 15-block floating gap'}
                </h3>
                <p className="text-white/55 text-xs">
                  {isZh ? '学术楼 (X=428-432, Z=452) 之前漂在 y=21 (距地面 15 blocks 高)。现在 stone_bricks 从 y=7 一直填到 y=20,让穹顶牢固扎根。' : 'Academic Concourse (X=428-432, Z=452) previously floated at y=21, 15 blocks above ground. Now stone_bricks fill from y=7 to y=20, anchoring the dome firmly.'}
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hkust-minecraft-academic-anchored-v2.1.png"
                alt="Academic Concourse — Before: black/yellow pattern floats at top; After: solid stone_bricks foundation fills the 15-block gap"
                className="w-full h-auto rounded-2xl block"
              />
            </motion.div>
          </motion.section>

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
                  v2.1 · {isZh ? '新版本' : 'New Release'}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {m.downloadTitle}
              </h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto text-sm">{m.downloadBody}</p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <a
                  href="/hkust-minecraft-world/HKUST-2026-Bedrock-v2.1.mcworld"
                  download
                  className="px-10 py-4 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] text-white font-bold text-base shadow-xl shadow-[#FF6B6B]/40 hover:shadow-[#FF6B6B]/60 transition-all inline-flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  {m.downloadLatest}
                </a>
                <a
                  href="https://github.com/clarkwei-101/hkust-minecraft/releases/tag/v2.1"
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
            <div className="grid md:grid-cols-4 gap-5">
              <div className="text-center glass rounded-2xl p-6 border border-[#FF8C42]/20">
                <Download className="w-6 h-6 text-[#FF8C42] mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2 text-sm">v2.0 (Physics + Gates)</h3>
                <p className="text-white/45 text-xs mb-4">{isZh ? 'v2.0 (物理 + 大门, 海岸 aquarium 还在水底)' : 'v2.0 — physics + gates; aquarium still underwater'}</p>
                <a
                  href="/hkust-minecraft-world/HKUST-2026-Bedrock-v2.0.mcworld"
                  download
                  className="inline-flex items-center gap-1.5 text-xs text-[#FF8C42] hover:text-[#FFA060] font-bold"
                >
                  <Download className="w-3.5 h-3.5" />
                  6.5 MB
                </a>
              </div>
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

          {/* v2.3 — OSM Footways + Amenity + Rooftop */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 mb-4">
                <Map className="w-3.5 h-3.5 text-[#00D4FF]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#00D4FF]">
                  v2.3 · {isZh ? '生活化' : 'lived-in'}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {m.v23Headline}
              </h2>
              <p className="text-white/50 text-sm max-w-2xl mx-auto">{m.v23Body}</p>
            </div>

            {/* v2.3 stats grid */}
            <div className="grid md:grid-cols-4 gap-3 mb-8">
              {[
                { v: m.v23Stat1, label: isZh ? 'OSM 步行路径' : 'OSM footways', color: '#00D4FF' },
                { v: m.v23Stat2, label: isZh ? '命名设施' : 'named amenities', color: '#FF6B6B' },
                { v: m.v23Stat3, label: isZh ? '绿化屋顶' : 'rooftop gardens', color: '#6BCB77' },
                { v: m.v23Stat4, label: isZh ? '橡树 + 花丛' : 'oak trees + flowers', color: '#FFD93D' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.06 }}
                  className="glass rounded-2xl p-4 border border-white/10"
                >
                  <div className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: s.color }}>
                    {s.v}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* v2.3 highlights — 4 cards */}
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: m.v23Highlight1, body: m.v23Highlight1Body, color: '#00D4FF' },
                { title: m.v23Highlight2, body: m.v23Highlight2Body, color: '#FF6B6B' },
                { title: m.v23Highlight3, body: m.v23Highlight3Body, color: '#6BCB77' },
                { title: m.v23Highlight4, body: m.v23Highlight4Body, color: '#FFD93D' },
              ].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.08 }}
                  className="glass rounded-2xl p-5 border border-white/10 hover:border-white/30 transition-all"
                >
                  <div className="mb-2 inline-flex items-center justify-center w-9 h-9 rounded-lg" style={{ background: `${h.color}20`, border: `1px solid ${h.color}40` }}>
                    <span className="text-lg font-bold" style={{ color: h.color }}>{i + 1}</span>
                  </div>
                  <h3 className="text-white font-bold text-sm mb-1">{h.title}</h3>
                  <p className="text-white/55 text-xs leading-relaxed">{h.body}</p>
                </motion.div>
              ))}
            </div>

            {/* v2.3 download */}
            <div className="grid md:grid-cols-2 gap-5 mt-8">
              <div className="glass rounded-2xl p-6 border border-[#00D4FF]/30 text-center">
                <Building2 className="w-6 h-6 text-[#00D4FF] mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2 text-sm">{isZh ? 'v2.3 .mcworld 下载' : 'v2.3 .mcworld download'}</h3>
                <p className="text-white/45 text-xs mb-4">{isZh ? '完整 Bedrock 世界 (7.5 MB, 424k blocks)' : 'Full Bedrock world (7.5 MB, 424k blocks)'}</p>
                <a
                  href="/HKUST-2026-Bedrock-v2.3.mcworld"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/40 text-[#00D4FF] text-xs font-semibold hover:bg-[#00D4FF]/20 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  {m.downloadTopdownButton}
                </a>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/10 text-center">
                <Map className="w-6 h-6 text-[#4D96FF] mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2 text-sm">{m.downloadTopdownLabel}</h3>
                <p className="text-white/45 text-xs mb-4">{isZh ? 'v2.3 全景顶视图' : 'v2.3 full topdown panorama'}</p>
                <a
                  href="/hkust-minecraft-topdown-v2.3.png"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-[#4D96FF]/40 text-[#4D96FF] text-xs font-semibold hover:bg-[#4D96FF]/10 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  {m.downloadTopdownButton}
                </a>
              </div>
            </div>
          </motion.section>

          {/* v2.4 — Sinkhole, Underpass, Pavilion, Night Lighting */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9C27B0]/10 border border-[#9C27B0]/30 mb-4">
                <Mountain className="w-3.5 h-3.5 text-[#9C27B0]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#9C27B0]">
                  v2.4 · {isZh ? '精修' : 'polished'}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {m.v24Headline}
              </h2>
              <p className="text-white/50 text-sm max-w-2xl mx-auto">{m.v24Body}</p>
            </div>

            {/* v2.4 stats grid */}
            <div className="grid md:grid-cols-4 gap-3 mb-8">
              {[
                { v: m.v24Stat1, label: isZh ? '塌陷洞' : 'sinkholes', color: '#9C27B0' },
                { v: m.v24Stat2, label: isZh ? '地下通道' : 'underpasses', color: '#3B82F6' },
                { v: m.v24Stat3, label: isZh ? '雨棚段' : 'pavilion segments', color: '#10B981' },
                { v: m.v24Stat4, label: isZh ? '路灯' : 'lanterns', color: '#F59E0B' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.06 }}
                  className="glass rounded-2xl p-4 border border-white/10"
                >
                  <div className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: s.color }}>
                    {s.v}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* v2.4 highlights — 4 cards */}
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { title: m.v24Highlight1, body: m.v24Highlight1Body, color: '#9C27B0' },
                { title: m.v24Highlight2, body: m.v24Highlight2Body, color: '#3B82F6' },
                { title: m.v24Highlight3, body: m.v24Highlight3Body, color: '#10B981' },
                { title: m.v24Highlight4, body: m.v24Highlight4Body, color: '#F59E0B' },
              ].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + i * 0.08 }}
                  className="glass rounded-2xl p-5 border border-white/10 hover:border-white/30 transition-all"
                >
                  <div className="mb-2 inline-flex items-center justify-center w-9 h-9 rounded-lg" style={{ background: `${h.color}20`, border: `1px solid ${h.color}40` }}>
                    <span className="text-lg font-bold" style={{ color: h.color }}>{i + 1}</span>
                  </div>
                  <h3 className="text-white font-bold text-sm mb-1">{h.title}</h3>
                  <p className="text-white/55 text-xs leading-relaxed">{h.body}</p>
                </motion.div>
              ))}
            </div>

            {/* v2.4 cinematic video */}
            <div className="mt-8 glass rounded-2xl p-6 border border-[#9C27B0]/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#9C27B0]/20 border border-[#9C27B0]/40 flex items-center justify-center">
                  <Play className="w-4 h-4 text-[#9C27B0] ml-0.5" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">{m.v24VideoLabel}</h3>
                  <p className="text-white/45 text-xs">{m.v24VideoBody}</p>
                </div>
              </div>
              <video
                controls
                preload="metadata"
                playsInline
                className="w-full rounded-xl border border-white/10"
                style={{ aspectRatio: '16/9' }}
                src="/hkust-v2-4-cinematic.mp4"
              />
            </div>

            {/* v2.4 download */}
            <div className="grid md:grid-cols-2 gap-5 mt-8">
              <div className="glass rounded-2xl p-6 border border-[#9C27B0]/30 text-center">
                <Building2 className="w-6 h-6 text-[#9C27B0] mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2 text-sm">{isZh ? 'v2.4 .mcworld 下载' : 'v2.4 .mcworld download'}</h3>
                <p className="text-white/45 text-xs mb-4">{isZh ? '完整 Bedrock 世界 (7.0 MB, 428k blocks)' : 'Full Bedrock world (7.0 MB, 428k blocks)'}</p>
                <a
                  href="/HKUST-2026-Bedrock-v2.4.mcworld"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#9C27B0]/10 border border-[#9C27B0]/40 text-[#9C27B0] text-xs font-semibold hover:bg-[#9C27B0]/20 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  {m.downloadTopdownButton}
                </a>
              </div>
              <div className="glass rounded-2xl p-6 border border-white/10 text-center">
                <Map className="w-6 h-6 text-[#4D96FF] mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2 text-sm">{m.downloadTopdownLabel}</h3>
                <p className="text-white/45 text-xs mb-4">{isZh ? 'v2.4 全景顶视图' : 'v2.4 full topdown panorama'}</p>
                <a
                  href="/hkust-minecraft-topdown-v2.4.png"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-[#4D96FF]/40 text-[#4D96FF] text-xs font-semibold hover:bg-[#4D96FF]/10 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  {m.downloadTopdownButton}
                </a>
              </div>
            </div>
          </motion.section>

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