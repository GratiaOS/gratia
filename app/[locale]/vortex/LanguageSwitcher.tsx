'use client';

import { usePathname, useRouter } from 'next/navigation';
import { supportedLocales, defaultLocale } from '../../../i18n/config';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  if (!pathname) return null;

  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = (segments[0] as string | undefined) ?? defaultLocale;

  const switchToLocale = (loc: string) => {
    if (loc === currentLocale) return;
    const newSegments = [...segments];
    newSegments[0] = loc;
    const newPath = '/' + newSegments.join('/');
    router.push(newPath);
  };

  return (
    <div className="respira-lang-switch">
      {supportedLocales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchToLocale(loc)}
          className={`respira-lang-chip ${loc === currentLocale ? 'is-active' : ''}`}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
