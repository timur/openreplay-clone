# Bausteine-Ideen — Brainstorming fehlender Landing-Page-Komponenten

> **Status: ALLE 46 KOMPONENTEN UMGESETZT** (Juli 2026) — Sammelseiten: leadgen, kaufentscheidung, vertrauen, social-proof, medien, interaktiv, utility + Seiten-Vorlagen 404/wartung/coming-soon/danke/agb/status. Auch die Querschnitts-Themen sind umgesetzt: grundlagen-seo / grundlagen-a11y / grundlagen-performance / grundlagen-tracking / mobile (+ Formular-Fundament & Snippet-Copy-Muster in base.css/base.js).
>
> Stand: Juli 2026 · erstellt aus vier Blickwinkeln (Conversion, Vertrauen,
> Interaktion, Struktur) + Vollständigkeits-Kritik. Duplikate zusammengelegt:
> **46 Komponenten-Ideen**. Alles auf Plain HTML/CSS/JS (+ Motion per CDN) machbar.

## Top 10 — empfohlene Baureihenfolge

1. **Cookie-Consent-Banner (DSGVO)** — Pflicht für jede deutsche Seite
2. **Onboarding-Versprechen / „In 3 Schritten startklar"** — größte inhaltliche Lücke
3. **Kontakt-Sektion/-Seite** — universeller Conversion-Punkt
4. **Trust- & Compliance-Sektion** (inkl. Badge-Leiste) — DACH-B2B-Kaufentscheider
5. **Kundenlogo-Wall** (statische Varianten) — Standard-Social-Proof
6. **Integrations-Grid/-Wand** (Filter optional) — häufigste SaaS-Einwandbehandlung
7. **Video-Showcase** — ersetzt lange Feature-Texte
8. **Garantie- & Risk-Reversal-Band** — klein, große Conversion-Wirkung vor Preisen
9. **404- & Wartungsseite** — komplettiert das Seiten-Set
10. **Danke-/Bestätigungsseite** — Voraussetzung für alle Formular-Bausteine

Knapp dahinter: Lead-Magnet-Formular, Use-Case-Tabs, Sticky-Conversion-Leiste, AGB-Vorlage.

## Querschnitts-Themen (gelten für ALLE Bausteine, vom Kritiker ergänzt) — ✅ umgesetzt

- **Barrierefreiheit (a11y):** Skip-Link, sichtbare Focus-States, ARIA-Muster für
  Akkordeon/Tabs/Overlays — mit BFSG (seit 2025) auch rechtlich relevant.
- **SEO/Meta:** Open-Graph/Twitter-Cards, JSON-LD (Organization, FAQPage, Product),
  Canonical, Sitemap/robots-Vorlagen.
- **Performance/Medien:** `srcset`/`<picture>`, Lazy-Loading, `font-display`,
  Facade-Pattern für Videos — sonst leiden Core Web Vitals.
- **Formular-Fundament:** wiederverwendbare Validierung, Fehler-/Erfolgs-/Lade-Zustände,
  Honeypot, DSGVO-Checkbox — Basis für Lead-Magnet, Kontakt, Warteliste.
- **Mobile-Conversion:** Sticky-Bottom-CTA in der Daumenzone, Tap-to-Call,
  Tabellen als Karten-Stack.
- **Analytics-Gerüst:** Consent-abhängiges Skript-Laden, CTA-Event-Tracking, UTM-Handling.


## Conversion & Marketing (14)

### Lead-Magnet-Formular (Gated Content)  ·  🔴 hoch

Wandelt anonyme Besucher in Leads, indem ein Download (Whitepaper, Checkliste, Report) gegen die E-Mail-Adresse getauscht wird.

- Split: links Cover-Mockup des PDFs mit Bullet-Nutzen, rechts kompaktes Formular (nur E-Mail)
- Mehrstufiges Formular (2 Steps: E-Mail, dann Rolle/Firmengröße) mit Fortschrittsbalken
- Inline-Banner zwischen zwei Sektionen: einzeilige Eingabe mit Lead-Magnet-Badge
- Karte mit Vorschau-Blur: erste Seite des Dokuments angeschnitten sichtbar, Formular als Overlay

> **Umsetzung:** Reines <form> mit Client-Validierung (required, type=email), Steps per JS-Klassen-Toggle; Success-State ohne Backend als Demo-Zustand einbauen.

### ROI-/Ersparnis-Rechner  ·  🔴 hoch

Macht den Produktnutzen in Euro greifbar und liefert dem Käufer das interne Argument für die Kaufentscheidung.

- Slider-Rechner: 2-3 input[type=range] (Team-Größe, Sessions/Monat) mit live berechneter Jahresersparnis groß rechts
- Vorher/Nachher-Karten: Kosten ohne Tool vs. mit Tool, Differenz als animierter Counter
- Rechner mit CTA-Kopplung: Ergebnis mündet direkt in 'Ergebnis per Mail erhalten'-Feld (Lead-Capture)
- Slider für Sessions/Monat + Teamgröße, große animierte Ergebnis-Zahl darunter
- Zweispaltig: links Eingaben, rechts 'Rechnung' als Beleg-Karte mit Einzelposten
- Plan-Empfehlungs-Rechner: Eingaben highlighten live die passende Preis-Karte

> **Umsetzung:** Berechnung als kleine pure JS-Funktion, Werte über data-Attribute konfigurierbar; Zahlen mit Intl.NumberFormat('de-DE') formatieren.

### Wettbewerber-Vergleich (vs. Competitor)  ·  🔴 hoch

Fängt kaufbereite Besucher in der Evaluationsphase ab und positioniert das Produkt gezielt gegen Alternativen.

