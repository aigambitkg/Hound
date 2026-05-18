import { PawPrint } from 'lucide-react';

interface CTASectionProps {
  onContactClick: () => void;
}

/**
 * Sektion 3: Call-to-Action am Ende des Scrolls.
 * Triggert das Oeffnen der Kontaktansicht (Z = -45 in der Szene).
 */
export default function CTASection({ onContactClick }: CTASectionProps) {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-end pb-32 px-8 text-center pointer-events-none">
      <div className="pointer-events-auto mt-auto frosted-panel-soft px-10 py-10">
        <h2 className="text-white text-5xl md:text-7xl font-serif mb-8">
          Faehrte aufgenommen?
        </h2>
        <button
          type="button"
          onClick={onContactClick}
          className="group relative px-10 py-5 bg-[#D4AF37] text-[#2B0A16] rounded-full text-xl font-medium overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(212,175,55,0.3)]"
        >
          <span className="relative z-10 flex items-center gap-3">
            <PawPrint size={24} /> Jetzt Kontakt aufnehmen
          </span>
          <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out z-0" />
        </button>
      </div>
    </section>
  );
}
