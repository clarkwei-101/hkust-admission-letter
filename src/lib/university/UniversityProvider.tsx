'use client';

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { DEFAULT_SITE_CONFIG, PRESETS, PresetKey, isPresetKey, type SiteConfig } from '@/lib/site-configs';

interface UniversityContextValue {
  config: SiteConfig;
  presetKey: PresetKey | null;
  setPresetKey: (key: PresetKey | null) => void;
  isPreviewing: boolean;
}

const UniversityContext = createContext<UniversityContextValue | null>(null);

const STORAGE_KEY = 'site-preset-key';

function detectInitialPreset(): PresetKey | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isPresetKey(stored)) return stored;
  } catch {
    /* ignore */
  }
  return null;
}

export function UniversityProvider({ children }: { children: ReactNode }) {
  const [presetKey, setPresetKeyState] = useState<PresetKey | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPresetKeyState(detectInitialPreset());
    setHydrated(true);

    // Listen for cross-tab updates and localStorage events
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        if (isPresetKey(e.newValue)) {
          setPresetKeyState(e.newValue);
        } else {
          setPresetKeyState(null);
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setPresetKey = (key: PresetKey | null) => {
    setPresetKeyState(key);
    try {
      if (key) {
        localStorage.setItem(STORAGE_KEY, key);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      /* ignore */
    }
    // Theme tokens affect the entire UI — force a refresh so server-rendered
    // HTML (which still defaults to HKUST) matches the live preview.
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('site-preset-changed', { detail: key }));
      // Tiny delay so localStorage write completes before reload
      if ((window as any).__siteReloading) return;
      (window as any).__siteReloading = true;
      window.setTimeout(() => {
        window.location.reload();
      }, 80);
    }
  };

  const value = useMemo<UniversityContextValue>(() => {
    const effective = presetKey && PRESETS[presetKey] ? presetKey : null;
    const config = effective ? PRESETS[effective]! : DEFAULT_SITE_CONFIG;
    return {
      config,
      presetKey,
      setPresetKey,
      isPreviewing: hydrated && effective !== null,
    };
  }, [presetKey, hydrated]);

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
