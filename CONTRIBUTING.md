# Contributing to relay_sim

relay_sim is a React + TypeScript training simulator for protective
relaying, built with Vite. Contributions are welcome — bug fixes,
clearer explanations of the relay math, and new fault or equipment
studies all fit the project's teaching purpose.

## Prerequisites

- Node.js and npm. CI uses Node 24 for pull-request checks and Node 20
  in the release workflow.
- Dependencies are locked: install with `npm ci` (or `npm install`
  when updating the lockfile).

## Development

```bash
npm install       # install dependencies
npm run dev       # Vite dev server with HMR
npm run preview   # serve the production build locally
```

The app is a single-page React app: the simulation engine lives in
`src/lib/RelaySim.ts`, the fault definitions in `src/lib/faultRegistry.ts`,
and the UI in `src/components/` with `src/App.tsx` wiring it together.

## Checks

There is no automated test suite yet. The gates are:

```bash
npm run build     # TypeScript typecheck (tsc) + production build
npm run lint      # ESLint
```

Both must pass before a change is merged. Every pull request to `main`
runs the PR checks workflow (`.github/workflows/pr-checks.yml`), which
installs dependencies and runs `npm run build` on a self-hosted runner.

## Pull requests

- Work on a branch and open a pull request against `main` — never push
  directly to `main`.
- Keep changes focused, and describe what changed and why.
- If your change is user-visible, add an entry to `CHANGELOG.md` under
  `## [Unreleased]` (Keep a Changelog format).
- If your change alters the simulation results, say so in the PR and
  explain the relay math behind it — this is a teaching tool, so the
  disclosed constants and simplifications in the README's "Scope
  honesty" section must stay accurate.

## Versioning and releases

Versioning follows the [app versioning standard](docs/VERSIONING.md):

- `package.json` `"version"` (SemVer) is the single source of truth.
- `node scripts/bump-version.mjs <X.Y.Z>` bumps the version and
  promotes the CHANGELOG `Unreleased` section to a dated release.
- A release is a tag `v<X.Y.Z>` (or `apk-v<X.Y.Z>`) equal to the
  `package.json` version; the release workflow's version guard fails
  the build if they differ.

## License

By contributing, you agree that your contributions are licensed under
the project's license, AGPL-3.0-only (see `LICENSE`). Commercial
licensing arrangements are described in the License section of
`README.md`.
