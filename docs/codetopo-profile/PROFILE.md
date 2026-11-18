# Codetopo Profile — Relay Sim (nrupala/relay_sim)

**What this is.** The agent-facing map of this repository, generated with
Codetopo 0.9.1 (local engine, `~/.cargo/bin/codetopo`) so an arriving agent
can see the machine — topology, trust boundaries, money surface — before it
submits or changes anything. Read this first; the graph snapshot beside it
(`snapshot.json`, `stats.json`) is the measured evidence.

- **Repo:** nrupala/relay_sim
- **Commit profiled:** `5f58e20e4f382b30a023691549b84afdb6ea38aa` (main, fetched 2026-11-18)
- **Engine:** codetopo 0.9.1 · index run 2026-11-18
- **Graph:** files walked: 27 · failed: 0 · 177 nodes · 240 edges · audit chain valid (audit entries: 3, head `b8a8756e…4db76`)
- **Nodes by kind:** class 2 · doc 9 · external 75 · file 27 · function 1 · interface 3 · method 1 · module 27 · package 1 · variable 31
- **Edges by kind:** calls 83 · contains 101 · defines 4 · imports 32 · reads 20
- **Census:** 48 files in the repo tree (see Coverage honesty for what the graph does and does not parse)

## Coverage honesty

Codetopo extracts Rust, TypeScript/JavaScript and Python, and indexes Markdown as Doc nodes. Coverage here is **partial and stated plainly**: the 5 plain `.ts` files (`src/lib/`, `src/data/`, `vite.config.ts`) are extracted, but the 10 `.tsx` React components are indexed as file/module nodes **without deep symbol extraction** — the graph holds only 1 function and 1 method across 27 files, so component internals are *not* in the graph; read the TSX source directly. HTML/CSS/SVG assets are not parsed. The 9 Markdown files are Doc nodes only. Use this profile's topology (source-read) for components and the graph for the engine/data modules.

## Topology

A client-only Vite + React training simulator for protective relaying — everything runs in the browser; there is no backend.

- `src/main.tsx` → `src/App.tsx` (164 lines) — the shell: equipment selection, fault state and view composition (`useState`/`useMemo` over the engine).
- `src/lib/RelaySim.ts` — the simulation engine (45 lines): applies the selected relay functions to a fault and decides trip behaviour. `src/lib/faultRegistry.ts` + `src/data/Registry.ts` / `voltageLevels.ts` — the fault/equipment/voltage data the engine and UI share.
- `src/components/` — the views: `EquipmentView` / `EquipmentStudy` (motor, transformer, busbar, line), `FaultSelector`, `ControlPanel`, `PowerAnalyzer`, `SequencePhasor`, `TCCPlotter`, `HelpSection`.
- Relay model (README): 10 ANSI functions with engine trip behaviour (50/51/50G, 46, 49, 87T/87B, 24, 21, 67); the 51 element uses the IEEE very-inverse curve with standard constants; 66 and 63 are documented in help only, not yet implemented in the engine. `tests/relay-sim.test.mjs` is the engine test suite.

## Trust boundaries

- **No trust boundary:** a fully client-side teaching app — no auth, no accounts, no network API, no stored credentials (grep: auth-pattern hits in 1 file only, a documentation word; no token/secret/password handling code).
- **Correctness is the only integrity property:** the relay math is a *simplified teaching model* with disclosed constants (README "Known limitations") — the risk is a learner trusting a number beyond the model's stated limits, so the limitations text is part of the product surface and must stay accurate.
- **Blast radius:** `RelaySim.ts` + the registries — one engine feeds every view; a constants change silently changes every equipment study.

## Money surface

**No money surface found.** Grep over all code for payment evidence (`stripe|paddle|billing|checkout|webhook|password|api_key`) returns nothing operative — no payments, no billing, no accounts, no spend paths. Distribution is a static site deploy (`npm run deploy`); running it costs the operator only static hosting.

## How an agent should approach

1. Read `README.md` including *Known limitations* — the simplifications are deliberate and disclosed; do not "fix" them into silent precision.
2. Read `src/lib/RelaySim.ts` and the registries before touching components; the graph under-represents TSX (see Coverage), so navigate components by source.
3. Run `tests/relay-sim.test.mjs` after any engine or registry change.
4. Regenerate this profile (below) when the engine gains functions (66/63 are the known gap) or the view set changes.

## Regeneration

`docs/codetopo-profile/refresh.sh` (in this pack) re-downloads the repo
at a named ref, re-runs the index, and rewrites `snapshot.json`,
`stats.json` and the header block inputs of this profile. Regenerate at
every release / material change.

**Release gate: NOT RUN — Guardian Mesh: NOT RUN** (profile publication is
documentation only; no gate verdict is claimed for this pack).
