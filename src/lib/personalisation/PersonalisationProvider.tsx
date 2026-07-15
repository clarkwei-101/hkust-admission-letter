'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface PersonalisationState {
  name: string;
  setName: (name: string) => void;
  hasName: boolean;
  clearName: () => void;
}

const STORAGE_KEY = 'hkust-admission-name';

const sanitizeName = (raw: string | null | undefined): string => {
  if (!raw) return '';
  const trimmed = raw.trim();
  if (!trimmed) return '';
  // Reject any value that contains the literal "undefined" / "null" tokens
  // which were accidentally concatenated in earlier sessions.
  if (/^(undefined|null|undefinednull|nullundefined)$/i.test(trimmed)) return '';
  // Strip leading literal "undefined" or "null" strings concatenated with
  // a real name (e.g. "undefinedAlex", "null小明").
  const cleaned = trimmed.replace(/^(undefined|null)+/i, '');
  return cleaned.trim();
};

const PersonalisationContext = createContext<PersonalisationState | null>(null);

export function PersonalisationProvider({ children }: { children: ReactNode }) {
  const [name, setNameState] = useState('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const clean = sanitizeName(stored);
      if (clean !== stored) {
        // Persist sanitized value (or remove if invalid) to heal state.
        if (clean) localStorage.setItem(STORAGE_KEY, clean);
        else localStorage.removeItem(STORAGE_KEY);
      }
      if (clean) setNameState(clean);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const setName = (next: string) => {
    const clean = sanitizeName(next);
    setNameState(clean);
    try {
      if (clean) localStorage.setItem(STORAGE_KEY, clean);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  const clearName = () => {
    setNameState('');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return (
    <PersonalisationContext.Provider
      value={{
        name: hydrated ? name : '',
        setName,
        clearName,
        hasName: hydrated ? name.trim().length > 0 : false,
      }}
    >
      {children}
    </PersonalisationContext.Provider>
  );
}

export function usePersonalisation() {
  const ctx = useContext(PersonalisationContext);
  if (!ctx) throw new Error('usePersonalisation must be used within PersonalisationProvider');
  return ctx;
}
