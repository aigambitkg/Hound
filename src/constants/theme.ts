/**
 * Zentrale Farb- und Theme-Definitionen fuer Hound.
 * Aenderungen hier wirken sich global auf alle Komponenten + Three.js Szene aus.
 */
export const COLORS = {
  wineRed: '#2B0A16', // Tiefes Burgund
  gold: '#D4AF37', // Edles Gold
  cream: '#F9F6F0', // Cremefarben fuer Kontaktansicht
  darkText: '#1A050D',
} as const;

export type ColorKey = keyof typeof COLORS;
