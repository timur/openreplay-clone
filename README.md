# OpenReplay-Landingpage — Analyse & Plain-HTML-Nachbau

Analyse der Landingpage **openreplay.com** und ein originalgetreuer Nachbau in
**Plain HTML + Plain CSS + Plain JavaScript** (keine Frameworks, keine Build-Tools).

## Schnellstart

```bash
# einfach öffnen …
open index.html
# … oder lokalen Server starten (empfohlen wegen Fonts/Caching):
python3 -m http.server 8080   # dann http://localhost:8080
```

## Ordnerstruktur

```
openreplay-clone/
├── index.html              ← der Nachbau (Homepage, Hero-Kurve = Variante A)
├── variante-A.html         ← Hero-Kurve A · Sanfter Radial
├── variante-G.html         ← Hero-Kurve G · Blob (organische Wölbung)
├── curve-variants.html     ← interaktiver Schalter für ALLE 7 Kurven (A–G)
├── css/styles.css          ← komplettes Design-System + Hero-Animation + Kurven-Varianten
├── js/main.js              ← Mega-Menü, Tabs, Ticker, Reveals, Mobile-Menü
├── assets/                 ← Original-Referenz-Assets (Hero-PNG, Dot-Pattern)
├── analysis/
│   ├── ANALYSE.md          ← ★ Technische & gestalterische Analyse (Hauptdokument)
│   └── synthese-seiten.md  ← Synthese aller 27 Seiten (Design/IA/Messaging)
└── screenshots/
    ├── 01–20*.png          ← Original-Seiten (alle Features)
    └── rebuild-*.png       ← Screenshots des Nachbaus
```

## Was nachgebaut wurde

- **Hero** mit driftender Dashboard-Montage (der Signature-Effekt — siehe
  `analysis/ANALYSE.md` §1), Unterstrich-Squiggle, dualem CTA, Logo-Ticker.
- **3 Feature-Splits** mit interaktiven Produkt-Mockups + Pill-Tab-Switching.
- **Security-Band, Testimonial, Community, Blog, Closing-CTA, 5-Spalten-Footer.**
- **Mega-Menü, Mobile-Menü, Sticky-Header, Scroll-Reveals, Smooth-Scroll.**
- **Responsive** + `prefers-reduced-motion`.

## Hero-Kurven-Varianten

Die Übergangskante der Hero-Montage (der weiche `#3b2b86`-Verlaufsschleier, mit
dem die Screenshots ins Dunkel übergehen) gibt es in vier eigenständigen Dateien:

| Datei | Variante | Technik | Charakter |
|---|---|---|---|
| `variante-A.html` | A · Sanfter Radial | `mask: radial-gradient` weich | ausgewogen, weich gefedert |
| `variante-G.html` | G · Blob | `mask: radial-gradient` versetzt | organische Wölbung |

> Engere Auswahl: A vs. G (C · Scharfe Ellipse und F · Gerader Fade wurden aussortiert).
> Alle 7 Formen weiterhin live testbar in `curve-variants.html`.

Umgesetzt über `<body data-curve="A|C|F|G">` + scoped CSS in `css/styles.css`
(Abschnitt „Hero-Kurven-Varianten"). Ein Badge unten links zeigt die aktive Kurve.
`curve-variants.html` lässt zusätzlich **alle 7** Formen (inkl. B/D/E) live durchschalten.

## Tech-Stack des Originals (Kurzfassung)

**Astro 5** · **Tailwind CSS v4** · **DaisyUI** · **Lucide-Icons** ·
Fonts **Bricolage Grotesque** + **Figtree** · Primärfarbe `#394DFE` ·
Dunkelton `#0D033B`.

> Hinweis: Kundenlogos im Nachbau sind generische Platzhalter; die Hero-Montage
> ist mit eigenen CSS-Karten nachgebaut (statt des Original-PNGs). Reine
> Studien-/Demo-Zwecke — Original: https://openreplay.com
