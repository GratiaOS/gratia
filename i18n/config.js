export const locales = ['es', 'en', 'de', 'ar'];
export const defaultLocale = 'es';
export const namespaces = ['vortex', 'common'];

export const supportedLocales = [...locales];

export function isSupportedLocale(locale) {
  return !!locale && supportedLocales.includes(locale);
}
