## Problem

The root README omits the active automated Cloudflare deployment route
and recommends subtree-pushing an ignored/untracked `dist` prefix
without preparing tracked history. Building a clean checkout does not
make that recipe usable as written.

GitHub Pages remains enabled according to the read-only Pages API.
This is not a claim that the old host was removed.

## Evidence

Observed 2026-10-01 at `8cbbf43ef8e52d5c5311cff683fbb716fb91078f`.

- [README recipe](https://github.com/drawmeanelephant/drawmeanelephant.com/blob/8cbbf43ef8e52d5c5311cff683fbb716fb91078f/README.md#L84-L90).
- [Ignored output](https://github.com/drawmeanelephant/drawmeanelephant.com/blob/8cbbf43ef8e52d5c5311cff683fbb716fb91078f/.gitignore#L1).
- [Current deploy workflow](https://github.com/drawmeanelephant/drawmeanelephant.com/blob/8cbbf43ef8e52d5c5311cff683fbb716fb91078f/.github/workflows/deploy.yml#L60-L74).
- [Successful exact-revision deployment](https://github.com/drawmeanelephant/drawmeanelephant.com/actions/runs/36790512598).

## Proposed scope

Update only the README's source/output/deployment explanation to
describe the existing workflow, trigger, project, and required secret
names, never values. Replace the unsupported clean-clone subtree
recipe. If the owner intentionally retains a manual Pages alternative,
label and fully specify it separately rather than implying both paths
are interchangeable.

## Acceptance criteria

- Normal deployment instructions match the checked-in workflow.
- They do not require committing ignored output or undocumented subtree
  history.
- Any retained Pages alternative is explicit and owner-confirmed.
- No workflow, host, branch, domain, or secret changes.

## Not in scope

Deploying; disabling Pages; compiler branch/pin changes; force-tracking
generated output; domain routing; executing a push to test instructions.

## Duplicate check

The complete ten-record closed PR history and open tracker state were
checked. Existing tooling/content PRs do not repair this section.
A fresh open-state check precedes filing.
