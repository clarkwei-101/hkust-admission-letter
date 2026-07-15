'use client';

import { I18nProvider, useI18n, LOCALES, LOCALE_LABELS, Locale } from '@/lib/i18n';
import { PersonalisationProvider } from '@/lib/personalisation';
import { ReactNode } from 'react';

function LanguageSwitcherInner() {
  const { locale, setLocale } = useI18n();
  const next: Record<Locale, Locale> = { en: 'zh', zh: 'en' };

  return (
    <button
      onClick={() => setLocale(next[locale])}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-medium transition-colors backdrop-blur"
      aria-label={`Switch language, currently ${LOCALE_LABELS[locale].native}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span>{LOCALE_LABELS[locale].native}</span>
    </button>
  );
}

export function LanguageSwitcher() {
  return <LanguageSwitcherInner />;
}

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <PersonalisationProvider>{children}</PersonalisationProvider>
    </I18nProvider>
  );
}
