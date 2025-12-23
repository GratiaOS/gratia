'use client';

import type React from 'react';
import { Card } from '@gratiaos/ui';
import { I18nProvider, useTranslation } from '../../i18n/I18nProvider';
import { useSkinField } from '../skin/SkinFieldProvider';

function GlowWrap({ isMoon, children }: { isMoon: boolean; children: React.ReactNode }) {
  return (
    <div className={isMoon ? 'rounded-[inherit] shadow-depth-1' : ''}>{children}</div>
  );
}

function AboutPageContent() {
  const { t } = useTranslation('about');
  const { skinId } = useSkinField();
  const isMoon = skinId === 'MOON';

  return (
    <main className="min-h-screen bg-surface text-on-surface">
      <div className="mx-auto flex max-w-3xl flex-col space-y-16 px-6 py-16">
        <header className="space-y-4">
          <h1 className="text-4xl font-medium">{t('header.title')}</h1>
          <p className="text-lg leading-relaxed text-[color:var(--color-muted)]">
            {t('header.subtitle')}
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">{t('whatIs.title')}</h2>
          <div className="space-y-4 leading-relaxed">
            <p>{t('whatIs.p1')}</p>
            <p>{t('whatIs.p2')}</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-medium">{t('layers.title')}</h2>
          <div className="space-y-6">
            <GlowWrap isMoon={isMoon}>
              <Card className="border border-border bg-surface p-6">
                <h3 className="mb-3 text-lg font-medium">{t('layers.public.title')}</h3>
                <p className="leading-relaxed">{t('layers.public.body')}</p>
              </Card>
            </GlowWrap>

            <GlowWrap isMoon={isMoon}>
              <Card className="border border-border bg-surface p-6">
                <h3 className="mb-3 text-lg font-medium">{t('layers.shared.title')}</h3>
                <p className="leading-relaxed">{t('layers.shared.body')}</p>
              </Card>
            </GlowWrap>

            <GlowWrap isMoon={isMoon}>
              <Card className="border border-border bg-surface p-6">
                <h3 className="mb-3 text-lg font-medium">{t('layers.sealed.title')}</h3>
                <p className="leading-relaxed">{t('layers.sealed.body')}</p>
              </Card>
            </GlowWrap>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">{t('agency.title')}</h2>
          <div className="space-y-4 leading-relaxed">
            <p>{t('agency.p1')}</p>
            <p>{t('agency.p2')}</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">{t('export.title')}</h2>
          <div className="space-y-4 leading-relaxed">
            <p>{t('export.p1')}</p>
            <p>{t('export.p2')}</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">{t('maintenance.title')}</h2>
          <div className="space-y-4 leading-relaxed">
            <p>{t('maintenance.p1')}</p>
            <p>{t('maintenance.p2')}</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium">{t('mediumMode.title')}</h2>
          <p className="leading-relaxed">{t('mediumMode.p1')}</p>
          <GlowWrap isMoon={isMoon}>
            <Card className="border border-border bg-surface p-6">
              <div className="space-y-4 font-mono text-sm leading-relaxed">
                <p className="text-[color:var(--color-muted)]">{t('mediumMode.sample.date')}</p>
                <p>{t('mediumMode.sample.body')}</p>
                <p className="text-[color:var(--color-muted)]">{t('mediumMode.sample.sig')}</p>
              </div>
            </Card>
          </GlowWrap>
        </section>

        <footer className="border-border border-t pt-8">
          <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">
            {t('footer.text')}
          </p>
        </footer>
      </div>
    </main>
  );
}

export default function AboutPageClient() {
  return (
    <I18nProvider>
      <AboutPageContent />
    </I18nProvider>
  );
}
