'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useUniversity } from '@/lib/university';
import { PRESETS, DEFAULT_SITE_CONFIG } from '@/lib/site-configs';
import { useI18n } from '@/lib/i18n';

const PRESET_DESCRIPTIONS: Record<string, { city: string; tagline: string; emoji: string }> = {
  hkust: { city: 'Hong Kong', tagline: 'Advancing Knowledge', emoji: 'HKUST' },
  cuhk: { city: 'Hong Kong', tagline: '博文约礼', emoji: 'CUHK' },
  hku: { city: 'Hong Kong', tagline: '明德格物', emoji: 'HKU' },
  pku: { city: 'Beijing', tagline: '思想自由 · 兼容并包', emoji: 'PKU' },
  personal: { city: 'Anywhere', tagline: 'Build your own', emoji: 'DIY' },
};

interface PreviewCardProps {
  presetKey: string;
  config: typeof DEFAULT_SITE_CONFIG;
  isCurrent: boolean;
  onPick: () => void;
}

function PreviewCard({ presetKey, config, isCurrent, onPick }: PreviewCardProps) {
  const info = PRESET_DESCRIPTIONS[presetKey];
  return (
    <motion.button
      onClick={onPick}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`text-left relative rounded-2xl overflow-hidden border-2 transition-all w-full p-6 ${
        isCurrent ? 'border-current shadow-2xl' : 'border-white/10 hover:border-white/30'
      }`}
      style={{
        borderColor: isCurrent ? config.theme.highlightGold : undefined,
        background: `linear-gradient(135deg, ${config.theme.darkBlue}, ${config.theme.blue}cc)`,
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${config.theme.blue}, ${config.theme.gradient.to})`,
            color: config.theme.gold,
            border: `1px solid ${config.theme.gold}4D`,
          }}
        >
          {info?.emoji || config.shortCode}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-[10px] uppercase tracking-[0.2em] font-semibold"
            style={{ color: config.theme.highlightGold }}
          >
            {info?.city || config.city}
          </p>
          <h3 className="text-base font-bold text-white leading-tight">
            {config.nameEn}
          </h3>
          <p className="text-xs text-white/60 mt-0.5">{config.name}</p>
        </div>
        {isCurrent && (
          <span
            className="px-2 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider"
            style={{
              background: config.theme.gold,
              color: config.theme.darkBlue,
            }}
          >
            Current
          </span>
        )}
      </div>

      <p className="text-sm italic text-white/80 mb-4">
        {info?.tagline || config.tagline}
      </p>

      <div className="flex gap-2">
        <div
          className="h-8 w-8 rounded-md"
          style={{ background: config.theme.blue }}
          title="primary"
        />
        <div
          className="h-8 w-8 rounded-md"
          style={{ background: config.theme.gold }}
          title="accent"
        />
        <div
          className="h-8 w-8 rounded-md"
          style={{ background: config.theme.highlightGold }}
          title="highlight"
        />
        <div
          className="h-8 w-8 rounded-md"
          style={{ background: config.theme.lightBlue }}
          title="light"
        />
      </div>

      <p className="text-[10px] text-white/40 mt-3 uppercase tracking-wider">
        Click to preview · {config.navItems.length} pages
      </p>
    </motion.button>
  );
}

export default function PreviewPage() {
  const { presetKey, setPresetKey } = useUniversity();
  const { locale } = useI18n();
  const [showCopied, setShowCopied] = useState(false);
  const isZh = locale === 'zh';

  const handleReset = () => setPresetKey(null);

  return (
    <main className="min-h-screen px-4 md:px-8 pt-28 pb-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link
            href="/hub"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {isZh ? '返回' : 'Back to Hub'}
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {isZh ? '模板预览' : 'Template Preview'}
          </h1>
          <p className="text-white/60 text-base max-w-2xl mb-2">
            {isZh
              ? '这是一个开源自定义模板。点击任意大学卡片即可切换整个网站的品牌、内容和颜色——全部通过本地存储实现，无需后端。'
              : 'This is an open-source customisable template. Click any university card to swap the entire site\'s brand, content, and color palette — all powered by localStorage, no backend needed.'}
          </p>
          <p className="text-white/40 text-sm">
            {isZh ? '技术栈' : 'Powered by'}: Next.js 16 · React 19 · Framer Motion · GSAP · Three.js
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={handleReset}
            disabled={presetKey === null}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              presetKey === null
                ? 'border-white/30 text-white bg-white/10 cursor-default'
                : 'border-white/20 text-white/80 hover:border-white/40 hover:bg-white/5'
            }`}
          >
            {isZh ? '重置为默认' : 'Reset to Default'}
          </button>

          <button
            onClick={async () => {
              const url = new URL(window.location.origin);
              if (presetKey) url.searchParams.set('preset', presetKey);
              try {
                await navigator.clipboard.writeText(url.toString());
                setShowCopied(true);
                setTimeout(() => setShowCopied(false), 1500);
              } catch {
                /* ignore */
              }
            }}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-white/20 text-white/80 hover:border-white/40 hover:bg-white/5"
          >
            {showCopied ? (isZh ? '已复制' : 'Copied') : (isZh ? '复制当前 URL' : 'Copy URL')}
          </button>

          <a
            href="https://github.com/clarkwei-101/hkust-admission-letter"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-medium border border-white/20 text-white/80 hover:border-white/40 hover:bg-white/5 inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .5C5.7.5.6 5.6.6 11.9c0 5.1 3.3 9.4 7.8 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2 0 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.7 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.9C23.4 5.6 18.3.5 12 .5z"/>
            </svg>
            {isZh ? 'GitHub 源码' : 'Source on GitHub'}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(PRESETS).map(([key, config]) => (
            <PreviewCard
              key={key}
              presetKey={key}
              config={config}
              isCurrent={key === presetKey || (key === 'hkust' && presetKey === null)}
              onPick={() => setPresetKey(key as any)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
        >
          <h2 className="text-lg font-bold text-white mb-3">
            {isZh ? '如何自定制' : 'How to customise'}
          </h2>
          <ol className="space-y-3 text-sm text-white/70">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center font-mono text-xs">1</span>
              <span>
                {isZh
                  ? 'Fork GitHub 仓库: github.com/clarkwei-101/hkust-admission-letter'
                  : 'Fork the GitHub repo: github.com/clarkwei-101/hkust-admission-letter'}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center font-mono text-xs">2</span>
              <span>
                {isZh
                  ? '修改 src/lib/site-configs/your-university.ts （参考 hkust.ts 作为模板）'
                  : 'Edit src/lib/site-configs/your-university.ts (use hkust.ts as a template)'}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center font-mono text-xs">3</span>
              <span>
                {isZh
                  ? '或完全自定义颜色、内容、院系、社团、App推荐、地标'
                  : 'Or fully customise the colors, content, schools, clubs, apps, milestones — every piece is config-driven'}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center font-mono text-xs">4</span>
              <span>
                {isZh
                  ? '修改 site.config.ts 中的 DEFAULT_SITE_CONFIG（或者新增一个 preset 并加到 site-configs/index.ts 的 PRESETS 中）'
                  : 'Modify DEFAULT_SITE_CONFIG in site.config.ts (or add a new preset key to PRESETS in site-configs/index.ts)'}
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center font-mono text-xs">5</span>
              <span>
                {isZh
                  ? '推送至 GitHub 并用 Vercel 一键部署 — 完整 README 见 CONFIGURATION.md'
                  : 'Push to GitHub and deploy with Vercel one-click — see CONFIGURATION.md for the full guide'}
              </span>
            </li>
          </ol>
        </motion.div>
      </div>
    </main>
  );
}
