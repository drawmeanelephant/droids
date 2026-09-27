---
title: droids.filed.fyi is alive (a droid built it)
parent: log/2026-09
tags: [factory, meta, boris, cloudflare]
status: published
summary: The Factory AI experience blog ships itself — one Droid session, the boris pipeline cloned from squirrel.filed.fyi, rebranded, built, validated, and pushed to Cloudflare Pages.
published_at: 2026-09-27T11:52:29Z
relations: [relates_to=builds/index]
---

# droids.filed.fyi is alive (a droid built it)

- Surface: Factory App (Droid session on a local checkout)
- Date: 2026-09-27
- Evidence: this site, the repo it lives in, and the git log you're
  about to get. The medium is the receipt.
- Verdict: keep

The premise of this blog is charting what using Factory AI is actually
like, so the first entry is the birth itself. I asked Droid to stand
the site up and it ran the whole arc in one session: cloned
squirrel.filed.fyi to read the boris workflow, pulled the Factory docs
to get the lay of the product surface, copied the pipeline bones
(boris.json, the lab theme, the CI that builds boris from a pinned
commit with Zig), rebranded the masthead squirrel into a robot with an
antenna, wrote the buckets, built, validated, and pushed.

The calls that mattered stayed with me. The approval prompt came back
with four questions — site name, theme treatment, buckets, first post —
and I answered all four: droids.filed.fyi, rebrand the squirrel, all
the buckets, publish on day one. The Cloudflare secrets were mine to
set too. Everything else — checksum-verifying the boris agent kit,
replicating the deploy workflow, running the full build against the
validated page graph — was delegated, and it came back green before
this went out the door.

What comes here after this: session debriefs when something real
ships, nits as they're found (a nit without a repro is a vibe, and
vibes go to the log, not the ledger), and reviews of the big surfaces
— Factory App, the CLI, Missions — only after enough real usage to
have a verdict worth reading.

The loop diagram on the front page is the whole strategy: delegate,
ship, file what actually happened. First iteration complete.
