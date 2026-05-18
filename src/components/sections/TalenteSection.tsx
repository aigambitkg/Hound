import { ArrowRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';

interface TalenteSectionProps {
  onContactClick: () => void;
}

/**
 * Sektion fuer Bewerber / Tieraerzte & TFA (B2C).
 * Text rechts, 3D-Bilder links (Z = -30 in der Szene).
 */
export default function TalenteSection({ onContactClick }: TalenteSectionProps) {
  return (
    <section className="w-full h-screen flex items-center justify-end px-8 md:px-32 pointer-events-none">
      <div className="max-w-xl text-right pointer-events-auto frosted-panel p-7 md:p-9">
        <p className="text-[#D4AF37] tracking-[0.3em] uppercase text-xs mb-4 font-semibold drop-shadow-md">
          Fuer Tieraerzte &amp; TFA
        </p>
        <h2 className="text-white text-3xl md:text-5xl font-serif mb-6 drop-shadow-lg leading-tight">
          Deine Karriere.{' '}
          <span className="italic text-[#D4AF37]">Deine Bedingungen.</span>
        </h2>
        <p className="text-white/85 text-base md:text-lg font-light leading-relaxed mb-8 drop-shadow-md">
          Du liebst deinen Beruf, suchst aber nach besseren Arbeitszeiten,
          modernerer Ausstattung oder einem besseren Gehalt? Wir finden die
          Praxis, die wirklich zu deinem Leben passt.
        </p>

        <ul className="space-y-5 mb-10">
          <li className="flex gap-4 text-white/90 text-left">
            <ShieldCheck size={22} className="flex-shrink-0 mt-1 text-[#D4AF37]" />
            <span className="text-sm md:text-base leading-relaxed drop-shadow-md">
              <strong className="text-white">100% Kostenlos &amp; Anonym:</strong>{' '}
              Deine Suche bleibt absolut diskret. Dein aktueller Arbeitgeber
              erfaehrt von nichts.
            </span>
          </li>
          <li className="flex gap-4 text-white/90 text-left">
            <Sparkles size={22} className="flex-shrink-0 mt-1 text-[#D4AF37]" />
            <span className="text-sm md:text-base leading-relaxed drop-shadow-md">
              <strong className="text-white">Top-Arbeitgeber im Portfolio:</strong>{' '}
              Wir vermitteln dich nur an Praxen und Kliniken, die moderne
              Arbeitsbedingungen und echte Wertschaetzung bieten.
            </span>
          </li>
          <li className="flex gap-4 text-white/90 text-left">
            <Zap size={22} className="flex-shrink-0 mt-1 text-[#D4AF37]" />
            <span className="text-sm md:text-base leading-relaxed drop-shadow-md">
              <strong className="text-white">Kein Bewerbungsmarathon:</strong>{' '}
              Wir pitchen dich direkt bei den Entscheidern. Ein Lebenslauf
              reicht &ndash; den Rest machen wir.
            </span>
          </li>
        </ul>

        <button
          type="button"
          onClick={onContactClick}
          className="group flex items-center justify-end gap-2 text-white border border-white/30 px-6 py-3 rounded-full hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#2B0A16] transition-all duration-300 ml-auto bg-black/10 backdrop-blur-sm"
        >
          Karrierepfad ansehen
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </section>
  );
}
