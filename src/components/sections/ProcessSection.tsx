/**
 * Prozess-Sektion: 3 Schritte zum Perfect Match.
 *
 * Reduziert die Hemmschwelle, indem der Ablauf transparent gemacht wird.
 * Erscheint zwischen Bewerber-Sektion und finalem CTA.
 */
export default function ProcessSection() {
  const steps = [
    {
      title: 'Faehrte aufnehmen',
      subtitle: 'Erstgespraech',
      description:
        'Kurzes Telefonat: Erwartungen, Qualifikationen, Ziele klaeren.',
    },
    {
      title: 'Gezielte Suche',
      subtitle: 'Matching',
      description:
        'Wir aktivieren unser Netzwerk und matchen die passenden Profile.',
    },
    {
      title: 'Kennenlernen',
      subtitle: 'Perfect Match',
      description:
        'Wir bringen beide Seiten zusammen — erst wenn alles passt, ist unsere Arbeit getan.',
    },
  ];

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center px-8 pointer-events-none">
      <div className="pointer-events-auto max-w-5xl w-full text-center">
        <div className="inline-block frosted-panel-soft px-8 py-6 mb-12">
          <p className="text-[#D4AF37] tracking-[0.3em] uppercase text-xs mb-3 font-semibold">
            So funktioniert&apos;s
          </p>
          <h2 className="text-white text-4xl md:text-5xl font-serif leading-tight">
            In 3 Schritten zum{' '}
            <span className="italic text-[#D4AF37]">Perfect Match</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className="frosted-panel p-7 text-left hover:border-[#D4AF37]/60 transition-colors"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37] text-[#2B0A16] font-serif text-xl font-bold mb-5">
                {idx + 1}
              </div>
              <p className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-2">
                {step.subtitle}
              </p>
              <h3 className="text-white text-xl md:text-2xl font-serif mb-3 leading-tight">
                {step.title}
              </h3>
              <p className="text-white/80 text-sm md:text-base font-light leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
