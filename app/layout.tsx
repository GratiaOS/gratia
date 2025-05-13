import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'gratia.',
  description: 'A sacred pulse of reciprocity',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
