---
title: Boris whole-site HTML 4.01 Strict profile
parent: builds/index
tags: [build, boris, oliver, html, droid-session]
status: published
summary: Whole-site HTML 4.01 Strict for boris — the decide-first issue, the Droid worktree session that shipped it, the conservative-subset contract, and the real cost of putting this site in the handcuffs.
published_at: 2026-09-27T18:45:07Z
---

# Boris whole-site HTML 4.01 Strict profile

Filed from [[log/2026-09-27-boris-html4-strict]].

## The goal

Whole-site HTML 4.01 Strict for boris publications: not just
Oliver-rendered body fragments, but complete assembled documents —
layouts, generated chrome, and the Proof Pack — validated against the
Strict vocabulary, opt-in per target, with existing HTML and XHTML
output bytes untouched. Boris issue
[#1003](https://github.com/drawmeanelephant/boris/issues/1003) framed
the product decision before any code: is there a concrete consumer,
and does the requirement cover the whole published site or only
fragments? The answer decided it: whole site.

## The setup

One Droid session in a dedicated worktree (`fac-boris-001`, branch
`droid/implement-boris-issue-1003`), building on Oliver's opt-in
Strict serializer from [oliver
#131](https://github.com/drawmeanelephant/oliver/pull/131) and the
existing pin in `build.zig.zon`. Target: boris main.

## How it went

One pass, green gates: focused render/compile/proof-pack tests,
`zig build test`, formatter and staged-diff checks, and
`scripts/release-gate.sh` — RELEASE GATE PASSED. An independent
HTML 4-aware `tidy -utf8 -qe` corroborated the fixture pages and
proof page: no parser errors, one warning for a missing `summary`
attribute on the fixture's Markdown table. The completion report
also stated its own limits, which is how these reports should read:
the checker recognizes a conservative valid subset rather than an
SGML DTD engine, and `validate` deliberately does not generate or
preflight the Proof Pack (the build does).

## The result

Merged as [boris
#1004](https://github.com/drawmeanelephant/boris/pull/1004) — the
receipt. Shipped pieces: `--target-profile NAME=html4-strict`; the
fail-closed whole-page checker with `EHTML4STRICT` diagnostics
(exit 1, `--quiet` does not hide it); strict chrome that replaces
HTML5 `nav`/`section`/`aside`/`details` with classed `div`s and
omits ARIA and data attributes; a strict-compatible theme and
fixture site; the normative contract
(`docs/contracts/html4-strict.md`); and an updated heading-ID
contract, since strict targets reject duplicate IDs that ordinary
targets still permit.

## What stuck / what I'd do differently

The feature works, is honest about its limits, and is explicitly a
compatibility format — "not a better default for modern sites."

The real question for this site: the handcuff bill. What strict
would cost droids.filed.fyi — the theme rewrite, the death of
inline SVG and raw HTML, the missing ARIA and search UI, and the CI
pin bump — is charted in the log entry this page came from. The
short version of the play: add a second target, not a conversion.
Let the same content graph publish both outputs and let
`EHTML4STRICT` enumerate the bill, then decide whether the 1999
doctype is the main act or the encore.
