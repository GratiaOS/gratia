'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type KernelSkinId = 'SUN' | 'MOON' | 'GARDEN' | 'STELLAR' | 'OFF';

type SkinFieldContextValue = {
  skinId: KernelSkinId;
  setSkinId: (id: KernelSkinId) => void;
};

const SkinFieldContext = createContext<SkinFieldContextValue | null>(null);

export function useSkinField(): SkinFieldContextValue {
  const ctx = useContext(SkinFieldContext);
  if (!ctx) {
    throw new Error('useSkinField must be used within <SkinFieldProvider>');
  }
  return ctx;
}

const STORAGE_KEY = 'gratia.skinId';

export function SkinFieldProvider({ children }: { children: React.ReactNode }) {
  const [skinId, setSkinIdState] = useState<KernelSkinId>('MOON');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as KernelSkinId | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (stored) {
      // dacă sistemul e pe dark și ultimul skin era SUN, folosim MOON ca default de siguranță
      const next = prefersDark && stored === 'SUN' ? 'MOON' : stored;
      setSkinIdState(next);
      document.documentElement.dataset.skinId = next;
    }
  }, []);

  const setSkinId = (id: KernelSkinId) => {
    setSkinIdState(id);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, id);
      document.documentElement.dataset.skinId = id;
    }
  };

  useEffect(() => {
    document.documentElement.dataset.skinId = skinId;
  }, [skinId]);

  return <SkinFieldContext.Provider value={{ skinId, setSkinId }}>{children}</SkinFieldContext.Provider>;
}
