import { ArrowRight, Stethoscope, Radar, Clock } from 'lucide-react';

interface MandantenSectionProps {
  onContactClick: () => void;
}

/**
 * Sektion fuer Arbeitgeber / Tierkliniken & Praxen (B2B).
 * Text links, 3D-Bilder rechts (Z = -15 in der Szene).
 */
export default function MandantenSection({ onContactClick }: MandantenSectionProps) {
  return (
    <section className="w-full h-screen flex items-center justify-start px-8 md:px-32 pointer-events-none">
      <div className="max-w-xl pointer-events-auto">
        <p className="text-[#D4AF37] tracking-[0.3em] uppercase text-xs mb-4 font-semibold drop-shadow-md">
          Fuer Tierkliniken &amp; Praxen
        </p>
        <h2 className="text-white text-3xl md:text-5xl font-serif mb-6 drop-shadow-lg leading-tight">
          Besetzen Sie Ihre offenen Stellen &ndash;{' '}
          <span className="italic text-[#D4AF37]">ohne Stress</span>.
        </h2>
        <p className="text-white/85 text-base md:text-lg font-light leading-relaxed mb-8 drop-shadow-md">
          Profitieren Sie von einer Personalberatung, die Ihre Sprache spricht
          und die Herausforderungen der modernen Tiermedizin versteht.
        </p>

        <ul className="space-y-5 mb-10">
          <li className="flex gap-4 text-white/90">
            <Stethoscope size={22} className="flex-shrink-0 mt-1 text-[#D4AF37]" />
            <span className="text-sm md:text-base leading-relaxed drop-shadow-md">
              <strong className="text-white">100% Veterinaer-Fokus:</strong> Wir
              kennen den Markt, die Approbationshuerden und die Ansprueche von
              Tieraerzten und Fachpersonal.
            </span>
          </li>
          <li className="flex gap-4 text-white/90">
            <Radar size={22} className="flex-shrink-0 mt-1 text-[#D4AF37]" />
            <span className="text-sm md:text-base leading-relaxed drop-shadow-md">
              <strong className="text-white">Aktive Ansprache (Active Sourcing):</strong>{' '}
              Wir erreichen auch die Kandidaten, die Wechselbereitschaft zeigen,
              aber nicht aktiv suchen.
            </span>
          </li>
          <li className="flex gap-4 text-white/90">
            <Clock size={22} className="flex-shrink-0 mt-1 text-[#D4AF37]" />
            <span className="text-sm md:text-base leading-relaxed drop-shadow-md">
              <strong className="text-white">Zeitersparnis:</strong> Wir
              uebernehmen das gesamte Pre-Screening. Sie lernen nur Kandidaten
              kennen, die fachlich und menschlich perfekt zu Ihnen passen.
            </span>
          </li>
        </ul>

        <button
          type="button"
          onClick={onContactClick}
          className="group flex items-center gap-2 text-white border border-white/30 px-6 py-3 rounded-full hover:bg-white hover:text-[#2B0A16] transition-all duration-300 bg-black/10 backdrop-blur-sm"
        >
          Personal anfragen
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </section>
  );
}
