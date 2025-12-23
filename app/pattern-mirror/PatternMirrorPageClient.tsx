'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Badge, Button, Card, Pill, Toolbar, ToolbarGroup, Whisper } from '@gratiaos/ui';
import { Leaf } from '@gratiaos/icons';

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

function PatternMirrorContent() {
  const { t, locale: translationLocale, setLocale } = useTranslation('reflection');
  const { skinId, setSkinId } = useSkinField();
  const searchParams = useSearchParams();
  const mirrorLocale: PatternMirrorLocale =
    translationLocale === 'es' ? 'es' : translationLocale === 'ro' ? 'ro' : 'en';

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
  const [typoMode, setTypoMode] = React.useState<'ui' | 'mono'>('ui');
  const [toolbarDepth, setToolbarDepth] = React.useState<1 | 2>(1);
  const hasText = text.trim().length > 0;
  const toolbarDepthTimer = React.useRef<number | null>(null);

  const [inputFocused, setInputFocused] = React.useState(false);
  const [resultsHovered, setResultsHovered] = React.useState(false);
  const [toolbarCollapsed, setToolbarCollapsed] = React.useState(false);
  const [toolbarHover, setToolbarHover] = React.useState(false);
  const [toolbarPinnedOpen, setToolbarPinnedOpen] = React.useState(false);
  const toolbarRef = React.useRef<HTMLDivElement | null>(null);

  const resultsRef = React.useRef<HTMLDivElement | null>(null);

  const patternPack =
    (resources as any)[mirrorLocale]?.patterns ??
    (resources as any)[defaultLocale as PatternMirrorLocale]?.patterns ??
    {};

  const isResultsStage = stage === 'reflection' || stage === 'trueStep' || stage === 'error';
  const visibleTrueStepPrompt = trueStepPrompt ?? t('trueStep_phrase');
  const canShowReflection = stage === 'reflection' || stage === 'trueStep';
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
  // Removed buttonGlow, no longer used.
  const skinGroups = [
    {
      id: 'warm',
      options: [
        { id: 'SUN', label: '☀️ Sun' },
        { id: 'GARDEN', label: '🌿 Garden' },
      ],
    },
    {
      id: 'night',
      options: [
        { id: 'MOON', label: '🌙 Moon' },
        { id: 'STELLAR', label: '🟣 Stellar' },
      ],
    },
  ] as const;

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
    const hasText = text.length > 0;
    if (hasText) {
      setToolbarCollapsed(true);
    } else {
      setToolbarCollapsed(false);
      setToolbarPinnedOpen(false);
    }
  }, [hasText]);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('gratia.typo');
    const dataset = document.documentElement.dataset.typo;
    const next = stored === 'mono' || dataset === 'mono' ? 'mono' : 'ui';
    setTypoMode((prev) => (prev === next ? prev : next));
  }, []);

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.typo = typoMode;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('gratia.typo', typoMode);
    }
  }, [typoMode]);

  React.useEffect(() => {
    return () => {
      if (toolbarDepthTimer.current) {
        window.clearTimeout(toolbarDepthTimer.current);
      }
    };
  }, []);

  const pulseToolbarDepth = (level: 1 | 2 = 2, ms = 520) => {
    if (toolbarDepthTimer.current) {
      window.clearTimeout(toolbarDepthTimer.current);
    }
    setToolbarDepth(level);
    toolbarDepthTimer.current = window.setTimeout(() => setToolbarDepth(1), Math.max(200, ms));
  };

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

  // Removed handleSelectTab; no longer needed due to single-flow UI.

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
      lines.push(`${t('tone_label')} ${energyTone}.`);
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
    lines.push(t('whisper_line'));

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

  // Toolbar sigil open/close helpers
  const openToolbar = () => {
    setToolbarPinnedOpen(true);
    // pulse depth so it feels alive but only on interaction
    pulseToolbarDepth(2, 520);
    // focus first button for keyboard users
    requestAnimationFrame(() => {
      const el = toolbarRef.current;
      const first = el?.querySelector('button') as HTMLButtonElement | null;
      first?.focus();
    });
  };

  const closeToolbar = () => {
    setToolbarPinnedOpen(false);
  };

  return (
    <main
      className="pm-page"
      data-pm-has-text={hasText}
      data-input-focused={inputFocused}
      data-results-hovered={resultsHovered}
    >
      <div className="pm-page-inner">
        <div className="pm-hero">
          <div className="pm-lotus-shell">
            <span className="pm-lotus-mark">🪷</span>
          </div>
          <p className="pm-mirror-whisper">{t('mirror_whisper')}</p>
        </div>

        <div className="pm-toolbar-shell">
          {toolbarCollapsed && !toolbarPinnedOpen && (
            <button
              type="button"
              className="pm-sigil whisper-ring"
              aria-label="Open controls"
              onClick={openToolbar}
              onFocus={openToolbar}
            >
              ⟡
            </button>
          )}

          <Toolbar
            ref={(node) => {
              toolbarRef.current = node as HTMLDivElement | null;
            }}
            aria-label="Pattern Mirror controls"
            data-depth={toolbarDepth}
            data-collapsed={toolbarCollapsed && !toolbarHover && !toolbarPinnedOpen}
            data-open={toolbarPinnedOpen}
            onMouseEnter={() => setToolbarHover(true)}
            onMouseLeave={() => setToolbarHover(false)}
            onFocusCapture={() => setToolbarHover(true)}
            onBlurCapture={(e) => {
              // close only when focus leaves the whole toolbar
              const next = e.relatedTarget as Node | null;
              const root = toolbarRef.current;
              if (root && next && root.contains(next)) return;
              setToolbarHover(false);
              closeToolbar();
            }}
            density="snug"
            className="pm-toolbar pm-toolbar-auto"
          >
            <ToolbarGroup>
              {reflectionLocales.map((code) => {
                const active = code === mirrorLocale;
                return (
                  <Pill
                    key={code}
                    as="button"
                    data-active={active}
                    className="pm-pill"
                    variant={active ? 'soft' : 'subtle'}
                    tone="subtle"
                    density="snug"
                    onClick={() => setLocale(code)}
                  >
                    {code.toUpperCase()}
                  </Pill>
                );
              })}

              <span className="pm-sep" aria-hidden="true">
                ⟡
              </span>

              {skinGroups.map((group, groupIdx) => (
                <React.Fragment key={group.id}>
                  {group.options.map((option) => {
                    const active = skinId === option.id;
                    return (
                      <Pill
                        key={option.id}
                        as="button"
                        data-active={active}
                        className="pm-pill"
                        variant={active ? 'soft' : 'subtle'}
                        tone="subtle"
                        density="snug"
                        onClick={() => {
                          setSkinId(option.id);
                          pulseToolbarDepth();
                        }}
                      >
                        {option.label}
                      </Pill>
                    );
                  })}

                  {groupIdx < skinGroups.length - 1 && (
                    <span className="pm-sep" aria-hidden="true">
                      ⟡
                    </span>
                  )}
                </React.Fragment>
              ))}

              <span className="pm-sep" aria-hidden="true">
                ⟡
              </span>

              {(
                [
                  { id: 'ui', label: 'Default' },
                  { id: 'mono', label: 'Vienna' },
                ] as const
              ).map((opt) => {
                const active = typoMode === opt.id;
                return (
                  <Pill
                    key={opt.id}
                    as="button"
                    data-active={active}
                    className="pm-pill"
                    variant={active ? 'soft' : 'subtle'}
                    tone="subtle"
                    density="snug"
                    onClick={() => {
                      setTypoMode(opt.id);
                      pulseToolbarDepth();
                    }}
                  >
                    {opt.label}
                  </Pill>
                );
              })}
            </ToolbarGroup>
          </Toolbar>
        </div>

        <div className="pm-input">
          <div className="pm-input-wrap">
            <textarea
              value={text}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              rows={7}
              autoFocus
              disabled={stage === 'listening'}
              aria-label={t('mirror_whisper')}
              data-focused={inputFocused}
              className="pm-textarea"
            />

            <div className="pm-input-footer">
              <Button
                variant="ghost"
                tone="accent"
                disabled={!text.trim() || stage === 'listening'}
                loading={stage === 'listening'}
                className="pm-reveal-btn"
                onClick={handleRevealReflection}
              >
                {t('button_reveal')}
              </Button>
            </div>

            {process.env.NODE_ENV === 'development' && payloadMetaSource === 'sample-fallback' && (
              <p className="pm-dev-hint">(using sample reflection — model not configured)</p>
            )}
          </div>
        </div>

        {(stage === 'reflection' || stage === 'trueStep' || stage === 'error') && (
          <Card
            ref={resultsRef}
            variant="plain"
            padding="lg"
            onMouseEnter={() => setResultsHovered(true)}
            onMouseLeave={() => setResultsHovered(false)}
            onFocusCapture={() => setResultsHovered(true)}
            onBlurCapture={() => setResultsHovered(false)}
            className="pm-results"
            data-hovered={resultsHovered}
          >
            <div className="pm-results-inner">
              {canShowReflection && (
                <div className="pm-results-body">
                  {patternChips.length > 0 && (
                    <div className="pm-seeds">
                      <p className="pm-seeds-title">{t('section_patterns_title')}</p>
                      <div className="pm-seeds-list">
                        {patternChips.map((chip) => {
                          const { key, meta } = getPatternMeta(chip);
                          if (!meta) return null;
                          const badgeContent = `${meta.emoji ?? ''} ${meta.label ?? key}`.trim();
                          return (
                            <Badge
                              key={chip}
                              tone="default"
                              variant="soft"
                              className="pm-seed-badge"
                              onClick={() =>
                                setActivePattern((prev) => (prev === key ? null : key))
                              }
                            >
                              {badgeContent}
                            </Badge>
                          );
                        })}
                      </div>

                      {activePattern && (
                        <Card variant="plain" padding="sm" className="pm-seed-meta">
                          <div className="pm-seed-meta-head">
                            <p className="pm-seed-meta-title">
                              {activePatternMeta?.label ?? activePattern.replace(/-/g, ' ')}
                            </p>
                            <button
                              type="button"
                              onClick={() => setActivePattern(null)}
                              className="pm-seed-meta-close"
                            >
                              ✕
                            </button>
                          </div>
                          {activePatternMeta?.description && (
                            <p className="pm-seed-meta-desc">{activePatternMeta.description}</p>
                          )}
                          {activePatternMeta?.tone && (
                            <p className="pm-seed-meta-tone">{activePatternMeta.tone}</p>
                          )}
                        </Card>
                      )}
                    </div>
                  )}
                  <div className="pm-reflection">
                    <p className="pm-reflection-title">{t('section_reflection_title')}</p>
                    <ul className="pm-reflection-list">
                      {reflectionBullets.slice(0, 3).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {energyTone && (
                    <div className="pm-tone">
                      {t('tone_label')} <span className="pm-tone-value">{energyTone}</span>
                    </div>
                  )}

                  <Whisper tone="presence" className="pm-cycles-whisper">
                    <span>🜁</span>
                    <span>{t('cycles_whisper')}</span>
                  </Whisper>

                  <div className="pm-true-step">
                    {/* Mirror Room: prompt-first, then the footstep action */}
                    <div className="pm-true-step-head">
                      <p className="pm-true-step-label">{t('trueStep_title')}</p>

                      <p className="pm-true-step-prompt">{visibleTrueStepPrompt}</p>
                    </div>

                    <div className="pm-true-step-actions">
                      <div>
                        <Button
                          variant="subtle"
                          leadingIcon={<Leaf size={18} aria-hidden />}
                          className="pm-true-step-btn"
                          onClick={openWritingPad}
                        >
                          {t('trueStep_button_openPad')}
                        </Button>
                      </div>

                      <p className="pm-true-step-hint">{t('trueStep_hint')}</p>
                    </div>

                    {savedTruth && (
                      <Card variant="plain" padding="sm" className="pm-saved-truth">
                        <p className="pm-saved-truth-label">{t('trueStep_saved_label')}</p>
                        <p className="pm-saved-truth-text">“{savedTruth}”</p>
                      </Card>
                    )}
                  </div>

                  <div className="pm-medium">
                    <div className="pm-medium-row">
                      <p className="pm-medium-helper">{t('medium_helper')}</p>
                      <Button
                        variant="ghost"
                        tone="default"
                        disabled={
                          reflectionBullets.length === 0 &&
                          patternChips.length === 0 &&
                          !energyTone &&
                          !visibleTrueStepPrompt
                        }
                        onClick={handleGenerateMediumComment}
                      >
                        {t('medium_button')}
                      </Button>
                    </div>

                    {mediumCopied && <p className="pm-medium-copied">{t('medium_copied')}</p>}

                    {mediumComment && mediumCommentLocale === mirrorLocale && (
                      <pre className="pm-medium-comment pm-longform">{mediumComment}</pre>
                    )}
                  </div>
                </div>
              )}

              {stage === 'error' && (
                <div className="pm-error">
                  <p className="pm-error-text">{t('error_text')}</p>
                  <Button
                    variant="outline"
                    tone="default"
                    className="pm-error-btn"
                    onClick={() => setStage(text.trim() ? 'ready' : 'idle')}
                  >
                    {t('error_back')}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        )}

        {showWritingPad && (
          <div className="pm-pad-overlay">
            <Card variant="elev" padding="lg" className="pm-pad-card">
              <div className="pm-pad-header">
                <p className="pm-pad-title">{t('pad_title')}</p>
                <Button variant="ghost" tone="default" onClick={() => setShowWritingPad(false)}>
                  ✕
                </Button>
              </div>
              <textarea
                value={writingPadValue}
                onChange={(e) => setWritingPadValue(e.target.value)}
                rows={4}
                className="pm-pad-textarea"
                placeholder={t('pad_placeholder')}
              />
              <div className="pm-pad-actions">
                <Button variant="ghost" tone="default" onClick={() => setShowWritingPad(false)}>
                  {t('pad_cancel')}
                </Button>
                <Button variant="solid" tone="default" onClick={saveWritingPad}>
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
  return (
    <I18nProvider>
      <PatternMirrorContent />
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
