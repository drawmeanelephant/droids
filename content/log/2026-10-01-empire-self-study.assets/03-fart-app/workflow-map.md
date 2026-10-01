# Workflow map, log receipts and reproduction plan

## Immutable inputs

| Input | Exact identity |
|---|---|
| Observed default main / report source | `cc2cd4a6b4f07d14f439004db981db7a1055f807` |
| PR #56 head | `295e0fa95e2b3843e65bdf9bffbbe28ee4f419a2` |
| PR #56 base | `50a324eda3dd800bf18b1e07b0de7ac915dafeb7` |
| PR check checkout (synthetic merge) | `0565d6971c86bd96e43c8af9359e7ac875b6deec` |
| Reference main at failed/retry/main runs | `5b5f266d49d836b5700c09bea149cc88c11bd4b7` |
| refpeer hash in cache key | `d43d4de282367251bca4d987af03c6f075e6afab073fa5728ee41336934379e6` |
| Failed runner image | `macos-26-arm64`, image version `20260907.0351.1` |

## Control/data path

1. Push to main or any PR starts `ci`. Linux `build-test` and macOS `build-test-macos` download Zig 0.16.0 with explicit SHA-256 checks, build Debug/ReleaseSafe, test and smoke; Linux also runs the fart executable in the runner's silent path. [Workflow](https://github.com/drawmeanelephant/fart-app/blob/cc2cd4a6b4f07d14f439004db981db7a1055f807/.github/workflows/ci.yml#L36-L146).
2. `demo-e2e` depends on macOS tests; uses `macos-latest`, 30 minutes, `KUJ_RUNTIME=$GITHUB_WORKSPACE/demo-runtime`. It downloads the same checksum-verified ARM64 macOS Zig tarball. These downloads have no explicit curl retry in this file; they succeeded in the relevant failed job. [Setup](https://github.com/drawmeanelephant/fart-app/blob/cc2cd4a6b4f07d14f439004db981db7a1055f807/.github/workflows/ci.yml#L148-L177).
3. Resolve reference via `git ls-remote ... refs/heads/main`. Exact key: `ninjam-ref-${REF_SHA}-${hashFiles('demo/refpeer.cpp')}`. Four cached paths: `ninjam-src`, `srv-build`, `core-build`, `refpeer`. No fallback restore keys. [Key/restore](https://github.com/drawmeanelephant/fart-app/blob/cc2cd4a6b4f07d14f439004db981db7a1055f807/.github/workflows/ci.yml#L179-L199).
4. If `cache-hit != 'true'`, create runtime, clone reference default HEAD if `.git` absent, print SHA versus expected (no assert), configure/build server and core separately with Release + CLIENT/TESTS OFF, then link refpeer against core/net and fetched `_deps` static Ogg/Vorbis archives plus macOS frameworks. Each product is skipped on existence/executable checks. Shell uses `set -euo pipefail`. A failed restore enters this same path. [Miss](https://github.com/drawmeanelephant/fart-app/blob/cc2cd4a6b4f07d14f439004db981db7a1055f807/.github/workflows/ci.yml#L201-L231).
5. Reference [CMake](https://github.com/drawmeanelephant/ninjam/blob/5b5f266d49d836b5700c09bea149cc88c11bd4b7/CMakeLists.txt#L48-L104): pkg-config Ogg/Vorbis if available, otherwise GitHub FetchContent shallow tag clones of `xiph/ogg` v1.3.6 and `xiph/vorbis` v1.3.7. Thus cold bootstrap may require these additional network fetches. The workflow's hardcoded `_deps` link assumes the fetched-dependency layout; no current-run failure on this branch was seen.
6. Always execute `bash demo/run_demo.sh` after successful provisioning. It builds ReleaseSafe kujamba, runs unit tests, reuses existing reference checkout/build products (actual SHA recorded, not compared to expected), starts ninjamsrv, polls listen readiness up to 10 s, then runs scenario A with refpeer and scenario B determinism. Checks include broadcast/payload counts, silence marker, reference decode/nonzero peak, per-payload energy, silence rejection and matching SHA-256s. [Script](https://github.com/drawmeanelephant/fart-app/blob/cc2cd4a6b4f07d14f439004db981db7a1055f807/demo/run_demo.sh#L20-L176).
7. `actions/upload-artifact` runs `always()` against `demo/evidence/`, 14-day retention. The directory includes historical checked-in evidence; a successful upload does not imply the live demo step ran. [Upload](https://github.com/drawmeanelephant/fart-app/blob/cc2cd4a6b4f07d14f439004db981db7a1055f807/.github/workflows/ci.yml#L236-L243).
8. Required active main ruleset contexts: `build-test`, `demo-e2e`; strict up-to-date policy false. Current read: `gh api repos/drawmeanelephant/fart-app/rulesets/24205353`. No policy edits performed.

## Compact non-sensitive CI receipts

### PR #56 attempt 1 — [job 110351731710](https://github.com/drawmeanelephant/fart-app/actions/runs/36856588659/job/110351731710)

```text
11:42:11.664 cache key: ninjam-ref-5b5f266d49d836b5700c09bea149cc88c11bd4b7-d43d4de282367251bca4d987af03c6f075e6afab073fa5728ee41336934379e6
11:42:11.903 Cache hit for: [same exact key]
11:42:13.036 Received 4194304 of 44225326 (9.5%)
11:43:52.186 Failed to restore: The operation cannot be completed in timeout.
11:43:52.187 Cache not found for input keys: [same exact key]
11:44:13.049 Cloning into '.../demo-runtime/ninjam-src'...
11:44:43.101 fatal: unable to access 'https://github.com/drawmeanelephant/ninjam/': Could not resolve host: github.com
11:44:43.110 Process completed with exit code 128.
11:44:43.258 With the provided path, there will be 26 files uploaded
11:44:48.276 Artifact CreateArtifact request timeout; retrying
```

Job step API: reference build `failure`; live demo `skipped`; evidence upload `success`. CMake and the demo never ran. This is a failed restoration of an **existing** cache entry, not a proven genuinely absent entry.

### PR #56 attempt 2 — [job 110358988801](https://github.com/drawmeanelephant/fart-app/actions/runs/36856588659/job/110358988801)

```text
12:03:24.158 Cache hit for: [same exact key]
12:03:26.329 Cache restored successfully
12:05:29.938 ninjam checkout: 5b5f266d49d836b5700c09bea149cc88c11bd4b7
12:06:39.286 silence correctly rejected
12:06:39.544 determinism verified: identical payload bytes across two runs
12:06:39.639 DEMO PASS
```

### Merge/main — [job 110364323812](https://github.com/drawmeanelephant/fart-app/actions/runs/36860373305/job/110364323812)

```text
12:18:28.479 Cache restored successfully
12:20:36.128 ninjam checkout: 5b5f266d49d836b5700c09bea149cc88c11bd4b7
12:21:45.259 silence correctly rejected
12:21:45.520 determinism verified: identical payload bytes across two runs
12:21:45.670 DEMO PASS
```

### Historical actual cold-cache success — [job 109890259997](https://github.com/drawmeanelephant/fart-app/actions/runs/36716105063/job/109890259997)

2026-09-30, fart-app CI head `4f59462f2836a3e6262b8b601510a69a768a9132`; reference **different** SHA `dfaf4881ebd10f88e4c3dbef9d9f70543b55f877`.

```text
12:41:51.233 Cache not found for input keys: ninjam-ref-dfaf4881ebd10f88e4c3dbef9d9f70543b55f877-[same refpeer hash]
12:41:53.580 reference sha: dfaf4881ebd10f88e4c3dbef9d9f70543b55f877 (expected same)
12:42:09.862 Built target ninjamsrv
12:42:11.816 Built target ninjam_core
12:42:24.543 Built target ninjam_core [second build directory]
12:44:50.343 DEMO PASS
12:44:55.988 Cache saved with key: [that exact key]
```

This is historical execution evidence, not a locally repeated current-SHA cold test.

## Reproduce the inspection (read-only)

```sh
gh pr view 56 --repo drawmeanelephant/fart-app --json state,mergedAt,mergeCommit,headRefOid,commits,statusCheckRollup
gh api repos/drawmeanelephant/fart-app/actions/runs/36856588659/attempts/1/jobs
gh api repos/drawmeanelephant/fart-app/actions/runs/36856588659/attempts/2/jobs
gh api --allow-escape-sequences repos/drawmeanelephant/fart-app/actions/jobs/110351731710/logs
gh api --allow-escape-sequences repos/drawmeanelephant/fart-app/actions/jobs/110358988801/logs
gh api --allow-escape-sequences repos/drawmeanelephant/fart-app/actions/jobs/110364323812/logs
gh api --allow-escape-sequences repos/drawmeanelephant/fart-app/actions/jobs/109890259997/logs
gh api repos/drawmeanelephant/fart-app/commits/main --jq '.sha'
gh issue list --repo drawmeanelephant/fart-app --state all --limit 200 --json number,title,state,body
gh pr list --repo drawmeanelephant/fart-app --state open --json number,title,url
```

These commands were executed. Raw logs are temporarily in `/tmp/fart-app-audit.q0yHXO`; the report embeds only compact non-sensitive receipts. Do not print authentication headers or signed download URLs. GitHub logs/artifacts have finite retention; timestamps above preserve the essential diagnosis.

## Future cold/warm execution plan (not run; no project code proposed)

Use only fresh disposable snapshots and an isolated runtime **wholly under /tmp**. Pin both project and reference SHAs, read instructions, and record host/compiler/CMake versions. For a **genuine CI cold-cache test**, a future authorized change must choose a never-used exact test cache key; do not delete shared caches or rerun workflows during this explore-only audit. Use the miss block's exact CMake/clang commands; with products built, run `KUJ_RUNTIME=<fresh-runtime> DEMO_PORT=<verified-free-port> bash demo/run_demo.sh` and retain the resulting current-run receipts. Ensure all disposable payload/output paths stay under that runtime (the existing script removes those directories). The demo itself writes into its fresh snapshot; never use an owner's checkout.

Repeat on a fresh CI job with the saved exact key for **warm** validation, asserting identity and skipped compile. Separately fault-inject restore timeout, transient clone failure, persistent outage, and expected/actual SHA mismatch. The full acceptance matrix is in `issue-drafts.md`. None of these tests was executed here, and the warm retry is not a substitute for the unverified current-reference cold test.
