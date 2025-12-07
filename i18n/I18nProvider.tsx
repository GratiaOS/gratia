'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { defaultLocale } from './config.js';
import { resources, type Locale } from './resources';

type Resources = typeof resources;
type DefaultLocale = keyof Resources;
type Namespaces = keyof Resources[DefaultLocale];

// helper: produce "a.b.c" unions for nested objects
type LeafPaths<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends Record<string, any>
    ? LeafPaths<T[K], `${Prefix}${Prefix extends '' ? '' : '.'}${K}`>
    : `${Prefix}${Prefix extends '' ? '' : '.'}${K}`;
}[keyof T & string];

export type TranslationKey<N extends Namespaces> = LeafPaths<Resources[DefaultLocale][N]>;

type I18nContextValue = {
  locale: Locale;
  t: <N extends Namespaces, K extends TranslationKey<N>>(namespace: N, key: K) => string;
};

const I18nContext = createContext<I18nContextValue>({
  locale: defaultLocale as Locale,
  t: (_ns, key) => key,
});

function getNested(obj: any, path: string): unknown {
  return path.split('.').reduce((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) return acc[part];
    return undefined;
  }, obj);
}

function translate<N extends Namespaces, K extends TranslationKey<N>>(locale: Locale, namespace: N, key: K): string {
  const nsPack = resources[locale]?.[namespace];
  const basePack = resources[defaultLocale as Locale]?.[namespace];

  const fromLocale = nsPack && getNested(nsPack, key as string);
  if (typeof fromLocale === 'string') return fromLocale as string;

  const fromDefault = basePack && getNested(basePack, key as string);
  if (typeof fromDefault === 'string') return fromDefault as string;

  return key as string;
}

type ProviderProps = {
  locale?: string;
  children: React.ReactNode;
};

export function I18nProvider({ locale, children }: ProviderProps) {
  const resourceLocales = Object.keys(resources) as Locale[];
  const safeLocale: Locale = resourceLocales.includes(locale as Locale) ? (locale as Locale) : (defaultLocale as Locale);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale: safeLocale,
      t: (namespace, key) => translate(safeLocale, namespace, key as any),
    }),
    [safeLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation<N extends Namespaces>(namespace: N) {
  const { locale, t } = useContext(I18nContext);
  return {
    locale,
    t: <K extends TranslationKey<N>>(key: K) => t(namespace, key),
  };
}
