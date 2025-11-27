import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import { SpiritModeProvider } from '@/components/SpiritModeProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gratia',
  description: 'Gratia is a gentle space of memory and presence. A free space where creation feels safe again.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SpiritModeProvider>{children}</SpiritModeProvider>
      </body>
    </html>
  );
}
