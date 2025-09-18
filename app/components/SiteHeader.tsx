import Link from 'next/link';
import GratiaMark from '@/components/GratiaMark';

export default function SiteHeader() {
  return (
    <header className="w-full border-b border-(--color-border) bg-(--color-bg)/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-block h-8 w-8">
            <GratiaMark />
          </span>
          <span className="font-semibold tracking-wide">Gratia</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/manifesto" className="hover:underline">
            Manifesto
          </Link>
          <Link href="/protocols" className="hover:underline">
            Protocols
          </Link>
          <Link href="/join" className="hover:underline">
            Join
          </Link>
          <Link href="/contribute" className="hover:underline">
            Contribute
          </Link>
          {/* i18n later: <Link href="/es" className="opacity-60">Español</Link> */}
        </nav>
      </div>
    </header>
  );
}
