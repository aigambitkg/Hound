import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import HoundScene from './components/HoundScene';
import ContactView from './components/ContactView';
import Navigation from './components/Navigation';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import LegalModal, { type LegalDocType } from './components/LegalModal';
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
 * - Navigation: fixe Top-Leiste mit Hash-Routing zu den Sektionen.
 * - Das Scroll-Overlay (z-10) enthaelt alle Text-Sektionen und treibt den
 *   "Flug" durch die 3D-Szene via scrollContainerRef.
 * - WhatsApp-Floating-Button: immer sichtbar unten rechts.
 * - ContactView & LegalModal: fullscreen Overlays (z-50) ueber AnimatePresence.
 *
 * Sektion-Reihenfolge:
 *   1. Hero            - Marke + zwei CTAs
 *   2. ValueProposition - Warum HOUND? + Branchen-Grid
 *   3. Mandanten       - B2B: Tierkliniken & Praxen
 *   4. Talente         - B2C: Tieraerzte & TFA
 *   5. Process         - 3 Schritte zum Perfect Match
 *   6. CTA             - Finaler Kontakt-Trigger
 *   + Footer mit Impressum/Datenschutz
 */
export default function App() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showContact, setShowContact] = useState(false);
  const [legalDoc, setLegalDoc] = useState<LegalDocType | null>(null);

  const openContact = () => setShowContact(true);
  const openLegal = (type: LegalDocType) => setLegalDoc(type);

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#2B0A16] relative font-sans">
      {/* 3D Canvas im Hintergrund */}
      <HoundScene scrollContainerRef={scrollRef} />

      {/* Fixe Top-Navigation (Hash-Routing, Smooth-Scroll, Active-State) */}
      <Navigation scrollContainerRef={scrollRef} />

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
        <Footer onOpenLegal={openLegal} />
      </main>

      {/* Floating WhatsApp-Kontakt (immer sichtbar) */}
      <WhatsAppButton />

      {/* Morphing Kontakt-Overlay */}
      <AnimatePresence>
        {showContact && <ContactView onClose={() => setShowContact(false)} />}
      </AnimatePresence>

      {/* Impressum / Datenschutz Modal */}
      <AnimatePresence>
        {legalDoc && (
          <LegalModal type={legalDoc} onClose={() => setLegalDoc(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