- Zweispaltige 'Wir vs. Die'-Tabelle mit Check/Kreuz-Icons und hervorgehobener eigener Spalte
- Multi-Vergleich: 3-4 Wettbewerber-Spalten, eigene Spalte sticky und farblich abgesetzt
- Kategorie-Vergleich als Karten: 'Anders als Session-Replay-Tool X…' mit je einem Differenzierungs-Claim
- Migrations-Teaser: Vergleich plus 'Wechsel in 1 Tag'-Badge und Import-Versprechen

> **Umsetzung:** Unterscheidet sich von der vorhandenen Preis-Vergleichstabelle (eigene Pläne); Tabelle in overflow-x-Container für Mobile.

### Demo-/Webinar-Buchung  ·  🔴 hoch

Senkt die Hürde für High-Touch-Conversion, indem Besucher direkt einen Termin oder Webinar-Platz wählen können.

- Split: links Nutzen der Demo (15 Min, kein Sales-Pitch, konkrete Agenda), rechts statischer Slot-Picker (Tage/Uhrzeiten als Buttons)
- Webinar-Karte mit Datum, Speaker-Avataren, Restplatz-Anzeige und Anmeldeformular
- Zweiwege-CTA: 'Selbst testen' vs. 'Demo buchen' als gleichwertige Karten mit Entscheidungshilfe ('Für Teams ab 10…')

> **Umsetzung:** Slot-Picker als reine UI-Demo (Buttons mit selected-State); Platzhalter-Kommentar für spätere Cal.com/Calendly-Einbettung.

### Garantie- & Risk-Reversal-Band  ·  🔴 hoch

Entkräftet das Kaufrisiko unmittelbar vor der Entscheidung (Geld-zurück, kostenlos testen, jederzeit kündbar).

- Drei-Siegel-Band: '30 Tage Geld-zurück', 'Keine Kreditkarte nötig', 'Monatlich kündbar' mit Icons
- Großes Garantie-Siegel (SVG-Badge) mit kurzem Garantietext und Unterschrift des Gründers
- Als Ergänzung unter Preiskarten: schmale Zeile mit Garantie-Hinweis direkt am Kauf-Button
- Drei Garantie-Karten mit Siegel-Icons: "14 Tage kostenlos", "Keine Kreditkarte", "Monatlich kündbar"
- Schmales Band mit rundem Geld-zurück-Siegel (SVG mit gebogenem Text) links und Klartext rechts
- Häkchen-Checkliste als direkte Ergänzung unter den vorhandenen CTA-Varianten

> **Umsetzung:** Direkt unterhalb der Preise-Sektion platzierbar; Siegel als Inline-SVG, keine externen Assets.

### Trust- & Compliance-Sektion  ·  🔴 hoch

Behandelt den im DACH-Raum entscheidenden Einwand Datenschutz/Sicherheit vor der Kaufentscheidung.

- Badge-Grid: DSGVO-konform, EU-Hosting, ISO 27001, SSO/2FA als Icon-Karten mit 1-Satz-Erklärung
- Split: links 'Deine Daten bleiben in der EU'-Claim mit Karte/Illustration, rechts Compliance-Liste
- Kompakte Trust-Leiste (einzeilig) zur Wiederverwendung unter Hero oder Formularen
- Schlanke Badge-Reihe direkt unter dem Hero oder über dem Footer (monochrom, dezent)
- Badge-Karten mit Klartext-Erklärung: was das Siegel konkret bedeutet
- Kompakte Trust-Zeile unter jedem CTA-Button ("DSGVO-konform · Server in DE · SSL")
- Icon-Liste in zwei Spalten: 6 Sicherheitsversprechen mit je einem Satz
- Dunkle 'Vault'-Karte mit Schloss-Visual und aufklappbaren Detail-Punkten
- Split: links Erklärtext, rechts Karten-Stack mit AVV-, Whitepaper- und Status-Page-Links

> **Umsetzung:** Für ein OpenReplay-artiges Produkt (Session-Replay!) ist Datenschutz der Einwand Nr. 1 — Sektion sollte auf Datenschutzseite verlinken.

### Onboarding-Versprechen / 'In 3 Schritten startklar'  ·  🔴 hoch

Nimmt die Angst vor Implementierungsaufwand, indem der Weg zum ersten Erfolgsmoment konkret und kurz gezeigt wird.

- Nummerierte Steps horizontal (1 Snippet einbauen, 2 Session ansehen, 3 Bug fixen) mit Zeitangaben ('unter 5 Minuten')
- Vertikale Timeline mit Code-Snippet im ersten Step und Copy-Button
- Tab-Stepper: pro Schritt ein Screenshot/Terminal-Mockup, Fortschritt per Klick
- Tag-1/Woche-1/Monat-1-Zeitstrahl: was das Team wann erreicht hat

> **Umsetzung:** Copy-to-Clipboard per navigator.clipboard; passt gut direkt nach den Features.

### Exit-Intent-Overlay  ·  🟡 mittel

Fängt abspringende Besucher mit einem letzten Angebot (Lead-Magnet, Rabatt, Demo) ab, bevor sie die Seite verlassen.

- Zentriertes Modal mit einem einzigen Angebot und E-Mail-Feld
- Dezente Slide-in-Karte unten rechts statt Vollbild-Modal (weniger aggressiv)
- Zwei-Wege-Exit: 'Noch nicht überzeugt?' mit Auswahl 'Zu teuer' / 'Brauche mehr Infos' und je passender Antwort

