import { ArrowRight } from 'lucide-react';

/**
 * Sektion 1: Fuer Mandanten (Kliniken/Praxen).
 * Text links, 3D-Glaspaneele rechts (Z = -15 in der Szene).
 */
export default function MandantenSection() {
  return (
    <section className="w-full h-screen flex items-center justify-start px-8 md:px-32 pointer-events-none">
      <div className="max-w-lg pointer-events-auto">
        <h2 className="text-[#D4AF37] text-4xl md:text-6xl font-serif mb-6 drop-shadow-lg">
          Fuer Mandanten
        </h2>
        <p className="text-white/90 text-xl font-light leading-relaxed mb-8 drop-shadow-md">
          Wir finden, was verborgen ist. Mit dem feinen Spuersinn eines Hounds
          durchkaemmen wir den Markt nach aussergewoehnlichen Tieraerzten, die
          perfekt in Ihre Klinik passen.
        </p>
        <button
          type="button"
          className="flex items-center gap-2 text-white border border-white/30 px-6 py-3 rounded-full hover:bg-white hover:text-[#2B0A16] transition-all duration-300 bg-black/10 backdrop-blur-sm"
        >
          Expertise entdecken <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
