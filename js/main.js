/* =================================================================
   OpenReplay Nachbau — Plain JavaScript
   Kein Framework, keine Dependencies.
   ================================================================= */
(function () {
  "use strict";

  /* ---------- 1. Sticky header: shadow/blur beim Scrollen ---------- */
  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- 2. Mega-Menü (Hover + Klick, mit Keyboard-Support) ---------- */
  const megaWrap = document.getElementById("megaWrap");
  const megaButtons = document.querySelectorAll(".nav-link[data-mega]");
  const panels = document.querySelectorAll("[data-mega-panel]");
  let megaTimer = null;

  function openMega(name) {
    clearTimeout(megaTimer);
    megaWrap.classList.add("open");
    panels.forEach((p) => p.classList.toggle("show", p.dataset.megaPanel === name));
    megaButtons.forEach((b) => b.setAttribute("aria-expanded", String(b.dataset.mega === name)));
  }
  function closeMega() {
    megaTimer = setTimeout(() => {
      megaWrap.classList.remove("open");
      panels.forEach((p) => p.classList.remove("show"));
      megaButtons.forEach((b) => b.setAttribute("aria-expanded", "false"));
    }, 140);
  }

  megaButtons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => openMega(btn.dataset.mega));
    btn.addEventListener("focus", () => openMega(btn.dataset.mega));
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      isOpen ? closeMega() : openMega(btn.dataset.mega);
    });
    btn.addEventListener("mouseleave", closeMega);
  });
  megaWrap.addEventListener("mouseenter", () => clearTimeout(megaTimer));
  megaWrap.addEventListener("mouseleave", closeMega);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMega(); });

  /* ---------- 3. Mobile-Menü ---------- */
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  burger.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
    mobileMenu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  mobileMenu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    })
  );

  /* ---------- 4. Tab-Switching in den Feature-Mockups (Pills) ---------- */
  document.querySelectorAll(".pills").forEach((group) => {
    const pills = group.querySelectorAll(".pill");
    const mock = group.closest(".split").querySelector(".mock");
    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        pills.forEach((p) => p.classList.remove("is-active"));
        pill.classList.add("is-active");
        // kleine Re-Animation des Mockups, um den Tab-Wechsel spürbar zu machen
        if (mock) {
          mock.style.animation = "none";
          // force reflow
          void mock.offsetWidth;
          mock.style.animation = "rise .5s ease";
        }
      });
    });
  });

  /* ---------- 5. Logo-Ticker (Marquee) — Logos duplizieren für nahtlose Schleife ---------- */
  const LOGOS = ["LG U+", "deel.", "zscaler", "NVIDIA", "Uber", "amazon", "TEKION", "ASUS", "Mercedes"];
  const tickerTrack = document.getElementById("tickerTrack");
  if (tickerTrack) {
    const makeLogo = (name) => {
      const el = document.createElement("span");
      el.className = "ticker-logo";
      el.textContent = name;
      return el;
    };
    // zweimal einfügen → Track ist 200% breit → translateX(-50%) loopt nahtlos
    [...LOGOS, ...LOGOS].forEach((n) => tickerTrack.appendChild(makeLogo(n)));
  }

  /* ---------- 6. Hero-Montage: Dashboard-Karten generieren ----------
     Das ist der Kern des Hero-Effekts: eine Wand aus echten HTML/CSS-
     Dashboard-Karten, die im Container langsam diagonal driftet
     (CSS @keyframes drift). Für die nahtlose Schleife wird das Karten-
     Set dupliziert.                                                     */
  const CARDS = [
    `<div class="mc"><h5>Most Visited Guides</h5><svg class="mini-svg" viewBox="0 0 120 50" preserveAspectRatio="none">
       <path d="M0 40 C20 20 35 30 55 18 S95 10 120 22 L120 50 L0 50 Z" fill="rgba(57,77,254,.18)"/>
       <path d="M0 40 C20 20 35 30 55 18 S95 10 120 22" fill="none" stroke="#394DFE" stroke-width="2"/></svg></div>`,
    `<div class="mc"><h5>Performance</h5><div class="mini-bars">
       <span style="height:55%"></span><span style="height:80%"></span><span style="height:40%"></span>
       <span style="height:65%"></span><span style="height:90%"></span><span style="height:50%"></span></div></div>`,
    `<div class="mc"><h5>Most Visited pages trend</h5><svg class="mini-svg" viewBox="0 0 120 50" preserveAspectRatio="none">
       <path d="M0 30 L18 22 L34 34 L52 18 L70 26 L88 12 L106 24 L120 16" fill="none" stroke="#18b8a6" stroke-width="2"/></svg></div>`,
    `<div class="mc"><h5>User Environment</h5><div class="donut"></div><p class="sub" style="text-align:center">Windows · Mac · Linux</p></div>`,
    `<div class="mc"><h5>Conversion Funnel</h5><div class="mini-funnel">
       <span style="width:100%"></span><span style="width:62%"></span><span style="width:28%"></span></div>
       <p class="sub">10% conversion · 1m12s</p></div>`,
    `<div class="mc"><h5>Session Heatmap</h5><div class="mini-heat"></div></div>`,
    `<div class="mc"><h5>Common Events</h5><div class="mini-table">
       <div><span>clicked (asc)</span><b>2,424</b></div><div><span>clicked (pay)</span><b>389</b></div>
       <div><span>clicked (qty)</span><b>593</b></div></div></div>`,
    `<div class="mc"><h5>Deployments</h5><div class="mini-bars">
       <span style="height:30%;background:#6f5bff"></span><span style="height:70%;background:#6f5bff"></span>
       <span style="height:45%;background:#6f5bff"></span><span style="height:85%;background:#6f5bff"></span>
       <span style="height:60%;background:#6f5bff"></span></div></div>`,
    `<div class="mc"><h5>Console</h5><div class="mini-console">
       <div class="err">GET /api 404 ERR_BLOCKED</div><div>Crisp found state of...</div>
       <div class="ok">preBlock loaded ✓</div></div></div>`,
  ];
  const montage = document.getElementById("montageTrack");
  if (montage) {
    // 2× einfügen für die nahtlose vertikale Drift-Schleife (translateY -50%)
    montage.innerHTML = (CARDS.join("") + CARDS.join(""));
  }

  /* ---------- 7. Scroll-Reveal (IntersectionObserver) ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------- 8. Smooth-Scroll für Anker-Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
