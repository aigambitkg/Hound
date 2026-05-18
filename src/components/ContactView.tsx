import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, X, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { COLORS } from '../constants/theme';
import { ASSETS, assetUrl } from '../utils/assets';
import type { LegalDocType } from './LegalModal';

interface ContactViewProps {
  onClose: () => void;
  onOpenLegal: (type: LegalDocType) => void;
}

/**
 * Web3Forms Access Key.
 * Web3Forms verschickt das Formular an die E-Mail, mit der der Key erstellt
 * wurde (kevin.grundmann@ai-gambit.com). Key wird auf https://web3forms.com
 * kostenlos generiert und HIER eingetragen. Der Key ist nicht geheim, er
 * identifiziert nur den Empfaenger - daher OK ihn im Frontend zu haben.
 */
const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_KEY ?? 'YOUR_WEB3FORMS_ACCESS_KEY';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';
type Role = 'mandant' | 'talent';

export default function ContactView({ onClose, onOpenLegal }: ContactViewProps) {
  const [role, setRole] = useState<Role>('mandant');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!acceptedPrivacy || state === 'submitting') return;

    setState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `HOUND Anfrage [${role === 'mandant' ? 'Mandant' : 'Talent'}] von ${name}`,
          from_name: name,
          name,
          email,
          rolle: role === 'mandant' ? 'Mandant (Klinik / Praxis)' : 'Talent (Tierarzt / TFA)',
          message,
          // Honeypot: bots fuellen das aus, echte Nutzer nicht
          botcheck: '',
        }),
      });

      const data: { success?: boolean; message?: string } = await response.json();
      if (data.success) {
        setState('success');
        setName('');
        setEmail('');
        setMessage('');
        setAcceptedPrivacy(false);
      } else {
        setState('error');
        setErrorMessage(
          data.message ?? 'Es ist ein Fehler aufgetreten. Bitte versuche es erneut.',
        );
      }
    } catch {
      setState('error');
      setErrorMessage(
        'Netzwerkfehler. Bitte versuche es spaeter erneut oder schreibe direkt an kevin.grundmann@ai-gambit.com.',
      );
    }
  };

  const inputClasses =
    'w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all';

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
        {/* Close */}
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
            style={{
              filter: 'invert(1) brightness(0.2) sepia(1) hue-rotate(-50deg) saturate(3)',
            }}
          />
          <h2
            className="text-5xl md:text-7xl font-serif mb-6"
            style={{ color: COLORS.wineRed }}
          >
            Lass uns die Spur aufnehmen.
          </h2>
          <p className="text-xl mb-12 font-light" style={{ color: COLORS.darkText }}>
            Egal ob Sie Top-Tieraerzte fuer Ihre Praxis suchen oder als Talent
            den naechsten Schritt gehen wollen &ndash; wir sind bereit.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4 text-lg">
              <Mail color={COLORS.gold} className="mt-1 flex-shrink-0" />
              <a
                href="mailto:kevin.grundmann@ai-gambit.com"
                className="hover:underline break-all"
                style={{ color: COLORS.darkText }}
              >
                kevin.grundmann@ai-gambit.com
              </a>
            </div>
            <div className="flex items-start gap-4 text-lg">
              <Phone color={COLORS.gold} className="mt-1 flex-shrink-0" />
              <a
                href="https://wa.me/491625384974"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: COLORS.darkText }}
              >
                +49 162 5384974 &middot; WhatsApp
              </a>
            </div>
            <div className="flex items-start gap-4 text-lg">
              <MapPin color={COLORS.gold} className="mt-1 flex-shrink-0" />
              <span style={{ color: COLORS.darkText }}>
                c/o AI Gambit
                <br />
                Fraunhoferstrasse 35
                <br />
                61118 Bad Vilbel
              </span>
            </div>
          </div>
        </div>

        {/* Rechte Seite: Formular */}
        <div className="flex-1 flex flex-col justify-center">
          {state === 'success' ? (
            <div className="bg-white p-10 md:p-14 rounded-[2rem] shadow-2xl shadow-[#2B0A16]/5 text-center">
              <CheckCircle2 size={56} className="mx-auto mb-6 text-[#D4AF37]" />
              <h3
                className="text-3xl font-serif mb-4"
                style={{ color: COLORS.wineRed }}
              >
                Nachricht angekommen.
              </h3>
              <p className="text-lg font-light mb-8" style={{ color: COLORS.darkText }}>
                Vielen Dank fuer deine Anfrage. Wir melden uns innerhalb der
                naechsten 24 Stunden bei dir zurueck.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl text-white font-medium"
                style={{ backgroundColor: COLORS.wineRed }}
              >
                Schliessen
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-7 bg-white p-10 md:p-14 rounded-[2rem] shadow-2xl shadow-[#2B0A16]/5"
            >
              {/* Honeypot */}
              <input
                type="checkbox"
                name="botcheck"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: COLORS.darkText }}
                >
                  Ich bin...
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setRole('mandant')}
                    className={[
                      'flex-1 py-3 border rounded-xl transition-all',
                      role === 'mandant'
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#2B0A16] font-medium'
                        : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-[#D4AF37]/60',
                    ].join(' ')}
                  >
                    Mandant
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('talent')}
                    className={[
                      'flex-1 py-3 border rounded-xl transition-all',
                      role === 'talent'
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#2B0A16] font-medium'
                        : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-[#D4AF37]/60',
                    ].join(' ')}
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
                  Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClasses}
                  placeholder="Dr. Max Mustermann"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium mb-2"
                  style={{ color: COLORS.darkText }}
                >
                  E-Mail Adresse *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                  placeholder="max@tierklinik.de"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium mb-2"
                  style={{ color: COLORS.darkText }}
                >
                  Ihre Nachricht *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={inputClasses}
                  placeholder="Wir suchen Verstaerkung..."
                />
              </div>

              {/* Datenschutz-Checkbox (Pflicht fuer DSGVO-konforme Einwilligung) */}
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={acceptedPrivacy}
                  onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37] cursor-pointer accent-[#D4AF37]"
                />
                <span className="text-sm leading-snug" style={{ color: COLORS.darkText }}>
                  Ich habe die{' '}
                  <button
                    type="button"
                    onClick={() => onOpenLegal('datenschutz')}
                    className="underline hover:text-[#D4AF37] transition-colors"
                  >
                    Datenschutzerklaerung
                  </button>{' '}
                  zur Kenntnis genommen und willige in die Verarbeitung meiner
                  Daten zur Bearbeitung dieser Anfrage ein. Die Einwilligung
                  kann jederzeit widerrufen werden.
                </span>
              </label>

              {/* Fehlermeldung */}
              {state === 'error' && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                  <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-red-700">{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={!acceptedPrivacy || state === 'submitting'}
                className="w-full py-5 rounded-xl text-white font-medium text-lg flex justify-center items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-[#2B0A16]/20 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ backgroundColor: COLORS.wineRed }}
              >
                {state === 'submitting' ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    Witterung aufnehmen <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}
