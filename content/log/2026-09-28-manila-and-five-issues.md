---
title: The droid redesigned this site, then filed five issues
parent: log/2026-09
tags: [factory, boris, meta, theme, audit]
status: draft
summary: One Droid session on Claude Opus 5.5 replaced the borrowed theme with an original one, then audited every filed.fyi repo and filed five issues across three of them, with a repro for each.
published_at: 2026-09-28T12:59:27Z
---

# The droid redesigned this site, then filed five issues

- Surface: Factory App (Droid session in a worktree), running Claude
  Opus 5.5
- Date: 2026-09-28
- Evidence: the new `manila/` theme in this repo;
  [boris #1005](https://github.com/drawmeanelephant/boris/issues/1005),
  [boris #1006](https://github.com/drawmeanelephant/boris/issues/1006),
  [boris #1007](https://github.com/drawmeanelephant/boris/issues/1007),
  [droids #4](https://github.com/drawmeanelephant/droids.filed.fyi/issues/4),
  [squirrel #11](https://github.com/drawmeanelephant/squirrel.filed.fyi/issues/11)
- Verdict: promote-to-builds once the theme is merged and deployed

The site went live wearing a theme borrowed from squirrel.filed.fyi,
which had borrowed it from boris. I asked for one of its own, built for
this blog, and told the droid to do a real deep dive on Factory first.

It came back with four questions before writing any CSS. Should the
research shape the design only, or the copy too? Should the site copy
Factory's look or have its own? Which color modes? Which fonts? The
answers were design only, its own identity with small Factory nods,
dark/light/pride, and Geist. What it built is **manila**: every page is
a filed record. The breadcrumb is the folder tab, the status and tags
are a docket stamp, child pages are a "Filed here" list, and code
blocks get a terminal frame with a copy button. Press `/` and a search
palette opens over the site's own index. The Factory nods are small on
purpose: signal orange, mono uppercase labels with a dot, Geist type.

It checked its own work in a browser, in all three modes and at phone
width. That caught four bugs before I saw any of them: backwards
arrowheads on the homepage loop diagram, a nav that hid "Reviews" on
phones, an Escape key the search field ate on the first press, and a
highlight color that didn't match the theme.

Then I asked what it thought of boris, and the good part started.

## The audit

The opinion came with two repo-level findings. The documented `boris
watch` command here was missing the homepage layout rule, and every
build command repeated the same flags. I asked for issues, and for a
check of whether my other sites had the same problems.

It listed every repo on the account, shallow-cloned sixteen of them,
and pulled every boris build, watch, and validate command out of the
docs and CI of the ones that use it. Then it rebuilt squirrel with the
flags from its docs and compared the result against CI. The drift was
real: the preview homepage had a doubled `<title>`, and the README
flags dropped `robots.txt`, `humans.txt`, and `cyborgs.txt`. muse,
agent-hub, solipsist, and boris.filed.fyi showed no drift.

## It was wrong twice, and caught both

This is the part I'd brag about.

First, it had suggested moving the repeated flags into `boris.json`.
Before filing that as a fix, it tested the idea on a scratch copy.
`boris plan` read the profile fine, but `boris build --profile` ignored
the target and fell back to a theme the file never named. So the fix
isn't per-site; it's a gap in [[projects/boris]]. solipsist's deploy
workflow already had a comment saying the same thing. That became
boris #1006.

Second, it had complained that search snippets were full of page clutter
like "Statuspublished Parentlog/2026-09". Reading the search contract
showed the clutter was its own theme's fault: themes are supposed to
mark chrome with `data-boris-search-exclude`, and manila hadn't. It
fixed manila, then checked boris's own themes. 48 bundled layouts use
`{{metadata}}`, and every one it read had the same leak. A build with
the stock theme indexed 15 of 21 pages that way. That became boris
#1005. A third complaint, about
inline code vanishing from snippets, turned out to be documented
behavior, and it dropped that one.

The final count: three boris issues (the search leak, the ignored
profile, and a proposal for metadata hooks so themes don't need
JavaScript for tag chips), one issue here, and one on squirrel. Each
has a repro and a suggested fix. None of it is guessed.

The calls that mattered stayed with me: what the site should feel like,
which fonts, whether to file. The droid did the typing, the testing,
and the part where you check your own claims before posting them. That
last part is why five issues across the [[projects/filed-fyi]] family
are worth reading instead of closing.
