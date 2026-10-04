# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-10-04

First tagged release.

### Added
- AGPL-3.0 open-source license (`LICENSE`) with a commercial-license rider
  (`LICENSE-COMMERCIAL.md`); `package.json` declares `AGPL-3.0-only`.
- `<meta name="app-version">` version marker in `index.html` per the app
  versioning standard.

### Changed
- `README.md` rewritten to describe the actual simulator (12 ANSI functions,
  4 equipment models, engine math, scope honesty, license).

### Removed
- Accidentally committed `relay_sim.git/` bare-git directory and dead code
  (`src/lib/RelayEngine.ts`, `src/data/faultCodes.ts`, `src/data/faults.ts`).
