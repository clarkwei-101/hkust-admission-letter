'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ShieldCheck, X, ExternalLink } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

type DisclaimerVariant = 'banner' | 'envelope' | 'inline';

interface DisclaimerProps {
  variant?: DisclaimerVariant;
  className?: string;
}

// `Disclaimer` is the regulatory-visible text identifying this site as a
// student-made project that defers to the official hkust.edu.hk. Two main
// render variants:
//   - banner  → full-width strip with long-form copy (hub footer, news page)
//   - envelope → compact pill above the envelope so the user sees it before
//                opening the letter
//   - inline  → a single-line credit line for tight slots (e.g. footer)
export default function Disclaimer({ variant = 'banner', className = '' }: DisclaimerProps) {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);

  // Read the disclaimer strings from the active locale dictionary. The keys
  // live under `home` and `hub` for backwards compatibility with the
  // existing i18n shape; both sections carry the same strings so we can
  // safely read from `home`.
  const d = (t.home as any).disclaimer;

  if (variant === 'inline') {
    return (
      <p className={`text-[#996600]/70 text-xs tracking-wider ${className}`}>
        <ShieldCheck className="w-3 h-3 inline-block mr-1 -mt-0.5" />
        {d.credit}
      </p>
    );
  }

  if (variant === 'envelope') {
    return (
      <div className={`w-full px-4 ${className}`}>
        <motion.button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#003366]/80 border border-[#996600]/40 backdrop-blur-sm text-[#FFD98A] text-xs md:text-sm hover:border-[#996600]/70 hover:bg-[#003366]/90 transition-all"
          aria-label={d.short}
          aria-expanded={expanded}
        >
          <Info className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="font-medium tracking-wide">{d.short}</span>
        </motion.button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="rounded-2xl bg-[#003366]/60 border border-[#996600]/30 backdrop-blur-sm p-4 text-left">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-[#C0C0C0] text-xs leading-relaxed">{d.long}</p>
                  <button
                    type="button"
                    onClick={() => setExpanded(false)}
                    className="text-[#996600]/60 hover:text-[#996600] flex-shrink-0"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <a
                  href="https://hkust.edu.hk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#d4a84b] text-xs hover:underline"
                >
                  {d.reference}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // banner variant — full-width strip for the hub + news pages
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full rounded-2xl border border-[#996600]/40 bg-gradient-to-br from-[#003366]/50 via-[#001a33]/60 to-[#003366]/40 backdrop-blur-sm p-4 md:p-6 ${className}`}
      aria-label={d.short}
      role="note"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#996600]/20 border border-[#996600]/50 flex items-center justify-center">
          <ShieldCheck className="w-4 h-4 text-[#d4a84b]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#d4a84b] text-xs md:text-sm font-semibold tracking-wider uppercase mb-1">
            {d.short}
          </p>
          <p className="text-[#C0C0C0]/90 text-xs md:text-sm leading-relaxed">{d.long}</p>
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <a
              href="https://hkust.edu.hk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#d4a84b] text-xs hover:underline"
            >
              {d.reference}
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-[#996600]/40 text-xs">·</span>
            <span className="text-[#996600]/70 text-xs">{d.credit}</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
