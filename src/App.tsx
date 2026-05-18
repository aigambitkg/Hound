import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import HoundScene from './components/HoundScene';
import ContactView from './components/ContactView';
import HeroSection from './components/sections/HeroSection';
import ValuePropositionSection from './components/sections/ValuePropositionSection';
import MandantenSection from './components/sections/MandantenSection';
import TalenteSection from './components/sections/TalenteSection';
import ProcessSection from './components/sections/ProcessSection';
import CTASection from './components/sections/CTASection';

/**
 * Wurzel-Komponente.
 *
 * Architektur:
 * - HoundScene rendert den 3D-Hintergrund (absolute, z-0).
 * - Das Scroll-Overlay (z-10) enthaelt alle Text-Sektionen und treibt den
 *   "Flug" durch die 3D-Szene via scrollContainerRef.
 * - ContactView ist ein fullscreen Morph-Overlay (z-50) ueber AnimatePresence.
 *
 * Sektion-Reihenfolge (1 Bildschirmhoehe pro Sektion):
 *   1. Hero            - Marke + zwei CTAs
 *   2. ValueProposition - Warum HOUND? (Faehrte-Metapher)
 *   3. Mandanten       - B2B: Tierkliniken & Praxen
 *   4. Talente         - B2C: Tieraerzte & TFA
 *   5. Process         - 3 Schritte zum Perfect Match
 *   6. CTA             - Finaler Kontakt-Trigger
 */
export default function App() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showContact, setShowContact] = useState(false);
  const openContact = () => setShowContact(true);

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#2B0A16] relative font-sans">
      {/* 3D Canvas im Hintergrund */}
      <HoundScene scrollContainerRef={scrollRef} />

      {/* Scrollbares HTML-Overlay */}
      <main
        ref={scrollRef}
        className="absolute inset-0 z-10 overflow-y-auto no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        <HeroSection onContactClick={openContact} />
        <ValuePropositionSection />
        <MandantenSection onContactClick={openContact} />
        <TalenteSection onContactClick={openContact} />
        <ProcessSection />
        <CTASection onContactClick={openContact} />
      </main>

      {/* Morphing Kontakt-Overlay */}
      <AnimatePresence>
        {showContact && <ContactView onClose={() => setShowContact(false)} />}
      </AnimatePresence>
    </div>
  );
}
