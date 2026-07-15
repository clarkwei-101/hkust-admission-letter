'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation/Navigation';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import {
  BookOpen, IdCard, Smartphone, Train, Users, Laptop, Book, Phone, Lightbulb,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const SECTIONS = [
  { key: 'before' as const },
  { key: 'housing' as const },
  { key: 'academic' as const },
  { key: 'life' as const },
];

const TIP_ICONS = [IdCard, Smartphone, Train, Users, Laptop, Book];

export default function GuidePage() {
  const { t, locale } = useI18n();
  const isZh = locale === 'zh';

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation showBackButton title={isZh ? '新生指南' : 'New Student Guide'} />

      <div className="relative z-10 pt-24 md:pt-32 pb-20 px-4 md:px-6">
        <div className="container-hkust mx-auto max-w-5xl">
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
                <BookOpen className="w-12 h-12 text-[#996600]" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-gradient-gold">{isZh ? '新生指南' : 'New Student Guide'}</span>
            </h1>
            <p className="text-xl text-[#C0C0C0]">
              {t.guide.subtitle}
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-[#996600] to-transparent mx-auto" />
          </motion.div>

          <div className="space-y-8">
            {SECTIONS.map((section, index) => {
              const itemKey: 'before' | 'beforeItems' | 'housing' | 'housingItems' | 'academic' | 'academicItems' | 'life' | 'lifeItems' =
                section.key === 'before' ? 'beforeItems' :
                section.key === 'housing' ? 'housingItems' :
                section.key === 'academic' ? 'academicItems' : 'lifeItems';
              const items = t.guide.sections[itemKey] as unknown as readonly string[];
              const title =
                section.key === 'before' ? t.guide.sections.before :
                section.key === 'housing' ? t.guide.sections.housing :
                section.key === 'academic' ? t.guide.sections.academic :
                t.guide.sections.life;

              return (
                <motion.div
                  key={section.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-[#996600]/50 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#996600]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#996600] to-[#d4a84b] flex items-center justify-center">
                          <span className="text-white text-xl font-bold">{index + 1}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white">{title}</h3>
                      </div>

                      <div className="space-y-3">
                        {items.map((item: string, itemIndex: number) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 + itemIndex * 0.05 }}
                            className="flex items-start gap-4 p-4 rounded-xl bg-[#003366]/30 border border-[#996600]/10 hover:border-[#996600]/30 transition-colors"
                          >
                            <div className="w-6 h-6 rounded-full bg-[#996600]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-[#996600]" />
                            </div>
                            <p className="text-[#C0C0C0]">{item}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16"
          >
            <div className="glass rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#996600] via-[#003366] to-[#996600]" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Lightbulb className="w-7 h-7 text-[#996600]" />
                  {t.guide.tipsTitle}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {t.guide.tips.map((tip: string, index: number) => {
                    const Icon = TIP_ICONS[index] || BookOpen;
                    return (
                      <div key={tip} className="flex items-center gap-4 p-4 rounded-xl bg-[#003366]/30">
                        <div className="w-10 h-10 rounded-lg bg-[#996600]/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#996600]" />
                        </div>
                        <p className="text-[#C0C0C0]">{tip}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Emergency */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8"
          >
            <div className="rounded-2xl p-6 bg-gradient-to-r from-[#996600]/20 to-[#003366]/20 border border-[#996600]/30 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#996600]/20 flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#996600]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t.guide.emergency}</h3>
              <p className="text-[#C0C0C0] mb-2">{t.guide.emergencyBody}</p>
              <p className="text-[#996600] text-sm">
                {isZh ? '如有疑问，请联系学校相关部门' : 'Reach out whenever you need a hand.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <AIClubBanner />
    </main>
  );
}
