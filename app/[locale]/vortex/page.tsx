import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import VortexPageClient from '../../vortex/VortexPageClient';
import { isSupportedLocale, defaultLocale } from '../../../i18n/config';

export const metadata: Metadata = {
  title: 'Vortex · Gratia',
  description: 'LightFrog Vortex — un portal ceremonios, cu puls blând și gif-ul din atelierul Gratia.',
};

export default async function VortexLocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    // fallback soft pe default, ca să nu rupem link-urile vechi
    return <VortexPageClient locale={defaultLocale} />;
    // sau, dacă vrei strict: return notFound();
  }

  return <VortexPageClient locale={locale} />;
}
