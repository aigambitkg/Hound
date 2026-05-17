import { ArrowRight } from 'lucide-react';

/**
 * Sektion 2: Fuer Talente (Tieraerzte/Fachkraefte).
 * Text rechts, 3D-Maskottchen Jo + Glas links (Z = -30 in der Szene).
 */
export default function TalenteSection() {
  return (
    <section className="w-full h-screen flex items-center justify-end px-8 md:px-32 pointer-events-none">
      <div className="max-w-lg text-right pointer-events-auto">
        <h2 className="text-[#D4AF37] text-4xl md:text-6xl font-serif mb-6 drop-shadow-lg">
          Fuer Talente
        </h2>
        <p className="text-white/90 text-xl font-light leading-relaxed mb-8 drop-shadow-md">
          Jo hat die Witterung aufgenommen. Wir fuehren dich nicht einfach zu
          einem Job, sondern zu deiner Berufung. Diskret, zielsicher und loyal
          an deiner Seite.
        </p>
        <button
          type="button"
          className="flex items-center justify-end gap-2 text-white border border-white/30 px-6 py-3 rounded-full hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 ml-auto bg-black/10 backdrop-blur-sm"
        >
          Karrierepfad ansehen <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
