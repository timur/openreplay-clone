# OpenReplay-Landingpage — Analyse, Nachbau & Landing-Page-Baukasten

Analyse der Landingpage **openreplay.com**, ein originalgetreuer Nachbau in
**Plain HTML + Plain CSS + Plain JavaScript** (keine Frameworks, keine Build-Tools)
— plus ein **Baukasten mit wiederverwendbaren Landing-Page-Bausteinen**.
Einzige optionale Library: [Motion](https://motion.dev) per CDN für dezente
Scroll-Effekte (Progressive Enhancement — ohne Netz läuft alles trotzdem).

## Schnellstart

```bash
# einfach öffnen … (index.html = Galerie-Übersicht · home.html = der komplette Klon)
open index.html
# … oder lokalen Server starten (empfohlen wegen Fonts/Caching):
python3 -m http.server 8080   # dann http://localhost:8080
```

## Ordnerstruktur

```
openreplay-clone/
├── index.html               ← ★ Galerie/Übersicht — alles anklickbar (Startseite)
├── home.html                ← der Homepage-Nachbau (Hero-Kurve = Variante A)
├── variante-A.html          ← Hero-Kurve A · Sanfter Radial
├── variante-G.html          ← Hero-Kurve G · Blob (organische Wölbung)
├── curve-variants.html      ← interaktiver Schalter für die 6 Kurven (A–G, ohne F)
├── variante-hell.html       ← ★ Farbschema „Hell" — Tageslicht
├── variante-dunkel.html     ← ★ Farbschema „Dunkel" — komplette Seite in Indigo
├── variante-verlauf.html    ← ★ Farbschema „Verlauf" — Aurora-Hero mit mehr Verläufen
├── variante-weiss.html      ← ★ Thema „Weiß" — sehr helles, weißes Design (Haarlinien)
├── variante-akzent.html     ← ★ Thema „Akzent" — weiße Flächen, Hero/Header in Markenfarbe
├── css/styles.css           ← Design-System + Hero-Animation + Kurven-Varianten
├── css/themes.css           ← die 5 Design-Themen (via <body data-theme="…">)
├── js/main.js               ← Mega-Menü, Tabs, Ticker, Reveals, Mobile-Menü
├── js/theme-fx.js           ← Motion-Extras der Farbschemata (Parallax, Stagger)
├── js/font-switcher.js      ← ★ „Aa"-Widget: 6 Font-Paarungen live umschalten (alle Seiten)
├── js/color-switcher.js     ← ★ Farbkreis-Widget: 8 Farbschemata live umschalten (alle Seiten)
├── js/mode-switcher.js      ← ★ ☀/🌙-Widget: Dark-Mode auf jeder Seite (Klon, Galerie, Bausteine)
├── bausteine/               ← ★ LANDING-PAGE-BAUKASTEN (siehe unten)
│   ├── index.html           ← Übersicht aller Bausteine
│   ├── hero.html            ← 5 Hero-Designs
│   ├── navigation.html      ← 8 Navigationen (Sticky, Pill, Banner, Mega, Overlay, Scrollspy …)
│   ├── features.html        ← Feature-Grid, Splits, Bento, Zahlen-Band
│   ├── testimonials.html    ← 4 Testimonial-Sektionen
│   ├── preise.html          ← Preiskarten + Vergleichstabelle
│   ├── faq.html             ← FAQ-Akkordeons
│   ├── cta.html             ← 3 Call-to-Action-Bänder
│   ├── footer.html          ← 3 Footer
│   ├── leadgen.html         ← Lead-Magnet, Demo-Buchung, Exit-Intent, Quiz, Countdown …
│   ├── kaufentscheidung.html← ROI-Rechner, Vergleich, Garantie, Onboarding, Vorher/Nachher
│   ├── vertrauen.html       ← Team, Gründer-Brief, Bewertungen, Presse, Awards
│   ├── social-proof.html    ← Logo-Wall, Community, Fallstudien, Toasts, Compliance
│   ├── medien.html          ← Video-Lightbox, Karussell, Hotspot-Tour, Tabs, Charts
│   ├── interaktiv.html      ← Code-Copy, Scrollytelling, Roadmap, Chat, Karte, Cmd+K
│   ├── utility.html         ← Cookie-Banner (DSGVO), Kontakt, Blog, TOC, Breadcrumbs …
│   ├── 404 / wartung / coming-soon / danke / agb / status .html ← Seiten-Vorlagen
│   ├── mobile.html          ← Mobile-Conversion: Bottom-CTA, Tap-to-Call, Tab-Bar …
│   ├── grundlagen-*.html    ← SEO/Meta, Barrierefreiheit, Performance, Tracking (Snippets)
│   ├── scroll-animationen.html ← Schaukasten aller Scroll-Effekte
│   ├── IDEEN.md             ← ★ das Brainstorming hinter dem Ausbau (alle 46 umgesetzt)
│   ├── impressum.html       ← Impressum-Vorlage (Platzhalter markiert)
│   ├── datenschutz.html     ← Datenschutz-Vorlage (DSGVO-Struktur)
│   ├── css/base.css         ← Design-Tokens (hell/dunkel) + Basis-Klassen
│   ├── css/demo.css         ← nur Demo-Chrome der Beispielseiten
│   └── js/base.js           ← Reveals, Sticky-Nav, Zähler, Marquee, Akkordeon
├── assets/                  ← Referenz-Assets + thumbs/ (Galerie-Vorschauen)
├── analysis/
│   ├── ANALYSE.md           ← Technische & gestalterische Analyse
│   └── synthese-seiten.md   ← Synthese aller 27 Seiten (Design/IA/Messaging)
└── screenshots/             ← Original- & Rebuild-Screenshots
```

## Design-Themen der Homepage

Fünf komplette Themen, umgesetzt als reine CSS-Overrides in `css/themes.css`
über `<body data-theme="…">` — Layout und Verhalten bleiben identisch:

| Datei | Thema | Charakter |
|---|---|---|
| `variante-hell.html` | Hell · Tageslicht | heller Hero, helle Bänder, dunkle Typo |
| `variante-dunkel.html` | Dunkel · Mitternacht | gesamte Seite Indigo, Glas-Karten, helle Mockups |
| `variante-verlauf.html` | Verlauf · Aurora | deutlich mehr Verläufe im Hero: driftende Aurora-Schwaden, mehrfarbiger Schleier, Verlaufs-Headline |
| `variante-weiss.html` | Weiß · Pur | sehr hell und weiß: reines Weiß statt Tönung, Haarlinien statt Flächen |
| `variante-akzent.html` | Akzent | weiße Flächen, Hero/Header in voller Markenfarbe, die sich leicht durchzieht |

Die Themen laden zusätzlich `js/theme-fx.js`: Motion (per CDN) ergänzt Parallax
auf der Hero-Montage, gestaffelte Blog-Karten und einen Klick-Impuls auf den
Pill-Tabs. Bei `prefers-reduced-motion` oder offline: keine Auswirkung.

## Dark-Mode-Umschalter

Das ☀/🌙-Widget (`js/mode-switcher.js`, unten rechts) schaltet **jede Seite**
zwischen Hell und Dunkel: Klon-Seiten wechseln zwischen den Themen Hell/Dunkel
(eigene dunkle/helle Themen wie Verlauf/Weiß/Akzent bleiben erhalten), Bausteine
kippen alle Sektionen über die Design-Tokens, die Galerie hat eigene
Light-Overrides. Die Wahl gilt per `localStorage` projektweit. Dark-Mode ×
Farbschema × Schrift sind frei kombinierbar.

## Farbschema-Umschalter

Über dem „Aa"-Widget sitzt ein **Farbkreis-Widget** (`js/color-switcher.js`):
8 kuratierte Farbschemata, live umschaltbar und in `localStorage` gemerkt.
Alle Markenfarben des Projekts laufen über CSS-Variablen (`--primary`, `--brand`,
`--indigo-deep`, `--veil`, `--brand-rgb`, …) — der Switcher setzt nur diese.

| Schema | Charakter | Primär → Sekundär · Dunkelfläche |
|---|---|---|
| Indigo | Original · Electric Blue | `#394DFE` → `#6F5BFF` · `#0D033B` |
| Ozean | Blau · Himmel & Cyan | `#0EA5E9` → `#22D3EE` · `#04202F` |
| Smaragd | Grün · Emerald & Teal | `#059669` → `#14B8A6` · `#042420` |
| Rubin | Rot · Rosé & Koralle | `#E11D48` → `#F97316` · `#2A0714` |
| Bernstein | Orange · Sunset | `#F97316` → `#F43F5E` · `#291005` |
| Beere | Violett · Purple & Pink | `#A855F7` → `#EC4899` · `#230639` |
| Graphit | Neutral · kühl | `#64748B` → `#94A3B8` · `#0C0F14` |
| Sand | Neutral · warm | `#78716C` → `#A8A29E` · `#1C1917` |

> Neutral-Kombis: **Graphit/Sand + Layout „Hell"** = neutrales helles Design,
> **+ Layout „Dunkel"** = neutrales dunkles Design. Farbschema × Layout-Thema ×
> Schrift-Paarung sind frei kombinierbar.

## Schrift-Umschalter

Unten rechts auf jeder Seite sitzt ein **„Aa"-Widget** (`js/font-switcher.js`):
6 kuratierte Font-Paarungen (Display + Fließtext), live umschaltbar. Die Auswahl
wird in `localStorage` gemerkt und gilt projektweit — möglich, weil alle Seiten
Schriften nur über die CSS-Variablen `--font-display` / `--font-body` referenzieren.

| Paarung | Display | Fließtext |
|---|---|---|
| Original | Bricolage Grotesque | Figtree |
| Tech | Space Grotesk | Inter |
| Editorial | Playfair Display | DM Sans |
| Geometrisch | Sora | Manrope |
| Freundlich | Baloo 2 | Nunito Sans |
| Plakativ | Unbounded | Work Sans |

Google-Fonts der Alternativen laden erst beim ersten Öffnen des Widgets (lazy).

## Hero-Kurven-Varianten

Die Übergangskante der Hero-Montage (der weiche `#3b2b86`-Verlaufsschleier):

| Datei | Variante | Technik | Charakter |
|---|---|---|---|
| `variante-A.html` | A · Sanfter Radial | `mask: radial-gradient` weich | ausgewogen, weich gefedert |
| `variante-G.html` | G · Blob | `mask: radial-gradient` versetzt | organische Wölbung |

> Engere Auswahl: A vs. G. Die übrigen Formen live testbar in `curve-variants.html`
> (F · Gerader Fade wurde entfernt). Umgesetzt über `<body data-curve="A|C|G">`
> + scoped CSS in `css/styles.css`.

## Landing-Page-Baukasten (`bausteine/`)

Wiederverwendbare Sektionen zum Zusammenstellen eigener Landing Pages.
Prinzip: **Markup + zugehörigen `<style>`-Block kopieren, fertig.**

- Jeder Baustein ist eine `<section class="bs-…" data-theme="light|dark">` und
  liest nur die Flächen-Tokens aus `bausteine/css/base.css` (`--bg`, `--fg`,
  `--line`, …) → **jeder Block funktioniert hell UND dunkel**.
- Scroll-Animationen deklarativ per Attribut: `data-reveal` (`left|right|zoom|spring`),
  `data-stagger`, `data-reveal-delay`, `data-count-to`, `data-marquee`,
  `data-parallax` — `bausteine/js/base.js` erledigt den Rest.
- `prefers-reduced-motion` wird global respektiert; Motion (CDN) ist optional.
- Rechtsseiten-Vorlagen (Impressum/Datenschutz) mit gelb markierten
  `[Platzhaltern]` — vor Veröffentlichung prüfen lassen, keine Rechtsberatung.

## Tech-Stack des Originals (Kurzfassung)

**Astro 5** · **Tailwind CSS v4** · **DaisyUI** · **Lucide-Icons** ·
Fonts **Bricolage Grotesque** + **Figtree** · Primärfarbe `#394DFE` ·
Dunkelton `#0D033B`.

> Hinweis: Kundenlogos im Nachbau sind generische Platzhalter; die Hero-Montage
> ist mit eigenen CSS-Karten nachgebaut (statt des Original-PNGs). Reine
> Studien-/Demo-Zwecke — Original: https://openreplay.com
