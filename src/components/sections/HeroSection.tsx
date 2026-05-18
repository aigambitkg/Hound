import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';

interface HeroSectionProps {
  onContactClick: () => void;
}

/**
 * Hero-Sektion: erste sichtbare Sektion beim Aufruf.
 * Korrespondiert in der 3D-Szene mit dem Logo bei Z = -2.
 *
 * Bietet zwei klar getrennte CTAs fuer die beiden Zielgruppen:
 * - "Personal finden" -> Arbeitgeber / Kliniken
 * - "Neue Stelle finden" -> Bewerber / Fachpersonal
 */
export default function HeroSection({ onContactClick }: HeroSectionProps) {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-end pb-24 px-8 text-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="pointer-events-auto max-w-4xl frosted-panel-soft p-8 md:p-12"
      >
        <p className="text-[#D4AF37] tracking-[0.3em] uppercase text-xs md:text-sm mb-6 font-semibold drop-shadow-md">
          HOUND &nbsp;|&nbsp; Next-Level Recruiting fuer den tiermedizinischen Bereich
        </p>
        <h1 className="text-white text-4xl md:text-6xl font-serif tracking-tight leading-[1.1] drop-shadow-lg">
          Schluss mit der erfolglosen Suche.
          <br />
          <span className="italic text-[#D4AF37]">Wir finden</span> das Fachpersonal,
          das Ihre Praxis braucht.
        </h1>
        <p className="text-white/85 mt-6 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed drop-shadow-md">
          Spezialisiertes Recruiting fuer den Veterinaerbereich.
          Datenbasiert. Diskret. Treffsicher.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={onContactClick}
            className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#D4AF37] text-[#2B0A16] font-medium text-base hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.25)]"
          >
            <Search size={18} />
            Personal finden
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
          <button
            type="button"
            onClick={onContactClick}
            className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-white/40 text-white font-medium text-base hover:bg-white hover:text-[#2B0A16] transition-colors backdrop-blur-sm bg-black/10"
          >
            Neue Stelle finden
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
