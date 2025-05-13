import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'gratia.',
  description: 'A sacred pulse of reciprocity',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-[#F6F3EB] text-[#2d2d2d] font-serif">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
