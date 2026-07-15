'use client';

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import en from './en';
import zh from './zh';

export type Locale = 'en' | 'zh';

export const LOCALES: Locale[] = ['en', 'zh'];

export const LOCALE_LABELS: Record<Locale, { native: string; english: string }> = {
  en: { native: 'English', english: 'English' },
  zh: { native: '中文', english: 'Chinese' },
};

export type Dictionary = {
  meta: { title: string; description: string };
  common: Record<string, string>;
  home: Record<string, any>;
  hub: Record<string, any>;
  nav: Record<string, any>;
  welcome: Record<string, any>;
  countdown: { days: string; hours: string; minutes: string; seconds: string; started: string };
  apps: Record<string, any>;
  academics: Record<string, any>;
  history: Record<string, any>;
  campus: Record<string, any>;
  clubs: Record<string, any>;
  guide: Record<string, any>;
  resources: Record<string, any>;
  checklist: Record<string, any>;
  testimonials: Record<string, any>;
  virtualTour: Record<string, any>;
  campusLive: Record<string, any>;
  envelope: Record<string, any>;
  lang: { label: string; en: string; zh: string };
};

const dictionaries: Record<Locale, Dictionary> = { en, zh };

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = 'hkust-admission-locale';
const DEFAULT_LOCALE: Locale = 'en';

function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'zh') return stored;
  } catch {
    /* ignore */
  }
  // Default: English (as requested)
  return DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLocaleState(detectInitialLocale());
    setHydrated(true);
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const value = useMemo<I18nContextValue>(
    () => ({
      locale: hydrated ? locale : DEFAULT_LOCALE,
      setLocale,
      t: dictionaries[hydrated ? locale : DEFAULT_LOCALE],
    }),
    [locale, hydrated],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
