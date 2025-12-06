import Image from 'next/image';

/**
 * SceneCard: Suave Bloom intră în Codex Vienna.
 * Poveste scurtă: floarea nu e logo, e o prezență care a intrat în Grădină și Grajd.
 */
export function MarkSceneCard() {
  return (
    <section className="rounded-3xl border border-(--color-border) bg-(--skin-card) p-6 md:p-8 shadow-lg shadow-black/10">
      <header className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-(--color-muted)">
          Seed · Suave Bloom
        </p>
        <h2 className="text-lg md:text-xl font-semibold text-(--color-text)">
          Floarea care a ales Grădina și Grajdul.
        </h2>
      </header>

      <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-start">
        <div className="relative h-28 w-28 shrink-0 rounded-2xl bg-(--skin-bg) ring-1 ring-(--color-border) overflow-hidden">
          <Image
            src="/mark/gratia-mark.svg"
            alt="Gratia Mark · Suave Bloom"
            fill
            className="object-contain p-3"
          />
        </div>

        <div className="space-y-3 text-sm leading-relaxed text-(--color-text)">
          <p>
            Suave Bloom nu a fost desenat la birou. A fost observat în câmp: o calendula portocalie,
            deschisă, crescută printre ierburi uscate. De atunci ține lumina pentru Grădină și
            Grajd, fără să ceară nimic.
          </p>
          <p>
            Centrul nu e un disc rigid, ci un droplet luminos: sămânță, inimă, kernel. Floarea
            respiră – halo-ul ei pulsează abia vizibil, ca să nu domine, ci să fie martor blând.
          </p>
          <p className="text-(--color-muted)">
            Whisper: schimbarea se vede și când e marcată blând. Un minus în loc de em dash; o
            floare în loc de stemă.
          </p>
        </div>
      </div>

      <footer className="mt-4 flex flex-wrap gap-2 text-[11px] text-(--color-muted)">
        <span className="rounded-full bg-(--skin-accent)/10 px-2 py-1">Mark v0.3 · Suave Bloom</span>
        <span className="rounded-full bg-(--skin-accent)/10 px-2 py-1">Witnessed in Vienna</span>
        <span className="rounded-full bg-(--skin-accent)/10 px-2 py-1">Floare · Grajd · Cal</span>
      </footer>
    </section>
  );
}

export default MarkSceneCard;
