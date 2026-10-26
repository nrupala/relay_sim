# relay_sim — Relay Fault Simulation Engine

An interactive training simulator for protective relaying: power-system faults and how protection relays respond. Built for learning and intuition — motor, transformer, busbar, and transmission-line equipment views with ANSI relay functions you can fault, watch, and trip.

## What it does

- **10 ANSI device functions with engine trip behaviour** — 50/51/50G overcurrent, 46 phase unbalance, 49 thermal, 87T/87B differential, 24 volts-per-hertz, 21 distance, 67 directional overcurrent. Each is a simplified teaching model (see *Known limitations* below for exactly how simplified). Two further functions, **66 starts-per-hour and 63 sudden pressure, are documented in the in-app help only — the engine does not implement trip behaviour for them yet.**
- **4 equipment views** — industrial motor, power transformer, main busbar, transmission line, each with selectable standard voltage classes and the relay selector filtered to that equipment.
- **Relay math, simplified** — the 51 time-overcurrent element uses the IEEE very-inverse curve `t = TD · (A/(M^p − 1) + B)` with the standard constants (A = 19.61, B = 0.491, p = 2). The other elements use simplified thresholds and fixed operating times, with fixed, disclosed teaching constants. Sequence quantities are magnitude approximations, not phasor calculations.
- **Visual lab** — sequence-phasor display, telemetry readout, trip readout, plus a help section grounded in IEEE 242 and GE's *Art & Science of Protective Relaying*. (The `TCCPlotter` and `PowerAnalyzer` components in this repo are unfinished stubs and are **not** part of the shipped app — a working log-log TCC plotter is a roadmap item, below.)

## Try it

Live demo: <https://nrupala.github.io/relay_sim/>

## Run it locally

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # typecheck + production build
npm run lint     # eslint
npm run deploy   # build + publish to GitHub Pages
```

## Scope honesty

The engine uses simplified teaching models — fixed pickup and time-dial constants, approximated sequence components. It builds intuition for how relays behave; it is not a protection coordination or settings tool. Note that the formulas shown in the in-app help describe how the real relay function works in principle; for several functions the engine computes something simpler — *Known limitations* states which, function by function.

## Known limitations

- **66 (starts-per-hour) and 63 (sudden pressure):** documented in the help/registry; no trip logic in the engine, and no start-counter or pressure input in the UI. Selecting them changes nothing.
- **49 (thermal):** the engine trips on a fixed current threshold after a fixed delay. It does not evaluate the thermal model (`θ = (I/I_rated)² · (1 − e^(−t/τ))`) shown in the help.
- **87T / 87B (differential):** the engine trips on a fixed current threshold. It does not compute differential/restraint quantities or a percentage slope, as the help formula suggests.
- **Symmetrical components (46 / 50G):** computed from current magnitudes only, not from phasors. Treat the values as an unbalance/ground indication for teaching, not as I₁/I₂/I₀.
- **21 (distance):** uses scalar `Z = V/I` against a fixed reach. There is no mho characteristic, zone timing, or directional supervision.
- **Selector entries 51G, 79, and 50/51:** these appear in the equipment relay selectors (labelled "Unknown Relay") but have no registry entry and no engine behaviour. They do not trip.
- **No TCC plot, no coordination study, no sequence-of-events log** in the current build — all three are roadmap items.

## Roadmap

See [`upcoming_features.md`](upcoming_features.md) for the v4.0 plan. None of it is in the current build: that plan covers a multivariable environmental lab with motor-starting studies, a CT saturation lab, a full log-log TCC plotter, a sequence-of-events log, sensor inputs (system voltage/frequency, tank pressure, winding temperature), and phasor-based symmetrical components and mho distance logic to replace the simplified models above. Changes are tracked in [`CHANGELOG.md`](CHANGELOG.md) under the [app versioning standard](docs/VERSIONING.md).

## License

AGPL-3.0 — see [LICENSE](LICENSE). If the AGPL's terms don't fit your use
(e.g. embedding in a proprietary product or running it as a hosted service),
commercial licenses are available — see [LICENSE-COMMERCIAL.md](LICENSE-COMMERCIAL.md).
