import { Lock, Mail, MapPin } from 'lucide-react';
import type { LegalDocType } from './LegalModal';

interface FooterProps {
  onOpenLegal: (type: LegalDocType) => void;
}

/**
 * Footer am Ende der Page. Enthaelt:
 * - Markenzeile + Copyright
 * - Trust-Signals (verschluesselt, kein Tracking, DSGVO-konform)
 * - Quick-Links (Kontakt, Impressum, Datenschutz)
 */
export default function Footer({ onOpenLegal }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full px-8 py-12 pointer-events-none">
      <div className="pointer-events-auto max-w-6xl mx-auto frosted-panel p-8 md:p-10">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Brand */}
          <div>
            <p className="text-[#D4AF37] tracking-[0.3em] uppercase text-xs mb-3 font-semibold">
              HOUND
            </p>
            <h3 className="text-white font-serif text-xl md:text-2xl mb-3 leading-tight">
              Next-Level Recruiting fuer den tiermedizinischen Bereich.
            </h3>
            <p className="text-white/65 text-sm leading-relaxed">
              Personalberatung &middot; Active Sourcing &middot; Social
              Recruiting
            </p>
          </div>

          {/* Kontakt */}
          <div>
            <p className="text-[#D4AF37] tracking-[0.25em] uppercase text-xs mb-4 font-semibold">
              Kontakt
            </p>
            <ul className="space-y-2.5 text-white/80 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 text-[#D4AF37] flex-shrink-0" />
                <a
                  href="mailto:kevin.grundmann@ai-gambit.com"
                  className="hover:text-[#D4AF37] transition-colors break-all"
                >
                  kevin.grundmann@ai-gambit.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-[#D4AF37] flex-shrink-0" />
                <span>
                  c/o AI Gambit
                  <br />
                  Fraunhoferstrasse 35
                  <br />
                  61118 Bad Vilbel &middot; Deutschland
                </span>
              </li>
            </ul>
          </div>

          {/* Vertrauen + Rechtliches */}
          <div>
            <p className="text-[#D4AF37] tracking-[0.25em] uppercase text-xs mb-4 font-semibold">
              Vertrauen &amp; Recht
            </p>
            <ul className="space-y-2.5 text-white/80 text-sm">
              <li className="flex items-start gap-3">
                <Lock size={16} className="mt-0.5 text-[#D4AF37] flex-shrink-0" />
                <span>SSL-verschluesselt &middot; kein Tracking</span>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('impressum')}
                  className="hover:text-[#D4AF37] transition-colors underline-offset-4 hover:underline"
                >
                  Impressum
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('datenschutz')}
                  className="hover:text-[#D4AF37] transition-colors underline-offset-4 hover:underline"
                >
                  Datenschutzerklaerung
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center text-xs text-white/50">
          <span>&copy; {year} HOUND. Alle Rechte vorbehalten.</span>
          <span>Made with care &middot; DSGVO-konform &middot; DDG-konform</span>
        </div>
      </div>
    </footer>
  );
}
