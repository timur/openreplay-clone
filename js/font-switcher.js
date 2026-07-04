/* =================================================================
   Schrift-Umschalter — Demo-Werkzeug (Plain JS, keine Dependencies)

   Schwebendes "Aa"-Widget unten rechts. Schaltet kuratierte
   Font-Paarungen (Display + Fließtext) live um, indem es die
   CSS-Variablen --font-display / --font-body auf <html> setzt —
   alle Seiten des Projekts (Klon UND Bausteine) lesen nur diese.

   · Auswahl wird in localStorage gemerkt (gilt auf allen Seiten)
   · Google-Fonts werden erst geladen, wenn nötig (lazy)
   · Einbinden: <script src="js/font-switcher.js"></script>
   ================================================================= */
(function () {
  "use strict";

  const PAIRS = {
    original: {
      tag: "Original", label: "Bricolage Grotesque + Figtree",
      display: '"Bricolage Grotesque", system-ui, sans-serif',
      body: '"Figtree", system-ui, -apple-system, "Segoe UI", sans-serif',
    },
    tech: {
      tag: "Tech", label: "Space Grotesk + Inter",
      display: '"Space Grotesk", system-ui, sans-serif',
      body: '"Inter", system-ui, sans-serif',
    },
    editorial: {
      tag: "Editorial", label: "Playfair Display + DM Sans",
      display: '"Playfair Display", Georgia, serif',
      body: '"DM Sans", system-ui, sans-serif',
    },
    geometrisch: {
      tag: "Geometrisch", label: "Sora + Manrope",
      display: '"Sora", system-ui, sans-serif',
      body: '"Manrope", system-ui, sans-serif',
    },
    freundlich: {
      tag: "Freundlich", label: "Baloo 2 + Nunito Sans",
      display: '"Baloo 2", system-ui, sans-serif',
      body: '"Nunito Sans", system-ui, sans-serif',
    },
    plakativ: {
      tag: "Plakativ", label: "Unbounded + Work Sans",
      display: '"Unbounded", system-ui, sans-serif',
      body: '"Work Sans", system-ui, sans-serif',
    },
  };

  // Alle Nicht-Original-Familien in einem Request (display=swap)
  const FONTS_URL =
    "https://fonts.googleapis.com/css2" +
    "?family=Space+Grotesk:wght@400..700&family=Inter:wght@300..800" +
    "&family=Playfair+Display:wght@500..800&family=DM+Sans:opsz,wght@9..40,300..800" +
    "&family=Sora:wght@400..800&family=Manrope:wght@300..800" +
    "&family=Baloo+2:wght@400..800&family=Nunito+Sans:opsz,wght@6..12,300..800" +
    "&family=Unbounded:wght@400..800&family=Work+Sans:wght@300..800" +
    "&display=swap";

  const STORE_KEY = "or-font-pair";
  let fontsLoaded = false;

  function loadFonts() {
    if (fontsLoaded) return;
    fontsLoaded = true;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONTS_URL;
    document.head.appendChild(link);
  }

  function apply(key) {
    const pair = PAIRS[key];
    if (!pair) return;
    if (key !== "original") loadFonts();
    document.documentElement.style.setProperty("--font-display", pair.display);
    document.documentElement.style.setProperty("--font-body", pair.body);
    try { localStorage.setItem(STORE_KEY, key); } catch (e) { /* privat-Modus o.ä. */ }
    panel.querySelectorAll("button[data-pair]").forEach((b) =>
      b.classList.toggle("on", b.dataset.pair === key)
    );
  }

  /* ---------- Styles (self-contained, bewusst System-Font) ---------- */
  const css = `
    .fsw-toggle { position: fixed; right: 16px; bottom: 16px; z-index: 300;
      width: 46px; height: 46px; border-radius: 50%; border: 1px solid rgba(255,255,255,.25);
      background: rgba(13,3,59,.9); color: #fff; cursor: pointer;
      font: 700 17px/1 system-ui, sans-serif; letter-spacing: -.02em;
      box-shadow: 0 10px 30px -10px rgba(0,0,0,.55); backdrop-filter: blur(8px);
      transition: transform .15s, border-color .2s; }
    .fsw-toggle:hover { transform: translateY(-2px); border-color: rgba(255,255,255,.55); }
    .fsw-panel { position: fixed; right: 16px; bottom: 72px; z-index: 300;
      width: 280px; display: none; flex-direction: column; gap: 4px;
      background: rgba(13,3,59,.94); backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,.18); border-radius: 16px; padding: 12px;
      box-shadow: 0 24px 60px -20px rgba(0,0,0,.7); color: #fff;
      font-family: system-ui, sans-serif; }
    .fsw-panel.open { display: flex; }
    .fsw-panel h4 { margin: 2px 4px 8px; font: 700 11px/1 system-ui, sans-serif;
      letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.55); }
    .fsw-panel button[data-pair] { display: flex; flex-direction: column; gap: 2px;
      text-align: left; cursor: pointer; border-radius: 10px; padding: 9px 11px;
      background: transparent; border: 1px solid transparent; color: #fff;
      transition: background .15s, border-color .15s; }
    .fsw-panel button[data-pair]:hover { background: rgba(255,255,255,.07); }
    .fsw-panel button[data-pair].on { background: rgba(57,77,254,.22); border-color: rgba(57,77,254,.65); }
    .fsw-name { font-size: 17px; line-height: 1.25; }
    .fsw-sub { font: 500 11.5px/1.3 system-ui, sans-serif; color: rgba(255,255,255,.55); }
    @media (max-width: 640px) { .fsw-panel { width: calc(100vw - 32px); } }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* ---------- Markup ---------- */
  const toggle = document.createElement("button");
  toggle.className = "fsw-toggle";
  toggle.type = "button";
  toggle.textContent = "Aa";
  toggle.setAttribute("aria-label", "Schriften wechseln");
  toggle.setAttribute("aria-expanded", "false");

  const panel = document.createElement("div");
  panel.className = "fsw-panel";
  panel.setAttribute("role", "menu");
  panel.innerHTML =
    "<h4>Schrift-Paarung</h4>" +
    Object.entries(PAIRS).map(([key, p]) =>
      `<button type="button" data-pair="${key}" role="menuitemradio">
         <span class="fsw-name" style="font-family:${p.display.replace(/"/g, "&quot;")}">${p.tag}</span>
         <span class="fsw-sub">${p.label}</span>
       </button>`
    ).join("");

  document.body.appendChild(panel);
  document.body.appendChild(toggle);

  /* ---------- Verhalten ---------- */
  toggle.addEventListener("click", () => {
    const open = panel.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    if (open) loadFonts(); // Vorschau der Namen in echter Schrift
  });
  panel.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-pair]");
    if (btn) apply(btn.dataset.pair);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { panel.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  });
  document.addEventListener("click", (e) => {
    if (!panel.contains(e.target) && e.target !== toggle) {
      panel.classList.remove("open"); toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* gespeicherte Auswahl anwenden */
  let saved = "original";
  try { saved = localStorage.getItem(STORE_KEY) || "original"; } catch (e) {}
  apply(saved);
})();
