/**
 * Value Proposition - Warum HOUND?
 *
 * Greift die Faehrte-Metapher auf und uebersetzt sie in modernen
 * Geschaeftsnutzen. Zwischen Hero und der ersten Zielgruppen-Sektion.
 */
export default function ValuePropositionSection() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center px-8 text-center pointer-events-none">
      <div className="pointer-events-auto max-w-3xl frosted-panel p-8 md:p-12">
        <p className="text-[#D4AF37] tracking-[0.3em] uppercase text-xs mb-4 font-semibold drop-shadow-md">
          Warum HOUND?
        </p>
        <h2 className="text-white text-4xl md:text-5xl font-serif leading-tight drop-shadow-lg">
          Wir nehmen die <span className="italic text-[#D4AF37]">Faehrte</span> auf,
          wo klassische Stellenanzeigen versagen.
        </h2>
        <p className="text-white/85 mt-8 text-base md:text-lg font-light leading-relaxed drop-shadow-md">
          Der Arbeitsmarkt in der Veterinaermedizin hat sich veraendert. Gute
          Tieraerzte (m/w/d) und TFAs suchen nicht mehr in Zeitungen oder auf
          Jobportalen &ndash; sie wollen gefunden werden. Wie ein feinsinniger
          &bdquo;Hound&ldquo; spueren wir die besten Talente im Markt aktiv auf.
          Wir schalten keine passiven Anzeigen, sondern betreiben proaktives
          Headhunting und modernes Social Recruiting. Fuer Ihren nachhaltigen
          Praxiserfolg.
        </p>
      </div>
    </section>
  );
}
