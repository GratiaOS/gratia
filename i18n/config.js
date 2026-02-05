export const locales = ['es', 'ro', 'en'];
export const defaultLocale = 'es';
export const namespaces = ['vortex', 'common', 'reflection', 'patterns', 'about'];

export const supportedLocales = [...locales];

export function isSupportedLocale(locale) {
  return !!locale && supportedLocales.includes(locale);
}
