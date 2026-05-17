import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, X, ArrowRight } from 'lucide-react';
import { COLORS } from '../constants/theme';
import { ASSETS, assetUrl } from '../utils/assets';

interface ContactViewProps {
  onClose: () => void;
}

/**
 * Fullscreen-Kontaktansicht mit Morphing-Transition (Circle-Reveal).
 * Wird ueber AnimatePresence in App.tsx ein- und ausgeblendet.
 */
export default function ContactView({ onClose }: ContactViewProps) {
  return (
    <motion.div
      initial={{ clipPath: 'circle(0% at 50% 100%)' }}
      animate={{ clipPath: 'circle(150% at 50% 100%)' }}
      exit={{ clipPath: 'circle(0% at 50% 100%)' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 flex"
      style={{ backgroundColor: COLORS.cream }}
    >
      <div className="w-full max-w-7xl mx-auto p-8 md:p-16 flex flex-col md:flex-row gap-16 relative overflow-y-auto">
        {/* Close-Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Kontaktansicht schliessen"
          className="absolute top-8 right-8 p-4 bg-[#2B0A16]/5 rounded-full hover:bg-[#2B0A16]/10 transition-colors z-10"
        >
          <X size={32} color={COLORS.wineRed} />
        </button>

        {/* Linke Seite: Infos */}
        <div className="flex-1 flex flex-col justify-center">
          <img
            src={assetUrl(ASSETS.logoTransparent)}
            alt="Hound Logo"
            className="w-48 mb-12"
            style={{ filter: 'invert(1) brightness(0.2) sepia(1) hue-rotate(-50deg) saturate(3)' }}
          />
          <h2
            className="text-5xl md:text-7xl font-serif mb-6"
            style={{ color: COLORS.wineRed }}
          >
            Lass uns die Spur aufnehmen.
          </h2>
          <p className="text-xl mb-12 font-light" style={{ color: COLORS.darkText }}>
            Egal ob Sie Top-Tieraerzte fuer Ihre Praxis suchen oder als Talent den
            naechsten Schritt gehen wollen &ndash; wir sind bereit.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-lg">
              <Mail color={COLORS.gold} />
              <a
                href="mailto:faehrte@hound-personal.de"
                className="hover:underline"
                style={{ color: COLORS.darkText }}
              >
                faehrte@hound-personal.de
              </a>
            </div>
            <div className="flex items-center gap-4 text-lg">
              <Phone color={COLORS.gold} />
              <a
                href="tel:+491234567890"
                className="hover:underline"
                style={{ color: COLORS.darkText }}
              >
                +49 (0) 123 456 789
              </a>
            </div>
            <div className="flex items-center gap-4 text-lg">
              <MapPin color={COLORS.gold} />
              <span style={{ color: COLORS.darkText }}>
                Veterinaer-Campus 1, 10115 Berlin
              </span>
            </div>
          </div>
        </div>

        {/* Rechte Seite: Formular */}
        <div className="flex-1 flex flex-col justify-center">
          <form className="space-y-8 bg-white p-10 md:p-14 rounded-[2rem] shadow-2xl shadow-[#2B0A16]/5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.darkText }}>
                Ich bin...
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="flex-1 py-3 border border-gray-200 rounded-xl hover:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] bg-gray-50 transition-all text-gray-600"
                >
                  Mandant
                </button>
                <button
                  type="button"
                  className="flex-1 py-3 border border-gray-200 rounded-xl hover:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] bg-gray-50 transition-all text-gray-600"
                >
                  Talent
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-medium mb-2"
                style={{ color: COLORS.darkText }}
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                placeholder="Dr. Max Mustermann"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-medium mb-2"
                style={{ color: COLORS.darkText }}
              >
                E-Mail Adresse
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                placeholder="max@tierklinik.de"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium mb-2"
                style={{ color: COLORS.darkText }}
              >
                Ihre Nachricht an Jo
              </label>
              <textarea
                id="contact-message"
                rows={4}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                placeholder="Wir suchen Verstaerkung..."
              />
            </div>

            <button
              type="button"
              className="w-full py-5 rounded-xl text-white font-medium text-lg flex justify-center items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-[#2B0A16]/20"
              style={{ backgroundColor: COLORS.wineRed }}
            >
              Witterung aufnehmen <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