> **Umsetzung:** mouseleave am document (clientY < 0) als Trigger, Frequency-Capping über localStorage, ESC/Backdrop schließt; auf Mobile stattdessen Scroll-up-Trigger oder deaktivieren.

### Sticky-Conversion-Leiste  ·  🟡 mittel

Hält den primären CTA permanent erreichbar, sobald der Hero aus dem Viewport gescrollt ist.

- Schmale Top-Bar mit Produktname, Mini-Claim und CTA-Button, erscheint nach dem Hero
- Mobile Bottom-Bar mit CTA in Daumenreichweite (safe-area-inset beachten)
- Kontextsensitiv: Button-Text wechselt je Sektion (bei Preisen 'Plan wählen', bei FAQ 'Demo buchen')

> **Umsetzung:** IntersectionObserver auf den Hero als Trigger; Muster mit vorhandener Scrollspy-Nav abstimmen, damit sich nichts doppelt.

### Einwand-Sektion / 'Für wen ist das (nicht)?'  ·  🟡 mittel

Behandelt typische Kaufeinwände offensiv und qualifiziert gleichzeitig die richtigen Kunden vor.

- Zwei Spalten: 'Perfekt für dich, wenn…' vs. 'Eher nichts für dich, wenn…' mit Check/Kreuz-Listen
- Mythos/Fakt-Karten: 'Session-Replay ist DSGVO-Problem' → Entkräftung in 2 Sätzen
- Einwand-Akkordeon mit Sales-Antworten ('Zu teuer?', 'Haben wir schon ein Tool…') — bewusst zugespitzter als das neutrale FAQ

> **Umsetzung:** Kann Akkordeon-JS des FAQ-Bausteins wiederverwenden, aber mit eigenem, konfrontativerem Copy-Ton.

### Plan-Finder / Bedarfs-Quiz  ·  🟡 mittel

Führt Unentschlossene interaktiv in 2-3 Fragen zum passenden Plan oder CTA und reduziert Entscheidungslähmung.

- 3-Fragen-Stepper (Teamgröße, Self-Host vs. Cloud, Budget) mit Empfehlungs-Karte am Ende
- Ein-Frage-Weiche: 'Was beschreibt dich am besten?' mit 3 Persona-Karten, die zu unterschiedlichen CTAs führen
- Ergebnis mit Lead-Capture koppeln: 'Empfehlung + Vergleich als PDF per Mail'

> **Umsetzung:** State als simples JS-Objekt, Screens per hidden-Klasse; Empfehlungslogik als konfigurierbare Mapping-Tabelle.

### Dringlichkeits-Band mit Countdown  ·  🟡 mittel

Erzeugt einen konkreten Handlungszeitpunkt durch befristete Angebote, Launch-Deadlines oder limitierte Kontingente.

- Countdown-Leiste (Tage/Std/Min/Sek) mit Angebots-Claim, oben oder über der Preis-Sektion
- Kontingent-Anzeige: 'Noch 14 von 50 Early-Access-Plätzen' mit Fortschrittsbalken
- Deadline-Karte in der Preise-Sektion: durchgestrichener Preis, Aktionspreis, Enddatum

> **Umsetzung:** Zieldatum als data-deadline-Attribut, setInterval-Update; abgelaufener Zustand definieren (Band ausblenden), keine Fake-Timer per Zufall.

### Integrations-Grid  ·  ⚪ niedrig

Räumt den Einwand 'passt nicht in unseren Stack' aus, indem Anbindungen an bekannte Tools gezeigt werden.

- Logo-Grid (Slack, Jira, GitHub, Sentry…) mit Hover-Tooltip zur jeweiligen Integration
- Kategorisierte Tabs: Issue-Tracking / Messaging / Analytics mit je eigenem Logo-Set
- Hub-Diagramm: Produkt-Logo mittig, Integrationen kreisförmig mit SVG-Verbindungslinien
- Logo-Kachel-Grid mit Kategorie-Filter-Pills (Analytics, Support, CI/CD …), Kacheln blenden animiert um
- Such-Eingabe filtert live, Treffer-Highlight im Namen
- Hub-and-Spoke-Grafik: Produkt-Logo in der Mitte, Integrationen kreisförmig mit animierten Verbindungslinien
- Logo-Grid (6-8 Spalten) mit Hover-Tooltip pro Integration und 'Alle ansehen'-Link
- Filterbares Grid mit Kategorie-Pills (Analytics, Support, Dev-Tools) — Filter per JS-Klassen-Toggle
- Orbit-Darstellung: Produktlogo in der Mitte, Integrations-Logos kreisen auf CSS-Animations-Bahnen darum
- Zwei gegenlaeufige Logo-Marquee-Reihen (Ergaenzung zum bestehenden Testimonial-Marquee, aber mit Integrations-Logos + Ueberschrift)

> **Umsetzung:** Logos als Inline-SVG-Platzhalter (CSP/offline-sicher); ergänzt den vorhandenen Logo-Marquee (Kundenlogos) um Tool-Logos — anderer Zweck.

### Vorher/Nachher-Beweis  ·  ⚪ niedrig

Zeigt das Ergebnisversprechen visuell als direkten Kontrast und stützt so die Kaufentscheidung mit Evidenz.

