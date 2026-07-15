'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation/Navigation';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import {
  Smartphone, GraduationCap, Apple, Bot, Building, Lightbulb, Book, UtensilsCrossed,
  Bus, Video, Building2, LucideIcon,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const iconMap: Record<string, LucideIcon> = {
  GraduationCap, Building2, UtensilsCrossed, Bus, Video, BookOpen: Book, Apple, Bot, Building, Smartphone,
};

interface AppItem {
  name: string;
  category: { en: string; zh: string };
  description: { en: string; zh: string };
  platform: string[];
  icon: string;
  color: string;
}

const APPS: AppItem[] = [
  {
    name: 'Canvas',
    category: { en: 'Study', zh: '学习' },
    description: { en: 'Course management, assignment submission, grade tracking', zh: '课程管理、作业提交、成绩查询' },
    platform: ['iOS', 'Android', 'Web'],
    icon: 'GraduationCap', color: '#E01F3D',
  },
  {
    name: 'm.HKUST',
    category: { en: 'Campus', zh: '校园' },
    description: { en: 'Maps, facility bookings, official announcements', zh: '校园地图、设施预约、官方公告' },
    platform: ['iOS', 'Android'],
    icon: 'Building2', color: '#003366',
  },
  {
    name: 'USTransit',
    category: { en: 'Transit', zh: '交通' },
    description: { en: 'Real-time minibus 11/11M/11S/12 and bus 792M ETA', zh: '校园小巴 11/11M/11S/12 与巴士 792M 实时 ETA' },
    platform: ['iOS', 'Android'],
    icon: 'Bus', color: '#2E7D32',
  },
  {
    name: 'Path Advisor',
    category: { en: 'Navigation', zh: '导航' },
    description: { en: 'Building-to-building routes, elevator finder, facility atlas', zh: '建筑间路径、电梯查询、设施图集' },
    platform: ['Web', 'iOS', 'Android'],
    icon: 'UtensilsCrossed', color: '#7B2FFF',
  },
  {
    name: 'Zoom',
    category: { en: 'Meeting', zh: '会议' },
    description: { en: 'Online lectures and office-hour meetings', zh: '线上课程与师生会议' },
    platform: ['iOS', 'Android', 'Web'],
    icon: 'Video', color: '#2D8CFF',
  },
  {
    name: 'HKUST Portal',
    category: { en: 'Academic', zh: '学术' },
    description: { en: 'Course registration, fees, academic progress', zh: '课程注册、学费、学术进度' },
    platform: ['Web'],
    icon: 'Book', color: '#996600',
  },
];

const QUICK_LINKS = [
  { name: 'App Store', icon: Apple, url: 'https://apps.apple.com/hk/genre/ios/id36' },
  { name: 'Google Play', icon: Bot, url: 'https://play.google.com/store/apps' },
  { name: 'Canvas', icon: GraduationCap, url: 'https://canvas.hkust.edu.hk' },
  { name: 'HKUST', icon: Building, url: 'https://www.hkust.edu.hk' },
];

export default function AppsPage() {
  const { t, locale } = useI18n();
  const isZh = locale === 'zh';

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation showBackButton title={isZh ? '常用应用' : 'Essential Apps'} />

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
                <Smartphone className="w-12 h-12 text-[#996600]" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-gradient-gold">{t.apps.title}</span>
            </h1>
            <p className="text-xl text-[#C0C0C0]">
              {t.apps.subtitle}
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-[#996600] to-transparent mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPS.map((app, index) => {
              const Icon = iconMap[app.icon] || Smartphone;
              return (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <div className="h-full glass rounded-2xl p-6 relative overflow-hidden group hover:border-[#996600]/50 transition-all">
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle at center, ${app.color}20 0%, transparent 70%)` }}
                    />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${app.color} 0%, ${app.color}99 100%)`,
                            boxShadow: `0 4px 20px ${app.color}40`,
                          }}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#003366]/50 text-[#996600] text-xs font-medium">
                          {isZh ? app.category.zh : app.category.en}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#996600] transition-colors">
                          {app.name}
                        </h3>
                        <p className="text-[#C0C0C0] text-sm leading-relaxed mb-4">
                          {isZh ? app.description.zh : app.description.en}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {app.platform.map((platform) => (
                          <span key={platform} className="px-2 py-1 rounded bg-[#003366]/30 text-[#C0C0C0] text-xs">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Download Tips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Lightbulb className="w-7 h-7 text-[#996600]" />
                {t.apps.tipsTitle}
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-[#003366]/30">
                  <h4 className="text-white font-semibold mb-2">{t.apps.iosTitle}</h4>
                  <p className="text-[#C0C0C0] text-sm">{t.apps.iosBody}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#003366]/30">
                  <h4 className="text-white font-semibold mb-2">{t.apps.androidTitle}</h4>
                  <p className="text-[#C0C0C0] text-sm">{t.apps.androidBody}</p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-[#996600]/10 border border-[#996600]/20">
                <p className="text-[#996600] text-sm">
                  <span className="font-semibold">{t.apps.tipHighlight}: </span>
                  {t.apps.tipHighlightBody}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {QUICK_LINKS.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  className="p-4 rounded-xl bg-[#003366]/20 border border-[#996600]/10 text-center hover:border-[#996600]/30 transition-all"
                >
                  <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center text-[#C0C0C0]">
                    <link.icon className="w-5 h-5" />
                  </div>
                  <p className="text-white text-sm">{link.name}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <AIClubBanner />
    </main>
  );
}
