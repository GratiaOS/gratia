import GratiaLogo from '@/components/GratiaLogo';

export default function JoinPage() {
  return (
    <div className="px-6 py-24">
      <section className="mx-auto max-w-3xl text-center">
        <GratiaLogo className="animate-pulse-slow mx-auto mb-6 h-auto w-28 text-[#11392A]" />
        <h1 className="relative z-10 mb-6 text-4xl font-semibold tracking-wide text-[#11392A] uppercase">
          Join the Circle
          <span className="mx-auto mt-4 block h-0.5 w-24 rounded-full bg-[#11392A]"></span>
        </h1>
        <p className="mb-8 text-lg">
          You don’t need credentials, followers, or a pitch. You only need presence.
        </p>
        <p className="mb-12 text-lg">
          Whether you're called to hold space, offer skills, or simply walk with us quietly — your
          presence matters.
        </p>

        <div className="space-y-6">
          <a
            href="mailto:razvan.tirboaca@gmail.com"
            className="mx-auto block w-full rounded-full border-2 border-[#11392A] bg-[#11392A] px-6 py-3 text-[#fdfaf3] transition hover:bg-[#0f2e22] sm:w-auto"
          >
            Email Us to Join
          </a>
          <a
            href="/contribute"
            className="mx-auto block w-full rounded-full border-2 border-[#11392A] px-6 py-3 text-[#11392A] transition hover:bg-[#f5f5f5] sm:w-auto"
          >
            I Want to Offer Skills
          </a>
        </div>

        <p className="mt-20 text-[#555] italic">
          No rush. No pressure. The field knows when it’s time.
        </p>
      </section>
    </div>
  );
}
