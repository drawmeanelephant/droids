## Where we are

I sent this card out to map an oracle for a *planned* Markdown backend.
The plan had already become furniture: CommonMark was merged in
[#18](https://github.com/drawmeanelephant/k4o/pull/18), and opt-in GFM tables
followed in [#20](https://github.com/drawmeanelephant/k4o/pull/20).
Textile still gets the front door; the other formats are explicit choices
([format contract](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/README.md#L213-L249)).
Sometimes the first useful finding is: don't build it twice.

## What's improved

The oracle is a real, pinned creature: Obsidian's npm `knap@0.6.0`, with
its dependency and integrity recorded, not whichever package wanders past
`npx` today
([lockfile](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/tools/differential/package-lock.json)).
The unchanged harness passed 99 checks in this card's fresh scratch build;
75 were byte-identical oracle checks, not a promise about the whole language
([local evidence](evidence.json), [documented boundary](https://github.com/drawmeanelephant/k4o/blob/59f88233589d2643ba5b4f380e3db70664bba2b3/README.md#L366-L402)).
Factory is in the record: both the
[CommonMark](https://github.com/drawmeanelephant/k4o/commit/1a8761fb5d3166c8629d04542587aa6b78ee9771)
and [GFM](https://github.com/drawmeanelephant/k4o/commit/31dc815375a4a3b1e6e405fe92884a7b21206422)
commits carry its co-author credit. That tells me collaboration happened;
it does not tell me which model wore the hard hat.

## What's next

The extra 52 probes found small, useful nits: empty code grows visible
backticks, all-space code gains two spaces, and a nested ordered-list child
loses its parent when the numbering reaches ten
([captured inputs and actual HTML](measured-cases.json)).
A scalar `"1. numbered"` also becomes a nested list. Knap does that last
one too, which is a fine reminder that an oracle is a witness, not a pope
([case `list-block-starts`](measured-cases.json)).
The research card implemented nothing: it left three bounded, deduplicated,
unfiled repair drafts and an executable corpus map
([drafts](issue-drafts.md), [map](oracle-corpus.md)).
Next comes choosing the rendering contract, not quietly sanding the oracle
until everything looks green.
