"use client";

import type { KernelState } from './_types';

const stateColor: Record<KernelState, string> = {
  CALM: 'text-emerald-300',
  OPEN: 'text-sky-300',
  VORTEX: 'text-fuchsia-300',
  RITUAL: 'text-amber-300',
  FLOW: 'text-teal-300',
  INTEGRATION: 'text-lime-300',
};

type WhisperStateProps = {
  state: KernelState;
};

export function WhisperState({ state }: WhisperStateProps) {
  const color = stateColor[state] ?? 'text-slate-200';

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 ${color}`}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      <span className="text-[11px] uppercase tracking-[0.2em]">{state}</span>
    </div>
  );
}
