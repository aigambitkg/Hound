import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { COLORS } from '../constants/theme';

export type LegalDocType = 'impressum' | 'datenschutz';

interface LegalModalProps {
  type: LegalDocType;
  onClose: () => void;
}

/**
 * Modal-Overlay fuer Impressum und Datenschutzerklaerung.
 * Inhalte sind nach § 5 DDG (Digitale-Dienste-Gesetz, ersetzt seit
 * Mai 2024 das TMG) und DSGVO aufgebaut. Die Texte sind sorgfaeltig
 * formuliert, sollten aber bei Rechtsaenderungen oder geschaeftlicher
 * Veraenderung von einem Rechtsbeistand geprueft werden.
 */
export default function LegalModal({ type, onClose }: LegalModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{ backgroundColor: 'rgba(43, 10, 22, 0.92)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative my-12 mx-4 max-w-3xl w-full bg-[#F9F6F0] text-[#1A050D] rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-8 py-6 flex items-center justify-between"
          style={{ backgroundColor: COLORS.wineRed }}
        >
          <h1 className="text-white text-2xl md:text-3xl font-serif">
            {type === 'impressum' ? 'Impressum' : 'Datenschutzerklaerung'}
          </h1>
          <button
            type="button"
            onClick={onClose}
            aria-label="Schliessen"
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 md:p-12 max-h-[75vh] overflow-y-auto">
          {type === 'impressum' ? <Impressum /> : <Datenschutz />}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ============================ IMPRESSUM ============================ */

function Impressum() {
  return (
    <div className="prose-content space-y-6 text-sm md:text-base leading-relaxed">
      <Section title="Angaben gemaess § 5 DDG">
        <p>
          <strong>Kevin Grundmann</strong>
          <br />
          c/o Namuh Talent Ecosystems
          <br />
          c/o AI Gambit
          <br />
          Bad Vilbel
          <br />
          Deutschland
        </p>
      </Section>

      <Section title="Kontakt">
        <p>
          E-Mail:{' '}
          <a
            href="mailto:kontakt@hound-personal.de"
            className="text-[#2B0A16] underline hover:text-[#D4AF37] transition-colors"
          >
            kontakt@hound-personal.de
          </a>
          <br />
          WhatsApp:{' '}
          <a
            href="https://wa.me/491625384974"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2B0A16] underline hover:text-[#D4AF37] transition-colors"
          >
            +49 162 5384974
          </a>
        </p>
      </Section>

      <Section title="Verantwortlich fuer den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          Kevin Grundmann
          <br />
          c/o Namuh Talent Ecosystems &middot; c/o AI Gambit
          <br />
          Bad Vilbel, Deutschland
        </p>
      </Section>

      <Section title="EU-Streitschlichtung">
        <p>
          Die Europaeische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{' '}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2B0A16] underline hover:text-[#D4AF37] transition-colors"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          .
          <br />
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>
      </Section>

      <Section title="Verbraucherstreitbeilegung / Universalschlichtungsstelle">
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </Section>

      <Section title="Haftung fuer Inhalte">
        <p>
          Als Diensteanbieter sind wir gemaess § 7 Abs. 1 DDG fuer eigene Inhalte
          auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
          §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht
          verpflichtet, uebermittelte oder gespeicherte fremde Informationen zu
          ueberwachen oder nach Umstaenden zu forschen, die auf eine
          rechtswidrige Taetigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon
          unberuehrt. Eine diesbezuegliche Haftung ist jedoch erst ab dem
          Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung moeglich. Bei
          Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
          Inhalte umgehend entfernen.
        </p>
      </Section>

      <Section title="Haftung fuer Links">
        <p>
          Unser Angebot enthaelt Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb koennen wir fuer diese
          fremden Inhalte auch keine Gewaehr uebernehmen. Fuer die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich.
        </p>
        <p>
          Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
          moegliche Rechtsverstoesse ueberprueft. Rechtswidrige Inhalte waren
          zum Zeitpunkt der Verlinkung nicht erkennbar.
        </p>
      </Section>

      <Section title="Urheberrecht">
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfaeltigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung ausserhalb der
          Grenzen des Urheberrechtes beduerfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers.
        </p>
      </Section>

      <p className="text-xs text-[#1A050D]/60 pt-6 border-t border-[#2B0A16]/10">
        Stand: 2026
      </p>
    </div>
  );
}

/* ============================ DATENSCHUTZ ============================ */

function Datenschutz() {
  return (
    <div className="prose-content space-y-6 text-sm md:text-base leading-relaxed">
      <Section title="1. Verantwortlicher">
        <p>
          Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) und
          anderer nationaler Datenschutzgesetze ist:
        </p>
        <p>
          <strong>Kevin Grundmann</strong>
          <br />
          c/o Namuh Talent Ecosystems &middot; c/o AI Gambit
          <br />
          Bad Vilbel, Deutschland
          <br />
          E-Mail:{' '}
          <a
            href="mailto:kontakt@hound-personal.de"
            className="text-[#2B0A16] underline hover:text-[#D4AF37]"
          >
            kontakt@hound-personal.de
          </a>
        </p>
      </Section>

      <Section title="2. Allgemeine Hinweise zur Datenverarbeitung">
        <p>
          Wir verarbeiten personenbezogene Daten unserer Nutzer grundsaetzlich
          nur, soweit dies zur Bereitstellung einer funktionsfaehigen Website
          sowie unserer Inhalte und Leistungen erforderlich ist. Eine
          Verarbeitung erfolgt regelmaessig nur nach Einwilligung des Nutzers
          oder wenn eine vorherige Einholung einer Einwilligung aus
          tatsaechlichen Gruenden nicht moeglich ist und die Verarbeitung der
          Daten durch gesetzliche Vorschriften gestattet ist.
        </p>
      </Section>

      <Section title="3. Hosting (GitHub Pages)">
        <p>
          Diese Website wird ueber <strong>GitHub Pages</strong>, einen Dienst
          der GitHub, Inc. (88 Colin P Kelly Jr Street, San Francisco, CA 94107,
          USA &mdash; Tochter der Microsoft Corporation), gehostet. Beim Aufruf
          der Website werden technisch notwendige Daten an die Server von
          GitHub uebertragen, insbesondere IP-Adresse, Browserkennung,
          Datum/Uhrzeit und die aufgerufene Seite. Diese Verarbeitung erfolgt
          auf Grundlage unserer berechtigten Interessen (Art. 6 Abs. 1 lit. f
          DSGVO) an einer technisch fehlerfreien Darstellung der Website.
        </p>
        <p>
          Datenschutzerklaerung von GitHub:{' '}
          <a
            href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2B0A16] underline hover:text-[#D4AF37]"
          >
            docs.github.com/.../privacy-statement
          </a>
        </p>
      </Section>

      <Section title="4. Schriftarten (Google Fonts)">
        <p>
          Wir setzen die Schriftarten &bdquo;Cormorant Garamond&ldquo; und
          &bdquo;Inter&ldquo; ueber den Dienst Google Fonts der Google Ireland
          Limited (Gordon House, Barrow Street, Dublin 4, Irland) ein. Beim
          Aufruf einer Seite laedt Ihr Browser die benoetigten Schriften von
          Google-Servern. Dabei wird Ihre IP-Adresse an Google uebertragen.
          Rechtsgrundlage ist unser berechtigtes Interesse an einer
          ansprechenden Darstellung unserer Inhalte (Art. 6 Abs. 1 lit. f
          DSGVO).
        </p>
        <p>
          Weitere Informationen:{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2B0A16] underline hover:text-[#D4AF37]"
          >
            policies.google.com/privacy
          </a>
        </p>
      </Section>

      <Section title="5. Kontaktaufnahme (Formular, E-Mail, WhatsApp)">
        <p>
          Wenn Sie uns ueber unser Kontaktformular, per E-Mail oder ueber
          WhatsApp kontaktieren, werden die von Ihnen mitgeteilten Daten (z.B.
          Name, E-Mail-Adresse, Telefonnummer, Inhalt Ihrer Nachricht) zur
          Bearbeitung Ihrer Anfrage und fuer den Fall von Anschlussfragen bei
          uns gespeichert.
        </p>
        <p>
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw.
          Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung
          Ihrer Anfrage). Ihre Daten werden geloescht, sobald sie fuer die
          Erreichung des Zweckes nicht mehr erforderlich sind, spaetestens
          jedoch nach Ablauf gesetzlicher Aufbewahrungspflichten.
        </p>
        <p>
          <strong>Hinweis zu WhatsApp:</strong> Beim Klick auf unseren
          WhatsApp-Button verlassen Sie unsere Website und werden zu einem
          Dienst der WhatsApp Ireland Limited weitergeleitet. Es gelten dann
          die Datenschutzbestimmungen von WhatsApp/Meta:{' '}
          <a
            href="https://www.whatsapp.com/legal/privacy-policy-eea"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2B0A16] underline hover:text-[#D4AF37]"
          >
            whatsapp.com/legal/privacy-policy-eea
          </a>
        </p>
      </Section>

      <Section title="6. Bewerber- und Kandidatendaten">
        <p>
          Im Rahmen unserer Personalvermittlungs- und Recruiting-Dienstleistungen
          verarbeiten wir personenbezogene Daten von Kandidatinnen und
          Kandidaten (z.B. Kontaktdaten, Lebenslauf, Qualifikationen). Diese
          Verarbeitung erfolgt auf Grundlage Ihrer ausdruecklichen Einwilligung
          (Art. 6 Abs. 1 lit. a, Art. 9 Abs. 2 lit. a DSGVO) sowie zur Anbahnung
          eines Beschaeftigungsverhaeltnisses (§ 26 BDSG).
        </p>
        <p>
          Eine Weitergabe an potenzielle Arbeitgeber erfolgt ausschliesslich
          nach Ihrer vorherigen Freigabe. Sie koennen Ihre Einwilligung
          jederzeit fuer die Zukunft widerrufen.
        </p>
      </Section>

      <Section title="7. Cookies / Local Storage">
        <p>
          Diese Website setzt <strong>keine Tracking- oder Werbe-Cookies</strong>{' '}
          ein. Es werden lediglich technisch notwendige Browser-Daten verwendet,
          die fuer den Betrieb der Seite zwingend erforderlich sind.
        </p>
      </Section>

      <Section title="8. Ihre Rechte als Betroffene Person">
        <p>Sie haben gegenueber uns folgende Rechte:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
          <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
          <li>Recht auf Loeschung (Art. 17 DSGVO)</li>
          <li>Recht auf Einschraenkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Recht auf Datenuebertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
          <li>
            Recht auf Widerruf erteilter Einwilligungen mit Wirkung fuer die
            Zukunft (Art. 7 Abs. 3 DSGVO)
          </li>
        </ul>
      </Section>

      <Section title="9. Beschwerderecht bei der Aufsichtsbehoerde">
        <p>
          Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehoerde
          ueber die Verarbeitung Ihrer personenbezogenen Daten durch uns zu
          beschweren (Art. 77 DSGVO).
        </p>
      </Section>

      <Section title="10. SSL-/TLS-Verschluesselung">
        <p>
          Diese Seite nutzt aus Gruenden der Sicherheit und zum Schutz der
          Uebertragung vertraulicher Inhalte eine SSL-/TLS-Verschluesselung.
          Eine verschluesselte Verbindung erkennen Sie daran, dass die
          Adresszeile des Browsers von &bdquo;http://&ldquo; auf
          &bdquo;https://&ldquo; wechselt und am Schloss-Symbol in Ihrer
          Browserzeile.
        </p>
      </Section>

      <p className="text-xs text-[#1A050D]/60 pt-6 border-t border-[#2B0A16]/10">
        Stand: 2026 &middot; Diese Datenschutzerklaerung kann bei Aenderungen
        unserer Dienste oder rechtlichen Rahmenbedingungen aktualisiert werden.
      </p>
    </div>
  );
}

/* ============================ HELPER ============================ */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg md:text-xl font-serif text-[#2B0A16] mb-3">
        {title}
      </h2>
      <div className="space-y-3 text-[#1A050D]/85">{children}</div>
    </section>
  );
}
