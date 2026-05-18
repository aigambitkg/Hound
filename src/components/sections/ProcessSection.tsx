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
      subtitle: 'Das Erstgespraech',
      description:
        'Ob Klinik oder Bewerber: In einem kurzen Telefonat stecken wir die Erwartungen, Qualifikationen und Ziele ab.',
    },
    {
      title: 'Die gezielte Suche',
      subtitle: 'Matching',
      description:
        'Wir aktivieren unser Netzwerk und nutzen moderne digitale Recruiting-Kanaele, um die passenden Gegenstuecke zu matchen.',
    },
    {
      title: 'Das Kennenlernen',
      subtitle: 'Perfect Match',
      description:
        'Wir bringen beide Seiten an einen Tisch. Erst wenn Sie absolut ueberzeugt sind, ist unsere Arbeit getan.',
    },
  ];

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center px-8 pointer-events-none">
      <div className="pointer-events-auto max-w-5xl w-full text-center">
        <p className="text-[#D4AF37] tracking-[0.3em] uppercase text-xs mb-4 font-semibold drop-shadow-md">
          So funktioniert&apos;s
        </p>
        <h2 className="text-white text-4xl md:text-5xl font-serif leading-tight drop-shadow-lg mb-16">
          In 3 Schritten zum{' '}
          <span className="italic text-[#D4AF37]">Perfect Match</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className="relative bg-black/20 backdrop-blur-sm border border-[#D4AF37]/20 rounded-2xl p-7 text-left hover:border-[#D4AF37]/60 transition-colors"
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
