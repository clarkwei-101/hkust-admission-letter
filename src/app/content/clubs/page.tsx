'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation/Navigation';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import ClubCard from '@/components/ClubCard/ClubCard';
import { AI_CLUB_INFO } from '@/lib/constants';
import { useI18n } from '@/lib/i18n';
import { Users } from 'lucide-react';

const CATEGORIES = [
  {
    key: 'tech' as const,
    clubs: [
      { name: 'AI X SCI-FI CLUB', nameEn: 'AI X SCI-FI CLUB', description: '探索AI与科幻的交汇点', descriptionEn: 'Where AI meets Science Fiction — flagship student tech society.', highlight: true },
      { name: '计算机学会', nameEn: 'Computer Science Club', description: '编程竞赛与技术分享', descriptionEn: 'Programming contests and tech sharing.' },
      { name: '机器人学会', nameEn: 'Robotics Society', description: '机器人设计与竞赛', descriptionEn: 'Robot design and contests.' },
    ],
  },
  {
    key: 'culture' as const,
    clubs: [
      { name: '摄影学会', nameEn: 'Photography Club', description: '影像创作与交流', descriptionEn: 'Imaging arts and exchange.' },
      { name: '音乐学会', nameEn: 'Music Society', description: '音乐演出与工作坊', descriptionEn: 'Performances and workshops.' },
      { name: '舞蹈学会', nameEn: 'Dance Club', description: '各类舞蹈培训与演出', descriptionEn: 'Dance training and performances.' },
    ],
  },
  {
    key: 'sports' as const,
    clubs: [
      { name: '篮球协会', nameEn: 'Basketball Association', description: '校队训练与联赛', descriptionEn: 'Team training and league play.' },
      { name: '游泳协会', nameEn: 'Swimming Association', description: '游泳教学与比赛', descriptionEn: 'Swimming lessons and meets.' },
      { name: '登山协会', nameEn: 'Mountaineering Club', description: '户外探险与训练', descriptionEn: 'Outdoor adventures and training.' },
    ],
  },
];

export default function ClubsPage() {
  const { t, locale } = useI18n();
  const isZh = locale === 'zh';

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation showBackButton title={isZh ? '社团' : 'Clubs'} />

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
                <Users className="w-12 h-12 text-[#996600]" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-gradient-gold">{isZh ? '社团' : 'Clubs'}</span>
            </h1>
            <p className="text-xl text-[#C0C0C0]">{t.clubs.subtitle}</p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-[#996600] to-transparent mx-auto" />
          </motion.div>

          <div className="space-y-12">
            {CATEGORIES.map((category, catIndex) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: catIndex * 0.2 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-[#996600]/20 flex items-center justify-center text-[#996600]">
                      {catIndex + 1}
                    </span>
                    {t.clubs.categories[category.key]}
                  </h2>
                  <div className="mt-2 ml-13 w-32 h-[2px] bg-gradient-to-r from-[#996600] to-transparent" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.clubs.map((club, clubIndex) => (
                    <ClubCard
                      key={club.nameEn}
                      club={{
                        ...club,
                        name: isZh ? club.name : club.nameEn,
                        description: isZh ? club.description : club.descriptionEn,
                      }}
                      index={clubIndex}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* AI Club CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16"
          >
            <div className="glass rounded-2xl p-8 border border-[#996600]/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#996600] to-[#d4a84b] text-white text-sm">
                  {t.clubs.howToJoin}
                </span>
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {t.clubs.steps.map((label: string, index: number) => (
                  <div key={label} className="p-4 rounded-xl bg-[#003366]/30">
                    <div className="text-2xl font-bold text-gradient-gold mb-1">{index + 1}</div>
                    <p className="text-white">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AIClubBanner />
    </main>
  );
}
