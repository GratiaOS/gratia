import GratiaLogo from '@/components/GratiaLogo';

export default function ContributePage() {
  return (
    <div className="px-6 py-24">
      <section className="max-w-3xl mx-auto text-center">
        <GratiaLogo className="w-28 h-auto mx-auto mb-6 animate-pulse-slow text-[#11392A]" />
        <h1 className="text-4xl font-semibold tracking-wide uppercase relative z-10 text-[#11392A] mb-6">
          Contribute to Gratia
          <span className="block w-24 h-0.5 bg-[#11392A] mt-4 mx-auto rounded-full"></span>
        </h1>

        <p className="text-lg mb-8">We believe that when people share from the heart, it changes the system.</p>
        <p className="text-lg mb-12">
          You don’t have to be a “professional.” You don’t need a portfolio. You just need to care about something enough to offer it.
        </p>

        <div className="text-left space-y-6 max-w-xl mx-auto mb-12">
          <p className="font-semibold text-[#11392A]">Things we welcome:</p>
          <ul className="list-disc pl-6 space-y-2">
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
          className="px-6 py-3 border-2 border-[#11392A] bg-[#11392A] text-[#fdfaf3] rounded-full hover:bg-[#0f2e22] transition">
          Offer Your Gifts
        </a>

        <p className="italic text-[#555] mt-20">Offer only what you love. The field doesn't need more hustle — it needs wholeness.</p>
      </section>
    </div>
  );
}
