import type { Metadata } from 'next';
import GratiaMark from '@/components/GratiaMark';
import HomeLanguageSwitcher from '@/components/HomeLanguageSwitcher';
import { defaultLocale } from '../i18n/config';

const messages = {
  en: {
    title: 'Gratia is a gentle space of memory and presence.',
    line1: 'A place where creation remembers it is safe.',
    line2: 'Soft as light. Warm as spring. 🌿',
    subtitle: 'A calm way to listen to nature, feel the world, and remember yourself.',
    footer: 'Offer only what you love.',
    support: 'Support',
  },
  es: {
    title: 'Gratia es un espacio vivo de memoria y presencia.',
    line1: 'Un lugar donde la creación recuerda que está a salvo.',
    line2: 'Cálida como la primavera. Suave como la luz de la Luna. 🌕',
    subtitle:
      'Una forma tranquila de sentir y escuchar la naturaleza y de volver a encontrarse con el propio ser.',
    footer: 'Ofrece solo lo que amas.',
    support: 'Apoyar',
  },
  ro: {
    title: 'Gratia este un spațiu blând de memorie și prezență.',
    line1: 'Un loc în care creația își amintește siguranța.',
    line2: 'Moale ca lumina. Caldă ca primăvara. 🌿',
    subtitle: 'O cale liniștită de a asculta natura, de a simți lumea și de a te regăsi pe tine.',
    footer: 'Oferă doar ceea ce iubești.',
    support: 'Sprijină',
  },
} as const;

const meta = {
  en: {
    title: 'GratiaOS · Gentle nature, memory & presence',
    description:
      'GratiaOS is a gentle space where nature and memory breathe together. Animals, plants and stones invite a calm way to feel the world and feel yourself.',
  },
  es: {
    title: 'GratiaOS · Naturaleza, memoria y presencia suave',
    description:
      'GratiaOS es un espacio suave donde la naturaleza y la memoria respiran juntas. Animales, plantas y piedras invitan a sentir el mundo y a sentirte a ti mismo.',
  },
  ro: {
    title: 'GratiaOS · Natură, memorie și prezență blândă',
    description:
      'GratiaOS este un spațiu blând în care natura și memoria respiră împreună. Animale, plante și pietre te invită să simți lumea și să te simți pe tine.',
  },
} as const;

const languages = [
  { code: 'es', label: 'Español' },
  { code: 'ro', label: 'Română' },
  { code: 'en', label: 'English' },
] as const;

type LangCode = (typeof languages)[number]['code'];

function resolveLang(raw?: string): LangCode {
  if (!raw) return defaultLocale as LangCode;
  const lower = raw.toLowerCase();
  return (languages.find((l) => l.code === lower)?.code as LangCode) ?? (defaultLocale as LangCode);
}

type HomeSearchParams = { lang?: string };

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<HomeSearchParams>;
}): Promise<Metadata> {
  const params = (await searchParams) ?? {};
  const activeLang = resolveLang(params.lang);
  const entry = meta[activeLang] ?? meta.en;
  return {
    title: entry.title,
    description: entry.description,
  };
}

export default async function Home({ searchParams }: { searchParams?: Promise<HomeSearchParams> }) {
  const params = (await searchParams) ?? {};
  const activeLang = resolveLang(params.lang);
  const t = messages[activeLang];
  const supportHref =
    activeLang === defaultLocale ? '/asociacion' : `/asociacion?lang=${activeLang}`;

  return (
    <main
      className="flex min-h-screen items-center justify-center px-6 py-10"
      dir="ltr"
    >
      <div className="landing-hero max-w-xl space-y-8 text-center">
        <div className="landing-hero-mark">
          <GratiaMark variant="color" size={112} className="landing-hero-mark-inner" motion="suave" />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl leading-snug font-semibold md:text-3xl">{t.title}</h1>
          <p className="text-base leading-relaxed opacity-85 md:text-lg">
            {t.line1}
            <br />
            {t.line2}
          </p>
          {t.subtitle && (
            <p className="text-sm leading-relaxed text-opacity-80 text-current md:text-base">
              {t.subtitle}
            </p>
          )}
        </div>

        <HomeLanguageSwitcher
          activeLang={activeLang}
          languages={languages}
          className="flex items-center justify-center gap-3 text-xs opacity-80"
        />

        <div className="flex items-center justify-center gap-4 text-sm opacity-40 transition-opacity hover:opacity-100 focus-within:opacity-100">
          <a href={supportHref} className="underline-offset-4 hover:underline">
            {t.support}
          </a>
          <span>⟡</span>
          <a href="mailto:contact@gratia.space" className="underline-offset-4 hover:underline">
            Email
          </a>
          <span>⟡</span>
          <a href="https://github.com/GratiaOS" className="underline-offset-4 hover:underline">
            GitHub
          </a>
        </div>

        <p className="text-xs tracking-[0.18em] uppercase opacity-60">{t.footer}</p>
      </div>
    </main>
  );
}
