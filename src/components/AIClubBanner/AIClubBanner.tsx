'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronDown, Zap } from 'lucide-react';
import Link from 'next/link';
import { useSiteConfig } from '@/lib/university';
import { useI18n } from '@/lib/i18n';

export default function AIClubBanner() {
  const { t, locale } = useI18n();
  const site = useSiteConfig();
  const aiClub = site.aiClub;
  const theme = site.theme;
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
  const tagline = aiClub.tagline;

  if (!isVisible) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-xl overflow-hidden shadow-xl"
        aria-label={`Open ${aiClub.title}`}
      >
        <img
          src="/cyber-foundation-icon.png"
          alt={aiClub.title}
          className="w-full h-full object-cover"
        />
      </motion.button>
    );
  }

  const gradient = `linear-gradient(90deg, ${theme.blue}80 0%, transparent 100%)`;
  const borderColor = `${theme.gold}33`;
  const textColor = theme.gold;
  const highlightColor = theme.highlightGold;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-6 right-6 z-50 max-w-sm"
    >
      <div
        className="glass-dark rounded-2xl overflow-hidden shadow-2xl"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <div
          className="flex items-center justify-between p-4 border-b"
          style={{ background: gradient, borderColor: `${theme.gold}1A` }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="w-10 h-10 rounded-xl overflow-hidden shadow-lg flex items-center justify-center"
                style={{ background: theme.darkBlue }}
              >
                <img
                  src="/cyber-foundation-icon.png"
                  alt={aiClub.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <p
                className="text-[10px] tracking-[0.2em] uppercase font-semibold"
                style={{ color: textColor }}
              >
                {aiClub.subtitle}
              </p>
              <h3 className="text-sm font-bold text-white leading-tight">
                {aiClub.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              style={{ color: textColor }}
              aria-label="Toggle details"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsVisible(false)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              style={{ color: textColor }}
              aria-label="Close banner"
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
                  {aiClub.description}
                </p>

                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" style={{ color: textColor }} />
                  <span className="text-xs font-medium" style={{ color: textColor }}>
                    {tagline}
                  </span>
                </div>

                {aiClub.websiteUrl ? (
                  <Link href={aiClub.websiteUrl} target="_blank" rel="noopener noreferrer">
                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-xl transition-all"
                      style={{
                        background: `linear-gradient(90deg, ${theme.blue}, ${theme.gradient.to})`,
                        border: `1px solid ${theme.gold}33`,
                        boxShadow: `0 4px 14px ${theme.blue}30`,
                      }}
                    >
                      <span>{ctaLabel}</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </Link>
                ) : (
                  <Link href="/content/cyber-foundation">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                      style={{ background: `linear-gradient(90deg, ${theme.blue}, ${theme.gradient.to})` }}
                    >
                      <span>{ctaLabel}</span>
                    </motion.button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isExpanded && (
          <div className="p-3 flex items-center gap-3">
            <div className="flex-1">
              <p className="text-xs text-white/60">{aiClub.title}</p>
            </div>
            {aiClub.websiteUrl ? (
              <Link href={aiClub.websiteUrl} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-full text-white text-xs font-semibold flex items-center gap-1"
                  style={{ background: `linear-gradient(90deg, ${theme.gold}, ${highlightColor})` }}
                >
                  <span>{exploreLabel}</span>
                  <ExternalLink className="w-3 h-3" />
                </motion.button>
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </motion.div>
  );
}
