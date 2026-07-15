'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation/Navigation';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import { useI18n } from '@/lib/i18n';
import { GraduationCap } from 'lucide-react';

interface School {
  index: number;
  name: { en: string; zh: string };
  nameEn: string;
  programs: { en: string; zh: string }[];
}

const SCHOOLS: School[] = [
  {
    index: 1,
    name: { en: '工程学院', zh: '工程学院' },
    nameEn: 'School of Engineering',
    programs: [
      { en: 'Computer Science & Engineering', zh: '计算机科学与工程' },
      { en: 'Electronic & Computer Engineering', zh: '电子与计算机工程' },
      { en: 'Mechanical Engineering', zh: '机械工程' },
      { en: 'Chemical Engineering', zh: '化学工程' },
      { en: 'Civil Engineering', zh: '土木工程' },
    ],
  },
  {
    index: 2,
    name: { en: '理学院', zh: '理学院' },
    nameEn: 'School of Science',
    programs: [
      { en: 'Mathematics', zh: '数学' },
      { en: 'Physics', zh: '物理学' },
      { en: 'Chemistry', zh: '化学' },
      { en: 'Life Science', zh: '生命科学' },
      { en: 'Marine Science', zh: '海洋科学与技术' },
    ],
  },
  {
    index: 3,
    name: { en: '商学院', zh: '商学院' },
    nameEn: 'School of Business and Management',
    programs: [
      { en: 'Economics', zh: '经济学' },
      { en: 'Finance', zh: '金融学' },
      { en: 'Accounting', zh: '会计学' },
      { en: 'Marketing', zh: '市场营销' },
      { en: 'BBA', zh: '工商管理' },
    ],
  },
  {
    index: 4,
    name: { en: '人文与社会科学学院', zh: '人文与社会科学学院' },
    nameEn: 'School of Humanities & Social Science',
    programs: [
      { en: 'Chinese', zh: '中文学' },
      { en: 'English', zh: '英文学' },
      { en: 'Global China Studies', zh: '全球中国研究' },
      { en: 'Sociology', zh: '社会学' },
    ],
  },
];

const STATS = [
  { number: '4', labelKey: 'schools' as const },
  { number: '40+', labelKey: 'ugPrograms' as const },
  { number: '120+', labelKey: 'pgPrograms' as const },
  { number: '#26', labelKey: 'qsRank' as const },
];

export default function AcademicsPage() {
  const { t, locale } = useI18n();
  const isZh = locale === 'zh';

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation showBackButton title={isZh ? '学习介绍' : 'Academics'} />

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
                <GraduationCap className="w-12 h-12 text-[#996600]" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-gradient-gold">{isZh ? '学习介绍' : 'Academics'}</span>
            </h1>
            <p className="text-xl text-[#C0C0C0]">
              {isZh ? '学院与专业介绍' : 'Schools & Programmes'}
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-[#996600] to-transparent mx-auto" />
          </motion.div>

          <div className="space-y-8">
            {SCHOOLS.map((school, index) => (
              <motion.div
                key={school.nameEn}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-[#996600]/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#996600]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#003366] to-[#996600] flex items-center justify-center">
                          <span className="text-white text-xl font-bold">{school.index}</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {isZh ? school.name.zh : school.name.en}
                          </h3>
                          <p className="text-[#996600] text-sm">{school.nameEn}</p>
                        </div>
                      </div>
                      <div className="md:ml-auto">
                        <span className="px-4 py-1 rounded-full bg-[#996600]/20 text-[#996600] text-sm font-medium">
                          {isZh ? `${school.programs.length} 个专业` : `${school.programs.length} programmes`}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {school.programs.map((program, pIndex) => (
                        <motion.div
                          key={program.en}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.15 + pIndex * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="p-3 rounded-xl bg-[#003366]/30 border border-[#996600]/10 hover:border-[#996600]/30 transition-all text-center"
                        >
                          <p className="text-white text-sm">{isZh ? program.zh : program.en}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-[#003366]/20 border border-[#996600]/10"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-[#C0C0C0] text-sm">{(t.academics.stats as Record<string, string>)[stat.labelKey]}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <AIClubBanner />
    </main>
  );
}
