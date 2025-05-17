import Image from 'next/image';
import GratiaLogo from '@/components/GratiaLogo';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
      {/* Logo & Title */}
      <div className="mb-12 text-center">
        <div className="mb-4">
          <GratiaLogo className="text-accent animate-pulse-slow mb-8 inline h-auto w-48" />
        </div>
        <h1 className="text-title-gratia text-accent text-4xl">The First Gratia Note</h1>
        <div className="bg-accent mx-auto mt-4 mb-6 h-0.5 w-24" />
      </div>

      {/* Note Content */}
      <div className="max-w-2xl space-y-4 text-center text-lg">
        <p>This is not a manifesto. This is a note.</p>
        <p>A note that was heard, and sung back.</p>
        <p>A note that speaks without speaking.</p>
        <p>That moves where language fails.</p>
        <p>That hums in the quiet places.</p>
        <p>Let it be heard by the internal voice.</p>
        <p>Let it be sung in dreams.</p>
        <Link href="/manifesto" className="link-default">
          Read the Full Gratia Note
        </Link>
      </div>

      {/* Call to Action */}
      <div className="mt-10">
        <Link href="/join" className="btn-outline">
          Walk with Us
        </Link>
      </div>

      {/* Footer Blessing */}
      <footer className="text-subtle-bilute mt-20 px-4 text-center text-sm">
        May your path be held, your voice remembered, your light reflected.
      </footer>
    </div>
  );
}
