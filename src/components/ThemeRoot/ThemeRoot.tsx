'use client';

import { useEffect } from 'react';
import { DEFAULT_SITE_CONFIG } from '@/lib/site.config';

/**
 * Injects the site's theme tokens as CSS custom properties on
 * `document.documentElement`, so the entire cascade (globals.css + Tailwind
 * arbitrary classes reading var(--hkust-blue) etc.) picks up the right palette.
 *
 * Config is constant for this build, so we just write once on mount.
 */
export function ThemeRoot() {
  const t = DEFAULT_SITE_CONFIG.theme;
  const config = DEFAULT_SITE_CONFIG;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.style.setProperty('--hkust-blue', t.blue);
    root.style.setProperty('--hkust-gold', t.gold);
    root.style.setProperty('--hkust-light-blue', t.lightBlue);
    root.style.setProperty('--hkust-dark-blue', t.darkBlue);
    root.style.setProperty('--hkust-silver', t.silver);
    root.style.setProperty('--hkust-highlight-gold', t.highlightGold);
    root.style.setProperty('--site-short-code', config.shortCode);
    root.style.setProperty('--site-name-en', `"${config.nameEn}"`);
    root.dataset.siteKey = config.key;
    document.title = config.nameEn;
  }, [t, config]);

  return null;
}