import {
  Hospital,
  FlaskConical,
  Wheat,
  Microscope,
  Landmark,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

interface Branche {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

const BRANCHEN: Branche[] = [
  {
    icon: Hospital,
    title: 'Tierkliniken',
    subtitle: 'Spezialzentren & Ueberweisungskliniken',
  },
  {
    icon: FlaskConical,
    title: 'Pharma & MedTech',
    subtitle: 'Tierarzneimittel & Medizintechnik',
  },
  {
    icon: Wheat,
    title: 'Tierfutterindustrie',
    subtitle: 'Produktion, Qualitaet & Vertrieb',
  },
  {
    icon: Microscope,
    title: 'Forschung',
    subtitle: 'Universitaeten & Institute',
  },
  {
    icon: Landmark,
    title: 'Behoerden',
    subtitle: 'Veterinaeraemter & oeffentlicher Dienst',
  },
  {
    icon: ShieldCheck,
    title: 'Lebensmittelueberwachung',
    subtitle: 'Tiergesundheit & Verbraucherschutz',
  },
];

/**
 * Value Proposition - Warum HOUND?
 * Greift die Faehrte-Metapher auf und zeigt das Branchen-Spektrum.
 */
export default function ValuePropositionSection() {
  return (
    <section
      id="branchen"
      className="w-full min-h-screen flex flex-col items-center justify-center px-8 py-20 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-5xl w-full">
        {/* Intro */}
        <div className="frosted-panel-soft p-7 md:p-9 mb-10 text-center">
          <p className="text-[#D4AF37] tracking-[0.3em] uppercase text-xs mb-3 font-semibold">
            Warum HOUND?
          </p>
          <h2 className="text-white text-3xl md:text-5xl font-serif leading-tight">
            Wir nehmen die <span className="italic text-[#D4AF37]">Faehrte</span> auf,
            wo Stellenanzeigen versagen.
          </h2>
          <p className="text-white/85 mt-5 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Die besten Talente suchen nicht mehr aktiv &mdash; sie wollen gefunden
            werden. Wir spueren sie auf: proaktiv, modern, branchen-fokussiert.
          </p>
        </div>

        {/* Branchen-Grid */}
        <div>
          <p className="text-center text-[#D4AF37]/80 tracking-[0.25em] uppercase text-xs mb-5 font-semibold">
            Branchen, in denen wir besetzen
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {BRANCHEN.map(({ icon: Icon, title, subtitle }) => (
              <div
                key={title}
                className="frosted-panel p-5 flex flex-col items-center text-center hover:border-[#D4AF37]/50 transition-colors"
              >
                <div className="w-11 h-11 rounded-full bg-[#D4AF37]/15 flex items-center justify-center mb-3">
                  <Icon size={20} className="text-[#D4AF37]" strokeWidth={1.8} />
                </div>
                <h3 className="text-white font-serif text-base md:text-lg leading-tight mb-1">
                  {title}
                </h3>
                <p className="text-white/65 text-xs md:text-sm font-light leading-snug">
                  {subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
