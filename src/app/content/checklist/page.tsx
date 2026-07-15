'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation/Navigation';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import {
  ClipboardList, RotateCcw, Sparkles, CheckCircle2, Circle, Plane, GraduationCap,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const STORAGE_KEY = 'hkust-admission-checklist';

type Category = 'before' | 'arrival' | 'firstWeek';

interface ChecklistItem {
  id: string;
  category: Category;
  type?: 'redirect';
  href?: string;
}

const ITEMS: ChecklistItem[] = [
  { id: 'deposit', category: 'before' },
  { id: 'visa', category: 'before' },
  { id: 'insurance', category: 'before' },
  { id: 'registration', category: 'before' },
  { id: 'housing', category: 'before' },
  { id: 'mobile', category: 'arrival' },
  { id: 'octopus', category: 'arrival' },
  { id: 'bank', category: 'arrival' },
  { id: 'orientation', category: 'firstWeek' },
  { id: 'advising', category: 'firstWeek' },
  { id: 'canvas', category: 'firstWeek' },
  { id: 'clubFair', category: 'firstWeek' },
];

const CATEGORIES: { key: Category; Icon: any }[] = [
  { key: 'before', Icon: ClipboardList },
  { key: 'arrival', Icon: Plane },
  { key: 'firstWeek', Icon: GraduationCap },
];

export default function ChecklistPage() {
  const { t, locale } = useI18n();
  const isZh = locale === 'zh';

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setChecked(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      /* ignore */
    }
  }, [checked, mounted]);

  const total = ITEMS.length;
  const done = Object.values(checked).filter(Boolean).length;
  const percentage = Math.round((done / total) * 100);

  const toggle = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const reset = () => {
    if (window.confirm(t.checklist.resetConfirm)) setChecked({});
  };

  const dict = t.checklist;

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation showBackButton title={isZh ? '入学清单' : 'Checklist'} />

      <div className="relative z-10 pt-24 md:pt-32 pb-20 px-4 md:px-6">
        <div className="container-hkust mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#003366] to-[#1a4d7c] rounded-full flex items-center justify-center border-4 border-[#996600]/30 shadow-2xl">
                <ClipboardList className="w-12 h-12 text-[#996600]" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-gradient-gold">{dict.title}</span>
            </h1>
            <p className="text-xl text-[#C0C0C0]">{dict.subtitle}</p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-[#996600] to-transparent mx-auto" />
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#996600] via-[#003366] to-[#996600]" />
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="text-[#C0C0C0] text-sm mb-1">{dict.progressLabel}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">{percentage}</span>
                    <span className="text-2xl text-[#996600]">%</span>
                  </div>
                  <p className="text-[#C0C0C0] text-sm mt-1">
                    {dict.completed}: <span className="text-[#996600] font-bold">{done}</span> / {total}
                  </p>
                </div>
                <div className="flex-1 max-w-md">
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#996600] to-[#d4a84b]"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  {percentage === 100 ? (
                    <div className="mt-3 flex items-center gap-2 text-[#996600]">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-medium">{dict.completedAll}</span>
                    </div>
                  ) : (
                    <p className="text-xs text-white/40 mt-2">{dict.tipHint}</p>
                  )}
                </div>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm transition-colors self-start"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t.common.reset}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Categories */}
          {CATEGORIES.map((cat, catIndex) => {
            const items = ITEMS.filter((i) => i.category === cat.key);
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + catIndex * 0.1 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <cat.Icon className="w-5 h-5 text-[#996600]" />
                  <h2 className="text-xl font-bold text-white">{dict.categories[cat.key]}</h2>
                </div>

                <div className="space-y-3">
                  <AnimatePresence>
                    {items.map((item, index) => {
                      const data = (dict.items as Record<string, { title: string; body: string; deadline?: string }>)[item.id];
                      const isChecked = !!checked[item.id];
                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 4 }}
                          onClick={() => toggle(item.id)}
                          className={`
                            cursor-pointer glass rounded-xl p-4 border transition-all
                            ${isChecked
                              ? 'border-[#996600]/50 bg-gradient-to-r from-[#996600]/10 to-transparent'
                              : 'border-white/10 hover:border-[#996600]/30'}
                          `}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-0.5">
                              {isChecked ? (
                                <CheckCircle2 className="w-6 h-6 text-[#996600]" />
                              ) : (
                                <Circle className="w-6 h-6 text-white/40" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3
                                className={`font-semibold transition-colors ${
                                  isChecked ? 'text-white/50 line-through' : 'text-white'
                                }`}
                              >
                                {data.title}
                              </h3>
                              <p className={`text-sm mt-1 ${isChecked ? 'text-white/40' : 'text-white/70'}`}>
                                {data.body}
                              </p>
                              {data.deadline && (
                                <p className="text-xs text-[#996600] mt-1.5 inline-flex items-center gap-1">
                                  <span className="opacity-60">⏰</span> {data.deadline}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}

          <p className="mt-10 text-center text-xs text-white/40">{dict.footer}</p>
        </div>
      </div>

      <AIClubBanner />
    </main>
  );
}
