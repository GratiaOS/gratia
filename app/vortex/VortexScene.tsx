'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@gratiaos/ui';
import LightRitualButton from './LightRitualButton';

type BreathPhase = 'inhale' | 'hold' | 'exhale';
type VortexMode = 'idle' | 'lighting' | 'ritual' | 'closing';
type VortexTheme = 'forest-winamp' | 'mushroom-orchard' | 'aurora-orb';

const sequence: { phase: BreathPhase; label: string; durationMs: number }[] = [
  { phase: 'inhale', label: 'Inspiră', durationMs: 4000 },
  { phase: 'hold', label: 'Ține', durationMs: 4000 },
  { phase: 'exhale', label: 'Expiră', durationMs: 6000 },
];

export default function VortexScene() {
  const [mode, setMode] = useState<VortexMode>('idle');
  const [showContinue, setShowContinue] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [theme, setTheme] = useState<VortexTheme>('aurora-orb');
  const [transitioning, setTransitioning] = useState(false);
  const [prePulse, setPrePulse] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const timerRef = useRef<number | null>(null);
  const continueTimerRef = useRef<number | null>(null);

  const isBreathing = mode === 'ritual';
  const showAntonio = mode === 'idle' || mode === 'lighting';
  const step = useMemo(() => sequence[stepIndex % sequence.length], [stepIndex]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('gratia.vortex.theme');
    if (
      stored === 'forest-winamp' ||
      stored === 'mushroom-orchard' ||
      stored === 'aurora-orb'
    ) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('gratia.vortex.theme', theme);
  }, [theme]);

  const cycleTheme = () => {
    setTheme((prev) => {
      if (prev === 'forest-winamp') return 'mushroom-orchard';
      if (prev === 'mushroom-orchard') return 'aurora-orb';
      return 'forest-winamp';
    });
  };

  useEffect(() => {
    // clear delayed continue when leaving ritual
    if (!isBreathing && continueTimerRef.current) {
      clearTimeout(continueTimerRef.current);
      continueTimerRef.current = null;
      setShowContinue(false);
    }
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
    if (continueTimerRef.current) {
      clearTimeout(continueTimerRef.current);
      continueTimerRef.current = null;
    }
    // pre-inspir pulse
    setPrePulse(true);
    window.setTimeout(() => setPrePulse(false), 120);

    setTransitioning(true);
    setMode('lighting');

    // aprindem lumina după micro-pulse
    window.setTimeout(() => setLightOn(true), 120);

    // intrăm în ritual după ce începe lumina să urce (mai târziu ca să simți faza)
    window.setTimeout(() => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
      setMode('ritual');
      setStepIndex(0);
      setTransitioning(false);
    }, 1200);

    // apare call-to-action după ce lumina s-a stabilizat
    continueTimerRef.current = window.setTimeout(() => {
      setShowContinue(true);
    }, 120 + 1200 + 700);
  };

  const handlePanic = () => {
    if (timerRef.current !== null) clearTimeout(timerRef.current);
    if (continueTimerRef.current) clearTimeout(continueTimerRef.current);
    setLightOn(false);
    setShowContinue(false);
    setMode('idle');
    setStepIndex(0);
    window.location.href = '/';
  };

  return (
    <div
      className="respira-root"
      data-pad-mood="bom-bhole"
      data-vortex-theme={theme}
      data-breathing={isBreathing ? 'true' : 'false'}
      data-breath-phase={step.phase}
      data-show-continue={showContinue ? 'true' : 'false'}
      data-transitioning={transitioning ? 'true' : 'false'}
      data-light-on={lightOn ? 'true' : 'false'}
      data-pre-pulse={prePulse ? 'true' : 'false'}
      data-vortex-mode={mode}
    >
      {prePulse && <div className="respira-prepulse" aria-hidden="true" />}

      <div className="respira-theme-switch">
        <button
          type="button"
          className="respira-theme-dot"
          onClick={cycleTheme}
          aria-label="Schimbă tema Respira"
        >
          ●
        </button>
      </div>
      <section className="respira-portal" data-vortex-mode={mode}>
        <div className="respira-hero">
          <div className="respira-hero-media">
            <Image
              src="/lightfrog-vortex.gif"
              alt="Antonio ține portalul deschis."
              priority
              fill
              sizes="(min-width: 1024px) 1120px, 100vw"
              style={{
                opacity: showAntonio ? 1 : 0,
                filter: showAntonio ? 'none' : 'blur(4px)',
                transition: 'opacity 700ms ease, filter 700ms ease',
              }}
            />
          </div>
          {mode === 'ritual' && <BreathOverlay step={step} />}
        </div>

        {!isBreathing && (
          <>
            <p className="respira-mantra">Doar respiră. El portal te sostiene.</p>
            <LightRitualButton onLight={startRitual} />
          </>
        )}
      </section>

      <footer className="respira-footer" data-visible={showContinue ? 'true' : 'false'}>
        <div className="respira-continue-block">
          <Button
            asChild
            className="respira-continue respira-continue-button whisper-ring mood-glow"
            variant="ghost"
          >
            <a href="/codex/vienna">Când ești gata, continuă cu Codex :: Vienna →</a>
          </Button>
          <p className="respira-continue-whisper">
            يمكنك البقاء هنا قدر ما تشاء. Lienzo: tú puedes imaginarte el próximo paso.
          </p>
        </div>
      </footer>
    </div>
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
        <div className="respira-label-rhythm">4 · 4 · 6</div>
        <div className="respira-label-steps">Inspiră • Ține • Expiră</div>
        <div className="respira-label-abuelo">🐸 Antonio respiră cu tine. 🌲</div>
      </div>
    </div>
  );
}
