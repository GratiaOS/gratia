import type { Metadata } from 'next';

const messages = {
  en: {
    title: 'Gratia is a gentle space of memory and presence.',
    line1: 'A place where creation remembers it is safe.',
    line2: 'Soft as light. Warm as spring. 🌿',
    subtitle: 'A calm way to listen to nature, feel the world, and remember yourself.',
    footer: 'Offer only what you love.',
  },
  es: {
    title: 'Gratia es un espacio vivo de memoria y presencia.',
    line1: 'Un lugar donde la creación recuerda que está a salvo.',
    line2: 'Suave como la luz. Cálida como la primavera. 🌿',
    subtitle: 'Una forma tranquila de escuchar la naturaleza, sentir el mundo y reencontrarte contigo.',
    footer: 'Ofrece solo lo que amas.',
  },
  fr: {
    title: 'Gratia est un espace doux de mémoire et de présence.',
    line1: 'Un lieu où la création se souvient qu’elle est en sécurité.',
    line2: 'Légère comme la lumière. Chaude comme le printemps. 🍃',
    subtitle: 'Une manière paisible d’écouter la nature, de sentir le monde et de te retrouver toi-même.',
    footer: 'N’offre que ce que tu aimes.',
  },
  ar: {
    title: 'Gratia فضاء لطيف للذاكرة والحضور.',
    line1: 'مكانٌ تتذكّر فيه الخليقة أنها في أمان.',
    line2: 'ناعمة كالنور، دافئة مثل الربيع. 🍃',
    subtitle: 'طريق هادئ للإصغاء إلى الطبيعة، والشعور بالعالم، والتلاقي مع ذاتك من جديد.',
    footer: 'قدّم فقط ما تحبّه.',
  },
  ro: {
    title: 'Gratia este un spațiu blând de memorie și prezență.',
    line1: 'Un loc în care creația își amintește siguranța.',
    line2: 'Moale ca lumina. Caldă ca primăvara. 🌿',
    subtitle: 'O cale liniștită de a asculta natura, de a simți lumea și de a te regăsi pe tine.',
    footer: 'Oferă doar ceea ce iubești.',
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
  fr: {
    title: 'GratiaOS · Nature, mémoire et présence douce',
    description:
      'GratiaOS est un espace doux où nature et mémoire respirent ensemble. Animaux, plantes, rochers – un voyage calme pour sentir le monde et se sentir soi.',
  },
  ar: {
    title: 'GratiaOS · طبيعة وذاكرة وحضور بلطف',
    description:
      'GratiaOS هو فضاء لطيف تُصافح فيه الطبيعة الذاكرة. حيوانات ونباتات وصخور، رحلة هادئة لاكتشاف العالم والشعور بالذات.',
  },
  ro: {
    title: 'GratiaOS · Natură, memorie și prezență blândă',
    description:
      'GratiaOS este un spațiu blând în care natura și memoria respiră împreună. Animale, plante și pietre te invită să simți lumea și să te simți pe tine.',
  },
} as const;

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' },
  { code: 'ro', label: 'Română' },
] as const;

type LangCode = (typeof languages)[number]['code'];

function resolveLang(raw?: string): LangCode {
  if (!raw) return 'en';
  const lower = raw.toLowerCase();
  return (languages.find((l) => l.code === lower)?.code as LangCode) ?? 'en';
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

  return (
    <main
      className="flex min-h-screen items-center justify-center px-6 py-10"
      dir={activeLang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="max-w-xl space-y-8 text-center">
        <div className="flex justify-center">
          <div
            className="h-20 w-20 rounded-full shadow-lg"
            aria-hidden="true"
            style={{
              background: 'radial-gradient(circle at 30% 20%, #fff7e6, var(--color-accent))',
            }}
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl leading-snug font-semibold md:text-3xl">{t.title}</h1>
          <p className="text-base leading-relaxed opacity-85 md:text-lg">
            {t.line1}
            <br />
            {t.line2} <span>☀️</span>
          </p>
          {t.subtitle && (
            <p className="text-sm leading-relaxed text-opacity-80 text-current md:text-base">
              {t.subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center justify-center gap-3 text-xs opacity-80">
          {languages.map((lang) => {
            const isActive = lang.code === activeLang;
            const href = lang.code === 'en' ? '/' : `/?lang=${lang.code}`;

            return (
              <a
                key={lang.code}
                href={href}
                className={
                  'underline-offset-4 ' +
                  (isActive ? 'font-semibold underline' : 'opacity-85 hover:underline')
                }
              >
                {lang.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-4 text-sm opacity-80">
          <a href="https://github.com/GratiaOS" className="underline-offset-4 hover:underline">
            GitHub
          </a>
          <span>·</span>
          <a
            href="https://github.com/orgs/GratiaOS/discussions"
            className="underline-offset-4 hover:underline"
          >
            Discussions
          </a>
          <span>·</span>
          <a href="mailto:contact@gratia.space" className="underline-offset-4 hover:underline">
            Email
          </a>
          <span>·</span>
          <a href="/vortex" className="underline-offset-4 hover:underline">
            ✺ Vortex
          </a>
        </div>

        <p className="text-xs tracking-[0.18em] uppercase opacity-60">{t.footer}</p>
      </div>
    </main>
  );
}
