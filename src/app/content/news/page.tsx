'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation/Navigation';
import Disclaimer from '@/components/Disclaimer/Disclaimer';
import { useI18n } from '@/lib/i18n';
import {
  Newspaper,
  Calendar,
  GraduationCap,
  Users,
  School,
  ExternalLink,
  Loader2,
  RefreshCw,
  AlertCircle,
  Filter,
} from 'lucide-react';

type Category = 'news' | 'events' | 'academic' | 'clubs' | 'admissions' | 'uncategorised';

interface School {
  name: string;
  nameZh: string;
  code: string;
}

interface NewsItem {
  title: string;
  summary?: string;
  url: string;
  date?: string;
  dateDetected?: string;
  category?: Category;
  source?: string;
  school?: School | null;
  scrapedAt?: string;
}

interface Snapshot {
  scrapedAt?: string;
  totalItems: number;
  items: NewsItem[];
}

const CATEGORY_ICON: Record<Category, any> = {
  news: Newspaper,
  events: Calendar,
  academic: GraduationCap,
  clubs: Users,
  admissions: School,
  uncategorised: Filter,
};

const CATEGORY_COLOUR: Record<Category, string> = {
  news: '#996600',
  events: '#d4a84b',
  academic: '#3B82F6',
  clubs: '#10B981',
  admissions: '#7B2FFF',
  uncategorised: '#64748B',
};

const CATEGORIES: Category[] = ['news', 'events', 'academic', 'clubs', 'admissions', 'uncategorised'];

