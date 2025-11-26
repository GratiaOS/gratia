import type { ReactNode } from 'react';

type Kind = 'note' | 'info' | 'warn' | 'success';

export default function Callout({
  title,
  kind = 'note',
  children,
}: {
  title?: string;
  kind?: Kind;
  children: ReactNode;
}) {
  const tone: Record<Kind, string> = {
    note: 'border-slate-400/50 bg-slate-50/40 dark:border-slate-600/40 dark:bg-slate-900/20',
    info: 'border-cyan-400/50 bg-cyan-50/40 dark:border-cyan-600/40 dark:bg-cyan-900/20',
    warn: 'border-amber-400/50 bg-amber-50/40 dark:border-amber-600/40 dark:bg-amber-900/20',
    success:
      'border-emerald-400/50 bg-emerald-50/40 dark:border-emerald-600/40 dark:bg-emerald-900/20',
  };

  return (
    <div className={`my-6 rounded-md border px-4 py-3 ${tone[kind]}`}>
      {title ? <p className="mb-2 font-medium">{title}</p> : null}
      <div className="prose prose-gratia prose-sm max-w-none">{children}</div>
    </div>
  );
}
