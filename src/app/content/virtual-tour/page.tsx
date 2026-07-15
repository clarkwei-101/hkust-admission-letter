'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Building2, Compass, MapPin, X, ExternalLink } from 'lucide-react';
import Navigation from '@/components/Navigation/Navigation';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import { useI18n } from '@/lib/i18n';

interface Building {
  id: string;
  x: number;
  y: number;
  name: { en: string; zh: string };
  description: { en: string; zh: string };
  fact: { en: string; zh: string };
  category: 'academic' | 'life' | 'landscape';
}

const BUILDINGS: Building[] = [
  {
    id: 'lib',
    x: 50, y: 38,
    name: { en: 'The Library', zh: '李兆基图书馆' },
    description: {
      en: 'A 24/7 waterfront study hub overlooking the South China Sea, ranked among Asia\'s most research-rich libraries.',
      zh: '24/7 开放的海景学习空间，全亚洲研究资源最丰富的图书馆之一。',
    },
    fact: { en: 'Stacks 7 storeys high · 600+ databases · 24/7 access.', zh: '7 层书库 · 600+ 数据库 · 全年 24 小时开放。' },
    category: 'academic',
  },
  {
    id: 'ac',
    x: 35, y: 45,
    name: { en: 'Academic Building', zh: '学术楼' },
    description: {
      en: 'The heartbeat of teaching — lecture theatres, labs, and the Atrium with golden sunlight.',
      zh: '教学的核心地带 —— 大讲堂、实验室，以及洒满金色阳光的中庭。',
    },
    fact: { en: 'Hosts 90% of lectures, with the LG7 sea-view balcony.', zh: '90% 课程在此进行，LG7 拥有无敌海景露台。' },
    category: 'academic',
  },
  {
    id: 'ssc',
    x: 60, y: 55,
    name: { en: 'Student Centre', zh: '学生中心' },
    description: {
      en: 'Canteens from LG1 to LG7, the SU office, and the Sea-view Café — the social hub of campus.',
      zh: 'LG1 至 LG7 食堂、学生会办公室、海景咖啡厅 —— 校园社交核心。',
    },
    fact: { en: '7 dining levels · open until late on weekdays.', zh: '7 层餐厅 · 工作日营业至深夜。' },
    category: 'life',
  },
  {
    id: 'sro',
    x: 22, y: 60,
    name: { en: 'S.H. Ho College', zh: '何善衡书院' },
    description: {
      en: 'One of four residential colleges blending living and learning right above Clear Water Bay.',
      zh: '四间书院之一，居住与学习融为一体，直面清水湾。',
    },
    fact: { en: 'Home to ~600 undergraduates from all schools.', zh: '容纳约 600 名来自不同学院的本科生。' },
    category: 'life',
  },
  {
    id: 'podium',
    x: 50, y: 70,
    name: { en: 'The Podium', zh: '中央平台' },
    description: {
      en: 'The Atrium — a sunken concourse connecting LG1–LG7, accessible by 14 escalators.',
      zh: '中庭下沉式广场，连通 LG1–LG7，共由 14 条自动扶梯串联。',
    },
    fact: { en: 'Sea-facing steps — the most instagrammed spot on campus.', zh: '面海阶梯 —— 全校园最热门的拍照地点。' },
    category: 'landscape',
  },
  {
    id: 'sai',
    x: 80, y: 25,
    name: { en: 'Lookout Pavilion', zh: '观景亭' },
    description: {
      en: 'Where the bay meets the sky — panoramic views from Hang Hau to Port Shelter.',
      zh: '海湾与天空交汇之处，可远眺坑口至西贡的壮丽海景。',
    },
    fact: { en: 'A 5-minute walk from the Library — best at sunrise.', zh: '距图书馆步行 5 分钟，日出时分最壮观。' },
    category: 'landscape',
  },
  {
    id: 'ias',
    x: 18, y: 50,
    name: { en: 'Jockey Club IAS', zh: '赛马会大气研究中心' },
    description: {
      en: 'A world-class atmospheric research facility on the cliff\'s edge.',
      zh: '坐落在悬崖边缘的世界级大气科学研究设施。',
    },
    fact: { en: 'Pioneering typhoon and climate research since 2014.', zh: '自 2014 年起引领台风与气候研究。' },
    category: 'academic',
  },
  {
    id: 'shaw',
    x: 68, y: 50,
    name: { en: 'Shaw Auditorium', zh: '邵逸夫堂' },
    description: {
      en: 'Auditorium and concert hall for convocations, concerts and talks.',
      zh: '用于毕业典礼、音乐会和讲座的礼堂。',
    },
    fact: { en: 'Seats over 1,300 people.', zh: '可容纳超过 1,300 人。' },
    category: 'life',
  },
];

