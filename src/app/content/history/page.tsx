'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation/Navigation';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import Timeline from '@/components/Timeline/Timeline';
import { Trophy, Microscope, Globe, Clock } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const MILESTONES = [
  { year: 1991, title: '创校', titleEn: 'Founded', description: '香港科技大学正式成立', descriptionEn: 'HKUST formally established', color: '#003366' },
  { year: 1997, title: '首批博士', titleEn: 'First PhDs', description: '培养出首批博士毕业生', descriptionEn: 'First PhD cohort graduated', color: '#996600' },
  { year: 2007, title: 'EQUIS认证', titleEn: 'EQUIS', description: '商学院通过EQUIS国际认证', descriptionEn: 'School of Business achieves EQUIS accreditation', color: '#003366' },
  { year: 2011, title: '世界前50', titleEn: 'Top 50 Worldwide', description: '首次进入世界前50名', descriptionEn: 'Entered the global Top 50', color: '#996600' },
  { year: 2019, title: '广州分校', titleEn: 'Guangzhou Campus', description: 'HKUST(GZ)正式启动', descriptionEn: 'HKUST(GZ) officially launched', color: '#003366' },
  { year: 2024, title: 'QS前30', titleEn: 'QS Top 30', description: '位列世界前30名', descriptionEn: 'QS World Top 30', color: '#996600' },
];

export default function HistoryPage() {
  const { t, locale } = useI18n();
  const isZh = locale === 'zh';

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation showBackButton title={isZh ? '校史' : 'History'} />

      {/* Content */}
      <div className="relative z-10 pt-24 md:pt-32 pb-20 px-4 md:px-6">
        <div className="container-hkust mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#003366] to-[#1a4d7c] rounded-full flex items-center justify-center border-4 border-[#996600]/30 shadow-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-[#996600]" aria-hidden="true">
                  <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"></path>
                  <path d="M19 3H8a2 2 0 0 0-2 2v14"></path>
                </svg>
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-gradient-gold">{isZh ? '校史' : 'History'}</span>
            </h1>
            <p className="text-xl text-[#C0C0C0]">
              {isZh ? '香港科技大学发展历程' : 'HKUST Milestones'}
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-[#996600] to-transparent mx-auto" />
          </motion.div>

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="glass rounded-2xl p-8 max-w-3xl mx-auto text-center">
              <p className="text-lg text-[#C0C0C0] leading-relaxed">
                {t.history.intro}
              </p>
            </div>
          </motion.div>

          {/* Timeline */}
          <Timeline items={MILESTONES.map(m => ({
            year: m.year,
            title: isZh ? m.title : m.titleEn,
            titleEn: m.titleEn,
            description: isZh ? m.description : m.descriptionEn,
            color: m.color,
          }))} />

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid md:grid-cols-3 gap-6"
          >
            {[
              { Icon: Trophy, key: 'ranking' as const },
              { Icon: Microscope, key: 'research' as const },
              { Icon: Globe, key: 'global' as const },
            ].map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-[#003366]/20 border border-[#996600]/10 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[#996600]/20 flex items-center justify-center">
                  <item.Icon className="w-7 h-7 text-[#996600]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t.history.cards[item.key]}</h3>
                <p className="text-[#C0C0C0] text-sm">{
                  isZh
                    ? item.key === 'ranking' ? 'QS世界大学排名前30'
                    : item.key === 'research' ? '发表论文引用率全球前1%'
                    : '来自60+国家的学生'
                    : item.key === 'ranking' ? 'Top 30 in QS World Rankings'
                    : item.key === 'research' ? 'Citation impact in the global Top 1%'
                    : 'Students from 60+ countries'
                }</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <AIClubBanner />
    </main>
  );
}
