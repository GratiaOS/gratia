import GratiaLogo from '@/components/GratiaLogo';

export default function ManifestoPage() {
  return (
    <div>
      <section className="bg-[#F6F3EB] px-6 py-20 text-center" data-layer="surface">
        <GratiaLogo className="animate-pulse-slow mx-auto mb-6 h-auto w-28 text-[#11392A]" />
        <h1 className="relative z-10 text-4xl font-semibold tracking-wide text-[#11392A] uppercase">
          The First Gratia Note
          <span className="mx-auto mt-4 block h-0.5 w-24 rounded-full bg-[#11392A]"></span>
        </h1>
      </section>
      <section className="bg-[#F1EEE8] px-6 py-16" data-layer="midstream">
        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed">
          <p>
            This is not a manifesto. This is a note.
            <br />
            A note that was heard, and sung back.
            <br />
            A note that speaks without speaking.
            <br />
            That moves where language fails. That hums in the quiet places.
            <br />
            Let it be heard by the internal voice.
            <br />
            Let it be sung in dreams.
          </p>
          <p>
            This space exists because we remember. <br />
            We remember what it feels like to be seen. To be held. To belong.
            <br />
            We remember a world where care came first — not profit, not speed.
          </p>
          <p>
            Gratia is not a product.
            <br />
            It’s not a platform, a brand, or a pipeline.
            <br />
            It is a <em>field</em>. A living one.
            <br />
            Made for rest. For truth. For connection that doesn’t demand a transaction.
          </p>
          <p>
            We honor those who create life.
            <br />
            Who raise the next ones.
            <br />
            Who carry both pain and joy in their arms — and still offer them open.
          </p>
          <p>
            We honor the children.
            <br />
            We honor the tired.
            <br />
            We honor the ones the system forgot.
          </p>
          <p>
            Here, you do not need to prove anything.
            <br />
            You don’t need to be shiny or smart.
            <br />
            You only need to be real.
          </p>
          <p>
            Everything we build, we build slowly.
            <br />
            With love. With honesty. With each other.
            <br />
            We don’t scale.
            <br />
            We <strong>grow</strong>.<br /> We don’t extract.
            <br /> We <strong>nourish.</strong>
          </p>
          <p>
            If you’ve ever felt too soft for this world — or too broken, or too awake —<br />
            this is your place. You are not a mistake. You are the signal.
          </p>
          <p>
            The path is simple. Not easy, but clear:
            <br />
            Show up.
            <br />
            Listen.
            <br />
            Remember.
          </p>
          <p className="text-[#555] italic">
            This is Gratia.
            <br /> You belong here.
          </p>
        </div>
      </section>
      <section className="space-y-6 bg-[#DCD4C5] px-6 py-20 text-center" data-layer="core-current">
        <h2 className="text-3xl font-semibold tracking-wide uppercase">Ready to walk with us?</h2>
        <p className="mx-auto max-w-xl text-lg text-[#444]">
          Whether you’re here to offer your hands, your voice, or just your heart — Gratia is a
          space to co-create what was once only imagined.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="/join"
            className="rounded-full border-2 border-[#11392A] bg-[#11392A] px-6 py-3 text-white transition hover:bg-[#0f2e22]"
          >
            Join the Circle
          </a>
          <a
            href="/contribute"
            className="rounded-full border-2 border-[#11392A] px-6 py-3 text-[#11392A] transition hover:bg-[#f5f5f5]"
          >
            Contribute Skills
          </a>
          <a
            href="/learn"
            className="px-6 py-3 text-[#2d2d2d] underline transition hover:text-[#11392A]"
          >
            Learn More
          </a>
        </div>
        <p className="mt-10 text-center text-[#555] italic">
          Thank you for reading. May your path be held, your voice remembered, and your light
          reflected. You belong here.
        </p>
      </section>
    </div>
  );
}
