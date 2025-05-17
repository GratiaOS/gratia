import GratiaLogo from '@/components/GratiaLogo';

export default function ContributePage() {
  return (
    <div className="px-6 py-24">
      <section className="mx-auto max-w-3xl text-center">
        <GratiaLogo className="animate-pulse-slow mx-auto mb-6 h-auto w-28 text-[#11392A]" />
        <h1 className="relative z-10 mb-6 text-4xl font-semibold tracking-wide text-[#11392A] uppercase">
          Contribute to Gratia
          <span className="mx-auto mt-4 block h-0.5 w-24 rounded-full bg-[#11392A]"></span>
        </h1>

        <p className="mb-8 text-lg">
          We believe that when people share from the heart, it changes the system.
        </p>
        <p className="mb-12 text-lg">
          You don’t have to be a “professional.” You don’t need a portfolio. You just need to care
          about something enough to offer it.
        </p>

        <div className="mx-auto mb-12 max-w-xl space-y-6 text-left">
          <p className="font-semibold text-[#11392A]">Things we welcome:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Design (quiet, thoughtful, grounded)</li>
            <li>Frontend dev (React, Next, Tailwind — you know the vibe)</li>
            <li>Writing, editing, soft technology</li>
            <li>Audio, sound design, soft music</li>
            <li>Field sensing / space holding</li>
            <li>Organizing, admin, soul-aligned logistics</li>
          </ul>
        </div>

        <a
          href="mailto:razvan.tirboaca@gmail.com"
          className="rounded-full border-2 border-[#11392A] bg-[#11392A] px-6 py-3 text-[#fdfaf3] transition hover:bg-[#0f2e22]"
        >
          Offer Your Gifts
        </a>

        <p className="mt-20 text-[#555] italic">
          Offer only what you love. The field doesn't need more hustle — it needs wholeness.
        </p>
      </section>
    </div>
  );
}
