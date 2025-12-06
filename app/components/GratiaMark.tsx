import Image from 'next/image';

type GratiaMarkProps = {
  variant?: 'color' | 'outline';
  size?: number;
  className?: string;
};

/**
 * Lightweight Mark component so we reuse the same flower everywhere (header, Codex, Vortex, Vienna).
 */
export function GratiaMark({ variant = 'color', size = 32, className }: GratiaMarkProps) {
  const src = variant === 'outline' ? '/mark/gratia-mark-outline.svg' : '/mark/gratia-mark.svg';

  return (
    <span className={className}>
      <Image src={src} alt="Gratia mark" width={size} height={size} priority={false} />
    </span>
  );
}

export default GratiaMark;
