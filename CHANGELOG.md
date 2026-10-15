# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Added `LICENSE-COMMERCIAL.md`: the commercial side of the dual license (owner decision 2026-10-04, reconstructed from the decision record — the original shipped in the v0.1.0 release PR but never landed on main).


### Added
- Selectable standard system voltage levels per equipment tab: line
  115/138/230/240/345/500 kV (240 kV = AESO/Alberta bulk system), bus
  4.16–230 kV, transformer HV 13.8–230 kV, motor 480 V–13.8 kV (600 V first =
  Canadian 600Y/347V, 480 V = US 480Y/277V; motor frame steps 200 HP at LV,
  500 HP at MV). Engine stays per-unit; kV sets the base for MW telemetry.
- Documentation brought to the ASF-grade standard: `LICENSE` with the
  canonical AGPL-3.0 text, a `NOTICE` attribution file, and
  `CONTRIBUTING.md` covering setup, checks, pull requests, and the
  versioning/release flow.

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
