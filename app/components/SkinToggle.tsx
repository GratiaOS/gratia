'use client';

import { useSkinField, type KernelSkinId } from '@/skin/SkinFieldProvider';

const SKINS: { id: KernelSkinId; label: string }[] = [
  { id: 'SUN', label: '☀️ Sun' },
  { id: 'MOON', label: '🌙 Moon' },
  { id: 'GARDEN', label: '🌿 Garden' },
  { id: 'STELLAR', label: '🟣 Stellar' },
];

export function SkinToggle() {
  const { skinId, setSkinId } = useSkinField();

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-(--skin-card) px-2 py-1 text-xs shadow-sm">
      {SKINS.map((skin) => {
        const active = skinId === skin.id;
        return (
          <button
            key={skin.id}
            type="button"
            onClick={() => setSkinId(skin.id)}
            className="flex items-center gap-1 rounded-full px-3 py-1 transition"
            style={{
              background: active ? 'color-mix(in oklab, var(--skin-accent) 20%, transparent)' : 'transparent',
              color: active ? 'var(--color-text)' : 'var(--color-muted)',
              border: active ? '1px solid color-mix(in oklab, var(--skin-accent) 40%, transparent)' : '1px solid transparent',
            }}
          >
            <span aria-hidden>{skin.label.split(' ')[0]}</span>
            <span className="hidden sm:inline">{skin.label.replace(/^[^ ]+ /, '')}</span>
          </button>
        );
      })}
    </div>
  );
}

export default SkinToggle;