- Slider-Vergleich: zwei übereinanderliegende Screenshots mit ziehbarem Trenner (Bug-Chaos vs. klare Session-Timeline)
- Kennzahlen-Kontrast: 'Vorher 3 Tage Bug-Suche / Nachher 20 Minuten' als zwei große Zahlenkarten
- Workflow-Vergleich: alter Prozess als graue durchgestrichene Schrittkette, neuer Prozess farbig darunter
- Bild-Slider mit ziehbarem Griff (zwei Screenshots übereinander, clip-path folgt dem Regler)
- Zwei-Spalten-Kontrast: linke Karte rot getönt (Probleme als Kreuz-Liste), rechte grün (Lösungen als Häkchen-Liste)
- Kennzahlen-Vergleich: "Vorher 4 h Debugging → Nachher 20 min" als Tabellen-Band mit Pfeil-Animation
- Klassischer Drag-Slider mit vertikaler Trennlinie und Griff
- Toggle-Buttons 'Vorher / Nachher' mit Crossfade statt Drag
- Hover-Variante: Mausposition steuert die Trennlinie, auf Touch fällt sie auf Drag zurück

> **Umsetzung:** Trenner-Slider mit input[type=range] + clip-path umsetzbar, kein externes Script nötig.


## Vertrauen & Social Proof (10)

### Team-Sektion "Die Menschen dahinter"  ·  🔴 hoch

Zeigt echte Gesichter hinter dem Produkt und baut damit die stärkste Form von Grundvertrauen auf, besonders bei unbekannten Marken.

- Foto-Grid mit Name, Rolle und einem persönlichen Ein-Satz-Fakt pro Person
- Hover-Karten: Foto kippt/dreht zu Kurz-Bio mit GitHub/LinkedIn-Links
- Ein großes Teamfoto mit interaktiven Hotspots (Tooltip pro Person)
- "Wer antwortet dir"-Reihe: nur 3-4 Kernpersonen groß, statt alle klein

> **Umsetzung:** Platzhalter-Avatare als inline-SVG mit Initialen generieren, damit der Baukasten ohne echte Fotos funktioniert; Hover-Flip rein mit CSS transform + backface-visibility.

### Bewertungs-Widget im G2/Trustpilot-Stil  ·  🔴 hoch

Aggregierte Sternebewertungen wirken als unabhängiger Dritt-Beweis stärker als selbst kuratierte Testimonials.

- Rating-Karte: große Durchschnittsnote, Sterne, Balken-Verteilung 5→1 Sterne
- Badge-Cluster im G2-Medaillen-Look ("Leader Herbst 2026", "Best Support")
- Zwei Plattform-Karten nebeneinander (G2 + Trustpilot-Stil) mit je einem Top-Zitat
- Inline-Variante: Sterne + "4,8/5 aus 312 Bewertungen" als Ein-Zeilen-Snippet für Hero/CTA

> **Umsetzung:** Sterne als SVG mit clip-path für Teilfüllung (4,8 Sterne); Balken-Verteilung animiert mit den vorhandenen Counter-/Stagger-Mustern.

### Kundenlogo-Wall (statische Varianten)  ·  🔴 hoch

Ergänzt den vorhandenen Marquee um ruhige, scanbare Logo-Darstellungen mit Kontext — wer nutzt das Produkt und in welcher Größenordnung.

- Logo-Grid 4x3 mit Zeile "Über 500 Teams vertrauen uns" darüber
- Branchen-Tabs: Logos gefiltert nach E-Commerce / SaaS / Agenturen
- Logo-Grid mit Hover-Tooltip: Mini-Zitat oder Kennzahl pro Kunde

> **Umsetzung:** Platzhalter-Logos als Text-Wortmarken in verschiedenen Fonts generieren, damit das Grid ohne echte Assets glaubwürdig aussieht.

### Gründer-Note mit Unterschrift  ·  🟡 mittel

Ein persönlicher Brief des Gründers erklärt das Warum des Produkts und wirkt glaubwürdiger als jede Marketing-Formulierung.

- Brief-Optik: leicht getönte Papier-Karte, Serifenschrift, handschriftliche SVG-Unterschrift
- Split: Portraitfoto links, kurzer Text mit Signatur rechts
- Video-Botschaft-Platzhalter mit Play-Overlay und Zitat als Fallback-Text

> **Umsetzung:** Unterschrift als SVG-Pfad mit stroke-dashoffset-Animation beim Scroll-Reveal 'schreiben' lassen — nutzt das vorhandene Reveal-System.

### Presse-Sektion "Bekannt aus"  ·  🟡 mittel

Medienlogos leihen der Marke Autorität etablierter Publikationen und funktionieren auch ohne einzelnen Kunden-Beweis.

- Monochrome Logo-Zeile mit Label "Bekannt aus" (statisch, ausgegraut, Hover farbig)
- Pressezitat-Karussell: Logo + ein prägnanter Satz aus dem Artikel, verlinkt
- "Featured"-Band: ein großes Pressezitat mit Publikationslogo als Absender

> **Umsetzung:** Abgrenzung zum vorhandenen Logo-Marquee: hier statisch und mit Zitat-Kontext statt Laufband.

### Auszeichnungen & Awards  ·  🟡 mittel

Preise und Platzierungen (Product Hunt, Design-Awards, Rankings) belegen externe Anerkennung über Kundenmeinungen hinaus.

- Medaillen-Reihe: 3-5 Award-Badges mit Lorbeer-SVG, Titel und Jahr
- Award-Timeline: chronologische Leiste der Meilensteine und Auszeichnungen
- Eine hervorgehobene Award-Karte ("#1 Product of the Day") mit Kontext-Satz

> **Umsetzung:** Lorbeerkranz einmal als wiederverwendbares SVG-Symbol (<symbol>/<use>) anlegen.

### Community-Proof (GitHub/Discord/Downloads)  ·  🟡 mittel

Für Developer-Produkte ersetzt eine lebendige Community klassische Referenzen — Stars, Contributors und Mitglieder sind überprüfbare Zahlen.

