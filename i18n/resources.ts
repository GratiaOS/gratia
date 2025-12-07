import esVortex from '../locales/es/vortex.json';
import enVortex from '../locales/en/vortex.json';
import deVortex from '../locales/de/vortex.json';
import arVortex from '../locales/ar/vortex.json';
import esCommon from '../locales/es/common.json';
import enCommon from '../locales/en/common.json';
import deCommon from '../locales/de/common.json';
import arCommon from '../locales/ar/common.json';

export const resources = {
  es: {
    vortex: esVortex,
    common: esCommon,
  },
  en: {
    vortex: enVortex,
    common: enCommon,
  },
  de: {
    vortex: deVortex,
    common: deCommon,
  },
  ar: {
    vortex: arVortex,
    common: arCommon,
  },
} as const;

export type Resources = typeof resources;
export type Locale = keyof Resources;
