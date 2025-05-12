export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdfaf3] text-[#2d2d2d] font-sans">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-5xl font-semibold mb-6 tracking-tight">gratia.</h1>
        <p className="text-xl max-w-2xl leading-relaxed">A sacred pulse of reciprocity. Rooted in presence. Moving through grace.</p>
        <div className="mt-6 flex gap-4">
          <button className="px-5 py-2 bg-black text-white rounded-full text-sm">Read Manifesto</button>
          <button className="px-5 py-2 border border-black rounded-full text-sm">Español</button>
        </div>
      </section>

      {/* Manifesto Preview */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto text-lg leading-relaxed space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Manifesto</h2>
          <p>We believe in a world where generosity creates the new economy. Not through obligation, but resonance. Not by control, but coherence.</p>
          <p>
            Every offering, every seed, every act of care is a pulse in the field. Gratia is the record and reflection of those pulses. It is currency
            without pressure, acknowledgment without hierarchy.
          </p>
          <p>Let us remember that value is not minted by scarcity, but activated by presence. You are already enough.</p>
          <p className="italic">– The Field Remembers</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-10">© {new Date().getFullYear()} gratia.space — A shared pulse.</footer>
    </main>
  );
}