- Repo-Karte im GitHub-Look: Stars, Forks, letzter Release, 'Open Source'-Badge
- Avatar-Stack: überlappende Contributor-Avatare + "3.400 Mitglieder im Discord"
- Drei Community-Kacheln (GitHub / Discord / Downloads) mit Counter-Animation

> **Umsetzung:** Abgrenzung zum Zahlen-Band in Features: hier geht es um Community-Kanäle mit Plattform-Optik und Verlinkung, nicht um Produkt-KPIs. Counter-JS aus scroll-animationen wiederverwenden.

### Fallstudien-Grid mit Ergebnis-Kennzahlen  ·  🟡 mittel

Erweitert die vorhandene einzelne Case-Study-Karte zu einer Übersicht, die Breite und Wiederholbarkeit der Erfolge belegt.

- 3er-Grid: Kundenlogo, eine große Ergebnis-Zahl ("-38 % Support-Tickets"), Ein-Satz-Story, Link
- Filterleiste nach Branche/Unternehmensgröße über dem Grid (JS zeigt/versteckt Karten)
- Featured-Layout: eine große Fallstudie links, zwei kompakte rechts gestapelt

### Chat-/Support-Teaser  ·  🟡 mittel

Belegt Erreichbarkeit und Betreuung nach dem Kauf — ein oft übersehener Vertrauensfaktor, gerade gegenüber anonymen US-Tools.

- Karte mit Avatar-Stack des Support-Teams + Kennzahl "Antwort im Schnitt in unter 2 Stunden"
- Split: Chat-Fenster-Mockup mit realistischem Dialog links, Support-Versprechen als Liste rechts
- Kanal-Grid: E-Mail / Chat / Docs / Community mit Reaktionszeit pro Kanal
- Nachgestellter Chat-Verlauf: Bubbles erscheinen nacheinander mit Typing-Indicator (drei hüpfende Punkte)
- Schwebender Chat-Button unten rechts, öffnet Popover-Karte mit Kontaktoptionen (kein echtes Widget)
- Split: links 'Antwortzeit unter 2 h' + Team-Avatare, rechts der animierte Chat-Mock

> **Umsetzung:** Chat-Mockup-Nachrichten mit gestaffelten Reveal-Delays einblenden — wirkt wie eine echte Konversation, nutzt das vorhandene Stagger-Muster.

### Live-Aktivitäts-Hinweise (Social-Proof-Toasts)  ·  ⚪ niedrig

Dezente Echtzeit-Signale ("Team aus München hat gerade gestartet") vermitteln, dass das Produkt aktiv genutzt wird.

- Toast unten links: rotierende Ereignis-Meldungen mit Avatar, ein-/ausblendend alle 8-10 s
- Statische "Diese Woche"-Leiste: "+120 neue Teams · 4.200 Sessions analysiert"
- Puls-Badge im Hero: grüner Live-Punkt + "Gerade 214 Nutzer aktiv"

> **Umsetzung:** Zurückhaltend als opt-in Baustein dokumentieren (kann aufdringlich wirken); Rotation über ein JS-Array mit setTimeout, prefers-reduced-motion respektieren und Toast dann statisch zeigen.


## Interaktion & Medien (10)

### Video-Showcase  ·  🔴 hoch

Zeigt das Produkt in Bewegung und ersetzt lange Feature-Texte durch einen 60-Sekunden-Beweis.

- Großes Poster-Bild mit pulsierendem Play-Button, Klick öffnet Video in Lightbox (dialog-Element)
- Stumm autoplayendes Loop-Video im Browser-Mockup-Rahmen, mit Pause-Button
- YouTube/Vimeo-Facade: erst Thumbnail + Play, iframe wird erst bei Klick nachgeladen
- Video mit Kapitel-Marken darunter, Klick springt via currentTime an die Stelle

> **Umsetzung:** Natives <video> mit poster, muted, playsinline; Lightbox über <dialog>; Facade spart Ladezeit und ist DSGVO-freundlich (kein Third-Party-Request vor Klick); prefers-reduced-motion stoppt Autoplay.

### Interaktive Produkt-Tour mit Hotspots  ·  🔴 hoch

Lässt Besucher das UI selbst erkunden statt nur Screenshots anzusehen — stärkster Aha-Moment vor dem Signup.

- Screenshot mit pulsierenden Hotspot-Punkten, Klick öffnet Tooltip-Karte mit Erklärung
- Geführte Schritt-für-Schritt-Tour (Weiter/Zurück), Spotlight dimmt alles außer dem aktiven Bereich
- Klickbares Fake-UI: Sidebar-Einträge wechseln den sichtbaren Panel-Inhalt (Mini-App aus reinem HTML/CSS)

> **Umsetzung:** Hotspots absolut positioniert in Prozent-Koordinaten über dem Bild (skaliert responsiv mit); Tooltips als Popover-API oder position:absolute; Spotlight per box-shadow: 0 0 0 9999px rgba(0,0,0,.6).

### Use-Case-Tabs mit Media-Wechsel  ·  🔴 hoch

Zeigt mehrere Zielgruppen/Anwendungsfälle in einer Sektion, ohne die Seite zu verlängern.

- Horizontale Tab-Leiste, darunter wechselndes Screenshot-Panel mit Crossfade
- Vertikale Tabs links mit Auto-Rotation (Fortschrittsbalken pro Tab), Visual rechts
- Segmented-Control-Pill (z. B. 'Entwickler / Product / Support') schaltet Text und Bild um

> **Umsetzung:** Buttons mit aria-selected + role=tablist; Auto-Rotation über setInterval, pausiert bei Hover/Fokus und bei prefers-reduced-motion; Crossfade mit CSS opacity-Transition oder Motion.dev animate().

