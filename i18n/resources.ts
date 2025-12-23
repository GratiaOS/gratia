import arCommon from '../locales/ar/common.json';
import arVortex from '../locales/ar/vortex.json';
import deCommon from '../locales/de/common.json';
import deVortex from '../locales/de/vortex.json';
import enAbout from '../locales/en/about.json';
import enCommon from '../locales/en/common.json';
import enPatterns from '../locales/en/patterns.json';
import enReflection from '../locales/en/reflection.json';
import enVortex from '../locales/en/vortex.json';
import esAbout from '../locales/es/about.json';
import esCommon from '../locales/es/common.json';
import esPatterns from '../locales/es/patterns.json';
import esReflection from '../locales/es/reflection.json';
import esVortex from '../locales/es/vortex.json';
import roAbout from '../locales/ro/about.json';
import roCommon from '../locales/ro/common.json';
import roPatterns from '../locales/ro/patterns.json';
import roReflection from '../locales/ro/reflection.json';
import roVortex from '../locales/ro/vortex.json';

export const resources = {
  es: {
    vortex: esVortex,
    common: esCommon,
    reflection: esReflection,
    patterns: esPatterns,
    about: esAbout,
  },
  en: {
    vortex: enVortex,
    common: enCommon,
    reflection: enReflection,
    patterns: enPatterns,
    about: enAbout,
  },
  fr: {
    vortex: enVortex,
    common: enCommon,
    reflection: enReflection,
    patterns: enPatterns,
    about: enAbout,
  },
  de: {
    vortex: deVortex,
    common: deCommon,
    reflection: enReflection,
    patterns: enPatterns,
    about: enAbout,
  },
  ar: {
    vortex: arVortex,
    common: arCommon,
    reflection: enReflection,
    patterns: enPatterns,
    about: enAbout,
  },
  ro: {
    vortex: roVortex,
    common: roCommon,
    reflection: roReflection,
    patterns: roPatterns,
    about: roAbout,
  },
} as const;

export type Resources = typeof resources;
export type Locale = keyof Resources;
