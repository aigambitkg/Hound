/**
 * Loest einen Asset-Pfad relativ zur Vite `base` URL auf.
 * Wichtig fuer GitHub Pages, wo die Seite unter /Hound/ gehostet wird:
 * - In Dev:    BASE_URL = "/"        -> "/hound_logo.png"
 * - In Build:  BASE_URL = "/Hound/"  -> "/Hound/hound_logo.png"
 *
 * Wir koennen Public-Assets nicht direkt mit absoluten Pfaden referenzieren,
 * weil Three.js TextureLoader sonst auf der falschen URL sucht.
 */
export const assetUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL;
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${clean}`;
};

/**
 * Vordefinierte Asset-Pfade fuer alle verwendeten Bilder.
 * Single Source of Truth - hier muss jeder Datei-Name nur einmal stehen.
 */
export const ASSETS = {
  logo: 'hound_logo.png',
  logoTransparent: 'hound_logo_transparent.png',
  jo: 'hound_jo.png',
  cta: 'hound_cta.png',
} as const;
