'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bus, ArrowRight, ArrowLeftRight, RefreshCw, Clock, Users, Coffee, MapPin, ShowerHead,
  BookOpen, Wifi, Utensils, Heart, Volume2, Accessibility, Compass, Phone, Search,
} from 'lucide-react';
import Navigation from '@/components/Navigation/Navigation';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import { useI18n } from '@/lib/i18n';
import { usePersonalisation } from '@/lib/personalisation';

type RouteId = '11' | '11M' | '11S' | '12' | '792M';

const ROUTES: {
  id: RouteId;
  endpoint: { en: string; zh: string };
  eta: number;
  next3: number[];
  color: string;
}[] = [
  { id: '11', endpoint: { en: 'Hang Hau MTR ↔ HKUST', zh: '坑口地铁 ↔ 科大' }, eta: 4, next3: [4, 11, 19], color: '#2E7D32' },
  { id: '11M', endpoint: { en: 'Po Lam MTR ↔ HKUST', zh: '宝琳地铁 ↔ 科大' }, eta: 7, next3: [7, 15, 23], color: '#003366' },
  { id: '11S', endpoint: { en: 'Hang Hau Express (peak)', zh: '坑口快线（繁忙时段）' }, eta: 12, next3: [12, 24, 36], color: '#996600' },
  { id: '12', endpoint: { en: 'Sai Kung Pier ↔ HKUST', zh: '西贡码头 ↔ 科大' }, eta: 9, next3: [9, 18, 27], color: '#7B2FFF' },
  { id: '792M', endpoint: { en: 'Tseung Kwan O ↔ HKUST', zh: '将军澳 ↔ 科大' }, eta: 6, next3: [6, 13, 21], color: '#FF6B35' },
];

const SHUTTLES = [
  { name: { en: 'South-North Shuttle Loop', zh: '南北穿梭巴士' }, wait: 4, color: '#003366' },
  { name: { en: 'North-Loop', zh: '北环线' }, wait: 7, color: '#996600' },
  { name: { en: 'Sprint to Hang Hau MTR', zh: '坑口地铁快线' }, wait: 12, color: '#FF6B35' },
  { name: { en: 'Tseung Kwan O Express', zh: '将军澳快线' }, wait: 15, color: '#7B2FFF' },
];

const BUILDINGS_PINS = [
  { id: 'lib', name: { en: 'Library', zh: '图书馆' }, x: 50, y: 38 },
  { id: 'ac', name: { en: 'Academic Building', zh: '学术楼' }, x: 35, y: 45 },
  { id: 'ssc', name: { en: 'Student Centre', zh: '学生中心' }, x: 60, y: 55 },
  { id: 'sro', name: { en: 'S.H. Ho College', zh: '何善衡书院' }, x: 22, y: 60 },
  { id: 'sai', name: { en: 'Lookout', zh: '观景亭' }, x: 80, y: 25 },
];

interface Facility {
  icon: any;
  label: { en: string; zh: string };
}

const FACILITIES_NEAR: Record<string, Facility[]> = {
  lib: [
    { icon: Coffee, label: { en: 'Sea-view Café · LG1', zh: '海景咖啡厅 · LG1' } },
    { icon: ShowerHead, label: { en: 'Restrooms · 24/7', zh: '洗手间 · 24/7' } },
    { icon: Wifi, label: { en: 'eduroam · HKUST', zh: '校园无线网 · eduroam' } },
    { icon: BookOpen, label: { en: 'Scholar Hub · floor 5', zh: 'Scholar Hub · 5 楼' } },
  ],
  ac: [
    { icon: Utensils, label: { en: 'LG7 Restaurant', zh: 'LG7 餐厅' } },
    { icon: Coffee, label: { en: 'Starbucks · LG1', zh: '星巴克 · LG1' } },
    { icon: Heart, label: { en: 'AED Station · L1', zh: 'AED 急救站 · L1' } },
  ],
  ssc: [
    { icon: Utensils, label: { en: '7 Dining Levels LG1–LG7', zh: '7 层食堂 LG1–LG7' } },
    { icon: Users, label: { en: 'Students’ Union · LG3', zh: '学生会 · LG3' } },
    { icon: Coffee, label: { en: 'Café · LG4', zh: '餐厅咖啡 · LG4' } },
  ],
  sro: [
    { icon: ShowerHead, label: { en: 'Pantry · 24/7', zh: '公共厨房 · 24/7' } },
    { icon: Users, label: { en: 'College Lounge', zh: '书院交谊厅' } },
    { icon: Heart, label: { en: 'Counselling Office', zh: '心理咨询室' } },
  ],
  sai: [
    { icon: Phone, label: { en: 'Emergency Call Box', zh: '紧急求助电话' } },
    { icon: MapPin, label: { en: 'Sunrise Lookout', zh: '日出观景点' } },
  ],
};

