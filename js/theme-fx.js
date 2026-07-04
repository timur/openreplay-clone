/* =================================================================
   Theme-Varianten — dezente Zusatz-Animationen mit Motion (motion.dev)
   Progressive Enhancement: lädt die Library per CDN-Import; ohne Netz,
   unter file:// oder bei prefers-reduced-motion läuft die Seite
   unverändert weiter (klassisches Skript, kein Modul nötig).
   ================================================================= */
(function () {
  "use strict";
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  import("https://cdn.jsdelivr.net/npm/motion@12/+esm")
    .then(({ animate, scroll, inView, stagger }) => {
      /* 1. Parallax: die Hero-Montage scrollt leicht mit */
      const hero = document.querySelector(".hero");
      const montage = document.querySelector(".hero .montage");
      if (hero && montage) {
        scroll(animate(montage, { y: [0, 140] }, { ease: "linear" }), {
          target: hero,
          offset: ["start start", "end start"],
        });
      }

      /* 2. Blog-Karten: gestaffeltes Einfliegen, sobald das Grid sichtbar wird */
      inView(".blog-grid", (grid) => {
        animate(
          [...grid.children],
          { opacity: [0, 1], y: [26, 0] },
          { delay: stagger(0.09), type: "spring", stiffness: 110, damping: 20 }
        );
      }, { amount: 0.25 });

      /* 3. Pill-Tabs: kleiner Druck-Impuls beim Klick */
      document.querySelectorAll(".pill").forEach((pill) => {
        pill.addEventListener("click", () => {
          animate(pill, { scale: [1, 0.93, 1] }, { duration: 0.3 });
        });
      });
    })
    .catch(() => {
      /* Motion nicht erreichbar — kein Problem, CSS-Animationen greifen weiter */
    });
})();
