import type { Metadata } from 'next';
import { Inter, Nunito, Domine } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gratia.space'),
  title: {
    default: 'Gratia — A sacred pulse of reciprocity',
    template: '%s — Gratia',
  },
  description:
    'Gratia is a living garden of protocols, notes, and invitations. A sacred pulse of reciprocity.',
  openGraph: {
    title: 'Gratia — A sacred pulse of reciprocity',
    description: 'Gratia is a living garden of protocols, notes, and invitations.',
    url: 'https://www.gratia.space',
    siteName: 'Gratia',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const inter = Inter({ subsets: ['latin'], variable: '--font-selari' });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-bilute' });
const domine = Domine({ subsets: ['latin'], variable: '--font-gratia' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${nunito.variable} ${domine.variable}`}>
      <body className="text-body bg-surface min-h-screen antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
