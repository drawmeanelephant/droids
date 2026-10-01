## Problem

Compiler-owned `{{head}}` composes Standard.site and Nostr links, but
not canonical, description, OpenGraph, or Twitter cards. Themes can
hand-write static tags, yet cannot request a validated per-page social
object through the existing closed slots.

This is an owner-priority feature proposal, not a regression or security
defect. No live crawler failure is claimed.

## Evidence

Observed 2026-10-01:

- [Current head assembly](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/src/compile.zig#L982-L1002).
- [Immutable sample layout](https://github.com/drawmeanelephant/droidsblog/blob/3b90dbc5ad0f02daf8b0a1e1cc50f006412414ce/lab/layouts/main.html#L1-L13).
  Its Boris CI pin is `5ef49ae2c7fcdc11cac907fecebf51ea8c3fd54b`.
- Isolated builds of that sample with both the pin and current
  `08969742f85238443ce5cd1cd53ceab1b1f3f85a` emitted no canonical,
  description, OGP, or Twitter tags despite page summaries and a
  supplied sitemap URL.
- [Strict checker](https://github.com/drawmeanelephant/boris/blob/08969742f85238443ce5cd1cd53ceab1b1f3f85a/src/html4_strict.zig#L44-L56)
  and executed probes: Twitter `name=` is accepted; OGP `property=`
  is rejected. Checker acceptance of `name="og:*"` does not make it
  proper OGP.

## Proposed scope

Contract-first, opt-in compiler-owned metadata in `{{head}}`, retaining
the current frontmatter grammar. Use closed target configuration with
exact-page overrides; one resolver/emitter shared by build and zero-write
validate.

Start with one hosted HTML5 target. Resolve title and description from
page data with explicit override precedence; canonical from the emitted
route and declared public base; image and alt from explicit configuration,
never an arbitrary body image or favicon. Separate target-local inventories
and profiles. Extend target isolation and Strict behavior through the same
model without pretending unsupported profile projections already work.

## Acceptance criteria

1. Canonical equals `og:url` and follows emitted RSS/sitemap route
   policy, including nested paths, Unicode encoding, and project bases.
2. Defaults/overrides for title, description, image+alt, type, and Twitter
   card have documented precedence; arbitrary metadata/HTML injection
   is rejected or escaped.
3. Declared theme/static/content-local images are validated before
   output; missing assets fail preflight and preserve last-good output.
4. HTML5 emits actual `property=` OGP and explicit `name=` Twitter tags.
   Strict never receives invalid OGP attributes: a required-OGP request
   fails; optional omission is visible. No `name="og:*"` compatibility
   claim.
5. Draft HTML receives no new canonical/social advertising metadata by
   default; existing draft exclusion rules remain unchanged.
6. Targets cannot borrow one another's base, image inventory, cache, or
   profile. Disabled/relative/local builds retain existing bytes and do
   not invent public absolute URLs.
7. Missing/misplaced `{{head}}` and conflicting hand-authored owned tags
   are diagnosed before publication; Standard.site/Nostr links survive.
8. Clean/incremental/parallel outputs agree; relevant changes invalidate
   affected pages; validate/build share semantics; focused tests,
   `zig build test`, and the standing release gate pass.
9. Contract/schema/changelog changes distinguish this surface from
   existing profile-execution limits; existing configurations retain
   their behavior.

The study's separate design includes the full resolver/configuration
proposal. This issue is self-contained and does not assert it is shipped.
X-specific numeric constraints still need authoritative confirmation
before they become validation rules.

## Not in scope

Frontmatter expansion; arbitrary metadata passthrough; image generation
or resizing; a Node pipeline; scraped descriptions; inferred author
identity; live publication/crawler certification; cross-domain aliases;
a pretty-URL router; completing the entire profile coordinator;
body-metadata theme-hook redesign.

## Duplicate check

All 1,013 open/closed issue/PR records were searched for direct social
terms, alongside source/contracts/plans. A fresh HEAD and open-state
check found no direct duplicate.

- Open #1007 concerns body hooks, not social metadata.
- Closed #1010/merged #1014 concern editor-shell metadata.
- Closed #1006/merged #1013 supply bounded profile infrastructure.
- Merged #1004 supplies Strict; preserve its conformance boundary.
- Closed #881/merged #1000 concern rendered-search title markers.

Private plans outside the fetched records were not visible.
