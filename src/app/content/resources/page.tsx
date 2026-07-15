'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation/Navigation';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import {
  Compass, ExternalLink, Book, GraduationCap, Utensils, Bus, Dumbbell, HeartPulse, Briefcase, Library as LibIcon,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';

type ResourceKey = 'nso' | 'portal' | 'canvas' | 'library' | 'dining' | 'transit' | 'sports' | 'health' | 'career';

interface ResourceDef {
  key: ResourceKey;
  url: string;
  Icon: any;
  accent: string;
  screenshotType: 'portal' | 'canvas' | 'library' | 'dining' | 'bus' | 'fitness' | 'health' | 'career' | 'transit';
}

const RESOURCES: ResourceDef[] = [
  { key: 'nso', url: 'https://nso.hkust.edu.hk/', Icon: Compass, accent: '#003366', screenshotType: 'portal' },
  { key: 'portal', url: 'https://registry.hkust.edu.hk/resource-library/student-portal', Icon: GraduationCap, accent: '#996600', screenshotType: 'portal' },
  { key: 'canvas', url: 'https://canvas.hkust.edu.hk/', Icon: GraduationCap, accent: '#E01F3D', screenshotType: 'canvas' },
  { key: 'library', url: 'https://library.hkust.edu.hk/', Icon: LibIcon, accent: '#2E7D32', screenshotType: 'library' },
  { key: 'dining', url: 'https://dining.hkust.edu.hk/', Icon: Utensils, accent: '#FF6B35', screenshotType: 'dining' },
  { key: 'transit', url: '/content/campus-live', Icon: Bus, accent: '#7B2FFF', screenshotType: 'transit' },
  { key: 'sports', url: 'https://sports.hkust.edu.hk/', Icon: Dumbbell, accent: '#FF9800', screenshotType: 'fitness' },
  { key: 'health', url: 'https://counseling.hkust.edu.hk/', Icon: HeartPulse, accent: '#4a7eb5', screenshotType: 'health' },
  { key: 'career', url: 'https://career.hkust.edu.hk/', Icon: Briefcase, accent: '#996600', screenshotType: 'career' },
];

export default function ResourcesPage() {
  const { t, locale } = useI18n();
  const isZh = locale === 'zh';
  const dict = t.resources;

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation showBackButton title={isZh ? '资源中心' : 'Resources'} />

      <div className="relative z-10 pt-24 md:pt-32 pb-20 px-4 md:px-6">
        <div className="container-hkust mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-[#996600]/15 border border-[#996600]/30 text-[#d4a84b] text-xs uppercase tracking-[0.3em]">
              HKUST Official
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              <span className="text-gradient-gold">{dict.title}</span>
            </h1>
            <p className="text-[#C0C0C0] text-base md:text-lg">{dict.subtitle}</p>
            <p className="text-[#C0C0C0]/70 text-sm max-w-2xl mx-auto mt-2">
              {dict.intro}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESOURCES.map((r, i) => {
              const data = dict.items[r.key];
              return (
                <motion.a
                  key={r.key}
                  href={r.url}
                  target={r.url.startsWith('http') ? '_blank' : undefined}
                  rel={r.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="block glass rounded-2xl overflow-hidden border border-white/5 hover:border-[#996600]/40 transition-colors group"
                >
                  {/* Mock screenshot */}
                  <div
                    className="relative h-40 overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${r.accent}30 0%, ${r.accent}10 100%)` }}
                  >
                    <MockScreenshot type={r.screenshotType} accent={r.accent} />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/40 text-white text-[10px] uppercase tracking-widest backdrop-blur">
                      {dict.screenshotsTag}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-white truncate">
                          {isZh ? data.title : data.titleEn.split(' · ')[0]}
                        </h3>
                        <p className="text-xs text-white/50 truncate">{isZh ? data.titleEn : data.title}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-[#996600] transition-colors flex-shrink-0" />
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed mb-3">{data.description}</p>

                    <div className="border-t border-white/10 pt-3">
                      <p className="text-[10px] uppercase tracking-widest text-[#d4a84b] mb-2">
                        {dict.screenshotNote}
                      </p>
                      <ul className="space-y-1">
                        {data.highlights.map((h: string, hi: number) => (
                          <li key={hi} className="flex items-start gap-1.5 text-xs text-white/70">
                            <span className="text-[#996600]">›</span>
                            <span className="line-clamp-1">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 glass rounded-2xl p-8 border border-[#996600]/30 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-3">{dict.ctaTitle}</h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">{dict.ctaBody}</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="https://www.hkust.edu.hk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#996600] to-[#d4a84b] text-white font-semibold hover:shadow-lg hover:shadow-[#996600]/30 transition-shadow"
              >
                {dict.ctaPrimary} <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://www.hkust.edu.hk/about/contact-us"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-[#996600]/40 transition-colors"
              >
                {dict.ctaSecondary}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <AIClubBanner />
    </main>
  );
}

/** Reusable mock UI per type. */
function MockScreenshot({ type, accent }: { type: string; accent: string }) {
  if (type === 'canvas') {
    return (
      <div className="absolute inset-2 rounded-lg bg-[#f9fafb] overflow-hidden">
        <div className="h-6 bg-[#E01F3D] flex items-center px-2 gap-1">
          <div className="w-2 h-2 rounded-full bg-white/80" />
          <span className="text-white text-[8px] font-bold">Canvas</span>
        </div>
        <div className="grid grid-cols-3 gap-1 p-1.5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-6 rounded bg-white border border-gray-200 shadow-sm" />
          ))}
        </div>
        <div className="px-2 mt-1 text-[7px] text-gray-500">CS101 · ECON220 · MATH300</div>
      </div>
    );
  }
  if (type === 'library') {
    return (
      <div className="absolute inset-2 rounded-lg bg-[#fff] overflow-hidden">
        <div className="h-5 bg-[#2E7D32] flex items-center px-2 gap-1">
          <div className="w-2 h-2 rounded-full bg-white/80" />
        </div>
        <div className="grid grid-cols-4 gap-1 p-1.5">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="h-4 rounded bg-blue-100" style={{ width: '100%' }} />
          ))}
        </div>
        <div className="px-2 mt-0.5 text-[7px] text-gray-500">10,243 results</div>
      </div>
    );
  }
  if (type === 'bus') {
    return (
      <div className="absolute inset-2 rounded-lg bg-[#0f1a30] overflow-hidden p-1.5">
        <div className="flex items-center justify-between text-[8px] text-white mb-1">
          <span>11</span><span>11M</span><span>11S</span><span>12</span>
        </div>
        <div className="space-y-1">
          {[11, 4, 7].map((min, i) => (
            <div key={i} className="bg-white/10 rounded p-1 text-[7px] text-white flex justify-between">
              <span>Route {11 + i}</span>
              <span>{min} min</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (type === 'transit') {
    return (
      <div className="absolute inset-2 rounded-lg overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${accent}40, ${accent}10)` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-1">
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div className="text-[8px] text-white">Live transit</div>
          </div>
        </div>
      </div>
    );
  }
  if (type === 'dining') {
    return (
      <div className="absolute inset-2 rounded-lg bg-white overflow-hidden">
        <div className="h-5 bg-[#FF6B35] flex items-center px-1.5">
          <span className="text-white text-[8px] font-bold">LG1</span>
        </div>
        <div className="p-1.5 space-y-1">
          {['Chicken Rice', 'Cantonese', 'Salad'].map((d) => (
            <div key={d} className="bg-gray-100 rounded p-1 text-[7px]">{d}</div>
          ))}
        </div>
      </div>
    );
  }
  if (type === 'fitness') {
    return (
      <div className="absolute inset-2 rounded-lg bg-[#fff8e7] overflow-hidden">
        <div className="h-5 bg-[#FF9800] flex items-center px-1.5">
          <span className="text-white text-[8px] font-bold">Pool</span>
        </div>
        <div className="p-2 grid grid-cols-3 gap-1">
          <div className="aspect-square bg-blue-300 rounded" />
          <div className="aspect-square bg-blue-200 rounded" />
          <div className="aspect-square bg-blue-300 rounded" />
        </div>
      </div>
    );
  }
  if (type === 'health') {
    return (
      <div className="absolute inset-2 rounded-lg bg-[#f3f8fa] overflow-hidden">
        <div className="h-5 bg-[#4a7eb5] flex items-center px-1.5">
          <span className="text-white text-[8px] font-bold">Counsel</span>
        </div>
        <div className="p-2 space-y-1">
          <div className="bg-white rounded p-1 text-[7px]">Book session</div>
          <div className="bg-white rounded p-1 text-[7px]">Hotline 24/7</div>
          <div className="bg-white rounded p-1 text-[7px]">Self-care</div>
        </div>
      </div>
    );
  }
  if (type === 'career') {
    return (
      <div className="absolute inset-2 rounded-lg bg-white overflow-hidden">
        <div className="h-5 bg-[#996600] flex items-center px-1.5">
          <span className="text-white text-[8px] font-bold">Jobs</span>
        </div>
        <div className="p-1.5 space-y-1">
          {['Goldman Sachs', 'McKinsey', 'Tencent'].map((c) => (
            <div key={c} className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-gray-200" />
              <span className="text-[7px]">{c}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // portal default
  return (
    <div className="absolute inset-2 rounded-lg bg-white overflow-hidden">
      <div className="h-5 flex items-center px-1.5 gap-1" style={{ background: accent }}>
        <div className="w-2 h-2 rounded-full bg-white/70" />
        <span className="text-white text-[8px] font-bold">{accent === '#003366' ? 'NSO' : 'Portal'}</span>
      </div>
      <div className="p-1.5 space-y-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-3 bg-gray-100 rounded" style={{ width: `${60 + i * 10}%` }} />
        ))}
        <div className="h-3 rounded mt-1 w-1/2" style={{ background: accent }} />
      </div>
    </div>
  );
}
