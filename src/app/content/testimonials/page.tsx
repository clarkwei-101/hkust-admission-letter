'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation/Navigation';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import { Quote, Play, GraduationCap, Briefcase, Microscope } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface Testimonial {
  id: string;
  nameEn: string;
  nameZh: string;
  schoolEn: string;
  schoolZh: string;
  year: string;
  topicKey: 'advising' | 'life' | 'library';
  quoteEn: string;
  quoteZh: string;
  tipsEn: string[];
  tipsZh: string[];
  Icon: any;
  duration: string;
  color: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'engineering',
    nameEn: 'Alex · Engineering',
    nameZh: '陈同学 · 工程学院',
    schoolEn: 'School of Engineering · Computer Science',
    schoolZh: '工程学院 · 计算机科学与工程',
    year: 'Year 2',
    topicKey: 'advising',
    quoteEn:
      'Always start with the Academic Advising Session on Day 1 of Orientation. Lay out your four-year plan before you open course shopping.',
    quoteZh:
      'Orientation 第一天一定要先参加 Academic Advising Session，听完再选课能少走很多弯路。Shopping Cart 提前 24 小时开放。',
    tipsEn: [
      'Read the course outline beforehand',
      'Use Class Schedule & Quota to check availability',
      'Prepare 3-4 plan combinations',
      'Trial in Week 1 before locking decisions',
    ],
    tipsZh: [
      '提前阅读 Course Outline',
      '利用 Class Schedule & Quota 查名额',
      '准备 3-4 套选课方案',
      'Week 1 试听后再决定',
    ],
    Icon: GraduationCap,
    duration: '2:45',
    color: '#003366',
  },
  {
    id: 'business',
    nameEn: 'Brian · Business',
    nameZh: '李同学 · 商学院',
    schoolEn: 'School of Business · Finance',
    schoolZh: '商学院 · 金融学',
    year: 'Year 3',
    topicKey: 'life',
    quoteEn:
      'LG7 closes at 8 pm on weekends — keep snacks handy. Library study rooms on floors 3-4 get booked out at finals.',
    quoteZh:
      'LG7 食堂周末 8 点关门，提前买好八达通。Study Room 在图书馆 3-4 楼，期末要预约。SU 的活动比想象中精彩。',
    tipsEn: [
      'An Octopus card saves endless queues',
      'Group study rooms bookable 7 days ahead',
      'SU events are free — try them all',
      'Weekend shuttle runs are reduced',
    ],
    tipsZh: [
      '办八达通可以省下大量排队时间',
      '图书馆小组研讨室可提前 7 天预约',
      'SU（学生会）活动免费参加',
      '周末校巴班次减少',
    ],
    Icon: Briefcase,
    duration: '3:12',
    color: '#996600',
  },
  {
    id: 'science',
    nameEn: 'Cherry · Science',
    nameZh: '王同学 · 理学院',
    schoolEn: 'School of Science · Physics',
    schoolZh: '理学院 · 物理学',
    year: 'Year 4',
    topicKey: 'library',
    quoteEn:
      'HKUST Library owns the richest electronic resources in HK. Scholar Hub returns full-text for most journals in one click.',
    quoteZh:
      'HKUST 图书馆的电子资源是全港最丰富的之一。Scholar Hub 能直接搜到大部分期刊全文。',
    tipsEn: [
      'Scholar Hub is your paper-discovery Swiss knife',
      'Inter-library Loan unlocks partner universities',
      'Take the EndNote workshop early',
      'Start FYP scouting supervisors in summer',
    ],
    tipsZh: [
      'Scholar Hub 是论文搜索利器',
      'Inter-library Loan 可借其他大学馆藏',
      'EndNote 培训必参加',
      'Final Year Project 暑假就要启动',
    ],
    Icon: Microscope,
    duration: '4:08',
    color: '#7B2FFF',
  },
];

export default function TestimonialsPage() {
  const { t, locale } = useI18n();
  const isZh = locale === 'zh';
  const tDict = t.testimonials;

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation showBackButton title={isZh ? '学长学姐说' : 'Student Voices'} />

      <div className="relative z-10 pt-24 md:pt-32 pb-20 px-4 md:px-6">
        <div className="container-hkust mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#003366] to-[#1a4d7c] rounded-full flex items-center justify-center border-4 border-[#996600]/30 shadow-2xl">
                <Quote className="w-12 h-12 text-[#996600]" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-gradient-gold">{tDict.title}</span>
            </h1>
            <p className="text-xl text-[#C0C0C0] max-w-3xl mx-auto">
              {tDict.subtitle}
            </p>
            <p className="text-base text-white/60 max-w-2xl mx-auto mt-2">
              {tDict.intro}
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-[#996600] to-transparent mx-auto" />
          </motion.div>

          <div className="space-y-10">
            {TESTIMONIALS.map((entry, index) => {
              const Icon = entry.Icon;
              const isReversed = index % 2 === 1;
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
                >
                  <div className={`glass rounded-2xl p-6 md:p-10 relative overflow-hidden border border-[#996600]/20`}>
                    <div
                      className="absolute top-0 left-0 w-full h-1"
                      style={{ background: `linear-gradient(90deg, ${entry.color} 0%, transparent 100%)` }}
                    />

                    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                      {/* Mock video */}
                      <div className="relative aspect-video w-full md:w-80 lg:w-96 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                        <div
                          className="absolute inset-0"
                          style={{ background: `linear-gradient(135deg, ${entry.color} 0%, #001a33 100%)` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full border-4 border-white/40 flex items-center justify-center bg-white/10 backdrop-blur">
                            <Play className="w-8 h-8 text-white fill-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-white/80">
                          <span className="px-2 py-0.5 rounded bg-black/50 backdrop-blur">
                            {isZh ? entry.nameZh : entry.nameEn}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-black/50 backdrop-blur">{entry.duration}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: `${entry.color}30` }}
                          >
                            <Icon className="w-5 h-5" style={{ color: entry.color }} />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-lg font-bold text-white truncate">
                              {isZh ? entry.schoolZh : entry.schoolEn}
                            </h3>
                            <p className="text-xs text-white/50 truncate">
                              {isZh ? entry.schoolEn : entry.schoolZh} · {entry.year}
                            </p>
                          </div>
                        </div>

                        <span
                          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-3"
                          style={{ background: `${entry.color}30`, color: '#fff' }}
                        >
                          {tDict.topics[entry.topicKey]}
                        </span>

                        <p className="text-white/80 leading-relaxed italic">
                          “{isZh ? entry.quoteZh : entry.quoteEn}”
                        </p>

                        <div className="mt-4 border-t border-white/10 pt-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-[#996600] mb-2">
                            {tDict.tipsLabel}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {(isZh ? entry.tipsZh : entry.tipsEn).map((tip, ti) => (
                              <div key={ti} className="flex items-start gap-2 text-sm text-white/70">
                                <span className="text-[#996600] flex-shrink-0">✓</span>
                                <span>{tip}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 glass rounded-2xl p-8 border border-[#996600]/30 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-3">{tDict.ctaTitle}</h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">{tDict.ctaBody}</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="https://su.hkust.edu.hk/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#996600] to-[#d4a84b] text-white font-semibold"
              >
                {tDict.ctaPrimary}
              </a>
              <a
                href="https://sao.hkust.edu.hk/student-ambassadors"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white transition-colors"
              >
                {tDict.ctaSecondary}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <AIClubBanner />
    </main>
  );
}
