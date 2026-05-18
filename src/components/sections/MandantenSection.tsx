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
    <section
      id="arbeitgeber"
      className="w-full h-screen flex items-center justify-start px-8 md:px-32 pointer-events-none"
    >
      <div className="max-w-xl pointer-events-auto frosted-panel p-7 md:p-9">
        <p className="text-[#D4AF37] tracking-[0.3em] uppercase text-xs mb-4 font-semibold drop-shadow-md">
          Fuer Tierkliniken &amp; Praxen
        </p>
        <h2 className="text-white text-3xl md:text-5xl font-serif mb-6 drop-shadow-lg leading-tight">
          Besetzen Sie Ihre offenen Stellen &ndash;{' '}
          <span className="italic text-[#D4AF37]">ohne Stress</span>.
        </h2>
        <p className="text-white/85 text-base md:text-lg font-light leading-relaxed mb-7 drop-shadow-md">
          Personalberatung, die Ihre Sprache spricht.
        </p>

        <ul className="space-y-4 mb-8">
          <li className="flex gap-4 text-white/90">
            <Stethoscope size={20} className="flex-shrink-0 mt-1 text-[#D4AF37]" />
            <span className="text-sm md:text-base leading-snug">
              <strong className="text-white">100% Veterinaer-Fokus.</strong> Wir
              kennen Markt, Approbation und Anspruch.
            </span>
          </li>
          <li className="flex gap-4 text-white/90">
            <Radar size={20} className="flex-shrink-0 mt-1 text-[#D4AF37]" />
            <span className="text-sm md:text-base leading-snug">
              <strong className="text-white">Active Sourcing.</strong> Wir
              erreichen auch passive Kandidaten.
            </span>
          </li>
          <li className="flex gap-4 text-white/90">
            <Clock size={20} className="flex-shrink-0 mt-1 text-[#D4AF37]" />
            <span className="text-sm md:text-base leading-snug">
              <strong className="text-white">Zeitersparnis.</strong> Wir
              uebernehmen das komplette Pre-Screening.
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