### Screenshot-Galerie / Karussell  ·  🔴 hoch

Präsentiert viele Produktansichten kompakt und macht die Sektion angenehm 'anfassbar'.

- Scroll-Snap-Slider mit Pfeilen und Dot-Navigation
- Thumbnail-Leiste unten, Klick tauscht großes Hauptbild
- Peek-Karussell: Nachbar-Slides ragen angeschnitten rein, aktive Karte leicht skaliert
- Lightbox-Grid: Klick auf Kachel öffnet Vollbild mit Pfeiltasten-Navigation

> **Umsetzung:** Kern ist CSS scroll-snap-type: x mandatory — kein Slider-JS nötig; aktive Dots via IntersectionObserver; Bilder mit loading=lazy und fester aspect-ratio gegen Layout-Shift.

### Code-Beispiel mit Copy-Button  ·  🔴 hoch

Beweist Entwicklern in 10 Sekunden, wie leicht die Integration ist ('2 Zeilen Snippet').

- Snippet-Karte im Terminal-Look mit Copy-Button und 'Kopiert!'-Feedback
- Sprach-Tabs (npm / script-Tag / React / Vue) über demselben Code-Fenster
- Terminal mit Typing-Animation: Install-Befehl tippt sich selbst, dann erscheint Erfolgs-Output
- Zweispaltig: links Code, rechts live das Ergebnis als Mini-Vorschau

> **Umsetzung:** navigator.clipboard.writeText + Button-State-Wechsel; Syntax-Highlighting per Hand mit <span>-Klassen statt Library (Snippets sind statisch); Typing-Effekt mit requestAnimationFrame oder Motion.dev stagger.

### Scrollytelling-Feature-Story  ·  🔴 hoch

Erklärt einen Produkt-Flow in 3-5 Schritten, während das Visual beim Scrollen synchron mitwechselt.

- Sticky-Visual rechts, Text-Schritte scrollen links vorbei und schalten das Bild um
- Sticky-Phone-/Browser-Mockup, dessen Inhalt (Screenshots) pro Schritt austauscht
- Fortschritts-Linie am Rand füllt sich, aktive Schritt-Nummer wird hervorgehoben

> **Umsetzung:** position: sticky + IntersectionObserver auf die Text-Schritte (threshold ~0.5) schaltet data-active um; grenzt an den vorhandenen Sticky-Stapel ab: hier synchronisierter Media-Wechsel, kein Karten-Stapeln.

### Timeline / Roadmap / Changelog  ·  🟡 mittel

Zeigt Momentum und Vertrauenswürdigkeit: das Produkt lebt und hat eine Richtung.

- Vertikale Timeline mit Datums-Punkten, Einträge faden beim Scrollen ein, Linie zeichnet sich mit
- Horizontale Roadmap mit Status-Badges (Geplant / In Arbeit / Live) und Scroll-Snap
- Changelog-Feed: 'Neu'-Badges, Monats-Gruppierung, per <details> aufklappbare Einträge
- Vertikale Timeline mit Versions-Badges (v2.4.0), Datum und Aenderungsliste, Punkte auf einer Linie
- Karten pro Release mit farbigen Tags: Neu (gruen), Verbessert (blau), Fix (orange)
- Kompaktes 'Was ist neu?'-Dropdown-Widget fuer die Navigation mit den letzten 3 Eintraegen und Punkt-Indikator
- Monats-gruppierte Liste mit Sticky-Monatsueberschriften beim Scrollen

> **Umsetzung:** Linie als Pseudo-Element, 'Zeichnen' über height/scaleY gekoppelt an IntersectionObserver oder animation-timeline: scroll() mit Observer-Fallback.

### Animierter Dashboard-/Chart-Teaser  ·  🟡 mittel

Verkauft den Analytics-Teil des Produkts, indem sich Kennzahlen-Charts beim Scrollen sichtbar aufbauen.

- SVG-Liniendiagramm zeichnet sich beim Scroll-Eintritt (stroke-dashoffset), Tooltip folgt der Maus
- Balken wachsen gestaffelt aus der Grundlinie, Werte zählen hoch
- Fake-Live-Dashboard: Sparklines und Event-Feed aktualisieren sich alle paar Sekunden subtil

> **Umsetzung:** Inline-SVG mit stroke-dasharray/-offset, Trigger via IntersectionObserver; unterscheidet sich vom vorhandenen Zahlen-Band: hier Grafiken, nicht nur Counter; reduced-motion zeigt Endzustand sofort.

### Standorte-/Weltkarten-Sektion  ·  ⚪ niedrig

Visualisiert globale Präsenz, Kunden-Verteilung oder Rechenzentrums-Regionen (EU-Hosting als Verkaufsargument).

- Inline-SVG-Weltkarte (Punktraster-Stil) mit pulsierenden Marker-Dots und Hover-Tooltips
- Karte + Zähler-Kombination: 'Sessions aus 40 Ländern', Dots leuchten zufällig auf wie Live-Traffic
- Regionen-Auswahl: Klick auf EU/US/Asien zoomt via SVG-viewBox-Transition und zeigt Detail-Karte

> **Umsetzung:** Eine SVG-Dot-Map ist als statisches Asset einbettbar — keine Tile-Server, keine externen Requests, kein Leaflet; Puls-Effekt als CSS-Animation auf <circle>, Tooltips wie bei den Hotspots.

### Command-Palette-/Shortcut-Demo  ·  ⚪ niedrig

