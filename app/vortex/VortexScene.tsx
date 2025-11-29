'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@gratiaos/ui';

type BreathPhase = 'inhale' | 'hold' | 'exhale';
type VortexMode = 'idle' | 'ritual';

const sequence: { phase: BreathPhase; label: string; durationMs: number }[] = [
  { phase: 'inhale', label: 'Inspiră', durationMs: 4000 },
  { phase: 'hold', label: 'Ține', durationMs: 4000 },
  { phase: 'exhale', label: 'Expiră', durationMs: 6000 },
];

export default function VortexScene() {
  const [mode, setMode] = useState<VortexMode>('idle');
  const [showContinue, setShowContinue] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const isBreathing = mode === 'ritual';
  const step = useMemo(() => sequence[stepIndex % sequence.length], [stepIndex]);

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
    const advance = () => setStepIndex((prev) => (prev + 1) % sequence.length);
    timerRef.current = window.setTimeout(advance, step.durationMs);
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, [isBreathing, step]);

  const startRitual = () => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    setMode('ritual');
    setStepIndex(0);
  };

  const handlePanic = () => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    setMode('idle');
    setStepIndex(0);
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
      <section className="respira-portal">
        {!isBreathing ? (
          <>
            <div className="respira-hero">
              <div className="respira-hero-media">
                <Image
                  src="/lightfrog-vortex.gif"
                  alt="Antonio ține portalul deschis."
                  priority
                  fill
                  sizes="(min-width: 1024px) 1120px, 100vw"
                />
              </div>
            </div>
            <p className="respira-mantra">Doar respiră. Portalul are grijă de tine.</p>
            <button type="button" className="respira-mountain-btn" onClick={startRitual}>
              Respiră cu Antonio
            </button>
          </>
        ) : (
          <BreathOverlay step={step} />
        )}
      </section>

      <footer className="respira-footer">
        <Button asChild className="respira-continue whisper-ring mood-glow">
          <a href="/codex/vienna">Continuă în Codex :: Vienna →</a>
        </Button>
      </footer>
    </main>
  );
}

function BreathOverlay({
  step,
}: {
  step: { label: string; durationMs: number; phase: BreathPhase };
}) {
  return (
    <div className="respira-breath-layer">
      <div className="respira-bands">
        <div className="band band-1" />
        <div className="band band-2" />
        <div className="band band-3" />
        <div className="band band-4" />
        <div className="band band-5" />
      </div>
      <div className="respira-tree">
        <div className="respira-tree-aura" />
        <div className="respira-tree-canopy" />
        <div className="respira-tree-trunk" />
        <div className="respira-tree-roots" />
      </div>

      <div className="respira-labels">
        <div className="respira-label-phase">{step.label}</div>
        <div className="respira-label-sub">Doar urmează ritmul.</div>
        <div className="respira-label-abuelo">🐸 Antonio respiră cu tine. 🌲</div>
      </div>
    </div>
  );
}