export default function CampusLivePage() {
  const { t, locale } = useI18n();
  const { name } = usePersonalisation();
  const isZh = locale === 'zh';

  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [tick, setTick] = useState(0);
  const [from, setFrom] = useState('lib');
  const [to, setTo] = useState('ssc');
  const [activePin, setActivePin] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Auto-refresh simulating live data
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setTick((t) => t + 1);
      setLastUpdated(new Date());
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Animate ETAs up/down by small increments (deterministic, no random)
  const animatedRoutes = ROUTES.map((r) => ({
    ...r,
    eta: r.eta + ((tick + r.eta) % 3) - 1,
  }));

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
    setTick((t) => t + 1);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
<Navigation showBackButton title="Live Campus" />

      <div className="relative z-10 pt-24 md:pt-32 pb-20 px-4 md:px-6">
        <div className="container-hkust mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-[#FF6B35]/15 border border-[#FF6B35]/30 text-[#FF6B35] text-xs uppercase tracking-[0.3em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B35]"></span>
              </span>
              <span>Live · Path Advisor × USTransit</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              <span className="text-gradient-gold">{t.campusLive.title}</span>
            </h1>
            <p className="text-[#C0C0C0] text-base md:text-lg max-w-2xl mx-auto">
              {t.campusLive.subtitle}
            </p>
            <p className="text-[#C0C0C0]/70 text-sm max-w-2xl mx-auto mt-2">
              {t.campusLive.intro}
            </p>

            <div className="mt-4 flex items-center justify-center gap-3 text-xs text-white/60">
              <button
                onClick={handleRefresh}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{t.campusLive.lastUpdated}: {lastUpdated.toLocaleTimeString()}</span>
              </button>
            </div>
          </motion.div>

          {/* Minibus arrivals */}
          <Section title={t.campusLive.sections.buses} icon={<Bus className="w-5 h-5" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {animatedRoutes.map((route) => (
                <div
                  key={route.id}
                  className="rounded-2xl p-5 bg-white/5 border border-white/10 hover:border-[#FF6B35]/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="px-2 py-0.5 rounded-md font-bold text-xs text-white"
                      style={{ background: route.color }}
                    >
                      {route.id}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40">
                      {isZh ? route.endpoint.zh : route.endpoint.en}
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <motion.div
                      key={route.eta}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-4xl font-bold text-white tabular-nums"
                    >
                      {route.eta}
                    </motion.div>
                    <span className="text-sm text-white/60 uppercase">min</span>
                    <span className="ml-auto text-xs text-[#FF6B35]">next bus</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <span className="opacity-60">Next:</span>
                    {route.next3.map((n, i) => (
                      <div
                        key={i}
                        className={`
                          flex-1 rounded-md px-2 py-1 text-center
                          ${i === 0 ? 'bg-[#FF6B35]/20 text-[#FF6B35] font-semibold' : 'bg-white/5'}
                        `}
                      >
                        {n}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleRefresh}
                    className="mt-3 w-full inline-flex items-center justify-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Arrive reminder</span>
                  </button>
                </div>
              ))}
            </div>
          </Section>

          {/* Shuttle queue */}
          <Section title={t.campusLive.sections.shuttle} icon={<Compass className="w-5 h-5" />}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SHUTTLES.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl p-4 bg-white/5 border border-white/10 hover:border-[#996600]/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}40` }}>
                      <Bus className="w-4 h-4" style={{ color: s.color }} />
                    </div>
                    <span className="text-sm text-white/80 truncate flex-1">
                      {isZh ? s.name.zh : s.name.en}
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <motion.div
                        key={s.wait + tick}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="text-2xl font-bold text-white"
                      >
                        {s.wait + ((tick + i) % 3)}
                      </motion.div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40">{t.campusLive.waitingLabel}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#996600]">{3 + i}</div>
                      <div className="text-[10px] uppercase tracking-widest text-white/40">{t.campusLive.queueLabel}</div>
                    </div>
                  </div>
                  {/* Visual queue */}
                  <div className="mt-3 flex h-2 rounded-full overflow-hidden bg-white/5">
                    <div
                      className="bg-[#996600]"
                      style={{ width: `${Math.min(100, (3 + i) * 15)}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Walking Directions */}
          <Section title={t.campusLive.sections.walking} icon={<ArrowRight className="w-5 h-5" />}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Inputs */}
              <div className="rounded-2xl p-5 bg-white/5 border border-white/10 space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#996600] mb-2">
                    {t.campusLive.routeFrom}
                  </label>
                  <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#001a33]/60 border border-white/10 text-white focus:outline-none focus:border-[#d4a84b]/50"
                  >
                    {BUILDINGS_PINS.map((b) => (
                      <option key={b.id} value={b.id}>
                        {isZh ? b.name.zh : b.name.en}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleSwap}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    aria-label={t.campusLive.swap}
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#996600] mb-2">
                    {t.campusLive.routeTo}
                  </label>
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#001a33]/60 border border-white/10 text-white focus:outline-none focus:border-[#d4a84b]/50"
                  >
                    {BUILDINGS_PINS.map((b) => (
                      <option key={b.id} value={b.id}>
                        {isZh ? b.name.zh : b.name.en}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#996600] to-[#d4a84b] text-white font-medium hover:shadow-lg transition-shadow"
                >
                  <Search className="w-4 h-4" />
                  {t.campusLive.getDirections}
                </button>

                <div className="rounded-xl bg-[#996600]/10 border border-[#996600]/30 p-3 text-xs text-white/70">
                  <p className="font-semibold text-[#d4a84b] mb-1">{name ? `${name}, ` : ''}Your route</p>
                  <p>
                    From <span className="text-white">{BUILDINGS_PINS.find((b) => b.id === from)?.name.en}</span> →
                    To <span className="text-white">{BUILDINGS_PINS.find((b) => b.id === to)?.name.en}</span>.
                    Estimated walking time: <span className="text-[#d4a84b] font-semibold">5 min</span> via Atrium.
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl p-3 bg-white/5 border border-white/10">
                <svg viewBox="0 0 100 100" className="w-full h-auto">
                  <defs>
                    <linearGradient id="mapBg" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#0d1f3c" />
                      <stop offset="100%" stopColor="#061018" />
                    </linearGradient>
                  </defs>
                  <rect width="100" height="100" fill="url(#mapBg)" />

                  {/* Buildings */}
                  {BUILDINGS_PINS.map((b) => {
                    const isFrom = b.id === from;
                    const isTo = b.id === to;
                    const isActive = isFrom || isTo;
                    return (
                      <g key={b.id}>
                        {isActive && (
                          <circle cx={b.x} cy={b.y} r="5" fill="none" stroke="#d4a84b" strokeWidth="0.3">
                            <animate attributeName="r" from="5" to="8" dur="1.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite" />
                          </circle>
                        )}
                        <circle
                          cx={b.x}
                          cy={b.y}
                          r={isActive ? 3 : 2}
                          fill={isFrom ? '#2E7D32' : isTo ? '#FF6B35' : '#996600'}
                          stroke={isActive ? '#fff' : 'none'}
                          strokeWidth="0.2"
                        />
                      </g>
                    );
                  })}

                  {/* Route line */}
                  {BUILDINGS_PINS.map((b) => b.id === from || b.id === to) && (() => {
                    const fromB = BUILDINGS_PINS.find((p) => p.id === from);
                    const toB = BUILDINGS_PINS.find((p) => p.id === to);
                    if (!fromB || !toB) return null;
                    const mx = (fromB.x + toB.x) / 2;
                    const my = (fromB.y + toB.y) / 2 - 8;
                    return (
                      <g key="route">
                        <path
                          d={`M ${fromB.x},${fromB.y} Q ${mx},${my} ${toB.x},${toB.y}`}
                          stroke="#d4a84b"
                          strokeWidth="0.5"
                          strokeDasharray="2,1"
                          fill="none"
                        />
                        <circle cx={mx} cy={my} r="1" fill="#d4a84b" />
                      </g>
                    );
                  })()}

                  {/* Compass */}
                  <g transform="translate(92, 92)">
                    <circle r="3" fill="#003366" stroke="#996600" strokeWidth="0.2" />
                    <text y="-1" fontSize="1.8" fill="white" textAnchor="middle">N</text>
                  </g>
                </svg>

                <div className="flex items-center justify-center gap-4 text-xs mt-2">
                  <span className="flex items-center gap-1.5 text-white/70"><span className="w-2 h-2 rounded-full bg-[#2E7D32]" /> From</span>
                  <span className="flex items-center gap-1.5 text-white/70"><span className="w-2 h-2 rounded-full bg-[#FF6B35]" /> To</span>
                </div>
              </div>
            </div>
          </Section>

          {/* Facilities */}
          <Section title={t.campusLive.sections.facilities} icon={<MapPin className="w-5 h-5" />}>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {BUILDINGS_PINS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setActivePin(b.id)}
                  className={`
                    px-3 py-1.5 rounded-full text-xs transition-colors
                    ${activePin === b.id
                      ? 'bg-[#996600] text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'}
                  `}
                >
                  {isZh ? b.name.zh : b.name.en}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activePin && (
                <motion.div
                  key={activePin}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-3"
                >
                  {(FACILITIES_NEAR[activePin] || []).map((f, i) => {
                    const Icon = f.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#996600]/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-[#d4a84b]" />
                        </div>
                        <span className="text-sm text-white/80 truncate">
                          {isZh ? f.label.zh : f.label.en}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </Section>

          {/* App Store Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 md:p-8 border border-white/10 mt-10"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#003366] to-[#1a4d7c]">
                <Accessibility className="w-6 h-6 text-[#d4a84b]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">USTransit + Path Advisor</h3>
                <p className="text-white/60 text-sm">
                  The official HKUST student apps · {isZh ? '支持 VoiceOver 屏幕阅读' : 'VoiceOver supported'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <a
                href="https://apps.apple.com/hk/app/ustransit/id1475481762"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-black hover:bg-white/90 transition-colors"
              >
                <span className="text-xs">Download on</span>
                <span className="font-semibold">App Store</span>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.socif.ustransit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-black border border-white/20 text-white hover:bg-black/80 transition-colors"
              >
                <span className="text-xs">Get it on</span>
                <span className="font-semibold">Google Play</span>
              </a>
              <a
                href="https://itso.hkust.edu.hk/services/general-it-services/looking-for-a-person-or-a-place/path-advisor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-colors"
              >
                <span className="text-xs">Path Advisor</span>
                <span className="font-semibold">Web Version</span>
              </a>
            </div>
            <p className="text-xs text-white/40 mt-4 italic">
              {t.campusLive.notes}
            </p>
          </motion.div>
        </div>
      </div>

      <AIClubBanner />
    </main>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#003366] to-[#1a4d7c] flex items-center justify-center text-[#d4a84b]">
          {icon}
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}
