'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation/Navigation';
import ContentCard from '@/components/ContentCard/ContentCard';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import { NAV_ITEMS } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';
import { usePersonalisation } from '@/lib/personalisation';
import { Sparkles, Mail } from 'lucide-react';

export default function HubPage() {
  const { t } = useI18n();
  const { name, hasName } = usePersonalisation();
  // Defer time-of-day greeting to client-side to avoid SSR/hydration mismatch.
  // Default to morning so SSR and initial client render agree; effect corrects it.
  const [greeting, setGreeting] = useState(t.hub.greeting.morning);
  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(
      hour < 5 ? t.hub.greeting.night :
      hour < 12 ? t.hub.greeting.morning :
      hour < 18 ? t.hub.greeting.afternoon :
      hour < 22 ? t.hub.greeting.evening :
      t.hub.greeting.night
    );
  }, [t.hub.greeting]);

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation />

      <div className="relative z-10 pt-24 md:pt-32 pb-20 px-4 md:px-6">
        <div className="container-hkust mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#003366] to-[#1a4d7c] rounded-2xl flex items-center justify-center border border-[#996600]/30 shadow-xl">
                  <span className="text-[#996600] font-bold text-2xl">HKUST</span>
                </div>
                <div className="absolute inset-0 bg-[#996600]/20 rounded-2xl blur-xl -z-10" />
              </div>
            </motion.div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              <span className="text-gradient-gold">{t.hub.title}</span>
            </h1>

            {hasName ? (
              <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-2">
                <span className="text-[#C0C0C0]">{greeting}, </span>
                <span className="text-[#d4a84b] font-semibold">{name}</span>
                <span className="text-[#C0C0C0]">.</span>
              </p>
            ) : (
              <p className="text-lg md:text-xl text-[#C0C0C0] max-w-2xl mx-auto mb-6">
                {t.hub.welcome}
              </p>
            )}

            <p className="text-base text-[#C0C0C0]/80 max-w-3xl mx-auto">
              {t.hub.subtitle}
            </p>

            <div className="mt-6 w-32 h-1 bg-gradient-to-r from-transparent via-[#996600] to-transparent mx-auto" />
          </motion.div>

          {/* Action row: back to envelope + welcome page */}
          <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#996600] to-[#d4a84b]/80 text-white border border-[#996600]/50 hover:shadow-lg hover:shadow-[#996600]/30 transition-all text-sm font-medium"
              >
                <Mail className="w-4 h-4" />
                <span>{t.hub.backToEnvelope}</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -2 }}
            >
              <Link
                href="/content/welcome"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-[#996600]/40 transition-colors text-sm font-medium"
              >
                <Sparkles className="w-4 h-4" />
                <span>President's Welcome</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -2 }}
            >
              <Link
                href="/content/campus-live"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-[#FF6B35]/40 transition-colors text-sm font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-[#FF6B35]"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="2" />
                  <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
                </svg>
                <span>Live Campus</span>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {NAV_ITEMS.map((item, index) => (
              <ContentCard key={item.id} {...item} index={index} />
            ))}
          </div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 md:mt-24"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              {t.hub.quickLinksTitle}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { name: 'HKUST Official', url: 'https://www.hkust.edu.hk', color: '#003366' },
                { name: 'Student Portal', url: 'https://registry.hkust.edu.hk', color: '#996600' },
                { name: 'Canvas LMS', url: 'https://canvas.hkust.edu.hk', color: '#E01F3D' },
                { name: 'Library', url: 'https://library.hkust.edu.hk', color: '#2E7D32' },
              ].map((link, index) => (
                <motion.a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="p-4 md:p-6 rounded-xl border border-[#996600]/20 bg-[#003366]/20 text-center group hover:border-[#996600]/50 transition-all"
                >
                  <div className="w-3 h-3 rounded-full mx-auto mb-3" style={{ backgroundColor: link.color }} />
                  <p className="text-white font-medium group-hover:text-[#996600] transition-colors text-sm md:text-base">
                    {link.name}
                  </p>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-20 md:mt-24 text-center"
          >
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#996600]/50 to-transparent mx-auto mb-6" />
            <p className="text-[#C0C0C0]/60 text-sm">{t.hub.footer}</p>
            <p className="text-[#996600]/60 text-xs mt-2">{t.hub.footerCredit}</p>
          </motion.footer>
        </div>
      </div>

      <AIClubBanner />
    </main>
  );
}
