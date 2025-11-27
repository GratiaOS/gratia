'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type VortexMode = 'idle' | 'ritual';

export default function VortexScene() {
  const [mode, setMode] = useState<VortexMode>('ritual');
  const [showContinue, setShowContinue] = useState(false);
  const isRitual = mode === 'ritual';

  useEffect(() => {
    const id = window.setTimeout(() => setShowContinue(true), 60_000);
    return () => clearTimeout(id);
  }, []);

  const handlePanic = () => {
    setMode('idle');
    window.location.href = '/';
  };

  return (
    <main className="vortex-root" data-pad-mood="bom-bhole" data-vortex-mode={mode} data-show-continue={showContinue ? 'true' : 'false'}>
      <header className="vortex-chrome">
        <button type="button" className="vortex-panic" onClick={handlePanic}>
          Panică / Înapoi
        </button>
      </header>

      <section className="vortex-portal">
        <div className={`vortex-portal-frame ${isRitual ? 'is-ritual' : ''}`}>
          <div className="vortex-portal-gif">
            <Image
              src="/lightfrog-vortex.gif"
              alt="Antonio ține portalul deschis."
              priority
              fill
              sizes="(min-width: 1024px) 1120px, 100vw"
            />
          </div>
          <div className="vortex-portal-overlay">{isRitual && <OrbOverlay />}</div>
        </div>

        <p className="vortex-mantra">Doar respiră. Portalul are grijă de tine.</p>
      </section>

      <footer className="vortex-footer">
        <Link href="/codex/vienna" className="vortex-continue">
          Continuă în Codex :: Vienna →
        </Link>
      </footer>
    </main>
  );
}

function OrbOverlay() {
  return (
    <div className="vortex-orb-shell">
      <div className="vortex-orb-core" />
      <div className="vortex-orb-ring" />
      <div className="vortex-orb-heart" />
      <div className="vortex-orb-labels">
        <p className="vortex-orb-label-main">
          Inspiră <strong>4</strong> · ține <strong>4</strong> · expiră <strong>6</strong>.
        </p>
        <p className="vortex-orb-label-sub">Doar respiră. Antonio pulsează cu tine.</p>
      </div>
    </div>
  );
}
