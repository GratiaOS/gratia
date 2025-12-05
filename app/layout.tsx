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

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <script dangerouslySetInnerHTML={{ __html: setInitialSkin }} />
        <SkinFieldProvider>
          <SpiritModeProvider>{children}</SpiritModeProvider>
        </SkinFieldProvider>
      </body>
    </html>
  );
}
