(() => {
  const KEY = "lab-theme";
  const ORDER = ["dark", "light", "pride"];
  const LABEL = { dark: "☾ dark", light: "☀ light", pride: "✶ pride" };
  const root = document.documentElement;

  const saved = localStorage.getItem(KEY);
  const initial = ORDER.includes(saved)
    ? saved
    : (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

  const apply = (t) => {
    root.dataset.theme = t;
    const b = document.getElementById("theme-toggle");
    if (b) b.textContent = LABEL[t];
  };

  apply(initial);

  const b = document.getElementById("theme-toggle");
  if (b) b.addEventListener("click", () => {
    const next = ORDER[(ORDER.indexOf(root.dataset.theme) + 1) % ORDER.length];
    localStorage.setItem(KEY, next);
    apply(next);
  });
})();

/* ---------- nav feed limiting ----------
   Long satellite lists (e.g. a month hub with many log entries) collapse to
   the first N entries (N from data-nav-max on the <ul>, default 10) behind a
   "… N more" toggle. The current page's entry always stays visible. Pure
   progressive enhancement: the nav works without JS. */
(() => {
  const CAP = 10;
  document.querySelectorAll(".treewrap nav ul, nav.treewrap ul, .treewrap > nav ul, .treewrap ul").forEach((ul) => {
    if (ul.closest(".site-toc")) return; // never touch the TOC
    const items = ul.querySelectorAll(":scope > li.site-nav__satellite");
    const overflow = items.length - CAP;
    if (overflow <= 0) return;
    ul.setAttribute("data-nav-max", String(CAP));

    items.forEach((li, i) => {
      if (i >= CAP) li.setAttribute("data-overflow", "");
    });

    const more = document.createElement("li");
    more.className = "nav-more";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = `\u2026 ${overflow} more`;
    btn.addEventListener("click", () => {
      ul.classList.add("nav-expanded");
      ul.querySelectorAll("[data-overflow]").forEach((li) =>
        li.removeAttribute("data-overflow"),
      );
      more.remove();
    });
    more.appendChild(btn);
    ul.appendChild(more);
  });
})();
