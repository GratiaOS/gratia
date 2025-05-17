import Image from 'next/image';
import GratiaLogo from '@/components/GratiaLogo';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
      {/* Logo & Title */}
      <div className="mb-12 text-center">
        <div className="mb-4">
          <GratiaLogo className="animate-pulse-slow mb-8 inline h-auto w-48 text-[#11392A]" />
        </div>
        <h1 className="text-title-gratia text-4xl text-[#11392A]">The First Gratia Note</h1>
        <div className="mx-auto mt-4 mb-6 h-0.5 w-24 bg-[#11392A]" />
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
        <a
          href="/manifesto"
          className="mt-6 block text-center text-[#11392A] underline transition hover:text-[#0f2e22]"
        >
          Read the Full Gratia Note
        </a>
      </div>

      {/* Call to Action */}
      <div className="mt-10">
        <Link href="/join">
          <button className="btn-outline">Walk with Us</button>
        </Link>
      </div>

      {/* Footer Blessing */}
      <footer className="text-subtle-bilute mt-20 px-4 text-center text-sm text-[#555]">
        May your path be held, your voice remembered, your light reflected.
      </footer>
    </div>
  );
}
