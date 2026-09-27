(() => {
  const input = document.getElementById("search-input");
  const panel = document.getElementById("search-results");
  if (!input || !panel) return;

  let docs = null;
  let active = -1;
  let items = [];

  const root = () => {
    const segs = location.pathname.split("/").filter(Boolean);
    const last = segs[segs.length - 1] || "";
    const depth = last.includes(".") ? segs.length - 1 : segs.length;
    return "../".repeat(depth);
  };

  const load = async () => {
    if (docs) return docs;
    try {
      const res = await fetch(root() + "_boris/search/search-index.json");
      docs = (await res.json()).documents || [];
    } catch {
      docs = [];
    }
    return docs;
  };

  const esc = (s) =>
    s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const snippet = (text, terms) => {
    if (!text) return "";
    let idx = -1;
    for (const t of terms) {
      const i = text.toLowerCase().indexOf(t);
      if (i >= 0 && (idx < 0 || i < idx)) idx = i;
    }
    const start = Math.max(0, (idx < 0 ? 0 : idx) - 32);
    const frag = (start > 0 ? "…" : "") + text.slice(start, start + 140) +
      (start + 140 < text.length ? "…" : "");
    let out = esc(frag);
    for (const t of terms)
      out = out.replace(new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"), "<mark>$1</mark>");
    return "<p class=\"sr-snippet\">" + out + "</p>";
  };

  const search = (raw) => {
    const terms = raw.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    const scored = [];
    for (const d of docs) {
      let score = 0;
      const title = d.title.toLowerCase();
      for (const t of terms) {
        let hit = 0;
        if (title.includes(t)) hit += title.startsWith(t) ? 12 : 8;
        for (const s of d.sections || []) {
          const h = (s.heading || "").toLowerCase();
          if (h.includes(t)) hit += 5;
          if ((s.text || "").toLowerCase().includes(t)) hit += 2;
          if ((s.code || "").toLowerCase().includes(t)) hit += 3;
        }
        if (!hit) { score = 0; break; }
        score += hit;
      }
      if (score > 0) scored.push([score, d]);
    }
    scored.sort((a, b) => b[0] - a[0]);
    return scored.slice(0, 10).map(([, d]) => d);
  };

  const bestSection = (d, terms) => {
    for (const s of d.sections || [])
      for (const t of terms)
        if ((s.heading || "").toLowerCase().includes(t) && s.fragment) return s.fragment;
    for (const s of d.sections || [])
      for (const t of terms)
        if ((s.text || "").toLowerCase().includes(t) && s.fragment) return s.fragment;
    return "";
  };

  const render = (results, terms) => {
    items = results.map((d) => d.path);
    active = results.length ? 0 : -1;
    panel.innerHTML = results.length
      ? results.map((d, i) => {
          const href = root() + d.path + (bestSection(d, terms) ? "#" + bestSection(d, terms) : "");
          const cls = i === active ? " is-active" : "";
          return '<a class="sr-item' + cls + '" data-href="' + href + '" href="' + href + '">' +
            '<span class="sr-title">' + esc(d.title) + "</span>" +
            '<span class="sr-path">' + esc(d.path) + "</span>" +
            snippet(((d.sections || []).find((s) => (s.text || "").length) || {}).text, terms) +
            "</a>";
        }).join("")
      : '<p class="sr-empty">no matches in the graph</p>';
    panel.hidden = false;
  };

  const close = () => { panel.hidden = true; active = -1; };

  input.addEventListener("focus", load);
  input.addEventListener("input", async () => {
    await load();
    const r = search(input.value.trim());
    render(r, input.value.trim().toLowerCase().split(/\s+/));
  });
  input.addEventListener("keydown", (e) => {
    const links = [...panel.querySelectorAll(".sr-item")];
    if (e.key === "Escape") { close(); input.blur(); return; }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!links.length) return;
      active = (active + (e.key === "ArrowDown" ? 1 : links.length - 1)) % links.length;
      links.forEach((l, i) => l.classList.toggle("is-active", i === active));
      links[active].scrollIntoView({ block: "nearest" });
      return;
    }
    if (e.key === "Enter" && links[Math.max(active, 0)]) {
      location.href = links[Math.max(active, 0)].dataset.href;
      close();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== input &&
        !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
      e.preventDefault();
      input.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#search-root")) close();
  });
})();
