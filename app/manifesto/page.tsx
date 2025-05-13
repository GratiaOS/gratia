import GratiaLogo from '@/components/GratiaLogo';

export default function ManifestoPage() {
  return (
    <div>
      <section className="text-center bg-[#F6F3EB] py-20 px-6" data-layer="surface">
        <GratiaLogo className="w-28 h-auto mx-auto mb-6 animate-pulse-slow text-[#11392A]" />
        <h1 className="text-4xl font-semibold tracking-wide uppercase relative z-10 text-[#11392A]">
          The First Gratia Note
          <span className="block w-24 h-0.5 bg-[#11392A] mt-4 mx-auto rounded-full"></span>
        </h1>
      </section>
      <section className="px-6 py-16 bg-[#F1EEE8]" data-layer="midstream">
        <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed">
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
          <p className="italic text-[#555]">
            This is Gratia.
            <br /> You belong here.
          </p>
        </div>
      </section>
      <section className="text-center space-y-6 py-20 px-6 bg-[#DCD4C5]" data-layer="core-current">
        <h2 className="text-3xl font-semibold tracking-wide uppercase">Ready to walk with us?</h2>
        <p className="text-lg max-w-xl mx-auto text-[#444]">
          Whether you’re here to offer your hands, your voice, or just your heart — Gratia is a space to co-create what was once only imagined.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <a href="/join" className="px-6 py-3 border-2 border-[#11392A] bg-[#11392A] text-white rounded-full hover:bg-[#0f2e22] transition">
            Join the Circle
          </a>
          <a href="/contribute" className="px-6 py-3 border-2 border-[#11392A] text-[#11392A] rounded-full hover:bg-[#f5f5f5] transition">
            Contribute Skills
          </a>
          <a href="/learn" className="px-6 py-3 underline text-[#2d2d2d] hover:text-[#11392A] transition">
            Learn More
          </a>
        </div>
        <p className="text-center italic text-[#555] mt-10">
          Thank you for reading. May your path be held, your voice remembered, and your light reflected. You belong here.
        </p>
      </section>
    </div>
  );
}
