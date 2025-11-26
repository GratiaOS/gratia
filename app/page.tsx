const messages = {
  en: {
    title: 'Gratia is a gentle space of memory and presence.',
    line1: 'A free space where creation feels safe again.',
    line2: 'Soft as light. Warm as spring',
    footer: 'Offer only what you love.',
  },
  es: {
    title: 'Gratia es un espacio vivo de memoria y presencia.',
    line1: 'Un espacio libre donde la creación vuelve a sentirse segura.',
    line2: 'Suave como la luz. Cálido como la primavera',
    footer: 'Ofrece solo lo que amas.',
  },
  ro: {
    title: 'Gratia este un spațiu blând de memorie și prezență.',
    line1: 'Un spațiu liber în care creația se poate simți din nou în siguranță.',
    line2: 'Moale ca lumina. Caldă ca primăvara',
    footer: 'Oferă doar ceea ce iubești.',
  },
} as const;

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'ro', label: 'Română' },
] as const;

type LangCode = (typeof languages)[number]['code'];

function resolveLang(raw?: string): LangCode {
  if (!raw) return 'en';
  const lower = raw.toLowerCase();
  return (languages.find((l) => l.code === lower)?.code as LangCode) ?? 'en';
}

type HomeSearchParams = { lang?: string };

export default async function Home({ searchParams }: { searchParams?: Promise<HomeSearchParams> }) {
  const params = (await searchParams) ?? {};
  const activeLang = resolveLang(params.lang);
  const t = messages[activeLang];

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
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
