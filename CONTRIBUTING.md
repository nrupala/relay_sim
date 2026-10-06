# Contributing to relay_sim

## PR flow (the certification discipline)

1. Branch from `main`; open a **draft PR**. PRs are the per-update certification:
   every change is traced, versioned, and reviewed.
2. The owner merges when green. **Never push to `main` directly** (branch
   protection / retired direct pushes where the plan allows; until then,
   green-merge is manual discipline).
3. Every PR adds a `CHANGELOG.md` entry under `## [Unreleased]`.
4. Semver bump with the PR: `patch` for fixes/chores, `minor` for features,
   `major` for breaking changes. The single version source of truth is
   `package.json` `"version"` — run `node scripts/bump-version.mjs <X.Y.Z>`
   (it also syncs the `<meta name="app-version">` marker and the changelog
   heading) and keep every surface in sync per `docs/VERSIONING.md`.
5. Merge commits reference the PR number. Cutting a release = tagging `vX.Y.Z` —
   the tag MUST equal `package.json` version (the version-guard CI fails the
   build otherwise).
6. No secrets, tokens, or private keys in commits — ever.

## Build & test

```bash
npm ci
npm run build    # typecheck + production build
npm run lint     # eslint
npm run dev      # dev server with HMR
```

PR checks (`.github/workflows/pr-checks.yml`) run `npm ci` + `npm run build` on
the self-hosted Aetheris ARM64 runner so PR verification does not consume
GitHub-hosted Actions minutes.

## Deploy

`npm run deploy` builds and publishes `dist/` to GitHub Pages via `gh-pages`.
It is a manual, local action. It currently does not mint a signed ledger
certificate: the signed-deploy wrapper is Worker-specific, and the Pages
extension is pending his decision (flagged in the certification PR) — do not
invent an unsigned workaround.

## Scope honesty

The engine uses simplified teaching models — fixed pickup and time-dial
constants, approximated sequence components. It builds intuition for how relays
behave; it is not a protection coordination or settings tool.
