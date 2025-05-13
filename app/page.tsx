import Image from 'next/image';
import GratiaLogo from '@/components/GratiaLogo';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
      {/* Logo & Title */}
      <div className="text-center mb-12">
        <div className="mb-4">
          <GratiaLogo className="w-48 h-auto inline mb-8 animate-pulse-slow text-[#11392A]" />
        </div>
        <h1 className="text-4xl font-semibold tracking-wide text-[#11392A]">The First Gratia Note</h1>
        <div className="w-24 h-0.5 bg-[#11392A] mx-auto mt-4 mb-6" />
      </div>

      {/* Note Content */}
      <div className="max-w-2xl text-center space-y-4 text-lg">
        <p>This is not a manifesto. This is a note.</p>
        <p>A note that was heard, and sung back.</p>
        <p>A note that speaks without speaking.</p>
        <p>That moves where language fails.</p>
        <p>That hums in the quiet places.</p>
        <p>Let it be heard by the internal voice.</p>
        <p>Let it be sung in dreams.</p>
        <a href="/manifesto" className="mt-6 block text-center text-[#11392A] underline hover:text-[#0f2e22] transition">
          Read the Full Gratia Note
        </a>
      </div>

      {/* Call to Action */}
      <div className="mt-10">
        <Link href="/join">
          <button className="px-6 py-3 border-2 border-[#11392A] text-[#11392A] rounded-full hover:bg-[#f5f5f5] transition">Walk with Us</button>
        </Link>
      </div>

      {/* Footer Blessing */}
      <footer className="mt-20 text-center text-sm italic text-[#555] px-4">
        May your path be held, your voice remembered, your light reflected.
      </footer>
    </div>
  );
}
