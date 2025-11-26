import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Codex :: Vienna — A broadcasting garden for living code',
  description:
    'Cosmic archival transmissions from the Vienna Broadcasting House to the Gratia garden — a living glyph lab for signals that keep breathing.',
};

export default function CodexViennaPage() {
  return (
    <main
      data-pad-mood="focused"
      className="codex-page relative min-h-screen overflow-hidden bg-[color:var(--tone-surface)] text-[color:var(--tone-ink)]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.32]"
        style={{
          backgroundImage:
            'radial-gradient(1200px 780px at 16% 12%, color-mix(in oklab, var(--tone-accent) 18%, transparent 82%), transparent 60%), radial-gradient(900px 720px at 84% 82%, color-mix(in oklab, var(--tone-accent) 14%, transparent 86%), transparent 64%), linear-gradient(145deg, color-mix(in oklab, var(--tone-ink) 16%, transparent 84%), color-mix(in oklab, #020617 80%, transparent 20%))',
        }}
        aria-hidden="true"
      />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col space-y-12 px-4 py-10 sm:px-8 sm:py-16">
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
    <header className="mb-2 flex items-center justify-between text-[0.75rem] uppercase tracking-[0.2em] text-[color:var(--text-subtle)]">
      <Link
        href="/"
        className="whisper-ring rounded-full border border-[color:var(--color-border)] px-3 py-1 transition-shadow shadow-depth-1 hover:shadow-depth-2"
      >
        ← back to gratia
      </Link>

      <div className="flex flex-col items-end gap-1 text-right" style={{ fontFamily: 'var(--font-funkhaus)' }}>
        <span>CODEX :: VIENNA</span>
        <span className="text-[0.65rem] tracking-[0.28em] text-[color:var(--text-faint)]">
          a broadcasting garden for living code
        </span>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="space-y-6">
      <div className="mood-glow mx-auto max-w-3xl overflow-hidden rounded-[2.25rem] border border-[color:var(--color-border)] bg-[color:var(--tone-surface)]/70 shadow-depth-2">
        <div
          className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2rem]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 0%, color-mix(in oklab, var(--tone-accent) 65%, transparent), transparent 60%), radial-gradient(circle at 80% 100%, color-mix(in oklab, var(--tone-accent) 45%, transparent), transparent 60%), linear-gradient(135deg, color-mix(in oklab, var(--tone-accent) 38%, #000), color-mix(in oklab, var(--tone-accent) 16%, #020617))',
          }}
        >
          <button className="whisper-ring relative flex h-32 w-32 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--tone-surface)]/70 backdrop-blur">
            <span className="text-sm uppercase tracking-[0.25em] text-[color:var(--text-subtle)]">TX</span>
          </button>
        </div>
      </div>

      <div className="space-y-2 text-center">
        <h1 className="font-serif text-2xl italic tracking-[0.04em] text-[color:var(--tone-ink)] sm:text-3xl lg:text-4xl">
          Messages become constellations.
        </h1>
        <p className="mx-auto max-w-xl text-sm text-[color:var(--text-muted)] sm:text-base">
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
      <div
        className="text-xs uppercase tracking-[0.2em] text-[color:var(--tone-accent)]"
        style={{ fontFamily: 'var(--font-funkhaus)' }}
      >
        TRANSMISSION GATE
      </div>
      <p className="max-w-xl text-sm text-[color:var(--text-muted)]">
        Write a small truth, a question, a fragment of code, a line you’d like to remember. Codex will translate it into a broadcast
        glyph.
      </p>

      <form className="mt-4 space-y-3">
        <textarea
          rows={3}
          className="whisper-ring w-full min-h-[3.2rem] rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--surface)]/80 px-4 py-3 text-sm text-[color:var(--tone-ink)] shadow-depth-1 placeholder:text-[color:var(--text-faint)] focus:outline-none"
          placeholder="Write a small truth, a question, a fragment of code…"
        />
        <div className="flex items-center justify-between gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-5 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--on-accent)] shadow-depth-1 transition-shadow hover:shadow-depth-2"
          >
            Generate transmission
          </button>
          <p className="max-w-xs text-right text-[0.7rem] text-[color:var(--text-faint)]">
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
        <h2
          className="text-xs uppercase tracking-[0.25em] text-[color:var(--text-subtle)]"
          style={{ fontFamily: 'var(--font-funkhaus)' }}
        >
          OUTPUT · LIVING GLYPH
        </h2>
        <p className="text-[0.72rem] uppercase tracking-[0.4em] text-[color:var(--text-faint)]" style={{ fontFamily: 'var(--font-funkhaus)' }}>
          Funkhaus grid · cosmic archival
        </p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)]">
        <div className="mood-glow rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--surface)]/70 px-6 pb-6 pt-5 shadow-depth-2">
          <div className="flex aspect-square w-full max-w-xs items-center justify-center rounded-[1.5rem] bg-black/70">
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-[color:var(--tone-accent)]">GLYPH · 00A7</span>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-[color:var(--text-subtle)]">
            This glyph is a trace of your signal. It remembers the rhythm, not the sentence. A small orbit in the archive — visible,
            but not legible without you.
          </p>
          <p className="text-xs text-[color:var(--text-faint)]">Download it, share it, or keep it as a private coordinate in your own map.</p>

          <div className="flex flex-wrap gap-3 pt-3">
            <button className="whisper-ring rounded-full border border-[color:var(--color-border)] px-4 py-2 text-xs uppercase tracking-[0.18em] shadow-depth-1 transition-shadow hover:shadow-depth-2">
              Download glyph
            </button>
            <button className="whisper-ring rounded-full border border-[color:var(--color-border)] px-4 py-2 text-xs uppercase tracking-[0.18em] shadow-depth-1 transition-shadow hover:shadow-depth-2">
              Share transmission
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {['Vienna · 20:13', 'Barcelona · 00:45', 'Online · 11:11'].map((label) => (
            <article key={label} className="depth-ambient rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--surface)]/80 px-4 py-3">
              <header className="flex items-center justify-between gap-3 text-[0.72rem] text-[color:var(--text-subtle)]">
                <span>{label}</span>
                <span className="flex items-center gap-1 text-[color:var(--text-faint)]">
                  ●●○<span className="sr-only">signal strength</span>
                </span>
              </header>
              <p className="mt-2 line-clamp-2 text-xs text-[color:var(--text-muted)]">“a small signal about trust” — now a glyph in the grid.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchivePreview() {
  return (
    <section className="mt-14 space-y-3">
      <div className="flex items-center justify-between">
        <h2
          className="text-xs uppercase tracking-[0.25em] text-[color:var(--text-subtle)]"
          style={{ fontFamily: 'var(--font-funkhaus)' }}
        >
          COSMIC ARCHIVE
        </h2>
        <span className="text-[0.65rem] text-[color:var(--text-faint)]">last signals · anonymised</span>
      </div>

      <p className="max-w-2xl text-sm text-[color:var(--text-muted)]">The archive is alive; it grows with each breath.</p>
    </section>
  );
}

function SupportBlock() {
  return (
    <section className="mt-14 space-y-4">
      <h2
        className="text-xs uppercase tracking-[0.25em] text-[color:var(--text-subtle)]"
        style={{ fontFamily: 'var(--font-funkhaus)' }}
      >
        FEED THE SOURCE · PIZZA PARTY
      </h2>
      <p className="max-w-xl text-sm text-[color:var(--text-muted)] leading-relaxed">
        If this garden of signals feels like home, you can send a slice of love back to the studio in Vienna — a symbolic pizza party
        to keep the lights on and the antennas humming.
      </p>
      <button className="mt-2 inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-5 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--on-accent)] shadow-depth-1 transition-shadow hover:shadow-depth-2">
        Support the archive
      </button>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-16 flex flex-col gap-3 border-t border-[color:var(--color-border)] pt-6 text-[0.7rem] text-[color:var(--text-muted)] md:flex-row md:items-center md:justify-between">
      <p>Gratia · Firecircle · Codex :: Vienna</p>
      <p className="text-[color:var(--text-faint)]">Broadcasting memories · Not storing identities.</p>
    </footer>
  );
}
