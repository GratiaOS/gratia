import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { SpiritModeProvider } from '@/components/SpiritModeProvider';
import { SkinFieldProvider } from './skin/SkinFieldProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gratia',
  description: 'Gratia is a gentle space of memory and presence. A free space where creation feels safe again.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/mark/gratia-mark.svg', type: 'image/svg+xml' }],
    other: [{ rel: 'mask-icon', url: '/mark/gratia-mark-outline.svg', color: '#F97316' }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const setInitialSkin = `
    try {
      const stored = window.localStorage.getItem('gratia.skinId');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const next = stored ? (prefersDark && stored === 'SUN' ? 'MOON' : stored) : prefersDark ? 'MOON' : 'SUN';
      document.documentElement.dataset.skinId = next;
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

  return (
    <html lang="en" data-typo="ui" suppressHydrationWarning>
      <body className={inter.className}>
        <script dangerouslySetInnerHTML={{ __html: setInitialSkin }} />
        <script dangerouslySetInnerHTML={{ __html: setInitialTypo }} />
        <SkinFieldProvider>
          <SpiritModeProvider>{children}</SpiritModeProvider>
        </SkinFieldProvider>
      </body>
    </html>
  );
}
