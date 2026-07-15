'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation/Navigation';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import CountdownTimer from '@/components/CountdownTimer/CountdownTimer';
import { Mail, Calendar, Zap, GraduationCap } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { usePersonalisation } from '@/lib/personalisation';

const IMPORTANT_DATES = [
  { dateEn: '15 Aug 2026', eventEn: 'Programme Registration deadline', eventZh: '新生注册截止', color: '#003366' },
  { dateEn: '25 Aug 2026', eventEn: 'Orientation Week begins', eventZh: '新生Orientation Week开始', color: '#996600' },
  { dateEn: '2 Sep 2026', eventEn: 'Fall Semester begins', eventZh: '秋季学期正式开学', color: '#003366' },
];

export default function WelcomePage() {
  const { t, locale } = useI18n();
  const { name, hasName } = usePersonalisation();
  const isZh = locale === 'zh';
  const safeName = name || (isZh ? '同学' : 'Admit');

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation showBackButton title={isZh ? '欢迎页' : 'Welcome'} />

      <div className="relative z-10 pt-24 md:pt-32 pb-20 px-4 md:px-6">
        <div className="container-hkust mx-auto max-w-4xl">
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
                <GraduationCap className="w-12 h-12 text-[#996600]" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              <span className="text-gradient-gold">{isZh ? '欢迎来到香港科技大学' : 'Welcome to HKUST'}</span>
            </h1>
            <p className="text-2xl md:text-3xl text-[#C0C0C0] mb-3">
              {isZh ? '欢迎加入这个充满活力与创新的学术大家庭' : 'A new chapter awaits.'}
            </p>
            {hasName && (
              <p className="text-xl md:text-2xl text-[#d4a84b] mb-2">
                {isZh ? `欢迎，${safeName}！` : `Welcome, ${safeName}.`}
              </p>
            )}
            <p className="text-lg text-[#996600]">
              {isZh ? t.welcome.journeyBeginsZh : t.welcome.journeyBegins}
            </p>

            <div className="mt-8">
              <CountdownTimer targetDate="2026-09-02T00:00:00+08:00" />
            </div>

            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-[#996600] to-transparent mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#996600] via-[#003366] to-[#996600]" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#996600]/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#996600]" />
                  </span>
                  {t.welcome.presidentTitle}
                </h2>
                <div className="text-[#C0C0C0] leading-relaxed space-y-4">
                  {t.welcome.presidentBody.map((paragraph: string, i: number) => (
                    <p key={i} className={i === 0 ? 'text-lg italic' : ''}>
                      {paragraph}
                    </p>
                  ))}
                  <p className="text-right mt-6 text-[#996600] font-medium italic">
                    {t.welcome.presidentSign}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[#996600]" />
                {t.welcome.academicYearLabel}
              </h3>
              <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#996600] to-[#d4a84b] text-white font-bold text-lg mb-4">
                2026-2027
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-[#003366]/30">
                  <span className="text-[#C0C0C0]">{isZh ? '第一学期' : 'Fall Term'}</span>
                  <span className="text-white font-medium text-sm">2 Sep – 5 Dec 2026</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-[#003366]/30">
                  <span className="text-[#C0C0C0]">{isZh ? '第二学期' : 'Spring Term'}</span>
                  <span className="text-white font-medium text-sm">13 Jan – 9 May 2027</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-[#996600]" />
                {t.welcome.importantDatesLabel}
              </h3>
              <div className="space-y-4">
                {IMPORTANT_DATES.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-4 p-3 rounded-lg bg-[#003366]/30 border-l-4"
                    style={{ borderColor: item.color }}
                  >
                    <div className="text-[#996600] font-bold min-w-[100px] text-sm">{item.dateEn}</div>
                    <div className="text-white text-sm">{isZh ? item.eventZh : item.eventEn}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-center py-8"
          >
            <p className="text-2xl md:text-3xl text-[#996600] font-light italic">
              Your Journey Begins Here
            </p>
            <p className="text-[#C0C0C0] mt-2">{t.welcome.journeyBeginsZh}</p>
          </motion.div>
        </div>
      </div>

      <AIClubBanner />
    </main>
  );
}
