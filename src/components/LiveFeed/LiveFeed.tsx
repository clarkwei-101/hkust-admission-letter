'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ExternalLink, Loader2, RefreshCw } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

type Category = 'news' | 'events' | 'academic' | 'clubs' | 'admissions';

interface NewsItem {
  title: string;
  summary?: string;
  url: string;
  date?: string;
  dateDetected?: string;
  category?: Category | 'uncategorised';
  source?: string;
  school?: { name: string; nameZh: string; code: string } | null;
}

interface LiveFeedProps {
  category: Category;
  title?: string;
  limit?: number;
  className?: string;
  showCategoryBadge?: boolean;
  emptyMessage?: string;
}

// `<LiveFeed />` is the embedded mini-feed used inside existing content pages
// (welcome, academics, clubs, etc). It pulls from /api/hkust/<category> on
// mount, renders the first N items, and falls back to a clean empty state if
// the crawler hasn't run yet.
export default function LiveFeed({
  category,
  title,
  limit = 4,
  className = '',
  showCategoryBadge = false,
  emptyMessage,
}: LiveFeedProps) {
  const { t, locale } = useI18n();
  const isZh = locale === 'zh';
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/hkust/${category}`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((d) => {
        if (!cancelled) setItems(d.items ?? []);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [category]);

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

  const domainOf = (url?: string) => {
    if (!url) return '';
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <div className={`p-6 rounded-2xl border border-[#996600]/20 bg-[#003366]/10 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Newspaper className="w-4 h-4 text-[#996600]" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#996600]/80">
            {title || t.news.title}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#C0C0C0]/60 text-xs py-6 justify-center">
          <Loader2 className="w-3 h-3 animate-spin" />
          {t.news.loading}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={`p-6 rounded-2xl border border-[#996600]/20 bg-[#003366]/10 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Newspaper className="w-4 h-4 text-[#996600]" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#996600]/80">
            {title || t.news.title}
          </span>
        </div>
        <p className="text-[#C0C0C0]/60 text-xs py-6 text-center">
          {emptyMessage || t.news.empty}
        </p>
      </div>
    );
  }

  const shown = items.slice(0, limit);

  return (
    <div className={`p-5 md:p-6 rounded-2xl border border-[#996600]/25 bg-gradient-to-br from-[#003366]/30 via-[#001a33]/30 to-[#003366]/20 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-[#996600]" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#996600]/80 font-semibold">
            {title || t.news.title}
          </span>
        </div>
        <a
          href="/content/news"
          className="text-[10px] text-[#996600]/70 hover:text-[#d4a84b] inline-flex items-center gap-1"
        >
          {isZh ? '查看全部' : 'View all'}
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>

      <ul className="space-y-3">
        {shown.map((it, idx) => (
          <motion.li
            key={`${it.url}-${idx}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.06 }}
          >
            <a
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block py-2"
            >
              <div className="flex items-start gap-3">
                {showCategoryBadge && it.category && (
                  <span className="flex-shrink-0 inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider bg-[#996600]/20 text-[#d4a84b] border border-[#996600]/30">
                    {(t.news.filters as any)[it.category] || it.category}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium leading-snug group-hover:text-[#d4a84b] transition-colors line-clamp-2">
                    {it.title}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-[#C0C0C0]/60 mt-1">
                    {it.dateDetected && <span>{formatDate(it.dateDetected)}</span>}
                    {it.dateDetected && <span>·</span>}
                    <span className="truncate" title={domainOf(it.source || it.url)}>
                      {domainOf(it.source || it.url)}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3 h-3 text-[#996600]/40 group-hover:text-[#d4a84b] flex-shrink-0 mt-1" />
              </div>
            </a>
          </motion.li>
        ))}
      </ul>

      <div className="mt-4 pt-3 border-t border-[#996600]/15 flex items-center gap-1.5 text-[10px] text-[#996600]/60">
        <RefreshCw className="w-2.5 h-2.5" />
        {t.news.externalLinkWarning}
      </div>
    </div>
  );
}
