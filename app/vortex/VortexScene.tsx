'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SpiritModeSwitch } from '@/components/SpiritModeSwitch';

type VortexSceneProps = {
  softNight?: boolean;
};

export default function VortexScene({ softNight = false }: VortexSceneProps) {
  const [isBreathing, setIsBreathing] = useState(false);
  const [hasCompletedBreath, setHasCompletedBreath] = useState(false);

  useEffect(() => {
    if (!isBreathing) return;
    const t = setTimeout(() => {
      setIsBreathing(false);
      setHasCompletedBreath(true);
    }, 60_000);
    return () => clearTimeout(t);
  }, [isBreathing]);

  function handleStartBreath() {
    setHasCompletedBreath(false);
    setIsBreathing(true);
  }

  return (
    <main className="vortex-page" data-pad-mood={softNight ? 'bom-bhole' : 'focused'} data-spirit-scope="vortex">
      <div className="vortex-shell">
        <header className="vortex-header">
          <Link href="/" className="vortex-back">
            ← Înapoi la Gratia
          </Link>
          <div className="vortex-meta">ANTONIO · EL ABUELO</div>
        </header>

        <section className="vortex-hero">
          <div className="vortex-portal-frame mood-glow shadow-depth-2">
            <img src="/lightfrog-vortex.gif" alt="Antonio · LightFrog în vortex" className="vortex-portal-image" />
            {isBreathing && <BreathOverlay />}
          </div>
        </section>

        <section className="vortex-copy">
          <h1 className="vortex-title">Déjate caer. El portal te sostiene.</h1>
          <p className="vortex-subtitle">Ritual lent, puls Gratia în jurul tău. Portalul rămâne deschis.</p>
          <p className="vortex-whisper">🐸 Antonio respiră cu tine. Glow blând, pulso vivo.</p>

          <button type="button" onClick={handleStartBreath} className="vortex-cta" disabled={isBreathing}>
            {isBreathing ? 'Respirăm împreună…' : 'Respiră 1 minut cu Antonio'}
          </button>
          <p className="vortex-cta-note">
            Nu trebuie să faci nimic în plus. Doar urmărește ritmul: <strong>inspir 4 · ține 4 · expir 6</strong>.
          </p>
        </section>

        <section className="vortex-spirit-section" aria-labelledby="spirit-mode-title">
          <h2 id="spirit-mode-title" className="vortex-section-title">
            Spirit mode
          </h2>
          <p className="vortex-spirit-intro">Pentru când vrei să te joci mai mult după ritual. Alege cine ține spațiul cu tine în Gratia.</p>
          <SpiritModeSwitch />
        </section>

        {hasCompletedBreath && (
          <section className="vortex-next-section" aria-labelledby="vortex-next-title">
            <h2 id="vortex-next-title" className="vortex-section-title">
              După portal
            </h2>
            <p className="vortex-next-text">Vrei să duci senzația mai departe?</p>
            <div className="vortex-next-actions">
              <Link href="/codex/vienna" className="vortex-next-link">
                Deschide Codex :: Vienna
              </Link>
              <button
                type="button"
                className="vortex-next-link vortex-next-secondary"
                onClick={() => {
                  if (typeof navigator === 'undefined') return;
                  const href = window?.location?.href ?? '';
                  if (navigator.share) {
                    navigator
                      .share({ title: 'LightFrog · Vortex', text: 'Un minut de respirație cu Antonio.', url: href })
                      .catch(() => {});
                  } else {
                    navigator.clipboard?.writeText(href).catch(() => {});
                  }
                }}
              >
                Trimite portalul unui prieten
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function BreathOverlay() {
  return (
    <div className="vortex-breath-overlay">
      <div className="vortex-breath-orbit whisper-ring">
        <div className="vortex-breath-pulse" />
      </div>
      <div className="vortex-breath-copy">
        <p className="vortex-breath-label">Ritual de 1 minut</p>
        <p className="vortex-breath-steps">
          Inspiră <strong>4</strong> · ține <strong>4</strong> · expiră <strong>6</strong>.
        </p>
        <p className="vortex-breath-note">Dacă e prea mult, fă-l mai scurt. Portalul nu se supără.</p>
      </div>
    </div>
  );
}
