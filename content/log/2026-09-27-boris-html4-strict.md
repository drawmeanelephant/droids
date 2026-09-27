---
title: Boris learned HTML 4.01 Strict
parent: log/2026-09
tags: [factory, boris, oliver, html, meta]
status: published
summary: Oliver got a Strict serializer and boris got a whole-site HTML 4.01 Strict target profile with a fail-closed checker — implemented by a Droid worktree session and merged as boris #1004.
published_at: 2026-09-27T18:45:07Z
relations: [relates_to=builds/boris-html4-strict]
---

# Boris learned HTML 4.01 Strict

- Surface: boris + oliver, via a Droid session in a worktree
  (`fac-boris-001`, branch `droid/implement-boris-issue-1003`)
- Date: 2026-09-27
- Evidence: [boris #1004](https://github.com/drawmeanelephant/boris/pull/1004)
  (merged), [issue #1003](https://github.com/drawmeanelephant/boris/issues/1003),
  [oliver #131](https://github.com/drawmeanelephant/oliver/pull/131), and
  the normative contract it shipped
- Verdict: promote-to-builds

The compiler and the renderer split a job between them. Oliver — the
Zig HTML renderer boris builds on — grew an opt-in HTML 4.01 Strict
serializer profile upstream. Boris issue #1003 then asked the right
question first: is there a concrete consumer for a 1999-conformance
mode, and if not, close it as not planned — "do not bump Oliver
solely to acquire the option." The decision was made, and the
implementation was delegated: one Droid session in a worktree took
the issue end to end and came back green.

What shipped in boris #1004: a per-target `--target-profile
NAME=html4-strict` flag; a fail-closed checker that inspects the exact
assembled bytes of every page — layouts, generated nav, TOC, Aside,
relations, backlinks, the Proof Pack, all of it — and refuses
unchecked raw HTML passthrough; `EHTML4STRICT` diagnostics with page
and layout context; a strict-compatible theme and fixture; and a
normative contract that is unusually honest about what it is: a
conservative valid subset, not an SGML DTD engine, with no
accessibility conformance claimed. Release gate passed; an
independent `tidy` run corroborated the fixture with no parser
errors. A compatibility format, by the contract's own words — "not a
better default for modern sites."

The meta part is that this blog is the natural first consumer of the
feature, and the open question is whether that is a bad idea or a
great one. The honest answer is both, and the full writeup with the
handcuff bill lives at [[builds/boris-html4-strict]].
