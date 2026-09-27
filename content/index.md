---
title: droids.filed.fyi
tags: [home]
summary: Field notes from delegating real work to Factory Droid — what I did, what it did, and every nit in between.
---

<figure class="loop">
<svg viewBox="0 0 800 340" role="img" aria-label="The delegation loop: I delegate to the droid, the droid ships to prod, prod generates nits and receipts, and they come back to me.">
<g font-family="ui-monospace, 'SF Mono', Menlo, monospace">
<rect x="35" y="50" width="150" height="70" rx="12" fill="#5eead4" fill-opacity="0.09" stroke="#5eead4" stroke-opacity="0.5" stroke-width="1.5"/>
<rect x="325" y="50" width="150" height="70" rx="12" fill="#5eead4" fill-opacity="0.09" stroke="#5eead4" stroke-opacity="0.5" stroke-width="1.5"/>
<rect x="615" y="50" width="150" height="70" rx="12" fill="#5eead4" fill-opacity="0.09" stroke="#5eead4" stroke-opacity="0.5" stroke-width="1.5"/>
<g fill="var(--bright, #eef4fa)" font-size="24" font-weight="700" text-anchor="middle">
<text x="110" y="92">me</text>
<text x="400" y="92">droid</text>
<text x="690" y="92">prod</text>
</g>
<g stroke="#5eead4" stroke-opacity="0.7" stroke-width="2" fill="none">
<path d="M 191 85 H 311"/>
<path d="M 481 85 H 601"/>
<path d="M 690 124 V 232 H 110 V 132"/>
</g>
<g fill="#5eead4">
<polygon points="321,79 311,85 321,91"/>
<polygon points="611,79 601,85 611,91"/>
<polygon points="104,132 110,120 116,132"/>
</g>
<g fill="var(--ink, #c9d4de)" font-size="17" text-anchor="middle">
<text x="254" y="74">delegate</text>
<text x="544" y="74">ship</text>
<text x="400" y="222">nits, surprises, receipts</text>
</g>
</g>
</svg>
<figcaption>the content strategy is a control loop and the droid is the plant</figcaption>
</figure>

Where the Factory AI experience gets charted: what I delegated, what
actually shipped, and the nits picked out of the fur along the way. The
human writes the verdicts. The droids do most of the typing. The
pipeline keeps the receipts.

## Buckets

- [[log/index]] — the running feed: session debriefs, news takes, nits
  noticed mid-delegation. Newest first.
- [[builds/index]] — things built with Factory end-to-end, with receipts.
- [[nits/index]] — the friction ledger. Every nit with a repro, none
  without.
- [[reviews/index]] — Factory surfaces reviewed after real usage. What
  broke, what stuck.

## How filing works

Everything lands in [[log/index]] first as a draft. If it deserves its
own page it gets promoted into the right bucket and cross-linked back.
Agents do the triage; rules live in AGENTS.md at the repo root.
Publishing is the owner's call. The first entry on the log is this
site's own birth certificate — a droid session, start to finish.