Positioniert das Produkt als Power-Tool: Besucher drücken Cmd+K und erleben die Produkt-Suche direkt auf der Landing Page.

- Echte auslösbare Palette: Cmd+K (oder Klick auf gemocktes Suchfeld) öffnet Overlay mit filterbarer Befehlsliste
- Autoplay-Mock: Palette tippt sich selbst, Ergebnisse filtern sichtbar, Auswahl blinkt — als Loop
- Shortcut-Spickzettel: Grid aus <kbd>-Tasten-Kacheln, Hover drückt die Taste optisch ein

> **Umsetzung:** Overlay als <dialog> + keydown-Listener (metaKey && 'k'), Filterung über simples Array + includes(); starkes Differenzierungs-Feature für Dev-Zielgruppen, ~80 Zeilen Vanilla-JS.


## Struktur & Utility (12)

### Cookie-Consent-Banner (DSGVO)  ·  🔴 hoch

Rechtskonforme Einwilligung für Cookies/Tracking einholen, bevor optionale Skripte laden — Pflicht fuer deutsche Seiten und logische Ergaenzung zu Impressum/Datenschutz.

- Schlichte Bottom-Bar mit gleichwertigen Buttons 'Alle akzeptieren' / 'Nur notwendige' (DSGVO-konform ohne Dark Pattern)
- Zentriertes Modal mit Kategorien-Toggles (Notwendig gesperrt, Statistik, Marketing) und 'Auswahl speichern'
- Dezente Eck-Karte unten links mit Einstellungen-Link, die die Seite nicht blockiert
- Wiederoeffnen-Link 'Cookie-Einstellungen' als Footer-Utility, der das Modal erneut zeigt

> **Umsetzung:** Consent-Status als JSON in localStorage; optionale Skripte als <script type="text/plain" data-consent="statistik"> einbetten und erst nach Zustimmung per JS aktivieren. Design-Tokens des Systems nutzen, damit hell/dunkel automatisch passt.

### 404- & Wartungsseite  ·  🔴 hoch

Fehlertritte abfangen und Besucher zurueck in den Funnel leiten statt sie zu verlieren; Wartungsvariante fuer geplante Downtime.

- Minimal typografisch: riesige '404' aus den Display-Fonts der Font-Paarungen + ein Satz + Zurueck-zur-Startseite-Button
- Developer-Terminal-Stil passend zum Terminal-Hero: 'Error 404: page not found' mit blinkendem Cursor und Befehls-Vorschlaegen als Links
- Mit Mini-Navigation: Suchfeld-Attrappe + 4 Karten zu den wichtigsten Seiten (Features, Preise, FAQ, Kontakt)
- Wartungsmodus-Variante: Aurora-Hintergrund, Countdown 'Wir sind gleich zurueck' + Status-Link

> **Umsetzung:** Als eigenstaendige 404.html — GitHub Pages liefert diese Datei automatisch bei unbekannten Pfaden aus.

### Kontakt-Sektion/-Seite  ·  🔴 hoch

Konversionspunkt fuer Anfragen von Interessenten, die nicht direkt kaufen — schliesst die Luecke zwischen CTA und Preisen.

- Zweispaltig: Formular (Name, E-Mail, Nachricht, Datenschutz-Checkbox) links, Kontaktdaten + Antwortzeit-Versprechen rechts
- Kontakt-Kacheln nach Anliegen: Vertrieb / Support / Presse, jede mit Icon und mailto-Link — ganz ohne Formular-Backend
- Zentriertes schmales Formular mit grossem 'Sprich mit uns'-Heading als eigene Seite
- Formular + eingebettete statische Karte (SVG/Bild) fuer Firmen mit Standort

> **Umsetzung:** Ohne Backend: mailto-Fallback oder action auf Formspree-artigen Dienst als Platzhalter-Kommentar; Client-Validierung mit :invalid + JS, Erfolgszustand inline anzeigen.

### Coming-Soon / Warteliste  ·  🔴 hoch

Pre-Launch-Seite, die E-Mail-Adressen sammelt und Vorfreude erzeugt, bevor die eigentliche Landing Page live geht.

- Fullscreen mit Countdown-Timer (Tage/Std/Min/Sek) + E-Mail-Feld, Aurora- oder Verlaufs-Hintergrund
- Split: links Pitch + Warteliste-Formular mit Social Proof ('487 Personen warten schon'), rechts geblurrtes Produkt-Mockup als Teaser
- Minimal: nur Logo, ein Satz, ein Eingabefeld — maximale Reduktion
- Mit Fortschrittsbalken 'Beta-Plaetze: 62 von 100 vergeben' als Verknappungs-Element

> **Umsetzung:** Countdown mit Zieldatum als data-Attribut und setInterval; eingetragene E-Mail als Bestaetigung inline umschalten (kein Redirect noetig).

### Blog-/Ressourcen-Teaser-Sektion  ·  🟡 mittel

Signalisiert Aktivitaet und Expertise auf der Landing Page und verlinkt auf Inhalte fuer SEO und Nurturing.

- 3-Karten-Grid mit Bildplatzhalter, Kategorie-Tag, Titel, Lesezeit und Datum
- Featured-Layout: ein grosser Hauptartikel links, drei kompakte Listeneintraege rechts
- Horizontaler Scroll-Streifen mit Karten (scroll-snap), fuer viele Artikel ohne Hoehe zu fressen
- Textliste im Changelog-Stil: Datum + Titel + Pfeil, ganz ohne Bilder

> **Umsetzung:** Karten aus einem JS-Array rendern, damit der Baustein ohne CMS befuellbar bleibt; scroll-snap-type fuer den Streifen, keine Slider-Library.

