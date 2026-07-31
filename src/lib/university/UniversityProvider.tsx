'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { DEFAULT_SITE_CONFIG, type SiteConfig } from '@/lib/site.config';

interface UniversityContextValue {
  config: SiteConfig;
}

const UniversityContext = createContext<UniversityContextValue | null>(null);

export function UniversityProvider({ children }: { children: ReactNode }) {
  // The site ships with a single canonical identity (HKUST). Earlier revisions
  // supported a localStorage-driven preset switcher, but it has been removed —
  // forks should edit `site.config.ts` directly and rebuild instead.
  const value: UniversityContextValue = { config: DEFAULT_SITE_CONFIG };

  return <UniversityContext.Provider value={value}>{children}</UniversityContext.Provider>;
}

export function useUniversity(): UniversityContextValue {
  const ctx = useContext(UniversityContext);
  if (!ctx) throw new Error('useUniversity must be used within UniversityProvider');
  return ctx;
}

export function useSiteConfig(): SiteConfig {
  return useUniversity().config;
}