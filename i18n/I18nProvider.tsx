'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { defaultLocale, locales } from './config.js';
import { resources } from './resources.js';

type Locale = (typeof locales)[number];
type Namespace = keyof (typeof resources)[Locale];

type I18nContextValue = {
  locale: Locale;
  t: (namespace: Namespace, key: string) => string;
};

const I18nContext = createContext<I18nContextValue>({
  locale: defaultLocale,
  t: (_ns, key) => key,
});

function getNested(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) return acc[part];
    return undefined;
  }, obj);
}

function translate(locale: Locale, namespace: Namespace, key: string) {
  const nsPack = resources[locale]?.[namespace];
  const basePack = resources[defaultLocale]?.[namespace];

  const fromLocale = nsPack && getNested(nsPack, key);
  if (fromLocale !== undefined) return String(fromLocale);

  const fromDefault = basePack && getNested(basePack, key);
  if (fromDefault !== undefined) return String(fromDefault);

  return key;
}

type ProviderProps = {
  locale?: string;
  children: React.ReactNode;
};

export function I18nProvider({ locale, children }: ProviderProps) {
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;

  const value = useMemo(
    () => ({
      locale: safeLocale,
      t: (namespace: Namespace, key: string) => translate(safeLocale, namespace, key),
    }),
    [safeLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation(namespace: Namespace) {
  const { locale, t } = useContext(I18nContext);
  return {
    locale,
    t: (key: string) => t(namespace, key),
  };
}
