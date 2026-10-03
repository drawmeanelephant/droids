const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const assets = path.join(root, "manila/assets");
const script = fs.readFileSync(path.join(assets, "js/manila.js"), "utf8");
const manifest = JSON.parse(fs.readFileSync(path.join(assets, "icons/mascots.json")));
const settle = () => new Promise(resolve => setImmediate(resolve));

function enhance(fonts, mascot = "oliver") {
  const glyph = { textContent: mascot === "sexiburger" ? "\uE001" : "\uE008", hidden: true };
  const svg = { hidden: false };
  const mark = {
    dataset: { mascot, renderer: "svg" },
    querySelector: selector => selector === ".mascot-glyph" ? glyph : svg,
  };
  const document = {
    documentElement: { dataset: {} },
    currentScript: { src: "https://example.test/blog/assets/js/manila.js" },
    fonts,
    querySelector: () => null,
    querySelectorAll: selector => selector === "[data-mascot]" ? [mark] : [],
    getElementById: () => null,
  };
  vm.runInNewContext(script, { document, URL, navigator: {} });
  return { glyph, svg, mark };
}

test("SVG remains visible until the actual mascot font finishes loading", async () => {
  let done;
  const { glyph, svg, mark } = enhance({
    load: (spec, text) => {
      assert.equal(spec, '400 48px "Virelai Mascots"');
      assert.equal(text, "\uE008");
      return new Promise(resolve => { done = resolve; });
    },
  });
  assert.equal(svg.hidden, false);
  assert.equal(glyph.hidden, true);
  done([{}]);
  await settle();
  assert.equal(svg.hidden, true);
  assert.equal(glyph.hidden, false);
  assert.equal(mark.dataset.renderer, "font");
});

test("Sexiburger loads its Sans face, not Virelai Mascots", async () => {
  const { mark } = enhance({
    load: async (spec, text) => {
      assert.equal(spec, '400 48px "Virelai Sexiburger"');
      assert.equal(text, "\uE001");
      return [{}];
    },
  }, "sexiburger");
  await settle();
  assert.equal(mark.dataset.renderer, "font");
});

for (const [name, fonts] of [
  ["failed font request", { load: async () => { throw new Error("offline"); } }],
  ["absent face", { load: async () => [] }],
  ["unavailable Font Loading API", undefined],
]) {
  test(`${name} retains the SVG without exposing a PUA box`, async () => {
    const { glyph, svg, mark } = enhance(fonts);
    await settle();
    assert.equal(svg.hidden, false);
    assert.equal(glyph.hidden, true);
    assert.equal(mark.dataset.renderer, "svg");
  });
}

test("committed font and SVG assets match their pinned provenance hashes", () => {
  assert.equal(manifest.sourceCommit, "644ae7cea7c9b91db50eafee303d4a1011df2afd");
  assert.equal(manifest.faces.length, 2);
  assert.equal(manifest.marks.length, 3);
  for (const item of [...manifest.faces, ...manifest.marks]) {
    const bytes = fs.readFileSync(path.join(assets, item.file));
    assert.equal(crypto.createHash("sha256").update(bytes).digest("hex"), item.sha256, item.file);
    if (item.file.endsWith(".woff2")) {
      assert.equal(bytes.subarray(0, 4).toString(), "wOF2");
      assert.equal(bytes.length, item.bytes);
      assert.ok(item.tables.COLR && item.tables.CPAL && item.tables["CFF "]);
    }
  }
});

test("project-title marks are decorative, initially SVG, and preserve heading anchors", () => {
  for (const [page, id, mark, cp] of [
    ["oliver", "oliver", "oliver", "E008"],
    ["filed-fyi", "the-filedfyi-constellation", "filed-robot", "E009"],
    ["virelai-os", "virelaios", "sexiburger", "E001"],
  ]) {
    const content = fs.readFileSync(path.join(root, `content/projects/${page}.md`), "utf8");
    assert.ok(content.includes(`<h1 id="${id}" class="project-title">`));
    assert.ok(content.includes(`data-mascot="${mark}" data-renderer="svg" aria-hidden="true" data-boris-search-exclude`));
    assert.ok(content.includes(`class="mascot-glyph" hidden>&#x${cp};`));
    assert.ok(content.includes('alt=""'));
  }
});

test("glyph faces are PUA-only and do not replace Geist or synthesize styles", () => {
  const css = fs.readFileSync(path.join(assets, "css/manila.css"), "utf8");
  assert.match(css, /font-family: "Virelai Mascots";[^}]*unicode-range: U\+E002-E00A;/);
  assert.match(css, /font-family: "Virelai Sexiburger";[^}]*unicode-range: U\+E001;/);
  assert.match(css, /--sans: "Geist"/);
  assert.match(css, /\.mascot-glyph\s*\{[^}]*font-synthesis: none;/);
  assert.match(css, /\.mascot-glyph\s*\{[^}]*font: 400 \.95em\/1 "Virelai Mascots";/);
});
