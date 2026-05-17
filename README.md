# Hound — Die lebendige Fährte

Immersive 3D-Website für Hound Personalvermittlung. Gebaut mit **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **Three.js** und **Framer Motion**.

Live unter `https://<dein-github-username>.github.io/Hound/`

---

## Projekt-Struktur

```
Hound/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions: Auto-Deploy bei Push auf main
├── public/                     # Statische Assets (werden 1:1 in dist/ kopiert)
│   ├── .nojekyll               # Verhindert Jekyll-Verarbeitung auf GitHub Pages
│   ├── hound_logo.png
│   ├── hound_logo_transparent.png
│   ├── hound_jo.png            # Maskottchen
│   └── hound_cta.png           # Call-to-Action Bild
├── src/
│   ├── components/
│   │   ├── ContactView.tsx     # Morphing-Kontaktformular
│   │   ├── HoundScene.tsx      # Three.js 3D-Szene (Tunnel, Glas, Partikel)
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── MandantenSection.tsx
│   │       ├── TalenteSection.tsx
│   │       └── CTASection.tsx
│   ├── constants/
│   │   └── theme.ts            # COLORS (Single Source of Truth)
│   ├── utils/
│   │   └── assets.ts           # Asset-URL-Helper mit Base-Path-Support
│   ├── App.tsx                 # Orchestriert Szene + Sektionen + Modal
│   ├── main.tsx                # React Entry Point
│   ├── index.css               # Tailwind + Global Styles
│   └── vite-env.d.ts
├── index.html                  # HTML-Template mit Google Fonts + SEO Meta
├── package.json
├── vite.config.ts              # base: '/Hound/' für GitHub Pages
├── tsconfig.json               # Root TS-Config (Projekt-Referenzen)
├── tsconfig.app.json           # App-TS-Config (src/)
├── tsconfig.node.json          # Node-TS-Config (vite.config)
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

## Lokale Entwicklung

Voraussetzung: **Node.js 18+** (empfohlen Node 20).

```bash
# 1. Dependencies installieren
npm install

# 2. Dev-Server starten (öffnet http://localhost:5173 automatisch)
npm run dev

# 3. Produktion-Build erzeugen
npm run build

# 4. Build lokal vorschauen
npm run preview
```

## GitHub Pages Setup

Das Projekt deployt sich automatisch über GitHub Actions, sobald du auf `main` pushst. Einmaliger Setup:

1. **Repository erstellen** auf GitHub mit dem Namen `Hound` (Groß-/Kleinschreibung beachten — muss zum `base`-Pfad in `vite.config.ts` passen).

2. **Code pushen:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<dein-username>/Hound.git
   git push -u origin main
   ```

3. **GitHub Pages aktivieren:** Im Repository → `Settings` → `Pages` → unter **Source** `GitHub Actions` auswählen.

4. **Fertig!** Bei jedem Push auf `main` baut der Workflow die Seite und veröffentlicht sie auf `https://<dein-username>.github.io/Hound/`. Status-Anzeige unter `Actions` im Repo.

### Repository-Namen ändern

Falls du ein anderes Repository wählst, musst du in `vite.config.ts` den `base`-Wert anpassen (mit führendem und schließendem Slash):

```ts
base: '/dein-repo-name/',
```

Bei einer User-Page (`<username>.github.io` direkt, ohne Sub-Pfad) setzt du stattdessen:

```ts
base: '/',
```

## Architektur-Notizen

**Asset-Handling.** Alle Bilder liegen in `public/` und werden über den Helper `assetUrl()` aus `src/utils/assets.ts` referenziert. Dieser prefixt die Pfade mit `import.meta.env.BASE_URL`, sodass sie sowohl in der lokalen Dev-Umgebung (`/`) als auch auf GitHub Pages (`/Hound/`) korrekt aufgelöst werden. Wichtig vor allem für Three.js `TextureLoader`, der absolute URLs braucht.

**Three.js Szene.** `HoundScene` empfängt einen Ref auf den Scroll-Container und übersetzt die Scroll-Position in eine Z-Tiefe im 3D-Raum. Die Kamera bleibt statisch, die Szenen-Gruppe fliegt darauf zu — das gibt das Gefühl eines Tunnels. Beim Unmount werden alle GL-Resources (Geometries, Materials, Texturen, Renderer) sauber disposed.

**Code-Splitting.** `vite.config.ts` splittet `three`, `react` und `framer-motion` in separate Chunks. Three.js ist ~600 KB — das verhindert, dass der initiale Bundle alles auf einmal lädt.

**`.nojekyll`.** Liegt in `public/` und wird beim Build nach `dist/` kopiert. Ohne diese Datei ignoriert GitHub Pages alle Ordner und Dateien, die mit Unterstrich beginnen (z.B. Vites `_app/`-Chunks).

## Skripte

| Befehl              | Zweck                                          |
|---------------------|------------------------------------------------|
| `npm run dev`       | Vite Dev-Server mit HMR                        |
| `npm run build`     | TypeScript-Check + Produktions-Build → `dist/` |
| `npm run preview`   | Build lokal vorschauen                          |
| `npm run lint`      | Nur TypeScript-Typ-Check (kein Build)          |

## Lizenz

Privat / Hound Personalvermittlung. Alle Rechte vorbehalten.
