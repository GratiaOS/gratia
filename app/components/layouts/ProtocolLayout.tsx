import { PropsWithChildren, ReactNode } from 'react';

export default function ProtocolLayout({
  children,
  hero,
  subtitle,
  aside,
}: PropsWithChildren<{ hero: string; subtitle?: string; aside?: ReactNode }>) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-title-gratia text-accent text-4xl">{hero}</h1>
        {subtitle && <p className="text-muted mt-2 text-lg">{subtitle}</p>}
      </header>

      <div className="grid gap-10 md:grid-cols-[1fr_280px]">
        <article className="prose prose-gratia max-w-none">{children}</article>
        <aside className="hidden md:block">{aside}</aside>
      </div>
    </main>
  );
}
