import { useEffect, useState, type RefObject } from 'react';
import { Menu, X } from 'lucide-react';
import { ASSETS, assetUrl } from '../utils/assets';

interface NavigationProps {
  /** Scrollbarer Container, in dem die Sektionen liegen */
  scrollContainerRef: RefObject<HTMLDivElement>;
}

interface MenuItem {
  id: string;
  label: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'hero', label: 'Start' },
  { id: 'branchen', label: 'Branchen' },
  { id: 'arbeitgeber', label: 'Arbeitgeber' },
  { id: 'bewerber', label: 'Bewerber' },
  { id: 'prozess', label: 'Prozess' },
  { id: 'kontakt', label: 'Kontakt' },
];

/**
 * Fixe Top-Navigation mit Hash-Routing + Smooth-Scroll.
 *
 * - Desktop: horizontale Menueleiste mit Logo links
 * - Mobile: Hamburger -> Vollbild-Drawer
 * - URL-Hash synchronisiert sich beim Wechsel (Deep-Linking funktioniert)
 * - Aktive Sektion wird per IntersectionObserver hervorgehoben
 */
export default function Navigation({ scrollContainerRef }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('hero');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (history.replaceState) {
      history.replaceState(null, '', `#${id}`);
    } else {
      window.location.hash = id;
    }
    setMobileOpen(false);
  };

  // Active-Section-Detection via IntersectionObserver
  useEffect(() => {
    const root = scrollContainerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Waehle die Sektion mit dem groessten Sichtbarkeits-Anteil
        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        }
        if (bestEntry) setActiveId(bestEntry.target.id);
      },
      {
        root,
        threshold: [0.3, 0.5, 0.7],
      },
    );

    MENU_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [scrollContainerRef]);

  // Beim ersten Laden: Hash in URL beachten
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && MENU_ITEMS.some((m) => m.id === hash)) {
      // Kurze Verzoegerung, damit die Szene erst rendert
      const t = setTimeout(() => scrollToSection(hash), 100);
      return () => clearTimeout(t);
    }
  }, []);

  // ESC schliesst Mobile-Menue
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop + Mobile Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <nav className="pointer-events-auto mx-auto mt-4 max-w-7xl px-4 md:px-6">
          <div className="frosted-panel flex items-center justify-between py-2 pl-3 pr-2 md:pl-5 md:pr-3">
            {/* Logo */}
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-3 group"
              aria-label="Zur Startseite"
            >
              <img
                src={assetUrl(ASSETS.logoTransparent)}
                alt=""
                className="h-8 md:h-9 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="hidden sm:block text-white font-serif tracking-wider text-base">
                HOUND
              </span>
            </button>

            {/* Desktop Menue */}
            <ul className="hidden md:flex items-center gap-1">
              {MENU_ITEMS.slice(1).map(({ id, label }) => {
                const isActive = activeId === id;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(id)}
                      className={[
                        'px-4 py-2 rounded-full text-sm transition-colors',
                        isActive
                          ? 'text-[#2B0A16] bg-[#D4AF37]'
                          : 'text-white/80 hover:text-white hover:bg-white/10',
                      ].join(' ')}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors"
              aria-label={mobileOpen ? 'Menue schliessen' : 'Menue oeffnen'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="absolute top-20 left-4 right-4 frosted-panel p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col gap-1">
              {MENU_ITEMS.map(({ id, label }) => {
                const isActive = activeId === id;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(id)}
                      className={[
                        'w-full text-left px-4 py-3 rounded-xl text-base transition-colors',
                        isActive
                          ? 'text-[#2B0A16] bg-[#D4AF37] font-medium'
                          : 'text-white/90 hover:bg-white/10',
                      ].join(' ')}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
