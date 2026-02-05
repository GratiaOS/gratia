import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { SpiritModeProvider } from '@/components/SpiritModeProvider';
import DevToggles from '@/components/DevToggles';
import { SkinFieldProvider } from './skin/SkinFieldProvider';
import { defaultLocale, supportedLocales } from '../i18n/config';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gratia',
  description:
    'Gratia is a gentle space of memory and presence. A free space where creation feels safe again.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/mark/gratia-mark.svg', type: 'image/svg+xml' }],
    other: [{ rel: 'mask-icon', url: '/mark/gratia-mark-outline.svg' }],
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const skinCookie = cookieStore.get('gratiaSkinId')?.value ?? cookieStore.get('gratia.skinId')?.value;
  const initialSkin =
    skinCookie === 'SUN' ||
    skinCookie === 'MOON' ||
    skinCookie === 'GARDEN' ||
    skinCookie === 'STELLAR' ||
    skinCookie === 'OFF'
      ? skinCookie
      : undefined;

  const setInitialSkin = `
    try {
      if (!document.documentElement.dataset.skinId) {
        const stored =
          window.localStorage.getItem('gratiaSkinId') ??
          window.localStorage.getItem('gratia.skinId');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const next = stored
          ? (prefersDark && stored === 'SUN' ? 'MOON' : stored)
          : prefersDark ? 'MOON' : 'SUN';
        document.documentElement.dataset.skinId = next;
      }
    } catch (e) {
      document.documentElement.dataset.skinId = 'MOON';
    }
  `;
  const setInitialTypo = `
    try {
      const stored = window.localStorage.getItem('gratia.typo');
      const next = stored === 'mono' ? 'mono' : 'ui';
      document.documentElement.dataset.typo = next;
    } catch (e) {
      document.documentElement.dataset.typo = 'ui';
    }
  `;
  const setInitialLocale = `
    try {
      const supported = ${JSON.stringify(supportedLocales)};
      const params = new URLSearchParams(window.location.search);
      const fromQuery = params.get('lang');
      const stored = window.localStorage.getItem('gratia.locale');
      const pick = (value) => (value && supported.includes(value) ? value : null);
      const next = pick(fromQuery) || pick(stored) || '${defaultLocale}';
      document.documentElement.lang = next;
      if (fromQuery && pick(fromQuery)) {
        window.localStorage.setItem('gratia.locale', next);
      }
    } catch (e) {
      document.documentElement.lang = '${defaultLocale}';
    }
  `;

  return (
    <html lang={defaultLocale} dir="ltr" data-typo="ui" data-skin-id={initialSkin} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialSkin }} />
        <script dangerouslySetInnerHTML={{ __html: setInitialTypo }} />
        <script dangerouslySetInnerHTML={{ __html: setInitialLocale }} />
      </head>
      <body className={inter.className}>
        <SkinFieldProvider>
          <SpiritModeProvider>{children}</SpiritModeProvider>
        </SkinFieldProvider>
        {process.env.NODE_ENV === 'development' ? <DevToggles /> : null}
      </body>
    </html>
  );
}
