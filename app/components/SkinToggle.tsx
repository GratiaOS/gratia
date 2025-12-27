'use client';

import { useSkinField, type KernelSkinId } from '@/skin/SkinFieldProvider';
import { useTranslation } from '../../i18n/I18nProvider';

const SKINS: {
  id: KernelSkinId;
  emoji: string;
  labelKey: 'skins.sun' | 'skins.moon' | 'skins.garden' | 'skins.stellar';
}[] = [
  { id: 'SUN', emoji: '☀️', labelKey: 'skins.sun' },
  { id: 'MOON', emoji: '🌙', labelKey: 'skins.moon' },
  { id: 'GARDEN', emoji: '🌿', labelKey: 'skins.garden' },
  { id: 'STELLAR', emoji: '🟣', labelKey: 'skins.stellar' },
];

export function SkinToggle() {
  const { skinId, setSkinId } = useSkinField();
  const { t } = useTranslation('common');

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-(--color-border) bg-(--color-elev) px-2 py-1 text-xs shadow-sm">
      {SKINS.map((skin) => {
        const active = skinId === skin.id;
        const label = t(skin.labelKey);
        return (
          <button
            key={skin.id}
            type="button"
            onClick={() => setSkinId(skin.id)}
            className="flex items-center gap-1 rounded-full px-3 py-1 transition"
            style={{
              background: active
                ? 'color-mix(in oklab, var(--color-accent) 20%, transparent)'
                : 'transparent',
              color: active ? 'var(--color-text)' : 'var(--color-muted)',
              border: active
                ? '1px solid color-mix(in oklab, var(--color-accent) 40%, transparent)'
                : '1px solid transparent',
            }}
          >
            <span aria-hidden>{skin.emoji}</span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default SkinToggle;
