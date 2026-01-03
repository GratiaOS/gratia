import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@gratiaos/ui';
import { scenes } from '@/lib/scenes';

export const metadata: Metadata = {
  title: 'Living · Gratia',
  description: 'A gentle feed of witnessed scenes.',
};

const splitBody = (body: string) =>
  body
    .split(/\n\s*\n/)
    .map((line) => line.trim())
    .filter(Boolean);

export default function LivingPage() {
  return (
    <main className="min-h-screen bg-(--color-surface) text-(--color-text)">
      <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-12">
        <header className="space-y-2">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-(--color-muted) uppercase">
            Living feed
          </p>
          <h1 className="text-2xl font-semibold">Living</h1>
          <p className="text-sm text-(--color-muted)">
            What breathes, without urgency.
          </p>
        </header>

        <section className="space-y-8">
          {scenes.map((scene) => (
            <article
              key={scene.id}
              className="rounded-3xl border border-(--color-border) bg-(--color-elev) p-6 shadow-depth-2"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-[11px] tracking-[0.18em] text-(--color-muted) uppercase">
                    {scene.kind} · {scene.breathKind}
                  </p>
                  <h2 className="text-lg font-semibold">{scene.title}</h2>
                  <p className="text-xs text-(--color-muted)">
                    Last breath · {scene.lastBreath}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {scene.witnessedBy.map((witness) => (
                    <Badge key={witness} tone="accent" variant="soft" size="sm">
                      {witness}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-3 text-sm leading-relaxed text-(--color-text)">
                {splitBody(scene.body).map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {scene.roots.length > 0 && (
                <footer className="mt-4 flex flex-wrap gap-2 text-[11px] text-(--color-muted)">
                  {scene.roots.map((root) => (
                    <Badge key={root} tone="accent" variant="subtle" size="sm">
                      {root}
                    </Badge>
                  ))}
                </footer>
              )}
            </article>
          ))}
        </section>

        <div className="pt-2 text-sm text-(--color-muted)">
          <Link href="/" className="hover:underline">
            Inapoi in Gradina
          </Link>
        </div>
      </div>
    </main>
  );
}
