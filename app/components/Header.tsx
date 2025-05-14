import GratiaLogo from '@/components/GratiaLogo';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-linear-to-b from-[#F9F5EC] to-[#E5DCC5] text-black px-8 pt-24 pb-12 flex flex-col items-start justify-end text-left">
      <GratiaLogo className="w-48 h-auto mb-8 animate-pulse-slow" />

      <div className="text-sm uppercase tracking-widest text-gray-500 mb-2">1 Surface Layer</div>

      <h1 className="text-4xl font-semibold mb-4 tracking-tight">A sacred pulse of reciprocity.</h1>

      <p className="text-xl max-w-xl leading-relaxed mb-2">Rooted in presence. Moving through grace.</p>

      <p className="text-md italic text-gray-600 mb-6">“Small seeds, big soul.”</p>

      <div className="flex gap-4">
        <Link href="/manifesto">
          <button className="px-5 py-2 bg-black text-white rounded-full text-sm">Read Manifesto</button>
        </Link>
        <button className="px-5 py-2 border border-black rounded-full text-sm">Español</button>
      </div>
    </header>
  );
}
