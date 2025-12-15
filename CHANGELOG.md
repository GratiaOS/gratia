# Changelog

## December 2025

- **About page added** in `app/about/` (calm tone, no CTAs), using `@gratiaos/ui` + token classes and `useSkinField` (Sun/Moon).
- **i18n for About**:
  - `AboutPageClient.tsx` uses `I18nProvider` + `useTranslation('about')`.
  - New locale bundles: `locales/en|es|ro/about.json`.
  - Wiring updated: `i18n/config.js` (adds `about` namespace) + `i18n/resources.ts` (imports + fallbacks, types accept namespace).
- **Pattern Mirror locale enforcement tightened**:
  - Prompts explicitly require the requested language.
  - Runtime guard detects language drift and falls back to localized samples (`meta.source: "sample-lang-guard"`).
  - Types updated for the new `meta.source`.
- **Medium comment locale sync fixed** in `app/pattern-mirror/PatternMirrorPageClient.tsx`:
  - Tracks `mediumCommentLocale`.
  - Resets comment state on locale switch / new fetch.
  - Only shows preview when it matches current locale.
- **TypeScript green**: `pnpm tsc --noEmit` OK.
