'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { SpiritModeSwitch } from '@/components/SpiritModeSwitch';

type VortexMode = 'idle' | 'ritual';

export default function VortexScene() {
  const [mode, setMode] = useState<VortexMode>('idle');
  const [ritualDone, setRitualDone] = useState(false);
  const isRitual = mode === 'ritual';

  useEffect(() => {
    if (!isRitual) return;
    setRitualDone(false);
    const id = window.setTimeout(() => {
      setRitualDone(true);
    }, 60_000);
    return () => clearTimeout(id);
  }, [isRitual]);

  const handlePrimaryClick = () => {
    if (mode === 'idle') {
      setMode('ritual');
      return;
    }
    setMode('idle');
  };

  return (
    <main className="vortex-root" data-pad-mood="bom-bhole" data-vortex-mode={mode}>
      <section className="vortex-hero">
        <div className={`vortex-hero-frame ${isRitual ? 'is-ritual' : ''}`}>
          <div className="vortex-hero-gif">
            <Image
              src="/lightfrog-vortex.gif"
              alt="Antonio ține portalul deschis."
              priority
              fill
              sizes="(min-width: 1024px) 960px, 100vw"
            />
          </div>
          <div className="vortex-hero-overlay">{isRitual && <OrbOverlay />}</div>
        </div>

        <header className="vortex-copy">
          <h1 className="vortex-title">Déjate caer. El portal te sostiene.</h1>
          <p className="vortex-subtitle">Ritual lent, puls Gratia în jurul tău. Portalul rămâne deschis.</p>
          <p className="vortex-whisper">🐸 Antonio respiră cu tine. Glow blând, pulso vivo.</p>
          <button type="button" onClick={handlePrimaryClick} className="vortex-primary-btn">
            {mode === 'idle' ? 'Respiră 1 minut cu Antonio' : ritualDone ? 'Mulțumesc, Antonio' : 'Oprim ritualul'}
          </button>
          <p className="vortex-help-text">
            Nu trebuie să faci nimic în plus. Doar urmărește ritmul: <strong>inspiră 4 · ține 4 · expiră 6</strong>.
          </p>
        </header>
      </section>

      <section className="vortex-section">
        <h2 className="vortex-section-title">Spirit mode</h2>
        <p className="vortex-section-copy">
          Pentru când vrei să te joci mai mult după ritual. Alege cine ține spațiul cu tine în Gratia.
        </p>
        <SpiritModeSwitch />
      </section>

      <section className="vortex-section">
        <h2 className="vortex-section-title">După portal</h2>
        <p className="vortex-section-copy">
          Vrei să duci senzația mai departe? Poți deschide arhiva sau trimite portalul unui prieten.
        </p>
        <div className="vortex-after-actions">
          <a href="/codex/vienna" className="vortex-secondary-btn">
            Deschide Codex :: Vienna
          </a>
          <button
            type="button"
            className="vortex-secondary-btn vortex-secondary-btn--ghost"
            onClick={() => {
              const url = typeof window !== 'undefined' ? `${window.location.origin}/vortex` : '';
              if (navigator?.share) {
                navigator.share({ title: 'LightFrog · Vortex', text: 'Antonio ține portalul. Hai 1 minut.', url }).catch(() => {});
              } else {
                navigator?.clipboard?.writeText(url).catch(() => {});
              }
            }}
          >
            Trimite portalul unui prieten
          </button>
        </div>
      </section>
    </main>
  );
}

function OrbOverlay() {
  return (
    <div className="vortex-orb-shell">
      <div className="vortex-orb-core" />
      <div className="vortex-orb-ring" />
      <div className="vortex-orb-labels">
        <p className="vortex-orb-label-top">Ritual de 1 minut</p>
        <p className="vortex-orb-label-main">
          Inspiră <strong>4</strong> · ține <strong>4</strong> · expiră <strong>6</strong>.
        </p>
        <p className="vortex-orb-label-sub">Dacă e prea mult, fă-l mai scurt. Portalul nu se supără.</p>
      </div>
    </div>
  );
}