### Inhaltsverzeichnis fuer lange Seiten (Scrollspy-TOC)  ·  🟡 mittel

Navigation innerhalb langer Einzelseiten wie Datenschutz, AGB oder Vergleichsseiten — dort aktuell die groesste UX-Luecke.

- Sticky Sidebar links mit Abschnittsliste, aktiver Abschnitt farblich markiert (Scrollspy)
- Einklappbares 'Auf dieser Seite'-Panel oben, rein mit details/summary, ohne JS
- Punkt-Navigation am rechten Seitenrand mit Tooltip pro Abschnitt
- TOC das aus h2/h3 automatisch per JS generiert wird — einmal einbauen, ueberall nutzbar

> **Umsetzung:** IntersectionObserver auf die Ueberschriften statt Scroll-Listener; direkt in die vorhandenen Rechtsseiten-Vorlagen integrieren.

### AGB-/Nutzungsbedingungen-Vorlage  ·  🟡 mittel

Komplettiert das Rechtsseiten-Set (Impressum, Datenschutz) — fuer jedes SaaS mit Bezahlmodell noetig.

- SaaS-AGB mit Platzhaltern fuer Vertragsgegenstand, Laufzeit, Kuendigung, Haftung — gleiche Platzhalter-Konvention wie Impressum
- Kurze Nutzungsbedingungen fuer kostenlose Tools/Betas (1 Seite)
- Rechts-Hub: eine Seite mit Tab-Umschaltung zwischen Impressum, Datenschutz und AGB

> **Umsetzung:** Gleiches Layout und dieselben Platzhalter-Marker wie die bestehenden Rechtsseiten verwenden; mit dem neuen TOC-Baustein kombinieren.

### Danke-/Bestaetigungsseite  ·  🟡 mittel

Faengt Nutzer nach Formular-Absenden oder Newsletter-Anmeldung auf und gibt den naechsten Schritt vor — ausserdem messbarer Conversion-Endpunkt.

- Zentriert mit animiertem Haekchen (SVG stroke-dashoffset) + 'Was jetzt passiert'-Liste in 3 Schritten
- Mit Weiterempfehlen-Block: 'Teile uns mit deinem Team' + Kopier-Link-Button
- Double-Opt-in-Variante: 'Bestaetige deine E-Mail' mit Postfach-Hinweis und Erneut-senden-Platzhalter
- Mit Terminbuchungs-CTA: 'Direkt eine Demo buchen' als naechster Funnel-Schritt

> **Umsetzung:** Haekchen-Animation nur mit CSS-Keyframes auf stroke-dashoffset, kein Lottie. Als Ziel-URL fuer Kontakt- und Wartelisten-Formulare verlinken.

### Jobs-/Karriere-Sektion  ·  ⚪ niedrig

Zeigt, dass hinter dem Produkt ein wachsendes Team steht, und dient als leichtgewichtige Recruiting-Flaeche.

- Stellen-Liste mit Titel, Team-Badge, Standort/Remote-Tag und Pfeil — Daten aus JS-Array
- Kultur-Sektion: Foto-/Emoji-Grid + Werte-Stichpunkte, darunter kompakte offene Stellen
- Einzeiliger 'Wir stellen ein'-Hinweis als Badge fuer Nav oder Footer, verlinkt auf die Sektion

### Breadcrumbs  ·  ⚪ niedrig

Orientierung auf Unterseiten (Blog, Rechtsseiten, Changelog) und strukturierte Daten fuer Suchmaschinen.

- Klassisch mit Chevron-Trennern und gedaempfter Farbe, letzter Eintrag fett
- Pill-Stil: jede Ebene als kleine Kapsel, passend zur schwebenden Pill-Nav
- Mit Zurueck-Pfeil kombiniert fuer mobile Ansichten (nur letzte Ebene sichtbar)

> **Umsetzung:** nav mit aria-label='Breadcrumb' + JSON-LD BreadcrumbList-Snippet als Kommentar-Vorlage beilegen.

### Sprach-Umschalter (DE/EN)  ·  ⚪ niedrig

Vorbereitung fuer zweisprachige Landing Pages — internationales SaaS-Publikum erwartet mindestens Englisch.

- Dropdown in der Nav mit Sprachkuerzel (DE/EN) und Haekchen bei aktiver Sprache
- Segmented-Toggle DE|EN im Footer, analog zum Dark-Mode-Toggle gestaltet
- Globus-Icon-Button, der ein kleines Popover mit Sprachliste oeffnet

> **Umsetzung:** Bei Plain HTML auf parallele Seiten (/en/index.html) verlinken statt Runtime-Uebersetzung; hreflang-Link-Tags als Kommentar-Vorlage mitliefern; Wahl in localStorage merken.

### System-Status-Badge & Status-Seite  ·  ⚪ niedrig

Vertrauenssignal fuer Infrastruktur-Produkte: zeigt Verfuegbarkeit und professionellen Umgang mit Stoerungen.

- Gruener Puls-Punkt + 'Alle Systeme funktionsfaehig' als Footer-Badge, verlinkt auf die Status-Seite
- Statische Status-Seite mit Komponenten-Liste (API, Dashboard, Recorder) und 90-Tage-Uptime-Balken aus div-Segmenten
- Incident-Banner-Variante fuer die Nav: gelbe Leiste 'Eingeschraenkte Verfuegbarkeit' — Gegenstueck zum Announcement-Banner

> **Umsetzung:** Puls-Punkt mit CSS-Animation (box-shadow-Keyframes); Uptime-Balken als 90 kleine divs aus einem JS-Array mit Status-Klassen.
