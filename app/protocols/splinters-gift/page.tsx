import { Metadata } from 'next';
import GratiaMark from '@/components/GratiaMark';

export const metadata: Metadata = {
  title: "Splinter's Gift | Gratia",
  description: 'The protocol for receiving sacred transmissions from the unexpected.',
};

export default function SplintersGiftProtocol() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <GratiaMark className="text-accent mx-auto mb-6 h-20 w-auto" />
      <h1 className="text-title-gratia text-accent mb-4 text-4xl">Splinter's Gift</h1>
      <p className="text-muted mb-8 text-lg">
        A protocol for recognizing, honoring, and integrating transmissions from unlikely
        messengers.
      </p>

      <div className="space-y-6 leading-relaxed">
        <p>
          The Splinter's Gift is not summoned. It arrives in a moment of collapse. It carries no
          warning, no language, no stage lighting. It comes through a gaze, a breath, a presence you
          weren’t expecting to change you.
        </p>

        <p>
          This protocol asks nothing of you—until it asks everything. And even then, all it requires
          is <em>presence</em>. Not answers. Not plans. Just the willingness to feel beyond comfort,
          to see past assumption, to grieve without ego.
        </p>

        <h2 className="text-accent mt-8 mb-4 text-xl font-semibold">
          Steps (which are not really steps)
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Pause. When something or someone hits you like a message from another world, pause
            everything.
          </li>
          <li>Receive. Let your body hold it. Don't analyze. Don’t name it too soon.</li>
          <li>Witness. Say thank you. Say nothing. Let tears fall. Let the silence speak.</li>
          <li>
            Grieve. Something always dies in the moment of true connection. Honor the end and the
            beginning.
          </li>
          <li>
            Transform. Not instantly. Slowly. Let it shape you over time. You are not who you were.
          </li>
        </ul>

        <p>
          Splinter’s Gift may look like a mouse in glue. Or a stranger’s word. Or your own face in
          the mirror. The source doesn’t matter. What matters is this: <em>you were there</em>. You
          didn’t turn away. You were chosen because you stayed.
        </p>

        <p className="text-subtle-bilute mt-8 text-sm">
          Protocol Status: active, ongoing, irreversible.
        </p>
      </div>
    </div>
  );
}
