/* =================================================================
   Dark-Mode-Umschalter — Demo-Werkzeug (Plain JS, keine Dependencies)

   ☀/🌙-Button unten rechts (über dem Farbschema-Widget). Schaltet die
   Erscheinung jeder Seite zwischen Hell und Dunkel um und merkt die
   Wahl in localStorage (gilt auf allen Seiten).

   Wirkung je Seitentyp:
   · Klon-Seiten (styles.css):  <body data-theme="hell|dunkel|…">
     — dunkle Eigen-Themen (verlauf) bleiben im Dark-Mode erhalten,
       helle Eigen-Themen (weiss) bleiben im Light-Mode erhalten.
   · Bausteine (base.css):      <body data-theme="dark"> bzw. entfernt
   · Galerie (index.html):      <html data-mode="light|dark">

   Einbinden: <script src="js/mode-switcher.js"></script>
   ================================================================= */
(function () {
  "use strict";

  const STORE_KEY = "or-mode"; /* "hell" | "dunkel" | "" (= Seiten-Standard) */

  const isClone = !!document.querySelector('link[href$="styles.css"]');
  const isBaustein = !!document.querySelector('link[href*="base.css"]');
  const isGallery = !isClone && !isBaustein && !!document.querySelector(".bg");
  if (!isClone && !isBaustein && !isGallery) return;

  /* Ausgangszustand der Seite merken, um "Standard" wiederherstellen zu können */
  const nativeTheme = document.body.dataset.theme || "";
  const DARK_THEMES = ["dunkel", "verlauf"];
  const LIGHT_THEMES = ["hell", "weiss", "akzent"];

  function isDarkNow() {
    if (isGallery) return document.documentElement.dataset.mode !== "light";
    const t = document.body.dataset.theme || "";
    if (isBaustein) return t === "dark";
    /* Klon: ohne Thema = dunkler Hero/Original → als dunkel werten */
    return t === "" || DARK_THEMES.includes(t);
  }

  function apply(mode) {
    if (mode === "dunkel") {
      if (isGallery) delete document.documentElement.dataset.mode;
      else if (isBaustein) document.body.dataset.theme = "dark";
      else document.body.dataset.theme = DARK_THEMES.includes(nativeTheme) ? nativeTheme : "dunkel";
    } else if (mode === "hell") {
      if (isGallery) document.documentElement.dataset.mode = "light";
      else if (isBaustein) delete document.body.dataset.theme;
      else document.body.dataset.theme = LIGHT_THEMES.includes(nativeTheme) ? nativeTheme : "hell";
    } else {
      /* Seiten-Standard */
      if (isGallery) delete document.documentElement.dataset.mode;
      else if (nativeTheme) document.body.dataset.theme = nativeTheme;
      else delete document.body.dataset.theme;
    }
    btn.textContent = isDarkNow() ? "☀️" : "🌙";
    btn.setAttribute("aria-label", isDarkNow() ? "Zum hellen Modus wechseln" : "Zum dunklen Modus wechseln");
  }

  /* ---------- Button ---------- */
  const style = document.createElement("style");
  style.textContent = `
    .msw-toggle { position: fixed; right: 16px; bottom: 128px; z-index: 300;
      width: 46px; height: 46px; border-radius: 50%; border: 1px solid rgba(255,255,255,.25);
      background: rgba(13,3,59,.9); cursor: pointer; font-size: 19px; line-height: 1;
      box-shadow: 0 10px 30px -10px rgba(0,0,0,.55); backdrop-filter: blur(8px);
      transition: transform .15s, border-color .2s; }
    .msw-toggle:hover { transform: translateY(-2px); border-color: rgba(255,255,255,.55); }
  `;
  document.head.appendChild(style);

  const btn = document.createElement("button");
  btn.className = "msw-toggle";
  btn.type = "button";
  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    const next = isDarkNow() ? "hell" : "dunkel";
    try { localStorage.setItem(STORE_KEY, next); } catch (e) {}
    apply(next);
  });

  /* gespeicherte Wahl anwenden (ohne Wahl: Seiten-Standard) */
  let saved = "";
  try { saved = localStorage.getItem(STORE_KEY) || ""; } catch (e) {}
  apply(saved);
})();
