'use client';

import { motion } from 'framer-motion';
import { Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { AI_CLUB_INFO } from '@/lib/constants';

interface Club {
  name: string;
  nameEn: string;
  description: string;
  highlight?: boolean;
}

interface ClubCardProps {
  club: Club;
  index: number;
}

export default function ClubCard({ club, index }: ClubCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div
        className={`relative p-6 rounded-xl border transition-all duration-300 cursor-pointer group ${
          club.highlight
            ? 'bg-gradient-to-br from-[#003366]/40 to-[#996600]/20 border-[#996600]/50 hover:border-[#996600]'
            : 'bg-[#003366]/20 border-[#996600]/20 hover:border-[#996600]/50'
        }`}
      >
        {/* Highlight badge */}
        {club.highlight && (
          <div className="absolute -top-3 -right-3">
            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#996600] to-[#d4a84b] text-white text-xs font-bold flex items-center gap-1 shadow-lg">
              <Sparkles className="w-3 h-3" />
              推荐
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          <h4 className="text-lg font-bold text-white mb-1 group-hover:text-[#996600] transition-colors">
            {club.name}
          </h4>
          <p className="text-xs text-[#996600] font-medium mb-3">
            {club.nameEn}
          </p>
          <p className="text-sm text-[#C0C0C0] leading-relaxed">
            {club.description}
          </p>

          {/* AI Club special CTA */}
          {club.highlight && (
            <Link href={AI_CLUB_INFO.websiteUrl} target="_blank" rel="noopener noreferrer">
              <motion.button
                className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-[#003366] to-[#1a4d7c] rounded-lg text-white text-sm font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#003366]/30 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>了解更多</span>
                <ExternalLink className="w-4 h-4" />
              </motion.button>
            </Link>
          )}
        </div>

        {/* Glow effect */}
        {club.highlight && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#996600]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        )}
      </div>
    </motion.div>
  );
}
