'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type BreathPhase = 'inhale' | 'hold' | 'exhale';
type VortexMode = 'idle' | 'ritual';

const pattern: { phase: BreathPhase; label: string; durationMs: number }[] = [
  { phase: 'inhale', label: 'Inspiră', durationMs: 4000 },
  { phase: 'hold', label: 'Ține', durationMs: 4000 },
  { phase: 'exhale', label: 'Expiră', durationMs: 6000 },
];

export default function VortexScene() {
  const [mode, setMode] = useState<VortexMode>('idle');
  const [showContinue, setShowContinue] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const isBreathing = mode === 'ritual';
  const step = useMemo(() => pattern[stepIndex % pattern.length], [stepIndex]);

  useEffect(() => {
    if (!isBreathing) {
      setShowContinue(false);
      return;
    }
    const t = window.setTimeout(() => setShowContinue(true), 60_000);
    return () => clearTimeout(t);
  }, [isBreathing]);

  useEffect(() => {
    if (!isBreathing) return;
    const current = step;
    const id = window.setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % pattern.length);
    }, current.durationMs);
    return () => clearTimeout(id);
  }, [isBreathing, step]);

  const handleStart = () => {
    setMode('ritual');
    setShowContinue(false);
    setStepIndex(0);
  };

  const handleStop = () => {
    setMode('idle');
    setStepIndex(0);
  };

  const handlePanic = () => {
    handleStop();
    window.location.href = '/';
  };

  return (
    <main
      className="respira-root"
      data-pad-mood="bom-bhole"
      data-breathing={isBreathing ? 'true' : 'false'}
      data-breath-phase={step.phase}
      data-show-continue={showContinue ? 'true' : 'false'}
    >
      <header className="respira-chrome">
        <button type="button" className="respira-panic" onClick={handlePanic}>
          Panică / Înapoi
        </button>
      </header>

      <section className="respira-portal">
        <div className={`respira-portal-frame ${isBreathing ? 'is-ritual' : ''}`}>
          <div className="respira-portal-gif">
            <Image
              src="/lightfrog-vortex.gif"
              alt="Antonio ține portalul deschis."
              priority
              fill
              sizes="(min-width: 1024px) 1120px, 100vw"
            />
          </div>
          <div className="respira-portal-overlay">{isBreathing && <BreathOverlay step={step} />}</div>
        </div>

        {!isBreathing && (
          <>
            <p className="respira-mantra">Doar respiră. Portalul are grijă de tine.</p>
            <button type="button" className="respira-mountain-btn" onClick={handleStart}>
              Respiră cu Antonio
            </button>
          </>
        )}
      </section>

      <footer className="respira-footer">
        <Link href="/codex/vienna" className="respira-continue">
          Continuă în Codex :: Vienna →
        </Link>
      </footer>
    </main>
  );
}

function BreathOverlay({ step }: { step: { label: string; durationMs: number; phase: BreathPhase } }) {
  return (
    <div className="respira-breath-layer">
      <div className="respira-flower">
        <div className="respira-flower-aura" />
        <div className="respira-flower-petals" />
        <div className="respira-flower-core" />
        <div className="respira-labels">
          <div className="respira-label-phase">{step.label}</div>
          <div className="respira-label-sub">4 · 4 · 6 — doar urmează ritmul.</div>
          <div className="respira-label-abuelo">Antonio respiră cu tine. 🌸</div>
        </div>
      </div>
    </div>
  );
}
