/**
 * Floating WhatsApp-Button unten rechts.
 * Klick oeffnet WhatsApp Web / App mit der hinterlegten Nummer.
 *
 * Die wa.me-URL braucht die Nummer ohne "+" und ohne Leerzeichen.
 * Eine optionale Vorlage-Nachricht laesst sich via `?text=` anhaengen.
 */

const WHATSAPP_NUMBER = '491625384974'; // +49 162 5384974, ohne "+"
const PREFILLED_MESSAGE =
  'Hallo HOUND, ich habe eine Anfrage zu Personalvermittlung in der Tiermedizin.';

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  PREFILLED_MESSAGE,
)}`;

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Per WhatsApp Kontakt aufnehmen"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3 pl-4 pr-5 py-3 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] hover:scale-105 transition-all"
    >
      {/* WhatsApp Brand-Icon (inline SVG, keine zusaetzliche Abhaengigkeit) */}
      <svg
        viewBox="0 0 32 32"
        width="22"
        height="22"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 01-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 01-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.13-.602.13-.99 0-.443-1.546-1.058-1.832-1.058-.146 0-.286.013-.42.05zm-3.123 7.066h-.013c-2.078 0-4.116-.572-5.89-1.65l-.42-.252-4.337 1.144 1.156-4.232-.273-.43c-1.183-1.83-1.805-3.952-1.803-6.115.003-6.345 5.166-11.51 11.513-11.51 3.073.001 5.96 1.2 8.13 3.374 2.172 2.175 3.368 5.063 3.366 8.137-.004 6.345-5.167 11.51-11.513 11.51m9.792-21.293C23.166.703 19.69-.005 16.985 0 9.6 0 3.59 6.01 3.585 13.396c-.001 2.362.616 4.668 1.79 6.7L3.475 27.5l7.587-1.99a13.392 13.392 0 005.92 1.378h.006c7.384 0 13.396-6.01 13.4-13.397.002-3.578-1.39-6.942-3.92-9.473" />
      </svg>
      <span className="hidden sm:inline text-sm font-medium whitespace-nowrap">
        Chat per WhatsApp
      </span>
    </a>
  );
}
