# OpenReplay-Landingpage — Technische & gestalterische Analyse

> Analyse von **openreplay.com** (Stand Juni 2026) + Plain-HTML/CSS/JS-Nachbau.
> Erstellt aus Live-DOM-Inspektion (Chrome DevTools), Asset-Download und einer
> parallelen Firecrawl-Analyse aller 27 Marketing-Seiten.

---

## 0. TL;DR — Die wichtigsten Erkenntnisse

| Aspekt | Befund |
|---|---|
| **Framework** | **Astro 5.18.1** (Static Site Generator, Islands-Architektur) |
| **CSS** | **Tailwind CSS v4** (oklch-Palette, Arbitrary Values) + **DaisyUI** (Komponenten-Layer) |
| **Icons** | **Lucide** (SVG-Inline) |
| **Display-Font** | **Bricolage Grotesque** (charakteristische, leicht „wonky" Grotesk) |
| **Body-Font** | **Figtree** (Barlow als Fallback) |
| **Primärfarbe** | `#394DFE` (Electric Blue) für alle CTAs |
| **Dunkelton** | `#0D033B` (Deep Indigo) für Hero, Bänder, Footer-CTA |
| **Hero-Effekt** | **Ein einziges 6300×2044px-PNG** aus echten App-Screenshots, per `background-position` 60 s langsam diagonal verschoben, diagonal geclippt + Dot-Pattern-Overlay |
| **Analytics/Tools** | HubSpot, Google Tag Manager/gtag, Ahrefs, Crisp-Chat, reb2b — **und OpenReplay selbst** (Dogfooding) |

---

## 1. Der Hero-Animationseffekt — wie er gemacht ist  ⭐

Das ist der visuell auffälligste Teil der Seite und der Kern der Fragestellung.
Die „Animation rechts" sieht aus wie eine lebendige, langsam treibende Wand aus
App-Screenshots. Technisch ist sie **erstaunlich simpel** — kein Video, kein
Canvas, kein WebGL, keine JS-Animation.

### 1.1 Der Aufbau (zwei verschachtelte `<div>`s)

```html
<!-- Äußerer Container: positioniert, diagonal geclippt, getönt, Dot-Pattern -->
<div class="hidden lg:block absolute top-0 right-0 h-full w-full lg:w-1/2
            clip-polygon overflow-hidden bg-indigo-500/40 dot-pattern">

  <!-- Innerer Layer: EIN großes Composite-PNG, das animiert wird -->
  <div class="w-full h-full animate-slide"
       style="background-image:url(/backgrounds/hero-screenshot.png);
              background-size:auto 100%;
              background-repeat:repeat-x">
  </div>
</div>
```

### 1.2 Die eigentliche Animation

```css
.animate-slide { animation: 60s linear 0s infinite normal slideBackground; }

@keyframes slideBackground {
  0%   { background-position: 0px 0px; }
  100% { background-position: 100% 100%; }
}
```

**Das Prinzip:**
1. Es gibt **ein einziges Bild**: `/backgrounds/hero-screenshot.png`,
   **6300 × 2044 px** (≈ 1 MB). Es ist eine **Collage echter Produkt-Panels**
   — Charts („Most Visited Guides", „Performance", „Deployments"),
   ein Session-Replay-Player mit Maus-Cursor, ein Conversion-Funnel, eine
   Heatmap-Ansicht, ein Donut-Chart („User Environment"), eine Console usw.,
   lose in einem Raster angeordnet und als **ein** PNG exportiert.
2. `background-size: auto 100%` skaliert das Bild auf volle Container-Höhe
   (Breite proportional → ~2200 px breit im 720-px-Container).
3. `background-repeat: repeat-x` kachelt es horizontal → **nahtlose Endlosschleife**.
4. Die Animation schiebt nur die `background-position` von `0 0` nach `100% 100%`
   über 60 s linear, unendlich → das Bild **driftet langsam diagonal**. Weil es
   gekachelt ist, gibt es keinen sichtbaren „Sprung".

### 1.3 Die Verpackung (was es edel macht)

- **Weicher Verlaufsschleier (DER Kanten-Effekt):** Über der linken Hälfte der
  Montage liegt ein eigenes Kind-`<div>`:
  ```html
  <div class="absolute bottom-0 left-0 h-full w-1/2
              bg-gradient-to-r from-[#3b2b86] to-white/0 z-20"></div>
  ```
  also `linear-gradient(to right, #3b2b86 0%, transparent 100%)` — ein
  gedämpftes Indigo-Violett, das nach rechts ausläuft. Dadurch **lösen sich die
  Screenshots weich (in einer sanften Kurve) ins dunkle Hero auf**. Das ist der
  „Farbverlauf, der übergeht".
- **Achtung — kein Clip:** Die Klasse `clip-polygon` am Container ist faktisch
  **leer** (`clip-path: none` im Computed Style); der Container ist ein simples
  Rechteck mit `overflow-hidden`. Die organisch-gekurvte Kante entsteht **allein
  durch den Verlaufsschleier** plus die unterschiedlich weit links sitzenden
  Karten dahinter — **nicht** durch eine diagonale Schnittkante. (Genau diese
  Fehlannahme — vom Klassennamen auf eine echte Polygon-Diagonale zu schließen —
  war der Grund, warum die erste Nachbau-Version eine harte Diagonale statt des
  weichen Verlaufs hatte.)
- **`bg-indigo-500/40`** — eine 40 % indigofarbene Tönung legt sich über die
  Screenshots und bindet sie an die Markenfarbe.
- **`dot-pattern`** — `background-image: url(/patterns/dot-pattern.png)` (ein
  40×40-px-Tile) mit `background-size: 1.5%` legt ein feines Punkteraster darüber.
- Zusätzlich ein **feTurbulence-Noise-SVG** als Grain-Overlay und ein
  Verlauf von `#0D033B` nach transparent links, der die Screenshots weich in
  den dunklen Hero übergehen lässt.
- Der **handgezeichnete Pfeil/Cursor** in der Mitte ist Teil des PNGs bzw. eine
  separate SVG-Deko — er suggeriert „echte Nutzung".

### 1.4 Warum dieser Ansatz clever ist

- **Performance:** Eine statische CSS-Animation auf `background-position` läuft
  GPU-nah, ohne Reflows, ohne JS-Mainthread-Last. Ein Bild, ein Layer.
- **Wartbarkeit:** Neues Produkt-UI = neues PNG exportieren, fertig. Kein Code.
- **Wirkung:** Suggeriert ein „lebendiges Dashboard", ohne ein echtes,
  interaktives Embed (das langsam/fragil wäre) laden zu müssen.

> **Im Nachbau** habe ich diesen Effekt bewusst **in Plain HTML/CSS** rekonstruiert,
> aber einen Schritt weiter gedacht: Statt eines PNGs baue ich die Dashboard-Karten
> als **echte HTML/CSS-Elemente** (Charts via SVG/`conic-gradient`/CSS-Bars) in
> einem Track, der per `@keyframes drift` (`transform: translate3d`) langsam
> diagonal treibt — mit weicher Kante via `mask-image` (elliptischer
> Radialverlauf) **plus dem `#3b2b86`→transparent-Verlaufsschleier** des Originals,
> Indigo-Tönung, Dot-Pattern (`radial-gradient`) und seitlichem Fade. Gleiches
> Ergebnis, ohne Fremd-Asset, und es demonstriert die Technik vollständig in Plain Code.

### 1.5 Der zweite Animationstyp: der Logo-Ticker

Direkt unter dem Hero läuft die „Trusted by"-Logowand als **Marquee**:

```css
.ticker-track { animation: ticker var(--animationDuration) linear infinite;
                width: max-content; }
@keyframes ticker { 0% { transform: translate(0); }
                    100% { transform: translate(-50%); } }
```

Die Logos werden im DOM **doppelt** ausgegeben; der Track ist dadurch 200 % breit,
und `translateX(-50%)` ergibt eine **nahtlose Endlosschleife**. `data-pause-on-hover`
pausiert via `animation-play-state: paused`. Die Logos sind SVGs mit
`invert brightness-0 contrast-200 opacity-50` (monochrom-weiß) und
`hover:grayscale-0` (Farbe bei Hover). **Beide Techniken** (Marquee + dupliziertes
Set) habe ich im Nachbau 1:1 übernommen.

---

## 2. Technologischer Aufbau

### 2.1 Framework & Rendering
- **Astro 5.18.1** (`<meta name="generator" content="Astro v5.18.1">`). Erkennbar
  an den `data-astro-cid-*`-Attributen (Astros scoped-styles-Mechanismus). Astro
  rendert die Seiten **statisch zu HTML** und hydratisiert nur einzelne „Islands"
  (Nav-Dropdowns, Tabs, Pricing-Kalkulator) — daher die sehr schnelle Auslieferung.
- **Kein** React/Vue/Svelte/Next/Gatsby auf der Seite (alle entsprechenden
  Root-Marker fehlen). Die Interaktivität ist gezielt minimal.

### 2.2 Styling-Schicht
- **Tailwind CSS v4** — erkennbar an der **oklch-basierten Farbpalette**
  (`--color-indigo-500: oklch(58.5% .233 277.117)`, ~150 CSS-Custom-Properties im
  `:root`), an Arbitrary Values (`bg-[#0D033B]`, `w-1/2`, `lg:block`) und an den
  v4-Tokens (`--radius-box`, `--ease-in-out`).
- **DaisyUI** als Komponenten-Layer obendrauf — die Buttons sind
  `btn btn-lg btn-primary` / `btn-outline`, und es existieren DaisyUI-Tokens
  (`--color-base-100`, `--color-primary: #394dfe`, `--radius-field`, `--radius-selector`).
- **Custom-CSS** nur für die Spezialeffekte (`slideBackground`, `ticker`,
  `clip-polygon`, `dot-pattern`).

### 2.3 Icons & Assets
- **Lucide**-Icons inline als SVG (`lucide lucide-download`, `lucide-cloud-lightning` …).
- Kunden-Logos als einzelne SVGs unter `/clients/client-*.svg`.
- Hero-Composite unter `/backgrounds/hero-screenshot.png`, Texturen unter `/patterns/`.

### 2.4 Fonts
- **Bricolage Grotesque** (Display/H1–H3) — eine charakterstarke, leicht
  unregelmäßige Grotesk, die der Marke ihren wiedererkennbaren Look gibt.
  H1: `font-size: 60px`, `font-weight: 700`.
- **Figtree** (Body), Fallback-Kette `Roboto, system-ui, -apple-system, …`.

### 2.5 Third-Party / Tracking (aus den geladenen Scripts)
- **HubSpot** (Analytics, Collected Forms, Banner/Cookie-Consent) — `hs-*`-Skripte.
- **Google Tag Manager** (`GTM-MHTG7B5`) + **gtag** (`G-9Q0H5VPREV`).
- **Ahrefs Analytics**.
- **Crisp Chat** (`client.crisp.chat`) — das Chat-Widget unten rechts.
- **reb2b** (B2B-Visitor-De-Anonymisierung).
- **OpenReplay selbst** (`OpenReplay.astro_*`) — sie tracken ihre eigene Seite mit
  ihrem eigenen Produkt (Dogfooding).

---

## 3. Design-System

### 3.1 Farben (rekonstruiert)
| Rolle | Wert |
|---|---|
| Primary (CTA) | `#394DFE` Electric Blue |
| Deep Indigo (Hero/Bänder/Footer-CTA) | `#0D033B` |
| Accent Violet | ~`oklch(60% .25 293)` / `#6f5bff` |
| Success/Teal | Teal-/Grün-Töne in Funnel-Bars, Co-Browsing |
| Error/Coral | Rot/Coral in „Drop"/„Skipped"-Stats |
| Flächen | Weiß auf hellgrauem Seiten-BG (`oklch(95–98%)`) |

Strategie: **Dunkle Anker-Flächen** (Hero, Security-Band, Closing-CTA, Footer-Top)
setzen rhythmische Kontraste in einer ansonsten hellen, luftigen Seite. Akzente
sparsam, aber kräftig (Blau dominiert die CTAs, niemals „timide" verteilt).

### 3.2 Typografie-Hierarchie
- **Hero-/Section-Headlines:** kurze, **nutzenorientierte** Aussagen, oft im
  Imperativ/2. Person („Relive exactly what users experienced", „Answers, without
  the guesswork"). Self-Hosting wird im H1 mitgeführt.
- **Frage-Headlines** in Use-Case-Sektionen („Where are users focusing their
  attention?").
- **Drei-Wort-Kadenzen** für Capability-Frameworks („Observe / Debug / Resolve",
  „Spot it / Record it / Report it").

### 3.3 Buttons / CTAs
- **Pill-Form** (`border-radius: 32px`), `font-weight: 600`, `font-size: 18px`.
- **Duales Primärpaar „Self-Host" vs. „Try Cloud"** auf fast jeder Seite — spiegelt
  die Open-Source-+-Cloud-Positionierung. Wird in Hero **und** Closing-Band wiederholt.
- Kontext-CTAs: Enterprise → „Chat with Sales"/„Request a demo"; Spot → „Add to
  Chrome"; Resources → „Download E-Book".

### 3.4 Wiederkehrende Section-Archetypen
1. **Hero** — H1 + dualer CTA + Produktvisual + Gradient-Akzent.
2. **Logo-Wall / Trust-Bar** — graustufige Enterprise-Logos (Amazon, Uber, NVIDIA,
   Mercedes, LG, ASUS, Tekion, Zscaler, Deel), als Marquee.
3. **Capability-Triade** — Drei-Spalten-Framework.
4. **Feature-Split** — alternierende Copy/Visual-Blöcke, oft mit **Tabbed Interface**
   (z. B. Session Replay / Errors / Network activity / Summary AI).
5. **Security-/Dark-Band** — „Built for data security & privacy".
6. **Enterprise-Testimonial** — Zitat-Card (Gilad Novik, VP R&D @ Deel:
   *„We went from spending hours debugging some production issues down to minutes."*).
7. **Community/Open-Source-Block** — „Great products are built together".
8. **Blog-Cards** — „Popular reads from our blog" (4 Karten).
9. **Closing-CTA-Band** — „Iterate on your digital experience" (spiegelt Hero).
10. **Footer** — 5 Spalten + Top-Bar (GitHub-Stars, Buttons) + SOC-2-Badge.

### 3.5 Produkt-Mockups als Visual Proof
Auffällig: Die Produkt-„Screenshots" in den Feature-Splits sind **keine Bilder**,
sondern **echte, interaktive HTML/CSS-Mockups** mit Tab-Switching (Pills wie
„Funnels / User Journeys / Trends / Heatmaps"). Das hält sie scharf (kein
Pixel-Blur), klein (kein PNG-Gewicht) und lebendig. Genau dieses Pattern habe ich
im Nachbau für alle drei Splits umgesetzt.

---

## 4. Informationsarchitektur (27 Seiten)

Vier Navigationsachsen → **was** (Product), **für wen** (Solutions: Teams + Size),
**wie lernen/vergleichen** (Resources + Compare), plus **Pricing** als Top-Level.

**Sechs Seitentyp-Templates:**
- **Feature-Seite** (`/product/feature/*`) — striktestes Template: Outcome-Headline →
  3 Benefit-Kacheln (eine fast immer „Full data control") → Feature-Suite
  (alternierende Splits) → Frage-Use-Case → Deployment-Hinweis → FAQ → Closing-CTA.
- **Core-Product-Seite** (`/product/core/*`) — Bündel mehrerer Features; hebt sich
  durch **Kundenlogos + Testimonial** ab.
- **Solution-Seite** (`/solutions/teams/*`) — Persona-Narrativ (Observe/Analyze/
  Prioritize) + „Built for these moments"-Grid + „It takes a team"-Cross-Sell.
- **Comparison-Seite** (`/compare/*`) — Versus-Headline → Feature-Vergleichstabelle
  (Check/Cross/„Limited") → Side-by-Side-Pricing → Differenzierungs-Spotlights.
- **Enterprise/Size-Seite** — Self-Host-Codeblock → Data-Flow-Diagramm (Browser →
  eigene VPC) → Security-Tabelle → Sales-CTA.
- **Resource/Tool-Seite** — Long-Form-Guide (Sticky-TOC), Changelog, Tool-Directory
  (SEO-Top-of-Funnel).

**Pricing:** „One platform. Three ways to deploy." — Self-Hosted / Dedicated
(ab $199/mo, mit interaktivem Region-/Cloud-/Instanz-Kalkulator) / Serverless,
plus aufklappbare Feature-Vergleichstabelle und FAQ.

---

## 5. Messaging & Positionierung

- **Daten-Souveränität als Leitmotiv:** Self-Hosting / „Full data control" / „Own
  your infrastructure" auf praktisch jeder Seite. Verdichtung auf der
  Enterprise-Seite: *„Your users. Your data. Your infrastructure."* + Beweis-Claim
  *„0 bytes sent anywhere else"* / *„One hop. Browser to your VPC."*
- **Eine Plattform statt Tool-Stack:** Session Replay + Product Analytics +
  Co-Browsing + DevTools vereint („Simplify your tech stack").
- **Vom Beobachten zum Handeln:** „Observe → measure → iterate".
- **Open Source als Vertrauensanker:** 12k GitHub-Stars als Dauer-Badge, „Join
  Community" als Standard-CTA.
- **Tonalität:** Benefit- statt feature-getrieben, direkt/du-orientiert
  („your users, your app"), auf Compare-Seiten zugespitzt-kämpferisch, auf der
  Enterprise-Seite nüchtern-technisch („Built to pass your security review").

---

## 6. Seiten-Inventar (Screenshots im `/screenshots`-Ordner)

| Datei | Seite |
|---|---|
| `01-home-hero*.png`, `02-home-fullpage.png` | Startseite (Hero + komplett) |
| `02b/02c-home-feature-split-*.png` | Feature-Splits Detail |
| `02d-home-cta-footer.png` | CTA-Band + Footer |
| `03-pricing.png` | Pricing („Three ways to deploy") |
| `04–11-feature-*.png` | Session Replay, DevTools, Heatmaps, Funnels, Co-Browsing, Journey, Web Analytics, Mobile |
| `12-13-core-*.png` | Product Analytics, Digital Experience |
| `14-15-platform-*.png` | Spot, Integrations & API |
| `16-compare-logrocket.png` | Vergleichsseite |
| `17-solution-engineering.png`, `19-solution-enterprise.png` | Solution-Seiten |
| `18-tools.png`, `20-releases.png` | Developer Toolbox, Releases |
| `rebuild-*.png` | Screenshots des Nachbaus |

---

## 7. Der Nachbau (`/index.html`, `/css/styles.css`, `/js/main.js`)

**Vollständig in Plain HTML + Plain CSS + Plain JavaScript**, keine Dependencies
außer den zwei Google-Fonts (Bricolage Grotesque + Figtree). Nachgebaut:

- **Hero** mit weißer Bricolage-Headline, gezeichnetem Unterstrich-Squiggle (SVG,
  `stroke-dashoffset`-Draw-Animation), dualem CTA und der **driftenden
  Dashboard-Montage** (echte CSS/SVG-Karten, diagonal geclippt, Indigo-Tönung,
  Dot-Pattern, Fade).
- **Logo-Ticker** als nahtloser Marquee (dupliziertes Set, Pause-on-Hover).
- **Drei Feature-Splits** mit interaktiven Produkt-Mockups (Session-Replay-Player,
  Conversion-Funnel, Co-Browsing mit Dual-Cursor) + **Pill-Tab-Switching**.
- **Security-Dark-Band**, **Enterprise-Testimonial** (echtes Deel-Zitat),
  **Community-Orbit**, **Blog-Cards**, **Closing-CTA-Band**, **5-Spalten-Footer**.
- **Mega-Menü** (Multi-Column, Hover + Klick, Keyboard/Escape), **Mobile-Menü**
  (Burger), **Sticky-Header** mit Scroll-Blur, **Scroll-Reveals**
  (IntersectionObserver), **Smooth-Scroll**.
- **Responsive** (Desktop → Tablet → Mobile) + `prefers-reduced-motion`-Support.

**Unterschiede zum Original (bewusst):**
- Kundenlogos sind generische Wortmarken-Platzhalter (keine Fremd-Trademarks).
- Hero-Montage = eigene CSS-Karten statt des Original-PNGs (zeigt die Technik in Plain Code).
- Keine Tracker/Chat-Widgets, keine echten Unterseiten (nur Anker).
