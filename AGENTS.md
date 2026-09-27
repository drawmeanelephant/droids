# AGENTS.md — droids.filed.fyi

A field-notes blog on using Factory AI: what got delegated, what
shipped, and the nits picked out of the fur along the way. Built with
[Boris](https://github.com/drawmeanelephant/boris), a Zig static-site
compiler with a validated page graph — the same pipeline as
squirrel.filed.fyi. If you are an agent working in this repo, this file
is your contract.

## Repository layout

```text
content/            site source (markdown + strict frontmatter)
  index.md          trunk page
  log/              the feed — every entry starts here, YYYY-MM-DD-slug.md
  builds/           finished delegations: goal, setup, result, receipts
  nits/             the friction ledger — every nit needs a repro
  reviews/          Factory surface reviews after real usage
lab/                theme (layouts + assets). Do not restructure.
boris-agent-kit/    boris binaries for Darwin-arm64. Do not modify.
boris.json          publication profile (content -> dist via lab theme)
dist/               build output, git-ignored
```

## Toolchain

Binaries live in `boris-agent-kit/bin/` (Darwin-arm64 only) — a snapshot
taken for initial setup that may lag boris main. The live toolchain is
source at `~/t3/zig/boris`; `boris-refresh` (on PATH) pulls origin/main,
rebuilds with Zig, and installs to `~/.local/bin/boris`. CI always
builds the commit pinned in `.github/actions/setup-boris/action.yml`.
Prefer `~/.local/bin/boris` when fresh; fall back to the kit if the
checkout is unavailable. Note that the kit snapshot (0.8.1) predates
the `--static-dir` flag (#804), so the build commands below use `boris`
from PATH. `boris`
is the compiler; the rest are specialist tools (`boris-search-index`,
`boris-content-audit`, ...) you almost never need directly.

Verify the kit before first use on a new machine:

```sh
cd boris-agent-kit && shasum -a 256 -c SHA256SUMS
```

Core commands (run from repo root):

```sh
# full build: HTML + search index + sitemap + static/ into dist/
# (trunk layout rule keeps the homepage <title> free of the site suffix)
boris build --input content --html-dir dist \
  --theme lab --sitemap --site-url https://droids.filed.fyi/ \
  --layout-rule default id:index lab/layouts/trunk.html \
  --static-dir static

# RSS feed — separate mode, run after the HTML build.
# Items require `status: published` + `summary` + `published_at`.
./boris-agent-kit/bin/boris build --input content --rss --rss-path dist/rss.xml \
  --site-url https://droids.filed.fyi/ \
  --rss-title "droids.filed.fyi" \
  --rss-description "Factory AI field notes — what I delegated, what shipped, and every nit in between."

# zero-write preflight — run this before declaring any task done
boris validate --input content --theme lab \
  --layout-rule default id:index lab/layouts/trunk.html --static-dir static

# read-only graph health report
./boris-agent-kit/bin/boris check --input content

# rebuild on save, serve on loopback :8090
boris watch --input content --html-dir dist \
  --theme lab --serve --static-dir static

# offline corpus export so an agent can reason over the whole site
./boris-agent-kit/bin/boris build --input content --rag --complete
```

Exit codes: 0 ok, 1 content validation, 2 usage conflict, 3 I/O.
Note that `--rss`, `--llms`, and RAG/context exports are separate modes
and cannot be combined with HTML flags in one invocation.

## Content rules (hard)

Frontmatter accepts **exactly seven keys** — anything else fails the
build with `EFRONTMATTER`. This was verified empirically; do not invent
keys.

| key | required | values |
|---|---|---|
| `title` | yes | human title |
| `parent` | satellites | entity id of parent page, e.g. `log/2026-09` |
| `tags` | recommended | YAML list |
| `status` | recommended | exactly `draft`, `published`, or `archived` |
| `summary` | recommended | one sentence, used by listings/search/RSS |
| `published_at` | feed pages | exactly `YYYY-MM-DDTHH:MM:SSZ`; required for RSS eligibility |
| `relations` | optional | e.g. `[relates_to=reviews/index]` |

More rules:

- Wiki links are `[[path/to/page]]`; external links are normal markdown.
- Raw HTML in pages is passed through, but a blank line inside an HTML
  block ends it — following indented lines become a code block. Keep
  embedded HTML (e.g. inline SVG) free of blank lines.
- Draft pages render to HTML but are excluded from nav, search, sitemap,
  RSS, and publication. Draft is the default state for new entries.
- Page images go in `<stem>.assets/` beside the owning page.
- One session (or one cluster) per file in `log/`. Filename:
  `YYYY-MM-DD-short-slug.md`.
- Never edit files under `dist/` — it is generated.
- Do not commit secrets or session stores; boris publication sessions
  never belong in this repo.

## Buckets and filing rules

Everything enters `content/log/` as a draft. Then:

- **log** — the running feed: session debriefs, nits noticed
  mid-delegation, Factory news worth a take. Dated, one session (or
  cluster) per file.
- **builds** — finished delegations with artifacts: goal, setup, how it
  went, result, receipts. "I asked it to plan a thing" is not a build.
  Link the receipts: repo, deployed site, PR.
- **nits** — the friction ledger. A nit earns a page when it has a repro
  and will get re-checked. A nit without a repro is a vibe; vibes stay
  in the log. Verdict values: `still-broken | fixed | lived-with`.
- **reviews** — Factory surface reviews (Factory App, Droid CLI,
  Missions, Software Factory, remote delegations, ...) only after
  enough real usage for a verdict. Never fabricate; usage evidence
  required.

Promotion path: log entry gains `relations: [relates_to=<new page>]`,
new page in the bucket links back with `[[log/<entry>]]`.

## Agent workflows

### Intake (something happened worth charting)

1. Create `content/log/YYYY-MM-DD-slug.md` from the template in
   `content/log/index.md`, `status: draft`.
2. Write what was delegated, what came back, what surprised. Plain
   words, no marketing voice. Cite evidence: session, repo, command
   output — whatever backs the story.
3. Add a `Verdict:` line: `keep | promote-to-<bucket> | toss`.
4. Run `validate`, then stop. Publishing is the owner's call unless
   they asked for autonomous filing.

### Promotion (draft becomes a real page)

1. Write the bucket page using the structure on the bucket's index.
2. Flip the log entry to `published`, add the `relations:` cross-link.
3. Run `validate` then the full `build`. Confirm both exit 0.

### Review drafting (Factory surfaces)

Use the five-part structure in `content/reviews/index.md`. Ground every
claim in observed behavior from the owner's usage notes; if you have no
usage evidence, write the stub and leave `## Verdict` as `Pending`.
Never fabricate benchmark numbers or experience. When Factory ships the
fix for something a review dinged, the review gets updated, not quietly
buried — updates get dated.

### Site-wide reasoning (before big edits)

Export the corpus and read it instead of guessing:

```sh
./boris-agent-kit/bin/boris build --input content --rag --complete
# working packs land in rag/ — read INDEX.md first
```

## Before you declare done

1. `boris validate ...` exits 0.
2. Full build command exits 0.
3. New pages appear in `dist/` with correct paths.
4. No edits to `boris-agent-kit/`, `SHA256SUMS`, or `MANIFEST.json`.
5. No commits unless explicitly asked.
