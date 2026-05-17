import { motion } from 'framer-motion';

/**
 * Hero-Sektion: erste sichtbare Sektion beim Aufruf.
 * Korrespondiert in der 3D-Szene mit dem Logo bei Z = -2.
 */
export default function HeroSection() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-end pb-24 px-8 text-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="pointer-events-auto"
      >
        <p className="text-[#D4AF37] tracking-[0.3em] uppercase text-sm mb-4 font-semibold drop-shadow-md">
          Aufspueren von tieraerztlichem Talent
        </p>
        <h1 className="text-white text-5xl md:text-7xl font-serif tracking-tight leading-tight drop-shadow-lg">
          Die lebendige <span className="italic text-[#D4AF37]">Faehrte</span>.
        </h1>
        <p className="text-white/80 mt-6 max-w-xl mx-auto text-lg font-light drop-shadow-md">
          Folgen Sie der goldenen Spur zu den besten Talenten und Praxen im
          Veterinaerwesen. Scrollen, um einzutauchen.
        </p>
      </motion.div>
    </section>
  );
}
