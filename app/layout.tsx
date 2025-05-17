import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';

// Import fonts via next/font/google
import { Inter, Nunito, Playfair_Display } from 'next/font/google';

const inter = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-selari',
  display: 'swap',
});

const nunito = Nunito({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-bilute',
  display: 'swap',
});

const playfair = Playfair_Display({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-gratia',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'gratia.',
  description: 'A sacred pulse of reciprocity',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${nunito.variable} ${playfair.variable}`}>
      <body>
        <main className="bg-surface text-body min-h-screen">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
