'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Heart,
  GraduationCap,
  Clock,
  Building2,
  Users,
  BookOpen,
  Smartphone,
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Heart,
  GraduationCap,
  Clock,
  Building2,
  Users,
  BookOpen,
  Smartphone,
};

interface ContentCardProps {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  index: number;
}

export default function ContentCard({
  title,
  titleEn,
  description,
  icon,
  href,
  color,
  index,
}: ContentCardProps) {
  const Icon = iconMap[icon] || Heart;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
    >
      <Link href={href}>
        <div
          className="relative h-full p-6 md:p-8 rounded-2xl border border-[#996600]/20 cursor-pointer group overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
          }}
        >
          {/* Animated border */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${color}, ${color})`,
                opacity: 0.1,
              }}
            />
            <div className="absolute inset-[1px] rounded-2xl bg-[#002244]" />
            <div
              className="absolute inset-0 rounded-2xl border-2"
              style={{ borderColor: color }}
            />
          </div>

          {/* Default border */}
          <div className="absolute inset-0 rounded-2xl border border-[#996600]/20 group-hover:border-transparent transition-colors" />

          {/* Glow effect on hover */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
            style={{
              background: `radial-gradient(circle at center, ${color}30 0%, transparent 70%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Icon */}
            <motion.div
              className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4 md:mb-6 transition-all duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
                boxShadow: `0 4px 20px ${color}40`,
              }}
            >
              <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </motion.div>

            {/* Text */}
            <div className="flex-grow">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-[#996600] transition-colors">
                {titleEn}
              </h3>
              <p className="text-sm text-[#996600] font-medium mb-2 md:mb-3">
                {title}
              </p>
              <p className="text-sm text-[#C0C0C0] leading-relaxed">
                {description}
              </p>
            </div>

            {/* Arrow */}
            <motion.div
              className="mt-4 md:mt-6 flex items-center gap-2 text-sm font-medium"
              style={{ color }}
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                Enter
              </span>
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </motion.svg>
            </motion.div>
          </div>

          {/* Decorative corner */}
          <div
            className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at top right, ${color}20 0%, transparent 70%)`,
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
