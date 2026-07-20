'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation/Navigation';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import { Quote, Play, GraduationCap, Briefcase, Microscope, MapPin, ExternalLink } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface Testimonial {
  id: string;
  nameEn: string;
  nameZh: string;
  schoolEn: string;
  schoolZh: string;
  year: string;
  topicKey: 'campus' | 'student' | 'facilities';
  quoteEn: string;
  quoteZh: string;
  tipsEn: string[];
  tipsZh: string[];
  Icon: any;
  color: string;
  youtubeId: string;
  videoTitleEn: string;
  videoTitleZh: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'campus-tour',
    nameEn: 'Campus Overview',
    nameZh: '校园全貌',
    schoolEn: 'HKUST Official',
    schoolZh: '科大官方',
    year: '2025',
    topicKey: 'campus',
    quoteEn:
      'HKUST sits on a stunning waterfront campus in Clear Water Bay — the only university in Hong Kong with its own MTR station.',
    quoteZh:
      '科大坐落于清水湾海滨,是全港唯一拥有专属地铁站的大学,海景校园独一无二。',
    tipsEn: [
      'Take the TUI minibus from Hang Hau MTR in 8 minutes',
      'The library overlooks the South China Sea — best sunset spot',
      'Seven dining levels from LG1 to LG7',
      'The Atrium connects everything via 14 escalators',
    ],
    tipsZh: [
      '坑口地铁站乘小巴 8 分钟直达校园',
      '图书馆直面南海 — 看日落最佳位置',
      '7 层餐饮 LG1-LG7 选择丰富',
      '中庭 14 条扶手电梯连通全校园',
    ],
    Icon: MapPin,
    color: '#003366',
    youtubeId: 'vvoqgumBQjo',
    videoTitleEn: 'Drone Tour · HKUST Campus',
    videoTitleZh: '航拍校园全景',
  },
  {
    id: 'engineering-student',
    nameEn: 'Shahman Ali · Engineering',
    nameZh: 'Shahman Ali · 工程学院',
    schoolEn: 'School of Engineering · Computer Science & AI',
    schoolZh: '工程学院 · 计算机科学与人工智能',
    year: 'Year 4 · Class of 2026',
    topicKey: 'student',
    quoteEn:
      'HKUST gave me the space to combine AI research with engineering practice. The seminars and industry events here go far beyond textbook theory.',
    quoteZh:
      '科大让我把 AI 研究与工程实践结合起来。这里的研讨会和行业活动远超课本理论。',
    tipsEn: [
      'Attend HKIE seminars — free industry exposure from Year 1',
      'Join affinity meetups to find mentors and peers',
      'Start research projects in your second year',
      'The engineering labs are open 24/7 during project seasons',
    ],
    tipsZh: [
      '从大一就开始参加 HKIE 研讨会,免费接触行业',
      '加入兴趣小组找到导师和同伴',
      '大二就开始参与研究项目',
      '工程实验室在项目季节 24 小时开放',
    ],
    Icon: GraduationCap,
    color: '#996600',
    youtubeId: 'xxam38t6eDE',
    videoTitleEn: 'Student Story · HKIE Scholarship Awardee',
    videoTitleZh: '学生故事 · HKIE 奖学金得主',
  },
  {
    id: 'sports-facilities',
    nameEn: 'Sports & Facilities',
    nameZh: '体育设施',
    schoolEn: 'HKUST Official',
    schoolZh: '科大官方',
    year: '2025',
    topicKey: 'facilities',
    quoteEn:
      'From the rooftop running track to the sea-view gym and courts — HKUST keeps you moving. Dragon boat training happens right off campus.',
    quoteZh:
      '从天台跑道到海景健身房和球场,科大让你动起来。龙舟训练就在校园海边。',
    tipsEn: [
      'The outdoor track has a panoramic sea view',
      'Book sports facilities via the HKUST Sports Centre app',
      'Dragon boat team trains at the campus pier',
      'Hall sports events are the best way to make friends',
    ],
    tipsZh: [
      '室外跑道可饱览海景',
      '通过 HKUST Sports Centre App 预约场地',
      '龙舟队在校园码头训练',
      '书院体育赛事是交朋友的好方式',
    ],
    Icon: Briefcase,
    color: '#2E7D32',
    youtubeId: 'v66qkOjg2D8',
    videoTitleEn: 'Sports Facilities Tour · Cantonese',
    videoTitleZh: '体育设施导览 · 粤语',
  },
];

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
  color: string;
}

function YouTubeEmbed({ youtubeId, title, color }: VideoPlayerProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-[#001a33]">
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-3"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: `${color}40` }}
            >
              <Play className="w-7 h-7 text-white" />
            </div>
            <span className="text-white/40 text-xs">Loading video...</span>
          </motion.div>
        </div>
      )}

      {/* YouTube iframe */}
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&color=white`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full"
        onLoad={() => setLoaded(true)}
      />

      {/* Overlay gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </div>
  );
}

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

          {/* Video + Quote cards */}
          <div className="space-y-12">
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
                  <div className="glass rounded-2xl p-6 md:p-10 relative overflow-hidden border border-[#996600]/20">
                    <div
                      className="absolute top-0 left-0 w-full h-1"
                      style={{ background: `linear-gradient(90deg, ${entry.color} 0%, transparent 100%)` }}
                    />

                    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-start`}>
                      {/* Video player */}
                      <div className="w-full md:w-80 lg:w-96 flex-shrink-0">
                        <YouTubeEmbed
                          youtubeId={entry.youtubeId}
                          title={isZh ? entry.videoTitleZh : entry.videoTitleEn}
                          color={entry.color}
                        />
                        {/* Video label */}
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-white/40 truncate flex-1">
                            {isZh ? entry.videoTitleZh : entry.videoTitleEn}
                          </span>
                          <a
                            href={`https://www.youtube.com/watch?v=${entry.youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-white/30 hover:text-white/70 transition-colors flex-shrink-0"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
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
                              {entry.nameEn} · {entry.year}
                            </p>
                          </div>
                        </div>

                        <span
                          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-3"
                          style={{ background: `${entry.color}30`, color: '#fff' }}
                        >
                          {tDict.topics[entry.topicKey]}
                        </span>

                        <p className="text-white/80 leading-relaxed italic mb-4">
                          "{isZh ? entry.quoteZh : entry.quoteEn}"
                        </p>

                        <div className="border-t border-white/10 pt-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-[#996600] mb-2">
                            {tDict.tipsLabel}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {(isZh ? entry.tipsZh : entry.tipsEn).map((tip, ti) => (
                              <div key={ti} className="flex items-start gap-2 text-sm text-white/70">
                                <span className="text-[#996600] flex-shrink-0">/</span>
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

          {/* CTA */}
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
                href="https://join.hkust.edu.hk/campus-tour"
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
