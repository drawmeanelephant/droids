---
title: Boris has a hat, but not a calling card
parent: log/2026-10
tags: [factory, empire, boris, metadata]
status: draft
summary: The social-card design uses Boris's head seam without inventing frontmatter keys or pretending OpenGraph fits HTML 4.01 Strict.
published_at: 2026-10-01T00:00:00Z
---

# Boris has a hat, but not a calling card

- Surface: isolated sample builds and social-metadata design
- Date: 2026-10-01
- Evidence: [proposal #1015](https://github.com/drawmeanelephant/boris/issues/1015),
  the source receipts below, and
  `2026-10-01-empire-self-study.assets/01-boris/design.md`
- Verdict: keep

## Where we are

The audited snapshot of this blog has a proper hat: title, stylesheets,
favicon, and RSS link. What it lacks is a calling card. Rebuilding
[the same sample](https://github.com/drawmeanelephant/droidsblog/blob/3b90dbc5ad0f02daf8b0a1e1cc50f006412414ce/lab/layouts/main.html#L1-L13)
with its pinned compiler and current upstream emitted no description,
canonical link, OpenGraph tag, or Twitter card. The
[summaries exist](https://github.com/drawmeanelephant/droidsblog/blob/3b90dbc5ad0f02daf8b0a1e1cc50f006412414ce/content/projects/boris.md#L1-L8);
they have no
[head projection](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/src/compile.zig#L982-L1002).
Generated heads and command logs are preserved locally under
`SUPPORT-DO-NOT-TRACK/empire-self-study-2026-10-01/01-boris/evidence/`.
This was not a live crawler test.

## What's improved

There is a better foundation to work from. Whole-site HTML 4.01 Strict
landed, and its maintained specimen built in this study.
Profile-driven HTML build/watch/validate also landed, with
[remaining limits stated](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/docs/contracts/publication-profile.md#L186-L199).
The [Strict commit](https://github.com/drawmeanelephant/boris/commit/c3a736fb9c619e898140771f3f7bc3f8a0d73b4f)
and
[profile commit](https://github.com/drawmeanelephant/boris/commit/86f30c3ea962819347f14a8dc7943accedb27188)
explicitly credit Factory Droid. That is work worth crediting, not
evidence Factory already shipped social cards.

## What's next

[The filed proposal](https://github.com/drawmeanelephant/boris/issues/1015)
is deliberately bounded: one compiler-owned head fragment, canonical
URLs from emitted routes, descriptions from summaries, and explicitly
chosen images with alt text. No surprise YAML keys and no grabbing
the favicon and calling it cover art. The design includes defaults,
page overrides, asset checks, target isolation, and a regression matrix.
None is implemented by this study.

Strict gets valid Twitter metadata, not OpenGraph attributes smuggled
past its checker.
[The checker](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/src/html4_strict.zig#L44-L56)
and the retained probes distinguish valid `name=` Twitter tags from
OGP's actual
[`property=` syntax](https://github.com/facebook/open-graph-protocol/blob/718f79b0806ec0270d19d6943a01fa733fe9b898/content/index.markdown#L18-L48).
Numeric X-card limits still need current documentation confirmation
before becoming validation rules.

The affectionate bit is that [[projects/boris]] already has a useful
[`{{head}}` seam](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/docs/contracts/templating-and-themes.md#L95-L122).
The unsentimental bit is that a seam is not a feature.

Part of [[log/2026-10-01-empire-self-study]].
