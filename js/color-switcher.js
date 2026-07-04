/* =================================================================
   Farbschema-Umschalter — Demo-Werkzeug (Plain JS, keine Dependencies)

   Schwebendes Farbkreis-Widget unten rechts (über dem "Aa"-Widget).
   Schaltet kuratierte Farbschemata live um, indem es die Farb-Variablen
   des Projekts auf <html> setzt — Klon (styles.css/themes.css),
   Galerie (index.html) und Bausteine (base.css) lesen nur diese.

   · 6 Farbwelten + 2 neutrale Schemata (kühl/warm)
   · Auswahl wird in localStorage gemerkt (gilt auf allen Seiten)
   · Einbinden: <script src="js/color-switcher.js"></script>
   ================================================================= */
(function () {
  "use strict";

  /* [primary, primary-700, primary-300, sekundär, dunkel, dunkel-2, dunkel-3, veil] */
  const SCHEMES = {
    indigo:    { tag: "Indigo",    sub: "Original · Electric Blue",
      c: ["#394DFE", "#2C3AD6", "#8A96FF", "#6F5BFF", "#0D033B", "#160A52", "#1D1066", "#3B2B86"] },
    ozean:     { tag: "Ozean",     sub: "Blau · Himmel & Cyan",
      c: ["#0EA5E9", "#0284C7", "#7DD3FC", "#22D3EE", "#04202F", "#062E42", "#083C56", "#175E86"] },
    smaragd:   { tag: "Smaragd",   sub: "Grün · Emerald & Teal",
      c: ["#059669", "#047857", "#6EE7B7", "#14B8A6", "#042420", "#06342D", "#084438", "#156355"] },
    rubin:     { tag: "Rubin",     sub: "Rot · Rosé & Koralle",
      c: ["#E11D48", "#BE123C", "#FDA4AF", "#F97316", "#2A0714", "#3B0C1D", "#4D1226", "#7C2148"] },
    bernstein: { tag: "Bernstein", sub: "Orange · Sunset",
      c: ["#F97316", "#C2410C", "#FDBA74", "#F43F5E", "#291005", "#38180A", "#48200E", "#7C3F14"] },
    beere:     { tag: "Beere",     sub: "Violett · Purple & Pink",
      c: ["#A855F7", "#9333EA", "#D8B4FE", "#EC4899", "#230639", "#310A4F", "#400E65", "#6D28A8"] },
    graphit:   { tag: "Graphit",   sub: "Neutral · kühl, fast schwarz",
      c: ["#64748B", "#475569", "#CBD5E1", "#94A3B8", "#0C0F14", "#151A22", "#1E2530", "#46536B"] },
    sand:      { tag: "Sand",      sub: "Neutral · warm, Stein & Taupe",
      c: ["#78716C", "#57534E", "#D6D3D1", "#A8A29E", "#1C1917", "#26221F", "#302B28", "#5C544E"] },
  };

  const STORE_KEY = "or-color-scheme";

  const rgb = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
  };

  function apply(key) {
    const s = SCHEMES[key];
    if (!s) return;
    const [p, p700, p300, sec, dark, dark2, dark3, veil] = s.c;
    const set = (name, val) => document.documentElement.style.setProperty(name, val);
    /* Klon (styles.css/themes.css) */
    set("--primary", p); set("--primary-700", p700); set("--primary-300", p300);
    set("--accent-violet", sec);
    set("--indigo-deep", dark); set("--indigo-deep-2", dark2); set("--indigo-3", dark3);
    set("--veil", veil);
    /* Galerie (index.html) + Bausteine (base.css) */
    set("--indigo-2", dark2);
    set("--violet", sec);
    set("--brand", p); set("--brand-700", p700); set("--brand-300", p300);
    /* rgba()-Triplets */
    set("--brand-rgb", rgb(p)); set("--violet-rgb", rgb(sec)); set("--veil-rgb", rgb(veil));
    set("--dark-rgb", rgb(dark));

    try { localStorage.setItem(STORE_KEY, key); } catch (e) { /* privat-Modus o.ä. */ }
    panel.querySelectorAll("button[data-scheme]").forEach((b) =>
      b.classList.toggle("on", b.dataset.scheme === key)
    );
    toggle.style.background = `conic-gradient(${p} 0 33%, ${sec} 33% 66%, ${dark} 66% 100%)`;
  }

  /* ---------- Styles (self-contained, bewusst System-Font) ---------- */
  const css = `
    .csw-toggle { position: fixed; right: 16px; bottom: 72px; z-index: 300;
      width: 46px; height: 46px; border-radius: 50%; border: 2px solid rgba(255,255,255,.55);
      cursor: pointer; box-shadow: 0 10px 30px -10px rgba(0,0,0,.55), inset 0 0 0 2px rgba(13,3,59,.35);
      transition: transform .15s, border-color .2s; }
    .csw-toggle:hover { transform: translateY(-2px); border-color: #fff; }
    .csw-panel { position: fixed; right: 16px; bottom: 128px; z-index: 300;
      width: 264px; display: none; flex-direction: column; gap: 3px;
      background: rgba(13,3,59,.94); backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,.18); border-radius: 16px; padding: 12px;
      box-shadow: 0 24px 60px -20px rgba(0,0,0,.7); color: #fff;
      font-family: system-ui, sans-serif; max-height: calc(100vh - 150px); overflow-y: auto; }
    .csw-panel.open { display: flex; }
    .csw-panel h4 { margin: 2px 4px 8px; font: 700 11px/1 system-ui, sans-serif;
      letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.55); }
    .csw-panel button[data-scheme] { display: flex; align-items: center; gap: 11px;
      text-align: left; cursor: pointer; border-radius: 10px; padding: 8px 10px;
      background: transparent; border: 1px solid transparent; color: #fff;
      font-family: system-ui, sans-serif; transition: background .15s, border-color .15s; }
    .csw-panel button[data-scheme]:hover { background: rgba(255,255,255,.07); }
    .csw-panel button[data-scheme].on { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.45); }
    .csw-swatch { flex: none; display: flex; }
    .csw-swatch i { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,.35); margin-left: -5px; }
    .csw-swatch i:first-child { margin-left: 0; }
    .csw-name { font-size: 14.5px; font-weight: 700; line-height: 1.2; display: block; }
    .csw-sub { font-size: 11px; color: rgba(255,255,255,.55); display: block; }
    .csw-hint { margin: 8px 4px 2px; font-size: 11px; line-height: 1.45; color: rgba(255,255,255,.5); }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* ---------- Markup ---------- */
  const toggle = document.createElement("button");
  toggle.className = "csw-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-label", "Farbschema wechseln");
  toggle.setAttribute("aria-expanded", "false");

  const panel = document.createElement("div");
  panel.className = "csw-panel";
  panel.setAttribute("role", "menu");
  panel.innerHTML =
    "<h4>Farbschema</h4>" +
    Object.entries(SCHEMES).map(([key, s]) => {
      const [p, , , sec, dark] = s.c;
      return `<button type="button" data-scheme="${key}" role="menuitemradio">
        <span class="csw-swatch" aria-hidden="true">
          <i style="background:${p}"></i><i style="background:${sec}"></i><i style="background:${dark}"></i>
        </span>
        <span><span class="csw-name">${s.tag}</span><span class="csw-sub">${s.sub}</span></span>
      </button>`;
    }).join("") +
    `<p class="csw-hint">Tipp: Graphit oder Sand + Layout-Variante „Hell" ergibt ein neutrales helles Design — mit „Dunkel" ein neutrales dunkles.</p>`;

  document.body.appendChild(panel);
  document.body.appendChild(toggle);

  /* ---------- Verhalten ---------- */
  toggle.addEventListener("click", () => {
    const open = panel.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  panel.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-scheme]");
    if (btn) apply(btn.dataset.scheme);
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
  let saved = "indigo";
  try { saved = localStorage.getItem(STORE_KEY) || "indigo"; } catch (e) {}
  apply(saved);
})();
