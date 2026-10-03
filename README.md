# droids.filed.fyi

Field notes on using Factory AI: builds, nits, and reviews — what got
delegated, what shipped, and every nit in between. Built with
[Boris](https://github.com/drawmeanelephant/boris), a Zig static-site
compiler with a validated page graph, deployed to Cloudflare Pages.
Same pipeline as squirrel.filed.fyi.

## Layout

- `content/` — site source (markdown + strict frontmatter)
- `manila/` — site theme (layouts + assets); see [Theme](#theme)
- `boris-agent-kit/` — Boris binaries for Darwin-arm64 (local dev only;
  CI builds Boris from source at the pinned commit)
- `AGENTS.md` — the contract for agents working in this repo. Read it
  before touching content.

## Local build

```sh
boris build --input content --html-dir dist \
  --theme manila --sitemap --site-url https://droids.filed.fyi/ \
  --layout-rule default id:index manila/layouts/trunk.html \
  --static-dir static
```

Or watch + serve on loopback:

```sh
boris watch --input content --html-dir dist \
  --theme manila --serve --static-dir static \
  --layout-rule default id:index manila/layouts/trunk.html
```

## Theme

`manila/` is this site's own theme: every page is a filed record.

- The breadcrumb is the folder tab, `{{metadata}}` is the docket
  (status stamp + tag chips), and `{{children}}` is the "Filed here"
  list. The rail carries the TOC, relations, and backlinks.
- The top bar is `{{nav depth=2}}`; each bucket gets a status light, lit
  for the section you are in.
- Three modes (dark, light, pride), stored in `localStorage` under
  `droids-mode`. An inline head script applies the saved mode before
  first paint.
- `assets/js/manila.js` is progressive enhancement only: mode switch,
  tag chips, key/value labels for the Surface / Date / Evidence /
  Verdict list under a log entry's title, terminal frames with copy
  buttons, and a `/` or Cmd/Ctrl-K search palette over
  `_boris/search/search-index.json`. Pages read fine without it.
- `layouts/trunk.html` is the homepage layout (no record chrome, no site
  suffix in `<title>`).
- Type is [Geist and Geist Mono](https://github.com/vercel/geist-font),
  self-hosted under the SIL Open Font License
  (`manila/assets/fonts/OFL.txt`).
- Small project-page marks use approved SVG artwork and native Virelai
  color glyphs, progressively loaded with SVG fallbacks. The owner approved
  these assets for serving on droids.filed.fyi only; they are **not** under
  Geist's licence. Source pins, hashes, permissions and lossless conversion
  instructions live in `manila/assets/icons/README.md`.

Theme regressions run without npm dependencies, using Node's built-in
test runner (Node 22 or newer):

```sh
node --test tests/*.test.cjs
```

These cover search state, loading failures/retries, publication-base
links, small-label contrast in all three modes, and mascot loading,
fallbacks, glyph mapping and asset hashes. CI also verifies every original
font table with `python tools/build-mascots.py --check`. Browser layout and
accessibility checks are still needed for a visual review.

## Deployment

Pushes to `main` build the site in GitHub Actions (Boris compiled from
source at the pinned commit) and deploy `dist/` to Cloudflare Pages via
Wrangler.

Required repository secrets (set via `gh secret set`, never committed):

- `CLOUDFLARE_API_TOKEN` — token with Cloudflare Pages: Edit permission
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare account id

Optional repository variable:

- `CF_PAGES_PROJECT` — Pages project name (defaults to `droids`)

The Pages project serves `droids.pages.dev` and the custom domain
`droids.filed.fyi`.
