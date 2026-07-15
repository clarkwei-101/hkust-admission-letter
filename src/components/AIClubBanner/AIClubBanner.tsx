'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronDown, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';
import { AI_CLUB_INFO } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';

export default function AIClubBanner() {
  const { t, locale } = useI18n();
  const isZh = locale === 'zh';
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isExpanded) return;
    const timer = setTimeout(() => {
      setIsExpanded(false);
    }, 15000);
    return () => clearTimeout(timer);
  }, [isExpanded]);

  if (!isMounted) return null;

  const ctaLabel = isZh ? '了解更多' : 'Learn More';
  const exploreLabel = isZh ? '探索' : 'Explore';
  const tagline = isZh ? '香港科技大学官方科技社团' : 'HKUST Official Tech Society';
  const descText = isZh ? '探索AI与科幻的交汇点 | 让创意无限延伸' : 'Where AI meets imagination — building the future, one project at a time.';

  if (!isVisible) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-xl overflow-hidden shadow-xl"
      >
        <img
          src="/cyber-foundation-icon.png"
          alt="AI X SCI-FI Club"
          className="w-full h-full object-cover"
        />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-6 right-6 z-50 max-w-sm"
    >
      <div className="glass-dark rounded-2xl overflow-hidden shadow-2xl border border-[#996600]/20">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#003366]/50 to-transparent border-b border-[#996600]/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg bg-[#001a33]">
                <img
                  src="/cyber-foundation-icon.png"
                  alt="AI X SCI-FI Club"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-[10px] text-[#996600] tracking-[0.2em] uppercase font-semibold">
                {AI_CLUB_INFO.subtitle}
              </p>
              <h3 className="text-sm font-bold text-white leading-tight">
                {AI_CLUB_INFO.title}
              </h3>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-[#996600]"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsVisible(false)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-[#996600]"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 space-y-4">
                <p className="text-sm text-white/80 leading-relaxed">
                  {descText}
                </p>

                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#996600]" />
                  <span className="text-xs text-[#996600] font-medium">
                    {tagline}
                  </span>
                </div>

                <Link href={AI_CLUB_INFO.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-[#003366] to-[#1a4d7c] rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#003366]/30 transition-all border border-[#996600]/20"
                  >
                    <span>{ctaLabel}</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isExpanded && (
          <div className="p-3 flex items-center gap-3">
            <div className="flex-1">
              <p className="text-xs text-white/60">
                {AI_CLUB_INFO.title}
              </p>
            </div>
            <Link href={AI_CLUB_INFO.websiteUrl} target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-gradient-to-r from-[#996600] to-[#d4a84b] rounded-full text-white text-xs font-semibold flex items-center gap-1"
              >
                <span>{exploreLabel}</span>
                <ExternalLink className="w-3 h-3" />
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
