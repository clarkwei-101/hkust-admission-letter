'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation/Navigation';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import {
  Building, Building2, Book, FlaskConical, Waves, Home, LucideIcon,
  MapPin, ExternalLink,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const buildingIconMap: Record<string, LucideIcon> = {
  Building, Building2, Book, FlaskConical,
};

const BUILDINGS = [
  { name: '学术楼', nameEn: 'Academic Building', description: '主教学楼，设有演讲厅、实验室和研究中心', descriptionEn: 'Main teaching building with lecture theatres, labs and research centres.', icon: 'Building' },
  { name: '图书馆', nameEn: 'Library', description: '24小时开放的现代化图书馆，收藏丰富学术资源', descriptionEn: 'A 24/7 waterfront study hub with the richest research collections.', icon: 'Book' },
  { name: '学生中心', nameEn: 'Student Centre', description: '学生会办公室、活动场地和餐饮服务', descriptionEn: 'Students’ Union office, event spaces, and all dining halls.', icon: 'Building2' },
  { name: '赛马会大气研究中心', nameEn: 'Jockey Club IAS', description: '世界级大气科学研究设施', descriptionEn: 'World-class atmospheric research facility on the cliff edge.', icon: 'FlaskConical' },
];

const QUICK_BTNS = [
  { nameZh: '主教学楼', nameEn: 'Academic Building', Icon: Building2 },
  { nameZh: '图书馆', nameEn: 'Library', Icon: Book },
  { nameZh: '体育中心', nameEn: 'Sports Centre', Icon: Waves },
  { nameZh: '学生宿舍', nameEn: 'Halls of Residence', Icon: Home },
];

export default function CampusPage() {
  const { t, locale } = useI18n();
  const isZh = locale === 'zh';

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation showBackButton title={isZh ? '校园建筑' : 'Campus'} />

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
                <Building className="w-12 h-12 text-[#996600]" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-gradient-gold">{isZh ? '校园建筑' : 'Campus'}</span>
            </h1>
            <p className="text-xl text-[#C0C0C0]">
              {isZh ? '标志性建筑与海湾位置' : 'Iconic buildings & waterfront location'}
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-[#996600] to-transparent mx-auto" />
          </motion.div>

          {/* Map placeholder, links to Virtual Tour */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="glass rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#003366]/50 to-transparent" />

              <div className="relative z-10 text-center">
                <Link
                  href="/content/virtual-tour"
                  className="block w-full h-64 md:h-80 rounded-xl overflow-hidden border border-[#996600]/30 mb-6 relative group"
                >
                  <iframe
                    title="HKUST"
                    src="https://maps.google.com/maps?q=Hong%20Kong%20University%20of%20Science%20and%20Technology&t=m&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    className="grayscale-[0.2] contrast-110 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-md bg-black/70 text-white/80 text-xs backdrop-blur inline-flex items-center gap-1.5">
                    {t.campus.mapCaption}
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </Link>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {QUICK_BTNS.map((item) => (
                    <div key={item.nameEn} className="p-4 rounded-xl bg-[#003366]/30 border border-[#996600]/10">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-[#996600]/20 flex items-center justify-center">
                        <item.Icon className="w-5 h-5 text-[#996600]" />
                      </div>
                      <p className="text-white text-sm">{isZh ? item.nameZh : item.nameEn}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            {t.campus.buildingsTitle}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {BUILDINGS.map((building, index) => {
              const Icon = buildingIconMap[building.icon] || Building;
              return (
                <motion.div
                  key={building.nameEn}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="glass rounded-2xl p-6 h-full border border-[#996600]/20 hover:border-[#996600]/50 transition-all">
                    <div className="w-full h-48 rounded-xl bg-[#003366]/50 mb-6 flex items-center justify-center border-2 border-dashed border-[#996600]/20">
                      <div className="text-center">
                        <div className="w-14 h-14 mx-auto mb-2 rounded-xl bg-[#996600]/20 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-[#996600]" />
                        </div>
                        <p className="text-[#C0C0C0] text-xs">{isZh ? '示意图' : 'Illustration'}</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {isZh ? building.name : building.nameEn}
                    </h3>
                    <p className="text-[#996600] text-sm mb-3">{isZh ? building.nameEn : building.name}</p>
                    <p className="text-[#C0C0C0] text-sm leading-relaxed">
                      {isZh ? building.description : building.descriptionEn}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16"
          >
            <div className="glass rounded-2xl p-8 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[#996600]/20 flex items-center justify-center">
                <MapPin className="w-7 h-7 text-[#996600]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{t.campus.locationTitle}</h3>
              <p className="text-[#C0C0C0] mb-4">{t.campus.addressLine1}</p>
              <p className="text-[#996600] text-sm">{t.campus.addressLine2}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <AIClubBanner />
    </main>
  );
}
