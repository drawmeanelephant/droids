# Proposed Boris head and social-card contract

**Status: design only; nothing below is implemented by this study.**

**Baseline:** Boris `08969742f85238443ce5cd1cd53ceab1b1f3f85a`, observed 2026-10-01.

**Owner priority:** proper OpenGraph and Twitter/X cards, without changing the content grammar or compromising HTML 4.01 Strict.

## 1. What exists, and what the new feature owns

Current `{{head}}` is an optional, once-per-layout, compiler-owned slot that composes Standard.site document links and Nostr alternates. The sample already places it inside `<head>`. Titles are escaped separately through `{{title}}`; summaries do not currently become description tags. See [current assembly](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/src/compile.zig#L935-L1004) and [slot contract](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/docs/contracts/templating-and-themes.md#L95-L122).

Add one **resolved head model**, not individual author-supplied tag strings:

```text
ResolvedPageHead {
    target identity and selected output profile
    eligible: bool
    canonical_url: optional validated absolute URL
    social_title: text
    description: optional text
    site_name: optional text
    object_type: website | article
    published_at: optional actual page timestamp
    image: optional { absolute URL, alt, MIME, dimensions, ownership }
    twitter: { card, optional site handle, optional creator handle }
    effective OpenGraph mode
}
```

The resolver owns defaults and validation; the emitter owns HTML escaping and tag order. Build, zero-write validate, incremental, parallel workers, watch, and embedding consumers must share that resolver rather than invent independent head logic.

**Do not change:** the browser `<title>` slot or theme suffix; graph roles; frontmatter; IR/RAG page shape; `{{metadata}}` body bytes; current Standard.site/Nostr eligibility. Social configuration is target configuration, not a new source-document fact.

## 2. Closed configuration and compatibility

### Proposed input format

Use a **publication-profile schema v2**, accepted alongside unchanged v1. This is an explicit proposal: neither v2 nor the following fields work today. V1 profiles retain their existing normalized plans and disabled social behavior. Emit a versioned v2 plan/schema for v2 profiles rather than quietly adding keys to the closed v1 plan schema.

Add optional `social` to each HTML target. Also expose the already-existing output-profile choice as a v2 target `html_profile` enum (`html`, `xhtml`, `html4-strict`, default `html`) so the profile can describe the compatibility decision without a second configuration source. That field maps to the existing renderer profile; it is not a new rendering system.

Example intended configuration for this blog:

```json
{
  "format": "boris-publication-profile",
  "schema_version": 2,
  "input": "content",
  "site": {
    "url": "https://droids.filed.fyi/",
    "title": "droids.filed.fyi",
    "description": "Factory AI field notes — what got delegated, what shipped, and the nits."
  },
  "targets": [{
    "name": "public",
    "output": "output-html",
    "public": true,
    "theme": "lab",
    "html_profile": "html",
    "layout_rules": [{
      "selector": "id:index",
      "layout": "lab/layouts/trunk.html"
    }],
    "static": { "dir": "static" },
    "social": {
      "enabled": true,
      "opengraph": "auto",
      "twitter": { "card": "auto" },
      "defaults": {
        "type": "website",
        "image": {
          "kind": "static",
          "path": "social/site-card.png",
          "alt": "The droids.filed.fyi delegation loop, drawn as three linked boxes."
        }
      },
      "pages": [{
        "id": "log/2026-09-27-boris-html4-strict",
        "type": "article",
        "image": {
          "kind": "page-asset",
          "path": "card.png",
          "alt": "Boris's HTML 4.01 Strict specimen with its navigation and proof panel."
        }
      }]
    }
  }]
}
```

Those PNGs are **hypothetical assets**, not files created by this study. Neither art nor an X account is inferred from the sample favicon or repository owner.

### Exact grammar

`social` allows only:

| Key | Proposed value/default |
|---|---|
| `enabled` | Boolean; default `false` |
| `base_url` | Optional absolute HTTP(S) deployment base, including any base path |
| `opengraph` | `off`, `auto`, `required`; default `auto` when enabled |
| `twitter` | Closed object: `enabled` (default true), `card` (`auto`, `summary`, `summary_large_image`, default auto), optional `site`, `creator` handles |
| `defaults` | Closed object: optional `description`, `type`, `image` |
| `pages` | Array of exact canonical entity-id overrides; default empty, maximum 256 |

Each `pages` item allows only `id` (required), `enabled`, `title`, `description`, `type`, `image`, and `twitter`. No selectors, globs, inheritance through parents, functions, includes, arbitrary HTML, canonical URL override, or arbitrary property names. Duplicate IDs are errors, and IDs must resolve to discovered pages even when an override disables that page. This catches stale configuration after a rename.

`defaults.description` and page `description` may be null to suppress that field; omission inherits. `image: null` explicitly suppresses an inherited image. An image object is replaced **atomically**, never merged with a prior object's alt or dimensions. Page `enabled: true` cannot activate a disabled target or override draft suppression. `twitter` fields inherit individually from the target; unknown and duplicate keys are rejected.

Re-use existing JSON/path bounds: 262,144 profile bytes, nesting 16, decoded string 4,096 bytes, path 1,024 bytes, 32 targets. Additional proposed policy bounds: titles 512 UTF-8 bytes; descriptions 1,024 bytes; nonempty image alt at most 420 Unicode code points and 1,680 UTF-8 bytes; handles `@` plus 1–15 ASCII alphanumerics/underscores; dimensions positive integers no larger than 16,384. These are **chosen compiler policy**, not a claim that current X documentation was fully verified.

Malformed configuration is exit **2**, named by target and JSON field. Unknown page/asset or content-derived conflicts are exit **1** with source/page context. Read failures are exit **3**. Proposed diagnostics should be registered in the existing diagnostic/report system, not printed ad hoc.

`boris plan` remains offline declaration: it validates grammar and static contradictions but does not claim an image or page exists. Build/validate perform dynamic validation.

## 3. Defaults and override precedence

Evaluate only enabled, eligible target/page pairs:

| Result | Resolution, highest precedence first |
|---|---|
| Social title | Page social override → frontmatter `title` → canonical entity id |
| Description | Page social override → page `summary` → target `defaults.description` → `site.description` → absent |
| Site name | `site.title` → absent |
| Image | Page override (including explicit null) → target default → absent |
| Type | Page override → target default → `website` |
| Twitter settings | Page field → target field → built-in default |
| Canonical | Generated exclusively from this target's validated base + this page's actual emitted output path |

Do not append the site's browser-title suffix to social titles. Do not use rendered-search's `data-boris-search-title`, first headings, first body paragraphs, first images, tags, file mtimes, current clock, a sibling's override, or a drafted parent's values.

`article` is an explicit assertion: a graph Satellite is not necessarily an article, and having `published_at` alone does not make it one. Emit `article:published_time` only when type is article and the page contains its existing validated timestamp. No invented modified time, author, publisher identity, or locale.

Raw description input is **plain text**. A summary containing literal `<b>words</b>` remains literal text, escaped in the attribute; do not parse it as HTML or Markdown. Missing description is omitted, not replaced by an empty tag or scraped prose.

For explicit Twitter output, derive a bounded display projection: maximum 70 Unicode code points for title and 200 for description, truncating on code-point boundaries with a final ellipsis inside that maximum. Preserve the full OGP/general description within the source bounds. Cover multibyte and combining-character examples; this is not a grapheme-perfect typography guarantee. Confirm these proposed caps against current X documentation before implementation approval.

## 4. Canonical URLs and target isolation

Current Boris uses exact `.html` routes for RSS/sitemap rather than a pretty-URL router; [RSS URL construction](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/src/rss.zig#L60-L65) and [shared base grammar](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/src/site_url.zig#L79-L106) provide the existing seam.

Resolve the effective public base as:

1. Target `social.base_url`, if explicitly supplied.
2. The normalized publication base for the **one declared public target**.
3. `site.url` for the public target only.
4. Otherwise absent.

If two applicable declarations disagree after existing normalization, fail—no “last option wins.” A non-public target may opt in with an explicit base but must not borrow the public target's base. Its `public: false` flag is not a privacy/access-control boundary; explicit social opt-in is a conscious advertisement choice.

An enabled target requires an absolute base; relative `/docs`, `../`, protocol-relative `//host`, empty URL, query/fragment, userinfo, and non-HTTP(S) schemes are configuration errors. Do not resolve them through `<base href>` or the preview server. Recommend HTTPS for deployed cards but retain the established HTTP(S) grammar rather than silently making HTTP unsupported.

Construct from the normalized base without trailing slash, `/`, and the **actual compiler output path**, percent-encoding UTF-8/path bytes with the existing URI path encoder. Do not construct from a Markdown source path. Output examples:

```text
base https://droids.filed.fyi/
    index.html           → https://droids.filed.fyi/index.html
    projects/boris.html  → https://droids.filed.fyi/projects/boris.html

base https://owner.github.io/notes/
    guides/café.html     → https://owner.github.io/notes/guides/caf%C3%A9.html
```

`/index.html` is intentional and agrees with current feed/sitemap route projection; switching to `/` or directory routes needs a separate routing/redirect contract. No canonical override, query-bearing tracking URL, fragment canonical, or cross-origin alias in v1 of this feature. `rel=canonical`, `og:url`, and optional `twitter:url` would all use the identical value; omit redundant `twitter:url` in the first implementation.

Navigation and stylesheets remain page-relative. Supplying a hosted URL must not rewrite them or add `<base>`. Extend the existing publication-location audit for owned metadata consistency without treating an external image CDN as the page's canonical origin.

**Important current limit:** profile execution currently refuses multi-target sitemap/static/publication metadata. This proposal does not erase those refusals. Support target-local social models independently, or fail before publication if a configuration still requests unsupported combined projections. Do not build a subset and claim the full declaration succeeded.

## 5. Image ownership, alt and card type

An image is a closed tagged union:

| Kind | Required fields | Resolution |
|---|---|---|
| `theme` | `path`, `alt` | Selected target theme's existing `assets/…` inventory |
| `static` | `path`, `alt` | Selected target's declared static directory, path relative to its output root |
| `page-asset` | `path`, `alt` | Current page's sibling `<source-stem>.assets/` inventory |
| `remote` | `url`, `alt`, optional `mime`, paired `width`/`height` | Explicit external absolute HTTPS image declaration; never fetched during compilation |

`page-asset` is allowed **only in page overrides**, not target defaults. Reuse the content-asset implementation, which locates assets using the source stem but emits them under the canonical entity id ([existing helpers](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/src/content_asset.zig#L117-L163)). For a source `drafts/note.md` with `id: essays/one`, `card.png` is loaded from `drafts/note.assets/card.png` and its public URL names `essays/one.assets/card.png`. Do not confuse source paths and routes.

Local image paths are inventory references, not unconstrained filesystem reads. They must exist as regular non-symlink files owned by that target, survive output collision checks, and resolve in the planned overlay before emission. All local image URLs use the selected target's public base plus the actual inventoried asset output path. Missing or unsafe images are errors even if no Markdown body image references them.

For the first slice, accept local PNG/JPEG only, verify magic/type and dimensions using existing image-header machinery, and require at most 4 MiB. This deliberately conservative interchange policy avoids SVG favicons, unsupported modern formats, and automatic GIF frame selection; broader support can be a later explicit contract change. Do not require new image-processing dependencies.

Remote `url` is nonempty HTTPS, no credentials/query/fragment, maximum 2,048 bytes. MIME and dimensions, if supplied, are **author declarations**, not verified observations. If MIME is supplied, allow only `image/png` or `image/jpeg`. A paired width/height declaration is required for an explicit large-image card; remote `auto` without dimensions stays `summary`. Compiler success never certifies that a remote URL returns image bytes or permits crawling.

Alt is required whenever an image is selected. It describes **what is visible**, not the article title; never copy a page title automatically. A missing alt is an actionable configuration error, not a decorative-empty escape hatch.

Twitter `auto` chooses `summary_large_image` when an image has known/declared dimensions with width at least 300, height at least 157, and width greater than height; otherwise `summary`. An explicit large-image selection without that suitability is an error. These thresholds are proposed policy pending current X-doc confirmation. Emit `twitter:image` and `twitter:image:alt` when there is an image, for either supported card type. No separate Twitter image override in the first slice: two competing art sources create needless drift.

Recommend intentionally composed 1200×630 PNG/JPEG art, with important content away from edges. That is a production recommendation, not universal crawler sizing certification. A valid image might still be cropped differently by different services. Never resize or generate images implicitly.

OGP's basic object requires an image. With `opengraph: auto` and no image, omit the **entire OGP block**, emit ordinary canonical/description and Twitter summary if enabled, and issue one bounded missing-image warning. Do not call an image-less partial object a complete OGP card. With `required`, missing image fails; with `off`, emit no OGP and no such warning.

## 6. HTML5, Strict and XHTML emission

### HTML5

Emit canonical, optional general description, a complete OGP object, and explicit Twitter fields inside `{{head}}`. OGP uses `property`, Twitter uses `name`. Emit each image's structured properties immediately after its root `og:image`.

OGP is RDFa-based ([protocol](https://github.com/facebook/open-graph-protocol/blob/718f79b0806ec0270d19d6943a01fa733fe9b898/content/index.markdown#L18-L48)). Avoid a hidden requirement for themes to introduce namespace attributes: each generated OGP `<meta>` carries its own RDFa `prefix="og: https://ogp.me/ns#"`; article metadata carries the analogous article prefix. This keeps the fragment self-contained. A future optimization may move shared declarations onto `<head>` only with a contracted layout mechanism. It must not simply insert a second `<head>`.

Illustrative proposed bytes:

```html
<link rel="canonical" href="https://droids.filed.fyi/projects/boris.html">
<meta name="description" content="A compiler &amp; its receipts.">
<meta prefix="og: https://ogp.me/ns#" property="og:title" content="Boris">
<meta prefix="og: https://ogp.me/ns#" property="og:type" content="website">
<meta prefix="og: https://ogp.me/ns#" property="og:url" content="https://droids.filed.fyi/projects/boris.html">
<meta prefix="og: https://ogp.me/ns#" property="og:site_name" content="droids.filed.fyi">
<meta prefix="og: https://ogp.me/ns#" property="og:description" content="A compiler &amp; its receipts.">
<meta prefix="og: https://ogp.me/ns#" property="og:image" content="https://droids.filed.fyi/social/site-card.png">
<meta prefix="og: https://ogp.me/ns#" property="og:image:type" content="image/png">
<meta prefix="og: https://ogp.me/ns#" property="og:image:width" content="1200">
<meta prefix="og: https://ogp.me/ns#" property="og:image:height" content="630">
<meta prefix="og: https://ogp.me/ns#" property="og:image:alt" content="Three linked boxes showing the delegation loop.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Boris">
<meta name="twitter:description" content="A compiler &amp; its receipts.">
<meta name="twitter:image" content="https://droids.filed.fyi/social/site-card.png">
<meta name="twitter:image:alt" content="Three linked boxes showing the delegation loop.">
```

Optional configured Twitter site/creator tags follow `twitter:card`. No handle is guessed. No `og:image:secure_url` duplicate when the primary image is already HTTPS.

### HTML 4.01 Strict

Keep its existing exact DOCTYPE, UTF-8 declaration, title and conservative checker. `prefix` and `property` are not allowed. Emit canonical, description, and Twitter `name=` tags, using normal HTML4 void-element syntax, without ARIA/data attributes.

- `opengraph: off`: no OGP, no compatibility warning.
- `auto`: omit OGP and warn once per Strict target that OGP cannot be emitted; ordinary/Twitter metadata still works.
- `required`: configuration failure before target replacement.

Do **not** transform `property="og:title"` to `name="og:title"` and label it equivalent. The executed probe showed syntactic acceptance only. Do not relax `html4_strict.zig` to accept RDFa extensions while still calling output HTML 4.01 Strict.

### XHTML

First slice: refuse enabled social output on XHTML with a named unsupported-profile error. Support later only after specifying the XHTML/RDFa profile, namespace context, XML escaping, void-element serialization, and whole-page fixtures. The current `.xhtml` renderer selection is not evidence of XHTML+RDFa conformance. Disabled social output preserves prior XHTML bytes.

## 7. Escaping, layout ownership and drafts

Use double-quoted attribute values and the existing tested HTML escaping policy for `&`, `<`, `>`, and `"` ([encoder](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/src/html_nav.zig#L12-L27)). Apostrophes are safe literal bytes in this container; avoid generating `&apos;`, which is not in the Strict checker's named-entity subset. Route bytes are URI-percent-encoded first, then HTML-attribute-escaped. Do not HTML-decode author summaries first: a literal `&amp;` must stay literal text, not become an ampersand via double interpretation.

Validate UTF-8 and reject NUL/forbidden controls and embedded line separators in social-config single-line text at ingestion. Never interpolate raw source text into tag names, attribute names, or trusted raw HTML. Compiler literals are static; values take an encoding path.

When metadata is enabled, the selected layout must contain exactly one `{{head}}`, located in the actual document head, outside comments and attribute values. Missing/misplaced head slots fail preflight rather than silently promising cards. Preserve the currently optional slot behavior when the feature is disabled.

The feature owns canonical, general description, the emitted `og:*` family, article publication time, and enabled `twitter:*` fields. Reject conflicting/duplicate hand-authored owned head tags in enabled output, even when values happen to match; do not rely on crawler “first wins,” strip author HTML silently, or allow an OGP image array in the single-image first slice. Run checks on assembled bytes so raw author HTML cannot insert a competing head object unnoticed. Disabled mode retains the existing trusted-author behavior.

Compose in fixed order: ordinary metadata, OGP, Twitter, existing Standard.site links, existing Nostr alternates. Only new fragments get new behavior; neither protocol's prior semantics are redefined.

**Draft policy:** a page with `status: draft` gets no new canonical, description, OGP, Twitter, or article head output. Its title, HTML route and current own-page context remain. Do not attach inherited social images to it. No override bypass in the first slice. Published, archived, and unset status retain current advertised-equivalent eligibility; this respects compiler semantics rather than assuming “missing status means draft.”

Draft HTML is still emitted: this is **not privacy** and does not retroactively make existing outputs inaccessible. `noindex`/robots behavior needs a separate explicit policy; do not claim social omission prevents crawling. Existing Standard.site/Nostr independently continue excluding drafts under their own rules.

## 8. Compiler integration and invalidation

Recommended implementation seams:

1. `publication_profile.zig` and profile/plan schemas: own the typed closed configuration, versions and bounds.
2. A small Zig `social_head.zig`: resolve durable page facts plus target config into a per-page model and emit the encoded fragment on the Whiteboard.
3. `compile.zig`: compose that fragment into `renderPageSlots`, shared by validator and publisher; retain any required page title/summary/status/timestamp bytes before source buffers are released.
4. Existing theme/static/content-asset inventories: resolve only owned local images; never scan arbitrary workspace files.
5. Existing assemble/link-audit/diagnostic facilities: head placement, duplicate/conflict checks, actual route and location consistency.
6. Existing target/watch/cache machinery: pass target-local immutable config, never globals.

No new framework, subprocess renderer, Node toolchain, network request, plugin hook, or secondary authoring pipeline.

Fingerprint the **resolved semantic model**, selected profile, and relevant owned-image facts. A page's title/summary/status/type/override change dirties it; a target default/base/site-name change dirties every affected page in that target; image dimensions/MIME/path changes dirty referring pages; image byte changes must invalidate relevant image-derived facts even when length is unchanged. Existing asset staging still publishes the changed bytes. If the image URL stays the same, external crawler caches may remain stale—compiler cache correctness is not crawler cache invalidation.

Hash only applicable target/page override material so one target's config does not dirty or leak into another. Profile object order and override array order cannot change normalized semantics. The normalized v2 plan includes the social declaration; it does not claim files were read.

For the first shipped slice, follow current watch's **startup profile snapshot**: profile edits require restart and that limitation is documented. Do not promise live profile refresh as part of social support. Owned image/content/layout changes must participate in normal watch rebuilds. The hosted base remains the configured public URL, never `127.0.0.1`.

## 9. Regression matrix and gates

Add focused tests next to the existing modules and fixtures, not a parallel verification product:

| Case | Required assertion |
|---|---|
| Feature disabled; profile v1 | Existing HTML/Strict/XHTML bytes and plans unchanged |
| Enabled HTML5, complete image | Exactly one canonical/description; four basic OGP properties; explicit Twitter; proper prefix/property/name syntax |
| Page without title/summary | Entity-id title fallback; site description fallback or omitted tag |
| Overrides/nulls/order | Exact-id precedence, atomic image replacement, explicit omission, stale/duplicate IDs rejected, object/array order deterministic |
| Root/nested/project URLs | `/index.html` policy, base path included once, `.html` preserved, Unicode percent-encoded, no tracking/fragment/relative canonical |
| Location disagreement | Conflicting site/public/target declarations fail and preserve prior target |
| Relative/local build | Disabled stays old-relative; enabled with relative/no base refuses; `<base>` cannot supply public identity |
| Title/description/alt attacks | Quotes, ampersands, `<script>`, literal entities, apostrophes, Unicode remain data; controls rejected; Strict contains no `&apos;` |
| Local image owners | Theme/static/page-asset pass; ID override maps source stem to actual asset route; missing/symlink/traversal/collision/wrong magic/oversize fail |
| Remote image | No network calls; URL grammar checked; declared dimensions distinguished from observed; explicit large-card suitability enforced |
| No image / alt | `auto` warns and omits whole OGP block; required fails; no image/alt invented |
| Card/type/timestamp | Website default, explicit article only; real timestamp only; bounded Twitter text; no site/creator unless configured |
| Draft/unset/archived | Draft route still emitted with new fragment empty; no inherited card; other eligibility matches existing contract; no privacy claim |
| Strict | Twitter/canonical/description pass full checker; OGP auto omitted visibly, required refused; proof HTML still valid |
| XHTML | Enabled refused honestly in first slice; disabled bytes unchanged |
| Layout head ownership | Missing/misplaced slot and hand-authored duplicate keys fail; existing Standard.site/Nostr links retain their bytes/eligibility |
| Multi-target | Different base/profile/image in each target, independent cache/output; no public-base inheritance into preview; unsupported combined projections fail loudly |
| Clean/incremental/parallel | Exact byte agreement, same-length image mutation, profile/default/status changes, no-op reuse |
| Validate/watch/failure | Zero-write preflight sees same errors; prior output preserved on prepublication failure; documented profile restart; image edits trigger rebuild |

Use normal `zig build test`, focused compile/render/validation tests, and the standing release gate; add process-level assertions to existing CLI tests. For Strict, corroborate a representative generated page/proof sample with existing HTML4-aware tooling, without claiming arbitrary SGML certification.

After local gates, an **owner-authorized** deployed test should fetch the emitted head and image, inspect MIME/dimensions/redirects and crawlability, and try an actual X card plus an OGP consumer. Record real observed output and any caches; do not fake success from parser tests. This study performed none of those live checks.

## 10. Sequencing and decisions for the owner

1. Approve the design's canonical `.html` policy, no-frontmatter rule, schema-v2 compatibility, draft suppression, and Strict omission/refusal behavior.
2. Implement single-target HTML5, local PNG/JPEG ownership, ordinary metadata/complete OGP/explicit Twitter, exact-id overrides and focused regressions.
3. Extend Strict emission and target-local execution, then multi-target isolation tests. Preserve the existing broader profile refusals; do not silently solve them by bypassing the coordinator.
4. Review current X docs, validate namespace-bearing OGP with real consumers, and run the authorized deployed smoke. Adjust proposed suitability/text policy from actual documentation, not folklore.
5. Defer XHTML+RDFa, remote-image breadth, multiple images, cross-domain canonicals, generated art, and dynamic profile refresh until separately contracted.

This is **one deduplicated feature proposal**, not a bundle of already-filed defects. Existing body-theme hooks (#1007), editor-head fixes (#1010/#1014), profile execution (#1006/#1013), and Strict rendering (#1004) are adjacent infrastructure, not unimplemented social-card tickets. The proposed behavior must remain labelled unshipped until implementation and its gates land.
