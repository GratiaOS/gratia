import type { Metadata } from 'next';
import GratiaMark from '@/components/GratiaMark';
import { defaultLocale } from '../../i18n/config';

const messages = {
  es: {
    title: 'La Asociación',
    subtitle: 'Gratia es un campo vivo de memoria y presencia.',
    bullets: [
      'Sostenemos círculos de escucha y cuidado.',
      'Creamos herramientas abiertas para la presencia cotidiana.',
      'Sembramos educación y práctica para la comunidad.',
    ],
    note: 'Un espacio simple para volver a ti, sin juicio y sin prisa.',
    cta: 'Escríbenos',
    legal: 'Datos legales (pronto) · Transparencia (pronto)',
  },
  en: {
    title: 'The Association',
    subtitle: 'Gratia is a living field of memory and presence.',
    bullets: [
      'We hold circles of listening and care.',
      'We build open tools for everyday presence.',
      'We seed education and practice for the community.',
    ],
    note: 'A simple place to come back to yourself — without judgment, without hurry.',
    cta: 'Write to us',
    legal: 'Legal details (soon) · Transparency (soon)',
  },
  ro: {
    title: 'Asociația',
    subtitle: 'Gratia e un câmp viu de memorie și prezență.',
    bullets: [
      'Ținem cercuri de ascultare și îngrijire.',
      'Construim unelte deschise pentru prezența de zi cu zi.',
      'Semănăm educație și practică pentru comunitate.',
    ],
    note: 'Un loc simplu în care revii la tine — fără judecată, fără grabă.',
    cta: 'Scrie-ne',
    legal: 'Date legale (în curând) · Transparență (în curând)',
  },
} as const;

const meta = {
  es: {
    title: 'La Asociación · Gratia',
    description:
      'Gratia es un campo vivo de memoria y presencia. Círculos, herramientas abiertas y práctica comunitaria.',
  },
  en: {
    title: 'The Association · Gratia',
    description:
      'Gratia is a living field of memory and presence. Circles, open tools, and community practice.',
  },
  ro: {
    title: 'Asociația · Gratia',
    description:
      'Gratia e un câmp viu de memorie și prezență. Cercuri, unelte deschise și practică comunitară.',
  },
} as const;

const languages = ['es', 'ro', 'en'] as const;
type LangCode = (typeof languages)[number];

function resolveLang(raw?: string): LangCode {
  if (!raw) return (defaultLocale as LangCode) ?? 'es';
  const lower = raw.toLowerCase();
  return (
    (languages.find((code) => code === lower) as LangCode) ?? (defaultLocale as LangCode) ?? 'es'
  );
}

type PageSearchParams = { lang?: string };

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<PageSearchParams>;
}): Promise<Metadata> {
  const params = (await searchParams) ?? {};
  const activeLang = resolveLang(params.lang);
  const entry = meta[activeLang] ?? meta.es;
  return {
    title: entry.title,
    description: entry.description,
  };
}

export default async function AsociacionPage({
  searchParams,
}: {
  searchParams?: Promise<PageSearchParams>;
}) {
  const params = (await searchParams) ?? {};
  const activeLang = resolveLang(params.lang);
  const t = messages[activeLang] ?? messages.es;

  return (
    <main className="flex min-h-dvh items-center justify-center px-6 py-12">
      <div className="landing-hero max-w-xl space-y-8 text-center">
        <div className="landing-hero-mark">
          <GratiaMark
            variant="color"
            size={96}
            className="landing-hero-mark-inner"
            motion="suave"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl leading-snug font-semibold md:text-3xl">{t.title}</h1>
          <p className="text-base leading-relaxed opacity-85 md:text-lg">{t.subtitle}</p>
          <p className="text-sm leading-relaxed opacity-70 md:text-base">{t.note}</p>
        </div>

        <ul className="space-y-2 text-sm leading-relaxed opacity-85 md:text-base">
          {t.bullets.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>

        <a
          href="mailto:contact@gratia.space"
          className="inline-flex items-center justify-center rounded-full border border-(--color-border)/40 bg-(--color-surface)/40 px-4 py-2 text-sm opacity-90 transition hover:opacity-100 focus-visible:ring-2 focus-visible:ring-(--color-accent)/35 focus-visible:outline-none"
        >
          {t.cta}
        </a>
        <div className="pt-2 text-xs opacity-55">{t.legal}</div>
      </div>
    </main>
  );
}
