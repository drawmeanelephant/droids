const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");
const read = name => fs.readFileSync(path.join(root, name), "utf8");

test("MIT covers the reusable software with explicit content and asset exceptions", () => {
  const license = read("LICENSE");
  assert.match(license, /^MIT License/);
  assert.match(license, /Permission is hereby granted, free of charge/);
  assert.match(license, /THE SOFTWARE IS PROVIDED "AS IS"/);
  for (const exception of ["content/", "static/", "Virelai fonts", "mascot artwork", "third-party"]) {
    assert.ok(license.includes(exception), exception);
  }
  assert.match(read("LICENSING.md"), /`examples\/` \| MIT/);
});

test("the closed-asset notice identifies every committed mascot font and SVG", () => {
  const manifest = JSON.parse(read("manila/assets/icons/mascots.json"));
  const notice = read("manila/assets/fonts/VIRELAI-NOTICE.txt");
  for (const asset of [...manifest.faces, ...manifest.marks]) {
    assert.ok(notice.includes(path.basename(asset.file)), asset.file);
  }
  assert.match(notice, /excluded from the repository's MIT licence/);
  assert.match(notice, /All rights reserved/);
  assert.match(read("LICENSING.md"), /Boris copies all theme assets/);
  assert.match(read("manila/assets/fonts/OFL.txt"), /SIL OPEN FONT LICENSE Version 1\.1/);
});

test("the content starter stays outside the live graph and deployment output", () => {
  const example = read("examples/review-site/content/first-review.md");
  assert.match(example, /^status: draft$/m);
  assert.match(example, /^parent: index$/m);
  assert.match(read("README.md"), /--html-dir \.probe-dist\/review-starter/);
  assert.match(read(".github/workflows/ci.yml"), /Validate reusable content starter/);
  assert.equal(JSON.parse(read("boris.json")).input, "content");
});
