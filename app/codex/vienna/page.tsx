import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Codex :: Vienna — A broadcasting garden for living code',
  description:
    'Cosmic archival transmissions from the Vienna Broadcasting House to the Gratia garden — a living glyph lab for signals that keep breathing.',
};

export default function CodexViennaPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-zinc-100">
      {/* cosmic gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#1f2937,_#020617)] opacity-80" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,#38bdf8_0,#000_55%),radial-gradient(circle_at_80%_80%,#22c55e_0,#000_55%)] opacity-[0.18] mix-blend-screen"
        aria-hidden="true"
      />

      <section className="relative z-10 mx-auto max-w-4xl space-y-14 px-4 pb-24 pt-16 md:pt-24">
        <Header />
        <Hero />
        <InputGate />
        <OutputGlyph />
        <ArchivePreview />
        <SupportBlock />
        <Footer />
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-zinc-400">
      <Link
        href="/"
        className="rounded-full border border-zinc-700/70 px-3 py-1 transition-colors hover:border-zinc-200/80 hover:text-zinc-100"
      >
        ← back to gratia
      </Link>

      <div className="flex flex-col items-end gap-1 text-right" style={{ fontFamily: 'var(--font-funkhaus)' }}>
        <span>CODEX :: VIENNA</span>
        <span className="text-[0.65rem] tracking-[0.28em] text-zinc-500">a broadcasting garden for living code</span>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="space-y-6">
      <div className="mx-auto max-w-xl overflow-hidden rounded-[2.25rem] border border-zinc-700/70 bg-black/50 shadow-[0_0_60px_rgba(0,0,0,0.9)]">
        <div className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-sky-500/40 via-emerald-400/30 to-purple-500/40">
          <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-emerald-300/60 bg-black/80">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-300/70">
              <div className="h-8 w-2 rounded-full bg-emerald-300/80" />
            </div>
            <div className="absolute inset-0 rounded-full ring-1 ring-emerald-300/40 blur-[1px]" />
          </div>
        </div>
      </div>

      <div className="space-y-2 text-center">
        <h1 className="font-serif text-2xl italic text-zinc-50 md:text-3xl">Messages become constellations.</h1>
        <p className="mx-auto max-w-xl text-sm text-zinc-400">
          From the Vienna Broadcasting House to Gratia’s garden, Codex :: Vienna archives living signals — words, code and whispers
          that choose to keep breathing.
        </p>
      </div>
    </section>
  );
}

function InputGate() {
  return (
    <section className="mt-10 space-y-4">
      <div className="text-xs uppercase tracking-[0.2em] text-emerald-300/70" style={{ fontFamily: 'var(--font-funkhaus)' }}>
        TRANSMISSION GATE
      </div>
      <p className="max-w-xl text-sm text-zinc-300">
        Write a small truth, a question, a fragment of code, a line you’d like to remember. Codex will translate it into a broadcast
        glyph.
      </p>

      <form className="mt-4 space-y-3">
        <textarea
          rows={3}
          className="w-full rounded-2xl border border-zinc-700/70 bg-black/50 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-emerald-300/80 focus:outline-none"
          placeholder="Type your signal here…"
        />
        <div className="flex items-center justify-between gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-emerald-400/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-emerald-950 transition-colors hover:bg-emerald-300"
          >
            Generate transmission
          </button>
          <p className="max-w-xs text-right text-[0.7rem] text-zinc-500">
            Your message is stored as pattern only — the words fade, the signal stays.
          </p>
        </div>
      </form>
    </section>
  );
}

function OutputGlyph() {
  return (
    <section className="mt-12 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-400" style={{ fontFamily: 'var(--font-funkhaus)' }}>
          OUTPUT · LIVING GLYPH
        </h2>
        <span className="text-[0.6rem] text-zinc-500">Funkhaus grid · cosmic archival</span>
      </div>

      <div className="grid items-center gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="flex items-center justify-center rounded-[1.75rem] border border-zinc-700/80 bg-gradient-to-br from-zinc-950 via-zinc-900 to-slate-900 p-6">
          <div className="flex aspect-square w-full max-w-xs items-center justify-center rounded-3xl border border-zinc-700 bg-black/70">
            <span className="font-mono text-xs uppercase tracking-[0.5em] text-emerald-300/80">GLYPH · 00A7</span>
          </div>
        </div>

        <div className="space-y-4 text-sm text-zinc-300">
          <p>
            This glyph is a trace of your signal. It remembers the rhythm, not the sentence. A small orbit in the archive — visible,
            but not legible without you.
          </p>
          <p className="text-xs text-zinc-400">Download it, share it, or keep it as a private coordinate in your own map.</p>

          <div className="flex flex-wrap gap-3 pt-1">
            <button className="rounded-full border border-zinc-600/80 px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors hover:border-emerald-300/80 hover:text-emerald-200">
              Download glyph
            </button>
            <button className="rounded-full border border-zinc-600/80 px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors hover:border-sky-300/80 hover:text-sky-200">
              Share transmission
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchivePreview() {
  return (
    <section className="mt-14 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-400" style={{ fontFamily: 'var(--font-funkhaus)' }}>
          COSMIC ARCHIVE
        </h2>
        <span className="text-[0.65rem] text-zinc-500">last signals · anonymised</span>
      </div>

      <div className="grid gap-3 text-[0.7rem] md:grid-cols-3">
        {['Vienna · 20:13', 'Barcelona · 00:45', 'Online · 11:11'].map((label, i) => (
          <div key={label} className="space-y-2 rounded-2xl border border-zinc-700/60 bg-black/40 px-3 py-3">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">{label}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            </div>
            <div className="flex h-16 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-900 to-slate-900">
              <span className="font-mono tracking-[0.3em] text-zinc-500">●●○○</span>
            </div>
            <p className="text-zinc-500">“a small signal about trust” — now a glyph in the grid.</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SupportBlock() {
  return (
    <section className="mt-14 space-y-4">
      <h2 className="text-xs uppercase tracking-[0.25em] text-zinc-400" style={{ fontFamily: 'var(--font-funkhaus)' }}>
        FEED THE SOURCE · PIZZA PARTY
      </h2>
      <p className="max-w-xl text-sm text-zinc-300">
        If this garden of signals feels like home, you can send a slice of love back to the studio in Vienna — a symbolic pizza party
        to keep the lights on and the antennas humming.
      </p>
      <button className="mt-2 rounded-full bg-zinc-100/95 px-5 py-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-950 transition-colors hover:bg-white">
        Support the archive
      </button>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-16 flex flex-col gap-3 border-t border-zinc-800/70 pt-6 text-[0.7rem] text-zinc-500 md:flex-row md:items-center md:justify-between">
      <p>Gratia · Firecircle · Codex :: Vienna</p>
      <p className="text-zinc-600">Broadcasting memories · Not storing identities.</p>
    </footer>
  );
}
