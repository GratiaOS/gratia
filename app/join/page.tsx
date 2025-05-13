import GratiaLogo from '@/components/GratiaLogo';

export default function JoinPage() {
  return (
    <div className="px-6 py-24">
      <section className="max-w-3xl mx-auto text-center">
        <GratiaLogo className="w-28 h-auto mx-auto mb-6 animate-pulse-slow text-[#11392A]" />
        <h1 className="text-4xl font-semibold tracking-wide uppercase relative z-10 text-[#11392A] mb-6">
          Join the Circle
          <span className="block w-24 h-0.5 bg-[#11392A] mt-4 mx-auto rounded-full"></span>
        </h1>
        <p className="text-lg mb-8">You don’t need credentials, followers, or a pitch. You only need presence.</p>
        <p className="text-lg mb-12">Whether you're called to hold space, offer skills, or simply walk with us quietly — your presence matters.</p>

        <div className="space-y-6">
          <a
            href="mailto:razvan.tirboaca@gmail.com"
            className="block w-full sm:w-auto mx-auto px-6 py-3 border-2 border-[#11392A] bg-[#11392A] text-[#fdfaf3] rounded-full hover:bg-[#0f2e22] transition">
            Email Us to Join
          </a>
          <a
            href="/contribute"
            className="block w-full sm:w-auto mx-auto px-6 py-3 border-2 border-[#11392A] text-[#11392A] rounded-full hover:bg-[#f5f5f5] transition">
            I Want to Offer Skills
          </a>
        </div>

        <p className="italic text-[#555] mt-20">No rush. No pressure. The field knows when it’s time.</p>
      </section>
    </div>
  );
}
