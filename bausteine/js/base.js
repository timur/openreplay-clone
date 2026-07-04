/* =================================================================
   BAUSTEINE — Basis-JavaScript
   Plain JS, keine Pflicht-Dependencies. Ein Skript für alle Bausteine:
   nur die Teile laufen, deren Markup auf der Seite existiert.

   · Scroll-Reveals   [data-reveal] / [data-stagger]
   · Sticky-Nav       .bs-nav  (bekommt .scrolled nach 12px)
   · Mobile-Menü      .bs-nav-burger → .bs-nav-mobile
   · Zähler           [data-count-to="12000"] (startet bei Sichtbarkeit)
   · Marquee          [data-marquee] (Inhalt wird für die Schleife dupliziert)
   · Akkordeon        <details class="bs-faq-item"> (nur eins offen)
   ================================================================= */
(function () {
  "use strict";

  // Signal "JS läuft" — erst damit versteckt base.css die [data-reveal]-Elemente.
  // Läuft das Skript nicht (z. B. blockiert), bleibt aller Inhalt sichtbar.
  document.documentElement.classList.add("js");

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Scroll-Reveals ---------- */
  // Kinder von [data-stagger] automatisch staffeln (80ms Schritt)
  document.querySelectorAll("[data-stagger]").forEach((group) => {
    [...group.children].forEach((child, i) => {
      if (!child.hasAttribute("data-reveal")) child.setAttribute("data-reveal", group.dataset.stagger || "");
      child.style.setProperty("--reveal-delay", i * 80 + "ms");
    });
  });

  const revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length && "IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach((el) => {
      const delay = el.dataset.revealDelay;
      if (delay) el.style.setProperty("--reveal-delay", delay + "ms");
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- 2. Sticky-Nav: Zustand nach dem Scrollen ---------- */
  document.querySelectorAll(".bs-nav").forEach((nav) => {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  });

  /* ---------- 3. Mobile-Menü ---------- */
  document.querySelectorAll(".bs-nav-burger").forEach((burger) => {
    const nav = burger.closest(".bs-nav");
    const menu = nav && nav.querySelector(".bs-nav-mobile");
    if (!menu) return;
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      })
    );
  });

  /* ---------- 4. Zähler: [data-count-to] ---------- */
  const counters = document.querySelectorAll("[data-count-to]");
  if (counters.length) {
    const run = (el) => {
      const to = parseFloat(el.dataset.countTo);
      const suffix = el.dataset.countSuffix || "";
      const dur = parseInt(el.dataset.countDuration || "1400", 10);
      if (reduceMotion) { el.textContent = to.toLocaleString("de-DE") + suffix; return; }
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * eased).toLocaleString("de-DE") + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.6 });
      counters.forEach((el) => io.observe(el));
    } else counters.forEach(run);
  }

  /* ---------- 5. Marquee: Inhalt für nahtlose Schleife duplizieren ---------- */
  document.querySelectorAll("[data-marquee]").forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- 6b. Copy-Buttons: [data-copy] kopiert das Ziel ----------
     data-copy=""          → nächstes <pre>/<code> im .bs-snippet-Umfeld
     data-copy="#selektor" → gezieltes Element                            */
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sel = btn.getAttribute("data-copy");
      const wrap = btn.closest(".bs-snippet") || btn.parentElement;
      const target = sel ? document.querySelector(sel) : wrap && wrap.querySelector("pre, code");
      if (!target) return;
      const text = target.innerText;
      const done = () => {
        const t = btn.textContent;
        btn.textContent = "Kopiert ✓";
        setTimeout(() => { btn.textContent = t; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
      } else fallbackCopy(text, done);
    });
  });
  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { /* dann eben nicht */ }
    ta.remove();
  }

  /* ---------- 6. FAQ-Akkordeon: nur ein <details> offen halten ---------- */
  document.querySelectorAll(".bs-faq").forEach((group) => {
    group.querySelectorAll("details").forEach((d) => {
      d.addEventListener("toggle", () => {
        if (d.open) group.querySelectorAll("details[open]").forEach((o) => { if (o !== d) o.open = false; });
      });
    });
  });
})();

/* =================================================================
   Optionale Extras mit Motion (motion.dev) — Progressive Enhancement.
   Lädt per CDN; ohne Netz laufen alle Basis-Effekte oben trotzdem.
   · Parallax:  [data-parallax="80"]  → Element driftet beim Scrollen
   · Federnde Reveals für [data-reveal="spring"]
   ================================================================= */
if (!matchMedia("(prefers-reduced-motion: reduce)").matches &&
    (document.querySelector("[data-parallax]") || document.querySelector('[data-reveal="spring"]'))) {
  import("https://cdn.jsdelivr.net/npm/motion@12/+esm")
    .then(({ animate, scroll, inView }) => {
      document.querySelectorAll("[data-parallax]").forEach((el) => {
        const dist = parseFloat(el.dataset.parallax) || 80;
        scroll(animate(el, { y: [0, dist] }, { ease: "linear" }), {
          target: el.closest("section") || el,
          offset: ["start end", "end start"],
        });
      });
      inView('[data-reveal="spring"]', (el) => {
        animate(el, { opacity: [0, 1], transform: ["translateY(34px) scale(.96)", "none"] },
          { type: "spring", stiffness: 120, damping: 17 });
      }, { amount: 0.3 });
    })
    .catch(() => { /* offline — Basis-Reveals decken alles ab */ });
}