const CATEGORY_COLORS: Record<Building['category'], string> = {
  academic: '#003366',
  life: '#996600',
  landscape: '#2E7D32',
};

export default function VirtualTourPage() {
  const { t, locale } = useI18n();
  const [selected, setSelected] = useState<Building | null>(null);

  const isZh = locale === 'zh';

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation showBackButton title="Virtual Tour" />

      <div className="relative z-10 pt-24 md:pt-32 pb-20 px-4 md:px-6">
        <div className="container-hkust mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-[#996600]/15 border border-[#996600]/30 text-[#d4a84b] text-xs uppercase tracking-[0.3em]">
              <MapPin className="w-3 h-3 inline-block mr-1 -mt-0.5" />
              Google Maps · Campus
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              <span className="text-gradient-gold">{t.virtualTour.title}</span>
            </h1>
            <p className="text-[#C0C0C0] text-base md:text-lg max-w-2xl mx-auto">
              {t.virtualTour.subtitle}
            </p>
            <p className="text-[#C0C0C0]/70 text-sm max-w-2xl mx-auto mt-2">
              {t.virtualTour.intro}
            </p>
          </motion.div>

          {/* Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl overflow-hidden border border-[#996600]/20 mb-10"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Compass className="w-4 h-4 text-[#996600]" />
                <span>{t.virtualTour.liveMapTitle}</span>
                <span className="text-white/40 text-xs">· Hong Kong University of Science and Technology</span>
              </div>
              <a
                href="https://www.google.com/maps/place/Hong+Kong+University+of+Science+and+Technology+(HKUST)/@22.2525,114.2145,15z/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#C0C0C0] hover:text-white transition-colors"
              >
                {t.virtualTour.openGoogleMaps}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="relative w-full h-[380px] md:h-[460px]">
              <iframe
                title="HKUST Campus Map"
                src="https://maps.google.com/maps?q=Hong%20Kong%20University%20of%20Science%20and%20Technology&t=m&z=15.5&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.2] contrast-110"
              />
              <div className="pointer-events-none absolute bottom-3 right-3 px-3 py-1.5 rounded-md bg-black/70 text-white/80 text-xs backdrop-blur">
                {t.virtualTour.liveMapCaption}
              </div>
            </div>
          </motion.div>

          {/* Curated buildings title */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            {t.virtualTour.buildingsTitle}
          </h2>

          {/* Curated map (illustrative 2D) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-4 md:p-6 border border-[#996600]/20 mb-10 relative"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-auto max-h-[480px]"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="bayGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0a4a6b" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#082030" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1a3a5c" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#0d1f3c" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* Background land */}
              <rect x="0" y="0" width="100" height="100" fill="url(#landGradient)" />

              {/* Coastline */}
              <path
                d="M 0,0 Q 30,15 50,30 Q 70,40 100,40 L 100,0 L 0,0 Z"
                fill="url(#bayGradient)"
                opacity="0.6"
              />
              <path
                d="M 0,0 Q 30,15 50,30 Q 70,40 100,40"
                fill="none"
                stroke="#C0C0C0"
                strokeWidth="0.1"
                strokeDasharray="0.5,0.5"
              />

              {/* Roads (illustrative) */}
              <path d="M 10,55 L 90,55" stroke="#996600" strokeWidth="0.2" strokeDasharray="1,1" opacity="0.5" />
              <path d="M 50,25 L 50,90" stroke="#996600" strokeWidth="0.2" strokeDasharray="1,1" opacity="0.5" />
              <path d="M 18,50 Q 35,60 50,70 Q 65,80 82,52" stroke="#996600" strokeWidth="0.15" strokeDasharray="1,1" opacity="0.3" />

              {/* Selected building highlight */}
              {selected && (
                <circle
                  cx={selected.x}
                  cy={selected.y}
                  r="3"
                  fill="none"
                  stroke="#d4a84b"
                  strokeWidth="0.2"
                  opacity="0.8"
                >
                  <animate attributeName="r" from="3" to="6" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Hotspots */}
              {BUILDINGS.map((b) => {
                const isSelected = selected?.id === b.id;
                return (
                  <g
                    key={b.id}
                    onClick={() => setSelected(b)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Pulsing ring */}
                    <circle cx={b.x} cy={b.y} r="1.5" fill={CATEGORY_COLORS[b.category]} opacity={0.3 + (isSelected ? 0.5 : 0)} />
                    <circle
                      cx={b.x}
                      cy={b.y}
                      r={isSelected ? 1.5 : 1.2}
                      fill={CATEGORY_COLORS[b.category]}
                    />
                    <text
                      x={b.x}
                      y={b.y - 2.5}
                      fill="white"
                      fontSize="2"
                      textAnchor="middle"
                      className="pointer-events-none font-semibold"
                      style={{ paintOrder: 'stroke', stroke: '#000', strokeWidth: 0.5 }}
                    >
                      {isZh ? b.name.zh : b.name.en}
                    </text>
                  </g>
                );
              })}

              {/* Compass */}
              <g transform="translate(90, 90)">
                <circle cx="0" cy="0" r="3" fill="#003366" stroke="#996600" strokeWidth="0.2" />
                <text x="0" y="-1.2" fill="white" fontSize="1.5" textAnchor="middle">N</text>
                <line x1="0" y1="-2" x2="0" y2="1" stroke="#d4a84b" strokeWidth="0.2" />
              </g>
            </svg>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 flex-wrap mt-2 text-xs">
              {(['academic', 'life', 'landscape'] as const).map((c) => (
                <div key={c} className="flex items-center gap-1.5 text-white/70">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: CATEGORY_COLORS[c] }} />
                  <span>
                    {c === 'academic' && (isZh ? '学术' : 'Academic')}
                    {c === 'life' && (isZh ? '生活' : 'Life')}
                    {c === 'landscape' && (isZh ? '景观' : 'Landscape')}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Selected building modal */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                onClick={() => setSelected(null)}
              >
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  onClick={(e) => e.stopPropagation()}
                  className="glass rounded-2xl p-6 md:p-8 max-w-lg w-full border border-[#996600]/30 relative"
                >
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/10 text-white/70"
                    aria-label={t.virtualTour.close}
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${CATEGORY_COLORS[selected.category]}40` }}
                  >
                    <Building2 className="w-6 h-6" style={{ color: CATEGORY_COLORS[selected.category] }} />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1">{isZh ? selected.name.zh : selected.name.en}</h3>
                  <p className="text-sm text-white/60 mb-4">{isZh ? selected.name.en : selected.name.zh}</p>

                  <p className="text-white/80 leading-relaxed mb-4">
                    {isZh ? selected.description.zh : selected.description.en}
                  </p>

                  <div className="rounded-xl bg-[#996600]/10 border border-[#996600]/30 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#d4a84b] mb-1">
                      {t.virtualTour.didYouKnow}
                    </p>
                    <p className="text-white/80 text-sm">
                      {isZh ? selected.fact.zh : selected.fact.en}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Building grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {BUILDINGS.map((b, i) => (
              <motion.button
                key={b.id}
                onClick={() => setSelected(b)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                whileHover={{ y: -4 }}
                className="text-left glass rounded-2xl p-5 border border-[#996600]/20 hover:border-[#996600]/50 transition-all group"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${CATEGORY_COLORS[b.category]}40` }}
                  >
                    <Building2 className="w-5 h-5" style={{ color: CATEGORY_COLORS[b.category] }} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-white truncate">
                      {isZh ? b.name.zh : b.name.en}
                    </h4>
                    <p className="text-xs text-white/50">{isZh ? b.name.en : b.name.zh}</p>
                  </div>
                </div>
                <p className="text-sm text-white/70 leading-relaxed line-clamp-2">
                  {isZh ? b.description.zh : b.description.en}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AIClubBanner />
    </main>
  );
}
