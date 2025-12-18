'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Badge, Button, Card, Field, Toolbar, ToolbarGroup } from '@gratiaos/ui';

import type { PatternMirrorLocale, PatternMirrorResponse } from '../api/pattern-mirror/types';
import { I18nProvider, useTranslation } from '../../i18n/I18nProvider';
import { resources } from '../../i18n/resources';
import { defaultLocale } from '../../i18n/config.js';
import { useSkinField } from '../skin/SkinFieldProvider';

type Stage = 'idle' | 'ready' | 'listening' | 'reflection' | 'trueStep' | 'error';
type PatternMeta = { label: string; description?: string; tone?: string; emoji?: string };
type TruthSeed = { text: string; createdAt: string; locale: PatternMirrorLocale };

const TRUTH_SEEDS_KEY = 'pattern-mirror.truth-seeds';
const reflectionLocales: PatternMirrorLocale[] = ['en', 'es', 'ro'];
const normalizePatternKey = (chip: string) => chip.trim().toLowerCase().replace(/\s+/g, '-');

function PatternMirrorContent({
  onLocaleChange,
}: {
  onLocaleChange: (locale: PatternMirrorLocale) => void;
}) {
  const { t, locale: translationLocale } = useTranslation('reflection');
  const { skinId, setSkinId } = useSkinField();
  const searchParams = useSearchParams();
  const mirrorLocale: PatternMirrorLocale =
    translationLocale === 'es' ? 'es' : translationLocale === 'en' ? 'en' : 'ro';

  const [text, setText] = React.useState('');
  const [stage, setStage] = React.useState<Stage>('idle');
  const [reflectionBullets, setReflectionBullets] = React.useState<string[]>([]);
  const [patternChips, setPatternChips] = React.useState<string[]>([]);
  const [energyTone, setEnergyTone] = React.useState<string | null>(null);
  const [trueStepPrompt, setTrueStepPrompt] = React.useState<string | null>(null);
  const [savedTruth, setSavedTruth] = React.useState<string | null>(null);
  const [showWritingPad, setShowWritingPad] = React.useState(false);
  const [writingPadValue, setWritingPadValue] = React.useState('');
  const [activePattern, setActivePattern] = React.useState<string | null>(null);
  const [payloadMetaSource, setPayloadMetaSource] = React.useState<string | null>(null);
  const [mediumComment, setMediumComment] = React.useState<string | null>(null);
  const [mediumCommentLocale, setMediumCommentLocale] = React.useState<PatternMirrorLocale | null>(
    null
  );
  const [mediumCopied, setMediumCopied] = React.useState(false);
  const [typoMode, setTypoMode] = React.useState<'ui' | 'mono'>(() => {
    if (typeof window === 'undefined') return 'ui';
    const stored = window.localStorage.getItem('gratia.typo');
    return stored === 'mono' ? 'mono' : 'ui';
  });

  const resultsRef = React.useRef<HTMLDivElement | null>(null);

  const patternPack =
    (resources as any)[mirrorLocale]?.patterns ??
    (resources as any)[defaultLocale as PatternMirrorLocale]?.patterns ??
    {};

  const isResultsStage = stage === 'reflection' || stage === 'trueStep' || stage === 'error';
  const visibleTrueStepPrompt = trueStepPrompt ?? t('trueStep_phrase');
  const hintKey: 'hint_idle' | 'hint_ready' | 'hint_listening' | 'hint_results' =
    stage === 'ready'
      ? 'hint_ready'
      : stage === 'listening'
        ? 'hint_listening'
        : isResultsStage
          ? 'hint_results'
          : 'hint_idle';

  const seedsForLocale = React.useMemo(
    () => loadTruthSeeds().filter((s) => s.locale === mirrorLocale),
    [mirrorLocale]
  );
  const prefillValue = React.useMemo(
    () => searchParams.get('text') ?? searchParams.get('url'),
    [searchParams]
  );
  const buttonGlow = skinId === 'MOON' ? 'shadow-[0_0_0_1px_rgba(255,255,255,0.12)]' : '';

  React.useEffect(() => {
    const incoming = prefillValue?.trim();
    if (incoming && !text) {
      setText(incoming);
      setStage('ready');
    }
  }, [prefillValue, text]);

  React.useEffect(() => {
    setMediumComment(null);
    setMediumCommentLocale(null);
    setMediumCopied(false);
  }, [mirrorLocale]);

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.typo = typoMode;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('gratia.typo', typoMode);
    }
  }, [typoMode]);

  React.useEffect(() => {
    if (!savedTruth && seedsForLocale.length > 0) {
      setSavedTruth(seedsForLocale[0]?.text ?? null);
    }
  }, [savedTruth, seedsForLocale]);

  React.useEffect(() => {
    if (isResultsStage) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isResultsStage]);

  React.useEffect(() => {
    // Default to MOON once when entering the ritual; restore on exit.
    const previous = skinId;
    if (previous === 'SUN') {
      setSkinId('MOON');
    }
    return () => setSkinId(previous);
    // Intentional empty deps: run only on mount/unmount with initial skinId.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (value: string) => {
    setText(value);
    if (!value.trim()) {
      setStage('idle');
      return;
    }
    if (stage !== 'listening') {
      setStage('ready');
    }
  };

  const handleRevealReflection = async () => {
    if (!text.trim() || stage === 'listening') return;
    setStage('listening');
    setMediumComment(null);
    setMediumCommentLocale(null);
    setMediumCopied(false);

    try {
      const res = await fetch('/api/pattern-mirror', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': mirrorLocale,
        },
        body: JSON.stringify({
          content: text,
          lang: mirrorLocale,
          locale: mirrorLocale,
        }),
      });

      const data = (await res.json()) as PatternMirrorResponse;

      setReflectionBullets(data.reflectionBullets ?? []);
      setPatternChips(data.patternChips ?? []);
      setEnergyTone(data.energyTone ?? null);
      setTrueStepPrompt(data.nextTrueStepPrompt ?? null);
      setPayloadMetaSource(data.meta?.source ?? null);

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[pattern-mirror] source:', data.meta?.source ?? 'unknown');
      }

      setStage('reflection');
    } catch (error) {
      console.error('[pattern-mirror]', error);
      setPayloadMetaSource('sample-fallback');
      setStage('error');
    }
  };

  const handleSelectTab = (tab: 'reflection' | 'trueStep') => {
    if (stage === 'reflection' || stage === 'trueStep') {
      setStage(tab);
    }
  };

  const openWritingPad = () => {
    setWritingPadValue('');
    setShowWritingPad(true);
  };

  const saveWritingPad = () => {
    const trimmed = writingPadValue.trim();
    if (trimmed) {
      setSavedTruth(trimmed);
      persistTruthSeed({
        text: trimmed,
        locale: mirrorLocale,
        createdAt: new Date().toISOString(),
      });
    }
    setShowWritingPad(false);
  };

  const getPatternMeta = (chip: string): { key: string; meta?: PatternMeta } => {
    const key = normalizePatternKey(chip);
    return { key, meta: patternPack?.[key] as PatternMeta | undefined };
  };

  const activePatternMeta = activePattern
    ? (patternPack?.[activePattern] as PatternMeta | undefined)
    : null;

  const buildMediumComment = () => {
    const seedsLine = patternChips
      .slice(0, 3)
      .map((chip) => {
        const { key, meta } = getPatternMeta(chip);
        const emoji = meta?.emoji ?? '🌱';
        const label = meta?.label ?? key;
        return `${emoji} ${label}`;
      })
      .filter(Boolean)
      .join(' · ');

    const lines: string[] = [];
    lines.push(t('section_reflection_title'));
    lines.push('');
    reflectionBullets.forEach((b) => {
      const line = typeof b === 'string' ? b.trim() : String(b ?? '').trim();
      if (line) lines.push(`• ${line}`);
    });
    lines.push('');

    if (seedsLine) {
      lines.push(t('section_patterns_title'));
      lines.push('');
      lines.push(seedsLine);
      lines.push('');
    }

    if (energyTone) {
      lines.push(`${t('tone_label')}: ${energyTone}.`);
      lines.push('');
    }

    if (visibleTrueStepPrompt) {
      lines.push(t('trueStep_title'));
      lines.push('');
      lines.push(`*${visibleTrueStepPrompt.trim()}*`);
      lines.push('');
      lines.push(t('trueStep_hint'));
      lines.push('');
    }

    lines.push('🪷');
    lines.push(t('trueStep_footer'));
    if (t('trueStep_footer_ember')) {
      lines.push(t('trueStep_footer_ember'));
    }

    return lines.join('\n');
  };

  const handleGenerateMediumComment = async () => {
    if (
      reflectionBullets.length === 0 &&
      patternChips.length === 0 &&
      !energyTone &&
      !visibleTrueStepPrompt
    ) {
      return;
    }

    const comment = buildMediumComment();
    setMediumComment(comment);
    setMediumCommentLocale(mirrorLocale);

    try {
      await navigator.clipboard.writeText(comment);
      setMediumCopied(true);
      setTimeout(() => setMediumCopied(false), 2500);
    } catch (err) {
      console.error('[pattern-mirror] failed to copy medium comment', err);
    }
  };

  return (
    <main className="bg-surface text-on-surface flex min-h-screen justify-center px-4 py-10">
      <div className="w-full max-w-3xl space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div
            className={
              skinId === 'MOON'
                ? 'rounded-full bg-[color:var(--color-surface)]/70 p-3 shadow-[0_0_22px_rgba(255,255,255,0.12)] ring-1 ring-[color:var(--color-border)]/70'
                : 'rounded-full bg-[color:var(--color-accent)]/12 p-3 shadow-inner'
            }
          >
            <span className="text-xl">🪷</span>
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-semibold">{t('title')}</h1>
            <p className="mx-auto max-w-lg text-sm text-[color:var(--color-muted)]">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <Toolbar
          aria-label="Pattern Mirror controls"
          className="flex flex-wrap items-center justify-end gap-2 text-xs text-[color:var(--color-muted)]"
        >
          <ToolbarGroup className="flex gap-2">
            {reflectionLocales.map((code) => (
              <Button
                key={code}
                variant={code === translationLocale ? 'solid' : 'outline'}
                tone="warning"
                className={code === translationLocale ? buttonGlow : undefined}
                onClick={() => onLocaleChange(code)}
              >
                {code.toUpperCase()}
              </Button>
            ))}
          </ToolbarGroup>
          <ToolbarGroup className="flex gap-2">
            <Button
              variant={skinId === 'SUN' ? 'solid' : 'outline'}
              tone="warning"
              className={
                skinId === 'SUN' ? 'bg-[color:var(--color-accent)]/15 shadow-inner' : undefined
              }
              onClick={() => setSkinId('SUN')}
            >
              Sun
            </Button>
            <Button
              variant={skinId === 'MOON' ? 'solid' : 'outline'}
              tone="warning"
              className={
                skinId === 'MOON'
                  ? 'shadow-[0_0_0_1px_rgba(255,255,255,0.08)] ring-1 ring-[color:var(--color-border)]/60'
                  : undefined
              }
              onClick={() => setSkinId('MOON')}
            >
              Moon
            </Button>
            <Button
              variant={typoMode === 'mono' ? 'solid' : 'outline'}
              tone="warning"
              onClick={() => setTypoMode((prev) => (prev === 'mono' ? 'ui' : 'mono'))}
            >
              {typoMode === 'mono' ? 'Vienna' : 'Default'}
            </Button>
          </ToolbarGroup>
        </Toolbar>

        <Card variant="elev" padding="lg" className="space-y-3">
          <Field label={t('title')} hint={t(hintKey)}>
            <textarea
              value={text}
              onChange={(e) => handleChange(e.target.value)}
              rows={6}
              className="w-full resize-none bg-transparent outline-none"
              placeholder={t('placeholder')}
              disabled={stage === 'listening'}
            />
          </Field>

          <div className="flex items-center justify-end">
            <Button
              variant="outline"
              tone="warning"
              disabled={!text.trim() || stage === 'listening'}
              loading={stage === 'listening'}
              className={buttonGlow}
              onClick={handleRevealReflection}
            >
              <span className="mr-1">🪷</span>
              {t('button_reveal')}
            </Button>
          </div>

          {process.env.NODE_ENV === 'development' && payloadMetaSource === 'sample-fallback' && (
            <p className="text-[11px] text-[color:var(--color-muted)]">
              (using sample reflection — model not configured)
            </p>
          )}
        </Card>

        {(stage === 'reflection' || stage === 'trueStep' || stage === 'error') && (
          <Card
            ref={resultsRef}
            variant="plain"
            padding="lg"
            className="border-border space-y-4 border"
          >
            <div className="border-border flex border-b text-sm">
              <button
                type="button"
                onClick={() => handleSelectTab('reflection')}
                className={`flex-1 py-2 ${stage === 'reflection' ? 'text-on-surface font-semibold' : 'text-[color:var(--color-muted)]'}`}
              >
                {t('tab_reflection')}
              </button>
              <button
                type="button"
                onClick={() => handleSelectTab('trueStep')}
                className={`flex-1 py-2 ${stage === 'trueStep' ? 'text-on-surface font-semibold' : 'text-[color:var(--color-muted)]'}`}
              >
                {t('tab_trueStep')}
              </button>
            </div>

            {stage === 'reflection' && (
              <div className="space-y-4 text-sm">
                <div>
                  <p className="mb-1 text-sm font-semibold text-[color:var(--color-muted)]">
                    {t('section_reflection_title')}
                  </p>
                  <ul className="list-disc space-y-1 pl-5">
                    {reflectionBullets.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {patternChips.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-[color:var(--color-muted)]">
                      {t('section_patterns_title')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {patternChips.map((chip) => {
                        const { key, meta } = getPatternMeta(chip);
                        if (!meta) return null;
                        const badgeContent = `${meta.emoji ?? ''} ${meta.label ?? key}`.trim();
                        return (
                          <Badge
                            key={chip}
                            tone="warning"
                            variant="soft"
                            className={
                              skinId === 'MOON'
                                ? 'shadow-[0_0_0_1px_rgba(255,255,255,0.08)]'
                                : undefined
                            }
                            onClick={() => setActivePattern((prev) => (prev === key ? null : key))}
                          >
                            {badgeContent}
                          </Badge>
                        );
                      })}
                    </div>

                    {activePattern && (
                      <Card variant="plain" padding="sm" className="border-border space-y-1 border">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium">
                            {activePatternMeta?.label ?? activePattern.replace(/-/g, ' ')}
                          </p>
                          <button
                            type="button"
                            onClick={() => setActivePattern(null)}
                            className="hover:text-on-surface text-[11px] text-[color:var(--color-muted)]"
                          >
                            ✕
                          </button>
                        </div>
                        {activePatternMeta?.description && (
                          <p className="text-xs text-[color:var(--color-muted)]">
                            {activePatternMeta.description}
                          </p>
                        )}
                        {activePatternMeta?.tone && (
                          <p className="text-[11px] text-[color:var(--color-muted)]">
                            {activePatternMeta.tone}
                          </p>
                        )}
                      </Card>
                    )}
                  </div>
                )}

                {energyTone && (
                  <div className="pt-2 text-sm text-[color:var(--color-muted)]">
                    {t('tone_label')}:{' '}
                    <span className="text-on-surface font-medium">{energyTone}</span>
                  </div>
                )}

                <div className="border-border border-t pt-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-[color:var(--color-muted)]">
                      Medium mode · generate a gentle comment you can paste on Medium or anywhere
                      else.
                    </p>
                    <Button
                      variant="outline"
                      tone="warning"
                      className={buttonGlow}
                      disabled={
                        reflectionBullets.length === 0 &&
                        patternChips.length === 0 &&
                        !energyTone &&
                        !visibleTrueStepPrompt
                      }
                      onClick={handleGenerateMediumComment}
                    >
                      🪷 Generate Medium comment
                    </Button>
                  </div>

                  {mediumCopied && (
                    <p className="text-xs text-[color:var(--color-positive)]">
                      Copied to clipboard. You can paste it in your response. 🫂
                    </p>
                  )}

                  {mediumComment && mediumCommentLocale === mirrorLocale && (
                    <pre className="pm-longform font-ui border-border/60 text-on-surface mt-2 rounded-lg border bg-[color:var(--color-surface)]/80 px-3 py-2 text-sm whitespace-pre-wrap opacity-90">
                      {mediumComment}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {stage === 'trueStep' && (
              <div className="space-y-3 text-sm">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[color:var(--color-muted)]">
                    {t('trueStep_title')}
                  </p>
                  <p>{t('trueStep_intro')}</p>
                  <p className="font-medium italic">{visibleTrueStepPrompt}</p>
                  <p className="text-xs text-[color:var(--color-muted)]">{t('trueStep_hint')}</p>

                  <Button
                    variant="outline"
                    tone="warning"
                    className={buttonGlow}
                    onClick={openWritingPad}
                  >
                    <span className="mr-1">🪷</span>
                    {t('trueStep_button_openPad')}
                  </Button>

                  {savedTruth && (
                    <Card variant="plain" padding="sm" className="border-border space-y-1 border">
                      <p className="text-xs font-semibold text-[color:var(--color-muted)]">
                        {t('trueStep_saved_label')}
                      </p>
                      <p className="text-sm">“{savedTruth}”</p>
                    </Card>
                  )}
                </div>

                <p className="border-border border-t border-dashed pt-2 text-xs text-[color:var(--color-muted)]">
                  {t('trueStep_footer')}
                </p>
                {t('trueStep_footer_ember') && (
                  <p className="text-[11px] text-[color:var(--color-muted)]">
                    {t('trueStep_footer_ember')}
                  </p>
                )}
              </div>
            )}

            {stage === 'error' && (
              <div className="space-y-3 text-sm">
                <p>{t('error_text')}</p>
                <Button
                  variant="outline"
                  tone="warning"
                  className={buttonGlow}
                  onClick={() => setStage(text.trim() ? 'ready' : 'idle')}
                >
                  {t('error_back')}
                </Button>
              </div>
            )}
          </Card>
        )}

        {showWritingPad && (
          <div className="fixed inset-0 z-20 flex items-end justify-center bg-black/30">
            <Card variant="elev" padding="lg" className="w-full max-w-md space-y-3 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{t('pad_title')}</p>
                <Button variant="ghost" tone="default" onClick={() => setShowWritingPad(false)}>
                  ✕
                </Button>
              </div>
              <textarea
                value={writingPadValue}
                onChange={(e) => setWritingPadValue(e.target.value)}
                rows={4}
                className="w-full resize-none bg-transparent text-sm outline-none"
                placeholder={t('pad_placeholder')}
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" tone="default" onClick={() => setShowWritingPad(false)}>
                  {t('pad_cancel')}
                </Button>
                <Button
                  variant="solid"
                  tone="warning"
                  className={buttonGlow}
                  onClick={saveWritingPad}
                >
                  {t('pad_save')}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}

export default function PatternMirrorPageClient() {
  const [locale, setLocale] = React.useState<PatternMirrorLocale>('ro');

  return (
    <I18nProvider locale={locale}>
      <PatternMirrorContent onLocaleChange={setLocale} />
    </I18nProvider>
  );
}

function loadTruthSeeds(): TruthSeed[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(TRUTH_SEEDS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => {
        if (!item || typeof item !== 'object') return null;
        const text = typeof item.text === 'string' ? item.text : '';
        const locale = typeof item.locale === 'string' ? item.locale : '';
        const createdAt = typeof item.createdAt === 'string' ? item.createdAt : '';
        if (!text || !locale) return null;
        return {
          text,
          locale: locale as PatternMirrorLocale,
          createdAt: createdAt || new Date().toISOString(),
        };
      })
      .filter(Boolean) as TruthSeed[];
  } catch {
    return [];
  }
}

function persistTruthSeed(seed: TruthSeed) {
  if (typeof window === 'undefined') return;
  try {
    const seeds = loadTruthSeeds();
    const next = [{ ...seed, createdAt: new Date().toISOString() }, ...seeds].slice(0, 20);
    window.localStorage.setItem(TRUTH_SEEDS_KEY, JSON.stringify(next));
  } catch {
    // swallow
  }
}
