'use client';

import { useEffect } from 'react';
import { useUniversity } from '@/lib/university';

/**
 * Injects the live-preview site's theme tokens as CSS custom properties on
 * `document.documentElement`, so the entire cascade (globals.css + Tailwind
 * arbitrary classes reading var(--hkust-blue) etc.) updates without a hard
 * reload of the stylesheet.
 *
 * Falls back to the default theme if no preset is active.
 */
export function ThemeRoot() {
  const { config } = useUniversity();
  const t = config.theme;

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
  }, [config]);

  return null;
}
