'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const whispers = ['Eres vista.', 'Y el momento te responde suave.', 'Déjate caer. El portal te sostiene.'];

export default function VortexScene() {
  const [line, setLine] = useState(0);
  const [loopMissing, setLoopMissing] = useState(false);
  const [softNight, setSoftNight] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setLine((prev) => (prev + 1) % whispers.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 5) setSoftNight(true);
  }, []);

  return (
    <main className="vortex-shell" data-soft-night={softNight} data-pad-mood={softNight ? 'bom-bhole' : 'focused'}>
      <div className="vortex-grain" aria-hidden="true" />
      <div className="vortex-orb vortex-orb--emerald" aria-hidden="true" />
      <div className="vortex-orb vortex-orb--violet" aria-hidden="true" />
      <div className="vortex-orb vortex-orb--amber" aria-hidden="true" />
      <div className="vortex-ring" aria-hidden="true" />
      <div className="vortex-ring vortex-ring--inner" aria-hidden="true" />
      <div className="vortex-stage">
        <div className="vortex-meta">
          <Link href="/" className="vortex-chip">
            ← Înapoi la Gratia
          </Link>
          <span className="vortex-kicker">Antonio · El abuelo</span>
        </div>
        <div className="vortex-frame">
          {!loopMissing ? (
            <img
              src="/lightfrog-vortex.gif"
              alt="LightFrog Vortex loop"
              className="vortex-image vortex-image--intro"
              onError={() => setLoopMissing(true)}
            />
          ) : (
            <div className="vortex-placeholder" role="status">
              <span className="vortex-placeholder-title">Loop missing</span>
              <span className="vortex-placeholder-copy">
                Place `lightfrog-vortex.gif` in `/public` or point the source to the repo asset.
              </span>
            </div>
          )}
        </div>
        <div className="vortex-text" aria-live="polite">
          <p key={whispers[line]} className="vortex-title vortex-whisper">
            {whispers[line]}
          </p>
          <p className="vortex-echo">Ritual lent, puls Gratia în jurul tău. Portalul rămâne deschis.</p>
          <div className="vortex-mister" aria-label="Mister breathing softly">
            <span className="vortex-mister-icon" aria-hidden="true">
              🐸
            </span>
            <span className="vortex-mister-copy">Antonio pulsa contigo. Glow blând, pulse viu. 🐸</span>
          </div>
          <p className="text-[0.7rem] text-[color:var(--text-subtle)]">Bom Bhole mode</p>
          <button
            type="button"
            className="vortex-toggle"
            aria-pressed={softNight}
            onClick={() => setSoftNight((prev) => !prev)}
          >
            modo suave de noche <span aria-hidden="true">{softNight ? '●' : '○'}</span>
          </button>
          {softNight && (
            <p className="mt-2 text-[0.7rem] text-[color:var(--text-faint)]">
              Bom Bhole — breathe without hurry. Light doesn’t rush anything.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