export default function NewsPage() {
  const { t, locale } = useI18n();
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all');

  const isZh = locale === 'zh';

  useEffect(() => {
    let cancelled = false;
    const fetchOnce = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/hkust/news', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // Fetch all categories too — the news route only returns news, but
        // for the filter UI we want every category. The /api/hkust/all
        // endpoint isn't exposed; instead, fetch each category in parallel.
        const cats = await Promise.all(
          (['events', 'academic', 'clubs', 'admissions'] as Category[]).map(async (c) => {
            try {
              const r = await fetch(`/api/hkust/${c}`, { cache: 'no-store' });
              if (!r.ok) return [];
              const d = await r.json();
              return d.items ?? [];
            } catch {
              return [];
            }
          })
        );
        const allItems: NewsItem[] = [
          ...((data.items ?? []) as NewsItem[]),
          ...cats.flat(),
        ];
        if (cancelled) return;
        setSnapshot({
          scrapedAt: data.scrapedAt,
          totalItems: allItems.length,
          items: allItems,
        });
        setError(null);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message || 'fetch failed');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchOnce();
    // Refresh every 5 minutes
    const interval = setInterval(fetchOnce, 5 * 60 * 1000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const filteredItems = useMemo(() => {
    const items = snapshot?.items ?? [];
    const sorted = [...items].sort((a, b) => {
      const da = a.dateDetected || a.date || a.scrapedAt || '';
      const db = b.dateDetected || b.date || b.scrapedAt || '';
      return db.localeCompare(da);
    });
    if (activeFilter === 'all') return sorted;
    return sorted.filter((it) => it.category === activeFilter);
  }, [snapshot, activeFilter]);

  const formatDate = (raw?: string) => {
    if (!raw) return '';
    try {
      const d = new Date(raw);
      if (Number.isNaN(d.getTime())) return raw;
      return d.toLocaleDateString(isZh ? 'zh-HK' : 'en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return raw;
    }
  };

  const formatRelative = (raw?: string) => {
    if (!raw) return '';
    try {
      const d = new Date(raw);
      if (Number.isNaN(d.getTime())) return '';
      const diffMs = Date.now() - d.getTime();
      const diffH = Math.round(diffMs / (1000 * 60 * 60));
      if (diffH < 1) return isZh ? '刚刚' : 'just now';
      if (diffH < 24) return isZh ? `${diffH} 小时前` : `${diffH}h ago`;
      const diffD = Math.round(diffH / 24);
      if (diffD < 7) return isZh ? `${diffD} 天前` : `${diffD}d ago`;
      return formatDate(raw);
    } catch {
      return '';
    }
  };

  const sourceDomain = (url?: string) => {
    if (!url) return '';
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return '';
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation showBackButton title={isZh ? '港科大最新动态' : 'HKUST Live Feed'} />

      <div className="relative z-10 pt-24 md:pt-32 pb-20 px-4 md:px-6">
        <div className="container-hkust mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#003366] to-[#1a4d7c] rounded-full flex items-center justify-center border-4 border-[#996600]/30 shadow-2xl">
                <Newspaper className="w-12 h-12 text-[#996600]" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
              <span className="text-gradient-gold">{t.news.title}</span>
            </h1>
            <p className="text-base md:text-lg text-[#C0C0C0] max-w-2xl mx-auto">
              {t.news.subtitle}
            </p>
            {snapshot?.scrapedAt && (
              <p className="text-xs text-[#996600]/70 mt-4 inline-flex items-center gap-1.5">
                <RefreshCw className="w-3 h-3" />
                {t.news.lastUpdated}: {formatRelative(snapshot.scrapedAt)}
                <span className="text-[#996600]/50">({formatDate(snapshot.scrapedAt)})</span>
              </p>
            )}
          </motion.div>

          {/* Disclaimer banner — required for legal clarity */}
          <div className="mb-8">
            <Disclaimer variant="banner" />
          </div>

          {/* Filter chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-8"
          >
            <FilterButton
              label={isZh ? '全部' : 'All'}
              active={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
              count={snapshot?.items.length ?? 0}
            />
            {CATEGORIES.map((c) => {
              const count = (snapshot?.items ?? []).filter((it) => it.category === c).length;
              if (count === 0) return null;
              const Icon = CATEGORY_ICON[c];
              const label = (t.news.filters as any)[c] || c;
              return (
                <FilterButton
                  key={c}
                  label={label}
                  icon={Icon}
                  active={activeFilter === c}
                  onClick={() => setActiveFilter(c)}
                  count={count}
                  color={CATEGORY_COLOUR[c]}
                />
              );
            })}
          </motion.div>

          {/* Loading / Error states */}
          {loading && !snapshot && (
            <div className="text-center py-20">
              <Loader2 className="w-10 h-10 text-[#996600] mx-auto mb-4 animate-spin" />
              <p className="text-[#C0C0C0]">{t.news.loading}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 text-amber-300 text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{t.news.error}</span>
            </div>
          )}

          {snapshot && filteredItems.length === 0 && (
            <div className="text-center py-20 text-[#C0C0C0]">{t.news.empty}</div>
          )}

          {/* Item cards */}
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item, idx) => {
                const cat = (item.category || 'uncategorised') as Category;
                const Icon = CATEGORY_ICON[cat];
                const colour = CATEGORY_COLOUR[cat];
                return (
                  <motion.a
                    key={`${item.url}-${idx}`}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(idx * 0.04, 0.4) }}
                    whileHover={{ y: -3 }}
                    className="block p-5 rounded-2xl border border-[#996600]/20 bg-[#003366]/20 hover:border-[#996600]/50 hover:bg-[#003366]/35 transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase"
                        style={{
                          backgroundColor: `${colour}20`,
                          color: colour,
                          border: `1px solid ${colour}40`,
                        }}
                      >
                        <Icon className="w-3 h-3" />
                        {(t.news.filters as any)[cat] || cat}
                      </span>
                      {item.school && (
                        <span className="text-[10px] text-[#996600]/70 uppercase tracking-wider">
                          {isZh ? item.school.nameZh : item.school.name}
                        </span>
                      )}
                      {item.dateDetected && (
                        <span className="text-[10px] text-[#C0C0C0]/70 ml-auto">
                          {formatDate(item.dateDetected)}
                        </span>
                      )}
                    </div>

                    <h3 className="text-white font-semibold text-base md:text-lg leading-snug mb-2 group-hover:text-[#d4a84b] transition-colors">
                      {item.title}
                    </h3>

                    {item.summary && (
                      <p className="text-[#C0C0C0]/80 text-xs md:text-sm leading-relaxed line-clamp-3 mb-3">
                        {item.summary}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-[10px] text-[#996600]/70 pt-2 border-t border-[#996600]/10">
                      <span className="truncate max-w-[60%]" title={t.news.sourceLabel}>
                        {t.news.sourceLabel}: {sourceDomain(item.source || item.url)}
                      </span>
                      <span className="inline-flex items-center gap-1 flex-shrink-0">
                        {t.news.viewOriginal}
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </AnimatePresence>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#996600]/50 to-transparent mx-auto mb-4" />
            <p className="text-[#C0C0C0]/60 text-sm">{t.hub.footer}</p>
            <p className="text-[#996600]/60 text-xs mt-2">{t.hub.footerCredit}</p>
          </motion.footer>
        </div>
      </div>
    </main>
  );
}

function FilterButton({
  label,
  icon: Icon,
  active,
  onClick,
  count,
  color,
}: {
  label: string;
  icon?: any;
  active: boolean;
  onClick: () => void;
  count: number;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all border ${
        active
          ? 'bg-[#996600]/30 border-[#996600] text-[#d4a84b]'
          : 'bg-[#003366]/30 border-[#996600]/20 text-[#C0C0C0] hover:border-[#996600]/50 hover:text-white'
      }`}
    >
      {Icon && <Icon className="w-3 h-3" style={{ color: active ? color : undefined }} />}
      <span>{label}</span>
      <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${active ? 'bg-[#996600]/50 text-white' : 'bg-[#003366]/60 text-[#C0C0C0]/70'}`}>
        {count}
      </span>
    </button>
  );
}
