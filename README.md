# droids.filed.fyi

Field notes on using Factory AI: builds, nits, and reviews — what got
delegated, what shipped, and every nit in between. Built with
[Boris](https://github.com/drawmeanelephant/boris), a Zig static-site
compiler with a validated page graph, deployed to Cloudflare Pages.
Same pipeline as squirrel.filed.fyi.

## Use it for your own reviews

The site software is **MIT-licensed**. Take the theme and filing pipeline,
replace the content with your own, and make a review site for Factory or
another product without rebuilding the site machinery. Keep the licence
notices; you do not need to keep my branding or write about my projects.

The fonts and articles are not all MIT. See [Licensing](LICENSING.md):
Geist remains OFL, while the Virelai fonts and mascot artwork remain
proprietary. **Boris copies unused theme assets too**, so remove or replace
the Virelai font files and mascot SVGs before deploying a fork.

1. Fork the repository or copy the reusable software, retaining the
   applicable licence notices.
2. Replace the original root `content/` graph with your own pages.
   Do not just overlay it and accidentally publish my articles or drafts.
   `examples/review-site/content/` is an MIT-licensed minimal starting point;
   its example review is deliberately an unlisted draft.
3. Update `boris.json`, both `manila/layouts/*.html` files, and
   `manila/footer.html` with your site name, domain, feed URL, and source
   link. Replace the homepage prose and site-specific `static/` files.
   Adapt `AGENTS.md` to your own filing rules.
4. Replace or omit the restricted font/artwork assets, then adjust the
   mascot-specific CSS, markup, tests, manifest, converter, and CI check as
   described in `LICENSING.md`. You can keep Geist with its OFL notice.
5. In `.github/workflows/ci.yml` and `deploy.yml`, replace the site/feed
   defaults. Set your own `CF_PAGES_PROJECT`, Cloudflare credentials, and
   hosting domain before enabling deployment. Change the fallback project
   name too; do not deploy with this site's `droids` defaults.

Install a current Boris compiler and put `boris` on PATH. CI builds the
revision pinned in `.github/actions/setup-boris/action.yml`; the bundled
Darwin-arm64 kit is an older snapshot and lacks `--static-dir`.
You do not need access to the private Virelai source repository.

Try the starter without changing the existing site content:

```sh
boris validate --input examples/review-site/content --theme manila \
  --layout-rule default id:index manila/layouts/trunk.html
boris build --input examples/review-site/content --html-dir .probe-dist/review-starter \
  --theme manila --sitemap --site-url https://example.com/ \
  --layout-rule default id:index manila/layouts/trunk.html
```

The preview stays outside production `dist/`; it is not a deployment-ready
copy of the restricted assets. After replacing the root content and
completing the steps above, use the normal build commands below with your
own site URL. A published feed entry needs a real `published_at`
timestamp; changing only its `status` is not enough for RSS.

## Layout

- `content/` — site source (markdown + strict frontmatter)
- `manila/` — site theme (layouts + assets); see [Theme](#theme)
- `boris-agent-kit/` — Boris binaries for Darwin-arm64 (local dev only;
  CI builds Boris from source at the pinned commit)
- `AGENTS.md` — the contract for agents working in this repo. Read it
  before touching content.
- `examples/review-site/content/` — a small MIT-licensed content starter,
  kept outside the live site's page graph.
- `LICENSE` / `LICENSING.md` — MIT software licence and explicit exceptions.

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
fallbacks, glyph mapping, asset hashes, licence boundaries, and starter
isolation. CI also verifies every original font table with
`python tools/build-mascots.py --check`. Browser layout and
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
