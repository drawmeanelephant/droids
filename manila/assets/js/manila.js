/* manila: progressive enhancement for droids.filed.fyi. Every page reads
   fine without this file; it only adds the mode switch, docket chips,
   session-record labels, terminal frames, and the search palette. */
(() => {
  const root = document.documentElement;
  // Resolve the site root from this script's own URL (assets/js/manila.js)
  // so links work at any page depth and under any host path.
  const BASE = new URL("../../", document.currentScript.src);

  /* ---------- color modes ---------- */
  const MODE_KEY = "droids-mode";
  const MODES = ["dark", "light", "pride"];
  const modes = document.querySelector(".modes");
  const setMode = (mode, save) => {
    root.dataset.mode = mode;
    if (save) {
      try { localStorage.setItem(MODE_KEY, mode); } catch { /* private mode */ }
    }
    modes?.querySelectorAll("[data-mode-set]").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.modeSet === mode)),
    );
  };
  if (modes) {
    modes.hidden = false;
    setMode(MODES.includes(root.dataset.mode) ? root.dataset.mode : "dark", false);
    modes.addEventListener("click", (e) => {
      const b = e.target.closest("[data-mode-set]");
      if (b) setMode(b.dataset.modeSet, true);
    });
  }

  /* ---------- docket ---------- */
  document.querySelectorAll(".page-metadata > div").forEach((row) => {
    const dt = row.querySelector("dt");
    const dd = row.querySelector("dd");
    if (!dt || !dd) return;
    const key = dt.textContent.trim().toLowerCase();
    row.dataset.key = key;
    if (key === "status") {
      row.dataset.value = dd.textContent.trim().toLowerCase();
      root.dataset.status = row.dataset.value;
    }
    if (key === "tags") {
      const tags = dd.textContent.split(",").map((t) => t.trim()).filter(Boolean);
      dd.replaceChildren(...tags.map((t) => {
        const chip = document.createElement("span");
        chip.className = "chip";
        chip.textContent = t;
        return chip;
      }));
    }
  });

  /* ---------- session record ---------- */
  // "Surface: Factory App" -> key/value cells. Only the leading text node is
  // split, so inline code and links in the value survive untouched.
  document.querySelectorAll(".record__body > h1 + ul > li").forEach((li) => {
    const first = li.firstChild;
    if (!first || first.nodeType !== Node.TEXT_NODE) return;
    const at = first.data.indexOf(":");
    if (at < 1 || at > 24) return;
    const k = document.createElement("span");
    k.className = "kv__k";
    k.textContent = first.data.slice(0, at).trim();
    first.data = first.data.slice(at + 1).replace(/^\s+/, "");
    const v = document.createElement("span");
    v.className = "kv__v";
    v.append(...li.childNodes);
    li.append(k, v);
    if (k.textContent.toLowerCase() === "verdict") {
      li.dataset.verdict = v.textContent.trim().split(/\s/)[0].toLowerCase();
    }
  });

  /* ---------- terminal frames ---------- */
  document.querySelectorAll(".record__body pre").forEach((pre) => {
    const code = pre.querySelector("code");
    const lang = (code?.className.match(/language-([\w+-]+)/) || [])[1] || "output";
    const term = document.createElement("div");
    term.className = "term";
    const bar = document.createElement("div");
    bar.className = "term__bar";
    const label = document.createElement("span");
    label.textContent = lang;
    bar.append(label);
    if (navigator.clipboard) {
      const copy = document.createElement("button");
      copy.type = "button";
      copy.className = "term__copy";
      copy.textContent = "copy";
      copy.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText((code || pre).innerText);
          copy.textContent = "copied";
          copy.dataset.done = "";
        } catch {
          copy.textContent = "no clipboard";
        }
        setTimeout(() => { copy.textContent = "copy"; delete copy.dataset.done; }, 1600);
      });
      bar.append(copy);
    }
    pre.replaceWith(term);
    term.append(bar, pre);
  });

  /* ---------- search palette ---------- */
  const dialog = document.getElementById("palette");
  const opener = document.querySelector("[data-palette-open]");
  if (!dialog || !opener || typeof dialog.showModal !== "function") return;

  const input = dialog.querySelector("input");
  const list = dialog.querySelector(".palette__results");
  let docs = null;
  let hits = [];
  let sel = -1;

  const load = async () => {
    if (docs) return docs;
    try {
      const res = await fetch(new URL("_boris/search/search-index.json", BASE));
      docs = (await res.json()).documents || [];
    } catch {
      docs = [];
    }
    return docs;
  };

  const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const rank = (terms) => {
    const out = [];
    for (const d of docs) {
      const title = (d.title || "").toLowerCase();
      let total = 0;
      let best = null;
      let bestScore = 0;
      let missed = false;
      for (const t of terms) {
        let hit = title.includes(t) ? (title.startsWith(t) ? 12 : 8) : 0;
        for (const s of d.sections || []) {
          const sScore =
            ((s.heading || "").toLowerCase().includes(t) ? 5 : 0) +
            ((s.text || "").toLowerCase().includes(t) ? 2 : 0) +
            ((s.code || "").toLowerCase().includes(t) ? 3 : 0);
          hit += sScore;
          if (sScore > bestScore) { bestScore = sScore; best = s; }
        }
        if (!hit) { missed = true; break; }
        total += hit;
      }
      if (!missed) out.push({ d, total, best });
    }
    return out.sort((a, b) => b.total - a.total).slice(0, 12);
  };

  const snippet = (text, terms) => {
    const lower = text.toLowerCase();
    let at = -1;
    for (const t of terms) {
      const i = lower.indexOf(t);
      if (i >= 0 && (at < 0 || i < at)) at = i;
    }
    const start = Math.max(0, at - 40);
    return (start > 0 ? "…" : "") + text.slice(start, start + 150) + (start + 150 < text.length ? "…" : "");
  };

  const highlight = (el, text, terms) => {
    const re = new RegExp("(" + terms.map(escapeRe).join("|") + ")", "ig");
    text.split(re).forEach((part, i) => {
      if (!part) return;
      if (i % 2) {
        const m = document.createElement("mark");
        m.textContent = part;
        el.append(m);
      } else {
        el.append(part);
      }
    });
  };

  const select = (i) => {
    const items = [...list.children].filter((li) => li.getAttribute("role") === "option");
    if (!items.length) { sel = -1; input.removeAttribute("aria-activedescendant"); return; }
    sel = (i + items.length) % items.length;
    items.forEach((li, j) => li.setAttribute("aria-selected", String(j === sel)));
    input.setAttribute("aria-activedescendant", items[sel].id);
    items[sel].scrollIntoView({ block: "nearest" });
  };

  const render = (raw) => {
    const terms = raw.toLowerCase().split(/\s+/).filter(Boolean);
    list.replaceChildren();
    hits = [];
    sel = -1;
    input.setAttribute("aria-expanded", String(terms.length > 0));
    if (!terms.length) return;
    hits = rank(terms);
    if (!hits.length) {
      const li = document.createElement("li");
      li.className = "palette__empty";
      li.textContent = "no matches in the graph";
      list.append(li);
      return;
    }
    hits.forEach(({ d, best }, i) => {
      const li = document.createElement("li");
      li.id = "pr-" + i;
      li.setAttribute("role", "option");
      const a = document.createElement("a");
      a.href = new URL(d.path + (best?.fragment ? "#" + best.fragment : ""), BASE).href;
      a.tabIndex = -1;
      const title = document.createElement("span");
      title.className = "pr__t";
      highlight(title, d.title || d.path, terms);
      const path = document.createElement("span");
      path.className = "pr__p";
      path.textContent = d.path.replace(/\.html$/, "");
      a.append(title, path);
      const text = best?.text || (d.sections || []).find((s) => s.text)?.text || "";
      if (text) {
        const p = document.createElement("p");
        p.className = "pr__s";
        highlight(p, snippet(text, terms), terms);
        a.append(p);
      }
      li.append(a);
      list.append(li);
    });
    select(0);
  };

  const open = () => {
    if (dialog.open) return;
    dialog.showModal();
    input.select();
    load().then(() => render(input.value.trim()));
  };

  opener.hidden = false;
  opener.addEventListener("click", open);
  input.addEventListener("input", async () => {
    await load();
    render(input.value.trim());
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      select(sel + (e.key === "ArrowDown" ? 1 : -1));
    } else if (e.key === "Escape") {
      // A search input spends the first Escape on clearing itself.
      e.preventDefault();
      dialog.close();
    } else if (e.key === "Enter" && sel >= 0) {
      e.preventDefault();
      const a = list.querySelector(`#pr-${sel} a`);
      if (a) location.href = a.href;
    }
  });
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) ||
      document.activeElement?.isContentEditable;
    const combo = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
    if (combo || (e.key === "/" && !typing)) {
      e.preventDefault();
      open();
    }
  });
})();
