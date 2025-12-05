import type { Metadata } from 'next';
import VortexScene from './VortexScene';
import './vortex.css';
import SceneLayout from '@/components/layouts/SceneLayout';

export const metadata: Metadata = {
  title: 'Vortex · Gratia',
  description: 'LightFrog Vortex — un portal ceremonios, cu puls blând și gif-ul din atelierul Gratia.',
};

export default function VortexPage() {
  return (
    <SceneLayout
      eyebrow="Ritual · Vortex"
      title="Aprinde lumina."
      subtitle="O pauză scurtă de respirație înainte de a intra în Codex :: Vienna."
      backHref="/"
      backLabel="Înapoi în Grădină"
    >
      <VortexScene />
    </SceneLayout>
  );
}
