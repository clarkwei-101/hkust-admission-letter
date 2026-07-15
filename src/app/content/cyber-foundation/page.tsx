'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation/Navigation';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import { useI18n } from '@/lib/i18n';
import { Sparkles, Code2, Palette, Zap, Globe, ArrowRight, GitBranch } from 'lucide-react';
import Link from 'next/link';

const PROJECTS = [
  {
    name: 'PvZ AI Agent',
    description:
      'Reinforcement learning powered game AI that reads memory and plays Plants vs. Zombies using PPO and Transformer + LSTM architecture.',
    tags: ['Python', 'PyTorch', 'PPO', 'Memory Reading'],
    href: '#',
    color: '#003366',
  },
  {
    name: '数字马戏团 AI',
    description:
      'Multi-agent AI simulation environment with LLM-driven actors, rendered in Three.js for interactive storytelling and AI research.',
    tags: ['React', 'Three.js', 'LLM', 'Multi-Agent'],
    href: '#',
    color: '#1a4d7c',
  },
];

const SERVICES = [
  { icon: Code2, label: 'Vibe Coding', sub: 'Cursor · Copilot · Claude' },
  { icon: Globe, label: '开源商业化', sub: 'Open Source to Product' },
  { icon: Palette, label: 'AI内容创作', sub: 'Tutorials · AIGC · Vlogs' },
  { icon: Zap, label: 'AI应用', sub: 'Practical AI Tools' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function CyberFoundationPage() {
  const { locale } = useI18n();
  const isZh = locale === 'zh';

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation showBackButton title="Cyber Foundation" />

      <div className="relative z-10 pt-24 md:pt-32 pb-20 px-4 md:px-6">
        <div className="container-hkust mx-auto max-w-5xl space-y-20">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block"
            >
              <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden shadow-2xl border border-[#996600]/30 bg-[#001a33]">
                <img
                  src="/cyber-foundation-icon.png"
                  alt="Cyber Foundation"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#996600]/60 mb-3">
                HKUST · AI应用社
              </p>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                <span className="text-[#996600]">Cyber</span>{' '}
                <span className="text-white">Foundation</span>
              </h1>
              <p className="text-[#C0C0C0] text-sm mt-2 tracking-widest">AI × Science Fiction</p>
            </div>

            <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {isZh
                ? '科技与创新的交汇。连接前沿 AI 技术与创意应用、开源项目。'
                : 'Where technology meets innovation. Bridging cutting-edge AI with creative applications and open-source projects.'}
            </p>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link href="/content/clubs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#996600] to-[#d4a84b] text-white font-semibold shadow-xl shadow-[#996600]/30 hover:shadow-[#996600]/50 transition-all flex items-center gap-2"
                >
                  <span>{isZh ? '了解更多' : 'Learn More'}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <a
                href="https://github.com/clarkwei-101/cyber-foundation"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <GitBranch className="w-4 h-4" />
                  <span>GitHub</span>
                </motion.button>
              </a>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#996600]/40 to-transparent" />

          {/* Stats */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: '2024', label: isZh ? '创立于' : 'Founded', sub: '' },
              { value: '50+', label: isZh ? '社员' : 'Members', sub: '' },
              { value: '2', label: isZh ? '项目' : 'Projects', sub: '' },
              { value: '∞', label: isZh ? '可能性' : 'Possibilities', sub: '' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={item}
                className="glass rounded-2xl p-5 md:p-6 text-center border border-[#996600]/20"
              >
                <p className="text-3xl md:text-4xl font-bold text-[#d4a84b] mb-1">{stat.value}</p>
                <p className="text-white/50 text-xs md:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#996600]/40 to-transparent" />

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {isZh ? '关于我们' : 'About Us'}
              </h2>
              <p className="text-white/60 leading-relaxed mb-4">
                {isZh
                  ? 'Cyber Foundation 是一个专注于 AI 应用与开源开发的学生社团。我们使用 vibe coding 构建产品、参与开源项目、在校园内创造 AI 驱动的内容。'
                  : 'Cyber Foundation is a student society focused on AI applications and open-source development. We vibe-code products, contribute to open source, and create AI-driven content on campus.'}
              </p>
              <p className="text-white/40 text-sm leading-relaxed">
                {isZh
                  ? 'HKUST AI应用社官方运营 · Cyber Foundation 是社团的核心项目平台。'
                  : 'Operated by HKUST AI Applications Society · Cyber Foundation is our flagship project platform.'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass rounded-2xl p-4 border border-[#996600]/20"
                >
                  <s.icon className="w-6 h-6 text-[#996600] mb-3" />
                  <p className="text-white font-semibold text-sm mb-1">{s.label}</p>
                  <p className="text-white/40 text-xs">{s.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#996600]/40 to-transparent" />

          {/* Featured Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              {isZh ? 'Featured Projects' : 'Featured Projects'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {PROJECTS.map((project, i) => (
                <motion.a
                  key={project.name}
                  href={project.href}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl overflow-hidden border border-[#996600]/20 hover:border-[#996600]/50 transition-all group block"
                >
                  <div
                    className="h-40 relative overflow-hidden"
                    style={{ background: project.color }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-xl">{project.name}</h3>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <p className="text-white/60 text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full text-[10px] bg-[#003366]/50 border border-[#996600]/20 text-[#d4a84b]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[#996600] text-xs font-medium pt-1 group-hover:gap-2 transition-all">
                      <span>{isZh ? '查看项目' : 'View Project'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center glass rounded-3xl p-10 md:p-14 border border-[#996600]/30 bg-gradient-to-br from-[#003366]/40 to-transparent"
          >
            <Sparkles className="w-8 h-8 text-[#996600] mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {isZh ? '准备好开始了吗？' : 'Ready to Get Started?'}
            </h2>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              {isZh
                ? '加入我们，一起探索 AI 与开源开发的无限可能。'
                : 'Join us and explore the infinite possibilities of AI and open-source development.'}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/content/clubs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-4 rounded-full bg-gradient-to-r from-[#996600] to-[#d4a84b] text-white font-bold text-lg shadow-xl shadow-[#996600]/40 hover:shadow-[#996600]/60 transition-all"
                >
                  {isZh ? '立即加入' : 'Join Now'}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-40">
        <AIClubBanner />
      </div>
    </main>
  );
}
