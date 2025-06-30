import GratiaLogo from '@/components/GratiaLogo';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex flex-col items-start justify-end bg-gradient-to-b from-[#F9F5EC] to-[#E5DCC5] px-8 pt-24 pb-12 text-left text-black">
      <GratiaLogo className="animate-pulse-slow mb-8 h-auto w-48" />

      <div className="mb-2 text-sm tracking-widest text-gray-500 uppercase">1 Surface Layer</div>

      <h1 className="mb-4 text-4xl font-semibold tracking-tight">A sacred pulse of reciprocity.</h1>

      <p className="mb-2 max-w-xl text-xl leading-relaxed">
        Rooted in presence. Moving through grace.
      </p>

      <p className="text-md mb-6 text-gray-600 italic">“Small seeds, big soul.”</p>

      <div className="flex gap-4">
        <Link href="/manifesto">
          <button className="rounded-full bg-black px-5 py-2 text-sm text-white">
            Read Manifesto
          </button>
        </Link>
        <button className="rounded-full border border-black px-5 py-2 text-sm">Español</button>
      </div>
    </header>
  );
}
